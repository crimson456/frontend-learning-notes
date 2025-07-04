
# Order


## 开关机


- shutdown [选项] time [message]     关机
  - -k 模拟关机，并不会真的关机，只是将警告讯息传送给所有使用者
  - -r 关机后重新开机
  - -h 关机(相当于不加任何参数)
  - -n 不采用正常程序来关机，用强迫的方式杀掉所有执行中的程序后自行关机
  - -c 取消目前已经进行中的关机动作
  - -f 关机时，不做 fsck 动作(检查 Linux 档系统)
  - -F 关机时，强迫进行 fsck 动作
  - time 设定关机的时间(直接加数字表示分钟，也可以是)
  - message 传送给所有使用者的警告讯息
  - -t <seconds> 设定在几秒钟之后进行关机程序(不加-t参数表示分钟数)  可能无用???

- halt [选项]         关闭内存
- reboot [选项]       重启
  - -n 在重开机前不做将记忆体资料写回硬盘的动作
  - -w 并不会真的重开机，只是把记录写到 /var/log/wtmp 档案里
  - -d 不把记录写到 /var/log/wtmp 档案里 (-n 这个参数包含了 -d)
  - -f 强迫重开机，不呼叫 shutdown 这个指令
  - -i 在重开机之前先把所有网络相关的装置先停止

- poweroff          切断电源

- init [0-6]        执行运行级别
  - 0 关机
  - 1 单用户模式
  - 2 不完全多用户模式，不包含NFS(network file system)服务
  - 3 完全多用户模式
  - 4 未分配
  - 5 图形界面
  - 6 重启

- runlevel    当前Linux系统的运行等级
- login       让用户登入系统，可更换登入身份
- logout      让用户退出系统



## 文件、目录操作

- ls [选项] [dir...]            list，显示目录
  - 可以用模式匹配
  - -a 显示所有文件及目录 (. 开头的隐藏文件也会列出)
  - -d,--directory 将对应地址目录作为文件显示，而不是显示其中的文件
  - -l 以长格式显示文件和目录信息，包括权限、所有者、大小、创建时间等
  - -h,--human-readable 以可读性较高的形式显示(文件大小加单位)
  - -i,--inode 列出文件的inode号
  - -r 倒序显示文件和目录
  - -t 将按照修改时间排序，最新的文件在最前面
  - -A 同 -a ，但不列出 "." (目前目录) 及 ".." (父目录)
  - -F 在列出的文件名称后加一符号，例如可执行文档则加 "*", 目录则加 "/"
  - -R 递归显示目录中的所有文件和子目录


- ll          ls -l 的缩写

- pwd           print work directory 打印工作目录(当前绝对路径)


- cd [dirName]            change directory 更改当前工作目录
  - 可以是绝对路径，相对路径，可以使用环境变量
  - ~ 表示用户家目录，- 表示上一次访问的目录

- mkdir [选项] [dir...]                  make directory 创建目录
  - -p,--parents 逐级创建(一般情况下没有上级目录报错)

- rmdir  [选项] [dir]           删除空目录s
  - -p 对应目录被删除后使上级目录也成为空目录的话，则一并删除 

- touch [选项] [dir...]               创建文件
  - -a 改变档案的读取时间记录
  - -m 改变档案的修改时间记录
  - -c,--no-create 假如目的档案不存在，不会建立新的档案。与 --no-create 的效果一样
  - -f 不使用，是为了与其他 unix 系统的相容性而保留
  - -r 使用参考档的时间记录，与 --file 的效果一样
  - -d 设定时间与日期，可以使用各种不同的格式
  - -t 设定档案的时间记录，格式与 date 指令相同



- cp [选项] [源文件...] 目标文件                   copy 复制源文件或目录到目标文件或目录下
  - 注意cp命令默认别名可能为 cp -i
  - -a,--archive 通常在复制目录时使用，相当于 -dR --preserve=all
  - -r,-R,--recursive 递归复制内层，复制目录时需要添加此参数
  - -i,--interactive 在复制前提示确认，和是否覆盖
  - -u,--update 重名时源文件最新则进行覆盖
  - -v,--verbose 显示详细的复制过程
  - -p,--preserve 保留源文件的权限、所有者和时间戳信息
  - --preserve=[] 保留指定内容
  - -f,--force 强制复制，重名则覆盖，且不提示
  - -l,--link 不复制文件，只是生成链接文件

- mv [选项] 源文件 目标文件                move 移动源文件或目录到目标文件或目录(重命名也使用此命令)
  - -b,--backup 覆盖前创建备份
  - -i,--interactive 询问是否覆盖旧文件
  - -f,--force 覆盖前不询问
  - -n,--no-clobber 不覆盖
  - -u,--update 重名时源文件最新则进行覆盖


- rm [选项] dir...          remove 删除文件或目录
  - 注意rm命令默认别名可能为 rm -i
  - -i 删除前逐一询问确认
  - -f，--force 即使原档案属性设为唯读，亦直接删除，无需逐一确认
  - -r,-R,--recursive 递归删除，删除目录时需要添加此参数

- cat [选项] dir...        concatenate 连接文件内容并全部直接输出到显示(过长只能看到最后几行)
  - -n,--number 行数编号
  - -b,--number-nonblank 行数编号，空白行不编
  - -s,--squeeze-blank 空白行合并
  - 配合输出重定向可以输出到文件

