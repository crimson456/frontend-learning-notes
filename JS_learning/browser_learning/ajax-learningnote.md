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


### 请求方法

- GET
- POST
- PURGE 删除缓存
- HEAD 只返回头部


### http常见状态码

1. 1开头的状态码(信息类)
   100 Continue 接受的请求正在处理，信息类状态码
   101 Switching Protocols
   102 Processing
   103 Early Hints


2. 2开头的状态码(成功类)
   200 OK 服务器已成功处理了请求
   204 No Content 


   201 Created
   202 Accepted
   203 Non-Authoritative Information
   205 Reset Content
   206 Partial Content
   207 Multi-Status
   208 Already Reported
   226 IM Used



3. 3开头的状态码(重定向)
   300 Multiple Choices
   301 永久性重定向，表示资源已被分配了新的 URL，浏览器会有缓存
   302 临时性重定向，表示资源临时被分配了新的 URL
   303 表示资源存在另一个URL，用GET方法获取资源
   304 Not Modified 自从上次请求后，请求网页未修改过。服务器返回此响应时，不会返回网页内容
   307 服务器内部重定向

300 Multiple Choices
301 Moved Permanently
302 Found
303 See Other
304 Not Modified
307 Temporary Redirect
308 Permanent Redirect


4. 4开头的状态码(客户端错误)
   400 Bad Request 服务器不理解请求的语法
   401 Unauthorized 未认证，客户端需要传入用户名和密码进行认证(可在url中或请求头中)
   403 (禁止)服务器拒绝请求
   404 (未找到)服务器找不到请求网页
   406 Not Acceptable 
   408 Request Timed Out 请求超时

   412 Precondition Failed 一般用于请求修改的数据已经被其他人修改过
   413 request Entity Too Large 请求体过大
   414 Request-URI Too Large 请求uri过长

   415 Unsupported Media Type 不支持的媒体类型，返回的图片格式代理无法处理






402 Payment Required
403 Forbidden
404 Not Found
405 Method Not Allowed
406 Not Acceptable
407 Proxy Authentication Required
408 Request Timeout
409 Conflict
410 Gone
411 Length Required
412 Precondition Failed
413 Content Too Large
414 URI Too Long
415 Unsupported Media Type
416 Range Not Satisfiable
417 Expectation Failed
418 I'm a teapot
421 Misdirected Request
422 Unprocessable Content
423 Locked
424 Failed Dependency
425 Too Early
426 Upgrade Required
428 Precondition Required
429 Too Many Requests
431 Request Header Fields Too Large
451 Unavailable For Legal Reasons




1. 5开头的状态码(服务器错误)
   500 (服务器内部错误)服务器遇到错误，无法完成请求
   502 代理服务器从后端服务器收到伪相应
   503 表示服务器处于停机维护或超负载，无法处理请求
   504 网关超时









500 Internal Server Error
501 Not Implemented
502 Bad Gateway
503 Service Unavailable
504 Gateway Timeout
505 HTTP Version Not Supported
506 Variant Also Negotiates
507 Insufficient Storage
508 Loop Detected
510 Not Extended
511 Network Authentication Required









### http常用请求头

以`X-`开头的一般为自定义的请求头


通用字段:



- `Date: <day-name>, <day> <month> <year> <hour>:<minute>:<second> GMT`


- `Connection:<keep-alive|close>` http 1.0,keep-alive表示长连接,http 1.1之后默认所有连接都是长连接显式指定close关闭连接


- `Transfer-Encoding:chunked` 传输报文主体时采用的传输编码方式，http1.1之后只能使用chunked编码。传输编码在内容编码之后。chunked传输编码分段传输，最后一个大小为 0 的块为结束，不需要通过content-length结束传输，无需等待整个响应准备完成，降低延迟。



- `Via:<proxy>...` 记录了请求经过的代理服务器的信息，包括协议版本，域名，服务器型号



- `Cache-Control:<param>...` 指定缓存的工作机制(主要是强制缓存),参数包括：
  - no-store 表示不使用强制缓存和协商缓存(使用此字段会失去浏览器的后退/前进缓存)
  - no-cache 表示不使用强制缓存，客户端每次使用缓存都要进行协商
  - max-age=10 强制缓存的相对时间(秒数)，和Expires同时出现时，max-age优先级更高
  - no-transform 缓存不能改变其媒体类型，比如不能压缩
  - 用于请求头中：
    - max-stale=10 接收超过max-age但没超过max-stale的缓存(默认全部接收)
    - min-fresh=10 不接受超过min-fresh的缓存
    - only-if-cached 只从缓存(本地缓存和缓存服务器)中获取资源，失败返回504 Gateway Timeout
  - 用于响应头中：
    - public 表示可以被任何节点缓存，包括客户端和公共缓存服务器
    - private 表示该资源只能被客户端（浏览器）缓存
    - s-maxage=10 资源在公共服务器中缓存的相对时间。如果存在公共缓存服务器，浏览器缓存失效后，会先请求公共缓存服务器，公共缓存服务器失效后会重新请求资源服务器更新公共缓存服务器中的资源，然后返回给浏览器
    - must-revalidate 缓存过期后做有效性验证(有些情况可以直接使用过期缓存)
    - proxy-revalidate 对于缓存服务器，缓存过期后做有效性验证






请求头字段:

- `Authorization: Bearer <token>` 用于JWT，携带token发送给服务端进行验证

- `Cookie:<cookies-name>=<cookies-value>` 携带cookies发送请求到客户端(cookie之间用;分隔)


- `Host` 请求发送到的主机名和端口


