



1. ts模块解析时相对路径不会走.d.ts的外部模块定义
2. webpack打包，vue-loader编译vue3的sfc时如果script的lang属性为ts会编译成ts，还需要转化为js，可以用两种方法，如果使用babel-loader编译ts，则在babel配置中overrides字段配置使用@babel/plugin-transform-typescript插件转化.vue文件，如果使用ts-loader，则配置appendTsSuffixTo字段以编译.vue文件中的ts
3. webpack打包,sass中引入字体图标文件时，如果文件没有放在单独的文件夹下会解析出错，估计是css-loader解析url()模块的问题