- tac [选项] dir...       同cat命令相同，不过行顺序相反

- more [选项] dir...      按页查看文件
  - 进入分页浏览状态后
    - Enter 向下n行，默认为1行
    - Ctrl+F 向下滚动一屏
    - 空格键 向下滚动一屏
    - Ctrl+B 返回上一屏
    - = 输出当前行的行号
    - ：f 输出文件名和当前行的行号
    - V 调用vi编辑器
    - !命令 调用Shell，并执行命令
    - q 退出more

- less [选项] dir...      按页查看文件，可以查询，功能更强，加载更快

- head [参数] [dir]       显示文件开头部分
  - -q 隐藏文件名
  - -v 显示文件名
  - -c <数目> 显示的字节数
  - -n <行数> 显示的行数
- tail                    显示文件的结尾部分
  -f 循环读取,常用于读取日志
  -q 不显示处理信息
  -v 显示详细的处理信息
  -c<数目> 显示的字节数
  -n<行数> 显示文件的尾部 n 行内容

- ln [选项] [源dir] [目标dir]        link files 创建链接
  - -s 软链接(符号链接)
  - 硬连接不能跨分区，不能链接目录


- vim [选项] dir...           使用vim编辑器打开文件
  - +数字 进入后光标所在的行数
  - +/关键词 进入后光标跳到第一个关键词位置，并高亮显示关键词

- wc [选项] dir               word count 计算文件的行数、词数、字节数
  - -c或--bytes或--chars 只显示Bytes数。
  - -l或--lines 显示行数。
  - -w或--words 只显示字数。

- sort [选项] [dir]              根据文件的行内容进行排序
  - -r 以相反的顺序来排序
  - -n 依照数值型的大小排序，默认以字符串大小排序
  - -f 忽略大小写
  - -t <分隔符> 指定分隔符，默认为制表符
  - -k <n[,m]> 指定排序的字段范围，从第n个字段开始，m个字段结束，不指定m为行尾
  - -b 忽略每行前面开始出的空格字符
  - -d 排序时，处理英文字母、数字及空格字符外，忽略其他的字符
  - -i 排序时，除了040至176之间的ASCII字符外，忽略其他的字符
  - -o <输出文件> 将排序后的结果存入指定的文件

- file [选项] [dir...]            用于辨识文件类型
  - -b 只显示辨识结果，不显示文件名称
  - -i 显示MIME类别

- dos2unix [选项] [dir]         将DOS格式文本文件转换成Unix格式

- test [选项]             测试字串或文件是否具有某些条件，可以通过 $? 获取判断结果
  - 等价写法: 用中括号包裹 [判断条件]
  - 判断文件：
    - -b <文件> 如果文件为一个块特殊文件，则为真
    - -c <文件> 如果文件为一个字符特殊文件，则为真
    - -d <文件> 如果文件为一个目录，则为真
    - -e <文件> 如果文件存在，则为真
    - -f <文件> 如果文件为一个普通文件，则为真
    - -g <文件> 如果设置了文件的SGID位，则为真
    - -G <文件> 如果文件存在且归该组所有，则为真
    - -k <文件> 如果设置了文件的粘着位，则为真
    - -O <文件> 如果文件存在并且归该用户所有，则为真
    - -p <文件> 如果文件为一个命名管道，则为真
    - -r <文件> 如果文件可读，则为真
    - -s <文件> 如果文件的长度不为零，则为真
    - -S <文件> 如果文件为一个套接字特殊文件，则为真
    - -u <文件> 如果设置了文件的SUID位，则为真
    - -w <文件> 如果文件可写，则为真
    - -x <文件> 如果文件可执行，则为真
    - <文件1> –ef <文件2> 两个文件是否为同一个文件，inode相同
    - <文件1> –nt <文件2> 判断文件1是否比文件2新
    - <文件1> –ot <文件2> 判断文件1比是否文件2旧
  - 判断整数：
    - <整数1> -eq <整数2> 整数相等
    - <整数1> -ge <整数2> 整数1大于等于整数2
    - <整数1> -gt <整数2> 整数1大于整数2
    - <整数1> -le <整数2> 整数1小于等于整数2
    - <整数1> -lt <整数2> 整数1小于整数2
    - <整数1> -ne <整数2> 整数1不等于整数2
  - 判断字符串：
    - –n <字符串> 字符串的长度非零
    - –z <字符串> 字符串的长度是否为零
    - <字符串1> ＝ <字符串2> 字符串是否相等，若相等返回true
    - <字符串1> !＝ <字符串2> 字符串是否不等，若不等返回false
  - 判断表达式：
    - <表达式1> –a <表达式2> 两个表达式都为真
    - <表达式1> –o <表达式2> 两个表达式有一个为真
    - ! <表达式> 条件取反


## 压缩

- gzip [选项] [dir]   压缩文件(不能是目录)，压缩后扩展名为.gz
  - -d 解压缩

- gunzip [选项] [dir]   解压缩.gz文件


- tar [选项] [dir]    将目录打包成文件(备份)，建议加入.tar扩展名
  - -c 新建打包，不加似乎会将原目录删除
  - -f <备份名> 打包成的备份名
  - -z 使用gzip指令压缩备份
  - -x 使用gzip指令解压缩备份
  - -j 使用bzip2指令压缩备份
  - -v 显示执行过程
  - -t 列出备份文件内容
  - 常用:
    - 打包压缩.tar.gz文件 -czvf   
    - 解包.tar.gz文件 -xzvf


