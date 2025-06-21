# Npm Learning

## 基本知识

npm(node package manager)

1. 安装包的结构

   - 版本3.x以前为嵌套结构，各个包都将依赖安装到各自的node_modules文件夹，结构清晰但会产生冗余安装和路径过长的问题
   - 版本3.x以后为扁平结构，所有依赖优先安装到根目录node_modules文件夹，当版本出现不兼容时，才安装到自己的node_modules文件夹

2. package-lock.json、npm-shrinkwrap.json文件

扁平结构安装依赖会产生问题：根据package.json中依赖的顺序安装依赖，依赖顺序不同、依赖包小版本更新可能会导致文件夹结构的不确定性

版本5.x以后添加package-lock.json文件用于锁定依赖结构，并且缓存了每个包的具体版本和下载链接，不需要再去远程仓库查询，减少网络请求数，提高下载速度


发布包时，npm默认忽略package-lock.json文件，使用者拉时会和其他包共享依赖，不造成冗余
如果发布应用(命令行工具、守护进程)，需要提交则执行npm shrinkwrap 命令生成npm-shrinkwrap.json文件(和package-lock.json文件作用相同，但不会被npm忽略)，提交后使用者拉取时依赖会被锁定
提交到github上都会提交上



4. .npmignore文件、.gitignore文件

用于npm发布前忽略一些文件，和.gitignore文件类似，且.npmignore文件不存在时会使用.gitignore文件

优先级顺序为 子目录.npmignore文件 > package.json中files字段 > 根目录.npmignore文件

默认必须包括的文件：
package.json、README、LICENSE(LICENCE)、package.json文件中main和bin字段声明的文件

默认忽略的文件：(有些可以通过package.json文件中files字段包括，但有些必须忽略)
node_modules、package-lock.json、.npmrc ...... 还有一些其他的配置文件




5. license文件，常用开源协议

   - GPL(GNU General Public License) 软件使用了遵循GPL协议的开源代码，发布则必须整体遵循GPL协议(注意网站、云服务一类无发布的概念)

   - LGPL(GNU Lesser General Public License) 软件使用了遵循LGPL的开源代码，不需要同样遵循LGPL协议，用于闭源软件使用开源包

   - AGPL(GNU Affero General Public License) GPL基础上将网站、云服务一类加入协议范围

   - Apache协议 1.0和1.1版本为apache衍生软件使用，2.0版本为不限制开闭源，但使用者需要添加NOTICE文件声明所引用的来源

   - MIT协议 不限制开闭源，但需要在使用处留名

   - WTFPL协议 无限制

   - ISC协议(Internet Systems Consortium) 和两条版BSD协议基本相同

   - BSD协议(Berkeley Software Distribution) 分四个包含条款数不同的版本，不限制开闭源

   - MPL协议(Mozilla Public License) 软件使用了遵循MPL协议的开源代码，只有使用部分需要遵循MPL协议且必须开源，且修改后的代码版权归软件的发起者

   - CDDL协议(Common Development and Distribution License) MPL协议的扩展协议


   [选择协议](./license_choice.png)



6. AUTHORS文件
每行的格式都为 Name <email> (url)，#开头为注释，会被放入package.json的contributors字段中


7. node_modules/.package-lock.json文件

用于避免重复处理node_modules文件，如果要手动修改node_modules中的包，最好删除此文件


## package.json 文件字段


- name 包名
- version 版本号
- desription 包的描述
- keywords 用于npm搜索的关键词
- homepage 项目主页
- bugs 开发者联系方式，可以是对象也可以是url字符串
  - url 代码库issues地址
  - email 项目邮箱
- license 开源协议的spdx id
- author 项目作者
- contributors 项目贡献者
  - >每个个人都可以用一个对象或一个字符串描述
- funding 声明获取捐赠的url，使用者可以通过npm fund命令访问
- files 声明项目包含的文件，可以搭配`.npmignore`文件使用，注意优先级

- main 代码入口文件，也就是通过require函数引用包名时使用的文件，不设置默认为index.js
- browser 浏览器端commonjs优先导出的入口文件

- bin 指定命令对应的可执行文件的路径，这些路径会被映射到环境变量，可以scripts中使用
- scripts 指定一些命令行的缩写，可通过 npm run xxx 执行
- config 用于添加运行时js脚本可以使用的环境变量，js可以通过process.env.npm_package_config_xxxx获取到变量的值

