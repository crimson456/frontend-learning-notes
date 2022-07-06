# Javascript Learning（包含 ES6）

## 基本语法

1. 变量声明：
   - var
   - let
   - const
2. 函数：
   - 普通函数：
   - 箭头函数：
   - 构造函数和 new 关键字
3. 基本运算表达式：
   - 常用：
     - `+`,`-`,`*`,`/`,`%`基本运算
     - `=`赋值运算
     - `>`,`<`，`>=`,`<=`,`==`,`===`,`!=`,`!==`关系表达式
     - `++`,`--`,`+=`,`-=`,`*=`,`/=`,`%=`
     - `&&`,`||`，`!`逻辑与或非
     - `&`,`|`,`^`按位与或非
     - `条件表达式?真值:假值`
     - `typeof`判断类型
     - `delete`删除属性
     - `in`查询是否为属性
     - `instanceof`查询是否为实例
   - 不常用：
     - `void` 执行函数或表达式并返回undefined
     - 按位左移右移...
     - `eval('str')`将字符串解析为js代码执行
4. 基本语句

   - `if`条件判断语句
   - `switch/case`条件判断语句
   - `for`循环语句
   - `while`循环语句
   - `do/while`循环语句
   - 标签语句：用`:`给循环语句添加标签名，配合 break 和 continue 关键字处理循环语句嵌套的跳出

      ```js
      block: for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
          console.log(i, "------------", j);
          if (i === 5 && j === 5) {
            break block;
          }
        }
      }
      //结果为到5------5时直接跳出所有循环
      ```
   - `with`语句：用于临时扩展作用域链(严格模式下将禁用 with 关键字，不常用)
      ```js
      let obj = {
        name: "abc",
      };
      with (obj) {
        console.log(name);
      }
      ```
   - 数组推导语句（不常用）

      ```js
      [expression for (variable in object) if (condition) ]
      ```
   - 生成器表达式语句（不常用）
      ```js
      (expression for (variable in object) if (condition) )
      ```

5. 普通属性和存储器属性
   对象下的属性可以分成普通属性和存储器属性
   1. 普通属性：固定的值或变量
   2. 存储器属性：getter和setter函数，在访问时判断赋值取值操作并执行对应getter/setter函数
   ```js
   let obj = {
       //普通属性
       a: 10,
       //访问器属性
       get b() {
           return 20
       },
       set b(value) {
           return value
       }
   }
   ```   


## 顶级对象 Object

1. 构造对象上的方法：
   包括：创建对象、定义成员、获取成员属性、操作成员操作性、原型相关、比较两个对象、拷贝、对象数组转换

   1. `Object.create(p1,p2)`  
      创建一个实例对象并且返回，对象的原型为 p1，p2 为实例对象的成员们属性描述符的对象

   2. 定义成员相关：

      1. `Object.defineProperty(p1,p2,p3)`  
         为目标对象 p1 定义属性并作为返回值，p2 为属性名，p3 为属性描述对象

         ```js
         const object1 = {};
         Object.defineProperty(object1, "property1", {
           value: 42,
           writable: false,
         });
         ```

      2. `Object.defineProperties(p1,p2)`  
         为目标对象 p1 定义多个属性并作为返回值，p2 为以属性名和属性描述对象为键值对的对象形式

         ```js
         const object1 = {};
         Object.defineProperties(object1, {
           property1: {
             value: 42,
             writable: true,
           },
           property2: {},
         });
         ```

   3. 获取成员属性相关：

      1. `Object.keys(p1)`  
         返回 p1 对象的所有可枚举成员名的数组

      2. `Object.values(p1)`  
         返回 p1 对象所有可枚举成员值的数组

      3. `Object.getOwnPropertyNames(p1)`  
         返回 p1 对象的所有成员名的数组(但不包括符号类型为名的)

         > `keys()`和`getOwnPropertyNames()`区别为是否包含不可枚举的成员

      4. `Object.getOwnPropertyDescriptor(p1,p2)`  
         返回 p1 对象中 p2 成员的属性描述对象
         属性描述对象：(有四个值)

         1. 普通属性：value,writable,configurable,enumerable
         2. 存储器(getter/setter)属性：get,set,configurable,enumerable

         > 注：configurable 控制是否可以配置，即删除，和修改存储器器属性，从普通属 性转变到存储器器等操作，enumerable 控制是否可以举，即`for/in`，`Object. keys(p1)`中是否可访问

      5. `Object.getOwnPropertyDescriptors(p1)`
         返回 p1 对象中所有成员的属性描述对象

      6. `Object.getOwnPropertySymbols(p1)`
         返回 p1 对象的 symbol 类型成员的数组

   4. 成员操作性相关

      1. `Object.preventExtensions(p1)`  
         使目标对象 p1 改变为不可扩展的对象并返回

         > 不可扩展：仅不可添加新的成员

      2. `Object.seal(p1)`  
         使目标对象 p1 改变为封闭的对象并返回

         > 封闭：不可添加新的成员，不可配置，但可以修改已有成员的值和值的属性 (writable,enumerable)
         > 对象中所有成员的 configurable 被设置为 false

      3. `Object.freeze(p1)`  
         使目标对象 p1 改变为冻结的对象并返回

         > 冻结：不能添加新的成员，不可配置，且不可修改已有成员的值和值的属性
         > 且对象中所有成员的 configurable，writable 被设置为 false
         > 注意冻结对象的 getter/setter 可以使用

      4. `Object.isExtensible(p1)`  
         检查目标对象 p1 是否是可扩展的对象，返回布尔值

      5. `Object.isSealed(p1)`  
         检查目标对象 p1 是否是封闭的对象，返回布尔值

      6. `Object.isFrozen(p1)`  
         检查目标对象 p1 是否是冻结的对象，返回布尔值

   5. 原型相关

      1. `Object.getPrototypeOf(p1)`  
         获取 p1 对象的原型对象

      2. `Object.setPrototypeOf(p1, p2)`
         为 p1 对象设置新的原型 p2

   6. `Object.is(p1, p2)`
      判断 p1，p2 是否为同一个值，并返回布尔值，与`==`和`===`略有不同

   7. `Object.assign(p1,...p2)`
      将 p2 中的所有可枚举成员依次拷贝到 p1 中，并返回 p1

      > `assign()`第一层为深拷贝，从第二层开始为浅拷贝

   8. `Object.entries(p1)`
      返回p1对象的可枚举属性的键值对可迭代对象

   9. `Object.fromEntries(p1)`
      返回p1键值对可迭代对象的对象形式