- zip [选项] [压缩后的文件名] [dir]   压缩文件(不能是目录)，压缩后扩展名为.zip
  - -r 压缩目录
- unzip

- bzip2 [选项] [dir]   压缩文件(不能是目录)，压缩后扩展名为.bz2
  - -k 保留原文件
- bunzip2


## 用户，用户组管理相关指令

- id [选项] [用户名]      显示用户的UID、GID以及附属于用户的初始组ID
  - -g,--group 显示用户所属群组的ID
  - -G,--groups 显示用户所属附加群组的ID
  - -n,--name 显示用户，所属群组或附加群组的名称
  - -r,--real 显示实际ID
  - -u,--user 显示用户ID

- whoami           显示自身的用户名称，相当于执行 id -un 指令

- last [选项]     显示系统开机后或从月初登入者的讯息

- lastlog [选项]     显示系统中所有用户最近一次登录信息
  - -u <uid> 只显示对应uid用户

- lastb [选项]    列出登入系统失败的用户相关信息

- useradd [选项] 用户名                     添加用户
  - -d <家目录> 指定家目录,注意创建家目录会有权限问题
  - -g <群组> 指定初始组(可以是用户组名或用户组id)，不指定则以用户名创建一个初始组
  - -G <群组> 指定附加组(可以是用户组名或用户组id)
  - -u <uid> 指定用户ID，默认系统会从500之后按顺序分配uid
  - -c <备注> 添加备注文字，会保存在passwd的备注栏位中
  - -s <shell> 指定用户的登录shell，默认/bin/bash
- adduser     同useradd
  
- usermod [选项] 用户名                     修改用户
  - -g <群组> 指定初始组(可以是组名或组id)，不指定则以用户名创建一个初始组
  - -G <群组> 指定附加组(可以是组名或组id)
  - -u <uid> 指定用户ID，默认系统会从500之后按顺序分配uid
  - -l <用户名> 修改用户名
  - -s <shell> 指定用户的登录shell 
  - -L 锁定用户
  - -U 解锁用户

- userdel [选项]             删除用户帐号
  - -r 同时删除用户家目录


- passwd [选项] [用户名]                    修改用户密码
  - -S 查询用户密码状态
  - -l 锁定用户
  - -u 解锁用户
  - --stdin 通过管道符输出

- chage [选项] [用户名]              修改用户密码状态(即shadow文件中的后几项)
  -l 列出当前状态
  -m <天数> 密码修改时间间隔
  -M <天数> 密码有效期
  -W <天数> 密码过期前警告天数
  -E <日期> 账号失效时间
  -d <日期> 修改密码最后一次更改日期
  -I <天数> 密码宽限时间

- su [选项] [用户名]       switch user 切换用户
  - - 只是用 - 表示连带用户环境变量一起切换
  - -c <command>，--command=<command> 仅以切换的身份执行一次命令，不切换用户身份
  - 不填写用户名切换到root


- groupadd [选项] [组名]       添加用户组
  - -g <GID> 指定组的GID

- groupmod [选项] [组名]      修改用户组
  - -g <GID> 修改组的GID
  - -n <新组名> 修改组名

- groupdel [组名]         删除用户组
  - 有初始用户的组不可删除

- gpasswd [选项] [组名]       对用户组中用户进行操作
  -a <用户名> 将用户作为附加成员添加到组
  -d <用户名> 从组删除附加用户

- users       只显示当前登录系统的所有用户的用户名

- who [选项] 用户名       查看当前登录系统的用户信息

- w [选项] 用户名         查看当前登录系统的用户及当前执行任务的情况
  - w命令列的含义：
    - IDLE 最近一个命令执行结束后的空闲时间
    - JCPU 总CPU占用时长
    - PCPU 最近一个命令占用CPU时长
    - WHAT 最近一个命令名称







## 权限

SetUID权限表示普通用户执行文件时以所有者权限执行
SetGID权限表示普通用户执行文件时作为所属组成员执行
Sticky BIT权限作用于目录，限制普通用户只能删除自己建立的文件
- chmod [选项] 权限 文件          change mode 命令是控制用户对文件的权限的命令
  - 权限可以是 [ugoa][+-=][rwxsXt] 或者 4位8进制语法(8进制中2和3对应权限不合理)
  - SetUID的权限:4755 或者 u+s ，8进制第一位表示特殊权限
  - SetGID的权限:2755 或者 g+s 
  - Sticky BIT的权限:1755 或者 o+s 
  - -c 若该文件权限确实已经更改，才显示其更改动作
  - -f 若该文件权限无法被更改也不要显示错误讯息
  - -v 显示权限变更的详细资料
  - -R 对目前目录下的所有文件与子目录进行相同的权限变更


- chown [选项] [所有者]:[初始组]           change owner 设置文件所有者和初始组
  - -c 显示更改的部分的信息
  - -f 忽略错误信息
  - -h 修复符号链接
  - -v 显示详细的处理信息
  - -R 递归目录内部



- chgrp [选项] [初始组]                change group 设置初始组
  - -h,--no-dereference 只对符号连接的文件作修改
  - -R,--recursive 递归处理 

- umask [选项] [权限掩码]      user files-creations mask 显示或指定创建文件时的默认权限掩码
  - 权限掩码一共四位，第一位表示特殊权限，二到四为ugo的8进制掩码，实际权限为 777-掩码(求异或),注意文件默认都不可执行
  - -S 以rwx形式显示默认权限
  


