# Cloud backup

and sync for files in all platforms

> 工作文件的同步备份网盘，alias：私有同步云盘
>
> 总结：https://zhuanlan.zhihu.com/p/65644792 国内外40个；[详细说明！](https://mp.weixin.qq.com/s?__biz=MzA5NjEwNjE0OQ==&mid=2247486950&idx=1&sn=696f1a10603f5a4843e407034d36cdd4&source=41#wechat_redirect)
>
> https://funletu.com/1368/.html 国内的汇总。联通沃家云、电信天翼云、移动和彩云
>
> https://zhuanlan.zhihu.com/p/360780042 百度阿里迅雷腾讯详细对比
>
> https://zhuanlan.zhihu.com/p/44103820 如何搭建自己的私有云盘

# Requirement

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

# net disks for syncing

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

## Onedrive

> [!NOTE]
>
> 免费申请OneDrive 5T 网盘空间（教育邮箱） https://signup.microsoft.com/signup?sku=student
>
> https://www.onedrives.net/4864.html 可能是白嫖邮箱？

https://www.office.com/ 工作台？还是business的，这样功能就挺多了。。

https://stuxjtueducn-my.sharepoint.com/ 原来就是nus那个呀。。

office365教育版也可白嫖。。outlook那些，全功能！

- 但是害怕毕业，换账号又要迁移？自动上传倒没事
- 自动上传。要求：能控制文件夹？（主要就是work，picture，packages），最好别制定文件夹的。用链接解决了

### too slow?

换美国节点？host？还好，先不管了

### Windows

