# Ajax Learning


### XMLHttpRequest 对象

1. 属性：
   1. `readyState`请求进度状态码
   2. `status`http 状态码
   3. `statusText`完整 http 状态码和文本
   4. `timeout`超时时间
   5. `response`响应正文
   6. `responseText`响应正文的字符串
   7. `responseType`响应体类型，在 open 更改后可以修改响应体的类型
   8. `responseURL`响应的序列化URL
   9. `responseXML`响应解析为文档的document对象
   10. `upload`XMLHttpRequestUpload对象，代表上传进度
   11. `withCredentials`？


2. 方法：

   1. `open(method,url,async,username,password)`
      初始化一个请求，async 为 true 则异步（默认），false 为同步，username 和 password 用于认证用途

   2. `setRequestHeader(key,value)`
      设置请求头，同名不会覆盖而会添加多个值
      >`setRequestHeader()`方法可以设置POST请求的请求头，但是自定义的请求头需要在服务端设置Access-Control-Allow-Headers

   3. `overrideMimeType(mimeType)`
      指定一个MIME类型用于替代服务器指定的类型（强制使用mimeType解析响应体）

   4. `send(body)`
      发送请求，body 为请求体，POST请求的请求数据

      > 一般用 application/x-www-form-urlencoded 类型，即`&`连接，需要在请求头中设置 Conten-type 值为 application/x-www-form-urlencoded
      > 可以为任意值，但要有对应的后台处理

   5. `getResponseHeader(key)`
      返回响应报头文键名对应的键值

   6. `getAllResponseHeaders()`
      返回响应报头文的所有键值对

   7. `abort()`
      终止请求，readyState 置 0，Status 置 0，触发 abort 事件

3. 事件：
   1. `readystatechange`readyState 改变时触发 
   2. `abort`xhr 对象调用`abort()`函数(终止请求)触发
   3. `error`请求遇到错误触发，如断网
   4. `load`xhr 对象请求完成时触发
   5. `loadend`加载进度停止之后被触发(error、abort、load事件之后)
   6. `loadstart`程序开始加载时触发
   7. `progress`请求接收到数据的时候被周期性触发
   8. `timeout`请求超时触发





### xhr对象请求进度状态码 readyState
xhr实例下都存在一组状态码（0-4），用来描述请求的发送进行到了哪一步  
当状态码发生改变时会触发`readystatechange`
状态码的含义：
|值 |常量             |	   描述     |
|---|---             |   ---|
|0  |UNSENT          |	代理被创建，但尚未调用 open() 方法|
|1	|OPENED          |	open() 方法已经被调用|
|2	|HEADERS_RECEIVED|  send() 方法已经被调用，并且头部和状态已经可获得|
|3	|LOADING         |	下载中, responseText 属性已经包含部分数据|
|4	|DONE	         |   下载操作已完成|

>可在请求进度状态码为4时获取http请求的结果

### http请求报文和响应报文
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






### GET请求参数和POST请求参数

1. GET请求参数：
   get请求参数放在url后方
   ```js
   xhr.open('GET', 'http://127.0.0.1:8000/server?a=1&b=2&c=3')
   ```

2. POST请求参数：
   post请求参数放在`send()`函数中,可以用各种形式，但要设置对应的请求头,并且后台也需要匹配
   一般和get一样以表单字符串的形式，在请求头中设置Content-type为application/x-www-form-urlencoded
   ```js
   xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
   ...
   xhr.send('a=1&b=2&c=3')
   ```


### 请求异常处理
1. 请求超时: 
   触发timeout事件
   >超时时间和事件处理函数放在`open`方法和`send`方法之间
   ```js
   xhr.timeout=2000
   xhr.ontimeout = function (e) {
     // 超时事件处理，参数e为progressEvent对象，记录超时信息，一般可不用
   }
   ```

2. 网络异常(请求出错):  
   触发error事件
   ```js
   xhr.onerror = function() {
       //网路异常处理
   }
   ```

3. 重复请求：  
   创建一个标志位用于标记是否正处于请求执行中（执行完成`readyState`为4），在发送请求前判断标志位，  
   如果处于请求中，则调用`xhr.abort()`方法取消请求，并重新创建请求  
   如果处于非请求中，则不调用，正常执行

4. IE缓存问题
   IE浏览器会存在缓存问题，如果GET方法发送一样的请求会优先从缓存中取，即使后台数据已经发生变化  
   解决方法为让每次请求的请求参数都不一样（获取时间戳放入参数但不一定使用），就可以发送新的请求，更新缓存  
   ```js
   xhr.open('GET', 'http://127.0.0.1:8000/server?t='+Date.now())
   ```



### 获取结果和处理


http传输数据只能传输字符串类型
所以，如果要从前端传入json类型数据，需在服务端进行`JSON.stringify()`将json对象转化为字符串
然后在前端将字符串转化为json对象，可以选择手动处理或者自动处理  
手动处理：将获取到的`response`响应体进行`JSON.parse()`处理  
自动处理：在`open`方法前设置响应类型添加`xhr.responseType='json'`,获得的`response`响应体就为json对象了  
`responseType`默认值为text，更多类型查文档


示例：

```js
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
```js
$.post("test.php", { "func": "getNameAndTime" },
   function(data){
     alert(data.name); // John
     console.log(data.time); //  2pm
   }, "json");
```


3.`$.ajax(url,[settings])`  
```js
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





### 七.同源和跨域
1. 概念
   同源：协议，地址，端口都相同  
   跨域：不满足同源  
  
