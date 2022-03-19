# Ajax Learning

### 一.创建一个请求对象
```javascript
const xhr = XMLHttpRequest();
```
***
### 二.xhr对象 状态码
每一个xhr实例下都存在一组状态码（0-5），用来描述请求的发送进行到了哪一步  
可以通过 `xhr.readyState` 获取当前状态码  
当状态码发生改变时会触发``
状态码的含义：
|值 |状态             |	   描述     |
|---|---             |   ---|
|0  |UNSENT          |	代理被创建，但尚未调用 open() 方法。|
|1	|OPENED          |	open() 方法已经被调用。|
|2	|HEADERS_RECEIVED|  send() 方法已经被调用，并且头部和状态已经可获得。|
|3	|LOADING         |	下载中； responseText 属性已经包含部分数据。|
|4	|DONE	         |   下载操作已完成。|
***
### 三.http请求报文和响应报文
1.请求报文(request)：  eg.
```
请求行      GET /serve HTTP/1.1
请求头      Host:atguigu.com
            Cookie:name=guigu
            Content-type:application/x-www-form-urlencoded
            User-Agent:chrome 83
空行
请求体      username=admin&password=admin
```
2.响应报文(response)：  
```
响应行      HTTP/1.1 200 OK
响应头      Content-Type: text/html; charset=utf-8
            Content-Length: 10
空行
响应体      <html>
                <head>   </head>
                <body>   </body>
            </html>
```

***
### 四.xhr对象发送请求
1.发送请求：
```
<button id="btn">点我</button>

const btn = document.querySelector('#btn')
const xhr = new XMLHttpRequest();
btn.addEventListener('click', () => {
    xhr.open('GET', 'http://127.0.0.1:8000/server')
    xhr.send()
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status >= 200 && xhr.status <= 300) {
                console.log(xhr.status)                     //响应状态码
                console.log(xhr.statusText)                 //响应状态字符串
                console.log(xhr.getAllResponseHeaders())    //响应所有响应头
                console.log(xhr.response)                   //响应体
            }else{
                console.log(请求发送失败)
            }
        } else {
        }
    }
})
```
http传输数据时要转换成字符串类型，如果要从服务端传入json类型数据，需在服务端进行`JSON.stringify()`处理后,选择手动处理或者自动处理  
手动处理：将获取到的`response`响应体进行`JSON.parse()`处理  
自动处理：在`open`方法前设置响应类型添加`xhr.responseType='json'`,获得的`response`响应体就为json对象了  
`responseType`默认值为text


2.发送GET请求：在url后面以字符串拼接添加参数
```
xhr.open('GET', 'http://127.0.0.1:8000/server?a=1&b=2&c=3')
```
IE浏览器会存在缓存问题，如果GET方法发送一样的请求会优先从缓存中取，即使后台数据已经发生变化  
解决方法为让每次请求的请求参数都不一样（获取时间戳放入参数但不一定使用），就可以发送新的请求，更新缓存  
```
xhr.open('GET', 'http://127.0.0.1:8000/server?t='+Date.now())
```

3.发送POST请求:在`send`方法中添加参数，可以为任意值，但一定要有匹配的后台服务，一般也用application/x-www-form-urlencoded类型
```
xhr.send('a=1&b=2&c=3')
```
给POST方法添加内容的时候,可以设置请求头中的Conten-type,一般为application/x-www-form-urlencoded
```
xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
```
`setRequestHeader()`方法可以设置POST请求的请求头，但是自定义的请求头需要在服务端设置Access-Control-Allow-Headers
***
### 五.几种异常处理  
1.请求超时:  
服务端可以用`setTimeout`方法模拟，处理方法为在`open`方法前添加超时时间和事件处理函数，即超出超时时间取消请求并执行事件处理函数
```
xhr.timeout=2000
xhr.ontimeout = function (e) {
  // 超时事件处理，参数e为progressEvent对象，记录超时信息，一般可不用
}
```
2.网络异常:  
可以用浏览器离线方法模拟，网络异常会直接执行事件处理函数
```
xhr.onerror = function() {
    //网路异常处理
}
```
3.取消请求:  
服务端可以用`setTimeout`方法模拟  
在请求完成前调用`xhr.abort()`方法取消请求  

4.重复请求：  
创建一个标志位用于标记是否正处于请求执行中（执行完成`readyState`为4），在发送请求前判断标志位，  
如果处于请求中，则调用`xhr.abort()`方法取消请求，并重新创建请求  
如果处于非请求中，则不调用，正常执行

***
### 六.jQuery中封装的Ajax基本使用
详细使用见[jQuery中文网站](https://jquery.cuishifeng.cn/jQuery.Ajax.html)  

1.`$.get(url, [data], [callback], [type])`   
2.`$.post(url, [data], [callback], [type])`  
url:发送请求地址  
data:待发送 Key/value 参数  
callback:success(response,status,xhr)=>{}  
 ---   response - 包含来自请求的结果数据  
 ---   status - 包含请求的状态  
---  xhr - 包含 XMLHttpRequest 对象  
type:返回内容格式，xml, html, script, json, text, _default   
eg.  
```
$.post("test.php", { "func": "getNameAndTime" },
   function(data){
     alert(data.name); // John
     console.log(data.time); //  2pm
   }, "json");
```


3.`$.ajax(url,[settings])`  
```
$.ajax({
   type: "POST",
   url: "",
   dataType:'',
   data: "name=John&location=Boston",
   timeout：2000, 
   success: function(res){
   },
   error:function(){
   },
   headers:{
       c:300,
       d:400
   }
})
```

***
### 七.同源和跨域
同源：协议，地址，端口都相同  
跨域：不满足同源  
跨域的请求都会受到限制，跨域请求信息的解决方法：  
1.JSONP（JSON with Padding）:只支持get请求  
利用一些具有跨域能力的标签,如：img link iframe script
JSONP利用`<script>`标签可以请求后收到一段js代码并执行，实现跨域请求  
eg.  
```
客户端：
<script src="请求的url"></script>   // 相当于请求回一个js文件

服务端：
res.end('要执行的javascript代码')  // js代码一般为一个函数，且函数必须在客户端先定义过
```
jQuery可以用`$.getJSON()`方法来快速使用JSONP方法


2.CORS(Cross-Origin Resourse Sharing)：官方跨域请求方案  
在服务端设置响应头实现允许跨域  
```
res.setHeader("Access-Control-Allow-Origin","*")       //'*'号通配所以地址，也可以填想要允许的网页地址
```

可以在[MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CORS#http_%E5%93%8D%E5%BA%94%E9%A6%96%E9%83%A8%E5%AD%97%E6%AE%B5)找到其他控制ajax请求的头部字段  








