# Nodejs Learning

nodejs中事件用`on()`方法监听


## http 模块

const http = require('http')

http 模块下的方法:

1. `http.createServer([options][, requestListener])`
   返回一个 http.Server 对象
   requestListener 为Server对象下监听请求事件的处理函数(可在后续Server对象上写监听函数)

2. ``

http 模块下的类：

1. `http.Server`

   1. 事件：
      - request 事件，参数 request，response，分别为 http.IncomingMessage、http.ServerResponse 类
      -
   2. 方法：
      - listen()监听端口



2. `http.IncomingMessage`(req)
   1. 属性：
      - url 请求的网址字符串
      - 
   2. 事件：
      - data (继承自流) 回调参数:chunk(数据块，拼接后得到完整数据)
      - end (继承自流)  数据传输结束后调用

3. `http.ServerResponse`(res)
   1. 方法：
      - `response.write(chunk[, encoding][, callback])`
        可多次调用，发送响应正文
        >encoding：chunk的编码方式,默认utf8
        >callback:刷新数据块时将调用
      - `response.writeHead(statusCode[, statusMessage][, headers])`
        添加多个响应头和响应状态码
        >statusCode:http状态码
        >statusMessage：状态信息，如‘ok’
        >headers：响应头JSON对象形式
      - `response.setHeader(key, value)`
        设置响应头的单个属性
        >`writeHead()`方法优先级更高
      - `response.end([data[, encoding]][, callback])`
        发送响应正文(用法同`write()`方法)，并结束这次请求
      - 




4. 发送请求
  `http.request(url[,options][,callback])`
  `http.request(options[,callback])`
  `http.get(options[,callback])`
  `http.get(url[,options][,callback])`
  返回http.ClientRequest类的实例对象，用于请求数据



















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
```js
const querystring = require('node:querystring');
```

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

2. EventEmitter实例对象下的方法：

  - `emitter.on(eventName, listener)`添加事件监听
    >注意：同名事件可多次注册，有一个事件数组来存储事件处理程序，新注册的方法会放在队尾，如果想循环中只触发一次处理方法：每次重新创建事件触发对象
  - `emitter.addListener(eventName, listener)`添加事件监听，同`on()`方法相同
  - `emitter.off(eventName, listener)`移除事件监听
  - `emitter.removeListener(eventName, listener)`移除事件监听，同`off()`方法相同
  - `emitter.once(eventName, listener)`添加只会触发一次的事件监听
  - `emitter.removeAllListeners([eventName])`

  - `emitter.emit(eventName[, ...args])`触发事件

  - `emitter.eventNames()`返回所有事件名
  - `emitter.listeners(eventName)`返回对应事件名的事件数组但不包括`once()`登方法创建的
  - `emitter.rawListeners(eventName)`返回对应事件名的事件数组包括`once()`登方法创建的
  - `emitter.listenerCount(eventName)`返回对应事件名的处理函数个数

  - `emitter.setMaxListeners(n)`设置事件数组的最大长度
  - `emitter.getMaxListeners()`获取事件数组的最大长度

  - `emitter.prependListener(eventName, listener)`添加事件监听在事件数组的队头
  - `emitter.prependOnceListener(eventName, listener)`添加只会触发一次的事件监听在事件数组的队头








## fs 模块


2. 异步回调API：（回调为错误为第一参数风格）

`fs.mkdir(path[, options], callback)` 创建目录
`fs.readdir(path[, options], callback)` 读取目录(回调收到一个文件名数组)
`fs.rename(oldPath, newPath, callback)` 重命名目录
`fs.rmdir(path[, options], callback)` 删除目录(有文件不能删除)

`fs.writeFile(file, data[, options], callback)` 文件内容重写
`fs.appendFile(path, data[, options], callback)` 文件内容添加(文件不存在则创建)
`fs.readFile(path[, options], callback)` 文件内容读取，返回到callback第二参数中
>注意：读取文件如果不设置编码方式，会返回buffer对象

`fs.stat(path[, options], callback)` 读取文件或目录的信息，如创建时间，是否是文件或目录


`fs.access(path[, mode], callback)` 测试指定的文件或目录的用户权限
`fs.chmod(path, mode, callback)` 改变文件或目录的权限
`fs.chown(path, uid, gid, callback)` 改变文件的所有者和群组

`fs.copyFile(src, dest[, mode], callback)` 复制文件内容
`fs.cp(src, dest[, options], callback)` 复制文件内容


