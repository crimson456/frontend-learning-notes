# Webpack5 Learning

## 起步

```
npm install webpack webpack-cli --save-dev
```

## webpack.config.js

导出一个 js 对象：


- target字段 编译的目标环境

- mode字段:development|production|none

- entry字段:
  1. 字符串、字符串数组形式，以 main 作为 entryChunkName
  2. 对象形式，成员为字符串、字符串数组形式，以成员名作为 entryChunkName
  3. 对象形式，成员为 chunk 描述符对象
    chunk 描述符对象的成员：
      - dependOn 当前入口所依赖的入口名(entryChunkName)
      - filename 当前入口的导出包名(优先级高于 output 字段中的 filename 字段)
        - filename 中可用 `[name]`、`[ext]`、`[hash]`等模板
      - import 启动时需加载的文件路径
      - library 以当前入口打包一个库，如果是字符串或数组则拼接成路径，如果是对象则成员有:
        - name 库名
        - type 库的暴露方式
        - export 库入口文件的导出目标(暴露内容)
        - auxiliaryComment 在UMD包装器中为各个类型的模块添加注释
        - umdNamedDefine 布尔值，amd模块定义命名相关
      - runtime 运行时chunk的名字 
      - publicPath 当该入口的输出文件在浏览器中被引用时为它们指定一个公共 URL 地址 ？


- output字段: 打包出口
  
  - path 打包出口绝对路径
  - publicPath 打包出口公共路径 ？
  - filename 打包文件名(会和path拼接)
  - chunkFilename 非入口chunk文件的名称
  >动态引入的chunk或者代码分离的chunk
  - assetModuleFilename 静态资源打包的默认文件名
  >也可在资源模块中配置，资源模块中配置的优先级更高


  - library 打包为一个库，如果是字符串或数组则拼接成路径，如果是对象则成员有:
    - name 库名
    - type 库的暴露方式
    - export 库入口文件的导出目标(暴露内容)
    - auxiliaryComment 在UMD包装器中为各个类型的模块添加注释
    - umdNamedDefine 布尔值，amd模块定义命名相关
  >一般打包库文件都是单入口
  - auxiliaryComment 创建库导出时在UMD包装器中为各个类型的模块添加注释
  >最好使用library下的同名字段
  - umdNamedDefine 命名由 UMD 构建的 AMD 模块(libraryTarget: "umd"时有效)
  - uniqueName 全局环境下为防止多个webpack运行时冲突所使用的唯一名称，模块联邦中可能会用到？？？
  - globalObject 将决定使用哪个全局对象来挂载 library ？？？


  - clean 清空输出目录，可以是布尔值或者对象
    - dry 打印而不是删除应该移除的静态资源
    - keep 保留的静态，可以是正则
  - asyncChunks 布尔值，创建按需加载的异步chunk，默认为true
  - compareBeforeEmit 输出时检查是否有同名文件，如果有则不写入，默认为true
  - pathinfo 是否在bundle中引入所包含模块信息的相关注释 ？

  - charset 为HTML的script标签添加`charset="utf-8"`属性
  - scriptType 加载异步chunk时使用的script标签的type属性 ？？？
  - crossOriginLoading 是否开启跨域加载chunk ？？？


  - sourcePrefix 输出 bundle 中每行的前缀 ？
  - sourceMapFilename source-map文件名(仅在 devtool 设置为 'source-map' 时有效)？
  - devtoolModuleFilenameTemplate 自定义每个source map的sources数组中使用的名称 ？？？
  - devtoolFallbackModuleFilenameTemplate devtoolModuleFilenameTemplate重复的备用内容
  - devtoolNamespace devtoolModuleFilenameTemplate使用的命名空间 ？？？

  - chunkFormat chunk的格式，对应cjs，esm，webworker ？？？
  - chunkLoadTimeout chunk请求到期之前的毫秒数，默认为120000 ？？？
  - chunkLoadingGlobal webpack用于加载chunk的全局变量 ？？？
  - chunkLoading 加载chunk的方法 ？？？

  - enabledLibraryTypes 允许entry使用的lib类型(暴露方式)的数组
  - enabledChunkLoadingTypes 允许entry使用的chunk加载类型的数组(entry为函数时配置)

  - hashDigest 在生成 hash 时使用的编码方式，默认为hex？？？
  - hashDigestLength 散列摘要的前缀长度？？？
  - hashFunction 散列算法 ？？？
  - hashSalt 一个可选的加盐值 ？？？

  - hotUpdateChunkFilename 自定义热更新 chunk 的文件名 ？？？
  - hotUpdateGlobal ？？？
  - hotUpdateMainFilename 自定义热更新的主文件名？？？

  - enabledWasmLoadingTypes 设置入口支持的 wasm 加载类型的列表？？？
  - wasmLoading 加载 WebAssembly 模块的方式？？？

  - iife 告诉 webpack 添加 IIFE 外层包裹生成的代码？？？
  - importFunctionName 内部 import() 函数的名称？？？ 
  - workerChunkLoading 用于控制 workder 的 chunk 加载
  - trustedTypes  Trusted Types库相关？？？
  - strictModuleErrorHandling ？？？
  - module 以模块类型输出 JavaScript 文件，实验属性？？？




