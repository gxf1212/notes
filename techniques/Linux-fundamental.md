# Linux study

This is a record of 折腾ing the system, in order not to forget.

有些使用方法写在debugging那里了，也许要整理吧，但尽量描述详细，方便搜到

> Update: not only Linux, but also fundamentals of computers. See [Computer science](#computer-science).

**Tutorial share**

- [鸟哥的Linux私房菜-基础学习篇](https://gitee.com/gxf1212/notes/raw/master/utils/tutorials/鸟哥的Linux私房菜-基础学习篇(第四版)高清完整书签PDF版.pdf)
- [Linux就该这么学](https://gitee.com/gxf1212/notes/raw/master/utils/tutorials/Linux就该这么学-高清晰PDF.pdf)

Linux desktop的优势：可以直接为cluster做测试

# Basics

## Concepts

- Linux是把要安装的软件分布在整个系统的各个文件夹里面， 比如所有软件的配置文件都安装在`/etc`下面， 软件需要的库文件都安装在`/lib`下面，日志文件都在`/var/log`下面，`/bin`下是常用的程序，等等。 比较复杂 哈哈。

- 标准库的大部分函数通常放在文件 libc.a 中（文件名后缀.a代表“achieve”，译为“获取”），或者放在用于共享的动态链接文件 libc.so 中（文件名后缀.so代表“share object”，译为“共享对象”）。这些链接库一般位于 /lib/ 或 /usr/lib/，或者位于 GCC 默认搜索的其他目录。

- 在Linux中，TTY是终端设备的一种表示方式，它代表“teletypewriter”的缩写。在早期计算机系统中，TTY是指打字机终端设备。随着技术的发展，TTY逐渐演变为代表终端设备的抽象概念，包括物理终端、虚拟终端、串口终端等。因此，在这个语境下，TTY的全称是“teletypewriter”。

- rpm包主要应用在RedHat系列包括 Fedora等发行版的Linux系统上，deb包主要应用于Debian系列包括现在比较流行的Ubuntu等发行版上。

  transform `.rpm` to `.deb`: `sudo alien ./*.rpm`
  
- 关机重启：`reboot (-f)`，`shutdown -r now`，`poweroff`，`halt`, `systemctl  reboot`

- [Linux 黑话解释：什么是长期支持（LTS）版本？什么是 Ubuntu LTS？ - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/246313340)

- https://www.techtarget.com/whatis/definition/daemon

  https://zh.wikipedia.org/wiki/%E5%AE%88%E6%8A%A4%E8%BF%9B%E7%A8%8B

  （古希腊神话中的）半神半人的精灵

## File

- cp: cannot create regular file 'xxxx' 'xxxx': Invalid argument

  The syntax of your command is correct. “Invalid argument” from cp usually means that the file name is not valid on the target filesystem. It may be too long, contain a forbidden character, or be a reserved word.

  For example Windows filesystems (FAT, NTFS) forbid characters such as : and ? in filenames, so you can't copy these files to a Windows filesystem. 

  exFAT应该是都兼容的一种格式。

- 运行qsub命令时，报错: `script is written in DOS/Windows text format`。 解决办法：输入 

  ```shell
  dos2unix <pbs-script-file>
  ```

  https://sourceforge.net/projects/dos2unix/

- emm

- 回收站：`~/.local/share/Trash/files`

## Bash environment

1. [一文彻底搞懂linux全局环境变量生效顺序_51CTO博客](https://blog.51cto.com/zpf666/2334770)

   `.bashrc`并非是登录shell时唯一会被加载的脚本

2. root和user的`.bashrc`是不一样的！

   [`export`的含义 What does export PATH=something:$PATH mean? - Ask Ubuntu](https://askubuntu.com/questions/720678/what-does-export-path-somethingpath-mean)

   > `export` sets the environment variable that is visible to the process that sets it and to all the subprocesses spawned in the same environment

3. clear `$PATH`, remove redundant

   ```shell
   export PATH=$(echo -n $PATH | awk -v RS=: -v ORS=: '!($0 in a) {a[$0]; print}' | sed 's/:$//')
   ```

4. `$LD_LIBRARY_PATH`最初是空的，第一个不要有多余的`:`

5. [Bash 解决多个终端History丢失的问题-CSDN博客](https://blog.csdn.net/weixin_34311757/article/details/91544518)

   ```
   shopt -s histappend
   ```

   

## Common errors

- 下面是一些典型的段错误的原因：由内存管理硬件试图访问一个不存在的内存地址

  A segmentation fault is a specific kind of error that occurs when a program attempts to access a memory location that it is not allowed to access, or attempts to access a memory location in a way that is not allowed

  - Dereferencing a null pointer.
  - Attempting to write to read-only memory.
  - Attempting to read from an invalid memory address.
  - Writing beyond the end of an array.
  - Using uninitialized pointers.

- Linux操作系统执行可执行文件提示`No such file or directory`的原因可能是操作系统位数和可执行文件需要的lib库的位数不匹配



# Operations

Bash cheat sheet: Top 25 commands and creating custom commands

https://www.educative.io/blog/bash-shell-command-cheat-sheet

## Fundamental settings

### system info

1. check the system

   ```shell
   uname -a # check system version, kernel, etc.
   cat /proc/version # check Linux, gcc version
   uname -r # view the current kernel version and build date
   ```

2. OS info

   ```shell
   cat /etc/os-release
   more /etc/redhat-release
   lsb_release -a
   hostnamectl
   ```

3. inspect cpu information

   https://lijian.ac.cn/posts/2018/09/linux-information/

   https://blog.51cto.com/feihan21/1174677

   ```shell
   cat /proc/cpuinfo
   ```

   mine: i7 9700k, 8 cores

4. gpu info

   ```shell
   cat /proc/driver/nvidia/version
   nvidia-smi
   nvidia-smi -L  # check the number and info of GPUs
   ```

5. [Linux下如何查看一块硬盘是不是固态硬盘（SSD）](https://blog.csdn.net/qq_42303254/article/details/89317618)：因为SSD是非转动盘，*如果返回结果为0说明是SSD硬盘，如果返回结果为1，说明是转动盘HDD类的硬盘。* 

   ```shell
   cat /sys/block/sda/queue/rotational
   lsblk -d -o name,rota
   ```

6. check Display

   ```shell
   lspci | grep -i nvidia
   ```

   I do not know of a direct equivalent, but `lshw` should give you the info you want, try:

   ```shell
   sudo lshw -C display
   ```

   (it also works without sudo but the info may be less complete/accurate)

   You can also install the package `lshw-gtk` to get a GUI.

7. change hostname 

   - just type: `sudo hostname new_hostname`, but works temporarily
   - maybe also edit `/etc/hosts` and `/etc/hostsname`

   [Ubuntu Linux Change Hostname (computer name)](https://www.cyberciti.biz/faq/ubuntu-change-hostname-command/)

   [修改主机名(/etc/hostname和/etc/hosts区别)-CSDN博客](https://blog.csdn.net/dufufd/article/details/75330423)

8. [check shell version](https://blog.csdn.net/electrocrazy/article/details/78313962): `bash --version`

9. [gupdate kernel](https://ubuntuhandbook.org/index.php/2022/05/kernel-5-18-released-install-in-ubuntu-2204/): just install the four packages

   https://kernel.ubuntu.com/~kernel-ppa/mainline. find 'amd'

10. edit path:

   ```shell
   sudo gedit ~/.bashrc
   source ~/.bashrc
   ```

11. 查看当前系统的glibc版本: `/lib64/libc.so.6`

   https://lindevs.com/check-glibc-version-in-linux: `ldd --version`

11. watch temperature with `lm-sensor` https://zhuanlan.zhihu.com/p/143123436

    ```shell
    sensors-detect # root
    ```

12. 

> my (previous workstation) base board
>
> https://www.asus.com/hk/Motherboards-Components/Motherboards/PRIME/PRIME-Z390-P/ 华硕PRIME Z390-P

### monitor resource usage

[ref](https://blog.csdn.net/liaomin416100569/article/details/76920328)

1. `top`
2. 

### disk management

1. 删除分区用gparted

   也许 https://blog.csdn.net/xiexievv/article/details/50525783

   https://blog.csdn.net/renfeigui0/article/details/100765958 格式化

2. Linux中/var空间不足的解决办法 https://blog.csdn.net/hqzhon/article/details/49027351

   not use this partition anymore

3. on disk check

   > see below debugging 22.1.14

4. Linux `dmesg`（英文全称：display message）命令用于显示开机信息。

5. [解决类似umount target is busy挂载盘卸载不掉问题 - Adrian·Ding - 博客园](https://www.cnblogs.com/ding2016/p/9605526.html)

6. directory of U disk: `/run/media/user/u disk name`

7. 

### system/user settings

1. 字体缺失（WPS等）

   - install Windows fonts https://itsfoss.com/install-microsoft-fonts-ubuntu/ useful?

   - emm

     ```shell
     fc-list # 查看当前支持的字体
     ```

   - another way is to copy from Windows: `C:\Windows\fonts`. copy your fonts into

     ```shell
     sudo cp *.otf /usr/share/fonts/opentype
     sudo cp *.ttf /usr/share/fonts/truetype
     sudo cp *.ttc /usr/share/fonts/truetype
     sudo cp *.TTF /usr/share/fonts/truetype
     sudo apt install xfonts-utils
     mkfontscale
     mkfontdir
     sudo fc-cache -fv
     ```

     [add into system font directory (global)](https://zhuanlan.zhihu.com/p/31848590). You can check in WPS and LibreOffice.

     it seems that we don't have to copy into the two folders, instead, any folder under `/usr/share/fonts/`? (not verifed)

   - or only for WPS? (not recommended)

     ```shell
     sudo cp * /usr/share/fonts/wps-office
     ```

   - to use in matplotlib: see [here](/techniques/Prepare-for-the-computer#Python) for details

2. Linux更改桌面（等）路径

   ```
   sudo gedit ~/.config/user-dirs.dirs
   ```

   改完重启即可

3. upgrade from 18.04 to 20.04. upgraded cuda and graphics driver at the same time!

4. [Ubuntu设置文件默认打开方式](https://jingyan.baidu.com/article/915fc414b686a251394b2080.html)：右键、属性

5. LD_LIBRARY_PATH不能以终结符（冒号）作为开始和最后一个字符，不能有2个终结符连在一起，所以修改下LD_LIBRARY_PATH即可

6. 养成--prefix的好习惯

7. do not forget export $PATH:, or 

   https://blog.csdn.net/xiaoshunzi111/article/details/50623078

8. `sudo gedit /etc/motd`: message at login

9. add user

   `adduser` or `useradd`. we'd better explicitly provide parameters (home dir missing: cannot login; bash missing: cannot use bash?)

   ```shell
   adduser -m username -d /home/user -s bash
   ```

10. `/etc/bash.bashrc` or `/etc/bashrc`: system-wide bashrc file for bash shells. This is for ALL USERS!

11. change user name

    https://blog.csdn.net/lanxuezaipiao/article/details/43153367

    log in with another user (or root), execute the commands, change your .bashrc and so on manually

12. give user sudo privilege

    https://blog.csdn.net/Dream_angel_Z/article/details/45841109

    ```shell
    visudo
    ```

    add: `user ALL=(ALL)     ALL`

13. under root, no need to add `sudo`

14. `su` or `su root`: enter root. 

15. forgot root passwd (without sudo) https://www.bbsmax.com/A/rV57qW6VzP/

    boot with rescue CD and remove that in `vi /etc/shadow`

16. 



### input method installation

- fcitx

  - steps

    ```shell
    # use software market or commmand line:
    sudo apt install fcitx fcitx-config-gtk # configure GUI
    # 设置fcitx开机自启动
    sudo cp /usr/share/applications/fcitx.desktop /etc/xdg/autostart/
    # say goodbye to ibus
    sudo apt purge ibus
    ```

    check

    ```Bash
    whereis ibus
    # check linux输入法
    ```

  - also set fcitx in "language support". reboot.

  - uninstall: https://jingyan.baidu.com/article/d5c4b52b95eb52da570dc511.html

    ```shell
    sudo apt-get remove fcitx fcitx-module* fcitx-frontend*
    sudo apt-get purge fcitx* # config
    ```

- 迅飞输入法

  - install https://www.yoki.moe/Intstu/24.html and https://www.52pojie.cn/thread-1243805-1-1.html
  - 先到官网下几个lib然后update就把依赖装好了
  - setting: Ctrl+space 激活/反激活输入法

  > dependence of com.iflytek.iflyime_1.0.6-7_amd64.deb can not be installed

- 搜狗 

  - install

    https://pinyin.sogou.com/linux/help.php

    ```shell
    # install and dependencies
    sudo dpkg -i sogou*.deb
    sudo apt install libqt5qml5 libqt5quick5 libqt5quickwidgets5 qml-module-qtquick2
    sudo apt install libgsettings-qt1
    ```

    add sogou. then it works!

  - 开启了细胞词库功能  https://blog.csdn.net/Teri_Tor/article/details/111461984

    > 感觉搜狗拼音输入法比谷歌拼音输入法更好，因为有最新流行词汇，可以打出表情符号等等。

    dictionaries: https://pinyin.sogou.com/dict/

    follow the blog, but paths have changed! try `tree ~/.config/sogoupinyin/`

    ```shell
    sudo cp *.scel ~/.config/sogoupinyin/dict/scd
    ```

    not work. other old tutorials is outdated...

    skins: https://pinyin.sogou.com/skins

    > Windows: just click to install.
    >
    > Linux also openwith sogou, but no such program...

    设置界面自己好了。。scel file添加后在客户端勾选即可。皮肤还不行

    > still can't see conf gui, but `gedit /home/gxf/.config/sogoupinyin/dict/shell.conf`

- 2022.1.4 use google pinyin. 至少能用。。先用吧阿巴阿巴

  ```shell
  sudo apt-get install fcitx-googlepinyin
  whereis googlepinyin
  ```

  > ` /usr/lib/x86_64-linux-gnu/googlepinyin/data`  词库目录

- setting commands

  ```shell
  fcitx-config-gtk3 # global configuration
  im-config
  ```

- why? after "restart", config is not shown...

  solution: type `fcitx` in Terminal

- skin?

- other, see fcitx project

  ```shell
  sudo apt-get install fcitx-libpinyin
  ```



### figures&media

1. cannot play video?

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

2. no sound?

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

3. wall paper壁纸

   搜索：电脑桌面壁纸 化学; microscopy photos

   some good websites

   - https://wall.alphacoders.com/
   - https://wallpapercave.com/
   - https://www.wallpaperflare.com/search?wallpaper=chemistry
   - https://www.flickr.com/photos/zeissmicro/
   - https://wallpaperaccess.com/beautiful-biology  good!
   - [Wallpapers | Unsplash](https://unsplash.com/t/wallpapers)
   - https://blog.csdn.net/Eumenidus/article/details/124504631  Nature 封面
   - https://pixabay.com/

   > https://cdn.shopify.com/s/files/1/1064/0118/files/periodic-table-of-tech-standalone_alt.png?v=1579813258

   Lively WallpaperLively *Wallpaper* for Windows

4. process figure

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

5. 截图

   ![](https://cdn.jsdelivr.net/gh/gxf1212/notes@master/techniques/images/screenshot.png)

6. install lightdm: https://blog.csdn.net/hgtjcxy/article/details/90645838

   display managers: https://ubuntuqa.com/article/6577.html

   ```shell
   sudo apt update
   sudo apt install lightdm
   # or
   sudo dpkg-reconfigure lightdm
   # click ok
   reboot
   ```

7. 

### other softwares

1. google download?

   为什么用 Chrome 下载东西速度非常慢？ - 老郭的回答 - 知乎 https://www.zhihu.com/question/20082667/answer/1177212992

   may use firefox...but now I abandoned firefox

2. 有道dictionary 

   > wrong: http://cidian.youdao.com/index-linux.html. 
   >
   > dependences: https://my.oschina.net/u/4400327/blog/3544515 
   >
   > https://www.ubuntuupdates.org/package/core/trusty/universe/updates/gstreamer0.10-plugins-ugly
   >
   > finally, for the xxx-plugin-ugly: https://my.oschina.net/u/3384982/blog/867063

   see https://blog.csdn.net/weixin_42912072/article/details/108572983, should be the newest version https://cidian.youdao.com/multi.html#linuxAll! just download all the dependencies, no need to fix xxx-plugin-ugly!

3. “软件”里有typora

   https://typora.io/windows/dev_release.html dev版本不要钱的

   主题路径：`/home/gxf/.config/Typora/themes`

   现在还是用下好的包了

4. 桌面便签

   ```shell
   sudo apt-get install xpad
   ```

5. wine applications!

   https://github.com/zq1997/deepin-wine

   - 首次使用需要添加仓库：

     ```shell
     wget -O- https://deepin-wine.i-m.dev/setup.sh | sh
     ```

   - 安装

     ```shell
     sudo apt-get install com.qq.weixin.deepin
     ```

   - 应用图标需要注销重登录后才会出现

6. 

## Operation on files and directories

just fundamental usage. For advanced shell syntax as well as commands used in programming (`sed`, `grep`, etc.), see [this link](/research/Programming-for-MD.md?id=bash-shell)

### Create and delete

1. create directory: 

   ```shell
   mkdir your-directory
   ```

   create file

   ```shell
   touch .xxx # create
   ls -a # check
   ```

2. `rm`命令

   ```shell
   rm -d 目录名              #删除一个空目录
   rm --dir目录名              #删除一个空目录
   rm -r 目录名              #删除一个非空目录
   rm 文件名                  #删除文件
   ```

   - -f：在删除过程中不给任何指示，直接删除。
   - -r：将参数中列出的全部目录和子目录都递归地删除。若删除目录则必须配合选项"-r"
   - -i：与-f选项相反，交互式删除，在删除每个文件时都给出提示。

   To remove a file whose name starts with a '-', for example '-foo', use one of these commands: `rm -- -foo` or `rm ./-foo`

3. delete all files under a directory:

   ```shell
   rm -r /your/path/* #  empty the folder
   rm -r /your/path # delete the directory
   rmdir /your/path # delete an empty directory
   find . -name query -type d -exec rm -rf {} \; # delete all directories with "query" in name. 
   ```

   https://my.oschina.net/u/4328928/blog/3315425

   directory: /

   ```shell
   rm -rf */ 
   # remove all directories
   ```

   move to trash

   ```shell
   mv file ~/.local/share/Trash/files
   ```

4. Usage: `rmdir [OPTION]... DIRECTORY...`
   Remove the DIRECTORY(ies), <u>if they are empty</u>

5. `cp`

   报错如下：`cp: omitting directory './nginx-1.12.1'`

   原因：要移动的目录下还存在有目录

   解决：`cp -r 文件名 地址`

   注意：这里的-r代表递归的意思。

6. `mv`

   move file in terminal: https://blog.csdn.net/qq_38451119/article/details/81121906

   ```shell
   sudo mv filename target-dir
   ```

   change file name

   ```shell
   sudo mv test.txt new.txt
   sudo mv ./fca58054-9480-4790-a8ab-bc37f33823a4/ ./mechanical
   ```

7. `rename` to change 

   https://blog.51cto.com/jiemian/1846951 Perl语言版本格式
   
   ```shell
   rename 's/a/b/' *a*
   ```
   
9. 

### Check and search

see also [File processing](/research/Programming-for-MD.md#file-processing)

1. check the size of a folder: https://zhidao.baidu.com/question/1178566665695139419.html

   ```shell
   du -sh /directory  # total size. default is .
   du -d 1 -h  # show folder and size, finally total size
   ```

   The `-d 1` option specifies the maximum depth of 1 level for the directory tree and the `-h` option prints sizes in human-readable format.
   To sort the output of `du -d 1 -h` in dictionary order, you can pipe the output to the `sort` command with the `-k 2` option to specify that sorting should be performed on the second field (i.e., the directory names). Here’s an example:

   ```shell
   du -d 1 -h | sort -k 2
   ```

   This will print the sizes of the directories in the current directory and its subdirectories, sorted in dictionary order by directory name.

2. `ls`

   https://www.runoob.com/linux/linux-comm-ls.html

   ```shell
   ls -l                    # 以长格式显示当前目录中的文件和目录
   ls -a                    # 显示当前目录中的所有文件和目录，包括隐藏文件
   ls -lh                   # 以人类可读的方式显示当前目录中的文件和目录大小
   ls -t                    # 按照修改时间排序显示当前目录中的文件和目录
   ls -R                    # 递归显示当前目录中的所有文件和子目录
   ```

3. `tree`: show directory as tree

   [linux 如何以树形结构显示文件目录结构](https://blog.csdn.net/xuehuafeiwu123/article/details/53817161)

   ```shell
   sudo apt-get install tree
   tree /path/to/dir
   ```

   要显示深度为2的文件，你可以使用命令`tree -L 2`

   > Windows的`tree`命令并不支持直接显示特定深度的文件。tree命令有两个参数，`/f`和`/a`。其中，/f是递归显示每个文件夹的名称，而`/a`是使用ASCII字符而不是扩展字符

4. `find`

   ```shell
   sudo find / -name "*your-query*" # all that contains your query
   ```

   [select file according to size](https://blog.csdn.net/Cassiel60/article/details/89016530)

   ```shell
   find . -name "*" -type f -size 0c > out.txt # output
   find . -name "*" -type f -size 0c | xargs -n 1 rm -f # delete
   ```

5. `locate`

   ```shell
   locate -h
   Usage: locate [OPTION]... [PATTERN]...
   Search for entries in a mlocate database.
   
     -A, --all              only print entries that match all patterns
     -b, --basename         match only the base name of path names
     -h, --help             print this help
     -w, --wholename        match whole path name (default)
   ```

   `locate`命令其实是`find -name`的另一种写法，但是要比后者快得多，原因在于它不搜索具体目录，而是搜索一个数据库`/var/lib/locatedb`，这个数据库中含有本地所有文件信息。**Linux系统自动创建这个数据库，并且每天自动更新一次**，所以使用`locate`命令查不到最新变动过的文件。为了避免这种情况，可以在使用`locate`之前，先使用`updatedb`命令，手动更新数据库。

   ```bash
   /usr/bin/updatedb && locate
   ```

6. `whereis`

   [每天一个linux命令（17）：whereis 命令 - peida - 博客园 (cnblogs.com)](https://www.cnblogs.com/peida/archive/2012/11/09/2761928.html)

   whereis命令只能用于程序名的搜索，而且只搜索二进制文件（参数-b）、man说明文件（参数-m）和源代码文件（参数-s）。

   和`locate`一样，查找那个数据库

7. 

### View file

see more in [Text editor](#text-editor)

1. `head` and `tail`
2. what if message is too long? add `|more` https://blog.csdn.net/weixin_34293911/article/details/86473042

### Soft link

create a **soft link** (short cut). Files stored in `gxf1` are actually occupying space in `gxf`. 

```shell
sudo ln -s /source/dir/ ./target
```

We'd better put the absolute path here...

> (However, I still have to specify the install directory.)

create a **hard link**:

```shell
sudo ln ./source ./target
```

https://zhuanlan.zhihu.com/p/88891362

my comprehension: 都是一个指针

硬链接和源文件是一样的，指向相同的内容（文件、inode）；

软链接指向一个东西（链接文件），这个东西（也算是指针）告诉你某处有个文件（源文件内容）。

区别就是删了源文件，硬链接还能访问，软的就不行。但是两种链接都可以改名字？

如果要类比，硬链接就像win备份用的那个符号链接，软链接则像快捷方式

![img](https://pic4.zhimg.com/80/v2-679da10fd5e4193d0098e6d6a35d5e1b_1440w.jpg)

<img src="https://pic3.zhimg.com/80/v2-9abd33350e3bcb401f379752874f9b52_1440w.jpg" alt="img" style="zoom:80%;" />



### change software source manually

in GNOME, maybe click Software & updates

> Ubuntu20.04软件源更换 - 舟公的文章 - 知乎 https://zhuanlan.zhihu.com/p/142014944
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
> # deepin
>deb http://mirrors.aliyun.com/deepin/ bionic main restricted universe multiverse
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
>N: 无法安全地用该源进行更新，所以默认禁用该源。
> 
>N: 参见 apt-secure(8) 手册以了解仓库创建和用户配置方面的细节。
> 
>https://packages.ubuntu.com
> https://packages.debian.org

# Installation

## apt

> !NOTE
>
> https://blog.csdn.net/liudsl/article/details/79200134
>
> apt 和 apt-get的区别：apt = apt-get、apt-cache 和 apt-config 中最常用命令选项的集合。

- install with apt-get or apt

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

- apt-key will be deprecated in the future

  https://suay.site/?p=526

- 解决依赖问题：it seems after failing to install a .deb package (due to dependent packages), the dpkg always remember this error, and even automatically install the dependent packages if you open **software updater**. or

  ```shell
  sudo apt-get -f install
  ```

  如果让我删，就手动`apt-get install`几个再用软件更新器

## yum

similar....

1. use yum and dnf in user (not root):

   ```shell
   sudo yum install xx
   ```

2. yum

   ```shell
   yum -y update
   yum -y upgrade
   ```

3. 

## dnf

dnf, which has many useful subcommands, has replaced yum in newer RHEL OS like CentOS 8 or later...

READ THIS: [Linux dnf command examples](https://landoflinux.com/linux_dnf_command_examples.html)

common:

```shell
dnf list installed/available/updates
dnf install/remove/reinstall/update package
dnf update/upgrade
dnf clean
dnf repolist
```

`distro-sync` synchronize system with all available repositories, but `upgrade` only upgrade your system.

[Adding or removing software repositories in Fedora](https://docs.fedoraproject.org/en-US/quick-docs/adding-or-removing-software-repositories-in-fedora/)



## dpkg

install with .deb

just **double click it** （不能指定目录），进入“软件安装”

> 命令行：直接解压到当前目录，然后配置环境变量，即可启动运行程序；
>
> ```shell
> dpkg -x same.deb 
> ```
>
> 当然，还有另外一个命令，安装到指定目录：
>
> ```shell
> dpkg -i --instdir=/dest/dir/path some.deb # under root
> ```
>
> It's hard to change default install directory. And I have to make a boot CD (U disk) to change the storage distribution (like when I'm installing Ubuntu, how much for root, home, swap...).

关于dpkg：https://blog.csdn.net/weixin_30394633/article/details/98926820

- 常用

  ```shell
  dpkg -i xx.deb
  dpkg --info xx.deb # 查看信息，包括软件包名，卸载时用！we should remember some of them
  dpkg -r xx.deb
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

- 安装新版本，直接dpkg新的包，就能覆盖安装

- Re: dpkg进程卡住，而且杀不死。解决方法：输入以下命令

  ```shell
  sudo rm /var/cache/apt/archives/lock
  sudo rm /var/lib/dpkg/lock
  sudo apt-get update
  sudo dpkg —configure -a
  ```

  问题就解决了！

- 

  

debug

- 死机 when installing .deb, reboot. https://mlog.club/article/3533423

  just fsck your root

  

## rpm

- in RedHat, use `.rpm`, no `.deb`. `rpm` is `dpkg` in RHEL

  ```shell
  rpm -i   package.rpm
  rpm -Uhv package.rpm # install
  rpm -Uhv package.rpm --nodeps --force # force to install
  ```

  https://docs.fedoraproject.org/ro/Fedora_Draft_Documentation/0.1/html/RPM_Guide/ch02s03.html

  but you can still double click!!

- The command `rpm -qa` is used to query all installed RPM packages on a system. The `-q` flag stands for "query" and the `-a` flag stands for "all"

## npm

install nodejs first.

change source: https://www.cnblogs.com/feng-hao/p/11774543.html

## other

1. run .sh files:

   ```shell
   sh file.sh
   bash file.sh
   # or
   chmod a+x file.sh
   ./file.sh
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

4. install flatpakref package

   ```shell
   sudo apt install flatpak
   sudo apt install gnome-software-plugin-flatpak # GUI
   ```

   [解决“正在连接443...失败：拒绝连接”问题 - 简书 (jianshu.com)](https://www.jianshu.com/p/cba95f62dc35)

   install with flatpak: add a remote, download a flatpakref file, and install

5. check version: `软件名 -version/--version`

6. 你可以使用 find 命令和 chmod 命令结合起来批量修改文件夹下所有可执行文件的权限。例如，如果你想让文件夹下所有文件都具有执行权限，可以使用以下命令：

   ```shell
   find <文件夹名> -type f -exec chmod a+x {} \;
   ```

   这条命令会查找指定文件夹下的所有文件，并使用 chmod 命令为它们添加执行权限。

   You usually need this when copying a program directly to another computer

7. wget失败：拒绝连接 https://www.jianshu.com/p/cba95f62dc35  ??

8. in our cluster

   ```
   warning:  Clock skew detected.  Your build may be incomplete.
   ```

   time is problematic (<u>install time in the future</u>?) but it doesn't matter.

9. 



# Specific commands

See [here](../research/Programming-for-MD#bash-shell) for Bash shell programming.

## privilige

`chown` and `chmod`, means change owner, change mode respectively

Linux/Unix 的文件调用权限分为三级 : 文件所有者（Owner）、用户组（Group）、其它用户（Other Users）。

https://www.runoob.com/linux/linux-comm-chmod.html  great tutorial!

https://www.runoob.com/linux/linux-comm-chown.html

- 适合于重装系统or迁移某软件到另一台机器：你可以使用 find 命令和 chmod 命令结合起来批量修改文件夹下所有可执行文件的权限。例如，如果你想让文件夹下所有文件都具有执行权限，可以使用以下命令：

  ```shell
  find <文件夹名> -type f -exec chmod a+x {} \;
  ```

  这条命令会查找指定文件夹下的所有文件，并使用 `chmod` 命令为它们添加执行权限。当然最后也 `chown` 一下

  `chown -R`: recursive

## Download

### wget

```shell
wget http://example.com/file.zip
```



### curl

Here is an example of how you can use the `curl` command to download a file from the internet:

```shell
curl -o file.zip http://example.com/file.zip
```

In this example, we use the `curl` command with the `-o` option to specify the name of the file where we want to save the downloaded data (`file.zip`). We then provide the URL of the file we want to download (`http://example.com/file.zip`).

If you want to download a file using `curl` and save it with the same name as the remote file, you can use the `-O` (capital letter O) option instead of the `-o` (lowercase letter o) option. Here is an example:

```shell
curl -O http://example.com/file.zip
```

### svn

get part of the files in one GitHub repository

- `svn checkout url`, 将地址中的 `/tree/master/` 换成 `/trunk/`

  Then the files are downloaded to the current directory of terminal.

  [如何在github下载一个项目中的单个文件或者子文件](https://blog.csdn.net/ai_faker/article/details/107823359)

- [ubuntu 下重新定位SVN URL方法](https://blog.csdn.net/q279838089/article/details/44751039)



## Zip and unzip

### tar

`-c` denotes zipping and `-x` denotes unzipping

```shell
tar -cf archive.tar foo bar  # Create archive.tar from files foo and bar.
tar -tvf archive.tar         # List all files in archive.tar verbosely.
tar -xf archive.tar          # Extract all files from archive.tar.

 主操作模式:

  -A, --catenate, --concatenate   追加 tar 文件至归档
  -c, --create               创建一个新归档
  -d, --diff, --compare      找出归档和文件系统的差异
      --delete               从归档(非磁带！)中删除
  -r, --append               追加文件至归档结尾
  -t, --list                 列出归档内容
      --test-label           测试归档卷标并退出
  -u, --update               仅追加比归档中副本更新的文件
  -x, --extract, --get       从归档中解出文件

  -j, --bzip2                通过 bzip2 过滤归档
  -z, --gzip, --gunzip, --ungzip   通过 gzip 过滤归档
      --zstd                 通过 zstd 过滤归档
  -Z, --compress, --uncompress   通过 compress 过滤归档
  -v, --verbose              详细地列出处理的文件
```

tbz file

```shell
tar -xjvf G16-A03-AVX2.tbz
```

zip into some certain-size part files to store in baidunetdisk or qq

```shell
tar -zcvf folder.tar.gz folder1 folder2 | split -b 4000M -d -a 1 - folder.tar.gz
```



### unzip

### rar

the problem rises when installing Gaussian

```shell
sudo apt-get install rar unrar
```

unzip multiple files: <u>maybe just select all part files and right click</u>...

https://www.cnblogs.com/xd502djj/archive/2011/03/25/1995331.html

```shell
unrar x -o- -y 'the first part file' 'target path'

unrar x -o- -y 'Gaussian 16 Rev. A.03 ES64L Linux x64.part1.rar' .
```



## Compile

[What does "./configure; make; make install" do?](https://askubuntu.com/questions/173088/what-does-configure-make-make-install-do)

- `./configure` checks if you have everything needed to build the application and informs you of any critical errors
- `make` builds (compiles) the source code
- `make install` installs the compiled code into your system.

### make

`make`命令是运行的所在目录下的`Makefile`文件, 如果*Make*file 里有*check*的话, 会执行测试,也就是检查下编译出来的东西能不能用

```shell
make -jn (install...)`
```

`n`代表同时编译的进程，可以加快编译速度，`n`由用户计算机的配置与性能决定

### cmake



## Text editor

### vim

- `:w` 保存但不退出

- `:wq` 保存并退出

  - `:q` 退出

- `:q!` 强制退出，不保存

  - `:e!` 放弃所有修改，从上次保存文件开始再编辑命令历史                                                                                                                 

- `:e!` 放弃所有修改，从上次保存文件开始再编辑命令历史                                                                                                                 

- :q<Enter> 退出                                    

  - :help<Enter>  或  <F1>  查看在线帮助                            

- :help version8<Enter>   查看版本信息

  - esc: stop editing

- `i` insert: edit

- :set fileencoding

  https://www.cnblogs.com/sharesdk/p/9208349.html

- shift+G, to the end of the file

  gg: head of the file

  0：本行第一个字符

  $：本行最后一个字符

- 在Vim中，您可以使用dd命令删除光标所在的整行。如果您想删除多行，可以在dd前面加上一个数字，例如3dd将删除光标所在行及其下面的两行。

- 

### nano



## System function

### history

https://blog.csdn.net/allway2/article/details/121215930

bash 的历史函数依赖于一个名为 *HISTFILE* 的变量，通常设置为当前用户的 *.bash_history* 文件（位于用户的主目录中）。

- clear history in the current shell

  ```shell
  history -c
  ```

- 您可以使用 `history -d offset` 从当前 shell 的历史记录中删除特定行。如果您想删除一系列行，可以用循环包装它。

  ```shell
  for i in {1..N}; do history -d START_NUM; done
  ```

  表示从 `START_NUM` 号命令开始往后删除 N 条记录。

### process management

- The `-9` option specifies that the `SIGKILL` signal should be sent, which **immediately terminates** the process without giving it a chance to clean up or save its state.
- The `killall` command is used to send a signal to one or more processes specified by name.  So, `killall -9 process_name` will immediately terminate all processes with the name `process_name`.
- By default, `pkill` sends the `SIGTERM` signal, which asks the process to terminate gracefully. `pkill -u username` will send the `SIGTERM` signal to all processes owned by the user `username`

# Desktop managers

kde and gnome are two types of desktop interface. KDE looks like Windows desktop and gnome is the classic Linux desktop interface. They both have specific fundamental tools.

## Common

To be re-organized

- terminal可以Ctrl+Shift+F

## GNOME

1. [How to Check GNOME Version*- Linux Nightly*](https://www.bing.com/ck/a?!&&p=e77723a6a2d79f1cJmltdHM9MTY3OTUyOTYwMCZpZ3VpZD0wYmUxMDdlNC03MWMxLTZlM2ItMGNlMi0xNTVhNzBjOTZmYWQmaW5zaWQ9NTQyNQ&ptn=3&hsh=3&fclid=0be107e4-71c1-6e3b-0ce2-155a70c96fad&u=a1aHR0cHM6Ly9saW51eG5pZ2h0bHkuY29tL2hvdy10by1jaGVjay1nbm9tZS12ZXJzaW9uLyM6fjp0ZXh0PTElMjBTdGVwJTIwMS4lMjBHbyUyMHRvJTIwdGhlJTIwQWN0aXZpdGllcyUyMG1lbnUsR05PTUUlMjB2ZXJzaW9uJTIwdGhhdCUyMGlzJTIwaW5zdGFsbGVkJTIwaW4lMjB5b3VyJTIwc3lzdGVtLg&ntb=1)

   ```shell
   gnome-shell --version
   ```

2. 重启桌面

   ```shell
   sudo /etc/init.d/gdm restart
   ```

3. 在Ubuntu的系统中如何将应用程序添加到开始菜单中 https://blog.csdn.net/qk1992919/article/details/51034361/ https://ubuntuqa.com/article/1235.html

   ```shell
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

   还是用**alacarte**. 

4. 设置→隐私→**屏幕**锁定→设置时间

5. https://gitee.com/wszqkzqk/deepin-wine-for-ubuntu windows环境，装qq微信等

6. [Gnome设置双屏 - 掘金 (juejin.cn)](https://juejin.cn/post/7158803954175279112)

7. [Ubuntu分屏](https://blog.csdn.net/SiriusExplorer/article/details/103016747)

   go to https://extensions.gnome.org/extension/39/put-windows/

   setting 

   <img src="https://cdn.jsdelivr.net/gh/gxf1212/notes@master/techniques/images/divide-screen.png" style="zoom:50%;" />

8. 有时候打开文件发现侧边栏不见了，这时候设置别的也没办法。解决但其实只要一个按键就好啦，就是F9

9. 在正常情况下，通过Alt + F2 => R => Enter 组合即可重启桌面环境。

10. 

11. 

12. 软件中心点开没反应？ 

    ```shell
    sudo apt-get update  
    sudo apt-get dist-upgrade
    sudo apt-get install --reinstall ubuntu-software
    ```

    也没用

## KDE

### Fundamental

- Checking KDE Version? In konsole just type :

  ```shell
  kwin --version
  ```

- 

### Shortcuts

- Default shortcut for creating a folder: F10; 

- F2: rename file/folder

- The quick way to open a terminal: Ctrl+Alt+T

- 要切换窗口可以用Alt+Tab来进行

  [桌面应用|如何在 KDE Plasma 桌面上配置任务切换器](https://linux.cn/article-14450-1.html)

- 使用CTRL键和功能键组合在一起可切换到指定的桌面，例如，CTRL-F1切换到1个桌面，CTRL-F3切换到第三个桌面。

  配置你的桌面的 pager 控件。它允许你轻松地切换至另三个附加工作区，带来更大的屏幕空间。

  <img src="https://cdn.jsdelivr.net/gh/gxf1212/notes@master/techniques/images/KDE-desktops.png" style="zoom:50%;" />

  将应用移动到特定虚拟桌面or工作区，设置快捷键：

  ![](https://cdn.jsdelivr.net/gh/gxf1212/notes@master/techniques/images/switch-desktop.jpg)

### Settings

- Display

  - Dual screen: Settings---Display Configuration

  - 把某个应用挪到显示屏2上，可以让它始终显示在显示屏2上，无论在主显示屏上如何在多个virtual desktop上切换

    > match by regular expression

    ![1693117470557](https://cdn.jsdelivr.net/gh/gxf1212/notes@master/techniques/images/KDE-window-rules.png)

  - Night color

    ![](https://cdn.jsdelivr.net/gh/gxf1212/notes@master/techniques/images/KDE-nightcolor.jpg)

  - https://blog.csdn.net/qq_44760799/article/details/121057915

- Konsole-profile

  <img src="https://cdn.jsdelivr.net/gh/gxf1212/notes@master/techniques/images/Konsole-profile.png" style="zoom:50%;" />

- Appearance--Fonts

  ![KDE-font](https://cdn.jsdelivr.net/gh/gxf1212/notes@master/techniques/images/KDE-font.png)

- In KDE 5.22.4 (Find your version in the About program):

  Right click the time > Configure Digital Clock > Time Display > 24-hour

  [reference](https://askubuntu.com/questions/1268176/global-24-hour-time-format-in-kde-plasma)

- KDE Plasma 环境里可以打开Discover的设置，然后再设置软件源

- Add application: you may want to add items to the KDE Menu toolbar. In order to do so, select/search Utilities, Menu Editor.

- https://os.51cto.com/art/200902/109883.htm

  如何在KDE桌面添加启动程序

- [Linux中设置开机启动脚本（fedora）](https://blog.csdn.net/s651665496/article/details/51569729)

  ````shell
  sudo vi /etc/rc.d/rc.local
  sudo chmod +x /etc/rc.d/rc.local
  sudo systemctl enable rc-local.service
  sudo vim /usr/lib/systemd/system/rc-local.service
  #在rc-local.service文件末尾加入:
  [Install]
  WantedBy=multi-user.target
  #重新执行
  ````

- Dolphin 

  - Click on the path. You can type or copy!

  - startup path

    ![](https://cdn.jsdelivr.net/gh/gxf1212/notes@master/techniques/images/KDE-Dolphin-startup.png)

- 

### Functions

[8 个在 KDE Plasma 桌面环境下提高生产力的技巧和提示](https://zhuanlan.zhihu.com/p/57696044?utm_id=0)

1. KDE-screenshot

   ![](https://cdn.jsdelivr.net/gh/gxf1212/notes@master/techniques/images/KDE-screenshot.jpg)

2. Clipboard: lower right corner

3. 鼠标移动到左上角：Activities

4. Konsole SSH manager

   ![Konsole-ssh](https://cdn.jsdelivr.net/gh/gxf1212/notes@master/techniques/images/Konsole-ssh.png)

> deprecated 
>
> 1. add "show desktop": http://www.linuxdiyf.com/view_134588.html
>
>    activate Meta+D to show desktop (system settings--shortcuts--global--Kwin)
>
>    now this is activated by default



### Fix problems

- 重启KWin：黑屏的时候用。。。

  ```shell
  kwin_x11 --replace # For X11
  kwin_wayland --replace # For wayland
  ```

  kwin_wayland is the KDE window manager. Nothing like lightdm, gdm, sddm,....

  they kill all processes and applications, but no need to reboot

  [是否可以不注销而重新启动KDE Plasma Desktop？](http://129.226.226.195/post/31487.html)

  [How to fix the KDE Plasma panel crash problem (addictivetips.com)](https://www.addictivetips.com/ubuntu-linux-tips/fix-kde-plasma-panel-crash/)

  ```shell
  killall plasmashell # to stop it
  kstart plasmashell # to restart it
  ```

  run all these in tty or a remote client

- If the desktop taskbar does not work

  ```shell
  plasmashell --replace
  ```
  
  But this occupies a terminal
  
  [A quick way to restart panel in KDE?](https://bbs.archlinux.org/viewtopic.php?id=273779)
  
- 

- CentOS重启ssh服务的命令如下：

  ```shell
  service sshd restart
  ```

  which fix "ssh cannot connect" problem

  `/etc/init.d/sshd restart` does not work here

- 要查看所有服务的状态，您可以在终端中运行以下命令：

  ```shell
  systemctl list-units --type=service
  ```

- Nvidia-powerd is only for mobile Ampere gpus so it’s useless with your 2080. Please disable and mask the service.
  https://forums.developer.nvidia.com/t/nvidia-powerd-fails-to-start/235498

  ```shell
  systemctl disable nvidia-powerd
  ```
  
- 
  
- 
  
- 

- [Error while loading libgconf-2.so.4 - Fedora Discussion](https://discussion.fedoraproject.org/t/error-while-loading-libgconf-2-so-4/77736), [Linux 缺少 libgconf库 libgconf-2.so.4 =＞ not found](https://blog.csdn.net/wwlhz/article/details/109765020)

## Emergency

see also [Debugging experiences](#debugging-experiences )

[技术|详解在 Ubuntu 中引导到救援模式或紧急模式 (linux.cn)](https://linux.cn/article-14709-1.html)

> [如何进入Linux救援模式 | CS笔记 (pynote.net)](https://cs.pynote.net/se/202111251/)

When system halted/stuck

1. 1st solution

   1. press ctrl+alt+F1~6 to enter tty. 
      - F7 or F8: exit? not useful. maybe directly `reboot`..
   2. use `top` to see threads. 
      - top: https://www.cnblogs.com/ggjucheng/archive/2012/01/08/2316399.html
   3. `kill id` to release.

   ubuntu的话，卡死崩溃时你切换到tty1～6然后 

   ```shell
   sudo pkill X
   startx
   ```

   一下，就好了。不需要重启。

2. 2nd solution

   https://blog.csdn.net/openswc/article/details/9105071

   search SysRq fedora

   I've tried https://fedoraproject.org/wiki/QA/Sysrq#How_do_I_enable_the_magic_SysRq_key.3F, don't know if it's applicable on this computer

3. [如何重置Xorg/xserver？ - Ubuntu问答 (ubuntuqa.com)](https://ubuntuqa.com/article/3066.html)

   ```shell
   sudo X -configure
   Xorg -configure
   ```

   or, enter tty, kill the process of `gnome-shell` or tty7

4. 

5. http://www.mamicode.com/info-detail-2913916.html

   also stop, disable .....but only under user.....

   https://blog.csdn.net/xinxinqqt/article/details/44784195

   https://blog.csdn.net/fryingpan/article/details/42641999

   might because handling too many files in a folder...?

> - do not double click .sdf file with multiple conformations...it occupies all memory..
> - 

# System installation

note: some used stupid old strange paths. replace with yours (eg: your `/home`)

## Releases

[技术|最适合程序员的 10 款 Linux 发行版](https://linux.cn/article-14547-1.html)

[2022 年适合初学者的 10 个最佳 Linux 发行版 - Linux迷 (linuxmi.com)](https://www.linuxmi.com/2022-10-top-linux.html)

linux核心的东西都一样，发行版之间最大的区别无非是包管理和发行周期，以及默认带的软件包。当然，还有桌面管理和外观。。

### Ubuntu

familiar...

[How to autostart applications on Ubuntu 20.04](https://linuxconfig.org/how-to-autostart-applications-on-ubuntu-20-04-focal-fossa-linux): search 'startup' app

### CentOS 9 Stream

> it's GNOME by default

The big thing with CentOS 9 Stream is that it’s kind of the polar opposite of what CentOS once was. In the past, CentOS was all about stability. Because of that, packages were very slow to upgrade to new releases. In fact, you would often find packages that were a few releases old. That was done by design, to keep the operating system as absolutely rock-solid as possible. And it worked. CentOS was always amazingly stable.

### Fedora

[Fedora 38 科研环境搭建](https://zhuanlan.zhihu.com/p/635384972): compare with others

https://docs.fedoraproject.org/en-US/epel/
Note that EPEL is not suitable for use in Fedora! Fedora is not Enterprise Linux. EPEL provides "a high quality set of additional packages for Enterprise Linux, including, but not limited to, Red Hat Enterprise Linux (RHEL), CentOS and Scientific Linux (SL), Oracle Linux (OL)". Put simply, Enterprise Linux is a term that refers to Red Hat Enterprise Linux or one of its clones. And Fedora is not a Red Hat clone.f

That is why you cannot install the "epel-release" package in Fedora. It simply does not exist. Don't try to use EPEL on Fedora.

As noted before, the Fedora repositories provide most (if not all) of the EPEL packages. Additional software for Fedora is available in the RPMFusion repositories. In their own words, RPMFusion is "an extension of Fedora" that "provides software that the Fedora Project or Red Hat doesn't want to ship." RPMFusion can not be used on Enterprise Linux. You could see RPMFusion as the "EPEL alternative" for Fedora, but be aware that the software collections provided by RPMFusion and EPEL are entirely unrelated and uncomparable.

[Failed to synchronize cache for repos for RHEL 8 - Red Hat Customer Portal](https://access.redhat.com/discussions/4222851?tour=8)

#### Fedora38 Scientific

https://labs.fedoraproject.org/scientific/

评价：

- gcc有点太新了，人家最多12.x它已经13.1了
- 确实有各种花里胡哨的工具（或在应用商店里），但也不太用
  - 默认的Spyder无法配自己的conda环境，默认的Pymol字体太小，等等

Periodic table of elements

![](https://cdn.jsdelivr.net/gh/gxf1212/notes@master/techniques/images/Fedora-table-elements.jpg)

<img src="https://cdn.jsdelivr.net/gh/gxf1212/notes@master/techniques/images/Fedora-table-elements2.jpg" style="zoom:67%;" />

其他和正常KDE差不多

> unsolved problems:
>
> - taskbar always frozen
> - login waiting 1 min
> - startup recover windows
> - GFW
> - download WeChat files just in Fedora

## Installation

### Partition

2022.1.3重装

| 挂载点 | 大小     | 文件系统 | 分区类型 |
| ------ | -------- | -------- | -------- |
| \boot  | 1G       | ext4     | 逻辑     |
| \efi   | 1G       | EFI      | 主分区   |
| \swap  | 16G      | swap     | 逻辑     |
| \      | ≥80G     | ext4     | 主分区   |
| \home  | /dev/sdb | ext4     | 主分区   |

2022.2更新：其实boot和efi半个g就够了，swap倒可多点（32g，2倍内存，1倍内存也行） 

### Other



#### Grub

[How to Change Grub Boot Order and Make Windows Default?](https://itslinuxfoss.com/how-to-change-grub-boot-order-and-make-windows-default/)

[Change Grub Boot Order - Ask Ubuntu](https://askubuntu.com/questions/961929/change-grub-boot-order)

```shell
sudo nano /etc/default/grub
GRUB_DEFAULT=1
sudo update-grub
```



## Common configuration

### Ubuntu

2022, for my previous workstation

> 安排存储分配。关键的软件也许装到root，但不利于重装
>
> - [x] 翻墙 (electron-ssr)
> - [x] ToDesk, 向日葵，vnc viewer？(remote control)
> - [x] 显卡驱动, cuda, (cudnn)
> - [x] 编程环境 (pycharm, anaconda)
> - [x] 基本工具（git, gparted这种）、常用写作（typora和主题, VScode）
> - [x] 分子模拟环境（gmx,NAMD,openbabel,pymol,gaussian,ambertools,acpype,VMD,DSV）
> - [x] 配套工具（百度网盘、阅读器、wine-TIM、有道词典?、WPS）
> - [x] email client login
> - [x] VPN (easy connect, electerm)
> - [x] 程序图标(4个)
> - [x] 备份系统(onedrive, timeshift?)
> - [x] 输入法、字体等
> - [x] 网络工具（easyconnect，ssh client等）
> - [ ] 其他？（texlive,,mendeley,GitHub Desktop, flash, 浏览器)
> - [ ] 自定义桌面等，如天气，壁纸图片
>
> 小问题
>
> - [x] 输入法点不开  界面（算了）

- 安装时定好系统语言等

- 如果不改home的分区，原来磁盘上的文件不会丢失

- 更改root密码

  ```shell
  sudo passwd root
  ```

- 挂载home盘，实现自动挂载。找uuid：那个设备的路径（`blkid`）

  ```shell
  vi /etc/fstab
  # 添加如下内容：
  # uuid=xxxxxxx /home ext4 defaults 0 0
  ```

- 更改desktop的路径为英文，极端cmd下语言改成英文 [命令行更改系统语言](https://blog.csdn.net/MaryChow/article/details/68494243?spm=1001.2101.3001.6650.1&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7Edefault-1.no_search_link&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7Edefault-1.no_search_link)

  ```shell
  sudo vim /etc/default/locale
  LANG="en_US.UTF-8"
  LANGUAGE="en_US:en"
  
  LC_NUMERIC="zh_CN.UTF-8"
  LC_TIME="zh_CN.UTF-8"
  LC_MONETARY="zh_CN.UTF-8"
  LC_PAPER="zh_CN.UTF-8"
  LC_IDENTIFICATION="zh_CN.UTF-8"
  LC_NAME="zh_CN.UTF-8"
  LC_ADDRESS="zh_CN.UTF-8"
  LC_TELEPHONE="zh_CN.UTF-8"
  LC_MEASUREMENT="zh_CN.UTF-8"
  ```

  或者直接装英文的吧，加个中文输入法

- 第一个安装：确定合适驱动版本，直接在软件与更新里下

  - 禁用那个开源的Nouveau？没管过
  - 安好cuda（cudnn）

- 安装QQ/TIM，方便传送经验

- 更新软件源，便于下载lightdm等依赖

  - 先注释掉原来的源，update。但可以直接到‘软件与更新’(software and updates)里面更改

- 安装向日葵（ToDesk），以便远控

  - 尝试是否能远控重启

- 安装vi, git, alacarte, gpart, gparted, ethtool, 等基本工具. configure git

  ```shell
  sudo apt-get install vim git alacarte gpart gparted ethtool openssh-server openssh-client npm locate
  ```

- chrome浏览器，安装vpn，翻墙、校园网

  https://askubuntu.com/questions/510056/how-to-install-google-chrome

  ```shell
  wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | sudo apt-key add -
  # or
  cat linux_signing_key.pub | sudo gpg --no-default-keyring --keyring gnupg-ring:/etc/apt/trusted.gpg.d/google-chrome.gpg --import
  sudo sh -c 'echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list'
  sudo apt-get update
  sudo apt-get install google-chrome-stable
  ```

  > deb: https://www.google.cn/intl/zh-CN/chrome/
  >
  > go to https://support.google.com/a/answer/135937?hl=en to sync your account

- 安装显卡下游的gmx（先编译着）、vmd、namd

- 安装输入法；把win的字体拷过来一份

- typora, VScode等办公. see [installation](/techniques/Prepare-for-the-computer?id=text-editor)

- 安装网络连接的easyconnect、electerm等

[common installations reference](https://www.zdaiot.com/Linux/%E8%BD%AF%E4%BB%B6/Ubuntu%E5%AE%89%E8%A3%85%E5%90%8E%E8%A6%81%E8%A3%85%E7%9A%84%E5%B8%B8%E7%94%A8%E8%BD%AF%E4%BB%B6/)

need to configure in alacarte:

```
adt
pymol
DSV
GaussView
chimera
Pycharm
anaconda-navigator
```

in Fedora KDE, alacarte is replaced by "Menu Editor", gparted by KDE Partition Manager

### Fedora KDE

其实差不多

- 至少有线能连上
- zjunet连网；Firefox登录
- NVIDIA driver, CUDA, etc.
- system configuration: 分辨率，双屏等, disable screen lock, virtual desktop
- try ssh from and to
- QQ, electerm, LibreOffice
- conda, Pycharm, VScode, Pymol, vmd
- cmake, gcc, fftw, gromacs, namd (intel, Amber, at least AmberTools)
- try SSR
- shortcuts, time zone, user info, multiple desktops, ...

## Quick re-install

Keep the HDD unchanged; keep all congfigurations; recover dpkg softwares.

[reference](https://needis.me/ubuntu/2011/01/11/e9-87-8d-e8-a3-85ubuntu-e7-b3-bb-e7-bb-9f-ef-bc-8c-e5-ba-94-e7-94-a8-e7-a8-8b-e5-ba-8f-e7-9a-84-e6-81-a2-e5-a4-8d.html)

### backup

1. 备份已安装软件包列表

   ```shell
   sudo dpkg --get-selections | grep -v deinstall > ~/packages.txt
   ```

2. 备份软件源列表

   ```shell
   sudo cp -r /etc ~/etc
   sudo cp -r /opt ~/opt.backup # maybe t
   ```

   > `/etc/apt/sources.list`是一般的源。`/etc/apt/sources.list.d` contains all 'other software' in 'Software & updates' (after Ubuntu 22.04). 

3. 如果拷到另一个硬盘，就保留conda环境（不格式化可以不动），因为拷贝的时候会报错（我硬盘可能不兼容。。）。就不要copy `anaconda`, `.anaconda`, `.conda`, `.condarc`这几个文件夹了

   > 咱也不知道 invalid argument 的文件是否影响……

   ```shell
   conda-env list
   conda-env export env-name > filename.yaml
   ```

4. 备份Home下的用户文件夹（包括隐藏文件）。保留home的话，其实没事；如需拷到另一个硬盘，那就慢慢拷。。

   ```shell
   # under root
   for f in `ls -a`; do  # or `cat files.txt`
   cp -rf $f /media/username/uuid/folder
   echo "moved $f"
   done
   ```

   

### recover

1. 新系统安装：一定是保持username不变的重装！（最好所有都别变）才能直接挂载home盘，直接原样使用……

   ```shell
   sudo passwd root
   # mount home
   sudo vi /etc/fstab
   # UUID=xxx /home ext4 defaults 0 0
   ```

   > 注意在安装时观察你的home盘的状态，比如我当时就变成了ext2...但还是要填ext4。也许这就是我废了的原因

   或者，拷出来一份数据，装完系统或格式化完，**拷回去**

   > Linux系统的福利：程序和配置分开，便于迁移，瞬间恢复！！！

   ```shell
   # 如需要
   # 将当前前目录下的所有文件与子目录的拥有者皆设为 runoob，群体的使用者 runoobgroup
   # 需要一段时间
   chown -R runoob:runoobgroup *
   ```

2. 复制备份的Sources.list文件：

   ```shell
   sudo cp -r ~/etc /etc
   sudo cp -r ~/opt /opt
   ```

   > 并替换（Ctrl+H）文档中的intrepid为jaunty?? no

   然后更新软件源（`sudo apt-get update`）。click the sources in 'Software and updates'

3. 重新下载安装之前系统中的软件（如果你安装的软件数量比较多，可能会花费较长时间） 

   ```shell
   sudo dpkg --set-selections < ~/packages.txt && sudo apt-get dselect-upgrade
   ```

4. 

but the following still needs re-configure...

- vmd
- windows font

## Upgrading release

### Ubuntu22.04

  https://os.51cto.com/article/705797.html

  1. 备份 (if necessary)

     > a tool to create a system image: https://linuxconfig.org/ubuntu-20-04-system-backup-and-restore

  2. 卸载cuda和nvidia驱动，最好禁用第三方 PPA

  3. 更新软件

     ```shell
     sudo apt update && sudo apt full-upgrade
     sudo apt autoremove
     sudo dpkg reconfigure -a # if necessary
     ```

  4. `update-manager -d -c`，一步步完成

     please stay in front of the computer to press 'ok'

  5. restart. 修复包，更新软件，装回东西

  > 2022.7.18 notes
  >
  > 现在装的还是dev版。新特性
  >
  > - UI美化，调颜色等
  > - 多个workspace，触控屏
  > - 自带截屏录屏工具
  > - snap不好
  > - ……

### CentOS

workflows:

- [How To Convert From CentOS 7 To CentOS Stream 8 - TechViewLeo](https://techviewleo.com/how-to-convert-from-centos-to-centos-stream/?expand_article=1)
- [How to upgrade CentOS 7 to CentOS 8 Linux - Techglimpse](https://techglimpse.com/how-to-upgrade-centos-7-to-centos-8-linux/)
- [How to Upgrade Centos 7 to 8](https://www.howtoforge.com/how-to-upgrade-centos-7-core-to-8/)

就像那人说的，没有官方的升级方法

证明网上的更新方法存在根本问题，`dnf distro-sync`这个命令不容易一次性升级好系统的基础包。

The central problem: [centos8 - CentOS Stream 8 - DNF Broken - Unable to Run Update/Upgrade - Stack Overflow](https://stackoverflow.com/questions/71070277/centos-stream-8-dnf-broken-unable-to-run-update-upgrade)

> Problem: The operation would result in removing the following protected packages: dnf

Finally failed updating system packages like `dnf`, `systemd`, etc., which proves this workflow may not work at all!

Then I followed a terrible suggestion:

```shell
rpm -qa | grep -i devel | xargs -n 1 dnf remove -y
```

helped me removed many important packages...like the old gcc, cuda, nvidia etc., which should have pushed the upgrade, but dependencies failed.

> [GCC Problems upgrading CentOS from 7 to 8 - CentOS](https://forums.centos.org/viewtopic.php?t=75172)
>
> ```
> (gcc >= 8 with gcc < 9) is needed by annobin-11.13-1.el8.x86_64
> rpmlib(RichDependencies) <= 4.12.0-1 is needed by annobin-11.13-1.el8.x86_64
> ((grub2 >= 2.02-99) if grub2) is needed by kernel-core-4.18.0-500.el8.x86_64
> ((grub2-efi >= 2.02-99) if grub2-efi) is needed by kernel-core-4.18.0-500.el8.x86_64
> rpmlib(RichDependencies) <= 4.12.0-1 is needed by kernel-core-4.18.0-500.el8.x86_64
> ```



#### Deleting the kernel

In Step 14 I deleted the kernel, which did not push forward the upgrade either.

[删除内核后无法重新开机](https://juejin.cn/s/Linux删除内核无法开机)，虽然执行完删除命令后系统还在运行

https://blog.51cto.com/zhaoqifly/1841868 记一次CentOS7内核kernel的删除重装

> 如果您没有其他可用的内核版本，可以使用 Live CD 或 USB 作为启动介质，然后进入救援模式进行修复。根据您使用的发行版不同，步骤可能也会略有不同，以下为一些通用的方法：
>
> - 挂载根目录：在命令行中输入 `sudo mount /dev/sda1 /mnt` （`sda1` 代表您的系统根目录所在的分区）。
> - 挂载必要目录：如果您的根目录使用了其他分区（例如 `/var`），则需要分别挂载这些分区。例如，如果 `/var` 所在的分区为 `/dev/sda2`，则可以使用 `sudo mount /dev/sda2 /mnt/var` 命令挂载 `/var` 分区。
> - 更改根目录：在命令行中输入 `sudo chroot /mnt`，将根目录更改为 `/mnt`。
> - 安装新的内核：在命令行中输入 `sudo apt-get install linux-image-generic` 命令安装一个新的内核版本。
> - 更新 GRUB：在命令行中输入 `sudo update-grub` 命令更新 GRUB 配置文件。
> - 退出救援模式：在命令行中输入 `exit` 命令退出救援模式。
> - 重启系统：在命令行中输入 `sudo reboot` 命令重新启动系统。

Fedora启动盘：在rescue模式下包只能一个个装，强制安装（`--force --nodeps`）新版内核仍然无法开机。`dnf`和`yum`都用不了，想修复也无法把修复包装给那个root，copy不过去。无法进行批量依赖修复，工作量太大。

CentOS启动盘的修复模式还是能回到之前开机时的状态的（troubleshoot）

possible package download site:

- [kernel | Package Info | CentOS Stream BuildSys](https://kojihub.stream.centos.org/koji/packageinfo?packageID=800)
- [CentOS 8 Packages](https://linuxsoft.cern.ch/cern/centos/8/BaseOS/x86_64/os/Packages/)

cannot run dnf, rpm; yum is already removed: [rpm 和 yum 失败并显示“错误：无法初始化 NSS 库”](https://ericmouafo-wordpress-com.translate.goog/2020/09/21/rpm-and-yum-fail-with-error-failed-to-initialize-nss-library/?_x_tr_sl=en&_x_tr_tl=zh-CN&_x_tr_hl=zh-CN&_x_tr_pto=sc)

而且出现不应该有的依赖，`/bin/sh`不存在这种

> fedora boot USB device, trouble shooting, start faster than for installation
>
> fedora36和38的启动盘，rescue时看到的挂载情况还不一样。后者看不到原来的root盘，只能看到home？
>



# Debugging experiences 

mainly for previous Ubuntu workstation

## TOC

This chapter also includes (kind of) systematic notes. Just make a memo.

- debugging the system (file, driver)
  - you are in emergency mode
  - Nvidia driver-Linux kernel mismatch
  - Press ctrl+c to cancel all filesystem check
  - wrong fs type, bad option, bad superblock on
- data recovery and backup
  - rm -rf /* (testdisk recovery)
  - Data Recovery from re-install (diskgenius, formatted disk, no mis-deleted, expand)

## 21.2.17 rm -rf /*

what if you

```shell
rm -rf /*
```

? a disaster, right? see what I did then: https://blog.csdn.net/gxf1212/article/details/113827850

## 21.11.24 you are in emergency mode....

https://www.jianshu.com/p/9c9ad9a97452 vim

https://www.runoob.com/linux/linux-comm-mount.html mount

https://stackoverflow.com/questions/13361729/found-a-swap-file-by-the-name/51326724 vim的冲突，显示的信息

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

[关掉nvidia的更新](https://blog.csdn.net/weixin_33850890/article/details/92712012?spm=1001.2101.3001.6650.1&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7Edefault-1.highlightwordscore&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7Edefault-1.highlightwordscore)

A START JOB IS RUNNING FOR HOLD UNTIL BOOT FINISHES UP 

https://www.rffuste.com/2020/04/19/solution-a-start-job-is-running-for-hold-until-boot-finishes-up-ubuntu/

https://blog.csdn.net/weixin_43994864/article/details/114409694

## 2022.1.14 cannot auto-mount HDD

after re-installing the system. should not do formatting!

所以不要选那个重装系统，而要选“其他选项”。。？

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
# 常用
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
> ![make-gpt](https://gitee.com/gxf1212/notes/raw/master/techniques/images/22.1.14-make-gpt.jpg)
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
> ![22.1.14-gdisk1](https://gitee.com/gxf1212/notes/raw/master/techniques/images/22.1.14-gdisk1.jpg)
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

```shell
fdisk -l # 只有sda1且分区 1 未起始于物理扇区边界（不管）；主 GPT 表损坏，但备份似乎正常，将使用它。
df -h # 没有HDD的信息
lsblk # 正常
blkid /dev/sda # 正常
parted -l # 当然正常
fdisk /dev/sda
gdisk /dev/sda # same as before
# 用系统工具查看，发现是未分配空间？？
```

> 用备份的partiation table覆盖main pt。recovery--load backup
> 
> ```shell
> gdisk
> > r
> > c
> > Y
> ```
> 
> the same as yesterday...

尝试：每次开机自动运行脚本手动挂载/home。不可，因为可能自己就坏了，需要修复。。（放一会自己就会坏）

而且无法自动在输入流输入sudo或su的密码。。

似乎加载备份后更好？

> 用fdisk更改uuid失败，却得知了sda的uuid，此时已经变成奇怪的东西，仍然找不到

> [!NOTE]
> 
> `/etc/fstab` option, not 'default', but 'default**s**'!!

https://qastack.cn/unix/315063/mount-wrong-fs-type-bad-option-bad-superblock

```shell
fsck -vy /dev/sda
```

You should always add `y` !!!

> a lot of:
> 
> 组 #1872的可用inode计数错误（8192，实际为2021）。  
> 处理? yes  
> 
> 组 #1872的目录计数错误（0，实际为621）  
> 处理? yes

makes `mount -a` work fine, but after rebooting, fsck is needed again! `gdisk` still GPT broken

> ```shell
> fsck.ext4 -B 2048 /dev/sda # 随便试了一个，得到了如下命令：
> 
> e2fsck -b 32768 -y /dev/sda
> e2fsck 1.45.5 (07-Jan-2020)
> 超级块不具有的恢复标志，然而在日志中找到了恢复数据。
> 备份超级块中未设置恢复标志，继续处理日志。
> /dev/sda：正在修复日志
> 第 1 步：检查inode、块和大小
> 第 2 步：检查目录结构
> 第 3 步：检查目录连接性
> 第 4 步：检查引用计数
> 第 5 步：检查组概要信息
> ```
> 
> [e2fsck(8): check ext2/ext3/ext4 file system](https://linux.die.net/man/8/e2fsck)

no difference...

> type `ls` at 主目录, I can't get what in my /sda, though the GUI works well. only after rebooting terminal.

Oh! finally unsolved! re-install the system!

## 22.1.29 Data Recovery from re-install**

formatted my HDD when re-installing the system, lost all data

- stu邮箱能找回NUS的东西吧
- 同样还有部分rdrp的东西
- 百度网盘里有高斯，git上有ML代码，SDH的在群里和聊天记录？
- 其他不太重要的
  - 封面图片
  - 文档里的：package、license等
  - pycharm practice

### 问题的产生

>[!WARNING] 
>https://blog.csdn.net/qq_40907977/article/details/105900429 用移动硬盘拷数据，先umount再弹出。。

出于对电脑软硬件，特别是对温逗死的了解，知道一般格式化后的数据还是可以找回来的，只要没有被数据二次覆盖。

快速格式化：在格式化过程中重写[引导记录](https://baike.baidu.com/item/引导记录/8669373)，不检测磁盘坏簇，FAT表中除坏簇以外所有表项清零，根目录表清空，数据区不变。

> 出故障后，应尽快umount文件系统。

尝试一些方案吧

1. https://forum.ubuntu.org.cn/viewtopic.php?t=343604  

   https://www.diskgenius.cn/bbs/forum.php?mod=viewthread&tid=1623 

   Diskgenius重建分区表+重装？

   > 可以用磁盘管理器**看出460G分区中230G已用**，我想，数据就在那里，为何看不到呢！经过disgenius找回文件功能全部扫描后，仍然跟以前一样，看到了我的主用户文件夹，但里面没有任何文件

   DG的破解

   > https://www.downkuai.com/soft/147756.html

2. https://blog.csdn.net/u012589476/article/details/50433432 直接deep search？

   找不到啥。。

关于各种软件：

- Diskgenius只支持Windows的文件系统，但好像Linux的盘也能用？
- easyrecovery不保留原来文件名？
- 其他：嗨格式数据恢复大师？R-Studio数据恢复 免费？将硬盘寄给厂家？B计划数据恢复软件？。。。

### 修复过程

华硕主板u盘启动：按F8（DEL，F2）

无法U盘启动的情况：

1、电脑所属机型不支持U盘启动，条件允许的，可以换个机型试试；

2、U盘本身由于平时操作不当，如直接插拔，导致接口接触不良，此时可以换个USB接口试试；

我那个可能不是USB3.0

DG的坏道检测，看看硬盘是不是不行了

格式化后还是直接“恢复文件”

DiskGenius扫不出来。。也许可以放弃了。。

testdisk和DG扫不出来，基本可以去找专业公司了

遗留一些疑问

- 如果拔下硬盘插在别的电脑上，会不会能看见？winPE这次没找到
- diskgenius如果能恢复，之后虽然看不见文件但是能发现空间被占用了？
- 现在的DG是成功破解了，但老是闪退不知为啥。。
- 其他的不知道哪些靠谱，包括英文教程。
- 比如photorec感觉是testdisk的子程序。。好像不能扫描这种。。

### 教训

（1）**做好定期数据备份**：我还是觉得每天备份对我来讲似乎不太现实。一个月备份一次，而且一定要备份在移动硬盘上。今天开始我要把数据备份列入工作计划了！免不了笔记本会出现各种意外情况的（包括丢失、物理破坏等）！
（2）**固定化分区模式**：以便即使出现我的状况，还能有挽救的机会。
（3）数据恢复：首先格式化后千万**别写入**数据；其次分析数据**丢失原因**；再次如果是格式化等原因，尽量找回分区表（我觉得第一时间用**testdisk和diskgenius**最好）；确认数据还在（恢复分区后应该在UBUNTU系统中可以看到硬盘已用空间，如果和你记得的近似，那说明数据就在那里，等你去找她）；最后软件无法恢复的话，就试试我的办法吧：用一样的分区办法，相同的系统重新安装（切忌在分区的时候，目标数据分区不能格式化啊）。

来自方案一

（4）网上已有的经验越来越不够用了，有志气真的还是自己去论坛提问

### 其他，待整理

系统应用，磁盘：看你怎么分区的。现在都是efi+boot

按shift进入grub，f2进入bios

ubuntu进入grub菜单 https://jingyan.baidu.com/article/6dad50755e35d1a123e36ecc.html

```shell
sudo gedit /etc/default/grub

#grub_timeout_style=hidden
grub_timeout=5 # 秒数
grub_cmdline_linux_default=text

sudo update-grub
```

extundelete：恢复rm误删的文件

## 22.3.2 系统出错并无法恢复,请尝试注销并重新登录。

https://blog.csdn.net/shen_bb/article/details/16983739

```
sudo mv /home/user/.Xauthority /home/user/.Xauthority.backup  (user为你的登录用户名) 
sudo service lightdm restart
```

## 2022.3.4 向日葵静置就卡机

> 这次安装完之后，没开始做模拟时就没出过问题。。
>
> 推测：
>
> - namd等内存的问题？？按blog做，没这问题
> - 也没有使用开源驱动啊
>
> 恢复：远程通过ssh登录tty然后重启？
>
> 已经关闭自动锁屏和息屏延时，不知道是否有效。。
>
> 把vnc停了，但也没用

问题描述

- 有时远控正用着就卡机，一段时间不操作很快会卡机
- 断开后一段时间（如过夜）后卡死

并发症状

- ssh有时能连？花生壳没下线。

- 向日葵甚至有时能看到，tty也不太能进入

- 主机似乎发出较大声音

- 重启时

  ```
  nvidia-gpu 0000:01:00.3: 12c timeout error e000000
  ucsi_ccg 0-0008 i2c_transfer failed -110
  ucsi_ccg 0-0008 ucsi_ccg_inlt failed - -110
  ```

  几秒后才开机

> 不用向日葵（线下）基本ok，说明是远控的问题
>
> 后来觉得应该是：显卡没用默认的，且常用远程控制使用了过多的图形界面程序

解决思路：

- 自动释放资源，因为向日葵可能有残留进程啥的？
- 显卡驱动设置？
- 换个软件

自己使用习惯：

- 休息时断开连接
- 吃饭睡觉前重启一波？
- 占资源行为：VScode开着巨大的log文件（还好？最好别）

## 22.3.17 主文件夹没了，用户还在

- 症状
  - 输入密码后闪一下又回到登录界面（循环登录）
  - 我的用户文件夹没了
  - gdisk: all is 'not present' 
- 可能错误问题
  - 系统配置
    - 显卡 (no prob)
    - ls -ld /tmp; /usr/lib，权限 (not this)
    - /etc/profile（没用？
  - 硬盘坏了
    - 硬盘空间不够？
    - df -h等手段
    - 即使gdisk写了分区表也不可，重装后都看不到

https://www.jianshu.com/p/c8403b417641 解决ubuntu显卡驱动和循环登录问题

https://blog.csdn.net/cqandwly/article/details/118407580

> cat ~/.xsession-errors (no!)

https://blog.csdn.net/chenjiyou363753068/article/details/90611483

https://askubuntu.com/questions/401201/could-not-chdir-to-home-directory-home-me-no-such-file-or-directory  新建一个文件夹设为home

http://www.noobyard.com/article/p-vgixdwgy-st.html 创建home后解决了？

不得已的解决：重建用户，下载备份

但是都没用。结果：重装系统、格掉硬盘

> 我的根目录无罪啊！！！

教训：

>[!WARNING]
>
> 永远不能用ToDesk的按钮重启

2022.4.9，再次这个问题

过程：重启后死机。强制，到了emergency。修复home，闪回登录界面，已经没/home/gxf了。修复home，远程卡机终端重启。修复sda，uuid没了。修复sda1，硬盘挂成功。仍没gxf，testdisk啥都没，GPT corrupt，lost and found有gromacs的碎片

> Files that appear in lost+found are typically files that were already unlinked (i.e. their name had been erased) but still opened by some process (so the data wasn't erased yet) when the system halted suddenly (kernel panic or power failure). If that's all that happened, these files were slated for deletion anyway, you don't need to care about them.

刚才应该直接gdisk /dev/sda1

解决：重写了分区表，相当于格式化吧。重新创建用户。。

## 22.4.9 after recreating a user, no permission 'apt' installed tools

Though I only need to re-install programs in gxf (like gmx), a sea of permission errors occur in all tools previously installed by `sudo apt`. Only with sudo can they be installed or removed. (dpkg: error: requested oper ation requires superuser priviLege)

1. Chrome的密码没了，还有每次登录要输密码

   ![chrome-startup](https://gitee.com/gxf1212/notes/raw/master/techniques/images/chrome-startup.png)

   解决：设置中打开passwords and keys，或cmd输入`seahorse`、返回，删掉关于Chrome的所有login的keyrings并无用？或者设一个空的密码。但是每次开Chrome仍会自动创建一个？？

   Chrome 无法自动填充密码：点击右上角头像 - 管理用户 - 移除此用户 - 之后再登录就好喽

   later gives the same problem upon startup but seahorse will not respond (how to open without cmd? pwd and keys does not work now)

   https://wiki.archlinux.org/title/GNOME/Keyring#Passwords_are_not_remembered

   deleting Ubuntu keyring works

   ```shell
   rm ~/.local/share/keyrings/*
   ```

2. onedrive client：重装没用，但留下安装folder以便卸载

3. vim

   ```
   E575: viminfo: Illegal starting char in Line:
   <context id="">
   E575: viminfo: Illegal starting char in line:
   <application id="snap - store_ ubuntu-sof tware- Local-
   file . desktop" score="0" last-seen="0" />
   E575: viminfo: Illegal starting char in line:
   <application id=" google- chr ome . desktop" score= ”152
   ”last-seen=" 1650193126" />
   ```

   solution: `rm ~/.viminfo`		 https://blog.csdn.net/sahusoft/article/details/4540931

4. 安装软件要root不是sudo。Linux打开应用需要root，因为是之前那个用户安装的。要更改程序的用户组和用户主

   https://www.runoob.com/linux/linux-comm-ls.html `ls -l` to see owners

   solution

   ```shell
   sudo chown moonlight:moonlight xxx
   ```

   or re-install the program and reboot, to solve some of them (e.g. xmgrace)

5. git cannot remember login info

   fatal: unsafe repository (xxx is owned by someone else)
   
   ```shell
   $ git push origin -u master
   warning: url has no scheme: <?xml version="1.0"?>
   fatal: credential url cannot be parsed: <?xml version="1.0"?>
   Username for 'https://gitee.com':
   ```
   
   even though I've already done the settings
   
   check `~/.git-credentials` and you will find `<?xml version="1.0"?>` and strange things
   
   solution: `rm ~/.git-credentials` and rerun `git config --global credential.helper store`. done.
   
   > https://stackoverflow.com/questions/61376694/git-ubuntu-url-has-no-scheme
   
6. tbc

## crash!!!

死机总结

- 现象：
  - 用的时候突然死，并非内存炸了；远控一连上就死；偶尔开机后很快就死；经常长时间待机就死，无故障时间在几小时到一天之间
  - 有时显示启动失败那种命令行报错
- 类型：鼠标能动点不动；啥都不动甚至鼠标消失；屏幕边框消失
- 重启失败：卡在注销时，卡在检查文件系统，等。
- 背景：远控导致多次长按电源，后来只能长按，经常长按
- 推测：重装后又好了？但一开始长按电源就越来越容易死

7.27更新

刚重装了系统，但直接挂了home盘

我觉得每次强制重启就fsck就不好，多数是initramfs，少数是emergency mode，而且修复

- systemd-journal is always running...and its tracker-miner-f...and rsyslogd...
- startup: ubuntu report internal error, tracker-miner-f崩了？

启动盘中它们不运行

关机时，failed to write ... read-only system



驱动

每次启动都有nvidia的一个啥啥110 gpu error

无法关机的问题：命令行无效，点击无效，或者点完黑屏，只有左上角一个下划线，无法进入tty——可能内核和驱动不兼容。这样好像是最近才出现的

我想起之前的糟糕系统，远控打开无故障的时间长一点

另外，插一个NTFS系统的U盘也会导致奇怪的卡死、无法重启（似乎仍和systemd有关），拔掉就好了



总结问题

- systemd占用cpu导致算力下降（之前没有
- HDD的异常（ext2，fsck等）
- 图形界面和显卡，和远控，导致的卡死
- 其他崩溃（CPU stuck，无法关机也无法tty，等）
- 程序：electron-ssr，3.8.10，好了一次又崩了，所有版本



https://askubuntu.com/questions/906251/systemd-journald-high-cpu-usage

按此方法，systemd-journal终于被抑制了

## 22.7.29 device for boot loader installation

During the ubuntu installation, usually we choose the default one (SSD). Actually, choosing your SSD (or even the partition where your EFI is) or HDD (in my case, sda, the only HDD, and not dual-system...) is both fine.

<img src="https://cdn.jsdelivr.net/gh/gxf1212/notes@master/techniques/images/boot-leader.png" alt="img" style="zoom:20%;" />

references:

- [安装启动引导器的设备](https://www.cxybb.com/article/zhangxiangweide/79989651)
- [for dual-system, install in Windows boot manager](https://blog.csdn.net/weixin_41053564/article/details/85724884)
- [he says sda1 works also well](https://icode.best/i/21014233984515)

But my experience was: I seemed to choose 'sda1', and after rebooting, it said

<img src="https://cdn.jsdelivr.net/gh/gxf1212/notes@master/techniques/images/lost-home.png" alt="img" style="zoom:25%;" />

It kept popping out such a window unless I prevented that by pressing Esc (the GUI may crash). Then I entered the 'emergency mode'. I had to `fsck -y /dev/sda1`, but millions of lines of messages (fixing inodes?) float in front of the screen. It tooks several minutes to finish. Upon rebooting, I could open the main folder, but EVERYTHING WAS GONE!!

> Another thing is, I cannot re-install Ubuntu when choosing 'installation mode'. I usually choose 'something else'. Without formatting the HDD, all the files under `/home/user` is kept.

It seems that all the inodes are re-written. I tried re-installing Unbuntu with SSD and HDD as the place for boot leader, but no luck. I haven't tried sda1, neither recovering from 'lost-and-found', but I was hopeless.

Please do not think twice. Why data can be lost so confusingly in Linux...

## 22.8.10 clash causes proxy to fail

https://www.cnblogs.com/jasy/p/15182881.html

https://github.com/Fndroid/clash_for_windows_pkg/issues/2871 最详细

https://github.com/Fndroid/clash_for_windows_pkg/issues/3104

https://docs.neobook.co/v/faq/wu-fa-shi-yong-chang-jian-wen-ti-shou-ce/clash-for-windows-yong-bu-le

> 管理员运行cmd，`netsh winsock reset`，重启

问题描述：最新ShadowsocksR in Windows，正常使用ssr（全平台）。安装clash for windows后部分翻墙。firefox可以（但也不怎么快？），极速浏览器可以，Android手机和iPad可以，Chrome和Edge不行（可能和chrome内核的浏览器冲突？），我的账号不行，买的那个google drive的账号可以。

solution: go back to default. chrome设置---将设置还原为原始默认设置，clash和ssr都能用了



Windows打开系统代理服务器设置：搜索proxy

clash会自动调成手动的，但当前状态下ssr和clash都能用



## usual problems

1. A problem occured and the system cannot be recovered

   https://www.cnblogs.com/wu-song/p/12745956.html

   ```shell
   sudo apt-get update && apt-get upgrade
   sudo dpkg --configure -a
   ```

2. https://sudoedit.com/linux-server-wont-reboot/

3. checking media presense开不了机: just turn off 'secure boot'



# Windows notes

## General

1. Find operating system info in Windows 11

   Select Start > Settings > System > About (系统信息). Open About settings.

2. windows如何查看用户名 https://zhuanlan.zhihu.com/p/129858590

   控制面板--用户账户

3. win下扩容？

   https://www.cnblogs.com/yunweis/p/8023098.html

   动态磁盘可以跨磁盘扩容

   diskgenius可以无损扩容？

   [mklink命令给C盘软件搬家](https://www.cnblogs.com/life-of-coding/p/10871831.html)：等搞清楚了哪些地方比较大就整

4. win11系统如何显示文件后缀名：搜索“文件资源管理器选项”

   http://www.ujiaoshou.com/xtjc/164431010.html

5. [windows如何查看目前显存的占用情况](https://zhidao.baidu.com/question/136674799462427125.html)：任务管理器---性能

   > [主存、辅存、内存、外存、存储器是什么？还傻傻分不清楚？看完这一篇就够了](https://zhuanlan.zhihu.com/p/113869761)
   >
   > RAM是memory（主要是内存）的一部分

6. Windows 11 22H2大版本：文件夹标签页。直接在设置的检查更新里

7. 快捷键

   - 联想，打开键盘灯光：Fn+空格键
   - 关闭NumLock，小键盘可以当做上下键、End等用
   - alt加双击直接打开属性，F2重命名

8. Windows-Unix reference table

   | Windows command | Unix command |
   | --------------- | ------------ |
   | `dir`           | `ls`         |
   | `cls`           | `clear`      |
   | `curl`          | `curl`       |

   

9. duplicate tab with the same path in cmd

   https://learn.microsoft.com/zh-cn/windows/terminal/tutorials/new-tab-same-directory

10. cmd的设置

    config file: `C:\Users\Lenovo\AppData\Local\Packages\Microsoft.WindowsTerminal_8wekyb3d8bbwe\LocalState\settings.json`  

    [link](https://learn.microsoft.com/zh-cn/windows/terminal/install#settings-json-file)

11. [计算机桌面图标不见了，怎么恢复](https://consumer.huawei.com/cn/support/content/zh-cn00695687/)

12. TTC字体是TrueType字体集成文件(.TTC文件)，可和ttf放一起

13. In the Command Prompt window, press and hold the F7 key (no Fn) to view the history of Command Prompt. Then it will open the list of commands you currently typed in.

    https://www.alphr.com/view-command-history-command-prompt/

    but only this cmd...

14. 选择任务栏上的" 任务视图"，然后选择" 新建桌面"，然后打开所需的应用。 若要在虚拟桌面之间移动应用，请选择" 任务视图"，然后将所需的应用从一个桌面拖到另一个桌面。 或通过将应用拖动到新桌面来创建另一个虚拟桌面。

15. https://home.csulb.edu/~murdock/tree.html

16. 今日弄完VPN，普通网络都上不了。解决方法：

    ![restore-network](https://cdn.jsdelivr.net/gh/gxf1212/notes@master/techniques/images/restore-network.png)

17. [切换盘符：使用cmd命令行 cd e: 无法切换到E盘-CSDN博客](https://blog.csdn.net/u011288271/article/details/52781342)

    切换盘符和切换路径是分离的。想要切盘符 直接使用命令 `e:` 或者 `cd /d e:` 即可

18. [将 Windows 电脑用作移动热点 - Microsoft 支持](https://support.microsoft.com/zh-cn/windows/将-windows-电脑用作移动热点-c89b0fad-72d5-41e8-f7ea-406ad9036b85)  not useful for 188...

19. windows11删除文件需要管理员权限怎么办？删完里面的东西，包括隐藏文件。重启后再删文件夹

    不重启：可能需要管理员模式打开cmd去删？

20. 按下键盘“Win+Ctrl+D”可以一键生成一个新桌面。生成后，再按下“Win+Ctrl+方向键”可以快速切换这两个桌面。
    why not work in ToDesk?

21. 浏览器默认应用

    ![](https://cdn.jsdelivr.net/gh/gxf1212/notes@master/techniques/images/chrome.png)

    点击链接用浏览器打开：下面的https

22. 

## Lenovo

- [联想电脑管家最新功能—桌面助手 - bilibili](https://www.bilibili.com/video/BV1Ke411V74Y/)

- 联想拯救者电源键红点是进入了野兽模式。联想拯救者有三种模式：

  - 电源红色是野兽模式，在大型游戏时开.
  - 白色是均衡模式平常用的.
  - 蓝色是静音模式，办公时候使用。

  按住键盘Fn+Q能快速切换模式。

- 

- （联想）win11护眼模式：文件夹中右键--护眼卫士

## WSL

### Installation

https://ubuntu.com/tutorials/install-ubuntu-on-wsl2-on-windows-11-with-gui-support#2-install-wsl

install wsl, ubuntu, and ubuntu22.04 (choose one of the two) in microsoft store

- The error "wslregisterdistribution failed with error: 0x80370114" typically occurs when the Hyper-V service is blocked during the installation of a Linux distribution using the Windows Subsystem for Linux (WSL).

  控制面板--程序与功能--左侧，或直接搜索“Windows功能”

  <img src="https://cdn.jsdelivr.net/gh/gxf1212/notes@master/techniques/images/windows-function.png" alt="1704871157971" style="zoom:80%;" />

- [将 Windows10 中的 WSL 添加至右键菜单_shift+右键没有wsl选项-CSDN博客](https://blog.csdn.net/gulang03/article/details/79177500)

- 

### cuda

在Windows装好cuda的情况下给wsl2装cuda？我的直接能用nvidia-smi，但是`'/usr/bin/cuda': No such file or directory`

https://www.jianshu.com/p/be669d9359e2

[Enabling GPU acceleration on Ubuntu on WSL2 with the NVIDIA CUDA Platform | Ubuntu](https://ubuntu.com/tutorials/enabling-gpu-acceleration-on-ubuntu-on-wsl2-with-the-nvidia-cuda-platform#1-overview)

The latest NVIDIA Windows GPU Driver will fully support WSL 2....Once a Windows NVIDIA GPU driver is installed on the system, CUDA becomes available within WSL 2. The CUDA driver installed on Windows host will be stubbed inside the WSL 2 as libcuda.so, therefore users must not install any NVIDIA GPU Linux driver within WSL 2.
We recommend developers to use a separate CUDA Toolkit for WSL 2 (Ubuntu) available from the CUDA Toolkit Downloads page to avoid this overwriting. This WSL-Ubuntu CUDA toolkit installer will not overwrite the NVIDIA driver that was already mapped into the WSL 2 environment.

到底咋弄

[WSL libcuda.so.1 is not a symbolic link 的解决方法 | kiraの博客 (kira-96.github.io)](https://kira-96.github.io/posts/wsl-libcuda.so.1-is-not-a-symbolic-link-的解决方法/)

### Usage

- WSL is highly memory-demanding...
- WSL 可以使用 `[tool-name].exe` 直接从 WSL 命令行运行 Windows 工具。 例如，`notepad.exe`。
- wsl2的套路变了，linux的文件系统整个是个镜像文件，启动系统后，这个文件系统映射到了 \\wsl$\系统名 下面

  在Windows下访问：`\\wsl$\Ubuntu-20.04\`



- 无法以管理员运行powershell: [无法加载文件 ps1，因为在此系统中禁止执行脚本。有关详细信息，请参阅 "get-help about_signing"_gulp : 无法加载文件 c:\program files\nodejs\gulp.ps1,因为在...](https://blog.csdn.net/github_35186068/article/details/80518681)

# MacOS notes

## iOS

苹果手机提示icloud储存空间不足
首先，在设置中，点击最上面的选项进入自己的AppleID的设置。 点击管理储存空间;选择你不想用的那部分，点击打开，选择【停用和删除】即可。
要不就停用iCloud（不推荐），要不就买。没办法

# Computer science

## Coding

- 重写(Override)与重载(Overload)

  - 重写是子类对父类的允许访问的方法的实现过程进行重新编写, 返回值和形参都不能改变。**即外壳不变，核心重写！**
  - 重载(overloading) 是在一个类里面，方法名字相同，而参数不同。返回类型可以相同也可以不同。
- C language is faster than Python because it is a compiled language while Python is an interpreted language. This means that C code is directly translated into machine code by the compiler, while Python code is first translated into bytecode and then interpreted by the interpreter

## numerical simulation

> In computer programming, numbers are represented using a finite number of bits (0s and 1s). Decimal numbers can be represented in two ways: floating point and fixed point.
>
> Floating point representation is a way of representing numbers with a varying number of digits before and after the decimal point. The position of the decimal point can change depending on the magnitude of the number. This allows for a wide range of numbers to be represented, both very large and very small. However, because the position of the decimal point is not fixed, it can lead to rounding errors and loss of precision.
>
> Fixed point representation, on the other hand, uses a fixed number of bits to represent the whole number and decimal portion of a number. This means that the decimal point is fixed at a specific position, and the number of digits before and after the decimal point is predetermined. This limits the size of the number that can be represented, but also ensures that the precision is maintained and rounding errors are minimized.
> For example, let's say we want to represent the number 3.14159. In floating point representation, the computer may represent it as 3.141590118408203125, which is an approximation. In fixed point representation, we could choose to use 16 bits, with 8 bits for the whole number and 8 bits for the decimal portion. This would allow us to represent numbers between -128 and 127, with a maximum of 256 possible decimal values (0-255). We could represent 3.14159 as 3.25 (in binary, 00000011.01000000).
> there is no rounding error when performing arithmetic operations within the bounds of the fixed point representation.

- 浮点数：科学计数法，范围更广
- 定点数：保持精度（绝对位数，不是有效数字位数）

https://escholarship.org/content/qt95k0h86q/qt95k0h86q.pdf  also an Amber TI example?

Single-precision floating-point format: a binary32 as having:

- Sign bit: 1 bit
- Exponent width: 8 bits
- Significand precision: 24 bits (23 explicitly stored)

a binary64 as having:

- Sign bit: 1 bit
- Exponent: 11 bits
- Significand precision: 53 bits (52 explicitly stored)

## HPC

- **Tesla A100 is...2~3x** faster than the V100 using 32-bit precision.
- SIMD stands for **Single Instruction, Multiple Data**. It is a type of parallel processing in Flynn’s taxonomy. [SIMD describes computers with multiple processing elements that perform the same operation on multiple data points simultaneously](https://en.wikipedia.org/wiki/Single_instruction,_multiple_data)
- NCCL：Nvidia Collective multi-GPU Communication Library，多GPU通讯
- MPI是高性能计算常用的实现方式，它的全名叫做Message Passing Interface。顾名思义，它是一个实现了消息传递接口的库。MPI作为编程库很丰满，作为计算框架很骨感。它的好处在于一切自己动手，不利也在于一切全靠自己。
  http://www.xtaohub.com/IT-neo/Parallel-programming-MPI.html

## Hardware-related

- HDMI线必须要插在主机的偏下一点，也就是直接插在显卡上，偏上的那个口是没有用的

- disk自我检测分析与报告技术smart: https://www.cnblogs.com/xqzt/p/5512075.html

- 无线网卡 (英文名称：**Wireless network interface controller**，缩写为WNIC) driver

  https://www.nnnxxx.cn/

  https://github.com/the-tcpdump-group/libpcap

  https://askubuntu.com/questions/537170/no-such-file-or-directory-net-bpf-h

- 固态硬盘不需要整理碎片

- Deep-Learning Computing Unit (DCU)

- 你们电脑沾水了一定要拆开晒干啊，前两周发热没注意想着清下灰就行，今天跑去看，说是受潮了然后主板芯片烧了

- [四个内核八个逻辑处理器是什么意思，我的电脑cpu到底是几核 - 老马奇遇记 (z197.com)](https://z197.com/blog/four-cores-eight-logical-processors-how-much.html)

  一个物理CPU可以有1个或者多个物理内核，一个物理内核可以作为1个或者2个逻辑CPU。有多少个逻辑处理器，就可以开多少个线程。

- U盘的可用空间通常会比标明的容量稍小一点，这是正常现象。这主要是因为存储设备制造商和操作系统使用不同的计算方法来计算存储容量。（我不信所有大小不一样都是这个缘故）

  存储设备制造商通常使用十进制计算方法来计算存储容量，即1GB = 1000MB，1MB = 1000KB，1KB = 1000字节。然而，操作系统通常使用二进制计算方法来计算存储容量，即1GB = 1024MB，1MB = 1024KB，1KB = 1024字节。



