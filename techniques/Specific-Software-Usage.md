# Specific Software Usage

Here shows some specific experiences on daily working.

See [Deal-with-media.md](Deal-with-media.md) for applications about videos, etc.

Fret not over bygones, and the forward journey take.

# Commonly used for working

## Connect and remote control

Connection, *pn, remote control usage

configure *PN: see [prepare-for-the-computer](/techniques/Prepare-for-the-computer#break-the-wall)

### Common

1. get ip address
   
   ```shell
   ip addr show
   ifconfig
   ```

2. Use “Wake on LAN” to boot remotely
   
   - https://necromuralist.github.io/posts/enabling-wake-on-lan/
   
   - https://service.oray.com/question/1331.html 判断主机是否支持远程开机？
     
     华硕主板要：高级 > 高级电源管理（APM）> 开启 **Resume By PCI or PCI-E Ddevice**（由pci/pcie设备唤醒）选项
   
   ```shell
   sudo apt-get install ethtool
   ifconfig -a # find your interfaces, as well as the MAC address!
   # ether xx:xx:....
   sudo ethtool enp4s0 # must add sudo! or error
   # should see:
   # Supports Wake-on: pumbg
   # Wake-on: g # if is d, just do 
   sudo ethtool -s enp4s0 wol g
   ```
   
   just check this two?
   
   远程开机？
   
   ```shell
   wakeonlan MAC # -i ip-address ?
   ```

3. to enable the wol function, should all the Linux subsystem on Windows
   
   [install wsl](https://docs.microsoft.com/en-us/windows/wsl/install-manual#downloading-distributions)                          https://blog.csdn.net/daxues_/article/details/119639093
   
   change the .appx file into .zip file, unzip it in the desired directory
   
   ```shell
   sudo apt install wakeonlan
   ```

4. connect with ssh
   
   install
   
   ```shell
   sudo apt install openssh-server openssh
   ```
   
   guide: https://www.cnblogs.com/conefirst/articles/15225952.html
   
   没有公网ip，整不了。。。你上面那个wsl不也一样吗。。
   
   > 内外网：https://www.zhihu.com/question/63098230/answer/1989327965
   
   ssh可以解决卡机，wakeonlan可以解决误关机（挂起？），但系统要是坏了……能否登录救援模式

6. 一般服务器是要买公网IP的，如果你要搞化生网站就是如此吧？
   搭建云盘也是这样，但是存储空间还得靠自己。。常说NAS。存储设备几百块钱跟网上说的差不多
   内网穿透是为这台机器提供访问的配置，本身没有存储吧。。但可以用本机的，所以可以做网站了？

7. 若实例有公网 IP，则请参考 使用 SSH 登录 Linux 实例。
   若实例无公网 IP，则请参考 使用 VNC 登录 Linux 实例。
   所以向日葵和vnc真的冲突吗？

8. http服务

9. 

### Sunlogin remote control

工单：可以咨询技术人员。https://console.oray.com/center/workorder

> auto-boot: https://www.cnblogs.com/citrus/p/13879021.html
> 
> use realvnc? actually no need...

向日葵

软件包名：`sunloginclient`；命令：`/usr/local/sunlogin/bin/sunloginclient`

1. check “start upon boot”

2. about wait 120s to connect
   
   > try connection
   > 
   > `telnet client.oray.net 443`
   > https://blog.csdn.net/MuscleBaBa_Chang/article/details/110562652

3. 连接后即断开解决办法 https://blog.csdn.net/u012254599/article/details/107807751
   
   ```shell
   sudo dpkg-reconfigure lightdm # 切换lightdm图形页面
   ```
   
   切换完成后重启电脑，就可以使用向日葵远程了…
   
   which leads that the login displays in a strange de-centered looking...

4. 

### phddns

花生壳

> https://sunlight.oray.com/ 阳光换东西。。

https://hsk.oray.com/cooperation/ 使用花生壳快速建立端口映射，在宿舍也能随时远程控制、访问、管理实验室设备、服务器等

for students，白嫖内网穿透，还要做任务？

#### usage

> phlinux is the old version. forget about it!

without client, just use web client...

客户端离线：安装后用sn号在网页端登录，手机APP扫码激活才能用

后来用sn号登不上了。。

> 未来之星 https://www.yibeianyuming.com/n/821.html
> 
> 花生壳5.0 for Linux使用教程 tcp https://service.oray.com/question/11630.html

> 填写指南？ https://hsk.oray.com/news/7553.html 填写内网ip：127.0.0.1，最后还是成功了。但博客都不这样？
> 
> 内网端口只能是22，才能诊断成功，即[这个人的设置](https://blog.csdn.net/skylake_/article/details/107411893)
> 
> 可以选http
> 
> 诊断得到IP（等价的）

> +apache https://zhuanlan.zhihu.com/p/137498696

问了客服，这样配置：

![phddns-config](https://cdn.jsdelivr.net/gh/gxf1212/notes@master/techniques/images/phddns-config.jpg)

- 映射类型：TCP
- TCP类型：普通即可
- 映射模板：SSH服务
- 端口：动态无所谓

然后xshell就能连了

```
ssh gxf@xxxxx.xxx.xx:port
```

- 挂起和关机应该用不了
- 卡机了、tty下可，要用root去reboot

自动启动 https://blog.csdn.net/TianXieZuoMaiKong/article/details/90574629

我们还需要编辑OpenSSH服务配置文件：`/etc/ssh/sshd_config`，将`#PermitRootLogin without-password` 更改为`PermitRootLogin yes`，从而运行root远程登录。

手机上APP可以看客户端状态

> issues
>
> 花生壳青春版能用多久？一年，还是因为我快毕业了？

花生壳下线，用`sudo phddns start`

### ToDesk

https://www.todesk.com/linux.html

doc: https://docs.todesk.com/zh-CN

advantages/functions

- free, no rate limit, all platforms
- check rate: upper left letter
- no more stucking? yes!

flaws

- have to open a client or it cannot be connected
- WOL under lan failed
- 占用这么大内存, twice of sunlogin
- screen is not as clear, even free version?
- 鼠标光标太大，而且位置难以把控。。
- 不能用PageUp/Down键
- 这两天在此重启时会卡

两者都：播放pymol的movie会卡（vmd还好），向日葵也有点卡（变得不清晰）

charged: file transfer. Ctrl + C/V; dragging 拖拽; the client

#### Summary on remote control

回家三天，总结一下解决远程控制Linux服务器卡机的修复过程。

问题起因：安装了nvidia用于GPU计算的驱动，导致不能很好地使用图形界面应用，如远程控制。

问题表现：有时用着用着就卡机了；远控打开长时间不动就卡机；有时关掉向日葵后第二天早上发现卡机。

问题解决：大佬们释放资源的操作我不会

1. 以ToDesk软件为主，免费又不限速，可以避免向日葵远控产生的一部分上述问题。
   但是它的光标太大、鼠标定位不准，网好时没有向日葵清晰，所以可以短时间使用一下向日葵。
   还有，在ToDesk下重启会导致`a stop job is running...`，所以重启前要关完程序
2. 更改系统设置，如关闭自动休眠等。
3. 改善网络环境。。。图书馆出来挨打
4. 更改使用习惯，包括：1）以ToDesk软件为主，间歇使用；2）不使用时关闭远控界面；3）少用费资源的图形软件，如pymol和vmd的movie；4）吃饭睡觉前重启以清理内存，但跑程序时不太会卡；5）重启时记得登录进去，否则20分钟内将自动休眠，无法连接。。。

失败的解决方法：wakeonlan（连不上）、ssh（卡机时也不一定能连上）、卸掉vnc（不是因为冲突）

希望以后的工作能顺利进行。😭😭

## Cluster/Supercomputers

### ssh and scp

#### Basics

- scp: sesure copy

  https://www.cnblogs.com/l199616j/p/12092113.html

  [Linux使用scp拷贝多个文件到远程服务器](https://blog.csdn.net/weixin_40918067/article/details/117376103) 

#### ssh key

重要的经验

- [传输文件的四种方式](https://blog.csdn.net/qw_xingzhe/article/details/80167888)

- 免密码登录

  ```shell
  ssh-keygen -t rsa -P ""
  ```

- Linux远程执行命令：`sh [options] [user@]host [command]`，如`ssh -p 606 gxf1212@10.77.14.186 "ls $workdir/prod"`

- 

### ssh/sftp Tools

xshell http://www.netsarang.com/download/free_license.html not for Linux?

under Win, Xshell+Xftp look very good. Dragging and clicking a visualized folder will be effcient

finalshell does not look so pretty though we can just use it. cannot update..?

#### electerm

[开源的 SSH SFTP 客户端 Electerm + Gitee gist - 简书 (jianshu.com)](https://www.jianshu.com/p/399725eb5014)

> functions covers what is in Xshell and Xftp, but kind of small font...but a great tool!

写于2022（不是恰饭，是我在用）

electerm是一个Linux端的ssh客户端，国产软件。

- 界面简洁，可自定义主题
- 完全免费开源，支持所有电脑操作系统
- 支持复制粘贴路径
- 支持sftp（就是文件夹的可视化界面，拷文件只需要拖动）
- 甚至还能当做本地命令行的替代品，还能GitHub、Gitee同步

如果你讨厌用scp往远程服务器上拷文件，可以试试它，每次粘贴一长串文件路径还是挺烦的。

缺点：

- 感觉有时鼠标点击有点不灵敏……准确地说是传输大量文件时就会很卡。。（重启软件就好了）可以另外开一个window
- 命令行字体倒是能变，但是这个UI字有点小不能调（可以去提个issue）

下载地址：https://electerm.html5beta.com/ 

https://zhuanlan.zhihu.com/p/348324919

#### Xshell & Xftp

1. Xshell font (for only for one dialog)

   <img src="https://cdn.jsdelivr.net/gh/gxf1212/notes@master/techniques/images/xshell-font.png" alt="xshell-font" style="zoom:150%;" />

   

2. xftp sync

   <img src="https://cdn.jsdelivr.net/gh/gxf1212/notes@master/techniques/images/xftp-sync.png" style="zoom:50%;" />

other

```shell
sudo rm -r /usr/lib/FinalShell
sudo snap install termius-app
```

### Scheduling system

#### slurm

##### basics

[Slurm作业调度系统使用指南 (ustc.edu.cn)](http://hmli.ustc.edu.cn/doc/userguide/slurm-userguide.pdf)  a very detailed guide!

[https://slurm.schedmd.com/](https://slurm.schedmd.com/): official

[Useful Slurm commands (curc.readthedocs.io)](https://curc.readthedocs.io/en/latest/running-jobs/slurm-commands.html)



- [Job Priority | Princeton Research Computing](https://researchcomputing.princeton.edu/support/knowledge-base/job-priority) 

  > in most cases those jobs requesting shorter times are given the highest priority in QOS

  [Priority_and_Fair_Trees.pdf](https://slurm.schedmd.com/SLUG19/Priority_and_Fair_Trees.pdf); [Slurm Workload Manager - Multifactor Priority Plugin](https://slurm.schedmd.com/priority_multifactor.html)

  <img src="E:\GitHub-repo\notes\techniques\images\slurm-jobsize.png" style="zoom:50%;" />

  [Slurm Workload Manager - sprio](https://slurm.schedmd.com/sprio.html)

  ```shell
  spiro -j jobname 
  spiro -u user-id
  ```

- scontrol
  
  <img src="E:\GitHub-repo\notes\techniques\images\scontrol1.png" alt="1701699867598" style="zoom:80%;" />
  
  <img src="E:\GitHub-repo\notes\techniques\images\scontrol2.png" alt="1701699219869" style="zoom:80%;" />
  
  <img src="E:\GitHub-repo\notes\techniques\images\scontrol3.png" alt="1701699968758" style="zoom:80%;" />







##### example

read the pdf from hpc.xjtu.edu.cn for more

https://blog.csdn.net/qq_33275276/article/details/105060613

```shell
# install
module load gcc8.5
module load cmake320
cmake .. -DCMAKE_INSTALL_PREFIX=~/program/gromacs-2020.1-cpu -DGMX_BUILD_OWN_FFTW=ON -DGMX_GPU=off -DCMAKE_C_COMPILER=/share/apps/gcc-8.5/bin/gcc -DCMAKE_CXX_COMPILER=/share/apps/gcc-8.5/bin/g++
make -j 8
make install

cd ~/gmx/lig2
source ~/program/gromacs-2020.1-cpu/bin/GMXRC.bash
export LD_LIBRARY_PATH=${LD_LIBRARY_PATH}:/usr/lib64/
module load gcc8.5
module load intel20u4

squeue
scontrol show job jobid
```

write absolute path when submitting jobs...

an example script. submitted under your working directory

```shell
#!/bin/bash
#SBATCH -J lig2
#SBATCH -n 8
#SBATCH -p node
#SBATCH -N 1
##SBATCH --tmp=MB 
#SBATCH -p gpu
#SBATCH --gres=gpu:1

job=final_com

#source /share/apps/gromacs/20211/bin/GMXRC.bash
source /share/apps/gromacs/20211new/bin/GMXRC.bash

module load cuda11.1
##module load cuda10.2
module load gcc8.5
module load intel20u4

##Run  Gromacs
date > log
gmx mdrun -deffnm $job -nb gpu
date > log
~
```

#### PBS

- basics https://www.jianshu.com/p/2f6c799ca147
  - `qstat`
  
    ```shell
    # 查询作业号为211 的作业的具体信息。
    qstat -f 211
    # 查询用户gxf的所有作业。
    qstat -u gxf
    ```
  
  - `qsub`
  
  - `qdel`
  
- Environment Variable https://pubs.opengroup.org/onlinepubs/009696699/utilities/qsub.html
  - like `$PBS_O_WORKDIR`
  
- 如果您有三个参数，例如`arg1`，`arg2`和`arg3`，您可以这样提交作业：

  ```shell
  qsub script.sh -F "arg1 arg2 arg3"
  ```

  不能省略双引号
  在脚本中，您可以使用`$1`，`$2`和`$3`来访问这些参数。例如，下面的脚本将打印出传递给它的三个参数：

  ```shell
  #!/bin/bash
  #PBS -N myjob
  
  echo "Argument 1: $1"
  echo "Argument 2: $2"
  echo "Argument 3: $3"
  ```
  
- To check which node a job is running on in PBS, you can use the qstat -f <job_id> command, where <job_id> is the ID of your PBS job. This command will display detailed information about the job, including the node on which it is running.
一旦您知道了作业运行的节点，您可以使用ssh命令登录到该节点，例如 ssh node_name。登录后，您可以使用诸如free或top之类的命令来查看节点的内存使用情况。




#### Summary

| system      | PBS        | SLURM          |
| ----------- | ---------- | -------------- |
| submit      | qsub       | sbatch         |
| check queue | qstat      | squeue         |
| kill job    | qdel       | scancel        |
| job name    | -N (name)  | -J (job)       |
| queue name  | -q (queue) | -p (partition) |
|             |            |                |



### run in backend and redirection

namd好像也不能在命令行直接nohup，现在这个2&>xx.log会导致最后没有输出（只有restart）

应该是1>& xx.log!



[如何在ssh断开后继续让程序在后台运行](https://blog.csdn.net/liuyanfeier/article/details/62422742)

- 一但把当前控制台关掉(退出帐户时)，作业就会停止运行。nohup命令可以在你退出帐户之后继续运行相应的进程。标准输出和标准错误缺省会被重定向到 nohup.out 文件中。

- 当在前台运行某个作业时，终端被该作业占据；可以在命令后面加上& 实现后台运行。

- 2与>结合代表错误重定向，而1则代表错误重定向到一个文件1，而不代表标准输出；换成2>&1，&与1结合就代表标准输出了，就变成错误重定向到标准输出

- - 也可以正常重定向输出

- 可以用进程号来监控该进程，或杀死它



- If you want to see only the standard output (stdout) on the screen and redirect the standard error (stderr) to a file, you can use the `>` operator to redirect the stderr to a file. Here’s an example:

  ```
  bash xx.sh 2>error.log
  ```

  This will run the `xx.sh` script and redirect its standard error output to a file named `error.log`. Only the standard output will be displayed on the screen.



I have a bash script which contains tens of gmx mdrun commands. Each of them generates an independent process and will not start until the previous one finishes (i.e. they are not running in parallel). I'm running like nohup bash xx.sh &. How can I kill this bash script or all gmx processes at once?
If you want to kill the bash script that is running the `gmx mdrun` commands sequentially, you can use the `ps` command to find its process ID and then use the `kill` command to send it a `SIGTERM` signal. For example:

```
ps aux | grep "bash xx.sh"
# Find the process ID (PID) from the output of the above command
kill <PID>
```

This will send a `SIGTERM` signal to the bash script process, causing it to terminate gracefully.
Then We just need to kill gmx once and the whole script will terminate.



## Git

### in cmd

1. basic usage

   ```shell
   # in your repository path
   # usual usage
   git add ./ # add all changes
   git commit -m "update message"
   git push -u origin master
   git pull
   ```

   > **`git push <remote> <place>`**
   >
   > https://www.cnblogs.com/suihang/p/10556519.html

   commit是防止远程直接覆盖你本地，只要有修改都会让你commit，提示你pull原因是因为你远程当中有最新的东西和你本地不一致，git知道，远程分支的东西不能丢掉，所以让你pull下来存到本地，让本地变成最新的最后push上去，难么同理的方式你本地就是最新，便会去修改远程的。

   ```shell
   # other
   git config --global user.name gxf1212 # user.email xxx
   git config --global user.email
   # also works for my github
   git clone url.git # clone a repo
   ```

2. in Gitee, we should manually update Pages?

   https://www.cnblogs.com/zlting/p/9620259.html

   ```shell
   git remote set-url origin https://github.com/gxf1212/notes.git # 设置远程仓库地址
   git remote -v
   ```

3. no more username+pwd

   https://blog.csdn.net/LosingCarryJie/article/details/73801554

   ```shell
   git config --global credential.helper store
   ```

4. git status

   ```shell
   git status
   ```

   > 位于分支 master
   > 您的分支和 'origin/master' 出现了偏离，
   > 并且分别有 1 和 1 处不同的提交。
   > （使用 "git pull" 来合并远程分支）
   >
   > 所有冲突已解决但您仍处于合并中。
   > （使用 "git commit" 结束合并）
   >
   > 要提交的变更：
   >
   > 新文件：   .gitignore
   > 修改：     Linux/Prepare-for-the-computer.md

5. 对于本地的项目中修改不做保存操作（或代码改崩），可以用到Git pull的强制覆盖

   ```shell
   git reset --hard origin/master
   ```

   to give up specific files

   ```shell
   git restore _sidebar.md
   ```

6. Github 上怎么删除一个文件的版本控制信息，只保留最新文件？

   项目本身并不大，主要是由于有些大图片多次修改，所以GIT保留的这些图片的历史记录文件非常大，但是我这些图片又不需要历史记录信息，怎么删除？

   干脆利落...

   ```shell
   rm -rf .git
   git init
   git add -A
   git commit
   git push -f
   ```

7. proxy

   https://blog.csdn.net/zphuangtang/article/details/112151857

   重置git代理：

   ```shell
   git config --global https.proxy ""
   git config --global http.proxy "" 
   ```

8. [create sth locally and a repository in the web, merge them](https://www.educative.io/edpresso/the-fatal-refusing-to-merge-unrelated-histories-git-error)

   ```shell
   git pull origin master --allow-unrelated-histories
   ```

9. git submodule

   ```shell
   git submodule add xxx.git
   ```

   但是提交父仓库时还不能直接更新子仓库. when executing `git commit ...`

   ```
   Changes not staged for commit:
     (use "git add <file>..." to update what will be committed)
     (use "git restore <file>..." to discard changes in working directory)
     (commit or discard the untracked or modified content in submodules)
   	modified:   utils/live2d-widget (modified content)
   ```

   and only pushes the father repo

   https://blog.tomyail.com/using-git-submodule-lock-project/ 如果需要保持子仓库不变。。

   https://blog.csdn.net/HandsomeHong/article/details/124173820 删除submodule（全套操作）

   直接更新子仓库, [reference](https://git-scm.com/book/zh/v2/Git-%E5%B7%A5%E5%85%B7-%E5%AD%90%E6%A8%A1%E5%9D%97) but 递归提交子模块 `git push origin -u master --recurse-submodules=on-demand` failed

   ```shell
   git submodule foreach git add .
   git submodule foreach git commit -m 'update threebody quotes'
   git submodule foreach git push -u origin master
   ```

   it might work, strange but fine...we can also enter the submodule and push it.

   actually ``git push xxx` will push submodules if changes are already committed 

10. remote: Support for password authentication was removed on August 13, 2021. Please use a personal access token instead.

    ```shell
    git clone xxx.git
    git remote set-url origin https://<your token>@github.com/<your username>/<your repo name>.git
    # git r
    ```

11. If the repository has a specific development branch that you want to clone, you can use the `-b` option followed by the name of the branch. For example:

    ```shell
    git clone -b development https://github.com/username/repository.git
    ```

    This will clone only the specified branch of the repository.


### exploration

1. GitHub克隆Gitee的仓库

   ![clone](https://cdn.jsdelivr.net/gh/gxf1212/notes@master/techniques/images/clone.jpg)

   cloning is boring, why not sync a repository?

   [仓库镜像管理（Gitee<->Github 双向同步） | Gitee 产品文档](https://help.gitee.com/repository/settings/sync-between-gitee-github#article-header10)

   **进入需要使用镜像功能的仓库，进入「管理」找到「仓库镜像管理」选项**

   限时开放至 2022 年 08 月 31 日，在限时开放期结束前，我们将更新相关产品策略。

   git actions for gitee? [3步自动同步你的 Github 仓库到 Gitee 仓库](https://gyx8899.gitbook.io/blog/share/syncgithubtogitee)

2. 2022.6 update: no more gitee...

   GitHub虽然自动部署，还是需要清理缓存才能看的

   cdn.jsdelivr.net/npm: does not work well for js scripts? but works fine for figures. different format from unpkg.com

3. [Viewing the branch history in GitHub Desktop - GitHub Docs](https://docs.github.com/en/desktop/contributing-and-collaborating-using-github-desktop/making-changes-in-a-branch/viewing-the-branch-history-in-github-desktop)

4. 

### git bash

- [如何修改 Git Bash 窗口中默认的字体大小](https://www.cnblogs.com/heroljy/p/8989123.html)：点击右键，选择 Options

## Coding and writing

### Typora

install: https://www.typora.io/releases/all

1. 自定义快捷键

   https://blog.csdn.net/December_shi/article/details/108690116

   Ctrl+5 in Linux does not work?

2. 

#### plugins

1. mermaid语法
   - 特殊符号，要加引号才显示 https://github.com/mermaid-js/mermaid/issues/213
2. 

#### themes

1. liquid: cannot see the mouse cursor in titles and hyperlinks?

#### Crack

just search...

https://www.ghxi.com/typora.html

Mac：https://macwk.com/soft/typora

### VScode

1. VScode安装完默认不能自动换行，需要我们手动配置。 文本超出显示时，会溢出，如图： 进入文件>首选项>设置，打开设置界面，在常用设置下找到Editor:Word Wrap选项，默认为off,设置为on即可。

2. theme

   (description) I also met [this question](https://stackoverflow.com/questions/70221994/unable-to-change-theme-in-vs-code) or [this](https://www.reddit.com/r/vscode/comments/lx7536/any_idea_why_my_theme_is_suddenly_changing_every/)

   > [Workbench Appearance color theme keeps being overridden](https://github.com/microsoft/vscode/issues/105102)
   > 
   > 引申出主题的管理方式：和系统有关。。

   No! finally, vscode theme问题：biosyntax和gmxhelper要用它们自己的theme

   solution: disable掉他俩, 然后settings（ctrl+,）里面搜索theme

3. https://jingyan.baidu.com/article/e6c8503ca7706de54f1a18f4.html vs code 字体分辨率

4. https://zhuanlan.zhihu.com/p/68577071  run remote code, but view locally

5. [How to format source code in Visual Studio Code (VSCode) - Mkyong.com](https://mkyong.com/vscode/how-to-format-source-code-in-visual-studio-code-vscode/)

6. [VS Code: How to Compare Two Files (Find the Difference)](https://www.kindacode.com/article/vs-code-how-to-compare-two-files-find-the-difference/)\

7. format code

   ![](https://cdn.jsdelivr.net/gh/gxf1212/notes@master/techniques/images/vscode-format-code.png)

8. 

### Pycharm

#### Basics

1. https://blog.csdn.net/qq_41330454/article/details/105906347 控制台命令提示符是In[2]. ipython!

   http://errornoerror.com/question/13223264808178804318/

2. [关闭代码风格检查](https://blog.csdn.net/u013088062/article/details/50001189)

   - 关闭拼写检查，setting-->Inspections-->Spelling-->Typo

   - 关闭代码风格检查，setting-->Inspections-->Python-->PEP8

   - [Code Style. Python | PyCharm](https://www.jetbrains.com/help/pycharm/code-style-python.html)

     <img src="https://cdn.jsdelivr.net/gh/gxf1212/notes@master/techniques/images/pycharm.png" alt="image" style="zoom:80%;" />

3. 实际上没有那么快自动保存，还是需要ctrl+s，尤其是引用别的包的时候

4. intepreter: create from existing sources. 

   [Configure a conda virtual environment](https://www.jetbrains.com/help/pycharm/conda-support-creating-conda-virtual-environment.html#ffac721c)

5. [Markdown Support](https://www.jetbrains.com/help/pycharm/markdown.html)

6. 非常傻逼的一点是，正常运行和调试（或cmd中python）的`sys.path`不一样。。不好通用地找程序所在路径

7. 

#### other execution notes

- [AttributeError: partially initialized module ''has no attribute''(most likely dueto a circular import_懒笑翻的博客](https://blog.csdn.net/c_lanxiaofang/article/details/103997425)

  don't name your .py file the same as a standard module you import in it....

- 



### conda & python cmd

https://blog.csdn.net/zhayushui/article/details/80433768

#### Initialize &Basics

1. no need to copy the installation .sh file to where to install. You can specify a directory.

2. no need to be under `su root`

3. `conda: no command`: add path? open a new terminal after installation [conda:未找到命令](https://blog.csdn.net/freezeplantt/article/details/80176215)

4. if cannot activate at the first time: run `source activate`

   then run `conda activate` or `conda deactivate`

   see [conda activate激活环境出错的解决办法-CSDN博客](https://blog.csdn.net/qq_36338754/article/details/97009338)

5. reinstall conda:
   - update pycharm interpreter
   - paste back mutff of pmx
   - add matplotlib fonts

6. If you want to update to a newer version of Anaconda, type:

   ```shell
   conda update --prefix /opt/anaconda3 anaconda
   ```

7. https://blog.csdn.net/xiangfengl/article/details/127597065 on a new machine. OpenSSL appears to be unavailable on this machine.

8. Add to path for Windoes! [ImportError: DLL load failed while importing _ssl: 找不到指定的模块 No module named ‘jupyter_server‘](https://blog.csdn.net/sdnuwjw/article/details/112207440)

9. maybe 

   ```shell
   conda init shell
   ```

10. Please update conda by running

    ```shell
    conda update -n base conda
    ```

11. If you'd prefer that conda's base environment not be activated on startup, set the auto_activate_base parameter to false: 

    ```shell
    conda config --set auto_activate_base false
    ```

    


#### Environments

- see env list

  ```shell
  conda env list
  ```

  or `conda info`: information

  - -e: environments

- create 

  - normal

    ```shell
    conda create -n env_name
    ```

  - from yaml https://blog.csdn.net/vola9527/article/details/80744540

    ```shell
    conda env create -f study.yaml
    ```

- export environment

  ```shell
  conda activate your_env
  conda env export > environment.yaml # in your current directory
  # on a new computer/environment
  conda create -f environment.yaml
  ```

  You can change the name of the environment (and also path! or remove this?) in the file

  注：.yaml文件移植过来的环境只是安装了你原来环境里用conda install等命令直接安装的包，你用pip之类装的东西没有移植过来，需要你重新安装。

  ```shell
  pip freeze > requirements.txt
  pip install -r requirements.txt
  ```

  But I do see pip terms in `.yaml` file

- remove

  ```shell
  conda env remove xxx --all # or rm the file manually
  ```

- 

- 

#### Packages

- packages of an environment

  ```shell
  conda list # list envs
  conda list -n env # list packages
  python -V
  ```

  查看pip安装了多少包

  ```shell
  pip list
  ```

- Update specific package: 

  ```shell
  conda update package-name
  ```

- win32 or win_amd64 means version of python

  in win, run python in cmd to know version.

  my win: 3.7, 32bit 

  station: 3.8, 64bit

  https://blog.csdn.net/taquguodedifang/article/details/78039181 in linux

#### Bugs

- An unexpected error has occurred. Conda has prepared the above report.

  https://blog.csdn.net/Felaim/article/details/108368598

  ```shell
  conda clean -i
  ```

- EnvironmentNotWritableError: The current user does not have write permissions to the targe...

  https://www.jianshu.com/p/95e52d6b46ac   problem: permission 权限

  ```shell
  sudo chmod -R 777 anaconda3/
  ```

- PackagesNotFoundError:

  https://blog.csdn.net/weixin_43815222/article/details/108549497

- pip install the package only inside one specific conda environment

  ```shell
  # make sure
  which pip
  # returns the virtual env path. you can try
  conda install pip
  # in it before installing with pip
  ```

  [anaconda创建新虚拟环境后，pip总是定位到全局Python的pip路径中（无法定位到虚拟环境的pip）](https://blog.csdn.net/weixin_41712499/article/details/105430471)  it's just the problem with path

- [一招解决Conda安装卡在solving environment这一步！](https://blog.csdn.net/qazplm12_3/article/details/108924561)：现在安装的东西太多，垃圾太多，搜索兼容。。

  > https://blog.csdn.net/qq_27377201/article/details/107009927

  ```shell
conda update --strict-channel-priority --all
  conda update --all
  conda install mamba -c conda-forge
  ```
  
  也没用

  maybe don't put too many channels. https://www.jianshu.com/p/1dbaef6b3209

- `.condarc`文件在`C:\User\xx\`目录（Windows的HOME）下，或者使用win+R后在运行窗口中输入`%HOMEPATH%`进入

  ```bash
  channels:
    - conda-forge
    - https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/msys2/
    - https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/conda-forge
    - https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/
    - defaults
  ```
  
  [解决.condarc文件找不到的问题-CSDN博客](https://blog.csdn.net/ljx0951/article/details/104121844)：只有当用户第一次使用conda config命令时，系统才会自动创建.condarc文件。`conda config --add channels defaults`
  
- conda 环境迁移, 修改conda路径（复制文件夹 + 软连接）https://blog.csdn.net/qq_34342853/article/details/123020957

  没成功

  [conda虚拟环境默认路径的修改方法](https://www.jb51.net/article/256139.htm)

  add env path to .condarc, and change the priority of `D:\Anaconda3` (both package and environment directory)

  ```shell
  conda config --add envs_dirs newdir
  conda config --add pkgs_dirs newdir
  ```

  No writeable pkgs directories configured: https://blog.csdn.net/qq_37142541/article/details/125428689

- [Python报错：ImportError: DLL load failed: 找不到指定的模块 解决方案详解](https://blog.csdn.net/shuiyixin/article/details/90370588)

  [Windows conda ImportError: DLL load failed while importing shell_Ayka的博客-CSDN博客](https://blog.csdn.net/yihuajack/article/details/122123674)

  ImportError: DLL load failed: 找不到指定的模块. 文件受损（如安装不全），重装那个包

  ```shell
  conda install -c conda-forge rdkit -y --force-reinstall
  ```

- [Unable to update anaconda - KeyError('pkgs_dirs')](https://github.com/ContinuumIO/anaconda-issues/issues/13051)

- I removed previous miniconda and when creating conda environment for new anaconda from yaml file exported from previous miniconda.

  ```python
  InvalidArchiveError("Error with archive /home/gxf1212/data/local-programs/anaconda3/pkgs/gxx_impl_linux-64-10.4.0-h7ee1905_16.tar.bz2.  You probably need to delete and re-download or re-create this file.  Message was:\n\nfailed with error: [Errno 2] No such file or directory: '/home/gxf1212/data/local-programs/anaconda3/pkgs/gxx_impl_linux-64-10.4.0-h7ee1905_16.tar.bz2'")        
  ....
  ```

  ```shell
  conda clean -a
  ```

  

> icon path: `xxx/anaconda/lib/python3.7/site-packages/anaconda_navigator/static/images/anaconda-icon-256x256.png` 
>
> [link](https://dannyda.com/2020/03/21/how-to-create-shortcut-icon-for-anaconda-anaconda3-navigator-launch-anaconda-navigator-in-linux-debian-ubuntu-kali-linux/?__cf_chl_managed_tk__=8b0602f628e3697df877a10ef8acbd1aaed57efe-1624180568-0-AQN5TbG3O_yGaDEn0fVCjKdPwJeitKXjQ5dGrRfek69NylD0fJ5-atmRV2JoCodX4-mn_CX-vH8Ay_KzM9Ew77recYhgLQF_b3AqC85p9Pt8IVjBso98tTdFN9TknxGj5tTJFM_8KyF_S4qbMmoTpsiUnMKl2kc3rlzmRlQZvO0AJaILgZakK-WjM6xFauMno73HWqkCE4IaHB35y0M0C0dnw8t2b5qReINgAcLiCZuHX897fWj-OLS6yNbAVjmkgOPbkazSG3X8a-o_AgziC8zfKXi584jpGmet4WwRwFnSaWJvOAp7BA7vSIkcSJ7UAOFWzpvkDilEtFoa-XMd6jpZQgKbtBVQn4vLT5LUl1_XLFU3M7B9G_vN7vcyUcFjLV2gl6xdDcx9WA-JypLtICF3nbFVjS3gvK_WCEqs30dnW38X3Ceuk9Bhq7FFyegkaQmnFy5a4V5KeJob3h_gXQRaWwaeAFAHoeuYY0RXfAtfD82sJgJP0UOOYC8IBBV43rGAmhSOsLhiC2u3hk2hwLIEy7mG10sSUlGq_3I_dPjha1qlIAP0APiBXaWOOdujGD2gFeot6PQGwrg71cglm4rQc1Zei_kF8QfHdYerOFjLLtbfWC0HTeoFZ_L7Qu9R9c8npxn9Z5Np2O_IqqsKo3yaDAxR_aV8JVS3rS-a4mxAunZXcWj734HTBAJaTTSdepNfW2PdqnUEbsnD5bAyjeDPVQQupDNG_1qz8fsEzThDBSPP04GMtGJGqpEBawQvu2Nk857rXxA-_V2AwE9s7Og)

#### For R language

when pycharm is open, working directory is set to the current. to install a package (dependent on) tcl

```R
setwd('/home/gxf/anaconda3/envs/Rlan')
install.packages("Rcpp")
install.packages("bio3d")
install.packages("nc")
```

you should

```shell
conda create -n Rlan
conda activate Rlan
conda install -c intel tcl
```

failed, remove this env...

### Jupyter Notebook, Google Colab, etc.

1. Jupyter Notebook 更换主题（背景、字体）:  https://www.cnblogs.com/shanger/p/12006161.html
   
   https://jingyan.baidu.com/article/d713063577bcf353fdf475e7.html cd
   
   https://github.com/dunovank/jupyter-themes
   
   ```shell
   jt -r # default
   jt -t grade3 -f firacode -T -T # other is default
   jt -t grade3 -f consolamono -T -T # not using
   ```

2. 代码提示功能：在base下（default配置！）
   
   ```shell
   pip install jupyter_contrib_nbextensions
   jupyter contrib nbextension install --user
   pip install jupyter_nbextensions_configurator
   jupyter nbextensions_configurator enable --user
   ```
   
   https://www.freesion.com/article/6188402580/

3. Add the following code on top of your jupyter notebook:
   
   ```latex
   $$\require{mhchem}$$  
   ```
   
   https://stackoverflow.com/questions/59890934/is-there-a-way-to-write-down-chemical-equations-in-jupyter-notebook-by-using-ext

4. 

5. social network网课
   
   > ```
   > conda install matplotlib==2.0.0 networkx==1.11 pandas==0.20.3 scikit-learn==0.18.2 scipy==0.18.1 numpy==1.13.1
   > ```

### Spyder

#### setup

spyder conda interpreter：光设置没用，直接打开conda里每个对应环境的Spyder

要是只有miniconda，对不起。按照提示（此为Fedora38 Scientific上的）：

<img src="https://cdn.jsdelivr.net/gh/gxf1212/notes@master/techniques/images/spyder-error.jpg" style="zoom:50%;" />

安装时总是报conda底层的错（要report），版本不对还不行

#### shortcut

https://www.cnblogs.com/grace731/articles/15029832.html

Ctrl+1：注释、取消注释
Ctrl+4/5：块注释/取消块注释
F12：断点/取消断点/在语句前进行双击
F5：运行全文档
F9：运行当前行
Ctrl+F5：启动调试
Ctrl+F10：单步调试，跳过函数内部实现
Ctrl+F11：单步调试，进入函数内部实现
F9：从当前光标所在行开始执行
F8：查看编译结果（包括Erro和Warning信息）
Ctrl+Shift+W：关闭所有打开的.py文件
Ctrl+Alt+←：光标跳回之前所在位置
Ctrl+L：跳转到行号
F11：全屏
Tab：空行前是代码缩进；在输入一个字母后，按Tab健会自动补全或者代码提示。
Shift+Tab：撤销代码缩进
Ctrl+双击：打开加载包源代码

## Office

### Common

- [查看 Office 文件的先前版本](https://support.microsoft.com/zh-cn/office/查看-office-文件的先前版本-5c1e076f-a9c9-41b8-8ace-f77b9642e2c2)

### MS Word

- 表格左上角斜线

  ![](https://cdn.jsdelivr.net/gh/gxf1212/notes@master/techniques/images/word-table.png)

- 

### MS Excel

also for LibreOffice Calc, many commands are the same....

#### General

- Excel的paste special必须是复制，辣鸡！Calc就可以剪切
- Change the default language in LibreOffice for the whole document
  Choose Tools > Options. Go to Language Settings > Languages. Under Default languages for documents, select the document language for all newly created documents.
- To turn off the language check in LibreOffice Calc, you can follow these steps:
  
  Open any LibreOffice application (Writer, Calc, etc.).
  Click on Tools > Options.
  Go to Language Settings > Writing Aids.
  In the Options section, uncheck Check spelling as you type. 

#### Text & Format

- [Excel 将文本或数字的格式设置为上标或下标](https://support.microsoft.com/zh-cn/office/%E5%B0%86%E6%96%87%E6%9C%AC%E6%88%96%E6%95%B0%E5%AD%97%E7%9A%84%E6%A0%BC%E5%BC%8F%E8%AE%BE%E7%BD%AE%E4%B8%BA%E4%B8%8A%E6%A0%87%E6%88%96%E4%B8%8B%E6%A0%87-3649411b-adf4-483e-b0e8-7b844605da74)

- 除了使用快捷键可以进行换行外，换行符也可以在公式中进行。 CHAR(10)是表示换行符，10表示换行符的ASCII码值。 将下面的两个信息进行连接，并且连接符为换行符。 在C2单元格中输入公式：=A2&CHAR(10)&B2，然后单击Enter键后单击 即可。

  e.g. 

  ```excel
  ="\includegraphics[width=0.75\textwidth]{"&B1&".png} & \hspace{12pt} $"&ROUND(B12,2)&"\ \pm$&$\ "&ROUND(B11,2)&"$ \\"&CHAR(10)
  ```

- When you copy the text out of Excel, it adds double quotes to preserve the linebreak character??

#### Calculation

- To calculate the correlation coefficient, you can use the `CORREL` function. 

  In an empty cell, enter the formula `=CORREL(A1:A10,B1:B10)`, replacing `A1:A10` and `B1:B10` with the cell ranges containing your data.

- In both Excel and LibreOffice Calc, you can calculate the dot product (点积) of two vectors by using similar formulas.
  In Excel, you can use the `SUMPRODUCT` function to calculate the dot product of two vectors. 

  For example, if your first vector is in cells A2:A8 and your second vector is in cells B2:B8, you can use the following formula: `=SUMPRODUCT(A2:A8,B2:B8)`. This formula multiplies corresponding entries in the given arrays and returns the sum of those products.
  In LibreOffice Calc, you can also use the `SUMPRODUCT` function

- *SUMXMY2*(array_x, array_y) 返回两数组中对应数值之差的平方和。For example:

  ```
  =SQRT(SUMXMY2(B12:J12,B13:J13)/COUNT(B12:J12))
  ```

- if your vector is in cells A1 to A5, you can use the formula =SUMSQ(A1:A5) to calculate the sum of squares of the values in those cells.

### MS PPT

- [PPT中如何将多个图形等距分布](https://jingyan.baidu.com/article/fec7a1e5c51b1d1190b4e7ca.html)
- 美化大师插件：批量删除动画；PPT工具栏

### Foxit Reader

#### Shortcuts

- Alt+F3：手型工具
- Alt+F6：选择

### Convert

https://cloudconvert.com/epub-to-pdf

https://www.freepdfconvert.com/epub-to-pdf

### Other Windows Tools

[Win11画图工具怎么图片调整像素-百度经验 (baidu.com)](https://jingyan.baidu.com/article/3065b3b681e9b1ffcff8a4c7.html)



## Scientific

### Origin

https://www.zhihu.com/column/c_1368227352443572224

- 平滑处理

  <img src="https://cdn.jsdelivr.net/gh/gxf1212/notes@master/techniques/images/origin-smooth.png" style="zoom:80%;" />

- https://www.jianshu.com/p/7f93c9c2b777

  origin更新上下标，要在book（data）那里Ctrl+S

- [数据导入到Origin后全变成了#号的原因](https://www.office68.com/openoffice/9159.html)：不够宽。。

- [origin怎么进行线性拟合](https://www.zhihu.com/question/29392864/answer/104174248)

- [Origin如何让坐标轴刻度向内](https://jingyan.baidu.com/article/2fb0ba404b095200f2ec5f16.html)

- 调整ticks

  ![](https://cdn.jsdelivr.net/gh/gxf1212/notes@master/techniques/images/origin-ticks.png)

- [Origin如何在右侧插入列](https://www.10kn.com/originpro-insert-right-col/)

- ![origin-equation](https://cdn.jsdelivr.net/gh/gxf1212/notes@master/techniques/images/origin-equation.png)

- 

> [origin自动载入xvg数据作图](https://jerkwin.github.io/2018/08/06/origin%E8%87%AA%E5%8A%A8%E8%BD%BD%E5%85%A5xvg%E6%95%B0%E6%8D%AE%E4%BD%9C%E5%9B%BE/)

### GraphPad Prism



#### other

- linear regression: https://www.graphpad.com/quickcalcs/linear1/

- [GraphPad Prism 9 Curve Fitting Guide - Equation: Competitive inhibition](https://www.graphpad.com/guides/prism/latest/curve-fitting/reg_competitive_inhibition.htm)

  > these free tools are calculator; it cannot create simple plots?

### Scientific writing

https://www.home-for-researchers.com/static/index.html#/

https://app.bibguru.com/: fast citation generation



## Literature

### Mendeley

skills:

- I just make notes on the right. may use "favorite"
- drag the entry to another folder
- "Enter" to change the position of last name and first 
- open .ris or .bib ..... with Medeley!!
- files--add file
- contents: to quickly compare the papers, to summarize



### Export a brief format

导出那种，作者、杂志、年期卷的格式，放在PPT最下面：

- 导入到bibguru，生成Vancouver格式的reference list
- 粘贴进ChatGPT，让它生成

> prompt:
>
> I will give you reference to literatures, such as: 
>
> Sánchez-Aparicio J-E, Tiessler-Sala L, Velasco-Carneros L, Roldán-Martín L, Sciortino G, Maréchal J-D. BioMetAll: Identifying metal-binding sites in proteins from backbone preorganization. J Chem Inf Model [Internet]. 2021;61(1):311–23. Available from: http://dx.doi.org/10.1021/acs.jcim.0c00827 
>
> It's usually in the format of: *journal name*. year, volume, issue, page and can you give me a shorter version of citation in markdown format? 
>
> In the above example, you should give me: `[*J Chem Inf Model* 2021, 61, 1, 311–23.](http://dx.doi.org/10.1021/acs.jcim.0c00827) `
>
> journal names should be italic. no need to add [source] after that. no need to add author names. you should also add hyperlink of the website to the citation string. it is, in this case, "http://dx.doi.org/10.1021/acs.jcim.0c00827".

bug：Chemical Science那篇文章，无法根据缩略版的条目搜到文章，但是加上作者名字就可以。。



For ACS papers, copy from here

![](https://cdn.jsdelivr.net/gh/gxf1212/notes@master/techniques/images/acs-cite.png)

#### Other

pdf文件标题粘贴到微信对话框就失去换行成为一整行了

## ChatGPT etc.

- OpenAI's services are not available in your country. (error=unsupported_country)
  解决方法：全局模式

- [ChatGPT 常见错误原因及解决方案：报错、回答不完整、网络错误等](https://blog.csdn.net/marin1993/article/details/128219198)。搞不定就换节点，刷新

- Edge dev: https://www.microsoftedgeinsider.com/zh-tw/download

- https://platform.openai.com/ get your API key

- 只需要在 Chrome 浏览器上下载安装[ `Bing Chained` ](https://chrome.google.com/webstore/detail/bing-unchained-use-new-bi/laldfnbbeocphnilnofhedhcjcnchbld/related)这个插件，再访问 [www.bing.com](https://link.juejin.cn/?target=http%3A%2F%2Fwww.bing.com) 就会出现 New Bing AI 入口

- Bing AI for Firefox: [Get this Extension for 🦊 Firefox (en-US) (mozilla.org)](https://addons.mozilla.org/en-US/firefox/addon/bing-ai-for-firefox/)

- https://github.com/xcanwin/KeepChatGPT 

  https://mp.weixin.qq.com/s/ngOXSb296BLf74usmc9kqw

- a domestic new choice: [天工AI搜索 — 知识从这里开始 (tiangong.cn)](https://search.tiangong.cn/)，除了百度、讯飞、阿里等

- 



usage

[升级篇：超详细ChatGPT(GPT 4.0)论文润色指南+最全提示词——持续更新 - 简书 (jianshu.com)](https://www.jianshu.com/p/f228222f623b)

[ChatGPT Prompt 最佳指南一：写清晰的说明 (selfboot.cn)](https://selfboot.cn/2023/06/10/gpt4_prompt_clear/)

[Prompt engineering - OpenAI API](https://platform.openai.com/docs/guides/prompt-engineering/strategy-write-clear-instructions)



## Other Tools

### ZJU

[浙大邮箱 帮助中心](https://mail.zju.edu.cn/coremail/help/clientoption_zh_CN.jsp)

[Web of Science检索平台 - 数据库导航 - 浙江大学图书馆](http://210.32.137.90/s/lib/libtb/show/405)：[校外使用WOS](https://www.webofknowledge.com/?auth=ShibbolethIdPForm&entityID=https%3A%2F%2Fidp.zju.edu.cn%2Fidp%2Fshibboleth&target=https%253A%252F%252Fwww.webofknowledge.com%252F%253FDestApp%253DUA&ShibFederation=ChineseFederation&DestApp=UA)

图书馆讲座视频会自动保存在钉群的直播回放中，此外，往期讲座视频还可在学在浙大上观看，详见：
https://course.zju.edu.cn/zh-cn/pages/courselist?departmentid=3598&departmentname=%E5%9B%BE%E4%B9%A6%E9%A6%86

### ThunderBird

xjtu email: just login, default configuration

> https://zhuanlan.zhihu.com/p/152548000

1. specify contacts 联系人, signature
2. plugin: [FileLink Provider for Dropbox](https://addons.thunderbird.net/zh-CN/thunderbird/addon/filelink-provider-for-dropbox/?src=search), Send later

网易邮箱大师，可以搞个Mac版？

### Gmail

在搜索栏输入 in:**inbox** is:unread 筛选出**收**件**箱**中所有**未读邮件**； 点击左上角的选中全部； 在页面上面点击“选择与此搜索匹配的所有会话”选择出所有**未读邮件**。 之后点击“**标记**为**已读**”即可将收件箱中的所有**未读邮件**一键**标记**为**已读**状态：
[谷歌邮箱 Gmail 如何一次性将所有未读邮件标为已读？ - 老王博客](https://www.bing.com/ck/a?!&&p=3890c46df33db1bcJmltdHM9MTY3ODc1MjAwMCZpZ3VpZD0yYmEyOWMwMi1lZDI3LTZlNTQtMDBmNC04ZWJlZWM2ZDZmODgmaW5zaWQ9NTQwNA&ptn=3&hsh=3&fclid=2ba29c02-ed27-6e54-00f4-8ebeec6d6f88&psq=gmail的inbox中总是有11封邮件未读，但又看不到，如何将它们标记为已读或删除？&u=a1aHR0cHM6Ly9sYW93YW5nYmxvZy5jb20vZ21haWwtcmVhZC1hbGwuaHRtbCM6fjp0ZXh0PSVFNSU5QyVBOCVFNiU5MCU5QyVFNyVCNCVBMiVFNiVBMCU4RiVFOCVCRSU5MyVFNSU4NSVBNSUyMGluJTNBaW5ib3glMjBpcyUzQXVucmVhZCwlRTclQUQlOUIlRTklODAlODklRTUlODclQkElRTYlOTQlQjYlRTQlQkIlQjYlRTclQUUlQjElRTQlQjglQUQlRTYlODklODAlRTYlOUMlODklRTYlOUMlQUElRTglQUYlQkIlRTklODIlQUUlRTQlQkIlQjYlRUYlQkMlOUIlMjAlRTclODIlQjklRTUlODclQkIlRTUlQjclQTYlRTQlQjglOEElRTglQTclOTIlRTclOUElODQlRTklODAlODklRTQlQjglQUQlRTUlODUlQTglRTklODMlQTglRUYlQkMlOUIlMjAlRTUlOUMlQTglRTklQTElQjUlRTklOUQlQTIlRTQlQjglOEElRTklOUQlQTIlRTclODIlQjklRTUlODclQkIlRTIlODAlOUMlRTklODAlODklRTYlOEIlQTklRTQlQjglOEUlRTYlQUQlQTQlRTYlOTAlOUMlRTclQjQlQTIlRTUlOEMlQjklRTklODUlOEQlRTclOUElODQlRTYlODklODAlRTYlOUMlODklRTQlQkMlOUElRTglQUYlOUQlRTIlODAlOUQlRTklODAlODklRTYlOEIlQTklRTUlODclQkElRTYlODklODAlRTYlOUMlODklRTYlOUMlQUElRTglQUYlQkIlRTklODIlQUUlRTQlQkIlQjYlRTMlODAlODIlMjAlRTQlQjklOEIlRTUlOTAlOEUlRTclODIlQjklRTUlODclQkIlRTIlODAlOUMlRTYlQTAlODclRTglQUUlQjAlRTQlQjglQkElRTUlQjclQjIlRTglQUYlQkIlRTIlODAlOUQlRTUlOEQlQjMlRTUlOEYlQUYlRTUlQjAlODYlRTYlOTQlQjYlRTQlQkIlQjYlRTclQUUlQjElRTQlQjglQUQlRTclOUElODQlRTYlODklODAlRTYlOUMlODklRTYlOUMlQUElRTglQUYlQkIlRTklODIlQUUlRTQlQkIlQjYlRTQlQjglODAlRTklOTQlQUUlRTYlQTAlODclRTglQUUlQjAlRTQlQjglQkElRTUlQjclQjIlRTglQUYlQkIlRTclOEElQjYlRTYlODAlODElRUYlQkMlOUE&ntb=1)

### TIM in Linux (wine)

installation: see [Linux-fundamental](/techniques/Linux-fundamental?id=other-softwares)

1. QQ个人文件夹中的文件被占用，您可以尝试以下操作: https://www.jianshu.com/p/f38187cdda0f

   如果刚刚退出相同QQ帐号，请等待几秒后重试登录。
   QQ退出时出现异常无法正常退出，请使用任务管理器结束QQ.exe后再尝试登录

2. 屏幕截图：必须调出聊天对话框才能截图。。

3. a terrible problem: cannot locate files well. 

   - default folder, either inside wine or desktop (cannot drag...). 
   - cannot 'open the folder' (redirect to the browser with wrong path...)

new QQ for Linux: https://im.qq.com/linuxqq/index.shtml

- 

### Tencent meeting

<img src="https://cdn.jsdelivr.net/gh/gxf1212/notes@master/techniques/images/Tencent-meeting.png" style="zoom:50%;" />





### 钉钉

钉钉客户免费享有聊天消息云端存储180天

开通钉钉专业版，内部聊天记录（包含内部群以及内部单聊）保存时间将从180天调整为2年



### Browser

[键盘快捷键 | Firefox 帮助 (mozilla.org)](https://support.mozilla.org/zh-CN/kb/键盘快捷键)



# LaTeX

notes from Windows

## Basics

- The Comprehensive Tex Archive Network = CTAN

- The Missing \begin{document} is because you're using it in the preamble

- 

### font

1. installing font

   可以在 `C:\texlive\2019\texmf-dist\fonts\opentype`（你看你的安装目录）下找一个合适的位置，建一个文件夹，把思源字体拷进去，然后在命令行中输入，`fc-cache -fv`

   建一个Libertinus文件夹，放进去

- Simply load ulem with the option normalem, otherwise all \emphasized words will be underlined.

  https://tex.stackexchange.com/questions/179691/removing-underline-from-journal-title-when-using-hyperref

  

### title

1. `\titlecontents`：目录中的格式

## Float

- https://blog.csdn.net/u012428169/article/details/80558331 没有进行特殊命令处理，但是显示的图片和表格标号跟它们在LaTeX编辑环境中放置的章节有关，这并不是一般文章要求的。

### table

- [Latex 表格文字居中（垂直和水平居中）_latex表格文字居中_ICQQ123的博客-CSDN博客](https://blog.csdn.net/ICQQ123/article/details/114701859)

## Page

- The command `\clearpage` forces a page break and flushes all floats (e.g., figures and tables) that have not yet been placed. The command `\pagestyle{empty}` changes the page style for the current and subsequent pages to `empty`, which means that the headers and footers will be empty.
  The command `\cleardoublepage` is similar to `\clearpage`, but it also ensures that the next page is an odd-numbered page (i.e., a right-hand page in a two-sided document). If the current page is already an odd-numbered page, then `\cleardoublepage` simply issues a new page. Otherwise, it issues two new pages.
  In summary, the command `\clearpage{\pagestyle{empty}\cleardoublepage}` forces a page break, flushes all floats, changes the page style to `empty`, and ensures that the next page is an odd-numbered page.

### fancyhdr

1. 如何在目录页去掉页码：可以在目录生成命令后加入`\thispagestyle{empty}`即可。

   https://www.latexstudio.net/archives/7985.html

## Math

1. subscript newline

   ```latex
   \mathop{\arg\min}\limits_{\alpha} % \limits must follow an operator
   \atop %下标换行
   % not a good idea
   sum_{\substack{\text { nonbonded } \\ \text { pairsi,j }}
   ```

2. 尖括号`⟨⟩`: `\langle`, `\rangle`

## Bibliography

1. bst file
   - bst文件介绍 https://liwt31.github.io/2021/03/02/bst/ 
   - 详细语法 https://www.latexstudio.net/archives/11052
   - `latex makebst`: [the most detailed guide](https://kingdomhe.wordpress.com/2017/12/02/%E5%A6%82%E4%BD%95%E8%87%AA%E5%AE%9A%E4%B9%89-bibtex-%E7%9A%84%E5%8F%82%E8%80%83%E6%96%87%E7%8C%AE%E6%A0%BC%E5%BC%8F-bst-%E6%96%87%E4%BB%B6-how-to-generate-a-customized-bst-file/)
     - make, not modify
     - dbj to bst: `latex *.dbj`
2. https://www.codenong.com/cs106438317/ 解决! Package natbib Error: Bibliography not compatible with author-year
3. comment in .bib file: `//` or `%`
4. 如果将某个参考文献中的某一个项目去掉，可以在这一行前加『//』。不是去掉@就行吗？
5. to prevent websites from appearing, you have to comment out both `url` and `doi`
6. 万方可以直接导出bibtex，辣鸡知网就不行. whatever
7. citation keys cases https://tex.stackexchange.com/questions/623482/case-mismatch-between-cite-keys
8. https://tex.stackexchange.com/questions/174030/misplaced-alignment-tab-character-error-when-citing-a-particular-entry Look for & in a bibliographic item and change it into \&

https://www.bruot.org/ris2bib/

## Chinese

- **[latex显示中文 - CodeAntenna](https://codeantenna.com/a/NF4HbNFgM4)**

  分为两种情况，情况一是文章需要显示少量中文（CJK），情况二是文章包括很多中文（ctex）。

  1. 在源文件中导言部分加入代码`\usepackage{CJKutf8}`

  2. 代码前后可以紧接着加入其它文字，比如

     ```latex
     Software \begin{CJK*}{UTF8}{gbsn}软件\end{CJK*}vulnerabilities
     ```

  3. 此时需要用pdfLaTeX编译。

- https://jdhao.github.io/2018/03/29/latex-chinese.zh/
  http://mirrors.ibiblio.org/CTAN/macros/xetex/latex/xecjk/xeCJK.pdf
  xeCJK 只提供了字体和标点控制等基本 CJK 语言支持。对于中文文档，可以使用更为高 层的 ctex 宏包或文档类，它将自动调用 xeCJK 并设置好中文字体，同时提供了进一步的本地化支持。详细内容参看 ctex 宏包套件的说明。
  所以用的还是英文的缩进方式。

  ```latex
  % 该文件使用 xelatex 命令可以编译通过
  \documentclass[12pt, a4paper]{article}
  \usepackage{fontspec}
  \usepackage[slantfont, boldfont]{xeCJK}
  ```

  

## Advanced Control

### if statement

- `\ifcsname`

  ```latex
  \ifcsname foo\endcsname
    \message{\string\foo\space is defined}%
  \else
    \message{no command \string\foo}%
  \fi
  ```

  这些newtoks不是没被定义，而是没被赋值（值为empty）
  https://www-sop.inria.fr/marelle/tralics/auxdir/tdoc1cid2.html

  ```latex
  \makeatletter
  \ifcsname foo\endcsname A\else a\fi
  \ifx\foo\undefined  B\else b\fi
  \ifdefined\foo  C\else c\fi
  \@ifundefined{FOO}{D}{d}
  \ifcsname FOO\endcsname E\else e\fi
  \ifdefined\FOO F\else f\fi
  ```

- If you want to put the conditional statement in the preamble (i.e., before the `\begin{document}` command), you can use the `\AtBeginDocument` command to delay the execution of the conditional statement until after the `\begin{document}` command. Here is an example:

  ```latex
  \documentclass{article}
  \newif\ifxxx
  \AtBeginDocument{
    \ifxxx
      The condition is true.
    \else
      The condition is false.
    \fi
  }
  \begin{document}
  
  \xxxtrue % Set the condition to true
  hahaha
  
  \end{document}
  ```



## Other

- code: http://www.noobyard.com/article/p-nymwcdnd-nx.html  插入Python代码升级方案（类似jupyter notebook的配色？）
- https://blog.csdn.net/weixin_44556141/article/details/121429470  ctexart才有这个，article没有

### TODO list

- [ ] XJTU bachelor template
  - https://www.overleaf.com/project/62c93b67055128749a1563a8
- [ ] texstudio 参考文献编译链

## TexStudio

### Language checking

![image-20230228143910914](https://cdn.jsdelivr.net/gh/gxf1212/notes@master/techniques/images/language-checking.png)

https://tex.stackexchange.com/questions/319580/texstudio-how-to-get-access-to-the-added-words-to-dictionary

menu > Options > Configure TexStudio > Language checking > Spelling dictionary directories.

https://yinqingwang.wordpress.com/    [LanguageTool](https://www.languagetool.org/)

[How to remove added word from dictionary in texstudio?](https://blog.csdn.net/ChenglinBen/article/details/117150581) [another ref](https://tex.stackexchange.com/questions/319580/texstudio-how-to-get-access-to-the-added-words-to-dictionary) check user words. 点击tools, 然后找到Check Spelling

https://tex.stackexchange.com/questions/87650/dictionary-for-texstudio-no-dictionary-available

texstudio中文红线，临时的办法 https://www.cnblogs.com/litifeng/p/11633360.html

![](https://cdn.jsdelivr.net/gh/gxf1212/notes@master/techniques/images/LaTeX-check-spelling.png)



- [texstudio structure（结构）不见了，如何进行查找](https://blog.csdn.net/liuyiming2019/article/details/115272007)：就在左下角。。

- 在子文档中编译整个文档。毕业论文的模板包含多个文件，写作往往在子文件里，然而如果不加设置地直接编译子文件是会报错的。这时需要在“选项”中设置主文档或者在主文档第一行中加入meta信息`% !TeX root = main.tex`(假设主文档是main.tex的话)。这样在任何一个子文件都可以直接编译，等价于编译main.tex。

  [Texstudio使用经验](http://haccanri.github.io/tools/2015/04/22/tex_editor.html)

- [TeXstudio 设置定时自动保存_Amnesia Greens的博客](https://blog.csdn.net/amnesiagreen/article/details/120879230)

- 

# VScode syntax highlight tool

Welcome to install my [md-highlighter](https://marketplace.visualstudio.com/items?itemName=gxf1212.md-highlighter)!

## Workflow

[Syntax Highlight Guide | Visual Studio Code Extension API](https://code.visualstudio.com/api/language-extensions/syntax-highlight-guide)

> [Extension API](https://code.visualstudio.com/api)

example tutorial: 

- [想让VSCode识别自己的编程语言？立马安排 CSDN博客](https://blog.csdn.net/weixin_44151650/article/details/121321503)
- [从零开始撸一个 VSCode Extension - 掘金 (juejin.cn)](https://juejin.cn/post/7117082008819351566) see 'publish'

related extensions: gmxhelper, bioSyntax

### Initialize

download [Yocode - vscode-docs](https://vscode-docs.readthedocs.io/en/stable/tools/yocode/)

```shell
npm install -g yo generator-code
```

`package.json` example: https://github.com/Zuttergutao/gmxhelper/blob/main/package.json

```shell
yo code
```

select "New Language Support"

### Test or debug

Run the extension (open that folder) by pressing F5 in Visual Studio Code. This will open a new window with the extension loaded. Or [Ctrl+shift+P and "Reload window"](https://stackoverflow.com/questions/42002852/how-to-restart-vscode-after-editing-extensions-config) to refresh extensions. Open a file with the .rtf extension to test the syntax highlighting.

When you're satisfied with the extension, package it by running `vsce package` in the terminal window. This will create a .vsix file that you can distribute or install on other machines.

手动安装插件：非常简单，把整个插件文件夹，拷贝到`%USERPROFILE%/.vscode/extensions`(Linux是`~/.vscode/extensions`)，重启VSCode就可以啦！

or: Ctrl+shift+P and "install extension from location"

### Publish

[Publishing Extensions | Visual Studio Code Extension API](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)

```shell
# modify version number
git commit ...
vsce publish
```

> [Extension Manifest](https://code.visualstudio.com/api/references/extension-manifest#approved-badges)
>
> [VSCode 插件开发（三）：插件打包与本地安装 - 简书 (jianshu.com)](https://www.jianshu.com/p/bb379a628004)

### Debug

- Test or debug

  - sometimes failed. may edit `extensions.json` and restart

    maybe still fail. I'm not clear about the mechanism of recognition....

  - after reloading vscode window, my extension disappears. how to install it permanently? I have put the folder in .vscode/extensions. this is an extension I am developing and files are constantly changing. so using vsix file is not possible.

    莫名其妙就好了，好像是把.obsolete (已废弃的，已不用的，已失时效的) 文件清空而不是删掉？

  - Press F5 and it says`you don't have an extension for debugging json`: lacking of `.vscode` folder...

- ["vsce publish" command returns Invalid publisher name 'Siarhei Kuchuk'. Expected the identifier of a publisher, not its human-friendly name. · Issue #419 · microsoft/vscode-vsce (github.com)](https://github.com/microsoft/vscode-vsce/issues/419)

  publisher name in `package.json` should not contain spaces

## Directory structure

see the above reference links

- `package.json`，保存了我们在第二步中给出的答案，你也可以在此处进行修改。
- 几个Markdown文件，为你提供了标准的通知模板，如果你有留意过VSCode下载插件界面的内容，会发现与该模板大差不差。
- `language-configuration.json`，该文件中的内容，相当于全局定义，它包括以下几部分：注释方式、允许的括号、自动补全的括号、选中文字后输入会自动括起来的符号。
- `./syntexes/mylang.tmLanguage.json`，该文件是本项目的重点，我们需要在此处定义编程语言的文法

> [Semantic Highlight Guide | Visual Studio Code Extension API](https://code.visualstudio.com/api/language-extensions/semantic-highlight-guide#theming): define color styles different from the current theme?

### `package.json` file

```json
{
  "name": "md-highlighter",
  "displayName": "md-highlighter",
  "description": "Highlighting files about molecular modeling and dynamics simulation.",
  "version": "0.0.3",
  "publisher": "gxf1212",
  "repository": "https://github.com/gxf1212/md-highlighter",
  "engines": {
    "vscode": "^1.78.0"
  },
  "icon": "./images/benzene.png",
  "categories": [
    "Programming Languages"
  ],
  "contributes": {
    "languages": [{
      "id": "rtf",
      "aliases": ["NAMD force field", "rtf"],
      "extensions": [".rtf", ".str", ".inp", ".prm"],
      "configuration": "./language-configuration.json"
    },
    {
      "id": "pdb",
      "aliases": ["PDB file", "pdb"],
      "extensions": [".pdb"],
      "configuration": "./language-configuration.json"
    },
    {
      "id": "frcmod",
      "aliases": ["frcmod file", "frcmod"],
      "extensions": [".frcmod"],
      "filenamePatterns": ["frcmod.*"],
      "configuration": "./language-configuration.json"
    }],
    "grammars": [{
      "language": "rtf",
      "scopeName": "source.rtf",
      "path": "./syntaxes/rtf.tmLanguage.json"
    },
    {
      "language": "pdb",
      "scopeName": "source.pdb",
      "path": "./syntaxes/pdb.tmLanguage.json"
    },
    {
      "language": "frcmod",
      "scopeName": "source.frcmod",
      "path": "./syntaxes/frcmod.tmLanguage.json"
    }]
  }
}

```

- `aliases`: what appears in the bottom right corner of VScode
- To highlight all files **starting with frcmod**, you can use the `filenamePatterns` property that co-exists with `extensions` field

### `xxx.tmLanguage.json` file

e.g. [bioSyntax/vscode/syntaxes/pdb.tmLanguage.json at master](https://github.com/bioSyntax/bioSyntax/blob/master/vscode/syntaxes/pdb.tmLanguage.json)

also, see the above tutorial, or [md-highlighter/syntaxes/rtf.tmLanguage.json at main ](https://github.com/gxf1212/md-highlighter/blob/main/syntaxes/rtf.tmLanguage.json)

replace the content with yours

```json
{
    "$schema": "https://raw.githubusercontent.com/martinring/tmlanguage/master/tmlanguage.json",
    "name": "PSF from GUI, that from vmd is different",
    "scopeName": "source.psf",
    "fileTypes": [
        "psf"
    ],
    "patterns": [
        {
            "name": "comment.line.psf",
            "match": "^\\*.*$"
        },
        {
            "begin": "^\\s+REMARKS\\b",
            "end": "$",
            "name": "comment.line.remark.pdb"
        },
        {
            "//": "ATOM and BOND is missing...",
            "name": "keyword.psf",
            "match": "\\b(PSF|CMAP|NTITLE|NATOM|NBOND|NTHETA|NPHI|NIMPHI|NDON|NACC|NNB|NGRP|NUMLP|NCRTERM)\\b"
        },
        {
            "name": "entity.name.tag.total_number",
            "match": "(?<=^\\s+)\\d+(?= !N)"
        },
        {
            "begin": "(^\\s*\\d+\\s+!NATOM\\s*$)", 
            "end": "(^\\s*\\d+\\s+!NBOND:\\s+bonds\\s*$)",
            "//": "format: atomid segname resid resname atomname atomtype charge mass unknown",
            "///":"^\\s+\\d+\\s+\\S+\\s+\\d+\\s+\\S+\\s+\\b[A-Z0-9]+\\b\\s+\\b[A-Z0-9]+\\b\\s+(-?\\d+\\.\\d*(E-01)?)\\s+(-?\\d+\\.\\d*)\\s+\\d+$",
            "patterns": [
                {
                    "name": "constant.numeric.atom-number.psf",
                    "match": "(?<=^\\s+)\\d+(?=\\s+\\S+\\s+\\d+\\s+\\S+\\s+\\b[A-Z0-9]+\\b\\s+\\b[A-Z0-9]+\\b\\s+(-?\\d+\\.\\d*(E-01)?)\\s+(-?\\d+\\.\\d*)\\s+\\d+$)"
                },
......               
            ]
        },
        {
            "name": "constant.numeric.psf",
            "match": "\\b\\d+\\b|(?<=^\\s*)\\d+"
        }
    ]
}
```

NOTE: no comments in `.json` file. write a field `'//': 'comment'`

List of scope names: [Scope Naming (sublimetext.com)](https://www.sublimetext.com/docs/scope_naming.html), recommended: see "MINIMAL SCOPE COVERAGE"

> actually you can define anything after the first keyword...

capture group: failed and not using...

## Regular expression

### Basics

反斜杠\需要用另一个反斜杠进行转义，所以特殊匹配一般都是双反斜杠

### Elements

#### Characters

- 非空白字符（`\\S`）
- a whitespace character (`\\s`), 
  - `\\s` 匹配任何空白字符，包括空格、制表符、换页符等。

- a digit, or integer (`\\d`)
- 任意字符（`.{#}`）。
  - `"(?<=^.{6}).{5}"`：第7到第11列中的任意字符
  - `.*`: any characters (between something)
  - point: `\\.`

#### Quantity

- 可选：`?`
  - 一个可选的负号（`-?`）
- `*`表示零个或多个，`+`表示一个或多个
  -  `\\s*` 来表示零个或多个空白字符。
  - 一个或多个数字（`\\d+`）；至少一个空白字符（`\\s+`）


#### Range

`\\b`表示单词边界。它用于匹配一个位置，这个位置的前面或后面是一个单词字符（字母、数字或下划线），而另一边不是单词字符。例如，在正则表达式`\\bword\\b`中，两个`\\b`分别表示单词"word"的开头和结尾。这个正则表达式可以匹配字符串"This is a word."中的"word"，但不会匹配字符串"This is a sword."

- start of line (`^`)
- end of line (`$`)

#### Assertion

https://www.regular-expressions.info/lookaround.html

`(?<=\\bBOND\\s)`是一个正向后视断言，它表示匹配的内容必须紧跟在"BOND"这个单词和一个空格之后。

`"^(?!\\${4})\\S+$"`是负向前瞻断言，可以匹配以非空白字符开头且不包含字符串 `$$$$` 的行

`(?!foo)`:Negative Lookahead. Asserts that what immediately follows the current position in the string is not foo

`(?<!foo): Negative Lookbehind. Asserts that what immediately precedes the current position in the string is not foo

在正则表达式中，可以在模式的开始处使用(?i)选项来表示接下来的匹配将不区分大小写。例如`(?i)hello`将匹配Hello、HELLO、hello等任何形式的hello字符串。



### Examples

- `"(?<=\\bBOND\\s)(\\S+\\s+\\S+\\s*)+"`，这样就可以匹配"BOND"后面的所有字符串对了。
- `"(?<=\\bIC\\s)(\\S+\\s+){4}"`，这样就可以匹配"IC"后面的前四个字符串了。
- a combination: `(?<=\\bANGLE\\s*)((\\S+\\s*){3})+`



### begin-end

begin和end匹配的关键词，如psf的ATOM和BOND，目前无法进行任何形式的高亮

 begin和end之间也不再用外部的语法，而是独立的







# Applications for fun

## Write games in python

### Basics

还有另外几种GUI：https://www.runoob.com/python/python-gui-tkinter.html

#### pygame

https://pygame.readthedocs.io/

很好的基础 https://blog.csdn.net/zha6476003/article/details/82940350/

Clock https://learnku.com/python/t/38674

```
pip install pygame
```

pygame画button的逻辑不同，生成是从字符串创建surface，点击是要判断位置……

#### tkinter

跟C#那个接近

https://docs.python.org/3/library/tkinter.html

[a tutorial](https://realpython.com/python-gui-tkinter/#building-your-first-python-gui-application-with-tkinter)

- The **`side`** keyword

挺好的tutorial https://mofanpy.com/tutorials/python-basic/tkinter/

但是那个doc基本用不了

- Python: tkinter窗口屏幕居中,设置窗口最大,最小尺寸
  
  https://blog.csdn.net/yao_yu_126/article/details/23717355

- Button详解与位置调整
  
  https://www.tianqiweiqi.com/python-tkinter-button.html
  
  - command： 指定按钮消息的回调函数；
  - 指定按钮上文本的位置anchor: must be n, ne, e, se, s, sw, w, nw, or center
  
  > frame类似panel？

- `.place()` is not used often. It has two main drawbacks:
  
  1. **Layout can be difficult to manage with `.place()`.** This is especially true if your application has lots of widgets.
  2. **Layouts created with `.place()` are not responsive.** They don’t change as the window is resized. 除非用相对的。relx/y是针对window的

- 您可以call self.update（）你已经把它的屏幕（上之后`pack`，`grid`等），以使其绘制。绘制后，`winfo_width`, `winfo_x` and `winfo_height`命令将起作用。

- https://jingyan.baidu.com/article/3f16e00312aaa62591c10315.html
  
  win.winfo_x()

#### wx

https://docs.wxpython.org/

https://codingdict.com/article/7713

### linkGame

pygame连连看 https://juejin.cn/post/6969082546801868807

other

> https://blog.csdn.net/weixin_40957741/article/details/102761183  Python variable underline



## other

AI chatbots

- https://www.cleverbot.com/
- https://myanima.ai/app/
- https://my.replika.ai/
- https://simsimi.com/chat