ACL权限：

- dumpe2fs -h [分区路径]
  - -h 仅显示超级块中信息，而不显示磁盘块组的详细信息
  - 超级块中default mount options 字段有acl表示支持acl权限

- mount -o remount,acl /  临时重新挂载根分区并开启acl权限
  - 永久开启须在/etc/fstab文件中设置

- setfacl [选项] [文件或目录]       设置ACL权限
  - -m <规则> 设定ACL权限，规则如下：
      - [d[efault]:] [u[ser]:]uid [:perms]  设置用户的权限(未指定则设置所有者)
      - [d[efault]:] g[roup]:gid [:perms]   设置群组的权限(未指定则设置所有组)
      - [d[efault]:] m[ask][:] [:perms]     权限掩码(最大有效权限)
      - [d[efault]:] o[ther] [:perms]       设置其他人的权限
      - default表示给父目录设置的新添加文件的权限，uid、gid可以是id或名字，perms表示权限规则如rwx、r-x或者使用数字
  - -x <规则> 删除用户单个ACL权限
  - -b 删除所有的ACL权限
  - -d 设定默认的ACL规则(针对目录)
  - -k 删除默认的ACL规则(针对目录)
  - -R 递归设置ACL权限

- getfacl [文件名]        显示文件ACL权限



- chattr [选项] [+/-/=属性] [文件名]       change attributes 改变文件属性
  - 属性包括：
    - i 不得任意更改文件或目录
    - a 对文件只能新增内容，不能删除和修改，对目录只能新建和修改文件，不能删除
    - b 不更新文件或目录的最后存取时间
    - c 将文件或目录压缩后存放
    - d 将文件或目录排除在倾倒操作之外
    - s 保密性删除文件或目录
    - S 即时更新文件或目录
    - u 预防意外删除
  - -R 递归处理目录下的所有文件 


- lsattr [选项] [文件名]            list attributes 显示文件属性
  - -a 显示所有文件和目录包括以.开头的隐藏文件
  - -d 显示目录本身而不是目录内的文件



sudo：

- visudo [选项]         修改sudo配置文件/etc/sudoers
  - -s 检查配置文件语法是否正确
- sudo [选项] [允许执行的指令]    super user do 执行被管理员授权的命令(一般用绝对路径)
  - -l 查看所有被授权的命令




## 搜索

- find [查询目录] [过滤选项]            遍历查找文件
  - -name <pattern> 文件名模式匹配
  - -iname <pattern> 文件名模式匹配且不区分大小写
  - -type <type> 文件类型，此命令用'f'而不是'-'表示普通文件
  - -size <[+-]size[cwbkMG]> 按文件大小查找,+、-表示大于或小于指定大小，单位c(字节)、w(字数)、b(块数)、k(KB)、M(MB)、G(GB)
  - -user <username> 按文件所有者查找
  - -group <groupname> 按文件初始组查找
  - -inum <num> 根据inode查找

  - -amin <n> (access)查找在n分钟内被访问过的文件(n可以为+-表示超过或时间内)
  - -atime <n> 查找在n天内被访问过的文件
  - -cmin <n> (change)查找在n分钟内状态发生变化的文件，如权限、所有者、所有组
  - -ctime <n> 查找在n天内状态发生变化的文件
  - -mmin <n> (modify)查找在n分钟内内容被修改过的文件
  - -mtime <n> 查找在n天内内容被修改过的文件

  - -a 同时满足两个过滤项
  - -o 任意满足一个过滤项

  - -exec <命令> {} \; 查询结束后对文件执行对应命令
  - -ok <命令> {} \; 查询结束后逐个询问是否对文件执行对应指令


- locate [选项] [dir...]    从文件资料库中查找符合条件的文档(定期维护文件资料库，不在文件资料库中的文件找不到，如新创建的文件、/tmp目录下的文件)
- updatedb    手动更新文件资料库





- which [选项] [命令或文件]   搜索命令绝对路径及其别名 或者 搜索文件
  - -n<文件名长度> 　指定文件名长度
  - -p<路径长度> 　指定文件名加路径的长度
  - -w 指定输出时栏位的宽度
- whereis [command]   搜索命令绝对路径和帮助文档的绝对路径

- whatis [command]   显示命令手册的NAME部分
- apropos [config]   显示命令手册的NAME部分

## 帮助

- man [选项] [节号] [指令或配置]    manual 查看指令手册或配置文件手册
  - 节号：表示要查看的帮助类型(如passwd同时会有指令和配置文件)
    - 1：用户命令
    - 2：系统调用
    - 3：C库函数
    - 4：设备和特殊文件
    - 5：文件格式和约定
    - 6：游戏和演示
    - 7：杂项
    - 8：系统管理命令

- info [选项] [指令或配置]    查看以info的格式书写的手册

- help [选项] [内置命令]    查看shell内置命令的帮助信息




## 文件系统 (磁盘)管理

- df [选项] [dir...]          disk free 显示文件系统磁盘使用情况统计
  - -h, --human-readable
  - -a 显示所有文件系统信息，包括特殊文件系统，如/proc、/sysfs
  - -T 显示文件系统类型
  - -m 以MB为单位显示容量
  - -K 以KB为单位显示容量

