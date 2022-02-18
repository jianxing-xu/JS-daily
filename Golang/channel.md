## Range x Channel 
```go
package main

import (
	"fmt"
)
func main() {
    ch := make(chan int, 10)
    for i := 0; i < 10; i++ {
        go func(i) {
          ch <- i
        }(i)
    }
    close(ch)
    for range ch {
        <-ch
    }
    fmt.Println(1111)
}
结果：1111
```
**chan 在关闭之后仍然可以被range遍历**
channel 支持 **for range** 的方式进行遍历，需要注意两个细节。
1. 在遍历时，如果 channel 没有关闭，则回出现 deadlock 的错误。
2. 在遍历时，如果 channel 已经关闭，则会正常遍历数据，遍历完后，就会退出遍历。
3. 对于nil channel，无论收发都会被阻塞。
4. 写完 chan 之后一定要关闭close chan，否则主协程读的时候，会发生被阻塞。
5. 已关闭的Channel(有缓冲的),如果继续读数据，得到的是零值(对于int，就是0), 如果没有关闭，读不到数据了。

1. select语句中除default外，每个case操作一个channel，要么读要么写。
2. select语句中除default外，各case执行顺序是随机的。
3. select语句中如果没有default语句, 则会阻塞等待任一case。
4. select语句中读操作要判断是否成功读取，关闭的channel也可以读取.