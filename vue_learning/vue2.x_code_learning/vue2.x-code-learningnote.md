# Vue2.x Code Learning




## Object.defineProperty()为基础的数据代理

core/observer文件夹中


1. 重要方法：
   - `observe(data)` 判断data是否为对象类型，不是则返回，是则为对象挂载Observe实例在(__ob__)属性上
   - `defineReactive()` 将单个属性处理为响应式的,并且检测属性是否为对象，如果为对象，则嵌套调用`observe()`方法处理此属性，实现深层次的监听
   使用Object.defineProperty()实现数据劫持,其中
   getter中判断是否存在Dep.target，如果存在就调用闭包中的dep的depend()方法，调用Watcher实例中的addDep()方法，将此dep加入Watcher的newDeps队列中，调用dep的addSub方法，将Watcher实例添加到dep实例的subs队列中
   setter中调用闭包中的dep的notify()方法，会调用dep实例中的subs中的每一项Watcher实例的update方法，update方法中调用run()方法，run()方法中会调用get()方法获取value值，并调用回调注册Watcher时的回调


   - `parsePath(str)` 接收一个形如'a.b.c.d'的字符串，返回一个接收对象的函数，此函数返回接收对象内对应字符串的值
 

2. 重要类：
   1. Observer类 
      - constructor(obj)：将给定的对象处理为响应式对象 
         将实例对象挂载到入参的`__ob__`属性上，并且进行判断，判断入参如果为数组则重写数组方法，并调用`observeArray()`方法观测数组下的每个值，如果不是数组，调用`walk()`方法处理每个数据
         >重写数组方法写在array.js中，重写了7个方法：`push`,`pop`,`shift`,`unshift`,`splice`,`sort`,`reverse`，重写方式：在数组的原型链中新增一层arrayMethods，并调用`observeArray()`方法调用对每个数组的成员进行观测

      - `walk(obj)`:将obj每个属性处理为响应式(循环调用`defineReactive()`)
      - `observeArray(arr)`:对arr每个成员调用observe()创建Observe类实例

   2. Dep类 dependencies缩写
      >每个Observer实例下都有一个Dep实例
      - constructor()：初始化`this.id`和`this.subs`，`this.subs`为Watcher类实例组成的数组，所有订阅的Watcher类

      - notify()：通知所有`this.subs`中的Watcher类更新数据(调用Watcher类实例的update()方法)

      - addSub()：添加订阅，将Watcher类实例添加到`this.subs`数组中

      - depend()：添加依赖
      - 



   3. Watcher类 
      - constructor(target,expression,callback) 对目标对象的某个属性进行监测，调用parsePath方法处理expression生成对应的getter函数，并且调用get方法()

      - update() 选择调用的方式，一般为同步调用run()函数


      - get() 首先调用pushTarget(this)方法将此Watcher实例挂载在Dep.target上，然后调用this.getter方法获取要监控的属性值，调用this.getter时会触发响应式属性上的getter函数，这时就Dep和Watcher实例就会互相收集然后调用popTarget()清除Dep.target上的属性，最后调用cleanupDeps清除所有旧的依赖




      - run() 调用get()方法触发当前Watcher类观测的属性并收集依赖，最后调用注册时的回调

      - addDep()
      - cleanuppDeps()


      - evaluate()
      - depend()
      - teardown()


3. 理解：

   要处理为响应式的对象先调用observe(data)，observe函数内部会根据传入的数据形式进行容错的处理并为对象创建Observe实例并挂载在对象上，Observe实例化过程中会根据对象或者数组做不同的处理，数组就重写数组方法，对象就将遍历调用defineReactive()将每个属性都处理为响应式，如果属性也是对象，则会调用observe处理对象(递归处理)，处理响应式的过程使用Object.defineProperty()定义属性的访问器属性，并在其中添加拦截操作




## vue实例初始化 core模块


1. 创建Vue实例：

/src/core/instance/index.ts 开始

Vue采用构造函数加原型对象的方式创造实例

构造函数：调用`this._init(options)方`法

`initMixin()`函数:在原型对象上挂载`_init(options)`方法


`_init(options)`函数流程：

通过window.performance的API记录初始化的时间







```js
    // a flag to mark this as a Vue instance without having to do instanceof
    // check
    vm._isVue = true
    // avoid instances from being observed
    vm.__v_skip = true
    // effect scope
    vm._scope = new EffectScope(true /* detached */)
    vm._scope._vm = true
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options as any)
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor as any),
        options || {},
        vm
      )
    }
    /* istanbul ignore else */
    if (__DEV__) {
      initProxy(vm)
    } else {
      vm._renderProxy = vm
    }
    // expose real self
    vm._self = vm
    initLifecycle(vm)
    initEvents(vm)
    initRender(vm)
    callHook(vm, 'beforeCreate', undefined, false /* setContext */)
    initInjections(vm) // resolve injections before data/props
    initState(vm)
    initProvide(vm) // resolve provide after data/props
    callHook(vm, 'created')
```







## 模板转化ast compiler模块


1. 重要方法：
   
   - `parse(template,options)` 将html模板转化为ast，内部进行预处理后，调用`parseHTML()`方法
   - `parseHTML(template,options)` 将html模板转化为ast的主逻辑
     - `` 





## 不同环境的vue分析

1. 概略


web-runtime: 运行时，无法解析传入的template
web-full：运行时 + 模板编译
web-compiler：仅模板编译
web-runtime-cjs web-full-cjs：cjsCommonJS打包
web-runtime-esm web-full-esm ：esm 语法（支持import export）
web-full-esm-browser：浏览器中使用
web-server-renderer：服务端渲染

2. runtime-with-compiler对$mount()进行的处理

   将原本在\src\platforms\web\runtime\index.ts文件中$mount()方法改写(添加新方法)，通过创建实例时传入对象的render、template或者el成员创建模板生成render函数，之后再调用原方法


