- du [选项] [dir]       disk usage 显示文件、目录所占用的磁盘空间
  - -s,--summarize 只显示总计
  - -h,--human-readable 

- fsck [选项] [分区设备文件名]    检查与修复文件系统(开机系统自动执行，不建议手动执行)
  - -a 不显示用户提示，自动修复文件系统
  - -y 同 -a 作用一致，有些文件系统只支持 -y


- dumpe2fs [选项] [设备文件]
  - -h 仅显示超级块中信息，而不显示磁盘块组的详细信息


- fdisk [设备文件名]           创建和操作磁盘的分区表
  - -l 列出素所有分区表
  - 菜单项包括：
    - m 显示菜单和帮助信息
    - a 活动分区标记/引导分区
    - d 删除分区
    - l 显示分区类型
    - n 新建分区
    - p 显示分区信息
    - q 退出不保存
    - t 设置分区号
    - v 进行分区检查
    - w 保存修改
    - x 扩展应用，高级功能

- partprobe     重新读取分区表

- mkfs [选项] [分区设备文件]    在分区上创建linux文件系统(格式化)
  - -t <文件系统类型>

- mount [选项] [设备原始路径] [挂载路径]     临时挂载设备，一般挂载在/mnt目录下创建的目录
  - -l 显示卷标名称
  - -a 依据配置文件/etc/fstab内容自动挂载
  - -t <文件系统> 指定挂载文件系统类型，文件系统包括：
    - iso9660 光盘、光盘镜像
    - vfat fat32文件系统
    - ntfs-3g 需要软件包来支持ntfs
  - -L <卷标名> 
  - -o <特殊选项> 特殊选项包括：
    - atime/noatime 更新/不更新访问时间，访问分区文件时是否更新访问时间，默认更新
    - sync/async 同步异步，默认异步
    - auto/noauto 自动/手动，执行mount -a命令时，是否自动安装/etc/fstab内容挂载，默认自动
    - remount 重新挂载已经挂载的文件系统，一般用于修改特殊权限如ACL
    - ro/rw 只读/读写，挂载文件系统时是否具有读写权限，默认rw
    - suid/nosuid 具有/不具有SUID权限，设定文件时是否具有SUID和SGID权限，默认具有
    - user/nouser 允许/不允许普通用户挂载，设定文件系统是否允许普通用户挂载，默认不允许，只有root可以挂载分区
    - exec/noexec 允许/不允许执行,设定是否允许在文件系统中执行可执行文件，默认允许
    - usrquota 添加后支持用户磁盘配额，默认不支持
    - grpquota 添加后支持组磁盘配额，默认不支持
    - defaults 使用预设选项，相当于rw,suid,dev,exec,auto,nouser,async



- umount [设备文件名或挂载点]      卸载设备

- dd if=[输入文件] of=[输出文件] bs=[块字节数] count=[块个数]  disk dump 磁盘复制
  - if=[输入文件] 指定源文件或源设备
  - of=[输出文件] 指定目标文件或目标设备
  - bs=[块字节数] 指定一个块的字节数
  - count=[块个数] 指定输入/输出的块数




## 时间相关


- date [选项]... [+FORMAT]           显示或设定系统的日期与时间
  - 获取日期时间戳：date -d "1970-1-1 时间戳 days"

- cal                                显示日历


- ntpdate [时间服务器域名或ip]    手动同步时间
- service ntpd on
- chkconfig --level 35 ntpd on



## 系统资源

- vmstat [选项] [刷新时延] [刷新次数]      viryual memor statics 显示虚拟内存状态,包括于进程、内存、I/O等系统整体运行状态

- dmesg             用于显示开机信息

- free [选项]              显示内存使用状态,包括实体内存，虚拟交换文件内存，共享内存，系统核心使用的缓冲区

- uptime    显示系统启动到现在的时间和平均负载

- uname [选项]    unix name 显示操作系统信息，如内核版本、主机名、处理器类型等
  - -a 查看所有相关信息
  - -r 查看内核版本
  - -s 查看内核名称

- lsb_release [选项]      查询linux发行版本
  - -v 显示版本信息
  - -i 显示发行版的id
  - -d 显示该发行版的描述信息
  - -r 显示当前系统是发行版的具体版本号
  - -c 发行版代号
  - -a 显示所有信息

- lsof [选项]         列出进程调用或打开的文件
  - -c <进程名> 列出指定进程所打开的文件
  - -p <进程号> 列出指定进程号所打开的文件
  - -u <用户名> 列出某个用户打开的文件


- 查询操作系统位数可用 file /bin/ls 查询外部命令的方式获取

- lsblk           list block devices 列出块设备信息，包括硬盘，闪存盘，cd-ROM


- strace [选项]         跟踪系统调用

## 网络

- write <username> [ttyname]      发送消息给其他在线用户
  - 输入命令后进入输入状态，输入消息后使用 ctrl+d 保存结束发送消息

- wall <message>        write all 发送广播消息给所有其他在线用户

- ping [选项] [主机名或ip]      检测网络连接性(ICMP协议)
  - -c <完成次数> 设置完成要求回应的次数

- ifconfig [网卡名] [ip]            显示或临时设置网络设备

- mail [选项] [邮箱或用户名]        发送邮件


- traceroute [选项] [主机名或ip]  显示数据包到主机间的路径
  - 不是内置命令，需要安装


