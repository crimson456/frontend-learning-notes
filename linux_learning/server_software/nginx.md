# nginx


## 配置文件

配置文件一般在：???
>每次修改配置文件后需要重新加载才能生效



```

##################################

# 主作用域下的配置


# 是否会启动worker进程
master_process on | off;
# 启动的worker进程数
worker_processes  1; 
# 指定创建worker进程的用户
user user [group];
# 进程编号(pid)文件位置
pid file;
# 是否开启守护进程模式
# 非守护进程模式会阻塞终端，且在终端关闭后会终止
daemon on | off;

# 让worker进程绑定cpu，对应worker进程只能在指定cpu上运行
# cpumask为单个worker进程对应的cpu掩码(多少个worker进程就要配置多少项)
# 掩码位数对应cpu个数，表示要使用哪几个cpu
worker_cpu_affinity cpumask ...;
# 工作进程的优先级
worker_priority number;
# 限制工作目录下的core文件大小
worker_rlimit_core size;
# 所有工作进程可以打开的文件数量上限
worker_rlimit_nofile number;
# 工作进程正常关闭的超时时间，超出超时时间则强制退出
worker_shutdown_timeout time;
# 工作进程的工作目录
working_directory directory;

# 动态引入模块，需要放在最上方
load_module file;
# 引入其他配置文件
include file | mask;
# 错误日志文件位置和日志等级，包括debug, info, notice, warn, error, crit, alert, emerg
error_log file [level];

# accept_mutex 指令的互斥锁在某些没有使用原子操作系统上使用的文件前缀
lock_file file;

# 定义一个线程池的名字，线程数，以及所有线程被占用时等待的队列长度
# 定义的线程池可以在aio指令中使用
thread_pool name threads=number [max_queue=number];

# just-in-time compilation (PCRE JIT)
# 即时编译正则，在配置阶段对已知正则进行编译
pcre_jit on | off;

# 硬件ssl加速器
ssl_engine device;
# 定时器精度
timer_resolution interval;

# 调试相关，nginx调用ngx_debug_point()函数时nginx进程进入暂停还是启用
debug_points abort | stop;

# 用于保留一些父进程的环境变量或创建新的环境变量
env variable[=value];


##################################

events {

    # 每个worker进程的并发连接数(包括和客户端、代理)
    # 理论上越大越好，但不超过操作系统的最大打开文件数限制
    worker_connections  1024; 
    # 是否开启(mutually exclusive)互斥锁
    # 当开启多个工作进程时，一个连接会同时唤醒多个进程竞争处理，请求少时浪费资源
    # 开启互斥锁后会依次唤醒进程
    accept_mutex on | off;
    # 获取互斥锁的延迟时间
    # 同一时间只有一个工作进程可以获取互斥锁，如果没有获取到则需延迟后重新获取
    accept_mutex_delay 500ms;
    # 连接进程的方法
    use method;
    # 一个工作进程是否可以同时接收多个请求
    multi_accept on | off;
    # aio配合epoll连接处理方式时，设置单个工作进程未完成的的异步io操作最大数量
    worker_aio_requests number;

    # 对特定客户端启用debug调试日志，其他客户端仍使用error_log指令指定的日志等级
    debug_connection address | CIDR | unix:;
}

http {

    ##################################

    # mime-type 相关

    # include引入其他配置文件
    include mime.types; 

    # 默认使用的MIME类型，默认值为text/plain
    default_type application/octet-stream; 

    # 自定义MIME类型
    types { ... }

    ##################################

    # Nginx使用散列表来存储媒体类型、域名和变量，用于快速寻找
    # 哈希表的最大大小
    types_hash_max_size
    # 每个哈希桶占用的内存大小(哈希表下有多个桶)
    types_hash_bucket_size
    server_names_hash_bucket_size size;
    server_names_hash_max_size size;
    variables_hash_bucket_size size;
    variables_hash_max_size size;

    ##################################

    # 日志

    # 访问日志的地址和格式
    # format 日志格式名
    # buffer 写入磁盘前的缓冲大小
    # gzip 压缩等级
    # flush 缓冲积累的最长时间
    # if 表示条件值为0不记录日志
    access_log path [format [buffer=size] [gzip[=level]] [flush=time] [if=condition]];
    # 日志格式定义
    # escape 日志的输出格式
    log_format name [escape=default|json|none] string ...;
    # 定义用于存储打开日志文件的文件描述符的缓存
    open_log_file_cache max=N [inactive=time] [min_uses=N] [valid=time];

    # 是否将子请求记录到访问日志中
    log_subrequest on | off;
    # 是否将not_found记录到错误日志中
    log_not_found on | off;

    ##################################

    # sendfile()函数调用

    # nginx在发送文件时，是将文件读入软件后发送还是让网络接口直接从磁盘读取
    sendfile on; 
    # 调用单个sendfile()函数传输的数据大小
    sendfile_max_chunk size;

    ##################################

    # 在某版本后可同时配置，建议同时打开
    # 发送tcp报文时缓存内容到缓冲区，存满后发送
    tcp_nopush on | off;
    # 发送tcp报文时即时发送
    tcp_nodelay on | off;

    # 用于设置Nginx延迟传输数据的阈值，刚好对应TCP协议的MSS大小，如果值为零，Nginx会立即发送数据，否则只有当待发送数据累积到该值时，Nginx才会传输数据。
    postpone_output size;

    ##################################

    # 准备发送数据(两次写操作)的超时时间(超时后返回408)，默认为60s
    send_timeout 60s;

    # 设置向上游服务器发送请求的http协议版本，默认1.0
    # 要和向上游服务器建立长连接需要1.1以上
    proxy_http_version 1.1;

    # 设置发向上游服务器请求的请求头和请求体
    # 可以定义在http、server、location作用域中，且作用域内没有任何定义才从上级继承
    # 默认值为：
    # proxy_set_header Host $proxy_host;
    # proxy_set_header Connection close;
    # 所以配置上游服务器长连接时需要将默认值修改
    proxy_set_header field value;
    proxy_set_body value;

    ##################################

    # 和客户端keepalive连接的配置

    # 长连接超时时间(每次复用连接会重新计时)，设为0表示禁用keepalive，默认为75s
    keepalive_timeout 75s; 
    
    # 长连接最长时间，默认为1h
    keepalive_time 1h;
    
    # 长连接最多复用次数
    keepalive_requests 1000;
    
    # 长连接禁用的浏览器客户端
    keepalive_disable msie6;



    ##################################

    # 配置内容缓存

    # 上游服务器响应的磁盘缓存地址,选项：
    # levels        表示目录层级,层级目录名取自散列值倒数几位
    # keys_zone     指定一个共享内存空间名和大小，所有活动的键和缓存数据相关信息会放入其中，用于快速判断request是否命中缓存(相当于索引表)，1m可存储8000个key
    # inactive      表示缓存的删除时间
    # max_size      表示硬盘中缓存空间的大小，超出则删除最少使用的缓存
    # use_temp_path 为off时表示缓存文件直接写到cache中而不使用temp_path，避免文件拷贝导致影响性能
    # purger=on|off 是否开启删除缓存的轮询(批量删除缓存的情况)
    # purger_files=number 轮询时单次扫描的条数
    # purger_threshold=number 轮询的持续时长
    # purger_sleep=number 轮询的间隔
    proxy_cache_path /home/apps/nginx/cache levels=1:2 keys_zone=ngxcache:100m inactive=7d max_size=1g use_temp_path=off;





    ##################################

    # 并发控制
    # 设置处理单个用户请求的速率及使用的共享内存区域
    # key 区分不同用户的关键字，一般为$binary_remote_addr根据IP区分
    # zone 共享内存空间名和大小
    # rate 漏桶处理请求的速度，单位可以是r/s、r/m
    limit_req_zone $binary_remote_addr zone=one:10m rate=1r/s;


    # 设置单个用户请求的最大连接保持数及使用的共享内存区域
    # key 区分不同用户的关键字，设为$binary_remote_addr可根据IP区分，设为$server_name可表示单个虚拟主机可以保持的连接数，设为常量可以限制整个系统的最大连接数
    # zone 共享内存空间
    limit_conn_zone key zone=name:size;


    ##################################

    # 根据第一个参数的值映射到自定义变量上
    map string $variable { 
        # 默认映射值
        default       0;
        # 引入文件
        include file;
        # 表明变量不能被缓存
        volatile;
        # 表示可以通过前缀和后缀域名映射
        hostnames;
        example.com   1;
        *.example.com 1;
        example.org   2;
    }
    map_hash_bucket_size size;
    map_hash_max_size size;

    ##################################


    # upstream定义一组上游服务器，可配置不同server的跳转策略实现负载均衡
    # 可以用在proxy_pass中
    # 此处命名会用在发送到上游服务器的请求头中host字段
    upstream httpds {

        # server定义要代理到的服务器
        server 192.168.44.103 ;

        # weight表示权重,默认为1
        # backup表示其他服务都停止时启用
        # down表示停用
        server 192.168.44.102 weight=1;
        server 192.168.44.102 backup;
        server 192.168.44.102 down;




        # 负载均衡的策略配置



轮询（Round Robin）：适用于请求处理时间相对均匀的场景，能够实现简单的请求分配。
加权轮询（Weighted Round Robin）：适用于不同后端服务器性能不同的场景，可以根据服务器的性能设置不同的权重，使得性能较好的服务器能够处理更多的请求。
最少连接（Least Connections）：适用于请求处理时间不均匀的场景，能够将请求分配给当前连接数最少的服务器，以实现负载均衡。
IP哈希（IP Hash）：适用于需要保持会话一致性的场景，将同一IP的请求分配给同一台服务器，可以确保会话状态的一致性。
最短响应时间（Least Response Time）：适用于需要快速响应的场景，能够将请求分配给响应时间最短的服务器，以提高用户体验。











        # 根据访问者的ip得到的散列算法结果匹配服务器
        ip_hash;

        # hash配置项根据后续的变量得到的散列算法结果匹配服务器
        # 根据访问者的请求id得到的散列算法结果匹配服务器
        hash $request_uri;

        # 根据访问者的cookie中的jsessionid字段得到的散列算法结果匹配服务器
        hash $cookie_jsessionid;

        # 
        sticky;





        # 和上游服务器的keepalive长连接配置
        # 还需要在server域中修改http版本和请求头

        # 每个线程和上游服务器保持的最大长连接数
        keepalive 32;

        # 长连接超时时间(每次复用连接会重新计时)，设为0表示禁用keepalive，默认为60s
        keepalive_timeout 75s; 
    
        # 长连接最长时间，默认为1h
        keepalive_time 1h;
    
        # 长连接最多复用次数
        keepalive_requests 1000;

    }


    # 自定义变量存储不同ip映射的值
    # $address ip地址来源，默认为$remote_addr
    # $variable 自定义的变量名，存放ip映射的值
    geo [$address] $variable { 
        # 变量默认值，未匹配到对应ip时的值
        default        ZZ;
        # 引入
        include        conf/geo.conf;
        # 删除特定ip
        delete         127.0.0.0/16;
        proxy          192.168.100.0/24;
        proxy_recursive
        ranges;
        127.0.0.0/24   US;
        127.0.0.1/32   RU;
        10.1.0.0/16    RU;
        192.168.1.0/24 UK;
    }



	
	# 虚拟服务器，可以定义多个
    server {

        # 监听的IP和端口
        # 注意主机可以多网卡，网卡可以多IP，IP可以多域名
        # default_server 多个服务器同时监听相同ip和端口时，默认使用的服务器
        listen 80 default_server;
        # https的配置
        listen 443 ss1;
        ss1_certificate  xxx.pem; #这里是证书路径
        ss1_certificate_key  xxx.key  #这里是私钥路径


        # 匹配域名(端口相同时后才对比域名)
        server_name  localhost; 

        # 如果要和向上游服务器建立长连接需要添加此配置
        proxy_http_version 1.1;
        proxy_set_header Connection '';

        # 添加客户端id到请求头给上游服务器使用
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;


        ##################################

        # 访问ip控制
        allow address | CIDR | unix: | all;
        deny address | CIDR | unix: | all;
        

        ####

        # 对客户端进行 Basic方式 认证
        # 客户端未认证时，登录框会显示信息，发送响应时会放在WWW-Authenticate响应头头的realm字段中
        auth_basic "closed site";
        # 认证时使用的用户名密码文件(htpasswd文件)的路径，可以用apache的htpasswd工具生成
        auth_basic_user_file conf/htpasswd;


        ####
        # jwt认证




        ####

        # 设置延时处理未经授权的请求，用于防止定时攻击
        # 定时攻击：利用密码的时间特性不断改变每一位密码最后获取真实密码的每一位
        auth_delay time;

        ####

        # ip访问限制和多种认证方式同时存在时，需要满足所有还是只满足一项即可通过
        satisfy all | any;


        ##################################

        # 根据子请求(另外指定的一个请求)的状态码进行认证
        # 如果子请求返回2xx则认证成功
        auth_request uri | off;
        # 认证完成后，将请求变量设置为给定值
        auth_request_set $variable value;

        ##################################

        # 在响应体之前、之后添加子请求的内容
        add_before_body /before_action;
        add_after_body /after_action;
        # 子请求的内容的媒体类型
        addition_types mime-type ...;

        ##################################

        # 根据请求头User-Agent字段中的值给变量$modern_browser、$ancient_browser、$msie赋值
        ancient_browser string ...;
        ancient_browser_value string;
        modern_browser browser version;
        modern_browser_value string;

        ##################################

        # 是否禁用传输编码中的分块传输
        chunked_transfer_encoding on | off;

        ##################################
        
        # 是否合并url中的响铃的两个斜线'/'
        merge_slashes on | off; 
        
        ##################################
        ##################################


        # 客户端请求体最大大小，默认1m，超过返回413 request Entity Too Large
        # 设置为0则不检测
        client_max_body_size 1000M;

        # 与客户端连接后发送请求头、体的超时时间，超时返回408 Request Timed Out
        client_header_timeout time;
        client_body_timeout time;



        ##################################

        # 读取客户端请求缓冲相关

        # 收到客户端请求后是否对请求体进行缓冲
        # 如果开启，则将请求体读入缓冲，并同时进行发送请求到上游服务器
        # 如果关闭，则将所有请求体读取完成后才发送请求到上游服务器
        proxy_request_buffering on;

        # 客户端请求头体缓冲大小
        # 如果请求头过大，会存入large_client_header_buffers定义的空间
        client_header_buffer_size size;
        # 定义过大的请求头使用的缓冲区数量和大小
        # 如果请求行(头部第一行)超过单个缓冲区大小，返回414 Request-URI Too Large
        # 如果请求头超过单个缓冲区大小，返回400 Bad Request
        large_client_header_buffers number size;

        # 客户端请求体缓冲大小
        client_body_buffer_size size;
        # 客户端请求体缓冲磁盘临时文件路径和层级
        client_body_temp_path path [level1 [level2 [level3]]];

        # 是否将客户端请求体写入磁盘文件且不删除，调试使用
        client_body_in_file_only on;
        # 缓冲客户端请求体时是否在内存中使用连续单一缓冲区
        # 在二次开发时使用`$request_body`读取数据时性能会有所提高
        client_body_in_single_buffer on;


        ##################################



        # 与上游服务器建立连接的超时时间
        proxy_connect_timeout time;
        # 从上游服务器响应两次读操作的超时时间，超时返回 504 Gateway Time-out
        proxy_read_timeout time;
        # 向上游服务器响应两次写操作的超时时间
        proxy_send_timeout time;


        ##################################


        # 上游服务器发回数据缓冲相关

        # 读取上游服务器响应的第一部分的读取缓冲大小
        proxy_buffer_size 64k;

        # 是否开启内存缓冲和磁盘临时文件
        # 如果开启，会尽快写入proxy_buffer_size、proxy_buffers、磁盘临时文件
        # 如果关闭，则写入proxy_buffer_size，同步方式发送给客户端
        proxy_buffering on;

        # 上游服务器单个响应的缓冲区个数和大小
        proxy_buffers 32 128k;

        # 单次写入磁盘临时文件的大小
        proxy_temp_file_write_size 8k;

        # 磁盘临时文件最大大小
        proxy_max_temp_file_size 1024m;

        # 磁盘临时文件路径和层级
        proxy_temp_path path [level1 [level2 [level3]]];

        # 在没有完全读完后端响应的时就开始向客户端传送数据的一部分缓冲区大小
        proxy_busy_buffers_size 8k;


        ##################################

        # 响应gzip压缩配置

        # 压缩开关
        gzip on|off;
        # 用于压缩响应的缓冲区数量和大小
        gzip_buffers number size;
        # 压缩等级，范围1-9，默认为1
        gzip_comp_level level;
        # 不压缩的用户代理匹配正则(对请求头中User-Agent字段匹配)
        gzip_disable regex ...;
        # 进行压缩的最小http版本，设为1.0则全部压缩，设为1.1则1.0不压缩
        gzip_http_version 1.0 | 1.1;
        # 压缩的最小内容长度(根据响应头的Content-Length字段判断)
        gzip_min_length length;
        # 代理请求响应的压缩开关(根据是否有Via请求头字段判断)
        # 可以根据客户端的请求头和上游服务器的响应头中一些字段控制，详见官网
        gzip_proxied off;
        # 需要进行压缩的mime类型，可以使用*通配符，默认已添加text/html
        gzip_types mime-type ...;
        # 是否在响应头中添加 Vary: Accept-Encoding 字段
        # 有些实现得有 BUG 的缓存服务器，会忽略响应头中的 Content-Encoding，从而可能给不支持压缩的客户端返回缓存的压缩版本。有两个方案可以避免这种情况发生：1.将响应头中的 Cache-Control 字段设为 private，告诉中间实体不要缓存它;2.增加 Vary: Accept-Encoding 响应头，明确告知缓存服务器按照 Accept-Encoding 字段的内容，分别缓存不同的版本。通常为了更好的利用中间实体的缓存功能，我们都用第二种方案。
        gzip_vary on | off;

        # 下面三个配置项需要额外添加模块

        # 检查是否有提前压缩好的.gz扩展名文件直接使用
        gzip_static on | off | always;

        # 此配置与gzip_static搭配使用，此时文件系统中可以只存储压缩后的.gz文件
        # 检查客户端是否支持gzip压缩格式，如果不支持则解压后发送
        gunzip on | off;
        # 解压使用的缓冲区数量和大小
        gunzip_buffers number size;

        ##################################

        # 此外常用还有brotli压缩格式，但只支持https
        # 见github里nginx-brotli项目
        # brotli压缩有常用网页代码的静态字典和动态字典(滑动窗口)，压缩效果更好
        # 不是内置模块需要额外下载，详见git，配置类似

        ##################################


        # 合并请求，可以减少客户端的请求个数
        # 需要Tengine的concat模块
        # 前端的语法为url中的query参数以双问号开头??并以逗号,分隔就可以加载多个请求
        # eg. http://example.com/??style1.css,style2.css,foo/style3.css
        # https://github.com/alibaba/nginx-http-concat


        ##################################

        # SSI(Server Side Includes)
        # 类似模板语法，可以在返回的页面中嵌入一些内容
        # SSI指令详见官方文档

        # SSI开关
        ssi on | off;
        # 是否在缓存拼接页面时保留Last-Modified响应头，用于缓存拼接内容
        ssi_last_modified on | off;
        # SSI生成静态页面后存储在磁盘中的最小大小
        ssi_min_file_chunk size;
        # 是否在SSI指令语法出错时，隐藏错误信息字符串
        ssi_silent_errors on | off;
        # SSI指令能处理的MIME类型，默认包括text/html
        ssi_types mime-type ...;
        # SSI指令参数最长长度
        ssi_value_length length;





        ##################################

        # 浏览器缓存相关

        # 添加响应头，如果当前作用域不存在指令则会从上级作用域继承
        # 可以通过修改cache-control等缓存相关响应头配置浏览器缓存
        add_header name value [always];
        # 设置响应头中Expires字段
        # 默认以当前时间计算偏移，modified表示以文档修改时间的作为基础时间
        expires [modified] time;
        # 是否自动发送Etag响应头
        etag on | off;
        # 是否对比If-Modified-Since请求头
        if_modified_since off | exact | before;

        ##################################

        # geoip2 
        # 需要安装数据库文件，数据库，nginx模块
        # 使用和geoip模块相同
        # 可以根据ip获取用户的地理地址




        ##################################

        # 设置正向代理服务器
        # 此时proxy_pass通过客户端请求得到的变量获取
        # 还需要在系统中添加代理

        # 设置DNS解析服务器(正向代理时使用)
        resolver 8.8.8.8;
        # 域名解析超时时间
        resolver_timeout 30s;

        # 如果要支持https，还需要安装配置ngx_http_proxy_connect_module
        # https://github.com/chobits/ngx_http_proxy_connect_module


        ##################################


        # 代理服务器缓存相关

        # 定义服务器缓存使用的空间(定义在proxy_cache_path指令中)，同一个空间可以用于多个地址的缓存
        proxy_cache zone | off;
        # 定义缓存使用的索引，默认为url
        proxy_cache_key $scheme$proxy_host$request_uri;
        # 设置缓存过期时间，可以根据状态码设置
        proxy_cache_valid [code ...] time;
        # 存入缓存的最少访问次数
        proxy_cache_min_uses number;

        # 定义不读取缓存而是直接从后端的服务器上获取资源的请况
        # 可以放入变量,所有值存在且不为0，则不响应
        proxy_cache_bypass string ...;
        # 定义不进行缓存的情况
        proxy_no_cache string ...;
        # 定义需要进行缓存的请求方法
        proxy_cache_methods GET HEAD;

        # 定义删除缓存的情况
        # 可以放入变量,所有值存在且不为0，则进行删除对应索引的缓存
        # 一般通过安装模块ngx_cache_purge来实现精确删除
        proxy_cache_purge string ...;

        # 对过期的缓存是否向上游服务器发送带有If-Modified-Since和If-None-Match请求头的请求进行重新验证
        proxy_cache_revalidate on | off;


        # 多个请求都需要访问缓存时只有一个请求会发送至上游的缓存锁开关
        proxy_cache_lock on | off;
        # 锁的持续时间，超出持续时间后会重发请求
        proxy_cache_lock_age time;
        # 锁的超时时间，超出超时时间后其他请求会直接发送到上游服务器并且不缓存
        proxy_cache_lock_timeout time;

        # 对于范围文件的请求(音视频)，缓存的最大偏移量
        proxy_cache_max_range_offset number;

        # 定义可以使用过期缓存的情况
        proxy_cache_use_stale off;
        # 是否启用后台子请求更新过期缓存
        proxy_cache_background_update on | off;

        # 对于HEAD请求方法是否转化为GET方法并缓存内容
        proxy_cache_convert_head on | off;







        # 可以加入响应头Nginx-Cache在客户端查看命中情况
        add_header Nginx-Cache "$upstream_cache_status";


        ##################################

        # send_file指令开启时，对打开文件信息的缓存


        open_file_cache
        open_file_cache_errors
        open_file_cache_min_uses
        open_file_cache_valid







        ##################################



        memcached_bind
        memcached_buffer_size
        memcached_connect_timeout
        memcached_gzip_flag
        memcached_next_upstream
        memcached_next_upstream_timeout
        memcached_next_upstream_tries
        memcached_pass
        memcached_read_timeout
        memcached_send_timeout
        memcached_socket_keepalive






        ##################################


        # 使用redis2-nginx-module

        ##################################

        # 并发控制


        # 请求处理速度控制
        # zone 使用的共享内存空间
        # burst 突发个数，当收到超出共享内存空间定义的处理速度的请求，等待处理的个数
        # nodelay 表示将所有等待处理的突发请求全部处理，但会按规定速度清除等待队列
        # delay 表示判定为延迟处理的时间，延迟处理的请求会有记录
        limit_req zone=name [burst=number] [nodelay | delay=number];
        # 试运行模式：只会把请求的状态信息放入共享内存，但不会进行限流功能
        limit_req_dry_run off;
        # 超出速率而拒绝处理和延迟处理请求的日志等级
        # 设定值为拒绝处理请求的日志等级，延迟处理的日志等级为设定值低一级
        limit_req_log_level info | notice | warn | error;
        # 超过并发量的数据返回的状态码，默认503
        limit_req_status 503;



        # 请求连接数控制

        # 限制连接数使用的共享内存空间和最大值
        limit_conn zone number;
        # 试运行模式、日志等级、超出后返回的状态码
        limit_conn_dry_run on | off;
        limit_conn_log_level info | notice | warn | error;
        limit_conn_status 503;



        # 响应速度限制
        limit_rate rate;
        # 响应初始不限制速度部分的大小
        limit_rate_after size;



        ##################################

        # ie支持
        msie_padding on | off;
        msie_refresh on | off;

        ##################################
        
        # range相关
        max_ranges number;



        ##################################

        aio on | off | threads[=pool];
        aio_write on | off;
        directio size | off;
        directio_alignment size;


        ##################################

        # 是否允许访问软连接
        disable_symlinks off;
        disable_symlinks on | if_not_owner [from=part];


        ##################################

        # 是否忽略请求头中的无效字段，无效字段可能包含非法字符
        ignore_invalid_headers on | off;
        # 是否允许客户端请求头中字段有下划线
        underscores_in_headers on | off;

        ##################################

        # tcp socket相关
        lingering_close
        lingering_time
        lingering_timeout

        reset_timedout_connection on | off;

        ##################################

        # 从磁盘读取一个响应时的缓冲
        # 当客户端请求响应时，Nginx 会将响应的内容放入一个或多个缓冲区中，并在缓冲区已满或响应内容发送完毕时将其发送到客户端
        output_buffers number size;

        ##################################

        # 设置内核处理文件时的预读取量
        read_ahead size;


        ##################################

        # 精确调整每次请求的内存分配，性能影响小，不应使用
        request_pool_size size;


        ##################################

        # kqueue相关
        send_lowat size;

        ##################################

        # 是否在错误页和响应头Server字段展示nginx版本
        server_tokens on | off | build | string;

        ##################################

        # 用于存储子请求响应正文的缓冲区大小
        subrequest_output_buffer_size size;




        ##################################
        ##################################
        ##################################



        # 请求url规则匹配，可以嵌套(某些系统不行)
        # 匹配规则：优先正则，然后是最长的前缀匹配
        # = 精确匹配
        # ~ 区分大小写的正则
        # ~* 不区分大小写的正则
        # ^~ 表示优先使用此最长前缀匹配
        location [ = | ~ | ~* | ^~ ] uri { 


            ##################################

            # 文件系统匹配

            # 根目录，建议使用绝对路径
            root html; 
            # 别名替换
            # root: 目标路径 + location前缀匹配到的url + 匹配剩余的url
            # alias: 目标路径 + 匹配剩余的url
            alias path;

            # 索引页
            index  index.html index.htm; 

            # 检索文件的路径顺序，如果都没找到则重定向到最后参数的url或指定状态码
            try_files file ... uri;
            try_files file ... =code;

            ##################################

            # 反向代理(将当前location规则的uri映射到url)
            # 注意需要url必须写完整，包括协议，http://xxx
            # 此处可以放如upstream定义的实例进行负载均衡
            proxy_pass http://httpds;

            # 如果代理服务器有多个网络接口，需要选择特定的源IP地址才能连接到上游时，配置发送请求的源IP地址
            # off 不继承上级作用域的值
            # transparent 可以使用非本地ip
            proxy_bind address [transparent] | off;












            ##################################

            # url重定向，一次只能跳转10次,一般写在server作用域下
            # rewrite <regex> <replacement> [flag];
            # flag标记说明：
            # last      #本条规则匹配完成后，继续向下匹配新的rewrite规则
            # break     #本条规则匹配完成即终止，不再匹配后面的任何规则
            # redirect  #302临时重定向
            # permanent #301永久重定向
            rewrite ^/([0-9]+).html$ /index.jsp?pageNum=$1  break;

            # 是否将重定向的处理结果记录到错误日志的notice等级
            rewrite_log on | off;

            # 设置一个变量，注意不要和系统变量重名
            set $variable value;

            # 条件判断，可以判断存在、判断相等、匹配正则
            if (condition) { ... }
            # 返回状态码，响应体文本或重定向
            return code [text];
            return [code] URL;
            # 结束当前重写指令，放在location指令中，后续指令会继续执行
            break;
            # 使用未声明的变量时，是否做出警告
            uninitialized_variable_warn on | off;

            # 这三个参数共同影响响应头的Location字段
            # 重定向时默认行为是绝对定位还是相对定位
            absolute_redirect on | off;
            # 在绝对定位的情况下，是否用server_name替换原始请求Host
            server_name_in_redirect on | off;
            # 在绝对定位的情况下，是否添加nginx监听的端口号，除80和443
            port_in_redirect on | off;
            ##################################

            # 显示文件目录，以"/"结尾时是否会直接显示服务器文件目录

            # 是否开启显示文件目录
            autoindex on | off;
            # 是否显示文件大小
            autoindex_exact_size on | off;
            # 给浏览器返回目录信息的格式
            autoindex_format html | xml | json | jsonp;
            # 是否显示本地时间
            autoindex_localtime on | off;

            ##################################

            # 返回一个1像素的空白gif，用于客户端向服务器发送数据(日志数据)
            empty_gif;

            ##################################

            # 声明当前location域只能被内部请求访问，比如：
            # url重写指令、索引指令、错误页指令
            # 上游服务器响应X-Accel-Redirect的重定向请求
            # 一些指令发出的子请求
            internal;

            ##################################

            # 防盗链
            # 根据配置项设置变量$invalid_referer的值是否合法(为空字符)，否则为1
            # none 不包含Referer字段
            # blocked 包含Referer字段但值被防火墙或代理删除或不是http、https协议
            # server_names 内部服务器
            # 还可以使用通配符和正则
            valid_referers none | blocked | server_names | string ...; 
            referer_hash_max_size size;
            referer_hash_bucket_size size;

            ##################################




        }

        # 静态资源分离
        location ~*/(js|css|img){
            root html;
            index  index.html index.htm;

            # 防盗链
            valid_referers http:192.168.174/133;
            if ($invalid_referer){#无效的
                # 返回状态码403
                return 403;
                # 或者返回不可用的图片
                # rewrite ^/  /img/x.png break;
            }
            
        }

        ##################################

        # 错误页
        error_page code ... [=[response]] uri;
        
        # 是否允许递归调用error_page指令
        recursive_error_pages on | off;

        # error_page定义错误码对应的url
        # 服务器错误码为500 502 503 504，转到"域名/50x.html"
        error_page 500 502 503 504 /50x.html; 

        # 指定到html文件夹下找/50x.htm
        location = /50x.html {
            root   html;
        }
        ##################################
    }



}

# 用于四层(tcp/UDP数据流)的代理和负载均衡
# tcp层转发，可以用于连接mysql
stream {


    server {
        listen 3306;
        upstream mysql {
            server 127.0.0.1:3306;
            server 127.0.0.2:3306;
            server 127.0.0.3:3306;
        }
        # 此处连接mysql可以不带协议
        proxy_pass mysql;

    }

    preread_buffer_size
    preread_timeout
    proxy_protocol_timeout
    resolver
    resolver_timeout
    tcp_nodelay
    variables_hash_bucket_size
    variables_hash_max_size

}










```








