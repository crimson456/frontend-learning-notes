# Express Learning

## express下的方法

- `express()` 创建app对象
- `express.Router([options])` 创建一个路由对象
    options:
    - caseSensitive 是否区分大小写(默认为false)
    - mergeParams 父路由参数和子路由参数冲突时的优先级，flase(默认父路由优先)，true(子路由优先)
    - strict 是否启用严格路由,如`/xxx`和`/xxx/`不相同(默认为false，不启用)
- `express.json()` 返回中间件函数，用于解析请求体格式为application/json
- `express.urlencoded()` 返回一个中间件函数，用于解析请求体格式为x-www-form-urlencoded
- `express.raw()` 返回中间件函数，用于解析请求体格式为x-www-form-urlencoded
- `exp`ress.text()` 返回中间件函数，用于解析请求体格式为text/plain
>会将`eq.body`转化为对象形式

- `express.static(root,[options])` 返回中间件函数，托管静态资源
    options：
    - dotfiles 枚举值(allow、deny、ignore)，如何访问`.xxx`文件
    - extensions 字符串数组，定义找不到文件时添加后缀名继续查找
    - index 布尔值或者字符串，直接访问目录时默认访问的文件名
    - fallthrough 布尔值，请求不存在时是否直接跳过此中间件(false为抛出错误)
    - redirect 布尔值，路径名为目录时是否重定向到路径名+'/'
    - lastModified ？
    - maxAge ？
    - immutable ？
    - etag ？
    - setHeaders 函数值，用于自定义响应头
    >可以将对应目录中的静态资源解析成为一个中间件函数
    >托管的根路径最好使用绝对路径，因为调用相对路径是根据node命令执行的位置来调用的
    


## 基本规则

1. 中间键函数在app.use()、app.METHOD()中使用
    中间键函数:
    ```js
    (req,res,next)=>{
        next()//调用后进入下一个中间件
        next('route')//调用后跳过当前路由中间件堆栈，进入下一个路由，只能在app.METHOD()、router.METHOD()中使用
        next(xxx)//next中传入其他参数一律作为出错，调用后跳过一般中间件，进入下一个错误中间件
    }
    ```
    错误中间件：
    ```js

    ```


2. path可以使用字符串或正则
    字符串模式：
    1. 只有字符串，匹配前面和字符串相同的字符串
    2. `resful风格` req.params中可获取参数
    正则模式：req.paramas可获取正则中的捕获组


## app(Express application,express()创建的实例)
1. 属性
   - `app.settings` 设置
   - `app.locals` 全局变量
     - `app.locals.settings` 和`app.settings`相同
   - `app.mountpath` 挂载点

2. 事件
   - `mount` 挂载时触发
     - parent 挂载的父app的引用

3. 方法

   - `app.set(name,value)` 在app.settings属性上增加(修改)一个值
   - `app.set(name)`、`app.get(name)` 在app.settings属性上查询一个值
    >这里和METHOD中的get方法重名
    系统属性：
    - view engine 默认使用引擎的后缀
    - views 模板文件存放的目录(可以是目录的数组，会在其中查找)
   - `app.enable(name)` 将app.settings属性上的一个值设置为true
   - `app.disable(name)` 将app.settings属性上的一个值设置为false
   - `app.enabled(name)` 在app.settings属性上查询一个值是否为true
   - `app.disabled(name)` 在app.settings属性上查询一个值是否为false
   - `app.use([path,],middleWares)` 挂载一个中间件函数或者app
   - `app.METHOD(path,middleWares)` 匹配对应请求方法和地址的中间件
    >middleWares可以多个中间件函数、中间件函数组成的数组、前二者混合
    >method为`http.method`下的所有方法的小写
   - `app.all(path,middleWares)` 匹配所有请求方法和对应地址的中间件
   - `app.listen([port[,host[,backlog]]][,callback])` 创建服务器并监听端口
   - `app.path()` 返回挂载路径
    >和mountpath的区别？？
   - `app.route(path)` 在app的路由对象(_router)下创建一个layer和对应的路由，并返回此路由
   - `app.engine(ext,callback)` 将解析模板的函数注册到`app.engine`下的对应后缀名属性下
   - `app.render(view,[dataObject],callback)` 在回调中获取模板引擎渲染后的html
   - `app.param()` 可以匹配restful的参数，已废弃

## request(中间件函数中的req)

   - `req.app` app的引用
   - `req.method` 请求的方法
   - `req.protocol` 请求的协议
   - `req.baseUrl` 挂载的路径
   - `req.path` 基于挂载路径下的路径
   - `req.originalUrl` 整体路径，包括参数
   - `req.body` 不作处理undefined，中间件处理后为参数对象
   - `req.route` 当前匹配的路由对象
   - `req.params` 路径为restful风格时可获取参数，为正则时获取捕获组
   - `req.query` 请求地址中的query参数对象(可直接使用)
   - `req.ip` 请求头X-Forwarded-For字段中第一个值(左值)
   - `req.ips` 请求头X-Forwarded-For字段中的IP地址
   - `req.xhr` 布尔值，如请求头中X-Requested-With字段值为XMLHttpRequest,则为真
   - `req.subdomains` 请求域名的子域名数组
   - `req.secure` 请求是否为TLS连接(HTTPS)
   - `req.hostname` 请求头Host字段值
   - `req.cookies` (使用cookie-parser中间件)请求头Cookie字段中的内容转化的对象
   - `req.signedCookies` (使用cookie-parser中间件)请求头Cookie字段中已签名的内容转化的对象
   - `req.fresh` 请求头Cache-Control字段相关
   - `req.stale` 请求头Cache-Control字段相关
   - `req.accepts()`、`req.acceptsCharsets()`、`req.acceptsEncodings()`、`req.acceptsLanguages()` 判断给定参数是否匹配请求头Accept和Accept-xxx字段
   - `req.get(field)`、`req.header(field)` 获取请求头对应字段的值
   - `req.is(type)` 返回布尔值，判断给定类型是否匹配请求头Content-type字段中的MIME类型
   - `req.range(size[,options])` 请求头Range字段相关？




## response(中间件函数中的res)


   - `res.app` app的引用
   - `res.locals` app.locals的引用
   - `res.headersSent` 布尔值，是否已经发送HTTP头部(在调用`res.send()`后为真)

   - `res.send([body])` 发送响应正文
   - `res.end([data][,encoding])` 发送响应正文并结束响应
   - `res.status(statusCode)` 发送响应状态码
   - `res.sendStatus(statusCode)` 发送状态码和对应状态信息
    >等于res.status(statusCode).send(statusMessage);
   - `res.render(view [,locals][,callback])` 渲染视图
   - `res.redirect([status,]path)` 重定向到指定路径
   - `res.download(path,[,filename],[,fn])` 将指定文件内作为传输附件
   - `res.sendFile((path [,options][,fn])` 将指定文件作为响应正文
   - `res.json([body])` 发送一个json类型的响应正文
   - `res.jsonp([body])` 发送一个json类型的响应正文，并且支持JSONP？

   - `res.append(field [,value])` 在响应头的指定字段添加对应值
   - `res.set(field [,value])` 设置响应头对应字段的值
    >参数也可以为`field:value`组成的对象，同时设置多个字段
   - `res.get(field)` 返回响应头对应字段的值(区分大小写)

   - `res.attachment([filename])` 在响应头Content-Disposition字段添加值`attachment`，如果提供filename则再添加值`filename=xxx`，并且设置Content-Type字段为对应文件内容

   - `res.cookie(name, value [, options])` 让客户端设置cookie
   - `res.clearCookie(name [, options])` 让客户端删除cookie

   - `res.format(object)` 用于根据请求头Accept字段的值设置响应内容和响应头中的Content-Type字段
   - `res.links(links)` 在响应头Links字段中添加值
   - `res.location(path)` 设置响应头Location字段的值
   - `res.type(type)` 设置响应头Content-Type字段
   - `res.vary(field)` 将字段加入响应头Vary字段中






## router（express.Router()创建）
  router实例可以作为中间件函数挂载在app.use()方法中

   - `router.all(path,middleWares)` 匹配所有请求方法和对应地址的中间件
   - `router.METHOD(path,middleWares)` 匹配对应请求方法和地址的中间件
   - `router.use([path],middleWares)` 挂载一个中间件函数或者app
   - `router.route(path)` 在路由对象下创建一个layer和对应的路由，并返回此路由
   - `router.param(name,callback)` 可以匹配restful的参数，已废弃



## 官方中间件模块(需要导入)

1. morgan 控制台输出请求
   - `morgan(format,options)` 创建控制台输出请求的中间件
    format可以为预定义的模板或自定义的模板,模板由token组成  
    otpions:
    - immediate
    - skip
    - stream 输出的流，默认为process.stdout
    >一般使用`morgan('dev')`



   - `morgan.token()` 定义一个token
   - `morgan.compile(format)`


2. errorhandler 错误处理
   - `errorhandler(options)` 创建错误处理的中间件
    options：
    - log 如果为真，控制台打印错误，如果为假，则res发回错误信息到客户端，如果为函数，则自定义错误行为
    ```js
    var errorhandler =require('errorhandler')
    if (process.env.NODE_ENV ==='development') {
      app.use(errorhandler())
    }
    ```

3. cookie-parser 解析cookie
   - `cookieParser(secret, options)` 创建解析cookie的中间件(会在req对象下添加cookies和signedCookies成员)

   - `cookieParser.JSONCookie(str)` 将cookie字符串转化为JSON对象
   - `cookieParser.JSONCookies(cookies)` 对给定对象的每一个成员值使用JSONCookie()方法 
   - `cookieParser.signedCookie(str, secret)` 将cookie字符串签名
   - `cookieParser.signedCookies(cookies, secret)` 对给定对象的每一个成员值使用signedCookie()方法


4. express-session 会话状态管理
   - `session(options)` 创建会话状态管理中间件(会在req对象下添加session、sessionID成员)
    options:
     - secret 加密使用的字符串
     - cookie (默认：{path:'/',httpOnly:true,secure:false,maxAge:null})
       - domain Cookie所属域名(默认设置为浏览器当前域名)
       - expires 过期时间(Date实例)
       - httpOnly 布尔值，是否能通过脚本访问
       - maxAge 过期时间(毫秒)
       - path 发送请求时需要附带Cookie的路径
       - sameSite 用于约束三方Cookie
       - secure Cookie是否只在HTTPS协议下发送
     - genid 指定生成sessionID的函数
     - name/key 指定存放sessionID的cookie的名字(默认connect.sid)
     - proxy 布尔值，报头文X-Forwarded-Proto字段相关
     - resave 布尔值，强制保存session到session store中即使没有发生变化
     - rolling 布尔值，请求时强行设置cookie，可用于重置cookie过期时间
     - saveUninitialized 布尔值，气昂之存储未初始化的session
     - store 用于存储的session store数据库实例(可用connect-mongo模块)
     - unset 用于设置req.session的删除是否存入session store
   - `req.session`、`req.sessionID`
     - session.regenerate(callback) 重新生成session实例和对应的sessionID
     - session.destroy(callback) 删除session
     - session.reload(callback) 从session store重新获取session对象
     - session.save(callback) 将session对象存入session store
     - session.touch() 更新session的maxAge
     - session.id 和`req.sessionID`相同
     - session.cookie session实例对应的cookie对象



5. cors 跨域请求
   - `cors([options])` 创建允许跨域请求的中间件
      options:
      - origin 对应Access-Control-Allow-Origin响应头，表示允许的源
      - methods 对应Access-Control-Allow-Methods响应头，表示允许的请求方法
      - allowedHeaders 对应Access-Control-Allow-Headers响应头，表示允许的自定义请求头，如不设默认为请求头Access-Control-Request-Headers字段值表示允许所有自定义请求头
     - exposedHeaders 对应Access-Control-Expose-Headers响应头，表示客户端XHR对象允许获取的其他响应头(除默认的六个)
     - credentials 对应Access-Control-Allow-Credentials响应头，表示是否接收请求携带的cookie
     - maxAge 对应Access-Control-Max-Age响应头，表示预检的过期时间
     - preflightContinue 是否在预检请求结束后调用下一个路由 ？？？
     - optionsSuccessStatus 配置OPTIONS方法预检成功时的状态码
     options默认值:
     ```json
     {
       "origin": "*",
       "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
       "preflightContinue": false,
       "optionsSuccessStatus": 204
     }
     ```
     
   - 需要发起预检请求的接口要在对应请求路径上加上OPTIONS方法的处理，eg.
      ```js
      //可以自行配置
      app.options('/products/:id', cors()) // enable pre-flight request for DELETE request
      app.del('/products/:id', cors(), function (req, res, next) {
         res.json({msg: 'This is CORS-enabled for all origins!'})
      })
      //允许所有跨域预检请求
      app.options('*', cors()) // include before other routes
      ```

   - 简单使用:允许所有跨域访问
      ```js
      app.use(cors())
      ```


## 源码分析

express使用path-to-regexp匹配路径

app.set 不同参数
etag、query parser、trust proxy属性会有特殊处理，会设置etag fn,query parser fn、trust proxy fn属性

- 路由中间件处理的两条线：
   1. 路由挂载 
    - 


   2. 路由匹配
    - 





















