# Prepare for the computer

This page is all about software installing, both for system and project environment. Also something about Fedora. A little bit messy.

Mainly recorded while in NUS. The installation of DL environment, Gromacs, and plans are all in `Linux fundamental (Installation and softwares)`.

## remote control

### tight vnc

https://docs.fedoraproject.org/en-US/fedora/rawhide/system-administrators-guide/infrastructure-services/TigerVNC/

https://www.dev2qa.com/how-to-fix-error-job-for-vncserver1-service-failed-because-the-control-process-exited-with-error-code-see-systemctl-status-vncserver1-service-and-journalctl-xe-for-details-when-start-vnc/

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

### sunflower

https://tieba.baidu.com/p/7157359656

```shell
elif [ "$os_name"== 'Fedora' ]; then
        os_version=`cat /etc/fedora-release | cut -d' ' -f3`
|| [ $os_name== "fedora" ]
```

## vpn

### anycast

https://sgi.anycast.gay/user 买ssr流量的网站

https://www.hayaissr.xyz/ 也是个买vpn的？

> ssr can not provide access to YouTube. 极速 browser can view Google but chrome without the plugin can not... it helps with google scholar but the plugin cannot

laowang, can view youtube on the phone

### v2ray

https://rongsp.com/article/96.html

### electron-ssr

https://github.com/hannuo/ssr-linux-client-electron

depends on Python! If connection fails,

https://www.cnblogs.com/geekHao/p/12635970.html

从源头更改python的链接文件，**推荐这种方法**

1. 查看已安装的python版本和链接情况：

   ```shell
   ll /usr/bin/python*
   ```

2. 删除原有的Python连接文件 (I don’t have one after reinstalling the system)

   `sudo rm /usr/bin/python`

3. 建立指向Python3.X的连接

   ```shell
   ln -s /usr/bin/python3 /user/bin/python
   ```

   then it’s done

### qt-5

https://github.com/shadowsocks/shadowsocks-qt5/releases/tag/v3.0.1

```shell
chmod a+x Sha*
./Sha*
```

连接--添加--URI

### easy connect

https://rvpn.zju.edu.cn/com/installClient.html#auto-common

> 重要启示：点击安装包，显示安装成功，但启动程序时点击图标无响应，可通过命令行终端（Terminal）执行命令来启动。观察怎么个报错法！有道、DS等

```shell
/usr/share/sangfor/EasyConnect/EasyConnect 
```

https://www.cnblogs.com/cocode/p/12890684.html

下载pangolib  我的云盘  链接: https://pan.baidu.com/s/1i8O5ZvMLqnw8K8EzKIrw6Q 提取码: c896

```shell
sudo cp ./'pango lib'/lib/lib* /usr/share/sangfor/EasyConnect/
```



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

note: for .tar.gz, you should put the folder right under the directory you want to install

### backup

```shell
# paths
export PATH=$PATH:/home/user/MGLTools-1.5.7/bin # mgltools
export PATH=$PATH:/home/user/Desktop/work/xufan/bin # vina
# now it can run under root
```

### zdock

https://zdock.umassmed.edu/ with server

> **ZDOCK 2.3.3 and ZDOCK 3.0.2**: These versions utilize the Conv3D library and other optimizations to improve speed and memory usage. ZDOCK 2.3.2 is based on the scoring function of ZDOCK 2.3, and ZDOCK 3.0.2 is based on the scoring function of ZDOCK 3.0. Please reference: Pierce BG, Hourai Y, Weng Z (2011). Accelerating Protein Docking in ZDOCK Using an Advanced 3D Convolution Library. PLoS One 6(9): e24657.

seems not this...uninstall it...

snugdock is an Ab docking tool

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

#### on new system

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
-DGMX_GPU=CUDA
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

### NAMD

http://bbs.keinsci.com/thread-22004-1-1.html

just unzip...

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

/