- devServer字段：

  - hot 布尔值或`'only'`，是否开启热模块替换 
    >only:发生错误并修改时不会刷新页面
    js文件的热模块替换需要在主文件中添加
    ```js
    if (module.hot) {
      //第一个参数为需要开启热模块替换的路径，第二个参数为每次替换的回调
      module.hot.accept('./print.js', callback)
    }
    ```
  - liveReload 布尔值，是否开启文件更改实时刷新页面
  - allowedHosts 允许访问开发服务器的域名的数组
  - headers 为所有响应添加响应头
  - open 服务器开启后打开浏览器
  - host 指定要使用的host
  - port 指定要使用端口号
  - magicHtml 开启magic Html routes功能(webpack的出口对应每一个路由)
  - client 浏览器中的配置
    - logging 设置日志级别
    - overlay 布尔值或对象，布尔值表示编译错误或警告时，在浏览器中显示全屏覆盖，对象值单独配置
      - errors 
      - warnings 
    - progress 以百分比显示编译进度
    - reconnect 尝试重新连接客户端的次数？？？
    - webSocketTransport 为客户端单独选择当前的devServer传输模式，或者提供自定义的客户端实现？？？
    - webSocketURL 指定URL到web socket服务器？？？
  - compress 开启gzip
  - watchFiles 配置监听的文件，有高级配置选项
  - static 指定静态资源文件夹，默认为`'public'`，可以是布尔值，字符串，对象或其组成的数组，对象成员
    - directory 目录地址
    - staticOptions 同`express.static()`方法
    - publicPath 将静态资源文件夹展示到的路径
    - serveIndex 是否使用 erveIndex中间件(在没有index.html文件时生成目录列表)
    - watch 监听静态资源文件更改，触发重新加载，有高级配置选项
  - historyApiFallback 通过history API来配置要响应的资源资源，有高级配置
  >解决前端路由后刷新页面后没有对应资源响应404的问题
  - proxy 设置代理的接口
    - 对象名为要代理的接口的字符串，对象值为配置
  - http2 布尔值，使用 spdy 提供 HTTP/2 服务
  - https 布尔值或对象值，布尔值表示使用HTTPS提供服务(默认通过HTTP提供服务)，对象值
  - server 配置服务的协议，可以为字符串或对象，默认为http
    - type 协议的名称
    - options 配置(https使用,公钥私钥)
      - minVersion
      - key
      - pfx
      - cer
      - ca
      - passphrase
      - requestCert
  - setupMiddlewares 配置自定义的中间件
  - onAfterSetupMiddleware 配置服务器内部在所有其他中间件之后执行的自定义中间件(弃用，使用setupMiddlewares)
  - onBeforeSetupMiddleware 配置服务器内部在所有其他中间件之前执行的自定义中间件(弃用，使用setupMiddlewares)
  - onListening 配置在webpack-dev-server开始监听端口连接时执行的自定义函数

  - devMiddleware 为webpack-dev-middleware提供处理 webpack资源的配置项？？？


  - bonjour 使用ZeroConf网络广播你的开发服务器及其配置 ？？？
  - ipc 监听的unix socket？？？
  - setupExitSignals 允许在SIGINT和SIGTERM信号时关闭开发服务器和退出进程 ？？？
  - webSocketServer 选择当前的 web-socket 服务器或者提供自定义的 web-socket 服务器实现？？？







- watch字段：布尔值，开启/关闭Watch模式，初始构建之后继续监听任何已解析文件的更改(默认关闭)
- watchOptions字段：用于配置watch模式
  - aggregateTimeout 文件更改后到重新构建的延时(合并一段时间内的更改到一次重新构建)
  - ignored 忽略监听的文件，可以是字符串，正则，数组
  - poll 布尔值表示开启/关闭轮询，数字表示开启轮询并设置轮询时间
  - followSymlinks 布尔值，根据软链接查找文件？？？
  - stdin 布尔值，当stdin流结束时停止监听？？？



- devtool字段：打包后生成的.map文件和内容(source map)的相关配置
  默认为false，可选择很多种不同的方式，字段一般意义:
    - source-map 生成映射，根据其他配置完成打包，默认单独生成.map文件
    - eval 将代码打包分块在`eval()`函数中并在后面添加注释信息,并将要生成的映射转化为base64编码的字符串一并打包
    - inline 将要生成的映射合并在包的行内，不生成.map文件
    - cheap 只有行映射没有列映射，性能较好，不能处理压缩成一行的代码
    - hidden 映射的末尾不添加注释
    - module 会映射到源自loader的代码 ？

  开发中常用:
    - 开发模式：cheap-source-map   
    - 生产模式: source-map  
    >生产模式下需要列映射，因为代码会压缩



