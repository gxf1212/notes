# Protein-ligand simulation

Mainly from UROPS project and FYP experiences. May also include some general MD workflows and debugs.

This page includes general results, not project-specific details.

# MD simulation

## Amber99SB-ildn+GAFF+gmx

> UROPS worflow

- https://manual.gromacs.org/archive/5.0.4/online/gro.html gro file format

- http://www.mdtutorials.com/gmx/index.html simple example tutorials 

- https://manual.gromacs.org/current/user-guide/index.html#user-guide

- https://jerkwin.github.io/GMX/GMXtut-0 an example of Amber99sb-ildn ff and a great Chinese tutorial of http://www.mdtutorials.com

- https://jerkwin.github.io/GMX/GMXtut-5 protein-ligand, no analysis

  > https://jerkwin.github.io/2018/11/24/Barnett_GROMACS%E6%95%99%E7%A8%8B/

- http://kangsgo.com/94.html with ligand

- https://www.bonvinlab.org/education/molmod/simulation free protein

  - https://github.com/haddocking/molmod-data/tree/master/mdp .mdp file

- https://zhuanlan.zhihu.com/p/149862369 for pymol viewing

- https://www.cnblogs.com/w-guangyu/p/7787396.html .mdp file, but should read documentation!

### Single protein

1. for each protein, always check:

   1. **if the position is right**

   2. **if non-polar hydrogens are added** (only for method 1)

   3. delete water (we can skip)

      ```shell
      grep -v HOH 2cqg_1.pdb > 2cqg_1.pdb
      ```

      Always check your .pdb file for entries listed under the comment MISSING


#### method 1: pdb2gmx

1. generate topology

   ```shell
   gmx pdb2gmx -f 2cqg_1.pdb -o 2cqg_1.gro -water tip3p -ignh
   ```

   **choose a force field: type the number**

   AMBER99SB-ILDN protein, nucleic AMBER94 (Lindorff-Larsen et al., Proteins 78, 1950-58, 2010)

   - `-water spc`指定所用的水的模型
     - https://lammps.sandia.gov/doc/Howto_tip3p.html
   - `-ignh`参数会让程序自动忽略输入pdb文件中的氢原子并根据相应的力场**自动添加符合力场要求的氢原子**

   > note
   >
   > - 检查组氨酸质子化状态所做的选择, 注意蛋白质的总电荷数
   > - path to forcefield files: `~/gromacs-2021.5-gpu/share/gromacs/top`. refer to `forcefield.itp` under each folder to use that forcefield
   > - 

   > output
   >
   > - The topology for the molecule.   
   >   - The topology (topol.top by default) contains all the  information necessary to define the molecule within a simulation.  This  information includes nonbonded parameters (atom types and charges) as  well as bonded parameters (bonds, angles, and dihedrals).
   > - A position restraint file.   
   >   - .itp
   >   - it defines a force constant used to keep atoms in place during equilibration
   > - A post-processed structure file.
   >   - .gro

   > There are 3784 dihedrals,  268 impropers, 2506 angles 
   > 3611 pairs,   1386 bonds and   0 virtual sites 
   >
   > Total mass 9777.308 a.m.u. 
   >
   > Total charge 2.000 e

   > error: 
   >
   > Atom HB3 in residue LYS 102 was not found in rtp entry NLYS with 24 atoms while sorting atoms. (ignore it)

2. I did not perform EM in vaccum

3. define the box 

   ```shell
   gmx editconf -f 2cqg_1.gro -o 2cqg_1_newbox.gro -c -d 1.0 -bt cubic
   ```

   The above command centers the protein in the box (-c), and places it at least 1.0 nm from the box edge (-d 1.0). The box type is defined as a cube (-bt cubic).

4. solvate

   ```shell
   gmx solvate -cp 2cqg_1_newbox.gro -cs spc216.gro -o 2cqg_1_solv.gro -p topol.top
   # also backed up the former .top as #topol.top.1#
   ```

   The configuration of the protein (-cp) is contained in  the output of the previous editconf step, and the configuration of the  solvent (-cs) is part of the standard GROMACS installation.  We are using spc216.gro, which is a generic equilibrated 3-point solvent model.  You can use spc216.gro as the solvent configuration for SPC, SPC/E, or TIP3P water, since they are all three-point water models.

5. add ions

   ```shell
   gmx grompp -f ions.mdp -c 2cqg_1_solv.gro -p topol.top -o ions.tpr
   ```

   > generated .trp (which is just a helper file to add ions) and mdout.mdp (not used later??)

   I don't know if ions.mdp is functioning?? seems they are related to energy minimization

   ```shell
   gmx genion -s ions.tpr -o 2cqg_1_solv_ions.gro -p topol.top -pname NA -nname CL -neutral -conc 0.15 # -nn 8
   ```

   定义了阳离子和阴离子的名称(分别使用`-pname`和`-nname`), 告诉`genion`只需要添加必要的离子来中和蛋白质所带的净电荷, 添加的阴离子数目为8(`-nn 8`). 对于`genion`, 除了简单地中和体系所带的净电荷以外, 你也可以同时指定`-neutral`和`-conc`选项来添加指定浓度的离子. 关于如何使用这些选项, 请参考`genion`的说明.

   `-neutral`选项保证体系总的净电荷为零, 体系呈电中性, `-conc`选项设定需要的离子浓度(这里为0.15 M). `-g`选项指定输出日志文件的名称. `-norandom`选项会依据静电势来放置离子而不是随机放置(默认), 但我们在这里使用随机放置方法.

   出现提示后, 选择13 “SOL”. 这意味这我们将用离子替换一些溶剂分子. 

   > backed up topol.top to ./#topol.top.2#

6. energy minimization

   1. ```shell
      gmx grompp -f em_sol_pme.mdp -c 2cqg_1_solv_ions.gro -p topol.top -o em.tpr
      ```

      - entol: some use 10, others 250,1000....
      - emstep = 0.01 may need nsteps = 50000 

      see manual P206

   2. then run

      ```shell
      gmx mdrun -v -deffnm em
      ```

      - `-v`: show infomation
      - `-deffnm`: input file
      - I set Fmax=250, conjugated gradient, just based on the performance, otherwise it's hard to converge

      but if not converging, must run `gmx grompp` again!!!

   3. output 

      > Polak-Ribiere Conjugate Gradients converged to Fmax < 250 in 388 steps 
      > Potential Energy  = -4.6409103e+05 
      > Maximum force   =  1.8645695e+02 on atom 1365 
      > Norm of force   =  9.9704073e+00

      > generate **em.gro** trr log edr
      >
      > - `em.log`: ASCII文本的日志文件, 记录了能量最小化过程
      > - `em.edr`: 二进制能量文件
      > - `em.trr`: 全精度的二进制轨迹文件
      > - `em.gro`: 能量最小化后的结构

   4. result

      - Epot应当是负值, 根据体系大小和水分子的多少, 大约在105–106的数量级(对水中的单个蛋白质而言). 
      - 第二个重要的指标是力的最大值Fmax.

      ```shell
      gmx energy -f em.edr -o em.xvg # choose 10 for potential
      ```

      analysis: 

      ```shell
      yum install grace
      xmgrace em.xvg # outputs a plot
      ```

7. NVT

   ```shell
   gmx grompp -f nvt.mdp -c em.gro -p topol.top -o nvt.tpr
   gmx mdrun -deffnm nvt
   ```

   - using constraints = h_bonds as suggested by gmx

   - `pcoupl = no`: 不使用压力耦合

   - 除注释外, 所用参数的完整解释可以在GROMACS手册中找到.

   - > **说明**: 当模拟运行时间较长时, 你可以使用后台运行方法, 如
     >
     > gmx-5.x: `nohup gmx mdrun -deffnm npt-pr &`
     >
     > 为检查模拟运行进度, 可使用`tail`命令查看日志文件, 如 `tail -n 25 npt-pr.log`

   - > 对于`coulombtype`, PME代表粒子网格Ewald(Particle Mesh Ewald)静电方法[5,6]. 当体系中含有电荷时(暴露的带电氨基酸残基, 离子, 极化的脂类等), PME是计算长程静电相互作用的最好方法. `constraints`的`all-bonds`选项可使用线性约束算法(LINCS, Linear Constraint algorithm)固定体系中所有键的长度(当模拟的时间步长>0.001 ps时, 使用此选项非常重要[7]).

   ```shell
   gmx energy -f nvt.edr -o nvt.xvg # 提示时输入`16 0`来选择体系温度并退出
   xmgrace nvt.xvg
   ```

8. NPT 

   ```shell
   gmx grompp -f npt.mdp -c nvt.gro -r nvt.gro -t nvt.cpt -p topol.top -o npt.tpr
   gmx mdrun -deffnm npt
   ```

   changes:

   - 使用了Parrinello-Rahman控压器.

   - `continuation = yes`: 我们将从NVT平衡阶段开始继续进行模拟

   - `gen_vel =no`: 从轨迹中读取速度

     现在要使用`-t`选项以包括NVT平衡过程中的产生的检查点文件. 这个文件包含了继续模拟所需要的所有状态变量. 为使用NVT过程中得到的速度我们必须包含这个文件. 坐标文件(`-c`)是NVT模拟的最终输出文件.

   > 对于NVT预平衡而言，最重要的是需要检查体系的温度是否达到设定的300 K并基本维持在300 K附近。
   >
   > 对于NPT预平衡而言，则需要注意体系的密度或者盒子的体积是否达到稳定，也需要关注温度是否恒定；因为控压算法的关系，体系中的压力波动往往较大，故而压力的瞬时值会较之设定值有着较大的偏移，一般只需要保证体系的密度较为稳定即可。
   >
   > ```shell
   > gmx energy -f npt.edr -o npt-pressure.xvg # 17
   > gmx energy -f npt.edr -o npt-density.xvg # 23
   > xmgrace npt-pressure.xvg
   > xmgrace npt-density.xvg
   > ```
   >
   > 在Xmgrace中, 依次点击菜单 `Data` -> `Transformations` -> `Running averages...`, 在弹出的对话框中设定`Length of average`, `Accept`即可. `Length of average`的具体数值要根据具体数据的特点来设, 越大, 得到的平均线越平滑. 自己试几次就知道了.
   >
   > `Data` -> `FeatureExtraction` -> `Y average`,`Data` -> `export...`
   >
   > mean pressure: -79.846729
   >
   > density: 1008.3168
   >
   > in matlab: https://ww2.mathworks.cn/matlabcentral/fileexchange/70607-import-and-plot-gromacs-xvg-data-files
   >
   > check by pymol:
   >
   > ```shell
   > gmx trjconv -f npt.trr -o npt.xtc
   > load nvt.gro, npt # theFormer.gro
   > load npt.xtc, npt # same name
   > show sticks,resi 105+106+107+109+110+113+114+137+145+147+149+151+132+176+177+179+181+183
   > color magenta,resi 105+106+107+109+110+113+114+137+145+147+149+151+132+176+177+179+181+183
   > ```
   >
   > check by vmd
   >
   > ```shell
   > # in extensions--tk console
   > cd /home/gxf/Desktop/xufan/MD/try/2cqg_1
   > mol load gro npt.gro trr npt.trr
   > # in extensions--visualization--movie maker
   > # movie settings--trajectory
   > # 
   > ```
   >
   > I found it's somehow good except those water who crosses the boundary showed their bond across the whole box and make it a mess
   >
   > if still not sure, check more properties
   >
   > ```shell
   > gmx energy -f npt.edr -o npt-temp.xvg # temp, 15
   > xmgrace npt-temp.xvg
   > gmx energy -f npt.edr -o npt-vol.xvg # volume, 22
   > xmgrace npt-vol.xvg
   > ```


10. production simulation

    ```shell
    gmx grompp -f md.mdp -c npt.gro -t npt.cpt -p topol.top -o final_2cqg.tpr
    gmx mdrun -deffnm final_2cqg
    ```

    read the tail of the log for progress:

    ```shell
    tail -n 13 final_2cqg.log
    ```

    https://www.runoob.com/linux/linux-comm-tail.html

    ```
    gmx mdrun -deffnm final_2cqg -nb gpu
    ```

    如果可用的GPU卡超过一个, 或者想利用GROMACS支持的杂合并行方案对计算进行划分, 请参考GROMACS手册以及网络上的资料. 这些技术细节超出了本教程的范围.

    

#### method 2: tleap

> It's never possible for a half-completed file in Amber to be put into gromacs for ANY processing!
>
> I've tried
>
> - define tip3p in Amber and solvate in gromacs
> - Amber cannot calculate num of ions itself

see method 1 for detailed parameters

1. delete Hs

   ```shell
   reduce 2cqg_1.pdb -Trim > 2cqg_1_noh.pdb
   ```

2. get amber .gro .top files

   ```shell
   # tleap -s -f leap_free.in > leap_free.out
   conda activate AmberTools20
   tleap
   source leaprc.ff99SBildn
   pro = loadpdb 2cqg_1_noh.pdb
   check pro
   source leaprc.water.tip3p
   solvatebox pro TIP3PBOX 10.0
   charge pro
   addIons2 pro Cl- 15 Na+ 13
   charge pro
   check pro
   saveamberparm pro 2cqg.prmtop 2cqg.inpcrd
   quit
   ```

   calculate the number of ions you need and modify the leap.in by (may take a while)

   https://ambermd.org/tutorials/basic/tutorial8/index.php https://www.phys.ksu.edu/personal/schmit/SLTCAP/SLTCAP.html

   > - mw of protein: 9.762 kDa
   > - concentration: 150
   > - Net charge: 2.00
   > - number of water: 5560

3. get .top and .gro

   ```shell
   conda activate Acpype
   acpype -p 2cqg.prmtop -x 2cqg.inpcrd -d
   # rename
   mv 2cqg_GMX.gro 2cqg_1_solv.gro
   mv 2cqg_GMX.top topol.top
   # also generated em.mdp and md.mdp for test
   mv em.mdp em_test.mdp
   mv md.mdp md_test.mdp
   ```

4. change the representation

   ```shell
   grep "WAT" -rl ./2cqg_1_solv.gro | xargs sed -i "s/WAT/SOL/g" 
   grep "WAT" -rl ./topol.top | xargs sed -i "s/WAT/SOL/g" 
   # WAT in Amber, "SOL" in gromacs; just need to change those under moleculetype and molecule
   # can do for all files under a dir
   # change in topol.top (under "atom") IM to Cl-, IP to Na+
   grep " IP " -rl ./com.top | xargs sed -i "s/ IP / Na+ /g" 
   grep " IM " -rl ./com.top | xargs sed -i "s/ IM / Cl- /g" 
   ```

   > atom name 1397 in topol.top and 2cqg_1_solv.gro does not match (NA+ - CL-) 
   >
   > atom name 1397 in topol.top and 2cqg_1_solv.gro does not match (NA+ - CL-) 
   >
   > atom name 1399 in topol.top and 2cqg_1_solv.gro does not match (NA+ - CL-) 
   >
   > atom name 1399 in topol.top and 2cqg_1_solv.gro does not match (NA+ - CL-) 
   >
   > atom name 1400 in topol.top and 2cqg_1_solv.gro does not match (NA+ - CL-)
   >
   > atom name 1400 in topol.top and 2cqg_1_solv.gro does not match (NA+ - CL-) 
   >
   > WARNING 1 [file topol.top, line 14435]: 
   > 14 non-matching atom names 
   > atom names from topol.top will be used 
   > atom names from 2cqg_1_solv.gro will be ignored
   >
   > **use `-maxwarn 2`** 
   >
   > 
   >
   > Excluding 3 bonded neighbours molecule type '2cqg' 
   >
   > turning H bonds into constraints... 
   >
   > Excluding 1 bonded neighbours molecule type 'CL-' 
   >
   > turning H bonds into constraints... 
   >
   > Excluding 1 bonded neighbours molecule type 'NA+' 
   >
   > turning H bonds into constraints... 
   >
   > Excluding 2 bonded neighbours molecule type 'SOL' 
   >
   > turning H bonds into constraints...
   >
   > **it's just name-related problem. I don't know if it matters**

   > don't do position restraint!!!!
   >
   > ```shell
   > echo 1 | gmx genrestr -f 2cqg_1_solv.gro -o pro.itp -fc 1000 1000 1000
   > ```
   >
   > add them to the end of protein part in .top file
   >
   > ```shell
   > #include "pro.itp"
   > ```

