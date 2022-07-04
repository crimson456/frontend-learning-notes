# BOM DOM Learning

## 客户端 js 顶级对象 window

1. 属性:

   1. `window.innerHeight`、`window.innerWidth`内容区宽高
   2. `window.outerHeight`、`window.outerWidth`外部宽高
   3. `window.scrollX`、`window.scrollY`滚动条滑动像素
   4. `window.pageXOffset`、`window.pageYOffset`别名，滚动条滑动像素
   5. `window.screenX`、`window.screenY`窗口距离屏幕的像素
   6. `window.screenLeft`、`window.screenTop`别名，窗口距离屏幕的像素

   7. `window.closed`窗口是否关闭
   8. `window.self`和`window.window`自身的 window 对象(window===self===window.self)
   9. `window.parent`父窗口的 window 对象，没有父窗口则为自身
   10. `window.top`顶层窗口的 window 对象
   11. `window.opener`源窗口的 window 对象
   12. `window.frames`所有直接子窗口的类数组对象（window===window.frames,可以通过索引值访问单个子窗口 window 对象）
   13. `window.frameElement`被嵌入窗口的 window 对象
   14. `window.length`自身子窗口数量
   15. ``

   16. `window.event`在事件处理函数中调用为事件对象，在全局调用为 undefined
   17. ``
   18. ``

   19. `window.location`访问 Location 对象(和`document.location`相同)
   20. `window.document`访问 Document 对象
   21. `window.history`访问 History 对象
   22. `window.navigator`访问 Navigator 对象
   23. `window.screen`访问 Screen 对象
   24. `window.console`访问 Console 对象

   25. `window.sessionStorage`
   26. `window.localStorage`

2. 方法：

   1. 定时器：

      1. `window.setTimeout(callback,delay,...params)`
         定时结束后执行回调函数,返回定时器的 id
         `delay`为延时毫秒数
         `params`为传递给回调函数的附加参数

      2. `window.clearTimeout(id)`
         根据 id 清除`setTimeout`定时器

      3. `window.setInterval(callback,delay,...params)`
         每隔一定时间后执行回调函数,返回定时器的 id

      4. `clearInterval(id)`
         根据 id 清除`setInterval`定时器

   2. 弹出框：

      1. `window.alert(message)`
         弹出警示框

      2. `window.confirm(message)`
         弹出有确定和取消的模态框，根据选择的确定或是取消返回布尔值

      3. `window.prompt(text, value)`
         弹出对话框，返回用户输入的字符串
         `text`为提示文字
         `value`为默认输入值

   3. 窗口相关:

      1. `window.open(url,name,features)`
         根据 url，name 和 features 打开新窗口，返回新窗口的引用
         features 为描述打开窗口特性的字符串，详细见文档

      2. `window.close()`
         关闭一个用`open()`方法打开的窗口  
         只能关闭脚本打开的窗口

      3. `window.focus()`
         请求将窗口显示在前

      4. `window.blur()`
         将焦点移出顶层窗口

      5. `window.minimize()`
         最小化当前浏览器窗口(可通过 moveTo()方法还原)

      6. `window.moveBy(x,y)`
         移动当前窗口，x，y 为横纵坐标的变化值

      7. `window.moveTo(x,y)`
         移动当前窗口，x，y 为横纵坐标的最终值

      8. `window.resizeBy(x,y)`
         调整窗口大小，x，y 为横纵坐标的变化值

      9. `window.resizeTo(x,y)`
         调整窗口大小，x，y 为横纵坐标的最终值

      10. `window.scroll()`
          同`scrollTo()`方法相同

      11. `window.scrollBy(x,y)`或`window.scrollBy(options)`
          调整滚动条的位置，x，y 为横纵坐标的变化值

          > options 包含三个键值对：top（y 坐标）、left（x 坐标）、behavior（滚动的行为，如平滑或瞬时）

      12. `window.scrollTo(x,y)`或`window.scrollBy(options)`
          调整滚动条的位置，x，y 为横纵坐标的最终值

      13. `window.stop()`
          窗口停止加载

   4. `window.getComputedStyle(element, pseudoElement)`
      获取元素的最终样式,返回一个 CSSStyleDeclaration 对象(element.style.只读取内联样式)

   5. `window.getSelection()`
      返回一个 Selection 对象，对象下`toString()`方法可以返回用户选择的文本

      > 只有能返回主体的文本，无法获取 input、textarea 中的文本

   6. `window.print()`
      打开打印机选项预览当前页面
   7. `window.postMessage()`

