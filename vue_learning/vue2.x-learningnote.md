# Vue 2.x Learning


## 一.Vue绑定标签

通过el属性绑定根标签，两种方式：  
1.创建Vue实例对象时配置el属性   
2.先创建Vue实例，再通过`vm.$mount('#root')`指定el值  


## 二.Vue数据及处理

1.通过data属性设定实例对象中用到的数据，有对象式和函数式，  
组件必须用函数式，（原因：函数式每次调用开辟新的内存空间，避免组件复用时数据污染）  
并且不能写箭头函数(data函数中this指向为Vue实例，用了箭头为window)  

2.数据代理：
通过`new Vue({})`创建的实例对象，传入参数中data属性会存储在实例下的`_data`属性中，并且会在实例对象下创建对应的getter和setter来访问`_data`中的数据(用`Object.defineProperty`实现),这样就可以实例对象下直接通过对应的属性名访问属性值。`_data`是实例对象渲染页面的核心。`_data`中有数据劫持。

3.计算属性：  
有缓存机制，只有初次调用和所依赖属性发生变化时才会调用
```
computed: {
  fullName: {
    get: function () {
      return xxx
    },
    set: function (newValue) {
      //xxx
    }
  }
}
//简写形式
computed: {
  fullName:  function () {
      return xxx
  }
}
```


4.监测属性：
两种方式:  
```
watch: {
   // 如果data中的 `value` 发生改变，这个函数就会运行
   value: {
     handler: function (val, oldVal) { /* ... */ },
     deep: true , //表示监听里层数据变化
     immediate: true //表示监听器开始立即调用
   }
}
//简写形式
watch: {
   value: function (val, oldVal) { /* ... */ }
}
```

```
// 如果 vm实例data中的`value` 发生改变，handler函数就会运行
vm.$watch('value', handler, {
  deep: true,
  immediate: true
})
```

5.添加响应式数据  
直接向vm添加数据vue无法监测，进行响应式处理，要添加响应式的数据需要用方法`set`:   
且set方法的目标对象不能是实例对象或者他的根数据对象`_data`(只能给data数据下的某个对象添加数据)
```
Vue.set(目标对象,属性名,属性值)
vm.$set(目标对象,属性名,属性值)
```

6.过滤器(filter)  
全局过滤器
```
Vue.filter('过滤器名称', function (value,参数) {
  //处理逻辑
  return xxx
})
```
局部过滤器
```
filters: {
  过滤器名称: function (value，参数) {
    //处理逻辑
    return xxx
  }
}
```
使用：
```
<!-- 在双花括号中 -->
{{ message | capitalize(参数) }}

<!-- 在 `v-bind` 中 -->
<div v-bind:id="rawId | formatId(参数)"></div>
```

7.混合(mixin)  
可以把多个组件共用的配置提取成一个混入对象  
使用方式：  
第一步定义混合：  
```
var mixin ={
  data(){....},
  methods:{....}
}
```
第二步使用混入：
全局混入：```Vue.mixin(xxx)```
局部混入：```mixins:['xxx']	```

混合选项如果重复:  
数据对象在内部会进行递归合并，并在发生冲突时以组件数据优先  
同名钩子函数将合并为一个数组，因此都将被调用。另外，混入对象的钩子将在组件自身钩子之前调用  
值为对象的选项，例如 methods、components 和 directives，将被合并为同一个对象。两个对象键名冲突时，取组件对象的键值对

自定义选项的合并
```js
//自定义
Vue.config.optionMergeStrategies.myOption = function (toVal, fromVal) {
  // 返回合并后的值
}
//让自定义的选项和method选项的合并方式相同
Vue.config.optionMergeStrategies.myOption = Vue.config.optionMergeStrategies.methods
//更复杂的例子
const merge = Vue.config.optionMergeStrategies.computed
Vue.config.optionMergeStrategies.vuex = function (toVal, fromVal) {
  if (!toVal) return fromVal
  if (!fromVal) return toVal
  return {
    getters: merge(toVal.getters, fromVal.getters),
    state: merge(toVal.state, fromVal.state),
    actions: merge(toVal.actions, fromVal.actions)
  }
}
```





