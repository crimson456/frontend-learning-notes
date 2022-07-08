class myPromise {
    constructor(executor) {
        this.promiseStatus = 'pending'
        this.promiseResult = null
        this.callbacks = []
        const self = this
            //声明执行器函数中的两个参数函数（注意声明参数函数中的this对象为window）
        function resolve(data) {
            //确保状态只会更改一次，防止在promise使用时重复调用resolve和reject出错
            if (self.promiseStatus !== 'pending') return;
            self.promiseStatus = 'fulfilled'
            self.promiseResult = data
                //异步执行then中的函数
            setTimeout(() => {
                self.callbacks.forEach(item => {
                    item.onResolved(data)
                })
            })
        }

        function reject(data) {
            if (self.promiseStatus !== 'pending') return;
            self.promiseStatus = 'rejected'
            self.promiseResult = data
            setTimeout(() => {
                self.callbacks.forEach(item => {
                    item.onRejected(data)
                })
            })
        }
        //用try catch结构，处理抛出错误
        try {
            //调用执行器函数
            executor(resolve, reject)
        } catch (e) {
            reject(e)
        }
    }
    then(onResolved, onRejected) {
        const self = this;
        //只传入一个参数的处理
        if (typeof onRejected !== 'function') {
            onRejected = reason => {
                throw reason
            }

        }
        //不传参数的处理
        if (typeof onResolved !== 'function') {
            onResolved = value => value
        }

        return new myPromise((resolve, reject) => {
            function callback(type) {
                try {
                    //执行onResolved或onRejected并判断返回值是否为promise对象
                    let _result = type(self.promiseResult)
                    if (_result instanceof myPromise) {
                        _result.then(v => {
                            resolve(v)
                        }, r => {
                            reject(r)
                        })
                    } else {
                        //不为promise对象则返回成功的promise对象
                        resolve(_result)
                    }
                } catch (e) {
                    reject(e)
                }
            }
            //如果promise对象已经完成则同步执行
            if (this.promiseStatus === 'fulfilled') {
                //异步执行then中的函数
                setTimeout(() => {
                    callback(onResolved)
                })
            }
            if (this.promiseStatus === 'rejected') {
                setTimeout(() => {
                    callback(onRejected)
                })

            }
            //如果promise对象还在执行中，将函数存储回promise对象待完成后执行
            if (this.promiseStatus === 'pending') {
                //用数组存储以处理多个then方法调用不冲突
                this.callbacks.push({
                    onResolved: function() {
                        callback(onResolved)
                    },
                    onRejected: function() {
                        callback(onRejected)
                    }

                })
            }
        })
    }
    catch (onRejected) {
        return this.then(undefined, onRejected)
    }
    static resolve(value) {
        return new myPromise((resolve, reject) => {
            if (value instanceof myPromise) {
                value.then(v => {
                    resolve(v)
                }, r => {
                    reject(r)
                })
            } else {
                resolve(value)
            }
        })
    }
    static reject(reason) {
            return new myPromise((resolve, reject) => {
                reject(reason)
            })
        }
        //存在关于几个promise对象执行的时间不同造成计数器count增加的疑问，
        // 即if的执行条件不一定是在最后一个promise上而是在最后改变状态的promise上
    static all(promises) {
        let count = 0;
        let arr = [];
        return new myPromise((resolve, reject) => {
            for (let i = 0; i < promises.length; i++)
                promises[i].then(v => {
                    count++
                    arr[i] = v
                    if (count === promises.length) {
                        resolve(arr)
                    }
                }, r => {
                    reject(r)
                })

        })
    }
    static race(promises) {

        return new myPromise((resolve, reject) => {
            for (let i = 0; i < promises.length; i++)
                promises[i].then(v => {
                    resolve(v)
                }, r => {
                    reject(r)
                })

        })
    }

}