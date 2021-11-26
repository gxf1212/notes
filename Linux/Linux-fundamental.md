# Linux study

This is a record of my operations during 折腾ing the system, in order not to forget.

## basics

1. kde and gnome are two types of desktop interface. KDE looks like Windows desktop and gnome is the classic Linux desktop interface.

2. Linux是把要安装的软件分布在整个系统的各个文件夹里面， 比如所有软件的配置文件都安装在`/etc`下面， 软件需要的库文件都安装在`/lib`下面，日志文件都在`/var/log`下面，`/bin`下是常用的程序，等等。 比较复杂 哈哈。

3. rpm包主要应用在RedHat系列包括 Fedora等发行版的Linux系统上，deb包主要应用于Debian系列包括现在比较流行的Ubuntu等发行版上。
   
   transform .rpm to .deb: `sudo alien \*.rpm`
   
4. It's hard to change default install directory. And I have to make a boot CD (U disk) to change the storage distribution (like when I'm installing Ubuntu, how much for root, home, swap...).

5. 下面是一些典型的段错误的原因: 由内存管理硬件试图访问一个不存在的内存地址

6. 环境变量

   root和user的.bashrc是不一样的！

   export的含义 https://askubuntu.com/questions/720678/what-does-export-path-somethingpath-mean

7. 



## Operations

1. the .sh files on the desktop needs "bash"

### Fundamental settings and softwares

1. check the system

   ```shell
   uname -a # check system version
   cat /proc/version # check Linux, OS, gcc version
   ```

2. path:

   ```shell
   sudo gedit ~/.bashrc
   source ~/.bashrc
   ```
   
3. inspect cpu information

   https://lijian.ac.cn/posts/2018/09/linux-information/

   https://blog.51cto.com/feihan21/1174677

   ```shell
   cat /proc/cpuinfo
   ```

   mine: i7 9700k, 8 cores

4. my base board

   https://www.asus.com/hk/Motherboards-Components/Motherboards/PRIME/PRIME-Z390-P/ 华硕PRIME Z390-P

5. input method

   - fcitx

     - use software market or commmand line:

     	```shell
     	sudo apt install fcitx
     	sudo apt install fcitx-config-gtk # configure GUI
     	```

     - also set fcitx in "language support". reboot 
     - uninstall: https://jingyan.baidu.com/article/d5c4b52b95eb52da570dc511.html

   - 迅飞输入法

     - install https://www.yoki.moe/Intstu/24.html  https://www.52pojie.cn/thread-1243805-1-1.html
     - 先到官网下几个lib然后update就把依赖装好了
     
   - Ctrl+space 激活/反激活输入法

6. sun remote control

   auto-boot: https://www.cnblogs.com/citrus/p/13879021.html

   use realvnc

7. upgrade from 18.04 to 20.04. upgraded cuda and graphics driver at the same time!

8. google download?

   为什么用 Chrome 下载东西速度非常慢？ - 老郭的回答 - 知乎 https://www.zhihu.com/question/20082667/answer/1177212992

   may use firefox...but now I abandoned firefox

9. 删除分区用gparted

   也许 https://blog.csdn.net/xiexievv/article/details/50525783

   https://blog.csdn.net/renfeigui0/article/details/100765958 格式化

10. Linux中/var空间不足的解决办法 https://blog.csdn.net/hqzhon/article/details/49027351

11. no sound?

    ```shell
    sudo gedit /etc/default/grub
    # GRUB_CMDLINE_LINUX_DEFAULT="quiet splash snd_hda_intel.dmic_detect=0"
    sudo grub-mkconfig -o /boot/grub/grub.cfg
    sudo update-grub
    reboot
    ```

    https://blog.csdn.net/swordsm/article/details/108417931

    but, only when the headphone is charged can we play music........

    other:

    ```shell
    sudo apt install pavucontrol
    pavucontrol
    ```

12. 有道dictionary 

    > wrong: http://cidian.youdao.com/index-linux.html. 
    >
    > dependences: https://my.oschina.net/u/4400327/blog/3544515 
    >
    > https://www.ubuntuupdates.org/package/core/trusty/universe/updates/gstreamer0.10-plugins-ugly
    >
    > finally, for the xxx-plugin-ugly: https://my.oschina.net/u/3384982/blog/867063

    see https://blog.csdn.net/weixin_42912072/article/details/108572983, should be the newest version https://cidian.youdao.com/multi.html#linuxAll! just download all the dependencies, no need to fix xxx-plugin-ugly!

