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

     - install https://www.yoki.moe/Intstu/24.html and https://www.52pojie.cn/thread-1243805-1-1.html
     - 先到官网下几个lib然后update就把依赖装好了
     - setting: Ctrl+space 激活/反激活输入法
     
     > dependence of com.iflytek.iflyime_1.0.6-7_amd64.deb can not be installed
     
   - 搜狗

     
     
     > 感觉搜狗拼音输入法比谷歌拼音输入法更好，因为有最新流行词汇，可以打出表情符号等等。
     >
     > https://blog.csdn.net/Teri_Tor/article/details/111461984
     
   - 2022.1.4 use google pinyin. 至少能用。。先用吧阿巴阿巴

     ```shell
     sudo apt-get install fcitx-googlepinyin
     whereis googlepinyin
     ```

     > ` /usr/lib/x86_64-linux-gnu/googlepinyin/data`  词库目录

   - setting commands

     ```shell
     fcitx-config-gtk3
     im-config
     ```

   - skin?

   - other

     ```shell
     sudo apt-get install fcitx-libpinyin
     ```

     

7. upgrade from 18.04 to 20.04. upgraded cuda and graphics driver at the same time!

8. google download?

   为什么用 Chrome 下载东西速度非常慢？ - 老郭的回答 - 知乎 https://www.zhihu.com/question/20082667/answer/1177212992

   may use firefox...but now I abandoned firefox

9. 删除分区用gparted

   也许 https://blog.csdn.net/xiexievv/article/details/50525783

   https://blog.csdn.net/renfeigui0/article/details/100765958 格式化

10. Linux中/var空间不足的解决办法 https://blog.csdn.net/hqzhon/article/details/49027351

    not use this partition anymore

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

    https://typora.io/windows/dev_release.html dev版本不要钱的

    主题路径：`/home/gxf/.config/Typora/themes`

14. install lightdm: https://blog.csdn.net/hgtjcxy/article/details/90645838

    display managers: https://ubuntuqa.com/article/6577.html

    ```shell
    sudo apt update
    sudo apt install lightdm
    # or
    sudo dpkg-reconfigure lightdm
    # click ok
    reboot
    ```

16. 字体缺失（WPS等）

    add into system font directory https://zhuanlan.zhihu.com/p/31848590

    ```
    sudo cp * /usr/share/fonts/wps-office
    ```

    Windows：`C:\Windows\fonts`

    查看当前支持的字体

    ```shell
    fc-list
    ```

    in `/usr/share/fonts/`. copy your font into and 

    ```shell
    sudo cp *.otf /usr/share/fonts/opentype
    sudo cp *.ttf /usr/share/fonts/truetype
    sudo apt install xfonts-utils
    mkfontscale
    mkfontdir
    sudo fc-cache -fv
    ```

17. Linux更改桌面（等）路径

    ```
    sudo gedit ~/.config/user-dirs.dirs
    ```

    改完重启即可

18. wall paper壁纸

    搜索：电脑桌面壁纸 化学; microscopy photos

    some good websites

    - https://wall.alphacoders.com/
    - https://wallpapercave.com/
    - https://www.wallpaperflare.com/search?wallpaper=chemistry
    - https://www.flickr.com/photos/zeissmicro/

    > https://cdn.shopify.com/s/files/1/1064/0118/files/periodic-table-of-tech-standalone_alt.png?v=1579813258

    Lively WallpaperLively *Wallpaper* for Windows

19. process figure

    如果只需要单纯的裁剪功能, 推荐gThumb工具, 界面美观好用, 媲美某Q的聊天截图crtl+A
    打开命令行,输入

    ```shell
    sudo apt install gthumb
    ```

    下载安装完, 就能用啦, 输入

    ```shell
    gthumb
    ```

    为了以后使用方便, 可以右键屏幕左侧状态栏的gthumb图标,选择”锁定到启动器”. 以后就不用打开命令行了, 直接点状态栏的gthumb图标就行了. gthumb的具体用法不用说, 软件就那几个键, 而且都是图标, 看看就明白了.

    裁剪、调整大小、调整色彩等

    - As for add border, use `cv2.copyMakeBorder()`

    https://blog.csdn.net/qq_36560894/article/details/105416273 

    https://www.geeksforgeeks.org/python-opencv-cv2-copymakeborder-method/

19. on disk check

    > see below debugging 22.1.14

21. 



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
   rm --dir目录名              #删除一个空目录
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

