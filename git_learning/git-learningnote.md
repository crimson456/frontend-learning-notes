# Git Learning


## 基本概念


1. 分区：
   workspace(工作区)：不包括untracked的文件
   index、stage(暂存区)
   repository(仓库区)
   remote(远程仓库)
   

2. 项目文件：
    - .git 骨干文件夹
    - .gitignore 管理忽略文件（子目录下也可以有） glob模式单行书写
        



## 命令总结
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

    - `git config --global alias.<neckname> <command>` 为命令设置别名(设置完成后`git <neckname>`就相当于`git <command>`)
    - `git config --global alias.<neckname> <!command>` 将外部命令设置为git别名



2. 获取帮助
    - `git help <verb>`、`git <verb> --help`、`man git-<verb>` 打开一个命令手册文档
        可用verb:
        - config
        - add

    - `git <verb> -h` 打印简易的配置说明





3. 创建仓库

    - `git init`以当前目录初始化一个git仓库(创建`.git`文件夹) 

    - `git init <project-name>`新建一个项目名的文件夹并初始化为git仓库



4. 查看文件状态
    - `git status [-s|--short]` 查看当前项目内的文件状态
        `-s|--short`选项表示缩略形式


5. 添加文件到暂存区
    - `git add <file-url>` 添加或修改文件入暂存区（追踪track）

6. 删除文件
    - `git rm [-f] [--cached] <file-url> `删除工作区和暂存区的指定文件
        - `-f`强制删除，要删除修改过的文件需添加
        - `--cached`删除暂存区，保留工作区

7. 移动文件
    - `git mv <file_from> <file_to>` 移动工作区和暂存区中的文件文件


8. 对比差异
    - `git diff` 对比工作区和暂存区
    - `git diff <--{staged|cached}>` 对比暂存区和仓库中的最后一次提交
        >staged和cached同义

9. 提交
    - `git commit [-m <message>] [-a] [-S [keyid]]` 进入vim编辑器编辑提交信息并提交(退出方法esc退出编辑模式，输入`:q!`回车)
      - `-m <message>` 以message为提交信息提交
      - `-a` 跳过add命令，将所有跟踪的文件添加入暂存区并提交（新建的文件不会加入）
      - `-S [keyid]` 用gpg密钥签名提交



10. 查看提交历史记录
    - `git log [options]`查看提交的历史记录
        `options`包括：
        - `--all`查看所有提交日志(默认为只看当前分支链上的)
        - `-<number>`限制数量
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
        - `-S <pattern>` 显示添加和删除内容匹配指定字符串的提交
        - `-L` 显示行日志搜索,可以展示代码中一行或者一个函数的历史
        - `--no-merges`隐藏合并提交
        - `--decorate`显示各个分支指向的提交历史
        - `--show-signature`查看并验证签名





11. 修改提交
    - `git commit --amend [--no-edit]` 提交后进行一些修改后使用这个命令修改上一次提交(只会提交一次)，默认会进入编辑器模式修改提交的提示信息
        - `--no-edit`不进入编辑器模式，不修改提示信息

12. 撤销暂存区的文件
    - `git reset HEAD <file-url>`取消暂存区的文件，工作区不受影响

13. 从暂存区到工作区
    - `git checkout -- <file-url>` 撤销工作区文件的修改（从暂存区），但是不会删除未跟踪的文件

14. 查看当前项目的远程仓库
    - `git remote [-v]` 查看当前项目远程仓库的别名
      - `-v` 显示仓库url

15. 查看某一个远程仓库的详细信息
    - `git remote show <remote>`




16. 添加远程仓库
    - `git remote add <shortname> <url>` 添加远程仓库的别名和url
    - `git remote rename <old-shortname> <new-shortname>` 更改远程仓库的别名
    - `git remote {remove|rm} <shortname>` 移除远程仓库

17. 获取远程仓库中所有分支
    - `git fetch <remote>` 获取远程仓库中所有分支
    - `git fetch --all` 获取所有远程仓库

18. 推送到远程仓库的分支上
    
    - `git push <remote> <branch>`推送分支到远程的同名分支上
    - `git push <remote> <localbranch:remotebranch>`指定本地分支推送到一个远程分支

    - `git push -u <remote> <localbranch:remotebranch>` 指定本地分支推送到一个远程分支,并将此远程分支设为上游分支

