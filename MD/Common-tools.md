# Common Tools

see [here](/techniques/Prepare-for-the-computer.md) for installation

this page also includes usage of pymol, vmd, gmx, etc.

# Visualization

## Basics

By default

- vmd aligns protein noh 
- pymol aligns protein Calpha 

be careful doing selection

## Pymol

1. delete命令！

2. select atom name

   ```
   sele name HA
   ```

   see more identifiers  https://pymolwiki.org/index.php/Selection_Algebra

3. Using Editing Mode to Move Atoms Now, please set the mouse mode to Editing, and CTRL-Left-drag on an atom.

4. pymol show contact residues http://shdf611.lofter.com/post/1cd0a1d0_a6e8874

5. align pocket in Pymol: https://pymolwiki.org/index.php/Focus_alignment

6. renumber residues and fix names

   ```shell
   # substitute (all) with other selections
   load PR1.pdb
   alter (all), chain='P'
   alter (all), segi='PR1'
   alter (all), resi=str(int(resi)+121)
   save PR1.pdb
   delete all
   ```

   ref: https://pymolwiki.org/index.php?title=Alter&redirect=no

   other
   
   http://dunbrack3.fccc.edu/PDBrenum/

To do:

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

## VMD techniques

杂记, some extra functions, that I encountered. for details, check vmd-ug.pdf (MD-tutorials.md)

### General

#### run scripts

1. run in terminal

   ```shell
   vmd -dispdev text -e combine.tcl
   ```

   vmd scripting, [pass parameters](http://timchen314.com/vmd%E7%AC%94%E8%AE%B0/)

   ```
   set file [lindex $argv 0]
   vmd .... -args arg arg2
   ```

2. How to run TCL script on VMD?

   This is very easy to do. Just use any text editor to write your script file, and in a VMD session, use the command 

   ```shell
   source filename
   ```

   to execute the file. (either VMD command line or Tk Console)

3. question mark prompt and return to the normal vmd> prompt? that mean the tcl interpreter is waiting for you to **close a brace**, so try } or ] or ) followed by enter. you may need to enter it a couple of times.

4. Clears the structure, topology definitions, and aliases, creating clean environment just like a new context.

   ```tcl
   psfcontext reset
   ```

5. 

6. select certain frames

   ```tcl
   atomselect top "within 5 of resname LYR" frame 23
   ```

7. Menu--Mouse--Center: pick an atom to center

8. path to plugins

   ```shell
   /usr/local/lib/vmd/plugins/noarch/tcl/
   ```

   maybe just `locate`

9. In the main menu, press the Save State button found in the File menu; this will bring up a browser window where you can enter a file name in which to save your work. 

10. VMD的快捷键等号，把当前显示的东西们center一下。

11. 

12. To know about your system, like checking the number of atoms, just load it into vmd (also when executing scripts) and see the cmd.

#### Tkconsole

1. resize font in TkConsole https://www.ks.uiuc.edu/Research/vmd/mailing_list/vmd-l/29151.html

   type in TkConsole: tkcon font <type> <size>

   ```
   tkcon font Courier 16
   ```

   size of the window is automatically changed. But font type not affected?

2. As for the global font: the higher resolution your screen is, the smaller your font is

   Maybe because the source code specifies pixels??

3. TkConsole auto-loads history file?

   https://www.ks.uiuc.edu/Research/vmd/mailing_list/vmd-l/8543.html

   Yeah, just about last 10 commands you typed, with the starting number 48. 强迫症犯了。。

   >    history command
   >
   >    https://www.tcl.tk/man/tcl8.4/TclCmd/history.html
   >
   >    ```tcl
   >    history clear
   >    ```
   >
   >    or Ctrl+r, but no use
   >
   >    ```tcl
   >    clear
   >    ```
   >
   >    just clears the screen



### Visualization

