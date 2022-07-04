# Promise Learning

## 一.promise的封装
1. 把一个方法封装成promise对象（以nodejs内置readFile为例）

    ```js
    function promisifyreadfile(path) {
        return new Promise((resolve, reject) => {
            require('fs').readFile(path, (err, data) => {
                if (err) reject(err);
                resolve(data);
            })
        })
    }
    ```

2. 用node自带的util模块下的`promisify`方法封装  
    `util.promisify()`方法将错误优先的回调风格的函数（也就是将 (err, value) => ... 回调作为最后一个参数）转换为promise对象
    
    ```js
    const util = require('util');
    const fs = require('fs');
    const promisifyreadfile = util.promisify(fs.readFile);
    ```

## Promise 对象
1. 属性
    1. PromiseState

    2. PromiseResult

2. 构造对象下的方法
    1. ``
    2. ``
    3. ``
    4. ``
    5. ``
    6. ``

3. 实例对象下的方法
    1. ``
    2. ``
    3. ``
    4. ``




## 二.promise实例的属性
一个promise实例下有两个属性`PromiseState`和`PromiseResult`  
1.promise实例必然处于以下几种状态之一：  
待定（pending）: 初始状态，既没有被兑现，也没有被拒绝  
已兑现（fulfilled/resolved）: 意味着操作成功完成  
已拒绝（rejected）: 意味着操作失败  
并且状态转换只能从`pending`到`fulfilled`(通过调用`resolve()`)或者`rejected`(通过调用`reject()`)  
2.promise的结果为调用`resolve()`或者`reject()`传入的参数  

## 三.Promise的静态方法  
在Promise对象下有几个静态方法：  
0.构造函数：  
将处理器函数(executor function)`(resolve,reject)=>{}`作为参数  
异步任务顺利完成调用`resolve(value)`,  
异步任务失败调用`reject(value)`,  
`value`为成功时得到的数据，或者失败时的错误信息(会传给后面调用的`then()`和`catch()`方法)

1.`Promise.resolve(value)`:  
如果`value`为非promise对象，返回一个状态为`fulfilled`结果为`value`的promise对象，  
如果`value`为promise对象，直接返回`value`

2.`Promise.reject(reason)`:  
返回一个状态为`rejected`结果为`reason`的promise对象  

3.`Promise.all([p1,p2,p3])`  //(举例为三个，可为多个)  
可以接收多个promise对象作为参数(也可以不为promise对象，详见[官方文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/all))  
如果`p1,p2,p3`状态都为`fufilled`，则返回一个状态为`fufilled`，结果为`[p1.PromiseResult,p2.PromiseResult,p3.PromiseResult]`数组的promise对象  
如果任意一个参数数组中的promise对象状态为`rejected`，则返回该对象  
如果`p1,p2,p3`中有异步对象，则会先返回一个状态为`pending`的promise对象，待异步对象执行完毕后更新  

4.`Promise.race([p1,p2,p3])`  //(举例为三个，可为多个)  
返回第一个改变状态(`fufilled`或`rejected`)的promise对象


## 四.promise的实例方法
1.`then((value)=>{},(reason)=>{})`  
调用实例对象的`then()`会根据实例对象处理器函数中的`resolve()`和`reject()`函数的调用情况来选择执行调用函数：  
如果实例对象中调用`resolve()`，则执行第一个参数的函数，如果实例对象中调用`reject()`，则执行第二个参数的函数
`then()`函数本身会返回一个promise对象，对象的状态和结果由两个参数函数决定：  
如果实例对象中调用`resolve()`，则由第一个参数函数决定，如果实例对象中调用`reject()`，则由第二个参数函数决定  
两个参数函数中都有以下几种情况：(具体参见mdn文档)  
①`throw '错误信息'`抛出异常，返回一个状态为`rejected`结果为`错误信息`的promise对象  
②如果参数函数中返回非promise对象，则返回一个状态为`fulfilled`结果为`返回值`的promise对象  
③如果参数函数中返回promise对象，则返回这个promise对象

2.`catch((value)=>{})`  
可用作`then((undefined,(value)=>{})`

## 五.promise的自封装
简易的自封装promise见文件[mypromise.js](mypromise.js)   