proxy_cookie_domain
proxy_cookie_flags
proxy_cookie_path
proxy_force_ranges
proxy_headers_hash_bucket_size
proxy_headers_hash_max_size
proxy_hide_header
proxy_http_version
proxy_ignore_client_abort
proxy_ignore_headers
proxy_intercept_errors
proxy_limit_rate
proxy_max_temp_file_size
proxy_method
proxy_next_upstream
proxy_next_upstream_timeout
proxy_next_upstream_tries

proxy_pass
proxy_pass_header
proxy_pass_request_body
proxy_pass_request_headers
proxy_read_timeout
proxy_redirect
proxy_request_buffering
proxy_send_lowat
proxy_send_timeout
proxy_set_body
proxy_set_header
proxy_socket_keepalive
proxy_ssl_certificate
proxy_ssl_certificate_key
proxy_ssl_ciphers
proxy_ssl_conf_command
proxy_ssl_crl
proxy_ssl_name
proxy_ssl_password_file
proxy_ssl_protocols
proxy_ssl_server_name
proxy_ssl_session_reuse
proxy_ssl_trusted_certificate
proxy_ssl_verify
proxy_ssl_verify_depth
proxy_store
proxy_store_access
proxy_temp_file_write_size
proxy_temp_path















顶级作用域下：
- event{}
- http{}
  - upstream{}
  - server{}
    - location{}
