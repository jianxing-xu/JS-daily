## sync 包的简介
Go语言的sync包提供了常见的并发编程**控制锁;**
在并发编程中锁的主要作用是保证多个线程或者 goroutine在访问同一片内存时不会出现混乱;

golang 中使用 go 语句来开启一个新的协程。 goroutine 是非常轻量的，除了给它分配栈空间，它所占用的内存空间是微乎其微的;
但当多个 **goroutine** 同时进行处理的时候，就会遇到比如**同时抢占一个资源**，某个 goroutine 等待另一个 goroutine 处理完某一个步骤之后才能继续的需求。
在 golang 的官方文档上，**作者明确指出，golang 并不希望依靠共享内存的方式进行进程的协同操作。**
而是希望通过管道 **channel** 的方式进行;

但是一些特殊情况下,我们依然需要用到锁,所以 **sync** 包提供了我们需要的功能.

整个包都围绕这 **Locker** 进行，这是一个 **interface：**

```go
type Locker interface {
        Lock()
        Unlock()
}
```

## Mutex类型互斥锁原理
平时所说的锁定，其实就是去锁定互斥锁，而不是说去锁定一段代码;
这和其他编程语言有所区别,例如java 中我们会用同步锁锁定一段代码,确保多线程并发时只有一个线程可以控制运行此代码段,知道释放同步锁;
而go语言是在 goroutine 中锁定互斥锁 ,其他 goroutine 执行到有锁的地方时，它获取不到互斥锁的锁定，会阻塞在那里等待，从而达到控制同步的目的.

### sync.RWMutex
RWMutex 读写锁 基于 Mutex 实现
读写锁的特点 : 它是针对读写操作的互斥锁，读写锁与互斥锁最大的不同就是可以分别对 读、写 进行锁定。
一般用在大量读操作、少量写操作的情况.

- ==同时只能有一个 goroutine 能够获得写锁定==
- ==同时可以有任意多个 gorouinte 获得读锁定==
- ==同时只能存在写锁定或读锁定（读和写互斥）==
实现方法
```go
func (rw *RWMutex) Lock()
func (rw *RWMutex) Unlock()

func (rw *RWMutex) RLock()
func (rw *RWMutex) RUnlock()
```
- 读锁定（RLock），对读操作进行锁定
- 读解锁（RUnlock），对读锁定进行解锁
- 写锁定（Lock），对写操作进行锁定
- 写解锁（Unlock），对写锁定进行解锁
上面的锁成对使用,不能互相拆分混用,会发生运行时错误


### 读写锁示例
```go
package main

import (
    "fmt"
    "sync"
    "time"
)

var m *sync.RWMutex
var val = 0

func main() {
    m = new(sync.RWMutex)
    for i := 0; i < 5; i++ {
        go read(1)
    }
    for j := 0; j < 5; j++ {
        go write(2)
    }
    for m := 0; m < 5; m++ {
        go read(3)
    }

    time.Sleep(18 * time.Second)
}

func read(i int) {
    m.RLock()
    println("读: ", i, val)
    time.Sleep(3 * time.Second)
    println("读结束")
    m.RUnlock()
}

func write(i int) {
    m.Lock()
    val = 10
    println("写: ", i, val)
    time.Sleep(3 * time.Second)
    println("写结束")
    m.Unlock()
}
```
### 结果
```bash
$ go run rwlock.go
读:  1 0
读结束
写:  2 10
写结束
读:  3 10
读:  3 10
读:  1 10
读:  1 10
读:  3 10
读:  1 10
读:  1 10
读:  3 10
读:  3 10
读结束
读结束
读结束
读结束
读结束
读结束
读结束
读结束
读结束
写:  2 10
写结束
写:  2 10
写结束
写:  2 10
```


### 规律
注意:每次执行的结果都有差异,当你复制上面代码运行,结果和上面有所不同
但是:结果展示出来的规律却是一致的:

**规律一**:[同时可以有任意多个 gorouinte 获得读锁定]
RWMutex 读锁可以并发多个执行,从上面read 程序和程序执行输出的内容来看
说明在加上读取锁时,其他 goroutine 依然可以并发多个 读 访问.

**规律二**: [同时只能有一个 goroutine 能够获得写锁定]
RWMutex 写获得锁定时,不论程序休眠多长时间,一定会输出 写结束,其他 goroutine 才能获得锁资源.