## Location 对象

location 对象在 window 对象和 document 对象下

url 格式：
协议://用户名：密码@主机或域名：端口号/路径？参数键值对形式&隔开#片段锚点链接

1. 属性：

   1. `location.href`url
   2. `location.protocol`协议
   3. `location.host`主机名:端口号
   4. `location.hostname`主机名
   5. `location.port`端口号
   6. `location.pathname`路径
   7. `location.search`?参数&参数
   8. `location.hash`#哈希值
   9. `location.username`用户名
   10. `location.password`密码

2. 方法:

   1. `location.assign(url)`
      跳转到指定 url

   2. `location.reload()`
      刷新当前页面

   3. `location.replace(url)`
      跳转到指定 url 并且不保存当且页面到会话历史

   4. `location.toString()`
      返回 url

## History 对象

1. 属性

   1. `history.length`当前的 history 个数
   2. `history.scrollRestoration`在历史导航上默认滚动恢复行为
   3. `history.state`返回栈顶 state

2. 方法

   1. `history.back()`
      后退一页

   2. `history.forward`
      前进一页

   3. `history.go(n)`
      前进或后退指定页数

   4. `history.pushState()`
   5. `history.replaceState`

## Navigator 对象 history.

浏览器相关的属性和方法

1. 属性
   1. `navigator.appCodeName`浏览器代码名
   2. `navigator.appName`返回浏览器的名称
   3. `navigator.appVersion`返回浏览器的平台和版本信息
   4. `navigator.cookieEnabled`返回指明浏览器中是否启用 cookie 的布尔值
   5. `navigator.platform`返回运行浏览器的操作系统平台
   6. `navigator.userAgent` 返回由客户机发送服务器的 user-agent 头部的值
   7. `navigator.plugins`插件数组
   8. `navigator.onLine`返回浏览器当前是否联网
2. 方法

## Screen 对象

1. 属性
   1. ` screen.width``screen.height `屏幕的总宽高
   2. ` screen.availWidth``screen.availHeight `屏幕的可用宽高(不包括 windows 任务栏)
   3. `screen.colorDepth`色彩深度
   4. `screen.pixelDepth`屏幕的颜色分辨率

## sessionStorage 和 localStorage 对象

1. 属性

   1. `Storage.length`存储数据条数

2. 方法

   1. `Storage.key(n)`
      返回存储对象中第 n 个键的名称

   2. `Storage.getItem(keyname)`
      返回指定键的值

   3. `Storage.setItem(keyname, value)`
      添加键和值，如果对应的值存在，则更新该键对应的值

   4. `Storage.removeItem(keyname)`
      移除键

   5. `Storage.clear()`
      清除存储对象中所有的键

   6. 也可以通过`Storage.键名`进行操作

## Console 对象