- man 指定手册文件的路径，可以通过 man xxx 访问

- directories cjs规范用于指明代码结构的描述，用法和前面其他同名字段相同，但不要重复
  - bin
  - man

- repository 指明代码仓库
  - type 仓库类型
  - url 仓库地址
  - directory 仓库所在文件夹(仓库不在url根目录下的情况，比如monorepo)


- dependencies 项目依赖
- devDependencies 开发依赖
- peerDependencies 对等依赖，声明需要安装的主包，一般为插件包使用
- peerDependenciesMeta 可以保存一些对等依赖的信息，比如可以将一些对等依赖声明为可选
  - >添加peerDependencies似乎只能直接修改package.json文件
- optionalDependencies 可选依赖，下载失败也不会影响npm运行，注意优先级高于dependencies字段，如果要使用，代码中需要加入引入包的判断逻辑
- bundleDependencies\bundledDependencies 打包依赖，执行 npm pack 命令生成压缩包时添加的依赖项，注意此字段为依赖名称的数组，需要在dependencies、devDependencies字段中声明过，可以用于本地未上传网络的包
  - >如果设为布尔值则指明全部依赖

- overrides 用于重写依赖的版本，可以重写嵌套的依赖的版本

- engines 声明项目的node、npm版本，默认只推荐，配置文件中设置engine-strict为强制
  - node 
  - npm
- os 声明兼容或不兼容的操作系统，可以通过process.platform查看
- cpu 声明兼容或不兼容的CPU型号，可以通过process.arch查看

- private 设为私有包，如果设为true，无法通过npm publish发布代码

- publishConfig 发布时使用的配置值

- workspaces 工作路径，工作路径下的每个有package.json的包会被链接到根目录的node_modules文件夹中，用于monorepo中引用本地其他项目




过时字段：

- engineStrick 程序是否只能在指定的engine上运行

- preferGlobal 用于触发警告，推荐可执行文件进行全局安装




非官方字段：


- browserlist 支持的浏览器
  >也可以配置在.browserslistrc文件中或browserslist文件中



- module (非官方字段)服务器端esmodule语法导入优先的入口文件 

- sideEffects 有副作用的代码url数组，或者布尔值说明全部代码都有无复作用，用于webpack
  >副作用：除了导出变量还加入了其他操作的代码，如修改全局变量等等
  >一般为有副作用的文件:polyfill文件、样式文件



- type 文件模块种类  
- eslintIgnore eslint忽略的文件路径数组
- exports 控制包导出对应的路径



## .npmrc运行时配置文件

格式：ini文件格式的键值对，;和#开头表示注释

主要保存npm运行时的一些配置，包括内置、全局、用户、项目都有单独的npmrc文件
比如运行npm命令时的一些默认行为

执行 npm config ls -l 命令可以查看所有配置项


常用配置项：

registry 设置下载源
prefix 全局包的安装路径

## CLI(command line interface)



- npm init 简单创建一个包，生成package.json文件
- npm init <initializer> 通过执行名为create-<initializer>包(一般大项目会有自己的初始化包)中的可执行命令来创建包

- npm install 下载依赖包
  - -P, --save-prod (默认)添加到denpendencies字段下
  - -D, --save-dev 添加到devDenpendencies字段下
  - -O, --save-optional 添加到optionalDependencies字段下
  - -B, --save-bundle 添加到bundleDependencies字段下
  - -E, --save-exact 添加到denpendencies时保存确定版本，默认保存为当前大版本最新版
  - --no-save 只安装包，不添加到denpendencies字段下

- npm update 更新依赖包

- npm uninstall 卸载依赖包
  - --no-save 删除node_modules包但保留package.json中的依赖

- npm ci    (clean install) 严格按照锁文件删除node_modules后重新安装依赖
  - >npm install可能会修改package.json和锁文件内容,npm ci不会

- npm install-test 等于 npm install + npm test
- npm install-ci-test 等于 npm ci + npm test

- npm shrinkwrap 将package-lock.json更换为npm-shrinkwrap.json文件


- npm ls <package-name> 不添加包名则显示所有安装的依赖，添加包名则只显示相关的依赖
  - --depth 依赖的深度
  - --all 相当于--depth=infinity
  - --global 查看全局安装的依赖
- npm [ll|la] 显示当前包依赖的详细信息，没什么用

- npm explain <package-name> 查询单个依赖(包括不同版本)的依赖结构