2. 原型链上的方法：
   包括：检测是否存在成员、检测是否在某对象原型链上、返回对象描述、返回原始值

   1. `Object.prototype.hasOwnProperty(p1)`  
      检测是实例对象是否具有 p1 为属性名的自有属性，返回布尔值(不会查询原型链)

   2. `Object.prototype.propertyIsEnumerable(p1)`  
      检测是实例对象是否具有 p1 为属性名的可枚举的自有属性，返回布尔值(不会查询原型链)

   3. `Object.prototype.isPrototypeOf(p1)`  
      检测实例对象是否在 p1 的原型链上，返回布尔值

   4. `Object.prototype.toString()`  
      返回对象的类名，如对象返回`[object Object]`

      > `toString()`方法经常重构，常用`Object.prototype.toString.call()`来 判断类别

   5. `Object.prototype.toLocaleString()`  
      返回一个该对象的字符串表示,用于派生对象特定语言环境重载

   6. `Object.prototype.valueOf()`  
      方法返回对象的原始值





## Function 对象

1. 属性：
   1. `Function.length`
      形参个数
   2. `Function.name`
      函数名称
   3. `Funtion.arguments`
      函数实参的伪数组
   4. `Function.caller`
      函数的调用者，如果是全局作用域内调用则为 null
2. 原型上的方法

   1. `Function.prototype.apply(p1,p2)`
      以 p1 为 this，p2 为形参数组调用函数

   2. `Function.prototype.call(p1,...p2)`
      以 p1 为 this，p2 为形参调用函数

      > `apply()`和`call()`区别在于将形参作为数组还是多个传入

   3. `Function.prototype.bind(p1,...p2)`
      以 p1 为 this，p2 为形参返回新函数(不调用)

   4. `Function.prototype.toString()`
      返回函数源代码字符串

3. 函数内的对象
   1. `arguments`
      实参组成的类数组，修改其中的值会改变函数内实参
      `arguments.callee`指向当前执行函数
      `arguments.length`访问参数数量
      `arguments[@@iterator]`返回迭代器??

## Array 对象

数组特殊行为：赋值索引大于 length 值时增加 length 值，length 值小于实际长度时截取数组，所有非负整数(<2^32)对应的成员名作为数组索引，所有不是非负整数的成员名都作为对象属性

1. 属性： 1.`Array.length`
   数组长度
2. 构造对象上的方法:

   1. `Array.from(p1,p2(p3),p4)`
      返回可迭代对象 p1 转化的数组
      p2 指定转化函数，p3 为转化中每一项
      p4 指定转化函数中的 this 指向
      > 可迭代对象：可以用 for-of 方法循环的对象，如字符串，对象，数组，map，set
   2. `Array.isArray(p1)`
      判断 p1 是否为数组

   3. `Array.of(...p1)`
      创建 p1 为数组项的数组