8.插件   
用于增强Vue，在Vue对象上添加全局的过滤器，指令，混入，实例方法。
包含install方法的一个对象，install的第一个参数是Vue，第二个以后的参数是插件使用者传递的数据。
```
//定义
//如果定义在一个js文件中可以导出一个包含install函数的对象
对象.install = function (Vue, options) {
    // 1. 添加全局过滤器
    Vue.filter(....)

    // 2. 添加全局指令
    Vue.directive(....)

    // 3. 配置全局混入(合)
    Vue.mixin(....)

    // 4. 添加实例方法
    Vue.prototype.$myMethod = function () {...}
    Vue.prototype.$myProperty = xxxx
}
//使用
Vue.use(插件名,options)
```

9.ref属性
用来给元素或子组件注册引用信息（id的替代者）
应用在html标签上获取的是真实DOM元素，应用在组件标签上是组件实例对象（vc）
```
//标记
<h1 ref="xxx">.....</h1>
<School ref="xxx"></School></h1>
//获取
this.$refs.xxx
```  

10.prop属性
用于父子组件传递信息：
父组件中：`<Demo name="xxx"/>`  
子组件中：  
第一种方式（只接收）：`props:['name'] `  
第二种方式（限制类型）：`props:{name:String}`  
第三种方式（限制类型、限制必要性、指定默认值）：  
```
props:{
	name:{
	  type:String, //类型
	  required:true, //必要性
	  default:'老王' //默认值
	}
}
```
props接收到的数据是只读的，修改会报错


## 三.指令及dom操作

1.v-bind  
为标签绑定一个属性，数据  
```
<button v-bind:[key]="value"></button>
//简写
<button :[key]="value"></button>
```


2.v-model
添加双向绑定的数据
```
<input v-model="something">
//相当于的下面写法的语法糖
<input
  v-bind:value="something"
  v-on:input="something = $event.target.value"
>
```

3.v-if、v-else-if、v-else、v-show
条件渲染，条件表达式中的值为真则渲染标签，可以放在template标签上  
v-if、v-else-if、v-else判断条件为真后才会渲染,v-show则为切换display属性值 
v-if和v-for一起使用时，v-for优先级更高



4.v-for  
列表渲染  
遍历对象为数组时，参数为数组元素和索引号  
```
<li v-for="(item, index) in items"></li>
```
遍历对象为对象时，参数为键值，键名，索引号  
```
<div v-for="(value, name, index) in object"></div>
```
在v-for、v-if中，设定key值非常重要，key值用于重构页面时判断标签内部的DOM元素是否需要重新渲染，  
一般选择为数据的一个独特的值，选为index时如果不按顺序增加和删除页面渲染会出错



5.v-text、v-html  
将内容插入标签中，v-html将内容解析为html插入标签中，  
v-html可能会造成XSS攻击，不能使用在用户提交信息上！ 
```
<span v-text="msg"></span>
<div v-html="html"></div>
```

6.v-cloak指令  
和'[v-cloak] { display: none } '一起用时，可以隐藏未编译的 Mustache 标签直到实例准备完毕
```
//css中写入
[v-cloak] {
  display: none;
}
//html中写入
<div v-cloak>
  {{ message }}
</div>
```

7.v-once  
让元素和组件只渲染一次，随后的重新渲染，元素、组件及其所有的子节点将被视为静态内容并跳过 

8.v-pre  
跳过这个元素和它的子元素的编译过程，可以用来显示原始 Mustache 标签，跳过大量没有指令的节点会加快编译  


