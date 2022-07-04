# Less Learning

## 变量
声明变量：`@变量名：变量值`
使用变量：
1.在属性值中：直接使用`@变量名`
2.在类名中、属性名中或者是一部分的时候:`@{变量名}`
变量重名时优先使用近的
新语法:`$属性名`，可以使用默认的属性值

## 嵌套语法
less中的数值都可以直接运算
`&`表示外层的父元素
`&其他选择器`表示当前父元素下的其他元素
`其他选择器 &`表示其他元素下的当前父元素（即把其他选择器放在所有选择器之前）

## extend用法
```less
// 用法1
选择器:extend(类名 all){
}
// 用法2
选择器{
    &:extend(类名 all)
}
```
关键字all用于匹配所有带有类名的选择器（模糊匹配，默认是精确匹配的）,例子：
```less
.c:extend(.d all) {
  // extends all instances of ".d" e.g. ".x.d" or ".d.x"
}
.c:extend(.d) {
  // extends only instances where the selector will be output as just ".d"
}
```

## escaping转义
`~''`或`~""`中的内容会被原样输出，例如：
```less
@min768: ~"(min-width: 768px)";
.element {
  @media @min768 {
    font-size: 1.2rem;
  }
}
```

## mixin混合
可以混合使用id选择器，或类选择器
```
.a, #b {
  color: red;
}
.mixin-class {
  .a();
}
.mixin-id {
  #b();
}
```
定义时加上括号后，表示不输出，只定义，并且可以添加参数，参数可以用逗号或分号（推荐）分隔






## css守卫
`when(判断条件)`可以根据条件判断添加属性
```less
button when (@my-option = true) {
  color: white;
}
```
