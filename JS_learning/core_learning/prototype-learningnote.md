# Prototype Learning
![原型链](./prototype.png)


在构造函数的原型上添加属性方法可以让所有实例都可以调用
```js
function Person(name,age){
    this.name=name
    this.age=age
}
Person.prototype.hello=function(){
    console.log(`my name is ${this.name} ,my age is ${this.age} .`)
}
```