## Analysis tools: Python/cmd tookit

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
pip install GromacsWrapper
from gromacs.fileformats.xvg import XVG # read .xvg files
```

### alchemistry

https://github.com/MobleyLab/alchemical-analysis

```shell
conda install -c conda-forge pymbar
```

https://anaconda.org/conda-forge/pymbar git address and doc

## Modelling tools

### AMBER

installation: https://ambermd.org/InstFedora.php under user

>error:
>
>**/home/gxf/amber20_src/AmberTools/src/arpack/dnaitr.f:658:35:**.......fortran error. needs to downgrade gcc
>
>install from https://gcc.gnu.org/mirrors.html
>
>> configure:5776: error: Building GCC requires GMP 4.2+, MPFR 2.4.0+ and MPC 0.8.0+.
>> Try the --with-gmp, --with-mpfr and/or --with-mpc options to specify their locations.  Source code for these libraries can be found at their respective hoslaterting sites as well as at ftp://gcc.gnu.org/pub/gcc/infrastructure/.  See also http://gcc.gnu.org/install/prerequisites.html for additional info.
>
>try running `./contrib/download_prerequisites.sh` from the gcc source dir. 
>
>remember this is always the way to install a different version of gcc, which seems to overwrite the configuration in /usr/bin....
>
>failed here: https://stackoom.com/question/3nN9A/%E5%A6%82%E4%BD%95%E8%A7%A3%E5%86%B3-archlinux%E4%B8%AD%E7%9A%84gcc%E7%BC%96%E8%AF%91%E9%94%99%E8%AF%AF-sys-ustat-h-%E6%B2%A1%E6%9C%89%E8%BF%99%E6%A0%B7%E7%9A%84%E6%96%87%E4%BB%B6%E6%88%96%E7%9B%AE%E5%BD%95

from miniconda (which only includes python in conda)

https://docs.conda.io/en/latest/miniconda.html

> I'm not using neither openmpi cuda here. maybe refer to
>
> https://jerkwin.github.io/2017/12/26/Amber_2017_%E5%8F%82%E8%80%83%E6%89%8B%E5%86%8C_%E7%AC%AC%E4%B8%80%E9%83%A8%E5%88%86_%E4%BB%8B%E7%BB%8D%E5%92%8C%E5%AE%89%E8%A3%85/
>
> https://www.cnblogs.com/wq242424/p/8857296.html

a readme: https://amber-md.github.io/cpptraj/CPPTRAJ.xhtml

### acpype

this tool should be in ambertools...

https://github.com/alanwilter/acpype

```shell
# AmberTools. for gmx_MMPBSA, not so high python version
conda create -n AmberTools20
# conda remove --name AmberTools20 --all 
conda activate AmberTools20
conda install -c conda-forge ambertools=20 -y
# acpype
conda create -n Acpype python=3.6 # now 3.7. install appropriate version at step 3
conda activate Acpype
conda install -c acpype acpype -y # this contains ambertools-17
```

> ### mdtraj
>
> ```shell
> conda install -c conda-forge mdtraj
> conda uninstall mdtraj
> ```
>
> https://mdtraj.org/1.9.4/mdconvert.html

### gaussian

after extraction, http://sobereva.com/439

### FESetup

https://www.ccpbiosim.ac.uk/software

https://fesetup.readthedocs.io

though not using...

  ### rosetta

  ```shell