13. cannot play video?

    https://blog.csdn.net/weixin_45361800/article/details/116844378  solved!

    ```shell
    sudo apt install ffmpeg
    ```

    no longer support Adobe flash player

    > 可能导致有命令`flash-player-properties`的:https://jingyan.baidu.com/article/3c48dd34a2952ee10be35820.html
    >
    > install flash player for firefox (not successful，没删)
    >
    > download https://www.flash.cn/download  
    >
    > install https://blog.csdn.net/weixin_33759269/article/details/92001224 or https://www.jb51.net/article/193782.htm
    >
    > ```shell
    > sudo cp libflashplayer.so /home/gxf/.mozilla/firefox/
    > sudo cp -r usr/* /usr
    > ```
    >
    > 如何显示Firefox插件(Plugins)的完整路径 https://blog.csdn.net/xuewuzhijin2012/article/details/53140899

14. “软件”里有typora

15. install lightdm: https://blog.csdn.net/hgtjcxy/article/details/90645838

    display managers: https://ubuntuqa.com/article/6577.html

16. 字体缺失（WPS等）

    add into system font directory https://zhuanlan.zhihu.com/p/31848590

    ```
    sudo cp * /usr/share/fonts/wps-office
    ```

    Windows：`C:\Windows\fonts`

17. Linux更改桌面（等）路径

    ```
    sudo gedit ~/.config/user-dirs.dirs
    ```

    改完重启即可

17. 



> ### package name
>
> yes we should remember some; and can check with `dpkg --info`
>
> google-chrome-stable


### Operation on files and directory

#### create and delete

1. create directory: 

   ```shell
   mkdir your-directory
   ```

2. rm命令
   ```shell
   rm -d 目录名              #删除一个空目录
   rm       dir 目录名              #删除一个空目录
   rm -r 目录名              #删除一个非空目录
   rm 文件名                  #删除文件
   ```

   - -f：在删除过程中不给任何指示，直接删除。
   - -r：将参数中列出的全部目录和子目录都递归地删除。若删除目录则必须配合选项"-r"
   - -i：与-f选项相反，交互式删除，在删除每个文件时都给出提示。
   
3. delete all files under a directory: 

   ```shell
   rm ./*
   ```

4. check the size of a folder: https://zhidao.baidu.com/question/1178566665695139419.html

   ```shell
   du -sh /directory
   ```

5. 

#### other

1. move file in terminal: https://blog.csdn.net/qq_38451119/article/details/81121906

   ```shell
   sudo mv filename target-dir
   ```

2. create a soft link (short cut). Files stored in `gxf1` are actually occupying space in `gxf`. 

   ```shell
   sudo ln -s /gxf/ ./gxf1
   ```

   (However, I still have to specify the install directory.)

3. create a hard link:

   ```shell
   sudo ln ./source ./target
   ```

   my comprehension: 硬链接就是一个指针，软链接就是告诉你某处有个文件（指针）。区别就是删了源文件，硬链接还能访问，软的就不行。但是两种链接都可以改名字？

3. `su root`: enter root. pw: a

5. find:

   ```shell
   sudo find / -name "*your-query*" # all that contains your query
   ```

5. create file
   ```shell
   touch .xxx # create
   ls -a # check
   ```
   
6. change file name

   ```shell
   sudo mv test.txt new.txt
   sudo mv ./fca58054-9480-4790-a8ab-bc37f33823a4/ ./mechanical
   ```
   
7. 

   

#### disk

1. smart: https://www.cnblogs.com/xqzt/p/5512075.html




#### debian series features

1. 解决依赖问题：it seems after failing to install a .deb package (due to dependent packages), the dpkg always remember this error, and even automatically install the dependent packages if you open **software updater**. or

   ```shell
   sudo apt-get -f install
   ```

   如果让我删，就手动`apt-get install`几个再用软件更新器

2. 



### K desktop specific settings (not using)

1. fonts
2. settings manager 
   - lightdm desktop manager
     - taskbar fonts
   - appearance
     - desktop icon and font
3. add "show desktop": http://www.linuxdiyf.com/view_134588.html
4. sf

### GNOME

1. 在Ubuntu的系统中如何将应用程序添加到开始菜单中 https://blog.csdn.net/qk1992919/article/details/51034361/ https://ubuntuqa.com/article/1235.html

   ```
   Name=Pymol   #此软件在菜单中当语言为英语的时候的显示名称      
   Name[zh_CN]=Pymol  #此软件在菜单中当语言为中文的时候的显示名称
   Comment=pymol   #此软件在菜单中当语言为英语的时候的说明       
   Comment[zh_CN]=pymol   #此软件在菜单中当语言为中文的时候的说明
   Exec=/home/gxf/pymol/pymol     #要执行的程序的名称
   Terminal=false        #执行时是否启动终端
   X-MultipleArgs=false   #是否有多个参数
   Type=Application      #程序的类型
   Icon=/home/gxf/pymol/share/pymol/data/pymol/icons/icon2_128x128.png   #在开始菜>单中的显示图标
   ```

   还是用alacarte