3. 原型上的方法:

   1. 操作相关:（改变原数组）

      1. `Array.prototype.pop()`
         删除最后一个元素，并返回该元素

      2. `Array.prototype.push(...p1)`
         将多个元素 p1 依次压入队尾并返回数组长度

      3. `Array.prototype.shift()`
         删除第一个元素，并返回该元素

      4. `Array.prototype.unshift(...p1)`
         将多个元素 p1 以块的形式放入队头并返回数组长度

      5. `Array.prototype.splice(p1,p2,...p3)`
         从 p1 索引值处删除 p2 数量的元素并返回，并以块的形式放入多个元素 p3

      6. `Array.prototype.reverse()`
         反转数组并返回

      7. `Array.prototype.sort(p1(p2,p3))`
         根据比较函数 p1 的返回值对数组进行排序并返回，p2,p3 是数组中的两个比较值
         如果返回值大于零，则 p2 排到 p3 之前,反之在之后，等于零则位置不变
         如果不指定比较函数，则按字符串顺序排列

      8. `Array.prototype.copyWithin(p1,p2,p3)`
         将 p2 和 p3(包括 p2 不包括 p3)之间的元素复制到 p1 位置

      9. `Array.prototype.fill(p1,p2,p3)`
         将 p2 和 p3(包括 p2 不包括 p3)之间的元素全变为 p1


   2. 遍历相关：（注意 for/in 遍历会遍历到数组的对象属性）

      1. `Array.prototype.forEach(p1(p2,p3,p4),p5)`
         对数组的每一项执行 p1 回调函数并返回 undefined
         p2 为当前项值，p3 为索引值，p4 为遍历的数组,p5 为回调函数的 this 指向

      2. `Array.prototype.map(p1(p2,p3,p4),p5)`
         对数组的每一项执行 p1 回调函数并返回每个回调函数返回值组成的新数组
         p2 为当前项值，p3 为索引值，p4 为遍历的数组,p5 为回调函数的 this 指向

      3. `Array.prototype.filter(p1(p2,p3,p4),p5)`
         对数组的每一项执行 p1 回调函数并返回每个回调函数返回值为真组成的新数组
         p2 为当前项值，p3 为索引值，p4 为遍历的数组,p5 为回调函数的 this 指向

      4. `Array.prototype.every(p1(p2,p3,p4),p5)`
         对数组的每一项执行 p1 回调函数，如果任意一项回调返回假，则返回假，反之返回真
         p2 为当前项值，p3 为索引值，p4 为遍历的数组,p5 为回调函数的 this 指向

      5. `Array.prototype.some(p1(p2,p3,p4),p5)`
         对数组的每一项执行 p1 回调函数，如果任意一项回调返回真，则返回真，反之返回假
         p2 为当前项值，p3 为索引值，p4 为遍历的数组,p5 为回调函数的 this 指向

      6. `Array.prototype.findIndex(p1(p2,p3,p4),p5)`
         对数组的每一项执行 p1 回调函数，返回第一个回调函数返回值为真的成员索引值
         p2 为当前项值，p3 为索引值，p4 为遍历的数组,p5 为回调函数的 this 指向

      7. `Array.prototype.flatMap(p1(p2,p3,p4),p5)`
         将`map()`方法的结果进行深度为1的扁平化处理

      8. `Array.prototype.reduce(p1(p2,p3,p4,p5),p6)`和`Array.prototype.reduceRight(p1(p2,p3,p4,p5),p6)`
         根据有无初始值 p6 执行回调函数 p1  
         如果有，则从数组第一项开始执行，如果没有，则从第二项开始，第一项作为初始值
         p2 为回调函数的前项的返回值，p3 为当前数组项的值，p4 为当前索引号，p5 为遍历的数组
         返回值为遍历结束后的返回结果
         `reduceRight()`顺序从最后一项开始

   3. 查询相关：

      1. `Array.prototype.includes(p1,p2)`
         查询数组中是否有 p1，返回布尔值  
         p2 为查询开始的索引，如果为负开始位置从末尾计算，顺序都是从前向后

      2. `Array.prototype.indexOf(p1,p2)`
         查询数组中是否有 p1，返回第一个查询到的索引值，不存在则返回-1  
         p2 为查询开始的索引，如果为负开始位置从末尾计算，顺序都是从前向后

      3. `Array.prototype.lastIndexOf(p1,p2)`
         查询数组中是否有 p1，返回最后一个查询到的索引值，不存在则返回-1  
         p2 为查询开始的索引，如果为负开始位置从末尾计算，顺序都是从前向后


   4. 取值相关:(不修改原数组)

      1. `Array.prototype.join(p1)`
         返回以 p1 为分隔符的字符串，如果不传参则为','

      2. `Array.prototype.concat(...p1)`
         将自身和 p1 中的数组浅拷贝到一个新的数组并返回

      3. `Array.prototype.slice(p1,p2)`
         浅拷贝索引值在 p1 和 p2 之间(包含 p1 不包含 p2)的项目，并返回新的数组

      4. `Array.prototype.flat(p1)`
         以p1为深度递归遍历数组，并将所有遍历项合并为一个新数组并返回

      5. `Array.prototype.toString()`
         返回数组的字符串表示

      6.  `Array.prototype.toLocaleString()`
         返回数组的特定语言环境字符串表示

         
   5. 迭代器相关：
         
      1. `Array.prototype.keys()`
         返回包含键名的迭代器
         
      2. `Array.prototype.values()`
         返回包含键值的迭代器

      3. `Array.prototype.entries()`
         返回包含键名和键值的迭代器

      4. `Array.prototype[Symbol.iterator]()`
         返回包含键值的迭代器,同`values()`方法




注:`delete`删除数组项不会更新 length 值，会变为稀疏数组

## JSON 对象

1. `JSON.parse(p1[, p2(p3,p4){}])`
   将 JSON 字符串转化为 js 对象
   参数 p1 为要转化的 JSON 字符串
   参数 p2 为转化前的变换(reviver) 函数，函数的参数 p3，p4 分别为转换的属性名和属性值，遍历顺序是从内向外，变换函数的返回值为转换后的属性值，如果返回 undefined 则删除属性，如果返回 p4 则相当于不加变换函数