`fs.link(existingPath, newPath, callback)` 创建软链接
`fs.unlink(path, callback)` 删除文件或软链接



`fs.createReadStream(path[, options])` 创建可读流
`fs.createWriteStream(path[, options])` 创建可写流


fs.fchmod(fd, mode, callback)
fs.fchown(fd, uid, gid, callback)
fs.fdatasync(fd, callback)
fs.fstat(fd[, options], callback)
fs.fsync(fd, callback)
fs.ftruncate(fd[, len], callback)
fs.futimes(fd, atime, mtime, callback)
>f开头的方法用于open方法代开文件后

fs.lchmod(path, mode, callback)
fs.lchown(path, uid, gid, callback)
fs.lutimes(path, atime, mtime, callback)
fs.lstat(path[, options], callback)
>l开头的方法

fs.close(fd[, callback])
fs.mkdtemp(prefix[, options], callback)
fs.open(path[, flags[, mode]], callback)
fs.opendir(path[, options], callback)
fs.read(fd, buffer, offset, length, position, callback)
fs.read(fd[, options], callback)
fs.read(fd, buffer[, options], callback)
fs.readlink(path[, options], callback)
fs.readv(fd, buffers[, position], callback)
fs.realpath(path[, optionsf], callback)
fs.realpath.native(path[, options], callback)
fs.rm(path[, options], callback)
fs.symlink(target, path[, type], callback)
fs.truncate(path[, len], callback)
fs.unwatchFile(filename[, listener])
fs.utimes(path, atime, mtime, callback)
fs.watch(filename[, options][, listener])
fs.watchFile(filename[, options], listener)
fs.write(fd, buffer, offset[, length[, position]], callback)
fs.write(fd, buffer[, options], callback)
fs.write(fd, string[, position[, encoding]], callback)
fs.writev(fd, buffers[, position], callback)



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
`fsPromises.open()`方法创建返回的文件描述符为FileHandle实例

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





## stream 模块

1. 可写流的类：`stream.Writable`
   1. 事件：
      
      - Event: 'close'
      - Event: 'drain'
      - Event: 'error'
      - Event: 'finish'
      - Event: 'pipe'
      - Event: 'unpipe'

   2. 属性：

      - writable.closed
      - writable.destroyed
      - writable.writable
      - writable.writableAborted
      - writable.writableEnded
      - writable.writableCorked
      - writable.errored
      - writable.writableFinished
      - writable.writableHighWaterMark
      - writable.writableLength
      - writable.writableNeedDrain
      - writable.writableObjectMode


   3. 方法：

      - writable.cork()
      - writable.destroy([error])
      - writable.end([chunk[, encoding]][, callback])
      - writable.setDefaultEncoding(encoding)
      - writable.uncork()
      - writable.write(chunk[, encoding][, callback])

2. 可读流的类：
   1. 事件：

      - Event: 'close'
      - Event: 'data'
      - Event: 'end'
      - Event: 'error'
      - Event: 'pause'
      - Event: 'readable'
      - Event: 'resume'

   2. 属性：

      - readable.closed
      - readable.destroyed
      - readable.readable
      - readable.readableAborted
      - readable.readableDidRead
      - readable.readableEncoding
      - readable.readableEnded
      - readable.errored
      - readable.readableFlowing
      - readable.readableHighWaterMark
      - readable.readableLength
      - readable.readableObjectMode

   3. 方法：

      - readable.destroy([error])
      - readable.isPaused()
      - readable.pause()
      - readable.pipe(destination[, options])
      - readable.read([size])
      - readable.resume()
      - readable.setEncoding(encoding)
      - readable.unpipe([destination])
      - readable.unshift(chunk[, encoding])
      - readable.wrap(stream)
      - readable[Symbol.asyncIterator]()
      - readable.iterator([options])
      - readable.map(fn[, options])
      - readable.filter(fn[, options])
      - readable.forEach(fn[, options])
      - readable.toArray([options])
      - readable.some(fn[, options])
      - readable.find(fn[, options])
      - readable.every(fn[, options])
      - readable.flatMap(fn[, options])
      - readable.drop(limit[, options])
      - readable.take(limit[, options])
      - readable.asIndexedPairs([options])
      - readable.reduce(fn[, initial[, options]])

##



##



##



##



##



##



##



##



##



##



##



