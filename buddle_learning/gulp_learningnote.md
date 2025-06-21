

## 配置文件

gulp默认会寻找根目录下的gulpfile.js文件



配置文件中导出的函数都是对应函数名的公开任务(gulp@4后的语法)
公开任务：可以被gulp脚本执行
私有任务：只能用在gulpfile.js文件中的series()、parallel()函数
公开任务名为default则为默认任务，即执行gulp脚本不带参数时执行的任务
```js
module.exports.default = defaultFunc
module.exports.someTask = publicFunc
```



## gulp对象上的API


task() 创建一个公开任务

src() 获取文件对象生成流
dest() 生成文件

series() 顺序执行任务队列
parallel() 以最大并发量同步执行任务队列

watch() 监控文件时间



symlink()
lastRun()
registry()
tree()

Vinyl
Vinyl.isVinyl()
Vinyl.isCustomProp()




## 常用插件

1. gulp-cssmin 压缩css
2. gulp-autoprefixer 添加兼容浏览器的css前缀
3. gulp-sass 转化sass，下载此包时安装node-sass可能会失败，需要特别配置
4. gulp-uglify 压缩js
5. gulp-babel 使用babel转化js语法
6. gulp-htmlmin 压缩html，注意要配置参数才会压缩
7. gulp-imagemin 无损压缩图片，最高7级压缩
8. del 删除文件目录
9. gulp-webserver 创建一个服务器
10. gulp-file-include 用于在html中引入html片段
11. gulp-load-plugins 加载其他gulp插件
12. gulp-concat
13. gulp-clean-css
14. gulp-livereload
15. gulp-rename


## 自写插件

插件本质为转换流

可以通过 through2 创建转换流(源码也是通过此库创建转换流)




## gulp源码理解


gulp主要有三个核心包： undertaker 、 vinyl-fs 、 glob-watcher



undertaker主要包括：任务注册的函数task、任务执行流程的函数series、parallel

vinyl-fs主要包括：文件系统操作src、dest,vinyl对象就是虚拟化的文件

glob-watcher主要包括：路径规则处理
