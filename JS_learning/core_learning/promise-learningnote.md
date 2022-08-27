# Promise Learning

## Promise的封装

1. 把一个方法封装成Promise对象（以nodejs内置readFile为例）

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

1. 构造函数
    ```js
    let executor = (resolve,reject)=>{
        //异步操作
        if(/*操作成功*/) {
            resolve(value)
        } else {
            //操作失败
            reject(errMessage)
        }
    }
    new Promise(executor)
    ```
    Promise对象接收一个处理器函数(executor function)作为参数  
    `value`为成功时传递的数据，errMessage为失败时传递的错误信息，传给对象下的`then()`和`catch()`方法

2. 实例属性

    1. `[[PromiseState]]`Promise实例的状态:  
        待定（pending）: 初始状态，既没有被兑现，也没有被拒绝  
        已兑现（fulfilled/resolved）: 意味着操作成功完成  
        已拒绝（rejected）: 意味着操作失败  
        >状态转换只能从`pending`到`fulfilled`或者`rejected`

    2. `[[PromiseResult]]`Promise实例对象处理器函数中调用`resolve()`或`reject()`传入的值

3. 构造对象下的方法

    1. `Promise.resolve(value)`
        返回一个Promise对象，
        如果`value`为Prmise对象，返回此Promise对象
        如果`value`为thenable对象(对象下具有`then(resolve,reject)`方法)，返回的Promise跟随此方法的then方法的最终状态？？
        >判断是否为thenable对象只需要对象下有`then()`方法
        如果`value`为其他值，则返回的Promise对象以`value`为值，`fulfilled`为状态
        如果`value`不存在，则直接返回一个`fulfilled`状态的 Promise 对象。


    2. `Promise.reject(reason)`
        返回一个状态为`rejected`结果为`reason`的promise对象  
        >reason值会原封不动地传给`then()`和`catch()`

    3. `Promise.all(iterable)`(全成功则成功，有失败则失败)
        接收一个可迭代对象且对象的每个成员都是Promise对象，如果不是，则调用`Promise.resolve()`方法处理为Promise对象并返回一个Promise对象
        如果所有成员都为`fufilled`状态的Promise对象，则返回状态为`fufilled`，结果为可迭代对象成员的结果组成的数组的Promise对象
        如果其中任意成员为`rejected`状态的Promise对象，则返回状态为`rejected`，结果为第一个状态为`rejected`的Promise对象的
        如果其中有成员为`pending`状态的Promise对象，则返回状态为`pending`的Promise对象，并等待成员的状态改变，如果任意成员的状态改变为`rejected`，则返回的Promise对象状态也立即改变为`rejected`，值为此成员的结果，如果所有成员都改变为`fufilled`状态，则返回的Promise对象状态也立即改变为`fufilled`，结果为可迭代对象成员的结果组成的数组

    4. `Promise.race(iterable)`(获取第一个改变状态的Promise)
        接收一个可迭代对象且对象的每个成员都是Promise对象，如果不是，则调用`Promise.resolve()`方法处理为Promise对象并返回一个Promise对象
        如果所有成员都为`pending`状态的Promise对象，则返回状态为`pending`的Promise对象，当任意成员状态发生改变时，返回的Promise对象立即改变为和此成员相同的状态和结果
        如果存在成员不为`pending`状态，则返回迭代对象找到的第一个不`pending`状态的Promise对象？？？





    5. `Promise.allSettled(iterable)`(ES2020)(所有Promise完成后执行)
        接收一个可迭代对象且对象的每个成员都是Promise对象，如果不是，则调用`Promise.resolve()`方法处理为Promise对象并返回一个状态为`pending`的Promise对象
        当所有成员的状态都发生改变后，返回的Promise对象状态变为`fufilled`，结果为一个包含所有成员状态和结果的数组


    6. `Promise.any(iterable)`(ES2021)（获取第一个状态改变为成功的Promise）
        接收一个可迭代对象且对象的每个成员都是Promise对象，如果不是，则调用`Promise.resolve()`方法处理为Promise对象并返回一个Promise对象
        任何一个成员变成成功`fufilled`状态，或者所有Promise都失败，那么返回的Promise变成成功失败状态？？？








4. 实例对象下的方法
    1. `Promise.prototype.then(resolve,reject)`
        注意：`then()`方法返回一个Promise对象，此Promise对象根据`then()`中两个回调函数参数的返回值而定
        如果函数参数中返回Promise对象，则`then()`方法返回的Promise对象和此对象状态结果都相同
        如果函数参数中返回普通值，则`then()`方法返回的Promise对象状态为`fufilled`，结果为此普通值
        如果函数参数中无返回值，则`then()`方法返回的Promise对象状态为`fufilled`，结果为undefined
        如果函数参数中抛出错误，则`then()`方法返回的Promise对象状态为`rejected`，结果为抛出的错误
        

    2. `Promise.prototype.catch(reject)`
        可用作`then((undefined,(value)=>{})`

    3. `Promise.prototype.finally(callback)`(ES2018)
        回调函数中无参数，相当于不管Promise的状态变化为哪种，都要执行
        ```js
        promise
        .finally(() => {
          // 语句
        });

        // 等同于
        promise.then(result => {
                  // 语句
                  return result;
                },
                error => {
                  // 语句
                  throw error;
                }
        );
        ```










## 宏任务、微任务和任务调度

微任务优先级高于宏任务

1. 宏任务：
    - script(整体代码)
    - setTimeout
    - setInterval
    - I/O
    - UI交互事件
    - postMessage
    - MessageChannel
    - setImmediate(Node.js 环境)

2. 微任务：
    - Promise.then
    - Object.observe
    - MutationObserver
    - process.nextTick(Node.js 环境)

3. 任务循环：

    任务循环中，每一次循环称为tick，每一次tick的任务如下：
    执行一个宏任务（栈中没有就从事件队列中获取）
    执行过程中如果遇到微任务，就将它添加到微任务的任务队列中
    宏任务执行完毕后，立即执行当前微任务队列中的所有微任务（依次执行）
    当前宏任务执行完毕，开始检查渲染，然后GUI线程接管渲染
    渲染完毕后，JS线程继续接管，开始下一个宏任务（从事件队列中获取）

4. 扩展：
    调用`setTimeout()`定时器时，计时器在计时结束后回调函数作为任务压入宏任务队列，等待调用，所以如果前面程序的运行时间过长可能会影响定时器的回调调用时机




## 五.promise的自封装
简易的自封装promise见文件[mypromise.js](mypromise-1.js)   