- `Origin：<origin>` 跨域请求的源请求的协议、域名、端口，除了不包含路径信息，该字段与 Referer 字段相似
- `Access-Control-Request-Method:<method>` 正式请求用到的方法
- `Access-Control-Request-Headers:<headers>` 正式请求中自定义的请求头(用`,`分隔)


- `X-Real-IP:<ip>` 发送请求的服务器的前项服务器的ip，一般为Remote Address字段
- `X-Forwarded-For: <client>, <proxy1>, <proxy2>...` 代理服务器转发请求时，前项代理服务器(不包括本机)和客户端的IP地址，本代理服务器的IP通过后项服务器的Remote Address字段获取并添加在字段上


- `Referer:<uri>` 当前请求页面的来源页面的地址，即表示当前页面是通过此来源页面里的链接进入的，用于防盗链


- accept相关头部告知服务器用户代理支持的媒体类型、自然语言集、字符集、内容编码方式。q=?表示权重值，用分号;进行分隔,范围是 0~1，可精确到小数点后 3 位,默认为q=1.0，当服务器提供多种内容时，将会首先返回权重值最高的媒体类型。
- `Accept:<mimeType1>;q=0.8,<mimeType2>...` 
- `Accept-Language:<language>;q=0.8...`
- `Accept-Charset:<charset>;q=0.8...`
- `Accept-Encoding:<encode>;q=0.8...` 常用有gzip、deflate、compress、identity,可用星号*通配符

- `TE:<encode>;q=0.8...` 告知服务器客户端能够处理响应的传输编码方式和优先级




- `If-Modified-Since:<GMT>` 用于请求相同资源时是否使用缓存(协商缓存)

- `If-None-Match:<etag-value>` 用于协商缓存，服务器收到请求后会与资源最新的ETag对比，成功返回304 Not Modified

- `If-Match:<etag-value>` 对于 GET 和 HEAD 方法，搭配 Range使用，用于保证新请求的范围与之前请求的范围是对同一份资源的请求，失败返回 416 Range Not Satisfiable。 对于PUT方法, 用于避免更新丢失问题，它可以用来检测用户想要上传的不会覆盖获取原始资源之后做出的更新，失败返回 412 Precondition Failed。

- `If-Unmodified-Since:<GMT>` 告知服务器，指定的请求资源未发生更新的情况下才能处理，请求比如提交文件覆盖时，原文件已经被修改不能直接覆盖。失败返回 412 Precondition Failed。


Range
If-Range





- `Authorization: <auth-scheme> <authorization-parameters>` 客户端返回服务器要求附带的认证信息，auth-scheme为认证方式，authorization-parameters为认证的其他参数

- `Proxy-Authorization: <auth-scheme> <authorization-parameters>` 客户端返回代理服务器要求附带的认证信息



pragma

upgrade-insecure-requests









Connection: Upgrade
Upgrade: websocket
Sec-WebSocket-Version: 13
Sec-WebSocket-Key: d4egt7snxxxxxx2WcaMQlA==
Sec-WebSocket-Extensions: permessage-deflate; client_max_window_bits















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


- `Strict-Transport-Security: max-age=<expire-time>; includeSubDomains; preload` 通知浏览器，这个网站禁止使用 HTTP 方式加载，并且浏览器应该自动把所有尝试使用 HTTP 的请求自动替换为 HTTPS 请求
  - max-age 自动重定向到https页面的有效时间，超时后恢复到http访问
  - includeSubDomains 添加则说明适用于该网站的所有子域名
  - preload 预加载HSTS


- `Vary:<header1>,<header2>...` 如果服务端提供的内容取决于除了协商字段的请求头字段（比如多端不同的页面根据User-Agent字段判断），那么响应头中必须包含Vary字段，且Vary的内容必须包含这些请求头字段。此字段用于告诉缓存服务器遇到同一个URL对应着不同版本文档的情况时，如何缓存和选择合适的版本。对于有些实现得有BUG的缓存服务器，会忽略响应头中的 Content-Encoding，增加Vary:Accept-Encoding 响应头，明确告知缓存服务器按照 Accept-Encoding 字段的内容，分别缓存不同的版本。




- `WWW-Authenticate: <auth-scheme> <authorization-parameters>,...` 服务器对客户端发起认证，发起时返回401，auth-scheme为认证方式，authorization-parameters为对应认证方式的参数。可以有多种认证方式，以逗号分隔或多个WWW-Authenticate请求头
  - basic：`WWW-Authenticate: Basic realm=<realm>, charset="UTF-8"` realm为安全域，会放入浏览器对话框提示
- `Proxy-Authenticate: <auth-scheme> <authorization-parameters>` 代理服务器对客户端发起认证，发起时返回407


- `Location: <url>` 重定向地址 


- `Server: Apache/2.2.6 (Unix) PHP/5.2.5 ` 告知客户端当前服务器上安装的 HTTP 服务器应用程序的信息

Accept-Ranges



Connection: Upgrade
Upgrade: websocket
Sec-WebSocket-Accept: gczJQPmQ4Ixxxxxx6pZO8U7UbZs=




X-Accel-Expires

- `X-Cache-Status:<cacheStatus>` nginx中用于返回响应缓存的使用命中情况











实体头部：

- `Content-Encoding:<encode>` 主体部分选用的内容编码方式，参考Accept-Encoding首部字段


- `Last-Modified:<GMT>` 指定资源最终修改的时间，再次访问相同资源时会放在If-Modified-Since中，用于协商缓存。Last-Modified只能监听到秒级文件修改，如果1秒内多次修改文件，会导致资源没有及时更新，此时使用Etag进行协商。
- `Etag:<etag-value>` 标记资源的唯一性，一般使用内容的散列
- `Expires:<GMT>` 指定资源的(强制缓存)失效日期，Cache-Control中max-age优先级更高




