# Common Tools

see [here](/techniques/Prepare-for-the-computer.md) for installation

this page also includes usage of pymol, vmd, gmx, etc.

# Visualization & Modeling

This part will include fundamentals of the tools as well as code for visualization examples. No specific pages for visualization and analysis alone for now. Maybe in the future.

## Basics

By default

- vmd aligns protein noh 
- pymol aligns protein Calpha 

be careful doing selection



pymol/vmd measurement in angstrom. gmx: nm!!!

https://manual.gromacs.org/documentation/current/onlinehelp/gmx-editconf.html#gmx-editconf

## Pymol

ref:

- [Visualizing protein-protein docking using PyMOL | by The Bioinformatics Manual | Medium](https://medium.com/@snippetsbio/visualizing-protein-protein-docking-using-pymol-cc49494e54bb)

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

### Action

- In PyMOL you can use A > align > all to this option to align all the open structures to a particular structure in a single step.

  https://www.researchgate.net/post/How_to_overlay_multiple_structures_in_Pymol

- align pocket in Pymol: https://pymolwiki.org/index.php/Focus_alignment

  pocket alignment，最好只用pocket的原子

- action--preset

  publication (different colors), simple (thin lines, ligands sticks), technical (H bonds), ligand (only ligand H bonds)
  
- You can use the center command in PyMOL command line to center atoms. The syntax for this command is `center [selection]`.

  - `zoom` or `orient` also do centering...

- 

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

11. 

### cmd & API

1. pymol save session as a script: impossible now. write `.pml` file yourself and 

   ```shell
   pymol xx.pml
   ```

2. `cd directory`

3. delete命令！

4. must use cmd to align small molecules

   ```
   align mol1,mol2
   ```

5. api: https://pymol.org/dokuwiki/doku.php?id=api:cmd:alpha  https://pymol.org/pymol-command-ref.html. for other commands we have to view documentation in pycharm



### plugin

a website to draw electrostatic potential surface: https://server.poissonboltzmann.org. Seeing a blank web page suggests a bad network.









## VMD

杂记, some extra functions, that I encountered. for details, check vmd-ug.pdf or [MD-tutorials.md](MD-tutorials.md)

### Scripts

#### Basics

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

4. 在VMD的`atomselect`命令中，您可以使用Tcl变量替换来引用变量的值。例如，如果您已经定义了一个名为`my_variable`的变量并将其值设置为`5`，则可以使用以下命令在`atomselect`命令中引用该变量的值（不要加"{}"）：

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

5. 

6. 

7. select certain frames

   ```tcl
   atomselect top "within 5 of resname LYR" frame 23
   ```

8. 

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

点点点的操作

> references:
>
> - refer to [this](https://pengpengyang94.github.io/2020/05/vmd%E4%BD%BF%E7%94%A8%E7%AE%80%E5%8D%95%E8%AF%B4%E6%98%8E/) to make transparent surface+cartoon (material--Transparent) like in papers
> - labeling: https://chryswoods.com/dynamics/visualisation/picking.html

1. Extensions---VMD preferences---Write Settings to VMDRC

   [VMD启动时自动调整窗口的设置方法](https://www.bilibili.com/read/cv7167667)

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

9. https://www.ks.uiuc.edu/Research/vmd/current/ug/node33.html

   label bonds in vmd, it shows distance automatically

   set label colors

   <img src="https://cdn.jsdelivr.net/gh/gxf1212/notes@master/research/Common-tools.assets/color-bond.png" alt="color-bond" style="zoom:20%;" />

10. VMD representation里面写变量$ligname只是不报错，还是得手动改

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

11. Distance, angle, dihedral measurements: To begin a measurement, use the right-mouse button (or the left-mouse button and the Control key/Control key and mouse click) to select 1, 2, 3 or 4 atoms. Complete the measurement by selecting the final atom twice. Depending on how many atoms are selected, the distance (2 atoms), the angle (3 atoms) or the dihedral angle (4 atoms) is measured and displayed. Deselect all atoms with a right-click in empty space. To remove a measurement, re-select all involved atoms and then the last atom twice in a row.

    ? see [VMD Measurements: Analyze Distances and Angles with VMD - Compchems](https://www.compchems.com/vmd-measurements-analyze-distances-and-angles-with-vmd/#simplifying-your-vmd-display-removing-labels)

12. In the main menu, press the Save State button found in the File menu; this will bring up a browser window where you can enter a file name in which to save your work. 

13. VMD的快捷键等号，把当前显示的东西们center一下。

14. Menu--Mouse--Center: pick an atom to center

15. [vmd粗粒化显示插件bendix简单介绍](https://kangsgo.cn/p/vmd粗粒化显示插件bendix简单介绍/)

### psfgen

1. Clears the structure, topology definitions, and aliases, creating clean environment just like a new context.

   ```tcl
   psfcontext reset
   ```

2. 

### PBC processing

http://bbs.keinsci.com/thread-2085-1-1.html

gmx generated trajectory, must be processed by trjconv nojump. vmd pbc wrap doesn't work. However, coordinated water molecules are lost; in the original trajectory, protein goes across the pbc. What fxxk doing clustering with gmx! 

usually we use -pbc mol...



### Other

- path to plugins

  ```shell
  /usr/local/lib/vmd/plugins/noarch/tcl/
  ```

  maybe just `locate`

- To know about your system, like checking the number of atoms, just load it into vmd (also when executing scripts) and see the cmd.

- The current VMD source code has been tested to compile with Python versions 2.4 to 2.6 on a few platforms. Don't use that....

- 

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

## ChemBioDraw

### Font

- 全选改字体（18），在file--document setting--Drawing改线宽，大概0.56（0.4倍粗体），就和Wikipedia的比较接近（平常不用加粗）。全选--右键--Object Settings也可以。

  ![image-20230119225838463](https://cdn.jsdelivr.net/gh/gxf1212/notes@master/research/Common-tools.assets/chembiodraw-drawing.png)

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

<img src="https://cdn.jsdelivr.net/gh/gxf1212/notes@master/research/Common-tools.assets/CD_cheatsheet.png" alt="image.png" style="zoom: 60%;" />

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



# Molecular dynamics

Maybe copying some fundamentals of NAMD (file format) from FYP-notes.

This part is about general MD and comparison between common MD engines. These contents are similar to [academic notes](academic-notes.md). We put it here temporarily.

## Force field

### Support

- [AMBER、GROMOS、OPLS、CHARMM最新版本的GROMACS力场包 - 分子模拟 (Molecular Modeling) - 计算化学公社](http://bbs.keinsci.com/thread-15094-1-1.html)

  amber14sb_OL15.ff_corrected-Na-cation-params.tar.gz

  possible problem:

  - [grompp 出現報錯：No default Improper Dih. types - 分子模拟 (Molecular Modeling) - 计算化学公社](http://bbs.keinsci.com/thread-25936-1-1.html)
  - [amber14SB力场报错“No default Improper Dih. types”的解决办法](https://zhuanlan.zhihu.com/p/389786141)
  - or [Fixing bugs in FF14SB port for Gromacs](http://zhenglz.blogspot.com/2017/05/fixing-bugs-in-ff14sb-port-for-gromacs.html)

- CHAMBER: Comprehensive support for CHARMM force fields within the AMBER software

  CHAMBER is part of ParmEd, and parmed is part of AmberTools

  pmemd supports charmm FF?

- 
  
- 



### Water

- vmd自带的力场就是把TIP3的两个氢之间的bond注释掉
- 

rename O to OH2 and HOH to TIP3 if you are using NAMD/CHARMM
many other more H names in Amber/PDB cannot be renamed easily...

Maybe remove all hydrogens and let tleap/vmd fix missing H.



### Unit

- gmx: https://manual.gromacs.org/documentation/current/reference-manual/topologies/topology-file-formats.html
- 

#### LJ parameters

namd用的是和tleap一样的kcal和Rmin



Amber FF (tleap)，nonbon板块的距离（$r_e$的一半，Å）*2除以$\sqrt[6]{2}$等于gromacs的top文件的距离（σ, nm）
能量都是ε，Amber单位是kcal，top文件单位是kJ



vdW parameters

|                   | distance        | unit | $\varepsilon$ unit |
| ----------------- | --------------- | ---- | ------------------ |
| Gromacs .top file | σ               | nm   | kJ/mol             |
| tleap             | R<sub>min</sub> | Å    | kcal/mol           |
| CHARMM .rtf/psf   | R<sub>min</sub> | Å    | kcal/mol           |
|                   |                 |      |                    |
|                   |                 |      |                    |



Amber parmed check
$$
C_6=4\varepsilon\sigma^6\\
C_{12}=4\varepsilon\sigma^{12}
$$

#### Other

- `restraint_wt`: The weight (kcal · mol<sup>−1</sup> · Å<sup>−2</sup>) for Cartesian restraints when ntr = 1.

  restraint_wt=10/4.18 is roughly the same as gromacs 1000 (kJ · mol<sup>−1</sup> · nm<sup>−2</sup>) [reference](https://manual.gromacs.org/documentation/current/reference-manual/topologies/topology-file-formats.html)
  
- RT:

  - 300K: 2.4942 kJ/mol, 0.596 kcal/mol, kT: 0.414 kJ/molecule
  - 310K: 2.57734 kJ/mol, 0.616 kcal/mol, kT: 0.4278 kJ/molecule
  
  we don't use kT in macroscopic world (or the final dG data)? 
  
  
  
  



### Other

- CgenFF: epsilon F<Cl<Br<S
- For C=O and COO-, Amber14 is a little more polarized than CHARMM36.



## Algorithm & special

### Basic

[分子动力学模拟为什么会有先NVT后NVE？](http://bbs.keinsci.com/thread-9699-1-1.html)

The nature of molecular dynamics is such that the course of the  calculation is very dependent on the order of arithmetical operations  and the machine arithmetic implementation, i.e., the method used for  round-off. Because each step of the calculation depends on the results  of the previous step, the slightest difference will eventually lead to a divergence in trajectories. As an initially identical dynamics run  progresses on two different machines, the trajectories will eventually  become completely uncorrelated. Neither of them are "wrong;" they are  just exploring different regions of phase space. Hence, states at the  end of long simulations are not very useful for verifying correctness.  Averages are meaningful, provided that normal statistical fluctuations  are taken into account. "Different machines" in this context means any  difference in floating point hardware, word size, or rounding modes, as  well as any differences in compilers or libraries. Differences in the  order of arithmetic operations will affect round-off behavior; (a + b) + c is not necessarily the same as a + (b + c). Different optimization  levels will affect operation order, and may therefore affect the course  of the calculations.

> from Amber manual

<img src="E:\GitHub-repo\notes\research\Common-tools.assets\nvt-npt.png" alt="1689997407699" style="zoom: 80%;" />

### Control

1. [center-of-mass-motion](https://manual.gromacs.org/current/reference-manual/algorithms/molecular-dynamics.html#center-of-mass-motion)

   The center-of-mass velocity is normally set to zero at every step...If such changes are not quenched, an appreciable center-of-mass motion can develop in long runs, and the temperature will be significantly misinterpreted. 

   Something similar may happen due to overall rotational motion, but only when an isolated cluster is simulated. In periodic systems with filled boxes, the overall rotational motion is coupled to other degrees of freedom and does not cause such problems.

   we may usually see

   ```
   Removing center of mass motion in the presence of position restraints
     might cause artifacts. When you are using position restraints to
     equilibrate a macro-molecule, the artifacts are usually negligible.
   ```

2. Note that mdrun will redetermine rlist based on the actual pair-list setup

3. 

4. 

### Pressure control

1. [C-rescale](https://manual.gromacs.org/documentation/current/user-guide/mdp-options.html#mdp-value-pcoupl-C-rescale) in gmx

2. http://www.sklogwiki.org/SklogWiki/index.php/Berendsen_barostat

    in newer gmx:

    ```
    The Berendsen barostat does not generate any strictly correct ensemble,
    and should not be used for new production simulations (in our opinion).
    For isotropic scaling we would recommend the C-rescale barostat that also
    ensures fast relaxation without oscillations, and for anisotropic scaling
    you likely want to use the Parrinello-Rahman barostat.
    ```

    Amber: Berendsen Barostat converges fast and is generally well-behaving, but gives you wrong sampling.

3. Berendsen thermostat is very efficient in equilibrating the system. However, it does not sample the exact NPT statistical ensemble. Recently several efficient Monte Carlo methods have been introduced. Monte Carlo pressure control samples volume fluctuations at a predefined number of steps at a given constant external pressure. It involves generation of a random volume change from a uniform distribution followed by evaluation of the potential energy of the trial system. The volume move is then accepted with the standard Monte-Carlo probability.

    It's possible that it may take a while for the MC barostat to find an effective step size. But it is actually a more rigorously correct barostat. And quite a bit faster for pmemd.cuda.

    https://computecanada.github.io/molmodsim-md-theory-lesson-novice/08-barostats/index.html

4. 



![U2@WL5VJQVCP9WN@VO~F7GA](E:\GitHub-repo\notes\research\Common-tools.assets\pcontrol.png)

## Restraint

在GROMACS中，SHAKE算法用于对键和角施加约束，以固定它们的长度或角度。而restraint则是一种更广泛的概念，它可以用来对模拟中的各种属性施加约束。



### Free energy calculations

[Free energy calculations - GROMACS documentation](https://manual.gromacs.org/documentation/current/reference-manual/algorithms/free-energy-calculations.html)

In GROMACS, FEP calculations are performed by running a series of simulations at different values of the coupling parameter λ, which controls the transformation between the two states. During each simulation, the system is sampled at a fixed value of λ, and the energies of the neighboring states are calculated. [These energies are then used to estimate the free energy difference between the two states using techniques such as Bennett acceptance ratio or thermodynamic integration](https://manual.gromacs.org/current/reference-manual/special/free-energy-implementation.html).

In NAMD, FEP calculations can be performed using either the “alchemical” or “slow growth” methods. In the alchemical method, the system is gradually transformed from one state to another by changing the value of λ during the simulation. [In each window, the value of λ is gradually changed from one value to another, and the free energy difference is estimated using techniques such as thermodynamic integration](https://www.ks.uiuc.edu/Research/namd/2.13/features.html).

> it seems right....and namd doesn't sample the last window.
>
> Also strangely, Kevin's gmx FEP decomposition script also ignores the last window.

http://ambermd.org/tutorials/advanced/tutorial9/#overview

Within the TI region there will be atoms which are linearly transformed (LTA) directly from one atom type into another in a "**single–topology**" fashion and thus share coordinates (black atoms). Disappearing or appearing atoms are treated in a special way with "softcore" potentials (SCA) but in principal any atom can be defined as softcore atom depending on the user's needs. These atoms do not "see" each other that is no interaction will ever be calculated between them (blue atom for benzene and green atoms for phenol, the number labels are the respective atom indices).





## GPU

Read this: https://ambermd.org/GPULogistics.php

and 22.6.7. Considerations for Maximizing GPU Performance

> [see also: NAMD GPU tutorial](/research/Previous-projects/MD-tutorials-all.md#gpu-tutorial). combine these two?

- While this full double precision approach has been implemented in the GPU code (read on), it gives very poor performance and so the default precision model used when running on GPUs is a combination of single and fixed precision, termed hybrid precision (SPFP).

  <u>We recommend using the CPU code for energy minimization.</u> One limitation of either GPU precision model is that forces can be truncated or, in the worst case, **overflow** the fixed precision representation. This should never be a problem during MD simulations for any well behaved system. However, for minimization or very early in the heating phase it can present a problem. This is especially true if two atoms are close to each other and thus have <u>large VDW repulsions</u>.

- Due to certain aspects of our GPU pair list operation, we have found that it is unsafe to run simulations that are <u>less than three times the non-bonded cutoff in any given direction</u>, and these cases will be trapped with an error message until a fix can be implemented. Furthermore, the pair list is only designed once on the current GPU implementation and may become invalid if the <u>simulation box shrinks too drastically</u>, as may happen in systems that have not undergone pressure equilibration.

  In summary, GPU is better for large systems but can cause problems for small systems.

- If you encounter problems during a simulation on the GPU you should first try to run the identical simulation on the CPU to ensure that it is not your simulation setup causing the problems.

- Anton的硬件架构被设计成能够快速执行分子动力学相关的计算，但它并不包含将代码写入硬件的过程。代码仍然是在处理器上运行的，只不过这些处理器被设计成能够快速执行特定类型的计算。如并行、快速数据传输等。



## Performance

https://developer.nvidia.com/hpc-application-performance

several benchmark data

Amber≈Gromacs>NAMD?

Typically the performance differential between GPU and CPU runs will increase as atom count increases.





## Other



# Gromacs

This section is about basics and common usage. For more (theory, concepts), see other pages about specific systems and applications.



1. check installation info

   ```shell
   gmx -version
   ```

2. In gromacs, chain names are lost?!

## Modeling

### pdb2gmx

prepare the system

- The protonation state of N- and C-termini can be chosen interactively with the `-ter` flag.

- pdb2gmx产生的蛋白拓扑文件时可以加上`-his`选项来人工选择各个组氨酸的质子化态

- `-ter` option for termini (only useful for proteins)

- https://manual.gromacs.org/documentation/2020-current/onlinehelp/gmx-pdb2gmx.html  add -ff folder. xx.ff, forcefield.itp in 

- `pdb2gmx` can recognize terminal residue's COO^-^ if chain ID is assigned

Force field

- source: local directory, installation top folder, `GMXLIB` variable

- 

### topology file

[defaults]是1-4 scaling之类的东西，不同力场不一样



### editconf

- https://gromacs.bioexcel.eu/t/merging-two-gro-files/2960/2 editconf converts between .pdb and .gro (etc.) freely

### make_ndx

https://manual.gromacs.org/documentation/current/onlinehelp/gmx-make_ndx.html

https://www.compchems.com/how-to-create-an-index-file-in-gromacs/#creating-a-new-index

type 'h' for help...

![make_ndx](https://cdn.jsdelivr.net/gh/gxf1212/notes@master/research/Programming-for-MD.assets/make_ndx.png)

`-n index.ndx`: based on an existing index file

> 选区用于选择原子/分子/残基以进行后续分析. 与传统索引(index)文件不同, 选区可以是动态的, 即, 可以对轨迹中的不同帧选择不同的原子. GROMACS手册的第八章《分析》中有一小节对选区进行了简短的介绍, 并给出了一些建议. 当你初次接触选区概念时, 这些建议可帮助你熟悉它. 下面将就选区的技术细节和语法方面给出更加详细的说明.
> [在命令行中指定选区](https://jerkwin.github.io/GMX/GMXsel/#在命令行中指定选区)

## minimization

- For efficient BFGS minimization, use switch/shift/pme instead of cut-off.

## mdrun and .mdp options

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



`mdout.mdp`: all arguments actually used. help with debugging....



### Free energy

- [Free energy interactions - GROMACS documentation](https://manual.gromacs.org/documentation/current/reference-manual/functions/free-energy-interactions.html)

  Gromacs perturbs every parameter.

- We don't need to define `couple-moltype`, `couple-lambda0`, `couple-lambda1`, and `couple-intramol` if we've defined B state. The couple parameters are for solvation free-energies.

- it is simpler to do everything with a single lambda setup without the lambda for interaction types.

- Dummy atoms have epsilon and q both in zero, so no worry



## trjconv

### Basics

- `-dt`: not real time, but how many frames we go through each time we collect one frame
- Using `-cat`, you can simply paste several files together without removal of frames with identical time stamps.

### pbc processing

http://blog.sciencenet.cn/blog-548663-981600.html

https://www.jianshu.com/p/5dc493663ed2







## other

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



## debug

### general and notes

- https://gromacs.org-gmx-users.maillist.sys.kth.narkive.com/J6lqsB6H/gmx-users-increasing-cut-off-and-pme-grid-spacing
  box too big!

- 

- does not matter for ions?

  ```
  NOTE 1 [file pro.top, line 195053]:
    In moleculetype 'system' 112 atoms are not bound by a potential or
    constraint to any other atom in the same moleculetype. Although
    technically this might not cause issues in a simulation, this often means
    that the user forgot to add a bond/potential/constraint or put multiple
    molecules in the same moleculetype definition by mistake. Run with -v to
    get information for each atom.
  ```

  [Atoms are not bound by a potential or constraint to any other atom in the same moleculetype - User discussions - GROMACS forums (bioexcel.eu)](https://gromacs.bioexcel.eu/t/atoms-are-not-bound-by-a-potential-or-constraint-to-any-other-atom-in-the-same-moleculetype/3510/2)

  It depends on whether the force field model you’ve chosen can maintain appropriate Zn2+ coordination relying solely on nonbonded interactions. This is not often the case with simple additive, monoatomic representations of these species.

- I don't know....

  ```
  With PME there is a minor soft core effect present at the cut-off,
    proportional to (LJsigma/rcoulomb)^6. This could have a minor effect on
    energy conservation, but usually other effects dominate. With a common
    sigma value of 0.34 nm the fraction of the particle-particle potential at
    the cut-off at lambda=0.5 is around 2.2e-05, while ewald-rtol is 1.0e-06.
  ```

- 至哥说有时候小体系会出这个问题，调一下核数就行。只要不影响运行就行

  ```
  NOTE: The number of threads is not equal to the number of (logical) cpus
     and the -pin option is set to auto: will not pin threads to cpus.
     This can lead to significant performance degradation.
     Consider using -pin on (and -pinoffset in case you run multiple jobs).'
  ```

- 





# NAMD and Amber

and VMD and CHARMM FF? I don't feel too much to say since they are just responsible for running MD (refer to pmemd as Amber)... so just put (common/fundamental) debug experiences here (no system-specific debug?...).



## NAMD 

### Basics





### Debug

- FATAL ERROR: Atom 9 has bad hydrogen group size.  Check for duplicate bonds. 居然是vmd1.9.3的锅

- I'm running MD simulation of a protein-ligand system (pdb id: 5tbm) with NAMD3 and CHARMM36/CgenFF force field. I removed extra components (except a water molecule near the ligand binding site which forms hydrogen bonds), and fixed the protein structure. After minimization, NVT, NPT with restrain, and NPT equilibration, everything went well. Then I performed 100ns MD simulation (delta t is 1 femtosecond), following by a 500ns MD simulation (delta t is 2 femtosecond). However, the latter simulation reports the following error after 200~300ns:
  Error: atoms moving too fast at timestep 107643652; simulation has become unstable (0 atoms at pe 0).
  FATAL ERROR:SequencerCUDA: Atoms moving too fast.
  Only one of three simulations survive. I'm setting rigidbonds to all.
  The structure looks fine until the last frame recorded. I didn't find the initial structure unstable. Nor does bonds break apart.
  I've also tried setting margin to 4, but the simulations stops even earlier.
  What should I do to solve this problem? Should I just run production MD with a timestep of 1fs?
  I hope to obtain the clustered binding structure and perform FEP (to compare with experimental data). In the cystal structure, the water molecule acts as two H bond donors; while after NVT, it accepts a O-H from a nearby tyrosine residue. Will that difference affect FEP results a lot?

  atom moving too fast?

  1. check the structure, system volume?
  2. minimize and equilibration ok?
  3. use shorter timestep
  4. increase margin?
  5. gradually heat the system
  6. more (langevin) parameters?

  

  > *> try these*
  > *>*
  > *> 1] Apply the temperature step by step (100 200 290 ..)*
  > *> 2] You can use smaller time step (1 fs or 0.5 fs)*
  > *> 3] make sure all atoms inside the cell basis vector*
  > *> 4] use Velocity control or Temperature control with Langivin Dynamics*
  > Use "margin 3" or larger.
  >
  > In rare special circumstances atoms that are involved in bonded terms (bonds, angles, dihedrals, or impropers) or nonbonded exclusions (especially implicit exclusions due to bonds) will be placed on non-neighboring patches because they are more than the cutoff distance apart. This can result in the simulation dying with a message of “bad global exclusion count”. If an “atoms moving too fast; simulation has become unstable”, “bad global exclusion count”, or similar error happens on the first timestep then there is likely something very wrong with the input coordinates, such as the atoms with uninitialized coordinates or different atom orders in the PSF and PDB file. Looking at the system in VMD will often reveal an abnormal structure. Be aware that the atom IDs in the “Atoms moving too fast” error message are 1-based, while VMD’s atom indices are 0-based. If an “atoms moving too fast; simulation has become unstable”, “bad global exclusion count”, or similar error happens later in the simulation then the dynamics have probably become unstable, resulting in the system “exploding” apart. Energies printed at every timestep should show an exponential increase. This may be due to a timestep that is too long, or some other strange feature. **Saving a trajectory of every step** and working backwards in can also sometimes reveal the origin of the instability. 

- 







## Amber

### Basics

[prmtop format](https://ambermd.org/prmtop.pdf). only after .prmtop file is read into parmed do the residues have indices....



sander and pmemd are both MD engines. pmemd can also be run with acceleration from graphics processing units (GPU) through pmemd.cuda or the MPI parallel version pmemd.mpi.

Amber提供两套功能完全一致的MD运行程序：sander与pmemd，**使用方法完全一样**。pmemd实质为sander的付费版，计算时间远远小于sander。

Also, `pbsa.cuda`, etc.



> The thing about pmemd.cuda is that it runs the entire calculation on the GPU, so adding CPUs buys you nothing.
> The way it is designed, each CPU thread will launch a GPU thread as well.

http://archive.ambermd.org/201405/0364.html

双GPU还不如分别跑两个任务（除了REMD、隐式溶剂等）

```shell
export CUDA_VISIBLE_DEVICES="0"
nohup ${AMBERHOME}/bin/pmemd.cuda -O -i mdin -o mdout -p prmtop -c inpcrd -r restrt -x mdcrd -inf mdinfo &
```



> 我测试了一下，cpu的线程数和GPU的块数1:1时较快。

http://bbs.keinsci.com/thread-5203-1-1.html



topology: `.prmtop`, `.parm7`?

coordinates: `.nc`, `.rst7`



### Simple MD & Tutorials

- https://ambermd.org/tutorials/basic/tutorial0/index.php

- https://ambermd.org/tutorials/basic/tutorial14/index.php

- [How to do MDs - ChengLab](http://wiki.chenglab.net/mediawiki/index.php/How_to_do_MDs#Amber)

- [stonybrook AMBER Tutorials](https://ringo.ams.stonybrook.edu/index.php/AMBER_Tutorials)

other:

- https://zhuanlan.zhihu.com/p/612853742
- 

To check simulation parameters, see the following sections in Amber Manual:

- 21.6. General minimization and dynamics parameters
- 21.7. Potential function parameters

Other (e.g. modeling):

- 



refer [here](Metal-ion.md#Amber+12-6-4)

"Plain" molecular dynamics run

```
molecular dynamics run
 &cntrl
  imin=0，irest=1， ntx=5，(restart MD)
  ntt=3，temp0=300.0， gamma_ 1n=5.0， (temperature control)
  ntp=1，taup=2.0， (pressure control) 
  ntb=2，ntc=2， ntf=2，(SHAKE， periodic bc.)
  nstl im=500000，(run for 0.5 nsec)
  ntwx=1000，ntpr=200， (output frequency)
/
```

- 在Amber的mdin文件中，您可以使用!符号来添加注释。

- Due to performance regressions (about 20%) with running with the force switching on, it is recommended that simulations run with fswitch off unless using a force field that requires or recommends using the force switch.

  > the force cutoff smoothly approaches 0 between the region of the fswitch value to the cut value.

- The &ewald namelist is read immediately after the &cntrl namelist. We have tried hard to make the defaults
  for these parameters appropriate for solvated simulations. Please take care in changing any values from their
  defaults.



#### Selection syntax

23.1.1. ambmask 
mask syntax



### MD debug

- https://wiki.usask.ca/display/MESH/IEEE+errors+using+GNU+compiler

  [Subnormal number - Wikipedia](https://en.wikipedia.org/wiki/Subnormal_number): has a significand with a leading digit of zero

  `IEEE_OVERFLOW_FLAG` is triggered when the result of an expression exceeds the precision of the variable being assigned the value. For most MESH variables this means a number larger than E+38. This exception will also trigger `IEEE_DENORMAL`.
  The term **arithmetic underflow** (also **floating point underflow**, or just **underflow**) is a condition in a computer program where the result of a calculation is a number of more precise absolute value than the computer can actually represent in memory on its central processing unit (CPU). Arithmetic underflow can occur when the true result of a floating point operation is smaller in magnitude (that is, closer to zero) than the smallest value representable as a normal floating point number in the target datatype. 

  see [this](http://archive.ambermd.org/202108/0046.html) or [this](https://fluka-forum.web.cern.ch/t/the-following-floating-point-exceptions-are-signalling/593/2)

  In one word, it doesn't matter...

- `.in`最后一行没有换行，否则

  ```shell
  Fortran runtime error: End of file
  Error termination. Backtrace:.....
  ```

- Note: If SHAKE is used (see NTC), it is not necessary to calculate forces for the constrained bonds.

- http://archive.ambermd.org/201704/0092.html



## Analysis

### Trajectory

- [CPPTRAJ one-liners – AMBER-hub (utah.edu)](https://amberhub.chpc.utah.edu/cpptraj-cookbook/cpptraj-one-liners/)
- [CPPTRAJ (amber-md.github.io)](https://amber-md.github.io/cpptraj/CPPTRAJ.xhtml)





- [Combining multiple trajectory files into a single trajectory and remove water molecules to save space. – AMBER-hub (utah.edu)](https://amberhub.chpc.utah.edu/combining-multiple-trajectory-files-into-a-single-trajectory-and-remove-water-molecules-to-save-space/)





# Bioinformatics

## MSA

RCSB里面，只能通过advanced search来进行BLAST？
https://www.rcsb.org/news/5764422199cccf72e74ca34f

https://www.rcsb.org/docs/additional-resources/sequence-analysis

https://www.rcsb.org/alignment



好几家BLAST的，谁能直接筛选？



doing MSA: cluster omega

[Clustal Omega < Multiple Sequence Alignment < EMBL-EBI](https://www.ebi.ac.uk/Tools/msa/clustalo/)



UniProt has a ClustalW interface but no showing colors. Just export sequences and upload...

## Shannon's entropy plot

Uniqueness and relative abundance of protein sequences....





# Other

[How to Use US EPA EPI Suite to Predict Chemical Substance Properties](https://www.chemsafetypro.com/Topics/CRA/How_to_Use_US_EPA_EPI_Suite_to_Predict_Chemical_Substance_Properties.html)

[Download EPI Suite™ - Estimation Program Interface v4.11 | US EPA](https://www.epa.gov/tsca-screening-tools/download-epi-suitetm-estimation-program-interface-v411): predict properties of small molecules