### Connection, vpn, remote control

1. get ip address

   ```shell
   ip addr show
   ```

2. VPN for Linux: https://github.com/hannuo/ssr-linux-client-electron

   configuration: https://github.com/qingshuisiyuan/electron-ssr-backup/blob/master/Ubuntu.md

3. 向日葵

   软件包名：`sunloginclient`；命令：`/usr/local/sunlogin/bin/sunloginclient`
   
   连接后即断开解决办法 https://blog.csdn.net/u012254599/article/details/107807751

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
   # ether xx:xx:....
   sudo ethtool enp4s0 # must add sudo! or error
   # should see:
   # Supports Wake-on: pumbg
   # Wake-on: g # if is d, just do 
   # sudo ethtool -s enp4s0 wol g
   
   
   ```

   远程开机？

   ```shell
   wakeonlan -i 192.168.5.255 04:d4:c4:21:d6:02
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
> 
> N: 无法安全地用该源进行更新，所以默认禁用该源。
> 
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

- Please update conda by running

  ```shell
  conda update -n base conda
  ```



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

> ## Especially about installation

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

- 常用

  ```shell
  dpkg -i xx.deb
  dpkg --info xx.deb # 查看信息，包括软件包名，卸载时用！
  dpkg -P xx.deb # 卸载
  dpkg --unpack *.deb # 解压？
  ```

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

- 查看应用程序安装路径

  ```shell
  dpkg -L sunloginclient
  ```