2. `JSON.stringify(p1[, p2(p3,p4)[, p5])`
   将 js 对象转化为 JSON 字符串
   参数 p1 为要转化的 js 对象
   参数 p2 为转化前的变换(replacer) 函数，函数的参数 p3，p4 分别为转换的属性名和属性值，遍历顺序是从内向外，变换函数的返回值为转换后的属性值，如果返回 undefined 则删除属性，如果返回 p4 则相当于不加变换函数
   p5 为指定缩进的字符串，默认为 null，如果为数字 0-10 则为空格数，最大长度为 10，超过则截取

## String 对象

1. 属性: 
   1.`String.length`字符串的长度

2. 构造对象上的方法：

   1. `String.raw(p1,p2)`或用反引号代替括号，内部放模板字符串
      返回模板字符串的原始字符串，p1，p2 查文档??

   2. `String.fromCharCode(...numbers)`
      根据numbers对应的UTF-16字符返回字符串

   3. `String.fromCodePoint(...numbers)`
      根据numbers对应的unicode编码位置返回字符串



3. 原型对象上的方法:

   1. `String.prototype.charAt(index)`
      根据索引号返回对应字符，相当于`'somestring'[index]`

   2. `String.prototype.concat(...strings)`
      合并字符串并返回，不影响原字符串

   3. `String.prototype.endsWith(searchString,length)`
      判断当前字符串是否是以目标字符串结尾，返回布尔值
      >length参数指定函数计算的末尾

   4. `String.prototype.includes(searchString,index)`
      判断当前字符串是否包含另一个字符串，返回布尔值
      >index指定开始检索的位置

   5. `String.prototype.indexOf(searchValue,fromIndex)`
      查询第一次出现字符的索引，从左向右
      >fromIndex指定开始查询的位置，小于零从头开始，大于长度从最后一个开始

   6. `String.prototype.lastIndexOf(searchValue,fromIndex)`
      查询最后一次出现字符的索引，从右（fromIndex值处）向左

   7. `String.prototype.localeCompare(compareString,locales,options)`
      返回一个数字来指示一个参考字符串是否在排序顺序前面或之后或与给定字符串相同？

   8.  `String.prototype.match(regexp)`
      返回当前字符串匹配正则表达式的结果
      >如果正则为全局模式g，则返回所有匹配项组成的数组，但无捕获组等其他信息（粗略）
      >如果正则不为全局模式g，则只返回第一个匹配项的完整信息数组，包括捕获组（详细）

   9.  `String.prototype.matchAll(regexp)`
      返回一个包含所有匹配正则表达式的结果及分组捕获组的迭代器

   10. `String.prototype.normalize(form)`
      根据规定的形式返回对应形式的规范字符串

   11. `String.prototype.padEnd(targetLength, padString)`
      将padString补充在当前字符串后方，超出则舍弃，不够则重复添加至达到目标超度

   12. `String.prototype.padStart(targetLength , padString)`
      将padString补充在当前字符串前方，超出则舍弃，不够则重复添加至达到目标超度

   13. `String.prototype.repeat(count)`
      返回将当前字符串复制count次并拼接起来的新字符串


   14. `String.prototype.replace(regexp|substr, newSubStr|function)`
      替换对应第一个字符串或正则表达式匹配项为新的字符串或用函数修改，返回新的字符串

   15. `String.prototype.replaceAll(regexp|substr, newSubstr|function)`
      替换对应字符串或正则表达式匹配项为新的字符串或用函数修改，返回新的字符串

   16. `String.prototype.search(regexp)`
      返回正则表达式在字符串中首次匹配项的索引

   17. `String.prototype.slice(beginIndex, endIndex)`
      返回从开始索引到结束索引之间的字符串

   18. `String.prototype.split(separator, limit)`
      根据分隔符（字符串或正则表达式）将字符串分割成字符串片段，并返回对应限制数量片段的数组

   19. `String.prototype.startsWith(searchString, startIndex)`
      判断当前字符串对应索引是否是以目标字符串开头，返回布尔值

   20. `String.prototype.substring(startIndex, endIndex)`
      返回从开始索引到结束索引之间的字符串
      >类似`slice()`方法，参数为负或其他时有不同 

   21. `String.prototype.toLowerCase()`
      返回字符串的小写形式，但不改变原字符串

   22. `String.prototype.toUpperCase()`
      返回字符串的大写形式，但不改变原字符串

   23. `String.prototype.trim()`
      返回字符串删除两端的空白的形式，但不改变原字符串

   24. `String.prototype.trimRight()`和`String.prototype.trimEnd()`
      返回字符串删除后方的空白的形式，但不改变原字符串

   25. `String.prototype.trimLeft()`和`String.prototype.trimStart()`
      返回字符串删除前方的空白的形式，但不改变原字符串


   26. `String.prototype.charCodeAt(index)`
      根据索引号返回对应字符的UTF-16编码？

   27. `String.prototype.codePointAt(index)`
      返回一个Unicode 编码点值的非负整数？


   28. `String.prototype.toLocaleLowerCase()`
   29. `String.prototype.toLocaleUpperCase()`
      返回本地主机语言环境把字符串转换为大小写格式字符串