- module字段：
  - rules Rule对象组成的数组，Rule对象成员
    - Rule.test 匹配所有满足条件的路径，一般为正则
    - Rule.include 包括的路径
    - Rule.exclude 排除的路径
    - Rule.issuer 指定需要资源的文件的路径
    - Rule.resource 资源的绝对路径
    - Rule.resourceQuery 资源的参数，一般为正则
    - Rule.use 值为UseEntry对象的数组或者函数，UseEntry对象的成员包括：(UseEntry对象即loader文件)
      >如果为数组则loader的执行顺序为从后到前
      - loader loader名
      - options loader中的配置项
      - query loader中的配置项
      >query是可能存在的别名，具体loader配置查文档
    - Rule.loader Rule.use:[{ loader }]的简写
    - Rule.loaders Rule.use的别名
    - Rule.options/Rule.query Rule.use: [{ options }]的简写
    - Rule.rules 嵌套规则，成员全部继承
    - Rule.oneOf 嵌套规则，成员全部继承，但只匹配第一个成功的规则
    - Rule.type 加载资源模块,可选值：
      - asset/resource 将匹配到的语法对应的资源(如图片)，打包为一个文件，并在对应语法处替换为打包后的URL，(对应老版file-loader)
      - asset/inline 将匹配到的语法对应的资源转化为data URI(转化为base64字符串)，并将对应语法处资源替换(对应老版url-loader)
      - asset/source 导出资源的源代码(可以用于引入文本)(对应老版raw-loader)
      - asset 根据文件大小选择导出为data URI(base64字符串)或导出一个单独文件和对应打包或URL(相当于自动选择asset/inline、asset/resource)
      >阈值设置:Rule.parser.dataUrlCondition.maxSize
      - javascript/auto 使用老版file-loader/url-loader/raw-loader
      - json json类似的文件如toml、yaml，可以搭配Rule.parser.parse解析为js对象
    - Rule.parser
      - dataUrlCondition 用于asset资源模块设置打包成base64字符串的最大字节数
      - parse 当Rule.type为json时，提供自定义解析方法
    - Rule.generator
      - filename 静态资源生成的文件名，只在Rule.type为asset、asset/resource时工作
      - publicPath 静态资源生成的公共路径 ？？？
      - outputPath 静态资源生成的公共路径下的相对路径 ？？？
      - dataUrl 生成data URL的配置
        - encoding 编码方式
        - mimetype data URL的mimetype值
      - emit 布尔值，是否生成静态资源
    - Rule.enforce 指定loader的种类，可选值：pre、post,不指定为普通loader
    >loader的优先级：前置(pre)、普通(normal)、行内(inline)、后置(post)
    - Rule.mimetype 使rules 配置与 data 的 uri 进行匹配 ？
    - Rule.sideEffects 表明模块的哪一部份包含副作用 ？
    - Rule.scheme 匹配使用的 schema

    - Rule.layer ？？？
    - Rule.issuerLayer ？？？
    - Rule.resolve ？？？
      - fullySpecified
    - Rule.dependency: { not: ['url'] } 排除来自新 URL 处理的 asset ？
  - generator 配置所有生成器的选项(所有Rule.generator???)
  - parser 配置所有生成器的选项(所有Rule.parser???)
    - javascript ？？？
  - noParse 设置不需要解析(分析内部依赖)的模块
  - unsafeCache 缓存模块请求的解析？？？


- plugins字段：插件实例数组

- externals字段：外部资源加载，将一些import/from语法引入的包解析成其他形式
  可以为数组、对象、正则、函数类型，完整写法为数组类型，其他为简写
  数组的每一项可以为对象、正则、函数类型
  - 对象类型
    - 成员名为需要作为外部扩展的包名(在自身程序中使用的模块名)
    - 成员值可为字符串、字符串数组、对象、函数、正则形式
      - 字符串形式 
        - 单个字符串 会以全局变量下的对应名称的变量作为模块对象使用，适用html标签引入CDN
        ```js
        //会将程序中的import/from语法转化为引用全局变量中的jQuery
        jquery: 'jQuery'
        ```
        - 字符串(中间带空格) 前段代表要解析成的形式，后段代表解析成的实际包名
        ```js
        //将对应import引入语法转化为其他形式引入
        'fs-1': 'commonjs2 fs-2'
        import fs from 'fs-1';   ===  const fs = require('fs-2');
        ```
      - 字符串数组形式 转换为父子结构的require语法，第一项作为引入模块，后项作为成员
        ```js
        //将对应import引入语法转化为cjs形式引入
        subtract: ['./math', 'subtract']
        import sub from 'subtract';  === const sub = require('./math').subtract;
        ```
      - 对象形式，成员名表示对外部资源的访问方式，如root、commonjs、commonjs2、amd,成员值指定对应实际模块、资源名
        ```js
        //
        lodash: {
          commonjs: 'lodash',
          amd: 'lodash',
          root: '_', // 指向全局变量
        }
        ```
  - 正则类型 表示直接排除所有匹配正则的import/from引入包
  - 函数类型 复杂自定义处理，暂不研究 ？？？
- externalsType字段：枚举值,指定externals字段所转化的默认转化类型
  - script 可搭配externals字段对象类型、成员为数组形式来自动生成script标签引入CDN,
    ```js
    externalsType: 'script',
    externals: {
      packageName: 
      [
        //此时数组的第一项为CDN地址
        'http://example.com/script.js',
        //第二项为导出的全局变量
        'global',
        //第三项开始(不常用)为导出的其他方法
        'property',
        'property',
      ],
    },
    ```