- 

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
  sudo apt --fix-broken install
  ```

- 更新软件源

  ```shell
  sudo gedit /etc/apt/sources.list
  ```

- https://blog.csdn.net/jenyzhang/article/details/72510631  

  [Ubuntu apt-get upgrade 时候忽略某些安装包](https://blog.csdn.net/u010544187/article/details/76512290?spm=1001.2101.3001.6661.1&utm_medium=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7Edefault-1.no_search_link&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7Edefault-1.no_search_link)

  ```shell
  sudo apt-mark hold package
  sudo apt-mark unhold package
  sudo dpkg --get-selections | grep hold
  ```

  > do not use `spt update` any more because typora cannot be connected
  >
  > ```shell
  > sudo apt-get upgrade
  > ```

- s

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

## 重装系统

### Partition

#### 2022.1.3重装

| 挂载点 | 大小   | 文件系统 | 分区类型 |
| ------ | ------ | -------- | -------- |
| \boot  | 1G     | ext4     | 逻辑     |
| \efi   | 1G     | EFI      | 主分区   |
| \swap  | 16G    | swap     | 逻辑     |
| \      | 剩下的 | ext4     | 主分区   |

### Common flow

- 定好系统语言等

- 如果不改home的分区，原来磁盘上的文件不会丢失

- 安装完第一件事：确定合适驱动版本，直接在系统里下

  - 禁用noveu那个

- 安装QQ，方便传送经验

- 更新软件源，便于下载lightdm等依赖

  - 先注释掉原来的源，update

- 安装向日葵，以便远控

- 尝试是否能重启

- 更改root密码

- 挂载home盘，实现自动挂载。找uuid：那个设备的路径

  ```
  vi /etc/fstab
  添加如下内容：
  uuid=xxxxxxx /h ext4 defaults 0 0
  ```

- 更改desktop的路径为英文，极端cmd下语言改成英文

- 安装vi，git, alacarte, gpart, gparted, ethtool, 等基本工具

- 安装vpn，翻墙、校园网

- 把win的字体拷过来一份

- 安好cuda、cudnn

- 安装下游的gmx、vmd、namd

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

       or

       ```
       nvcc -V 
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

     - [cuDNN Runtime Library for Ubuntu20.04 x86_64 (Deb)](https://developer.nvidia.cn/compute/machine-learning/cudnn/secure/8.2.1.32/11.3_06072021/Ubuntu20_04-x64/libcudnn8_8.2.1.32-1+cuda11.3_amd64.deb)
     - [cuDNN Developer Library for Ubuntu20.04 x86_64 (Deb)](https://developer.nvidia.cn/compute/machine-learning/cudnn/secure/8.2.1.32/11.3_06072021/Ubuntu20_04-x64/libcudnn8-dev_8.2.1.32-1+cuda11.3_amd64.deb)
     - [cuDNN Code Samples and User Guide for Ubuntu20.04 x86_64 (Deb)](https://developer.nvidia.cn/compute/machine-learning/cudnn/secure/8.2.1.32/11.3_06072021/Ubuntu20_04-x64/libcudnn8-samples_8.2.1.32-1+cuda11.3_amd64.deb)

     remove

     ```
     sudo rm -rf /usr/local/cuda/include/cudnn*.h /usr/local/cuda/lib64/libcudnn*
     ```

     test.c:1:10: fatal error: FreeImage.h: 没有那个文件或目录 https://blog.csdn.net/xhw205/article/details/116297555

     ```shell
     sudo apt-get install libfreeimage3 libfreeimage-dev
     ```

     You may also need this

     ```shell
     sudo dpkg -i libcudnn*
     ```

     check success (tar.gz): [??? but a complete guide!!](https://blog.csdn.net/weixin_28691441/article/details/112144795) 

     ```
     cat /usr/local/cuda/include/cudnn.h | grep CUDNN_MAJOR -A 2 
     ```

     might be old! let’s follow the official

     > ```shell
     > # Copy the cuDNN samples to a writable path.
     > HOME=./
     > cp -r /usr/src/cudnn_samples_v8/ $HOME
     > # Go to the writable path.
     > cd $HOME/cudnn_samples_v8/mnistCUDNN
     > # Compile the mnistCUDNN sample.
     > make clean && make
     > # Run the mnistCUDNN sample.
     > ./mnistCUDNN
     > ```
     >
     > If cuDNN is properly installed and running on your Linux system, you will see a message similar to the following:
     >
     > ```
     > Test passed!
     > ```



# Debugging experiences on the system

## 21.2.17

what if you

```shell
rm -rf /*
```

? a disaster, right? see what I did then: https://blog.csdn.net/gxf1212/article/details/113827850

## 21.11.24 you are in emergency mode....

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

## 21.1.2 Nvidia driver-Linux kernel mismatch 

leading that the system cannot be booted.

启动按shift，进入高级模式中的recovery mode

### backup commands

```shell
# 非显卡的，暂不用
apt-get install --reinstall ubuntu-desktop # 重装桌面
mount -o remount,rw / # 重新挂载
xstart

cat /proc/driver/nvidia/version # 查看驱动版本
dpkg -l | grep nvidia # 查看包的版本
# 不一致说明不匹配
dpkg -l | grep 470 # 查找装了哪些470的

ubuntu-drivers devices # 查看可用驱动

dpkg-reconfigure lightdm # 设置显示管理器。一片混乱？现在不管
service lightdm stop # 关闭(图形)桌面显示管理器LightDM
# 全删了
apt-get --purge remove "*nvidia*" 
apt-get autoremove
# 更新源
add-apt-repository ppa:graphics-drivers
apt-get update
# 指定版本安装
apt-get install nvidia-driver-460 nvidia-settings nvidia-prime 
apt-get install nvidia-driver-470

nvidia-smi
service lightdm start
```

problem：failed to initialize nvml driver/library version mismatch ubuntu

### 【solved】 another solution

```shell
rmmod nvidia_uvm
rmmod nvidia_drm
rmmod nvidia_modeset
rmmod nvidia
# by now, the kernel is updated successfully
# if still not match, please check again your versions
```

https://comzyh.com/blog/archives/tag/linux/

https://qastack.cn/programming/43022843/nvidia-nvml-driver-library-version-mismatch

## Press ctrl+c to cancel all filesystem check

卡住了，按啥都动不了

https://askubuntu.com/questions/1140269/ubuntu-18-04-fsckd-is-not-completing-the-filesystem-check-process-and-also-not-a

https://www.cnblogs.com/kelamoyujuzhen/p/10146898.html

> 你可以使用『 cd / 』回到根目录，就能够卸除 /media/cdrom
>
> 整个目录树（[directory tree](https://www.cnblogs.com/kelamoyujuzhen/p/10091336.html)）最重要的地方就是根目录了，所以根目录根本就不能够被卸载。问题是，如果你的挂载参数要改变， 或者是根目录出现『只读』状态时，如何重新挂载呢？最可能的处理方式就是重新启动 (reboot)！ 不过你也可以这样做：
>
> ```
> mount -o remount,rw,auto /
> ```
>
> 

If a file system check fails, then you probably should reinstall, reformatting the partitions. If shortly after that, you experience this issue again, then expect that your hardware is failing.



```shell
# 其他
# 重装两个包
wget http://ftp.cn.debian.org/debian/pool/contrib/n/nvidia-settings/nvidia-settings_460.91.03-1_amd64.deb
wget http://ftp.cn.debian.org/debian/pool/main/n/nvidia-settings/libxnvctrl0_460.91.03-1_amd64.deb
dpkg -r nvidia-settings
dpkg -r libxnvctrl10:amd64
# dependence!
dpkg -i *.deb
dpkg -i nvidia*.deb
# define version, it's right but doesn't work
apt-get install nvidia-settings=460.91.03-1
apt-get install libxnvctrl0=460.91.03-1
wget http://ftp.cn.debian.org/debian/pool/contrib/n/nvidia-support/nvidia-installer-cleanup_20151021+9_amd64.deb
ubuntu-drivers autoinstall # 安装推荐的驱动 报错显卡驱动的依赖不能满足？
```



https://packages.debian.org/search?searchon=sourcenames&keywords=nvidia-settings

https://blog.csdn.net/weixin_33850890/article/details/92712012?spm=1001.2101.3001.6650.1&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7Edefault-1.highlightwordscore&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7Edefault-1.highlightwordscore 关掉nvidia的更新



A START JOB IS RUNNING FOR HOLD UNTIL BOOT FINISHES UP 

https://www.rffuste.com/2020/04/19/solution-a-start-job-is-running-for-hold-until-boot-finishes-up-ubuntu/

https://blog.csdn.net/weixin_43994864/article/details/114409694

## 2022.1.14 cannot auto-mount HDD

after re-installing the system. should not do formatting!

```shell
fdisk /dev/sda
# 设备不包含可识别的分区表
mount -a
# mount: /home: wrong fs type, bad option, bad superblock on /dev/sda, missing codepage or helper program, or other error.
fsck -y /dev/sda
# /dev/sda：没有问题
```

同时无法通过右上角来关机，只能cmd！sudo输完密码后面还要输！

```shell
# check all 
fdisk -l
df -h
lsblk
# check uuid
blkid /dev/sda
```

https://www.cgsecurity.org/wiki/TestDisk

```shell
sudo apt-get install testdisk
testdisk
```

> analyse，没找到分区表；然后quick search，看到
>
> ![make-gpt](E:\GitHub_repo\notes\techniques\images\22.1.14-make-gpt.jpg)
>
> Enter，发现ok，直接write，重启
>
> > https://blog.csdn.net/weixin_34418883/article/details/92753433  删了root也能修复？？

出了新问题

> ```shell
> root@gxf-workstation:/home/gxf# fsck -y /dev/sda
> fsck，来自 util-linux 2.34
> e2fsck 1.45.5 (07-Jan-2020)
> ext2fs_open2: 超级块中的幻数有错
> fsck.ext2：超级块无效， 尝试备份块
> /dev/sda 未被彻底卸载，强制进行检查。
> 第 1 步：检查inode、块和大小
> ```
>
> 修复完了又恢复最开始的情况。。不要用testdisk了！
>
> ```shell
> fdisk /dev/sda
> # 主 GPT 表损坏，但备份似乎正常，将使用它
> p
> # 分区 1 未起始于物理扇区边界。
> ```

> gdisk: GPT fdisk
>
> 报错信息大致为：
>
> ![22.1.14-gdisk1](E:\GitHub_repo\notes\techniques\images\22.1.14-gdisk1.jpg)
>
> ```
> Problem: The CRC for the main partition table is invalid. This table may be
> corrupt. Consider loading the backup partition table ('c' on the recovery &
> transformation menu). This report may be a false alarm if you've already
> corrected other problems.
> 
> Caution: Partition 1 doesn't begin on a 8-sector boundary. This may
> result in degraded performance on some modern (2009 and later) hard disks.
> ```
>
> 操作：用备份的partiation table覆盖main pt
>
> ```shell
> gdisk
> > p
> > w
> > q
> ```
>
> https://blog.csdn.net/liqiua/article/details/88723679

> 结果：fdisk、gdisk都好了；分区 1 未起始于物理扇区边界；blkid：UUID没了，只剩sda1的？mount -a也找不到uuid；手动挂载也不行了。fdisk sda1:设备不包含可识别的分区表。df -h啥都没有
>
> 又testdisk一次，没变。好像sudo好了

fsck之后，又变回去了。。。。。。。

> reading: 超级块是什么  https://www.cnblogs.com/betterquan/p/11369364.html
>
> 



# Other---the first time I install this

> 既然可以制定路径，那为啥不新建一个文件夹呢？以后还是直接在programfiles吧

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