- stream{}
- mail{}




变量：
- $request_uri 请求的url
- $cookie_xxx 代表变量名为xxx的cookie
- $remote_addr 前项服务器的ip
- $proxy_add_x_forwarded_for 客户端请求头x_forwarded_for字段加上前项服务器的ip的值，用于转发到后项服务器的请求头

- $upstream_cache_status 上游服务器返回响应缓存的命中情况，可选值：MISS, BYPASS, EXPIRED, STALE, UPDATING, REVALIDATED, HIT


- $1、$2... location指令中的捕获组


- $binary_remote_addr 前项服务器的ip的二进制，更节省空间，用于limit_req_zone、limit_conn_zone中




## 模块

——————————————————————————————————————————

- Core functionality 工作进程相关配置

- ngx_http_core_module 核心模块

- ngx_http_access_module ip过滤

- ngx_http_browser_module 根据http请求头中"User-Agent"的值，判断新旧浏览器，并生成变量供后续处理逻辑使用
- ngx_http_log_module 访问日志

- ngx_http_headers_module 添加响应头
- ngx_http_addition_module 响应体前后追加其他请求的内容

- ngx_http_auth_basic_module basic认证
- ngx_http_auth_jwt_module jwt认证
- ngx_http_auth_request_module 子请求认证

- ngx_http_index_module 索引页
- ngx_http_autoindex_module 斜线'/'结尾url，直接显示服务器文件目录
- ngx_http_random_index_module 斜线'/'结尾url，随机选取一个文件作为索引页

