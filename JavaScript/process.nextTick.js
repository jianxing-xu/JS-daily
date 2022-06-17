

// process.nextTick 调用时机在本次事件循环结束之后-下次事件循环开始之前
// 这段代码可以让这个抛出错误的回调不影响本次事件循环中的之后的代码
function apiCall(arg, callback) {
  if(typeof arg !== 'string'){
      return process.nextTick(callback, new TypeError('argument should be string'));
  }
}
setImmediate(() => console.log('immdate'))
setTimeout(() => console.log('time out'))
console.time('ticker')
apiCall(0, () => {
  console.log(msg);
  console.timeEnd('ticker')
});
for (let i = 0; i < 999999999; i++) {

}
const msg = 'this msg!';
/**
 * 一句话概括的话就是：process.nextTick()可以保证我们要执行的代码会正常执行，最后再抛出这个error。这个操作是setTimeout()无法做到的，因为我们并不知道执行那些代码需要多长时间。
 */