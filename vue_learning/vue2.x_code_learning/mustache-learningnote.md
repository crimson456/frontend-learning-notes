# Mustache.js Learning 

## token

token为一个数组:
[type,content,start,end,children,...]
- type:可能为name text # ^ / & 
- content：内容
- start：开始的位置
- end：结束的位置
- children：数组，子tokens

## 重要的类

1. Scanner类 用于扫描读取的模板，生成tokens
   1. 实例属性
      - string 扫描的模板
      - tail 还未扫描的模板
      - pos 扫描到的位置
   2. 实例方法
      - `eos()` (end of string)用于判断是否扫描结束(tail为空)
      - `scan(regexp)` 扫描并让指针跳过对应正则，返回正则匹配的内容
      - `scanUntil(regexp)` 扫描到指定正则之前，返回扫到的内容




2. Writer类 用于控制整个流程,包括将tokens渲染成最终的结果
   1. 构造函数：创建templateCache对象用于缓存
   2. 实例方法

      - `clearCache()` 清除缓存
      - `parse()`：查找是否有缓存的tokens，如果没有调用`parseTemplate()`生成tokens并缓存

      - `render()`：
      - `renderTokens()`：根据tokens中不同种类的token渲染成字符串并拼接在一起
      - `renderSection`、`renderInverted`、`indentPartial`、`renderPartial`、`unescapedValue`、`escapedValue`、`rawValue`：封装用于处理不同类型token的逻辑，返回处理后的字符串


 



3. Context类  处理数据渲染中的对象深层读取问题(如view[a.b.c]无法读取)
   1. 构造函数 将要渲染的数据创建为Context对象
   2. 实例方法
      - push() 用于创建子上下文
      - lookup(name) 从要渲染的数据中读出对应的值




## 重要函数

1. `parseTemplate()` 将模板转化为tokens

   - 处理开始和结束的tag:默认为`{{`、`}}`
   - 转化原始tokens，其中扫描辨别不同类型的token
     >原始tokens:没有折叠循环等
   - 处理循环语法不全的问题(openSection)
   - 调用`stripSpace()`处理空白
   - 调用`squashTokens(tokens)`合并连续文本token
   - 调用`nestTokens(tokens)`折叠tokens

   >获取普通token主要过程要依次执行：scanUtil('{{')、scan('{{')、scanUtil('}}')、scan('}}')


2. `squashTokens(tokens)` 将原始tokens中连续的text类型token合并为一个

3. `nestTokens(tokens)` 将原始tokens折叠(处理嵌套结构)
    其中用栈的方式处理tokens的层叠问题，通过判断类型来出入栈，并用一个collector变量充当指向要存入位置的指针的处理层叠的结构




## 导出的mustache对象


```js
{
name: 'mustache.js',
version: '4.2.0',
tags: [ '{{', '}}' ],
clearCache: [Function: clearCache],    //Writer类实例的同名方法
escape: [Function: escapeHtml],        //暴露escape函数
parse: [Function: parse],              //Writer类实例的同名方法
render: [Function: render],            //Writer类实例的同名方法
Scanner: [Function: Scanner],          //暴露Scanner类
Context: [Function: Context],          //暴露Context类
Writer: [Function: Writer],            //暴露Writer类
templateCache: [Getter/Setter]
}
```



