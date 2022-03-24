# Specific Software Usage

Here shows some specific experiences on daily working.

Fret not over bygones, and the forward journey take.

> wakeonlan
>
> future: onedrive cloud mount, not occupying  my HD...
>
> 能装/home还是尽量

# Commonly used for working

## Network

Connection, vpn, remote control usage

configure VPN: see prepare-for-the-computer

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

2. 

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
  > # under source code folder
  > curl -fsS https://dlang.org/install.sh | bash -s dmd
  > source ~/dlang/dmd-2.099.0/activate
  > ./configure
  > make clean; make;
  > sudo make install
  > ```
  >
  > and succeeded to authorize...

- [authorization](https://github.com/abraunegg/onedrive/blob/master/docs/USAGE.md#authorize-the-application-with-your-onedrive-account)

  Run the command `onedrive --logout`. This will clean up the previous authorisation

- config

  ```shell
  onedrive --display-config # check
  gedit /home/gxf/.config/onedrive/config
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

