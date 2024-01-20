# Websocket Learning


## 浏览器端

`new WebSocket(url [, protocols])`



1. 实例属性、方法
   - `binaryType`
   - `bufferedAmount`
   - `extensions`
   - `protocol`
   - `readyState`
   - `url`
   - `close()`
   - `send()`
2. 事件
   - `close`
   - `error`
   - `message`
   - `open`



## node端

### ws库


```js
// node端可以通过http.createServer创建服务器(传入express、koa2创建的app)
// koa2中是使用app.callback()
// 在一个端口同时监听http请求和ws请求
const server = http.createServer(app.callback())
const wss = new Ws.WebSocketServer({ server });
// 注意wss为服务器，对应的是node的connection事件
// wss.clients包括了所有连接的ws对象
wss.on('connection', function connection(ws) {
  //websocket上的事件有open、error、message、close
  ws.on('error', console.error);
  ws.on('message', function message(data) {
    console.log('received: %s', data);
  });
  ws.send('something');
});


```






### 

### socket.io 和 socket.io-client