1. 方法

   1. `console.log()`、`console.info()`、`console.warn()`、`console.error()`
      通用控制台输出，形式如下

      ```js
      console.log(obj1 [, obj2, ..., objN]);
      console.log(msg [, subst1, ..., substN]);
      console.log('String: %s, Int: %d,Float: %f, Object: %o', str, ints, floats, obj)
      console.log(`temp 的值为：${temp}`)
      ```

      可以使用替换字符串和模板字符串

   2. `console.dir()`
      输出树形结构，比如想显示函数对象结构时可用

   3. `console.dirxml(object)`
      输出 XML/HTML 元素的树形结构

   4. `console.assert(assertion,obj1[, obj2, ..., objN])`
      当 assertion 为假时，输出错误消息到控制台，assertion 为真则不输出

   5. `console.clear()`
      清空控制台

   6. `console.count(label)`
      每次输出 label 和对应的计数

   7. `console.countReset(label)`
      根据 label 重置 count 计数

   8. `console.debug()`
      输出调试级别消息

   9. `console.group()`
      为调试信息创建分组

   10. `console.groupCollapsed()`
       为调试信息创建折叠起来的分组

   11. `console.groupEnd()`
       结束分组

   12. `console.table(data,columns)`
       将数据以表格形式打印

   13. `console.time(timerName)`
       开启一个计时器，不输出，必须有一个计时器的名字

   14. `console.timeLog(timerName)`
       打印计时器的经过的时间

   15. `console.timeEnd(timerName)`
       结束计时并打印出经过的时间

   16. `console.trace([...any, ...data])`
       输出一个堆栈跟踪

## Document 文本对象 DOM

1. 属性

   1. `documentElement`返回根元素 html 元素
   2. `forms`返回所有表单对象的 HTMLCollection 对象
   3. `contenteditable`控制整个文档可否被用户编辑(`on`为可编辑，`off`（默认）为不可编辑)
   4. `styleSheets`通过引入或者嵌入文档中（通过 link 标签或者 style 标签）的样式表 CSSStyleSheet 或 StyleSheetList 对象
      > `CSSStyleSheet.cssRules`对应样式表中的规则，可以通过对象下的其他方法操作
   5. `readyState`描述文档加载状态，随文档加载变化，变化时触发`readystatechange`事件
      > 三个值:loading(正在加载)、interactive(可交互，文档解析完毕，资源还未加载)、complete(文档和所有资源都加载完毕)

2. 方法

   1. `querySelector(selectors)`
      根据选择器返回的第一个匹配的 Element 元素

   2. `querySelectorAll(selectors)`
      根据选择器返回所有匹配元素的 NodeList 类数组

   3. `getElementById(id)`
      根据 id 返回匹配 Element 元素

   4. `getElementsByClassName(classNames)`
      返回对应类名的元素的 HTMLCollection 类数组，类名用空格隔开

   5. `getElementsByName(name)`
      根据 name 属性值返回对应元素的 NodeList 类数组

   6. `getElementsByTagName(tag)`
      根据标签名返回对应元素的 HTMLCollection 类数组，`*`匹配所有标签

   7. `createElement(tagName,options)`
      根据标签名创建元素并返回，options 不常用查文档

   8. `creatTextNode(text)`
      创建一个文本节点并返回

   9. `createComment(text)`
      创建一个注释节点并返回

   10. `createDocumentFragment()`
       创建一个新的空白的文档片段

   11. ``

   12. ``

   13. ``

   14. ``

   15. ``

   16. ``

   17. ``

   18. ``

   19. ``

   20. `open()`
       老式 API，打开写入文档，清除所有事件监听器和节点

   21. `write(string)`、`writeIn(string)`
       老式 API，向文档中写入文本，后者多跟一个换行符

## Node 对象

1. 属性

   1. `parentNode`父节点
   2. `childNodes`子节点 NodeList 对象
   3. `firstChild`、`lastChild`第一个和最后一个子节点
   4. `nextSibling`、`previousSibling`前后的兄弟节点
   5. `nodeType`节点类型
   6. `nodeValue`Text 节点或 Comment 节点的文本内容
   7. `nodeName`元素节点标签名大写
   8. `textContent`节点及其后代的文本内容
   9. ``