5. energy minimization

   ```shell
   gmx grompp -f em_sol_pme.mdp -c 2cqg_1_solv.gro -r 2cqg_1_solv.gro -p topol.top -o em.tpr -maxwarn 2  # after position restraint, must add -r same.gro
   gmx mdrun -v -deffnm em
   echo 11 0 | gmx energy -f em.edr -o em.xvg # potential
   echo 10 0 | gmx energy -f em.edr -o em.xvg # if no restraint
   xmgrace em.xvg
   ```

   > `grompp`程序将会提示此体系的净电荷不为零, 还会输出一些与体系和控制参数有关的其他信息. 该程序也会产生一个额外的输出文件(`mdout.mdp`), 里面包含所有控制参数的设置。
   >
   > 我咋不信在em这步的？可以作为参考，比如group的设置。甚至FEP的东西都出来了。。

6. nvt

   delete: "define PORES..."

   ```shell
   gmx grompp -f nvt.mdp -c em.gro -r em.gro -p topol.top -o nvt.tpr
   gmx mdrun -deffnm nvt
   echo 16 0 | gmx energy -f nvt.edr -o nvt.xvg
   echo 15 0 | gmx energy -f nvt.edr -o nvt.xvg # temperature if no restraint
   xmgrace nvt.xvg
   # no-posre mean: 300.19
   # posre mean: 299.6911
   ```

   > after this step, the cubic water is partially torted, but recovered after npt. from the animation we can see it recovers in several steps gradually. Amazing!
   >
   > it might not be related to porse.itp
   >
   > either does the restrained version! (seemed smaller, only corner?)

7. npt

   ```shell
   gmx grompp -f npt.mdp -c nvt.gro -r nvt.gro -t nvt.cpt -p topol.top -o npt.tpr
   gmx mdrun -deffnm npt
   ```

