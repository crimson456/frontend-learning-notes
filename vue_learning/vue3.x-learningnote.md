# Vue3.x Learning

## 一.组合式API
组合式API基本都需要先引入

1. `setup(props, context)`函数基本使用
`setup()`方法不用引入
`setup(props, context)`中可以声明代替原本data中的数据和method中的方法
参数：  
   1. `props`参数接收从父组件中传入的响应式参数，不能用结构赋值，会破坏响应式    
   2. `context`中包含三个组件的属性attrs、slots、emit和一个expose属性，可以解构赋值，等同于$attrs、$slots、$emit，attrs为props中没有接收的数据，slots为父组件插槽中的标签，emit触发事件，expose属性用于返回值为渲染函数时暴露各种属性值，使用方法`expose({各种属性值})`
返回值：
   1. (常用)返回一个对象，则对象中的属性、方法, 在模板中均可以直接使用  
   2. 返回一个渲染函数：则可以自定义渲染内容
执行时机：  
在beforeCreate之前执行一次，this是undefined
```js
setup(props, context) {
    // Attribute (非响应式对象，等同于 $attrs)
    console.log(context.attrs)
    // 插槽 (非响应式对象，等同于 $slots)
    console.log(context.slots)
    // 触发事件 (方法，等同于 $emit)
    console.log(context.emit)
    // 暴露公共 property (函数)
    console.log(context.expose)
	//数据
	let name = ref('张三')
	let age = ref(18)
	let job = ref({
		type:'前端工程师',
		salary:'30K'
	})
	//方法
	function changeInfo(){
		// name.value = '李四'
		// age.value = 48
		console.log(job.value)
		// job.value.type = 'UI设计师'
		// job.value.salary = '60K'
		// console.log(name,age)
	}
	//返回一个对象（常用）
	return {
		name,
		age,
		job,
		changeInfo
	}
}
```

2. `ref()`,`reactive()`函数  
都用于定义一个响应式的数据   
`ref()`返回一个value值为getter，setter或者proxy类型的ref对象
`reactive()`返回一个proxy对象
语法：  
```js
const xxx = ref(initValue) 
const 代理对象= reactive(源对象)
```
`ref()`可以用于基本数据类型和对象数据类型：  
对于基本数据类型,`ref()`会将其封装为一个ref对象，响应式依然是靠`Object.defineProperty()`的getter与setter完成的
对于对象数据类型,`ref()`会求助`reactive()`函数,将其封装为一个value值为proxy实例的ref对象
`reactive()`用于对象数据类型：
`reactive()`会将对象数据类型封装为一个Proxy实例对象，reactive定义的响应式数据是“深层次的”
`ref()`定义的数据在JS中操作数据：`xxx.value`，而模板中读取数据不需要`.value`，而`reactive()`定义的数据均不需要




3. `computed()`函数
与vue2.x的中计算属性配置方法类似
```js
import {computed} from 'vue'
setup(){
    ...
	//计算属性——简写
    let fullName = computed(()=>{
        return person.firstName + '-' + person.lastName
    })
    //计算属性——完整
    let fullName = computed({
        get(){
            return person.firstName + '-' + person.lastName
        },
        set(value){
            const nameArr = value.split('-')
            person.firstName = nameArr[0]
            person.lastName = nameArr[1]
        }
    })
}
```

4. `watch()`方法
与vue2.x的中监视属性配置方法类似
注意：
两个小“坑”：
  - 监视reactive定义的响应式数据时：oldValue无法正确获取、强制开启了深度监视（deep配置失效）。
  - 监视reactive定义的响应式数据中某个属性时：deep配置有效。
  
```js
//情况一：监视ref定义的响应式数据
watch(sum,(newValue,oldValue)=>{
	console.log('sum变化了',newValue,oldValue)
},{immediate:true})

//情况二：监视多个ref定义的响应式数据
watch([sum,msg],(newValue,oldValue)=>{
	console.log('sum或msg变化了',newValue,oldValue)
}) 

/* 情况三：监视reactive定义的响应式数据
			若watch监视的是reactive定义的响应式数据，则无法正确获得oldValue！！
			若watch监视的是reactive定义的响应式数据，则强制开启了深度监视 
*/
watch(person,(newValue,oldValue)=>{
	console.log('person变化了',newValue,oldValue)
},{immediate:true,deep:false}) //此处的deep配置不再奏效

//情况四：监视reactive定义的响应式数据中的某个属性
watch(()=>person.job,(newValue,oldValue)=>{
	console.log('person的job变化了',newValue,oldValue)
},{immediate:true,deep:true}) 

//情况五：监视reactive定义的响应式数据中的某些属性
watch([()=>person.job,()=>person.name],(newValue,oldValue)=>{
	console.log('person的job变化了',newValue,oldValue)
},{immediate:true,deep:true})

//特殊情况
watch(()=>person.job,(newValue,oldValue)=>{
    console.log('person的job变化了',newValue,oldValue)
},{deep:true}) //此处由于监视的是reactive素定义的对象中的某个属性，所以deep配置有效
```

5. watchEffect函数
不用指明回调函数
```js
//watchEffect所指定的回调中用到的数据只要发生变化，则直接重新执行回调。
watchEffect(()=>{
    const x1 = sum.value
    const x2 = person.age
    console.log('watchEffect配置的回调执行了')
})
```

