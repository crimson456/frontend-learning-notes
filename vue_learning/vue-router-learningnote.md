# Vue-router Learning

### 一.基本使用和配置对象

1. 安装vue-router，命令：`npm i vue-routers`   


2. 在主文件中应用插件且注册对应的路由器实例对象
```js
Vue.use(VueRouter)
new Vue({
	el:'#app',
	render: h => h(App),
	router:router
})
```

3. 路由器实例对象一般编写在单独的文件中，暴露给主文件  
下面是一个简单的路由器例子
```js
//引入VueRouter
import VueRouter from 'vue-router'
//引入各个路由组件
import About from '../components/About'
import Home from '../components/Home'
//配置路由规则
const routes = [
		{
			path:'/about',
			component:About
		},
		{
			path:'/home',
			component:Home
		}
	]
//配置路由器构建选项
const routerConfig = {
	routes
}
//创建router实例对象
const router = new VueRouter(routerConfig)
//暴露router
export default router
```

路由器的配置选项（routerConfig）如下:
routes：配置路由规则    
mode：配置hash和history模式，服务端为abstract，默认为"hash" (浏览器环境) | "abstract" (Node.js 环境)  
base:配置单页面应用的基路径，默认为"/"  
linkActiveClass：配置默认的`<router-link>`激活后的css中的class名，如果不配置默认为router-link-active
linkExactActiveClass：配置默认的`<router-link>`精确激活后的css中的class名，如果不配置默认为router-link-exact-active
scrollBehavior：配置匹配新的路由时页面的滚动
parseQuery/stringifyQuery：提供自定义查询字符串的解析/反解析函数,覆盖默认行为	???    
fallback：当浏览器不支持 history.pushState 控制路由是否应该回退到 hash 模式，默认值为true	???  



单个路由配置的接口如下：
```js
interface RouteConfig = {
  path: string,
  component?: Component,
  name?: string, // 命名路由
  components?: { [name: string]: Component }, // 命名视图组件
  redirect?: string | Location | Function,
  props?: boolean | Object | Function,
  alias?: string | Array<string>,
  children?: Array<RouteConfig>, // 嵌套路由
  beforeEnter?: (to: Route, from: Route, next: Function) => void,
  meta?: any,

  // 2.6.0+
  caseSensitive?: boolean, // 匹配规则是否大小写敏感？(默认值：false)
  pathToRegexpOptions?: Object // 编译正则的选项
}
```
path：路由地址，子级路由中path只需要追加，但是在`<router-link>`标签中必须写全  
component:需要展示的组件，会展示在`<router-view>`标签位置  
name：给路由命名，多级路由时可以更方便匹配对应的路由
components:命名视图使用，相当于让一个路由路径匹配多个组件视图，需要多个`<router-view>`标签，且配上name属性  
redirect：重定向  
props：让传递的params和query参数在组件内props接收，或者传递一些静态数据  
alias：路由别名(与重定向的区别为不会改变hash值，只会改变视图)(不常用)    
children:嵌套路由，值为`RouteConfig`的数组    
beforeEnter：独享守卫  
meta：定义用户自己的元数据，比如是否需要校验  







### 二.模板中使用的路由的标签
1. `<router-link>`标签  
to属性：值可以为字符串或者对象,可以用v-bind的方式赋值
```html
<!-- 字符串 -->
<router-link to="/home">Home</router-link>
<!-- 对象，对象中的参数有path，name，query，params -->
<router-link :to="{ path: 'register', query: { plan: 'private' }}">Register</router-link>
```

replace属性：布尔值，默认为false  
设置为true时表示使用`$router.replace`方法切换路由,默认为`$router.push`方法

append属性:布尔值，默认为false  
设置为true时表示当前 (相对) 路径前添加基路径

tag属性:默认为a，默认渲染为`<a>`标签
指定何种标签，同样它还是会监听点击，触发导航  