9.自定义指令：  
以`v-mydirective`为例，指令名mydirective
所以指令相关的函数内部this都是window
```
//全局定义：
Vue.directive('mydirective', {
    bind: function(...parameters) {
    // 只调用一次，指令第一次绑定到元素时调用
    },
    inserted: function(...parameters) {
    //被绑定的元素，插入到父节点的 DOM 中时调用
    },
    update: function(...parameters) {
    // 组件更新时调用   
    },
    componentUpdated: function(...parameters) {
    // 组件与子组件更新时调用  
    },
    unbind: function(...parameters) {
    // 指令与元素解绑时调用，只执行一次   
    }
})
//局部定义:
directives: {
    mydirective: {
        bind: function(...parameters) {},
        inserted: function(...parameters) {},
        update: function(...parameters) {},
        componentUpdated: function(...parameters) {},
        unbind: function(...parameters) {}
    }
}
```
存在5个钩子函数，每个钩子函数有5个参数：即[...parameters]  
①.el：指令所绑定的元素，可以用来直接操作 DOM  
②.binding：一个对象，包含以下 property：   

>    name：指令名，不包括 v- 前缀  
>    value：指令的绑定值，例如：v-my-directive="1 + 1" 中，绑定值为 2  
>    oldValue：指令绑定的前一个值，仅在 update 和 componentUpdated 钩子中可用。无论值是否改变都可用  
>    expression：字符串形式的指令表达式。例如 v-my-directive="1 + 1" 中，表达式为 "1 + 1"  
>    arg：传给指令的参数，可选。例如 v-my-directive:foo 中，参数为 "foo"  
>    modifiers：一个包含修饰符的对象。例如：v-my-directive.foo.bar 中，修饰符对象为 { foo: true, bar: true } 
>    
③.vnode：Vue 编译生成的虚拟节点   
④.oldVnode：上一个虚拟节点，仅在 update 和 componentUpdated 钩子中可用    
⑤.undefined  

使用：
```
<div v-mydirective:arg.modifiers="value"></div>
```

简写：
```
directives: {
  mydirective: function(...a){
  }
}
```
相当于bind函数和update函数及执行时调用同一个函数，其他钩子函数省略  
函数只在两种情况下调用：①指令与元素绑定时调用②指令所在模板更新时调用  


10.nextTick
当改变数据后，要基于更新后的新DOM进行某些操作时，要在nextTick所指定的回调函数中执行
在下一次 DOM 更新结束后执行其指定的回调
```
this.$nextTick(回调函数)
```





## 五.事件处理和组件通信

1. `v-on:事件名称.事件修饰符=事件处理函数(参数)`  
`v-on`可以简写为@，  
参数中如果不写参数，事件处理函数默认会传入事件对象，写入参数中加入`$event`关键词为事件对象占位，   
事件修饰符可以连续调用

2. 自定义事件  
可以用于子组件向父组件传输数据，父组件添加自定义事件，子组件触发，回调传回数据    
使用方式：
父组件中添加自定义事件：

```vue
//方式1
<组件名 @自定义事件名="回调函数"/>
//方式2，一般写在mounted函数中
this.$refs.子组件.$on('自定义事件名',this.回调函数)
//回调函数需要在methods中声明(注意这里有回调函数中的this指向问题)
//自定义事件只能触发一次，可以使用once修饰符，或$once方法
``` 
子组件触发自定义事件：  
```js
this.$emit('自定义事件名',数据)
//数据会以参数的形式传输回父组件中的回调函数中
```
子组件解绑自定义事件:(一般写在beforeDestroy函数中)  
```js
this.$off('自定义事件名')
```
组件上也可以绑定原生DOM事件，需要使用`native`修饰符

3. 全局事件总线  
适用于任意组件间通信
使用步骤：
第一步，安装全局事件总线：
```
new Vue({
	......
	beforeCreate() {
    //安装全局事件总线，$bus就是当前应用的vm
		Vue.prototype.$bus = this
	},
  ......
}) 
```
第二步，使用事件总线：
接收数据的组件向总线绑定自定义事件   
```
methods(){
  callback(data){......}
}
......
mounted() {
  this.$bus.$on('自定义事件名',this.callback)
}
```  
发送数据的组件触发自定义事件`this.$bus.$emit('自定义事件名',data)`  

