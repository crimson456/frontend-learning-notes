# Snabbdom Learning

创建虚拟dom并最小量更新

## Vnode 
```js
//一个Vnode对象
{
    sel: "h1",
    data: {},
    children: undefined,
    text: "Hello, World",
    elm: Element,
    key: undefined,
}
```

- sel：选择器名，一般为标签名(元素选择器)，也可以使用其他选择器
- data:对应标签属性
- children:子VNode组成的数组
- text:文本节点
- elm: 对应真正的dom节点，undefined表示未上树
- key: 虚拟节点的编号，用于diff算法的唯一标识
  

## 重要方法

1. `vnode(sel,data,children,text,elm)`:工具函数，生成Vnode对象

2. `h()`：生成VNode对象，层叠调用生成虚拟DOM树
    ```ts
    function h(sel: string): VNode;
    function h(sel: string, data: VNodeData | null): VNode;
    function h(sel: string, children: VNodeChildren): VNode;
    function h(sel: string, data: VNodeData | null,children: VNodeChildren): VNode;
    ```
    一般用法:第一个参数为标签名，第二个参数为标签的参数，第三个参数为子VNode对象

3. `patch(oldVnode,vnode)`：对比新旧节点

4. `creatElm(vnode)`：根据节点信息创建对应真实DOM
5. `sameVnode(vnode1, vnode2)`：对比两个节点是否为同一个节点，返回布尔值
    >同一个节点条件：sel、key、data.is属性相同，或者都是文档片段创建的节点
6. `patchVnode(oldVnode,vnode,insertedVnodeQueue)`:对新旧节点为同一个节点进行处理







## 主要流程


`patch(oldVnode,vnode)`函数中实际过程：
1. 参数处理，如果oldVnode是真实DOM，则包装成虚拟DOM
2. 判断oldVnode和vnode是否是同一个节点
   - 不是：操作DOM挂载新节点，删除旧节点
   - 是：进行比对(执行`patchVnode()`函数)

`patchVnode(oldVnode,vnode,insertedVnodeQueue)`函数中实际过程：
1. 判断新旧节点是否是内存中同一个对象
   - 是：不处理
   - 不是：开始精细化的处理
2. 精细化处理的流程：
   - 根据新节点和旧节点是否有text属性和children属性进行不同的DOM增删改处理
    >text、children属性可以二选一或都没有
   - 其中当新旧节点都有children属性，进行diff(执行`updateChildren()`函数)



`updateChildren()`函数中实际过程：
四个指针分别指向新旧节点的children数组头尾，并且只会在匹配后单向移动
四种匹配规则：(依次匹配)
   - 旧头新头
   - 旧尾新尾
   - 旧头新尾
   - 旧尾新头
匹配成功会递归调用patchVnode()递归处理匹配的节点的子节点
匹配失败则从新头指针对应的节点在旧数组里查询对应的节点，查询方法：
通过遍历旧节点children数组头尾指针之间的节点，生成一个键名为key值，键值为节点位置的映射对象，然后通过key值获取到对应位置的节点
如果节点不匹配(不存在或者对应key值的节点类型不同)，就会创建新的节点并插入在旧头指针对应的节点之前
如果节点匹配就会调用patchVnode()递归处理匹配的节点的子节点，并将旧节点上对应的节点插入在旧头指针对应的节点之前，并将原位置的节点置为undefined
匹配成功或失败，新头指针都会移向下一位












网上教程实现思路：
   1. 判断新节点是否有text属性
      - 有:判断新旧节点的text属性内容是否相同
        - 相同：不处理
        - 不同：直接修改DOM(使用innerHTML或者textContent)
         >原因：使用innerHTML或者textContent可以直接覆盖原节点中所有子节点并生成一个新的文本节点
      - 没有:则说明新节点中有子节点
   2. 新节点中有子节点的情况下，判断旧节点有没有子节点
      - 没有：操作DOM清空旧节点中的文本节点并添加新节点的子节点
      - 有：进行diff









[patchVnode(oldVnode,vnode)函数流程图]()
[流程图2]()


