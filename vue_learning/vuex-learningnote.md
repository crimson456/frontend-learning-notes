# Vuex Learning


## 一.Vuex的引入
通过创建一个`Vuex.Store()`的实例对象引入Vuex仓库，注意在创建实例对象前必须先引入Vuex插件`Vue.use(Vuex)`  
引入插件后回在Vue原型上挂在一个`$store对象`方便所有组件调用，而不需要引入```./store```文件    
注意：在脚手架中使用时`import`引入语法会被提升到文件前方，所以引入插件的语句要放在仓库的单文件中     

创建文件：```src/store/index.js```
```js
//引入Vue核心库
import Vue from 'vue'
//引入Vuex
import Vuex from 'vuex'
//应用Vuex插件
Vue.use(Vuex)

//准备actions对象——响应组件中用户的动作
const actions = {}
//准备mutations对象——修改state中的数据
const mutations = {}
//准备state对象——保存具体的数据
const state = {}
//准备一个getters对象用于对数据处理输出
const getters = {}
//创建并暴露store
export default new Vuex.Store({
	actions,
	mutations,
	state,
   getters
})
```
引入文件在```main.js```中创建vm时传入```store```配置项  
```js
......
//引入store
import store from './store'
......

//创建vm
new Vue({
	el:'#app',
	render: h => h(App),
	store
})
```
## 二.Vuex的5个核心概念

(Vuex工作流程图)[]

1. state对象(vuex中数据存储的对象)
state对象中存放存储的数据，和vue中的data属性类似,在store文件中声明   
state对象中的属性以键值对方式存储  
定义：
```js
//以sum为例
const state = {
      sum:0
   }
```

在组件中读取vuex中的数据：
```js
this.$store.state.sum
```

通过mapState辅助函数简写： mapState方法用于帮助我们映射```state```中的数据为计算属性   
首先引入
```js
import { mapState } from 'vuex'
```
```js
computed: {
    //借助mapState生成计算属性：sum、school、subject
    //对象写法，可以灵活控制计算属性的名称，键名对应计算属性名，键值对应state中数据键名
     ...mapState({sum:'sum',school:'school',subject:'subject'}),
         
    //数组写法
    ...mapState(['sum','school','subject']),
},
```

2. getters
当state中的数据需要经过加工后再使用时，可以使用getters加工，类似vue中的计算属性  
getters中的属性以函数返回值方式存储,函数中会有一个参数获取state中的状态，返回值为对应属性的值   
定义：  
```js
//以bigSum为例
const getters = {
  	bigSum(state){
  		return state.sum * 10
  	}
}
```
在组件中使用：
```js
this.$store.getters.bigSum
```
通过mapGetters方法简写：用于帮助我们映射`getters`中的数据为计算属性  
同样需要引入
```js
import { mapGetters } from 'vuex'
```
```js
computed: {
    //借助mapGetters生成计算属性：bigSum
    //对象写法
    ...mapGetters({bigSum:'bigSum'}),

    //数组写法
    ...mapGetters(['bigSum'])
}
```


3. mutations
提交mutation是更改store中的状态的唯一方法。  
mutations中的属性以函数的方式存储，函数的第一个形参为state，第二个形参用于接收commit方法中传入的参数payload  
类似于一个事件处理函数  
定义：  
```js
const mutations = {
	方法名(state,payload){
		//对state中的数据进行操作
	}
}
```
组件中使用:
```js
this.$store.commit('mutations中的方法名',payload)
```

通过mapMutations方法简写：用于帮助我们生成与`mutations`对话的方法，映射在，即：包含`$store.commit(xxx)`的函数  
引入
```js
import { mapMutations } from 'vuex'
```
```js
methods:{
    //靠mapActions生成：increment、decrement（对象形式）
    ...mapMutations({increment:'JIA',decrement:'JIAN'}),
    //相当于生成如下结构
    //increment(payload){
    //     this.$store.commit('JIA',payload)
    //}
    //靠mapMutations生成：JIA、JIAN（对象形式）
    ...mapMutations(['JIA','JIAN']),
}
```

4. actions
actions 类似于 mutations,但是可以进行异步操作，一般在此执行业务逻辑如调用ajax请求,如果没有，可以跳过actions
actions中的属性以函数的方式存储，函数的第一个形参为context,和store实例具有相同方法和属性(即可以通过context调用dispatch和commit等) ，第二个形参用于接收commit方法中传入的参数payload  
定义：
```js
const actions = {
	方法名(context,payload){
		//执行一系列业务逻辑
		context.commit('mutations中的方法名',payload)
	}
}
```
组件中使用:
```js
this.$store.dispatch('actions中的方法名',payload)
```

通过mapActions方法简写：用于帮助我们生成与`actions`对话的方法，即：包含`$store.dispatch(xxx)`的函数  
引入  
```js
import { mapActions } from 'vuex'
```
```js
methods:{
    //靠mapActions生成：incrementOdd、incrementWait（对象形式）
    ...mapActions({incrementOdd:'jiaOdd',incrementWait:'jiaWait'})
    //相当于生成如下结构
    //incrementOdd(payload){
    //     this.$store.dispatch('jiaOdd',payload)
    //}
    //靠mapActions生成：incrementOdd、incrementWait（数组形式）
    ...mapActions(['jiaOdd','jiaWait'])
}
```
注意:mapActions与mapMutations使用时，若需要传递参数需要,在模板中绑定事件时要传递好参数，否则参数是事件对象,因为Vue中事件触发会自带一个事件对象参数


5. modules和命名空间

在store目录中注册模块，并开启命名空间


```js
const countAbout = {
  namespaced:true,//开启命名空间
  state:{x:1},
  mutations: { ... },
  actions: { ... },
  getters: {
    bigSum(state){
       return state.sum * 10
    }
  }
}

const personAbout = {
  namespaced:true,//开启命名空间
  state:{ ... },
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  modules: {
    countAbout,
    personAbout
  }
})
```


开启命名空间后，组件中读取state数据：

   ```js
   //方式一：自己直接读取
   this.$store.state.personAbout.list
   //方式二：借助mapState读取：
   ...mapState('countAbout',['sum','school','subject']),
   ```

开启命名空间后，组件中读取getters数据：

   ```js
   //方式一：自己直接读取
   this.$store.getters['personAbout/firstPersonName']
   //方式二：借助mapGetters读取：
   ...mapGetters('countAbout',['bigSum'])
   ```

开启命名空间后，组件中调用dispatch

   ```js
   //方式一：自己直接dispatch
   this.$store.dispatch('personAbout/addPersonWang',person)
   //方式二：借助mapActions：
   ...mapActions('countAbout',{incrementOdd:'jiaOdd',incrementWait:'jiaWait'})
   ```

开启命名空间后，组件中调用commit

   ```js
   //方式一：自己直接commit
   this.$store.commit('personAbout/ADD_PERSON',person)
   //方式二：借助mapMutations：
   ...
   ```












