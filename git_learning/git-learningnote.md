# Git Learning


## 基本概念


1. 分区：
   workspace(工作区)
   index、stage(暂存区)
   repository(仓库区)
   remote(远程仓库)
   

2. 项目文件：
    - .git 骨干文件夹
    - .gitignore 管理忽略文件（子目录下也可以有）
        



## 常用命令
>说明:`<>`表示必选,`[]`表示可选,`{|}`表示必须多选一






1. 配置
   
    - 说明:git配置文件包括三个地方:(相同配置向上覆盖)
        1. 安装目录下的`/etc/gitconfig`,通用配置(`--system`)
        2. 用户根目录下的`.gitconfig`或`.config/git/config`,全局配置(`--global`)
        3. 项目目录下的`.git/config`,当前仓库设置(`--local`)
    



    - `git config --list [--show-origin]` 获取所有配置项信息  （出现END后按q键退出）

    - `git config <config-name> [--show-origin]` 获取对应配置项信息
        `--show-origin`选项表示显示所对应配置文件位置

    - `git config --{system|global|local} <config-name> <config-value>` 修改一个配置文件下配置项
        可用配置项(config-name):
        - user.name 用户名
        - user.email 邮箱
        - core.editor 文本编辑器


2. 获取帮助
    - `git help <verb>`、`git <verb> --help`、`man git-<verb>` 打开一个命令手册文档
        可用verb:
        - config
        - add

    - `git <verb> -h` 打印简易的配置说明





3. 创建仓库

    - `git init`以当前目录初始化一个git仓库(创建`.git`文件夹) 

    - `git init <project-name>`新建一个项目名的文件夹并初始化为git仓库



4. 添加文件
    - `git status [-s|--short]` 查看当前项目内的文件状态
        `-s|--short`选项表示缩略形式
    - `git add <file-name>` 添加或修改文件入暂存区（追踪track）



5. 对比差异
    - `git diff` 对比工作区和暂存区
    - `git diff --{staged|cached}` 对比暂存区和仓库中的最后一次提交


6. 提交
    - `git commit` 进入vim编辑器编辑提交信息并提交(退出方法esc退出编辑模式，输入`:q!`回车)
    - `git commit -m <message>` 以message为提交信息提交



    
`git clone <url>`拉取对应地址的仓库代码作为当前文件项目

`git clone <url> <project-name>`拉取对应地址的仓库代码到当前目录下的指定项目文件下