- netstat   显示网络状态
  - -a或--all 显示所有连线中的Socket
  - -A<网络类型>,--<网络类型> 列出该网络类型连线中的相关地址
  - -c或--continuous 持续列出网络状态
  - -C或--cache 显示路由器配置的快取信息
  - -e或--extend 显示网络其他相关信息
  - -F或--fib 显示路由缓存
  - -g或--groups 显示多重广播功能群组组员名单
  - -h或--help 在线帮助
  - -i或--interfaces 显示网络界面信息表单
  - -l或--listening 显示监控中的服务器的Socket
  - -M或--masquerade 显示伪装的网络连线
  - -n或--numeric 直接使用IP地址，而不通过域名服务器
  - -N或--netlink或--symbolic 显示网络硬件外围设备的符号连接名称
  - -o或--timers 显示计时器
  - -p或--programs 显示正在使用Socket的程序识别码和程序名称
  - -r或--route 显示Routing Table
  - -s或--statistics 显示网络工作信息统计表
  - -t或--tcp 显示TCP传输协议的连线状况
  - -u或--udp 显示UDP传输协议的连线状况
  - -v或--verbose 显示指令执行过程
  - -V或--version 显示版本信息
  - -w或--raw 显示RAW传输协议的连线状况
  - -x或--unix 此参数的效果和指定"-A unix"参数相同
  - 常用：
    -  -an 查看本机所有的网络连接
    -  -rn 查看本机路由表
    -  -tlun 查看本机监听的端口
  
- arp                     查看路由表
- tcpdump [选项] [主机名或ip]  倾倒网络传输数据


- setup       redhat系列独有，启动图形界面进行设置


- service network restart     重启全部网卡
- /etc/init.d/network restart     重启全部网卡
- ifdown 网卡名          停止单个网卡
- ifup 网卡名         开启单个网卡

- hostname [主机名]           显示或临时设置完整主机名(永久设置在配置文件中修改)
  - -f              输出主机名的FQND(Fully Qualified Domain Name)全限定域名

- nmap      网络扫描和嗅探工具


- ss [选项]           获取socket统计信息



- nc [选项] [主机] [端口]     net cat 用于设置路由器






## 进程相关

- ps [选项]               process status,进程状态
  - -e,-A 选择所有进程
  - -f 显示所有选项
  - aux 查看系统中所有进程，使用BSD操作系统格式
  - -le 查看系统中所有进程，使用Linux标准命令格式


- top [选项]              查看进程所占资源的面板
  - -d [秒数] 指定 top 命令的刷新时间间隔，单位为秒
  - -n [次数] 指定 top 命令运行的次数后自动退出
  - -p [进程ID] 仅显示指定进程ID的信息
  - -u [用户名] 仅显示指定用户名的进程信息
  - -H 在进程信息中显示线程详细信息
  - -i 不显示闲置 (idle)或无用的进程
  - -b 以批处理 (batch)模式运行，直接将结果输出到文件
  - -c 显示完整的命令行而不截断
  - -S 累计显示进程的 CPU 使用时间
   显示内容：
    - VIRT(Virtual Memory，虚拟内存)
    - RES(Resident Memory 常驻内存)
    - SHR(shared memory共享内存)

- pstree [选项]     将所有进程以树状图显示
  - -p 显示pid
  - -u 显示所属用户

- kill [选项] [pid]              杀死进程
  - -l 列出所有信号
  - -[信号编号] 使用对应信号的操作，常用：
    - -1 重启
    - -9 强制终止
    - -14 正常终止


- killall [选项] [进程名称]        杀死进程
  - -[信号编号] 使用对应信号的操作

- pkill [选项] [进程名称]        杀死进程
  - -[信号编号] 使用对应信号的操作
  - -t 按照终端号踢出用户


- jobs [选项]       查看后台工作
  - -l 显示pid

- fg [%工作号]      将后台工作恢复到前台终端运行
  - [%工作号] %可以忽略，注意工作号和pid区别

- bg [%工作号]      将后台暂停的工作恢复到后台运行
  - 与前台终端交互的工作是不能后台运行的




## 独立服务

- chkconfig [选项] [服务名] [on/off/reset]          check config 查看或设置系统的各种服务自启动
  - --list 列出所有服务在不同运行级别下的自启动标志
  - --add 增加指定服务到chkconfig的管理下
  - --del 删除指定服务到chkconfig的管理下
  - --level <运行级别(可以连写)> 指定系统服务某运行级别中开启或关闭

- service [独立服务名] [start/stop/restart/status/reload]   启动停止服务(redhat专有)
  - --status-all 查看系统中所有服务运行状态

- /etc/init.d/[独立服务名] [start/stop/restart/status/reload]   启动停止服务

- ntsysv       图形界面管理自启动(redhat专有)


- systemctl [start/stop/restart/status/reload/enable/disable]             system control 对系统服务进行操作，centos7中替代chkconfig和service指令




## 变量

- set [选项]  可以设置shell执行方式
  - 不加选项查看所有变量

- unset [选项] [变量或函数名称]     删除变量或函数
  - -f 仅删除函数
  - -v 仅删除变量

- export      设置或显示环境变量

- env         显示系统中所有的环境变量(不包括本机变量)

- declare [选项] [变量名称＝设置值]
  - <+/->[rxi] 　- 表示设定变量的属性，+ 表示取消变量所设的属性
    - r 只读
    - x 环境变量
    - i 整数值
  - -p 查看变量的被声明的类型
  - -f 显示函数

