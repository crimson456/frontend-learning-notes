# Nodejs Learning

nodejs中事件用`on()`方法监听


## http 模块


1. http 模块下的属性和方法:

   1. `http.METHODS` http请求方式数组，包括GET,POST
   2. `http.STATUS_CODES` http状态码对象，以状态码为键名，状态字为键值组成的对象

   3. `http.globalAgent` Agent的全局实例，作为所有HTTP客户端请求的默认Agent ？
   4. `http.maxHeaderSize` 只读属性，指定http头部最大字节数，默认16KB

   5. `http.createServer([options][, requestListener])`
      返回一个 http.Server 类实例
      requestListener为Server对象下request事件处理函数

   6. `http.request(url[,options][,callback])`、
      `http.request(options[,callback])`、
      `http.get(options[,callback])`、
      `http.get(url[,options][,callback])`
      返回http.ClientRequest类的实例对象，用于发起http请求

   7. `http.validateHeaderName(name)` 验证对应请求头是否可用，不可用则抛出错误(在`res.setHeader()`底层使用)
   8. `http.validateHeaderValue(name, value)` 验证请求头的对应值是否可用，不可用则抛出错误(在`res.setHeader()`底层使用)

2. http 模块下的类：

   1. `http.Server`类(由`http.createServer()`创建)(继承自`net.Server`类)
      1. 事件：
         - `request` 接收到请求时触发
            - req http.IncomingMessage类实例
            - res http.ServerResponse类实例
         - `checkContinue` 接收到带有`Expect:100-continue`请求头的http请求时触发
            - req http.IncomingMessage类实例
            - res http.ServerResponse类实例
         - `checkExpectation` 接收到带有`Expect:xxx`(xxx不为100-continue)请求头的http请求时触发
            - req http.IncomingMessage类实例
            - res http.ServerResponse类实例
         - `clientError` 客户端触发的error事件时会触发
           - err 
           - socket net.Socket类
         - `connection` 新的TCP流被建立时触发
           - socket net.Socket类
         - `connect` 接收到CONNECT请求时触发
           - req http.IncomingMessage类实例
           - socket net.Socket类实例
           - head 流的第一个数据包?
         - `upgrade` 客户端发送 HTTP upgrade 请求时触发
           - req http.IncomingMessage类实例
           - socket net.Socket类实例
           - head 流的第一个数据包?
         - `close` 服务器关闭触发
         - `dropRequest` 请求数量达到`server.maxRequestsPerSocket`时触发，并返回503状态码

      2. 属性、方法：
         - `server.timeout` socket的超时时间(毫秒)，设置为0表示不会超时
         - `server.headersTimeout` 等待接收完整http头的时间，超出返回408
         - `server.requestTimeout` 接收完整请求的超时时间，超出返回408
         - `server.listening` 布尔值，是否正在监听连接
         - `server.maxHeadersCount` 限制最大请求头数，默认2000
         - `server.maxRequestsPerSocket` 每个socket最多请求数
         - `server.keepAliveTimeout` 长连接的超时时间
         - `server.listen()` 监听端口，......,同net.Server类中相同
         - `server.setTimeout([msecs][, callback])` 设置socket的超时时间
         - `server.close([callback])` 停止接收新的连接
         - `server.closeAllConnections()` 关闭所有连接
         - `server.closeIdleConnections()` 关闭没有发送请求或等待响应的连接


   2. `http.IncomingMessage`(req，在`http.Server`实例事件回调中使用)
      继承自`stream.Readable`类
      1. 事件:
         - `close` 请求完成时触发
         - `data` (继承) 
           - chunk 数据块，拼接后得到完整数据
         - `end` (继承)  数据传输结束后调用

      2. 属性、方法：
         - `message.url` 请求方要求的资源地址(包括请求参数)
         - `message.method` http请求方式
         - `message.statusCode` 状态码
         - `message.statusMessage` 状态信息
         - `message.httpVersion` http版本
         - `message.complete` 布尔值，完整http信息被接收和解析后为真(流上的end事件触发后为真)
         - `message.headers` 请求头或响应头，对象形式，值处理
         - `message.headersDistinct` 请求头或响应头，对象形式，值不处理为数组形式
         - `message.rawHeaders` 请求头或响应头，数组形式
         - `message.trailers` trailer字段，对象形式，值处理
         - `message.trailersDistinct` trailer字段，对象形式，值不处理为数组形式
         - `message.rawTrailers` trailer字段，数组形式
         - `message.socket` 底层socket对象
         - `message.destroy([error])` 调用socket上的destroy()方法
         - `message.setTimeout(msecs[, callback])` 调用socket上的setTimeout()方法


   3. `http.ServerResponse`(res，在`http.Server`实例事件回调中使用)
      继承自`http.OutgoingMessage`类(可读流)
      1. 事件:
         - `finish` 响应发送前(响应头和正文都交给底层系统)触发
         - `close` 响应完成或底层连接断开触发
         >`response.end()`方法调用后两个事件都会触发，顺序为先`finish`后`close`

      2. 方法：
         - `response.writeHead(statusCode[, statusMessage][, headers])`添加多个响应头和响应状态码
           >`writeHead()`方法优先级最高
         - `response.statusCode` 响应状态码
         - `response.statusMessage` 响应状态信息
         - `response.sendDate` 布尔值，表示响应头中是否包含日期字段
         - `response.req` 引用请求对象
         - `response.writeContinue()` 发送HTTP/1.1 100 Continue消息到客户端，表示请求主体可以开始发送
            >可在服务器`checkContinue`事件触发的回调中调用
         - `response.writeProcessing()` 发送HTTP/1.1 102 Processing消息到客户端，表示请求主体可以开始发送



   4. `http.ClientRequest`类(由`http.request()`、`http.get()`创建)
      继承自`http.OutgoingMessage`类(可写流)
      1. 事件:
         
         - `close` 请求完成或底层连接断开触发
         - `connect` 服务器响应CONNECT请求时触发
           - req http.IncomingMessage类实例
           - socket net.Socket类实例
           - head 流的第一个数据包?
         - `continue` 服务器发送100 Continue响应时触发
         - `finish` 请求被发送时触发
         - `information` 服务器发送1xx(除101 Upgrade)响应时触发
           - info 信息对象
         - `response`
           - res http.IncomingMessage类实例
         - `socket` socket被分配到请求时触发 ？
           - socket net.Socket类实例
         - `timeout` 底层 socket 超时的时候触发
         - `upgrade` 服务器发送101 Upgrade响应时触发 ？

      2. 属性、方法：

         - `request.path` 请求的文件路径
         - `request.method` 请求的方法
         - `request.host` 请求的主机
         - `request.protocol` 请求的协议
         - `request.maxHeadersCount` 设置最大响应头数量
         - `request.reusedSocket` 布尔值，表示请求是否通过一个重用的socket
         - `request.setNoDelay([noDelay])` 调用socket上的setNoDelay方法(Nagle算法相关)
         - `request.setSocketKeepAlive([enable][, initialDelay])` 调用socket上的setKeepAlive方法(是否禁用长连接)






   5. `http.OutgoingMessage`类
      继承自`stream.Writable`类(实际是继承`Stream`类)
      1. 事件
         - `drain`
         - `finish`
         - `prefinish`
      2. 属性、方法

         - `outgoingMessage.write(chunk[, encoding][, callback])` 可多次调用，写入正文
           >callback:刷新数据块时将调用 ？
         - `outgoingMessage.end([data[, encoding]][, callback])` 写入正文，并结束响应正文
         - `outgoingMessage.setHeader(name, value)` 设置响应头对应字段的值，会覆盖
         - `outgoingMessage.appendHeader(name, value)` 添加响应头对应字段的值
         - `outgoingMessage.removeHeader(name)` 移除响应头对应字段
         - `outgoingMessage.getHeaders()` 返回响应头对象的浅拷贝，且此对象不继承object对象
         - `outgoingMessage.getHeaderNames()` 返回响应头字段名字的数组
         - `outgoingMessage.getHeader(name)` 返回对应响应头名字的值
         - `outgoingMessage.hasHeader(name)` 返回布尔值，判断响应头是否有对应字段
         - `outgoingMessage.headersSent` 布尔值，表示响应头是否已经发送
         - `outgoingMessage.flushHeaders()` 刷新请求头 ？
         - `outgoingMessage.addTrailers(headers)` 添加尾部响应头
            >发送尾部响应头之前，需先在响应头Trailer字段中添加尾部响应头的名字列表
         - `outgoingMessage.writableEnded` 布尔值，`outgoingMessage.end()`方法调用后为真
         - `outgoingMessage.writableFinished` 布尔值，所有数据被传入底层系统后为真(finish事件触发前)
         - `outgoingMessage.cork()` 从流中继承
         - `outgoingMessage.uncork()` 从流中继承
         - `outgoingMessage.socket` 引用底层socket
         - `outgoingMessage.setTimeout(msecs[, callback])` 设置socket的超时事件
         - `outgoingMessage.destroy([error])` 调用socket上的destroy()方法
         - `outgoingMessage.pipe()` 重写pipe方法，使调用时抛出错误(可读流不可调用pipe方法)
         - `outgoingMessage.writableCorked` 继承自可写流
         - `outgoingMessage.writableHighWaterMark` 继承自可写流
         - `outgoingMessage.writableLength` 继承自可写流
         - `outgoingMessage.writableObjectMode` 继承自可写流



   6. `http.Agent`类  ？？？ (用于管理socket的长连接、复用，可在`http.request()`、`http.get()`配置项中使用)
      new Agent([options])
      agent.createConnection(options[, callback])
      agent.keepSocketAlive(socket)
      agent.reuseSocket(socket, request)
      agent.destroy()
      agent.freeSockets
      agent.getName([options])
      agent.maxFreeSockets
      agent.maxSockets
      agent.maxTotalSockets
      agent.requests
      agent.sockets