19. 标签
    - `git tag [-l|--list]` 查看所有标签列表
    - `git tag {-l|--list} <tagname>` 查询标签

    - `git tag {-a|-s|-u<keyid>} <tagname> -m <message>`创建附注标签或签名标签
        - `-a`表示创建附注标签
        - `-s`表示用默认签名创建签名标签
        - `-u<keyid>`用对应签名创建签名标签

    - `git show <tagname>` 查看标签详细信息
    - `git tag <tagname>` 创建轻量标签
    - `git tag -a <tagname> <校验和或部分校验和>` 为之前提交的版本添加标签
    - `git push <remote> <tagname>` 推送标签
    - `git push <remote> --tags` 推送所有标签
    - `git tag -d <tagname>` 删除本地标签
    - `git push <remote> :refs/tags/<tagname>` 同步删除的标签到远程仓库
    - `git push origin --delete <tagname>` 同步删除的标签到远程仓库


20. 分支
    - `git branch [-v] [-vv] [--merged|--no-merged]` 显示所有分支(`*`为HEAD指针指向)
        - `-v` 显示每个分支最后一次提交的信息
        - `-vv` 显示每个分支最后一次提交的信息和与上游分支的对比信息
        - `--merged|--no-merged` 只显示已合并或未合并到当前分支的分支
    - `git branch {--merged|--no-merged} {branchname|commit}` 显示一个分支或一次提交已合并或未合并的分支

    - `git branch <newbranchname>` 创建分支
    - `git checkout <branchname>` 切换分支
        - 如果branch不存在，且恰好只有一个同名的远程分支，则创建一个该远程分支的跟踪分支
    - `git checkout -b <newbranchname>` 创建并切换分支
    - `git checkout -b <newbranchname> <startpoint>` 创建并切换分支,且设置此分支的起点
        - `startpoint` 作为分支起点的提交，某一次提交的id(校验和)或分支名或者标签名
    - `git merge [-Xignore-all-space|-Xignore-space-change] <branchname>` 合并分支到当前分支
        - -Xignore-all-space 完全忽略空白的改变（如不同的换行符）
        - -Xignore-space-change 将一个空白符与多个连续的空白字符视作等价

    - `git branch -d <branchname>` 删除已合并分支
    - `git branch -D <branchname>` 强制删除分支
    - `git mergetool` 打开图形化工具解决合并冲突


21. 远程分支
    - `git ls-remote <remote>`
    - ``
    - ``
    - ``
    - `git checkout -b <branch> <remote>/<branch>` 创建一个远程分支的跟踪分支
    - `git checkout --track <remote>/<branch>` 创建一个远程分支的同名跟踪分支
    - `git branch -u <remote>/<branch>` 为当前分支设置上游分支
    - `git merge {@{u}|@{upstream}}` 合并上游分支
    - `git push <remote> --delete <branch>`删除远程分支

    - `git pull` 从当前分支的上游分支抓取数据并合并



22. 变基
    - `git rebase <branch>`将当前分支变基到另一分支上(一般为主分支)

    - `git rebase --onto <branch1> <branch2> <branch3>` 将分支branch3中不属于branch2的提交变基到branch1分支上  

    - `git rebase <branch1> <branch2>`将分支branch2变基到分支branch1上


    - `git pull --rebase` 从当前分支的上游分支抓取数据并将当前分支变基到这个上游分支上

    - `git rebase <-i> <branch>`交互式的变基，一般branch为祖先分支，用于修改历史提交
        如`git rebase -i HEAD~3`

23. 克隆
    - `git clone -o <remotename>`拉取远程仓库代码并将远程仓库命名(默认为origin)
    - `git clone <url>`拉取对应地址的仓库代码作为当前文件项目
    - `git clone <url> <project-name>`拉取对应地址的仓库代码到当前目录下的指定项目文件下








git show {branch|tag|commitID} 查看一次提交的全部信息




`git rev-parse {branch|tag}` 查看对应分支或标签最后一次提交的commitID


整理：


`git reflog` 来查看引用日志
引用日志：HEAD指针的指向变化就会触发日志





`git show HEAD@{n}` 

HEAD@{n}：HEAD指针的前n次指向

`git show <branch>@{yesterday}` 

`git show <branch>@{2.months.ago}` 



祖先级：


`git show HEAD^` 查询HEAD指针指向提交的第一个父提交

`git show HEAD~` 查询HEAD指针指向提交的第一个父提交
    ^和~可以连续使用，组合使用

`git show HEAD^n` 查询HEAD指针指向提交的父提交中的第n个提交,只有合并的提交会有多个父提交

`git show HEAD~n` 查询HEAD指针指向提交的父提交中的连续n个第一个提交






25. 区间:

    - `git log branch1..branch2` 查看在branch2中而不在branch1中的提交

    - `git log ^branch1 branch2` 查看在branch2中而不在branch1中的提交
        ^ 放在前面表示不在此分支之中，可重复使用

    - `git log branch2 --not branch1` 查看在branch2中而不在branch1中的提交
        --not 放在前面表示不在此分支之中，可重复使用？


    - `git log [--left-right] branch1...branch2` 查看两个分支中各自独有的提交（略去共有）
        --left-right 显示提交是属于左边(branch1)还是右边(branch2)



