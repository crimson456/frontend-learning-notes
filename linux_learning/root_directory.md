


- /   根目录：根目录，文件的最顶端，整个文件系统的根目录


## / 根目录
- /root  超级管理员家目录
- /bin   binary 二进制文件，里面存放常用的命令
- /sbin  super binary 系统二进制文件，存放超级权限用户root的系统管理命
- /home  存放用户的家目录，通常用 ~ 来表示家目录
- /dev  device 设备文件，包括终端设备、USB或连接到系统的任何设备
- /etc   etcetera 配置文件,包含所有程序所需的配置文件和用于启动/停止单个程序的启动和关闭shell脚本，必须是静态的，不能是可执行二进制文件

- /var  variable 变量文件，包含系统在其运行过程中写入的数据文件，如系统日志文件、邮件和打印机假脱机目录，以及临时文件和临时文件夹
- /tmp  temporary 临时文件，包含系统和用户创建的临时文件，当系统重新启动时，这个目录下的文件都将被删除
- /usr   Unix Software Resource，系统然间资源目录
- /mnt   mount 挂载目录，临时安装目录，系统管理员可以挂载文件系统
- /media  挂载目录,挂载媒体设备如软盘、光盘
- /misc  挂载目录，挂载NFS服务的共享目录
- /boot  包含引导加载程序相关的文件，内核的initrd、vmlinux、grub文件位于/boot下，空间用于启动，如果存满会导致无法启动
- /lib  library 库文件目录，包含支持位于/bin和/sbin下的二进制文件的库文件
- /lost+found  用于存放系统崩溃、意外关机产生的文件碎片，每个分区都会有此文件
- /opt  optional 附加应用程序安装在/opt/或者/opt/的子目录下。手工安装的源码包软件也可以放在此目录中，也可以放在/usr/local/目录下
- /proc  process 进程信息,此目录中的数据保存在内存中
- /sys 虚拟文件系统,此目录中的数据保存在内存中

/run run-time
/srv service



## /root 管理员家目录
- /root/install.log 安装在系统中的软件包及版本
- /root/install.log.syslog 安装过程中的事件记录
- /root/anaconda-ks.cfg 记录安装过程中的配置选项，用于无人值守安装

## /etc 配置相关

- /etc/passwd 文件内每一行表示一个用户，格式：
    用户名：密码：UID：GID：备注：家目录：登录后的解释器shell
    密码一般为x，表示占位，密码加密后放在/etc/shadow文件中
    UID：0表示root，1-499表示系统用户，500-65535表示普通用户

- /etc/shadow 用户密码加密后存放在此文件中,格式：
    用户名：加密密码：创建时间戳：修改密码的时间间隔：密码有效期：密码到期前的警告天数：密码到期后的宽限天数：账号的失效时间
    加密密码： !! 或 * 表示没有密码不能登录
    时间戳：1970年1月1日到现在的日期数的时间戳
    获取时间戳的命令：date -d "1970-1-1 时间戳 days"

- /etc/group 文件内每一行表示一个用户组，格式：
    用户组名：密码：GID：组中附加用户

- /etc/gshadow 用户组密码加密后存放在此文件中,格式：
    组名：组密码：组管理员用户名：组中附加成员

- /etc/skel 新用户家目录的模板目录

- /etc/default/useradd  保存添加用户时家目录等的默认值的文件

- /etc/login.defs  保存添加用户时密码相关的默认值的文件

- /etc/fstab    文件系统(如内存、磁盘分区)的挂载信息，格式：
  UUID或设备文件名


- /etc/inittab  init指令的配置文件，系统启动时的运行级别
    配置文件中不能使用0和6作为默认运行级别



- /etc/sysconfig/network-scripts/ifcfg-[网卡名称] 网卡配置文件
    ONBOOT：开机自启动
    BOOTPROTO：启动协议，ip分配协议
    HWADDR：硬件地址，MAC地址