- optimization字段:
  - runtimeChunk  生成运行时的chunk，用于处理多个入口中重复引用模块产生的副本问题，可选值:
    - single 所有chunk之间共享运行时chunk
    - true/multiple 为每一个入口添加一个运行时chunk
    - false (默认)每个入口chunk中直接嵌入runtime
    - 函数 自定义
  - splitChunks 代码拆分(分离包中的引用关系)，v4之前使用SplitChunksPlugin
    - chunks 选择进行优化chunk，可选值：
      - async 拆分异步引入(默认)
      - initial 拆分同步引入
      - all 拆分所有引入文件，包括同步异步引入
      - 函数 用于自定义需要拆分的chunk
    - name 输出代码块的名称
    - minSize 拆分后的最小字节数，小于此值不拆分
    - maxSize 拆分后的最大字节数，大于此值则拆分
    - maxAsyncSize 异步加载的chunk拆分后的最大字节数
    - maxInitialSize 同步加载的chunk拆分后的最大字节数
    >优先级：maxInitialRequest/maxAsyncRequests < maxSize < minSize
    - minChunks 最少被引用的次数
    - minSizeReduction 拆分导致减少拆分前主chunk的最小字节数，小于此值不拆分
    - minRemainingSize 拆分后主chunk剩余的最小字节数，小于此值不拆分
    - automaticNameDelimiter 指定默认命名的分隔符
    - maxInitialRequests 同步加载的最大并行请求数 ？？？
    - maxAsyncRequests 异步加载的最大并行请求数 ？？？
    - defaultSizeTypes 设置默认size单位
    - enforceSizeThreshold 强制拆分体积阈值(如果大于此值，则强制拆分)
    - hidePathInfo 由maxSize分割的部分创建名称时，阻止公开路径信息 ？？？
    - layer 按模块层将模块分配给缓存组 ？？？
    - usedExports ？？？
    - cacheGroups 配置代码拆分的缓存组，由缓存组对象组成，缓存组对象成员包括：
      - 继承了splitChunks的所有配置项
      - test 匹配的路径(需要拆分的文件、目录)
      - filename 输出代码块的名称(仅拆分同步代码可用，可以使用占位符)
      >和继承的name属性都可用，略有差别，都可用函数形式自定输出代码块的名称
      - priority 优先级，多个缓存组同时匹配时选择优先级高的
      - reuseExistingChunk 如果包含其他拆分模块则重用
      - type 按模块类型分组
      - enforce 忽略主配置中的一些选项，并始终为当前缓存组拆分代码
      - idHint 设置chunk的id





















  - moduleIds 设置模块ID的算法
  - chunkIds 设置chunkID的算法
  - sideEffects 配置是否摇掉package.json文件中sideEffects字段标记的有副作用的文件，treeshaking相关
  
  - providedExports ？？？
  - usedExports 只导出外部使用的内容，treeshaking相关   ？？？

  - mergeDuplicateChunks 合并含有相同模块的chunk
  - minimize 是否使用插件进行压缩
  - minimizer 压缩的插件数组

  - nodeEnv 设置process.env.NODE_ENV为一个给定字符串

  - concatenateModules 告知 webpack 去寻找模块图形中的片段，哪些是可以安全地被合并到单一模块中？？？
  - emitOnErrors 在编译时每当有错误时，就会发送静态资源？？？
  - flagIncludedChunks 确定和标记出作为其他 chunk 子集的那些 chunk？？？
  - innerGraph 是否对未使用的导出内容，实施内部图形分析？？？
  - mangleExports 控制导出处理？？？
  - mangleWasmImports 通过将导入修改为更短的字符串，来减少 WASM 大小？？？
  - portableRecords 生成带有相对路径的记录使得可以移动上下文目录？？？
  - realContentHash 在处理静态资源后添加额外的哈希编译，以获得正确的静态资源内容哈希？？？
  - removeAvailableModules如果模块已经包含在所有父级模块中，告知webpack从chunk 中检测出这些模块，或移除这些模块？？？
  - removeEmptyChunks 移除空的chunk









- resolve字段： 
  - roots 设置根目录
  - extensions 解析模块时默认添加的后缀名数组
  - extensionAlias 配置扩展名的别名
  - enforceExtension 是否强制使用扩展名
  - alias 配置import或require引入路径中的别名
  - plugins 应该使用的额外的解析插件列表？？？
  - preferRelative 布尔值，设置解析时首选的绝对路径为resolve.roots
  - preferAbsolute 布尔值，设置解析时首先判断为相对路径，然后再查找node_modules的模块
  - byDependency 通过module请求类型来配置 resolve 选项
  - fallback 正常解析失败时，重定向模块请求
  - mainFiles 解析目录时要使用的文件名
  - modules webpack解析模块时应该搜索的目录，默认为node_modules
  - unsafeCache 配置主动缓存的模块
  - cachePredicate 决定请求是否应该被缓存的函数
  - useSyncFileSystemCalls 对resolver使用同步文件系统调用
  - descriptionFiles 用于描述的JSON文件，默认为package.json
  - symlinks 布尔值，是否将符号链接解析到它们的符号链接位置？？？
  - restrictions 解析限制列表，用于限制可以解析请求的路径？？？
  - mainFields 字符串数组，导入npm包的模块时，使用package.json中的哪个字段导入模块(字符串数组中匹配的第一项)
  - exportsFields package.json中用于解析模块请求的字段，默认为exports
  - importsFields package.json中用于提供内部请求的字段？？？
  - aliasFields ？？？
  - cacheWithContext？？？
  - conditionNames ？？？

