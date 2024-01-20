# TS Learning


基本类型：
- 基础类型：`number`、`string`、`boolean`、`enum`、`any`、`void`、`null`、`undefined`、`never`、`object`、`symbol`
- 字面量类型
- 元组：`[元素类型,元素类型]`,越界部分成员用内部成员的联合类型校验
- 数组：`元素类型[]`、`Array<元素类型>`
- 类实例类型(通过new创建实例)，比如`let num : Number = new Number(1)`需要大写

高级类型:
- 联合类型:`|`
- 交叉类型:`&`
- 构造函数类型：`new (xxx:type)=>type`


类型声明:
- `type`            联合类型使用type声明
- `interface`       
- `typeof`          类型反推



枚举:(大写为规范)
- 普通枚举  `enum XXX { }`   会创建一个对象，可以反举
- 常量枚举  `const enum XXX { }`    不创建对象，不能反举



断言:(一般联合类型中使用)
- 非空断言 `!`
- 类型断言 `xxx as type`、`<type>xxx` 
- 双重类型断言 `(xxx as any) as type` 将变量转换为规定类型(联合类型)之外的类型



## 装饰器：(语法糖)
- 类装饰器，相当于与将类传入对应名称的函数
  - 参数:
    - target 类的构造函数
```ts
d1(target){}
d2(target){}
d3(target){}
@d1
@d2
@d3
class xxx{}
// 等价于
d1(target){}
d2(target){}
d3(target){}
class xxx{}
d1(d2(d3(xxx)))

// 特别注意,装饰器后带括号的情况,是相当于将函数执行后获得装饰器函数
// 此处即为洋葱模型,装饰器函数的工厂函数写法
d1(arg){ return function(target){}}
d2(arg){ return function(target){}}
d3(arg){ return function(target){}}
@d1(someArg)
@d2(someArg)
@d3(someArg)
class xxx{}
```

- 属性装饰器
  - 装饰器函数的参数：
    - target        对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
    - key           成员的名字
```ts
d(target,key){}
class xxx{
    @d
    public xxx:type = ''

}
```

- 方法装饰器
  - 装饰器函数的参数:
    - traget        对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
    - key           成员的名字
    - descriptor    成员的属性描述符
```ts
d(target,key,descriptor){}
class xxx{
    @d
    someMethod(){}
}
```

- 访问器装饰器
  - 装饰器函数的参数:
    - traget        对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
    - key           成员的名字
    - descriptor    成员的属性描述符

- 参数装饰器 ???
  - 装饰器函数的参数:
    - traget        对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
    - key           成员的名字
    - index    参数在函数参数列表中的索引




## 接口

- 接口类型的断言必须保证原有数据必须有
- 接口同名会合并
- 通过type声明的类型获取接口下的某一项类型要通过`['']`获取，而不是`.`
- 类可以通过 `implements` 实现多个接口，即需要满足所有接口的条件

```ts
interface Interf{
    xxx:type                            //普通属性
    [xxx:string]:any                    //任意属性，注意对象的成员名都会转化为字符串
    [xxx:number]:any                    //索引属性

    (arg1:type,arg2:type):type          //表示对象本身为一个函数对象 
    new (arg1:type,arg2:type):type      //表示构造函数类型

}
```


## 抽象类

- 抽象类不能被实例化，其中的抽象属性需要被子类实现

```ts
abstract class Xxx{
    abstract xxx:type           //抽象属性，需要被子类实现
    abstract xxxx():type        //抽象方法，需要被子类实现
}
```


## 泛型
- extends 可以约束泛型的类型，主要用于约束泛型中必须要有某个属性
- keyof 可以获取类型的所有成员组成的类型
```ts
// 泛型放在函数前：表示函数调用时确定类型
interface xxx {
  <T>(x:number,y:T):Array<T>
}

// 泛型放在接口后：表示使用接口时确定类型
interface xxx<T>{
  [[key:number]]:T
}
```




## 类


- public、private、protected、readonly

- 类名充当类型时表示的是实例的类型，类的类型通过typeof获取


## 类型谓词 is
用于判断语句中的判断函数，用于帮助ts解析分支中的变量类型，一般用于函数的类型判断时收束类型




## 类型保护
- typeof、instanceof、in、is
- 注意作用域内部的子作用域可能会得不到父作用域判断后的类型




## 兼容性
- 单个实例兼容性：类型定义后不可改变
- 联合类型：少的类型实例可以赋值给多的类型实例
- 接口兼容性：鸭式判定，只要有规定方法就可以赋值(即成员多的可以赋值给成员少的)
- 函数兼容性：参数少的实例可以赋值给参数多的实例，且单个参数满足普通的兼容性，返回值类型同普通兼容性相同(传参可以传父类，返回值可以返回子类)



## 三元表达式、extends、infer
- extends：三元表达式中判断一个类型是否是另一个类型的子类型
- 三元表达式、extends：对泛型类型的传入类型进行判断，并返回一个类型
- infer：对泛型类型的传入类型的进行判断时，获取传入类型的某一部分(放在extends语句中要推断类型的位置，即可获得对应位置的类型)
- 比如内置类型ReturnType、Parameters就通过infer关键字的实现


## 内置类型

- Exclude<T,K>                生成一个新类型，从泛型 T 中排除掉 K 的类型
- Extract<T,K>                生成一个新类型，从泛型 T 中获取和 K 公共的类型
- NonNullable<T>              生成一个新类型，从泛型 T 中排除掉 null 和 undefined
 >注意此处区别为一个用于联合类型，一个用于对象接口

- Pick<T,K>                   生成一个新类型，从 T 的类型中取出对应 K 名称的成员类型
- Omit<T,K>                   生成一个新类型，该类型拥有 T 中除了 K 成员以外的所有成员
- Record<T,K>                 用于类型中记录入参的类型
- Partial<T>                  生成一个与传入类型成员相同且皆为可选的新类型
- Required<T>                 生成一个新类型，该类型与 T 拥有相同的属性，但是所有属性皆为必选项
- Readonly<T>                 生成一个新类型，该类型与 T 拥有相同的属性，但是所有属性皆为只读项

- ReturnType<T>               获取函数类型的返回值类型
- Parameters<T>               获取函数类型的参数数组类型
- ConstructorParameters<T>    获取构造函数、类类型的参数数组类型
- InstanceType<T>             获取构造函数、类类型的实例类型(一般直接使用类名)




## 模块化

- `export = xxx`、`import xxx =require('')`语法：用于node后端cjs引入ts模块时支持ts的类型识别
- 打包工具构建时使用es6模块时直接使用默认语法

- `declare`声明语法:全局声明，不能声明实现
- `declare module 'xxx'{}`库类中声明模块



## 声明文件 *.d.ts




## 命名空间