2. 方法

   1. `cloneNode(deep)`
      返回调用节点的一个副本

      > deep 为可选参数，true 为深拷贝，false 为只拷贝自身

   2. `appendChild(node)`
      将指定节点添加到末尾处，如果已存在，则移动到新位置

   3. `insertBefore(newNode,referenceNode)`
      在父节点的参考节点前添加新节点并返回，如第二个参数不加，则和`appendChild()`方法相同

   4. `removeChild(node)`
      删除指定子节点

   5. `replaceChild(newChild, oldChild)`
      替换指定子节点

   6. ``

   7. ``

   8. `getRootNode()`
      获取根元素 document 对象，要获取 html 元素则需调用`document.documentElement`

   9. ``

   10. ``

   11. ``

   12. ``

compareDocumentPosition()
contains()

hasChildNodes()

isDefaultNamespace()
isEqualNode()
isSameNode()
lookupNamespaceURI()
lookupPrefix()
normalize()

## Element 对象

1. 属性

   1. `children`子元素节点 NodeList 对象
   2. `firstElementChild`、`lastElementChild`第一个和最后一个子元素
   3. `nextElementSibling`、`previousElementSibling`前后的兄弟元素
   4. `childElementCount`子元素的数量

   5. 定义在 HTMLElement 对象上的`dataset.驼峰命名`数据集属性可以对应 html 中元素的`data-`属性
   6. `attributes`返回所有属性的实时类数组
   7. `innerHTML`、`outerHTML`元素内部和外部的 HTML 文本
   8. 定义在 HTMLElement 对象上的`innerText`、`outerText`元素内部的普通文本

   9. `scrollTop`、`scrollLeft`元素自身(内部)的滚动条位置
   10. `scrollWidth`、`scrollHeight`元素内容的宽高，包括超出被遮挡部分

   11. `clientWidth`、`clientHeight`元素的内部宽度，包括 padding，不包括 border 和 margin（内联元素为 0）
   12. `clientTop`、`clientLeft`元素上边框和左边框的宽度，不包括内外边距（内联元素为 0）

   13. `HTMLElement.offsetHeight`、`HTMLElement.offsetWidth`元素的宽高，包括 padding 和 border，不包括 margin
   14. `HTMLElement.offsetTop`、`HTMLElement.offsetLeft`元素相对于上级定位元素内边距的偏移量
   15. `HTMLElement.offsetParent`上级定位元素
   16. ``
   17. `HTMLElement.style`元素的 CSSStyleDeclaration 对象，对象下的驼峰命名属性对应 CSS 中横杠命名的属性,并且其中的值为字符串且有些需要带单位

       > `HTMLElement.style.cssText`也可以直接修改属性或者获取内联属性

   18. `className`对应 HTML 中的 class 属性，多个用空格分开(因为 js 中 class 为定义类的关键字)
   19. `classList`对应 HTML 中的 class 属性的 DOMTokenList 对象

   20. ``

   21. ``

   22. ``

   23. ``

   24. ``

   25. ``

   26. ``

   27. ``

   28. ``

2. 方法

   1. `getAttribute(attributeName)`
      获取属性值
   2. `setAttribute(attributeName, value)`
      设置或更改属性值
   3. `hasAttribute(attributeName)`
      返回是否有属性的布尔值
   4. `removeAttribute(attributeName)`
      移除属性

   5. `insertAdjacentElement(position,element)`
      在元素的指定位置插入新元素

      > position 有四个值：beforebegin、afterbegin、beforeend、afterend

   6. `insertAdjacentHTML(position,text)`
      在元素的指定位置插入 html 文本

   7. `insertAdjacentText(position,text)`
      在元素的指定位置插入普通文本

   8. `getBoundingClientRect()`
      返回元素的 DOMRect 对象

      > DOMRect 对象包括 left、top、right、bottom、x、y、width 和 height

   9. `getClientRects()`
      用于内联元素获取其中的 DOMRect 对象集合

   10. `scrollIntoView(options)`
       滚动元素的父容器，使元素对用户可见

       > options 可以为布尔值，（默认 true 为顶部对齐，false 底部对齐)，或者为一个包含 behavior（过渡效果）、block（垂直对齐）、inline（水平对齐）的对象

   11. `scroll()`、`scrollBy()`、`scrollTo()`
       调整元素内滚动条的位置，同 window 下的同名方法类似

   12. ``
   13. ``
   14. ``
   15. ``
   16. ``
   17. ``
   18. ``
   19. ``