2. 软件中心点开没反应？ 

   ```shell
   sudo apt-get update  
   sudo apt-get dist-upgrade
   sudo apt-get install --reinstall ubuntu-software
   ```

   也没用

3. 设置→隐私→**屏幕**锁定→设置时间

4. https://gitee.com/wszqkzqk/deepin-wine-for-ubuntu windows环境，装qq微信等

5. 分屏 https://blog.csdn.net/SiriusExplorer/article/details/103016747

### connection, vpn, remote control

1. get ip address

   ```
   ip addr show
   ```

2. VPN for Linux: https://github.com/hannuo/ssr-linux-client-electron

   configuration: https://github.com/qingshuisiyuan/electron-ssr-backup/blob/master/Ubuntu.md

3. 向日葵连接后即断开解决办法 https://blog.csdn.net/u012254599/article/details/107807751

   ```shell
   sudo dpkg-reconfigure lightdm # 切换lightdm图形页面
   ```

   切换完成后重启电脑，就可以使用向日葵远程了…
   
   which leads that the login displays in a strange de-centered looking...
   
4. Use “Wake on LAN” to boot remotely

   - https://necromuralist.github.io/posts/enabling-wake-on-lan/

   - https://service.oray.com/question/1331.html 判断主机是否支持远程开机？

     华硕主板要：高级 > 高级电源管理（APM）> 开启 **Resume By PCI or PCI-E Ddevice**（由pci/pcie设备唤醒）选项

   ```shell
   sudo apt-get install ethtool
   ifconfig -a # find your interfaces, as well as the MAC address!
   # ether 04:d4:c4:21:d6:02
   sudo ethtool enp4s0 # must add sudo! or error
   # should see:
   # Supports Wake-on: pumbg
   # Wake-on: g # if is d, just do 
   # sudo ethtool -s enp4s0 wol g
   
   
   ```

   

