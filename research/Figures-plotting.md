# Figures-plotting

- structure
- general figures

# Visualization of Structures

This part will include fundamentals of the tools as well as code for visualization examples. No specific pages for visualization and analysis alone for now. Maybe in the future.

## Basics

By default

- vmd aligns protein noh 
- pymol aligns protein Calpha 

be careful doing selection



pymol/vmd measurement in angstrom. gmx: nm!!!

https://manual.gromacs.org/documentation/current/onlinehelp/gmx-editconf.html#gmx-editconf

### PBC processing

#### gmx

[gmx trjconv - GROMACS documentation](https://manual.gromacs.org/current/onlinehelp/gmx-trjconv.html)

http://bbs.keinsci.com/thread-2085-1-1.html

http://blog.sciencenet.cn/blog-548663-981600.html

https://www.jianshu.com/p/5dc493663ed2

gmx generated trajectory, complex system, **must be processed by trjconv**. vmd pbc wrap doesn't work. 

However, nojump: coordinated water molecules are lost; in the original trajectory, protein goes across the pbc. What the fxxk doing clustering with gmx! 

However, pbc wrap does not always work with NAMD generated trajectories either...still we need to convert to `gmx` and even use `nojmp`

usually we use `gmx trjconv -pbc mol` or `whole` followed by `nojump`...

Zhaoqi has tried doing this with MDanalysis but it cannot easily write frames



`gmx trjconv -pbc mol`，是蛋白/lipid保持完整，中心水盒子位置不变（还有离子？）反正除了蛋白？都在水盒子之外。代价是蛋白不在中心水盒子，之前POC算的是错的

gmx不做处理，蛋白也全部在中心水盒子，代价是要跳过边界到另一边，蛋白全部被拉开。这种算POC应该也不对吧；pbc res也会被拉开

vmd处理pbc mol之后的：蛋白总是在水盒子中心，align之后就是蛋白不转水盒子转。可以用来算POC



#### VMD

[PBCTools Plugin](https://www.ks.uiuc.edu/Research/vmd/plugins/pbctools/)

```
-compound: Defines, which atom compounds should be kept together, i.e. which atoms will not be wrapped if a compound would be split by the wrapping: residues, segments or chains (default: -nocompound).

wrap means make the atoms into the unitcell

pbc unwrap -sel "protein"
means no jump?
```



`pbc wrap segid/residue`然后align，结果是**蛋白全部在水里**，盒子相应地平移（位置），应该还是按周期性挪过去的。align之后盒子才倾斜。

不知道为什么`pbc wrap -compound residue`才能让蛋白始终在中间，segid就只有水盒子的一个角在接触蛋白

> 还要吐槽vmd：存轨迹为xtc实现不了，先trr再转xtc



关于计算蛋白-离子的接触：

对于visualization，其实`pbc mol`就已经够了？看蛋白是够了，但要看离子还是wrap一下。

直接改变计算方式：反正gmx的水盒子都是沿着Cartesian axes的。存出来的轨迹和这样算出来结果大体相同，个别不一样。
改变计算方式的问题在于假定蛋白跑不出周围的26个盒子，pbc wrap是我不知道能否信任它

wrap之后还是得那么算呀，只是不用循环两次了
xtc算的还是小一点点
理论上是用vmd存的算更准
vmd轨迹基本是对的，就是小心离子跨过pbc



## Pymol

ref:

- [Visualizing protein-protein docking using PyMOL | by The Bioinformatics Manual | Medium](https://medium.com/@snippetsbio/visualizing-protein-protein-docking-using-pymol-cc49494e54bb)
- [pymol.org/tutorials](https://pymol.org/tutorials/)

### Basics

- mouse

  - left click: rotate
  - right click: zoom
  - middle and move: move
  - middle click: center this residue

### Selection

see more identifiers  https://pymolwiki.org/index.php/Selection_Algebra

- select atom name

  ```
  sele name HA
  ```

- select

  ```shell
  sele /object_name//chain_name/residue/atom_type
  # eg
  sele /2cqg//A/PHE`149/CZ
  ```

- If you click on where it says “Selecting: Residues”, you can cycle  through the available selection modes below.  These modes are also available from the “Mouse” menu under “Selection Mode”.   

  - Atoms
  - C-alphas
  - Molecules
  - Objects
  - Segments
  - Chains
  - Residues  

- You can use the command` show sticks, (byres [selection]) within 5 of [selection]` to show sticks of (residues) within 5 angstroms of a selection in PyMOL command line

- save

  - save as img

  - save session: to edit the next time

  - save a file

    <img src="E:\GitHub-repo\notes\research\MD-fundamentals.assets\pymol-save.jpg" style="zoom:67%;" />

### Action

- In PyMOL you can use A > align > all to this option to align all the open structures to a particular structure in a single step.

  https://www.researchgate.net/post/How_to_overlay_multiple_structures_in_Pymol

- align pocket in Pymol: https://pymolwiki.org/index.php/Focus_alignment

  pocket alignment，最好只用pocket的原子

- action--preset

  publication (different colors), simple (thin lines, ligands sticks), technical (H bonds), ligand (only ligand H bonds)

- You can use the center command in PyMOL command line to center atoms. The syntax for this command is `center [selection]`.

  - `zoom` or `orient` also do centering...

- action--rename, or `set_name object-name, new-name`

### Editing

1. Using Editing Mode to Move Atoms Now, please set the mouse mode to Editing, and CTRL-Left-drag on an atom.

2. renumber residues and fix names

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

3. 

### Label

- select atoms/residues and 

  ```python
  label sele, "%s%s" % (resn, resi)
  ```

- 

### View

1. pymol show contact residues http://shdf611.lofter.com/post/1cd0a1d0_a6e8874

2. s: show. as.

   - show as sticks: shows side chain

3. You can use positive numbers for point sizes or negative numbers for Angstrom-based sizes.

   [For example, to set the label size to 10pt, you can use the command](https://pymolwiki.org/index.php/Label_size)

   ```
   set label_size, 10
   ```

   https://pymolwiki.org/index.php/Label_size

   - label--residues vs hide--label

4. https://pymolwiki.org/index.php/Sphere_scale

5. `bg_color white`...

   opaque off, then type `ray`

6. set cartoon_fancy_helices/sheets, 0/1

7. set cartoon_side_chain_helper, on

   remove the sticks of main chain 

8. center

   ```
   center object
   ```

9. beautify and set background

   https://zhuanlan.zhihu.com/p/26325764

   display--background--white

   right click--ray

10. https://pymolwiki.org/index.php/Rock

11. 按insert键等价于命令rock

12. advanced: [Displaying Biochemical Properties - PyMOLWiki](https://pymolwiki.org/index.php/Displaying_Biochemical_Properties). show valance, secondary structure, surface, etc.

13. pymol中按住shift可以框选
    picking atoms模式下才能拖拽原子etc


### cmd & API

1. [PyMOL how to run scripts](https://pymol.org/tutorials/scripting/howtorunscripts.html)

   ```shell
   # run a PyMOL command script (opens PyMOL GUI)
   pymol script.pml
   # run a Python script
   pymol script.py
   # batch mode (no PyMOL GUI)
   pymol -c script.pml
   # use absolute path if "pymol" is not in $PATH
   /opt/pymol-2.2.3/pymol -c script.pml
   ```

2. pymol save session as a script: impossible now. write `.pml` file yourself and 

   ```shell
   pymol xx.pml
   ```

3. `cd directory`

4. delete命令！

5. must use cmd to align small molecules (not always use)

   ```
   align mol1, mol2
   ```

6. api: https://pymol.org/dokuwiki/doku.php?id=api:cmd:alpha  https://pymol.org/pymol-command-ref.html. for other commands we have to view documentation in pycharm



### plugin

- PyMod 3 is an open source PyMOL plugin, designed to act as an interface between PyMOL and several bioinformatics tools (for example: BLAST+, HMMER, Clustal Omega, MUSCLE, PSIPRED and MODELLER).
- https://pymolwiki.org/index.php/Mcsalign  align ligand?

> a website to draw electrostatic potential surface: https://server.poissonboltzmann.org. Seeing a blank web page suggests a bad network. 



## VMD

杂记, some extra functions, that I encountered. for details, check vmd-ug.pdf or [MD-tutorials](Previous-projects/MD-tutorials-all.md)

### Basics

#### Visualization

> not all 点点点的操作
>
> references:
>
> - refer to [this](https://pengpengyang94.github.io/2020/05/vmd%E4%BD%BF%E7%94%A8%E7%AE%80%E5%8D%95%E8%AF%B4%E6%98%8E/) to make transparent surface+cartoon (material--Transparent) like in papers
> - labeling: https://chryswoods.com/dynamics/visualisation/picking.html

1. Extensions---VMD preferences---Write Settings to VMDRC

   [VMD启动时自动调整窗口的设置方法](https://www.bilibili.com/read/cv7167667)

   Not useful in new Fedora system (2023.8)? see [VMD-L Mailing List (uiuc.edu)](https://www.ks.uiuc.edu/Research/vmd/mailing_list/vmd-l/24413.html)

   Press "Push Menus" after vmd startup for other windows

   For OpenGL Display, just set it here...

   ![](https://cdn.jsdelivr.net/gh/gxf1212/notes@master/research/MD-fundamentals.assets/vmd-display.jpg)

2. Graphics--Representations: for visualization.

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

3. Graphics--colors

   - Graphics--Colors--Categories (display)--background
   - other many settings, like element, residue, 2d structure. may set default color

4. Labeling a few atoms

   - Mouse--Label--Atoms (etc.). Mouse--Pick
   - Graphics--Labels, click on an atom, info shows up. 
   - Graphics--Color--Label--Atoms (etc)---choose your favorite color
   - Mouse--Label--Atoms (etc.). Mouse--Pick
   - Click on any atom and a piece of text will show up
   - Graphics--Labels--Properties (of the text)
   - Mouse--Rotate mode: exit labeling....

5. Graphics--Representations--Drawing Method

   Beta: we may not use that field. So we can replace it with some properties we computed and let VMD color atoms according to it

   But now it looks good in white if all beta is 0

6. Do not use Display--perspective (透视), choose orthographic projection (正射投影)

7. Drawing Method--HBond

8. https://www.ks.uiuc.edu/Research/vmd/current/ug/node33.html

   label bonds in vmd, it shows distance automatically

   set label colors

   <img src="https://cdn.jsdelivr.net/gh/gxf1212/notes@master/research/MD-fundamentals.assets/color-bond.png" alt="color-bond" style="zoom:20%;" />

9. VMD representation里面写变量`$ligname`只是不报错，还是得手动改

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

10. Distance, angle, dihedral measurements: To begin a measurement, use the right-mouse button (or the left-mouse button and the Control key/Control key and mouse click) to select 1, 2, 3 or 4 atoms. Complete the measurement by selecting the final atom twice. Depending on how many atoms are selected, the distance (2 atoms), the angle (3 atoms) or the dihedral angle (4 atoms) is measured and displayed. Deselect all atoms with a right-click in empty space. To remove a measurement, re-select all involved atoms and then the last atom twice in a row.

    ? see [VMD Measurements: Analyze Distances and Angles with VMD - Compchems](https://www.compchems.com/vmd-measurements-analyze-distances-and-angles-with-vmd/#simplifying-your-vmd-display-removing-labels)

11. In the main menu, press the Save State button found in the File menu; this will bring up a browser window where you can enter a file name in which to save your work. 

12. VMD的快捷键等号，把当前显示的东西们center一下。

13. Menu--Mouse--Center: pick an atom to center

14. 比如第8200帧相对于第8100帧出现了RMSD的巨大升高，想弄清楚结构什么地方发生了怎样的巨大变化，在VMD的Graphics - Representation里选Trajectory标签页，在Draw Multiple Frames里输入`8100:100:8200`，并且把Coloring Method设为Trajectory - Timestep，这样这两帧就会用不同颜色一起显示出来便于比较在哪里结构有明显变化。

    http://sobereva.com/627

15. 

16. 

17. [vmd粗粒化显示插件bendix简单介绍](https://kangsgo.cn/p/vmd粗粒化显示插件bendix简单介绍/)

#### Scripting

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

#### Selection

1. 在VMD的`atomselect`命令中，您可以使用Tcl变量替换来引用变量的值。例如，如果您已经定义了一个名为`my_variable`的变量并将其值设置为`5`，则可以使用以下命令在`atomselect`命令中引用该变量的值（不要加"{}"）：

   ```tcl
   set sel [atomselect top "resid $my_variable"]
   ```

   This also works for RMSD Trajectory Tool (`$resid` is just replaced), 但创建representation时仍不行？It just doesn't interpret the variable

   ```tcl
   set resid 34
   puts "
   mol representation Licorice 0.200000 12.000000 12.000000
   mol color Type
   mol selection {resid $resid}
   mol material Opaque
   mol addrep top
   
   mol representation CPK 0.200000
   mol color Type
   mol selection {same residue as within 5 of resid $resid}
   mol material Opaque
   mol addrep top
   # update selection every frame
   mol selupdate 2 top 1
   mol colupdate 2 top 0
   "
   ```

   or cover with "{}"

2. select certain frames

   ```tcl
   atomselect top "within 5 of resname LYR" frame 23
   ```

3. 



#### Trajectory

```tcl
# load
mol addfile
# write
animate write xx.dcd
```





![](E:\GitHub-repo\notes\research\MD-fundamentals.assets\save-mdcrd.png)



#### about Tkconsole

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



#### Movie

1. trajectory view

   ```tcl
   MovieMaker::moviemaker
   # install netpbm
   # set MovieMaker::presmooth 1
   # set MovieMaker::prescale 1
   set MovieMaker::movieformat imgif
   set MovieMaker::framerate 30
   set MovieMaker::workdir ./
   set MovieMaker::basename movie
   set MovieMaker::trjstep 20
   set MovieMaker::renderer libtachyon
   set MovieMaker::movietype trajectory
   ```

   manually edit trjstep again or it's not updated...

2. [VMD制作体系旋转演示播放轨迹的gif动画的简单方法 - 思想家公社的门口：量子化学·分子模拟·二次元 (sobereva.com)](http://sobereva.com/15)



### Extensions

path to plugins

```shell
$VMDPATH/lib/vmd/plugins/noarch/tcl/
```

maybe just `locate`

#### psfgen

1. Clears the structure, topology definitions, and aliases, creating clean environment just like a new context.

   ```tcl
   psfcontext reset
   ```

2. 

#### RMSD trajecoty tool

rmsdtt in abbreviation

#### Timeline

http://www.ks.uiuc.edu/Research/vmd/plugins/timeline/

https://www.ks.uiuc.edu/Training/Tutorials/science/timeline/tutorial_timeline-html/

https://www.ks.uiuc.edu/Training/Tutorials/science/timeline/tutorial_timeline.pdf

It can calculate Secondary structure, RMSD, RMSF, angle, dihedral, SASA, contacts (H bond, salt bridge), user-defined fields/selections, etc.

- https://www.researchgate.net/post/How-can-I-calculate-the-RMSF-of-a-protein-in-VMD

  IN VMD toolbar, Extensions > Analysis > timeline > calculate > calc. RMSF

  also click 'every residue', and then File > Write data. Align your protein in advance

  <img src="E:\GitHub-repo\notes\research\MD-fundamentals.assets\vmd-rmsf.jpg" style="zoom: 67%;" />

  view structure and RMSF simultanously

  But it seems to give RMSD at all time points...??

- 



### Other

- To know about your system, like checking the number of atoms, just load it into vmd (also when executing scripts) and see the cmd.

- The current VMD source code has been tested to compile with Python versions 2.4 to 2.6 on a few platforms. Don't use that....

- mdcrd

  ![](E:\GitHub-repo\notes\research\MD-fundamentals.assets\vmd-mdcrd.png)

- 

## UCSF Chimera(X)

- https://www.researchgate.net/post/How-to-re-number-the-chains-in-PDB-file

  select, Tools--structure editing--the last one

- favorites--side view. 显示/隐藏区域：通过调整蓝框中的两条黄线，显示或隐藏蛋白质的一部分区域. Just like rolling mouse wheel in pymol

- for UCSD DOCK? https://zhuanlan.zhihu.com/p/148384183

- Tools---structural editing---rotamers: mutate residues

- mutate a residue:

  ```Bash
  sel #0:50
  swapaa ARG #0:50
  ```

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

## ChemBioDraw

### Font

- 全选改字体（18），在file--document setting--Drawing改线宽，大概0.56（0.4倍粗体），就和Wikipedia的比较接近（平常不用加粗）。全选--右键--Object Settings也可以。

  ![](https://cdn.jsdelivr.net/gh/gxf1212/notes@master/research/MD-fundamentals.assets/chembiodraw-drawing.png)

- [怎样在ChemDraw中设置字体的默认格式？](https://www.sohu.com/a/104294282_395309)

- 

### Drawing

- ChemDraw中内置多种模板，蛋白质支链模板是比较典型的一种了，通过模板可以快速添加蛋白质支链结构。而可以在Text tool或者模板工具中找到Templates（模板），然后选择Amino Acid Side Chain（蛋白质支链模板）即可。

- 

- [ChemDraw如何一键对齐所有化合物结构](https://jingyan.baidu.com/article/86112f133bc47766379787b8.html)。对选中的右键也行

- 选中碳，在ChemDraw的“Object”菜单中选择“Show Stereochemistry”，它会自动在手性碳上显示其正确构型。

- 从“Structure”菜单中，选择“Clean Up Structure”命令，结构将被规范化

  https://www.chemdraw.com.cn/ruheshiyong/jiegou-zhengli.html

- 组合多个对象：选中多个对象，Ctrl+G



### Cheat sheet

<img src="https://cdn.jsdelivr.net/gh/gxf1212/notes@master/research/MD-fundamentals.assets/CD_cheatsheet.png" alt="image.png" style="zoom: 60%;" />

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

https://www.cresset-group.com/software/flare/

like DSV

# General figures





流程图 (e.g. NN framework)：

[draw.io (diagrams.net)](https://app.diagrams.net/)

[迅捷画图-专业的在线作图网站,在线画思维导图、流程图 (liuchengtu.com)](https://www.liuchengtu.com/)