[Windows也可自选文件夹？](https://jingyan.baidu.com/article/4665065836e951f549e5f822.html)  [创建符号链接](https://liam.page/2018/12/10/mklink-in-Windows/)

以管理员身份运行cmd

```
mklink/D "D:\OneDrive - zju.edu.cn\Windows\soft" E:\soft
mklink/D "D:\OneDrive - zju.edu.cn\Windows\undergraduate_study" E:\undergraduate_study
mklink/D "D:\OneDrive - zju.edu.cn\Windows\graduate_study" E:\graduate_study
mklink/D "D:\OneDrive - zju.edu.cn\Windows\fun\music\KuGou" E:\KuGou
mklink/D "D:\OneDrive - zju.edu.cn\Windows\fun\T&J" "F:\makevideo\Tom and Jerry"
mklink/D "D:\OneDrive - zju.edu.cn\Windows\smart-phone-backup" "F:\smart-phone-backup"
mklink/D "D:\OneDrive - zju.edu.cn\Windows\GitHub_repo" "E:\GitHub_repo"
```

> /D：为目录创建符号链接
>
> 路径必须双引号；先创建文件夹再链接；不能有中文、符号

网页端同步manage

### iPad

Goodnotes：https://zhuanlan.zhihu.com/p/104734199  需科学上网

还是登不上学校的？？

个人版的放不下goodnotes啊

### Linux

> what to sync:
>
> - packages
> - work folder
> - `.bashrc`
> - Typora themes
> - Wall papers
>
> ```shell
> ln ~/.bashrc ~/Documents
> ln -s ~/.config/Typora/themes ~/Documents
> ln -s ~/Documents ~/OneDrive/workstation
> ln -s ~/Pictures~/OneDrive/workstation
> ```

好多不同的API，看知乎。。看哪个star的多。。

https://linuxpip.org/linux-onedrive-client/

> https://github.com/MoeClub/OneList/tree/master/OneDriveUploader

#### abraunegg/onedrive

https://github.com/abraunegg/onedrive. I've cloned it to save the docs.

also refer to https://zhuanlan.zhihu.com/p/372355859

and https://www.moerats.com/archives/740/

最主流的吧

> It says [The 'skilion' version](https://github.com/skilion/onedrive) contains a significant number of defects in how the local sync state is managed.

##### Usage

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
  gedit ~/.config/onedrive/config
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

- sync, usually we upload only

  ```shell
  onedrive --synchronize 
  onedrive --synchronize --upload-only
  onedrive --synchronize --download-only
  ```

  选择性同步：如果你不想同步整个网盘，而是某个文件夹，比如MOERATS，使用命令：

  ```shell
  #使用前提是OneDrive网盘和/root/OneDrive文件夹都有这个文件夹 # ?
  onedrive --synchronize --single-directory MOERATS
  ```

  > [!WARNING]
  >
  > 备份的时候用了resync，没下到本地的大轨迹丢了，连个影子都回不来了

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
  > 1. /bin/nano        <---- easiest
  > 2. /usr/bin/vim.basic
  > 3. /usr/bin/vim.tiny
  > 4. /bin/ed

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

##### problems

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

4. 将来真的文件多了，应该1）升级25T；2）改用rclone的挂载模式（万一号没了又咋办？？）

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

Power Automate，将新的 OneDrive 文件同步到 Google Drive 文件，贵的一批

#### other

##### Insync

Insync client: also cannot login

https://www.onedrives.net/2626.html

maybe the problem sits in our unversity?

>  School account: An error occurred and you couldn't be logged in.Please retry adding the account to Insync.Contact support@insynchq.com if the issue persists.
>
>  Personal: Connecting to Insync...

##### rclone

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

> #### onedrived-dev
>
> https://github.com/xybu/onedrived-dev
>
> ```shell
> pip3 uninstall onedrived
> pip3 install --user git+https://github.com/xybu/onedrived-dev.git
> ```
>
> 似乎几百人star，但是Python问题。。

## baidunetdisk-python

还是就用百度吧

> https://www.jiangjiyue.com/maintenance/linux/527.html  

阿里等其他也许也有，但脚本不太通用？

其他国外的盘，要么有客户端，要么包含在rclone里面，比较方便

> 关于速度：其实是动态调配，原则有：会员优先；你占的资源多了就暂时限制

### tutorial

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

## aliyun-client

https://www.jiangjiyue.com/maintenance/linux/527.html

https://github.com/tickstep/aliyunpan

## Google drive

探索了这么多，最后还是以买了个淘宝账号结束，还买的50块的，20就能买到了。

真是太搞笑了。

https://oauth2.googleapis.com  142.251.43.10:443

连不上API，电脑端作罢。

### about the network

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

### rclone

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

## Summary on tests

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

# Set up a netdisk?

https://wzfou.com/seafile-yunpan/

这类搭建盘的确实需要自己整服务器（需要ip），存储空间应该也是自己的吧。。。

## Seafile

速度很快，免费，理论上其空间无限大

挂载盘 (不占用本地空间，直接访问云端文件)：要商业版

对于 Linux，有两个官方客户端 Seadrive 和 Seafile，前者是挂载文件系统，后者用于同步。对于一个自建网盘，它功能相当纯粹

# Domestic cloud drives: just for storage

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

6. https://www.123pan.com/
   https://zhuanlan.zhihu.com/p/423382563
   确实良心，只有网页版，但是小公司，会不会跑路

7. 其他

   - 腾讯微云 https://www.weiyun.com/ 才10G，要买
   - 亿方云：偏企业，同步
   - 蓝奏云：有点小，不限速
   - MEGA：50G，很受限 https://funletu.com/1113/.html

# Other

## cloud server

https://cloud.tencent.com/act/free  前两个是能白嫖的。。GPU computation, server

## summary

https://post.smzdm.com/p/apz0wrd2/

自己搭和网盘各有优缺点吧，像研究团队肯定是自己搭，小团队可以用团队网盘，个人就都行了。将来跑的东西真的多了5t也是不够的，唉，别想了。

## other thoughts

anaconda环境信息同步？

白嫖GPU：https://www.zhihu.com/question/271520755



# Online notes

or document sync

我的需求：在线版能同步，最好所见所得。本地同步零碎文件还是不强求了

- 幕布：无法导入markdown？不用想了，不支持代码块，只能导图
- 腾讯文档：不是真正的markdown，只能搞docx文件。虽然所见即所得，但无标题快捷键，无法调整各级标题样式。凑活有代码块等等，虽可不要。也不像有人持续开发？
- 浙大语雀：完整支持markdown，支持所见即所得，样式还行，高亮等功能完整，也能直接拖入图片。
- Google drive的各插件：样式一般，源码预览对照。限制很麻烦。
- 各种在线的markdown往往不能同步，有道云倒还行，但插图片需要VIP。。印象没太会用

### 浙大语雀

add: many functional tools!

cannot export markdown? lakebook就是语雀的格式

we can just **paste into Typora**! But remove the linebreaks....

problems: 

- LaTeX formula exported as svg...
- to paste tables into lakebook, <u>create a table</u> and paste, to keep in a proper format
- too slow to load for large documents...and cannot load sometimes (but it's secure)



useful WYWIWYG markdown-supported sites:

- notion.so
- coda.io
- wolai.com