## HTMLxxxxElement 对象

1.  HTMLFormElement

    1.  `HTMLFormElement.submit()`提交表单但不触发 submit 事件处理，也不触发约束验证
    2.  `HTMLFormElement.reset()`重置表单

2.  1.

3.

## 事件和Event 事件对象

1. 监听事件:(以eventtype为例)

   1. 方式 1：
      `window.oneventtype(eventObject){}`
      > 注意事件类型全部小写
   2. 方式 2：

      1. `EventTarget.addEventListener(eventtype,listener(eventObject),options)`
         > 第三个参数 options 参数可能是一个布尔值代表跟是否捕获，也可能是一个参数对象，包含捕获，是否只调用一次和阻止默认行为的配置,一般不用加
         > 新版本会有第四个参数有关用户自定义事件
      2. `EventTarget.removeEventListener(eventtype, listener, options)`
      3. ``

   3. 方式 3：IE9 之前
      1. `EventTarget.attachEvent(oneventtype,handler)`
      2. `EventTarget.detachEvent(oneventtype,handler)`
         类似`addEventListener`，但不支持事件捕获

   > 区别：
   >
   > 1. addEventListener 可以定义多个事件处理函数按定义顺序执行，但是多次注册相同 的事件处理函数只会执行一次，而 attachEvent 会调用和定义次数相同的次数
   > 2. 前两种事件处理函数中 this 指向事件目标，而 attachEvent 指向 window 对象

2. 事件对象Event下的属性和方法
   事件对象Event一般在回调函数的第一参数

   1. 通用属性：

      1. `Event.prototype.target`
      2. `Event.prototype.currentTarget`
         >currentTarget事件沿着 DOM 触发时事件的当前目标。它总是指向事件绑定的元素，而 Event.target 则是事件触发的元素
      3. `Event.prototype.timeStamp`事件发生的时间戳
      4. `Event.prototype.type`事件类型
      5. `Event.prototype.eventPhase`事件发生阶段,0~4对应没被处理，捕获，抵达事件对象，冒泡四个阶段


   2. 通用方法:

      1. `eventObject.preventDefault()`阻止事件默认行为
      2. `eventObject.stopPropagation()`阻止当前事件的传播
      3. `eventObject.stopImmediatePropagation()`阻止当前事件的传播，并阻止监听同一事件所有监听器执行

   3. MouseEvent鼠标事件对象下的属性

      1. `altKey`、`ctrlKey`、`metaKey`、`shiftKey`鼠标事件触发时键盘对应辅助键是否按下，布尔值
      2. `button`、`buttons`鼠标事件触发时的鼠标按键（不可靠，因为用户可能修改鼠标配置）

   4. 鼠标滚轮事件对象下的属性
      1. 继承自鼠标事件
      2. `deltaX`、`deltaY`、`deltaZ`各方向滚动量（一般只有 Y 轴方向）
      3. `deltaMode`滚动量的单位
   5. 拖放事件对象++++
   6. 键盘事件对象下的属性
      1. `keyCode`按键值的 unicode 编码数字（非标准）
      2. `altKey`、`ctrlKey`、`metaKey`、`shiftKey`鼠标事件触发时键盘对应辅助键是否按下，布尔值
      3. `key`按键名字符串形式

