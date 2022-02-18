// New
function _new(fn, ...args) {
  // 创建一个对象继承自fn
  const obj = Object.create(fn.prototype);
  // 执行构造器传递参数，this指向继承过来的对象
  const ret = fn.apply(obj, args);
  // 如果构造器返回的是对象直接返回，否则返回obj对象
  return ret instanceof Object ? ret : obj;
}