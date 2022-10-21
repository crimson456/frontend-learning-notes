# Npm Learning


## package.json 文件字段

- name 包名
- version 版本号 三级
- desription 包的描述
- keywords 关键词
- homepage 项目主页
- bugs 开发者联系方式，如代码库issues地址
  - url
  - email
- license 开源协议
- author 项目作者
  - name
  - email
  - url
- contributors 先您过目贡献者
- main 代码入口文件
- scripts npm命令行缩写
- directories 代码结构的描述 ？？
- files 项目包含的文件，用于排除一些文件，也可以在根目录添加`.npmignore`文件 ？？
- repository 代码从库对象
  - type 仓库类型
  - url 仓库地址
- config 用于添加命令行使用的配置值 ？
- publishConfig 发布时使用的配置值
- dependencies 项目依赖
- devDependencies 项目开发依赖
- bundledDependencies 打包时的依赖 ？
- peerDependencies 当前组件(某个包的子组件)和其他组件共同的依赖
- engines 项目所依赖的node环境、npm版本等 ？
- engineStrick 程序是否只能在指定的engine上运行
- os 模块可以在什么操作系统上运行
- cpu CPU型号
- preferGlobal 需要全局安装(如命令行程序)
- private 私有代码，如果设为true，无法通过npm publish发布代码
- bin 用来指定各个内部命令对应的可执行文件的路径 ？


- browserlist 支持的浏览器
  >也可以配置在.browserslistrc文件中或browserslist文件中

- sideEffects 有副作用的代码url数组，或者布尔值说明全部代码都有无复作用，用于webpack
  >副作用：除了导出变量还加入了其他操作的代码，如修改全局变量等等
  >一般为有副作用的文件:polyfill文件、样式文件


- type 文件模块种类  
- eslintIgnore eslint忽略的文件路径数组


- browser 浏览器端优先导出的入口
- module 服务器端导入优先的入口 


- exports 控制包导出对应的路径