> references:
>
> - refer to [this](https://pengpengyang94.github.io/2020/05/vmd%E4%BD%BF%E7%94%A8%E7%AE%80%E5%8D%95%E8%AF%B4%E6%98%8E/) to make transparent surface+cartoon (material--Transparent) like in papers
> - labeling: https://chryswoods.com/dynamics/visualisation/picking.html

1. Graphics--Representations: for visualization.

   - Draw Style
     - Drawing Method 
       - Beta: temperature factor
   - Selected Atoms--Selection
     - frequently used
       - all, protein, nucleic, lipid, water (including monomers)
       - backbone, sidechain, ...
       - helix, sheet, ..
       - carbon, hydrogen, nitrogen, ...
     - `not` as logic? see more syntax in Selection--Marco definition
   - Periodic, 选择+X或-X体系在X反向的映象, 就可看到两条链处于一起了

2. Graphics--colors

   - Graphics--Colors--Categories (display)--background
   - other many settings, like element, residue, 2d structure. may set default color

3. Labeling a few atoms

   - Mouse--Label--Atoms (etc.). Mouse--Pick
   - Graphics--Labels, click on an atom, info shows up. 
   - Graphics--Color--Label--Atoms (etc)---choose your favorite color
   - Mouse--Label--Atoms (etc.). Mouse--Pick
   - Click on any atom and a piece of text will show up
   - Graphics--Labels--Properties (of the text)
   - Mouse--Rotate mode: exit labeling....

4. Graphics--Representations--Drawing Method

   Beta: we may not use that field. So we can replace it with some properties we computed and let VMD color atoms according to it

   But now it looks good in white if all beta is 0

5. Do not use Display--perspective (透视), choose orthographic projection (正射投影)

6. Drawing Method--HBond

7. 

8. VMD representation里面写变量$ligname是可以的

   ```tcl
   set ligname UDCA
   
   mol representation CPK 0.200000
   mol color Type
   mol selection {(protein or water) and (same residue as within 5 of residue $ligname)}
   mol material Opaque
   mol addrep top
   # update selection every frame
   mol selupdate 2 top 1
   mol colupdate 2 top 0
   
   pbc wrap -centersel "protein or residue ${ligname}" -compound segid -center com -all
   # align the protein
   package require rmsdtt
   # open the window
   set w [rmsdtt_tk_cb]
   $w.top.left.sel delete 1.0 end
   $w.top.left.sel insert end "protein"
   # set the states of checkboxes1
   set rmsdtt::trace_only 0
   set rmsdtt::noh 0
   set rmsdtt::bb_only 1
   # rmsdtt::set_sel  # verify selection
   rmsdtt::doAlign
   # change selection text
   $w.top.left.sel delete 1.0 end
   $w.top.left.sel insert end "residue ${ligname}"
   set rmsdtt::bb_only 0
   # set rmsdtt::xmgrace 1
   # set rmsdtt::multiplot 0
   set rmsdtt::plot_sw 1
   set rmsdtt::save_sw 1
   set rmsdtt::save_file sys-rmsd.dat
   rmsdtt::doRmsd
   ```

9. 

### other

The current VMD source code has been tested to compile with Python versions 2.4 to 2.6 on a few platforms. Don't use that....

[VMD启动时自动调整窗口的设置方法](https://www.bilibili.com/read/cv7167667)



## UCSF Chimera

- https://www.researchgate.net/post/How-to-re-number-the-chains-in-PDB-file

  select, Tools--structure editing--the last one

- favorites--side view. 显示/隐藏区域：通过调整蓝框中的两条黄线，显示或隐藏蛋白质的一部分区域. Just like rolling mouse wheel in pymol

- for UCSD DOCK? https://zhuanlan.zhihu.com/p/148384183

- 



## Gaussian & view

### Gaussian

1. segmentation violation

   成因：提供这种报错信息毫无意义，任何原因Gaussian报错退出都会有类似的输出。

   解决：**用文本编辑器打开输出文件**，如上图中为“a.out”文件，**拖到最后看最终报错**。Linux下也是如此，可用 nano, tail, cat, vi 等命令阅读文件。看到真正报错后，可按照相应信息（如下文中涉及的这些报错）进行解决。

2. 高斯软件出现PGFIO/stdio: No space left on device错误

   首先这不是高斯软件的问题，而是服务器的问题。当你的计算量太大或者服务器队列很满的话就有可能有这样的问题。这是个occasion的错误，重新提交任务有可能解决，不行就再提交，实在不行就问问你的服务器管理员。

3. specify log file

   ```shell
   nohup g16 qm.gau qm.log 2>&1 &
   ```

4. don't use too many CPU cores because g1 uses more than you think. use two if you have 8 CPU cores

5. 

### View

1. load pdb into it. Almost no changes in the position. But we are so familiar with modeling!

   > Try to make every bond and hydrogen right! Maybe Ar ring should be made into single-double-bond-interspaced.

   If you're to save as pdb, that's not necessary since only connection is saved. But mol2....?

2. One thing you MUST do after that is: unify the residue name (change for edited atoms). No need to assign unique atom names for CHARMM-GUI.

   or AutoPSF says sth like 'failed on end of segment' (my `modify_gv`)

## Other

### Avogadro

> an alternative for ChemBioOffice in Linux

[building-with-smiles](https://avogadro.cc/docs/building-molecules/building-with-smiles/): Build--Insert

output: File--Export--Molecule--xxx.pdb

https://avogadro.cc/docs/tools/draw-tool/

### DSV

may also edit small molecule and prepare for docking (usable?)

`Small Molecules` in the second line of menu. Also `Chemistry` in the 1st line. Delete in the 3rd line. 

May vary a bit if you `Clean Geometry` to optimize structure. 

Not as familiar as Gauss.

### ChemBioDraw

- 全选改字体（18），在file--document setting--Drawing改线宽，大概0.56（0.4倍粗体），就和Wikipedia的比较接近（平常不用加粗）。全选--右键--Object Settings也可以。

  ![image-20230119225838463](https://cdn.jsdelivr.net/gh/gxf1212/notes@master/techniques/images/chembiodraw-drawing)

- ChemDraw中内置多种模板，蛋白质支链模板是比较典型的一种了，通过模板可以快速添加蛋白质支链结构。而可以在Text tool或者模板工具中找到Templates（模板），然后选择Amino Acid Side Chain（蛋白质支链模板）即可。

- [怎样在ChemDraw中设置字体的默认格式？](https://www.sohu.com/a/104294282_395309)

- [ChemDraw如何一键对齐所有化合物结构](https://jingyan.baidu.com/article/86112f133bc47766379787b8.html)。对选中的右键也行

<img src="https://cdn.jsdelivr.net/gh/gxf1212/notes@master/MD/Common-tools.assets/CD_cheatsheet.png" alt="image.png" style="zoom: 60%;" />

# Modeling

or parametrization

## CHARMM-GUI

### LigandRM

or CgenFF

#### Basics

> if you want to perfectly retain its coordinates and atom names, use CGenFF server!
>
> oh...CHARMM-GUI slightly optimizes the coordinates. It doesn't matter.
>
> slightly different charge. I think remtp's params are closer to the paper.

but not used in method 1

> https://cgenff.umaryland.edu/  itself, the program to assign parameters for your ligand
>
> the "penalty score" is returned to the user as a measure for the accuracy of the approximation. in `.rtf`

Use CHARMM-GUI---input generator---ligand reader and modeller

refer to preparation videos mentioned above, and [the official one](https://www.bilibili.com/video/BV1bM4y1P7tB)

> **CHARMM GUI basic tips**
>
> - after GUI, the ligand/residue name is changed into LIG
> - Only molecules in the **HETATM** record in a PDB file are recognized.
> - **adopt available RCSB SDF structure** preferentially
> - make sure that the Marvin JS structure is correct
> - <font color=red>All hydrogen and missing atoms should be explicitly placed for accurate result.</font> or report error
>   - **edit the protonation states yourself!**
> - Users can modify the protonation state if necessary. 
>   - or select other protonation state in the next step
> - **The coordinates will be preserved if you upload .pdb file.**
>   - uploading your own .pdb file is suggested
>   - you can align .pdb files later, only it considers coordinates
>   - if you are to upload file, .mol2 is prefered? 
> - you may want to “Find similar residues in the CHARMM FF”, only when your ligand is special to be included in the ff...
> - 

then just click, click...and download all files



**attype warning: triple bonded non-nitrile nitrogen not supported; skipped molecule.**

## AmberTools



# Gromacs

1. check installation info

   ```shell
   gmx -version
   ```

2. 

## Common commands

### pdb2gmx

prepare the system

- 如果你是用GROMACS的话，pdb2gmx产生的蛋白拓扑文件时可以加上-his选项来人工选择各个组氨酸的质子化态

- https://manual.gromacs.org/documentation/2020-current/onlinehelp/gmx-pdb2gmx.html  add -ff folder. xx.ff, forcefield.itp in 

### make_ndx

https://manual.gromacs.org/documentation/current/onlinehelp/gmx-make_ndx.html

https://www.compchems.com/how-to-create-an-index-file-in-gromacs/#creating-a-new-index

type 'h' for help...

![make_ndx](https://cdn.jsdelivr.net/gh/gxf1212/notes@master/MD/Programming-for-MD.assets/make_ndx.png)

`-n index.ndx`: based on an existing index file

> 选区用于选择原子/分子/残基以进行后续分析. 与传统索引(index)文件不同, 选区可以是动态的, 即, 可以对轨迹中的不同帧选择不同的原子. GROMACS手册的第八章《分析》中有一小节对选区进行了简短的介绍, 并给出了一些建议. 当你初次接触选区概念时, 这些建议可帮助你熟悉它. 下面将就选区的技术细节和语法方面给出更加详细的说明.
> [在命令行中指定选区](https://jerkwin.github.io/GMX/GMXsel/#在命令行中指定选区)

## .mdp options and running

### vdw

use “switch”, Smoothly switches the potential to zero between rvdw-switch (page 211) and rvdw (page 212). i.e. a switching distance of 10 Å and a smooth cutoff distance of 12Å in the paper

With GPU-accelerated PME or with separate PME ranks, [gmx mdrun](https://manual.gromacs.org/documentation/2018/onlinehelp/gmx-mdrun.html#gmx-mdrun) will automatically tune the CPU/GPU load balance by scaling [`rcoulomb`](https://manual.gromacs.org/documentation/2018/user-guide/mdp-options.html#mdp-rcoulomb) and the grid spacing.



vdw and elec, common cutoff/switchdist

### trajectory

- gmx log file not that useful

  ```
  nstxout     = 0       ; save coordinates every 10.0 ps
  nstvout     = 0       ; save velocities every 1.0 ps
  nstenergy   = 0       ; save energies every 1.0 ps
  nstlog      = 5000    ; update log file every 10.0 ps
  ```

  in npt.mdp. nstlog=0 in em.mdp

- 



- gmx中断后保持步数? 

  http://bbs.keinsci.com/thread-17980-1-1.html

  https://blog.csdn.net/MurphyStar/article/details/113679744

  -extend. edit .tpr file and provide .cpt file

  > Fatal error: Cannot change a simulation algorithm during a checkpoint restart. Perhaps you should make a new .tpr with grompp -f new.mdp -t npt.cpt 

  The cpt file extension stands for portable checkpoint file. The complete state of the simulation is stored in the checkpoint file

  `gmx trjconv -f npt.cpt -s npt.tpr -o npt_cpt.gro`

  recover interrupted simulation, to get the .gro

- [gmx逐步放开限制：暴力修改`itp`文件](https://jerkwin.github.io/2017/10/20/GROMACS%E5%88%86%E5%AD%90%E5%8A%A8%E5%8A%9B%E5%AD%A6%E6%A8%A1%E6%8B%9F%E6%95%99%E7%A8%8B-%E5%A4%9A%E8%82%BD-%E8%9B%8B%E7%99%BD%E7%9B%B8%E4%BA%92%E4%BD%9C%E7%94%A8/#9-%E6%94%BE%E5%BC%80%E9%99%90%E5%88%B6-%E7%AC%AC%E4%BA%8C%E6%AC%A1%E9%A2%84%E5%B9%B3%E8%A1%A1)

## result









## other

notes to be classified

- 

- run consecutively

  ```shell
  sleep 6h && gmx mdrun ....  # if the first run uses 'nohup'
  ```

  or in a local machine

  ```shell
  namd3 ..... [Enter]
  namd3 .... # before job finishes
  ```

- 最好把本地机设成禁止自动suspend、black screen (gnome Settings--power)，否则跑着跑着无法看到图形界面。。

- 

- 

- In gromacs, chain names are lost!

- 

- doing MSA: cluster omega

- pocket alignment，最好只用pocket的原子

- 

- 

- 

- 

- [分子动力学模拟为什么会有先NVT后NVE？](http://bbs.keinsci.com/thread-9699-1-1.html)



# NAMD

and VMD and CHARMM FF



https://anaconda.org/conda-forge/psfgen



vmd自带的力场就是把TIP3的两个氢之间的bond注释掉



## other

https://www.cresset-group.com/software/flare/

like DSV





# Docking

## AutoDock Tools and vina