- ngx_http_gzip_module 使用gzip实时压缩
- ngx_http_gzip_static_module 检查使用已经压缩好的gzip文件
- ngx_http_gunzip_module 使用已经压缩好的gzip文件，并在不支持压缩格式的时候解压
- ngx_http_referer_module 防盗链

- ngx_http_limit_conn_module 限制连接数
- ngx_http_limit_req_module 限制请求处理速度


- ngx_http_rewrite_module 重定向相关

- ngx_http_map_module 映射变量值







- ngx_http_charset_module 字符集设置
- ngx_http_empty_gif_module 用于只需要向服务器发送数据(日志数据)，且无需服务器有消息体回应的场合，比如收集访问者的统计信息，现用header请求更合适

- ngx_http_geo_module 定义一个ip转换到自定义值的变量
- ngx_http_geoip_module 现在一般用geoip2模块

- ngx_http_ssi_module Server Side Includes，解析响应中的ssi语法















- ngx_http_proxy_module


- ngx_http_upstream_module




—————————————————————————————————————————— 未学

- ngx_http_ssl_module https
- ngx_http_v2_module http2
- ngx_http_v3_module http3
- ngx_http_slice_module 将请求分割成多个子请求
- ngx_http_sub_module 替换响应中的内容
- ngx_http_realip_module 通过X-Real-IP、X-Forwarded-For头部字段获取真实ip到变量
- ngx_http_memcached_module memcached缓存服务
- ngx_http_mirror_module 将当前地址的请求作为子请求转发到镜像地址，并且忽略其响应
- ngx_http_image_filter_module 用于预处理返回的图片，如旋转，限定大小等等