**规律三**: [同时只能存在写锁定或读锁定（读和写互斥）]
读虽然可以同时多个 goroutine 来锁定,但是写锁定之前其他多个读锁定必须全部释放锁.
**写锁定获得锁时,其他 读 或者 写 都无法再获得锁,直到此 goroutine 写结束,释放锁后,其他 goroutine 才会争夺.**
所以 读和写 的俩种锁是互斥的.

**RWMutex 读写锁使用于读多写少的业务逻辑，如果读和写的操作差别不大，读写锁的优势就发挥不出来。**


## sync.WaitGroup
它的使用场景是在一个goroutine等待一组**goroutine**执行完成.
**WaitGroup**拥有一个内部计数器;
当计数器等于0时，则**Wait()**方法会立即返回;
否则它将阻塞执行**Wait()**方法的goroutine直到计数器等于0时为止;

增加计数器，使用**Add(int)**方法。
减少计数器，我们可以使用**Done()**（将计数器减1），
也可以传递负数给Add方法把计数器减少指定大小，**Done()**方法底层就是通过**Add(-1)**实现的.

### WaitGroup 示例

```go
package main

import (
    "fmt"
    "sync"
    "time"
)

func main() {
    var wg sync.WaitGroup

    for i := 0; i < 5; i++ {
        // 计数加 1
        wg.Add(1)
        go func(i int) {
            // 计数减 1
            defer wg.Done()
            time.Sleep(time.Second * time.Duration(i))
            fmt.Printf("goroutine%d 结束\n", i)
        }(i)
    }

    // 等待执行结束
    wg.Wait()
    fmt.Println("所有 goroutine 执行结束")
}
```

### 结果
```bash
$ go run waitgroup.go 
goroutine0 结束
goroutine1 结束
goroutine2 结束
goroutine3 结束
goroutine4 结束
所有 goroutine 执行结束
```


## 互斥锁

互斥锁是完全互斥的，使用互斥锁能够保证同一时间有且只有一个**goroutine**进入**临界区**，其他的goroutine则在等待锁；当互斥锁释放后，等待的goroutine才可以获取锁进入**临界区**，多个**goroutine**同时等待一个锁时，**唤醒的策略是随机的。**

## sync.Once

**sync.Once** 是 Golang package 中使方法只执行一次的对象实现，作用与 **init** 函数类似。但也有所不同。

init 函数是在文件包首次被加载的时候执行，且只执行一次
**sync.Onc** 是在代码运行中需要的时候执行，**且只执行一次**
当一个函数不希望程序在一开始的时候就被执行的时候，我们可以使用 sync.Once 。

```go
package main

import (
	"fmt"
	"sync"
)

func main() {
	var once sync.Once
	onceBody := func() {
		fmt.Println("Only once")
	}
	done := make(chan bool)
	for i := 0; i < 10; i++ {
		go func() {
			once.Do(onceBody)
			done <- true
		}()
	}
	for i := 0; i < 10; i++ {
		<-done
	}
}

# Output:
Only once
```

## sync.Map

Go语言中**内置的map不是并发安全的**。请看下面的示例：
```go
var m = make(map[string]int)

func get(key string) int {
    return m[key]
}

func set(key string, value int) {
    m[key] = value
}

func main() {
    wg := sync.WaitGroup{}
    for i := 0; i < 20; i++ {
        wg.Add(1)
        go func(n int) {
            key := strconv.Itoa(n)
            set(key, n)
            fmt.Printf("k=:%v,v:=%v\n", key, get(key))
            wg.Done()
        }(i)
    }
    wg.Wait()
}
```
上面的代码开启少量几个goroutine的时候可能没什么问题，当并发多了之后执行上面的代码就会报**fatal error: concurrent map writes错误。**

像这种场景下就需要为map**加锁来保证并发的安全**性了，Go语言的sync包中提供了一个开箱即用的并发安全版map–sync.Map。开箱即用表示不用像内置的map一样使用make函数初始化就能直接使用。同时**sync.Map**内置了诸如Store、Load、LoadOrStore、Delete、Range等操作方法。
```go
var m = sync.Map{}

func main() {
    wg := sync.WaitGroup{}
    for i := 0; i < 20; i++ {
        wg.Add(1)
        go func(n int) {
            key := strconv.Itoa(n)
            m.Store(key, n)
            value, _ := m.Load(key)
            fmt.Printf("k=:%v,v:=%v\n", key, value)
            wg.Done()
        }(i)
    }
    wg.Wait()
} 
```
