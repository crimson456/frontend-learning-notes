# HTML Learning

## 一.头部常用标签及其属性

1. `<head>`头部容器标签

2. `<meta>`元数据标签（网页爬虫会爬取其中的数据，部分内容会在搜索页面中展示）  
    属性如下：
    * charset：指定网页字符集
    * content：指定数据名称
    * http-equiv: 可以用于网页定时刷新或重定向
    * name：指定数据内容 

    常用用法：  
    `<meta name="xxx" content="xxx">`，常用的name值如下：详见[官方文档](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/meta/name)
    * name为keywords，提供网页搜索的关键字，用逗号分隔
    * name为description，提供网页搜索的页面描述
    * name为author，定义页面的作者
    * name为viewport，为viewport（视口）的初始大小提供指示（hint）。目前仅用于移动设备。
        `<meta name="viewport" content="width=device-width, initial-scale=1.0" />`完美视口

    `<meta http-equiv="refresh" content="30">`    
    每隔三十秒刷新

    `<meta http-equiv="refresh" content="3;url=https://www.mozilla.org">`  
    三秒后重定向到指定地址

3. `<title></title>`标签：定义标题
   
4. `<link></link>`外部资源链接
    * 引入CSS文件`<link href="style.css" rel="stylesheet">`
    * href:src
    * media：媒体类型，可选值：all,screen,print......





5. `<style></style>`内部css标签
   * media：媒体类型，可选值：all,screen,print......
   * type:规定样式表的 MIME 类型
6. `<script></script>`
   * src
   * type：
   * defer:整个文件解析完成后执行 



## 二.结构常用标签和属性
1. `<h1></h1>`~`<h6></h6>`六级标题标签  
2. `<p>`段落标签,块级元素  
    注意：p标签中不能放块级元素，如放入则浏览器会进行修正，会对页面结构有影响  
3. `<br>`换行标签
4. 结构化语义标签：（不常用，都可以用div标签代替）  
    * `<header></header>`头部标签  
    * `<main></main>`主体标签，只能有一个  
    * `<footer></footer>`底部标签  
    * `<nav></nav>`导航标签  
    * `<aside></aside>`侧边栏标签  
    * `<article></article>`独立的文章标签  
    * `<section></section>`独立的部分标签  
5. 列表标签：  
   * `<ul></ul>`无序列表    
   * `<ol></ol>`有序列表  
   * `<li></li>`列表项  
   * `<dl></dl>`包含术语定义以及描述的列表(这三个标签组合使用)  
   * `<dt></dt>`术语定义  
   * `<dd></dd>`术语描述(术语的定义和描述都可以多条)  
6. 表单标签：(详细查文档)
   * `<form></form>`整个表单外标签
       * action：表单提交地址
            也可以写入js代码，同`<a>`标签的herf属性
   * `<input>`输入框
       * type：
            * text 文本框
            * password 密码框
            * radio 单选按钮
            * checkbox 复选按钮 
            * submit 提交按钮
            * file 从系统中选择文件
        * name: 输入框的名字
        * value：输入框的值
        * placeholder：输入框的提示信息
        * checked：默认选中
        * readonly:只读
        * autofocus：自动获取焦点
        * disabled：禁用
   * `<select></select>`下拉菜单列表外标签
   * `<option></option>`下拉菜单选项标签
   * `<optgroup></optgroup>`单个下拉菜单中的选项组，会出现在菜单项中(不常用)
   * `<label></label>`为`<input>`标签添加鼠标可点的一段关联文字
       * for:绑定元素的id
       * form:所属表单的id
       * 两种用法，①添加for属性绑定对应`<input>`id，②将绑定的`<input>`元素放在`<label></label>`标签内
   * `<textarea>`多行文本输入控件
       * rows:高度行数
       * cols:宽度
       * maxlength:最大字符数
       * autofocus
       * disabled
       * name
       * placeholder
       * readonly
       * required
       * form：所属表单的id，多个表单?
       * wrap:?
   * `<fieldset></fieldset>` 标签可以将表单内的相关元素分组，并且添加边框和标题
        * disabled:该组中的相关表单元素应该被禁用
        * form:所属表单的id
        * name
   * `<legend></legend>`标签为`<fieldset>`标签添加标题
   * `<></>`
   * `<></>`
   * 各项例子：
        ```html
        <form action="">
        <!-- 文本框-->
        <input type="text" name="firstname">

        <!-- 密码框  -->
        <input type="password" name="pwd">

        <!-- 单选框 -->
        <input type="radio" name="sex" value="male">男<br>
        <input type="radio" name="sex" value="female">女
        <!-- 复选框 -->
        <input type="checkbox" name="vehicle" value="Bike">我喜欢自行车<br>
        <input type="checkbox" name="vehicle" value="Car">我喜欢小汽车
        <!-- 提交框 -->
        <input type="submit" value="Submit">
        </form>
        ```
        