## url 模块
[文档](https://www.nodeapp.cn/url.html)


1. 旧的url模块通过引入
    ```js
    const url = require('node:url');
    ```
   1. url模块下的方法
      1. `url.parse(urlString[, parseQueryString[, slashesDenoteHost]])`
        返回一个urlObject对象
        urlString为url的地址字符串
        parseQueryString为布尔值，用于控制返回url对象中的query参数格式，false(默认字符串个格式)，true(对象格式)
        slashesDenoteHost为布尔值，用于控制返回url对象如何解析host和pathname，false(默认)
      2. `url.format(urlObject)`
        返回将urlObject对象转换的url字符串
      3. `url.resolve(baseUrl, relativeUrl)`
        拼接url
        >具体操作：
        >如果baseUrl为域名，则替换掉域名'/'之后所有的内容为relativeUrl
        >如果baseUrl不为域名，替换掉baseUrl中最后一个'/'后的内容为relativeUrl
        

   2. urlObject对象下的属性
      - urlObject.auth
      - urlObject.hash
      - urlObject.host
      - urlObject.hostname
      - urlObject.href
      - urlObject.path
      - urlObject.pathname
      - urlObject.port
      - urlObject.protocol
      - urlObject.query
      - urlObject.search
      - urlObject.slashes  





2. 新的url模块
    通过构造函数创建无需引入
    
   1. 构造函数`new URL(url[, baseUrl])`
    创建一个urlObject对象，如果输入的url为相对路径，则必须有baseurl,并进行拼接，和旧模块对象的`resolve()`方法拼接方式类似

   2. 新的url模块方法
      - `url.format(URL[, options])`
        将url对象转化为url字符串
        options对象包括auth、fragment、search、unicode四个布尔值的属性，用于控制生成的字符串中是否包含某些属性、编码方式
        >此方法需要通过`const url = require('node:url')`引入默认模块，和旧模块的方法相同
      - `fileURLToPath(url)`
      - `pathToFileURL(path)`
      - `urlToHttpOptions(url)`
        >这些方法都是按需引入



   3. URL实例对象下的属性
      - urlObject.hash
      - urlObject.host
      - urlObject.hostname
      - urlObject.href
      - urlObject.origin
      - urlObject.password
      - urlObject.pathname
      - urlObject.port
      - urlObject.protocol
      - urlObject.search
      - urlObject.searchParams 对应一个searchParams对象
      - urlObject.username

   4. searchParams对象
    searchParams对象是一个可迭代对象，下面部署了很多方法用于查询遍历url的查询参数，具体如下(功能细节查[文档](https://www.nodeapp.cn/url.html))：
      - urlSearchParams.append(name, value)
      - urlSearchParams.delete(name)
      - urlSearchParams.entries()
      - urlSearchParams.forEach(fn[, thisArg])
      - urlSearchParams.get(name)
      - urlSearchParams.getAll(name)
      - urlSearchParams.has(name)
      - urlSearchParams.keys()
      - urlSearchParams.set(name, value)
      - urlSearchParams.sort()
      - urlSearchParams.toString()
      - urlSearchParams.values()
      - urlSearchParams[Symbol.iterator]()




3. 新旧对比
┌─────────────────────────────────────────────────────────────────────────────────────────────┐
│                                            href                                             │
├──────────┬──┬─────────────────────┬─────────────────────┬───────────────────────────┬───────┤
│ protocol │  │        auth         │        host         │           path            │ hash  │
│          │  │                     ├──────────────┬──────┼──────────┬────────────────┤       │
│          │  │                     │   hostname   │ port │ pathname │     search     │       │
│          │  │                     │              │      │          ├─┬──────────────┤       │
│          │  │                     │              │      │          │ │    query     │       │
"  https:   //    user   :   pass   @ sub.host.com : 8080   /p/a/t/h  ?  query=string   #hash "
│          │  │          │          │   hostname   │ port │          │                │       │
│          │  │          │          ├──────────────┴──────┤          │                │       │
│ protocol │  │ username │ password │        host         │          │                │       │
├──────────┴──┼──────────┴──────────┼─────────────────────┤          │                │       │
│   origin    │                     │       origin        │ pathname │     search     │ hash  │
├─────────────┴─────────────────────┴─────────────────────┴──────────┴────────────────┴───────┤
│                                            href                                             │
└─────────────────────────────────────────────────────────────────────────────────────────────┘









## querystring 模块

1. 模块下的方法：
   - `querystring.parse(str[, sep[, eq[, options]]])`
    将类似http请求中查询参数的字符串转化为对象
    >`sep`,`eq`为类似字符串中对应的`&`和`=`符号，可改为其他符号
    >`options`

   - `querystring.stringify(obj[, sep[, eq[, options]]])`
    将类似对象转化为http请求中查询参数的字符串


   - `querystring.escape(str)`
   - `querystring.unescape(str)`
    将字符串进行转义和还原


   - `querystring.decode()`
   - `querystring.encode()`



## events 模块

用于事件注册和监听
```js
import { EventEmitter } from 'node:events';

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();
//注册事件
myEmitter.on('event', () => {
  console.log('an event occurred!');
});
//触发事件
myEmitter.emit('event');
```
1. EventEmitter构造对象下的属性：
   - `EventEmitter.defaultMaxListeners`设置监听函数数组的最大长度，默认为10

2. EventEmitter实例对象下的事件：
  - `newListener`添加新的事件处理函数时触发
  - `removeListener`移除新的事件处理函数时触发

3. EventEmitter实例对象下的方法：

  - `emitter.on(eventName, listener)`添加事件监听
    >注意：同名事件可多次注册，有一个事件数组来存储事件处理程序，新注册的方法会放在队尾，如果想循环中只触发一次处理方法：每次重新创建事件触发对象
  - `emitter.addListener(eventName, listener)` 添加事件监听，同`on()`方法相同
  - `emitter.off(eventName, listener)` 移除事件监听
  - `emitter.removeListener(eventName, listener)` 移除事件监听，同`off()`方法相同
  - `emitter.once(eventName, listener)` 添加只会触发一次的事件监听
  - `emitter.removeAllListeners([eventName])` 移除所有事件监听

  - `emitter.emit(eventName[, ...args])` 触发事件

  - `emitter.eventNames()` 返回所有事件名
  - `emitter.listeners(eventName)` 返回对应事件名的事件数组但不包括`once()`登方法创建的
  - `emitter.rawListeners(eventName)` 返回对应事件名的事件数组包括`once()`登方法创建的
  - `emitter.listenerCount(eventName)` 返回对应事件名的处理函数个数

  - `emitter.setMaxListeners(n)` 设置事件数组的最大长度
  - `emitter.getMaxListeners()` 获取事件数组的最大长度

  - `emitter.prependListener(eventName, listener)` 添加事件监听在事件数组的队头
  - `emitter.prependOnceListener(eventName, listener)` 添加只会触发一次的事件监听在事件数组的队头



4. node中的事件轮询
   
   1. v11之前
      6个事件阶段：
      1. `Timers` 计时器回调(setTimeout、setInterval)
      2. `Pending callbacks` 系统操作相关的回调(tcp,udp)
      3. `Idle/Prepare` 内部使用
      4. `Poll` 此阶段的宏任务执行完毕后，立即执行相应微任务
      5. `Check` 此阶段执行setImmediate的回调
      6. `Close callbacks` 执行close事件的回调

   2. v11之后
      宏任务执行结束后立即所有微任务

   3. nodejs中微任务执行顺序固定：process.nextTick的优先级高于Promise.resolve




## fs 模块


1. 异步回调API：（回调为错误为第一参数风格）

   - `fs.mkdir(path[, options], callback)` 创建目录
   - `fs.readdir(path[, options], callback)` 读取目录(回调收到一个文件名数组)
   - `fs.rename(oldPath, newPath, callback)` 重命名目录
   - `fs.rmdir(path[, options], callback)` 删除目录(目录中有文件不能删除)
   - `fs.opendir(path[, options], callback)` 打开目录，回调中有参数`fs.Dir`类下的实例
  
   - `fs.writeFile(file, data[, options], callback)` 文件内容重写
   - `fs.appendFile(path, data[, options], callback)` 文件内容添加(文件不存在则创建)
   - `fs.readFile(path[, options], callback)` 文件内容读取，返回到callback第二参数中
   - >注意：读取文件如果不设置编码方式，会返回buffer对象

   - `fs.stat(path[, options], callback)` 读取文件或目录的信息，如创建时间，是否是文件或目录,返回`fs.Stats`类

   - `fs.access(path[, mode], callback)` 测试指定的文件或目录的用户权限
   - `fs.chmod(path, mode, callback)` 改变文件或目录的权限
   - `fs.chown(path, uid, gid, callback)` 改变文件的所有者和群组

   - `fs.copyFile(src, dest[, mode], callback)` 复制文件内容
   - `fs.cp(src, dest[, options], callback)` 复制文件内容

   - `fs.link(existingPath, newPath, callback)` 创建软链接
   - `fs.unlink(path, callback)` 删除文件或软链接(不能删除目录)

   - `fs.rm(path[, options], callback)` 移除文件或目录

   - `fs.createReadStream(path[, options])` 创建文件可读流
   - `fs.createWriteStream(path[, options])` 创建文件可写流

   - `fs.truncate(path[, len], callback)` 修改文件的长度(截短或增长)
   - `fs.utimes(path, atime, mtime, callback)` 修改文件的最后修改时间和最后访问时间的时间戳

   - `fs.watch(filename[, options][, listener])` 监听文件或目录变化，返回`fs.FSWatcher`类实例
   - `fs.watchFile(filename[, options], listener)` 监听文件变化，返回`fs.StatWatcher`类实例
   - `fs.unwatchFile(filename[, listener])` 移除监听文件的监听器

   - `fs.open(path[, flags[, mode]], callback)` 打开文件，回调中有参数`fd`(文件描述符)，可根据`fd`执行文件内容读写操作,回调中可执行的方法
   - `fs.close(fd[,callback])` 关闭文件
   - `fs.write(fd,buffer,offset[,length[,position]],callback)`、`fs.write(fd,buffer[,options],callback)`、`fs.write(fd,string[,position[,encoding]],callback)` 写入数据
   - `fs.read(fd,buffer,offset,length,position,callback)`、`fs.read(fd[,options],callback)`、`fs.read(fd,buffer[,options],callback)` 读取数据 

   - `fs.writev(fd,buffers[,position],callback)` ？
   - `fs.readv(fd,buffers[,position],callback)` ？

   - `fs.fchmod(fd,mode,callback)` 
   - `fs.fchown(fd,uid,gid,callback)` 
   - `fs.fdatasync(fd,callback)` 
   - `fs.fstat(fd[,options],callback)` 
   - `fs.fsync(fd,callback)` 
   - `fs.ftruncate(fd[,len],callback)` 
   - `fs.futimes(fd,atime,mtime,callback)` 
   >f开头的方法用于open方法代开文件后,和对应名称的原方法使用相同

   - `fs.lchmod(path,mode,callback)` 
   - `fs.lchown(path,uid,gid,callback)` 
   - `fs.lutimes(path,atime,mtime,callback)` 
   - `fs.lstat(path[,options],callback)` 
      >l开头的方法 ？
   - `fs.mkdtemp(prefix[,options],callback)` 创建唯一的临时目录
   - `fs.readlink(path[,options],callback)` 读取软链接内容
   - `fs.realpath(path[,optionsf],callback)` 计算真实路径
   - `fs.realpath.native(path[,options],callback)` ？
   - `fs.symlink(target,path[,type],callback)` 创建一个执行地址的软链接(快捷方式？)







2. 同步API：

   fs.accessSync(path[, mode])
   fs.appendFileSync(path, data[, options])
   fs.chmodSync(path, mode)
   fs.chownSync(path, uid, gid)
   fs.closeSync(fd)
   fs.copyFileSync(src, dest[, mode])
   fs.cpSync(src, dest[, options])
   fs.existsSync(path)
   fs.fchmodSync(fd, mode)
   fs.fchownSync(fd, uid, gid)
   fs.fdatasyncSync(fd)
   fs.fstatSync(fd[, options])
   fs.fsyncSync(fd)
   fs.ftruncateSync(fd[, len])
   fs.futimesSync(fd, atime, mtime)
   fs.lchmodSync(path, mode)
   fs.lchownSync(path, uid, gid)
   fs.lutimesSync(path, atime, mtime)
   fs.linkSync(existingPath, newPath)
   fs.lstatSync(path[, options])
   fs.mkdirSync(path[, options])
   fs.mkdtempSync(prefix[, options])
   fs.opendirSync(path[, options])
   fs.openSync(path[, flags[, mode]])
   fs.readdirSync(path[, options])
   fs.readFileSync(path[, options])
   fs.readlinkSync(path[, options])
   fs.readSync(fd, buffer, offset, length[, position])
   fs.readSync(fd, buffer[, options])
   fs.readvSync(fd, buffers[, position])
   fs.realpathSync(path[, options])
   fs.realpathSync.native(path[, options])
   fs.renameSync(oldPath, newPath)
   fs.rmdirSync(path[, options])
   fs.rmSync(path[, options])
   fs.statSync(path[, options])
   fs.symlinkSync(target, path[, type])
   fs.truncateSync(path[, len])
   fs.unlinkSync(path)
   fs.utimesSync(path, atime, mtime)
   fs.writeFileSync(file, data[, options])
   fs.writeSync(fd, buffer, offset[, length[, position]])
   fs.writeSync(fd, buffer[, options])
   fs.writeSync(fd, string[, position[, encoding]])
   fs.writevSync(fd, buffers[, position])








3. 异步Promise API

   fsPromises.access(path[, mode])
   fsPromises.appendFile(path, data[, options])
   fsPromises.chmod(path, mode)
   fsPromises.chown(path, uid, gid)
   fsPromises.copyFile(src, dest[, mode])
   fsPromises.cp(src, dest[, options])
   fsPromises.lchmod(path, mode)
   fsPromises.lchown(path, uid, gid)
   fsPromises.lutimes(path, atime, mtime)
   fsPromises.link(existingPath, newPath)
   fsPromises.lstat(path[, options])
   fsPromises.mkdir(path[, options])
   fsPromises.mkdtemp(prefix[, options])
   fsPromises.open(path, flags[, mode])
   fsPromises.opendir(path[, options])
   fsPromises.readdir(path[, options])
   fsPromises.readFile(path[, options])
   fsPromises.readlink(path[, options])
   fsPromises.realpath(path[, options])
   fsPromises.rename(oldPath, newPath)
   fsPromises.rmdir(path[, options])
   fsPromises.rm(path[, options])
   fsPromises.stat(path[, options])
   fsPromises.symlink(target, path[, type])
   fsPromises.truncate(path[, len])
   fsPromises.unlink(path)
   fsPromises.utimes(path, atime, mtime)
   fsPromises.watch(filename[, options])
   fsPromises.writeFile(file, data[, options])
   fsPromises.constants


   Class: FileHandle
   由`fsPromises.open()`方法创建FileHandle实例

   filehandle类下的实例方法:
   filehandle.appendFile(data[, options])
   filehandle.chmod(mode)
   filehandle.chown(uid, gid)
   filehandle.close()
   filehandle.createReadStream([options])
   filehandle.createWriteStream([options])
   filehandle.datasync()
   filehandle.fd
   filehandle.read(buffer, offset, length, position)
   filehandle.read([options])
   filehandle.read(buffer[, options])
   filehandle.readableWebStream()
   filehandle.readFile(options)
   filehandle.readv(buffers[, position])
   filehandle.stat([options])
   filehandle.sync()
   filehandle.truncate(len)
   filehandle.utimes(atime, mtime)
   filehandle.write(buffer, offset[, length[, position]])
   filehandle.write(buffer[, options])
   filehandle.write(string[, position[, encoding]])
   filehandle.writeFile(data, options)
   filehandle.writev(buffers[, position])

4. fs模块下的类

   1. `fs.ReadStream`类(由`fs.createReadStream()`创建)
      - 继承自`stream.Readable`类
      - `close`事件
      - `open`事件
        - `fd` 文件描述符
      - `ready`事件，open事件之后立即触发
      - `readStream.bytesRead` 已经读取的字节数
      - `readStream.path` 文件url
      - `readStream.pending`布尔值，ready事件触发前为真(底层文件还未被打开)

   2. `fs.WriteStream`类(由`fs.createWriteStream()`创建)
      - 继承自`stream.Writable`类
      - `close`事件
      - `open`事件
        - `fd` 文件描述符
      - `ready`事件，open事件之后立即触发
      - `writeStream.bytesWritten` 已经写入的字节数
      - `writeStream.close([callback])` 关闭文件可写流
      - `writeStream.path` 文件url
      - `writeStream.pending` 布尔值，ready事件触发前为真

   3. `fs.Dir`类(由`fs.opendir()`创建)
   4. `fs.Dirent`类(`fs.readdir()`回调中使用)
   5. `fs.FSWatcher`类(由`fs.watch()`创建)
   6. `fs.StatWatcher`类(由`fs.watchFile()`创建)


## stream 模块

1. 可读流的类：`stream.Readable`
   
   1. 事件：
      - `data` 流动模式读取数据
      - `readable` 暂停模式读取数据，触发条件:下一个事件循环缓存区字节长度小于highWaterMark、默认触发一次、数据全被读到缓存区触发一次
         >readable每次触发存入highWaterMark定义的字节长度，如果缓存区的字节长度小于highWaterMark，则补充highWaterMark字节长度的数据
      - `end` 数据完全消费触发(读取完成)
      - `pause` 流动模式切换到暂停模式
      - `resume` 暂停模式切换到流动模式
      - `close` 资源关闭后触发(close事件为可读流的最后一个事件)
      - `error` 读取错误


   2. 属性：

      -  `readable.readableFlowing` 可读流的实时状态:null(初始状态)、false(暂停模式)、true(流动模式)
      -  `readable.readableHighWaterMark` 可读流每次读取到缓存区的字节长度
      -  `readable.readableLength` 返回缓存区的可读字节长度
      -  `readable.readableEncoding` 返回编码
      -  `readable.closed` 布尔值，close事件触发后为真
      -  `readable.destroyed` 布尔值，调用destroy()方法后为真
      -  `readable.readable` 布尔值，可读流还没被销毁、出错、读完(可调用readable.read()方法读取数据)为真
      -  `readable.readableEnded` 布尔值，end事件触发后为真
      -  `readable.errored` 返回销毁时传入的错误

      -  `readable.readableObjectMode` 布尔值，是否支持除strings、Buffer、Uint8Array以外的其他默写js类型

   3. 方法：
      
      -  `readable.pause()` 流动模式切换到暂停模式
      -  `readable.resume()` 暂停模式切换到流动模式
      -  `readable.isPaused()` 返回布尔值是否处于暂停模式
      -  `readable.read([size])` 从缓冲区读取一定字节数的数据
      -  `readable.unshift(chunk[,encoding])` 将一块数据压回到缓冲区内部
      -  `readable.setEncoding(encoding)` 设置编码
      -  `readable.destroy([error])` 销毁可读流，并抛出错误，释放所有内部资源

      -  `readable.pipe(destination[,options])` 
      -  `readable.unpipe([destination])` 

      -  `readable[Symbol.asyncIterator]()` 可读流为可异步遍历对象
      -  `readable.wrap(stream)` 用于将老版本的流封装成新版本

      - 还有一些类似数组操作的实验性方法



   4. 2种读模式：流动模式(flowing mode)、暂停模式(paused mode)
      - 流动模式：通过data事件获取数据，end事件结束获取
      - 暂停模式：通过调用stream.read()方法显式读取
      - 暂停模式->流动模式
        - 添加data事件处理()
        - 调用stream.resume()
        - 调用stream.pipe()发送数据到可写流
      - 流动模式->暂停模式
        - 不存在管道目标：调用stream.pause()
        - 存在管道目标：移除所有管道目标事件处理，调用stream.unpipe()



2. 可写流的类：`stream.Writable`

   1. 事件：
      
      - `drain` 缓冲区超过水位线后暂停写入，等系统消费完缓冲区的数据后触发drain事件
      - `pipe` 可读流将可写流作为管道目标调用`pipe()`方法时触发
      - `unpipe` 可读流将可写流作为管道目标调用`unpipe()`方法时触发
      - `error` 写入数据出错或管道出错触发
      - `finish` 调用`writable.end()`方法,且缓冲区全部写入后触发
      - `close` 资源关闭后触发(close事件为可惜邪恶流的最后一个事件)

   2. 属性：

      -  `writable.writableLength` 返回缓存区的写入队列的字节长度
      -  `writable.writableNeedDrain` 布尔值,可写流是否需要等待drain事件(缓冲区内容是否大于水位线)
      -  `writable.writableHighWaterMark` 缓冲区内容水位线
      -  `writable.writableCorked` 可写流被阻塞的深数(`uncork()`方法还需要调用的次数)
      -  `writable.closed` 布尔值，close事件触发后为真
      -  `writable.destroyed` 布尔值，调用destroy()方法后为真
      -  `writable.writable` 布尔值，可写流流还没被销毁、出错、写完(可调用readable.read()方法读取数据)为真
      -  `writable.writableEnded` 布尔值，end事件触发后为真
      -  `writable.writableFinished` 布尔值，finish事件触发前置为真
      -  `writable.errored` 返回销毁时传入的错误

      -  `writable.writableObjectMode` 布尔值，是否支持除strings、Buffer、Uint8Array以外的其他默写js类型


   3. 方法：

      -  `writable.write(chunk[, encoding][, callback])` 向缓冲区中写入内容,并返回一个布尔值，表示是否超过水位线(需要等待drain事件)
      -  `writable.end([chunk[, encoding]][, callback])` 向缓冲区中写入内容，并结束可写流的写入
      -  `writable.setDefaultEncoding(encoding)` 设置默认编码 

      -  `writable.cork()` 将调用方法后的write()方法写入的数据都阻塞在缓冲区中
      -  `writable.uncork()` 将缓冲区中的内容输出
      > `writable.cork()`和`writable.uncork()`可多次成对使用

      -  `writable.destroy([error])` 销毁可写流，并抛出错误





3. 模块上的方法

   stream.finished(stream[, options], callback)
   stream.pipeline(source[, ...transforms], destination, callback)
   stream.pipeline(streams, callback)
   stream.compose(...streams)
   stream.Readable.from(iterable[, options])
   stream.Readable.fromWeb(readableStream[, options])
   stream.Readable.isDisturbed(stream)
   stream.isErrored(stream)
   stream.isReadable(stream)
   stream.Readable.toWeb(streamReadable)
   stream.Writable.fromWeb(writableStream[, options])
   stream.Writable.toWeb(streamWritable)
   stream.Duplex.from(src)
   stream.Duplex.fromWeb(pair[, options])
   stream.Duplex.toWeb(streamDuplex)
   stream.addAbortSignal(signal, stream)

4. 双工流的类:`stream.Duplex`
   - 继承自`stream.Readable`、`stream.Writable`

5. 转换流的类:`stream.Transform `
   - 继承自`stream.Readable`、`stream.Writable`

6. 实现自己的流：
   继承对应流的类，且不同的流需要实现内部的抽象方法
   - 可读流 _read
   - 可写流 _write
   - 双工流 _read、_write
   - 转换流 _transform


## global 全局对象

1. 属性
   - __dirname 正在执行脚本所在的目录
   - __filename 正在执行脚本的绝对路径

   - exports
   - module
   - require()


   - process

2. 方法

setTimeout(callback, delay[, ...args])
clearTimeout(timeoutObject)
clearInterval(intervalObject)
setInterval(callback, delay[, ...args])

setImmediate(callback[, ...args])
clearImmediate(immediateObject)






3. 类
   - Buffer 类




## process 模块

1. 系统信息相关

   - `process.memoryUsage()`
   - `process.cpuUsage([previousValue])` 不传参则返回包含当前进程的用户CPU时间和系统CPU时间的对象,如果传入上次调用的返回值，则返回差值

   - `process.cwd()` 进程当前工作的目录
   - `process.version` node 版本号
   - `process.versions` node及其子模块版本号
   - `process.arch` cpu架构
   - `process.platform` 操作系统平台
   - `process.env` 系统环境变量，常用：
      - `process.env.NODE`_ENV 区分生产环境或开发环境
      - `process.env.PATH` (PATH中包含的可执行文件可在命令行中执行)
      - `process.env.USERPROFILE` windows系统的用户根目录
      - `process.env.HOME` mac系统的用户根目录

   - `process.argv` 启动Node.js进程时的命令行参数数组(不包括`--xxx`参数)
   - `process.argv0` node命令可执行文件的绝对路径，同`process.execPath`
   - `process.execArgv` 启动Node.js进程时的特定命令行选项(紧跟在node命令后的`--xxx`参数)
   - `process.execPath` node命令可执行文件的绝对路径

   - `process.pid` 操作系统为进程分配的唯一id，如果进程消灭会被重新分配给其他进程
   - `process.ppid` 

   - `process.config` 返回一个描述编译当前Node.js执行程序时涉及的配置项信息的对象










   - `process.stderr` 标准错误流
      - `process.stderr.fd`
   - `process.stdin` 标准输入流
      - `process.stdin.fd`
   - `process.stdout` 标准输出流
      - `process.stdout.fd`







1. 事件：

   - `exit` 进程结束触发
     - `code` 结束状态码
   - `beforeExit` 进程结束前触发(不会被`process.exit()`和未捕获的异常退出触发)
     - `code` 结束状态码
   >exit事件回调中加入异步操作不会执行并结束进程，beforeExit事件回调中加入异步操作会继续进程

   - `rejectionHandled` 进程中的Promise对象发生异常(reject)被`then()`方法或`catch()`方法处理后触发
   - `unhandledRejection` 进程中的Promise对象发生异常(reject)且没有被`then()`方法或`catch()`方法处理则触发
   
   - `disconnect` 子进程相关
   - `message` 子进程相关

   - `uncaughtException` 程序出现未知错误时(如调用未定义的函数)触发，用回调代替默认行为(终止程序，打印错误堆栈)
      >`uncaughtException`事件处理回调函数中如果再出错不会重复触发，防止递归
   - `uncaughtExceptionMonitor` 程序出现未知错误时触发(在`uncaughtException`事件之前)，但不会阻止程序的崩溃
   - `warning` node发出警告时触发，比如限制同名事件数量被打破时会触发
   
   - `worker` 新的worker线程被创建时触发


2. 代码执行相关




   - `process.abort()` 立即结束程序进程，生成一个核心文件
   - `process.exit([code])` 结束程序进程，并传入状态码，默认使用`process.exitCode`
   - `process.exitCode` 结束状态码，默认为0
   - `process.uptime()` 当前脚本执行的时间，可多次调用


process.allowedNodeEnvironmentFlags


process.channel
   process.channel.ref()
   process.channel.unref()
process.chdir(directory)
process.connected


process.debugPort
process.disconnect()
process.dlopen(module, filename[, flags])
process.emitWarning(warning[, options])
process.emitWarning(warning[, type[, code]][, ctor])



process.getActiveResourcesInfo()


process.setuid(id)
process.getuid()
process.setgid(id)
process.getgid()
process.setegid(id)
process.getegid()
process.seteuid(id)
process.geteuid()
process.setgroups(groups)
process.getgroups()




process.hasUncaughtExceptionCaptureCallback()
process.hrtime([time])
process.hrtime.bigint()
process.initgroups(user, extraGroup)
process.kill(pid[, signal])


process.memoryUsage.rss()
process.nextTick(callback[, ...args])

process.noDeprecation



process.release
process.report
   process.report.compact
   process.report.directory
   process.report.filename
   process.report.getReport([err])
   process.report.reportOnFatalError
   process.report.reportOnSignal
   process.report.reportOnUncaughtException
   process.report.signal
   process.report.writeReport([filename][, err])
process.resourceUsage()
process.send(message[, sendHandle[, options]][, callback])

process.setSourceMapsEnabled(val)
process.setUncaughtExceptionCaptureCallback(fn)


process.throwDeprecation
process.title 当前进程在 ps 命令中显示的进程名字
process.traceDeprecation

process.umask(mask)











## Buffer 类



1. Buffer类的静态方法：

   - `Buffer.from()` 根据参数返回buffer对象，多种参数形式如下
      - `Buffer.from(array)`
      - `Buffer.from(arrayBuffer[, byteOffset[, length]])`
      - `Buffer.from(buffer)`
      - `Buffer.from(object[, offsetOrEncoding[, length]])`
      - `Buffer.from(string[, encoding])`
   - `Buffer.alloc(size[, fill[, encoding]])` 创建一个重置(全是0)的buffer对象
   - `Buffer.allocUnsafe(size)` 创建一个未重置(其中可能有未清零的数据)的buffer对象
   - `Buffer.isBuffer(obj)` 判断是否为buffer对象
   - `Buffer.byteLength(string[, encoding])` 返回一个字符串的实际字节长度
   - `Buffer.compare(buf1, buf2)` 返回+1、-1、0，结果为两个buffer对象从第一位开始的字节序列的比较结果，可用于排序
   - `Buffer.concat(list[, totalLength])` 返回拼接的buffer对象并限制长度
   - `Buffer.isEncoding(encoding)` 检查字符串是否为一个字符编码，如`utf8`、`hex`

   - `Buffer.allocUnsafeSlow(size)` ？
   - `Buffer.poolSize` ？ 用于决定预分配的、内部 Buffer实例池的大小的字节数,默认8192

2. Buffer实例对象上的属性方法

   - `buf.write(string[, offset[, length]][, encoding])` 向buffer对象中写入数据
   - `buf.toString([encoding[, start[, end]]])` 从buffer对象中提取数据
   - `buf.toJSON()` 返回buffer对象的JSON格式
   - `buf.includes(value[, byteOffset][, encoding])` 从buffer对象中搜索对应值，返回布尔值
   - `buf.indexOf(value[, byteOffset][, encoding])` 从buffer对象中查找对应值的第一个索引
   - `buf.lastIndexOf(value[, byteOffset][, encoding])` 从buffer对象中查找对应值的最后一个索引
   - `buf.fill(value[, offset[, end]][, encoding])` 用值填充buffer对象（重复填充置buffer存满）
   - `buf.slice([start[, end]])` 返回buffer对象的部分截取组成的buffer对象(废弃，用`buf.subarray()`代替)
   - `buf.subarray([start[, end]])` 返回buffer对象的部分截取组成的buffer对象

   - `buf.compare(target[, targetStart[, targetEnd[, sourceStart[, sourceEnd]]]])` 返回+1、-1、0，结果为两个buffer对象从第一位开始的字节序列的比较结果，可用于排序
   - `buf.copy(target[, targetStart[, sourceStart[, sourceEnd]]])` 将本buffer对象的一段拷贝进目标buffer对象的指定位置
   - `buf.equals(otherBuffer)` 比较两个buffer对象是否相同，返回布尔值

   - `buf.keys()` 返回键名（索引）的迭代器
   - `buf.values()` 返回键值（字节）的迭代器
   - `buf.entries()` 返回`[index, byte]`的迭代器

   - `buf.swap16()`、`buf.swap32()`、`buf.swap64()`
      将buffer对象内部进行区域划分，并进行再区域内颠倒并返回且修改原buffer对象，分别以16位（2个字节）、32位（4个字节）、64位（8个）字节为一个区域

   - `buf.length` 字节数上分配的内存量
   - `buf.buffer` 指向创建该Buffer的底层ArrayBuffer对象
   - `buf.byteOffset` 底层ArrayBuffer对象的位偏移

   - 字节序读写相关：BE(大端序)、LE(小端序) ？
      - `buf.readBigInt64BE([offset])`
      - `buf.readBigInt64LE([offset])`
      - `buf.readBigUInt64BE([offset])`
      - `buf.readBigUInt64LE([offset])`
      - `buf.readDoubleBE([offset])`
      - `buf.readDoubleLE([offset])`
      - `buf.readFloatBE([offset])`
      - `buf.readFloatLE([offset])`
      - `buf.readInt8([offset])`
      - `buf.readInt16BE([offset])`
      - `buf.readInt16LE([offset])`
      - `buf.readInt32BE([offset])`
      - `buf.readInt32LE([offset])`
      - `buf.readIntBE(offset, byteLength)`
      - `buf.readIntLE(offset, byteLength)`
      - `buf.readUInt8([offset])`
      - `buf.readUInt16BE([offset])`
      - `buf.readUInt16LE([offset])`
      - `buf.readUInt32BE([offset])`
      - `buf.readUInt32LE([offset])`
      - `buf.readUIntBE(offset, byteLength)`
      - `buf.readUIntLE(offset, byteLength)`
      - `buf.writeBigInt64BE(value[, offset])`
      - `buf.writeBigInt64LE(value[, offset])`
      - `buf.writeBigUInt64BE(value[, offset])`
      - `buf.writeBigUInt64LE(value[, offset])`
      - `buf.writeDoubleBE(value[, offset])`
      - `buf.writeDoubleLE(value[, offset])`
      - `buf.writeFloatBE(value[, offset])`
      - `buf.writeFloatLE(value[, offset])`
      - `buf.writeInt8(value[, offset])`
      - `buf.writeInt16BE(value[, offset])`
      - `buf.writeInt16LE(value[, offset])`
      - `buf.writeInt32BE(value[, offset])`
      - `buf.writeInt32LE(value[, offset])`
      - `buf.writeIntBE(value, offset, byteLength)`
      - `buf.writeIntLE(value, offset, byteLength)`
      - `buf.writeUInt8(value[, offset])`
      - `buf.writeUInt16BE(value[, offset])`
      - `buf.writeUInt16LE(value[, offset])`
      - `buf.writeUInt32BE(value[, offset])`
      - `buf.writeUInt32LE(value[, offset])`
      - `buf.writeUIntBE(value, offset, byteLength)`
      - `buf.writeUIntLE(value, offset, byteLength)`


## path 模块

1. path模块下的属性

   - `path.delimiter` 对应平台下的路径分隔符(Windows上是`;`,POSIX上是`:`)
   - `path.sep` 路径片段分隔符(Windows上是`\`,POSIX上是`/`)
   - `path.posix` 针对posix平台的path模块对象
   - `path.win32` 针对window平台的path模块对象

2. path模块下的方法

   - `path.basename(path[, ext])` 返回文件不包括目录的文件名(如果提供扩展名则也不包括扩展名)
   - `path.dirname(path)` 返回文件的目录名
   - `path.extname(path)` 返回文件的扩展名(包括最后一个逗号之后的内容)
   - `path.parse(path)` 将路径字符串转化成pathObject对象
   - `path.format(pathObject)` 将pathObject对象转换成路径字符串
   - `path.relative(from, to)` 返回两个路径之间的相对路径
   - `path.isAbsolute(path)` 布尔值，判断是否为绝对路径
   - `path.normalize(path)` 将路径规范化(处理多余的连续分隔符和将相对路径转化为绝对路径)
   - `path.join([...paths])` 将路径片段合并
   - `path.resolve([...paths])` 拼接出一个绝对路径，参数从右向左处理，直到拼接成一个绝对路径
      >`/`根目录,`./`当前目录，`../`上一级目录

   - `path.toNamespacedPath(path)` 从给定路径中找到等效的namespace-prefixed路径(仅Windows系统可用) ？


## module 模块
1. 模块包装器：
   ```js
   //wrap函数会将模块中的代码包装到函数中
   (function(exports, require, module, __filename, __dirname) {
   // 模块的代码实际上在这里
   });
   ```

2. module 对象 

   -  `module` 当前模块
   -  `module.require(id)` 加载模块并返回对应模块的暴露内容
   -  `module.id` 模块标识符，一般为一个绝对路径
   -  `module.filename` 文件模块的绝对路径(通常等于`__filename`)
   -  `module.loaded` 布尔值，模块是否加载完成
   -  `module.parent` 调用当前模块的模块
   -  `module.children` 当前模块调用的其他模块的数组
   -  `module.exports` 暴露内容
   -  `module.paths` 祖先各级目录下的node_modules位置
   -  `module.path` 文件模块所在的目录
   -  `module.isPreloading` 布尔值，模块是否运行在预加载阶段

3. require对象

   - `require(id)` 
   - `require.cache` 被引入的模块将被缓存在这个对象中
   - `require.main` 入口模块
   - `require.resolve(request[,options])` 使用内部的`require()`机制查询模块的位置,此操作只返回解析后的文件名，不会加载该模块
   - `require.resolve.paths(request)` 返回解析request过程中所有被查询的路径数组

 
4. 模块加载过程（查询过程）

   1. 判断是否为核心模块（如http），如果是，则直接加载，不是则继续查询
   2. 判断为绝对路径还是相对路径，如果是绝对路径，则以文件系统根目录作为基础目录，如果是相对路径，则以当前路径作为基础路径
   3. 合成加载文件或目录的地址
   4. 查询此地址的资源是否存在：
      判断地址为文件，目录
         1. 如果为文件，根据后缀判断文件类型并加载
            - 空、.js作为js文本加载
            - .json解析为js对象加载
            - .node作为二进制插件加载
         2. 如果为目录，则查询目录中package.json中main字段，存在则加载对应地址的资源，不存在，则查询当前目录下的index.xxx文件作为资源进行加载
         3. 如都不存在，则继续查询
   5. 查询是否为Node模块，从当前地址逐步向上查询所有不为node_modules的祖先目录，并在其中的node_modules目录中查询是否存在对应的资源，如都不存在则进行下一步
   6. 抛出未找到模块的错误


   官方伪代码
   ```js
   从 Y 路径的模块 require(X)
   1. 如果 X 是一个核心模块，
      a. 返回核心模块
      b. 结束
   2. 如果 X 是以 '/' 开头
      a. 设 Y 为文件系统根目录
   3. 如果 X 是以 './' 或 '/' 或 '../' 开头
      a. 加载文件(Y + X)
      b. 加载目录(Y + X)
   4. 加载Node模块(X, dirname(Y))
   5. 抛出 "未找到"
   
   加载文件(X)
   1. 如果 X 是一个文件，加载 X 作为 JavaScript 文本。结束
   2. 如果 X.js 是一个文件，加载 X.js 作为 JavaScript 文本。结束
   3. 如果 X.json 是一个文件，解析 X.json 成一个 JavaScript 对象。结束
   4. 如果 X.node 是一个文件，加载 X.node 作为二进制插件。结束
   
   加载索引(X)
   1. 如果 X/index.js 是一个文件，加载 X/index.js 作为 JavaScript 文本。结束
   3. 如果 X/index.json  是一个文件，解析 X/index.json 成一个 JavaScript 对象。结束
   4. 如果 X/index.node 是一个文件，加载 X/index.node 作为二进制插件。结束
   
   加载目录(X)
   1. 如果 X/package.json 是一个文件，
      a. 解析 X/package.json，查找 "main" 字段
      b. let M = X + (json main 字段)
      c. 加载文件(M)
      d. 加载索引(M)
   2. 加载索引(X)
   
   加载Node模块(X, START)
   1. let DIRS=NODE_MODULES_PATHS(START)
   2. for each DIR in DIRS:
      a. 加载文件(DIR/X)
      b. 加载目录(DIR/X)
   
   NODE_MODULES_PATHS(START)
   1. let PARTS = path split(START)
   2. let I = count of PARTS - 1
   3. let DIRS = []
   4. while I >= 0,
      a. if PARTS[I] = "node_modules" CONTINUE
      b. DIR = path join(PARTS[0 .. I] + "node_modules")
      c. DIRS = DIRS + DIR
      d. let I = I - 1
   5. return DIRS
   ```

5. 自写简易模块化[mymodule.js](mymodule.js)


## vm 模块


>用于模块化中读取文件中的代码后执行这些代码，优点：沙箱环境不影响上下文环境
>类似可用`eval()`函数和`new Function()`构造函数实现

1. 模块下的方法
   - `vm.createContext([contextObject[, options]])` 创建上下文环境对象并返回
   - `vm.isContext(object)` 返回布尔值，判断一个对象是否为一个上下文环境对象
   - `vm.runInContext(code, contextifiedObject[, options])` 将代码串运行在一个上下文环境中
   - `vm.runInNewContext(code[, contextObject[, options]])` 将代码串运行在一个新的上下文环境中
   - `vm.runInThisContext(code[, options])` 将代码串运行在当前上下文环境中
   - `vm.compileFunction(code[, params[, options]])` 返回一个对应参数的函数，函数中包含给定代码
      >类似`new Function()`构造函数


2. `vm.Script`类实例下的方法
   - `new vm.Script(code[, options])` 创建一个脚本实例用于上下文环境中执行
   - `script.createCachedData()`
   - `script.runInContext(contextifiedObject[, options])`
   - `script.runInNewContext([contextObject[, options]])`
   - `script.runInThisContext([options])`

3. 类vm.Module、vm.SourceTextModule、vm.SyntheticModule相关？？？






## net 模块
用于tcp协议通信


1. net模块下的方法：

   - `net.createServer([options][, connectionListener])` 创建`net.Server`类实例并返回

   - net.createConnection() (别名net.connect()) 创建`net.Socket`类实例并返回
      - net.createConnection(options[, connectListener])
      - net.createConnection(path[, connectListener])
      - net.createConnection(port[, host][, connectListener])  创建tcp连接的socket

  
   - `net.isIP(input)` 判断字符串是否为ipv4、ipv6地址，返回4(ipv4)、6(ipv6)、0(无效)
   - `net.isIPv4(input)` 布尔值，判断字符串是否为ipv4地址
   - `net.isIPv6(input)` 布尔值，判断字符串是否为ipv6地址

2. net模块下的类：
   1. `net.Server`类(由`net.createServer()`创建)
      1. 事件：
         - `close` 服务器关闭触发(调用`server.close()`)
         - `connection` 创建新的连接触发(`server.listen()`监听成功时触发)
           - socket net.Socket类实例
         - `error`
         - `listening` 服务器绑定后触发(调用`server.listen()`)
         - `drop` 连接数超过`server.maxConnections`触发

      2. 属性方法：
         - `new net.Server([options][, connectionListener])` 创建一个服务器实例
         - `server.address()`
         - `server.close([callback])` 关闭服务器
         - `server.getConnections(callback)`
         - `server.listen()` 为`connection`事件创建一个监听
            - `server.listen(handle[, backlog][, callback])`
            - `server.listen(options[, callback])`
            - `server.listen(path[, backlog][, callback])`
            - `server.listen([port[, host[, backlog]]][, callback])` 监听端口
         - `server.listening`
         - `server.maxConnections` 最大连接数
         - `server.ref()`
         - `server.unref()`

   2. Class: net.Socket
      1. 事件
         - Event: 'close'
         - Event: 'connect'
         - Event: 'data'
         - Event: 'drain'
         - Event: 'end'
         - Event: 'error'
         - Event: 'lookup'
         - Event: 'ready'
         - Event: 'timeout'



      2. 属性方法
         - new net.Socket([options])
         - socket.address()
         - socket.bufferSize
         - socket.bytesRead
         - socket.bytesWritten
         - socket.connect()
         - socket.connect(options[, connectListener])
         - socket.connect(path[, connectListener])
         - socket.connect(port[, host][, connectListener])
         - socket.connecting
         - socket.destroy([error])
         - socket.destroyed
         - socket.end([data[, encoding]][, callback])
         - socket.localAddress
         - socket.localPort
         - socket.pause()
         - socket.pending
         - socket.ref()
         - socket.remoteAddress
         - socket.remoteFamily
         - socket.remotePort
         - socket.resetAndDestroy()
         - socket.resume()
         - socket.setEncoding([encoding])
         - socket.setKeepAlive([enable][, initialDelay])
         - socket.setNoDelay([noDelay])
         - socket.setTimeout(timeout[, callback])
         - socket.timeout
         - socket.unref()
         - socket.write(data[, encoding][, callback])
         - socket.readyState












Class: net.BlockList
blockList.addAddress(address[, type])
blockList.addRange(start, end[, type])
blockList.addSubnet(net, prefix[, type])
blockList.check(address[, type])
blockList.rules
Class: net.SocketAddress
new net.SocketAddress([options])
socketaddress.address
socketaddress.family
socketaddress.flowlabel
socketaddress.port






## zlib 模块



## util 模块

1. util模块下的方法：
   - `util.promisify(original)` 返回错误优先风格的回调作为最后一个参数的函数的promise形式函数
      >如果原函数最后一个参数不为回调，则返回的函数的返回值为undefined ？
      >如果原函数对象下有名为`util.promisify.custom`(symbol类型)的属性，则返回此属性的值，此属性值不为函数则报错


util.callbackify(original)
util.debuglog(section[, callback])
util.debug(section)
util.deprecate(fn, msg[, code])
util.format(format[, ...args])
util.formatWithOptions(inspectOptions, format[, ...args])
util.getSystemErrorName(err)
util.getSystemErrorMap()
util.inherits(constructor, superConstructor)
util.inspect(object[, options]) 将对象转化为字符串
util.inspect(object[, showHidden[, depth[, colors]]])
util.isDeepStrictEqual(val1, val2)
util.parseArgs([config])
util.stripVTControlCharacters(str)

util.toUSVString(string)
util.types
util.types.isAnyArrayBuffer(value)
util.types.isArrayBufferView(value)
util.types.isArgumentsObject(value)
util.types.isArrayBuffer(value)
util.types.isAsyncFunction(value)
util.types.isBigInt64Array(value)
util.types.isBigUint64Array(value)
util.types.isBooleanObject(value)
util.types.isBoxedPrimitive(value)
util.types.isCryptoKey(value)
util.types.isDataView(value)
util.types.isDate(value)
util.types.isExternal(value)
util.types.isFloat32Array(value)
util.types.isFloat64Array(value)
util.types.isGeneratorFunction(value)
util.types.isGeneratorObject(value)
util.types.isInt8Array(value)
util.types.isInt16Array(value)
util.types.isInt32Array(value)
util.types.isKeyObject(value)
util.types.isMap(value)
util.types.isMapIterator(value)
util.types.isModuleNamespaceObject(value)
util.types.isNativeError(value)
util.types.isNumberObject(value)
util.types.isPromise(value)
util.types.isProxy(value)
util.types.isRegExp(value)
util.types.isSet(value)
util.types.isSetIterator(value)
util.types.isSharedArrayBuffer(value)
util.types.isStringObject(value)
util.types.isSymbolObject(value)
util.types.isTypedArray(value)
util.types.isUint8Array(value)
util.types.isUint8ClampedArray(value)
util.types.isUint16Array(value)
util.types.isUint32Array(value)
util.types.isWeakMap(value)
util.types.isWeakSet(value)

1. util模块下的类

Class: util.TextEncoder
Class: util.TextDecoder

## crypto 模块

1. crypto模块下的属性和方法
   - `crypto.getHashes()` 返回支持的hash算法名字
   - `crypto.createHash(algorithm[, options])` 根据算法的名字创建返回`Hash`类实例




2. crypto模块下的类

   1. `Hash`类(由`crypto.createHash()`创建)
      继承自`stream.Transform`类
      - hash.copy([options]) 返回深拷贝`Hash`类实例
      - hash.digest([encoding]) 将hash值编码导出
      - hash.update(data[, inputEncoding]) 根据数据更新内部hash值




##



