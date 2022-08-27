# ESlint Learning


## `.eslintrc.js`文件配置(也可以在package.json文件里的eslintConfig字段指定配置)


- parserOptions
  - ecmaVersion ES版本(只引入es语法不引入全局变量和类型，要引入通过env字段引入)
  - sourceType 可选值：script(默认)、module（如果你的代码是 ECMAScript模块)
  - ecmaFeatures 额外的语言特性
    - globalReturn 允许全局作用域下使用 return 语句
    - impliedStrict 启用全局严格模式
    - jsx 启用jsx
    - experimentalObjectRestSpread 实验性属性

- parser 选择解析器，可选值：Esprima(默认)、Babel-ESLint、@typescript-eslint/parser
- processor 配置处理器，处理器可以由插件提供
- plugins 配置插件，可省略前缀`eslint-plugin-`
- env 配置不同环境的全局变量
- globals 配置一些自定义的全局变量，值为off表示禁用
- overrides 用于为特定类型的文件指定处理器

- rules 成员为规则
  规则值的数组第一个项为规则的等级
  - 0或off 关闭规则
  - 1或warn 警告级别(不会导致程序退出)
  - 2或error 错误级别

- extends 扩展一些预设
  eslint:recommended 启用官方推荐启用的规则
  eslint:all 启用所有规则





## .eslintignore文件可以指定忽略检测的路径