gzip -d rosetta_bin_linux_3.12_bundle.tgz -c ../programfiles
# rosetta
export ROSETTA=/media/kemove/fca58054-9480-4790-a8ab-bc37f33823a4/programfiles/rosetta_bin_linux_2020.08.61146_bundle/
export ROSETTA3_DB=$ROSETTA/main/database
export ROSETTA_BIN=$ROSETTA/main/source/bin
export PATH=$PATH:$ROSETTA_BIN
  ```

## Visualization

### ligplot

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


### VMD

https://blog.csdn.net/qyb19970829/article/details/106947424

customize

$install_bin_dir `/usr/local/bin` This is the location of the startup script ’vmd’.

$install_library_dir `/usr/local/share` This is the location of all other VMD files.

```shell
sudo  ./configure LINUXAMD64
sudo  ./configure
cd src
sudo make install
```

You may refer to the pdf attached for more options

uninstall: delete the files  https://www.ks.uiuc.edu/Research/vmd/mailing_list/vmd-l/25245.html

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

#### for python api use

```shell
conda create -n pymol
conda activate pymol
conda install -c schrodinger pymol-bundle
```

### Avogadro

https://ubunlog.com/zh-CN/avogadro%E7%BC%96%E8%BE%91%E4%BD%BF%E5%88%86%E5%AD%90%E5%8F%AF%E8%A7%86%E5%8C%96/#Instalar_Avogadro_en_Ubuntu

official: https://avogadro.cc/devel/compiling

## pycharm and miniconda

```shell
$pycharm # boot
```

### packages

```shell
conda config --add channels conda-forge
conda install mdanalysis # https://www.mdanalysis.org/
```

### notes on conda

https://blog.csdn.net/vola9527/article/details/80744540 create from yaml

### notes on pycharm

https://blog.csdn.net/qq_41330454/article/details/105906347 控制台命令提示符是In[2]

https://blog.csdn.net/u013088062/article/details/50001189 关闭代码风格检查

https://www.pythonheidong.com/blog/article/498305/f571ce16edc768ad1839/ matplotlib fonts. just copy .ttf files to ~/miniconda3/envs/work/lib/python3.7/site-packages/matplotlib/mpl-data/fonts/ttf

## Paper

  ### foxit reader

Silly installation

it's good. rename it, and run the .run file under root

```
./foxit.run
```

or it will die

### medeley

```shell
# never run under root!!
python3 /home/gxf/mendeleydesktop-1.19.8-linux-x86_64/bin/mendeleydesktop
# always sync to avoid losing data!!!

