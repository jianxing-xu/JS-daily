
function type(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1);
}
function deepClone(obj, map = new WeakMap()) {
  if (typeof (obj) != "object") return obj;
  if (type === "Date") return new Date(obj);
  if (type === "RegExp") return new RegExp(obj);
  if (map.has(obj)) return map.get(obj);
  let cloneObj = new obj.constructor();
  map.set(obj, cloneObj);
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloneObj[key] = deepClone(obj[key], map);
    }
  }
  return cloneObj;
}
const a = {
  name: "jack",
  age: "19",
  create: new Date(),
  hobbit: ["play","game"]
}
a.hobbit.push(a);
a.firend = a;
console.log(deepClone(a).firend);