- /etc/sysconfig/network 主机名的配置文件

- /etc/hosts 本地DNS配置文件

- etc/yum.repos.d                           yum源配置文件存放地址，下面的.repo文件都是yum源，修改后缀可以让yum源失效
- etc/yum.repos.d/CentOS-Base.repo          默认yum源配置地址(网络yum源)
    [base]      容器名称
    name        容器说明
    mirrorlist          镜像站点(可被注释)
    baseurl             yum源服务器地址
    enabled             容器是否生效(不写默认生效)
    gpgcheck            RPM的数字证书是否生效
    gogkey              公钥文件保存地址
- etc/yum.repos.d/CentOS-Media.repo         媒体yum源(光盘yum源)


- /etc/rc.d/init.d          服务的可执行文件位置
- /etc/init.d               启动脚本存放目录。将源码包的启动脚本软链接到此处就可以让服务被service命令识别，指定特定注释后可以被chkconfig命令识别
- /etc/sysconfig            初始化环境配置文件位置
- /etc/xinetd.conf            xinetd配置文件
- /etc/xinetd.d               基于xinetd服务的启动脚本存放目录

- /etc/re.local             /etc/rc.d/rc.local的软链接
- /etc/rc.d/rc.local        此处写的脚本每次重启都会执行，可以用于脚本执行服务自启动


- /etc/cron.deny 禁用计划任务的用户名单
- /etc/cron.allow 允许计划任务的用户名单(白名单优先级更高)
- /etc/cron.[hourly/daily/monthly/weekly]/ 存放每隔对应时间执行的脚本
- /etc/cron.d/ 存放用户自定的全局定时任务时间表，一般在此处编写任务表
- /etc/crontab 系统定时任务文件，一般不在此处更改
- /var/spool/cron 通过crontab命令添加的定时任务会以添加的账号命名放在此目录下

- /etc/at.allow       at任务白名单，优先级高于黑名单
- /etc/at.deny          at任务黑名单



- /etc/sudoers sudo命令配置文件
  文件中主要是对别名书写形式的解释和授权语句的示例
  其中重要的两行配置格式：(授权命令一般使用绝对路径)
  用户名 被管理的主机地址=(可用身份) 授权命令(绝对路径)
  %组名 被管理的主机地址=(可用身份)  授权命令(绝对路径)
  授权命令前加 ! 表示不授权