5. to enable the wol function, should all the Linux subsystem on Windows

   [install wsl](https://docs.microsoft.com/en-us/windows/wsl/install-manual#downloading-distributions)                          https://blog.csdn.net/daxues_/article/details/119639093
   
   change the .appx file into .zip file, unzip it in the desired directory
   
5. 





### customs

1. to denote path, separate the sentence by / like:

   "/path/to/libfftw3f"

2. 

> #### other
>
> Ubuntu20.04软件源更换 - 舟公的文章 - 知乎 https://zhuanlan.zhihu.com/p/142014944
>
> change software source
>
> ```
> sudo cp /etc/apt/sources.list /etc/apt/sources.list.bak # backup
> sudo vim /etc/apt/sources.list
> #添加阿里源
> deb http://mirrors.aliyun.com/ubuntu/ focal main restricted universe multiverse
> deb-src http://mirrors.aliyun.com/ubuntu/ focal main restricted universe multiverse
> deb http://mirrors.aliyun.com/ubuntu/ focal-security main restricted universe multiverse
> deb-src http://mirrors.aliyun.com/ubuntu/ focal-security main restricted universe multiverse
> deb http://mirrors.aliyun.com/ubuntu/ focal-updates main restricted universe multiverse
> deb-src http://mirrors.aliyun.com/ubuntu/ focal-updates main restricted universe multiverse
> deb http://mirrors.aliyun.com/ubuntu/ focal-proposed main restricted universe multiverse
> deb-src http://mirrors.aliyun.com/ubuntu/ focal-proposed main restricted universe multiverse
> deb http://mirrors.aliyun.com/ubuntu/ focal-backports main restricted universe multiverse
> deb-src http://mirrors.aliyun.com/ubuntu/ focal-backports main restricted universe multiverse
> #添加清华源
> deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal main restricted universe multiverse
> # deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal main restricted universe multiverse
> deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-updates main restricted universe multiverse
> # deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-updates main restricted universe multiverse
> deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-backports main restricted universe multiverse
> # deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-backports main restricted universe multiverse
> deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-security main restricted universe multiverse
> # deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-security main restricted universe multiverse multiverse
> ```
>
> ```shell
> # deepin
> deb http://mirrors.aliyun.com/deepin/ bionic main restricted universe multiverse
> deb-src http://mirrors.aliyun.com/deepin/ bionic main restricted universe multiverse
> 
> deb http://mirrors.aliyun.com/deepin/ bionic-security main restricted universe multiverse
> deb-src http://mirrors.aliyun.com/deepin/ bionic-security main restricted universe multiverse
> 
> deb http://mirrors.aliyun.com/deepin/ bionic-updates main restricted universe multiverse
> deb-src http://mirrors.aliyun.com/deepin/ bionic-updates main restricted universe multiverse
> 
> deb http://mirrors.aliyun.com/deepin/ bionic-proposed main restricted universe multiverse
> deb-src http://mirrors.aliyun.com/deepin/ bionic-proposed main restricted universe multiverse
> 
> deb http://mirrors.aliyun.com/deepin/ bionic-backports main restricted universe multiverse
> deb-src http://mirrors.aliyun.com/deepin/ bionic-backports main restricted universe multiverse
> ```
>
> E: 仓库 “http://mirrors.aliyun.com/deepin bionic Release” 没有 Release 文件。
> N: 无法安全地用该源进行更新，所以默认禁用该源。
> N: 参见 apt-secure(8) 手册以了解仓库创建和用户配置方面的细节。
>
> https://packages.ubuntu.com
> https://packages.debian.org



## Specific commands

### vim

- `:w` 保存但不退出

- `:wq` 保存并退出
  - `:q` 退出
- `:q!` 强制退出，不保存
  - `:e!` 放弃所有修改，从上次保存文件开始再编辑命令历史                                                                                                                 

- `:e!` 放弃所有修改，从上次保存文件开始再编辑命令历史                                                                                                                 
- :q<Enter>               退出                                    
   - :help<Enter>  或  <F1>  查看在线帮助                            
- :help version8<Enter>   查看版本信息
   - esc: stop editing
- insert: edit
### conda & python cmd

https://blog.csdn.net/zhayushui/article/details/80433768

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

    - from yaml

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

- An unexpected error has occurred. Conda has prepared the above report.

  https://blog.csdn.net/Felaim/article/details/108368598

  ```shell
  conda clean -i
  ```

- 



### svn

get part of the files in one GitHub repository

- `svn checkout url`, trunk

  Then the files are downloaded to the current directory of terminal.

  https://blog.csdn.net/ai_faker/article/details/107823359?utm_medium=distribute.pc_relevant.none-task-blog-title-2&spm=1001.2101.3001.4242

- https://blog.csdn.net/q279838089/article/details/44751039

### npm

install nodejs first.

change source: https://www.cnblogs.com/feng-hao/p/11774543.html

### make

`make`命令是运行的所在目录下的`Makefile`文件, 如果*Make*file 里有*check*的话, 会执行测试,也就是检查下编译出来的东西能不能用

### dpkg

- 查看安装包状态：-l

  ```
  期望状态=未知(u)/安装(i)/删除(r)/清除(p)/保持(h)
  | 状态=未安装(n)/已安装(i)/仅存配置(c)/仅解压缩(U)/配置失败(F)/不完全安装(H)/触发器等待(W)/触发器未决(T)
  |/ 错误?=(无)/须重装(R) (状态，错误：大写=故障)
  ```

  https://zhuanlan.zhihu.com/p/57472336

  https://www.jianshu.com/p/3bbd0cf2debe 也许能删

  ```shell
  dpkg -l | grep R
  ```

  found: real-vnc-server

- 



## Debugging experiences

### 21.2.17

what if you

```shell
rm -rf /*
```

? a disaster, right? see what I did then: https://blog.csdn.net/gxf1212/article/details/113827850

### 21.11.24 you are in emergency mode....

https://www.jianshu.com/p/9c9ad9a97452 vim

https://www.runoob.com/linux/linux-comm-mount.html mount

https://stackoverflow.com/questions/13361729/found-a-swap-file-by-the-name/51326724 vim的冲突，显示的信息

[命令行更改系统语言](https://blog.csdn.net/MaryChow/article/details/68494243?spm=1001.2101.3001.6650.1&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7Edefault-1.no_search_link&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7Edefault-1.no_search_link) now LANG and LANGUAGE is English

```shell
sudo vim /etc/default/locale
```

https://www.cnblogs.com/machangwei-8/p/10353614.html fsck命令

> - `errors=remount-ro`
>
> https://blog.51cto.com/u_11886307/2369145 修改fstab？
>
> ```shell
> mount -o remount,rw /dev/nvme0n1p4 /
> mount -o remount,rw / # or this is right?
> 
> umount /dev/nvme0n1p4
> fsck -y /dev/nvme0n1p4 # is clean
> ```
>
> https://support.huaweicloud.com/trouble-ecs/ecs_trouble_0310.html 进入紧急模式的solution steps

其实上面哪些没啥。根目录变成readonly只是为了保护，倒不用修复。GPU那个i2c的驱动问题也不用管。

mount为rw只是为了能编辑fstab。不要乱注释掉device（如/dev/sda），注释掉根目录更难启动。。

学会vim的recovery，学会fsck的修复

其实问题是


```shell
journalctl -xb | grep error 
# found that /dev/sda contains a file system with errors, check forced
umount /dev/sda
fsck -y /dev/sda
# and it's done
```

> other commands
>
> ```shell
> mount -a # mount all devices listed in fstab
> shutdown # poweroff, halt
> ```

# Specific applications for fun

## build a note site with docsify

https://www.cxyzjd.com/article/jackson0714/105331564







# Installation and softwares

note: some used stupid old strange paths. replace with yours (eg: your `/home`)

## memo

> 安排存储分配。关键的软件尽量装到root
>
> - [x] 翻墙
> - [x] 向日葵，vnc viewer
> - [x] 显卡驱动
> - [x] python环境(pycharm, miniconda)
> - [x] 分子模拟环境（gmx,openbabel,pymol,gaussian,ambertools,acpype)
> - [ ] 其他分子模拟（maybe VMD,DSV）
> - [x] flash，浏览器
> - [x] 配套工具（百度网盘、阅读器、qq等）
> - [ ] 写作？（texlive,VScode,mendeley,GitHub Desktop)
> - [ ] 修理：software
> - [ ] 自定义桌面等，如天气
>
> 小问题
>
> - [x] 输入法点不开  界面（算了）
> - [ ] discovery studio
> - [x] 有道词典
> - [ ] 