- npm prune 清除node_modules中没有使用的依赖包

- npm outdated 查看所有可以更新的依赖

- npm search 根据给出的关键字搜索包

- npm view 查询包的详细信息，也可以查询包package.json中的字段

- npm diff 可以用于对比包的差异

- npm link 用于符合链接本地包和另一个包的node_modules文件夹，用于包发布前本地测试是否可用

- npm pkg 用于查询或修改package.json文件内容

- npm version <update_type> 更新package.json中的版本号
  - patch, major, minor 对应版本号+1
  - premajor, preminor, prepatch 对应版本号+1，且增加预发布号为0，如果已经是预发布版本则只需要预发布号+1
  - prerelease 如果当前没有预发布号，patch版本号+1，且增加预发布号为0，如果当前有预发布号，则预发布号+1，且可以通过preid选项添加预发布描述字符

- npm dist-tag 添加删除标签
>dist-tag和版本号使用在同一位置，注意不要冲突，不要用版本号或以v开头，默认声明了一个tag：lateast


- npm publish 发布包

- npm unpublish <package-name>@<version> 撤销发布一个版本的包
- npm unpublish <package-name> -f 撤销发布所有版本的包
  - >一般不撤销发布，而是废弃

- npm deprecate <package-name> "<message>" 废弃包，推荐用户使用新的方案
  - message为空字符串时为取消废弃


- npm owner 修改包的拥有者，如果要废弃包，可以将包的拥有者改为npm

- npm access 修改包的权限

- npm config 修改npm配置，即修改.npmrc文件的值


- npm run-script 执行package.json中scripts字段的脚本
  - 注意执行脚本会按照 prexxx xxx postxxx 的顺序执行，一些系统命令也有对应的pre和post脚本，如果定义，则在执行时也会这些脚本

- npm start 相当于 npm run-script start ，如果没有定义则运行node server.js
- npm stop 相当于 npm run-script stop 
- npm restart 相当于npm run-script restart
- npm test 相当于 npm run-script test

- npm exec 执行对应包下package.json对应bin字段的可执行文件
- npx
>这两个命令的参数解析方式不同



- npm pack <package> 打包生成一个.tgz压缩文件


- npm docs 查询文档地址并通过浏览器打开，会查询package.json中homepage字段
- npm fund 查询项目中需要支持的包的捐赠地址，会查询package.json中funding字段
- npm bugs 查询bugs提交地址并通过浏览器打开，会查询package.json中bugs字段
- npm repo 查询项目仓库地址并通过浏览器打开，会查询package.json中repository字段

- npm help 打开帮助文档
- npm help-search 在帮助文档中检索关键词位置





- npm adduser 对注册表创建一个用户，并将登录信息保存在.npmrc文件中
- npm login 登录注册表
- npm logout 登出注册表
- npm whoami 返回登录者用户名
- npm profile 查询或修改用户的个人信息，或开启或关闭双因素认证
- npm prefix 返回当前项目地址的前缀
- npm ping 向注册表发起请求，测试连接正常

- npm star 标记一个包
- npm unstar 取消标记
- npm stars 查询所有标记的包

- npm token 管理token相关操作
- npm org 管理组织相关操作
- npm team 管理团队相关操作















npm find-dupes 查找依赖树可以优化的部分，相当于npm dedupe --dry-run
npm dedupe 优化依赖树的结构
npm audit 用来审查依赖中存在的漏洞或通过升级的方式修复漏洞，但似乎参考意义不是很大
npm audit signatures 审核签名，即从注册表上下载的包的完整性
npm query 根据选择器检索所依赖的包，用以筛查自己的依赖
npm edit 使用默认编辑器打开对应包的文件夹
npm explore 在指定目录下打开子shell
npm cache 对缓存文件夹进行管理，一般npm内部使用
npm completion 用于将npm相关内容放入shell的自动补全中
npm doctor 运行一组检查，确保npm能正常运行，比如nodejs和git是否可执行，注册表是否可用，node_modules文件是否存在和可写，缓存是否存在且其中压缩包是否损坏
npm rebuild 重新执行一些生命周期脚本并将二进制文件重新链接，用于更换nodejs版本或更换环境后重新构建包
npm root 打印有效的node_modules文件夹地址，可用于shell脚本中
npm sbom 生成(Software Bill of Materials)软件物料清单
npm hook 管理npm钩子，这个钩子可以用于npm包更新后发送一个post请求到对应url