6. ref和reactive相关api
`toRef(proxy实例,属性名)` 和 `toRefs(proxy实例) `
作用：创建一个或者一组 ref 对象，其value值指向另一个对象中的某个属性，这样可以简化setup中的return和模板中的写法
```js
setup() {
    const state = reactive({
      foo: 1,
      bar: 2,
    });
    const student=ref({
      name:'zhangsan',
      age:18
    })
    const fooRef = toRef(state, "foo");
    const nameRef=toRef(student.value,"name")
    return {
      fooRef,
      nameRef
    }
```
```js
setup() {
    const state = reactive({
      foo: 1,
      bar: 2,
    });
    const student=ref({
      name:'zhangsan',
      age:18
    })
    const stateRefs = toRefs(state);
    const studentRefs=toRefs(student.value)
    return {
      ...stateRefs,
      ...studentRefs
    }
```

`readonly()`
接受一个对象 (响应式或纯对象) 或 ref 并返回原始对象的只读代理,深只读

`isReadonly()`
检查对象是否是由readonly创建的只读代理

`isReactive()`  
检查对象是否是由reactive创建的响应式代理,如果该代理是readonly 创建的,但包裹了由reactive创建的另一个代理，它也会返回true

`isProxy()`
检查对象是否是由reactive或readonly创建的proxy

`isRef()`  
检查值是否为ref对象  

`unref()`  
如果参数为 ref，则返回内部值，否则返回参数本身  
`unref(val)`相当于`isRef(val) ? val.value : val`的语法糖  

`shallowReactive()`   
只处理对象最外层属性的响应式，返回一个proxy对象

`shallowReadonly()`
创建一个 proxy，使其自身的 property 为只读，但不执行嵌套对象的深度只读转换 (暴露原始值)

`shallowRef()`  
只处理基本数据类型的响应式, 不进行对象的响应式处理,但是会跟踪value值的变化,返回一个value值为object对象类型的ref对象

`triggerRef()`  
与`shallowRef()`一起使用，手动记录value值中发生的新变化

`toRaw()`
返回 reactive 或 readonly 代理的原始对象

`markRaw()`
标记一个对象，使其永远不会转换为 proxy。返回对象本身

`customRef()`
作用：创建一个自定义的 ref，并对其依赖项跟踪和更新触发进行显式控制。
实现防抖效果：
```vue
<template>
	<input type="text" v-model="keyword">
	<h3>{{keyword}}</h3>
</template>

<script>
	import {ref,customRef} from 'vue'
	export default {
		name:'Demo',
		setup(){
			// let keyword = ref('hello') //使用Vue准备好的内置ref
			//自定义一个myRef
			function myRef(value,delay){
				let timer
				//通过customRef去实现自定义
				return customRef((track,trigger)=>{
					return{
						get(){
							track() //告诉Vue这个value值是需要被“追踪”的
							return value
						},
						set(newValue){
							clearTimeout(timer)
							timer = setTimeout(()=>{
								value = newValue
								trigger() //告诉Vue去更新界面
							},delay)
						}
					}
				})
			}
			let keyword = myRef('hello',500) //使用程序员自定义的ref
			return {
				keyword
			}
		}
	}
</script>
```
7. provide和inject
实现祖孙组件通信
祖组件中：
```js
setup(){
	......
    let car = reactive({name:'奔驰',price:'40万'})
    provide('car',car)
    ......
}
```
后代组件中：
```js
setup(props,context){
	......
    const car = inject('car')
    return {car}
	......
}
```


8. Composition API 形式的生命周期钩子函数  
    Vue3.x中可以继续使用Vue2.x中的生命周期钩子，但有两个被更名：  
    ```beforeDestroy```改名为 ```beforeUnmount```  
    ```destroyed```改名为 ```unmounted```  
    Vue3.0也提供了 Composition API 形式的生命周期钩子，对应vm对象下的生命周期钩子关系如下：  
    `beforeCreate`===>`setup()`  
    `created`=======>`setup()`  
    `beforeMount` ===>`onBeforeMount`  
    `mounted`=======>`onMounted`  
    `beforeUpdate`===>`onBeforeUpdate`  
    `updated` =======>`onUpdated`  
    `beforeUnmount` ==>`onBeforeUnmount`  
    `unmounted` =====>`onUnmounted`  




## 二.内置组件

1.`Fragment`

在Vue2中: 组件必须有一个根标签  
在Vue3中: 组件可以没有根标签, 内部会将多个标签包含在一个Fragment虚拟元素中  
好处: 减少标签层级, 减小内存占用  

2.`Teleport`
`Teleport` 组件是一种能够将我们的组件html结构移动到指定位置  
模态框可以放在body位置
```vue
<teleport to="移动位置">
	<div v-if="isShow" class="mask">
		<div class="dialog">
			<h3>我是一个弹窗</h3>
			<button @click="isShow = false">关闭弹窗</button>
		</div>
	</div>
</teleport>
```

3.`Suspense`
等待异步组件时渲染一些额外内容，让应用有更好的用户体验
使用步骤：
异步引入组件
 ```js
 import {defineAsyncComponent} from 'vue'
 const Child = defineAsyncComponent(()=>import('./components/Child.vue'))
 ```
用`Suspense`包裹组件，并配置好`default` 与 `fallback`插槽
`default`插槽中放入加载好后渲染内容，`fallback`插槽中放入渲染前放置的内容
```vue
<template>
	<div class="app">
		<h3>我是App组件</h3>
		<Suspense>
			<template v-slot:default>
				<Child/>
			</template>
			<template v-slot:fallback>
				<h3>加载中.....</h3>
			</template>
		</Suspense>
	</div>
</template>
```