注意事项：整个项目共用一个总线，命名不能重复，并且组件在销毁后在beforeDestroy钩子中，要用$off解绑

4. 消息订阅与发布（pubsub）
适用于任意组件间通信

步骤：
第一步，安装pubsub：`npm i pubsub-js`

第二步，引入: `import pubsub from 'pubsub-js'`  

第三步，接收数据的组件订阅消息  

```
methods(){
  callback(data){......}
}
......
mounted() {
  this.pid = pubsub.subscribe('xxx',this.callback) //订阅消息
}
```

第四步，发送数据的组件发布消息`pubsub.publish('xxx',data)`

注意：在订阅消息组件的beforeDestroy钩子中，用`pubsub.unsubscribe(pid)`去取消订阅。




5. 插槽  
适用于父组件向子组件传输数据
父组件可以向子组件指定位置插入html结构

①默认插槽：

```
//父组件中：
<子组件名>
  //这部分会被传递到对应插槽中
   <div>html结构1</div>
</子组件名>
//子组件中：
<template>
    <div>
       <!-- 定义插槽 -->
       <slot>插槽默认内容...</slot>
    </div>
</template>
```

②具名插槽：

```
//父组件中：
<子组件名>
    <template slot="center">
      <div>html结构1</div>
    </template>
    //这两种写法用法相同
    <template v-slot:footer>
       <div>html结构2</div>
    </template>
</子组件名>
//子组件中：
<template>
    <div>
       <!-- 定义插槽 -->
       <slot name="center">插槽默认内容...</slot>
       <slot name="footer">插槽默认内容...</slot>
    </div>
</template>
```

③作用域插槽：   
数据在组件的自身，但根据数据生成的结构需要组件的使用者来决定。  
（例子中games数据在Category组件中，但使用数据所遍历出来的结构由App组件决定）  

```
父组件中：
<Category>
	<template scope="scopeData">
		<!-- 生成的是ul列表 -->
		<ul>
			<li v-for="g in scopeData.games" :key="g">{{g}}</li>
		</ul>
	</template>
</Category>
//两种写法效果一致（已经废弃），并且可以用解构赋值
<Category>
	<template slot-scope="scopeData">
		<!-- 生成的是h4标题 -->
		<h4 v-for="g in scopeData.games" :key="g">{{g}}</h4>
	</template>
</Category>
//新写法（也可以解构赋值）
<Category>
	<template v-slot:插槽名="scopeData">
		<!-- 生成的是h4标题 -->
		<h4 v-for="g in scopeData.games" :key="g">{{g}}</h4>
	</template>
</Category>

子组件中：
<template>
    <div>
        <slot :games="games"></slot>
    </div>
</template>

<script>
export default {
    name:'Category',
    props:['title'],
    //数据在子组件自身
    data() {
        return {
            games:['红色警戒','穿越火线','劲舞团','超级玛丽']
        }
    },
}
</script>
```


6. provide / inject
用于祖孙组件间通信
provide 选项应该是一个对象或返回一个对象的函数
inject 选项一个字符串数组，或者一个对象，对象中可以对数据进行配置
祖组件中：
```js
provide: {
    foo: 'bar'
}
//或者
provide () {
    return {
      [s]: 'foo'
    }
  }
```
孙组件中：
```js
inject: ['foo']
```


## 五.生命周期

1. `beforeCreate()`   
此时初始化了生命周期和一系列事件，但还未进行数据代理，无法通过vm访问data和methods等  

2. `created()`  
此时初始花了数据代理，数据监测，可以通过vm访问data和methods等  

3. `beforeMount()`  
此时Vue开始解析模板，生成虚拟DOM，但是还未同步到模板，  
页面上呈现的是未经Vue编译的DOM结构，在此阶段所有对DOM的操作都不奏效，因为最终会被虚拟DOM渲染所覆盖掉  