7. 表格标签：
   * `<table></table>`整个表格外标签
   * `<tr></tr>`表格中的一行
   * `<td></td>`表格中的一项
   * `<th></th>`表头中的一项
   * `<caption></caption>`表格的标题
   * `<thead></thead>`表格的表头部分 
   * `<tbody></tbody>`表格的主体部分
   * `<tfoot></tfoot>`表头的页脚部分
   * `<></>`

8. 



9.  `<></>`
10. `<></>`
11. `<></>`
12. `<></>`
13. `<></>`
14. `<></>`

## 三.常用内容标签和属性
1. `<a></a>`链接标签  
    * href：可以是一个url地址也可以是一个当前html的元素id   
        还可以是js代码,eg.
        ```html
        <!-- 格式为  javascript:js代码  并且代码作为单行处理，语句间要加分号，注释必须用/**/ -->
        <a href="javascript:window.alert('123')">alert 123</a>
        ```
        
    * target：(可以用于新链接的打开方式)  
        * _self 从当前页面打开
        * _blank 从新的标签页打开
2. `<img>`图片标签
    * src：图片的url
    * alt：文本描述，用于无法加载时显示
    * width/height：图片宽高像素值
    * 

3. `<iframe></iframe>`内联框架(网页内展示其他网页)
    * src：框架内网页的地址
    * width/height：框架的宽高像素值
    * frameborder:指定边框宽度，默认为1，为0时无边框（废弃，建议用css属性border代替）
4. `<audio></audio>`和`<video></video>`音频视频标签
    * src：音频视频的url
    * controls：是否显示控件
    * autoplay: 是否自动播放
    * loop：是否循环播放
    * muted：是否静音
    * 标签内可以放入`<source>`标签、`<embed>`标签和不兼容时显示的文字
5. `<source>`为音频视频标签提供多种数据源以来解决浏览器兼容的问题
    * src：音频视频的url
    * type：数据源的类型（MIME-type）
6. `<embed>`用于兼容ie8之前的浏览器，类似`<source>`（不常用）
7. `<></>`
8. `<></>`
9. `<></>`
10. `<></>`
11. `<></>`



## 四.文本处理常用标签


1. 斜体：  
    * `<i></i>`普通斜体标签  
    * `<em></em>`强调的文本，默认呈现为斜体  
    
2. 粗体：  
    * `<b></b>`普通粗体标签  
    * `<strong></strong>`更强的强调，默认呈现为粗体  
    
3. 引用：  
    * `<blockquote></blockquote>`块级引用标签，下面可以跟`<p>`,`<footer>`,`<cite>`等标签
    * `<q></q>`行内引用标签  
    * 这两个标签都有cite属性指明数据源的url  
    * `<cite></cite>`定义引用的作品
4. 文本中间加横杠(区分语义)：
    * `<del></del>`已删除文本标签
    * `<s></s>`无用文本标签
5. `<abbr></abbr>`缩写标签
    * title：指明全称   
6. `<mark></mark>`高亮标签

7. 文本下划线：
    * `<ins></ins>`新插入文本标签
    * `<u></u>`无语义
8.  `<small></small>`小号文本标签
9.  `<pre></pre>`原格式输出包裹内容，保留空格，换行等，不包括字符实体，可以用来包裹多行代码  
10. 代码类：
    * `<code></code>`代码片段标签
    * `<kbd></kbd>`键盘输入的内容标签
    * `<var></var>`用于标记变量
    * `<samp></samp>`用于标记程序输出内容
11. `<></>`
12. `<></>`
13. `<></>`
14. `<></>`
15. `<></>`
16. `<></>`




## 字符实体

html 文件中会把多余的空格缩减，并且不能正常使用大于小于符号，因为会与标签冲突  
常见的字符实体还有拼英，一些键盘上不存在的符号，音标等等

用法：`&实体名称`或`&#实体编号`  

常用的字符实体：  

| 显示结果 |    描述     | 实体名称  | 实体编号  |
| :------: | :---------: | :-------: | :-------: |
|          |    空格     | `&nbsp;`  | `&#160;`  |
|    <     |   小于号    |  `&lt;`   |  `&#60;`  |
|    >     |   大于号    |  `&gt;`   |  `&#62;`  |
|    &     |    和号     |  `&amp;`  |  `&#38;`  |
|    ¥     | 人民币/日元 |  `&yen;`  | `&#165;`  |
|    ©     |    版权     | `&copy;`  | ` &#169;` |
|    ®     |  注册商标   |  `&reg;`  | ` &#174;` |
|    ™     |    商标     | `&trade;` | `&#8482;` |


















## 拓展
1. 标签添加`contenteditable="true"`属性可以让用户可以编辑页面上的元素，点击即可插入光标
2. 标签添加`draggable="true"`属性可以使元素被拖动并且被拖动事件监听