## RegExp 对象
见文档[regular-expressions-learningnote](./regular-expressions-learningnote.md)



## Date 对象

1. 构造函数(四种形式)
   ```js
   new Date();
   new Date(value);
   new Date(dateString);
   new Date(year, monthIndex [, day [, hours [, minutes [, seconds [,   milliseconds]]]]]);
   ```
   不加参数表示当前时间，可以使用一个时间戳(自 1970 年 1 月 1 日 00:00:00 UTC（the Unix epoch）以来的毫秒数)或者一个日期字符串或者多个参数

2. 构造对象上的方法
   1. `Date.now()`
      返回自 1970 年 1 月 1 日 00:00:00 (UTC) 到当前时间的毫秒数(时间戳)

   2. `Date.parse(dateString)`
      将一个日期字符串转化为一个时间戳

   3. `Date.UTC(year,month[,date[,hrs[,min[,sec[,ms]]]]])`
      将参数转化为时间戳

3. 原型对象上的方法
   
   1. `Date.prototype.getTime()`  
      `Date.prototype.valueOf()`  
      返回时间戳
   2. `Date.prototype.setTime()`
      设置时间戳
   3. `Date.prototype.getFullYear()`  
      `Date.prototype.getMonth()`  
      `Date.prototype.getDate()`  
      `Date.prototype.getHours()`  
      `Date.prototype.getMinutes()`  
      `Date.prototype.getSeconds()`  
      `Date.prototype.getMilliseconds()`  
      `Date.prototype.getDay()`  
      返回以本地时间返回年月日时分秒毫秒和星期
      >月是以0-11代表1月到12月，星期是以0-6代表周天到周六
   4. `Date.prototype.getUTCFullYear()`  
      `Date.prototype.getUTCMonth()`  
      `Date.prototype.getUTCDate()`  
      `Date.prototype.getUTCHours()`  
      `Date.prototype.getUTCMinutes()`  
      `Date.prototype.getUTCSeconds()`  
      `Date.prototype.getUTCMilliseconds()`  
      `Date.prototype.getUTCDay()`  
      返回以世界时返回年月日时分秒毫秒和星期
   5. `Date.prototype.getTimezoneOffset()`
      返回协调世界时（UTC）相对于当前时区的时间差值，单位为分钟
   6. `Date.prototype.setFullYear(x)`  
      `Date.prototype.setMonth(x)`  
      `Date.prototype.setDate(x)`  
      `Date.prototype.setHours(x)`  
      `Date.prototype.setMinutes(x)`  
      `Date.prototype.setSeconds(x)`  
      `Date.prototype.setMilliseconds(x)`   
      根据本地时间设置年月日时分秒毫秒和星期
   7. `Date.prototype.setUTCFullYear(x)`  
      `Date.prototype.setUTCMonth(x)`  
      `Date.prototype.setUTCDate(x)`  
      `Date.prototype.setUTCHours(x)`  
      `Date.prototype.setUTCMinutes(x)`  
      `Date.prototype.setUTCSeconds(x)`  
      `Date.prototype.setUTCMilliseconds(x)`   
      根据世界时设置年月日时分秒毫秒和星期
   8. 返回时间字符串:
      ```js
      Date.prototype.toString()
      //Tue Aug 19 1975 23:15:30 GMT+0800 (中国标准时间)

      Date.prototype.toDateString()
      //Wed Jul 28 1993

      Date.prototype.toTimeString()
      //23:15:30 GMT+0800 (中国标准时间)

      Date.prototype.toUTCString()
      //Wed, 14 Jun 2017 07:00:00 GMT

      Date.prototype.toISOString()
      //2011-10-05T14:48:00.000Z

      Date.prototype.toJSON()
      //1975-08-19T23:15:30.000Z

      Date.prototype.toLocaleString()
      Date.prototype.toLocaleDateString()
      Date.prototype.toLocaleTimeString()
      //根据本地化设置返回时间字符串
      ```


## Error 对象

1. 构造函数： 
   ```js
   new Error(message, fileName,lineNumber)
   ```
   message为错误信息,fileName为代码所在文件，lineNumber为代码所在行号

2. 子类：
   ```js
   new EvalError()  // eval错误
   new RangeError() // 范围错误
   new ReferenceError() // 引用错误
   new SyntaxError() // 语法错误
   new TypeError()  // 类型错误
   new URIError() // URI错误
   ```

3. 通用属性：
   1. `Error.prototype.name`错误名称，默认为`Error`
   2. `Error.prototype.message`错误信息
   3. `Error.prototype.stack`错误堆栈，记录错误的文件位置和行号等信息
   4. `Error.prototype.fileName`错误的文件位置
   5. `Error.prototype.lineNumber`错误的行号


## Math 对象

1. 属性 
   1. `Math.PI`圆周率,3.14159
   2. `Math.E`欧拉常数 e,2.718
   3. `Math.LN2`2 的自然对数,0.693
   4. `Math.LN10`10 的自然对数,2.303
   5. `Math.LOG2E`以 2 为底的 e 的对数，1.443
   6. `Math.LOG10E`以 10 为底的 e 的对数，0.434
   7. `Math.SQRT2`根号 2，1.414
   8. `Math.SQRT1_2`2 分之根号 2，0.707

