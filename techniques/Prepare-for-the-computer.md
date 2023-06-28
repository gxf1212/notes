# Prepare for the computer

This page is all about software installing (Linux), both for system and project environment. Also something about Fedora. A little bit messy. 

Mainly recorded while in NUS. The installation of DL environment, Gromacs, and plans are all in `Linux fundamental (Installation and softwares)`.

## remote control and ssh

### tight vnc

[doc](https://docs.fedoraproject.org/en-US/fedora/rawhide/system-administrators-guide/infrastructure-services/TigerVNC/)

[error](https://www.dev2qa.com/how-to-fix-error-job-for-vncserver1-service-failed-because-the-control-process-exited-with-error-code-see-systemctl-status-vncserver1-service-and-journalctl-xe-for-details-when-start-vnc/)

I've removed that but maybe it's ok (you may try to find the viewer).

### real vnc on linux

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

```
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

see software usage!

### ssh tools

```shell
sudo rm -r /usr/lib/FinalShell

sudo snap install termius-app
```

### easy connect (for zju)

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
> 7.6.7 version: appropriate for XJTU v

> [!WARNING]
>
> do not turn on auto login on Linux! cannot change user name (unless you reinstall the client) because https://rvpn.zju.edu.cn will be redirected to the download page.



## break the wall

### basics

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

### airport

https://sgi.anycast.gay/user 买流量的网站。支持ss, ssr, v2ray, clash等等。便宜，事实上不限流量。

https://renzhe.cloud a little more expensive?

the plugin Google-access-helper cannot do anything now

> laowang, can view youtube on the phone
>
> https://www.hayaissr.xyz/ 也是个买vpn的？

### electron-ssr

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
        export https_proxy="https:/ /127.0.0.1:12333"
        ```

6. electron-ssr icon becomes grey: right click the icon and cllick 'Enable' (‘启用’)

7. gpu_data_manager_impl_private.cc(894)] The display compositor is frequently crashing. Goodbye.

   > for 0.3.0 and after. maybe due to newer version of electron? but may also occurs in other applications, in the newly installed system. so the problem of HDD?

   workaround: `--no-sandbox` 

   https://blog.csdn.net/xianfengdesign/article/details/124946689

   > using lightdm does not help

   

8. port 12333/1080 is taken

   just reboot several times....

9. 

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

### v2ray

> https://rongsp.com/article/96.html

https://github.com/Qv2ray/Qv2ray/releases/tag/v2.7.0 with GUI

intro https://iyuantiao.com/fenxiangfuli/jiaocheng/v2ray.html

### clash

- https://github.com/Fndroid/clash_for_windows_pkg/releases
- video reference: https://www.youtube.com/watch?v=pTlso8m_iRk

2022: I won't use that since it breaks system configurations and caused problems (GreenVPN, conda proxy error) in both Windows and Linux

### qt-5

https://github.com/shadowsocks/shadowsocks-qt5/releases/tag/v3.0.1

```shell
chmod a+x Sha*
./Sha*
```

连接--添加--URI

### iOS翻墙

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



## MD

### Gromacs (dirty)

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

### GROMACS installation on a workstation

#### prepare

  Follow this order:

1. check your graphic card driver (and installation)

   https://blog.csdn.net/qq_43265072/article/details/107160297

2. check gcc version

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
- rather than official manual, I used

#### installation

```shell
# fftw: http://www.fftw.org/download.html
./configure --prefix=~/fftw-3.3.10 --enable-float --enable-shared --enable-sse2 --enable-avx --enable-threads
make -j 6
make install
## REMEMBER TO ADD TO LD_LIBRARY_PATH!!!
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

gromacs newer version reads older files fine sometimes, but not vice versa

other issues

- https://gitlab.com/gromacs/gromacs/-/issues/4037

- gmx 2023

  ```
  #error -- unsupported GNU version! gcc versions later than 10 are not supported! The nvcc flag '-allow-unsupported-compiler' can be used to override this version check; however, using an unsupported host compiler may cause compilation failure or incorrect run time execution. Use at your own risk.
  ```

- 



on my previous workstation

```shell
# gcc environment
../configure --enable-language=c,c++ --disable-multilib --prefix=/opt/gcc/11.1.0
make -j32
make install
# then give gcc path
cmake .. -DCMAKE_INSTALL_PREFIX=/home/gxf1212/gromacs-2021.5-gpu -DGMX_FFT_LIBRARY=fftw3 -DCMAKE_PREFIX_PATH=/home/gxf1212/program \# -DFFTWF_LIBRARY=/home/gxf1212/program/lib/libfftw3f.so -DFFTWF_INCLUDE_DIR=/home/gxf1212/programinclude  
-DCMAKE_C_COMPILER=/home/gxf1212/program/bin/gcc -DCMAKE_CXX_COMPILER=/home/gxf1212/program/bin/g++ -DGMX_CUDA_TARGET_SM=80 -DGMX_MPI=OFF -DREGRESSIONTEST_DOWNLOAD=ON -DGMX_GPU=CUDA # 80: just a workaround
```





### Amber22

see [Amber22安（cai）装（keng）过程分享 - 哔哩哔哩 (bilibili.com)](https://www.bilibili.com/read/cv23212288)



### NAMD

http://bbs.keinsci.com/thread-22004-1-1.html

just unzip...

### VEGA_ZZ

https://www.ddl.unimi.it/cms/index.php?Software_projects:VEGA_ZZ:Main_features

one year trial...

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

## Analysis tools: Python/cmd tookit

### xmgrace

https://plasma-gate.weizmann.ac.il/Grace/

compile from source: `configure: error: M*tif has not been found`

not solve by `conda install openmotif`. compiling: need `sudo`

`conda install xmgrace`: no documentation, no cmd command, python2.7, didn't work 



![image-20221016211602695](https://cdn.jsdelivr.net/gh/gxf1212/notes@master/techniques/images/xmgrace.png)![image-20221016211759336](https://cdn.jsdelivr.net/gh/gxf1212/notes@master/techniques/images/xmgrace-gmx.png)

### dssp

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

### gmx_MMPBSA

https://valdes-tresanco-ms.github.io/gmx_MMPBSA/installation/

```shell
pip install gmx_MMPBSA # should be together with ambertools
pip install PyQt5
```

if in conda, no need to add `amber.pythons`

> ### g_mmpbsa
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
> ### GMXPBSA
> 
> https://github.com/aspitaleri/gmxpbsa
> 
> ```
> yum install apbs
> export GMXPBSAHOME=/home/gxf/GMXPBSAtool
> ```

### GromacsWrapper

https://gromacswrapper.readthedocs.io/en/latest/index.html

```shell
pip install GromacsWrapper  # use ↓
conda install -c conda-forge -c bioconda gromacswrapper
from gromacs.fileformats.xvg import XVG # read .xvg files
```

### alchemical-analysis, alchemlyb

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


### mdtraj

convert trajectories

```shell
conda install -c conda-forge mdtraj
conda uninstall mdtraj
```

https://mdtraj.org/1.9.4/mdconvert.html

### msmbuilder

http://msmbuilder.org/3.8.0/

```shell
conda create env -n xxx python==3.6 # 22.3.5
conda activate
conda install -c omnia msmbuilder
```

### Align ligands

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

### Clustering plugin in VMD

https://github.com/luisico/clustering

## Modelling tools

### pycharm and miniconda

no difficulty...

common packages

```shell
# https://www.mdanalysis.org/
conda config --add channels conda-forge
conda install mdanalysis -y
conda install -c openbabel openbabel -y
# conda install -c bioconda pybel # not this
conda install -c rdkit rdkit -y
```

#### OpenBabel

may also

```shell
dnf install openbabel-gui # do not support converting to pdb???
dnf install openbabel # without gui
sudo apt-get install openbabel # debian
```



### AMBER

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

### AmberTools

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

### acpype

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
conda create -n Acpype -
conda install -c conda-forge acpype
```

### Propka

https://propka.readthedocs.io/en/latest/quickstart.html

https://wiki.pymol.org/index.php/Propka

#### run

```shell
propka3 merged.pdb -o 7.4 > merged.log
# see merged.pka
```

It can process multiple chIt's strange that when the system contains sth other than protein, HIS is not present (only combine protein chains...)

### Gaussian16 and view

```shell
tar -xjvf G16-A03-AVX2.tbz
mkdir g16/scratch
```

after extraction, add these to `~/.bashrc` http://sobereva.com/439

```shell
export g16root=$HOME
export GAUSS_SCRDIR=$g16root/g16/scratch
export GAUSS_EXEDIR=$g16root/g16
source $g16root/g16/bsd/g16.profile
export PATH=$PATH:$g16root/g16
```

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

[g16 view csdn](https://download.csdn.net/download/lk2069/10777135), buy at 1 yuan [here](https://www.kerwin.cn/dl/detail/lk2069/275737); [win?](https://getintopc.com/softwares/design/gaussview-6-0-16-free-download/)

[installation guide](http://www.molcalx.com.cn/gaussian-16-installation/)

put the folder `gv` under your g16 folder!! 

You can type `gv` in the terminal to start GView and link to Gaussian as we did in Windows, only if it can be found by g16 path settings!

> icon: downloaded from web

### PMX

https://github.com/deGrootLab/pmx/tree/develop

develop!

remember to set gmxlib: https://degrootlab.github.io/pmx/installation.html#gmxlib

```shell
git clone https://github.com/deGrootLab/pmx.git
cd pmx
# to switch to 'develop' branch type:
git checkout develop

conda activate  AmberTools22 # whatever
# conda install pip
conda install -c conda-forge rdkit -y
python -m pip install .
# add to .bashrc
export GMXLIB=/path/to/conda3/envs/env-name/lib/python3.10/site-packages/pmx/data/mutff
```

### FFparam

http://ffparam.umaryland.edu/

need http://kenno.org/pro/lsfitpar/ and cgenff program, utilizes Gaussian

manual: http://ffparam.umaryland.edu/manual/index.html, install as it says

### Multiwfn

http://sobereva.com/multiwfn/

download package and manual

remember to modify `gaupath=` etc. in `settings.ini`. formchk etc: inside g16

### FESetup

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

### rosetta

https://www.rosettacommons.org/downloads/academic/3.13/

```shell
gzip -d rosetta_bin_linux_3.12_bundle.tgz -c ../programfiles
# rosetta
export ROSETTA=/media/kemove/fca58054-9480-4790-a8ab-bc37f33823a4/programfiles/rosetta_bin_linux_2020.08.61146_bundle/
export ROSETTA3_DB=$ROSETTA/main/database
export ROSETTA_BIN=$ROSETTA/main/source/bin
export PATH=$PATH:$ROSETTA_BIN
```

### PyAutoFEP

https://github.com/luancarvalhomartins/PyAutoFEP

### SilcsBio (not free)

https://docs.silcsbio.com/2020.1/install.html

### LigParGen

[How to Install LigParGen Server Locally ?](https://quantumchemistryniser.wordpress.com/2017/11/12/how-to-install-ligpargen-server-locally/)

Please request BOSS executable from Prof. William L. Jorgensen (It is free for academic users). Once you have BOSS, set `$BOSSdir`; type `conda install -c mc-robinson ligpargen openbabel ` to install the package
Download the files from here and copy them to `BOSSdir/scripts` folder

### EPI suite

https://www.chemsafetypro.com/Topics/CRA/How_to_Use_US_EPA_EPI_Suite_to_Predict_Chemical_Substance_Properties.html

### MATCH

https://brooks.chem.lsa.umich.edu/index.php?page=match&subdir=articles/resources/software

server: https://brooks.chem.lsa.umich.edu/index.php?matchserver=submit

https://brooks.chem.lsa.umich.edu/download/software/match/MATCH_RELEASE.tar.gz



## Docking

### Autodock

https://ccsb.scripps.edu/projects/docking/

Installing

    tar xzvf autodock_vina_1_1_2_linux_x86.tgz

Optionally, you can copy the binary files where you want.
Running

    ./autodock_vina_1_1_2_linux_x86/bin/vina --help

This file is copied into /home/Desktop/work/xufan and /usr/local

http://vina.scripps.edu/manual.html#usage for running docking.

**安装目录和打开的文件不要包含任何中文！！！！！**

### mgl

Still need to install MGL-tools (autodock tools). Just  help with visualization.

Install according to official manual. Remember to configure environmental path.

It also include PMV...see https://ccsb.scripps.edu/mgltools/ for all.

note: for .tar.gz, you should **put the folder right under the directory you want to install**

```shell
export PATH=$PATH:~/MGLTools-1.5.7/bin
```

icon path: just search `adt` or `icon`

> adt: $HOME/mgltools_x86_64Linux2_1.5.7/MGLToolsPckgs/Pmv/Icons/128x128/adt.png

> ### backup
>
> ```shell
> # paths
> export PATH=$PATH:/home/user/MGLTools-1.5.7/bin # mgltools
> export PATH=$PATH:/home/user/Desktop/work/xufan/bin # vina
> # now it can run under root
> ```
>
> ### 

### zdock

https://zdock.umassmed.edu/ with server

> **ZDOCK 2.3.3 and ZDOCK 3.0.2**: These versions utilize the Conv3D library and other optimizations to improve speed and memory usage. ZDOCK 2.3.2 is based on the scoring function of ZDOCK 2.3, and ZDOCK 3.0.2 is based on the scoring function of ZDOCK 3.0. Please reference: Pierce BG, Hourai Y, Weng Z (2011). Accelerating Protein Docking in ZDOCK Using an Advanced 3D Convolution Library. PLoS One 6(9): e24657.

seems not this...uninstall it...

snugdock is an Ab docking tool





## Visualization

### VMD

#### pre-compiled version

https://blog.csdn.net/qyb19970829/article/details/106947424

> 2022.2.11, `vmd-1.9.4a55.bin.LINUXAMD64-CUDA102-OptiX650-OSPRay185-RTXRTRT.opengl.tar.gz`

$install_bin_dir `/usr/local/bin` This is the location of the startup script ’vmd’.

$install_library_dir `/usr/local/lib/$install_name` This is the location of all other VMD files.

All files are here.

> customize: `$Home/$install_name/bin`       `$Home/$install_name/lib`

```shell
sudo  ./configure LINUXAMD64
sudo  ./configure
cd src
sudo make install
```

if you don't want to customize, keep the installation folder to run the following when you want to remove vmd (I'm just using the default installation, so I deleted it.)

```shell
sudo make uninstall
```

You may refer to the pdf attached for more options

uninstall: delete the files  https://www.ks.uiuc.edu/Research/vmd/mailing_list/vmd-l/25245.html

#### windows

**Unable to load NVML library, GPU-CPU affinity unavailable.** after installing CUDA?

http://bbs.keinsci.com/thread-25477-1-1.html windows VMD1.9.4alpha可能就是有问题？还好

#### source code

http://www.ks.uiuc.edu/Research/vmd/doxygen/

1. compile the plugins
2. compile vmd

#### Python interface

https://vmd.robinbetz.com/

not good

#### ImageMagick

```conda install -c conda-forge imagemagick```



### DiscoveryStudio Visualizer

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

### pymol

#### in python

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

#### independent

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

#### APBS Electrostatics

https://www.poissonboltzmann.org/

usually along with Pymol Edu

### ChemBioDraw, etc.

draw your own molecule; recognize molecules from figure

use ChemBioDraw, copy into Chem3D, export as any format that openbabel accepts

install? on win

链接: https://pan.baidu.com/s/1p0Sc7Fz1Fhwmx1FtnFdFmA 提取码: vcsi

StoneMIND Collector: https://www.stonewise.ai/mol_product  (https://www.chemrss.com/1560.html)

MathPix can also recognize figure as smiles.

### Avogadro

[refer to](https://ubunlog.com/zh-CN/avogadro%E7%BC%96%E8%BE%91%E4%BD%BF%E5%88%86%E5%AD%90%E5%8F%AF%E8%A7%86%E5%8C%96/#Instalar_Avogadro_en_Ubuntu)

official: https://avogadro.cc/devel/compiling

> [install-qt4-ubuntu-20-04](https://ubuntuhandbook.org/index.php/2020/07/install-qt4-ubuntu-20-04/)

### UCSF-Chimera

```
Installation dir:
    ~/.local/UCSF-Chimera64-1.16/
Symbolic link of executable:
    ~/bi
To (re)install desktop menu and icon later, run:
    ~/.local/UCSF-Chimera64-1.16/bin/xdg-setup install
```

dependence: `conda install -c conda-forge xorg-libxscrnsaver`

### ligplot+

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

### RasMol

http://www.rasmol.org/software/RasMol_2.7.5/INSTALL.html

## Paper, work

### Chat

https://github.com/Hackerl/Wine_Appimage

https://github.com/eNkru/freechat/releases

https://github.com/askme765cs/Wine-QQ-TIM

[vscode qq extension based on android qq protocol](https://github.com/takayama-lily/vscode-qq)

### office

https://www.libreoffice.org/download/appimage/  ok

https://github.com/linlinger/wps-appimage/releases/tag/1.0 dependence unsatisfied...

### text editor

vscode

```shell
sudo apt-get install snap
sudo snap install --classic code
sudo snap r codium
```
- vscode: https://code.visualstudio.com/docs/setup/linux
- typora: https://www.typora.io/releases/all
- https://www.sublimetext.com/docs/linux_repositories.html
- https://atom.io/  sunset...

### foxit reader

Silly installation

- install: run the .run file

  - it's good. rename it, and run the .run file under root

    ```
    ./foxit.run
    ```

    or it will die

- remove: find the uninstall file under /home/opt/foxitsoftware/...

- cannot open: kill the process...

### medeley

```shell
# never run under root!!
python3 ~/mendeleydesktop-1.19.8-linux-x86_64/bin/mendeleydesktop
# always sync to avoid losing data!!!

Fatal Python error: _Py_HashRandomization_Init: failed to get random numbers to initialize Python
Python runtime state: preinitialized
```

https://stackoverflow.com/questions/47936584/what-does-client-failed-to-connect-to-the-d-bus-daemon-mean





## Other thing I did at Fedora and KDE

Try to be clear about the commands for Dedian/RedHat systems!

### installation

1. typora
   
   - https://github.com/RPM-Outpost/typora in fedora, generate a rpm package
     
     ```
     yum install rpm-build -y
     ```
   
   - theme directory (in Fedora): 
     
     ```
     /var/lib/flatpak/app/io.typora.Typora/x86_64/stable/67e4ba33309d2516bf011b564be7292dc9a5a1fa46c3bfb0a4a09b8f647cec52/files/typora/resources/app/style/themes
     ```
- use sync in firefox to share with pc...but I can **ctrl+c,v**..

- maybe I'll send email to send files from laptop..

- screenshot: PrtSc. Kolourpaint.

- ocr: ru
  
  ```
  /home/user/Desktop/work/xufan/bin/Image2LaTeX-linux/bin/Image2LaTeX
  ```
  
  ```
  killall -9 FoxitReader
  ```

### library

https://libfaq.nus.edu.sg/faq/71315

google scholar, pubmed

all from library home!

