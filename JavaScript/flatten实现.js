

Array.prototype._flat = function (level = 1) {
  if (isNaN(parseInt(level))) throw new TypeError(`level type is not a Number!`)
  const _level = level < 0 ? 1 : level;
  if (!Array.isArray(this)) {
    throw new TypeError(`${this} is not a Array`);
  }
  function inner(arr, level) {
    let arrs = [];
    arr.map(item => {
      if (!Array.isArray(item) || !!!level) {
        arrs.push(item)
      } else {
        arrs.push(...inner(item, --level))
      }
    })
    return arrs
  }
  return inner(this, _level);
}
Array.prototype.__flat = function (dep = 1) {
  return this.reduce((pre, cur) => pre.concat(Array.isArray(cur) && dep > 1 ? cur.__flat(dep - 1) : cur), []);
}
const a = [1, 2, 3, [2, 3, [4, 5]]]
console.log(a.__flat(1))

function fb(n) {
  
}