- source [配置文件]     重新生效环境变量文件
- . [配置文件]     同source命令


## 正则，文件内容截取

- cut [选项] [dir]      以列为单位分隔文件内容并提取
  - -d <分隔符> 自定义分隔符，默认为制表符
  - -f <列号> 提取的列号，需要搭配其他选项
  - -c 以字符为单位进行分割
  - -b 以字节为单位进行分割,这些字节位置将忽略多字节字符边界，除非指定 -n 选项
  - -n 取消分割多字节字符


- grep [options] pattern [files]     global regular expression 用于查找并显示文件里符合模式匹配的行
  - -i 忽略大小写
  - -v 反向查找，只显示不匹配的行


- awk '条件1{动作1}条件2{动作2}...' 文件名        对文本进行较复杂格式处理
  - 条件：
    - BEGIN 处理之前执行的语句，可以修改内置变量分隔符
    - END 处理之后执行的语句

  - 动作：
    - printf 格式化输出，其中$n表示第n列



- sed [选项] '[动作]' 文件名      
  - 选项：
    - -n 只把经过sed命令处理的行输出到屏幕(一般会将所有数据输出到屏幕)
    - -e 允许对输入数据应用多条sed命令编辑
    - -i 用sed修改结果直接修改读取数据的文件，而不是输出的到屏幕
  - 动作：
    - a 新增
    - c 取代
    - d 删除
    - i 插入
    - p 打印
    - s 取代，可以使用<n1,n2>s/oldStr/newStr/g 


## 输入输出


- read [选项] [读入变量]        读入字符串
  - -p <提示信息> 输入时的提示信息
  - -t <秒数> 指定读取值时等待的时间
  - -a <数组名> 将输入值读入数组
  - -n <数量> 读入的字符数

- echo [输出的变量或字符串]...    输出字符串


- printf ['输出格式'] 输出内容        格式化的输出

- clear     清屏



## 历史命令

- history [选项] [历史命令保存文件]
  - -c 清空历史命令
  - -w 把缓存中的历史命令写入历史命令保存文件~/.bash_history


- ![n]        重复执行第n条历史命令
- !!          重复执行上一条历史命令
- ![字串]     重复执行上一条以字串开头的命令



## 计划任务

- crontab [选项]          周期性执行计划任务
  - -u [用户名] 操作对应用户的计划，不加则为当前用户
  - -l 列出计划列表
  - -e 编辑计划任务
  - -r 删除计划任务

每行是一条任务,任务格式：
分 时 日 月 周 需要执行的命令

设定时间可以使用的符号
- * 取值范围内的所有数字
- / 每过多少个数字
- - 区间
- ，列举



- at [选项] 时间        一次性定时任务
  - -l 显示待执行任务的列表，atq命令别名
  - -f 指定包含具体指令的任务文件
  - -q 指定新任务的队列名称
  - -d 删除指定的待执行任务，atrm别名
  - -m 任务执行完成后向用户发送E-mail



- atq           列出所有一次性定时任务
- atrm [任务号]         删除执行一次任务



## 防火墙
iptables   centos6
firewalld   centos7







## 别名
- alias[别名]=[指令名称]      临时设置指令的别名
  - 不加参数列出所有别名

- unalias [选项] [别名]     删除别名
  - -a 删除所有别名

别名映射文件: ~/.bashrc
用户重新登录后生效


命令执行时的查询顺序：
1.绝对路径或相对路径对应指令
2.别名
3.bash内部命令
4.$PATH环境变量定义的目录查找顺序找到的第一个命令




## 输出重定向

文件描述符fd：0(标准输入)、1(标准输出)、2(标准错误输出)
标准写法： fd>dir ,文件描述符和重定向符之间不能有空格，和文件路径之间空格可有可无

- command > dir         覆盖方式把命令的正确输出输出到文件
- command >> dir        追加方式把命令的正确输出输出到文件
- command 2> dir         覆盖方式把命令的错误输出输出到文件
- command 2>> dir        追加方式把命令的错误输出输出到文件

- command &> dir            覆盖方式把命令的正确和错误输出同时输出到文件
- command &>> dir            追加方式把命令的正确和错误输出同时输出到文件

- command > dir 2>&1        覆盖方式把命令的正确和错误输出同时输出到文件
- command >> dir 2>&1        追加方式把命令的正确和错误输出同时输出到文件

- command 1> dir1 2> dir2        覆盖方式把命令的正确和错误输出输出到不同文件
- command 1>> dir1 2>> dir2      追加方式把命令的正确和错误输出输出到不同文件

## 多命令

- ; 顺序执行
- && 逻辑与，表示前项命令正确执行才会执行后项命令
- || 逻辑或，表示前项命令错误执行才会执行后向命令

- command1 && command2 || command3 命令1正确执行则执行命令2，否则执行命令3

- | 管道符，将前项命令的正确输出作为后项命令的操作对象(前面命令错误执行则不会执行后项命令)

- 行尾加 & 表示将任务放到后台进行

## 日志

- logrotate [选项] [配置文件]      手动进行日志轮替
  - -v 显示日志轮替过程
  - -f或–force 　强行启动记录文件维护操作


## 备份