Fatal Python error: _Py_HashRandomization_Init: failed to get random numbers to initialize Python
Python runtime state: preinitialized
```

https://stackoverflow.com/questions/47936584/what-does-client-failed-to-connect-to-the-d-bus-daemon-mean

skills:

- I just make notes on the right. may use "favorite"
- drag the entry to another folder
- "Enter" to change the position of last name and first 
- open .ris or .bib ..... with Medeley!!
- files--add file
- contents: to quickly compare the papers, to summarize

## download small molecule pdb files for virtual screening

### download all and see data

```shell
wget -m -np ftp://ftp.ncbi.nlm.nih.gov/pubchem/Compound_3D/01_conf_per_cmpd/SDF/ 
# download **all** the compounds in the current directory
# /home/work/data lib
# but that's too big and unnecessary
```

### download what you need

[bulk download with id file](https://blog.csdn.net/recher_he1107/article/details/106276198?utm_medium=distribute.pc_relevant.none-task-blog-baidujs_utm_term-2&spm=1001.2101.3001.4242)

maybe I'll use smiles to determine similarity between atp and ligands...



### convert .sdf to .pdb in batches

.sdf: structure data file

#### OpenBabel

```shell
dnf install openbabel-gui # do not support converting to pdb???
dnf install openbabel # without gui
```

This program has a interface with Python...

It **can do things in batch**, but **no outputing pdb**....but don't forget its functions....

> so use my shell
>
> ``` shell
> # run the following command under where your small molecules are
> # to convert into any format **in batch**
> bash /home/user/Desktop/work/xufan/bin/all_to_pdb.sh # to pdb
> bash /home/user/Desktop/work/xufan/bin/all_to_pdbpt.sh # to pdbpt
> bash /home/user/Desktop/work/xufan/bin/sdf_split_convert.sh # split multi comformers and convert
> ```
>
> https://blog.csdn.net/TQCAI666/article/details/99835557?utm_medium=distribute.pc_relevant.none-task-blog-searchFromBaidu-1.control&depth_1-utm_source=distribute.pc_relevant.none-task-blog-searchFromBaidu-1.control
>
> https://blog.csdn.net/u012325865/article/details/77914358
>
> finally I found simpler commands...

also, in python

```shell
conda install -c openbabel openbabel
```

#### avogadro

### draw your own molecule

use ChemBioDraw, copy into Chem3D, export as any format that openbabel accepts

install? on win

# visualization tools usage

## Pymol

api: https://pymol.org/dokuwiki/doku.php?id=api:cmd:alpha  https://pymol.org/pymol-command-ref.html. for other commands we have to view documentation in pycharm

1. `cd directory`

2. s: show. as.

   - show as sticks: shows side chain

3. mouse

   - left click: rotate
   - right click: zoom
   - middle and move: move
   - middle click: center this residue

4. bg_color white/...

   opaque off, then type `ray`

5. set cartoon_fancy_helices/sheets, 0/1

6. set cartoon_side_chain_helper, on

   remove the sticks of main chain 

7. save

   - save as img
   - save session: to edit the next time

8. action--preset

   publication (different colors), simple (thin lines, ligands sticks), technical (H bonds), ligand (only ligand H bonds)

9. label

   - label--residues vs hide--label

10. center

    ```
    center object
    ```

11. must use cmd to align small molecules

    ```
    align mol1,mol2
    ```

12. color by element

13. select

    ```shell
    sele /object_name//chain_name/residue/atom_type
    # eg
    sele /2cqg//A/PHE`149/CZ
    ```

14.  If you click on where it says “Selecting: Residues”, you can cycle  through the available selection modes below.  These modes are also  available from the “Mouse” menu under “Selection Mode”.   

    -  Atoms
    -  C-alphas
    -  Molecules
    -  Objects
    -  Segments
    -  Chains
    -  Residues  

15. beautify and set background

    https://zhuanlan.zhihu.com/p/26325764

    display--background--white

    right click--ray

16. 

a website to draw electrostatic potential surface: https://server.poissonboltzmann.org. Seeing a blank web page suggests a bad network.

## VMD



windows: https://www.bilibili.com/read/cv7167667

# Fundamental usage of Fedora and KDE

1. directory of U disk: /run/media/user/u disk name

2. https://docs.flatpak.org/en/latest/using-flatpak.html

   install with flatpak: add a remote, download a flatpakref file, and install

3. mainly use rpm, no deb:

   ```shell
   rpm -Uhv package.rpm # install
   rpm -Uhv package.rpm --nodeps --force # force to install
   ```

   https://docs.fedoraproject.org/ro/Fedora_Draft_Documentation/0.1/html/RPM_Guide/ch02s03.html

   but you can still double click!!

4. check sys info

   ```
   cat /proc/cpuinfo # cpu
   ```

5. have to use 

   ```shell
   tar xf xx.tar.gz # or:
   tar -zxvf xx.tar.gz                                                                                                                                                                                                                                      
   ```

   rather than xvrf...

6. yum

   ```shell
   yum -y update
   yum -y upgrade
   ```

7. https://os.51cto.com/art/200902/109883.htm

   如何在KDE桌面添加启动程序

8. change user name

   https://blog.csdn.net/lanxuezaipiao/article/details/43153367

   log in with another user (or root), execute the commands, change your .bashrc and so on manually

9. watch temperature https://zhuanlan.zhihu.com/p/143123436

   ```shell
   sensors-detect # root
   ```

   

10. give user sudo privilege

    https://blog.csdn.net/Dream_angel_Z/article/details/45841109

11. 养成--prefix的好习惯

12. do not forget export $PATH:, or 

    https://blog.csdn.net/xiaoshunzi111/article/details/50623078

13. 



## basic shell

### basic syntax

1. \enter

   反斜杠后面紧跟回车，表示下一行是当前行的续行。

   but only valid in root!

2. multiple paths:

   ```shell
   PATH='/path/one;path/two;...'
   ```

3. perform string: [[]]

   perform any math: (()) or between ``

   `$( )` to store any outputed number in a variable

### operate on files and directories in batch

1. ls

   https://www.runoob.com/linux/linux-comm-grep.html 

   this computer's folder cannot find name! 

2. grep

   ```shell
   ls|grep query # return all direcotries and files containing the query string
   ls -l | grep query | wc -l # count the number of files whose names contain
   grep -o query filename | wc -l # count the number of query appearances in a text file
   grep -n query filename # return lines with line numbers
   ```

3. delete

   ```shell
   rm -r your/path/* #  empty the folder
   rm -r your/path # delete the directory
   rmdir your/path # delete an empty directory
   find . -name query -type d -exec rm -rf {} \; # delete all directories with "query" in name. 
   ```

   https://my.oschina.net/u/4328928/blog/3315425

   move to trash

   ```shell
   mv file ~/.local/share/Trash/files
   ```

4. count string

   ```shell
   grep -o '$$$$' atp.sdf | wc -l
   ```

5. readline

   https://www.cnblogs.com/iloveyoucc/archive/2012/07/10/2585529.html

6. select file according to size:

   https://blog.csdn.net/Cassiel60/article/details/89016530?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-2.control&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-2.control

   ```shell
   find . -name "*" -type f -size 0c > out.txt # output
   find . -name "*" -type f -size 0c | xargs -n 1 rm -f # delete
   ```

7. unify the format of file names

   https://blog.csdn.net/vipchenvip/article/details/103280418

   ```shell
   # length=12
   rename ZINC ZINC0 ZINC????????.pdbqt # 8
   rename ZINC ZINC0 ZINC?????????.pdbqt # 9
   # 10
   # 11
   # in order!!
   rename ZINC0 ZINC ZINC??????????????.pdbqt # 14
   rename ZINC0 ZINC ZINC?????????????.pdbqt # 13
   ```

8. directory: /

   ```shell
   rm -rf */ # remove all directories
   ```

   

9. cp

   报错如下：

   cp: omitting directory `./nginx-1.12.1'

   原因：

   要移动的目录下还存在有目录

   解决：

   cp -r 文件名 地址

   注意：

   这里的-r代表递归的意思。

