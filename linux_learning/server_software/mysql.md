# mysql

## window cmd命令

- net mysql [start|stop]    开启/关闭服务
- mysql [选项]          连接数据库
  - -u <用户名> 
  - -p<密码>   可以直接使用-p或者-p和密码之间不能有空格
  - -h <主机名>
  - -P <端口> 默认端口是3306
  - -e <sql语句> 以对应用户执行sql语句


## 规则

- 语句结尾加 ; (命令行中可以用 \g 或 \G )
- 和系统冲突的关键字可以用反引号(着重号)``表明为普通字段



## SQL
分类：
- DDL: CREATE
- DML: SELECT
- DCL:

### SELECT

- SELECT item1,item2... FROM table;
  - item可以为常量，表示列中每一项都为常量
  - table可以为 DUAL 伪表，表示占位
- SELECT item [AS alias],... FROM table;            别名
  - 别名中有空格需要加双引号 " (双引号为规范)
- SELECT DISTINCT item1,item2... FROM table;        去重

- SELECT item1,item2... FROM table WHERE item = value;      过滤

- LIKE <pattern>      模式匹配
  - % 任意个任意字符
  - _ 单个任意字符
  - 匹配 % 或 _ 需转义 \% 或 \_
- ESCAPE <转义字符>       放在LIKE语句标识LIKE模式匹配中的转义字符(默认为 \ )

- ORDER BY item1 [ASC|DESC],item2 [ASC|DESC],...          排序(默认升序)
  - >ORDER BY中可以使用别名，WHERE中不能使用


- LIMIT offset,count                   分页
- LIMIT count OFFSET offset            分页




- DESCRIBE table;           显示表中字段的详细信息
- DESC table;               同DESCRIBE



```
SELECT item [AS alia],...

FROM table [AS alia],...
[INNER|LEFT|RIGHT|FULL|NATUAL] JOIN table 
ON condition
USING item
WHERE condition

UNION
...

ORDER BY item [ASC|DESC]
LIMIT offset,count
;

```


#### 连接

分为内连接、外连接，外连接会展示不相同部分

语法：
- FROM table,... WHERE condition                内连接
- FROM table <XXX JOIN> table [ON condition|USING item] <XXX JOIN> ...
  - JOIN、INNER JOIN    内连接
  - <LEFT|RIGHT|FULL> [OUTER] JOIN      外连接
  - NATUAL JOIN     自然连接，自动选择列名相同的字段进行连接


第一种语法为内连接
第二种语法可以选择内外连接方式




### CREATE





## 运算符

1. 算数运算符：
  除了普通符号的加减乘除取余外，div为除，mod表示取余
  >SQL语法中加号+没有连接的作用，如果数组字符串相加会隐式转换为数值

2. 比较运算符：
  - 符号类型：
    - =、>、<、>=、<=
      - >NULL只要参与 = 判断，结果就为NULL
    - <=> 安全等于，可以对NULL进行判断，其他与 = 相同
    - <>、!= 不等于
  - 关键字、函数类型：
    - IS NULL、IS NOT NULL
    - ISNULL()
    - LEAST()、GREATEST()
    - BETWEEN ... AND ...
    - IN 、NOT IN               枚举，后面放集合，形式:(...,...)
    - LIKE                      模式匹配
    - REXEXP、RLIKE             正则

3. 关系运算符：
  - AND、OR、NOT、XOR
    - >AND优先级高于OR
  - &&、||、!

4. 位运算符：
  - &、|
  - ^   异或
  - ~   取反
  - <<、>>  移位





## 函数

数学函数：

三角函数：

字符串函数：

日期函数：

流程控制：
- IF(condition,true_return,false_return)
- IFNULL(value1,value2)         value1为NULL则输出value1，不为NULL则输出value2
- 



## 锁

1. 作用范围分为：
  - 全局锁 Flush tables with read lock
  - 表级锁
    - 共享锁
    - 排他锁
    - 意向锁
  - 行级锁
    - 记录锁
    - 间隙锁
    - 临键锁
    - 插入意向锁


2. 悲观锁、乐观锁

3. 显式锁、隐式锁
  - 隐式锁 INSERT操作后新插入的行不会加锁，后来想操作数据的事务会会为前面插入还未提交的行记录和自己加锁
    - 情况1：对于聚簇索引，行
    - 情况2：对于二级索引，会先对比Page Header的PAGE_MAX_TRX_ID 字段和当前最小的活跃事务id，如果前者小，则说明，插入此记录的事务已经提交，无需添加隐式锁，如果前者大，则回表聚簇索引进行情况1的判断




## 变量

会话变量、全局变量

- transaction_isolation 隔离级别
  - 


- innodb_flush_log_at_trx_commit 事务提交的默认行为
  - 0 每次事务提交时不把redo log buffer内容写入page cache，也不进行刷盘
  - 1 (默认)每次事务提交时都把redo log buffer内容写入page cache，并进行刷盘
  - 2 每次事务提交时只把redo log buffer内容写入page cache，系统自行决定刷盘时间
- innodb_log_group_home_dir redo日志文件组所在路径，默认 ./
- innode_log_files_in_group redo日志文件组个数，命名：ib_logfile + n，默认2个，最大100个
- innodb_log_file_size 单个redo日志文件组大小，默认值为 48M ，所有日志文件组总和最大值为512G


- innodb_autoinc_lock_mode
- 
- 
- 




-  innodb_deadlock_detect 是否开启死锁检测(发现死锁后，主动回滚死锁链条中的持有最少行级排他锁的事务，让其他事务得以继续执行)
- innodb_lock_wait_timeout 事务阻塞后等待的超时时间


- general_log 通用日志开关
- general_log_file 通用日志文件路径，一般为/var/lib/mysql/[主机名].log




- log_bin 二进制日志开关
- log_bin_basename 二进制日志文件组的前缀
- log_bin_index 二级制日志文件组的索引
- log_bin_trust_function_creators 


- log_bin_use_v1_row_events 
- sql_log_bin 


- sync_binlog 二进制日志在page cache中累计的事务个数，达到个数后进行刷盘，默认为0，表示由文件系统决定





IFNULL(item,value)      空值替换