- ngx_http_stub_status_module 将当前地址显示为一个基础的系统状态页

- ngx_http_flv_module 流媒体文件Flash Video (FLV)支持
- ngx_http_mp4_module MP4文件支持

- ngx_http_userid_module 用于为每个用户分配一个userid和管理相关cookie

- ngx_http_perl_module perl脚本支持
- ngx_http_dav_module 通过 WebDAV 协议进行文件管理自动化
- ngx_http_js_module 引入一个弱版js

- ngx_http_fastcgi_module 转发请求到fastcgi服务器，主要是php脚本解析
- ngx_http_scgi_module Simple Common Gateway Interface，转发请求到scgi服务器
- ngx_http_grpc_module 用于代理请求到gRPC服务器，Google Remote Procedure Call(谷歌远程过程调用)
- ngx_http_uwsgi_module 代理请求到uwsgi服务器，universal web server gateway interface

- ngx_http_xslt_module 用XSLT处理XML响应

- ngx_http_secure_link_module 用于下载服务器防盗链

- ngx_http_split_clients_module A/B测试

—————————————————————————————————————————— 商业版

- ngx_http_session_log_module 根据会话记录日志

- ngx_http_api_module 官方定义的一些url用于访问系统状态信息
- ngx_http_upstream_conf_module 定义一些url用于操作upstream中服务器状态，后期版本被api模块取代
- ngx_http_status_module 定义一些url用于访问系统状态信息，后期版本被api模块取代
- ngx_http_keyval_module 创建变量用于获取api模块中的键值对的数据或者用于njs

- ngx_http_f4f_module 动态视频流相关
- ngx_http_hls_module HTTP Live Streaming (HLS) 
- ngx_http_internal_redirect_module 内部重定向，区别于rewrite的是重定向在检查请求、连接限制和访问限制之后进行的

- ngx_http_proxy_protocol_vendor_module 从亚马逊谷歌微软的云平台获取信息到变量

- ngx_http_upstream_hc_module health checks，上游服务器健康检查