3. 基本事件类型

   1. 文档加载：

      1. `DOMContentLoaded`文档 DOM 加载完毕而其他资源没有加载时触发(没有 0 级 DOM 事件处理)
      2. `load`文档相关资源全部加载完毕时触发
      3. `readystatechange`当`document.readyState`变化时触发
      4. ``
      5. ``
      6. ``

   2. 鼠标：

      1. `click`鼠标左键触发（设备的按钮在一个元素上按下和放开触发）
      2. `contextmenu`鼠标右键触发或键盘菜单键触发（打开上下文菜单前触发）
      3. `dblclick`双击鼠标左键触发
      4. `mousedown`鼠标任意键按下时触发
      5. `mouseup`鼠标任意键弹回时触发
         > 顺序:mousedown,mouseup,click 或 contextmenu,dblclick
      6. `mousemove`移动鼠标时触发
      7. `mouseover`鼠标进入元素时触发
      8. `mouseout`鼠标离开元素（进入子元素遮挡部分也为离开）或离开其子元素时触发
      9. `mouseenter`鼠标进入元素时触发，但不冒泡
      10. `mouseleave`鼠标离开元素（进入子元素遮挡部分也为离开）或离开其子元素时触发，但不冒泡
          > 出入子元素时会触发 mouseover、mouseout、mouseout 和 mouseleave
      11. `wheel`滚轮滚动时触发

   3. 拖放：需要将 html 元素 draggable 属性设置为 true

      1. `drag`拖动时连续触发
      2. `dragstart`拖动开始时触发
      3. `dragend`拖动结束时（松开鼠标按钮或按下 Esc 键）触发
      4. `dragover`拖动元素在有效目标区域上被拖动时连续触发
      5. `dragenter`拖动元素进入有效目标区域时触发
      6. `dragleave`拖动元素离开有效目标区域时触发
      7. `drop`拖动元素在有效目标区域上释放时触发(需要阻止 dragover 事件的默认行为才能触发)

   4. 键盘：

      1. `keydown`任意键盘键按下时触发
      2. `keyup`任意键盘键弹回时触发
      3. `keypress`任意键盘键(除 Shift、Fn、CapsLock)按下时持续触发

   5. 联网：

      1. `online`浏览器获得网络访问触发
      2. `offline`浏览器失去网络访问触发

   6. 聚焦：

      1. `focus`元素获得焦点触发（不冒泡）
      2. `blur`元素失去焦点触发（不冒泡）

   7. 表单：

      1. `reset`点击重置触发
      2. `submit`点击提交触发

   8. 视图：

      1. `resize`文档视图大小缩放触发
      2. `scroll`文档或者元素滚动条滚动触发
      3. `fullscreenchange`浏览器进入全屏或退出全屏触发
      4. `fullscreenerror`浏览器无法进入全屏触发

   9. 文本改变和剪贴板：

      1. `change`表单项内容改变时触发
      2. `cut`剪切触发
      3. `copy`复制触发
      4. `paste`粘贴触发

   10. 媒体：
      1. ``



   11. ajax进度:

      1. `readystatechange`readyState 改变时触发 
      7. `abort`xhr 对象调用`abort()`函数(终止请求)触发
      8. `error`请求遇到错误触发，如断网
      9. `load`xhr 对象请求完成时触发
      10. `loadend`加载进度停止之后被触发(error、abort、load事件之后)
      11. `loadstart`程序开始加载时触发
      12. `progress`请求接收到数据的时候被周期性触发
      13. `timeout`请求超时触发

   12. 其他：
      
       1.  `storage`存储区域被修改时触发


## 拓展

1. 在 html 文档中创建一个有 id 的元素，在不与其他变量名冲突的情况下，会被隐式声明在 window 对象下
2. 有些标签如`<a><form><frame>...`如果有 name 且不与其他变量名冲突的情况下，也会被隐式声明在 window 对象和 document 对象下，如果有重名，则属性会声明为一个 NodeList 对象
3. NodeList 和 HTMLCollection 类数组，前者是 Node 对象的集合，后者是 Element 对象的集合
4. DocumentFragment 对象是特殊 Node 节点，有类似 Node 节点的方法，是一片 Node 节点及其子孙节点的集合
5. iframe 元素可以通过`window[]`、`window.frames`、`getElementById()`访问属性，iframe 元素下的 contentWindow 可以访问框架下的 window 对象，contentDocument 可以访问框架下的 document 对象，不过由于同源策略，window 对象的属性基本都不能访问
