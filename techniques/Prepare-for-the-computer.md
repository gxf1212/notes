



# Prepare for the computer

This page is all about software installing (Linux), both for system and research environment. (Used to) Mainly recorded while in NUS. 

# General

## Coding

### Pycharm

To activate the professional version

[免费使用PyCharm（学生）+GitHub学生认证](https://blog.csdn.net/qq_51468843/article/details/110561151); [PyCharm学生认证邮箱失效怎么办](https://blog.csdn.net/qq_51468843/article/details/110572719)

现在edu邮箱滥用，必须用GitHub或学信网学籍验证才行

### VScode

just follow the official site

[Running Visual Studio Code on Linux](https://code.visualstudio.com/docs/setup/linux)

or via snap

```shell
sudo apt-get install snap
sudo snap install --classic code
sudo snap r codium
```

other text editors

- https://www.sublimetext.com/docs/linux_repositories.html
- https://atom.io/  sunset...

## chat

These are for old systems:

https://github.com/Hackerl/Wine_Appimage

https://github.com/eNkru/freechat/releases

https://github.com/askme765cs/Wine-QQ-TIM

[vscode qq extension based on android qq protocol](https://github.com/takayama-lily/vscode-qq)

[https://github.com/wszqkzqk/deepin-wine-ubuntu](https://github.com/wszqkzqk/deepin-wine-ubuntu)

[https://www.cnblogs.com/kittybunny/p/13603714.html](https://www.cnblogs.com/kittybunny/p/13603714.html)

[https://blog.csdn.net/weixin_44268185/article/details/107083916](https://blog.csdn.net/weixin_44268185/article/details/107083916)

[https://blog.csdn.net/qq_42114918/article/details/81840335](https://blog.csdn.net/qq_42114918/article/details/81840335)

Now QQ, Dingtalk, Slack, etc. should all be avaibable

Still no elegant ways to install WeChat (wine/docker). 啊呸！<u>人人都骂微信，人人都用微信。</u>

## Office

### LibreOffice

Usually already installed in common Linux distributions

Appimage for my previous old system: https://www.libreoffice.org/download/appimage/  ok

### WPS

https://github.com/linlinger/wps-appimage/releases/tag/1.0 dependence unsatisfied...

https://linux.wps.cn/

via snap: https://www.how2shout.com/how-to/how-to-install-wps-office-on-ubuntu-linux-via-command-terminal.html

### Foxit Reader

 Linux installation is also Silly

- install: run the .run file

  - it's good. rename it, and run the .run file under root

    ```
    ./foxit.run
    ```

    or it will die

- remove: find the uninstall file under /home/user/opt/foxitsoftware/...

- cannot open: kill the process...

### Mendeley

> at NUS machine

```shell
# never run under root!!
python3 ~/mendeleydesktop-1.19.8-linux-x86_64/bin/mendeleydesktop
# always sync to avoid losing data!!!

Fatal Python error: _Py_HashRandomization_Init: failed to get random numbers to initialize Python
Python runtime state: preinitialized
```

https://stackoverflow.com/questions/47936584/what-does-client-failed-to-connect-to-the-d-bus-daemon-mean

## Other

  1. GitHub Desktop on Linux https://codechina.csdn.net/mirrors/shiftkey/desktop?utm_source=csdn_github_accelerator

  2. weather  https://www.ywnz.com/linuxjc/4429.html

  3. insync, sync for google, onedrive, dropbox

     https://cn.go-travels.com/98643-how-to-use-google-drive-linux-4176144-1291281

> browsers
>
> - google chrome         包名：google-chrome-stable
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

# Remote control and ssh

See [here](Specific-Software-Usage.md#clustersupercomputers) for details on usage of `ssh` and scheduling system.

I don't use remote control now...

## real vnc on linux

只能试用14天了。。

https://www.realvnc.com/en/connect/download/vnc/linux/

```shell
rpm -Uhv VNC-Server-6.7.2-Linux-x64.rpm # if there is conflict, add --nodeps --force
systemctl start vncserver-x11-serviced.service # start service
vnclicensewiz # GUI to sign in and assign pwd for this host
systemctl enable vncserver-x11-serviced.service # startup enabled
```

Kindly remember your password!

Note that you may switch an accout for further use. Install realvnc viewer in your pc logging in with the same account to easily connect them.

https://zhuanlan.zhihu.com/p/46640232

backup (not using): tips when install:

```
Start or stop the service with:
  systemctl (start|stop) vncserver-x11-serviced.service
Mark or unmark the service to be started at boot time with:
  systemctl (enable|disable) vncserver-x11-serviced.service

Installed systemd unit for VNC Server in Virtual Mode daemon
Start or stop the service with:
  systemctl (start|stop) vncserver-virtuald.service
Mark or unmark the service to be started at boot time with:
  systemctl (enable|disable) vncserver-virtuald.service

Installed firewalld service configuration. To enable access to VNC services from the public zone, use the following commands:
For VNC Server in Service Mode:
  firewall-cmd --zone=public --permanent --add-service=vncserver-x11-serviced
For VNC Server in Virtual Mode daemon:
  firewall-cmd --zone=public --permanent --add-service=vncserver-virtuald
Running as unit: run-r4aa0cc0954b846c993f38c8939dae70a.service
```

viewer on linux:

```shell
rpm -Uhv VNC-Viewer-6.20.529-Linux-x64.rpm --nodeps --force
```

then open the GUI and sign in

gmail

https://tieba.baidu.com/p/7157359656

```shell
elif [ "$os_name"== 'Fedora' ]; then
        os_version=`cat /etc/fedora-release | cut -d' ' -f3`
|| [ $os_name== "fedora" ]
```

> tight vnc: [doc](https://docs.fedoraproject.org/en-US/fedora/rawhide/system-administrators-guide/infrastructure-services/TigerVNC/), [error](https://www.dev2qa.com/how-to-fix-error-job-for-vncserver1-service-failed-because-the-control-process-exited-with-error-code-see-systemctl-status-vncserver1-service-and-journalctl-xe-for-details-when-start-vnc/)
>
> I've removed that but maybe it's ok (you may try to find the viewer). 

Domestic: sunlogin, todesk. Easy to install. See [Specific Software Usage](#Specific-Software-Usage.md#connect-and-remote-control)

## easy connect (Linux, for zju)

> 重要启示：点击安装包，显示安装成功，但启动程序时点击图标无响应，可通过命令行终端（Terminal）执行命令来启动。观察怎么个报错法！有道、DS等

```shell
/usr/share/sangfor/EasyConnect/EasyConnect 
(EasyConnect:51965): Pango-ERROR **: 15:18:20.035: Harfbuzz version too old (1.3.1)
追踪与中断点陷阱 (核心已转储)
```

https://www.cnblogs.com/cocode/p/12890684.html

下载pangolib  我的云盘  链接: https://pan.baidu.com/s/1i8O5ZvMLqnw8K8EzKIrw6Q 提取码: c896

```shell
sudo cp ./'pango lib'/lib/lib* /usr/share/sangfor/EasyConnect/
```

server: https://rvpn.zju.edu.cn

It's fine on Windows; but x86 version cannot be installed here! And x64 shows 版本过低 upon reboot

[this version (EasyConnect_x64.deb)](http://download.sangfor.com.cn/download/product/sslvpn/pkg/linux_01/EasyConnect_x64.deb) does not report this problem. stable!

> [!NOTE]
> 7.14 update: using new (my own) account. still install the official version
>
> download: https://rvpn.zju.edu.cn/com/installClient.html#auto-common

> ZJU的Rvpn：https://www.coolspring8.com/p/rvpn-easyconnect/. see his GitHub https://github.com/Hagb/docker-easyconnect
>
> 7.6.7 version: appropriate for XJTU

> [!WARNING]
>
> do not turn on auto login on Linux! cannot change user name (unless you reinstall the client) because https://rvpn.zju.edu.cn will be redirected to the download page.

usage: 没事不要老开着，当自动断开时就重启一下！！

> https://www.cc98.org/topic/5521873  ZJU Connect

https://my.liyunde.com/easy-connect-activity-monitor/  强制杀死easyconnect，但没launchctl这个命令



## ZJUnet: extend LAN to WLAN

> https://github.com/xelerance/xl2tpd

[https://github.com/QSCTech/zjunet](https://github.com/QSCTech/zjunet)

just install....直接运行 `install.sh` may also work

usage:

```shell
sudo zjunet vpn -c
sudo zjunet vpn -d
```

can only activate in one IP per account?

first time:

```shell
$ zjunet user add 
username: student id number
password: normal pwd
```

### debug

https://github.com/QSCTech/zjunet/issues/68

"username"->"xxxxxxxx@y"
y应为a, b, c其中一个，我的套餐是10元档所以填的a。

not useful here

[linux配置vpn客户端时，service xl2tpd restart 不成功 · Issue #261 · hwdsl2/docker-ipsec-vpn-server (github.com)](https://github.com/hwdsl2/docker-ipsec-vpn-server/issues/261)

```shell
sudo systemctl status xl2tpd.service
sudo journalctl -u xl2tpd.service
# similar error
# maybe https://github.com/hwdsl2/docker-ipsec-vpn-server/issues/261

sudo dnf install NetworkManager-l2tp
# https://github.com/QSCTech/zjunet/issues/68
```

### Other

[使用 ZJU Connect 代替 EasyConnect 提升你的 RVPN 体验！ - CC98论坛](https://www.cc98.org/topic/5521873)



## Configure wired

### Source

冷知识：只连有线的时候仍能`sudo yum install`

[给Ubuntu更换自定义源(ZJU)](https://blog.csdn.net/xelloq/article/details/79424759), but maybe go to ZJU mirror website. 

[Configure ZJU source for conda](http://mirror.zju.edu.cn/docs/anaconda/)

### Static IP

[How to Configure Static IP Address on Fedora – TecAdmin](https://tecadmin.net/configure-static-ip-address-on-fedora-desktop/)

[如何在 Fedora Linux 系统下配置静态IP地址？ - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/589864823)

To get your gateway's IP address, use the `route` command with the `-n` flag to translate hostnames into IP addresses

<img src="https://cdn.jsdelivr.net/gh/gxf1212/notes@master/techniques/imagesgnome-static-IP.png" style="zoom:67%;" />

#### KDE

only cmd?

我们写：10.77.14.188/24

```shell
sudo nmcli connection modify 91d78f79-c7cf-32fc-8a91-bc2d587a2461 IPv4.address 192.168.1.127/24
sudo nmcli connection modify 91d78f79-c7cf-32fc-8a91-bc2d587a2461 IPv4.gateway 192.168.1.1
sudo nmcli connection modify 91d78f79-c7cf-32fc-8a91-bc2d587a2461 IPv4.dns 8.8.8.8
sudo nmcli connection modify 91d78f79-c7cf-32fc-8a91-bc2d587a2461 IPv4.method manual
```

> ```shell
> /etc/init.d/network restart
> ```
>
> 我机子上没有

#### GNOME

just GUI, see above



### ssh service

- 要将sshd服务设置为开机自启动，您可以使用以下命令（我感觉默认就enable了）

  ```shell
  sudo systemctl enable sshd
  ```

- CentOS重启ssh服务的命令如下：

  ```shell
  sudo service sshd restart
  sudo service sshd restart
  ```

  which fix "ssh cannot connect" problem

  `/etc/init.d/sshd restart` does not work here

- 要查看所有服务的状态，您可以在终端中运行以下命令：

  ```shell
  systemctl list-units --type=service
  ```

- 

### ports

- [First check ssh service and opened port](https://www.thegeekdiary.com/error-bind-to-port-2222-on-0-0-0-0-failed-permission-denied-error-while-starting-sshd-service-on-centos-rhel/)

  ```shell
  grep ssh /etc/services
  # install openssh-client/server
  ```

- [How to change SSH port on Linux - Linux Tutorials - Learn Linux Configuration](https://linuxconfig.org/how-to-change-ssh-port-on-linux)

  [Linux中修改SSH端口号](https://www.jianshu.com/p/de8a5a69c9ea)

  ```shell
  vim /etc/ssh/sshd_config
  # uncomment Port 22; 将`#Port 22`修改为`Port 端口号`
  ```

  刚打开时被注释掉了

- To add more ports

  ```shell
  systemctl start firewalld
  firewall-cmd --zone=public --add-port=1935/tcp --permanent
  # --zone 作用域 
  # 添加端口，格式为：端口/通讯协议
  # --permanent 永久生效，没有此参数重启后失效
  firewall-cmd --reload
  # 查看端口号
  netstat -ntlp
  ```
  
  and check. No need to bother like this?
  
  [linux打开端口命令是什么-睿象云平台 (aiops.com)](https://www.aiops.com/news/post/5409.html)
  
  [CentOS 7 firewall-cmd开放端口时出现bad port (most likely missing protocol)解决方案_error: invalid_port: bad port (most likely missing-CSDN博客](https://blog.csdn.net/Vrobron/article/details/55006182)
  
  [linux打开端口](https://www.aiops.com/news/post/5409.html)
  
- error: [bad port (most likely missing protocol)](https://blog.csdn.net/Vrobron/article/details/55006182): you missed tcp

  [“error: Bind to port 2222 on 0.0.0.0 failed: Permission denied” – error while starting sshd service on CentOS/RHEL – The Geek Diary](https://www.thegeekdiary.com/error-bind-to-port-2222-on-0-0-0-0-failed-permission-denied-error-while-starting-sshd-service-on-centos-rhel/)
  
- ...

### then

[如何从外网访问拥有内网地址的局域网内某台电脑](https://blog.51cto.com/u_1121681/784378)

现在只有断了WiFi才能ssh？

# break the wall

## 禾斗学上网

这几个机场都是我用过的，都还不错的，适用于ssr、clash等多种连接方式，配有详细的教程。欢迎点击以下几个连接注册账号，根据需要购买合适的套餐。

- [云翻墙](https://support.dellcomputer.online/auth/register?code=dZNd)
- [忍者云](https://renzhe.cloud/auth/register?code=pE4p)

更多选择，上YouTube搜一下就好了。。

- [壁虎翻墙](https://freegecko.com/index.php/#/register?code=R6kbY2VP)：在win和Linux上用clash都遇到了麻烦，虽然可能是我自己的问题。SSR上不能用。
  - 更新：clash把我的代理设置全毁了，现在conda、GreenVPN在打开clash时都用不了。用回ShadowsocksR才好了。已经配置好的童鞋谨慎换客户端吧。。

客户端：

- https://github.com/HMBSbige/ShadowsocksR-Windows
- https://github.com/shadowsocksrr/electron-ssr  Linux
- https://github.com/Fndroid/clash_for_windows_pkg

大概步骤：安装electron-ssr，导入订阅链接。教程参考[云翻墙](https://support.dellcomputer.online/auth/register?code=dZNd)等官网的说明。

VPN：之前用过[GreenVPN](https://www.greenvpn.host/)，感觉还可以，流量包是3 US dollar 10个G。但这家现在被ChatGPT封了。

## basics

[vpn和v2ray、ssr、加速器有什么区别？](https://shutupandshowpages.com/index.php/2021/07/06/vpn%E5%92%8Cv2ray%E3%80%81ssr%E3%80%81%E5%8A%A0%E9%80%9F%E5%99%A8%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB%EF%BC%9F/)

翻墙的方式：vpn、代理、自己搭服务器（淘宝上还有帮忙搭建内网穿透的；自己也可搭ssr啥的？）

总之vpn更安全；v2ray比ssr可靠、难搞

[好用的VPN推荐，国内仅2款好用(2023年2月翻墙避坑)](https://vpncn.github.io/)  看这一篇就够了。买两年版好像也有和SSR差不多价钱的

https://sites.google.com/view/honven all kinds of recommendations

- 【PAC模式】:也就是智能分流模式

https://puppylpg.github.io/2021/11/09/proxy/  自己搭+SS

experiences

- 22.6.24

  all sites (i.e. the airport, coursera, etc. Eng wiki is accessible today! so anycast is ok) are reachable on the mobile phone using both xjtulib wifi or mobile data. 

  the most relevant factor is the selection of your node, not the client program. maybe due to firewalls, ....

- 在开大会等特殊时间梯子会不好用。尝试下载YouTube视频，用非免费版的CRTubeGet就可以，免费的就不行

https://www.cyberghostvpn.com/zh/
一个邮箱，试用一天

## airport

https://sgi.anycast.gay/user 买流量的网站。支持ss, ssr, v2ray, clash等等。便宜，事实上不限流量。

https://renzhe.cloud a little more expensive?

the plugin Google-access-helper cannot do anything now

> laowang, can view youtube on the phone
>
> https://www.hayaissr.xyz/ 也是个买vpn的？

## electron-ssr

configuration: https://github.com/qingshuisiyuan/electron-ssr-backup/blob/master/Ubuntu.md

- old vpn for Linux: https://github.com/hannuo/ssr-linux-client-electron

- 22.2.9 update: [0.2.7](https://github.com/shadowsocksrr/electron-ssr/releases/tag/v0.2.7) and [0.2.6](https://github.com/qingshuisiyuan/electron-ssr-backup/releases/tag/v0.2.6)

- 22.7.20 update: after 0.2.7, https://github.com/shadowsocksrr/electron-ssr/releases

1. installation. dependencies (as said in Debian系列安装与配置[Ubuntu.md](https://github.com/qingshuisiyuan/electron-ssr-backup/blob/master/Ubuntu.md))

   ```shell
   sudo apt install libcanberra-gtk-module libcanberra-gtk3-module gconf2 gconf-service libappindicator1 libssl-dev libsodium-dev
   sudo apt install python3
   ```

   or just

   ```shell
   sudo dpkg -i electron-ssr-0.x.x.deb
   sudo apt install --fix-broken
   ```

2. depends on Python! It will look like

   ![electron-ssr-py](https://cdn.jsdelivr.net/gh/gxf1212/notes@master/techniques/images/electron-ssr-py.png)

   https://www.cnblogs.com/geekHao/p/12635970.html

   If connection fails，从源头更改python的链接文件，**推荐这种方法**

   1. 查看已安装的python版本和链接情况：

      ```shell
      ll /usr/bin/python*
      ```

   2. 删除原有的Python连接文件 (I don’t have one after reinstalling the system)

      ```shell
      sudo rm /usr/bin/python
      ```

   3. 建立指向Python3.X的连接

      ```shell
      sudo ln -s /usr/bin/python3 /usr/bin/python # or
      sudo ln -s ~/anaconda3/envs/electron-ssr/bin/python /usr/bin/python
      ```

      then it’s done

   But it seems that python2 matters. [how-to-install-python-2-7-on-ubuntu](https://www.how2shout.com/linux/how-to-install-python-2-7-on-ubuntu-20-04-lts/#:~:text=1%20Open%20a%20command%20terminal.%20Although%20everybody%20is,LTS.%20%204%20Uninstall%20%28optional%29.%20%20More%20)

3. use it (in cmd)

   - `electron-ssr`=`/usr/bin/electron-ssr`=`opt/electron-ssr/electron-ssr`
   - but be careful of python version!

   ```shell
   conda deactivate && /opt/electron-ssr/electron-ssr
   ```

   same as the system application, i.e. by clicking the icon

4. an usual bug

   similar situation https://github.com/qingshuisiyuan/electron-ssr-backup/issues/26

   ![electron-ssr-dep](https://cdn.jsdelivr.net/gh/gxf1212/notes@master/techniques/images/electron-ssr-dep.png)

   > libcrypto is along with `libssl-dev`. 这俩包不重要，主要是代理方式！
   >
   > ```shell
   > sudo apt install libssl-dev libsodium-dev
   > ```

5. setting the proxy

   - version 1

     just 'auto'...it's ok!

   - version 2 (try when connection fails)

     do as https://sobaigu.com/software-shadowsocksr-in-linux.html

     just set the **manual proxy**...port: 12333, the same as in electron-ssr

     > - but without electron-ssr, cannot see baidu.com?
     > - after rebooting, become "auto-proxy"?? not so ok...switch back to auto, still ok??

   - in terminal??

     ```shell
     export http_proxy="http://127.0.0.1:12333"
     export https_proxy="https://127.0.0.1:12333"
     ```

6. electron-ssr icon becomes grey: right click the icon and cllick 'Enable' (‘启用’)

7. gpu_data_manager_impl_private.cc(894)] The display compositor is frequently crashing. Goodbye.

   > for 0.3.0 and after. maybe due to newer version of electron? but may also occurs in other applications, in the newly installed system. so the problem of HDD?

   workaround: `--no-sandbox` 

   https://blog.csdn.net/xianfengdesign/article/details/124946689

   > using lightdm does not help

8. port 12333/1080 is taken: just reboot several times....or

   Identify the process using the port: open a terminal and type:

   ```shell
   sudo lsof -i :12333
   kill xxxx
   ```

9. [拒绝连接 can not initialize cipher context · Issue #126 · shadowsocksrr/electron-ssr · GitHub](https://github.com/shadowsocksrr/electron-ssr/issues/126)

> other
>
> 1. remove it all. not useful
>
>    ```shell
>    sudo apt purge electron-ssr && \
>    sudo mv ~/.config/electron-ssr ~/.local/share/Trash/files
>    ```
>
> 2. 

## v2ray

> https://rongsp.com/article/96.html

https://github.com/Qv2ray/Qv2ray/releases/tag/v2.7.0 with GUI

intro https://iyuantiao.com/fenxiangfuli/jiaocheng/v2ray.html

## clash

- https://github.com/Fndroid/clash_for_windows_pkg/releases
- video reference: https://www.youtube.com/watch?v=pTlso8m_iRk

2022: I won't use that since it breaks system configurations and caused problems (GreenVPN, conda proxy error) in both Windows and Linux

## qt-5

https://github.com/shadowsocks/shadowsocks-qt5/releases/tag/v3.0.1

```shell
chmod a+x Sha*
./Sha*
```

连接--添加--URI

## iOS翻墙

https://support.apple.com/zh-cn/HT201389

更改 Apple ID 国家或地区

https://www.bilibili.com/video/av545350018/

美区 PayPal 绑定美区 Apple ID 付款(2021)，AppStore 添加付款方式（换国家和地区）

买一个shadowrocket，3 dollars

步骤

- 买账号或代注册账号
- 买礼品卡充值
- 下载软件
- 导入订阅链接

https://blog.shuziyimin.org/171  国内办的信用卡也是用不了，没有全局代理、国内信用卡下注册的PayPal账户也被认为是国内的

# CUDA environment

dependence: install driver then cuda then cudnn. then configure conda environment

```mermaid
graph LR;
cudnn--> cuda -->driver
```

## Driver

### Official

Search for your system in [Official Drivers | NVIDIA](https://www.nvidia.com/Download/index.aspx?lang=en-us)

### GNOME

Go to Software & Updates...



### Install Nvidia in Fedora

```shell
sudo echo -e "blacklist nouveau" | tee -a /etc/modprobe.d/blacklist.conf
sudo mv /boot/initramfs-$(uname -r).img /boot/initramfs-$(uname -r).img.bak
sudo dracut -v /boot/initramfs-$(uname -r).img $(uname -r)
```

[Configuration - RPM Fusion](https://rpmfusion.org/Configuration)

[Howto/NVIDIA - RPM Fusion](https://rpmfusion.org/Howto/NVIDIA#CUDA)

```shell
# rpmfusion
sudo dnf install https://mirrors.rpmfusion.org/free/fedora/rpmfusion-free-release-$(rpm -E %fedora).noarch.rpm https://mirrors.rpmfusion.org/nonfree/fedora/rpmfusion-nonfree-release-$(rpm -E %fedora).noarch.rpm
# driver
sudo dnf update -y # and reboot if you are not on the latest kernel
# sudo dnf install akmod-nvidia # rhel/centos users can use kmod-nvidia instead
# we might not run this because it's installed in the next line as a dependency
sudo dnf install xorg-x11-drv-nvidia-cuda #optional for cuda/nvdec/nvenc support
```

install cuda as usual? no, from rpmfusion

Disable secure boot!

[如何在 Fedora Linux 中安装 Nvidia 驱动 | Linux 中国 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/147186283)

[How to Set Nvidia as Primary GPU on Optimus-based Laptops :: Fedora Docs (fedoraproject.org)](https://docs.fedoraproject.org/en-US/quick-docs/how-to-set-nvidia-as-primary-gpu-on-optimus-based-laptops/)

> [manjaro kde 21.2.5安装nvidia显卡驱动以解决笔记本电脑亮度调节问题](https://blog.csdn.net/a772304419/article/details/124141154)

Unfortunately, NVIDIA drivers are really unstable lately. 只有和Windows适配得比较好

### Debug

#### Failed to start nvidia powerd service after update

and even cannot boot

[Failed to start nvidia powerd service after update - Fedora Discussion](https://discussion.fedoraproject.org/t/failed-to-start-nvidia-powerd-service-after-update/77482)

"To me it looks like the xorg-x11-drv-nvidia-power package may not have gotten properly updated for the newer nvidia driver."

[Reddit - failure with nvidiapowerd](https://www.reddit.com/r/Fedora/comments/sobsgb/anyone_experiencing_failure_with_nvidiapowerd/?onetap_auto=true)

Nvidia-powerd is only for mobile Ampere gpus so it’s useless with your 2080. Please disable and mask the service.
https://forums.developer.nvidia.com/t/nvidia-powerd-fails-to-start/235498

```shell
systemctl disable nvidia-powerd
```

#### After trying the driver with cuda and failed and removed

[Solution: Modular Filtering Issue for NVIDIA Drivers/CUDA Sources Conflict - Fedora Discussion (fedoraproject.org)](https://discussion.fedoraproject.org/t/solution-modular-filtering-issue-for-nvidia-drivers-cuda-sources-conflict/78440)

[(1) This is not a problem, but it is a question. I would like to understand what the following means? : Fedora (reddit.com)](https://www.reddit.com/r/Fedora/comments/132i0d3/this_is_not_a_problem_but_it_is_a_question_i/)

> ```
> - package xorg-x11-drv-nvidia-3:530.41.03-1.fc37.x86_64 is filtered out by modular filtering
> ```

This is the key line. When a [dnf module](https://docs.pagure.org/modularity/) is enabled, packages in that module are preferred over non-modular packages.

Did you follow [the RPM Fusion CUDA guide](https://rpmfusion.org/Howto/CUDA) or otherwise enable the official NVIDIA repo? That repo uses modularity, and so the RPM Fusion guide has you disable the module to prevent breakage:

```shell
sudo dnf module disable nvidia-driver
```

---

[NVIDIA drivers not being detected in Fedora/KDE](https://forums.developer.nvidia.com/t/nvidia-drivers-not-being-detected-in-fedora-kde/75350)

If you installed the NVIDIA driver from `.run` files or bundled driver from CUDA Toolkit, **the driver may be lost when you upgrade your Linux kernel**.

这就是为什么别装cuda自带的驱动

## cuda

compatibility is in cuda-toolkit-release-notes page

### Installation

- `.deb` just follow official guide

  `.run` [新装操作系统Ubuntu18.04上安装NVIDIA驱动、CUDA、CUDNN](https://blog.csdn.net/weixin_38369492/article/details/107957296)  no need to install the driver again

  both: don't forget to blacklist nouveau

- To uninstall the CUDA Toolkit, run cuda-uninstaller in `/usr/local/cuda-1x.x/bin`

- to verify success: [link](https://blog.csdn.net/weixin_38208741/article/details/70848364)  [link](https://docs.nvidia.com/cuda/cuda-installation-guide-microsoft-windows/index.html#running-the-compiled-examples )

  ```shell
  cd /usr/local/cuda/samples/1_Utilities/deviceQuery #由自己电脑目录决定
  sudo make
  sudo ./deviceQuery
  ```

  ```shell
  /usr/local/cuda/samples/1_Utilities/deviceQuery/deviceQuery
  # deviceQuery, CUDA Driver = CUDART, CUDA Driver Version = 11.4, CUDA Runtime Version = 11.4, NumDevs = 1
  Result = PASS
  ```

  on Windows, similarly: `path\to\NVIDIA GPU Computing Toolkit\CUDA\vxx.x\extras\demo_suite\deviceQuery.exe`

  > https://blog.csdn.net/GreatcloudL/article/details/105209287

  or

  ```shell
  nvcc -V 
  ```

  after adding `/usr/local/cuda/bin` to `$PATH`

### other issues

- 为啥之前的驱动、cuda、cudnn系列能自动更新？可能是cuda的软件源是latest，自动更的，现在是固定了版本的

- if "Failed to initialize NVML: Driver/library version mismatch"

  https://comzyh.com/blog/archives/967/

  if it's due to software update, just reboot. driver and cuda toolkit is simultaneously updated...

- other ways to check gpu

  ```shell
  pip install gpustat
  gpustat
  ```

- [简记Ubuntu在安装NVIDIA驱动后黑屏无法启动进入图形桌面的一种可能原因](https://www.cnblogs.com/izwb003/p/ubuntu_nvidia_blackscreen_solution.html)

  以后再安装，这个就选No得了

  ```shell
  sudo mv /etc/X11/xorg.conf /etc/X11/xorg.conf.backup
  ```

- 

- multiple version of cuda: [多版本CUDA和TensorFlow共存 - Gai's Blog (bluesmilery.github.io)](https://bluesmilery.github.io/blogs/a687003b/)

  [Ubuntu多版本CUDA安装与切换 | Yuan (qiyuan-z.github.io)](https://qiyuan-z.github.io/2022/01/04/Ubuntu多版本cuda安装与切换/)

  [ubuntu 安装多个CUDA版本并可以随时切换_cuda9.0下载 多cuda-CSDN博客](https://blog.csdn.net/yinxingtianxia/article/details/80462892)

  可以使用stat命令查看当前cuda软链接指向的哪个cuda版本

- problems

  - I ran ...run.1 rather than .run ???
  - don't know if this matters: https://blog.davidou.org/archives/1361
  - 

final log

````
Driver:   Not Selected
Toolkit:  Installed in /usr/local/cuda-11.1/
Samples:  Installed in /home/kemove/, but missing recommended libraries

Please make sure that

- PATH includes /usr/local/cuda-11.1/bin
- LD_LIBRARY_PATH includes /usr/local/cuda-11.1/lib64, or, add /usr/local/cuda-11.1/lib64 to /etc/ld.so.conf and run ldconfig as root

```shell
export PATH=$PATH:/usr/local/cuda/bin
export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/usr/local/cuda/lib64
```

***WARNING: Incomplete installation! This installation did not install the CUDA Driver. A driver of version at least .00 is required for CUDA 11.1 functionality to work.
To install the driver using this installer, run the following command, replacing <CudaInstaller> with the name of this run file:

​    sudo <CudaInstaller>.run --silent --driver

Logfile is /var/log/cuda-installer.log
````



## cudnn

follow offical guide

https://docs.nvidia.com/deeplearning/cudnn/install-guide/index.html

### method 1

download [cuDNN Library for Linux (x86_64)](https://developer.nvidia.com/compute/machine-learning/cudnn/secure/8.2.4/11.4_20210831/cudnn-11.4-linux-x64-v8.2.4.15.tgz)

```shell
# 22 Jan. 1st time
sudo cp cudnn-*-archive/include/cudnn*.h /usr/local/cuda/include 
sudo cp -P cudnn-*-archive/lib/libcudnn* /usr/local/cuda/lib64 
sudo chmod a+r /usr/local/cuda/include/cudnn*.h /usr/local/cuda/lib64/libcudnn*
# 22 Feb. 2nd time
sudo cp cudnn/cuda/include/cudnn*.h /usr/local/cuda/include 
sudo cp -P cudnn/cuda/lib64/libcudnn* /usr/local/cuda/lib64 
sudo chmod a+r /usr/local/cuda/include/cudnn*.h /usr/local/cuda/lib64/libcudnn*
```

also need the code samples

### method 2??

download:

- [cuDNN Runtime Library for Ubuntu20.04 x86_64 (Deb)](https://developer.nvidia.cn/compute/machine-learning/cudnn/secure/8.2.1.32/11.3_06072021/Ubuntu20_04-x64/libcudnn8_8.2.1.32-1+cuda11.3_amd64.deb)
- [cuDNN Developer Library for Ubuntu20.04 x86_64 (Deb)](https://developer.nvidia.cn/compute/machine-learning/cudnn/secure/8.2.1.32/11.3_06072021/Ubuntu20_04-x64/libcudnn8-dev_8.2.1.32-1+cuda11.3_amd64.deb)
- [cuDNN Code Samples and User Guide for Ubuntu20.04 x86_64 (Deb)](https://developer.nvidia.cn/compute/machine-learning/cudnn/secure/8.2.1.32/11.3_06072021/Ubuntu20_04-x64/libcudnn8-samples_8.2.1.32-1+cuda11.3_amd64.deb)

```shell
sudo dpkg -i lib*
```

not sure how to do...

### other issues

1. to remove cudnn (method 1)

   ```shell
   sudo rm -rf /usr/local/cuda/include/cudnn*.h /usr/local/cuda/lib64/libcudnn*
   ```

2. test.c:1:10: fatal error: FreeImage.h: 没有那个文件或目录 https://blog.csdn.net/xhw205/article/details/116297555

   ```shell
   sudo apt-get install libfreeimage3 libfreeimage-dev
   ```

3. You may also need this

   ```shell
   sudo dpkg -i libcudnn*
   ```

   to check success. You'd better install in order! (libcudnn, dev, example)

4. check success (tar.gz)

   > [strange??? but a complete guide!!](https://blog.csdn.net/weixin_28691441/article/details/112144795) 
   >
   > ```shell
   > cat /usr/local/cuda/include/cudnn.h | grep CUDNN_MAJOR -A 2 
   > ```
   >
   > It's  old! let’s follow the official guide below

   ```shell
   # Copy the cuDNN samples to a writable path.
   HOME=./
   cp -r /usr/src/cudnn_samples_v8/ $HOME
   # Go to the writable path.
   cd $HOME/cudnn_samples_v8/mnistCUDNN
   # Compile the mnistCUDNN sample.
   make clean && make
   # Run the mnistCUDNN sample.
   ./mnistCUDNN
   ```

   If cuDNN is properly installed and running on your Linux system, you will see a message similar to the following:

    ```
   Test passed!
    ```

# Computational engine

Refer to https://github.com/skblnw/mkrun/tree/master/Installation

2023 for new system and 28: https://www.wolai.com/8Z6ZChWebaTEQfNg7BBjcn

## Auxillary tools

### gcc

[Ubuntu上安装gcc-10.2.0_gcc 10.2 ubuntu 14_Black_黑色的博客-CSDN博客](https://blog.csdn.net/zhaozhiyuan111/article/details/118566452)

Also refer to Kevin

- `-disable-multilib`： 不生成编译为其他平台 (e.g. 32bit) 可执行代码的交叉编译器。add this according to the error prompt
- `gcc-path/contrib/download_prerequisites`: if you don't have mpfr, etc.

An important note: add correct gcc version you used when compiling gmx/Amber when you run MD, otherwise the performance will be significantly hurt! (really?)

> [Build and Install GCC Suite from Scratch (github.com)](https://gist.github.com/jeetsukumaran/5224956)

#### Debug

- [fatal error: gnu/stubs-32.h: No such file or directory – 王明军的博客 (wordpress.com)](https://iwmj.wordpress.com/2018/04/11/fatal-error-gnu-stubs-32-h-no-such-file-or-directory/)

  ```shell
  yum install libstdc++-devel.i686
  ```

- 

> [!NOTE]
>
> `mpicxx` is within `openmpi` rather than `gcc`

### intel oneapi

[Download the Intel® HPC Toolkit](https://www.intel.com/content/www/us/en/developer/tools/oneapi/hpc-toolkit-download.html)

[Linux中ifort的安装教程及使用方法](https://www.bilibili.com/read/cv15164219)

[Install oneAPI for NVIDIA GPUs - Guides - oneAPI for NVIDIA® GPUs - Products - Codeplay Developer](https://developer.codeplay.com/products/oneapi/nvidia/2023.2.1/guides/get-started-guide-nvidia.html)

装好NVIDIA driver再装intel

### fftw

see in Gromacs section

### openmpi

 Open MPI: Open Source High Performance Computing https://www.open-mpi.org
 The Open MPI Project is an open source Message Passing Interface implementation...

 But it seems not to accelerate...

do a simple installation like this: [OpenMPI - Ubuntu安装与配置-CSDN博客](https://blog.csdn.net/zziahgf/article/details/72781799)

test: 

```shell
source ~/.bashrc
export PATH=$PATH:/usr/local/openmpi/bin  
export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/usr/local/openmpi/lib/

sudo ldconfig 
# test in the installing directory
cd examples
make
mpirun -np 8 hello_c
```

check openmpi info: `ompi_info | grep cuda`

> ```
> Running as root is *strongly* discouraged as any mistake (e.g., in
> defining TMPDIR) or bug can result in catastrophic damage to the OS
> file system, leaving your system in an unusable state.
> 
> We strongly suggest that you run mpirun as a non-root user.
> ```

### plumed

installation with conda is simpler but may not make use of the best efficiency?

[Plumed :: Anaconda.org](https://anaconda.org/conda-forge/plumed)

OK, just refer to Kevin's notes

```shell
./configure --prefix=/opt/plumed-2.9.0
make -j 16
sudo make install -j 16
```

debug:

```
configure: WARNING: **** PLUMED will NOT be compiled using MPI because MPI have not been found!
```

MPI solved by adding mpirun seen in PATH

final notes:

```
Install prefix : /home/gxf/plumed-2.9.0
Full name      : plumed

Setup your environment
- Ensure this is in your execution path         : /home/gxf/plumed-2.9.0/bin
- Ensure this is in your include path           : /home/gxf/plumed-2.9.0/include
- Ensure this is in your library path           : /home/gxf/plumed-2.9.0/lib
- Ensure this is in your PKG_CONFIG_PATH path   : /home/gxf/plumed-2.9.0/lib/pkgconfig
For runtime binding:
- Set this environment variable                 : PLUMED_KERNEL=/home/gxf/plumed-2.9.0/lib/libplumedKernel.so

To create a tcl module that sets all the variables above, use this one as a starting point:
/home/gxf/plumed-2.9.0/lib/plumed/modulefile

To uninstall, remove the following files and directories:
/home/gxf/plumed-2.9.0/lib/plumed
/home/gxf/plumed-2.9.0/share/doc/plumed
/home/gxf/plumed-2.9.0/include/plumed
/home/gxf/plumed-2.9.0/bin/plumed
/home/gxf/plumed-2.9.0/bin/plumed-patch
/home/gxf/plumed-2.9.0/bin/plumed-config
/home/gxf/plumed-2.9.0/lib/pkgconfig/plumed.pc
/home/gxf/plumed-2.9.0/lib/libplumed.so
/home/gxf/plumed-2.9.0/lib/libplumedKernel.so
A vim plugin can be found here: /home/gxf/plumed-2.9.0/lib/plumed/vim/
Copy it to /home/gxf/.vim/ directory
Alternatively:
- Set this environment variable         : PLUMED_VIMPATH=/home/gxf/plumed-2.9.0/lib/plumed/vim
- Add the command 'let &runtimepath.=','.$PLUMED_VIMPATH' to your .vimrc file
From vim, you can use :set syntax=plumed to enable it
```

other 

> [Install Gromacs-2016.3 and Plumed-2.3.3 | Life is Worth Living (birdlet.github.io)](https://birdlet.github.io/trash/plumed_gromacs_install.html)
>
> [PLUMED系列-安装教程 (kangsgo.cn)](https://kangsgo.cn/p/plumed系列-安装教程/)
>
> oh, external gsl and blas may not be necessary?
>
> - [GSL - GNU Scientific Library - GNU Project - Free Software Foundation](https://www.gnu.org/software/gsl/)
> - https://www.openblas.net/
> - [Release Official Release for LAPACK 3.11.0 · Reference-LAPACK/lapack (github.com)](https://github.com/Reference-LAPACK/lapack/releases/tag/v3.11.0)
>
> [gromacs编译安装教程 编译带plumed的版本 | 超算小站 (mrzhenggang.com)](https://nscc.mrzhenggang.com/gromacs/#编译带plumed的版本)
>
> [PLUMED安装+patch Lammps - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/104259987)
>
> [Plumed — WVU-RC documentation](https://docs.hpc.wvu.edu/text/608.ForceFields.html#plumed)

### Devtoolset

Devtoolset是一个用于在Red Hat Enterprise Linux (RHEL)和CentOS系统上安装和使用多个版本的编译器和开发工具的软件集合。它提供了更新的编译器版本，以便开发人员可以使用最新的功能和优化。

通过执行"scl enable devtoolset-7 bash"命令，可以在编译gmx时启用Devtoolset-7工具集。这将确保在编译过程中使用Devtoolset-7提供的编译器和工具，以获得更好的性能和功能支持。

具体来说，这条命令会创建一个新的bash环境，并在该环境中启用Devtoolset-7工具集。在这个新的bash环境中，编译过程将使用Devtoolset-7提供的编译器和工具，而不是系统默认的版本。这样可以确保编译过程中使用的工具是与Devtoolset-7兼容的，以获得更好的结果。

## Gromacs (dirty)

I will try cpu version and learn to setup... do not spend time on accelerating here...

```shell
yum install openssl-devel
# run in unzipped cmake folder
./configure
make # have to install the lower version?
make install # finish installing cmake from downloading package, all in /usr/local/share ?
yum remove cmake # lower version
# make uninstall # to uninstall

# run in unzipped fftw folder: the same
# maybe add a prefix

# run in unzipped gromacs folder
cmake .. -DGNX_BUILD_OWN_FFTW=ON -DGMX_FFT_LIBRARY=fftw3 -DGXN_MPI=ON # failed, use instead
cmake .. -DGNX_BUILD_OWN_FFTW=ON -DGMX_FFT_LIBRARY=fftpack -DGXN_MPI=ON # so not using the fftw I just installed...and succeeded 
```

how others config: https://www.gitmemory.com/issue/amd/amd-fftw/3/635188942

use cmake: https://blog.csdn.net/Calvin_zhou/article/details/103952153

is installed under root on lab mine

Executable:  /usr/local/gromacs/bin/gmx

also python: (not using)

```shell
conda install -c bioconda gromacs
```

## GROMACS installation on a workstation

2023.8 installation on the new Fedora system and 28: https://www.wolai.com/8Z6ZChWebaTEQfNg7BBjcn

### prepare

  Follow this order:

1. check your graphic card driver (and installation)

   https://blog.csdn.net/qq_43265072/article/details/107160297

2. check gcc version

   > gmx 2020.x: unsupported GNU version! gcc versions later than 12 are not supported! The nvcc flag '-allow-unsupported-compiler' can be used to override this version check" " however, using an unsupported host compiler may cause compilation failure or incorrect run time execution. Use at your own risk.

3. install cuda and cmake

   - cmake
     - install: https://jingyan.baidu.com/article/d621e8da56314d2865913f93.html
     - uninstall: `make uninstall` and `sudo rm -rf` files https://blog.csdn.net/xh_hit/article/details/79639930
     - I installed it on default path
   - cuda

4. use cmake to install gromacs

   - https://blog.csdn.net/SuiYueHuYiWan/article/details/110972083

   - install fftw3 by ourselves under root!
     
     or `sudo apt-get`
     
     - http://www.fftw.org/fftw2_doc/fftw_6.html

### Installation with GPU support

```shell
# fftw: http://www.fftw.org/download.html
./configure --prefix=~/fftw-3.3.10 --enable-float --enable-shared --enable-sse2 --enable-avx --enable-threads
make -j 6
make install
# REMEMBER TO ADD TO LD_LIBRARY_PATH!!!
# 2023 note: not necessary...

# mpicc, mpicxx
sudo apt install openmpi-bin

# cmake, usually no need to compile
sudo apt install cmake

# gmx
cmake .. -DCMAKE_INSTALL_PREFIX=/home/gxf/gromacs-2021.5-gpu \
-DGMX_FFT_LIBRARY=fftw3 -DCMAKE_PREFIX_PATH=/home/gxf/fftw-3.3.10 \
-DGMX_MPI=OFF -DREGRESSIONTEST_DOWNLOAD=ON \
-DGMX_GPU=CUDA
make -j 6
make check
make install -j32
# make check and -DREGRESSIONTEST_DOWNLOAD=ON is optional

# specifying gcc version
cmake .. -DCMAKE_INSTALL_PREFIX=/home/gxf1212/data/local-programs/gromacs-2023 \
-DGMX_FFT_LIBRARY=fftw3 -DCMAKE_PREFIX_PATH=/opt/fftw3/3.3.9 \
-DCMAKE_C_COMPILER=/data/gxf1212/local-programs/gcc-10.2.0/bin/gcc \
-DCMAKE_CXX_COMPILER=/data/gxf1212/local-programs/gcc-10.2.0/bin/g++ \
-DGMX_MPI=OFF -DGMX_GPU=CUDA
make -j 32
make install -j32

# gmx, mpi
cmake .. -DCMAKE_INSTALL_PREFIX=/home/gxf/gromacs-2021.5-gpu-mpi \
-DGMX_MPI=ON -DCMAKE_C_COMPILER=/usr/bin/mpicc -DCMAKE_CXX_COMPILER=/usr/bin/mpiccxx \
-DGMX_FFT_LIBRARY=fftw3 -DCMAKE_PREFIX_PATH=/home/gxf/fftw-3.3.10 \
-DREGRESSIONTEST_DOWNLOAD=ON \
-DGMX_GPU=CUDA
make -j 6
make check
make install
```

other issues

- [Gromacs-2021.1 Installation Error with Cuda11.3 (#4037) · Issues · GROMACS / GROMACS · GitLab](https://gitlab.com/gromacs/gromacs/-/issues/4037)   already fixed...

- gmx 2023

  ```
  #error -- unsupported GNU version! gcc versions later than 10 are not supported! The nvcc flag '-allow-unsupported-compiler' can be used to override this version check; however, using an unsupported host compiler may cause compilation failure or incorrect run time execution. Use at your own risk.
  ```

- plumed

  ```
  plumed patch -p
  ```

  Patching must be done in the gromacs root directory before the cmake command is invoked.

- 

on my previous workstation

```shell
# gcc environment
../configure --enable-language=c,c++ --disable-multilib --prefix=/opt/gcc/11.1.0
make -j32
make install
# then give gcc path
cmake .. -DCMAKE_INSTALL_PREFIX=/home/gxf1212/gromacs-2021.5-gpu -DGMX_FFT_LIBRARY=fftw3 -DCMAKE_PREFIX_PATH=/home/gxf1212/program \# -DFFTWF_LIBRARY=/home/gxf1212/program/lib/libfftw3f.so -DFFTWF_INCLUDE_DIR=/home/gxf1212/program/include  
-DCMAKE_C_COMPILER=/home/gxf1212/program/bin/gcc -DCMAKE_CXX_COMPILER=/home/gxf1212/program/bin/g++ -DGMX_CUDA_TARGET_SM=80 -DGMX_MPI=OFF -DREGRESSIONTEST_DOWNLOAD=ON -DGMX_GPU=CUDA # 80: just a workaround
```

Finally source this to activate

```shell
source /path/to/gmx/GMXRC.bash
```

To verify that everything proceeded according to our plans you can type the following command:

```shell
gmx --version
```

this also shows the compilation environment, like which gcc was used

### Other

[Gromacs :: Anaconda.org](https://anaconda.org/conda-forge/gromacs)

[Distributing Hardware-optimized Simulation Software with Conda (manchester.ac.uk)](https://research-it.manchester.ac.uk/news/2021/05/25/distributing-hardware-optimized-simulation-software-conda/)

however the packages we have released are hosted on the biology specific channel `bioconda` configuring for the lowest common denominator would mean a loss of performance on newer compute nodes.

## Amber22

see [Amber22安（cai）装（keng）过程分享 - 哔哩哔哩 (bilibili.com)](https://www.bilibili.com/read/cv23212288)

> - [AMBER Installation Mehdi Irani](https://prof.uok.ac.ir/m.irani/index_files/Page312.htm)
> - [AmberTools22+Amber22 的安装过程 - 知乎](https://zhuanlan.zhihu.com/p/479919955)
> - [介绍-Amber 20 移植指南（CentOS 8.2）-教育科研-...-文档首页-鲲鹏社区 (hikunpeng.com)](https://www.hikunpeng.com/document/detail/zh/kunpenghpcs/prtg-osc/centos_kunpeng_amber_20_02_0001.html)
> - [Amber_22_and_Tools_22_install_Ubuntu_22.pdf](http://archive.ambermd.org/202302/att-0090/Amber_22_and_Tools_22_install_Ubuntu_22.pdf)

### from the manual

- If you have an existing miniconda distribution, please remove it from your `PATH` while building Amber.
- To use Anaconda as a python interpreter only, all that is needed is to disable Miniconda (`-DDOWNLOAD_MINICONDA=FALSE`) and activate your conda env before you build Amber. Just make sure to keep the conda env active whenever you use Amber, and everything should work fine. To also link libraries from Anaconda by default, use `-DUSE_CONDA_LIBS=TRUE` (this must be passed the first time you run CMake). The build system will search for the conda executable in your `PATH`, find your Anaconda installation, and add it to the front of the library search path.
- Our final option is to just use your existing system Python interpreter. Set `DOWNLOAD_MINICONDA` to `FALSE`, and let CMake find your Python interpreter on the PATH. By default, it will prefer the latest versioned python available, so `python3.6` would be found before `python2.7`. To select a different interpreter, set the `PYTHON_EXECUTABLE` variable to point to it. Amber requires certain Python packages to be installed: currently numpy, scipy, matplotlib, cython, setuptools, and tkinter.

A full list of the options, with descriptions of what each one does, is available by using the ccmake or cmake-gui tools to configure the project interactively. 

### Dependencies

> 2023.7

[CUDA GNU compatibility](https://gist.github.com/ax3l/9489132)

[Installation Guide Linux :: CUDA Toolkit Documentation](https://docs.nvidia.com/cuda/archive/11.7.1/cuda-installation-guide-linux/index.html)   

**Table 1. Native Linux Distribution Support in CUDA.** check the version you care

```
9.2 GCC < 8
10.1 - 10.2 GCC < 9
11.0 GCC < 10
11.1 - 11.3 GCC < 11
11.4 - 11.7 GCC < 12
```

Amber also tells you

```
-- CUDA version 12.2 detected
CMake Error at cmake/CudaConfig.cmake:84 (message):
  Error: Untested CUDA version.  AMBER currently requires CUDA version >= 7.5
  and <= 12.1.
```

change cmake/CudaConfig.cmake ...

notes:

- [Amber-Wiki - C Make-Common-Options](http://ambermd.org/pmwiki/pmwiki.php/Main/CMake-Common-Options)
- 

other possible notes:

- [Re: [AMBER\] Unsupported Cuda Version on Amber 20 Installation from David A Case on 2020-11-18 (Amber Archive Nov 2020)](http://archive.ambermd.org/202011/0157.html)   yes we can edit version check...

- [cmake - What does "Performing Test CMAKE_HAVE_LIBC_PTHREAD" failed actually mean? - Stack Overflow](https://stackoverflow.com/questions/64514666/what-does-performing-test-cmake-have-libc-pthread-failed-actually-mean)

  This output is common for Unix-like systems. Despite "Failed" and "not found" words, this is perfectly good output.

- 

其实主要是做好依赖，安装起来就像大多数没用的博文一样，简单的几步就搞定了

#### debug

> 重新做了一遍Python环境还是没好，装了一下boost又卸掉了以后又好了
>
> http://archive.ambermd.org/202204/0094.html

[linux安装doxygen: Could NOT find FLEX_could not find flex (missing: flex_executable)-CSDN博客](https://blog.csdn.net/pas_zoujp/article/details/117351781)

I just hit a build failure with CMAKE using 'make -j4' that was resolved with using plain 'make'

[Re: [AMBER-Developers\] CMake vs configure2 in Amber from Scott Le Grand on 2021-04-05 (Amber Developers Archive Apr 2021)](http://dev-archive.ambermd.org/202104/0035.html)

### Other

```
./update_amber --update
Preparing to apply updates... please wait.
NoInternetAccess: Cannot connect to https://ambermd.org
```



[Amber Bug Fixes and Updates](https://ambermd.org/BugFixes.php)

The best way to apply patches is permit the updater to run automatically when running configure, the first step of the installation process.





## NAMD

### Normal

If your workstation has a CUDA-capable GPU, you should try downloading Linux-x86_64-multicore-CUDA. If you wish to run multi-copy algorithms, such as replica-exchange MD, you should try the "netlrts" builds, such as Linux-x86_64-netlrts-smp or Linux-x86_64-netlrts-smp-CUDA. Windows users are encouraged to install WSL ([Windows for Linux Subsystem](https://learn.microsoft.com/en-us/windows/wsl/install)) in order to run our most recent Linux builds.

just unzip...

https://www.ks.uiuc.edu/Development/Download/download.cgi?PackageName=NAMD

3.0beta version is available!

[NAMD3alpha](https://www.ks.uiuc.edu/Research/namd/alpha/3.0alpha/)

http://bbs.keinsci.com/thread-22004-1-1.html

### Install NAMD on an old system

#### GLIBC installation

https://stackoverflow.com/questions/72513993/how-to-install-glibc-2-29-or-higher-in-ubuntu-18-04

```Shell
wget -c https://ftp.gnu.org/gnu/glibc/glibc-2.29.tar.gz
tar -zxvf glibc-2.29.tar.gz
mkdir glibc-2.29/build
cd glibc-2.29/build
../configure --prefix=/your/path/glibc
make
make install
```

Do not run `./configure` in the same folder with sources.

笑死了。需要以下才能装：

```shell
ln -s /path/to/make /path/to/gmake
export LD_LIBRARY_PATH=   # empty
```

another problem

```Shell
make[2]: *** Cannot open jobserver /tmp/GMfifo28229r: No such file or directory.  Stop.
make[2]: Leaving directory '/public/home/gxf1212/data/glibc-2.29/csu'
make[1]: *** [Makefile:258: csu/subdir_lib] Error 2
make[1]: Leaving directory '/public/home/gxf1212/data/glibc-2.29'
make: *** [Makefile:9: all] Error 2
```

> The error you're encountering, "Cannot open jobserver: No such file or directory," typically occurs due to issues with make's job server mode, which is used for controlling parallelism. This can happen if make is invoked in a way that it expects to use a job server (typically through recursive make calls with the -j flag) but cannot find or access the job server's file descriptor.

> After you've successfully built and installed the new GLIBC into `/opt/glibc`, you will probably try to use it by setting `LD_LIBRARY_PATH=/opt/glibc/lib` or similar … which would not work. Under no circumstances try to copy libraries from `/opt/glibc` into your system library directory, create equivalent symlinks, or add the `LD_LIBRARY_PATH` above systemwide -- that will render your system un-bootable!

https://stackoverflow.com/questions/68828494/building-glibc-from-source-causes-an-error

https://blog.csdn.net/qq_24755999/article/details/78722788

glibc是系统底层库，不能单独升，直接替换的话，系统就崩了，或至少命令行打不开了

#### Use NAMD

其实就是同时用系统的库和新glibc的库

- libmvec in new `glibc/lib` (by default, for new glibc `ld-linux-x86-64.so.2`)
- libz.so.1 etc., libcuda* in `/usr/lib64`, link to `glibc/lib`
- GLIBCXX_3.4.20 in `gcc-x.x.x/lib`

```Shell
source_dir="/usr/lib64"
target_dir="/public/home/gxf1212/programs/glibc-2.29/lib"
# Define the list of files and additional symbolic links. 
# everything starting with libcuda, and those missings libs
files=(
    "libcudadebugger.so.1"
    "libcudadebugger.so.535.146.02"
    "libcuda.so"
    "libcuda.so.1"
    "libcuda.so.535.146.02"
    "libicudata.so"
    "libicudata.so.50"
    "libicudata.so.50.1.2"
    "libstdc++.so.6"
    "libgcc_s.so.1"
    "libz.so.1"
)

# Loop over the files
for file in "${files[@]}"; do
    # Create the symbolic link
    ln -s "${source_dir}/${file}" "${target_dir}/${file}"
done

# usage
source /public/software/profile.d/compiler_gcc-9.5.0.sh
source /public/software/compiler/intel/intel-compiler-2017.5.239/bin/compilervars.sh intel64
source /public/software/profile.d/mpi_openmpi-intel-2.1.2.sh

/public/home/gxf1212/programs/glibc-2.29/lib/ld-linux-x86-64.so.2 --library-path /public/software/compiler/gcc/9.5.0/lib64/ /public/software/apps/namd/3.0b5/namd3
```

## VEGA_ZZ

https://www.ddl.unimi.it/cms/index.php?Software_projects:VEGA_ZZ:Main_features

one year trial...

## Gaussian16 and view

```shell
tar -xjvf G16-A03-AVX2.tbz
mkdir g16/scratch
```

after extraction, add these to `~/.bashrc` ([Gaussian的安装方法及运行时的相关问题](http://sobereva.com/439))

```shell
export g16root=$HOME
export GAUSS_SCRDIR=$g16root/g16/scratch
export GAUSS_EXEDIR=$g16root/g16
source $g16root/g16/bsd/g16.profile
export PATH=$PATH:$g16root/g16
```

[g16 view csdn](https://download.csdn.net/download/lk2069/10777135), buy at 1 yuan [here](https://www.kerwin.cn/dl/detail/lk2069/275737); [win?](https://getintopc.com/softwares/design/gaussview-6-0-16-free-download/); [Linux g16 share](https://zjueducn-my.sharepoint.com/:u:/g/personal/gxf1212_zju_edu_cn/ESd17fbcNXtNlm9AR5Xs_CQBywj7CC4mmEn2M_wiYZT-IQ?e=H10csy)

[another installation guide](http://www.molcalx.com.cn/gaussian-16-installation/)

put the folder `gv` under your g16 folder!! 

You can type `gv` in the terminal to start GView and link to Gaussian as we did in Windows, only if it can be found by g16 path settings!

> icon: downloaded from web

> debugging experience 2022.2.10
>
> 1. below
>
>    ```
>    PGFIO/stdio: No such file or directory
>    PGFIO-F-/OPEN/unit=11/error code returned by host stdio - 2.
>     File name = /home/gxf/g16/scratch/Gau-8001.inp
>     In source file ml0.f, at line number 197
>    ```
>
>    means you need to `mkdir scratch`
>
> 2. below
>
>    ```shell
>    ntrex1: Bad file descriptor
>    Segmentation fault (core dumped)
>    ```
>
>    means you assigned an improper chk file in your .gjf file like 
>
>    `%chk=D:\Doctor\my work\undergraduate\TA\2019\0912\ethylene.chk`



# Analysis/Modelling tools 

Python/cmd

## conda

傻瓜式就行。。

conda在Linux上是可迁移的吧，至少是系统、路径完全一样的情况下。重装系统直接挂载硬盘，用户名不变的话，重新`conda init`就行

### conda packages

[MDAnalysis · MDAnalysis](https://www.mdanalysis.org/)

[Openbabel :: Anaconda.org](https://anaconda.org/conda-forge/openbabel) (see above)

```shell
conda config --add channels conda-forge
conda install mdanalysis -y
conda install -c openbabel openbabel -y
# conda install -c bioconda pybel # not this
conda install -c rdkit rdkit -y

conda install -c anaconda scikit-learn -y
conda install -c conda-forge opencv -y
```

## OpenBabel

may also

```shell
dnf install openbabel-gui # do not support converting to pdb???
dnf install openbabel # without gui
sudo apt-get install openbabel # debian
```

## xmgrace

https://plasma-gate.weizmann.ac.il/Grace/

compile from source: `configure: error: M*tif has not been found`

not solve by `conda install openmotif`. compiling: need `sudo`

`conda install xmgrace`: no documentation, no cmd command, python2.7, didn't work 

<img src="https://cdn.jsdelivr.net/gh/gxf1212/notes@master/techniques/images/xmgrace.png" style="zoom:60%;" />![image-20221016211759336](https://cdn.jsdelivr.net/gh/gxf1212/notes@master/techniques/images/xmgrace-gmx.png)

## dssp

https://www.biostars.org/p/348161/

```shell
conda install -c salilab dssp
export PATH=$PATH:~/miniconda3/envs/work/bin
conda install biopython
# conda install matplotlib seaborn
```

https://biopython.org/docs/1.75/api/Bio.PDB.DSSP.html

not successful for command line gromacs

https://ssbio.readthedocs.io/en/latest/instructions/dssp.html might be an alternative

report error? https://www.biostars.org/p/19479/

delete /usr/local/bin/dssp....

> failed.
> 
> install boost from tar.gz, then dssp
> 
> https://www.linuxidc.com/Linux/2019-03/157605.htm
> 
> ```shell
> ./bootstrap.sh --with-libraries=all --with-toolset=gcc
> ./b2 toolset=gcc
> ./b2 install --prefix=/usr/local/boost_1_75_0
> 
> nano ~/.bashrc
> export PATH=$PATH:/usr/local/boost_1_75_0
> ```
> 
> https://github.com/PDB-REDO/libcifpp
> 
> ```shell
> yum install git
> ./configure --prefix=/usr/local/gromacs/dssp/libcifpp --with-boost=/usr/local/boost_1_75_0
> make -j 4 # may execute this again to ignore the error
> make install
> export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/usr/local/gromacs/dssp/libcifpp/lib
> ```
> 
> https://github.com/PDB-REDO/dssp
> 
> ```shell
> cd dssp-trunk
> ./configure --prefix=/usr/local/gromacs/dssp --with-cif++=/usr/local/gromacs/dssp/libcifpp --with-boost=/usr/local/boost_1_75_0
> make -j 4
> make install
> ```
> 
> (do not create build...)
> 
> failed2
> 
> ```shell
> dnf install dssp
> sudo ln -s /usr/bin/mkdssp /usr/local/bin/dssp # for gromacs to use
> # this only calculates a single pdb
> ```
> 
> https://ssbio.readthedocs.io/en/latest/instructions/dssp.html

## gmx_MMPBSA

https://valdes-tresanco-ms.github.io/gmx_MMPBSA/installation/

```shell
pip install gmx_MMPBSA # should be together with ambertools
pip install PyQt5
```

if in conda, no need to add `amber.pythons`

> ## g_mmpbsa
> 
> failed for version reasons
> 
> http://rashmikumari.github.io/g_mmpbsa/Download-and-Installation.html
> 
> ```shell
> export PATH=$PATH:~/g_mmpbsa/bin
> ```
> 
> guide: https://github.com/RashmiKumari/g_mmpbsa
> 
> http://kangsgo.com/18.html
> 
> > intro: https://chufang.cf/2019/07/16/gmx_pbsa/
> > 
> > other: https://jerkwin.github.io/2019/07/31/gmx_mmpbsa%E4%BD%BF%E7%94%A8%E8%AF%B4%E6%98%8E/
> 
> ## GMXPBSA
> 
> https://github.com/aspitaleri/gmxpbsa
> 
> ```
> yum install apbs
> export GMXPBSAHOME=/home/gxf/GMXPBSAtool
> ```

## GromacsWrapper

https://gromacswrapper.readthedocs.io/en/latest/index.html

```shell
pip install GromacsWrapper  # use ↓
conda install -c conda-forge -c bioconda gromacswrapper
from gromacs.fileformats.xvg import XVG # read .xvg files
```

## alchemlyb

alchemical-analysis

We are in the process of migrating all functionality from here to instead use [`alchemlyb`](https://github.com/alchemistry/alchemlyb)

doc: https://alchemlyb.readthedocs.io/en/latest/index.html

pdf: https://alchemlyb.readthedocs.io/en/latest/index.html

datasets for testing: https://alchemtest.readthedocs.io/en/latest/index.html

```shell
conda activate AmberTools21
pip install --user alchemlyb
# or 
conda install -c conda-forge alchemlyb
pip install --user alchemtest
```

https://anaconda.org/conda-forge/pymbar git address and doc


> https://anaconda.org/conda-forge/alchemical-analysis or https://github.com/MobleyLab/alchemical-analysis
>
> but not using
>
> ```shell
> conda activate AmberTools21 # no! choose python version?
> conda install -c conda-forge alchemical-analysis
> ```


## mdtraj

convert trajectories

```shell
conda install -c conda-forge mdtraj
conda uninstall mdtraj
```

https://mdtraj.org/1.9.4/mdconvert.html

## msmbuilder

http://msmbuilder.org/3.8.0/

```shell
conda create env -n xxx python==3.6 # 22.3.5
conda activate
conda install -c omnia msmbuilder
```

## Align ligands

1. LigAlign: a pymol tool
   
   http://compbio.cs.toronto.edu/ligalign/index.html
   
   ```shell
   # upon launching pymol
   run ~/pymol/ligalign/ligand_alignment.py
   ```
   
   but too old!

2. Mcsalign https://pymolwiki.org/index.php/Mcsalign
   
   ```shell
   conda install -c schrodinger -y pymol pymol-psico
   conda install -c rdkit rdkit -y
   conda install -c speleo3 csb -y
   ```
   
   run
   
   ```shell
   conda activate pymol
   pymol
   import psico.mcsalign
   mcsalign mobile, target
   ```

## Spyder

spyder conda interpreter：光设置没用，直接打开conda里每个对应环境的Spyder

要是只有miniconda，对不起。按照提示（此为Fedora38 Scientific上的）：

<img src="https://cdn.jsdelivr.net/gh/gxf1212/notes@master/techniques/images/spyder-error.jpg" style="zoom:50%;" />

安装时总是报conda底层的错（要report），版本不对还不行

[Using Conda Python Environments with Spyder IDE and Jupyter Notebooks in Windows | by Prem George | Medium](https://medium.com/@apremgeorge/using-conda-python-environments-with-spyder-ide-and-jupyter-notebooks-in-windows-4e0a905aaac5)

## AMBER (old)

Amber软件包主要包括2个部分：Amber Tools和Amber，其中Amber Tools可以免费在[Amber官网](http://ambermd.org/AmberTools17-get.html)下载，Tools中包含了Amber几乎所有的模块，Sander、tleap、MMPBSA等最核心的内容都可以免费使用。而另外的Amber则是唯一收费的部分，该部分主要包括了PMEMD以及GPU加速 的功能

installation: https://ambermd.org/InstFedora.php under user

> error:
> 
> **/home/gxf/amber20_src/AmberTools/src/arpack/dnaitr.f:658:35:**.......fortran error. needs to downgrade gcc
> 
> install from https://gcc.gnu.org/mirrors.html
> 
> > configure:5776: error: Building GCC requires GMP 4.2+, MPFR 2.4.0+ and MPC 0.8.0+.
> > Try the --with-gmp, --with-mpfr and/or --with-mpc options to specify their locations.  Source code for these libraries can be found at their respective hoslaterting sites as well as at ftp://gcc.gnu.org/pub/gcc/infrastructure/.  See also http://gcc.gnu.org/install/prerequisites.html for additional info.
> 
> try running `./contrib/download_prerequisites.sh` from the gcc source dir. 
> 
> remember this is always the way to install a different version of gcc, which seems to overwrite the configuration in /usr/bin....
> 
> failed here: [link](https://stackoom.com/question/3nN9A/%E5%A6%82%E4%BD%95%E8%A7%A3%E5%86%B3-archlinux%E4%B8%AD%E7%9A%84gcc%E7%BC%96%E8%AF%91%E9%94%99%E8%AF%AF-sys-ustat-h-%E6%B2%A1%E6%9C%89%E8%BF%99%E6%A0%B7%E7%9A%84%E6%96%87%E4%BB%B6%E6%88%96%E7%9B%AE%E5%BD%95)

from miniconda (which only includes python in conda)

https://docs.conda.io/en/latest/miniconda.html

> I'm not using neither openmpi cuda here. maybe refer to [this](https://jerkwin.github.io/2017/12/26/Amber_2017_%E5%8F%82%E8%80%83%E6%89%8B%E5%86%8C_%E7%AC%AC%E4%B8%80%E9%83%A8%E5%88%86_%E4%BB%8B%E7%BB%8D%E5%92%8C%E5%AE%89%E8%A3%85/) a intro to Amber program
> 
> CentOS: https://www.cnblogs.com/wq242424/p/8857296.html
> 
> Ubuntu: https://blog.csdn.net/qq_33953882/article/details/113995531

a readme: https://amber-md.github.io/cpptraj/CPPTRAJ.xhtml

## AmberTools

http://ambermd.org/GetAmber.php#ambertools

from conda

```shell
# AmberTools. for gmx_MMPBSA, not so high python version
conda create -n AmberTools21 -y
# conda remove --name AmberTools20 --all 
conda activate AmberTools21
# conda install -c conda-forge ambertools=20 -y # old
conda install -c conda-forge ambertools=21 compilers -y 
# update
conda update -c conda-forge ambertools
```

can also directly get the package

or

https://anaconda.org/conda-forge/ambertools

parmed is along with ambertools. won't need to install alone

## acpype

> AnteChamber PYthon Parser interfacE

this tool should be separate from ambertools...

https://github.com/alanwilter/acpype#how-to-use-acpype

```shell
# acpype
conda create -n Acpype python=3.6  # now 3.7. install appropriate version at step 3
conda activate Acpype
conda install -c acpype acpype -y # this contains ambertools-17
```

2022.2.11 update

```shell
conda create -n Acpype 
conda install -c conda-forge acpype
```

acpype is dependent on AmberTools but Amber does not include acpype...installation via conda  retrieves another ambertools...so pip install acpype in another environment

## Propka

https://propka.readthedocs.io/en/latest/quickstart.html

https://wiki.pymol.org/index.php/Propka

### run

```shell
propka3 merged.pdb -o 7.4 > merged.log
# see merged.pka
```

It can process multiple chIt's strange that when the system contains sth other than protein, HIS is not present (only combine protein chains...)

## PMX

https://github.com/deGrootLab/pmx/tree/develop

develop! default pmx may need python2; conda install not ok

remember to set GMXLIB: https://degrootlab.github.io/pmx/installation.html#gmxlib

```shell
git clone https://github.com/deGrootLab/pmx.git
cd pmx
# to switch to 'develop' branch type:
git checkout develop

conda activate something # whatever
# conda install pip
conda install -c conda-forge rdkit -y
python -m pip install .
# add to .bashrc
export GMXLIB=/path/to/conda3/envs/env-name/lib/python3.10/site-packages/pmx/data/mutff
```

## FFparam

http://ffparam.umaryland.edu/

need http://kenno.org/pro/lsfitpar/ and cgenff program, utilizes Gaussian

manual: http://ffparam.umaryland.edu/manual/index.html, install as it says

## Multiwfn

http://sobereva.com/multiwfn/

download package and manual

remember to modify `gaupath=` etc. in `settings.ini`. formchk etc: inside g16

## FESetup

https://www.ccpbiosim.ac.uk/software

https://fesetup.readthedocs.io

```shell
cd /where/I/want/it # replace the path to whatever you like
./FESetupN_Linux.sh # extract all files into FESetupN/
```

Amber/Obabel: use default

python: `python_exe=/usr/bin/python2.7`

> ImportError: libpython2.7.so.1.0: cannot open shared object file: No such file or directory
> 
> ```shell
> sudo apt-get install libpython2.7
> ```

## rosetta

https://www.rosettacommons.org/downloads/academic/3.13/

```shell
gzip -d rosetta_bin_linux_3.12_bundle.tgz -c ../programfiles
# rosetta
export ROSETTA=/media/kemove/fca58054-9480-4790-a8ab-bc37f33823a4/programfiles/rosetta_bin_linux_2020.08.61146_bundle/
export ROSETTA3_DB=$ROSETTA/main/database
export ROSETTA_BIN=$ROSETTA/main/source/bin
export PATH=$PATH:$ROSETTA_BIN
```

## PyAutoFEP

https://github.com/luancarvalhomartins/PyAutoFEP

## SilcsBio (not free)

https://docs.silcsbio.com/2020.1/install.html

## LigParGen

[How to Install LigParGen Server Locally ?](https://quantumchemistryniser.wordpress.com/2017/11/12/how-to-install-ligpargen-server-locally/)

Please request BOSS executable from Prof. William L. Jorgensen (It is free for academic users). Once you have BOSS, set `$BOSSdir`; type `conda install -c mc-robinson ligpargen openbabel ` to install the package
Download the files from here and copy them to `BOSSdir/scripts` folder

## EPI suite

[How to Use US EPA EPI Suite to Predict Chemical Substance Properties](https://www.chemsafetypro.com/Topics/CRA/How_to_Use_US_EPA_EPI_Suite_to_Predict_Chemical_Substance_Properties.html)

[Download EPI Suite™ - Estimation Program Interface v4.11 | US EPA](https://www.epa.gov/tsca-screening-tools/download-epi-suitetm-estimation-program-interface-v411): predict properties of small molecules

## packmol

[m3g/packmol: Packmol - Initial configurations for molecular dynamics simulations (github.com)](https://github.com/m3g/packmol)

## MATCH

https://brooks.chem.lsa.umich.edu/index.php?page=match&subdir=articles/resources/software

server: https://brooks.chem.lsa.umich.edu/index.php?matchserver=submit

https://brooks.chem.lsa.umich.edu/download/software/match/MATCH_RELEASE.tar.gz

## Other

### PyInstaller

[PyInstaller Manual — PyInstaller 6.0.0 documentation](https://pyinstaller.org/en/stable/)





# Docking

## Autodock

### vina

https://ccsb.scripps.edu/projects/docking/

Installing

    tar xzvf autodock_vina_1_1_2_linux_x86.tgz

Optionally, you can copy the binary files where you want.
Running

    ./autodock_vina_1_1_2_linux_x86/bin/vina --help

This file is copied into /home/Desktop/work/xufan and /usr/local

http://vina.scripps.edu/manual.html#usage for running docking.

**安装目录和打开的文件不要包含任何中文！！！！！**

### smina

https://anaconda.org/conda-forge/smina

## mgl

Still need to install MGL-tools (autodock tools). Just  help with visualization.

Install according to official manual. Remember to configure environmental path.

It also include PMV...see https://ccsb.scripps.edu/mgltools/ for all.

note: for .tar.gz, you should **put the folder right under the directory you want to install**

```shell
export PATH=$PATH:~/MGLTools-1.5.7/bin
```

icon path: just search `adt` or `icon`

> adt: $HOME/mgltools_x86_64Linux2_1.5.7/MGLToolsPckgs/Pmv/Icons/128x128/adt.png

> ```shell
>export PATH=$PATH:/home/user/MGLTools-1.5.7/bin # mgltools
> # now we can it run under root
> ```
> 

## zdock

https://zdock.umassmed.edu/ with server

> **ZDOCK 2.3.3 and ZDOCK 3.0.2**: These versions utilize the Conv3D library and other optimizations to improve speed and memory usage. ZDOCK 2.3.2 is based on the scoring function of ZDOCK 2.3, and ZDOCK 3.0.2 is based on the scoring function of ZDOCK 3.0. Please reference: Pierce BG, Hourai Y, Weng Z (2011). Accelerating Protein Docking in ZDOCK Using an Advanced 3D Convolution Library. PLoS One 6(9): e24657.

seems not this...uninstall it...

snugdock is an Ab docking tool





# Visualization

## VMD

https://www.ks.uiuc.edu/Research/vmd/current/docs.html   VMD doc with installation guide

### pre-compiled version

https://blog.csdn.net/qyb19970829/article/details/106947424

> 2022.2.11, `vmd-1.9.4a55.bin.LINUXAMD64-CUDA102-OptiX650-OSPRay185-RTXRTRT.opengl.tar.gz`

**READ THE README FILE FOR INSTALLATION!**

`$install_bin_dir`: `/usr/local/bin` This is the location of the startup script ’vmd’.

`$install_library_dir`: `/usr/local/lib/$install_name` This is the location of all other VMD files.

All files are here.

> customize: `$Home/$install_name/bin`       `$Home/$install_name/lib`

```shell
sudo  ./configure LINUXAMD64  # update: this is nolonger needed. 
sudo  ./configure
cd src
sudo make install
```

if you don't want to customize, keep the installation folder to run the following when you want to remove vmd (I'm just using the default installation, so I deleted it.)

```shell
sudo make uninstall
```

or delete the files  https://www.ks.uiuc.edu/Research/vmd/mailing_list/vmd-l/25245.html

You may refer to the pdf attached for more options

### windows

**Unable to load NVML library, GPU-CPU affinity unavailable.** after installing CUDA?

http://bbs.keinsci.com/thread-25477-1-1.html windows VMD1.9.4alpha可能就是有问题？还好

### source code

http://www.ks.uiuc.edu/Research/vmd/doxygen/

1. compile the plugins
2. compile vmd

### Python interface

https://vmd.robinbetz.com/

not good

### ImageMagick

```conda install -c conda-forge imagemagick```



## DiscoveryStudio Visualizer

https://blog.csdn.net/huanzaizai/article/details/116273464

> https://forums.linuxmint.com/viewtopic.php?t=293074

a newer: https://forums.linuxmint.com/viewtopic.php?t=352478

```shell
## prepare
sudo apt-get install csh tcsh
## step 1, get the program in your target path
# at downloads
bash BIOVIA_2021.DS2021Client.bin --noexec --target ~/BIOVIA2021
cd ~/BIOVIA2021
vi install_DSClient.sh
# Change "#!/bin/sh" to "#!/bin/bash"
# Insert "shopt -s expand_aliases" (without quotes) above "alias echoe="echo -e"" and save file.
bash install_DSClient.sh
# choose 2, create a folder in the current path as target, (??) then choose 1 (or Enter) twice
/home/xxx/BIOVIA2021/DiscoveryStudio2021  
# we just want to add 2021, if not, just use default 'BIOVIA'
# do not use ~ here. I don't know why
# ignore './install_lp.sh: 73: Syntax error: redirection unexpected'
# now you've created an installer

## step 2, configure license pack
cd lp_installer
bash ./lp_setup_linux.sh --noexec --target ../ # /home/gxf/BIOVIA2021
cd ../LicensePack/etc
./lp_config
vi lp_echovars
# change "#! /bin/csh -f" to "#! /bin/tcsh"
./lp_echovars
cd ~/BIOVIA2021/DiscoveryStudio2021/bin
./config_lp_location ~/BIOVIA2021/LicensePack/
gedit ./DiscoveryStudio2021
# change "ACCELRYS_DEBUG=0" to "ACCELRYS_DEBUG=1". (all 3?)
# Then when DSV is started via the terminal, you will get a verbose readout that can be inspected for errors.
./DiscoveryStudio2021
```

> ~/BIOVIA2021/DiscoveryStudio2021/bin/../lib/DiscoveryStudio2021-bin: error while loading shared libraries: libpng15.so.15: cannot open shared object file: No such file or directory

just refer to the first tutorial, download from http://sourceforge.net/projects/libpng/files/libpng15/

unzip, install according to file `install`

```shell
sudo apt install zlib1g # zlib
./configure --prefix=/home/moonlight/libpng15
make check
make install
cp ~/libpng15/lib/libpng15.so.15 ~/BIOVIA2021/DiscoveryStudio2021/lib/
```

> working directory should not contain sth like '&'

and it''s working! [Applause]

icon path: `/home/gxf/BIOVIA2021/DiscoveryStudio2021/share/doc/DS/Skins/Favicons` (or DSV)

## pymol

### in python

the free version: https://zhuanlan.zhihu.com/p/58803491

just buy a license from pymol.org

```shell
conda install -c schrodinger pymol-bundle
```

and launch it from anaconda prompt. works in Windows...

> - install with downloaded package
>   
>   ```shell
>   conda install -y --use-local pymol-2.5.0a0-py38h4cb1252_9.tar.bz2 
>   #  y: always yes
>   ```
>   
>   都是段错误

for python api use

```shell
conda create -n pymol
conda activate pymol
conda install -c schrodinger pymol-bundle
```

### independent

Of course downloading the whole package is convenient!!

https://pymol.org/ep

the password is often `betabarrel`

should use **PyMOL 2.0** (installer) rather than [EduPyMOL-v1.7.4.5-Linux-x86_64.tar.bz2](https://pymol.org/ep/EduPyMOL-v1.7.4.5-Linux-x86_64.tar.bz2)

![pymol](https://cdn.jsdelivr.net/gh/gxf1212/notes@master/techniques/images/pymol.jpg)

> Icon=/home/gxf/pymol/share/pymol/data/pymol/icons/icon2_128x128.png

btw, have you ever tried

```shell
sudo apt install pymol
```

### APBS Electrostatics

https://www.poissonboltzmann.org/

usually along with Pymol Edu

## ChemBioDraw, etc.

draw your own molecule; recognize molecules from figure

use ChemBioDraw, copy into Chem3D, export as any format that openbabel accepts

install? on win

链接: https://pan.baidu.com/s/1p0Sc7Fz1Fhwmx1FtnFdFmA 提取码: vcsi

StoneMIND Collector: https://www.stonewise.ai/mol_product  (https://www.chemrss.com/1560.html)

MathPix can also recognize figure as smiles.

## Avogadro

[使用此开源程序进行Avogadro，编辑和可视化分子| Ubunlog](https://ubunlog.com/zh-CN/avogadro编辑使分子可视化/#Instalar_Avogadro_en_Ubuntu)

```shell
flatpak install flathub org.openchemistry.Avogadro2
```

official package: [Install — Avogadro 1.99.0 documentation](https://two.avogadro.cc/install/index.html)

https://avogadro.cc/devel/compiling

> [install-qt4-ubuntu-20-04](https://ubuntuhandbook.org/index.php/2020/07/install-qt4-ubuntu-20-04/)

## UCSF-Chimera

```
Installation dir:
    ~/.local/UCSF-Chimera64-1.16/
Symbolic link of executable:
    ~/bi
To (re)install desktop menu and icon later, run:
    ~/.local/UCSF-Chimera64-1.16/bin/xdg-setup install
```

dependence: `conda install -c conda-forge xorg-libxscrnsaver`

## ligplot+

https://www.ebi.ac.uk/thornton-srv/software/LigPlus/install.html

```shell
export ligplus='java -cp /home/sjxlab/LigPlus/ -jar /home/sjxlab/LigPlus/LigPlus.jar'
$ligplus
```

now it is also ok if

```shell
java -jar LigPlus.jar
export PATH=$PATH:/home/sjxlab/LigPlus/
```

Parameters written to file: `/home/moonlight/LigPlus/lib/params/ligplus.par`

## RasMol

http://www.rasmol.org/software/RasMol_2.7.5/INSTALL.html

## Maestro

(Education)

```shell
sudo dnf install libnsl
```

Enter the unzipped archive, just run `./INSTALL` (interactively)
