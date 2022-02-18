// 寄生组合继承:这个过程既实现了继承，又没有去调用Super
function inheritPrototype(Sub, Super) {
  //subPrototype.__proto__=Super.prototype
  var subPrototype = Object.create(Super.prototype)
  //subPrototype.constructor=Sub
  subPrototype.constructor = Sub
  //相当于subPrototype有__proto__和constructor两个属性
  //即：
  //Sub.prototype.__proto__===Super.prototype
  //Sub.prototype.constructor=Sub
  Sub.prototype = subPrototype
}
function Par(name, age) {
  this.name = name;
  this.age = age;
}
Par.prototype.say = function () {
  console.log(this.name);
}
function Son(sonName, name, age) {
  // 借用构造函数继承属性
  Par.call(this, name, age);
  this.sonName = sonName;
}
// 继承原形方法
inheritPrototype(Son, Par);
// 继承过来后，再重写
Son.prototype.say = function () {
  console.log(this.sonName);
}
var s = new Son("songName","parName","parAge");




