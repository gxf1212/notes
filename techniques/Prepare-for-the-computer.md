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

> sudo apt-get install libpython2.7

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

Parameters written to file: `/home/moonlight/LigPlus/lib/params/ligplus.par`

### RasMol

http://www.rasmol.org/software/RasMol_2.7.5/INSTALL.html

### VMD

#### pre-compiled version

https://blog.csdn.net/qyb19970829/article/details/106947424

> 2022.2.11, `vmd-1.9.4a55.bin.LINUXAMD64-CUDA102-OptiX650-OSPRay185-RTXRTRT.opengl.tar.gz`

$install_bin_dir `/usr/local/bin` This is the location of the startup script ’vmd’.

install_library_dir `/usr/local/lib/install_name` This is the location of all other VMD files.

All files are here.

> customize: `$Home/$install_name/bin`    `$Home/$install_name/lib`

```shell
sudo  ./configure LINUXAMD64

sudo  ./configure

cd src

sudo make install
```

if you don't want to customize, keep the installation folder to run the following when you want to remove vmd

```shell
sudo make uninstall
```

You may refer to the pdf attached for more options

uninstall: delete the files  https://www.ks.uiuc.edu/Research/vmd/mailing_list/vmd-l/25245.html

#### source code

http://www.ks.uiuc.edu/Research/vmd/doxygen/

1. compile the plugins
2. compile vmd

#### Python interface

https://vmd.robinbetz.com/

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

![pymol](https://gitee.com/gxf1212/notes/raw/master/techniques/images/pymol.jpg)

> Icon=/home/gxf/pymol/share/pymol/data/pymol/icons/icon2_128x128.png

btw, have you ever tried

```shell
sudo apt install pymol
```

#### APBS Electrostatics

https://www.poissonboltzmann.org/

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

## pycharm and miniconda

```shell
$pycharm # boot
```

### packages

for AmberTools!!!

```shell
# https://www.mdanalysis.org/
conda config --add channels conda-forge
conda install mdanalysis -y
conda install -c openbabel openbabel -y
# conda install -c bioconda pybel # not this
conda install -c rdkit rdkit -y
```

usage

```shell
import openbabel
import pybel
mymol = pybel.readstring("smi", "CCCC")
```

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
python3 ~/mendeleydesktop-1.19.8-linux-x86_64/bin/mendeleydesktop
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
sudo apt-get install openbabel # debian
```

This program has a interface with Python...

It **can do things in batch**, but **no outputing pdb**....but don't forget its functions....

> so use my shell
> 
> ```shell
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

14. If you click on where it says “Selecting: Residues”, you can cycle  through the available selection modes below.  These modes are also  available from the “Mouse” menu under “Selection Mode”.   
    
    - Atoms
    - C-alphas
    - Molecules
    - Objects
    - Segments
    - Chains
    - Residues  

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

### system stuck

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

# Principles of softwares

## vina

Good results especially for ligands with 8 or more rotatable bonds 

### algorithms and settings

- docking box: the search space (for the whole ligand rather than the center)
- 

### parameters

- exhaustiveness: One execution of Vina tries to predict where and how a putative ligand can best bind to a given protein, in which Vina may repeat the calculations **several times** with different randomizations
- seed: same seed (explicitly assigned) produces the same results
- cpu: repeated computation for a ligand is done on separate CPUs at the same time. By default, Vina tries to create as many threads as the number of available cores.