10. 

11. 

12. 

13. 

14. 

15. 

16. 



### other

1. date: https://cloud.tencent.com/developer/article/1441802

2. .sh file has arguments: https://www.runoob.com/linux/linux-shell-passing-arguments.html

3. what if message is too long? add `|more` https://blog.csdn.net/weixin_34293911/article/details/86473042

4. use yum and dnf in user (not root):

   ```shell
   sudo yum install xx
   ```

5. 



## when system halted

1. do not double click .sdf file with multiple conformations...it occupies all memory..

2. 1st solution

   1. press ctrl+alt+F1~6 to enter tty. 
      - F7 or F8: exit? not useful. maybe directly `reboot`..
   2. use `top` to see threads. 
      - top: https://www.cnblogs.com/ggjucheng/archive/2012/01/08/2316399.html
   3. `kill id` to release.

3. 2nd solution

   https://blog.csdn.net/openswc/article/details/9105071

   search SysRq fedora

   I've tried https://fedoraproject.org/wiki/QA/Sysrq#How_do_I_enable_the_magic_SysRq_key.3F, don't know if it's applicable on this computer

4. tree: show directory as tree

   https://blog.csdn.net/xuehuafeiwu123/article/details/53817161

5. 



### ka dun

http://www.mamicode.com/info-detail-2913916.html

also stop, disable .....but only under user.....

https://blog.csdn.net/xinxinqqt/article/details/44784195

https://blog.csdn.net/fryingpan/article/details/42641999

might because handling too many files in a folder...?







## other thing I did

### installation

1. installed foxit reader

   - install: run the .run file
   - remove: find the uninstall file under /home/opt/foxitsoftware/...
   - cannot open: kill the process...

2. activated Meta+D to show desktop (system settings--shortcuts--global--Kwin)

3. typora

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



# principles of softwares

## vina

Good results especially for ligands with 8 or more rotatable bonds 

### algorithms and settings

- docking box: the search space (for the whole ligand rather than the center)
- 



### parameters

- exhaustiveness: One execution of Vina tries to predict where and how a putative ligand can best bind to a given protein, in which Vina may repeat the calculations **several times** with different randomizations
- seed: same seed (explicitly assigned) produces the same results
- cpu: repeated computation for a ligand is done on separate CPUs at the same time. By default, Vina tries to create as many threads as the number of available cores.

