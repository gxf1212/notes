# Computational Chemistry Fundamentals

see [here](/techniques/Prepare-for-the-computer.md) for installation

This page includes fundamental concepts of MD simulation, fundamental usage of gmx, namd, etc., and also quantum chemistry concepts.

[JCIM｜在出版物中报告分子动力学模拟研究的指南](https://mp.weixin.qq.com/s/sRg-ip6rR2mAdw8hoC_HbA)

# MD Basics

Maybe copying some fundamentals of NAMD (file format) from FYP-notes.

This part is about general MD and comparison between common MD engines. These contents are similar to [academic notes](academic-notes.md). We put it here temporarily.

https://www.cryst.bbk.ac.uk/pps97/course/index.html Section 7: molecular forces

## Force field

### Support

- [AMBER、GROMOS、OPLS、CHARMM最新版本的GROMACS力场包 - 分子模拟 (Molecular Modeling) - 计算化学公社](http://bbs.keinsci.com/thread-15094-1-1.html)

  amber14sb_OL15.ff_corrected-Na-cation-params.tar.gz

  possible problem:

  - [grompp 出現報錯：No default Improper Dih. types - 分子模拟 (Molecular Modeling) - 计算化学公社](http://bbs.keinsci.com/thread-25936-1-1.html)
  - [amber14SB力场报错“No default Improper Dih. types”的解决办法](https://zhuanlan.zhihu.com/p/389786141)
  - or [Fixing bugs in FF14SB port for Gromacs](http://zhenglz.blogspot.com/2017/05/fixing-bugs-in-ff14sb-port-for-gromacs.html)

- Also, ion parameters (alkali metals, halogens) in ff99SB-ildn is problematic, e.g. KCl just crystalizes perfectly...

  Solution: copy from FF14SB `ffnonbonded.itp`

- CHAMBER: Comprehensive support for CHARMM force fields within the AMBER software

  CHAMBER is part of ParmEd, and parmed is part of AmberTools

  pmemd supports charmm FF?

- from sob handout: 对于模拟蛋白质目的，强烈不建议用GROMACS自带的OPLS-AA/L力场。若非要用OPLS-AA系列，至少也应该用2015年提出的OPLS-AA/M可通过以下方式添加

  去此地址下载OPLS-AAM力场的gromacs的包：http:/zarbi/chem.yale.edu/oplsaam.html

  之后使用诸如gmx pdb2gmx时即可看到已经可用:

  ```
  15: OPLS-AA/L all-atom force field (2001 aminoacid dihedrals)
  16: OPLS-AA/M all-atom force field (2015 aminoacid dihedrals)
  ```

- For example, for protein and nucleic acid force fields, the two letters are all in upper case (e.g. "CA"). In the general amber force field (GAFF), the two letters are all in lower case (e.g. "ca"). In sugar force field, the first letter is in upper case while the second letter is in lower case (e.g. "Ca"). In lipid force field, the first letter is in lower case while the second letter is in upper case (e.g. "cA"). 

  CHARMM atom types are usually upper cases, but it can have **up to four characters** for normal elements. In the following file conversions, atom types were adapted from AMBER to CHARMM if necessary. AMBER have two upper case letters for the atom types in protein and nucleic acid residues. These atom types will be kept when transfer to CHARMM except N* and C* which will be converted to NG and CG in CHARMM. The GAFF atom types in AMBER are lower case letters, and it will be converted to "GA" + its upper case form in CHARMM. The metal ions in AMBER have atom types with the style of "element + charge", they will be changed in order to be compatible with CHARMM: "Na+" will become "SOD", "K+" will become "POT", and "Cl-" will become "CLA", etc.
  https://ambermd.org/tutorials/advanced/tutorial20/charmm.php

  






### Amber

- antechamber时，和氨基酸比较像的用amber，一般小分子用gaff

  <img src="https://cdn.jsdelivr.net/gh/gxf1212/notes@master/research/MD-fundamentals.assets/c4.png" alt="1692793734134" style="zoom: 50%;" />

- Li-Merz ions, IOD set vs HFE set: divalent, some are different; 3+ or 4+, usually the same?

- things like `gaff.dat` records all comments on atom types, like CHARMM files

- 
  

### CHARMM

- `stream/prot/toppar_all36_prot_na_combined.str`有磷酸化蛋白

  https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3367516/  用QM拟合的

- So, as indicated in rtop.doc, IC and BILD are equivalent; BUILd would appear to be a 3rd synonym.




### Water Model

- The SPC/E (Extended Simple Point Charge) and TIP3P (Transferable Intermolecular Potential with 3 Points) water models are both popular rigid 3-point models used to simulate water in molecular dynamics simulations. Both the length of the oxygen-hydrogen bonds and the angle between those bonds are fixed. The models have a single Lennard-Jones site centered on the oxygen atom and point charges centered on each atom.

  The main difference between the two models lies in their parameters. The SPC/E model is a slight reparameterization of the SPC (Simple Point Charge) model of water, with a modified value for the charges on the atoms. The TIP3P model uses the experimentally observed HOH angle of 104.52° instead of the ideal tetrahedral angle of 109.47° adopted by SPC. The SPC/E model has been shown to result in a better density and diffusion constant than the SPC model.



- rename O to OH2 and HOH to TIP3 if you are using NAMD/CHARMM
  many other more H names in Amber/PDB cannot be renamed easily...

  Maybe remove all hydrogens and let tleap/vmd fix missing H.
- vmd自带的力场就是把TIP3的两个氢之间的bond注释掉



### Unit

- gmx
  - [File formats](https://manual.gromacs.org/documentation/current/reference-manual/topologies/topology-file-formats.html)
  - [Definitions and Units](https://manual.gromacs.org/current/reference-manual/definitions.html#reduced-units)

- NAMD
  - [Potential energy functions (NAMD 2.14 User's Guide) (uiuc.edu)](https://www.ks.uiuc.edu/Research/namd/2.14/ug/node24.html#SECTION00081200000000000000)

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

in gmx,   $\varepsilon$ should be positive, while in NAMD `.rtf` files they are negative! but parmed does not do this conversion...



Amber parmed check
$$
C_6=4\varepsilon\sigma^6\\
C_{12}=4\varepsilon\sigma^{12}
$$

#### Other

- `restraint_wt`: The weight (kcal · mol<sup>−1</sup> · Å<sup>−2</sup>) for Cartesian restraints when ntr = 1.

  restraint_wt=10/4.18 is roughly the same as gromacs 1000 (kJ · mol<sup>−1</sup> · nm<sup>−2</sup>) [reference](https://manual.gromacs.org/documentation/current/reference-manual/topologies/topology-file-formats.html)
  
- RT

  - 300K: 2.4942 kJ/mol, 0.596 kcal/mol, kT: 0.414 kJ/molecule
  
  - 310K: 2.57734 kJ/mol, 0.616 kcal/mol, kT: 0.4278 kJ/molecule
  
  we don't use kT in macroscopic world (or the final dG data)? 
  
- 0.001987: This value represents the ideal gas constant (R) in units of kcal/(mol·K).

- 


### Other

- CgenFF: epsilon F<Cl<Br<S
- For C=O and COO-, Amber14 is a little more polarized than CHARMM36.

Fundamental

- Exchange-repulsion, also known as Pauli repulsion or exchange integral, is a correction to the Coulomb repulsion between two electrons in orbitals for the case when the electrons possess parallel spins. It is to be subtracted from the Coulomb repulsion to give the total energy of the electron-electron interaction.

  In other words, exchange-repulsion arises as a consequence of the Pauli exclusion principle

- LAMMPS支持的势函数形式多，gmx要想加，要么改代码，要么打表（类似cmap？）

## Algorithm & special

### Basic

[分子动力学模拟为什么会有先NVT后NVE？](http://bbs.keinsci.com/thread-9699-1-1.html)

The nature of molecular dynamics is such that the course of the  calculation is very dependent on the order of arithmetical operations  and the machine arithmetic implementation, i.e., the method used for  round-off. Because each step of the calculation depends on the results  of the previous step, the slightest difference will eventually lead to a divergence in trajectories. As an initially identical dynamics run  progresses on two different machines, the trajectories will eventually  become completely uncorrelated. Neither of them are "wrong;" they are  just exploring different regions of phase space. Hence, states at the  end of long simulations are not very useful for verifying correctness.  Averages are meaningful, provided that normal statistical fluctuations  are taken into account. "Different machines" in this context means any  difference in floating point hardware, word size, or rounding modes, as  well as any differences in compilers or libraries. Differences in the  order of arithmetic operations will affect round-off behavior; (a + b) + c is not necessarily the same as a + (b + c). Different optimization  levels will affect operation order, and may therefore affect the course  of the calculations.

> from Amber manual

<img src="https://cdn.jsdelivr.net/gh/gxf1212/notes@master/research/MD-fundamentals.assets/nvt-npt.png" alt="1689997407699" style="zoom: 80%;" />

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

1. [C-rescale](https://manual.gromacs.org/documentation/current/user-guide/mdp-options.html#mdp-value-pcoupl-C-rescale) in gmx. 老版的gmx没有C-rescale

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

    [Controlling Pressure – Practical considerations for Molecular Dynamics (computecanada.github.io)](https://computecanada.github.io/molmodsim-md-theory-lesson-novice/08-barostats/index.html)

4. 



![](https://cdn.jsdelivr.net/gh/gxf1212/notes@master/research/MD-fundamentals.assets/pcontrol.png)

### Restraint

在GROMACS中，SHAKE算法用于对键和角施加约束，以固定它们的长度或角度。而restraint则是一种更广泛的概念，它可以用来对模拟中的各种属性施加约束。



## Free energy calculations

[Free energy calculations - GROMACS documentation](https://manual.gromacs.org/documentation/current/reference-manual/algorithms/free-energy-calculations.html)

In GROMACS, FEP calculations are performed by running a series of simulations at different values of the coupling parameter λ, which controls the transformation between the two states. During each simulation, the system is sampled at a fixed value of λ, and the energies of the neighboring states are calculated. [These energies are then used to estimate the free energy difference between the two states using techniques such as Bennett acceptance ratio or thermodynamic integration](https://manual.gromacs.org/current/reference-manual/special/free-energy-implementation.html).

In NAMD, FEP calculations can be performed using either the “alchemical” or “slow growth” methods. In the alchemical method, the system is gradually transformed from one state to another by changing the value of λ during the simulation. [In each window, the value of λ is gradually changed from one value to another, and the free energy difference is estimated using techniques such as thermodynamic integration](https://www.ks.uiuc.edu/Research/namd/2.13/features.html).

> it seems right....and namd doesn't sample the last window.
>
> Also strangely, Kevin's gmx FEP decomposition script also ignores the last window.

http://ambermd.org/tutorials/advanced/tutorial9/#overview

Within the TI region there will be atoms which are linearly transformed (LTA) directly from one atom type into another in a "**single–topology**" fashion and thus share coordinates (black atoms). Disappearing or appearing atoms are treated in a special way with "softcore" potentials (SCA) but in principal any atom can be defined as softcore atom depending on the user's needs. These atoms do not "see" each other that is no interaction will ever be calculated between them (blue atom for benzene and green atoms for phenol, the number labels are the respective atom indices).





## GPU and Performance

### Concepts

[hardware background information - Gromacs document](https://manual.gromacs.org/current/user-guide/mdrun-performance.html#hardware-background-information)

[The pmemd.cuda GPUPerformance](http://ambermd.org/GPUPerformance.php)



Read this: [The pmemd.cuda GPU Logistics](https://ambermd.org/GPULogistics.php)

and 22.6.7. Considerations for Maximizing GPU Performance

> [see also: NAMD GPU tutorial](/research/Previous-projects/MD-tutorials-all.md#gpu-tutorial). combine these two?

- While this full double precision approach has been implemented in the GPU code (read on), it gives very poor performance and so the default precision model used when running on GPUs is a combination of single and fixed precision, termed hybrid precision (SPFP).

  <u>We recommend using the CPU code for energy minimization.</u> One limitation of either GPU precision model is that forces can be truncated or, in the worst case, **overflow** the fixed precision representation. This should never be a problem during MD simulations for any well behaved system. However, for minimization or very early in the heating phase it can present a problem. This is especially true if two atoms are close to each other and thus have <u>large VDW repulsions</u>.

- Due to certain aspects of our GPU pair list operation, we have found that it is unsafe to run simulations that are <u>less than three times the non-bonded cutoff in any given direction</u>, and these cases will be trapped with an error message until a fix can be implemented. Furthermore, the pair list is only designed once on the current GPU implementation and may become invalid if the <u>simulation box shrinks too drastically</u>, as may happen in systems that have not undergone pressure equilibration.

  In summary, GPU is better for large systems but can cause problems for small systems.

- If you encounter problems during a simulation on the GPU you should first try to run the identical simulation on the CPU to ensure that it is not your simulation setup causing the problems.

- Anton的硬件架构被设计成能够快速执行分子动力学相关的计算，但它并不包含将代码写入硬件的过程。代码仍然是在处理器上运行的，只不过这些处理器被设计成能够快速执行特定类型的计算。如并行、快速数据传输等。

### Performance

https://developer.nvidia.com/hpc-application-performance

several benchmark data

Amber≈Gromacs>NAMD?

Typically the performance differential between GPU and CPU runs will increase as atom count increases.

## Advanced topics

### Enhanced Sampling

PMF等等可能耗时更长

人们不知道使用什么CV可以增强采样，所以才用温度，用REST



### Polarizable FF

AMOEBA (Atomic Multipole Optimized Energetics for Biomolecular Simulation) is a polarizable force field



## Other

### Techniques

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

# Gromacs

This section is about basics and common usage. For more (theory, concepts), see other pages about specific systems and applications.

1. check installation info

   ```shell
   gmx -version
   ```

   or just `gmx`

   如果有安装Gromacs的话,可以在`gmx -version`下看到fftw的版本信息

2. In gromacs, chain names are always lost in later `.gro` files....

3. gromacs newer version reads older files fine sometimes, but not vice versa

## Modeling

Modeling details: see [Preparation and modeling (gmx)](Preparation-and-modeling.md#gmx)

### Topology file format

[Topology file formats - GROMACS documentation](https://manual.gromacs.org/current/reference-manual/topologies/topology-file-formats.html)

- In GROMACS, the `[pairs]` section in the topology file is used to **define non-bonded interactions** between pairs of atoms that are separated by more than three bonds and calculate the non-bonded interactions.

  Extra Lennard-Jones and electrostatic interactions between pairs of atoms in a molecule can be added in the `[ pairs ]` section of a molecule definition. The parameters for these interactions can be set independently from the non-bonded interaction parameters.

- `[defaults]` 是1-4 scaling之类的东西，不同力场不一样

- The [ settles ] directive (**specifically for water**) defines the first atom of the water molecule. The settle funct is always 1, and the distance between O-H and H-H distances must be given. Note that the algorithm can also be used for TIP3P and TIP4P
  [Constraint algorithms - GROMACS documentation](https://manual.gromacs.org/current/reference-manual/topologies/constraint-algorithm-section.html)
  
- The exclusions for non-bonded interactions are generated by [grompp](https://manual.gromacs.org/current/onlinehelp/gmx-grompp.html#gmx-grompp) for neighboring atoms up to a certain number of bonds away, as defined in the `[ moleculetype ]` section

  [Exclusion of nonbonded interactions - GROMACS documentation](https://manual.gromacs.org/current/reference-manual/topologies/molecule-definition.html#exclusions)

  > gromacs中加了bond的atom pairs（约束）是不自动exclude non-bonded interaction的，否则键长不应该变

#### Restraints

gmx genrestr is used to generate position restraints, not distance restraints.

- [Flat-bottomed Position Restraints - GROMACS documentation](https://manual.gromacs.org/documentation/current/reference-manual/functions/restraints.html#flat-bottomed-position-restraints)

  ```
  ; Position restraint for each water oxygen  
  [ position_restraints ]  
  ; 	ai 	funct	g 	r 	k  
  	1 	1		1 	0.3	1000
  ```

  $g=1$ (Sphere), $r$ (nm), $k$​ (kJ mol<sup>−1</sup> nm<sup>−2</sup>). still single parti

- [Distance Restraints - GROMACS documentation](https://manual.gromacs.org/documentation/current/reference-manual/functions/restraints.html#distance-restraints). put this after `[ bond ]` section. Example: 

  ```
  #ifdef POSRES_restr
    [ bonds ]
    ;    ai     aj funct         c0         c1         c2         c3
      1137    1861    10       0.30       0.38        0.40      25000
      1819    1890    10       0.27       0.32        0.35      25000
      1833    1867    10       0.27       0.32        0.35      25000
  #endif
  ```

- 

### make_ndx

[gmx make_ndx - GROMACS documentation](https://manual.gromacs.org/documentation/current/onlinehelp/gmx-make_ndx.html)

[How to create an index file in GROMACS - Compchems](https://www.compchems.com/how-to-create-an-index-file-in-gromacs/#creating-a-new-index)

type 'h' for help...

![make_ndx](https://cdn.jsdelivr.net/gh/gxf1212/notes@master/research/Programming-for-MD.assets/make_ndx.png)

`-n index.ndx`: based on an existing index file

`nr`: number

> rename: 
>
> ```shell
> xxx selection \n
> name 9 New_name
> ```

> 选区用于选择原子/分子/残基以进行后续分析. 与传统索引(index)文件不同, 选区可以是动态的, 即, 可以对轨迹中的不同帧选择不同的原子. GROMACS手册的第八章《分析》中有一小节对选区进行了简短的介绍, 并给出了一些建议. 当你初次接触选区概念时, 这些建议可帮助你熟悉它. 下面将就选区的技术细节和语法方面给出更加详细的说明.
> [在命令行中指定选区](https://jerkwin.github.io/GMX/GMXsel/#在命令行中指定选区)

## mdrun and .mdp options

### minimization

- For efficient BFGS minimization, use switch/shift/pme instead of cut-off.

### non-bonded

use “switch”, Smoothly switches the potential to zero between rvdw-switch (page 211) and rvdw (page 212). i.e. a switching distance of 10 Å and a smooth cutoff distance of 12Å in the paper

With GPU-accelerated PME or with separate PME ranks, [gmx mdrun](https://manual.gromacs.org/documentation/2018/onlinehelp/gmx-mdrun.html#gmx-mdrun) will automatically tune the CPU/GPU load balance by scaling [`rcoulomb`](https://manual.gromacs.org/documentation/2018/user-guide/mdp-options.html#mdp-rcoulomb) and the grid spacing.



vdw and elec, common cutoff/switchdist


from sob handout（我没查到）: 根据GROMACS手册的建议，使用各版本CHARMM力场时都建议用以下参数

```
constraints = h-bonds
cutoff-scheme = Verlet
vdwtype = cutoff
vdw-modifier = force-switch
rlist = 1.2
rvdw = 1.2
rvdw-switch = 1.0
coulombtype = PME
rcoulomb = 1.2
DispCorr = no
```



### saving

- gmx log file not that useful

  ```
  nstxout     = 0       ; save coordinates every 10.0 ps
  nstvout     = 0       ; save velocities every 1.0 ps
  nstenergy   = 0       ; save energies every 1.0 ps
  nstlog      = 5000    ; update log file every 10.0 ps
  ```

  in npt.mdp. nstlog=0 in em.mdp

- 



`mdout.mdp`: **all** arguments actually used (default value if not specified). help with debugging....



### Other

顺带一提，对生物分子的模拟，我一般建议让程序在模拟过程中就一直对生物分子消除平动转动，对于GROMACS跑蛋白质来说就是设`comm-grps = protein`和`comm-mode = angular`，这样就避免了生物分子中途跑出盒子的问题。

http://sobereva.com/627

https://manual.gromacs.org/documentation/current/user-guide/mdp-options.html#mdp-comm-mode



### Free energy

- [Free energy interactions - GROMACS documentation](https://manual.gromacs.org/documentation/current/reference-manual/functions/free-energy-interactions.html)

  Gromacs perturbs every parameter.

- We don't need to define `couple-moltype`, `couple-lambda0`, `couple-lambda1`, and `couple-intramol` if we've defined B state. The couple parameters are for solvation free-energies.

- it is simpler to do everything with a single lambda setup without the lambda for interaction types.

- Dummy atoms have epsilon and q both in zero, so no worry



### Continue a run

#### [gromacs的续跑问题](http://bbs.keinsci.com/thread-17980-1-1.html)

[官方解决方案](http://manual.gromacs.org/current/user-guide/managing-simulations.html)：举个例子，如果中断的任务是这样运行的：`gmx mdrun -deffnm md` 你可以在同一个文件夹下运行：

``` shell
gmx mdrun -s md.tpr -cpi md.cpt -deffnm md
```

`mdrun`默认会将新产生的轨迹添加到原始文件末尾，最终文件会包括续跑前与续跑后的所有内容。

#### [延长时间再跑](https://blog.csdn.net/MurphyStar/article/details/113679744)

`-extend`. edit `.tpr` file and provide `.cpt` file

> Fatal error: Cannot change a simulation algorithm during a checkpoint restart. Perhaps you should make a new .tpr with grompp -f new.mdp -t npt.cpt 

The cpt file extension stands for portable checkpoint file. The complete state of the simulation is stored in the checkpoint file

```shell
gmx trjconv -f npt.cpt -s npt.tpr -o npt_cpt.gro
```

recover interrupted simulation, to get the .gro

#### Restart a run with multidir 

(gmx_mpi)

may not be available



### Options

`-nsteps <int>` (default: -2)

Run this number of steps (-1 means infinite, -2 means use mdp option, smaller is invalid)



## trjconv

It is a pity that gmx itself cannot process trajectories in parallel. MPI is for cross-node communication and does not work.

### Basics

- `-dt`: not real time, but how many frames we go through each time we collect one frame
- Using `-cat`, you can simply paste several files together without removal of frames with identical time stamps.

see [here](#pbc-processing) for pbc processing



## other

- is this right?

  Actually, the SR terms are indeed interactions of the polymer with itself. 1-4
  interactions are special interactions that occur between atoms separated by 3
  bonds. SR stands for "short range," which encompasses all interactions that are
  not excluded by that occur within the shortest nonbonded cutoff.

- 



## Debug

### general and notes

- https://gromacs.org-gmx-users.maillist.sys.kth.narkive.com/J6lqsB6H/gmx-users-increasing-cut-off-and-pme-grid-spacing
  box too big!

- bad bond modeling, connecting far atoms
  
  ```
  Fatal error:
  239 of the 71274 bonded interactions could not be calculated because some atoms involved moved further apart than the multi-body cut-off distance (0.494608 nm) or the two-body cut-off distance (1.4325 nm), see option -rdd, for pairs and tabulated bonds also see option -ddcheck
  ```
  
- gmx加了GPU就闪退、CPU极慢的问题，就是跟体系、建模有关，之前是键删得不对，现在是把em的steep改成cg，就跑不了了

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

- [谈谈怎么判断分子动力学模拟是否达到了平衡 - 思想家公社的门口：量子化学·分子模拟·二次元 (sobereva.com)](http://sobereva.com/627)

### GPU, MPI, plumed, etc.

1. https://stackoverflow.com/questions/33176592/pmpi-comm-rank-invalid-communicator

   This usually indicates that some sort of a <u>mix-up between various MPI implementations</u> or different versions of the same MPI implementation has occurred. E.g. mpi.h is from one version while the binary library files are from another one. Or the code was linked against one version but then the runtime environment provides a different one. <u>Make sure that mpicc / mpic++ / mpiCC are from the same MPI implementation as mpirun / mpiexec used to launch the executable.</u>

2.  In command-line option -plumed
     File 'dat.plumed' cannot be used by GROMACS because it does not have a recognizable extension.
     The following extensions are possible for this option:  .dat

# NAMD and Amber

and VMD and CHARMM FF? I don't feel too much to say since they are just responsible for running MD (refer to pmemd as Amber)... so just put (common/fundamental) debug experiences here (no system-specific debug?...).



## NAMD 

### Basics

#### langevin dynamics

- if you set up a simulation with langevin dynamics but without pressure controls, it will be in the NVT ensemble.

  Langevin dynamics balances friction with random noise to drive each atom in the system towards a target temperature. The following parameters are good for equilibration, but a `langevinDamping` as low as 1. would be sufficient for simulation. Higher damping may be necessary if, for example, work done on the system by steering forces is driving up the temperature.

  [NAMD Configuration Files (uiuc.edu)](https://www.ks.uiuc.edu/Training/Tutorials/namd/namd-tutorial-unix-html/node26.html)

- 

- StrainRate < initial strain rate >
  Acceptable Values: decimal triple (x y z) 
  Default Value: 0. 0. 0. 
  Description: Optionally specifies the initial strain rate for pressure control.Is overridden by value read from file specified with extendedSystem.There is typically no reason to set this parameter.

#### FEP

![](E:\GitHub-repo\notes\research\MD-fundamentals.assets\alchequilsteps.jpg)

> 有没有可能，这里没有加restrain，只是不算在fep采样里
> 只是从lambda1 到 lambda2的平衡，还是production simulation



### Debug

#### Short

- FATAL ERROR: Atom 9 has bad hydrogen group size.  Check for duplicate bonds. 居然是vmd1.9.3的锅

- FATAL ERROR: Incorrect atom count in binary file equilibrate.coor     可能是文件损坏

  vmd says "ERROR) Mismatch between existing molecule or structure file atom count and coordinate or trajectory file atom count."

- 
  
- 



#### Atom moving too fast

[namd-l: Re: difficulty converting namd2 channel system to namd3 Atom velocity too fast, box too small errors. (uiuc.edu)](https://www.ks.uiuc.edu/Research/namd/mailing_list/namd-l.2020-2021/1291.html)

这种cuda底层错误，可能是结构有问题，多半是自己魔改参数了



I'm running MD simulation of a protein-ligand system (pdb id: 5tbm) with NAMD3 and CHARMM36/CgenFF force field. I removed extra components (except a water molecule near the ligand binding site which forms hydrogen bonds), and fixed the protein structure. After minimization, NVT, NPT with restrain, and NPT equilibration, everything went well. Then I performed 100ns MD simulation (delta t is 1 femtosecond), following by a 500ns MD simulation (delta t is 2 femtosecond). However, the latter simulation reports the following error after 200~300ns:
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



## Amber

### Basics

[prmtop format](https://ambermd.org/prmtop.pdf). only after .prmtop file is read into parmed do the residues have indices....

使用文本编辑器打开生成的.inpcrd文件，然后查找其中的盒子参数。盒子参数位于文件的最后一行，包含三个数字，分别表示盒子在x、y和z方向上的长度。





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
- [cpptraj document](https://amber-md.github.io/cpptraj/CPPTRAJ.xhtml)






- [Combining multiple trajectory files into a single trajectory and remove water molecules to save space. – AMBER-hub (utah.edu)](https://amberhub.chpc.utah.edu/combining-multiple-trajectory-files-into-a-single-trajectory-and-remove-water-molecules-to-save-space/)



# Quantum Chemistry

## Basics

[大体系弱相互作用计算的解决之道](http://sobereva.com/214)

MOZYME doing simulation for biomolecules...

[要善用簇模型，不要盲目用ONIOM算蛋白质-小分子相互作用问题 - 思想家公社的门口：量子化学·分子模拟·二次元 (sobereva.com)](http://sobereva.com/597)

退而求其次，在提一个簇模型来QM优化、算单点能



## RESP

One of the most used QC tools for molecular simulation is to fit charges. Here is the index for RESP and you can jump to other pages to see applications.

RESP charge reference articles: see [Protein-ligand-simulation sob articles](Protein-ligand-simulation.md#QM-Reference)



According to [sob RESP charge](http://sobereva.com/531), DFT overestimates the polarity in solution. Use a small dielectric constant.

- RESP (antechamber, single g16 run): **benzene** (my idea...Amber $\varepsilon_r=4$)
- RESP2 (Sobtop, two g16 runs): **(gas+your solvent)/2**. e.g. [(Metal-ion) RESP with sobtop](Metal-ion.md#Sobtop)

> [Liquids - Dielectric Constants (engineeringtoolbox.com)](https://www.engineeringtoolbox.com/liquid-dielectric-constants-d_1263.html)
>
> benzene: $\varepsilon_r=2.28$; ethanol: $\varepsilon_r=25.3$ at 20℃. benzene: half the polarity (for formaldhyde)





### Amber

`prepgen` is able to restrain the total charge of a residue, but what's the difference between this and <u>restraints in RESP fitting</u>?

simply see [Make topology (AmberTools)](Preparation-and-modeling.md#ambertools+tleap)



As for manually add restraints to RESP fitting (for special purposes), AmberTools provide a two-step RESP fitting protocol

https://ambermd.org/antechamber/dna.html  manually modify?

https://jerkwin.github.io/2018/03/20/AMBER高级教程A1-建小分子与DNA体系(包括基本电荷计算)

https://jerkwin.github.io/2017/09/20/GROMACS非标准残基教程2-芋螺毒素小肽实例

too cumbersome/handful!



### Multwfn

http://sobereva.com/441  case 3.4, add charge constraint in RESP fitting

http://bbs.keinsci.com/thread-35708-1-1.html

http://sobereva.com/soft/Sobtop/#ex5  Hint：关于给聚合物用RESP原子电荷

sobtop has not implemented such functionality. and for simply an unnatural amino acid, it can remove the extra atoms either? even though charges might be well fitted.







### Other tools

- [用Psi4计算RESP电荷](https://cloud.tencent.com/developer/article/1873725)
- [RESP charges — OpenFF Recharge documentation](https://docs.openforcefield.org/projects/recharge/en/stable/users/resp.html) also principles
- [Automatically calculate RESP charge using ORCA and Multiwfn - 知乎](https://zhuanlan.zhihu.com/p/475100962)
- [Restrained ElectroStatic Potential (RESP) atomic charge fitting | McCarty Group Wiki](https://jamesmccarty.github.io/research-wiki/RESP) using GAMESS-US/ORCA



## Gaussian Usage

### gjf input file



#### geom

http://bbs.keinsci.com/thread-1464-1-1.html

**写了geom=connectivity就会从输入文件末尾读取连接关系**，所以末尾那一堆连接关系不能删，否则必报错。

连接关系的设定原理上并不会影响量化的计算结果。geom=connectivity留不留它都一样。<u>仅对于分子力学计算</u>连接关系是必须的。
即便输入文件相同，跑两次结果也可能不同。应该先对比最后得到的结构、能量相差多少。可能只是因为数值巧合收敛到了不同极小点上。

没写geom=connectivity时末尾的连接关系可保留也可以不保留，保留了也不会被读取。但是，如果你的计算任务牵扯到从末尾读取其它额外信息，比如基组信息、溶剂设定、输出的wfn文件路径等等，就必须把连接关系删掉，否则那些设定将没法正常读取。

没有可靠或者不可靠之说，都一样，不影响结果

### result

- extract optimized structure from `.log` file in cmd:

  ```shell
  antechamber -i opt.log -fi gout -o opt.mol2 -fo mol2
  ```

- 



### Common errors

- [gaussian提示illegal instruction , illegal opcode错误](http://bbs.keinsci.com/thread-1331-1-1.html): CPU architechture not support, or too old. use old versions of Gaussian

- [Gaussian 运行错误 l1.exe omode 33261 compare 7](http://bbs.keinsci.com/thread-3554-1-1.html) or [Files in the Gaussian directory are world accessible](https://www.researchgate.net/post/How-to-solve-Gaussian09-Error-l1exe-omode-33261-compare-7)

  the right command after installation:

  ```bash
  chmod -R 700 /home/software/gaussian/g09
  ```

  which will restrict the access to the entire directory (recursively) only to you

- 



## Multiwfn

see details in each section...





### Other

https://www.theochem.ru.nl/molden/
Molden is a package for displaying Molecular Density from the Ab Initio packages GAMESS-UK , GAMESS-US and GAUSSIAN and the Semi-Empirical packages……



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





# Other

- [How to Use US EPA EPI Suite to Predict Chemical Substance Properties](https://www.chemsafetypro.com/Topics/CRA/How_to_Use_US_EPA_EPI_Suite_to_Predict_Chemical_Substance_Properties.html)

  [Download EPI Suite™ - Estimation Program Interface v4.11 | US EPA](https://www.epa.gov/tsca-screening-tools/download-epi-suitetm-estimation-program-interface-v411): predict properties of small molecules







## CASP

<img src="https://cdn.jsdelivr.net/gh/gxf1212/notes@master/research/MD-fundamentals.assets/casp.png" style="zoom:50%;" />

<img src="https://cdn.jsdelivr.net/gh/gxf1212/notes@master/research/MD-fundamentals.assets/casp15.png" style="zoom:50%;" />