2. 构造对象上的方法
   1. `Math.abs(x)`返回数字x的绝对值
   2. `Math.max(...x)`返回数字x中的最大值，参数无法转化为数字则返回NaN，无参数则返回Infinity
   3. `Math.min(...x)`返回数字x中的最小值
   4. `Math.random()`返回一个0~1之间的浮点数
   5. `Math.ceil(x)`返回数字x的向上取整
   6. `Math.floor(x)`返回数字x的向下取整
   7. `Math.round(x)`返回数字x四舍五入的整数
   8. `Math.pow(base,exponent)`求底数的指数幂
   9.  `Math.sign(x)`返回数字x的正负(1,-1,0,-0,NaN)
   10. `Math.sqrt(x)`返回数字x的平方
   11. `Math.cbrt(x)`返回数字x的立方
   12. 正反三角函数，对数......查文档补充



## Number 对象 ---待写




## Symbol 对象

1. 属性
   1. `Symbol.prototype.description`变量的描述字符串

2. 方法
   1. `Symbol(description)`
      生成一个唯一的symbol类型的变量

   2. `Symbol.for(key)`
      根据key值在全局注册表中注册一个symbol类型对象，如果存在，则返回此对象
      >key值也会作为此symbol对象的描述字符串
      >`Symbol()`方法并不会在全局注册表中注册，所以生成的变量没有key值也不能用`keyFor()`方法查询

   3. `Symbol.keyFor(symbolObj)`
      返回symbol类型对象在全局注册表中的key值

3. 内置的Symbol相关属性
   内置Symbol属性用于定义或修改一些默认行为，详细查文档

   1. `Object.prototype[Symbol.iterator]`定义迭代方法，被for/of语句调用

   2. `Object.prototype[Symbol.hasInstance]`被instance语句调用，一般为类下的静态方法
   
   3. `Object.prototype[Symbol.isConcatSpreadable]`布尔值，定义对象被`Array.prototype.concat()`作为参数调用时时是否可以展开
   
   4. `Object[Symbol.species]`getter函数属性，函数返回值定义其衍生对象的父类，在如`Array.prototype.map()`等方法返回默认构造函数时调用，一般为类下的静态getter方法
   
   5. `RegExp.prototype[Symbol.match]`函数属性，当正则对象作为`String.prototype.match()`方法的参数调用时执行次函数，将调用方法的字符串实例作为此方法的第一个实参，返回值作为结果

   6. `RegExp.prototype[Symbol.matchAll]`函数属性，当正则对象作为`String.prototype.matchAll()`方法的参数调用时执行此函数，将调用方法的字符串实例作为此方法的第一个实参，返回值作为结果

   7. `RegExp.prototype[Symbol.replace]`函数属性，当正则对象作为`String.prototype.replace()`方法的参数调用时执行此函数，将调用方法的字符串实例作为此方法的第一个实参，返回值作为结果

   8. `RegExp.prototype[Symbol.search]`函数属性，当正则对象作为`String.prototype.search()`方法的参数调用时执行此函数，将调用方法的字符串实例作为此方法的第一个实参，返回值作为结果

   9. `RegExp.prototype[Symbol.split]`函数属性，当正则对象作为`String.prototype.split()`方法的参数调用时执行此函数，将调用方法的字符串实例作为此方法的第一个实参，返回值作为结果

   10. `Object.prototype[Symbol.toPrimitive]`函数属性，返回值为对象参与运算时被强制转换的值，接收一个参数有三个可选值(number、string、default)对应对象被作为数字、字符串、既可数字又可字符串参与运算
   
   11. `Object.prototype[Symbol.toStringTag]`getter函数属性，返回值为对象被`Object.prototype.toString.call()`方法调用后返回的字符串的第二段，一般定义类型

   12. `Object.prototype[Symbol.unscopables]`对象属性，以此对象的所有属性名为属性名，属性值为布尔值，规定在对象被`with`语句调用扩展作用域链时，对应的属性是否有效

   13. `Object.prototype[Symbol.asyncIterator]`函数属性，返回一个异步遍历器，被`for await/of`语句（ES9）调用
















## Promise 对象
见文档[Promise Learning](promise-learningnote.md)



## 遍历(迭代)、迭代器

1. `for/in` 和 `for/of`
   - for/in 
      特点：(用于遍历普通对象)
      1. 遍历对象及其原型链上的所有除Symbol外可枚举属性名(key)
      2. 遍历顺序可能不按数组的内部顺序
      3. 遍历得到的键名(key)为字符串类型
      4. 不能用break、continue，return不能返回外层


   - for/of 
      特点:(用于遍历可迭代对象,原生可迭代对象的原生迭代器)
      1. 遍历得到的是属性值(value)
      2. 只能用于部署了Symbol.iterator属性的对象

