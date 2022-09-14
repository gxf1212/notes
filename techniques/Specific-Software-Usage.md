# Specific Software Usage

Here shows some specific experiences on daily working.

Fret not over bygones, and the forward journey take.

> wakeonlan
> 
> future: onedrive cloud mount, not occupying  my HD...
> 
> 能装/home还是尽量

go to [onedrive](#Linux)

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

5. scp: secure copy
   
   https://www.cnblogs.com/l199616j/p/12092113.html
   
   see `cluster_usage.md` detailed

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

### easyconnect

easyconnect：没事不要老开着，当自动断开时就重启一下！！

https://my.liyunde.com/easy-connect-activity-monitor/  强制杀死easyconnect，但没launchctl这个命令

## Git!

### in cmd

1. basic

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

11. 

### exploration

1. GitHub克隆Gitee的仓库

   ![clone](https://cdn.jsdelivr.net/gh/gxf1212/notes@master/techniques/images/clone.jpg)

   cloning is boring, why not sync a repository?

   https://gitee.com/help/articles/4336#article-header10

   **进入需要使用镜像功能的仓库，进入「管理」找到「仓库镜像管理」选项**

   限时开放至 2022 年 08 月 31 日，在限时开放期结束前，我们将更新相关产品策略。

   git actions for gitee? https://gyx8899.gitbook.io/blog/share/syncgithubtogitee

2. 2022.6 update: no more gitee...

   GitHub虽然自动部署，还是需要清理缓存才能看的

   cdn.jsdelivr.net/npm: does not work well for js scripts? but works fine for figures. different format from unpkg.com

3. 

4. 

## Supercomputers

### tools

#### ssh and scp

under Win, Xshell+Xftp look very good. Dragging and clicking a visualized folder will be effcient

finalshell does not look so pretty though we can just use it. cannot update

#### electerm

> functions covers what is in Xshell and Xftp, but kind of small font...but a great tool!

（不是恰饭，是我在用）

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

### scheduling system

#### slurts

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
  - `qsub`
  - `qdel`
- Environment Variable https://pubs.opengroup.org/onlinepubs/009696699/utilities/qsub.html
  - like `$PBS_O_WORKDIR`
- 
- 

## Typora

1. 自定义快捷键
   
   https://blog.csdn.net/December_shi/article/details/108690116
   
   Ctrl+5 in Linux does not work?

2. 

### plugins

1. mermaid语法
   - 特殊符号，要加引号才显示 https://github.com/mermaid-js/mermaid/issues/213
2. 

### themes

1. liquid: cannot see the mouse cursor in titles and hyperlinks?

### Crack

just search...

https://www.ghxi.com/typora.html

Mac：https://macwk.com/soft/typora

## VScode

1. theme
   
   (description) I also met [this question](https://stackoverflow.com/questions/70221994/unable-to-change-theme-in-vs-code) or [this](https://www.reddit.com/r/vscode/comments/lx7536/any_idea_why_my_theme_is_suddenly_changing_every/)
   
   > [Workbench Appearance color theme keeps being overridden](https://github.com/microsoft/vscode/issues/105102)
   > 
   > 引申出主题的管理方式：和系统有关。。
   
   No! finally, vscode theme问题：biosyntax和gmxhelper要用它们自己的theme
   
   solution: disable掉他俩, 然后settings（ctrl+,）里面搜索theme

2. 

## Pycharm

1. https://blog.csdn.net/qq_41330454/article/details/105906347 控制台命令提示符是In[2]. ipython!

   http://errornoerror.com/question/13223264808178804318/

2. [关闭代码风格检查](https://blog.csdn.net/u013088062/article/details/50001189)

3. 实际上没有那么快自动保存，还是需要ctrl+s。。

4. intepreter: create from existing sources. "study" can run both R and Python.

## conda & python cmd

https://blog.csdn.net/zhayushui/article/details/80433768

- upon installation
  
  ```shell
  conda init shell
  ```

- on environments
  
  - see
    
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
    
    - export
      
      ```
      conda activate your_env
      conda env export > environment.yaml # in your current directory
      ```
      
      注：.yaml文件移植过来的环境只是安装了你原来环境里用conda install等命令直接安装的包，你用pip之类装的东西没有移植过来，需要你重新安装。
    
    - remove
      
      ```shell
      conda env remove xxx --all # or rm the file manually
      ```

- on packages of an environment
  
  ```shell
  conda list # list envs
  conda list -n env # list packages
  python -V
  ```

- win32 or win_amd64 means version of python
  
  in win, run python in cmd to know version.
  
  my win: 3.7, 32bit 
  
  station: 3.8, 64bit
  
  https://blog.csdn.net/taquguodedifang/article/details/78039181 in linux

- some packages
  
  ```shell
  conda install -c anaconda scikit-learn -y
  conda install -c conda-forge opencv -y
  ```

- path to anaconda icon  [link](https://dannyda.com/2020/03/21/how-to-create-shortcut-icon-for-anaconda-anaconda3-navigator-launch-anaconda-navigator-in-linux-debian-ubuntu-kali-linux/?__cf_chl_managed_tk__=8b0602f628e3697df877a10ef8acbd1aaed57efe-1624180568-0-AQN5TbG3O_yGaDEn0fVCjKdPwJeitKXjQ5dGrRfek69NylD0fJ5-atmRV2JoCodX4-mn_CX-vH8Ay_KzM9Ew77recYhgLQF_b3AqC85p9Pt8IVjBso98tTdFN9TknxGj5tTJFM_8KyF_S4qbMmoTpsiUnMKl2kc3rlzmRlQZvO0AJaILgZakK-WjM6xFauMno73HWqkCE4IaHB35y0M0C0dnw8t2b5qReINgAcLiCZuHX897fWj-OLS6yNbAVjmkgOPbkazSG3X8a-o_AgziC8zfKXi584jpGmet4WwRwFnSaWJvOAp7BA7vSIkcSJ7UAOFWzpvkDilEtFoa-XMd6jpZQgKbtBVQn4vLT5LUl1_XLFU3M7B9G_vN7vcyUcFjLV2gl6xdDcx9WA-JypLtICF3nbFVjS3gvK_WCEqs30dnW38X3Ceuk9Bhq7FFyegkaQmnFy5a4V5KeJob3h_gXQRaWwaeAFAHoeuYY0RXfAtfD82sJgJP0UOOYC8IBBV43rGAmhSOsLhiC2u3hk2hwLIEy7mG10sSUlGq_3I_dPjha1qlIAP0APiBXaWOOdujGD2gFeot6PQGwrg71cglm4rQc1Zei_kF8QfHdYerOFjLLtbfWC0HTeoFZ_L7Qu9R9c8npxn9Z5Np2O_IqqsKo3yaDAxR_aV8JVS3rS-a4mxAunZXcWj734HTBAJaTTSdepNfW2PdqnUEbsnD5bAyjeDPVQQupDNG_1qz8fsEzThDBSPP04GMtGJGqpEBawQvu2Nk857rXxA-_V2AwE9s7Og)
  
  `/home/user/anaconda3/lib/python3.7/site-packages/anaconda_navigator/static/images/anaconda-icon-256x256.png`

- An unexpected error has occurred. Conda has prepared the above report.
  
  https://blog.csdn.net/Felaim/article/details/108368598
  
  ```shell
  conda clean -i
  ```

- Please update conda by running
  
  ```shell
  conda update -n base conda
  ```

- EnvironmentNotWritableError: The current user does not have write permissions to the targe...
  
  https://www.jianshu.com/p/95e52d6b46ac   problem: permission 权限
  
  ```shell
  sudo chmod -R 777 anaconda3/
  ```

- pip install the package only inside one specific conda environment
  
  ```shell
  # make sure
  which pip
  # returns the virtual env path. you can try
  conda install pip
  # in it before installing with pip
  ```
  
  https://blog.csdn.net/weixin_41712499/article/details/105430471  it's just the problem with pat

- 

> icon path: `xxx/anaconda/lib/python3.7/site-packages/anaconda_navigator/static/images/anaconda-icon-256x256.png`

### For R language

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

## Jupyter Notebook, Google Colab, etc.

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

5. > social network网课
   
   > ```
   > conda install matplotlib==2.0.0 networkx==1.11 pandas==0.20.3 scikit-learn==0.18.2 scipy==0.18.1 numpy==1.13.1
   > ```



## Other

### ThunderBird

xjtu email: just login, default configuration

> https://zhuanlan.zhihu.com/p/152548000

1. specify contacts 联系人, signature
2. plugin: [FileLink Provider for Dropbox](https://addons.thunderbird.net/zh-CN/thunderbird/addon/filelink-provider-for-dropbox/?src=search), Send later

网易邮箱大师，可以搞个Mac版？

### TIM in Linux (wine)

installation: see [Linux-fundamental](/techniques/Linux-fundamental?id=other-softwares)

1. QQ个人文件夹中的文件被占用，您可以尝试以下操作: https://www.jianshu.com/p/f38187cdda0f

   如果刚刚退出相同QQ帐号，请等待几秒后重试登录。
   QQ退出时出现异常无法正常退出，请使用任务管理器结束QQ.exe后再尝试登录

2. 屏幕截图：必须调出聊天对话框才能截图。。

3. a terrible problem: cannot locate files well. 

   - default folder, either inside wine or desktop (cannot drag...). 
   - cannot 'open the folder' (redirect to the browser with wrong path...)

### chembiodraw

全选改字体（18），在file--document setting改线宽，大概0.56（0.4倍粗体），就和Wikipedia的比较接近（平常不用加粗）。



# bit by bit programming

一点一滴

## Bash (shell)

1. https://cloud.tencent.com/developer/ask/sof/806010

   如何在Bash函数中添加默认参数？`${1:-.}`

2. download: an example

   ```shell
   for i in {1..19}; do
   wget https://ronlevygroup.cst.temple.edu/courses/2020_fall/chem5302/lectures/chem5302_lecture${i}.pdf --no-check-certificate
   done
   ```

3. - 

### text processing

#### string spliting

- separator

  ```shell
  f=unbound.fepout.csv
  ${f#*.}  # fepout.csv
  ${f##*.}  # csv
  ${f%.*}  # unbound.fepout
  ${f%%.*}  # unbound
  ```

  to recite

  - #: keep right, * at left; %: keep left, * at right
  - one # or %: cut the first one; two: keep the last one

- exact length

  ```shell
  f=unbound.fepout.csv
  ${f:1:3}  # nbo
  ${f:1:-3} # nbound.fepout.
  ```

- cut: split with any char

  ```shell
  cat /etc/passwd | head -n 5 | cut -d : -f 1
  ```

  > d: delimiter

- b

- c

- d

#### awk

example

```shell
awk '/^#Free energy/ {printf "%.5f,%.5f,%.9f\n",$8,$9,$12}' ${fn}.fepout > ${fn}.csv
```

> take all lines with "#Free energy", print the no. 8,9,12 word (separated by space) to the output file



## Python 

- python嵌套列表赋值，想更改其中一个元素但是一整列的元素都被更改,是什么原因呢，应该怎么修改？ - Demon的回答 - 知乎

  https://www.zhihu.com/question/355374988/answer/891028270

  always use for loop rather than multiplication...
  
- 

### matplotlib fonts

-  just copy .ttf files to ~/miniconda3/envs/work/lib/python3.7/site-packages/matplotlib/mpl-data/fonts/ttf

  https://blog.csdn.net/qq_32442683/article/details/108298763

  - [use .ttf file](https://www.cnblogs.com/arkenstone/p/6411055.html)

    ```python
    from matplotlib.font_manager import FontProperties
    chinese_font = FontProperties(fname='/usr/share/fonts/MyFonts/YaHei.Consolas.1.11b.ttf')
    ...
    plt.text(x, y, display, fontsize=12, fontproperties=chinese_font)
    ```

  - [check usable Chinese font family in matplotlib](https://www.cnblogs.com/arkenstone/p/6411055.html)

    ```python
    from matplotlib.font_manager import FontManager
    import subprocess
    
    fm = FontManager()
    mat_fonts = set(f.name for f in fm.ttflist)
    
    output = subprocess.check_output(
        'fc-list :lang=zh -f "%{family}\n"', shell=True)
    output = output.decode('utf-8')
    # print '*' * 10, '系统可用的中文字体', '*' * 10
    # print output
    zh_fonts = set(f.split(',', 1)[0] for f in output.split('\n'))
    available = mat_fonts & zh_fonts
    
    print('*' * 10, '可用的字体', '*' * 10)
    for f in available:
        print(f)
    ```

    copy the results into `font_la = {'family': 'dengxian'}`. capitalization does not matter.

  - after installing font for the system (see [here](/techniques/Linux-fundamental#system-settings))

    ```python
    import matplotlib
    matplotlib.get_cachedir()
    ```

    `rm -rf` it! then just use the `available` fonts above. No need to configure as other blogs did.

    [after removing cache....](https://blog.csdn.net/u014712482/article/details/85802563)here's how we can check name for ![在这里插入图片描述](https://img-blog.csdnimg.cn/20190104211934391.jpg)

    ```python
    import matplotlib as plt
    import matplotlib.font_manager as font_manager
    fontpath = '/usr/share/fonts/truetype/msttcorefonts/simkai.ttf'
    prop = font_manager.FontProperties(fname=fontpath)
    print(prop.get_name())
    ```

    

  - a

### files

os.walk()



## LaTeX

notes from Windows

### font

1. installing font

   可以在 C:\texlive\2019\texmf-dist\fonts\opentype（你看你的安装目录）下找一个合适的位置，建一个文件夹，把思源字体拷进去，然后在命令行中输入，`fc-cache -fv`

   建一个Libertinus文件夹，放进去

2. 

### math

1. subscript newline

   ```latex
   \mathop{\arg\min}\limits_{\alpha} % \limits must follow an operator
   \atop %下标换行
   % not a good idea
   sum_{\substack{\text { nonbonded } \\ \text { pairsi,j }}
   ```

2. 

### bibliography

1. bst file
   - bst文件介绍 https://liwt31.github.io/2021/03/02/bst/ 
   - 详细语法 https://www.latexstudio.net/archives/11052
   - `latex makebst`: [the most detailed guide](https://kingdomhe.wordpress.com/2017/12/02/%E5%A6%82%E4%BD%95%E8%87%AA%E5%AE%9A%E4%B9%89-bibtex-%E7%9A%84%E5%8F%82%E8%80%83%E6%96%87%E7%8C%AE%E6%A0%BC%E5%BC%8F-bst-%E6%96%87%E4%BB%B6-how-to-generate-a-customized-bst-file/)
     - make, not modify
     - dbj to bst: `latex *.dbj`
2. comment in .bib file: `//` or `%`
2. to prevent websites from appearing, you have to comment out both `url` and `doi`

### fragments

- http://www.noobyard.com/article/p-nymwcdnd-nx.html  插入Python代码升级方案（类似jupyter notebook的配色？）
- https://blog.csdn.net/u012428169/article/details/80558331 没有进行特殊命令处理，但是显示的图片和表格标号跟它们在LaTeX编辑环境中放置的章节有关，这并不是一般文章要求的。
- https://www.codenong.com/cs106438317/ 解决! Package natbib Error: Bibliography not compatible with author-year

### TODO list

- [ ] XJTU bachelor template
  - https://www.overleaf.com/project/62c93b67055128749a1563a8
- [ ] texstudio 参考文献编译链



## R language

to be continue...



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

re



## other

AI chatbots

https://www.cleverbot.com/
https://myanima.ai/app/
https://my.replika.ai/
https://simsimi.com/chat



# Experiences on video/subtitles collection

字幕其实单双行都行，但不要老来回切换