- resolveLoader字段：和resolve字段相同，但只用于解析webpack的loader包？？？

- performance字段:用于当打包的包大小超出限制后的警告
  - assetFilter 函数值，用于控制需要验证的文件
  - hints 字符串表示提示的等级，false表示关闭提示
  - maxAssetSize 单个资源的最大体积
  - maxEntrypoin 打包入口的最大体积



- node字段：配置是否为nodejs的几个全局变量添加垫片
  - global
  - __filename
  - __dirname

- cache字段 控制缓存
- stats字段 控制bundle信息输出





## 语法

1. 内联引入loader

  ```js
  import Styles from 'style-loader!css-loader?modules!./styles.css';
  import Styles from '!style-loader!css-loader?modules!./styles.css';
  import Styles from '!!style-loader!css-loader?modules!./styles.css';
  import Styles from '-!style-loader!css-loader?modules!./styles.css';
  ```
  `!`用于分隔多个loader,`?`用于传递query参数  

  内联引入可以通过添加前缀禁用配置文件中的loader：
  - `!` 前缀，将禁用所有已配置的普通loader
  - `!!` 前缀，将禁用所有已配置的preLoader,普通loader, postLoader
  - `-!` 前缀，将禁用所有已配置的preLoader和普通loader，但是不禁用postLoaders





动态引入import()

prefetch(预获取)：将来某些导航下可能需要的资源
import(/* webpackPrefetch: true */ './path/to/LoginModal.js');

preload(预加载)：当前导航下可能需要资源
import(/* webpackPreload: true */ 'ChartingLibrary');



用于查询浏览器使用率的网站网址：https://caniuse.com/usage-table





## 常用loader


1. style-loader
  把CSS(从css-loader导出的模块数组)插入到DOM中
  配置项options成员：
    - injectType 配置把样式文件插入到DOM中使用的方式(标签)
    - attributes 配置插入标签中的属性
    - insert 插入标签的位置
    - styleTagTransform 当将style标签插入到DOM中时，转换标签和css？？？
    - base 配合DLLPlugin使用，设置module ID？？？
    - esModule 是否使用ESM语法

   >可以替换为MiniCssExtractPlugin.loader，创建单独的css文件


2. css-loader
  对css文件中的@import和url()进行处理，导出存放处理后的样式字符串的数组 
  配置项options成员：
    - url	启用/禁用对url()/image-set()语法处理
    - import 启用/禁用对@import语法处理
    - modules 启用/禁用CSS模块及其详细配置()
    - sourceMap	启用/禁用生成 SourceMap
    - importLoaders 数字，设置@import规则引入的代码在css-loader前应用的前项loader数量
      >可以配合postcss-loader使用，因为postcss不会对引入文件的内容作处理
    - esModule 是否生成ES模块语法的js模块
    - exportType 控制导出样式为模块数组、字符串或者可构造样式，默认为模块数组，用于style-loader

  `/* webpackIgnore: true */`注释可以禁用css-loader对url()的解析

3. less-loader、sass-loader、stylus-loader

4. babel-loader
  需要的包：babel-loader、@babel/core、@babel/preset-env
  配置项options成员：
    - babel配置项中所有成员，会传给babel，一般使用presets、plugins
     >babel的配置可以放在这里，也可以写在配置文件中
    - cacheDirectory
    - cacheIdentifier
    - cacheCompression
    - customize


5. postcss-loader
  使用 PostCSS 处理 CSS，可以添加前缀处理兼容性问题，支持未来的css语法
  配置项options成员：
    - execute	在CSS-in-JS中启动PostCSS Parser支持
    - postcssOptions 设置 PostCSS 选项与插件
    - sourceMap 开启 / 关闭 source map 的生成
    - implementation 为 PostCSS 设置对应实现并使用
   >注意处理css时搭配importLoaders处理@import引入文件的样式
   >添加前缀处理兼容性问题需要配合browserlistrc文件和autoprefixer插件








## 常用插件