## common flow

### dpkg

install with .deb

just **double click it** 不能指定目录

命令行法：直接解压到当前目录，然后配置环境变量，即可启动运行程序；

```shell
dpkg -x same.deb
```

 当然，还有另外一个命令，安装到指定目录：

```shell
dpkg -i --instdir=/dest/dir/path some.deb # under root
```

 关于dpkg：https://blog.csdn.net/weixin_30394633/article/details/98926820

```shell
dpkg --info xx.deb # 查看信息，包括软件包名，卸载时用！
```

### apt-get

- install with apt-get or apt:

  ```shell
  sudo apt-get install xxx
  sudo apt-get remove xxx # 会删除软件包而保留软件的配置文件
  sudo apt-get purge xxx # 会同时清除软件包和软件的配置文件，彻底地刪除
  ```

  https://www.cnblogs.com/oddcat/articles/9706393.html

- 更新

  ```shell
  sudo apt update # 更新可用软件包；已安装的软件包是否有可用的更新？
  sudo apt upgrade # 更新已安装的软件包
  ```

- https://blog.csdn.net/chenyulancn/article/details/62216190 转成rpm

- https://ubuntuqa.com/article/503.html check apt log

- `sudo apt-get` is hard to assign prefix: 不能理解命令行选项与其他选项的搭配"--prefix=xxx"与其他选项的搭配

- 安装缺失的包

  ```shell
  sudo apt install -f
  sudo apt fix --broken # ?
  ```

- 更新软件源

  ```shell
  sudo gedit /etc/apt/sources.list
  ```

- 

### other

  1. run .sh files:

     ```shell
     sh file.sh
     chmod a+x file.sh
     ```

     We can put our commands (like open pycharm) in a text file and save as .sh file. Put them in the desktop.

  2. install with .tar.gz

     ```shell
     tar xvzf filename.tar.gz # /your/directory
     # enter the directory
     ./configure # --prefix=...
     make
     make install
     ```

     maybe

     ```shell
     tar xvzf filename.run.tar.gz # get a .run file
     ```

  3. install with .run

     just **double click it**...or

     ```shell
     chmod +x filename.run
     sudo ./filename.run # like .exe in win
     ```

  4. make -jn (install...)
     n代表同时编译的进程，可以加快编译速度，n由用户计算机的配置与性能决定，当前的典型值为10。所以`make -j10`

  5. check version: `软件名 -version`

  6. under root, no need to add `sudo`

  7. wget失败：拒绝连接 https://www.jianshu.com/p/cba95f62dc35  ??

  8. 

  ## fundamental softwares

  1. VScode

     > ```shell
     > dpkg -i --instdir=/media/kemove/fca58054-9480-4790-a8ab-bc37f33823a4/programfiles/root-like-programs code_1.52.1-1608136922_amd64.deb
     > ```

  2. realvnc

     ```shell
     systemctl start vncserver-x11-serviced.service
     systemctl enable vncserver-x11-serviced.service
     ```

  3. GitHub Desktop on Linuxhttps://codechina.csdn.net/mirrors/shiftkey/desktop?utm_source=csdn_github_accelerator

  4. xshell http://www.netsarang.com/download/free_license.html

  5. https://linux.wps.cn/

  6. weather  https://www.ywnz.com/linuxjc/4429.html

  7. insync, sync for google, onedrive, dropbox

     https://cn.go-travels.com/98643-how-to-use-google-drive-linux-4176144-1291281

  8. 

> browsers
>
> - google chrome
>
>   - https://www.chromedownloads.net/chrome64linux-stable/1171.html、
>   - 包名：google-chrome-stable
>
> - firefox
>
> - edge
>
> - opera
>
> - falcon (from snap)
>
> - 360
>
> - epiphany-browser (web)
>
>   ```shell
>   sudo apt-get install epiphany-browser -y
>   ```
>
> - netsurf
>
>   https://flatpak.org/setup/Ubuntu/ then download flatpak package
>
> - Chromium
>
>   - 软件商店