交互式暂存工具：

git add {-i|--interactive} 开启交互式暂存工具




26. 贮藏：贮藏默认只会存储当前工作区和暂存区的修改


    - `git stash [push] [--keep-index] [-u|--include-untracked] [-a|--all] [--patch]` 将上一次提交到现在的已跟踪的(工作区和暂存区)文件改动推送到贮藏栈上，并恢复到上一次提交，工作区和暂存区为空
      - `push` 可加可不加，默认行为
      - `--keep-index` 保留暂存区中的内容
      - `-u|--include-untracked` 将未跟踪文件也推送到贮藏栈上(不包括忽略文件)
      - `-a|--all` 将所有文件都推送到贮藏栈上包括未跟踪的文件和忽略文件
      - `--patch` 交互式选择要贮藏的改动和要保留的内容
    - `git stash list` 常看贮藏栈


    - `git stash {pop|apply} [--index] [stash@{n}]` 从贮藏栈应用一项到当前工作目录
      - pop会移除贮藏栈中对应贮藏，apply不会
      -     stash@{n}表示应用贮藏栈的第几项，不加则为第一项
      -     --index 表示同时尝试恢复暂存区的修改
        >注意`git stash pop`、`git stash apply`默认都只会将修改恢复，但存储到贮藏栈的暂存信息不会恢复


    - `git stash drop stash@{n}`移除一次指定贮藏

    - `git stash branch <branch> [stash@{n}]` 从贮藏栈取出一项贮藏并根据创建贮藏时的提交创建一个分支并将贮藏应用在此分支上


    - `git clean [-f|--force] [-d] [-n|--dry-run] [-i|--interactive] [-x|-X]` 清除未追踪的文件（不包括目录，目录中的文件默认不会递归清除）（忽略文件中规定的文件不会被清除）
        - `-f|--force`强制清除
        - `-d` 递归清除未追踪的目录内部，包括目录本身
        - `-n|--dry-run` 进行一次模拟清除，打印输出要清除的文件
        - `-i|--interactive` 以交互模式运行
        - `-x` 包括忽略文件中规定的文件
        - `-X` 只删除忽略文件中规定的文件





gpg --gen-key

gpg --list-keys


git config --global user.signingkey <keyid>

`git tag -v <tagname>` 用gpg密钥验证标签

`git merge [--verify-signatures] [-S [keyid]] <branchname>` 
    - `--verify-signatures`检查并拒绝没有携带可信GPG签名的提交
    - `-S [keyid]` 用gpg密钥签名合并后新生成的提交








搜索:



git grep [-n|--line-number] [-c|--count] [-p|--show-function] <pattern> <dirctory>
    - `pattern` 匹配的内容（可用glob正则）
    - `dirctory` 要查询的文件（可用glob正则）
    - `-n|--line-number` 输出对应行
    - `-c|--count` 输出对应文件和出现次数
    - `-p|--show-function` 输出每一个匹配的字符串所在的方法或函数
    - 还有更多精细操作查文档













回退：
对比checkout

- git reset {--soft|--mixed|--hard} [commit]  回滚到某一次提交
    >回滚包括HEAD指针及其所在的分支都会移动到某一次提交，而checkout检出则只会移动HEAD指针，不会移动其所在分支
    - --soft 只回滚HEAD指针和所在分支，不改变暂存区、工作区
    - --mixed 回滚HEAD指针和所在分支、暂存区，不改变工作区
    - --hard 回滚HEAD指针和所在分支、暂存区、工作区
    - commit 指定回滚的提交，不指定默认为HEAD当前提交

- git reset [commit] [path] 回滚暂存区到某一次提交
    - commit 指定回滚的提交，不指定默认为HEAD当前提交
    - path 指定作用的文件范围，不指定默认为整个目录
        >指定文件范围后，只回滚HEAD指针和暂存区，不改变工作目录(而checkout指令会回滚工作目录)
        >指定文件范围后不会回滚HEAD指针，因为回滚一部分文件是混合的文件不是完整提交













查询相关：

git blame [-L <line-start,line-end>] [-C] <file> 查询文件中每一行来自的提交和提交者
    - -L <line-start,line-end> 限制查询开始和结束的行号
    - -C 查询该行第一次提交所在文件(从目录中别的地方复制粘贴过来不会记录为新写入的内容)

git bisect (二分法)通过标记提交的正确和错误，查询错误文件所在提交



子模块：

git submodule add <module-url> [local-url] 添加子模块到本地
    - module-url 指定子模块对应的仓库地址
    - local-url 指定本地目录

该命令会创建.gitmodules配置文件和子模块文件，配置文件保存了项目 URL 与已经拉取的本地目录之间的映射




离线打包
git bundle










