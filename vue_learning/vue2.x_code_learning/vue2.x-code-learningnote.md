# Vue2.x Code Learning




## Object.defineProperty()为基础的数据代理

core/observer文件夹中


1. 重要方法：
   - `observe(data)` 判断data是否为对象类型，不是则返回，是则返回data创建Ovserve类实例
   - `defineReactive()` 将单个属性处理为响应式的
 

2. 重要类：
   1. Observe 
      - 构造函数：将实例对象挂载到入参的`__ob__`属性上，并且进行判断，判断入参如果为数组则重写数组方法，调用`observeArray()`方法观测数组下的每个值，如果不是数组，调用`walk()`方法处理每个数据

      - `walk(obj)`：将obj每个属性处理为响应式(循环调用`defineReactive()`)
      - `observeArray(arr)`:对arr每个成员调用observe()创建Observe类实例