4. `mounted()`（常用）   
此时已将虚拟DOM转为真实DOM，此阶段对DOM的操作均有效，  
一般在此时进行初始化操作：发送ajax请求、启动定时器、绑定自定义事件、订阅消息等  

5. `beforeUpdate()`  
此时数据已经更新，但页面还是旧的，页面和数据还未同步

6. `updated()`    
此时数据时和页面都更新了

7. `beforeDestroy()`(常用)    
此时vm中所有的data、方法和指令都处于可用状态，但是马上要进行销毁了，且在此进行的数据更新不再会触发页面改变，  
一般在此时进行收尾工作：清除定时器、解绑自定义事件、取消订阅消息等

8. `destroyed()`  
销毁后自定义事件会失效，但原生DOM事件依然有效

[流程图](../lifehooks.png)  


## 六.Vue组件相关  
1. `<component>`  
依 is 的值，来决定哪个组件被渲染，可以实现动态组件，如tab栏
```vue
<component :is="组件名"></component> 
```

2. `<keep-alive>`  
有三个属性值(可以不加)
include - 字符串或正则表达式。只有名称匹配的组件会被缓存。
exclude - 字符串或正则表达式。任何名称匹配的组件都不会被缓存。
max - 数字。最多可以缓存多少组件实例
```vue
<keep-alive>
  <component :is="view"></component>
</keep-alive>
```
可以搭配vue-router中的`<router-view>`标签使用，注意include和exclude匹配的是组件名而不是路由别名！



1. 组件异步加载
三种方式：
第一种，创建时放入一个工厂函数
```js
Vue.component('async-example', function (resolve, reject) {
  setTimeout(function () {
    // 向 `resolve` 回调传递组件定义
    resolve({
      template: '<div>I am async!</div>'
    })
  }, 1000)
})
```
第二种，
第三种，动态导入，import()会返回一个promise对象
```js
Vue.component(
  'async-webpack-example',
  // 这个动态导入会返回一个 `Promise` 对象。
  () => import('./my-async-component')
)
//
new Vue({
  // ...
  components: {
    'my-component': () => import('./my-async-component')
  }
})
//并且在路由懒加载中可以分块
const Foo = () => import(/* webpackChunkName: "group-foo" */ './Foo.vue')
const Bar = () => import(/* webpackChunkName: "group-foo" */ './Bar.vue')
const Baz = () => import(/* webpackChunkName: "group-foo" */ './Baz.vue')
```



## 七.配置
1.vue脚手架配置代理  
方法一：  
​在vue.config.js中添加如下配置：  
```
devServer:{
  proxy:"http://localhost:5000"
}
```
说明：  
优点：配置简单，请求资源时直接发给前端（8080）即可。    
缺点：不能配置多个代理，不能灵活的控制请求是否走代理。    
工作方式：若按照上述配置代理，当请求了前端不存在的资源时，那么该请求会转发给服务器 （优先匹配前端资源）    

方法二：  
编写vue.config.js配置具体代理规则：  
```
module.exports = {
	devServer: {
      proxy: {
      '/api1': {// 匹配所有以 '/api1'开头的请求路径
        target: 'http://localhost:5000',// 代理目标的基础路径
        changeOrigin: true,
        pathRewrite: {'^/api1': ''}
      },
      '/api2': {// 匹配所有以 '/api2'开头的请求路径
        target: 'http://localhost:5001',// 代理目标的基础路径
        changeOrigin: true,
        pathRewrite: {'^/api2': ''}
      }
    }
  }
}
/*
   changeOrigin设置为true时，服务器收到的请求头中的host为：localhost:5000
   changeOrigin设置为false时，服务器收到的请求头中的host为：localhost:8080
   changeOrigin默认值为true
*/
```
说明：    
优点：可以配置多个代理，且可以灵活的控制请求是否走代理。    
缺点：配置略微繁琐，请求资源时必须加前缀。    
 