2. 可迭代对象和迭代器iterator

   可迭代对象下必须部署`[Symbol.iterator]`属性，属性为一个函数，返回一个迭代器

   迭代器上必须存在`next()`方法，调用后迭代至下一项，返回一个包含value和done属性的对象



   模拟可迭代对象：
   ```js
   const obj = {
     [Symbol.iterator] : function () {
       return {
         next: function () {
           return {
             value: 1,
             done: true
           };
         }
       };
     }
   };

   ```


3. 原生的可迭代对象相关方法
   1. `Array|TypedArray|String|Map|`Set.prototype[Symbol.iterator]()``
      返回包含键值的迭代器
      >注意：此方法要调用后获取返回值为迭代器，不是属性

   2. `Array.prototype.keys()`
      返回包含键名的迭代器
         
   3. `Array.prototype.values()`
      返回包含键值的迭代器
      >同`Array.prototype[Symbol.iterator]()`

   4. `Array.prototype.entries()`
      返回包含键名和键值的迭代器



## 生成器和异步执行的实现

1. 生成器函数
   1. `function*`
      定义一个生成器函数，返回一个Generator对象
      >生成器函数可以用于部署迭代器
      >生成器函数中直接使用this和普通函数一样指向调用者(一般为window)，但是生成器函数总会返回一个生成器对象
      >构造函数要求返回一个实例对象，所以不能将生成器函数用作构造函数执行new操作符
      >通过函数下的call()方法改变this指向为生成器函数的原型对象后并封装在一个函数的返回值中后，封装函数可用于构造函数
      ```js
      function* gen() {
        this.a = 1;
        yield this.b = 2;
        yield this.c = 3;
      }
      function F() {
        return gen.call(gen.prototype);
      }
      var f = new F();
      f.next();  // Object {value: 2, done: false}
      f.next();  // Object {value: 3, done: false}
      f.next();  // Object {value: undefined, done: true}
      f.a // 1
      f.b // 2
      f.c // 3
      ```

   2. `yield`语句和`yield*`语句
      `yield`语句用于生成器函数每一次迭代执行（next()、throw()、return()方法的调用）的分隔以及定义迭代结果对象的value值
      `yield*`语句用于迭代嵌套，后方放可迭代对象可迭代该对象的内部值

   3. `return`语句
      `return`语句用于结束迭代，并定义迭代结果对象的value值


2. `Generator`生成器对象对象下的方法：
   1. `Generator.prototype.next(value)`
      表示进行入下一步，value作为上一个yield的左值传递给生成器函数，返回迭代结果的对象
      >迭代结果的对象包括两个属性：
      >value:当前yield的右值
      >done:遍历是否结束

   2. `Generator.prototype.return(value)`
      表示生成器进入完成状态，返回迭代结果的对象，如果不传入value值则为undefined,
      >调用此方法会结束迭代,注意：如果`return()`方法对应的`yield`语句在`try/catch`块中，调用会使生成器函数进入`finally`块中

   3. `Generator.prototype.throw(exception)`
      向生成器内部抛出异常，在生成器内部可以用try/catch语句捕获处理，返回迭代结果的对象
      >exception为错误实例
      >调用此方法同样会进行一次迭代，并且不影响后续迭代

3. Thunk函数和Promise封装
   
   Thunk函数将多参数函数封装成返回值为单参数为回调函数的函数
   ```js
   // 正常版本的readFile（多参数版本）
   fs.readFile(fileName, callback);

   // Thunk版本的readFile（单参数版本）
   var Thunk = function (fileName) {
     return function (callback) {
       return fs.readFile(fileName, callback);
     };
   };
   ```


   将Tunck函数作为yield语句的右值可以让生成器调用next()方法时获取此Thunk函数，然后执行此Thunk函数将执行后的结果传入下一个next()方法，就可以实现异步代码同步执行的模型

   同理，将异步任务封装在一个Promise对象中，作为yield语句的右值让生成器调用next()方法时获取此Promise对象，然后等待promise对象中的异步任务执行完毕后，调用then()方法中的resolve函数获取结果并传入下一个next()方法，也可以实现异步代码同步执行

4. co模块
   co模块可以实现生成器的自执行  
   co模块的核心思路：
   ```js
   var gen = function* (){
      //readFile为promise封装
     var f1 = yield readFile('/etc/fstab');
     var f2 = yield readFile('/etc/shells');
   };
   co(gen);
   function co(gen){
      let generator=gen()
      function next(result){
         if(result) return;
         result.value.then(v=>{
            next(generator.next(v))
         });
      }
      next(generator.next());
   };
   ```
   这就是async函数和await语句的雏形
   并且，co模块可以处理并发的异步操作，需要把多个异步任务封装成对象或数组放入yield语句右值



## async函数和await语句

   async函数和await语句就是生成器函数的语法糖

   async函数返回一个Promise对象，async函数中的返回值作为返回对象的then方法的resolve函数参数



   >注意：
   >1. await命令后面的Promise对象，运行结果可能是rejected，所以最好把await命令放在try...catch代码块中
   >2. 多个await命令后面的异步操作，如果不存在继发关系，最好让它们同时触发
   >3. await命令只能用在async函数之中
   >4. async函数可以保留运行堆栈(错误堆栈)

   顶层await（ES2022）用于ES6模块的异步加载