1. html-webpack-plugin  生成html文件
  `new HtmlWebpackPlugin(options)`
  options成员包括：
     - title 生成html文件的title标签值
     - filename 生成html文件的文件名
     - template 生成html文件所用的模板
     - ...还有很多，详细查看[官方文档](https://github.com/jantimon/html-webpack-plugin#options)


2. webpack.DefinePlugin 定义常量
  `new webpack.DefinePlugin({...})`
  对象中的键名为实际使用的常量名，键值为替换的常量值
  >注意值为字符串需要包裹两层引号

3. eslint-webpack-plugin  添加eslint检查
  `new ESLintPlugin(options)`
  options成员包括：
     - context 指定检测的根目录
     - extensions 指定检测的文件后缀
     - exclude 指定排除的文件或目录(默认node_modules)
     - files 指定检测文件或目录相对路径
     - fix 启用 ESLint 自动修复特性？
     - eslintPath ？
     - formatter 执行eslint后输出内容的格式，官网有预定义
     - lintDirtyModulesOnly 只对内容修改了的文件进行 lint，启动时跳过 lint ？
     - threads 以线程池方式运行 lint ？


4. mini-css-extract-plugin  提取CSS为单独文件
  `new MiniCssExtractPlugin(options)`
  options成员包括：
    - filename 输出CSS文件的名字
    - chunkFilename 非入口的chunk文件名称
    - ignoreOrder 移除order警告
    - insert 用于自定义提取的CSS文件在html文档的插入标签和方式(默认为添加link标签)
    - attributes 定义添加在文件中的link标签的属性和值
    - linkType 定义添加在文件中的link标签type属性值
    - runtime 开启和禁用runtime生成
    - experimentalUseImportModule
  需要使用MiniCssExtractPlugin.loader代替style-loader  

5. TerserWebpackPlugin 压缩js文件
   ```js
   module.exports = {
     optimization: {
       minimize: true,
       minimizer: [new TerserPlugin(options)],
     },
   }
   ```
   >要放在optimization.minimizer中
   options成员:
      - test 用来匹配需要压缩的文件
      - include 匹配参与压缩的文件
      - exclude 匹配不需要压缩的文件
      - parallel 使用多进程并发运行以提高构建速度
      - minify 自定义压缩函数
      - terserOptions Terser的压缩配置选项，详细查文档
      - extractComments 注释是否需要提取到一个单独的文件中

6. CssMinimizerWebpackPlugin 使用cssnano优化和压缩CSS
   ```js
   module.exports = {
     optimization: {
       minimize: true,
       minimizer: [new CssMinimizerPlugin(options)],
     },
   };
   ```
   >要放在optimization.minimizer中
   options成员:
    - test 匹配要处理的文件
    - include 要引入的文件
    - exclude 要排除的文件
    - parallel 启用/禁用多进程并行处理 
    - minify 自定义压缩函数
    - minimizerOptions Cssnano优化配置项
    - warningsFilter 允许过滤掉css-minimizer的警告？？？



7. copy-webpack-plugin 复制静态文件
   `new CopyPlugin(options)`
   options成员包括：
     - patterns	对象数组，每个对象用于控制复制的出入口，成员有：
       - from	复制的入口路径(可以是字符串或者正则)
       - to 复制的出口路径
       - globOptions
         - ignore 忽略的文件数组(可以是字符串或者正则)，可以用于忽略`html-webpack-plugin`处理的html模板
         - ....
       - context 
       - filter	
       - toType	
       - force	
       - priority 
       - transform
       - transformAll
       - noErrorOnMissing	
       - info
     - options
       - concurrency




8. webpack-bundle-analyzer  plugin 和 CLI 工具，将bundle内容展示为树状图
   同类插件:
    - webpack-chart: webpack stats 可交互饼图
    - webpack-visualizer: 可视化并分析你的 bundle，检查哪些模块占用空间，哪些可能是重复使用的
    - webpack bundle optimize helper：这个工具会分析你的 bundle，并提供可操作的改进措施，以减少 bundle 的大小
    - bundle-stats：生成一个 bundle 报告（bundle 大小、资源、模块），并比较不同构建之间的结果




9.  ModuleFederationPlugin 模块联邦，调用其他线上项目上的某些模块
    ```js
    //webpack.config.js
    const { ModuleFederationPlugin } = require('webpack').container;
    module.exports = {
      plugins: [
        new ModuleFederationPlugin({
          //options
          runtime: 'my-runtime-name',
        }),
      ],
    };
    ```
    options成员包括：？？？
    - name 此模块联邦项目使用的入口，需要和entry字段下的entryChunkName匹配
    - remotes 需要共享的其他项目的模块描述
    - runtime 为创建的运行时的chunk命名(供其他模块联邦项目调用)
    - exposes 共享到其他项目上的模块描述，可以是字符串，数组，对象形式
    - shared 和其他项目共享的公共模块(如lodash)的模块描述，可以是字符串，数组，对象形式
    - ...

10. webpack.IgnorePlugin 可以阻止模块的生成(import或者require的模块)，可以用于国际化的内容忽略语言包 ？？？  
    ```js
    //正则方式
    new webpack.IgnorePlugin({ resourceRegExp, contextRegExp })
    //过滤器方式
    new webpack.IgnorePlugin({
      checkResource(resource) {
        // do something with resource
        return true | false;
      },
    });
    ```
    resourceRegExp为需要引入的模块的正则
    contextRegExp为引入模块的文件的正则

11. webpack.DllPlugin、webpack.DllReferencePlugin 
   ```js
   new webpack.DllPlugin(options)
   new webpack.DllReferencePlugin(options)
   ```

12. webpack.BannerPlugin 为每个chunk文件头部添加banner  
    ```js
    new webpack.BannerPlugin(options)
    ```
    options成员包括：
     - banner: string | function // 其值为字符串或函数，将作为注释存在
     - raw: boolean // 如果值为 true，将直接输出，不会被作为注释
     - entryOnly: boolean // 如果值为 true，将只在入口 chunks 文件中添加
     - test: string | RegExp | [string, RegExp] // 包含所有匹配的模块
     - include: string | RegExp | [string, RegExp] // 根据条件匹配所有模块
     - exclude: string | RegExp | [string, RegExp] // 根据条件排除所有模块
     - footer: boolean // 如果值为 true，banner 将会位于编译结果的最下方





## 自定义loader相关
loader的本质为一个函数，参数为content,map,meta,对内容进行处理后通过callback或者返回值返回转换后的值

1. 四种类型：

  - 同步
    可以通过`return newContent`或者`this.callback(newContent)`返回转换后的值

  - 异步
    通过this.async(err,newContent,map,meta)返回转换后的值

  - Raw
    要将`module.exports.raw`属性设置为true
    会将内容转化为utf-8字符串(String或者Buffer类型)传给loader
    
  - pitching
    module.exports.pitch函数，作为loader会从左到右执行(和正常loader相反)
    pitch方法返回值则会跳过后面的loader的进程，直接回头执行正常阶段

2. loader中的上下文方法
  - this.addContextDependency
  - this.addDependency
  - this.addMissingDependency
  - this.async
  - this.cacheable
  - this.callback
  - this.clearDependencies
  - this.context
  - this.data
  - this.emitError
  - this.emitFile
  - this.emitWarning
  - this.fs
  - this.getOptions(schema)
  - this.getResolve
  - this.hot
  - this.importModule
  - this.loaderIndex
  - this.loadModule
  - this.loaders
  - this.mode
  - this.query
  - this.request
  - this.resolve
  - this.resource
  - this.resourcePath
  - this.resourceQuery
  - this.rootContext
  - this.sourceMap
  - this.target
  - this.utils
  - this.version
  - this.webpack

## 自定义插件相关


1. 插件
   插件的本质就是带有apply(compiler)方法的类
   在apply(compiler)方法中定义对应钩子，用于在不同的生命周期对compiler和compilation对象进行改变
   >`apply(compiler)`的调用在webpack.js文件的createCompiler方法中，enviroment钩子调用之前

2. compiler.hooks下的钩子
   >compiler对象为编译器对象，从运行到结束只会创建一次
   - environment 
   - afterEnvironment 
   - entryOption 
   - afterPlugins
   - afterResolvers
   - initialize
   - beforeRun
   - run
   - watchRun
   - normalModuleFactory
   - contextModuleFactory
   - beforeCompile
   - compile
   - thisCompilation
   - compilation
   - make 
   - afterCompile 
   - shouldEmit
   - emit
   - afterEmit
   - assetEmitted
   - done
   - additionalPass
   - failed


3. compilation.hooks下的钩子
   >compilation对象为编译对象，每一次编译都会生成
   - buildModule
   - rebuildModule
   - failedModule
   - succeedModule
   - finishModules
   - finishRebuildingModule
   - seal
   - unseal
   - optimizeDependencies
   - afterOptimizeDependencies
   - optimize
   - optimizeModules
   - afterOptimizeModules
   - optimizeChunks
   - afterOptimizeChunks
   - optimizeTree
   - afterOptimizeTree
   - optimizeChunkModules
   - afterOptimizeChunkModules
   - shouldRecord
   - reviveModules
   - beforeModuleIds
   - moduleIds
   - optimizeModuleIds
   - afterOptimizeModuleIds
   - reviveChunks
   - beforeChunkIds
   - chunkIds
   - optimizeChunkIds
   - afterOptimizeChunkIds
   - recordModules
   - recordChunks
   - beforeModuleHash
   - afterModuleHash
   - beforeHash
   - afterHash
   - recordHash
   - record
   - beforeModuleAssets
   - additionalChunkAssets
   - shouldGenerateChunkAssets
   - beforeChunkAssets
   - additionalAssets
   - optimizeChunkAssets
   - afterOptimizeChunkAssets
   - optimizeAssets
   - afterOptimizeAssets
   - processAssets
   - afterProcessAssets
   - needAdditionalSeal
   - afterSeal
   - chunkHash
   - moduleAsset
   - chunkAsset
   - assetPath
   - needAdditionalPass
   - childCompiler
   - normalModuleLoader



4. compilation下的主要属性：
   - modules Set类型，一般代表一个文件
   - chunks Set类型，多个chunk组成的对象，每个chunk为多个有依赖关系的module组成的代码块
   - assets 记录了本次打包生成所有文件的结果
   >现在可以用一系列API替代直接操作 moduels/chunks/assets等属性，来影响打包输出结果，详细查文档



5. logger 可以通过logger API操作打包中生成日志


## 源码阅读

1. 从入口开始阅读：
   - node_modules/webpack/bin/webpack.js   
     - 判断是否安装cli工具，最后调用runCli()函数  
     - 引入node_modules/webpack-cli/bin/cli.js
   - node_modules/webpack-cli/bin/cli.js
     - 优先使用本地安装的cli工具
     - 调用从bootstrap.js引入的runCLI()函数
   - node_modules/webpack-cli/lib/bootstrap.js
     - runCLI()函数实例化WebpackCLI类(webpack-cli.js中定义)
     - 调用实例的run()函数
   - node_modules/webpack-cli/lib/webpack-cli.js
     - WebpackCLI类
     - 构造函数在实例对象的this下挂载colors、logger、program成员，用于命令行操作和输出
       >其中成员program从commander库中引入，用于处理命令行中的参数
     - run()函数对命令进行处理，run()函数下的loadCommandByName()函数执行命令，并在this下挂载webpack()函数(引入webpack包)，并执行实例下runWebpack()函数
     - runWebpack()函数调用实例下的createCompiler()函数创建compiler对象
     - createCompiler()函数通过调用this对象下挂载的webpack()函数并传入参数生成compiler对象并返回
     - webpack()导入webpack模块的入口文件
   - node_modules/webpack/lib/index.js
     - 引入node_modules/webpack/lib/webpack.js包装并合并导出各类插件...
   - node_modules/webpack/lib/webpack.js
     - 定义webpack()函数，返回compiler对象
     - compiler对象通过createCompiler()、createMultiCompiler()方法创建(createMultiCompiler()内部也遍历调用createCompiler()方法)
     - createCompiler()、createMultiCompiler()方法中调用Compiler.js或MultiCompiler.js文件中的Compiler类或MultiCompiler类实例化
     - createCompiler()中
       - Compiler类实例化
        - Compiler类实例化定义各种钩子函数和成员
       - 遍历挂载配置项中的所有插件
       - 然后调用默认的配置并触发`environment`、`afterEnvironment`钩子
       - 然后实例化WebpackOptionsApply类并调用process()方法
         - process()方法作用为将所有配置项转化为插件并挂载(调用插件的apply方法)到compiler对象上
         - process()方法中途会调用的钩子`entryOption`、`afterPlugins`、`afterResolvers`
       - 触发`initialize`钩子
       - 最后返回compiler对象
     - 实例化compiler对象判断是否为监控模式并调用watch()方法监控
       - watch()方法中实例化Watching类并进入监控模式并调用`watchRun`钩子？？？
     - 实例化compiler对象调用run()方法
       - run()方法为真正编译的过程
         - run()方法下的同名的run()方法为核心逻辑,流程包括
           - 触发`beforeRun`、`run`钩子
           - 调用readRecords()函数触发`readRecords`钩子
           - 调用compile()函数
             - compile()函数中首先创建compilation的参数，触发`normalModuleFactory`、`contextModuleFactory`钩子
             - 触发`beforeCompile`、`compile`钩子
             - 调用newCompilation创建compilation对象，由Compilation类实例化，并且创建完成后触发`thisCompilation`、`compilation`钩子
             - 在打包流程依次触发`make`、`finishMake`、`afterCompile`钩子
             - afterCompile钩子触发之后调用传入compile的回调，也就是run()方法下的onCompiled()函数
         - onCompiled()流程包括
           - 触发shouldEmit钩子，并判断完成编译，如果完成，触发`done`钩子
           - 调用emitAssets()函数
             - emitAssets()函数中控制文件输出，并依照流程触发`emit`、`assetEmitted`、`afterEmit`钩子
             >其中的forEachLimit方法来自neo-async库，用于控制并发的异步流程，源码中并发数为15
           - 判断是否满足额外条件，如果需要，触发`needAdditionalPass`、`done`、`additionalPass`钩子并再调用compile()函数
           - 发出报告并触发`emitRecords`和`done`钩子,编译结束
 



2. compilation流程：
   从compile()函数开始：
   - compile()函数中创建compilation的两个工厂函数参数之后，触发`beforeCompile`、`compile`钩子之后，创建compilation对象
     - Compilation类实例化初始化一系列钩子函数和编译需要的选项方法
   - compilation对象创建完成后触发`make`钩子
   - 此时内置的几种Entryplugin，会调用compilation.addEntry()方法
     - addEntry()方法调用内部_addEntryItem()方法
       - _addEntryItem()方法中触发`addEntry`钩子
       >compilation下的entry相关钩子在v6后会被移除
       - 调用addModuleTree()方法
         - addModuleTree()方法中调用handleModuleCreation()方法
           - handleModuleCreation()方法中调用factorizeModule()方法
             - factorizeModule()方法中调用factorizeQueue.add()
             - 成功后执行回调，回调中调用addModule()方法调用addModuleQueue.add()方法并执行回调
               - 回调中调用_handleModuleBuildAndDependencies()方法
                 - _handleModuleBuildAndDependencies()方法下调用buildModule()方法并执行回调，回调中处理依赖，结束后调用addModuleTree()层层传递下来的回调，触发`succeedEntry`或`failedEntry`钩子
                 - buildModule()方法会向buildQueue里添加项，而buildQueue创建时向AsyncQueue类提供的_buildModule()函数为实现创建模块的主要逻辑
                   - _buildModule()函数执行逻辑，调用module.needBuild()方法(此处方法的实现可以在NormalModule.js文件中查找)判断是否需要创建，然后触发`buildModule`钩子，然后调用module.build()方法，方法返回_doBuild()函数，函数中runLoaders()方法为处理loader的逻辑
 

3. 





