exact属性：布尔值，默认为false
“是否激活”默认类名的依据是包含匹配  
解释如下：  
如果为false，则当前地址为'/a/b'，则地址为'/','/a'和'/a/b'的`<router-link>`标签都会添加上active-class属性指定的css类  
如果为true，则则当前地址为'/a/b'，则只有地址'/a/b'的`<router-link>`标签都会添加上active-class属性指定的css类


active-class属性：
设置链接激活时使用的 CSS 类名，默认值为路由器配置下的linkActiveClass选项值，如无配置为router-link-active

exact-active-class属性：
设置链接被精确匹配使用的CSS类名，默认值为路由器配置下的linkExactActiveClass选项值，如无配置为router-link-exact-active

aria-current-value属性：默认值为page
当链接根据精确匹配规则激活时配置的 aria-current 的值  ???



2. `<router-view>`标签
用于展示路由对应组件的占位标签
name属性：默认值为default
用于渲染对应命名视图下的组件，即components下的某个组件



### 三.编程式路由
```js
router.push(location, onComplete?, onAbort?)
router.push(location).then(onComplete).catch(onAbort)
router.replace(location, onComplete?, onAbort?)
router.replace(location).then(onComplete).catch(onAbort)
router.go(n)
router.back()
router.forward()
//注意这里的router都是this.$router
```
注意传递参数时location中如果有path，则params参数不会生效，所以要传递params参数，可以用name代替




### 四.路由传参
1. query参数     
传递：  
```vue
   <!-- 跳转并携带query参数，to的字符串写法 -->
   <router-link :to="/home/message/detail?id=xxx&title=xxx">跳转</router-link>
   <!-- 跳转并携带query参数，to的字符串写法,需要传递变量类型 -->
   	<router-link :to="`/home/message/detail?id=${xxx}&title=${xxx}`">跳转</router-link>			
   <!-- 跳转并携带query参数，to的对象写法 -->
   <router-link 
   	:to="{
   		path:'/home/message/detail',
   		query:{
   		    id:xxx,
        	title:xxx
   		}
   	}"
   >跳转</router-link>
```
接收：  

```js
$route.query.id
$route.query.title
```


2. params参数（动态路由匹配）  
需要现在路由配置中声明params参数，restful风格  
```js
   {
   	path:'/home',
   	component:Home,
   	children:[
   		{
   			path:'news',
   			component:News
   		},
   		{	
			path:'message',
   			component:Message,
   			children:[
   				{
   					name:'xiangqing',
   					path:'detail/:id/:title', //使用占位符声明接收params参数
   					component:Detail
   				}
   			]
   		}
   	]
   }
```
传递:   

```vue
<!-- 跳转并携带params参数，to的字符串写法 -->
<router-link :to="/home/message/detail/666/你好">跳转</router-link>
				
<!-- 跳转并携带params参数，to的对象写法 -->
<router-link 
	:to="{
		name:'xiangqing',
		params:{
		   id:666,
            title:'你好'
		}
	}"
>跳转</router-link>
```
注意：同编程式路由一样，携带params参数时，若使用to的对象写法，则不能使用path配置项，必须使用name配置  


接收：  
```js
$route.params.id
$route.params.title
```



3. props参数  
props参数可以让路由组件更方便的收到参数，即在组件通过props申明接收  

```js
{
	name:'xiangqing',
	path:'detail/:id',
	component:Detail,

	//第一种写法：props值为对象，该对象中所有的key-value的组合最终都会通过props传给Detail组件
	// props:{a:900}

	//第二种写法：props值为布尔值，布尔值为true，则把路由收到的所有params参数通过props传给Detail组件
	// props:true
	
	//第三种写法：props值为函数，该函数返回的对象中每一组key-value都会通过props传给Detail组件
	props(route){
		return {
			id:route.query.id,
			title:route.query.title
		}
	}
}

```



  
### 五.两个新的生命周期钩子
作用：路由组件所独有的两个钩子，用于捕获路由组件的激活状态。
具体名字：
1. `activated`路由组件被激活时触发。
2. `deactivated`路由组件失活时触发。



