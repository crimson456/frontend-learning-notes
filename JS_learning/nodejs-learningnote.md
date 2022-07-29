# Nodejs Learning

nodejs中事件用`on()`方法监听


## http 模块

const http = require('http')

http 模块下的方法:

1. `http.createServer([options][, requestListener])`
   返回一个 http.Server 对象
   requestListener为Server对象下监听请求事件的处理函数(可在后续Server对象上写监听函数)

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

   - `fs.createReadStream(path[, options])` 创建可读流
   - `fs.createWriteStream(path[, options])` 创建可写流

   - `fs.truncate(path[, len], callback)` 修改文件的长度(截短或增长)
   - `fs.utimes(path, atime, mtime, callback)` 修改文件的最后修改时间和最后访问时间的时间戳

   - `fs.watch(filename[, options][, listener])` 监听文件或目录变化，返回`fs.FSWatcher`类实例
   - `fs.watchFile(filename[, options], listener)` 监听文件变化，返回`fs.StatWatcher`类实例
   - `fs.unwatchFile(filename[, listener])` 移除监听文件的监听器

   `fs.open(path[, flags[, mode]], callback)` 打开文件，回调中有参数`fd`(文件描述符)，可根据`fd`执行文件内  容读写操作,回调中可执行的方法
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
      >f开头的方法用于open方法代开文件后,和对应的版方法使用相同

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

5. 自写简易模块化[mynodemodule.js](mynodemodule.js)


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

##



##



##



##



##



