function Dog(name){
    this.name=name;
}
Dog.prototype.bark=function(){
    console.log("wangwang")
}
Dog.prototype.sayName=function(){
    console.log("my name is"+this.name)
}
// let sanmao=new Dog("三毛");

function _new(Fn,...arg){
    //=>创建一个空对象，让他的原型执行Fn.prototype(作为Fn的一个实例)
    /* let obj={};
    obj.__proto__=Fn.prototype; */
    //=>Object.creat([AA]对象)创建一个空对象，并且让空对象作为AA对象所属的构造函数的实例(obj.__proto__=AA)
    let obj=Object.create(Fn.prototype);
    Fn.call(obj,...arg);
    return obj;
}
let sanmao=_new(Dog,"三毛");
sanmao.bark();
sanmao.sayName(); 
console.log(sanmao instanceof Dog);
console.dir(sanmao);
