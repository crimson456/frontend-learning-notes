# Git Learning


## 基本概念


1. 分区：
   workspace(工作区)
   index、stage(暂存区)
   repository(仓库区)
   remote(远程仓库)
   

2. 项目文件：
    - .git 骨干文件夹
    - .gitignore 管理忽略文件（子目录下也可以有） glob模式单行书写
        



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

    - `git config [--{system|global|local}] <config-name> <config-value>` 修改一个配置文件下配置项
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
    - `git add <file-url>` 添加或修改文件入暂存区（追踪track）

5. 删除文件
    - `git rm [-f] [--cached] <file-url> `删除工作区和暂存区的指定文件
        - `-f`强制删除，要删除修改过的文件需添加
        - `--cached`删除暂存区，保留工作区

6. 移动文件
    - `git mv <file_from> <file_to>` 移动工作区和暂存区中的文件文件


7. 对比差异
    - `git diff` 对比工作区和暂存区
    - `git diff <--{staged|cached}>` 对比暂存区和仓库中的最后一次提交
        >staged和cached同义

8. 提交
    - `git commit [-m <message>] [-a]` 进入vim编辑器编辑提交信息并提交(退出方法esc退出编辑模式，输入`:q!`回车)
      - `-m <message>` 以message为提交信息提交
      - `-a` 跳过add命令，将所有跟踪的文件添加入暂存区并提交（新建的文件不会加入）



9. 查看提交历史记录
    - `git log [options]`查看提交的历史记录
        `options`包括：
        - `-number`限制数量
        - `-p|--patch`显示更改差异
        - `--{stat|shortstat}`显示统计、简短统计
        - `--pretty={oneline|short|full|fuller|format:""}`更改日志显示格式，其中oneline为单行显示，format可以添加规则自定义显示
        - `--graph`左侧添加一些字符来表示分支合并历史
        - `--name-{only|status}`显示更改|及更改方式的文件列表
        - `--abbrev-commit`仅显示 SHA-1 校验和所有 40 个字符中的前几个字符？
        - `--relative-date`显示为相对时间
        - `--oneline`为`--pretty=oneline --abbrev-commit`简写
        - `--{since|after}="xxxx-xx-xx"`仅显示指定时间之后的提交
        - `--{until|before}="xxxx-xx-xx"`仅显示指定时间之前的提交
        - `--author=""`限制作者
        - `--committer=""`限制提交者
        - `--grep=""`限制提交说明(message)中包含指定字符串
        - `-S`仅显示添加或删除内容匹配指定字符串的提交？
        - `--no-merges`隐藏合并提交
















`git clone <url>`拉取对应地址的仓库代码作为当前文件项目

`git clone <url> <project-name>`拉取对应地址的仓库代码到当前目录下的指定项目文件下