## 模块化
1. 发展历史：
   AMD require.js  浏览器
   CMD sea.js  
   CommonJS Node.js  服务端
   UMD  
   [自写简易模块管理系统](./my-module.js)

2. ES6模块化
   1. 特点：
      1. 强制使用严格模式
      2. 后加载（所有模块全部加载解析完毕后执行，且语句必须放在顶层）
         >所以可以多次加载，但是只执行一次
         >(CommonJS 为运行时加载，可以放在代码块中)
      3. 实时动态(CommonJS 则是静态)
         >可以获取模块内部动态的值

   2. 语法：
      ```js
      //按需导入
      export { foo , boo as myboo }
      import { foo as myfoo , myboo } from 'url'

      //全部加载
      import * as foo from 'url'

      //默认加载
      export default foo
      import foo from 'url'

      //混合加载写法
      import foo,{ boo as myboo } from 'url'

      //先导入后导出的混合写法
      export foo from 'url'
      ```
      `import(url)`函数(ES2020)返回一个Promise对象实现异步加载

3. CommonJS,Sea.js










## Set 对象

特点：不能放同样的数据（NaN为一个值，内容相同的对象为不同的值）

1. 构造函数
   ```js
   new Set(iterable)
   ```
   可以放入一个可迭代对象，构造函数会将可迭代对象的所有值都压入新的set实例对象

2. 属性：
   1. `Set.prototype.size`元素个数

3. 方法：
   1. `Set.prototype.add(value)`
      向队尾添加一个指定值，返回本身实例对象
      >可链式调用

   2. `Set.prototype.clear()`
      清空对象中的所有元素

   3. `Set.prototype.delete(value)`
      删除指定的元素，返回布尔值，表示是否删除成功

   4. `Set.prototype.forEach(callback(currentValue,currentKey,set),thisArg)`
      根据元素插入顺序，对每一项执行回调函数，并返回undefined
      thisArg为回调中this的指向
      >set对象没有索引，所以currentValue和currentKey相同

   5. `Set.prototype.has(value)`
      返回一个布尔值表示对象中是否有对应值的元素

   6. `Set.prototype.entries()`
      返回value值为元素`[value,value]`的迭代器对象，迭代顺序为元素插入顺序

   7. `Set.prototype.values()`、`Set.prototype.keys()`
      返回value值为每个元素的迭代器对象，迭代顺序为元素插入顺序

4. 技巧用法：
   1. 数组去重：
      ```js
      [...new Set(array)]
      ```

   2. 字符串去重：
      ```js
      [...new Set('ababbc')].join('')
      ```

##  WeakSet对象
特点：不能放相同的数据，且其中元素只能是对象类型，并且对数据弱引用
弱引用：垃圾回收机制不考虑WeakSet对该对象的引用，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于WeakSet之中
>弱引用对象是不能遍历的，因为随时可能消失

1. 方法：（Set中只有三个方法能调用）
   1. `WeakSet.prototype.add(value)`
   2. `WeakSet.prototype.delete(value)`
   3. `WeakSet.prototype.has(value)`

## Map 对象
对象中的键名只能是String类型或Symbol类型
特点：可将任意值作为键名，且记住插入顺序

1. 构造函数:
   ```js
   new Map([iterable])
   ```
   iterable为可迭代对象，其中的值为包含键名和键值的长度为2的数组，以数组为例
   ```js
   new Map([[1, 'one'],[2, 'two']])
   ```


2. 属性：

   1. `Map.prototype.size`成员数量


2. 方法：


   1. `Map.prototype.set(key, value)`
      添加新成员，返回Map实例对象
   
   2. `Map.prototype.get(key)`
      返回对应key成员的value值，找不到返回undefined

   3. `Map.prototype.has(key)`
      返回布尔值，表示是否存在对应key的成员

   5. `Map.prototype.delete(key)`
      移除 Map 对象中指定的元素，返回布尔值表示成功或失败

   4. `Map.prototype.clear()`
      移除 Map 对象中的所有元素，返回undefined

   6. `Map.prototype.forEach(callback(currentValue,currentKey,map),thisArg)`
      根据元素插入顺序，对每一项执行回调函数，并返回undefined
      thisArg为回调中this的指向

   7. `Map.prototype.keys()`
      返回value值为元素key的迭代器对象，迭代顺序为元素插入顺序

   8. `Map.prototype.values()`
      返回value值为元素value的迭代器对象，迭代顺序为元素插入顺序

   9. `Map.prototype.entries()`
      返回value值为元素`[key, value]`的迭代器对象，迭代顺序为元素插入顺序




## WeakMap 对象
特点：键名必须为对象，对键名进行弱引用，而键值为正常引用
用途：dom节点作为键名

1. 方法

   1. `WeakMap.prototype.set(key, value)`
      添加新成员，返回WeakMap实例对象

   2. `WeakMap.prototype.get(key)`
      返回对应key成员的value值，找不到返回undefined

   3. `WeakMap.prototype.has(key)`
      返回布尔值，表示是否存在对应key的成员

   4. `WeakMap.prototype.delete(key)`
      移除WeakMap对象中指定的元素，返回布尔值表示成功或失败











## 扩展

WeakRef（ES2021）、FinalizationRegistry（ES2021）

