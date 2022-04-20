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

## Network

Connection, *pn, remote control usage

configure *PN: see prepare-for-the-computer

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

![phddns-config](https://gitee.com/gxf1212/notes/raw/master/techniques/images/phddns-config.jpg)

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

### Summary on remote control

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

## Typora

1. 自定义快捷键

   https://blog.csdn.net/December_shi/article/details/108690116

   Ctrl+5 in Linux does not work?

2. 

#### plugins

1. mermaid语法
   - 特殊符号，要加引号才显示 https://github.com/mermaid-js/mermaid/issues/213
2. 

### themes

1. liquid: cannot see the mouse cursor in titles and hyperlinks?

## VScode

I also met [this question](https://stackoverflow.com/questions/70221994/unable-to-change-theme-in-vs-code) or [this](https://www.reddit.com/r/vscode/comments/lx7536/any_idea_why_my_theme_is_suddenly_changing_every/)

[Workbench Appearance color theme keeps being overridden](https://github.com/microsoft/vscode/issues/105102)

引申出主题的管理方式：和系统有关。。

## Pycharm

1. https://blog.csdn.net/qq_41330454/article/details/105906347 控制台命令提示符是In[2]. ipython!

   http://errornoerror.com/question/13223264808178804318/

2. [关闭代码风格检查](https://blog.csdn.net/u013088062/article/details/50001189)

3. matplotlib fonts. just copy .ttf files to ~/miniconda3/envs/work/lib/python3.7/site-packages/matplotlib/mpl-data/fonts/ttf

   https://www.pythonheidong.com/blog/article/498305/f571ce16edc768ad1839/ 

4. 实际上没有那么快自动保存，还是需要ctrl+s。。



## Jupyter Notebook

Jupyter Notebook 更换主题（背景、字体）:  https://www.cnblogs.com/shanger/p/12006161.html

https://jingyan.baidu.com/article/d713063577bcf353fdf475e7.html cd

https://github.com/dunovank/jupyter-themes

```
jt -r # default
jt -t grade3 -f firacode -T -T # other is default
jt -t grade3 -f consolamono -T -T # not using
```

代码提示功能：在base下（default配置！）

```
pip install jupyter_contrib_nbextensions
jupyter contrib nbextension install --user
pip install jupyter_nbextensions_configurator
jupyter nbextensions_configurator enable --user
```

https://www.freesion.com/article/6188402580/

social network

```
conda install matplotlib==2.0.0 networkx==1.11 pandas==0.20.3 scikit-learn==0.18.2 scipy==0.18.1 numpy==1.13.1
```

## ThunderBird

xjtu email: just login, default configuration

> https://zhuanlan.zhihu.com/p/152548000

1. specify contacts 联系人, signature
2. plugin: [FileLink Provider for Dropbox](https://addons.thunderbird.net/zh-CN/thunderbird/addon/filelink-provider-for-dropbox/?src=search)

## LaTeX

notes from Windows

可以在 C:\texlive\2019\texmf-dist\fonts\opentype（你看你的安装目录）下找一个合适的位置，建一个文件夹，把思源字体拷进去，然后在命令行中输入，fc-cache -fv

建一个Libertinus文件夹，放进去

```
\mathop{\arg\min}\limits_{\alpha} % \limits must follow an operator
\atop %下标换行
```

http://www.noobyard.com/article/p-nymwcdnd-nx.html  插入Python代码升级方案（类似jupyter notebook的配色？）

https://blog.csdn.net/u012428169/article/details/80558331 没有进行特殊命令处理，但是显示的图片和表格标号跟它们在LaTeX编辑环境中放置的章节有关，这并不是一般文章要求的。

https://www.codenong.com/cs106438317/ 解决! Package natbib Error: Bibliography not compatible with author-year



# cloud backup and sync for files in all platforms

> 工作文件的同步备份网盘，alias：私有同步云盘
>
> 总结：https://zhuanlan.zhihu.com/p/65644792 国内外40个
>
> https://mp.weixin.qq.com/s?__biz=MzA5NjEwNjE0OQ==&mid=2247486950&idx=1&sn=696f1a10603f5a4843e407034d36cdd4&source=41#wechat_redirect 详细！
>
> https://funletu.com/1368/.html 国内的汇总。联通沃家云、电信天翼云、移动和彩云
>
> https://zhuanlan.zhihu.com/p/360780042 百度阿里迅雷腾讯详细对比
>
> https://zhuanlan.zhihu.com/p/44103820 如何搭建自己的私有云盘

## Requirement

同步的特点：本地云端都要存，倒不用不同平台都同步；不需要分享文件

考虑的因素：容量；传输速度；价格。尽量别限制流量

其他要求：跨平台能弄就弄；和文件系统结合倒随便；文件大小其实都能解决

> 速度慢也拉倒，但能白嫖大空间的，或交了钱的应该不会限制吧
>
> 那么问题来了，为啥不用git呢。。

Windows上平时文档以100GB为单位，但其实不常更新；加上手机，容量要求500G以下

Linux和iPad上，如果时常要存项目数据，需要TB级别的

但我希望手机、（尤其是）Pad能不仅是同步，而是云端硬盘。。

- win上：软件包（<100G），本科文件（~56G），视频素材？
- 手机：照片、表情包？
- Pad：也就goodnotes（课本、课件、笔记）和xmind了，主要是要云空间

## net disks for syncing

> 数据收集于2022年2月
>
> 类别：基本全平台、功能好但收费；免费很多最白嫖（自己搭）；

| platform     | space (free)                | space (more paid)                        | remark              |
| ------------ | --------------------------- | ---------------------------------------- | ------------------- |
| Google       | 15G                         | 2TB: 140SGD/year                         | 功能全面            |
| 坚果         | 流量1G上行、<br />3G下行/月 | 高级，96G，400/年<br />普通：42G，200/年 | 同步等功能好        |
| DropBox      |                             | 2T，120USD/年                            | 功能优秀            |
| Onedrive     | 最多15G                     | 1TB，398/年<br />（在office365中         | Linux难，家庭版好？ |
| pcloud       | 10G                         | 2TB，350欧元终身<br />100欧/年           | 家庭版。。          |
| resilio      |                             | 没说，60$永久                            | 好像挺好            |
|              |                             |                                          |                     |
| Onedrive Edu | **5T，全功能**              |                                          |                     |
|              |                             |                                          |                     |
| Seafile      | **搭建**                    |                                          |                     |
| Nextcloud    | **搭建**                    |                                          | 也好？              |
| Cloudreve    | **搭建**                    |                                          |                     |


稍微详细点的

1. Google https://one.google.com/storage
2. 坚果 https://content.jianguoyun.com/15815.html
3. Dropbox https://www.dropbox.com/plans?trigger=sem
4. onedrive https://www.microsoft.com/zh-cn/microsoft-365/onedrive/compare-onedrive-plans
5. pcloud https://www.pcloud.com/zh/cloud-storage-pricing-plans.html?period=lifetime
6. seafile https://www.seafile.com/product/private_server/
7. resilio https://www.resilio.com/individuals/     [install](https://cloud.tencent.com/developer/article/1719052?from=15425)
8. Nextcloud https://nextcloud.com/install/#    https://blog.51cto.com/libinblog/3157762
9. Cloudreve
10. iCloud当然只能苹果系列了，还要钱

不再考察了，淘宝yyds

支持国内平台吗？可是可白嫖程度还是不够大，自动上传的客户端也不算完善，再等等吧。。

### Onedrive

>[!NOTE]
>
>免费申请OneDrive 5T 网盘空间（教育邮箱） https://signup.microsoft.com/signup?sku=student
>
>https://www.onedrives.net/4864.html 可能是白嫖邮箱？

https://www.office.com/ 工作台？还是business的，这样功能就挺多了。。

https://stuxjtueducn-my.sharepoint.com/ 原来就是nus那个呀。。

office365教育版也可白嫖。。outlook那些，全功能！

- 但是害怕毕业，换账号又要迁移？自动上传倒没事
- 自动上传。要求：能控制文件夹？（主要就是work，picture，packages），最好别制定文件夹的。用链接解决了

#### too slow?

换美国节点？host？还好，先不管了

#### Windows

[Windows也可自选文件夹？](https://jingyan.baidu.com/article/4665065836e951f549e5f822.html)  [创建符号链接](https://liam.page/2018/12/10/mklink-in-Windows/)

以管理员身份运行cmd

```
mklink/D "D:\OneDrive - stu.xjtu.edu.cn\Windows\soft packages" E:\soft
mklink/D "D:\OneDrive - stu.xjtu.edu.cn\Windows\undergraduate" E:\undergraduate_study
mklink/D "D:\OneDrive - stu.xjtu.edu.cn\Windows\fun\music" E:\KuGou
mklink/D "D:\OneDrive - stu.xjtu.edu.cn\Windows\fun\T&J" "F:\makevideo\Tom and Jerry"
mklink/D "D:\OneDrive - stu.xjtu.edu.cn\Windows\smart phone" "F:\smart phone backup"
```

> /D：为目录创建符号链接
>
> 路径必须双引号；先创建文件夹再链接；不能有中文、符号

网页端同步manage

#### iPad

Goodnotes：https://zhuanlan.zhihu.com/p/104734199  需科学上网

还是登不上学校的？？

个人版的放不下goodnotes啊

#### Linux

好多不同的API，看知乎。。看哪个star的多。。

https://linuxpip.org/linux-onedrive-client/

> https://github.com/MoeClub/OneList/tree/master/OneDriveUploader

##### abraunegg/onedrive

https://github.com/abraunegg/onedrive. I've cloned it to save the docs.

also refer to https://zhuanlan.zhihu.com/p/372355859

and https://www.moerats.com/archives/740/

最主流的吧

> It says [The 'skilion' version](https://github.com/skilion/onedrive) contains a significant number of defects in how the local sync state is managed.

###### Usage

- [install](https://github.com/abraunegg/onedrive/blob/master/docs/INSTALL.md#dependencies-ubuntu-18x-ubuntu-19x-ubuntu-20x--debian-9-debian-10---x86_64) dependencies and don't forget

  ```shell
  sudo apt install onedrive
  ```

  But [an issue](https://github.com/skilion/onedrive/issues/511) said this installs an old version? The first time I install it works fine. And [.deb](https://packages.ubuntu.com/focal/onedrive) does not solve the issue.

  > compile
  >
  > ```shell
  > # under onedrive source code folder
  > curl -fsS https://dlang.org/install.sh | bash -s dmd
  > source ~/dlang/dmd-2.099.1/activate 
  > ./configure
  > make clean; make;
  > sudo make install
  > ```
  >
  > and succeeded to authorize...

- [authorizationcd `onedrive --logout`. This will clean up the previous authorisation

- config

  ```shell
  onedrive --display-config # check
  gedit /home/moonlight/.config/onedrive/config
  ```

  copy default from [here](https://github.com/abraunegg/onedrive/blob/master/docs/USAGE.md#the-default-configuration-file-is-listed-below)

- To sync more folders

  - make links, like in Windows

    ```shell
    ln -s ~/work_dir ~/OneDrive/workstation
    ```

    you can organize the directories under `~/Onedrive/workstation` in case data in other machines...

  - or [modify the sync_list](https://github.com/abraunegg/onedrive/blob/master/docs/USAGE.md#selective-sync-via-sync_list-file)

    After changing the sync_list, you must perform `onedrive --synchronize --resync`

    can set 'excludes'

    but may have same problems

  > both: once the source folder is modified, links are lost

  list of dirs

  ```shell
  work
  packages
  Pictures (wall papers)
  Documents
  ...
  ~/.config # bashrc, conda? typora! p
  ```

- sync

  ```shell
  onedrive --synchronize 
  onedrive --synchronize --upload-only
  onedrive --synchronize --download-only
  ```

  选择性同步
  如果你不想同步整个网盘，而是某个文件夹，比如MOERATS，使用命令：

  ```shell
  #使用前提是OneDrive网盘和/root/OneDrive文件夹都有这个文件夹 # ?
  onedrive --synchronize --single-directory MOERATS
  ```

- automatic sync

  ```shell
  systemctl --user enable onedrive
  systemctl --user start onedrive
  ```

  check

  ```shell
  code /usr/lib/systemd/user/onedrive.service
  ```

  you may also not use this because the process takes up your memory...

  ```shell
  vim .onedrive.sh
  # /usr/local/bin/onedrive --monitor --upload-only
  chmod +x .onedrive.sh
  crontab -e
  # 0 * * * * ~/.onedrive.sh 2>&1  # every o
  # template: 35 1 * * *  /root/rclone.sh >> /root/rclone.log 2>&1 # 1:35 everyday
  ```

  https://blog.csdn.net/LLQ_200/article/details/77044603   http://tool.lu/[crontab](https://so.csdn.net/so/search?q=crontab&spm=1001.2101.3001.7020) 

  > Select an editor.  To change later, run 'select-editor'.
  >
  >   1. /bin/nano        <---- easiest
  >   2. /usr/bin/vim.basic
  >   3. /usr/bin/vim.tiny
  >   4. /bin/ed

- If a file or folder is present on OneDrive, that does not exist locally, it will be removed. If the data on OneDrive should be kept, the following should be used:

  ```shell
  onedrive --synchronize --upload-only --no-remote-delete
  ```

- status

  ```shell
  onedrive --display-sync-status --verbose
  ```

- stop

  ```shell
  pkill -f onedrive
  ```

- 

上传还是挺快的；自动上传的频率应该ok

A simple GUI with multi-account support. https://github.com/bpozdena/OneDriveGUI

###### problems

1. Using application %27OneDrive Free Client%27 is currently not supported for your organization stu.xjtu.edu.cn because it is in an unmanaged state. An administrator needs to claim ownership of the company by DNS validation of stu.xjtu.edu.cn before the application OneDrive Free Client can be provisioned.

   > %27: '

   https://github.com/skilion/onedrive/issues/244

   个人登录能用

2. A database statement execution error occurred: disk I/O error

   The existing execution still has a lock on the files. You 'most likely' had a service file running the daemon which you did not stop.

   Additionally, this error: `A database statement execution error occurred: disk I/O error` means you have 2 copies of the program running - most likely 1 is via systemd, the other your manual execution.

   事实上虽然手动同步还报错，但确实在很快地同步

   So let it be

3. The use of --resync will remove your local 'onedrive' client state, thus no record will exist regarding your current 'sync status'

3. 将来真的文件多了，应该1）升级25T；2）改用rclone的挂载模式（万一号没了又咋办？？）

5. this time (22.3.20) building with source

   problem: https://github.com/abraunegg/onedrive/issues/973

   also, failed at 

   ```
   service onedrive start
   ```

   以后重装第一件事就是装好onedrive，单独下载后同步全部乱套了

6. To solve the above renaming problem (change your local file to xxx-localhost.xxx)

   add `--upload-only` to the servi

7. 是不是如果有其他来源的备份也必须下载，比如iPad？rclone可吗？

8. 难以解决：

   - 由于网络差，大文件能上传无法下载，或者有些大文件下下来就坏了就离谱，方便的管理还是实现不了。
   - 一些`.`开头is needed但不是所有。其实就是保存尽量多的配置就好

##### other

###### Insync

Insync client: also cannot login

https://www.onedrives.net/2626.html

maybe the problem sits in our unversity?

>  School account: An error occurred and you couldn't be logged in.Please retry adding the account to Insync.Contact support@insynchq.com if the issue persists.
>
>  Personal: Connecting to Insync...

###### rclone

https://itsfoss.com/use-onedrive-linux-rclone/

https://www.moerats.com/archives/491/

https://www.misterma.com/archives/900/

all are usage & mounting reference (not for just syncing?)

```shell
$ rclone config
Error: Auth Error
Description: No code returned by remote server
```

感觉是学校的问题。。

个人：Application has been successfully authorised, however no additional command switches were provided.

I decide to use rclone when one project is finished and move all files to the cloud (no longer in local)

```shell
rclone mount backup:/ ~/onedrive --copy-links --no-gzip-encoding --no-check-certificate --allow-non-empty --umask 000
```

can also sync

```shell
#!/bin/bash
rclone sync /home/gxf/OneDrive/workstation/work backup:workstation/work
rclone sync /home/gxf/OneDrive/workstation/Documents backup:workstation/Documents
```



>##### onedrived-dev
>
>https://github.com/xybu/onedrived-dev
>
>```shell
>pip3 uninstall onedrived
>pip3 install --user git+https://github.com/xybu/onedrived-dev.git
>```
>
>似乎几百人star，但是Python问题。。

### baidunetdisk-python

还是就用百度吧

> https://www.jiangjiyue.com/maintenance/linux/527.html  

阿里等其他也许也有，但脚本不太通用？

其他国外的盘，要么有客户端，要么包含在rclone里面，比较方便

> 关于速度：其实是动态调配，原则有：会员优先；你占的资源多了就暂时限制

#### tutorial

official: https://github.com/houtianze/bypy

自动同步脚本 https://www.aiyo99.com/archives/60.html

> http://tiramisutes.github.io/2015/07/28/Linux-backup.html 就是定时上传一下
>
> mysql的还看不懂
>
> https://www.aiyo99.com/archives/60.html

```shell
bypy syncup /local/path/name /cloud/path/name
# bypy upload
```

只是上传，并没有自动同步。需要自己编写脚本

运行时添加-v参数，会显示进度详情。

它的机制是这样吗，就是记录下sync过的每个文件？



```shell
bypy syncup packages ./backup-workstation/packages
```



### aliyun-client

https://www.jiangjiyue.com/maintenance/linux/527.html

https://github.com/tickstep/aliyunpan

### Google drive

探索了这么多，最后还是以买了个淘宝账号结束，还买的50块的，20就能买到了。

真是太搞笑了。

https://oauth2.googleapis.com  142.251.43.10:443

连不上API，电脑端作罢。

#### about the network

防火墙或梯子（代理）可能导致登不了

https://help.insynchq.com/en/articles/4209925-insync-3-common-issues-and-bugs   "Connecting to Insync..." and gets stuck

```shell
sudo ufw disable
```

no luck

As for rclone:

```
If your browser doesn't open automatically go to the following link: http://127.0.0.1:53682/auth?state=eHlIJHcxkDZCnKNJduX4ZQ
Log in and authorize rclone for access
Waiting for code...
Got code
Failed to configure token: failed to get token: Post https://oauth2.googleapis.com/token: dial tcp 142.251.42.234:443: i/o timeout
```

#### rclone

> to use your own API: https://rclone.org/drive/#making-your-own-client-id

https://blog.csdn.net/maxuearn/article/details/82391957

https://www.jiyiblog.com/archives/031167.html

**教育版帐号无法使用独立api？**



> Edit advanced config? no
>
> Use auto config? no?



grive: also timeout

https://github.com/vitalif/grive2



gdrive

no version for x86...

https://github.com/prasmussen/gdrive

https://zhujiwiki.com/3505/



[ODrive](http://cn.tipsandtricks.tech/%E5%A6%82%E4%BD%95%E5%B0%86Ubuntu%E5%90%8C%E6%AD%A5%E5%88%B0%E6%82%A8%E7%9A%84Google-Drive)

install: https://flathub.org/apps/details/io.github.liberodark.OpenDrive

```shell
flatpak uninstall io.github.liberodark.OpenDrive
```



drive

https://github.com/odeke-em/drive#initializing

also timeout

### Summary on tests

- 网页版到哪都能用
- 和操作系统关系不大
- onedrive学校号确实用不了
- onedrive Linux是ok的；goodnotes可以
- 所以问题在Google API上
- Insync真的用不了；不能说rclone也有问题

> 疑点：为啥API就用不了
>
> rclone用不了Google却能用onedrive个人；且goodnotes为啥可以Google

> 用API的两个：rclone和insync；onedrive
>
> 变量：OS、平台、云盘、账号

Onedrive：要分学校和个人账号

iPad端的client可以用学校账号，但goodnote不能，个人goodnotes可以，但放不下

Windows的client可以用学校账号，在用了

insync是不行

没试rclone

Linux端

onedrive登学校账户不行、个人可以

rclone个人也可以，学校直接failure

insync均用不了，但个人版报的错似乎不同？是Connectinnng toinsync，和Gdrive一样，学校报的，onedrive见上，rsync是什么

不会是因为没交钱吧



GDrive：要分我的和买的吗？

iPad的goodnote都已经ok了

Windows上官方client两个号都能用

rclone两个号都不行（换greenVPN也一样）

insync两个号都不行（报错有点不同？）

Linux端两种client两个号也都不行

grive等一通客户端都不行





## set up a netdisk?

https://wzfou.com/seafile-yunpan/

这类搭建盘的确实需要自己整服务器（需要ip），存储空间应该也是自己的吧。。。

### Seafile

速度很快，免费，理论上其空间无限大

挂载盘 (不占用本地空间，直接访问云端文件)：要商业版

对于 Linux，有两个官方客户端 Seadrive 和 Seafile，前者是挂载文件系统，后者用于同步。对于一个自建网盘，它功能相当纯粹

## domestic cloud drives: just for storage

> 如果我要分享，也是g16、rosetta那种大文件
>
> 替代百度的话，可以不那么大，对速度要求高，但小文件直接通过QQ之类的？
>
> 另外一个是存影视的，要大。参考那个群吧，就是百度、阿里、迅雷

这些基本不能同步pc，可以备份手机、Pad。。可存储、分享

| platform | space (free)                                        | space (more paid)                                | remark                                                       |
| -------- | --------------------------------------------------- | ------------------------------------------------ | ------------------------------------------------------------ |
| 迅雷云盘 | 500G                                                |                                                  | 也无Linux吧<br />同步只有文件夹                              |
| 阿里云盘 | 100G+领空间                                         |                                                  | 除Linux外全平台<br />不同步<br />活动多但不一定永久          |
| 百度网盘 | 1T                                                  | 超级会员：188￥/5T/年<br />备份方案：108￥/3T/年 | 超级会员特权完整<br />Linux上大量功能用不了<br />同步也不一定能用 |
| 腾讯微云 |                                                     | 30￥/6T/月                                       | 直接没有Linux客户端                                          |
| 超星云盘 | 100G，学生                                          |                                                  | 同步？不限速<br />仅win/mac                                  |
| 天翼云盘 | 1T家庭（没了                                        | 4TB,￥120/年                                     | 除Linux外全平台                                              |
| 115      | 15G                                                 | 5TB,￥500/年                                     | win/Android                                                  |
| 和彩云   | 个人家庭各20G<br />新手领取1T/1年<br />做任务领福利 |                                                  | 除Linux外全平台<br />不限速，手机同步？                      |

1. 百度：不能同步？下载贼慢？还是老实做分享盘。。

   会员也许一般是3M/s，网好能到10，凑活忍。。

2. 阿里：应该是不限速

   1）API不太广泛应用；2）老是要做活动

3. win的东西--超星云盘

   - https://passport2.chaoxing.com/enroll?refer=http://i.mooc.chaoxing.com
   - http://pan-yz.chaoxing.com/app/download

   单文件限制1.5G。同步？？

4. 天翼云 https://cloud.189.cn/ 傻瓜式操作即可

   活动结束了，个人30G，家庭60G

5. 115，会员+签到可弄好多？最大115GB？？

6. 其他

   - 腾讯微云 https://www.weiyun.com/ 才10G，要买
   - 亿方云：偏企业，同步
   - 蓝奏云：有点小，不限速
   - MEGA：50G，很受限 https://funletu.com/1113/.html

## summary

https://post.smzdm.com/p/apz0wrd2/

自己搭和网盘各有优缺点吧，像研究团队肯定是自己搭，小团队可以用团队网盘，个人就都行了。将来跑的东西真的多了5t也是不够的，唉，别想了。



### other thoughts

anaconda环境信息同步？

白嫖GPU：https://www.zhihu.com/question/271520755


# Applications for fun

## git in cmd

1. basic

   ```shell
   # in your repository path
   # usual usage
   git add ./ # add all changes
   git commit -m "update message"
   git push -u origin master
   git pull
   ```

   ```shell
   # other
   git config --global user.name gxf1212 # user.email xxx
   git config --global user.email
   # also works for my github r
   git clone url.git # clone a repo
   ```

2. in Gitee, we should manually update Pages?

   https://www.cnblogs.com/zlting/p/9620259.html

   ```shell
   git remote set-url origin https://gitee.com/gxf1212/notes.git # 设置远程仓库地址
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
   >  新文件：   .gitignore
   >  修改：     Linux/Prepare-for-the-computer.md

5. 对于本地的项目中修改不做保存操作（或代码改崩），可以用到Git pull的强制覆盖

   ```
   git reset --hard origin/master
   ```

   give up specific files

   ```shell
   git restore _sidebar.md
   ```

6. GitHub克隆Gitee的仓库

   ![clone](https://gitee.com/gxf1212/notes/raw/master/techniques/images/clone.jpg)

7. Github 上怎么删除一个文件的版本控制信息，只保留最新文件？

   项目本身并不大，主要是由于有些大图片多次修改，所以GIT保留的这些图片的历史记录文件非常大，但是我这些图片又不需要历史记录信息，怎么删除？

   干脆利落...

   ```shell
   rm -rf .git
   git init
   git add -A
   git commit
   git push -f
   ```

8. proxy

   https://blog.csdn.net/zphuangtang/article/details/112151857

   重置git代理：

   ```shell
   git config --global https.proxy ""
   git config --global http.proxy "" 
   ```

   

## Build a note site with docsify

### References

read through official! https://docsify.js.org/#/quickstart  生成那种模块API的，或者学习笔记的一个框架

also learn settings and styles from https://github.com/jhildenbiddle/docsify-themeable/tree/master/docs

some translated doc

- https://www.cxyzjd.com/article/jackson0714/105331564
- https://segmentfault.com/a/1190000017576714  

a lot of fancy features: https://zxiaosi.cn/archives/cd1d42d1.html

### Basic usage

1. install

   ```shell
   sudo npm i docsify-cli -g
   ```

2. serve locally

   ```shell
   docsify serve ./ # http://localhost:3000
   ```

3. the first subtitle is not included into the sidebar

#### something html

杂记

```html
<p> text </p>
<p align=right> bulabula </p>
<strong> bold text </strong>
<u> underlined text </u>
<li> list item </li>
<!-- comment here -->
<span> 标签被用来组合文档中的行内元素 </span>
<hr> 标签定义 HTML 页面中的主题变化(比如话题的转移),并显示为一条水平线。
```

1. `<a>` 标签的 target 属性规定在何处打开链接文档 https://www.w3school.com.cn/tags/att_a_target.asp

#### something JavaScript

1. https://blog.csdn.net/sally18/article/details/84326528

   点击事件

2. 

### What can docsify do

- visualize .md as html
- customize sidebar, navbar, cover page
  - write links by yourself
  - can show any .md as TOC
- plug-in, 留言、访问计数 etc 

easier than hexo, ...

#### Elements

##### Pages

```html
window.$docsify = {
    homepage: true, // default name: README.md
    coverpage: true, //default: _coverpage.md
    homepage: 'README.md', // specify file name
    coverpage: '/_coverpage.md',
    // sidebar, navbar are similar
}
```

https://docsify.js.org/#/cover  cover page customize, multiple cover

Actually we can assign a cover or home page for every subdirectory using the default file name (README, _coverpage). But it seems that it’s only necessary for **course notes**.

##### Sidebar

https://docsify.js.org/#/more-pages?id=nested-sidebars

- `_sidebar.md`的加载逻辑是从每层目录下获取文件，如果当前目录不存在该文件则回退到上一级目录。
- 配置`alias`字段后，所有页面都会显示项目根目录`_sidebar.md`文件的配置作为侧边栏，子目录的`_sidebar.md`文件会失效。
- 需要在 `./docs` 目录创建 `.nojekyll` 命名的空文件，阻止 GitHub Pages 忽略命名是下划线开头的文件。

it seems that bars and cover must be put in root because the subdirectories have their own...

but after introducing the “sidebar collapse”, I don’t think the sidebar is messy any more. you can come back to other notes through it easily. The navbar is not used. 

Also, the sidebar should be further beautified (**colored**) to clarify the file structure. And the text size in vue?

#### Beautify

##### Cover

```html
// multiple covers and custom file name
coverpage: {
    '/': 'cover.md',
    '/zh-cn/': 'cover.md',
  },

// logo
window.$docsify = {
  logo: '/_media/icon.svg',
};
```

background not solved

```markdown
in coverpage.md
![color](#f0f0f0)
![](_media/bg.png)
```

##### Theme

4 official themes: https://docsify.js.org/#/themes?id=themes and dolphin

```html
<link rel="stylesheet" href="//cdn.jsdelivr.net/npm/docsify@4/lib/themes/vue.css">
<!-- should not miss // and @4! -->
```

some others https://docsify.js.org/#/awesome?id=themes

If you want to modify a theme, download from cdn website rather than GitHub!

> notes
>
> docsify-themeable is less compatible with 推免服务系统.html
>
> vue’ s sidebar needs improving

#### Show figures

- common md syntax is ok, Windows backslash and Linux slash are all ok. and zooming:

  ```html
  <!-- 指定像素值 -->
  ![logo](https://docsify.js.org/_media/icon.svg ':size=50x100')
  ![logo](https://docsify.js.org/_media/icon.svg ':size=100')
  <!-- 支持按百分比缩放 -->
  ![logo](https://docsify.js.org/_media/icon.svg ':size=10%')
  ```

  > Typora zooming script is not supported in docsify (but is ok in a normal html, but can center)
  >
  > already asked in CSDN. https://github.com/HanquanHq/MD-Notes

- no, it supports. But the root directory is not the current directory but the repository’s.....

  - in normal md grammar, relative path is ok

  - in html, zooming without relative path is ok

  - the problem is, in html, <u>it cannot recognize relative path as markdown does (no matter whether zooming)</u>. But it works if you use path relative to the root of repository...which makes figures invisible in local Typora

  - 本来还猜测只是重新定义了根目录的原因，加个../就认为是相对路径了。事实上是，不管加不加这些东西，都是从the root of repository开始算的。。所以你以为加了../就是父目录了，其实还是root

    but still no luck

  - 解决图片问题的思路：

    - 上传的时候render为正确的格式

    - 把图上传到另一个地方，链接一个网址（缩放？

      hexo就是可以渲染出图片，他docsify就是不行

    引用网址图片也不行

    **解决之道**：要用这个打头（算是git的api？）

    https://gitee.com/gxf1212/notes/raw/master/

    其实git他俩用来做图床就是如此

  - future tasks:

    - centralize figures
    - adjust size, so different from those in Typora!

> relative path
>
> https://docsify.js.org/#/zh-cn/configuration?id=relativepath no use
>
> <font color=red>世界上怎么会有这么傻逼的设计？！！专门跟Typora过不去吗？？不得不改变创作方式！</font>那这话也不合适
>
> **Test figure usage**
>
> use the website, a centered figure should look like this:
>
> <center><img src="https://gitee.com/gxf1212/notes/raw/master/course/molecular-immunology/molecular-immunology.assets/5-c1q.png" alt="5-c1q" style="zoom:50%;" align="center" /></center>
>
> `align="center" ` does not work.....`<center></center>` or `<p style="text-align:center;"><p/>` works. 
>
> I'm not particular about centering. The site looks all right though.
>
> 根目录probably not work
>
> <img src="/course/molecular-immunology/molecular-immunology.assets/1-lymphnode.jpg" alt="1-lymphnode" style="zoom:50%;" />
>
> 正常本地目录probably not work
>
> <img src="/home/gxf/desktop/work/Git-repo/notes/course/molecular-immunology/molecular-immunology.assets/1-lymphnode2.jpg" alt="1-lymphnode2" style="zoom:50%;" />
>
> this should ok, but `':size=50%'` does not work locally using provided syntax
>
> ![logo](/home/gxf/desktop/work/Git-repo/notes/course/molecular-immunology/molecular-immunology.assets/1-lymphnode2.jpg ':size=50%')
>
> ![logo](/home/gxf/desktop/work/Git-repo/notes/course/molecular-immunology/molecular-immunology.assets/1-lymphnode2.jpg ':size=100%')
>
> To use the website, should not contain a single backslash in Typora...
>
> <img src="https://gitee.com/gxf1212/notes/raw/master/course/molecular-immunology/molecular-immunology.assets\5-c1q.png" alt="5-c1q" style="zoom:50%;" />
>
> ```
> https://gitee.com/gxf1212/notes/raw/master/
> ```
>
> 没想到个别的（本地都）显示不了，即使那个图片确实存在

### Customize functions

还是有待发展啊！期待更多好玩的功能

TODO list:

- [ ] figure centralize

- [ ] gitee automatically deploy?

- [ ] 打赏

- [ ] 访问量统计：busuanzi

- [ ] \ce的重新render

- [ ] 图片的重新render

  > https://docsify.js.org/#/zh-cn/markdown?id=markdown-%e9%85%8d%e7%bd%ae
  >
  > https://github.com/docsifyjs/docsify/issues/850

#### basic problems

refer to [html](#something-html)

- if a there’s a new version of a plug-in, how to update?  @latest

- principle: add scripts directly, or from the `src` (they all return js script!)

  so we can certainly save the long scripts in another file and call it...

  eg:

  ```html
  <script src="./utils/sitetime.js"></script>
  ```

- there are some ways to define sth with your code

  ```html
  document.getElementById("sitetime").innerHTML = "bulabula"  # defined in .js file
  ```

  once get an element, we can put it in any tag, just by refering to `id`:

  ```html
  <span id="sitetime"></span> # in footer['copy']
  <p id="sitetime"></p> # add a linebreak..
  ```

- you should not 

#### functions

1. add things after:

   ```html
   <!-- Docsify v4 -->
   ```

   like

   ```html
   <script src="//unpkg.com/docsify-copy-code"></script> <!-- copy to clipboard -->
   <script src="//unpkg.com/prismjs/components/prism-bash.js"></script> <!-- code highlight -->
   <script src="//unpkg.com/docsify/lib/plugins/search.js"></script> <!--  search engine -->
   <script src="//cdn.jsdelivr.net/npm/docsify/lib/plugins/emoji.min.js"></script> <!--  emoji -->
   <script src="//cdn.jsdelivr.net/npm/docsify-katex@latest/dist/docsify-katex.js"></script> <!--  equations -->
   ```

   to add plug-in

   > https://github.com/upupming/docsify-katex LaTeX equation support
   >
   > - [**supported functions**!](https://upupming.site/docsify-katex/docs/#/supported)
   > - https://github.com/upupming/docsify-katex/issues/11 italic fon
   >
   > https://github.com/iPeng6/docsify-sidebar-collapse sidebar collapse

2. blacklist:

   ```html
   <script src="//cdn.jsdelivr.net/npm/docsify@latest/lib/docsify.min.js"></script>
   ```

   navbar vanishes!..mouse can't scroll. code highlight is gone.

3. customize title with quoted text

   ```markdown
   [NAMD/VMD和FEP计算基本操作](/MD/FYP-notes.md "2333")
   ```

4. Gittalk (not applied)

   https://segmentfault.com/a/1190000018072952

   https://www.cnblogs.com/fozero/p/10256858.html 

5. Fontawesome 

   https://www.npmjs.com/package/docsify-fontawesome

   > not solved! refer to https://jhildenbiddle.github.io/docsify-themeable/#/?

6. scroll to the top

   https://github.com/zhengxiangqi/docsify-scroll-to-top

7. syntax supporting problems like:

   - [x] support of textsubscript: must use `<sub></sub>` tag; 

     must add \ to \~ if there are more than two \~. same for ^

   - [x] support of \ce{NaCl}: may use $\text{Al(OH)}_3$...

   - [x] support of `\begin{align*}` ?? as well as gather, equation ...

8. https://coroo.github.io/docsify-share/#/?id=getting-started

   插件，share自己的社交媒体

9. 如何搞背景？

   https://segmentfault.com/a/1190000017576714  失败了

   为啥呢？原来用vue主题就可以了。theme-simple不支持。。。。

   侧边栏还可以搞个图片

10. https://zxiaosi.cn/archives/cd1d42d1.html

    美化。

    - 点击效果，桃心（我想知道其他选择，如富强民主文明和谐

11. https://github.com/827652549/docsify-count

    插件，文字统计

    阅读进度条[docsify-progress ](https://github.com/HerbertHe/docsify-progress) 这个插件与字数插件不兼容

12. sitetime.js：运行时间统计

13. 辅以页脚系统 https://github.com/erickjx/docsify-footer-enh

    - do not support `\n`, only html `<br/>`

    - params

      | params | content                                               |
      | ------ | ----------------------------------------------------- |
      | copy   | Copyright text to display (just write your main text) |
      | auth   | Author text                                           |
      | style  | Footer CSS inline style                               |
      | class  | Footer Classes to include                             |
      | pre    | Html pre footer text                                  |

14. https://blog.csdn.net/weixin_44897405/article/details/103214635

    这个东西叫做：live2d看板娘。https://github.com/stevenjoezhang/live2d-widget

    https://gitcode.net/mirrors/stevenjoezhang/live2d-widget/-/tree/master  GitHub镜像。

    - 人物有哪些选择？参考7. 提供的

      ```
      jsonPath: "https://unpkg.com/live2d-widget-model-shizuku@latest/assets/shizuku.model.json",
      ```

      代码两处都要改

      > https://github.com/evrstr/live2d-widget-models 给的似乎没用？
      >
      > https://www.icode9.com/content-4-1173614.html maybe                     
      >
      > http://blog.itchenliang.club/posts/22350780-f32d-11ea-bb4a-d3e1cbe3d592/#%E5%AE%89%E8%A3%85%E6%8F%92%E4%BB%B6 hexo的，方案一
      >
      > https://summerscar.me/live2dDemo/ 调试模型、参数的效果，好慢

    - 版本一：developer的js

      - L2Dwidget.init 设置大小、调位置咋样都没用。。要clone下来自己改
      - 看板娘L2Dwidget盯着鼠标移动（好像已经有了

      ```html
        <script src="https://cdn.jsdelivr.net/gh/stevenjoezhang/live2d-widget@latest/autoload.js"></script>
      ```

      see more settings in the code

    - L2Dwidget.min.js

      - 就可以设置大小、位置
      - cannot find the one in developer’s ...
      - 但不能说话。。也不能盯着鼠标，甚至还有点模糊 (not in the unpkg.com one)

      ```html
        <!-- <script src="https://eqcn.ajz.miesnfu.com/wp-content/plugins/wp-3d-pony/live2dw/lib/L2Dwidget.min.js"></script> -->
        <script src="https://unpkg.com/live2d-widget/lib/L2Dwidget.min.js"></script>
        <script src="https://unpkg.com/live2d-widget/lib/L2Dwidget.0.min.js"></script>
        <script>
      　　L2Dwidget.init({ 
      　　  "model": {jsonPath:"https://unpkg.com/live2d-widget-model-shizuku@1.0.5/assets/shizuku.model.json","scale": 1 }, 
      　　  "display": { "position": "right", "width": 100, "height": 200,"hOffset": 0, "vOffset": -20 }
          });
        </script>
      ```

15. https://www.codenong.com/cs107071378/          https://notebook.js.org/#/

    - 显示pdf？

    - Docsify-alerts https://www.npmjs.com/package/docsify-plugin-flexible-alerts

      ```
      > [!NOTE]
      > 
      > [!TIP]
      > 
      > [!WARNING]
      > 
      > [!ATTENTION]
      > 
      ```

      可自定义

    - 看板娘

16. badge。 是用什么东西生成的吗。。

    ![](https://forthebadge.com/images/badges/makes-people-smile.svg)
    <img src="https://img.shields.io/badge/version-v2.0.0-green.svg" data-origin="https://img.shields.io/badge/version-v2.0.0-green.svg" alt=""> 

17. Pagination，暂时没弄

    > 在文档的最下方会展示上一个文档和下一个文档。

    ```html
    pagination: {
      previousText: '上一章节',
      nextText: '下一章节',
      crossChapter: true,
      crossChapterText: true,
    }
    ```

    需要引入两个 js 文件：

    ```html
    <script src="//cdn.jsdelivr.net/npm/docsify/lib/docsify.min.js"></script>
    <script src="//cdn.jsdelivr.net/npm/docsify-pagination/dist/docsify-pagination.min.js"></script>
    ```

18. 更新时间 https://github.com/pfeak/docsify-updated

    write markdown and append to the end

19. 一言开源社区 https://developer.hitokoto.cn/ 

    一般方法：https://www.jianshu.com/p/3a58d9a796c3，不需要另外那两个脚本

    很好，coverpage不会有。

    放在哪呢？docsify的这些主题，往下划，header栏就看不到了

    https://hitokoto.cn/dashboard#/ 控制台，看、提交句子的

    自定义：

    - 自己写点话？审核要一年？？

    - 如何查，比如所有关于三体的

    - 格式：改js？只能控制show出哪些文字，没法搞局部下划线啥的

      - 解决破折号前空格

    - 调节请求参数，可以选定句子范围

    - token？

    其他

    https://www.jinrishici.com/doc/ 今日诗词API

20. mindmap

    https://github.com/up9cloud/docsify-mindmap 照着做

    steps

    - iPad端导出xmind为markdown
    - 用写的程序处理
    - 粘到markdown里

    note

    - mindmap和json有别
    - json放弃了，转换太复杂，必须把字典字符串合理得换行。。
    - 处理markdown文本：#换成缩进，*是七级标题，再缩进再加，还有强制换行的
    - 开头空格无所谓
    - 设计者应该是把空两个作为一个tab的
    - 中文还是支持的

    问题

    - 美化？
    - Typora看不了都没啥，本地部署预览不了？

    https://github.com/fex-team/kityminder-core 更高端的？

    > markmap
    >
    > ```
    > npm install yarn
    > yarn add markm
    > ```
    >
    > failed
    >
    > 不适用于xmind的思维导图展示，写代码修改？
    >
    > https://juejin.cn/post/7000874049333100551
    >
    > https://zhuanlan.zhihu.com/p/352795634
    >
    > failed

21. PDF reader embedded

    https://github.com/lazypanda10117/docsify-pdf-embed

    uses PDFObject

    - put it between `<body></body>` (not `<head>` as the document said)
    - use relative path to the repository root

22. 

more plugins: https://docsify.js.org/#/awesome?id=plugins，https://docsify.js.org/#/plugins?id=pagination

### Important notes on publishing

- gitee pages 自动部署

  https://gitee.com/yanglbme/gitee-pages-action

  不想在GitHub上弄一个同样的仓库。。先不弄了

  https://bibichuan.gitee.io/posts/5cbf8e2a.html

- 部署到 gitee pages 的静态页面更新后部分样式未刷新问题
  原因是在重新提交文件并执行更新 gitee pages 操作后，协商缓存ETag和Last-Modified虽然会改变，但是强缓存Cache-Control仍然存在，且优先级更高，导致内容未发生改变。
  解决方案： ctrl+F5 强制刷新
  原文链接：https://blog.csdn.net/PorkCanteen/article/details/122068290

- 百度提供了一个提交链接的入口，地址如下：

  > https://ziyuan.baidu.com/linksubmit/url

  填写码云 Pages 的链接：https://itwanger.gitee.io/，并「提交」，见下图：

  这样做的好处是，网站可以主动向百度搜索推送数据，缩短爬虫发现网站链接的时间。当然了，百度收录需要一段时间

- 

SEO：search engine optimization

hexo+github pages个人博客做百度、谷歌、bing等搜索引擎收录

https://reiner.host/posts/2262a2b8.html

hexo生成sitemap？

https://cloud.tencent.com/developer/article/1736970

提交你的域名

https://search.google.com/search-console/welcome

> 请求编入索引：已将网址添加到优先抓取队列中。 多次提交同一网页并不能改变该网页的队列顺序或优先级

https://ziyuan.baidu.com/site/index#/

百度资源

https://github.com/docsifyjs/docsify/issues/656

有些代码是否可用？

https://github.com/lufei/notes

https://code.google.com/archive/p/sitemap-generators/wikis/SitemapGenerators.wiki

Google提供的生成器

生成工具很多，感觉docsify本身不适合。。还是参考已有的

> https://neilpatel.com/blog/xml-sitemap/

### other features, examples and Gitee

[showcases](https://docsify.js.org/#/awesome?id=showcase)  [hitokoto links](https://hitokoto.cn/friendship)

1. https://wiki.xhhdd.cc/#/

   她的站可学习一下。如warning框、等待信息，没找到源码。翻页见下

   Typecho是一个基于PHP的开源博客程序。

2. https://github.com/lufei/notes

   他的配置也是值得参考的。美化上，向他学习一波。

   - 比如vue如何换背景色
   - 如何插入文艺词句（但说实话没太多机会看到了）
   - https://jingyan.baidu.com/article/08b6a591afce9d14a9092241.html 百度统计访问？
   - 他自己搞的主题？https://github.com/sy-records/docsify-nightly

3. https://www.cnblogs.com/juemuren4449/p/12904699.html 

- It is ridiculous that if I include a YouTube or Bilibili link in .md, I cannot deploy...No, solved
- markdown based wiki system http://dynalon.github.io/mdwiki/#!index.md
- 几（十）款制作帮助文档的工具汇总 https://blog.mimvp.com/article/38752.html
- 快写鸭：多平台同时发布
- 其他：https://mubu.com/home 做大纲、思维导图的，挺漂亮
- 
- 

#### Debugging

> ##### 22.1.19
>
> local serving is fine; 
>
> - sidebar and navbar is missing;
> - cannot see the cover page;
> - even we can open a note, click on any subtitle, redirected to the global README (get started).
>
> solution: should make an empty file .nojekyll, or _files are ignored!
>
> still not ok. should not use router mode (if you have refered to the site with # in your link, like https://gxf1212.gitee.io/notes/#/utils/about
>
> why don't I use .md? because it adds an arrow in the side bar...
>
> how to avoid popping out a window? write html...

#### other

##### CDN

内容分发网络 (Content delivery network) 是指一种透过互联网互相连接的电脑网络系统，利用最靠近每位用户的服务器，更快、更可靠地将音乐、图片、视频、应用程序及其他文件发送给用户，来提供高性能、可扩展性及低成本的网络内容传递给用户。

unpkg is **a free content delivery network (CDN)** that automatically distributes public packages published to npm. unpkg partners with cloudfare and heroku to make this automatic distributing possible



CSDN：投稿，再次上传markdown文件，链接变了。。。

https://www.bilibili.com/read/cv403592/
专栏markdown

## Build Hexo Pages (not organized yet)

[build-blog-website-by-hexo](https://www.cnblogs.com/liuxianan/p/build-blog-website-by-hexo-github.html#%E4%BD%BF%E7%94%A8hexo%E5%86%99%E5%8D%9A%E5%AE%A2)

Git 全局设置:

```bash
git config --global user.name "XJTUChemBioer"
git config --global user.email "741844489@qq.com"

git config --global user.name "高旭帆"
git config --global user.email "gxf1212@stu.xjtu.edu.cn"
```

generate key

```bash
ssh-keygen -t rsa -C "741844489@qq.com" 
ssh-keygen -t rsa -C "gxf1212@stu.xjtu.edu.cn"
cat /c/Users/Lenovo/.ssh/id_rsa.pub
```

[link](https://yushuaigee.gitee.io/2021/01/02/%E4%BB%8E%E9%9B%B6%E5%BC%80%E5%A7%8B%E5%85%8D%E8%B4%B9%E6%90%AD%E5%BB%BA%E8%87%AA%E5%B7%B1%E7%9A%84%E5%8D%9A%E5%AE%A2(%E4%B8%89)%E2%80%94%E2%80%94%E5%9F%BA%E4%BA%8E%20Gitee%20pages%20%E5%BB%BA%E7%AB%99/#%E4%B8%89%E3%80%81Gitee-Pages-%E5%8F%91%E5%B8%83)

test successful

```
ssh -T git@gitee.com
```

为了装Hexo，先装Git和Node.js（win上可运行npm）并Add to PATH

```
npm install -g hexo
hexo init xjtu-chembioer
cd xjtu-chembioer
npm install hexo-deployer-git --save
```

```
C:\Users\Lenovo\AppData\Roaming\npm
```

常用 [link](https://yushuaigee.gitee.io/2021/01/02/%E4%BB%8E%E9%9B%B6%E5%BC%80%E5%A7%8B%E5%85%8D%E8%B4%B9%E6%90%AD%E5%BB%BA%E8%87%AA%E5%B7%B1%E7%9A%84%E5%8D%9A%E5%AE%A2(%E4%B8%89)%E2%80%94%E2%80%94%E5%9F%BA%E4%BA%8E%20Gitee%20pages%20%E5%BB%BA%E7%AB%99/#3-%E6%B5%8B%E8%AF%95-Gitee-Pages-%E9%A1%B5%E9%9D%A2)

```bash
hexo new "postName" #新建文章
hexo new page "pageName" #新建页面
hexo generate #生成静态页面至public目录
hexo server #开启预览访问端口（默认端口4000，'ctrl + c'关闭server）
hexo deploy #部署到GitHub
hexo help  # 查看帮助
hexo version  #查看Hexo的版本

hexo n
hexo s  # Ctrl+C退出
hexo clean   # 清除缓存
# 更新、提交并部署：（不用在Gitee上手动。。）
hexo g
hexo d
```

更改deploy设置：https://www.jianshu.com/p/b748100ddef1

换主题：clone到文件夹，更改`_config.yml`

```bash
git clone https://github.com/shenliyang/hexo-theme-snippet/ themes/asnippet
git clone https://github.com/https://littleee.github.io/ themes/asnippet
```

```bash
# 在hexo根目录下
npm install --save hexo-pdf
```

如何在hexo博客网页中实现pdf在线预览

https://bibichuan.github.io/posts/5affe24.html

使用hexo等工具，在git上只提交下面的一个`.deploy_git`文件夹。。clone根本没用



## Experiences on video/subtitles collection







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