## DL environment

    1. `nvidia smi` shows cuda version 11.1, driver is 455.45.01. We should not use an open source driver. check additional driver from 'start'.
    2. nivida.cn also shows 455.45, so do I need to install the driver? Now no.

  dependence:

  ```mermaid
graph TB;
anaconda-->cuda
cuda-->driver
cuda-->cudnn
  ```

  1. pycharm student:

     https://blog.csdn.net/qq_39521554/article/details/80855357

     my email: stu, 741844489acb

     1. problem! can only run .sh file now!
     2. cooooonfiiigure a command for them

  2. Anaconda

     1. no need to copy a .sh file. You can assign a directory.

     2. under `su root`

     3. `conda: no command`: add path. https://blog.csdn.net/freezeplantt/article/details/80176215

     4. cannot activate at the first time: run `source activate`

        then run `conda activate` or `conda deactivate`

        see https://blog.csdn.net/qq_36338754/article/details/97009338

  3. cuda

     - https://blog.csdn.net/weixin_38369492/article/details/107957296

     - > Driver:   Not Selected
       > Toolkit:  Installed in /usr/local/cuda-11.1/
       > Samples:  Installed in /home/kemove/, but missing recommended libraries
       >
       > Please make sure that
       >
       >  -   PATH includes /usr/local/cuda-11.1/bin
       >  -   LD_LIBRARY_PATH includes /usr/local/cuda-11.1/lib64, or, add /usr/local/cuda-11.1/lib64 to /etc/ld.so.conf and run ldconfig as root
       >
       > To uninstall the CUDA Toolkit, run cuda-uninstaller in /usr/local/cuda-11.1/bin
       > ***WARNING: Incomplete installation! This installation did not install the CUDA Driver. A driver of version at least .00 is required for CUDA 11.1 functionality to work.
       > To install the driver using this installer, run the following command, replacing <CudaInstaller> with the name of this run file:
       >     sudo <CudaInstaller>.run --silent --driver
       >
       > Logfile is /var/log/cuda-installer.log

     - to verify success: https://blog.csdn.net/weixin_38208741/article/details/70848364

       ```
       cd /usr/local/cuda/samples/1_Utilities/deviceQuery #由自己电脑目录决定
       make
       sudo ./deviceQuery
       ```

       ```shell
       /usr/local/cuda/samples/1_Utilities/deviceQuery/deviceQuery
       # CUDA Driver = CUDART, CUDA Driver Version = 11.2, CUDA Runtime Version = 11.1, NumDevs = 1
       ```

     - problems

       - I ran ...run.1 rather than .run ???
       - don't know if this matters: https://blog.davidou.org/archives/1361

     - other

       - if "Failed to initialize NVML: Driver/library version mismatch"

         https://comzyh.com/blog/archives/967/

         if it's due to software update, just reboot. driver and cuda toolkit is simultaneously updated...

     - other ways to check gpu

       ```shell
       pip install gpustat
       gpustat
       ```
       
     - multiple version of cuda: https://bluesmilery.github.io/blogs/a687003b/

  4. cudnn

     follow offical guide

     https://docs.nvidia.com/deeplearning/cudnn/install-guide/index.html

     download:

     - [cuDNN Library for Linux (x86_64)](https://developer.nvidia.com/compute/machine-learning/cudnn/secure/8.2.0.53/11.3_04222021/cudnn-11.3-linux-x64-v8.2.0.53.tgz)
     - [cuDNN Code Samples and User Guide for Ubuntu20.04 x86_64 (Deb)](https://developer.nvidia.com/compute/machine-learning/cudnn/secure/8.2.0.53/11.3_04222021/Ubuntu20_04-x64/libcudnn8-samples_8.2.0.53-1+cuda11.3_amd64.deb)

     remove

     ```
     sudo rm -rf /usr/local/cuda/include/cudnn*.h /usr/local/cuda/lib64/libcudnn*
     ```

     test.c:1:10: fatal error: FreeImage.h: 没有那个文件或目录 https://blog.csdn.net/xhw205/article/details/116297555

     check success (tar.gz): https://blog.csdn.net/weixin_28691441/article/details/112144795 ???

  

## GROMACS

  Follow this order:

  1. check your graphic card driver

     https://blog.csdn.net/qq_43265072/article/details/107160297

  2. (check gcc version) install cuda and cmake

     - cmake
       - install: https://jingyan.baidu.com/article/d621e8da56314d2865913f93.html
       - uninstall: `make uninstall` and `sudo rm -rf` files https://blog.csdn.net/xh_hit/article/details/79639930
       - I installed it on default path
     - cuda

  3. use cmake to install gromacs

     - https://blog.csdn.net/SuiYueHuYiWan/article/details/110972083

     - install fftw3 by ourselves under root!

       or `sudo apt-get`

       - http://www.fftw.org/fftw2_doc/fftw_6.html

       - rather than official manual, I used

		**From here, you should see “on new system”**
     
         ```shell
         ./configure --prefix=/media/kemove/fca58054-9480-4790-a8ab-bc37f33823a4/programfiles/root-like-programs --enable-float --enable-shared --enable-sse2 --enable-avx --enable-threads
         # SINGLE AND DOUBLE PRECISION: see official manual
         # --enable-float : single. default: double, which is not so useful in gromacs but QM/MM needs it..
         
         make
         make -j install
         ```

     - enter "root" by `su`
     
       ```shell
       # under the unzipped gromacs directory
       mkdir build
       cd build
       cmake .. \
       -DCMAKE_INSTALL_PREFIX=/media/kemove/fca58054-9480-4790-a8ab-bc37f33823a4/programfiles/gromacs-2021 \
       -DGNX_BUILD_OWN_FFTW=ON \
       -DGMX_FFT_LIBRARY=fftw3 \
       -DFFTWF_LIBRARY=/media/kemove/fca58054-9480-4790-a8ab-bc37f33823a4/programfiles/root-like-programs/fftw-single/lib/libfftw3f.so \
       -DFFTWF_LIBRARY=/media/kemove/fca58054-9480-4790-a8ab-bc37f33823a4/programfiles/root-like-programs/lib/libfftw3f.so \
       -DFFTWF_INCLUDE_DIR=/media/kemove/fca58054-9480-4790-a8ab-bc37f33823a4/programfiles/root-like-programs/include \
       -DGNX_MPI=ON \
       -DGMX_GPU=CUDA \
       -DGMX_CUDA_TOOLKIT_ROOT_DIR=/usr/local/cuda
       # in older versions, -DGMX_GPU=ON 
       make
       make check
       make install
       gedit /.bashrc
       export PATH=$PATH:/media/kemove/fca58054-9480-4790-a8ab-bc37f33823a4/programfiles/gromacs-2021/bin/
       source /media/kemove/fca58054-9480-4790-a8ab-bc37f33823a4/programfiles/gromacs/bin/GMXRC
       ```
     
       > - library desired path : /media/kemove/fca58054-9480-4790-a8ab-bc37f33823a4/programfiles/root-like-programs (double). single have a separate folder

> - no problem with cuda
> - .. = ../ !!!
> - -DCMAKE_PREFIX_PATH is for cmake to search for library

   problems:
     

   - > Could not find fftw3f library named libfftw3f, please specify its location in CMAKE_PREFIX_PATH or FFTWF_LIBRARY by hand (e.g. -DFFTWF_LIBRARY='/path/to/libfftw3f.so')
     > CMake Error at cmake/gmxManageFFTLibraries.cmake:92 (MESSAGE):
     > Cannot find FFTW 3 (with correct precision - libfftw3f for mixed-precision
     > GROMACS or libfftw3 for double-precision GROMACS).  Either choose the right
     > precision, choose another FFT(W) library (-DGMX_FFT_LIBRARY), enable
     >
     > the

  >   advanced option to let GROMACS build FFTW 3 for you
  >   (-DGMX_BUILD_OWN_FFTW=ON), or use the really slow GROMACS built-in fftpack
  >   library (-DGMX_FFT_LIBRARY=fftpack).

  solved
     

   - 上次装到：运行install.sh，报的信息放在build父目录的output。realvnc也不行

     ```
     
     ```

    CMake Warning:
       Manually-specified variables were not used by the project:
    
         GMX_CUDA_TOOLKIT_ROOT_DIR
      	GNX_BUILD_OWN_FFTW
         GNX_MPI
     
     ```

so the successful version is 

```
cmake .. -DCMAKE_INSTALL_PREFIX=/media/kemove/fca58054-9480-4790-a8ab-bc37f33823a4/programfiles/gromacs-2021-gpu \
-DGMX_MPI=ON -DCMAKE_C_COMPILER=mpicc -DCMAKE_CXX_COMPILER=mpicxx \
-DGMX_FFT_LIBRARY=fftw3 -DCMAKE_PREFIX_PATH=/media/kemove/fca58054-9480-4790-a8ab-bc37f33823a4/programfiles/root-like-programs/fftw-single/ \
-DREGRESSIONTEST_DOWNLOAD=ON \
-DGMX_GPU=CUDA -DCUDA_TOOKIT_ROOT_DIR=/usr/local/cuda/

make -j 6
make check
make install
```

 - guide on cmake: https://blog.csdn.net/wgw335363240/article/details/37758337

   - > CMake Error: The current CMakeCache.txt directory /media/kemov`:q!` 强制退出，不保存

   - openssl: https://www.cnblogs.com/new-journey/p/13323301.html

### on new system

```shell
# fftw
./configure --prefix=/home/gxf/fftw-3.3.9 --enable-float --enable-shared --enable-sse2 --enable-avx --enable-threads
make -j 6
make install

# mpicc, mpicxx
sudo apt install openmpi-bin

# cmake
sudo apt install cmake

# gmx
cmake .. -DCMAKE_INSTALL_PREFIX=/home/gxf/gromacs-2021-gpu \
-DGMX_FFT_LIBRARY=fftw3 -DCMAKE_PREFIX_PATH=/home/gxf/fftw-3.3.9 \
-DGMX_MPI=OFF -DREGRESSIONTEST_DOWNLOAD=ON \
-DGMX_GPU=CUDA -DCUDA_TOOKIT_ROOT_DIR=/usr/local/cuda/
make -j 8
make check
make install

# gmx, mpi
cmake .. -DCMAKE_INSTALL_PREFIX=/home/gxf/gromacs-2021-gpu \
-DGMX_MPI=ON -DCMAKE_C_COMPILER=mpicc -DCMAKE_CXX_COMPILER=mpicxx \
-DGMX_FFT_LIBRARY=fftw3 -DCMAKE_PREFIX_PATH=/home/gxf/fftw-3.3.9 \
-DREGRESSIONTEST_DOWNLOAD=ON \
-DGMX_GPU=CUDA -DCUDA_TOOKIT_ROOT_DIR=/usr/local/cuda/
make -j 8
make check
make install
```

## NAMD

http://bbs.keinsci.com/thread-22004-1-1.html



## compu-chembio helper

### DiscoveryStudio  Visualizer

https://blog.csdn.net/huanzaizai/article/details/116273464

https://forums.linuxmint.com/viewtopic.php?t=293074

  ### pymol

  - the free version: https://zhuanlan.zhihu.com/p/58803491

    just buy a license from pymol.org

    ```shell
    conda install -c schrodinger pymol-bundle
    ```

    and launch it from anaconda prompt

  - install with downloaded package

    ```shell
    conda install -y --use-local pymol-2.5.0a0-py38h4cb1252_9.tar.bz2 
    #  y: always yes
    ```

    都是段错误

  - 

  ### rosetta

  ```shell
gzip -d rosetta_bin_linux_3.12_bundle.tgz -c ../programfiles
# rosetta
export ROSETTA=/media/kemove/fca58054-9480-4790-a8ab-bc37f33823a4/programfiles/rosetta_bin_linux_2020.08.61146_bundle/
export ROSETTA3_DB=$ROSETTA/main/database
export ROSETTA_BIN=$ROSETTA/main/source/bin
export PATH=$PATH:$ROSETTA_BIN
  ```

  

  ### openmpi

  Open MPI: Open Source High Performance Computing https://www.open-mpi.org
  The Open MPI Project is an open source Message Passing Interface implementation...

  But it seems not to accelerate...

  https://blog.csdn.net/zziahgf/article/details/72781799

  download and extract. then

  ```shell
./configure --prefix=/media/kemove/fca58054-9480-4790-a8ab-bc37f33823a4/programfiles/root-like-programs --with-cuda=/usr/local/cuda
make
make install
# in ~./bashrc
export PATH=$PATH:/media/kemove/fca58054-9480-4790-a8ab-bc37f33823a4/programfiles/root-like-programs/bin/ 
export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/media/kemove/fca58054-9480-4790-a8ab-bc37f33823a4/programfiles/root-like-programs/bin/lib/ 
source ~/.bashrc  
sudo ldconfig 
# test in the installing directory
cd examples
make
mpirun -np 8 hello_c
  ```

  usage:

  ```
Running as root is *strongly* discouraged as any mistake (e.g., in
defining TMPDIR) or bug can result in catastrophic damage to the OS
file system, leaving your system in an unusable state.

We strongly suggest that you run mpirun as a non-root user.
  ```

  ### other small softwares

  1. foxit reader

     it's good. rename it, and run the .run file under root

     ```
     ./foxit.run
     ```

     or it will die

  2. 

 

  

  既然可以制定路径，那为啥不新建一个文件夹呢？以后还是直接在programfiles吧







# rubbish

## thinking

### todo

1. language!!
2. how to directly operate files in that mechanical hard disk...rather than in command line
3. anaconda
   2. cuda, cudnn
   3. gromacs, ...
4. connection
   1. Linux账户和密码，访问密码，SSH等
5. gnome desktop, and beautify kde
6. 



### extra things I did

- installed `build-essential`, which helps compile c and c++ (gcc?..) 

  https://blog.csdn.net/yzpbright/article/details/81515459

- installed `fcitx-libpinyin`

- failed to install `nextstrain`



### my objective

don't do too much on this machine, like writing LaTeX...

just be a helper calculator, and a platform to learn Linux. (zheteng is allowed)

(dad could use it too, but keep good organization)



## Other

### pycharm tips

- intepreter: create from existing sources. "study" can run both R and Python.