- dump [选项] [原文件]     备份
  - -[0-9] 指定备份等级，0表示完全备份，其他自上次n-1级备份以来的增量备份
  - -f <文件名> 备份后的文件名
  - -u 备份成功后，将备份时间记录在/etc/dumpdates文件中
  - -j 调用bzlib库压缩备份文件，压缩为.bz2格式
  - -W 查询被dump的分区的备份等级和备份时间

- restore [模式] [选项]      还原
  - 模式：
    - -C 比较备份数据和实际数据变化
    - -i 进入交互模式，手工选择需要恢复的文件
    - -t 查看模式，用于查看备份文件中拥有的数据
    - -r 还原模式，还原数据
  - 选项：
    - -f 指定备份文件文件名



## 文件信息

长格式显示的信息

- --- --- ---

一共10位 

第1位表示文件类型:
- - 普通文件
- d 目录
- l 软链接(符号链接)
- c 字符设备文件
- b 块设备文件
- s 套接字文件
- p 管道文件

第2-10位，前中后依次表示所有者、初始组、其他用户的权限
可选值为：
r 读取权限
w 写入权限
x 执行权限
- 没有对应权限


文件颜色含义：
- 蓝色，代表目录类型
- 白色，代表一般性文件
- 浅蓝色，代表链接类型
- 绿色，代表可执行文件
- 红色，代表压缩文件
- 黄色，代表设备文件
- 灰色，代表其他文件
- 红色闪烁，代表链接的文件有问题











## 软件包管理

1. rpm

rpm软件包 包全名 格式：
包名-版本号-软件发布次数.适合的linux平台.适合的硬件平台.rpm


- rpm             redhat package manager
  - -i <包全名>,--install <包全名> 安装指定的包
  - -v 显示执行过程
  - -h,--hash 安装时显示"####"进度条
  - -U<包全名>或–upgrade<包全名> 升级指定的包
  - -e<包名>,--erase<包名> 　删除包
  - --nodeps 不验证包的相互关联性
  - -q 使用询问模式，当遇到任何问题时，rpm指令会先询问用户  ???
  - -a 查询所有包全名
  - -i 显示包的相关信息
  - -p 查询未安装包的信息
  - -l 显示包安装的文件列表
  - -f<系统文件名> 查询拥有指定文件的包
  - -R 显示包的依赖信息
  - -V<已安装的包名> 校验包文件是否被修改

常规用法：
- rpm -ivh <包全名>  安装
- rpm -Uvh <包全名>  升级
- rpm -e <包名>  删除
- rpm -q <包名>  查询包是否安装
- rpm -qa     查询所有安装过的包
- rpm -qi <包名>  查询已安装包的相关信息
- rpm -qip <包全名>  查询未安装包的相关信息
- rpm -ql <包名>  查询包安装的文件列表
- rpm -qlp <包全名>  查询未安装包期望安装的文件列表
- rpm -qf <系统文件名> 查询系统文件所属的包
- rpm -qR <包名>  查询已安装的包的依赖包
- rpm -qRp <包全名>  查询未安装的包的依赖包
- rpm -V <已安装的包名> 检验包的文件是否被修改








2. yum

- yum [选项] [操作] [包名]      Yellow dog Updater, Modified
  - 选项：
    - -y 安装过程提示选择全部为 "yes"
    - -q 不显示安装的过程
  - 操作：
    - list
    - search
    - install

- yum list        查询所有可以安装的包
- yum search <包名>     查询关键字相关的包
- yum -y install <包名>     安装包
- yum -y update <包名>     升级包(注意不加包名表示升级所有包，包括内核)
- yum -y remove <包名>     卸载包
- yum grouplist           查询可以使用的软件组
- yum groupinstall <软件组名>       安装软件组(注意组名中有空格需要"包裹)
- yum groupremove <软件组名>        卸载软件组




## 常用快捷键

ctrl + A 光标移动到行首
ctrl + E 光标移动到行尾
ctrl + C 强制终止当前命令
ctrl + U 剪切光标前所有内容
ctrl + K 剪切光标后所有内容
ctrl + Y 粘贴
ctrl + R 在历史命令中搜索
ctrl + D 退出终端
ctrl + Z 暂停并放入后台
ctrl + S 暂停屏幕输出
ctrl + Q 恢复屏幕输出
ctrl + L 清屏



## 远程文件传输软件
filezilla 可视化,需要安装vsftpd服务
pscp 命令行

Winscp



## SELinux
- seinfo
- sesearch
- getsebool
- setsebool
- semanage


## 实用软件(需安装)


- rsync [source...] [destination]     remote sync  在本地计算机与远程计算机之间，或者两个本地目录之间同步文件,最大特点是会检查发送方和接收方已有的文件，仅传输有变动的部分（默认规则是文件大小或修改时间有变动）

- inotify-tools 文件系统变化监测的工具

- ipvsadm         IP Virtual Server admin，ipvs应用层管理软件



## 未学

- ulimit shell内建指令，可用来控制shell执行程序的资源
  -n <文件数目> 指定同一时间最多可开启的文件数


- source <filename>  用于重新执行刚修改的初始化文件，使之立即生效，而不必注销并重新登录，也可以用一个点符号.代替


- curl
  - -A，--user-agent <代理名>	设置用户代理(也就是浏览器)发送请求
  - -H <header> 设置附加的请求头，如Host

- wget




- ab            apache benchmarking tool 服务器性能测试工具
  - 需要安装：yum -y install httpd-tools

- openssl


- links
- httpie