- /etc/profile 全局的shell配置文件，用于设置系统中所有用户的环境变量和初始配置，其中包括有历史命令的最大保存条数
- /etc/profile.d/*.sh 
- /etc/bashrc    包括nologin_shell时的环境

- /etc/issue 本地终端登录前显示信息，此处可用一些转义
- /etc/issue.net 远程终端登录前显示信息，此处不能用转义字符
- /etc/ssh/sshd_config 
  - Banner /etc/issue.net 此行配置后使远程终端登录前显示信息生效
- /etc/motd 登录后的显示信息

- /etc/rsyslog.conf     日志配置文件，基本格式：
    服务名称[连接符号]日志等级           日志记录位置

- /etc/logrotate.cof      日志轮替配置文件


- /etc/rc.d/rc.sysinit              系统初始化
- /etc/rc.d/rc          根据传入的运行级别执行/etc/rc[0-6].d中程序的脚本
- /etc/rc[0-6].d        不同运行级别下顺序启动(K开头)和关闭(S开头)的程序


- /etc/dumpdates     备份记录

## /dev 硬件文件
- /dev/hd[a-t] IDE设备(硬盘)
- /dev/sd[a-z] SCSI设备(硬盘)/SATA/USB硬盘
- /dev/fd[0-7] 标准软驱(软盘)
- /dev/lp[0-2] 打印机(25针)
- /dev/usb/lp[0-15] 打印机(USB)
- /dev/mouse 鼠标
- /dev/sr[n] 光驱
- /dev/cdrom 光驱

- /dev/stdin 标准输入(键盘)
- /dev/stdout 标准输出(显示器)
- /dev/stderr 标准错误输出(显示器)


/dev/md[0-31] 软raid设备
/dev/loop[0-7] 本地回环设备
/dev/ram[0-15] 内存
/dev/null 无限数据接收设备 ,相当于回收站
/dev/zero 无限零资源
/dev/tty[0-63] 虚拟终端
/dev/ttyS[0-3] 串口
/dev/lp[0-3] 并口
/dev/console 控制台
/dev/fb[0-31] framebuffer
/dev/agpgart agp接口设备


分区：
- / 根分区
- swap分区(内存2倍，且不超过2GB)

- /boot (启动分区,留存防止硬盘写满无法启动,200MB，且/boot分区分区号一定在最前一般sda1)


逻辑分区号永远从5开始









## /usr
/usr/bin            RPM包可执行命令安装位置
/usr/sbin

/usr/lib            RPM包所使用的函数库保存位置
/usr/share/doc      RPM包基本软件使用手册保存位置
/usr/share/man      RPM包帮助文件保存位置

/usr/local/软件名   源码包安装位置
/usr/local/src      源码保存位置




## /proc
/proc/cpuinfo   cpu信息
/proc/divices   设备驱动列表
/proc/filesystems   文件系统列表
/proc/net   网络协议信息

## /var 可变文件 日志、邮件、临时文件

/var/lib  服务产生的数据存放位置

/var/lib/mlocate/mlocate.db  locate命令使用的文件数据库

/var/spool/mail/[用户名]  用户的邮件存储位置

/var/spool/at   at指令一次性计划任务存放目录



- /var/log    日志存放位置，包括RPM包的日志
- /var/log/cron       系统定时任务相关信息
- /var/log/cups       打印信息的日志
- /var/log/dmesg      启动信息的日志
- /var/log/btmp       错误登录日志，二进制文件，不能vi查看，而通过lastb命令查看
- /var/log/lastlog    记录所有用户的登录时间的日志，二进制文件，不能vi查看，而通过lastlog命令查看
- /var/log/mailog     邮件信息
- /var/log/message    系统重要信息日志
- /var/log/secure     记录验证和授权的信息，只要涉及账户密码的程序都会记录
- /var/log/wtmp       永久记录所用用户的登录、注销信息，同时记录系统启动重启关机事件，二进制文件，不能vi查看，而通过last命令查看

- /var/log/httpd      apache服务的默认日志
- /var/log/mail       邮件服务的额外日志
- /var/log/samba      samba服务的日志
- /var/log/sssd       守护进程安全服务的日志

- /var/run/utmp       记录当前已经登录的用户信息，二进制文件，不能vi，通过w、who、users命令查看


基本日志格式：依顺序为
  事件产生时间
  发生事件服务器的主机名
  发生事件的服务名或程序名和进程号
  事件具体信息


- /var/spool/at at命令任务存放位置

## /home 用户家目录


- ~/.bashrc
- ~/.bash_profile

- ~/.bash_logout 注销时生效的环境变量配置文件
- ~/.bash_history 历史命令保存文件

## /boot 启动分区

- /boot/grub/grub.conf        系统引导配置文件
    default         默认启动的系统
    timeout         等待时间，默认5秒
    splashimage     grub启动时背景图像文件保存位置(grub中分区位置写法不同)
    hiddenmenu      隐藏菜单
    title           标题
    root            启动程序的保存分区
    kernel          内核加载时的选项
    initrd          指定initramfs内存文件系统镜像文件所在位置



##
##
##
##
##
##
##
## 需要备份的目录
系统：
- /root
- /home
- /var/spool/mail
- /etc
- 其他目录

apache:
- 配置文件
- 网页主目录
- 日志


源码包mysql：
- /usr/local/mysql/data
RPM包mysql：
- /var/lib/mysql