### 六.路由守卫
1. 全局守卫:
```js
//全局前置守卫
router.beforeEach((to, from, next) => {
  /* 必须调用 `next` */
})
//全局解析守卫
router.beforeResolve((to, from, next) => {
  /* 必须调用 `next` */
})
//全局后置守卫
router.afterEach((to, from) => {})
```
参数：  
to:即将要进入的目标路由对象   
from:当前导航正要离开的路由对象  
next函数：根据参数不同有以下几种用法  
* next(): 进行管道中的下一个钩子（放行）  
* next(false): 中断当前的导航    
* next('/') 或者 next({ path: '/' }): 跳转到一个不同的地址（可传入与push函数或to属性中一样的对象）  
* next(error): 如果传入next的参数是一个 Error 实例，则导航会被终止且该错误会被传递给 router.onError() 注册过的回调   

常用示例：  
```js
//全局前置守卫：初始化时执行、每次路由切换前执行
router.beforeEach((to,from,next)=>{
	console.log('beforeEach',to,from)
	if(to.meta.isAuth){ //判断当前路由是否需要进行权限控制
		if(localStorage.getItem('school') === 'atguigu'){ //权限控制的具体规则
			next() //放行
		}else{
			alert('暂无权限查看')
			// next({name:'guanyu'})
		}
	}else{
		next() //放行
	}
})

//全局后置守卫：初始化时执行、每次路由切换后执行
router.afterEach((to,from)=>{
	console.log('afterEach',to,from)
	if(to.meta.title){ 
		document.title = to.meta.title //修改网页的title
	}else{
		document.title = 'vue_test'
	}
})
```

2. 独享守卫:
注册在路由项的配置中，参数和全局守卫相同  
```js
routes: [
    {
      path: '/foo',
      component: Foo,
      beforeEnter: (to, from, next) => {
        // ...
      }
    }
  ]
```

常用示例：  
```js
beforeEnter(to,from,next){
	console.log('beforeEnter',to,from)
	if(to.meta.isAuth){ //判断当前路由是否需要进行权限控制
		if(localStorage.getItem('school') === 'atguigu'){
			next()
		}else{
			alert('暂无权限查看')
			// next({name:'guanyu'})
		}
	}else{
		next()
	}
}
```

3. 组件内守卫：
直接定义在组件的内部
```js
beforeRouteEnter(to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
	// 解决方法：（注意只有beforeRouteEnter能给next传入一个回调）
	 next(vm => {
    // 通过 `vm` 访问组件实例
  	})
  },
beforeRouteUpdate(to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
beforeRouteLeave(to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
  }

```

守卫调用的顺序（从一个组件到另一个组件）：
旧组件的beforeRouteLeave(组件内守卫)
beforeEach(全局守卫)
beforeRouteUpdate(组件内守卫)
beforeEnter(独享守卫)
beforeRouteEnter(组件内守卫)
beforeResolve(全局守卫)
afterEach(全局守卫)


导航流程：
导航被触发。
在失活的组件里调用 beforeRouteLeave 守卫。
调用全局的 beforeEach 守卫。
在重用的组件里调用 beforeRouteUpdate 守卫 (2.2+)。
在路由配置里调用 beforeEnter。
解析异步路由组件。
在被激活的组件里调用 beforeRouteEnter。
调用全局的 beforeResolve 守卫 (2.5+)。
导航被确认。
调用全局的 afterEach 钩子。
触发 DOM 更新。
调用 beforeRouteEnter 守卫中传给 next 的回调函数，创建好的组件实例会作为回调函数的参数传入。



### 七.路由器的两种工作模式

1. hash模式：#及其后面的内容就是hash值，hash值不会包含在 HTTP 请求中，不会带给服务器。  
   1. 地址中永远带着#号，不美观 。  
   2. 若以后将地址通过第三方手机app分享，若app校验严格，则地址会被标记为不合法。  
   3. 兼容性较好。  
2. history模式：  
   1. 地址干净，美观 。  
   2. 兼容性和hash模式相比略差。  
   3. 应用部署上线时需要后端人员支持，解决刷新页面服务端404的问题。  
	 
	 

