2. JSONP（JSON with Padding）:只支持get请求  
   利用一些具有跨域能力的标签,如：img link iframe script
   JSONP利用`<script>`标签可以请求后收到一段js代码并执行，实现跨域请求  
   eg.  
   ```js
   //客户端：
   <script src="请求的url"></script>   // 相当于请求回一个js文件

   //服务端：
   res.end('要执行的javascript代码')  // js代码一般为一个函数，且函数必须在客户端先定义过
   ```
   jQuery可以用`$.getJSON()`方法来快速使用JSONP方法


3. CORS(Cross-Origin Resourse Sharing)

   1. 简单请求条件：
      - 请求方法为GET、HEAD、POST
      - 请求头字段只有Accept、Accept-Language、Content-Language、Content-Type、...，且Content-Type字段为text/plain、multipart/form-data、application/x-www-form-urlencoded
      - 发起请求的XHR对象没有注册事件监听，且可以通过XMLHttpRequest.upload属性访问
      - 请求中没有使用可读流

   2. 简单请求：
      - 请求头添加Origin字段
      - 响应头返回Access-Control-Allow-Origin、Access-Control-Allow-Credentials、Access-Control-Expose-Headers字段
      - 如果Access-Control-Allow-Origin包含请求的源，则请求成功
      - 如果请求失败，则触发XMR对象的error事件

   3. 预检请求:
      - 请求方法为OPTIONS
      - 请求头添加Origin、Access-Control-Request-Method、Access-Control-Request-Headers字段
      - 响应头添加Access-Control-Allow-Origin、Access-Control-Allow-Methods、Access-Control-Allow-Headers、Access-Control-Allow-Credentials、Access-Control-Max-Age字段
      - 如果Access-Control-Allow-Origin包含请求的源，则预检请求成功
      - 如果预检请求失败，则触发XMR对象的error事件
      - 预检请求成功后，发送正式请求，正式请求和简单请求相同


### http常见状态码
1. 1开头的状态码(信息类)
   100 接受的请求正在处理，信息类状态码

2. 2开头的状态码(成功类)
   200 (成功)服务器已成功处理了请求

3. 3开头的状态码(重定向)
   301 永久性重定向，表示资源已被分配了新的 URL
   302 临时性重定向，表示资源临时被分配了新的 URL
   303 表示资源存在另一个URL，用GET方法获取资源
   304 (未修改)自从上次请求后，请求网页未修改过。服务器返回此响应时，不会返回网页内容

4. 4开头的状态码(客户端错误)
   400 (错误请求)服务器不理解请求的语法
   401 (验证失败)表示发送的请求需要有通过HTTP认证的认证信息
   403 (禁止)服务器拒绝请求
   404 (未找到)服务器找不到请求网页

5. 5开头的状态码(服务器错误)
   500 (服务器内部错误)服务器遇到错误，无法完成请求
   503 表示服务器处于停机维护或超负载，无法处理请求






### http常用请求头

通用字段:

请求头字段:

- `Authorization: Bearer <token>` 用于JWT，携带token发送给服务端进行验证

- `Cookie:<cookies-name>=<cookies-value>` 携带cookies发送请求到客户端(cookie之间用;分隔)

- `Host`


- `Origin：<origin>` 请求源的协议、域名、端口
- `Access-Control-Request-Method:<method>` 正式请求用到的方法
- `Access-Control-Request-Headers:<headers>` 正式请求中自定义的请求头(用`,`分隔)

响应头字段:
- `Set-Cookie:<cookie-name>=<cookie-value>;<options-name>=<options-value>` 响应客户端并要求客户端设置或更改cookie
   >更改cookie条件:选项key、domain、path和secure都匹配(如不同则生成新cookie)
   options:(option之间用`;`分隔)
   - Expires UTC格式过期时间
      >可以用`Date.prototype.toUTCString()`转换  
   - Max-Age 秒数过期时间
      >上两项冲突Max-Age优先级更高
   - Domain 设置所属域名(默认设置为浏览器当前域名)
      >1. 如果是域名为IP地址，则此选项不能设置
      >2. 只能设为当前域名或者其上级域名，设为上级域名时，不能设为顶级域名或公共域名
   - Path 指定浏览器发送请求时，需要附带Cookie的路径
   - Secure 布尔值，指定浏览器只有在HTTPS下才能发送此Cookie
   - HttpOnly 布尔值，指定浏览器端不能通过js脚本获取此Cookie
   - SameSite 枚举值，用于约束三方Cookie(由其他网站引导而附带发送的Cookie)
     - Strict 完全禁止
     - Lax 允许导航到目标网址的GET请求携带，其他静止
     - None 关闭此属性，但必须设置Secure选项






- `Access-Control-Allow-Origin:*|<origin>` 表示允许请求的源
- `Access-Control-Allow-Credentials:true` 表示允许发送Cookie
   >且XHR对象的withCredentials属性也要设置为true，指定源时不能用`*`
- `Access-Control-Expose-Headers` 表示客户端XHR允许获取的响应头
   >跨域时，XHR对象默认只能获取Cache-Control、Content-Language、Content-Type、Expires、Last-Modified、Pragma六个字段

- `Access-Control-Allow-Methods:<methods>` 服务端允许跨域的方法(用`,`分隔)
- `Access-Control-Allow-Headers:<headers>` 服务端允许自定义的头部(用`,`分隔)
- `Access-Control-Max-Age:<seconds>` 预检的缓存时间


