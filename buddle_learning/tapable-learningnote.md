# Tapable Learning



## 钩子类型


1. SyncHook(同步钩子)：回调按注册顺序执行，回调参数为触发时传入的参数
2. SyncBailHook(同步熔断钩子)：回调按注册顺序执行，回调参数为触发时传入的参数,回调函数返回值为undefined则触发下一个钩子，如果为其他值则终止
3. SyncWaterfallHook(同步瀑布钩子)：上一个回调的返回值会传入下一个回调的第一个参数
   >一般类型和bail类型的第一个参数为触发时的传入的参数
4. SyncLoopHook(同步循环钩子)：回调按注册顺序执行，如果回调返回值不为undefined，则重新执行此回调，直到返回undefined才会执行下一个

5. AsyncParallelHook(异步并行钩子)：所有注册的回调同时开始，等待所有注册回调执行结束后(调用最后一个参数的函数)，执行调用方法的回调
6. AsyncParallelBailHook(异步并行熔断钩子)：所有注册的回调同时开始，如果任意回调返回值不为undefined，直接终止等待(其他已经在执行的回调依然会执行结束)，并立即执行调用方法的回调

7. AsyncSeriesHook(异步串行钩子)：所有注册的回调按顺序执行，等待所有注册回调执行结束后(调用最后一个参数的函数)，执行调用方法的回调
8. AsyncSeriesBailHook(异步串行熔断钩子)：所有注册的回调按顺序执行，如果任意回调返回值不为undefined，直接终止，并立即执行调用方法的回调
9. AsyncSeriesWaterfallHook(异步串行瀑布流钩子)：所有注册的回调按顺序执行，上一个回调的返回值会传入下一个回调的第一个参数，全部执行完毕后执行触发方法中的回调
10. AsyncSeriesLoopHook(异步串行循环钩子)：所有注册的回调按顺序执行，如果任意回调返回值不为undefined，则重新执行此回调，直到返回undefined才会执行下一个回调，全部执行完毕后执行触发方法中的回调
   >用于标识的变量也可能使用的是注册的回调中的最后一个参数的函数的第二个参数？

## 使用方式

创建钩子实例：
```js
new SyncHook(arr)
```
创建钩子时传入第一个参数为数组，定义实参(对应钩子触发时传入的实参)


注册/触发方式：(一一对应)
1. 同步  `hookInstance.tap(pluginName)`/`hookInstance.call(...arr)`

2. 异步  `hookInstance.tapAsync(pluginName,callback)`/`hookInstance.callAsync(...arr,callback)`
   >注册方法的callback的最后一个参数为next函数，next()函数必须调用才会执行下一个回调，如果传值则结束触发，执行触发方法的callback
   >触发方法的callback只有一个参数为err

3. 异步promise  `hookInstance.tapPromise(pluginName,callback)`/`hookInstance.promise(...arr)`
   >注册方法的callback返回一个Promise实例，所有Promise实例都兑现或者有失败时可以调用触发方法的then方法
   >相当于使用Promise.all方法处理所有注册的Promise实例



