8. check (restraint # non-restraint)

   ```shell
   echo 17 0 | gmx energy -f npt.edr -o npt-pressure.xvg # 16
   xmgrace npt-pressure.xvg
   # may delete the first line. still -39.901572
   echo 23 0 | gmx energy -f npt.edr -o npt-density.xvg # 22
   xmgrace npt-density.xvg
   # additional
   echo 15 0 | gmx energy -f npt.edr -o npt-temp.xvg # 14
   xmgrace npt-temp.xvg
   echo 22 0 | gmx energy -f npt.edr -o npt-vol.xvg # volume, 21
   xmgrace npt-vol.xvg
   ```

   by pymol

   ```shell
   gmx trjconv -f npt.trr -o npt.xtc
   # in pymol
   load nvt.gro, npt # theFormer.gro
   load npt.xtc, npt # same name
   ```

9. run

   ```shell
   gmx grompp -f md.mdp -c npt.gro -r npt.gro -t npt.cpt -p topol.top -o final_2cqg.tpr
   gmx mdrun -deffnm final_2cqg -nb gpu
   ```

      > You are using pressure coupling with absolute position restraints, this will give artifacts. Use the refcoord_scaling option.
      >
      > solve: add refcoord_scaling    = com in `md.mdp`


#### Analysis

[Analysis reference](https://jerkwin.github.io/2017/10/20/GROMACS%E5%88%86%E5%AD%90%E5%8A%A8%E5%8A%9B%E5%AD%A6%E6%A8%A1%E6%8B%9F%E6%95%99%E7%A8%8B-%E5%A4%9A%E8%82%BD-%E8%9B%8B%E7%99%BD%E7%9B%B8%E4%BA%92%E4%BD%9C%E7%94%A8/#%E7%AC%AC%E4%B8%89%E9%83%A8%E5%88%86-%E5%88%86%E5%AD%90%E5%8A%A8%E5%8A%9B%E5%AD%A6%E6%A8%A1%E6%8B%9F%E6%95%B0%E6%8D%AE%E7%9A%84%E5%88%86%E6%9E%90%E4%B8%80)

> save fig in xmgrace: file--print setup--check "print to file" and edit filename--file--print, or
>
> ```shell
> grace -nxy input.xvg -hdevice PNG -hardcopy -printfile output.png
> ```
>
> the units are all nm

1. visualization

   ```shell
   # -pbc mol: to consider pbc when running out
   gmx trjconv -f final_2cqg.trr -o final_2cqg.xtc -dt 50
   echo 0 | gmx trjconv -s final_2cqg.tpr -f final_2cqg.xtc -o final_2cqg_noPBC.xtc -pbc mol -ur compact -dt 50 # choose 0
   echo 0 | gmx trjconv -f final_2cqg.xtc -o final_2cqg_nojump.xtc -pbc nojump -dt 50
   # pymol
   load npt.gro, final_2cqg
   load final_2cqg_noPBC.xtc, final_2cqg # do not show protein crossing the box
   # load final_2cqg_nojump.xtc, final_2cqg # do not let molecules go back to the box, bad visualization
   # load final_2cqg.xtc, final_2cqg
   ```

   if protein runs out of water box, (might caused by not restricting position)

   - (not useful in pymol) http://bbs.keinsci.com/thread-2085-1-1.html

   - http://www.mdbbs.org/thread-9782-1-1.html

     同五楼，对MD没有影响，在分析和view的时候，可以用ptraj 把分子放到盒子中间，可以先
     center mask
     image center familiar
     trajout mdcrd
     一般你的分子就到盒子中间了。。
     具体在ambertools的manual上有。。。

2. 周期性映像间的最小距离

   ```shell
   echo 4 | gmx mindist -f final_2cqg.xtc -s final_2cqg.tpr -od minimal-periodic-distance.xvg -pi # choose 4 backbone
   xmgrace minimal-periodic-distance.xvg
   ```

   要注意小距离事件是不时出现还是持续出现. 如果持续出现, 很可能影响蛋白的动力学; 如果只是偶尔出现, 那基本没有影响.

   不仅直接相互作用需要担心, 非直接效应, 即以水为媒介的间接相互作用也可能引起问题. 例如, 蛋白可以导致水在离其最近的四个溶剂化层中出现有序性, 这大约对应于1 nm的距离. 理想情况下, 最小距离不应该小于2 nm.

3. get rmsd

   RMSD通常用于表征结构到平衡态的收敛情况. 如前面所讲, RMSD是结构变化对原子总数的平均, 基本上是一个距离表征, 低的值最有意义. (**使用初始结构作为参考结构**)

   ```shell
   # all choose 1 protein
   echo "1\n 1" | gmx rms -s final_2cqg.tpr -f final_2cqg_nojump.xtc -o rmsd_pro.xvg -tu ns 
   xmgrace rmsd_pro.xvg
   # all choose 4 backbone
   echo "4\n 4" | gmx rms -s final_2cqg.tpr -f final_2cqg_nojump.xtc -o rmsd_bb.xvg -tu ns 
   xmgrace rmsd_bb.xvg
   ```

   > -tu: Unit for time values. default: ps

4. get rmsf

   除了能量等性质, 也能够通过结构的变化和弛豫来考察模拟趋向平衡的收敛性. 通常,  这种弛豫仅仅使用结构到参考结构(如晶体结构)的欧几里德距离来衡量. 这一距离被称为均方根偏差(RMSD). 然而,  我们也建议再考察一下到平均结构的弛豫, 即相对于平均结构的RMSD, 个中原因将在下节说明. 但是要计算相对于平均结构的RMSD,  需要首先获得平均结构. **平均结构**可以在计算[均方根波动(RMSF)](http://en.wikipedia.org/wiki/Root_mean_square_fluctuation)时**顺便获得**.

   RMSF计算每个原子相对于其平均位置的涨落, 表征了结构的变化对时间的平均, 给出了蛋白各个区域柔性的表征,  对应于晶体学中的b因子(温度因子). 通常, 我们预期RMSF和温度因子类似, 这可以用于考察模拟结果是否与晶体结构符合.  

   RMSF(和平均结构)使用`rmsf`命令计算. `-oq`选项**可以计算b因子**, 并将其添加到参考结构中. 我们最关心的是每个残基的涨落, 这可使用选项`-res`设定.

   ```shell
   echo 4 | gmx rmsf -f final_2cqg.xtc -s final_2cqg.tpr -o rmsf-per-residue.xvg -ox average.pdb -oq bfactors-residue.pdb -res
   xmgrace rmsf-per-residue.xvg
   ```

   使用`xmgrace`查看RMSF的图形, 区分柔性和刚性区域.

5. secondary structure

   `.xvg`文件包含一个时间序列, 列出了每帧中与每一二级结构类型相关的残基数目. 

   更多的细节在.xpm文件中, 它使用颜色编码了每个残基在一段时间内的二级结构.

   ```shell
   gmx do_dssp -f final_2cqg_nojump.xtc -s final_2cqg.tpr -o secondary-structure.xpm -sc secondary-structure.xvg
   xmgrace secondary-structure.xvg
   gmx xpm2ps -f secondary-structure.xpm -o secondary-structure.eps -size 4000
   ps2pdf secondary-structure.eps
   ```

### Generate the topology of ligands

> see: 
>
> - [使用GAFF力场参数化小分子的自动化工具](https://jerkwin.github.io/2019/07/14/%E8%AE%B8%E6%A5%A0-%E4%BD%BF%E7%94%A8GAFF%E5%8A%9B%E5%9C%BA%E5%8F%82%E6%95%B0%E5%8C%96%E5%B0%8F%E5%88%86%E5%AD%90%E7%9A%84%E8%87%AA%E5%8A%A8%E5%8C%96%E5%B7%A5%E5%85%B7/) but did not understood the script
> - [使用AmberTools+ACPYPE+Gaussian创建小分子GAFF力场的拓扑文件](https://jerkwin.github.io/2015/12/08/%E4%BD%BF%E7%94%A8AmberTools+ACPYPE+Gaussian%E5%88%9B%E5%BB%BA%E5%B0%8F%E5%88%86%E5%AD%90GAFF%E5%8A%9B%E5%9C%BA%E7%9A%84%E6%8B%93%E6%89%91%E6%96%87%E4%BB%B6/) with gui and script examples
> - user protocols
>   - https://zhuanlan.zhihu.com/p/188735956 use gaussian and resp charge
>   - https://gohom.win/2015/11/12/AMBER-Ligand/
>   - http://kangsgo.com/94.html
> - summary
>   - [几种生成有机分子GROMACS拓扑文件的工具](http://bbs.keinsci.com/thread-428-1-1.html) generate charge
>   - [RESP2原子电荷的思想](http://sobereva.com/531) intro to resp charge
>
> comments:
>
> - it's better to work under Linux environment. Windows cmd does not support statement like `f=atp`. you may install WSL (Windows subsystem for Linux) and find your files at `\mnt`
> - tools needed: conda (AmberTools, acpype), Gaussian+MDanalysis, openbabel, gromacs, bash shell
> - [download G16 for Linux](https://murbsch-my.sharepoint.com/:f:/g/personal/gxf1212_880n_vip/Em7CrTdwlC5Horhyc1RxCBEBdlhKyrUy5Og55gbckLL4sg?e=XD0A7B)

#### QM charge+GAFF

1. add non-polar hydrogens

   ```shell
   f=atp_zinc_6
   f=atp_pubchem_5
   obabel $f.pdb -opdb -O ${f}_h.pdb -p 7.0
   obminimize -ff MMFF94 -n 1000 ${f}_h.pdb > ${f}_m.pdb
   ```
   
   no matter what tool you are using, you should always check...in other words, no perfect automatic tools.

   > ```shell
   > # below is not useful
   > # reduce $f.pdb > ${f}_h.pdb
   > # pdb4amber -i $f.pdb -o ${f}_h.pdb --reduce
   > # no longer -h, p adds h considering pH
   > ```
   >
   > or try adtools (laji!) or pymol (also laji!)

   but I believe non-polar hydrogen should be added

   > if added extra hydrogen: pymol can delete atom, but I think GaussView can edit all bonds! Maybe 

2. get gaussian input file

   ```shell
   # 2021.3
   # conda activate AmberTools20
   antechamber -i ${f}_m.pdb -fi pdb -o ${f}.gjf -fo gcrt -pf y \
   -gm "%mem=4096MB" -gn "%nproc=4" -ch ${f} -nc 2 \
   -gk "#B3LYP/6-31G* em=GD3BJ scrf=solvent=water iop(6/33=2) pop=CHELPG" -ge ${f}_resp.gesp -gv 1 
   # change your charge!
   # no opt !
   # new version
   antechamber -i ${f}_m.pdb -fi pdb -o ${f}.gjf -fo gcrt -pf y \
   -gm "%mem=4096MB" -gn "%nproc=4" -ch ${f} -nc 0 \
   -gk "#B3LYP/6-31G* em=GD3BJ scrf=solvent=water SCF=tight \
   iop(6/33=2,6/42=6,6/50=1) pop=CHELPG" -ge ${f}_resp.gesp -gv 1 -at gaff
   ```

   http://gohom.win/2015/09/17/AutoCalcRESP/ 自动计算ESP和RESP电荷(AMBER and G09) explains parameters

   https://zhuanlan.zhihu.com/p/59070901 use its gaussian setting

   http://ambermd.org/antechamber/ac.html#antechamber antechamber parameters

3. run gaussian

   ```shell
   g16 ${f}.gjf
   tail -n 13 ${f}.log
   ```

   `B3LYP/6-31G* em=GD3BJ`: 8h51min to optimize. 

   we don’t optimize

   get .log, .chk, .gesp files

   > segmentation violation
   >
   > 成因：提供这种报错信息毫无意义，任何原因Gaussian报错退出都会有类似的输出。
   >
   > 解决：**用文本编辑器打开输出文件**，如上图中为“a.out”文件，**拖到最后看最终报错**。Linux下也是如此，可用 nano, tail, cat, vi 等命令阅读文件。看到真正报错后，可按照相应信息（如下文中涉及的这些报错）进行解决。

4. get .mol2 file with the resp charge

   > alternative: generate this with .log file

   ```shell
   # conda activate AmberTools20
   antechamber -i ${f}_resp.gesp -fi gesp -o ${f}.mol2 -fo mol2 -pf y -c resp
   parmchk2 -i ${f}.mol2 -f mol2 -o ${f}.frcmod # check GAFF parameters. additional parameters are here
   ```

   https://zhuanlan.zhihu.com/p/59070901

   also get some *out file

   > for drugbank618
   >
   > Warning: The assigned bond types may be wrong, please : 
   > (1) double check the structure (the connectivity) and/or  
   > (2) adjust atom valence penalty parameters in APS.DAT, and/or  
   > (3) increase PSCUTOFF in define.h and recompile bondtype.c 
   > (be cautious, using a large value of PSCUTOFF (>100) will  
   > significantly increase the computation time). 
   >
   > Info: The number of path atoms exceeded MAXPATHATOMNUM for atom (ID: 7, Name: C7). 
   >  Automatically increasing to 10000. 
   > Info: The number of path atoms exceeded MAXPATHATOMNUM for atom (ID: 8, Name: O1). 
   >  Automatically increasing to 10000.

5. **ALIGN**. accidentally, gaussian output structure runs away from the docked. 

   run python to get ${f}_aligned.mol2

   ```shell
   ~/Desktop/work/projects/undergraduate/NUS-UROPS/md/prepare/align.py PEP
   # new version
   # alias align_gauss='python3 ~/Desktop/work/projects/tools/Python-for-MD/prepare/align_gauss.py'
   align_gauss `pwd`/ ${f}
   ```

#### A simplified alternative: bcc charge

bcc charge, less time-consuming than Gaussian

```shell
conda activate AmberTools21
pdb4amber -i lig.pdb -o lig_new.pdb --reduce --dry
antechamber -i lig_new.pdb -fi pdb -o lig.mol2 -fo mol2 -at gaff -c bcc -rn MOL
parmchk2 -i lig.mol2 -f mol2 -o lig.frcmod
```



> test?
>
> ```shell
> tleap
> source leaprc.gaff  # 载入力场
> loadamberparams atp_pubchem_5.frcmod  # 载入配体参数化文件
> lig=loadmol2 atp_pubchem_5_aligned.mol2  # 载入配体
> check lig  # 检查配体
> saveamberparm lig atp_pubchem_5.prmtop atp_pubchem_5.inpcrd  # 保存amber输入文件
> quit
> ```


### Combine the ligand and protein

> - thanks for https://zhuanlan.zhihu.com/p/197979734 to release me for copying texts!
> - http://sobereva.com/266 要处理xxx.mol2就执行./acpype.py -i xxx.mol2，算完后会新产生一个xxx目录，里头有_GMX后缀的.gro、.itp、.top，直接在GROMACS里用即可。
> - http://bbs.keinsci.com/thread-13564-1-1.html AmberTools+ACPYPE产生的就是完整形式的top文件（包括成键项与非键项参数）。参数都已经齐全了还要include干啥。 but acpype don't produce position restraint
> - [SLTCAP tool to calculate the number of ions](https://www.phys.ksu.edu/personal/schmit/SLTCAP/SLTCAP.html)

1. get old FF

   ```shell
   cp /home/gxf/miniconda3/envs/AmberTools20/dat/leap/cmd/oldff/leaprc.ff99SBildn /home/gxf/miniconda3/envs/AmberTools20/dat/leap/cmd/leaprc.ff99SBildn
   ```

   22.2.17

   ```shell
   cd /home/gxf/.conda/envs/AmberTools21/dat/leap/cmd/
   cd /home/gxf/anaconda3/envs/AmberTools21/dat/leap/cmd/
   ```

   anyway, just there

2. get amber input file

   ```shell
   # cannot use $f here
   tleap
   source leaprc.ff99SBildn # 载入蛋白质的力场
   pro = loadpdb 2cqg_1_noh.pdb # 载入蛋白质. if error, just edit in pymol
   
   check pro 
   source leaprc.gaff  # 载入力场
   loadamberparams atp_pubchem_5.frcmod # 载入配体参数化文件
   
   lig=loadmol2 atp_pubchem_5_aligned.mol2 # 载入配体
   check lig # 检查配体
   com = combine {pro lig} # 将蛋白质和配体组合形成复合物
   source leaprc.water.tip3p
   solvatebox com TIP3PBOX 10.0 # 对复合物进行溶剂化，盒子边缘距离复合物最小 1 nm
   check com
   addIons2 com Cl- 14 Na+ 12 # 根据计算好的离子数添加
   charge com
   check com # 最后的检查
   saveamberparm com com.prmtop com.inpcrd # 保存amber输入文件
   quit
   # check: see if ok
   # if no english, you can copy and paste...
   ```

   > Try removing the hydrogen atoms from the PDB file in those residues.  Leap will add the ones it needs back in.  If you continue to get complaints involving unrecognized hydrogens, you can remove all hydrogens using "reduce" with "-Trim".  See the manual for instructions on using reduce.
   >
   > FATAL:  Atom .R<NLYS 102>.A<H 25> does not have a type.
   >
   > ```shell
   > reduce 2cqg_1_a.pdb -Trim > 2cqg_1_noh.pdb
   > ```
   >

   以上在tleap里的操作是一步一步来做，一个简单的办法是将以上所有操作写入leap.in文件，按如下操作一步完成：

   ```
   tleap -s -f leap.in > leap.out
   ```

   but have to run in cmd

   ```shell
   conda activate AmberTools20
   tleap
   source leaprc.ff99SBildn
   pro = loadpdb 2cqg_1_noh.pdb
   check pro 
   source leaprc.gaff
   loadamberparams atp_haddock.frcmod
   lig=loadmol2 atp_haddock_aligned.mol2
   check lig
   com = combine {pro lig}
   source leaprc.water.tip3p
   solvatebox com TIP3PBOX 10.0
   charge com
   addIons2 com Cl- 14 Na+ 12
   charge com
   check com
   saveamberparm com com.prmtop com.inpcrd
   quit
   
   loadamberparams atp_pubchem_5.frcmod
   lig=loadmol2 atp_pubchem_5_aligned.mol2
   ```

   other choice of force fields:

   ```shell
   source leaprc.gaff2
   source leaprc.protein.ff14SB
   ```

   or, multiple ligand

   ```shell
   tleap
   source leaprc.ff99SBildn
   proA = loadpdb A_noh.pdb
   proB = loadpdb B_noh.pdb
   source leaprc.gaff
   loadamberparams LIG1.frcmod
   lig1=loadmol2 LIG1_aligned.mol2
   loadamberparams LIG2.frcmod
   lig2=loadmol2 LIG2_aligned.mol2
   com = combine {proA proB lig1 lig2}
   source leaprc.water.tip3p
   solvatebox com TIP3PBOX 10.0
   charge com
   addIons2 com Cl- 19 Na+ 26
   charge com
   check com
   saveamberparm com com.prmtop com.inpcrd
   quit
   ```

   > calculate the number of ions: https://ambermd.org/tutorials/basic/tutorial8/index.php https://www.phys.ksu.edu/personal/schmit/SLTCAP/SLTCAP.html
   >
   > The following usually does not matter:
   > 
   > ```
   > Warning: Close contact of 1.432869 angstroms between .R<CASP 185>.A<H 2> and .R<MOL 186>.A<H10 41>
   >```
   > 
   >one thing that matters is, when measuring mw of the protein, we must **include hydrogens**:
   > 
   >```shell
   > conda activate AmberTools21
   >reduce 2fbw_pro.pdb > 2fbw_h.pdb  # add hydrogen
   > python3 ~/Desktop/work/projects/tools/Python-for-MD/prepare/mw.py ~/Desktop/work/projects/undergraduate/SDH/md/lig1/ 2fbw_h.pdb
   > ```
   > 
   > 2023 update: load in Pymol, A--compute--molecular weight--with inplicit hydrogen

3. convert to gmx

   >   history command (in 2021)
   >
   >   ```shell
   >   conda activate Acpype
   >   acpype -p com.prmtop -x com.inpcrd -d -c user
   >   # rename
   >   mv com_GMX.gro com.gro
   >   mv com_GMX.top com.top
   >   # also generated em.mdp and md.mdp for test
   >   mv em.mdp em_test.mdp
   >   mv md.mdp md_test.mdp
   >   ```
   >
   >   and process some text
   >
   >   ```shell
   >   grep "WAT" -rl ./com.gro | xargs sed -i "s/WAT/SOL/g" 
   >   grep "WAT" -rl ./com.top | xargs sed -i "s/WAT/SOL/g"
   >   # change in topol.top (under "atom") IM to Cl-, IP to Na+
   >   grep " IP " -rl ./com.top | xargs sed -i "s/ IP / Na+ /g" 
   >   grep " IM " -rl ./com.top | xeargs sed -i "s/ IM / Cl- /g" 
   >   ```
   >
   >   note that the output has changed in 2022! output into a folder; add a run.sh and .itp file, but we don't use them.
   >
   >   ```shell
   >   conda activate Acpype
   >   acpype -p com.prmtop -x com.inpcrd -d -c user
   >   cd com.amb2gmx
   >   mv com_GMX.gro com.gro
   >   mv com_GMX.top com.top
   >   grep "WAT" -rl ./com.gro | xargs sed -i "s/WAT/SOL/g" 
   >   grep "WAT" -rl ./com.top | xargs sed -i "s/WAT/SOL/g" 
   >   ```
   >
   >   [acpype server](https://www.bio2byte.be/acpype/), but not using
   
   Update 2023: Acpype suckes for the whole system! I cann't fix the solvent/ion name problem. Just use Parmed....but it renumbers all residues....more precisely, Amber files do not have residue number info, just starting from 1....
   
   Garbage!
   
   ![在座各位都是垃圾表情图片-九蛙工具箱](https://www.jiuwa.net/pic/20170406/1491491996428429.jpg)

### MD with one ligand

#### Workflow

https://jerkwin.github.io/GMX/GMXtut-5/#%E6%A6%82%E8%BF%B0

you may use my scripts: [download here](https://cdn.jsdelivr.net/gh/gxf1212/notes@master/research/utils/gmx-md-scripts.zip), but refer to Jerkwin tutorial for details; or modify from his.

1. 将蛋白质和ligand放到分开的坐标文件中 (I don't need)

   ```shell
   grep JZ4 3HTB_clean.pdb > JZ4.pdb
   ```

   remove original H

   ```
   conda activate AmberTools20
   reduce A.pdb -Trim > A_noh.pdb
   reduce B.pdb -Trim > B_noh.pdb
   ```

2. generate topology of ligand

   see above

3. combine ligand and protein

   see above

   then same as free protein

4. em

   ```shell
   gmx grompp -f em_sol_pme.mdp -c com.gro -r com.gro -p com.top -o em.tpr -maxwarn 1 
   gmx mdrun -v -deffnm em
   echo 10 | gmx energy -f em.edr -o em.xvg # potential
   xmgrace em.xvg
   # potential turns negative??
   ```

   > if F in -CF3 connects, don't worry because gro文件仅仅是坐标文件，没有拓扑信息，VMD默认的原子之间的距离小于一定的值，就自动成键，如果你同时把拓扑信息导入就可以了。
   >
   > 注意, pdb文件中一般不包含成键连接信息, 而PyMOL像大多数分子查看软件一样绘制了原子之间的成键, 这些成键是自动根据原子间的距离来确定的.
   >
   > http://blog.sciencenet.cn/blog-548663-1082458.html

5. combine protein and ligand, water and ion

   ```shell
   gmx make_ndx -f em.gro -o index.ndx
   > 1 | 13 # protein and Mol
   > q # quit
   ```

   and change in nvt/npt.mdp as outputed: 

   ```
   energygrps = Protein_MOL Water_and_ions
   ```

6. nvt

   ```shell
   gmx grompp -f nvt.mdp -c em.gro -r em.gro -n index.ndx -p com.top -o nvt.tpr
   gmx mdrun -deffnm nvt
   echo "15\n0" | gmx energy -f nvt.edr -o nvt.xvg # temperature
   xmgrace nvt.xvg
   ```

   > only ATP reported this error (before removing H), index better than noindex
   >
   > Step 641, time 1.282 (ps)  LINCS WARNING 
   > relative constraint deviation after LINCS: 
   > rms 0.009870, max 0.261503 (between atoms 1408 and 1409) 
   > bonds that rotated more than 30 degrees: 
   > atom 1 atom 2  angle  previous, current, constraint length 
   > 1403  1404  69.3   0.0975  0.0973    0.0973 
   > 1408  1409  90.0   0.1293  0.1227    0.0973
   >
   > <u>the variables set in the GMXRC file</u>

7. npt

   ```shell
   gmx grompp -f npt.mdp -c nvt.gro -r nvt.gro -n index.ndx -t nvt.cpt -p com.top -o npt.tpr
   gmx mdrun -deffnm npt
   ```

8. check (with atp data)

   ```shell
   echo "16\n0" | gmx energy -f npt.edr -o npt-pressure.xvg
   xmgrace npt-pressure.xvg
   # may delete the first line..
   echo "22\n0" | gmx energy -f npt.edr -o npt-density.xvg # 1007.82
   xmgrace npt-density.xvg
   # additional
   echo "14\n0" | gmx energy -f npt.edr -o npt-temp.xvg # 300.077
   xmgrace npt-temp.xvg
   echo "21\n0" | gmx energy -f npt.edr -o npt-vol.xvg # volume
   xmgrace npt-vol.xvg
   ```

   ```shell
   # movie
   gmx trjconv -f npt.trr -o npt.xtc
   pwd
   # in pymol
   cd dir
   # theFormer.gro, then same name
   load nvt.gro, npt 
   load npt.xtc, npt
   show sticks,resi 4+5+6+8+9+12+13+36+44+46+48+50+31+75+76+78+80+82
   color magenta,resi 4+5+6+8+9+12+13+36+44+46+48+50+31+75+76+78+80+82
   ```

   ```shell
   # rmsd
   echo "4\n 4" | gmx rms -s npt.tpr -f npt.xtc -o rmsd_npt_bb.xvg -tu ns 
   xmgrace rmsd_npt_bb.xvg
   ```

9. run

      ```shell
   gmx grompp -f md.mdp -c npt.gro -r npt.gro -n index.ndx -t npt.cpt -p com.top -o final_com.tpr
   gmx mdrun -deffnm final_com
   gmx mdrun -deffnm final_com -nb gpu
   ```

always check:

- position restraint
- .mdp files

> backup: no index
>
> ```shell
> gmx grompp -f nvt.mdp -c em.gro -r em.gro -p com.top -o nvt.tpr
> gmx mdrun -deffnm nvt
> echo "15\n0" | gmx energy -f nvt.edr -o nvt.xvg # temperature
> xmgrace nvt.xvg
> ```
>
> 



#### Summary

for a batch of ligand:

- run setup_gaussian.sh

- run run_gaussian

- run after_gaussian

- run get_complex

- solvate and got complex

- run process complex (under Acpype!!!)

- > add #include to .top

- and do em, nvt, npt step by step

```shell
conda activate AmberTools20
tleap
source leaprc.ff99SBildn
pro = loadpdb 2cqg_1_noh.pdb
check pro 
source leaprc.gaff

loadamberparams atp_zinc_6.frcmod
lig=loadmol2 atp_zinc_6_aligned.mol2

com = combine {pro lig}
source leaprc.water.tip3p
solvatebox com TIP3PBOX 10.0
charge com
addIons2 com Cl- 14 Na+ 12 # 5206
addIons2 com Cl- 15 Na+ 13 # >5400
addIons2 com Cl- 16 Na+ 1 # 1593

charge com
check com
saveamberparm com com.prmtop com.inpcrd
quit
```

```
show sticks,resi 105+106+107+109+110+113+114+137+145+147+149+151+132+176+177+179+181+183
color magenta,resi 105+106+107+109+110+113+114+137+145+147+149+151+132+176+177+179+181+183
```



### Result

#### file formats

- `topol.tpr`: 运行输入文件, 包含模拟开始时体系的完整描述
- `confout.gro`: 结构文件, 包含最后一步的坐标和速度
- `traj.trr`: 全精度轨迹, 包括随时间变化的位置, 速度和力
- `traj.xtc`: 压缩轨迹, 轻量, 只包含低精度(0.001 nm)的坐标信息
- `ener.edr`: 随时间变化的有关能量数据
- `md.log`: 模拟过程的日志, 包含模拟过程中的信息

#### Trajectory files

- final.xtc (obtained from the simulation): also ok for visualization, but will cross the faces of your box
- `noPBC`保持结构完好，不会通过一个面跳跃到相对的一个面
- `nojump`把体系放在最中间，使所有原子处于盒子中；但溶剂会飞向无穷远

> 教程中性质计算都用这个。实际上各种轨迹算出来的有一点小差别，最好还是全部nojump

获得xtc文件后, 如果在后续分析中不需要速度和力的话, 你可以删除trr文件.

#### free result commands

1. visualization

   ```shell
   gmx trjconv -f final_2cqg.trr -o final_2cqg.xtc -dt 50
   echo 0 | gmx trjconv -s final_2cqg.tpr -f final_2cqg.xtc -o final_2cqg_noPBC.xtc -pbc mol -ur compact -dt 50
   ```

   ```shell
   load npt.gro, final_2cqg
   load final_2cqg_noPBC.xtc, final_2cqg
   show sticks,resi 4+5+6+8+9+12+13+36+44+46+48+50+31+75+76+78+80+82
   color magenta,resi 4+5+6+8+9+12+13+36+44+46+48+50+31+75+76+78+80+82
   ```

2. distance

   ```shell
   echo 4 | gmx mindist -f final_2cqg.xtc -s final_2cqg.tpr -od minimal-periodic-distance.xvg -pi # choose 4 backbone
   xmgrace minimal-periodic-distance.xvg
   ```

3. rmsd, rmsf

   ```shell
   echo 0 | gmx trjconv -f final_2cqg.xtc -o final_2cqg_nojump_2.xtc -pbc nojump -dt 50
   echo "4\n 4" | gmx rms -s final_2cqg.tpr -f final_2cqg_nojump_2.xtc -o rmsd_bb.xvg -tu ns 
   xmgrace rmsd_bb.xvg
   echo 4 | gmx rmsf -f final_2cqg.xtc -s final_2cqg.tpr -o rmsf-per-residue.xvg -ox average.pdb -oq bfactors-residue.pdb -res
   xmgrace rmsf-per-residue.xvg
   ```

   to pick a time interval:

   ```shell
   gmx trjconv -f final_2cqg.trr -o final_2cqg_20-50.xtc -b 20000 -e 50000 -dt 50
   echo 0 | gmx trjconv -f final_2cqg.xtc -o final_2cqg_nojump_20-50.xtc -pbc nojump -b 20000 -e 50000 -dt 50
   echo "4\n 4" | gmx rms -s final_2cqg.tpr -f final_2cqg_nojump_20-50.xtc -o rmsd_bb_20-50.xvg -tu ns 
   xmgrace rmsd_bb_20-50.xvg
   echo 4 | gmx rmsf -f final_2cqg_20-50.xtc -s final_2cqg.tpr -o rmsf-per-residue_20-50.xvg -ox average_20-50.pdb -oq bfactors-residue_20-50.pdb -res
   xmgrace rmsf-per-residue_20-50.xvg
   ```

4. get pdb

   ```shell
   echo 1 | gmx trjconv -f final_2cqg_nojump_2.xtc -s final_2cqg.tpr -o traj.pdb -tu ns
   
   split_state traj
   run /home/gxf/Desktop/xufan/MD/real-simulation/further/align_traj.py # 961
   run /home/gxf/Desktop/xufan/MD/real-simulation/first-run/align_traj.py # 201
   # change to a contrasting color
   color yellow, traj* 
   show show sticks, resn MOL
   ```

5. properties

   - Rg

     ```shell
     echo 1 | gmx gyrate -s final_2cqg.tpr -f final_2cqg.xtc -o gyrate.xvg
     xmgrace gyrate.xvg
     ```

   - sasa

     ```shell
     echo 1 | gmx sasa -f final_2cqg_nojump.xtc -s final_2cqg.tpr -n index.ndx -o sasa.xvg
     xmgrace sasa.xvg
     echo 1 | gmx sasa -f final_2cqg_later_nojump.xtc -s final_2cqg.tpr -n index.ndx -or sasa-residue.xvg
     xmgrace sasa-residue.xvg
     ```

   - hbond

     ```shell
     echo "1\n 13" | gmx hbond -f final_2cqg_nojump.xtc -s final_2cqg.tpr -num pro_lig_hnum.xvg -ang pro_lig_hang.xvg # protein and ligand
     xmgrace pro_lig_hnum.xvg
     xmgrace pro_lig_hang.xvg
     ```

6. 

#### ligand-result commands (not corrected!!!)

good resources

- [分子动力学模拟数据的分析一（详细！）](https://jerkwin.github.io/2017/10/20/GROMACS%E5%88%86%E5%AD%90%E5%8A%A8%E5%8A%9B%E5%AD%A6%E6%A8%A1%E6%8B%9F%E6%95%99%E7%A8%8B-%E5%A4%9A%E8%82%BD-%E8%9B%8B%E7%99%BD%E7%9B%B8%E4%BA%92%E4%BD%9C%E7%94%A8/#%E7%AC%AC%E4%B8%89%E9%83%A8%E5%88%86-%E5%88%86%E5%AD%90%E5%8A%A8%E5%8A%9B%E5%AD%A6%E6%A8%A1%E6%8B%9F%E6%95%B0%E6%8D%AE%E7%9A%84%E5%88%86%E6%9E%90%E4%B8%80)
- https://jerkwin.github.io/GMX/GMXtut-0 also detailed
- https://zhuanlan.zhihu.com/p/149863158
- https://www.mdanalysis.org/MDAnalysisTutorial

> save fig in xmgrace: file--print setup--check "print to file" and edit filename--file--print, or
>
> ```shell
> grace -nxy input.xvg -hdevice PNG -hardcopy -printfile output.png
> ```
>
> the units are all nm

1. check properties

   usually they are satisfied...

   ```shell
   echo "16\n0" | gmx energy -f final_com.edr -o final_com-pressure.xvg
   xmgrace final_com-pressure.xvg
   echo "22\n0" | gmx energy -f final_com.edr -o final_com-density.xvg
   xmgrace final_com-density.xvg
   echo "14\n0" | gmx energy -f final_com.edr -o final_com-temp.xvg
   xmgrace final_com-temp.xvg
   echo "21\n0" | gmx energy -f final_com.edr -o final_com-vol.xvg
   xmgrace final_com-vol.xvg
   ```

2. visualization

   ```shell
   gmx trjconv -f final_com.trr -o final_com.xtc -dt 50 # fundamental
   echo 0 | gmx trjconv -s final_com.tpr -f final_com.xtc -n index.ndx -o final_com_noPBC.xtc -pbc mol -ur compact -dt 50
   # -pbc mol: to consider pbc when running out, do not show protein crossing the box
   ```

   > optional
   >
   > ```shell
   > bash center.sh
   > echo 0 | gmx trjconv -s final_com.tpr -f final_com.xtc -n index_center.ndx -o final_com_noPBC.xtc -pbc mol -ur compact -dt 50
   > ```

   pymol

      ```python
   load npt.gro, final_com
   load final_com_noPBC.xtc, final_com
   show sticks,resi 4+5+6+8+9+12+13+36+44+46+48+50+31+75+76+78+80+82
   color magenta,resi 4+5+6+8+9+12+13+36+44+46+48+50+31+75+76+78+80+82
      ```

   - http://www.mdbbs.org/thread-9782-1-1.html

     同五楼，对MD没有影响，在分析和view的时候，可以用ptraj 把分子放到盒子中间，可以先
     center mask
     image center familiar
      trajout mdcrd
     一般你的分子就到盒子中间了。。
      具体在ambertools的manual上有。。。

3. 周期性映像间的最小距离

   ```shell
   echo 4 | gmx mindist -f final_com.xtc -s final_com.tpr -od minimal-periodic-distance.xvg -pi # choose 4 backbone
   xmgrace minimal-periodic-distance.xvg
   ```

4. no jump trajectory, **prepare for next**

   ```shell
   echo 0 | gmx trjconv -f final_com.xtc -o final_com_nojump.xtc -pbc nojump -dt 50
   ```

5. get rmsd

   RMSD通常用于表征结构到平衡态的收敛情况. 如前面所讲, RMSD是结构变化对原子总数的平均, 基本上是一个距离表征, 低的值最有意义. (使用初始结构作为参考结构)

   ```shell
   # all choose 4 backbone
   echo "4\n 4" | gmx rms -s final_com.tpr -f final_com_nojump.xtc -o rmsd_bb.xvg -tu ns 
   xmgrace rmsd_bb.xvg
   xmgrace -nxy rmsd_bb.xvg -hdevice PNG -hardcopy -printfile rmsd_bb.png
   
   # all choose 1 protein
   echo "1\n 1" | gmx rms -s final_com.tpr -f final_com_nojump.xtc -o rmsd_pro.xvg -tu ns
   xmgrace rmsd_pro.xvg
   ```

6. get rmsf

   除了能量等性质, 也能够通过结构的变化和弛豫来考察模拟趋向平衡的收敛性. 通常,  这种弛豫仅仅使用结构到参考结构(如晶体结构)的欧几里德距离来衡量. 这一距离被称为均方根偏差(RMSD). 然而,  我们也建议再考察一下到平均结构的弛豫, 即相对于平均结构的RMSD, 个中原因将在下节说明. 但是要计算相对于平均结构的RMSD,  需要首先获得平均结构. 平均结构可以在计算[均方根波动(RMSF)](http://en.wikipedia.org/wiki/Root_mean_square_fluctuation)时顺便获得.

   RMSF计算每个原子相对于其平均位置的涨落, 表征了结构的变化对时间的平均, 给出了蛋白各个区域柔性的表征,  对应于晶体学中的b因子(温度因子). 通常, 我们预期RMSF和温度因子类似, 这可以用于考察模拟结果是否与晶体结构符合.  RMSF(和平均结构)使用`rmsf`命令计算. `-oq`选项可以计算b因子, 并将其添加到参考结构中. 我们最关心的是每个残基的涨落, 这可使用选项`-res`设定.

   get rmsf, average, b-factors

   ```shell
   # backbone
   echo 4 | gmx rmsf -f final_com.xtc -s final_com.tpr -o rmsf-per-residue.xvg -ox average.pdb -oq bfactors-residue.pdb -res
   xmgrace rmsf-per-residue.xvg
   xmgrace -nxy rmsf-per-residue.xvg -hdevice PNG -hardcopy -printfile rmsf-per-residue.png
   ```


    使用`xmgrace`查看RMSF的图形, 区分柔性和刚性区域.

7. secondary structure

   just calculate from python. need a traj.pdb. to prepare:

   >    `.xvg`文件包含一个时间序列, 列出了每帧中与每一二级结构类型相关的残基数目. 
   >
   >    更多的细节在.xpm文件中, 它使用颜色编码了每个残基在一段时间内的二级结构.
   >
   >    ```shell
   >    gmx do_dssp -f final_com_nojump.xtc -s final_com.tpr -o secondary-structure.xpm -sc secondary-structure.xvg
   >    xmgrace secondary-structure.xvg
   >    gmx xpm2ps -f secondary-structure.xpm -o secondary-structure.eps -size 4000
   >    ps2pdf secondary-structure.eps
   >    ```

8. get the pdbs

   ```shell
   # protein and mol
   echo 24 | gmx trjconv -f final_com_nojump.xtc -s final_com.tpr -n index.ndx -o traj.pdb -tu ns
   # in pymol. no need to specify wd
   split_state traj
   run /home/gxf/Desktop/xufan/MD/real-simulation/further/align_traj.py # 961
   run /home/gxf/Desktop/xufan/MD/real-simulation/first-run/align_traj.py # 201
   # change to a contrasting color
   color yellow, traj* 
   show 
   show sticks, resn MOL
   ```

   采用Pymol画豪猪图 http://kangsgo.com/156.html   https://zhuanlan.zhihu.com/p/149863158

   ```
   
   ```

   查看小分子的运动轨迹?? just see in pymol

9. gmx_mmpbsa

   - http://ambermd.org/tutorials/advanced/tutorial3/py_script/section3.htm   
   - https://github.com/Valdes-Tresanco-MS/gmx_MMPBSA/tree/master/docs/examples in `/home/gxf/Desktop/xufan/MD/try0/examples`, some of which is outdated, also see this https://pypi.org/project/gmx-MMPBSA/1.0.0/
   - params: refer to Amber manual P759
   - debug
     - http://muchong.com/t-9083279-1 DecompError: Mismatch in number of decomp terms!

   > MM/PBSA的预测结果更接近实验数值，而MM/GBSA则对相对结合自由能预测性能更优。 http://blog.sciencenet.cn/blog-2877557-1268444.html
   >
   > PB costs a lot of time.... in /simulation-past/further/atp-2nd, there's a result of PB
   >
   > GB needs several minutes. 2.074 min 50ns (30)
   >
   > On the other hand, in the so-called Multiple Trajectory (MT) approximation, the snapshots for each one of the species (i.e. complex, receptor, and ligand) are extracted from their own trajectory file. This approximation, theoretically more rigorous though, leads to higher standard deviation of the binding free energies. We use ST
   >
   > You should use the default mask assignment if possible because it provides a good error catch.

   > other useless:
   >
   > AMBER tutorial https://jerkwin.github.io/2018/01/28/AMBER%E9%AB%98%E7%BA%A7%E6%95%99%E7%A8%8BA3-MM-PBSA/
   >
   > https://jerkwin.github.io/GMX/GMXtut-9/   some fundamental knowledge
   >
   > normal .xtc, not nojump?

   1. principle

      https://en.wikipedia.org/wiki/Implicit_solvation#Generalized_Born_model equation

      http://sobereva.com/42

   2. run

      ```shell
      gmx trjconv -f final_com.trr -o final_com_later.xtc -b 2000 -e 10000 -dt 50
      # single trajectory method, and collect file into a folder
      # same for decomposition, but costs too much time...
      # mmpbsa-decomp-10.in	mmpbsa-50.in	mmpbsa-decomp-50.in
      conda activate AmberTools20
      gmx_MMPBSA -O -i mmpbsa-10.in -cs final_com.tpr -ci index.ndx -cg 1 13 -ct final_com_later.xtc -lm atp_pubchem_5_aligned.mol2 -nogui
      mkdir gmx_MMPBSA
      mv _GMXMMPBSA_* ./gmx_MMPBSA
      mv COM* LIG.prmtop REC.prmtop reference.frc gmx_MMPBSA.log FINAL_RESULTS_MMPBSA.dat ./gmx_MMPBSA
      ```

      - The script creates <u>three unsolvated mdcrd</u> files (complex, receptor, and ligand) using ptraj that are the coordinates analyzed during the GB and PB calculations. 
      - The <u>*.mdout files</u> contain the <u>energies for all frames</u> specified. 
      - A PDB file of the average structure is created align (via RMS) all snapshots to <u>prepare for a quasi-harmonic entropy calculation</u> with ptraj if one is requested. 
      - All files created by MMPBSA.py should begin <u>with the prefix '_MMPBSA_'</u> except for the final output file.
      - When a topology file is defined, the ligand mol2 file is not needed. The ligand mol2 file only required when `gmx_MMPBSA` build the amber topology from a structure

   3. ana

      ```shell
      gmx_MMPBSA_ana -p ./gmx_MMPBSA/_GMXMMPBSA_info 
      # pop out a window same as when the program finished, showing all components changing with time
      ```

      > VDWAALS = van der Waals contribution from MM.
      > EEL = electrostatic energy.
      > EPB/EGB = the electrostatic contribution to the solvation free energycalculated by PB or GB respectively.
      > ESURF/ECAVITY/ENPOLAR = nonpolar contribution to the solvation free energy calculatedby an empirical model.
      > DELTA G binding = final estimated binding free energy calculated from the terms above. (kcal/mol)

      read with python: https://gohom.win/2016/03/30/amber-mmpbsa/

      plot result: https://www.jianshu.com/p/615328ef542d

   4. other

      ```shell
      conda activate AmberTools20
      for f in `ls -F | grep ligand`; do 
      cd $f
      mol2=`ls | grep _aligned.mol2`
      rm -rf mmpbsa-10.in
      rm -rf ./gmx_MMPBSA
      cp /home/gxf/Desktop/xufan/MD/real-simulation/mmgbsa-50.in ./
      gmx_MMPBSA -O -i mmgbsa.in -cs final_com.tpr -ci index.ndx -cg 1 13 -ct final_com_later.xtc -lm ${mol2} -nogui
      mkdir ./gmx_MMPBSA
      mv _GMXMMPBSA_* ./gmx_MMPBSA
      mv COM* LIG.prmtop REC.prmtop reference.frc gmx_MMPBSA.log FINAL_RESULTS_MMPBSA.dat ./gmx_MMPBSA
      for fi in `ls | grep '#'`; do
      rm -rf $fi
      done
      cd ..
      done
      cd ..
      ```

      ```shell
      # pbsa
      conda activate AmberTools20
      cp /home/gxf/Desktop/xufan/MD/real-simulation/mmpbsa-50.in ./
      mol2=`ls | grep _aligned.mol2`
      gmx_MMPBSA -O -i mmpbsa-50.in -cs final_com.tpr -ci index.ndx -cg 1 13 -ct final_com_later.xtc -lm ${mol2} -nogui
      mkdir ./gmx_MMPBSA-pbsa
      mv _GMXMMPBSA_* COM* LIG.prmtop REC.prmtop reference.frc gmx_MMPBSA.log FINAL_RESULTS_MMPBSA.dat ./gmx_MMPBSA-pbsa
      ```

      in amber

      ```shell
      echo 0 | gmx trjconv -s final_com.tpr -f final_com.xtc -n index.ndx -o final_com_later_noPBC.xtc -pbc mol -ur compact -dt 50 -b 20000 -e 50000 
      # conda activate AmberTools20
      MMPBSA.py -O -i mmgbsa-decomp.in -cp com.prmtop -y final_com_later_noPBC.xtc
      mkdir gmx_MMGBSA-decomp
      mv _MMPBSA_* gmx_MMPBSA.log FINAL_RESULTS_MMPBSA.dat FINAL_DECOMP_MMPBSA.dat ./gmx_MMGBSA-decomp
      
      gmx_MMPBSA_ana -p ./gmx_MMGBSA-decomp/_MMPBSA_info
      ```

      > other
      >
      > ```shell
      > # P765
      > # conda activate AmberTools
      > mdconvert -o final_com_later.crd final_com_later.xtc 
      > ```
      >
      > 

10. solvent accessible surface area

    https://qinqianshan.com/bioinformatics/protein_design/solvent-accessibility/

    疏水相互作用被认为是驱动蛋白质折叠的主要作用力，与溶剂接触的区域都是极性区域，也就是疏水作用力比较弱的区域。因此通过研究蛋白质表面与溶剂的接触情况， 能够用来研究蛋白质的疏水性, 稳定性，蛋白蛋白相互作用，蛋白折叠等。

    某种程度上和分子的溶解自由能相关，对于表面完全疏水的大分子，可以近似认为其溶解自由能和其SASA成正比，对于既有亲水和疏水表面的分子SASA和溶解自由能的关系可能会复杂一些。

    溶剂可及表面积可还可进一步细分为亲水性SAS和疏水性SAS. 

    the bigger sasa is, the more it is exposed to water (hydrophilic)

    ```shell
    echo 1 | gmx sasa -f final_com_nojump.xtc -s final_com.tpr -n index.ndx -o sasa.xvg -or sasa-residue.xvg
    xmgrace sasa.xvg
    xmgrace sasa-residue.xvg
    ```

    - `-o`: Total area as a function of time
    - `-or`: Average area per residue
    - `-odg`: Estimated solvation free energy as a function of time

11. `g_hbond`统计氢键

    ```shell
    echo "1\n 20" | gmx hbond -f final_com_nojump.xtc -s final_com.tpr -num pro_wat_hnum.xvg -ang pro_wat_hang.xvg # protein and water
    xmgrace pro_wat_hnum.xvg # num with time
    xmgrace pro_wat_hang.xvg # angle distribution
    echo "1\n 13" | gmx hbond -f final_com_nojump.xtc -s final_com.tpr -num pro_lig_hnum.xvg -ang pro_lig_hang.xvg # protein and ligand
    xmgrace pro_lig_hnum.xvg
    xmgrace pro_lig_hang.xvg
    ```

12. 聚类分析

    ```shell
    mkdir cluster
    cd cluster
    rm -rf ./*
    gmx cluster -s ../final_com.gro -f ../final_com.xtc -dm rmsd-matrix.xpm -dist rmsd-distribution.xvg -o clusters.xpm -sz cluster-sizes.xvg -tr cluster-transitions.xpm -ntr cluster-transitions.xvg -clid cluster-id-over-time.xvg -cl clusters.pdb -cutoff 0.2 -method gromos
    xmgrace cluster-id-over-time.xvg
    cd ..
    ```

    Distances between structures can be determined from a trajectory or read from an .xpm (page 433) matrix file with the -dm option

    • -dist writes the RMSD distribution.
    • -ev writes the eigenvectors of the RMSD matrix diagonalization.
    • -sz writes the cluster sizes.
    • -tr writes a matrix of the number transitions between cluster pairs.
    • -ntr writes the total number of transitions to or from each cluster.
    • -clid writes the cluster number as a function of time.

13. salt bridge

    ```shell
    mkdir saltbridge
    cd saltbridge
    rm -rf ./*
    gmx saltbr -f ../final_com_nojump.xtc -s ../final_com.tpr -t 0.5 -sep
    cd ..
    ```

    程序会输出一系列xvg文件, 给出-/-, +/-(最关注的)和+/+残基间的距离. 当需要时, 通过设置`-sep`选项, 这个程序可以为每对相反的带电残基产生一个输出文件, 这些残基位于轨迹中的某点, 彼此处于一定的截断距离范围内(这里是0.5 nm, 通过`-t`选项设置). 这将产生许多文件, 所以分析时最好建立一个单独的目录. 

    not so meaningful

14. 蛋白质回旋半径

    回旋半径可以表征蛋白质结构的紧实度，同样也可以依靠回旋半径来表征模拟过程中蛋白质的肽链松散程度的变化

    ```shell
    echo 1 | gmx gyrate -s final_com.tpr -f final_com.xtc -o gyrate.xvg
    xmgrace gyrate.xvg
    ```

15. 构象主成分分析

    一个常用的, 但常常理解不深的分析方法是对轨迹进行主成分分析(PCA, PrincipalComponents Analysis).  这种方法有时候也称为本征动力学(ED, essential dynamics), 目的在于识别原子的大尺度集约运动,  从而揭示隐藏在原子波动后面的结构信息, <u>帮助确定哪些运动方式对蛋白质的整体动力学贡献最大</u>.

    ```shell
    mkdir covar
    cd covar
    rm -rf ./*
    gmx covar -s ../final_com.tpr -f ../final_com.xtc -o eigenvalues.xvg -v eigenvectors.trr -xpma covar.xpm ascii covariances.dat
    cd ..
    ```

16. calculate distance, angle, etc.

    https://jerkwin.github.io/2018/01/14/GROMACS%E8%AE%A1%E7%AE%97%E8%B7%9D%E7%A6%BB%E7%9A%84%E6%96%B9%E6%B3%95%E5%8F%8A%E6%B3%A8%E6%84%8F%E7%82%B9/

    > https://jerkwin.github.io/GMX/GMXman-8/

    ```
    
    ```

17. ramachandran plot for rationality

    ```shell
    gmx rama -f final_com_later_nojump.xtc -s final_com.tpr -o ramachandran.xvg
    xmgrace ramachandran.xvg
    egrep "@|LEU-24" ramachandran.xvg > rama-LEU-24.xvg
    
    for f in `ls|grep ligand_`; do
    cd $f
    echo 1 | gmx trjconv -s final_com.tpr -f final_com.xtc -n index.ndx -o final_com_rama.xtc -pbc mol -ur compact -b 20000 -e 50000 -dt 300
    echo 1 | gmx trjconv -f final_com_rama.xtc -s final_com.tpr -n index.ndx -o traj_rama.pdb -tu ns
    cd ..
    done
    ```

    http://molprobity.biochem.duke.edu

    upload pdb file, do **Multi-model Ramachandran plot kinemage** only. download result and read

    > results:
    >
    > ~5min to upload/process 151 pdb files
    >
    > trim+rama: 4sec for 1 file
    >
    > | sys         | favored (98%) | allowed | outlier (<0.2%) |
    > | ----------- | ------------- | ------- | --------------- |
    > | free        | 96.25%        | 3.49%   | 0.24%           |
    > | ATP         | 96.19%        | 3.53%   | 0.28%           |
    > | azilsartan  | 96.87%        | 2.89%   | 0.24%           |
    > | lumacaftor  | 96.65%        | 3.20%   | 0.15%           |
    > | ponatinib   | 96.15%        | 3.37%   | 0.33%           |
    > | midostaurin | 96.20%        | 3.56%   | 0.24%           |
    > | indacaterol | 96.46%        | 3.17%   | 0.37%           |

18. d

#### summary result commands (updating)

want full time for property-time, but want "later" for per residue...

input: .tpr, .xtc, .ndx

1. visualization

   ```shell
   gmx trjconv -f final.trr -o final.xtc -dt 50
   echo 0 | gmx trjconv -s final.tpr -f final.xtc -n index.ndx -o final_noPBC.xtc -pbc mol -ur compact -dt 50 # choose 0 system
   ```

   ```shell
   load npt.gro, final
   load final_noPBC.xtc, final
   show sticks,resi 4+5+6+8+9+12+13+36+44+46+48+50+31+75+76+78+80+82
   color magenta,resi 4+5+6+8+9+12+13+36+44+46+48+50+31+75+76+78+80+82
   ```

   ```shell
   vmd npt.gro final.xtc
   ```

2. distance

   ```shell
   echo 4 | gmx mindist -f final.xtc -s final.tpr -od minimal-periodic-distance.xvg -pi # choose 4 backbone, similar to C alpha. but for whole protein, it's much smaller???
   xmgrace minimal-periodic-distance.xvg
   ```

3. prepare

   ```shell
   gmx trjconv -f final.trr -o final_later.xtc -b 2000 -e 10000 -dt 50 # exclude initial state
   echo 0 | gmx trjconv -f final.trr -o final_nojump.xtc -pbc nojump -dt 50 # full no jump
   echo 0 | gmx trjconv -f final.trr -o final_later_nojump.xtc -pbc nojump -b 2000 -e 10000 -dt 50 # later no jump
   ```

4. rmsd, rmsf

   ```shell
   echo "3\n 3" | gmx rms -s final.tpr -f final_nojump.xtc -o rmsd_ca.xvg -tu ns # C alpha
   xmgrace rmsd_ca.xvg
   echo 3 | gmx rmsf -s final.tpr -f final_nojump.xtc -o rmsf-per-residue.xvg -ox average.pdb -oq bfactors-residue.pdb -res
   xmgrace rmsf-per-residue.xvg
   echo "17\n 17" | gmx rms -s final.tpr -f final_nojump.xtc -o rmsd_lig.xvg -tu ns
   ```

5. get pdb

   ```shell
   echo 24 | gmx trjconv -s final.tpr -f final_nojump.xtc -n index.ndx -o traj.pdb -tu ns
   # in pymol
   split_state traj
   run /home/gxf/Desktop/xufan/MD/real-simulation/further/align_traj.py 
   run /home/gxf/Desktop/xufan/MD/real-simulation/further/align_traj_cus.py # 961
   run /home/gxf/Desktop/xufan/MD/real-simulation/first-run/align_traj.py # 201
   # tools
   run /home/gxf/Desktop/xufan/MD/real-simulation/first-run/align.pml
   hide sticks, resi 1-84
   show sticks, resi 12+44+46+48
   show sticks, resi 44+46+9
   
   save traj_1001.pdb, traj_1001
   
   show sticks,resi 4+5+6+8+9+12+13+36+44+46+48+50+31+75+76+78+80+82
   color magenta,resi 4+5+6+8+9+12+13+36+44+46+48+50+31+75+76+78+80+82
   ```

6. properties

   - Rg

     ```shell
     echo 1 | gmx gyrate -s final.tpr -f final_nojump.xtc -o gyrate.xvg
     xmgrace gyrate.xvg
     ```

   - sasa

     ```shell
     echo 1 | gmx sasa -f final_nojump.xtc -s final.tpr -n index.ndx -o sasa.xvg
     xmgrace sasa.xvg
     echo 1 | gmx sasa -f final_later_nojump.xtc -s final.tpr -n index.ndx -or sasa-residue.xvg
     xmgrace sasa-residue.xvg
     ```

   - hbond

     ```shell
     echo "1\n 13" | gmx hbond -f final_nojump.xtc -s final.tpr -num pro_lig_hnum.xvg -ang pro_lig_hang.xvg # protein and ligand
     xmgrace pro_lig_hnum.xvg
     xmgrace pro_lig_hang.xvg
     ```

7. mmpbsa

   ```shell
   conda activate AmberTools20
   mol2=`ls | grep _aligned.mol2`
   gmx_MMPBSA -O -i mmgbsa.in -cs final.tpr -ci index.ndx -cg 1 13 -ct final_later_noPBC.xtc -lm ${mol2} -nogui
   mkdir ./gmx_MMGBSA
   mv _GMXMMPBSA_* COM* LIG.prmtop REC.prmtop reference.frc gmx_MMPBSA.log FINAL_RESULTS_MMPBSA.dat ./gmx_MMGBSA
   
   gmx_MMPBSA_ana -p ./gmx_MMPBSA/_GMXMMPBSA_info 
   ```

8. gmx do_dssp?

9. 



#### summary on result analysis in literature

##### principles

- if not must exclude the first few seconds, we can include
- often calculate mean and standard deviation
- we want screening criteria

##### items

- see if it's stable?? 

  - position 我们从分子动力学轨迹最后的 200 ns 中间隔 50 ns 均匀提取五个结构。

- rmsd (C$\alpha$ atom)

  - is about stability, default the difference from the starting structure

  - evaluate the time required for a system to reach structural equilibrium

  - **calculate its mean and stddev** **after equillibrium** (2ns, 20ns?)

  - large: structure changed. what change? mostly not good..?

  - ligand: implying that the bound NS2B cofactor is still capable to sample a large ensemble of conformations. 

    > Further, investigation of the ligands rmsd was conducted. This unravels the flexibility of the ligands in the pocket at specific times followed by enhanced conformational stability towards the end of the simulation.

  - 

- rmsf **after equilibrium (C$\alpha$ atom)**

  - label those higher than average
  - <u>repeat 3 times? analyze in batch...</u>

  > these two: lower better...(average), not considering initial structure etc.

- Rg and sasa

  flexibility vs stability (with H bond..) may just make a table for reference

  - radius of gyration: 
    - lower means stable
  - sasa: lower (in GBSA, param is positive)
    -  (SASA) measures the ligand induced conformational changes (<u>with original</u>) over the period of simulation

- energy

  - non-polar binding free energy (<u>van der Waal interaction</u>) decreased indicating much stronger binding
  - average MM energy?
  - **contribution of all energy components. which is negative and which positive**
  - **decomposition by residue**
    - those which are negative is to stabilize
    - analyze energy components and structures

- dynamic cross-correlation matrix

  - https://www.mpibpc.mpg.de/grubmueller/g_correlation more accurate way to find correlation
  - (different) 对二者的协方差矩阵进行对角线化，得到 P II 所有本征向量所对应的本征值之和（总平方波动）为 4.1332 ｎｍ２，高于 PR 1 的总平方波动值2.3586 nm２．这一结果与前述动态几何属性比较结果一致，均说明 P II 具备比 PR I 强的整体构象柔性

- ss, and statistical analysis of structure analysis, 

  like similarity with free, residue ss distribution, 

- Ramachandran plot

  https://warwick.ac.uk/fac/sci/moac/people/students/peter_cock/python/ramachandran/drawing/#downloads

  Favored, % 75.9 72.9
  Allowed, % 18.2 21.4
  Generously allowed, % 3.5 3.2
  Disallowed, % 2.4 2.4

- 

> - Hydrogen bond analysis is performed to know the flexibility of ligand protein and protein ligand stable conformations. Higher hydrogen bonding maintains higher protein stable conformations
>   - considering the cut-off 3.0 Å and cut-off angle of 20 degree
>   - 更少的氢键数（ＮＨＢ）和范德华接触（ＮＮＣ）．以上结果均说明 ＰＲ１ 底物结合部位具有更强的构象柔性．
>   - I think not significant for my system
> - 分析配体到蛋白质表面的径向分布函数，可以获得稳定时期配体到蛋白质表面的距离等信息。
> - PCA
>   - The first 10 eigenvectors of the apo-NSP9 and its complexes with ... showed slightly <u>lower motions</u> than the other predicted hits, while the apo-NSP9 showed less global motions than the other systems (Figure 3a). The PCA analysis result suggested that avodart formed a slightly <u>more stable</u> complex
> - 自由能图谱的特征. local minima
>   - the number of LM means stable sub-conformations
>   - the energy means stability (in reverse, flexibility)
> - The entropy contribution
>   - computationally expensive, we only considered 10 snapshots from the MD simulation trajectories
>   - won't calculate because not much contribution
> - the trajectory was analyzed for the volume variation of both the allosteric and the ATP binding pockets, for the purpose of identifying a conformational ensemble in which the ATP pocket will be in an occluded state and the allosteric one being most exposed. By doing so, we were aiming to utilize that conformation to identify small molecules with good binding afnities to the allosteric pocket that could trap the enzyme in this (inactive) conformational state.
> - 
> - 规则二级结构残基数目(SSE)?
> - structural alternation?



### Debug

1. system explosion (blowing up), too large force: [from Jerkwin](https://jerkwin.github.io/2016/12/28/GROMACS%E6%9C%AF%E8%AF%AD-%E7%88%86%E7%A0%B4(Blowing_Up)/)

2. 谈谈分子动力学模拟蛋白-配体复合物过程中配体发生脱离的原因 http://sobereva.com/632

3. a common gmx problem

   ```
   The optimal PME mesh load for parallel simulations is below 0.5
    and for highly parallel simulations between 0.25 and 0.33,
    for higher performance, increase the cut-off and the PME grid spacing.
   ```

   box too big!

   [gmx-users: increasing cut-off and PME grid spacing (narkive.com)](https://gromacs.org-gmx-users.maillist.sys.kth.narkive.com/J6lqsB6H/gmx-users-increasing-cut-off-and-pme-grid-spacing)

4. aa

   ```
   Fatal error:
   The [molecules] section of your topology specifies more than one block of
   a [moleculetype] with a [settles] block. Only one such is allowed.
   If you are trying to partition your solvent into different *groups*
   (e.g. for freezing, T-coupling, etc.), you are using the wrong approach. Index
   files specify groups. Otherwise, you may wish to change the least-used
   block of molecules with SETTLE constraints into 3 normal constraints.
   ```

   I encoutered this when I: put crystal water before the protein (not the last component before solvation)
   solution: put all water molecules together

5. 

## NAMD+CHARMM+CgenFF

> from FYP

### CHARMM-GUI for ligands

see also FEbuilder document...

Preface: CgenFF is thought to be not as good as GAFF series...however it (or MATCH) is more transferable. And I prefer dual topology in FEP. ~~BTW, we focus on the final properties in MD simulation, not really the individual charges??~~

But CgenFF does not support special species like:

- azide (-N=N=N)
- -SeH and many heavy atoms
- ....

You can follow two pathways:

- edit your ligand locally and save as `.mol2` or `.sdf` file, so that GUI gets a nearly correct structure (not possibly 100% right...)
- or save a roughly-right (e.g. `.pdb`) file and

**Check the structure on the MarvinJS panel before and after parameterization!!!!** like

- bond orders, especially for pdb files
- the Ar ring completeness
- protonation states
  - add Hs to amine groups
  - remove Hs added to phosphate....

- add all hydrogens explicitly! including non-polar hydrogens
- Atom names with lowercase letters (like Cl, Br) might be recognized incorrectly, e.g. only capitalized letter are left. 
- ...

<img src="E:\GitHub-repo\notes\research\Protein-ligand-simulation.assets\charmm-gui-ligandrm-eg.png" style="zoom:50%;" />

Usually we won't need to "Find similar residues in the CHARMM FF" if the ligand is not in CgenFF database. This option is not to specify a template to copy parameters from, but just build this molecule...and it takes longer to search.

Choose 'Exact', 'Make CGenFF topology'. Then we obtain all files as a .zip file.

- we use `ligandrm.pdb` (maybe `ligandrm.psf`, `toppar/lig.rtf`, `toppar/lig.prm` (lig: residue name of your ligand) 
- the `gromacs` folder is for gmx
- `drawing_3D.mol2`: structure on the MarvinJS panel
- refer to [this video](https://www.youtube.com/watch?v=Pj40ZnybXds)

Note: it's ok to upload a protein-ligand complex `.pdb` file. CHARMM-GUI parametrizes the ligand and produces `.psf` and `.pdb` file of the whole that can be solvated and ionized in vmd. Try this if your protein does not need special treatment. I don't really follow this, though.

#### Other ways to generate ligand topology

- https://cgenff.umaryland.edu is what CHARMM-GUI calls for an ligand
  - we might call it through http request or an extension in vmd (not tried)
  - stupidly we cannot `wget` files, just Ctrl+S on the web page

- https://brooks.chem.lsa.umich.edu/index.php?matchserver=submit MATCH: an alternative of CgenFF
  - trained with CgenFF ligands?
  - strange shorten atom types that causes incompatibility
  - similar parameters, (maybe) better transferability

- https://www.swissparam.ch/ MMFF/CHARMM22, too old

these servers generate files for multiple MD engines

### Setup with VMD

[How to create a PSF file](https://sassie-web.chem.utk.edu/docs/structures_and_force_fields/notes.html)

```tcl
# usage: vmd -dispdev text -e merge-and-solvate.tcl > vmd.log

package require psfgen
psfcontext reset
# force field
topology "toppar/top_all36_carb.rtf"
topology "toppar/top_all36_na.rtf"
topology "toppar/top_all36_prot.rtf"
topology "toppar/top_all36_cgenff.rtf"
topology "toppar/toppar_water_ions_namd.str"

# load hybrid
topology lig.rtf
segment LIG {pdb ligandrm.pdb}
coordpdb ligandrm.pdb LIG
# I think rtf file is usually more useful, but the capability to read psf files is an advantage over tleap and gmx!
# readpsf ligandrm.psf
# coordpdb ligandrm.pdb

# crystal water
# segment CRW {
#     pdb crw.pdb
#     auto none
# }
# coordpdb crw.pdb CRW

# load receptor
pdbalias residue HIS HSE
pdbalias atom ILE CD1 CD
pdbalias atom SER HG HG1
pdbalias atom CYS HG HG1
segment PRO {
    pdb pr1.pdb
    first ACE
    last CT3
}
# other protein chains
# segment PR2 {
#     pdb pr2.pdb
#     first ACE
#     last CT3
# }
coordpdb pr1.pdb PRO
# coordpdb pr2.pdb PR2
guesscoord

writepdb merged.pdb
writepsf merged.psf
# solvation and ionization. files are written with the command (no more writepdb)
package require solvate
package require autoionize
mol delete all
mol load psf merged.psf pdb merged.pdb
solvate merged.psf merged.pdb -t 12 -o solvated
mol delete all
autoionize -psf solvated.psf -pdb solvated.pdb -sc 0.15 -o system

mv system.pdb ../common
mv system.psf ../common
mv lig.prm ../common/toppar
file delete solvated.log
file delete solvated.pdb
file delete solvated.psf
file delete merged.psf

cd ../common
vmd -dispdev text -e measure.tcl -args system
vmd -dispdev text -e fix_backbone_restrain_ca_with_ligand.tcl

exit
```

#### About the topology files

When you encouter errors when reading .str file:

> “psfgen) ERROR!  FAILED TO RECOGNIZE SET.  Line 319: set para” etc.
>
> FATAL ERROR: UNKNOWN PARAMETER IN CHARMM PARAMETER FILE ../common/toppar_water_ions.str
> LINE=*set app*

[How-can-I-use-charm36-forcefiled-for-a-protein-bound-to-ATP-and-MG](https://www.researchgate.net/post/How-can-I-use-charm36-forcefiled-for-a-protein-bound-to-ATP-and-MG-Can-you-help-me)

1. First, you need to edit the stream file so that it is compatible with the NAMD/VMD psfgen tool.  To do that, you must comment out (or remove) all the lines containing CHARMM scripting code, since psfgen doesn't recognize them. This problem might emerge from uncommon files from CHARMM website. Take care or just use files in vmd plugin readcharmmtop, especially for `toppar_water_ions_namd.str`.

2. Furthermore, some `.rtf` files like `top_all36_cgenff.rtf` and stream files required reading other fundamental files first; otherwise, some atom types are missing. Read the head of these files first before using them.

   > e.g. the **na_nad_ppi.str** and file you mention requires parsing the "**top_all36_na.rtf**" file containing original nucleic acid parameters, so you need that too. 
   >
   > also, just put `toppar_water_ions.str` after `na.rtf` and `prot.rtf`

3. You **should use both** the parameters from the stream files and the original **nucleic acid prm file**.  The stream files do not contain full parameters, some of them (for example some **non-bonded terms**) are expected to be found in the prm files. However, they are needed for accurate representation of these "extra" molecules they describe

#### solvation

- solvate https://www.ks.uiuc.edu/Research/vmd/plugins/solvate/
- autoionize https://www.ks.uiuc.edu/Research/vmd/plugins/autoionize/

> autoionize not replacing water molecules, it adds ions

#### measurement

```tcl
#!/bin/bash
# vmd -dispdev text -e measure.tcl -args system

set file [lindex $argv 0]
package require psfgen
psfcontext reset
# readpsf system.psf
# coordpdb system.pdb
mol load psf $file.psf pdb $file.pdb
# measure and assign values
set everyone [atomselect top all]
set minmax [measure minmax $everyone]
# set center [measure center $everyone]
foreach {min max} $minmax { break }
foreach {xmin ymin zmin} $min { break }
foreach {xmax ymax zmax} $max { break }

# generate output for .namd file. if you do not use non-standard/rotated box
set file [open "PBCBOX-$file.dat" w]
puts $file "cellBasisVector1 [ expr $xmax - $xmin ] 0 0 "
puts $file "cellBasisVector2 0 [ expr $ymax - $ymin ] 0 "
puts $file "cellBasisVector3 0 0 [ expr $zmax - $zmin ] "
puts $file "cellOrigin [ expr ($xmax + $xmin)/2 ] [ expr ($ymax + $ymin)/2 ] [ expr ($zmax + $zmin)/2 ] "

exit
```

this file looks like normal setting statements:

```shell
# PBCBOX-system.dat
cellBasisVector1 70.44500064849854 0 0 
cellBasisVector2 0 56.54799842834473 0 
cellBasisVector3 0 0 56.80599784851074 
cellOrigin 25.47849988937378 -2.505000114440918 -11.279999732971191 
```

in NAMD conf file:

```tcl
source ../common/PBCBOX-system.dat
```

#### adding restraint

Basically, select something, set the beta value and save a `.pdb` file.

```shell
## copied from the tutorial
# usage: vmd -dispdev text -e fix_backbone_restrain_ca_with_ligand.tcl

# package require psfgen
mol delete all
mol load psf system.psf pdb system.pdb

# Mark atoms to fix for initial minimization
# We'll start by fixing the protein backbone and minimizing everything else.
# also fix ligand. then remove fix and minimize
# ZN and MG: only modify the coordinated ones. let the free ions free

set all [atomselect top all]
set to_fix [atomselect top "(protein or nucleic) and backbone or segname LIG or segname CRW"]
$all set beta 0
$to_fix set beta 1
$all writepdb fix_backbone.pdb

mol delete all
mol load psf system.psf pdb system.pdb

# Put harmonic restraints on the CA atoms for heating and unit cell
# equilibration.  Use the coordinates from the last simulation frame.

set all [atomselect top all]
set sel [atomselect top "protein and name CA or segname LIG or segname CRW"]
$all set beta 0
$sel set beta 0.5
$all writepdb restrain_ca.pdb

mol delete all
mol load psf system.psf pdb system.pdb

# Put harmonic restraints on the ligand atoms to equilibrate the interaction
# adjust the side chain conformation of the protein to fit the ligand
# here we hope the arginines can fix the TP group and the base does not go deeper away

set all [atomselect top all]
set sel [atomselect top "segname LIG or segname CRW"]
$all set beta 0
$sel set beta 1
$all writepdb restrain_ligand.pdb

exit
```

in NAMD conf file

```tcl
set FIXPDB      ../common/fix_backbone
set CONSPDB     ../common/restrain_ca
set CONSSCALE   1                      ;# default; initial value if you want to change

# Fixed atoms
if { $FIXPDB != 0 } {
    fixedAtoms      yes
    fixedAtomsForces yes
    fixedAtomsFile  $FIXPDB.pdb
    fixedAtomsCol   B                   ;# beta
}

# Positional restraints
if { $CONSPDB != 0 } {
    Constraints          yes
    ConsRef              $CONSPDB.pdb
    ConsKFile            $CONSPDB.pdb
    ConskCol             B
    constraintScaling    $CONSSCALE
}
```

You can close these options after `run xxxsteps` by something like `fixedAtoms off`

#### Special ligand file

I got this ligand file from seniors with strange residue/atom names so that it's not  recognized by CHARMM-GUI?

Maybe we can rename them (element+number) with AutoPSF in vmd.

<img src="https://cdn.jsdelivr.net/gh/gxf1212/notes@master/research/Previous-projects/FYP-notes.assets/parameterization.jpg" alt="parameterization" style="zoom:80%;" />

It seems that `xxx_formatted`(or temp?) can be recognized by CHARMM-GUI. Try a few other pdb files if necessary.

> Another way to generate uploadable .pdb is:
>
> ```shell
> gmx pdb2gmx -f remtp.pdb -o remtp.gro # though with error? messages, we use that .gro file
> obabel -igro remtp.gro -opdb -O remtp-gro.pdb
> ```

#### All by GUI

Not using

##### Setup

Extension--Modeling--Automatic PSF Builder--Options, check 'add solvation box' and 'ionization' options, follow the PSF building protocol, and you will get completely solvated and ionized system!!! But the parameters cannot be set...

##### Solvation

Extension--Modeling--Add Solvation Box

- You can rotate to minimize volume (not working well?)

- WT: residue name for waters. you can change

- if you check 'use molecular dimension', the min and max in 3D will be calculated automatically, and you only need to add 'padding' (and measure) as we usually did. 

  otherwise we can specify all the parameters manually

- Click 'solvate', molecular info (# of water) is shown in Terminal again.

> this GUI doesn’t have ionization, neither choose water model?? TIP3P water is the default...

##### Ionization

Extensions--Modeling--Add ions (autoionize)

very straightforward

- Choose salt, additional ions
- Neutralize and set NaCl concentration to 0.15 mol/L





---



the following are from FYP and to be summarized into the above newly-written workflow





Go to NAMD basics page?

## Setting up a MD simulation

for basics about .namd parameters, please read 

- fundamental

  - ug 2.2 NAMD configuration file
    - 2.2.5 Required NAMD configuration parameters. basic params links
  - ug 7 Standard Minimization and Dynamics Parameters
  - namd-tutorial-unix chp 1 and appendix

- [online tutorial](https://www.ks.uiuc.edu/Training/Tutorials/namd/namd-tutorial-unix-html/node26.html)

- note in .conf

- [Kevin's scripts](https://github.com/skblnw/mkrun/tree/master/NAMD). don't ever forget!

### on the scripts

Below are parameters you should notice in every simulation.

#### constants and options

- outputbase: your system
- 
- restarting a simulation: set `INPUTNAME`
- gradually increase the temperature: set `ITMEP`$\neq$`FTEMP`
- when temp gets stable, `langevin on`
- `PSWITCH` and `langevinPiston on`: constant pressure

#### system and parameters

##### (debugging)

par_CMAP.inp in Kevin's script? 

is actually **param.prm** downloaded from [Maryland](http://mackerell.umaryland.edu/). 

contains protein, ions (and so on? a huge file). begin with:

```
*>>>> CHARMM36 All-Hydrogen Parameter File for Proteins <<<<<<<<<<
*>>>>> Includes phi, psi cross term map (CMAP) correction <<<<<<<<
```

> **DUPLICATE terms**
>
> https://www.ks.uiuc.edu/Research/namd/mailing_list/namd-l.2020-2021/0371.html
>
> ```
> Warning: DUPLICATE BOND ENTRY FOR CT3-NC2
> PREVIOUS VALUES  k=261  x0=1.49
> USING VALUES  k=390  x0=1.49
> ```
>
> maybe caused by duplicated prm files. but cannot remove any of them. just be it?
>
> some of the pair values **both** occur in `param.prm`. **Don't use that anymore!**
>
> I use `param.prm` and `par_all36_na.prm` in .namd. Built with `top_all36_prot.rtf`, `toppar_water_ions.str`
>
> The tutorial uses `par_all27_prot_lipid.inp` and `par-extraterms.inp`, built with `top_all27_prot_lipid.inp`, `par_all27_prot_lipid.inp`
>
> **par_all36_na.prm** for some atoms in ATP. may cause conflicts. does that matter?

##### solution

use `par_all36m_prot.prm` (same protein parameter as we are using in `param.prm`) and all other `.prm` files, then `water_and_ions_namd.str`

In NAMD, the easiest way to make sure that all the necessary NBFIXes are always in effect is to **read all the CHARMM36 parameter files into NAMD prior to reading `toppar_water_ions_namd.str`**

> https://www.ks.uiuc.edu/Research/namd/mailing_list/namd-l.2014-2015/0236.html
>
> http://mackerell.umaryland.edu/~kenno/cgenff/program.php#namd
>
> But I still failed to build the ATP in psfgen...

just like the tutorial video said! do this in `.namd` file... but did not work! 

You should download the `toppar_water_ions_namd.str` which removed the `set` commands from the second link above (cgenff)

And the parameters should look like

```tcl
paraTypeCharmm        on
parameters          ../common/par_all36m_prot.prm
parameters          ../common/par_all36_na.prm
mergeCrossterms yes
parameters          ../common/par_all35_ethers.prm
parameters          ../common/par_all36_carb.prm
parameters          ../common/par_all36_cgenff.prm
parameters          ../common/par_all36_lipid_ljpme.prm
parameters          ../common/toppar_water_ions_namd.str
```

the `molecule.str` is not necessary here

#### restarting

- The “reinitvels” command reinitializes velocities to a random distribution based on the given temperature.
- 

#### boxes, restrains

see tutorial [Building Gramicidin A](http://www.ks.uiuc.edu/Research/namd/tutorial/NCSA2002/hands-on/) for detailed guidance and scripts about setting restrains

- periodic boundary conditions: see the above “measurement” subsection

- When initially assembling a system it is sometimes useful to fix the protein while equilibrating water or lipids around it. These options read a PDB file containing flags for the atoms to fix. The number and order of atoms in the PDB file must exactly match that of the PSF and other input files.

  ```tcl
  fixedAtoms          on
  fixedAtomsFile      myfixedatoms.pdb  ;# flags are in this file
  fixedAtomsCol       B                 ;# set beta non-zero to fix an atom
  ```

  > The fixedAtoms, constraintScaling, and nonbondedScaling parameters may be changed to preserve macromolecular conformation during minimization and equilibration (fixedAtoms may only be disabled, and requires that fixedAtomsForces is enabled to do this).

- constraintScaling 0 is the _immediate_ removal of all constraints

- PME is only applicable to periodic simulations. PME grid dimensions should have small integer factors only and be greater than or equal to length of the basis vector.

  ```tcl
  #PME (for full-system periodic electrostatics)
  PME                 yes
  ```

  may always use the default value

- 

#### minimization, equilibration, NVT and NPT

all use conjugated gradient....not much to discuss

> default: minimization < Perform <u>conjugate gradient</u> energy minimization? >

NPT: Langevin dynamics+Nos´e-Hoover Langevin piston

NVT: delete piston...

> compare the tutorial files, ws and wb
>
> no params difference between npt and production??

By now the Kevin script is compatible with the tutorial. Just ignore the other option, set `constraintScaling` to 1.

` numsteps` = `run` ?

##### steps

Initially, both temp and pressure is on and settings are done. Fix and restraint are both on. 

As simulation goes on, we only turn the options on or off.

1. Minimization with fixed backbone atoms.

   ```
   langevinPiston    off
   ```

2. Minimization with restrained carbon alpha atoms.

   ```
   fixedAtoms    off
   ```

3. Langevin dynamics with restraints.

   > langevin already on

4. Constant pressure with restraints.

   ```
   langevinPiston    on
   ```

5. Constant pressure without restraints.

   ```
   constraintScaling    0
   ```

6. Constant pressure with reduced damping coefficients.

#### other settings

- With wrapping, some molecules will jump between sides of the cell in the trajectory file to yield the periodic image nearest to the origin. Without wrapping, molecules will have smooth trajectories, but water in the trajectory may appear to explode as individual molecules diffuse. Wrapping only affects output, not the correctness of the simulation.

  ```
  wrapAll             on 
  ```

- `on` = `yes`?

- 

- 

#### Guidance

see the script for the final values

> guidance from https://www.ks.uiuc.edu/Research/namd/mailing_list/namd-l.2008-2009/1333.html
>
> **add an unconstrained NPT equilibration phase** to your simulation prior to taking data that you consider part of a production run, to allow initial relaxation of your protein and any final adjustments to the periodic cell size without including this data in your analysis.
>
> If you equilibrate with very strong protein (>10 or so kcal/mol A^2) restraints it is probably good to remove them gradually, but yours are <u>probably ok to remove in one step</u>. 
>
> the key is to make sure that at each step **you truly do equilibrate the system** (subject to the current constraints placed on it), and as much as possible you **avoid perturbations** of your solute **during early stages** of solvent equilibration.

> guidance from http://www.ks.uiuc.edu/Research/namd/mailing_list/namd-l.2003-2012/4358.html
>
> From my experience, the number of time steps needed for each stage depends on a number of things, including the size of your system, how relaxed/frustrated your initial structures are etc. The "rules of thumb"
> I used are:
>
> 1. Minimimize until the **gradient tolerance drops below 1.0**. The number of steps required to achieve this is **system-dependent**. I usually just minimize initially for, say, **10000 steps** and periodically check the
>    gradient tolerance.
> 2. Equilibrate the fixed protein until the **temperature** (and other quantities such as pressure if necessary) **stabilizes** at the desired value. Again, the number of steps is worked out by trial and error.
> 3. Equilibrate with decreasing harmonic constraints until the **unconstrained protein is stable** in terms of temperature, structure and other desired quantities.

time length: refer to tutorials--my exploration--simulation

### work flow

for a new ligand, only need to change:

- outputbase
- CellBasisVector/origin

#### commands

> building system is in a folder; if not messy, could put “solvation” together
>
> after building the system, copy all needed files to a directory `./common`
>
> the script is without an extension name for VScode to highlight. put in where the results are
>
> ```shell
> $ tree
> ├── common
> │   ├── fix_backbone.pdb
> │   ├── fix_backbone_restrain_ca.tcl
> │   ├── par_all36m_prot.prm
> │   ├── par_all36_na.prm
> │   ├── par_.....prm
> │   ├── restrain_ca.pdb
> │   ├── system.pdb
> │   ├── system.psf
> │   └── template-us-namd
> ├── equil
> │   ├── pro-lig-equil
> │   └── pro-lig-equil.log
> └── prod
>  ├── pro-lig-prod
>  └── pro-lig-prod.log
> ```
>
> do not use `mpirun` for such a small system...

```shell
cd common
vmd -dispdev text -e fix_backbone_restrain_ca.tcl
cd ../equil
namd3 +auto-provision +idlepoll pro-lig-equil > pro-lig-equil.log
# may go to analysis and check?
vmd ../common/system.psf -pdb ../common/system.pdb -dcd rdrp-atp-equil.dcd
cd ../prod
namd3 +p1 +devices 0 pro-lig-prod > pro-lig-prod.log
# on lab computer
```

> In your NAMD configuration file, set `CUDASOAintegrate` to `on`. only use one cpu, to achieve 2-fold acceleration of namd3. ~2 times faster (but not in my workstation, only in lab?)
>
> [namd3-gpu](https://developer.nvidia.com/blog/delivering-up-to-9x-throughput-with-namd-v3-and-a100-gpu/)
>
> Interpretation: put most of the work on GPU. so don't run 2 simulations at once.
>
> But don't use that for minimization (CPU-dependent). But also there's 45w steps of npt...

#### testing the run

> 1. https://www.ks.uiuc.edu/Research/namd/mailing_list/namd-l.2003-2004/0295.html
>
>    You will need to have a non binary coord file with as well as a binary one. Don't know why, that's just the way it is...
>
> 2. how to monitor your simulation?
>
>    search for “TIMING” or “Wall” in .log file for the progress of your simulation, which updates every $outputTiming steps. “Benchmark time:”is also ok
>
> 3. 

> other problems:
>
> - Randomization of virtual memory (ASLR) is turned on in the kernel, thread migration may not work! Run 'echo 0 > /proc/sys/kernel/randomize_va_space' as root to disable it, or try running with '+isomalloc_sync'.
>
> - Warning: ALWAYS USE NON-ZERO MARGIN WITH CONSTANT PRESSURE!
>
>   Warning: CHANGING MARGIN FROM 0 to 0.495
>
> - ERROR TOLERANCE : 1e-06
>
> - rigid bond
>
>   ```
>   Warning: The Langevin gamma parameters differ over the particles, Warning: requiring extra work per step to constrain rigid bonds.
>   ```
>
>   The covalent bonds with hydrogen atoms were constrained at their equilibrium values by the LINCS algorithm?
>
> backup
>
> ```shell
>  mv ./*.* test2
> ```
>
> testing performance (first “wall time”, irrelevant with time I guess)
>
> - test 3: above command, 0.0267396/step
> - test 4: no +p8, no idlepoll (only one gpu core), similar
> - test 5: namd3, with +p8, with idlepoll,  0.016929/step (only one GPU core used?)
> - test 6: same, +p2. 0.0186955/step
> - test 7: same, +auto-provision. just equals to using +p8. 0.0170378/step
>
> > if no +p8 is specified
> >
> > ```
> > Charm++> No provisioning arguments specified. Running with a single PE.
> >       Use +auto-provision to fully subscribe resources or +p1 to silence this message.
> > ```
>
> how come the rate increases two folds in test 3?

### Analysis basics and check

As said, to obtain appropriate params for your system, should check properties.

```shell
# extract properties from .log file
vmd
source ../common/namdstats.tcl
data_time TEMP pro-lig-equil.log
data_time TOTAL pro-lig-equil.log
exit
xmgrace TEMP.dat
xmgrace TOTAL.dat
```

the script is from namd unix tutorial files. note:

```
Usage: data_avg <logfile> [<first timestep> <last timestep>]
   <first timestep> and <last timestep> may be entered as numbers or
   <first timestep> = 'first' will start at the beginning of the simulation
   <last timestep> = 'last' will go to the end of the simulation
Usage: data_time <data stream> <logfile> [<first timestep> <last timestep>]
   <data stream> = BOND, ANGLE, DIHED, IMPRP, ELECT, VDW, BOUNDARY, MISC, KINETIC, TOTAL, TEMP, TOTAL2, TOTAL3, TEMPAVG
```

adjust the window to see different stages

also you may view the animation

```tcl
menu animate on
mol load psf ../common/system.psf pdb ../common/system.pdb
animate read dcd rdrp-atp-equil.dcd

animate read dcd rdrp-atp-prod.dcd
```













# Small molecule FEP



reading

https://mp.weixin.qq.com/s/pDRzy7FjNzBm1dAkxLP7Qg  “骨架跃迁”FEP

## NAMD FEP

> from FYP





copy...























### Problems & Debug

- 2p-oh-cl, 3p-OH changes. charge difference ~0.08.
  At first, OH (A) forms H bond with the phosphate, while OH (B) rotates freely (sometimes away); finally, it gots reversed.
  does that caused ddG to be more positive?

  If that's random motion, i.e. A/B forms H bond in 50% of the time, 0.08 charge may not cause so much ddG change?
  If it's sampling problem, reversing the simulation would work

- 







## Setup for gmx

just setup. for anaysis and run FEP, please see AA FEP

### pmx

https://www.youtube.com/watch?v=MdaTPYLL2Gs

https://www.youtube.com/watch?v=ZqWdo_2YZdg

#### CHARMM-GUI 

```
python ~/data/work/make_hybrid_top/pmx/fill_cgenff_itp.py -h
```

fill the bonded parameters to the terms. Also add missing terms and values from charmm36.ff

kindly provided by [Vytautas Gapsys](https://scholar.google.com.hk/citations?user=L4BQrLQAAAAJ&hl=en)

```shell
f=38
f=42

cp /path/to/GUI/folder/gromacs/LIG.itp ./${f}.itp
cp /path/to/GUI/folder/gromacs/charmm36.itp ./${f}.prm
# remove the default section
python ~/data/work/make_hybrid_top/pmx/fill_cgenff_itp.py -itp ${f}.itp -ff charmm36.ff -prm ${f}.prm --priority prm -o ${f}_full.itp
# path to the script, and charmm36 gromacs version
pmx atomMapping -i1 42.pdb -i2 38.pdb
pmx ligandHybrid -i1 42.pdb -i2 38.pdb -itp1 42_full.itp -itp2 38_full.itp -pairs pairs1.dat
echo '#include "ffmerged.itp"' > ligand.itp && cat merged.itp >> ligand.itp
```

why the OH hydrogen is always affected?

![image.png](https://cdn.jsdelivr.net/gh/gxf1212/notes@master/research/Protein-ligand-simulation.assets/pmx-cgenff.png)

how to visualize more easily?

semi-manual setup

```shell
# bound
cp ligand.itp merged.top
gmx pdb2gmx -f receptor.pdb -o receptor.gro -ff charmm36 -water none -p bound.top
rm receptor.gro
# got bound.top, and edit
n=`grep -n '\[ system \]' bound.top | cut -d : -f 1`
n=$(( n - 1 ))
sed -i "${n}r ligand.itp" bound.top
n=`wc -l bound.top | cut -d ' ' -f 1`
n=$(( n + 1 ))
echo "" >> bound.top
sed -i "${n}i\\LIG     1" bound.top

cat receptor.pdb mergedA.pdb | grep ATOM > bound.pdb
gmx editconf -f bound.pdb -o bound_box.gro -c -d 1.2 -bt cubic

# free
# get free.top from other templates
n=`grep -n '\[ system \]' free.top | cut -d : -f 1`
n=$(( n - 1 ))
sed -i "${n}r ligand.itp" free.top

# box: copy from bound
gmx editconf -f mergedA.pdb -o mergedA_box.gro -box 
gmx solvate -cp mergedA_box.gro -cs spc216.gro -o mergedA_solv.gro -p free.top
gmx grompp -f ions.mdp -c mergedA_solv.gro -r mergedA_solv.gro -p free.top -o ions.tpr
echo "SOL" | gmx genion -s ions.tpr -pname K -nname CL -conc 0.15 -neutral -o free.gro -p free.top

```

merging: insert before [ system ]

- ligand: insert that itp into a template (why cannot add water later?)
- complex: combine pdb, convert to gro; insert the ligand lines

```shell
gmx grompp -f em.mdp -c ligand.gro -r ligand.gro -p mergedA.top -o em.tpr -v
gmx mdrun -ntmpi 1 -ntomp 15 -v -deffnm em

gmx grompp -f mdps/em.mdp -c bound.gro -r bound.gro -p newtop.top -o em.tpr -v -maxwarn 1

gmx grompp -f ../../../mdps/em.mdp -c free.gro -r free.gro -p newtop.top -o em.tpr -v
gmx grompp -f ../../../mdps/em.mdp -c bound.gro -r bound.gro -p newtop.top -o em.tpr -v -maxwarn 1
gmx mdrun -ntmpi 1 -ntomp 15 -v -deffnm em
gmx grompp -f ../../../mdps/nvt.mdp -c em.gro -r em.gro -p newtop.top -o nvt.tpr
gmx mdrun -s nvt.tpr -deffnm nvt -ntmpi 1 -ntomp 15 -nb gpu -bonded gpu -gpu_id 0
gmx grompp -f ../../../mdps/npt.mdp -c nvt.gro -r nvt.gro -t nvt.cpt -p newtop.top -o npt.tpr
gmx mdrun -s npt.tpr -deffnm npt -ntmpi 1 -ntomp 15 -nb gpu -bonded gpu -gpu_id 0
gmx grompp -f ../../../mdps/md.mdp -c npt.gro -r npt.gro -p newtop.top -o md.tpr
```

problems:

- in gmx, terminal patch is not available...
- nothing (pdb2gmx, parmed) reads in this .itp and outputs a full .top file. Seems that this .itp is for copying into other .top files
- manual: hand-craft the .top file, add every #include...
- add that ffmerged.itp for new atom types
- keep the same box size

atom mapping:

- the two merge?.pdb files only differ a little in coordinates
- Maybe hydroxyl H are forced to be separated, i.e. each of them has a dummy?

#### amber series ff

```shell
for l in 38 8; do
obabel ${l}.pdb -omol2 -O ${l}.mol2
acpype -i ${l}.mol2
# -p gaff -n 0 -o gmx
mv ${l}.acpype/${l}_GMX.itp ${l}.itp
mv ${l}.acpype/${l}_NEW.pdb .
done

l1=38
l2=8
pmx atomMapping -i1 ${l1}_NEW.pdb -i2 ${l2}_NEW.pdb -o1 pairs1.dat
pmx ligandHybrid -i1 ${l1}_NEW.pdb -i2 ${l2}_NEW.pdb -itp1 ${l1}.itp -itp2 ${l2}.itp -pairs pairs1.dat
echo '#include "ffmerged.itp"' > ligand.itp && cat merged.itp >> ligand.itp
```

problems:

```
    27          ho      1    LIG     H2     27    0.439000     1.0080      DUM_ho    0.000000     1.0080
    42      DUM_ho      1    LIG    HV2     42    0.000000     1.0080          ho    0.438000     1.0080
```

is it necessary to use a different atom for 0.001 charge difference?





### PyAutoFEP





```
generate_perturbation_map.py --map_type=star --map_bias=338 --input ligands_lomap/*.mol
```











cgenff产生的mol2没有lone pair。。pdb也没有，所以没法做带pdb的模拟 

cgenff的mol2不对，磷酸氧还是自由基，它检测不了总电荷。。还是得手动画

所以不要上传pdb。。

obabel没见总电荷的选项，antechamber有，做不对还是得在Pymol等里面画好



combine the hybrid ligand with protein





## FEP notes

### How to understand/see FEP

- single topology不准？所有的interaction都关掉。只能$R^2=0.3\sim 0.43$

- FEP can not do screening：还是算力不够；绝对结合能不是太准

- Schrodinger的“行业标准”：FEP+REST，蛋白多个构象时会比较有用

- 采样好的话，是包含熵的，且是显式溶剂，一般要比对接类的好

- free energy methods rely on one basic idea: to force the system to where it doesn’t want to be, and then measure by how much it doesn’t want to be there. In potential of mean force, we apply mechanical force to decouple ligand and receptor. In free energy perturbation methods, we transform the system through a set of unphysical (alchemical) states, that connect two physical states we are interested in.

  [How to Calculate the Free Energy of Methane in Water Using Gromacs with Cloud HPC](https://www.cloudam.io/post/how-to-calculate-the-free-energy-of-methane-in-water-using-gromacs-with-cloud-hpc)
  
- Zhou：小分子没有conceptual novelity

### Find the starting structure

- 跑MD找构象：

  - 三个MD 200ns，分别聚类，该构象持续100ns以上（但我不都做了很长了嘛。300ns可以调整局部构象了）
  - 三个聚类的一样最好，不一样可以再跑
  - 或者都做FEP
  - 一个MD不能说明问题；重复的三次有一个稳定，都可以再延长时间以确认，稳定就能用

- a cutoff of 0.1 nm is usually ok; in this case cluster 1 and 2 don't differ a lot

  you may use 0.15 nm, or 0.25 nm if your ligand is really big or flexible

  replicas 统一用同一个cutoff

- “自洽”的聚类：每条轨迹用自己的pocket residues，各有自己的pbc

- 观察cluster-id-with-time

  如果跳跃，应该多跑

  <img src="https://cdn.jsdelivr.net/gh/gxf1212/notes@master/research/Protein-ligand-simulation.assets/cluster-id-with-time.png" style="zoom:33%;" />

Leili's notes

> I've started doing FEP in the post-insertion model. The plan is to try to compare with experimental data as we did before, starting from all four conformations we got in the clustering. Maybe we'll pick the one that fits the best.

You only need to **pick one of them, since all four are essentially the same**. Pick the one with the highest stability (highest amount of time being in one cluster). Otherwise, you will need to run 5 FEPs for each of the conformation, which is unnecessary.

> I came across another question: do I need to run MD simulation for all RemTP analogs to inspect their binding mode? It might be time-consuming and I didn't do that in the previous FEP. If the modification is not significant and the binding mode does not change too much in FEP, maybe MD simulations for analogs are not needed. What do you think?

**Our modifications are not big, so you don't need to run MD simulations for them.** I don't want to confuse you with other ways of thinking about this issue right now. So please proceed with the FEP simulations with RemTP binding mode and we will discuss this issue next time we meet.

> By the way, I just wonder what you think of the clustered structure of pre-insertion site.

I took a look and what you showed me was correct - **run1 and run3 are different**, and both different from the initial binding state. So I would suggest you to **keep running the stable clusters from run1 and run3. Try to see if one of them reaches a more stable state.** Do you remember the difference in the parameters between your RemTP and my RemTP? I wonder why there is such a difference.

### FEP workflow

- FEP的前提：

  - 结合构象没太变
  - 时间足够长，收敛

  构象不对，符号也难做对；第二个不对，大概是只能相信符号，数值不太行

- 如果结构变得大，每个window可以多一些时间

- 加window可以根据dG-lambda图中dG比较大的window附近加，虽然也有累计error

- 教训：**charmm-gui的时候检查一遍手性；merge完了检查一遍结构**。养成习惯，每次如此！

- My thoughts: [谈谈FEP中unbound state的选取](https://www.bilibili.com/read/cv22663298)

- yq：L-AA换成D-AA，可以以Gly为中介。或者搞一个两个侧链的，都做消掉

- 尽量避免突变PG？

- IDP：变成有功能态时，是相变？



### Kevin's notes on FEP path

- FEP sharp的地方，加window和长时间都是为了充分采样

  alchemical上应该加window 

  PMF，翻越barrier，都差不多

- window 2 很不喜欢 window 1的构象，叫做irrevesibility

  in general, 消掉大的group的irreversiblility小一点

- Kevin认为，不光是`alchElecLambdaStart`有这个问题。每个原子/interaction按理都可以设一个lambda，但是麻烦，甚至可以搞机器学习的path。其实最终的dG差不多就行
  
- Kevin认为，键变了啥的都还好，就怕给周围group瞎转的机会

- Q：Gromacs中FEP每个窗门应该独立跑还是接着上一个窗口跑？
  
  A：如果都能采到，就都可以。听起来namd更合理，但是还是有跑岔路的风险

  跑岔路：路径依赖，偏离了一下，后面回不来了，或者单个这个window回不来了。增加时长可能导致走岔路

- 

### Analysis

- 你的实验做的dG，ddG的误差只能从dG传递过来。组会放的数据就是stderr

  propagation of error. X, Y are independent variables.

  <img src="https://cdn.jsdelivr.net/gh/gxf1212/notes@master/research/Previous-projects/Protein-ligand-simulation.assets/error.png" style="zoom:40%;" />

- 计算stddev好说。stderr单个的好说，差值的有两种：

  - bound和unbound挨个相减算stderr（粗略）
  - repeat次数相同，分别算stderr，像stddev一样平方根号（没算过是不是和上面一样）

- 误差范围：实验±1。两个结果都是0.4几，-0.2几，等于没啥区别。

- five independent runs were started from different initial configurations randomly chosen from the MD simulations for improved sampling. 其实没这么严格

- 几次重复，通常unbound的误差会小一点；而bound有outlier要谨慎去除，或者多重复几次。

- outlier能知道为什么最好，可能是二面角变化、丢了个离子等等

- 总误差是平方相加根号，最好不要超过1（stderr。。）

- ligand的charge分布，最好倒是大部分相同，不是算QM，因为FEP对charge敏感。。

- fep就有可能有构象变化，不能说变了就是不对的

  - RMSD, movie, last frame都是看有没有变的

- FEP真正能分析的，就是

  - dG-λ
    - window均匀的一段，dG应该大致是直线
    - 有一个转折，在那两个start end参数处
    - step and accumulated 都要放
  - time convergence
  - each window RMSD：也就能看哪里有跳跃

  好像也没啥了。MD里面的contact分析什么的。

- FEP虽然麻烦，但有严格的规范，单独做没啥创新的

  实验有活性的计算应该有活性，计算有活性的实验应该有几个有活性，实验没活性的……差得不要太多

  差一点的发个纯计算的文章，好的可以加实验、加更多……

- 即使我们只是优化了结合能力，也是有意义的，因为直接筛还是难度。但不管我们怎么算，还是要验证的。当然，没到临床的实验都不能说真的有效。

- 和实验对比：要是测结合力才exactly match，EC~50~也不等于亲和力

<img src="https://cdn.jsdelivr.net/gh/gxf1212/notes@master/research/Protein-ligand-simulation.assets/fep.png" alt="image-20221016231054417" style="zoom:50%;" />

Zhou's notes:

新长出来的group把一个水挤出来可能导致ddG变负

### Small molecule

- 
- 小分子，topology怎么做更重要。and是否构象变了
- 小分子双突变一般不太行？



扩环最好是整个环变化添加中间分子，确实还没人做，但是更少人用了。FEP填充中间小分子，一得说服别人，二要提升本身的准确度

calculating free energies for transformations involving ring openings and net charge changes，还没解决！



### About charges in FEP

- 自由能对charge（即使是分布）比较敏感，要谨慎

  带电的离子，大分子也许可能会影响

- 周围charge变化比较大，我们应该尽量少一点变化，还是尊重charge的变化？
  手动做的时代，变得少，可能有一些平均。
  最好是用benchmark检验，也算一个测试了

  至于采用common多一点还是少一点，可以让用户自己决定。Leili还觉得似乎考虑charge更合理


### Charged mutation

solution：

- 伴随一个离子 is a bad idea

- bound state和unbound box size一样，这部分抵消（单个dG比较大，ddG还可以）

  - 关于charge，tutorial上好像也有correction公式

- 远端做个相反的mutation。仍然，bound和unbound的epsilon不一样，仍有系统误差

- 先让uncommon的电荷消失，alchemical transformation，再让电荷长出来

  gmx那就是先变成dummy atom。这个是比较准的。

- 把bound和unbound放同一个盒子，一个正向一个反向。不知道对不对，但肯定很麻烦

- 

### How to design

- 
- 变的思路：如果没有明显的就填空。1）比如，och3变好那能不能换点别的大基团，比如och2ch3，延长一个;芳环上NH2也是；2）常见那几个，推荐了COOH；3）ch3用得少？就是纯填空，填空可用支链烷基
- F的负电，和O排斥，可能是疏水的原因.疏水相互作用：多少水处在unhappy的状态
- pi-pi, pi-cation are important! 8~9 kcal/mol?
- H bond and electrostatic, not very strong if exposed to water (1~2, 3~4 kcal/mol). water  forms these too. only works if $\varepsilon_r$ is small.

### Benchmarking

leili认为，做benchmark需要对dataset的十几个以上的ligand跑MD、确定构象，比较离谱的可以扔掉

FXR那个太challenging，不应该benchmark

行业标准是简单的那个，大家都能做出来
最好是标准居多，挑战性的有几个
看一下这些benchmark文章的的correlation

最好是先选别人做得比较好的体系REST：也是可以做
直接跑，如果MD采样有问题

100~200ns MD就行，真的要找最稳定的话要用REMD等等，而且也不一定100% occupancy

用REST做FEP，要保证多个构象都要采得到



意见一：一些gmx中的residue name需要alias
意见二：哪些电荷变了最好做整齐一点



### Presenting your results

[an example](https://drugdesigndata.org/upload/community-components/d3r/webinar2017/presentations/Cournia_lab_D3R_webinar.pdf)

- 画图，颜色清晰简洁

- 最好别放出outliers，否则要说为什么

- 每一张slide只讲一件事，包含：做了什么（what），为什么要做（why），结果（是否符合期待）

- FEP significant number: two digits

- 结构图每次都标出residue name

- 标注上那个FEP的母分子长啥样；要想问他怎么设计，就好好给老师放个结构；

  > 可以画那种动画，消失的为虚的，出现的为实的 

- yq: only when the results are not so good should you put the above decomposition figures here

讨论总结： 

- 后面：继续。程序让其他人用用。patent也可以考虑…… 
- 感受：你做了PPT老师就感觉你要讲给他听；你展示的内容决定了老师能给你什么输出；老师比较在乎名声
- 变的位点：2',3'算一个；CN估计不动，但可以试硝基？芳环NH2，大小两个环上的C上加东西（看结构）



# Visualize protein-ligand

## 2D

### ProLIF

https://prolif.readthedocs.io/en/latest/notebooks/visualisation.html
maybe analysis

![img](https://cdn.jsdelivr.net/gh/gxf1212/notes@master/research/Protein-ligand-simulation.assets/prolif.png)

### PlayMolecule

[PlayMolecule - Click. Compute. Discover.](https://playmolecule.com/PlexView/)

![](https://cdn.jsdelivr.net/gh/gxf1212/notes@master/research/Protein-ligand-simulation.assets/playmolecule.jpg)



### DSV



### LigPlot

must make a complex



### Commerical

- Flare
- MOE
- Mastreo (maybe academic license...)
- https://www.molsoft.com/gui/ligand-receptor-interaction.html

## 3D

### PLIP

[PLIP - Welcome (tu-dresden.de)](https://plip-tool.biotec.tu-dresden.de/plip-web/plip/index)

- may ruin the ligand?? no
- should have hydrophobic...
- download the pse file

### NGL

[Explore Ligand Interactions in 3D](https://www.rcsb.org/news/feature/57e30fd490f5613003407f09): NGL viewer is great but please support user's own pdb files, or only for pdb structures, will deprecate in rcsb in the future....CHARMM-GUI uses it too

<img src="https://cdn.rcsb.org/news/2016/ligand-interaction.png" alt="RCSB PDB News Image" style="zoom: 67%;" />



https://www.rcsb.org/3d-view

Mol* viewer. I don't like it.





### Protein Plus

https://proteins.plus/ containing poseview



### Commerical

[Molsoft L.L.C.: ICM-Browser](https://www.molsoft.com/icm_browser.html): 



