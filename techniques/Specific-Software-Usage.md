# Specific Software Usage

Here shows some specific experiences on daily working.

Fret not over bygones, and the forward journey take.

> wakeonlan
>
> future: onedrive cloud mount, not occupying  my HD...
>
> 能装/home还是尽量



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

###### problems

1. Using application %27OneDrive Free Client%27 is currently not supported for your organization stu.xjtu.edu.cn because it is in an unmanaged state. An administrator needs to claim ownership of the company by DNS validation of stu.xjtu.edu.cn before the application OneDrive Free Client can be provisioned.

   > %27: '

   https://github.com/skilion/onedrive/issues/244

   个人登录能用

2. A database statement execution error occurred: disk I/O error

   The existing execution still has a lock on the files. You 'most likely' had a service file running the daemon which you did not stop.

   事实上虽然手动同步还报错，但确实在很快地同步

3. 将来真的文件多了，应该1）升级25T；2）改用rclone的挂载模式（万一号没了又咋办？？）

4. this time (22.3.20) building with source

   problem: https://github.com/abraunegg/onedrive/issues/973

   also, failed at 

   ```
   service onedrive start
   ```

   

   以后重装第一件事就是装好onedrive，单独下载后同步全部乱套了

5. 是不是如果有其他来源的备份也必须下载，比如iPad？rclone可吗？

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
