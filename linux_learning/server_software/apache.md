# Apache http server

## yum安装

配置目录：

/etc/httpd
├── conf                            主配置
│   ├── httpd.conf
│   └── magic
├── conf.d                          自定义配置
│   ├── autoindex.conf
│   ├── README
│   ├── userdir.conf
│   └── welcome.conf
├── conf.modules.d                  模块配置
│   ├── 00-base.conf
│   ├── 00-dav.conf
│   ├── 00-lua.conf
│   ├── 00-mpm.conf                 Multi-Processing Module,配置三种工作模式
│   ├── 00-proxy.conf
│   ├── 00-systemd.conf
│   └── 01-cgi.conf
├── logs -> ../../var/log/httpd
├── modules -> ../../usr/lib64/httpd/modules
└── run -> /run/httpd


配置项： 

容器：

<VirtualHost></VirtualHost>

<Location></Location>
<LocationMatch></LocationMatch>

<Directory></Directory>
<DirectoryMatch></DirectoryMatch>

<Files></Files> 
<FileMatchs></FileMatchs>


Match后缀可以用扩展的正则(和prel一致)

容器从上到下有主从关系










访问控制容器：
RequireAll
RequireAny
RequireNone


容器内容指令：

- Options
  - Indexes     列出目录
  - FollowSymLinks      显示目录中的软连接


- AllowOveride          对服务目录下的 .htaccess 文件中的配置生效进行限定
  - options=Indexes,FollowSymLinks

- Require all [granted/denied]          全部允许或拒绝
- Require [not] ip [ip]                 限定ip
- Require [not] host [hostname]         限定主机
  - hostname可以是

- LogFormat format nickname                定义日志格式别名
- CustomLog dir format|nickname            在文件内存放每次请求的日志


- SetHandler 
  - server-status           将对应路径设置为状态页
- ExtendedStatus [On|Off]   状态页展示详细访问信息


- TraceEnable              设置是否允许 TRACE 请求方法

- ServerName        ip端口都相同的情况下，通过http请求头中的Host字段匹配
- DocumentRoot


## 源码包













