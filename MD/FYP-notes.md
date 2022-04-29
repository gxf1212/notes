# Notes on FYP

Notes on the final year project (毕设), Nov 2021~May 2022.

Starting reading from [Stage1 Protocol](#Stage-1-Protocol)



# background

> 9.27

- It was originally developed by Gilead Sciences, Inc. to treat Ebola virus disease.
- RdRp=NSP12. cofactor: nsp7/nsp8, etc.
  - of course needs helicase (NSP13), etc.
- 老药新用：drug repurposing

## Mechanism

- *Mechanism of SARS-CoV-2 polymerase stalling by remdesivir* (nature communications)

We show that <u>addition of the fourth nucleotide following remdesivir incorporation</u> into the RNA product is impaired by <u>a barrier to further RNA translocation</u>. This translocation barrier causes retention of the RNA 3ʹ-nucleotide in the substrate-binding site of the RdRp and interferes with entry of the next nucleoside triphosphate, thereby **stalling RdRp**. In the structure of the remdesivir-stalled state, the 3ʹ-nucleotide of the RNA product is matched and located with the  template base in the active center, and this may impair proofreading by  the viral 3ʹ-exonuclease.

- *Remdesivir is a delayed translocation inhibitor of SARS-CoV-2 replication* (PDB: [7L1F](http://www.rcsb.org/pdb/explore.do?structureId=7L1F))

Here, we present a 3.9-Å-resolution cryo-EM reconstruction of a <u>remdesivir-stalled RNA-dependent RNA polymerase complex</u>, revealing full  <u>incorporation of 3 copies of remdesivir monophosphate (RMP) and a  partially incorporated fourth RMP</u> in the active site. The structure reveals that RMP blocks RNA translocation after incorporation of 3 bases following RMP, resulting in delayed chain termination

- *Structural basis for inhibition of the RNA-dependent RNA polymerase from SARS-CoV-2 by remdesivir* (science)

Here we report the cryo–electron microscopy structure of the SARS-CoV-2  RdRp, both in the apo form at 2.8-angstrom resolution and <u>in complex with a 50-base template-primer RNA and remdesivir</u> at 2.5-angstrom resolution. The complex structure reveals that the partial double-stranded RNA template is inserted into the central channel of the RdRp, where remdesivir is covalently incorporated into the primer  strand at the first replicated base pair, and terminates chain elongation.

## simulation

- *Revealing the Inhibition Mechanism of RNA-Dependent RNA Polymerase (RdRp) of  SARS-CoV-2 by Remdesivir and Nucleotide Analogues: A Molecular Dynamics  Simulation Study*

In this work, we have examined the action of remdesivir and other two  ligands <u>screened from the library of nucleotide analogues</u> using docking  and molecular dynamics (MD) simulation studies.

The binding energy data reveal that compound-17 (−59.6 kcal/mol) binds  more strongly as compared to compound-8 (−46.3 kcal/mol) and remdesivir  (−29.7 kcal/mol) with RdRp. 找到两个更强的

筛选的更是一大堆了，搜    remdesivir analog screening sars-cov-2 RdRp

## other similar simulation

- *High-throughput rational design of the remdesivir binding site in the RdRp of SARS-CoV-2: implications for potential resistance*

  哪些突变能resistance

- *SARS-CoV-2 RNA dependent RNA polymerase (RdRp) targeting: an in silico perspective*

  2021 April, only RdRp dynamic. docked several our drugs with vina

- 



# Software usage

record sth general

## gmx

1. check installation info

   ```shell
   gmx -version
   ```

2. 

### .mdp options

#### vdw

use “switch”, Smoothly switches the potential to zero between rvdw-switch (page 211) and rvdw (page 212). i.e. a switching distance of 10 Å and a smooth cutoff distance of 12Å in the paper

With GPU-accelerated PME or with separate PME ranks, [gmx mdrun](https://manual.gromacs.org/documentation/2018/onlinehelp/gmx-mdrun.html#gmx-mdrun) will automatically tune the CPU/GPU load balance by scaling [`rcoulomb`](https://manual.gromacs.org/documentation/2018/user-guide/mdp-options.html#mdp-rcoulomb) and the grid spacing.





> ## MD simulation (ATP-Mg^2+^) with Gromacs
>
> The ATP system, energy minimization and indexing have been done. 
>
> the most important setting is 
>
> - vdW and electrostatic
> - energy groups?
> - length
>
> do not need to repeat MD
>
> 1. nvt
>
>    ```shell
>    gmx grompp -f nvt.mdp -c minim.gro -r minim.gro -n solion.ndx -p solion.top -o nvt.tpr
>    gmx mdrun -deffnm nvt
>    echo "15\n0" | gmx energy -f nvt.edr -o nvt.xvg # temperature
>    xmgrace nvt.xvg
>    ```
>
> 2. npt
>
> 3. 

## Gaussian

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



## Pymol

1. delete命令！

2. select atom name

   ```
   sele name HA
   ```

   see more identifiers  https://pymolwiki.org/index.php/Selection_Algebra

3. 

## VMD techniques

杂记, some extra functions, that I encountered. for details, check vmd-ug.pdf

### General

1. run in terminal

   ```shell
   vmd -dispdev text -e combine.tcl
   ```

   vmd scripting, [pass parameters](http://timchen314.com/vmd%E7%AC%94%E8%AE%B0/)

   ```
   set file [lindex $argv 0]
   vmd .... -args arg arg2
   ```

2. question mark prompt and return to the normal vmd> prompt? that mean the tcl interpreter is waiting for you to **close a brace**, so try } or ] or ) followed by enter. you may need to enter it a couple of times.

3. How to run TCL script on VMD?

   This is very easy to do. Just use any text editor to write your script file, and in a VMD session, use the command 

   ```shell
   source filename
   ```

   to execute the file. (either VMD command line or Tk Console)
   
4. Clears the structure, topology definitions, and aliases, creating clean environment just like a new context.

   ```tcl
   psfcontext reset
   ```

5. resize font in TkConsole https://www.ks.uiuc.edu/Research/vmd/mailing_list/vmd-l/29151.html

   type in TkConsole: tkcon font <type> <size>

   ```
   tkcon font Courier 16
   ```

   size of the window is automatically changed. But font type not affected?

6. As for the global font: the higher resolution your screen is, the smaller your font is

   Maybe because the source code specifies pixels??

6. TkConsole auto-loads history file?

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
	
8. select certain frames

   ```tcl
   atomselect top "within 5 of resname LYR" frame 23
   ```

9. Menu--Mouse--Center: pick an atom to center

10. path to plugins

    ```shell
    /usr/local/lib/vmd/plugins/noarch/tcl/
    ```

11. 

5. To know about your system, like checking the number of atoms, just load it into vmd (also when executing scripts) and see the cmd.

### VMD Graphics

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
2. Graphics--colors

   - background
   - other many settings, like element, residue, 2d structure. may set default color
3. Labeling a few atoms

   - Mouse--Label--Atoms (etc.). Mouse--Pick
   - Graphics--Labels, click on an atom, info shows up. 
   - Graphics--Color--Label--Atoms (etc)---choose your favorite color
   - Mouse--Label--Atoms (etc.). Mouse--Pick
   - Click on any atom and a piece of text will show up
   - Graphics--Labels--Properties (of the text)
4. Graphics--Representations--Drawing Method, Beta: we may not use that field. So we can replace it with some properties we computed and let VMD color atoms according to it
5. 

## shell

1. shell 统计出现行数

   ```shell
   cat complex_ATPP.pdb | grep "SOD" | wc -l
   ```

   - cat显示内容
   - grep查找字符
   - wc计算字数

2. if 判断文件或目录是否存在

   https://blog.csdn.net/m0_38039437/article/details/100160042



## Some other notes with VMD and NAMD

> ERROR: failed on end of segment MOLECULE DESTROYED BY FATAL ERROR!

probably need to add top/itp file







# Stage 1 Protocol: MD

stage 1: from structure to FEP

## Notes

**protein-ATP system**

the RdRp, residue name has already been aliased. only one chain. no disulfide bonds. patched protein terminal

The ATP molecule from FEP, strange atom type, cannot be used for MD system build-up..(maybe we can aliase pdb)

why only one Mg? 虽然确实要两个，但第二个的位置至今under debate。。

notice the binding mode?



## Prepare the docked structure (ligand)

### basic

original .pdb文件 去除原子类型??

two types of processings

- directly from pdb structure (pdb to pdb)
- make (whatever type) into pdbqt and dock first, then convert (pdbqt or original) to pdb

### docking

to dock two molecules together, we may:

- use docking software (quick, dirty)
  - selects its best conformer; do not guarantee same orientation
- align with existing molecule (save the pdb and align with Python code)
  - may overlap (but most ok?)

| program  | position                          | protein | ligand  | convenience          |
| -------- | --------------------------------- | ------- | ------- | -------------------- |
| autodock | known pocket position, make a box | polar H | polar H | a little verbose? ok |
| zdock    | select contacting residue?        |         |         |                      |
| haddock  |                                   |         |         |                      |
|          |                                   |         |         |                      |
|          |                                   |         |         |                      |

### Autodock vina

> Prepare receptor, as well as flexible: see UROPS notes
>
> - when writing file, always browse and name the file!
> - when recording vina parameters, centers are on the left! not right!
> - when choosing residues, click on the S circle!
>

#### info&convert existing structure

RemdesivirTP https://pubchem.ncbi.nlm.nih.gov/compound/56832906

```shell
# pubchem 2d, for docking
f=remtp
obabel ${f}.sdf -osdf -O ${f}-t.sdf --gen3D 
obminimize -ff MMFF94 -n 1000 ${f}-t.sdf > ${f}.pdb
obabel ${f}.pdb -opdbqt -O ${f}.pdbqt -as --partialcharge gasteiger 
rm ${f}.sdf ${f}-t.sdf ${f}.pdb
```

always collect obminimize results in .pdb file. Then convert to .pdbqt. 

If from a **normal .pdb**

```shell
f=atp
obabel ${f}.pdb -opdbqt -O ${f}.pdbqt -as -h --partialcharge gasteiger 
```

> The ligand may move away after obabel, but it doesn’t matter for docking
>
> However, sometimes it gives wrong aromatic rings. Check hydrogens! You may use [other methods](#Other-about-modeling). also: openeye package?

> Alternative: ADTools for ligand
>
> - Edit--Hydrogen--Merge non-polar
> - Edit--Atom--Assign AD4 Type
> - Edit--Charge--Compute Gasteiger
> - Save as PDBQT
>   - always Browse for a name!!
>   - maybe select what to save
>
> failed?? compare the text!
>
> > As for the receptor, maybe directly Grid--Open to process the .pdb and save a .pdbqt?

requirements for vina:

- protein and ligand don’t need non-polar hydrogen.
- protein and ligand have add empirical charge on each atom and we don’t use `-p 7.0`, just `-h`
- don’t care visualization of oxygen, etc. (see below)
- but monitor mis-added hydrogens!

> note: 11.29, dachuang-other-SDH-docking
>
> if you view .pdbqt in Pymol
>
> - those saved from ADT is normal. Ar is shown. But vina reports error?
> - those converted from obabel shows C-O single bond as double?
>
> But their rotatable bond shown in ADT is normal and the same, suggesting it’s just visualization problem. (not the same software!)
>
> Maybe due to the merging of non-polar Hs. After adding H back to docked .pdbqt, Pymol visualizes normally
>
> ```
> set valence, 1
> set valence_mode, 1
> ```
>
> to show bonds explicitly  https://pymolwiki.org/index.php/Valence

#### docking commands

```shell
f=remtp
# vina
vina --config conf_rigid.txt --ligand ${f}.pdbqt > ${f}_log.txt
vina_split --input ${f}_out.pdbqt
rm ${f}_out.pdbqt
mkdir ${f}
mv ${f}_* ./${f}
```

> conf.txt: start with # or other, as comment.

After that, convert back to .pdb, add H

```shell
f=out_ligand_1
obabel ${f}.pdbqt -opdb -O ${f}_d.pdb  # you have to got .pdb first, or fails
obabel ${f}_d.pdb -opdb -O ${f}.pdb -p 7.0 -as
rm ${f}_d.pdb
```

### Draw and convert

tools that can **both draw** a molecule **and convert** through SMILES.  Your own molecule!

#### ZINC+obabel

- ZINC: search and draw, copy that smiles

- convert to anything by obabel

  ```shell
  f='Nc1ncnc2c1ncn2[C@@H]1O[C@H](CO[P@](=O)(O)O[P@](=O)(O)OP(=O)(O)O)[C@@H](O)[C@H]1O'
  obabel -:$f --gen3d -opdbqt -O atp.pdbqt -as -h --partialcharge gasteiger # for vina
  ```

### Avogadro

> an alternative for ChemBioOffice in Linux

[building-with-smiles](https://avogadro.cc/docs/building-molecules/building-with-smiles/): Build--Insert

output: File--Export--Molecule--xxx.pdb

https://avogadro.cc/docs/tools/draw-tool/

## Draw and edit molecule

minimization won't change its position too much, but so helpful for later use. Or just modify on minimized ATP...

```shell
obminimize -ff MMFF94 -n 1000 atp.pdb > atp_m.pdb
```

### GaussView

load pdb into it. Almost no changes in the position. But we are so familiar with modeling!

Try to make every bond and hydrogen right! Maybe Ar ring should be made into single-double-bond-interspaced.

One thing you MUST do after that is: unify the residue name (change for edited atoms). or AutoPSF says sth like 'failed on end of segment'

### Pymol--builder

Also as easy to use as GaussView

also need to edit the atom names

> when editing for FEP, remember to edit the names before going into CHARMM-GUI, or it will cause trouble for scripting!

I think it's better to check the aromatic bonds here because it looks strange in GV..?

### DSV

may also edit small molecule and prepare for docking (usable?)

`Small Molecules` in the second line of menu. Also `Chemistry` in the 1st line. Delete in the 3rd line. 

May vary a bit if you `Clean Geometry` to optimize structure. 

Not as familiar as Gauss.

> UCSF-Chimera doesn' t seem to add groups. So does Avogradro
>
> but can prepare for UCSF DOCK (adt, and other?) https://zhuanlan.zhihu.com/p/148384183

### After drawing

maybe minimize. you should change the name of the ligand? not really needed

```shell
grep "ATP" -rl ./remtp.pdb | xargs sed -i "s/ATP/LIG/g"
```

## Prepare the system with VMD etc.

### reference

some tutorials:

- videos

  - for explorations, codes, see MD-tutorials-all.md “my exploration” section.
- https://www.youtube.com/watch?v=5PYTQiKf0D4 CHARMM GUI official tutorial, series

other tools:

- http://mackerell.umaryland.edu/ CHARMM force field files
- https://www.ks.uiuc.edu/Research/vmd/plugins/autopsf/ autopsf usage



> - current plan
>
>   - use AutoPSF, import the complex, include ligand's params, and export .pdb and .psf files of the complex (as Leili suggests?)
>   - separately generate .pdb and .psf files for protein and ligand; run another script to combine them, finally include parameters
>
>   both is ok, but:
>
> - problems
>
>   - how to model magensium?

I have to summarize the steps:

### build complex structure

normally build your complex.pdb (by docking etc). Get positions right. Remember the Mg^2+^.

Then split all components.

> aligning ligand if there’s a position shift
>
> ```shell
> conda activate work
> path=/home/gxf/desktop/work/research-porjects/NUS-UROPS/md/prepare
> python $path/align_ligand.py \
> '/home/gxf/desktop/work/research-porjects/FYP/setup and MD/ATP-namd/separate_building' \
> atp.pdb ATP_autopsf.pdb
> # path ref mob
> python $path/co_center.py \
> '/home/gxf/desktop/work/research-porjects/FYP/setup and MD/ATP-namd/separate_building' \
> atp.pdb ATP_autopsf.pdb
> ```
>
> 

### build complex-method 1 (deprecated)

> it is said that when you use AutoPSF you cannot track the topology file used. It’s suggested to adopt method 2

#### make the all .pdb and .psf with AutoPSF

Extensions---Modeling--Automatic PSF Builder, would be a GUI

> **AutoPSF notes**
>
> - .pdb file only provides molecular infomation (namely coordinates)
> - topology files (.itp, .rtp) contain all the parameters, i.e. force field info
> - top files convert .pdb files into .psf files, which contains full information
> - for all ligands, the chain name is changed into ‘X’

should **click in every step**, during which **all patches are made** (generated .pdb is different)

i.e have done `segment`, `pdbalias`, `guesscoord`, etc.

> no that this tools uses all36 force field! You can see in
>
> ```tcl
> /home/gxf/vmd/lib/plugins/noarch/tcl/readcharmmtop1.2/
> /usr/local/lib/vmd/plugins/noarch/tcl/readcharmmtop1.2/
> ```
>
> ```shell
> ls
> pkgIndex.tcl                 top_all36_hybrid.inp
> readcharmmtop.tcl            top_all36_lipid.rtf
> top_all22_prot.rtf           top_all36_na.rtf
> top_all27_hybrid.inp         top_all36_prot.rtf
> top_all27_prot_lipid_na.inp  top_amber2charmm.inp
> top_all36_carb.rtf           toppar_all36_carb_glycopeptide.str
> top_all36_cgenff.rtf         toppar_water_ions_namd.str
> ```

which is successfully applied to rdrp, atp and Mg

Summary on steps (see MD-tutorial for details)

- load pdb into vmd
- open AutoPSF builder
- modify top files
- finish step 1~4

> should be the same as loading topology in tkConsole and save?

> debug:
>
> 1. error in ATP
>
>    ```
>    ERROR: failed on end of segment
>    MOLECULE DESTROYED BY FATAL ERROR!  Use resetpsf to start over.
>    ```
>
>    only 42/43 atoms, recognized as water? replace that ATPP residue name with ATP-space. the chain name X
>
>    is assigned wrongly...

> note on results: `xxx_autopsf_formatted.pdb` only removes `REMARK  xxx` and `END` line from `xxx_autopsf.pdb`. basically identical

#### use console to combine all molecules

Extensions---Tk console, or execute in console

```tcl
package require psfgen
resetpsf

readpsf rdrp_autopsf.psf
coordpdb rdrp_autopsf.pdb
readpsf atp_autopsf.psf
coordpdb atp_autopsf.pdb
readpsf mg_autopsf.psf
coordpdb mg_autopsf.pdb

writepsf combined.psf
writepdb combined.pdb

puts "Finished"
quit
```

```shell
vmd -dispdev text -e merge.tcl
```

### build complex-method 2 (using)

> use console, include topology. [How to create a PSF file](https://sassie-web.chem.utk.edu/docs/structures_and_force_fields/notes.html)
>

Modeling--Tk Console

- create segment for our molecule first...if you start with .pdb file
- for normal ligand, just build normally with the above files, na_nad just deplicates and abandoned

```shell
vmd -dispdev text -e merge.tcl
```

for atp, still built with AutoPSF, topology files **only include top_all36_na.rtf, top_all36_cgenff.rtf**. May also

and only 'formatted' provides the right coordinates! _autopsf adjusts coordinates a little bit (why?)

but Tk console reports error!

>ERROR) Error reading optional structure information from coordinate file atp_autopsf_formatted.pdb
>ERROR) Will ignore structure information in this file.

but **'formatted’ can be recognized by CHARMM-GUI**!

> note: for newly added atoms, parameterization is needed?
>
> <img src="https://gitee.com/gxf1212/notes/raw/master/MD/MD.assets/parameterization.jpg" alt="parameterization" style="zoom:80%;" />
>
> but may also use 'formatted’. but for remtp I used remtp_autopsf_temp.pdb
>
> Another way to generate uploadable .pdb is:
>
> ```shell
> gmx pdb2gmx -f remtp.pdb -o remtp.gro # though failed, we use that .gro file
> obabel -igro remtp.gro -opdb -O remtp-gro.pdb
> ```
>

Check the printed structure!!!! like

- <font color=red>check every single bond in GaussView before building anything, and CHARMM-GUI may mis-assign the aromatic bonds!</font>
- the Ar ring completeness
- remove Hs added to phosphate....

Choose 'Exact', 'Make CGenFF topology'

Then we obtain all .pdb, .psf, etc. that is needed.

> other files:
>
> - drawing: the recognized structure on the 1st page
> - copy `charmm-gui-xxxxx/toppar/lig.prm` (lig: residue name of your ligand) for use in your simulation! shown in [this video](https://www.youtube.com/watch?v=Pj40ZnybXds)

the successful version:

```tcl
# for atp, still built with AutoPSF, topology files except top_all36_na.rtf,
# top_all36_cgenff.rtf are deleted..and only 'formatted' provides the right coordinates!
# lig_g.rtf: agroups
package require psfgen
resetpsf
topology top_all36_prot.rtf
topology toppar_water_ions.str
topology lig_g.rtf

# maybe not using alias here
alias residue HIS HSE           
alias atom ILE CD1 CD        
alias atom SER HG HG1         
alias atom CYS HG HG1          

segment PRO {pdb rdrp.pdb}
coordpdb rdrp.pdb PRO

# use files from CHARMM-GUI
readpsf ligandrm2.psf
coordpdb ligandrm2.pdb
# aligned standard atp
# readpsf ligandrm.psf
# coordpdb ligandrm_aligned.pdb
# autopsf
# readpsf atp_autopsf.psf
# coordpdb atp_autopsf_formatted.pdb

segment MG {pdb mg.pdb}
coordpdb mg.pdb MG

guesscoord
writepdb merged.pdb
writepsf merged.psf
```

> notes
>
> - `toppar_water_ions.str`: contains **TIP3** water model and **ion** topology and parameter information. This is now **the only file** that contains these entities.
> - you'd better use capital letter ('MG') for use in CHARMM

> failed commands
>
> ```tcl
> package require psfgen
> resetpsf
> topology /home/gxf/vmd/lib/plugins/noarch/tcl/readcharmmtop1.2/top_all27_prot_lipid_na.inp
> topology top_all22_prot.rtf
> topology top_all27_prot_lipid.inp
> coordpdb rdrp.pdb
> 
> topology top_all36_na.rtf
> topology top_all36_cgenff.rtf
> coordpdb atp.pdb
> topology toppar_water_ions_namd.str
> coordpdb mg.pdb
> 
> puts "Finished"
> quit
> ```
>
> completely failure. don’t know what .inp file the tutorials used.
>
> ```shell
> grep "PROT" -rl ./rdrp.pdb | xargs sed -i "s/PROT/    /g" 
> ```
>
> this does not matter. later ligands: just use PRO for segment name!
>
> ```tcl
> package require psfgen
> resetpsf
> topology top_all36_na.rtf
> topology top_all36_cgenff.rtf
> topology toppar_all36_na_nad_ppi.str
> segment ATP {pdb atp.pdb}
> coordpdb atp.pdb ATP
> ```
>
> still not work for ATP. even though ATPP $\to$ ATP, still “unknown atom type ON3”
>
> ```
> topology toppar_all36_na_nad_ppi.str
> # autopsf, this probably failed..
> # segment LIG {pdb atp_autopsf_formatted.pdb}
> readpsf atp_autopsf.psf
> coordpdb atp_autopsf_formatted.pdb
> ```
>
> still not work for ATP. cannot recognize atoms. without “formatted” have correct names, but position of PO4 changed.
>
> **So we still MUST use CHARMM-GUI if we don’t directly aliase pdb**
>
> 
>
> the second try for remTP
>
> Use method 2: 
>
> > ERROR: failed on end of segment
> >
> > unknown residue type LIG
>
> tried AutoPSF and gmx
>
> note that in both cases the molecule structure in the first page of CHARMM-GUI might be strange, and the final structure is broken
>
> 

### build complex-method 3

build with Gromacs and AmberTools?



#### Appendix: CHARMM-GUI generate files for ligand

> <font size=5>if you want to perfectly retain its coordinates and atom names, use CGenFF server!</font>
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
> - after GUI, the ligand name is changed into LIG
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
> - the outputed residue name is ‘LIG’

then just click, click...and download all files

> charmm-gui, what do the files do? what is needed? these?
>
>![parameterization](https://gitee.com/gxf1212/notes/raw/master/MD/MD.assets/parameterization.jpg)

focus on `ligandrm.pdb/psf`, which can be put into a merge.tcl, as **an alternative way of AutoPSF** in generating files for ligand (other tools for protein, etc?). Carefully choose the force field!

> my experience
>
> at first, when I upload the built .pdb file, or replace ATOM with HETATM, or add hydrogen, the server did not recognize the ligand, always.
>
> 1. 11.27, align 2ILY (original structure) with the built .pdb, use its ATP
>
>    find 2 kinds of topologies in step 2
>
>    - **toppar_all36_na_nad_ppi.str**            NAD, NADH, ADP, ATP and others.
>    - top_all36_cgenff.rtf., par_all36_cgenff.prm. but with hydrogen. can I later remove?
>      - if you modify the protonation state, you can still not generate a correct cGenFF structure. The “Exact” field only provides ATP in toppar_all36_na_nad_ppi.str
>      - maybe I’ll use toppar_all36_na_nad_ppi.str first
>
> 2. 11.28, CHARMM-GUI failed building Mg2+
>
> for ‘formatted’:
>
> still **toppar_all36_na_nad_ppi.str** , a little change: Ar ring not planar!! position basically the same

#### Appendix 2: about the topology

When you encouter errors when reading .str file:

> “psfgen) ERROR!  FAILED TO RECOGNIZE SET.  Line 319: set para” etc.
>
> FATAL ERROR: UNKNOWN PARAMETER IN CHARMM PARAMETER FILE ../common/toppar_water_ions.str
> LINE=*set app*

[How-can-I-use-charm36-forcefiled-for-a-protein-bound-to-ATP-and-MG](https://www.researchgate.net/post/How-can-I-use-charm36-forcefiled-for-a-protein-bound-to-ATP-and-MG-Can-you-help-me)

1. First, you need to edit the stream file so that it is compatible with the NAMD/VMD psfgen tool.  To do that, you must comment out (or remove) all the lines containing CHARMM scripting code, since psfgen doesn't recognize them. 

2. Furthermore, the **na_nad_ppi.str** and file you mention requires parsing the "**top_all36_na.rtf**" file containing original nucleic acid parameters, so you need that too. 

   > also, just put toppar_water_ions.str after na.rtf and prot.rtf

3. You **should use both** the parameters from the stream files and the original **nucleic acid prm file**.  The stream files do not contain full parameters, some of them (for example some **non-bonded terms**) are expected to be found in the prm files. However, they are needed for accurate representation of these "extra" molecules they describe

3. 

#### Appendix 3: other ways to generate ligand topology

- https://cgenff.umaryland.edu is what CHARMM-GUI calls for ligand, the same. but stupidly we cannot `wget` files
- https://www.swissparam.ch/ MMFF/CHARMM22, too old

these servers generate files for multiple MD engines



### solvation and ionization

- solvate https://www.ks.uiuc.edu/Research/vmd/plugins/solvate/
- autoionize https://www.ks.uiuc.edu/Research/vmd/plugins/autoionize/

#### method 1 (scripting, easier?)

In the last step, you have obtained combine.pdb and .psf. open them with vmd

```shell
vmd merged.psf -pdb merged.pdb
```

you can directly do the following after merged in vmd:

```tcl
# if you'd like to make a .tcl file
package require psfgen
psfcontext reset
mol load psf merged.psf pdb merged.pdb
# the solvation script writes:
package require solvate
solvate merged.psf merged.pdb -t 11.5 -o solvated
# files are written
mol delete all
# the ionization script writes:
autoionize -psf solvated.psf -pdb solvated.pdb -sc 0.1 -o system
# params, to be consistent
```

####  method 2-GUI

> note: a trick: Extension--Modeling--Automatic PSF Builder--Options, check 'add solvation box' and 'ionization' options, follow the PSF building protocol, and you will get completely solvated and ionized system!!!
>
> though the parameters cannot be set...

##### Solvation

Extension--Modeling--Add Solvation Box

- You can rotate to minimize volume

- WT: residue name for waters. can change

- if you check 'use molecular dimension', the min and max in 3D will be calculated automatically, and you only need to add 'padding' (and measure) as we usually did. 

  otherwise we can specify all the parameters manually
  
- Click 'solvate', molecular info (# of water) is shown in Terminal again.

> this GUI doesn’t have ionization, neither choose water model?? TIP3P water is the default...

##### Ionization

Extensions--Modeling--Add ions (autoionize)

very straightforward

- Choose salt, additional ions
- Neutralize and set NaCl concentration to 0.15 mol/L

> it’s not replacing water mols, it adds ions

#### measurement of the system 

In a new vmd session, load the solvated and ionized structure

```tcl
# you can ignore this if you come from method1. just load files
package require psfgen
psfcontext reset
# readpsf system.psf
# coordpdb system.pdb
mol load psf system.psf pdb system.pdb
# measure and assign values
set everyone [atomselect top all]
set minmax [measure minmax $everyone]
# set center [measure center $everyone]
foreach {min max} $minmax { break }
foreach {xmin ymin zmin} $min { break }
foreach {xmax ymax zmax} $max { break }

# generate output for .namd file. if you do not use non-standard/rotated box
puts "# Periodic Boundary Conditions"
puts "cellBasisVector1 [ expr $xmax - $xmin ] 0 0 "
puts "cellBasisVector2 0 [ expr $ymax - $ymin ] 0 "
puts "cellBasisVector3 0 0 [ expr $zmax - $zmin ] "
puts "cellOrigin [ expr ($xmax + $xmin)/2 ] [ expr ($ymax + $ymin)/2 ] [ expr ($zmax + $zmin)/2 ] "
```

we need length of 3 edges and coordinate of the center

```shell
vmd -dispdev text -e measure.tcl
```

> info: see the folder...probably similar for all ligands
>
> RdRp-ATP
>
> ```
> cellBasisVector1 102.76400184631348 0 0 
> cellBasisVector2 0 93.35700035095215 0 
> cellBasisVector3 0 0 108.42400050163269 
> cellOrigin 57.934000968933105 58.11250019073486 57.53700029850006 
> ```
>
> 96013 atoms, 27704 water

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
paraTypeCharmm	    on
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

  ```
  fixedAtoms          on
  fixedAtomsFile      myfixedatoms.pdb  ;# flags are in this file
  fixedAtomsCol       B                 ;# set beta non-zero to fix an atom
  ```

  > The fixedAtoms, constraintScaling, and nonbondedScaling parameters may be changed to preserve macromolecular conformation during minimization and equilibration (fixedAtoms may only be disabled, and requires that fixedAtomsForces is enabled to do this).

- constraintScaling 0 is the _immediate_ removal of all constraints

- PME is only applicable to periodic simulations. PME grid dimensions should have small integer factors only and be greater than or equal to length of the basis vector.

  ```
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
   langevinPiston	off
   ```

2. Minimization with restrained carbon alpha atoms.

   ```
   fixedAtoms	off
   ```

3. Langevin dynamics with restraints.

   > langevin already on

4. Constant pressure with restraints.

   ```
   langevinPiston	on
   ```

5. Constant pressure without restraints.

   ```
   constraintScaling	0
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
>     ├── pro-lig-prod
>     └── pro-lig-prod.log
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
>    You will need to have a non binary coord file with as well as a binary one. Don't know why, thats just the way it is...
>    
>2. how to monitor your simulation?
> 
>   search for “TIMING” or “Wall” in .log file for the progress of your simulation, which updates every $outputTiming steps. “Benchmark time:”is also ok
> 
>3.  

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
> >          Use +auto-provision to fully subscribe resources or +p1 to silence this message.
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







### Run in Gromacs (prepare)

> prepare, equillibrate in NAMD, run in gmx. i.e. convert equilibrated system to gmx (.gro/top, ndx, velocity)
>
> just a try. not suitable for fep

https://www.ks.uiuc.edu/Research/vmd/plugins/topotools/

TopoTools, not only converting to gmx and lammps, more importantly editing your topology

1. make the latest coordinates as pdb, and then .gro

   ```tcl
   # under ./common
   mol load psf system.psf
   mol addfile ../equil/rdrp-atp-equil.coor
   set sel [atomselect top all]
   $sel writepdb equilibrated.pdb
   ```
   
   make a box. find the length of cell basis vector from your measure or `equil.namd`
   
   ```shell
   # under gmx
   gmx editconf -f equilibrated.pdb -o equilibrated.gro \
   -box 102.76400184631348 93.35700035095215 108.42400050163269 \
   -center 57.934000968933105 58.11250019073486 57.53700029850006 # x y z
   ```
   
   check in pymol to see if they are the same
   
   > for FEP
   >
   > ```tcl
   > # vmd
   > mol load psf ligand.psf
   > mol addfile ../equil/ligand-fine/rdrp-mtp-remtp-ligand-equil.coor
   > set sel [atomselect top all]
   > $sel writepdb equilibrated.pdb
   > exit
   > ```
   >
   > ```shell
   > # shell
   > gmx editconf -f equilibrated.pdb -o equilibrated.gro \
   > -box 102.65199661254883 92.91299819946289 112.18100357055664 \
   > -center 2.9200000762939453 -1.5814990997314453 -3.010499954223633 
   > ```
   >
   > 
   
2. to run in gmx, specify T coupling groups:

   ```shell
   gmx make_ndx -f equilibrated.gro -o index.ndx
   > 1|13|14
   > 21|22|23
   > q
   ```

   > Protein_ATP_Mg    TIP3_SOD_CLA
   >
   > refer to
   >
   > ```shell
   > tc_grps    	= non-Water Water # Membrane-containing MD simulation
   > tc_grps    	= Protein_ligand_ion Other # normal system
   > compressed-x-grp or energygrps  = Protein MOL MN # list all main species
   > ```

3. get .top file

   ```tcl
   package require topotools
   # Load the structure into VMD.
   mol new system.psf
   mol addfile equilibrated.pdb
   # Pass along a list of parameters to generate structure.top, suitable for preparing gromacs simulations.
   topo writegmxtop structure.top [list par_all36m_prot.prm lig.prm par_all36_cgenff.prm toppar_water_ions_namd.str] 
   # par_all36_na.prm par_all35_ethers.prm par_all36_carb.prm par_all36_lipid_ljpme.prm]
   ```

   be sure to include `lig.prm` and the water_ions one!

   > don't include `param.prm ` because gmx never tolerate duplication a little bit
   >
   > ```
   > ERROR 50 [file structure.top, line 7884]:
   > Encountered a second block of parameters for dihedral type 9 for the same
   > atoms, with either different parameters and/or the first block has
   > multiple lines. This is not supported.
   > ```

   CHRAMM ff website also provides many .itp file for gmx

   > copy your folder downloaded from http://mackerell.umaryland.edu/charmm_ff.shtml to `~/gromacs-2021.5-gpu/share/gromacs/top` and you can add at the beginning of `.top` file:
   >
   > ```c
   > #include "charmm36-jul2021.ff/forcefield.itp"
   > ```

   > but we don't need that much, which causes hundreds of duplications again (for atomtype, just warnings).
   >
   > ```c
   > #include "charmm36-jul2021.ff/ffnonbonded.itp"
   > ```
   >
   > which really includes parameters for these ions. `ions.itp` only defines atoms.
   >
   > Put it before the first `[ atomtypes ]` in your `.top` file
   >
   > > I'm doing this because I forgot toppar_water_ions_namd.str before...

3. also the velocity in the last frame! (find how to load into gmx, .cpt?)

   ```tcl
   # from tutorial
   # read in vmd
   mol new ../common/system.psf 
   mol addfile rdrp-atp-equil.restart.vel type namdbin waitfor all
   
   set all [atomselect top all]
   set fil [open energy.dat w]
   foreach m [$all get mass] v [$all get {x y z}] {
   puts $fil [expr 0.5* $m * [vecdot $v $v]]
   }
   
   close $fil
   
   ```

   > converting binary file: you'd better load into vmd and save
   >
   > can't do it now, just set `gen_vel` to yes and `continuation` to no

3. make the .tpr file

   ```shell
   # This would be prepared for simulation using grompp to create a tpr file
   gmx grompp -f md.mdp -c equilibrated.gro -r equilibrated.gro \
   -p structure.top -n index.ndx -o simulation.tpr -maxwarn 400
   # not that many warnings
   # supress repeated param definition
   -t velocity.cpt 
   gmx mdrun -deffnm simulation -nb gpu
   ```
   
   > cannot resolve the problem of duplicated dihedral angles...





## Clustering Anaylsis

preparation

```shell
catdcd -o rdrp-atp-prod-all.dcd rdrp-atp-prod*dcd
```



### Clustering

#### in gmx

- https://www.ks.uiuc.edu/Research/namd/mailing_list/namd-l.2011-2012/0654.htmlanalyze .dcd in gmx
- http://www.ks.uiuc.edu/Development/MDTools/catdcd/ catdcd: dcd I/O basics. failed
- [Using GROMACS force distribution analysis (FDA) tool with NAMD trajectories](9https://hits-mbm.github.io/guides/namd-fda.html) a good reference! do as him!

##### prepare

1. make the initial structure, topology file, as did in [Run in Gromacs](#Run-in-Gromacs). We need `.tpr` or `.gro` for option `-s`

   > The .pdb contains structural parameters (charge?) like the .tpr file? not enough in `mdconvert` but ok for `gmx rms`?

2. convert the trajectory file

   1. mdconvert

      ```shell
      # convert trajectory file
      conda activate AmberTools21 # MDtraj
      f=rdrp-atp-prod
      mdconvert -o ${f}.xtc -t equilibrated.gro ${f}.dcd # normal xtc
      gmx trjconv -f ${f}.xtc -o ${f}_nj.xtc -pbc nojump # movie, water not go to infinity?
      ```

      > if simply use `.pdb`, gmx reports errors related to PBC box setting.
      >
      > mdconvert can make .trr too, but it's the same size as .xtc (also the .dcd)...
      >
      > if you really need velocities (`.trr`), you should use vmd

   2. we may also use vmd to do that. the result is just the same

      ```shell
      f=rdrp-atp-prod
      vmd ../common/system.psf ${f}.dcd
      # cmd?
      # After VMD was opened select the molecule. Then click on `File` and select `Save Coordinates`. Now choose the trr format and save it.
      # but only works for short trajectories...
      ```

      cmd

      ```shell
      f=rdrp-remtp-prod
      # /usr/local/lib/vmd/plugins/LINUXAMD64/bin/catdcd5.2/
      catdcd -o ${f}.trr -otype trr -i equilibrated.gro -dcd ${f}.dcd
      gmx trjconv -f ${f}.trr -o ${f}_nj.xtc -pbc nojump
      ```

      catdcd is used outside VMD! a bit slow...

   3. maybe also mda

   > problem: Masses were requested, but for some atom(s) masses could not be found in the database. Use a tpr file as input, if possible, or add these atoms to the mass database.
   >
   > solution: use .tpr instead of .gro for `-s`

3. optional: watch movie (don't for the 300-ns one! it eats all memory...)

   > ```shell
   > echo 0 | gmx trjconv -s simulation.tpr -n index.ndx -f ${f}.trr -pbc mol -o ${f}_view.xtc -b 2.95 -e 3.00 -tu ns
   > # strange! 295ns~300ns
   > # pymol
   > load equilibrated.gro, final
   > load rdrp-remtp-prod_view.xtc, final
   > load equilibrated.gro
   > load rdrp-remtp-prod_smaller.xtc, final
   > # vmd
   > menu animate on
   > mol load psf ../common/system.psf pdb ../common/equilibrated.pdb
   > animate read dcd rdrp-atp-prod.dcd
   > ```
   >
   > view with `pro-lig.pdb` (converted from equilibrated.gro), no 1st frame problem (not much shift)

4. general checking

   ```shell
   # choose 4 backbone
   echo "4\n 4" | gmx rms -s simulation.tpr -f ${f}_nj.xtc -tu ns -o rmsd_bb.xvg
   xmgrace rmsd_bb.xvg
   echo 4 | gmx rmsf -s simulation.tpr -f ${f}_nj.xtc -o rmsf_bb.xvg -res
   xmgrace rmsf_bb.xvg
   ```

   > problem:
   >
   > > Can not find mass in database for atom MG in residue 921 MG
   > >
   > > Masses and atomic (Van der Waals) radii will be guessed based on residue and atom names
   >
   > just change 'MG' to 'Mg' in .pdb, solved. Do this only when gmx is needed...

##### clustering

We performed clustering analysis based on the RMSD of NTPs during the simulations, with SARS-COV-2 NSP12 aligned. 

> reference
>
> - [gmx cluster????](https://www.jianshu.com/p/a0c15620702e)
>
> - [MD tutorial: choose groups](http://www.mdtutorials.com/gmx/complex/09_analysis.html); [sob comments](http://bbs.keinsci.com/thread-23116-1-1.html)
>
>   Execute the rms module, choosing "Backbone" for least-squares fitting and "JZ4_Heavy" for the RMSD calculation. By doing so, the overall rotation and translation of the protein is removed via fitting and the RMSD reported is how much the JZ4 position has varied relative to the protein, which is a good indicator of how well the binding pose was preserved during the simulation.

1. aligned trajectory

   https://cbiores.com/tips-and-tricks/

   ```shell
   echo 4 0 | gmx trjconv -s simulation.tpr -n index.ndx -f ${f}_nj.xtc -fit rot+trans -o ${f}_fit.xtc
   ```

   > is that necessary?
   >
   > `Select group for least squares fit`: I think it's **what to align**. backbone
   >
   > `Select group for output`: **what to keep** in the _fit.xtc. only our protein_atp_mg? it seems that TP will attract NA+ ions, maybe water? just keep all
   
2. make rmsd matrix first

   ```shell
   f=rdrp-atp-prod # f=rdrp-remtp-prod
   echo 4 19 | gmx rms -s simulation.tpr -n index.ndx -f ${f}_fit.xtc -m rmsd-lig.xpm -tu ns #-f2 ${f}_fit.xtc
   gmx xpm2ps -f rmsd-lig.xpm -o rmsd-lig.eps -rainbow blue
   # a matrix, not readable data encoding...
   # ps2pdf rmsd-matrix.eps
   ```

   > `Select group for RMSD calculation`: ATP! the output
   >
   > ```shell
   > xmgrace rmsd.xvg
   > ```

   gmx的分析只能一个processor，贼慢，太离谱！能否换软件。。？

2. clustering

   ```shell
   rm \#*\#
   # run
   echo 4 24 | gmx cluster -s ../simulation.tpr -n ../index.ndx -f ../${f}_fit.xtc -dm ../rmsd-lig.xpm \
   -dist rmsd-distribution.xvg -o clusters.xpm -sz cluster-sizes.xvg -tr cluster-transitions.xpm \
   -ntr cluster-transitions.xvg -clid cluster-id-over-time.xvg -cl clusters.pdb \
   -cutoff 0.2 -method gromos
   # tutorial: 0.2, gromos
   ```
   
   > `lsq`: still backbone
   >
   > `output`: our protein_atp_mg complex
   

questions

> - why `echo 4 19 | ` all the time?
>
> - 1st frame away from others if you view _fit! also in nojump! not a problem for npt.gro! but ok in vmd without loading .gro...
>
>   answer: just ignore that! you are just viewing! if you convert the .xtc to .pdb files, only 300 frames! 
>
>   maybe caused by: namd running is different from gmx?

##### analysis

1. basics

   > Two output files are always written:
   >
   > - -o writes the RMSD values in the upper left half of the matrix and a graphical depiction of the clusters **in the lower right half** When -minstruct = 1 the graphical depiction is black when two structures are in the same cluster. When -minstruct > 1 different colors will be used for each cluster.
   > - -g writes information on the options used and a detailed list of all clusters and their members. (`.log`?)
   >
   > Additionally, a number of optional output files can be written:
   >
   > - -dist writes the RMSD distribution.
   > - -ev writes the eigenvectors of the RMSD matrix diagonalization.
   > - -sz writes the cluster sizes.
   > - -tr writes a matrix of the number transitions between cluster pairs.
   > - -ntr writes the total number of transitions to or from each cluster.
   > - -clid writes the cluster number as a function of time.
   > - -clndx writes the frame numbers corresponding to the clusters to the specified index file to be read into trjconv.
   > - -cl writes average (with option -av) or central structure of each cluster or writes numbered files with cluster members for a selected set of clusters (with option -wcl, depends on -nst and -rmsmin). The center of a cluster is the structure with the smallest average RMSD from all other structures of the cluster.

   ```shell
   cluster-id-over-time.xvg
   cluster-sizes.xvg
   cluster-transitions.xvg
   rmsd-distribution.xvg
   # eg
   xmgrace cluster-id-over-time.xvg
   gmx xpm2ps -f clusters.xpm -o clusters.eps -rainbow blue # blue: not the same cluster
   # gmx xpm2ps -f cluster-transitions.xpm -o cluster-transitions.eps
   ```

2. structural

   ```shell
   
      # pymol
   split_states cluster
   ```
   
   ???cluster???????frame?????rmsd?

##### other

1. trjcat? no!

   ```shell
   f=rdrp-atp-prod
   gmx trjcat -f ${f}.dcd -o ${f}.xtc
   gmx trjcat -f *.dcd *.dcd *.dcd -o trajectory.xtc # concatenate multiple files
   ```

2. failed [catdcd](http://www.ks.uiuc.edu/Development/MDTools/catdcd/)

   ```tcl
   set f rdrp-atp-prod
   catdcd -o ${f}.trr -otype trr -i equilibrated.pdb -dcd ${f}.dcd
   ```

4. 



#### in VMD



### Analysis of binding mode?

Here not that much is required...



# Stage 2 Protocol: FEP

## FEP (relative) building systems

### Fundamentals

NAMD supports such a traditional dual-topology alchemical setup, which may be applied to perform both absolute and relative FEP calculation

VMD does not yet provide a hybrid topology setup tool, and CHARMM-GUI is testing a beta version (that is not yet available online) to automatically generate all input files for NAMD. For the time being, users can utilize an alternative hybrid structure preparation tool, such as FESetup or AmberTools, and then manually convert the generated CHARMM-formatted input files into a format that can be read by NAMD.

readings

- https://www.cresset-group.com/about/news/fep-drug-discovery-toolbox/
  - FEP要求尽量稳定不动，这是不同于MD的
  - FEP要求尽量不要改变电荷数

- https://www.ks.uiuc.edu/Research/namd/2.14/ug/node63.html

```
two modes
- absolute
- relative
尝试列表：
- charmm-gui
- 网络tutorial，Python，pmx
- FEsetup
- BFEE2
- gmx，absolute
- AMberTools
```



ligand: you just need to modify atoms in GaussView, so that no change is needed for Mg, and the position of ligands remains unchanged. (unlike aligning structures...) go to CHARMM-GUI for both ligands!

we start from (equilibrated?) .pdb after MD. But finally should use those from clustering, and compare with the original!

> VMD molecule editor: http://www.ks.uiuc.edu/Research/vmd/plugins/molefacture/, conjugation with ffTk, paratool, CGenFF server, etc. AutoPSF?

### Primary protocol

#### A brief flow

- get stable complex structure, modify the ligand properly to obtain the other one
- get `.mol2`, `.rtf` and `.prm` (in one single `.str`) files from [CGenFF](https://cgenff.umaryland.edu/) or MolFacture in VMD 
  - no AutoPSF required, retaining coordinates and names (same for mtp and remtp)

- run the make_hybrid code to obtain the hybrid `.rtf` and `.pdb` file (with atoms renamed and B value assigned)
  - did not run very well. Now: just stick to the paper: the CH2 also considered as "common atoms". we only add a neutral hydrogen atom
- run `merge-fep.tcl` to build the ligand and complex with VMD. do use `top_all36_cgenff.rtf`!
- solvate and ionize them. a new version of `sol-ion-fep.tcl` is created to make sure the systems have the same size (ligand more atoms?)
- run the 2nd script `edit_FEP.py` to edit the beta field in the .pdb file
- run the 3rd script `edit_psf.py` to remove unparametrized angles/dihedrals, etc.
- normal measurement, equilibration and run, but not necessary to gradually heat up (but if you like...)

principles

- always make sure the initial and final ligands are overlapping (same coordinates). 

  be careful of ligandrm.pdb from GUI, which is slightly changed...



> old version for ligand building: use CHARMM-GUI
>
> - parametrize both ligands in CHARMM-GUI
>
>   - to get: `.rtf` file. 
>
> - same ligands, get properly renumbered .pdb files from CHARMM-GUI PDB reader
>
>   - to get: `.pdb` file
>
>   > PDB reader itself can also give .rtf? but need the .mol2 file...
>
>   if .mol2 file is needed, use drawing_3D!

Comment by tutors:

Also, the physics of a common molecule is usually unimportant, because  it usually only provides us a baseline of energy. There have been papers using completely unrealistic molecules such as dummy benzenes  (geometrically looking like benzene but no partial charges and sometimes even 0 epsilon values for VDW). 

With that said, there is also a scenario when the common molecule is  important - which is when you actually have the experimental data for  this common molecule. But I don't think we have it.

#### Basic thoughts of make_hybrid script

- data structure
  - The molecule is stored in a `Ligand object`. The core is `atomdict`. the key is the original atom name, the value contains all info, like FF atom type, coordinate (read in the .rtf and .pdb file together).
  - All other properties are stored by tuples of atom **keys** (atom names initially, +tag in hybrid) (and other data), so that when we change the atom name to write in hybrid molecules, we just index through the dict (by GetXXX functions)
- flow
  - read files
  - common structure: use RDkit package, get it from two .pdb files, find the corresponding atom indices in each molecule
  - verification: position and charge nearly the same, or removed from common
  - modification: add A, B to atom name. C for common atoms
  - combination: a `Ligand` object 'hybrid'
    - atomdict, key is name+tag, same value, count common atoms point to the same `Atom` object
    - thus we can use **set** operations to merge bonds, etc.
  - output: just write formatted strings into .rtf and .pdb files

> Exploration
>
> 如果编码成图，这个问题叫做：最大公共子图问题
>
> https://drugai.blog.csdn.net/article/details/102626236
>
> https://blog.csdn.net/u012325865/article/details/111478970
>
> - 搜这个子图问题
>   - `ismags.largest_common_subgraph()` 暂时失败
> - RDkit：drugAI的code
> - 基于group自己想
>   - 还是线性思维，能扩展到其他TP
> - 线性思维一步步
>   - 对于mtp其实够了
>
> 图同构（英語：graph isomorphism）描述的是图论中，两个图之间的完全等价关系。在图论的观点下，两个同构的图被当作同一个图来研究。
> https://networkx.org/documentation/stable/_modules/networkx/algorithms/isomorphism/ismags.html
>
> CHARMM-GUI的code，收藏了
>
> - openMM能读写，可能转不了？读完以后能干啥？
> - RDkit能找子结构，但处理不了文件？
>
> 用rdkit查找子结构是有效的，并且不需要图的数据结构，只要能返回去查找到atom name。并且rdkit可辅助阅读pdb中的信息（非必需
>
> > PH:画出来是P+？
>
> 连在同一个磷上的氧能不能对上看来是随机的
>
> 我们用remtp的骨架，HGA3+CG321就没参数
>
> 
>
> 写文件：
>
> 自己写？名字问题？type问题？
>
> 文件：改一下原.rtf里面所有atom name，再读进来合并？
>
> prm文件也得改？MD测试一下
>
> 写的时候，写出group？
>
> IC的+-，*都什么意思？
>
> 问题
>
> - charge可合并？差多大。如P1，O1
> - type不同？如C，差太大，删掉
> - 坐标微调了，优化了？原来的pdb原子renumber了。既然要用公共的，就排个序。。能对上？是否影响parameterization？跟kevin check一下
>   - 带ligand的都移动过了。upload.crd都好但没有氢
>   - rdkit，读取formatted文件，手动renumber，分配坐标？还没好
>   - 另外的renumber软件
>     - **CHARMM-GUI 的PDB reder，同样的流程，drawing3d。**
>     - 最好找点别的开源？
>   - 没edit的不用了？
>   - schrondinger可以做。。
> - prm文件不用改，因为用的是力场里的atom type！但是要合并一下？复制粘贴就可以，但是mtp啥都没有，就不用了
>
> reference
>
> - https://www.rdkit.org/docs/GettingStartedInPython.html
> - https://www.rdkit.org/docs/Cookbook
> - https://www.rdkit.org/docs/source/rdkit.Chem.html
> - https://www.rdkit.org/docs/source/rdkit.Chem.rdchem.html#rdkit.Chem.rdchem.Mol
> - https://www.rdkit.org/docs/source/rdkit.Chem.rdchem.html#rdkit.Chem.rdchem.Atom
> - https://www.rdkit.org/docs/source/rdkit.Chem.rdFMCS.html?highlight=rdkit%20chem%20rdfmcs%20findmcs#rdkit.Chem.rdFMCS.FindMCS
> - https://www.rdkit.org/docs/Cookbook.html?highlight=rdkit%20chem%20rdfmcs%20findmcs
>
> Rdkit issues
>
> 1. import rdkit 出现 ImportError: DLL load failed: 找不到指定的模块
>
>    解决：版本不对，重装
>
> 2. MolFromMol2File(…)不推荐，容易出bug，pdb还行



#### Rescuing the parameters: extensive trials

##### about fep beta

solution: edit .pdb files. 因为generate psf和mol and save molecule是不同的过程，所以前者模式下无法select分子，也就无法搞……后者只能是load merge后的，beta值又混乱了，所以还不如重改

> unless I can play with a tcl list...

I originally want to build the ligand and complex with `make_merged.sh` to keep the beta field. also load into pymol etc. to renumber atoms. This makes me keep the beta values after merging. But they get lost after solvation...

So I wrote a script `edit_fep.py` that read from hybrid and **merged** files, search for corresponding atoms to edit the beta field.

> note: it seems to work if we change atom name 'TIP3' into 'TIP', because indexing just by atom number?
>
> We'd better keep everything in the future? though ugly

##### parameters

We also get .prm file from CHARMM-GUI. manually merge the .prm file for later, because it only uses atom types in the force field, not atom names. But it clearly lacks some parameters (like angle, dihedral), because the rtf file contains new atom types (CG331, HGA3) that other .prm file can't parametrize, too. Errors are about them. However, normal simulations did not report error. 

Because: these are new "hybrid" angles forming between the ligands.

> 无语了，写中文
>
> - 讨厌的是，新生成的键还需要提供参数，这就意味着只做两个ligand的charmm-gui是不够的
> - 我找遍了各种prm文件，gui生成的、charmm ff文件包的、vmd自带的、tutorial的，都没有这些参数。且有相关原子的大多都是`par_all36_cgenff.prm `
> - 离谱的是，有几个ATP环上的参数，普通MD也找不到，但普通MD就可以跑
> - 手动添加参数到prm文件，就可以运行。必须添加所有缺的，似乎说明参数完整才能跑
>
> 结论：直接用那个psf的话，没有那几个dihedral，不需要参数，VMD+rtf好心地全都加上了
>
> ```
> Warning: UNABLE TO FIND ANGLE PARAMETERS FOR CG321 OG303 CG331 (ATOMS 6 7 18)
> Warning: ALCHEMY MODULE WILL REMOVE ANGLE OR RAISE ERROR
> Warning: UNABLE TO FIND DIHEDRAL PARAMETERS FOR HGA3 CG331 OG303 CG321 (ATOMS 1 6 7 18)
> Warning: ALCHEMY MODULE WILL REMOVE DIHEDRAL OR RAISE ERROR
> Warning: UNABLE TO FIND DIHEDRAL PARAMETERS FOR HGA3 CG331 OG303 CG321 (ATOMS 2 6 7 18)
> Warning: ALCHEMY MODULE WILL REMOVE DIHEDRAL OR RAISE ERROR
> Warning: UNABLE TO FIND DIHEDRAL PARAMETERS FOR CG331 OG303 CG321 HGA2 (ATOMS 6 7 18 47)
> Warning: ALCHEMY MODULE WILL REMOVE DIHEDRAL OR RAISE ERROR
> Warning: UNABLE TO FIND DIHEDRAL PARAMETERS FOR CG331 OG303 CG321 HGA2 (ATOMS 6 7 18 46)
> Warning: ALCHEMY MODULE WILL REMOVE DIHEDRAL OR RAISE ERROR
> Warning: UNABLE TO FIND DIHEDRAL PARAMETERS FOR CG331 OG303 CG321 CG3C51 (ATOMS 6 7 18 20)
> Warning: ALCHEMY MODULE WILL REMOVE DIHEDRAL OR RAISE ERROR
> Warning: UNABLE TO FIND DIHEDRAL PARAMETERS FOR HGA3 CG331 OG303 CG321 (ATOMS 17 6 7 18)
> Warning: ALCHEMY MODULE WILL REMOVE DIHEDRAL OR RAISE ERROR
> Warning: UNABLE TO FIND DIHEDRAL PARAMETERS FOR OG3C51 CG3C50 CG1N1 NG1T1 (ATOMS 22 29 37 32)
> Warning: ALCHEMY MODULE WILL REMOVE DIHEDRAL OR RAISE ERROR
> Warning: UNABLE TO FIND DIHEDRAL PARAMETERS FOR CG3C51 CG3C50 CG1N1 NG1T1 (ATOMS 26 29 37 32)
> Warning: ALCHEMY MODULE WILL REMOVE DIHEDRAL OR RAISE ERROR
> Warning: UNABLE TO FIND DIHEDRAL PARAMETERS FOR NG2R51 CG3C50 CG1N1 NG1T1 (ATOMS 30 29 37 32)
> Warning: ALCHEMY MODULE WILL REMOVE DIHEDRAL OR RAISE ERROR
> ```
>
> search command drafts
>
> ```shell
> grep 'CG1N1' ./* | grep 'X'
> grep  NG2R51 ./* | grep CG3C50
> ```
>
> 



Editing .psf files: read from the log file reporting the lacking parameters

- you must **remove** the atom numbers 
- incomplete line is fine (no re-organizing)
- must **change** the total number of angles, ...

But was suggested not remove the dihedrals...

solution1: include as many as parameter files, ~50 files

note: use those for namd (like from FEP calculator), or containing charmm scripts

but still no luck

我觉得应该就是氰基没这些dihedral吧。Cgenff、VMD的force field toolkit都提示没有这个参数，各种力场也都没这个参数。只有VMD load rtf之时整出来这些dihedral

### hand-crafting the hybrid molecule

#### flow

1. build a proper remtp structure and get topology/parameters
2. open in GaussView, add a free hydrogen atom, press ctrl+shift to drag that atom with your mouse, until it's almost "colinear" with the next carbon. adjust the C-H bond length. save the coordinates.
3. but don't use that .pdb file because GV may rearrange the atoms. MANUALLY edit the file by copying from saved coordinates and add residue name etc.
4. edit .rtf file: just add "HA" with the same atom type as the other two hydrogens but its charge is 0. add a bond. 
4. edit .pdb file: assign beta values, and it's done

if you don't want to manually assign beta values, it's a bit more complicated to start from Python-created hybrid molecule.

> 1.H10B变为H2C（pdb，beta），H10A删去（pdb），改bond，type为HGA2
> 2.H11A变为HA（pdb），改bond，改电荷！
> 3.删去C1A，C1B改为C1C（pdb），bond的C1A改成C1C，但删去一个O1C重复的

#### check

is your edit right? `check_hybrid.py`, etc.

it reads in .rtf file, and you can see the consistency of atom section and bond section; draw the network to checks bonds (overall structure)

open with Pymol or VMD, to check the pdb structure, atom names, and BETA values!

you can also compare with/transfer param values in the paper

#### charge

check if the ligand is neutral

```tcl
f=remtp
f=hybrid
vmd $f.psf -pdb $f.pdb
set sel [atomselect top "resname HYB"]
set c [$sel get charge]
eval vecadd $c
```

it's hard to filter with beta in vmd, so I write some Python scripts to check the charge of the initial (excluding +1 atoms) and final state.

It's better to make all parts both neutral. add H paradigm works ok but two-carbon paradigm is not that fine?

> 双碳paradigm：总的-3.903，+1是4.00，-1是-3.999
> transfer的hybrid，全部：-4.0
> 那个normal build,-1是-3.996，+1和总的是-4

> transfer：应该是把transfer写出的东西粘到str里面然后正常合并
>
> 有几个还是和文献值差距有点大

### QM-optimized parameters

Depending on CHARMM-GUI, always not so accurate...the fatal error is something like the cyano group, with no proper parameters in CGenFF...

为什么.prm files这么多“from xxx”呢？都是在cgenff里面找的近似的，所以才有penalty。这样就感觉所有小分子应该Gaussian。但是如果从“反正都不准”的角度看……



### Deprecated  methods

#### draft cmd

```tcl
package require psfgen
resetpsf
topology hybrid.rtf
topology top_all36_cgenff.rtf
segment HETA {pdb hybrid.pdb}
coordpdb hybrid.pdb HETA
writepdb hybrid-p.pdb
writepsf hybrid-p.psf
psfcontext reset

mol load psf hybrid-p.psf 
```

#### Build with VMD

> > try: equilibrated remTP
>
> > files: protein, MG, two ligands from gui: pdb, psf, rtf, prm
>
> #### Relative
>
> > you may build the .fep first...
>
> 1. build the system
>
>    process the ligand as before, and change the name of the ligand:
>
>    ```shell
>    grep -rl "LIG " remtp-rm.pdb remtp-rm.psf | xargs sed -i s/"LIG"/"END"/g
>    grep -rl "LIG " mtp-rm.pdb mtp-rm.psf | xargs sed -i s/"LIG"/"INI"/g
>    ```
> 
>    then build both ligand and complex
>
>    ```shell
>    vmd -dispdev text -e merge-fep.tcl
>    vmd -dispdev text -e sol-ion-fep.tcl
>    ```
> 
>    > a small problem: all is ATOM, no HETATM
>
> 2. build the .fep
>
>    you can either copy one file as the fep indicator or just modify your .pdb file. I'll choose the former here
>
>    change all "END" lines, 63-66 columns to ' 1.00'; "INI": '-1.00' for your two .pdb file
>
>    ```shell
>    list=(ligand complex)
>    for f in ${list[*]}; do
>    cp ${f}.pdb ${f}.fep
>    sed -i "s/1.00  0.00      END/1.00  1.00      END/g" ${f}.fep
>    sed -i "s/1.00  0.00      INI/1.00 -1.00      INI/g" ${f}.fep
>    done
>    # find the long pattern
>    ```
> 
>    watch
>
>    ```shell
>    vmd complex.psf -pdb complex.fep
>    vmd ligand.psf -pdb ligand.fep
>    ```
> 
>    > select ligand by
>  >
>   >> ```
>   >> resname END
>   >> ```
>   >>
>   >> and view with coloring method 'Beta'
> 
> 3. build the dual topology file
>
> 
>
> 
>
> 
>
> 3. 
>
> 3. run the simulation
>
> 3. 
>
> 
>> failed
>
> > ```shell
>> awk -F " " '{if ($18==END) $62= 1.00}' complex.pdb > complex.fep
> > grep "END" -rl complex.fep | xargs sed -i "s/ 0.00     / 1.00     /g"
> > ```
> >
> > 
> >
> > syntax
> >
> > ```shell
> > alchemify <input PSF> <output PSF> <FEPfile> [FEP column]
> > ```
> >
> > so here
> >
> > ```shell
> > # vmd
> > alchemify complex.psf complex-mtp2remtp.psf complex.fep B
> > ```
> >
> > rarely used now
> >
> > 
> 
> #### Absolute
>
> easier, build as before until making FEP
>

#### CHARMM-GUI
>
> [video demo](https://www.charmm-gui.org/?doc=demo&id=fec&lesson=1), [bilibili version](https://www.bilibili.com/video/BV153411s7kF)
>
> > TIP1: https://charmm-gui.org/?doc=input/retriever  This page can be used to recover a job, if you *did not* save a bookmark link, but you *do* remember the Job ID
>
> > - jobid=4735806442, absolute, cgenff v1.0, using ligandrm.pdb to build, upload other ligand's drawing3D.mol2
> > - JOB ID: 4739580626, relative, v2.5, .mol2, .mol2
> >
> > TIP2: do download every .tgz from Windows......
>
> #### steps
>
>  use default settings unless otherwise specified
>
> 1. build the complex (including Mg is fine)
> 2. upload your complex file (containing the starting ligand)
> 3. choose chain (all)
> 4. build topology, choosing a file for the ligand
> 5. solvate. choose box size and ion conc
> 6. Generate grid information for PME FFT automatically (default)
> 7. select Ligand Molecule for Free Energy Calculation
> 8. PBC (default)
> 9. upload ligand
>
> 10. select program, force field, **check ligand**; ion for the ligand, distance from edge, 310K, etc.
> 11. Relative: clustering, choose molecule pairs
> 12. finished, <font color=red>CHECK YOUR STRUCTURE!!</font>
>
> > note: the unit of edge distance is nm, not Å .....
>
> #### note on files
>
> folder: `basic` (from simulation), `ligand-charmm` (from GUI)
>
> ##### What to use when building? 
>
> normal .pdb failed, .sdf failed(it's not our ligand, it's something strange...), obabel converted also failed to pass the <u>topology making</u>. otherwise if you use the ligand files from RCSB, then [this](https://www.charmm-gui.org/?doc=issues) (atom order?)
>
> > original: cannot input for force field; ligandrm.pdb: a little problem in text format.
>
> >!TIP
>
> >may use `ligandrm.pdb` or `drawing3D.mol2`,  etc. when building. They don't align? just moved somewhat.
> >
> >When choosing a structural file (instead of using RCSB .pdb (but maybe that only provides topology?)) for the ligand's topology, use`drawing3D.mol2` 
>
> ##### What to use when uploading ligands?
>
> > in the case of Absolute, mtp
>
> After *solvation*, our system is moved. Also, drawing3D.mol2 moves away. so how to align?
>
> It seems that using drawing_3D.mol2 works fine here, if you align the structure, it is a little changed (ligandrm.pdb changes more slightly from the original file)....so do the alignment and check in pymol to see if i's ok with Mg<sup>2+</sup>...usually it's fine (drawing_3D.mol2 is a little strange because the TP huddle up?). 
>
> But the final structure turns out to be so similar to ligandrm.pdb?? I didn't use that. EM is performed? (maybe we can upload a converted one from ligandrm.pdb?)
>
> But for remtp, initial = ligandrm != drawing3D != final (PO4 the same??)
>
> > In the case of Relative, remtp
>
> cannot upload converted ligandrm?
>
>
> >!TIP
>
> >Conclusion: because the processing moves the ligands, it's fine to use either ligandrm or drawing_3D...
> >
> >you may check the structure after equilibration
>
> ##### force field check
>
> However, the original ligand failed again. when using ligandrm.pdb, etc., it failed at cgenff (v2.5) force field check. lone pair? v1.0 is fine
>
> > Current FEP doesn't allow lonepair. Please select CGenFF v1.0 to avoid lonepair generation.
>
> Actually the original ligand always fails. so **upload again** (without checking the option) and v2.5 works fine
>
> #### notes on modes
>
> uploading ligands
>
> - supports multiple ligands in one .sdf or ,mol2 file
> - it's better to dock them first
> - if not, or you are drawing ligands, the GUI automatically positions the ligands (may be not accurate)
>
> both Relative or Absolute apply. A little difference for multiple ligands:
>
> - the latter designs a `Closed minimal perturbation path based on the clustering` 
>
>   - or just `Radial shape of perturbation path from the first one`
>
> - when uploading ligands
>
>   - Absolute: Use this option only when the ligands are already **docked**.
>  - Relative: Use this option only when the scaffold coordinate of a pair of ligands are **identical.**
>
>   Absolute just cares 'in position', Relative should make sure 'same position'.
>
> - result
>
>   - Absolute: one folder for one ligand
>  - Relative: one for a pair of FEP molecule
>
>
> to prepare multiple ligands. support multiple files and one file containing ligands.
>
> #### result
>
> - where: go to `namd`, 1,2,... (2-3, ...) means different ligands
> - FEP: all of ligand INI disappear, all END appear, no common searching...
>
> 
>
> 
>
#### FEPrepare
>
> - https://feprepare.vi-seem.eu/indexlpg.php  a server
>  - https://www.zhihu.com/zvideo/1356250979265093632  https://www.zhihu.com/people/qutesun/zvideos
>   - https://feprepare.vi-seem.eu/Manual.pdf
> - http://zarbi.chem.yale.edu/ligpargen bad charge settings!
>   - [principles, and guide of ligpargen](https://pergamos.lib.uoa.gr/uoa/dl/frontend/file/lib/default/data/2779350/theFile)
>
> cannot control force field? we have defined .psf and .rtf already? still using OPLS?
>
> May produce a hybrid ligand, but failed...
>
> ```
> Making biomolecule rdrp...
> ERROR: rdrp failed: Leap did not create the topology and/or coordinate file(s): vacuum.parm7, vacuum.rst7
> Making ligand mtp...
> ERROR: mtp failed: SCF has not converged
> Making ligand remtp...
> ERROR: remtp failed: SCF has not converged
> ERROR: The following proteins have failed:
>  rdrp
> ERROR: The following ligands have failed:
>  mtp
> ```
>
#### From Amber+Gaussian
>
> Build your molecule with proper protonation state and then go with Gaussian protocol, get Amber files and convert to NAMD files? But already used GAFF
>
> ```shell
> conda activate AmberTools21
> f=remtp
> antechamber -i ${f}.pdb -fi pdb -o ${f}.gjf -fo gcrt -pf y \
> -gm "%mem=4096MB" -gn "%nproc=4" -ch ${f} -nc 0 \
> -gk "#B3LYP/6-31G* em=GD3BJ scrf=solvent=water SCF=tight \
> iop(6/33=2,6/42=6,6/50=1) pop=CHELPG" -ge ${f}_resp.gesp -gv 1 
> g16 ${f}.gjf
> antechamber -i ${f}_resp.gesp -fi gesp -o ${f}.mol2 -fo mol2 -pf y -c resp
> parmchk2 -i ${f}.mol2 -f mol2 -o ${f}.frcmod
> 
> tleap
> source leaprc.gaff2  # can't find cgenff!
> loadamberparams mtp.frcmod
> lig1 = loadmol2 mtp.mol2
> check lig
> saveamberparm lig lig.prmtop lig.inpcrd
> quit
> 
> ```
>
#### Paratool in VMD

>
> https://www.ks.uiuc.edu/Research/vmd/mailing_list/vmd-l/32793.html said paratool has long been replaced by ffTk, yet the document is worth reading.
>
> https://www.ks.uiuc.edu/Research/vmd/plugins/paratool/usersguide.html
>
> https://www.ks.uiuc.edu/Research/vmd/plugins/paratool/general_scheme.html
>
> To start, type `paratool` in Tkconsole. Or go through the AutoPSF protocol
>
> Load the molecule from GUI (.psf + .pdb)
>
> Assign parameters
>
> 
>
#### Taking another set of starting coordinates

>
> no need to run CHARMM-GUI ligand builder again, because we assume that only coordinates are changed...after testing, they really do.
>
> and starting from making the hybrid, go through everything
>
> 1. get new pdb files
>
>    ```tcl
>    # vmd
>    mol load psf system.psf
>    mol addfile rdrp-remtp-prod.coor
>    set pro [atomselect top protein]
>    $pro writepdb rdrp.pdb
>    set mg [atomselect top "resname MG"]
>    $mg writepdb mg1.pdb
>    set remtp [atomselect top "resname LIG"]
>    $remtp writepdb remtp1.pdb
>    ```
>
>    and modify into your mtp.pdb...
>
> 2. but we'd better CHARMM-GUI





### Building in Gromacs

[MD tutorial](http://www.mdtutorials.com/gmx/free_energy/08_advanced.html)

https://manual.gromacs.org/current/reference-manual/special/free-energy-implementation.html  FEP

and another pdf tutorial [Free Energy Calculation with GROMACS: Solvation free energy](http://www.gromacs.org/@api/deki/files/262/=gromacs-free-energy-tutorial.pdf)

> 注意NAMD和Gromacs做fep的逻辑稍微有点不一样
>
> NAMD是dual-topology。代表任何改变了电荷的原子都需要列一个新原子，该原子会在state B出现，原本的原子会在state A消失
>
> Gromacs是single-topology。改变原子的电荷只需要在同一个原子身上列明state A state B就可以了。但是遇到原本不存在的原子的话，gromacs就需要列一个pseudo atom，该原子在state A不存在，会在state B出现

> a set of series: (see manual also)
>
> https://manual.gromacs.org/current/reference-manual/algorithms/free-energy-calculations.html
>
> https://manual.gromacs.org/current/reference-manual/functions/free-energy-interactions.html#feia TI equations







> #### FESetup
>
> https://fesetup.readthedocs.io/en/latest/introduction.html is unreadable...
>
> [a tutorial](https://vileoy.uovie.com/blog/2020/01/07/free-energy-calculation-tutorial/) from [this original one](https://siremol.org/tutorials/somd/Binding_free_energy/FESetup.html)
>
> 
>
> FESetup for NAMD
>
> no tutorial, no option manual, only code...
>
> 
>
> #### PyAutoFEP
>
> https://github.com/luancarvalhomartins/PyAutoFEP
>
> Automated, Streamlined, and Accurate Absolute Binding Free-Energy Calculations
>
> 
>
> #### PMX
>
> [another tool: pmx](http://pmx.mpibpc.mpg.de/sardinia2018_tutorial2/index.html)
>
> http://pmx.mpibpc.mpg.de/webserver.html  can perform protein and DNA mutation
>
> 
>
> 
>
> https://github.com/drazen-petrov/SMArt
>
> #### BFEE2?
>
> https://github.com/fhh2626/BFEE2
>
> https://www.ks.uiuc.edu/Research/vmd/plugins/bfeestimator/
>
> ok for absolute BFE. only for ABFE
>
> 







## FEP running with NAMD

### Configurations

reference:

- FEP tutorial: equil, shift
- protein-ligand: only production
- Kevin: GPU

order: make lig-equil, modify into com-equil/lig-prod-forward, then into backward

#### ligand paramters

It's found that the aromatic ring cannot retain its planar structure, though in pymol hybrid.pdb still looks fine (though ligand.pdb Ar dotted bonds is gone). 因为后面对芳环只有参数的限制，程序不知道关于芳香键的标记

31 17 19 34: CG3C50 CG2R57 NG2RC0 CG2RC0 (purple)

31 17 36 18: CG3C50 CG2R57 CG2R51 CG2R51 (green)

34 19 24 32: CG2RC0 NG2RC0 NG2R62 CG2R64 (orange)

18 34 35 22: CG2R51 CG2RC0 CG2R64 NG2R62 (pink)

35 22 32 24: CG2R64 NG2R62 CG2R64 NG2R62 (blue)

![remtp-dihedral](https://gitee.com/gxf1212/notes/raw/master/MD/MD.assets/remtp-dihedral.jpg)

coplanar four atoms. there must be at least two common atoms to make two dihedrals coplanar

#### simualtion params

```tcl
timestep                1.0
dcdfreq                 10000		;# not too large!

# CONSTANT-T
langevin                on
langevinTemp            $temp
langevinDamping         10.0

# CONSTANT-P, not in tutorial
useGroupPressure        yes;           # is needed for rigid bonds (rigidBonds/SHAKE)
useFlexibleCell         no;            # yes for anisotropic system like membrane 
useConstantRatio        no;            # keeps the ratio of the unit cell in the x-y plane constant A=B
langevinPiston          on
langevinPistonTarget    1.01325
langevinPistonPeriod    100;          # not too large!
langevinPistonDecay     50;        	  # not too large!
langevinPistonTemp      $temp
StrainRate              0.0 0.0 0.0

# CUT-OFFS
switching                on
switchdist               8.0			# not too large!
cutoff                   9.0
pairlistdist            10.0
```



#### alch parameters

recommend

```shell
alchVdwLambdaEnd        1.0
alchElecLambdaStart     0.1		# so early
alchVdWShiftCoeff       6.0
alchOutFreq             1000 	# should be small
alchDecouple			off		# our ligand is charged..
```

#### production: backward

forward: starting from equilibration

```tcl
set  temp           310
set  outputbase     rdrp-mtp-remtp-ligand
set  outputName     $outputbase-prod-backward
# if you do not want to open this option, assign 0
set INPUTNAME       0                      ;# use the former outputName, for restarting a simulation


# restart or PBC
if { $INPUTNAME != 0 } {
    # restart
    BinVelocities $INPUTNAME.restart.vel.old
    BinCoordinates $INPUTNAME.restart.coor.old
    ExtendedSystem $INPUTNAME.restart.xsc.old
} else {
    # from foward. use the former outputName
    bincoordinates 	    $outputbase-prod-forward.coor
    binvelocities	    $outputbase-prod-forward.vel
    extendedSystem      $outputbase-prod-forward.xsc
}

set all {0.00 0.00001 0.0001 0.001 0.01 0.05 0.1 0.2 0.3 0.4 0.5 0.6 0.7 0.8 0.9 0.95 0.99 0.999 0.9999 0.99999 1.00}
# symmetric
runFEPlist [lreverse $all] $numSteps

```

we may run consecutively

```shell
nohup bash batch-fep.sh fep-com-prod 2&>error.log &
# batch-fep.sh
base=$1
namd3 +p1 +devices 0 $base-forward > $base-forward.log
namd3 +p1 +devices 0 $base-backward > $base-backward.log
```



#### restart production

it's amazing that FEP data will be appended to the original .fepout file!

```tcl
# add to fep.tcl
# starting: the number of window. grep 'Running FEP window' in .log file
proc runFEPlist_restart { lambdaList nSteps starting timestep } {
    # Keep track of window number
    global win
    if {![info exists win]} {
      set win starting
    }

    set starting2 [expr $starting + 1]

    set l1 [lindex $lambdaList $starting]
    foreach l2 [lrange $lambdaList $starting2 end] {
      print [format "Running FEP window %3s: Lambda1 %-6s Lambda2 %-6s \[dLambda %-6s\]"\
        $win $l1 $l2 [expr $l2 - $l1]]
      if { $l1 == $starting } {
        set firsttimestep $timestep
      } else {
        set firsttimestep 0
      }
      firsttimestep    $firsttimestep
      alchLambda       $l1
      alchLambda2      $l2
      run $nSteps

      set l1 $l2
      incr win
    }
}
```

then in conf file

```tcl
set  outputName     $outputbase-prod-forward-2
set  INPUTNAME      $outputbase-prod-forward 
runFEPlist_restart  $all $numSteps 0 14000
```

and you'll of course change your -backward file

```tcl
} else {
    # from foward. use the former outputName
    bincoordinates 	    $outputbase-prod-forward.coor
    binvelocities	    $outputbase-prod-forward.vel
    extendedSystem      $outputbase-prod-forward.xsc
}
```

#### add window

```shell
# only change forward config
} else {
    # from equil. use the former outputName
    temperature         $temp
    extendedSystem      from-prod.xsc
}

set all {0.1 0.15 0.2 0.25 0.3 0.35 0.4 0.45 0.5 0.55 0.6 0.65 0.7 0.75 0.8 0.85 0.9}
```







To check the progress:

````shell
grep "Running FEP window" ./*.log 
````



### work flow: cmd reference

> once we obtained the .psf and .pdb file of the system, no more hybrid topology file is needed

#### before equilibration

##### cmd reference

```shell
# after wget
# wget --user gxf1212 --password 123465acB% # no use
obabel *.mol2 -opdb -O *2.pdb -m
# run make_hybrid.py, after protein, hybrid.rtf/pdb, top files are ready
vmd -dispdev text -e merge-fep.tcl
vmd -dispdev text -e sol-ion-fep.tcl
# edit fep
script_dir=/home/moonlight/Desktop/work/projects/tools/Python-for-MD/make_hybrid_top
conda activate AmberTools21
python3 $script_dir/edit_FEP.py `pwd` 
python3 $script_dir/edit_PSF.py `pwd`
# common
vmd -dispdev text -e measure.tcl -args ligand # complex
# equil
namd3 +p6 fep-lig-equil > fep-lig-equil.log  # +auto-provision +idlepoll
# may go to analysis and check?
vmd ../common/system.psf -pdb ../common/system.pdb -dcd rdrp-atp-equil.dcd

```



##### check: is this run ok

structural integrity, when protein is always fine. you may check work report for more (random move, overlap)

- are strange connections formed
- is the ligand look like the initial state
- does it remain in its position in complex
- will it still be stable if time is longer?

```tcl
# vmd
mol load psf ../../common/ligand-fep.psf
mol addfile rdrp-mtp-remtp-ligand-equil.coor
set sel [atomselect top "segname HETA or resname MG"]
$sel writepdb equil-ligand.pdb
exit
# pymol *.pdb
```



> Taking another set of starting coordinates as the initial for production

Why don't we run equilibration for a while again?

but we've tried so many runs, see `try.xlsx`

```shell
grep "Running FEP window" ./*.log 
```

to check the progress



#### after production

##### cmd

```shell


# prod
namd3 +p1 +devices 0 fep-lig-prod-forward > fep-lig-prod-forward.log
```

##### Comment

If the integrity of nucleoside is fine, it may be fine because the disappearing atoms are supposed to stop interacting with the rest of the system and as a result, overlapping is expected. 

Just remember to **check ddG** at each step to see if there's a big jump from lambda=0.0001 to lambda=0. This usually indicates a more severe problem. 

Another thing is that if the nucleoside collapses on itself at lambda=0, it means that there're some serious issues with the parameters.

##### processing

extract some frames. 250 frames a window.



```shell
catdcd -o view.dcd -otype dcd -i equilibrated-ligand.gro -stride 125 rdrp-mtp-remtp-ligand-prod-forward.dcd
# failed in re
```



```tcl
mol load psf ../../common/ligand.psf
mol addfile rdrp-mtp-remtp-ligand-prod-forward.dcd
for {set x 0} {$x <= } {incr x} {
	set sel [atomselect top "resname HYB" frame [expr $x * 250]]
}

# atomselect top "within 5 of resname HYB" frame [expr $x * 250]
```



### debug and problems

the history

- ligand parameterization (C#N dihedral)
- ligand building (common atom, params)
- ligand huddling up (simulation parameter)
- ligand bad conformation

#### tests

try-4.21.xlsx

> c: complex
>
> (piston)表示100, 50的参数

现在要验证一个用我参数的

先调好最好的配置，然后用在normal系统上吧，two carbon可能难指望

> - 所有的模拟中，连接芳环的键那里不再是平面，是一直存在的问题
>   - 芳环应该修一下，但hybrid都好着
>   - pymol edit一下可能稍稍改变atom order
>   - 参数上少个约束吧，其实整个芳环都有点歪（不管）
>   - 在使用真正的remtp之前，都没有过这个问题
>   - tut-nvt不是很严重
> - alpha磷酸离芳环氢有点近了，都这样
> - timestep 1.0

> 后来算了：
>
> - complex+tutorial+my cutoff+edited hybrid.prm
>   - 改参数是修好了键的问题
>   - 改cutoff毁掉了ligand
> - 现在以my-piston为基础，改cutoff为8，10，10.小一点的diheral k
>   - 只改cutoff三连可以毁掉tut，但不能拯救my-piston
>   - pme加到tut没啥影响
> - tut-piston-pme，调dihedral，也ok
>   - 两个键恐怕只能8，5组合才能成功限制？没事
> - 加上其他参数
>   - 跑得没有tut-piston远。这几个hybrid都不算太远；transfer也没比normal少跑
>
> 芳环的事已经有所改善，但后面是否还应该使用限制性的参数？
>
> final：ligand那组还是有点变化了，complex炸了
>
> - 奇怪的是去掉那几个其他参数，hgroupcutoff、wrap water，就好了？并没好？？
>
> 现在的框架应该是tut+piston+pme+other，但其实是**有时候成功有时候不太行**。很可能是piston等压的问题，pme和other影响都不大吧，alpha磷酸离芳环氢有点近了的情况基本都存在，tut-piston也是？

总结：

- **是否NPT**当然是最重要的之一
- tutorial的参数构象都还行；my param使得三磷酸翘起来
  - 可能的重要因素：**cutoff三连**（langevin damping，PME?）

- npt使得距离变化？爆炸？**piston那俩参数**还是有影响。。

#### 4.21 

> FATAL ERROR: ABNORMAL EOF FOUND -buffer=*END

This is an end-of-file error. Check the end of your pdb,psf and parameter files (all inputs). Probably one of them has been interrupted while being created. I can help you more if you upload the files.

#### 4.21

> compare tutorial
>
> ```tcl
> switchdist               8.0
> cutoff                   9.0
> pairlistdist            10.0
> 
> timestep                1.0
> fullElectFrequency      2
> nonbondedFreq           1
> 
> rigidbonds              all
> rigidtolerance          0.000001
> rigiditerations         400
> 
> langevin                on
> langevinTemp            $temp
> langevinDamping         10.0
> ```
>
> and my config
>
> ```tcl
> vdwForceSwitching   	yes;
> cutoff             	 	12.0;              # may use smaller, maybe 10., with PME
> switchdist          	10.0;              
> pairlistdist        	14.0;
> 
> timestep            	1.0;               # 2fs/step
> nonbondedFreq       	1;                 # nonbonded forces every step
> fullElectFrequency  	2; 
> stepspercycle       	20;                # 20 redo pairlists every ten steps
> pairlistsPerCycle    	2;                
> rigidBonds          	all;               # needed for 2fs steps. Bound constraint all bonds involving H are fixed in length
> 
> margin              	1.0
> 
> langevin                   on;         # do langevin dynamics
> langevinDamping             1;         # damping coefficient (gamma) of 1/ps
> langevinTemp            $temp;
> langevinHydrogen          off;
> 
> wrapWater           	on;                # wrap water to central cell
> wrapAll             	on;                # wrap other molecules too
> wrapNearest         	off;               # use for non-rectangular cells (wrap to the nearest image)
> 
> PME                 	yes
> PMEGridSpacing      	1.0
> PMETolerance        	10e-6
> PMEInterpOrder      	4
> useGroupPressure        yes;           # needed for rigid bonds (rigidBonds/SHAKE)
> useFlexibleCell         no;            # yes for anisotropic system like membrane 
> useConstantRatio        no;            # keeps the ratio of the unit cell in the x-y plane constant A=B
> langevinPiston          on
> langevinPistonTarget    1.01325
> langevinPistonPeriod    100;         # 100?
> langevinPistonDecay     50;         # 50?
> langevinPistonTemp      $temp
> StrainRate              0.0 0.0 0.0
> 
> 
> # SPACE PARTITIONING
> splitpatch              hydrogen
> hgroupcutoff            2.8
> ```
>
> fep似乎是nvt或npt都行？查一下
>
> tutorial和程序我记得都是nvt？biggin那个书是吉布斯

#### 4.23~24

问题：在一次中断后restart

> FATAL ERROR: CudaTileListKernel::buildTileLists, maximum shared memory allocation exceeded. Too many atoms in a patch

[CUDA source](https://www.ks.uiuc.edu/Research/namd/doxygen/classCudaTileListKernel.html#ae2ecf8db799a4ffedde6062e772e7ad0)

namd no gpu: namd fatal error: patch has ... atoms, maximum allowed is 65535

核心问题：namd Too many atoms in a patch，不是cuda. 正常run的patch只有几百atoms。观察对比log file中patch grid 等参数

The command "twoAwayX yes" (same for Y and Z) will double the number of
patches. Trying to run 3.5 million atoms on only 16 processors is asking a
lot of NAMD though.
[Improving Parallel Scaling](https://www.ks.uiuc.edu/Research/namd/2.9/ug/node90.html)
[NamdPerformanceTuning](http://www.ks.uiuc.edu/Research/namd/wiki/?NamdPerformanceTuning)

在zju上
Info: PATCH GRID IS 12 (PERIODIC) BY 10 (PERIODIC) BY 13 (PERIODIC)
Info: PATCH GRID IS 2-AWAY BY 2-AWAY BY 2-AWAY
Info: LARGEST PATCH (785) HAS 102993 ATOMS
*numprocs* = (2) *numpatches* + 1

放弃！

> https://www.ks.uiuc.edu/Research/namd/mailing_list/namd-l.2020-2021/0939.html
>
> http://www.ks.uiuc.edu/Research/namd/mailing_list/namd-l.2010-2011/2282.html

## FEP results

> The relative binding free energy (ΔΔG) of ATP was found to be −4.88 ± 0.62 kcal/mol, while that of RemTP was −7.68 ± 0.57 kcal/mol

> 4.25: see mail list

### ParseFEP

data explained https://www.ks.uiuc.edu/Research/namd/2.14/ug/node66.html



```shell
# parsefep -forward ../*forward-all*.fepout -backward ../*backward-all*.fepout -gc 0 -bar
rm file*
bash grace.summary.exec
```



adjusting

https://www.ks.uiuc.edu/Research/namd/mailing_list/namd-l.2018-2019/0204.html
https://www.ks.uiuc.edu/Research/namd/mailing_list/namd-l.2013-2014/0568.html

### using alchemlyb

steps

- [parsing namd](https://alchemlyb.readthedocs.io/en/latest/parsing/alchemlyb.parsing.namd.html?highlight=namd)
- combine forward and backward, substitute np.nan
- check convergence
- fit with a estimator
  - `delta_f_.loc[0.00, 1.00]`

alchemlyb这个包处理得十分粗糙，首先没有考虑分开vdW和coul，数据只读取了dE；然后是数据虽然能比较自由得组合，但是其他lambda下的能量根本不知道，留下了许多nan；最后是他给出那个forward和backward合并的方案，难道不是加了两份dE吗？虽然数值不太一样？感觉没道理









# Extra protocol





## VS draft

### search

remTP: N#C[C@@]3(n2cnc1c(N)ncnc12)O[C@H](COP(=O)(O)OP(=O)(O)OP(=O)(O)O)[C@@H](O)[C@H]3O

(zinc)

a clear 5-member ring with tri phosphate and purine ring: O=P(O)(O)OP(=O)(O)OP(=O)(O)OC[C@@H]3CCC(n2cnc1cncnc12)O3

find 'substructure' in pubchem

[now](https://pubchem.ncbi.nlm.nih.gov/#query=O%3DP(O)(O)OP(%3DO)(O)OP(%3DO)(O)OC%5BC%40%40H%5D3CCC(n2cnc1cncnc12)O3&tab=substructure&fullsearch=true&mw_lte=800.17&rotbonds_lte=20&mw_gte=460.17&rotbonds_gte=4&heavycnt_lte=50&hbonddonor_lte=14&hbondacc_lte=25&complexity_lte=1406&xlogp_gte=-10.3&polararea_lte=439&sort=polararea&page=1)

但还是有很多嘧啶系列的

pubmed离谱的一点就是，甲基都算烃基链的substructure，芳环就不能模糊搜索一下

> so don't use filtered from ATP: https://pubchem.ncbi.nlm.nih.gov/#query=N%23C%5BC%40%40%5D3(n2cnc1c(N)ncnc12)O%5BC%40H%5D(COP(%3DO)(O)OP(%3DO)(O)OP(%3DO)(O)O)%5BC%40%40H%5D(O)%5BC%40H%5D3O&tab=similarity&fullsearch=true&mw_lte=625.27&rotbonds_lte=15&mw_gte=265.27&rotbonds_gte=0&hbonddonor_lte=10&hbonddonor_gte=1&heavycnt_lte=39&polararea_lte=339&hbondacc_lte=20&complexity_lte=934&xlogp_lte=0.7&xlogp_gte=-7.3
>
> [no purine](https://pubchem.ncbi.nlm.nih.gov/#query=O%3DP(O)(O)OP(%3DO)(O)OP(%3DO)(O)OC%5BC%40%40H%5D1CCCO1&tab=substructure&fullsearch=true&rotbonds_lte=20&mw_lte=723&hbondacc_lte=20&hbondacc_gte=11&rotbonds_gte=4&xlogp_gte=-10.7&heavycnt_gte=25&hbonddonor_lte=10&polararea_gte=176&mw_gte=445.17&complexity_lte=1312&hbonddonor_gte=2&heavycnt_lte=45&polararea_lte=366&xlogp_lte=1.3)

### summary

| stage                 | # of molecules |
| --------------------- | -------------- |
| database              | 2863           |
| converted             | 2466           |
| processed nan etc     | 2418           |
| recovered MMFF94s etc | 2738           |
| recovered ion         | 2791           |
| final                 | 2771           |

总结，对付pubchem的顺序！

- 有多个分子的，去除离子的（绝对正确）
- 用MMFF94和94s各生成一遍，合并（有的会错）
- 再找出没文件的，用先gen3D的方式（仍有nan，要不算了，你厉害你用rdkit再试试）
- 最终整体检查，修正加氢情况等，再改改

### converting

#### 2nd

> pubchem里整出来坐标nan？gen3D的锅。converted有370个有nan
>
> 去搜它的PUBCHEM_IUPAC_INCHIKEY？

```shell
# all files, no path
for j in `find ./ -type f -name '*.pdbqt' | xargs grep -l 'nan'`; do
g=${j%*.pdbqt}
f=${g#*/}
cp ../lib/${j} ../lib-temp 
obminimize -ff MMFF94 -n 1000 ../lib-temp/${j} > ../lib-temp/${f}.pdb
rm ../lib-temp/${j}
obabel ../lib-temp/${f}.pdb -opdbqt -O ../lib-temp/${f}.pdbqt -as -h # wrong! replace this batch
done
rm ../lib-temp/*.pdb
```

重新搞个lib，光最小化，只替换这些有问题的

- 有的也不好，还需最小化PO4；

- 有的（上一行的）因为最小化爆炸了，PO4掉了，拉倒；（735等）

  > 正方形的PO4没有gen3D就容易爆炸
  >
  > 还可能因为有离子，如1297

- 个别的没加氢

文件变为0的，就算了吧

带水的，断开的，文件特征？

还有的5号C和磷酸的键是直线，这也没救。。（1045）

还有芳环歪了的，TP掉了的

> 简单edit就pymol吧，反正要转换下pdb，还要-as --partialcharge gasteiger不要-h！

如果看直接最小化的，问题都在磷酸上！

没采纳

#### 3rd

```shell
for j in `ls ../lib-temp`; do
g=${j%*.pdbqt}
f=${g#*/}
cp ../lib/${f}.sdf ./
obabel ${f}.sdf -osdf -O ${f}-t.sdf --gen3D
obminimize -ff MMFF94s -n 1000 ${f}-t.sdf > ${f}.pdb
mv *.sdf ./trash
obabel ${f}.pdb -opdbqt -O ${f}.pdbqt -as --partialcharge gasteiger
mv *.pdb ./trash
done
mkdir trash
#mv *.pdb ./trash
#mv *.sdf ./trash
```

> 还是先gen3D，但用GAFF，有些先最小化没成功的成了？
>
> 问题：嘌呤全完了？？主要是变形太严重，成键是pymol的问题
>
> 直线键啥的解决了？

MMFF94s：能输出的好像好多都好着。5C直线键解决了

> 有的没加氢。倒有些“先最小化”ok的被破坏了？有些OPO仍然直线（735）。

还是有些炸了

没输出的52个,44个nan

最后是采纳了一些？

以后用MMFF94s？用吧，至少5C直线键要解决

#### 4th

以后直接初始就94s！

去掉空的2464，有几十个nan？所以看来正常MMFF94**也要跑**，算是补充，加起来都快齐了

按2dsdf2pdbqt.sh，完了以后，在library下

```shell
ls | grep pdbqt | sort > 94s
ls ../../library | grep pdbqt | sort > lib
diff -r 94s lib | grep '<' | cut -c 2- > lack.txt
rm 94s lib

for j in `cat lack.txt`; do
cp ./${j} ../temp #../../library
done
# remove emtpy and nan
```

多了好多，快300个。。NB！

> lib_94s

#### 5th

处理有离子的。在splited里：

```shell
for j in `find ./ -type f -name '*.sdf' | xargs grep -l 'Na '`; do
mv ${j} ./ion/
done
```

出现的奇怪元素：Na, Mg, Cu, Mn, K, Li, Cr, Ba, Co

但是有些其实处理成功了，所以过滤下（10）；个别有文件但磷酸掉了（3）

大部分是好的？对比：

```shell
ls | grep sdf | cut -d '.' -f 1 | sort > ion
ls ../../library | grep pdbqt | cut -d '.' -f 1 | sort > lib
diff -r ion lib | grep '<' | cut -c 2- > lack.txt
rm ion lib
```

> 关于命令
>
> 就是收集文件名，用后缀过滤，排序。
>
> diff：找出差异文件。<代表前者有后者没有的
>
> cut：去掉输出的'< '
>
> d和f：截取，这里去掉后缀
>
> 其他：https://www.cnblogs.com/f-ck-need-u/p/9071033.html

救一下没有的

> https://blog.csdn.net/u012325865/article/details/103782297
>
> https://www.rdkit.org/docs/GettingStartedInPython.html
>
> https://www.rdkit.org/docs/source/rdkit.Chem.rdmolfiles.html reader and writer
>
> http://rdkit.chenzhaoqiang.com/index.html Chinese tutorial
>
> rdkit去除离子

```shell
# under done
mkdir ion-done
rm ./*-t.sdf ./*.pdb ./ion-done/*.pdbqt
for j in *.sdf; do
f=${j%*.sdf};
obabel ${f}.sdf -osdf -O ${f}-t.sdf --gen3D -e -as -h
obminimize -ff MMFF94s -n 1000 ${f}-t.sdf > ${f}.pdb; 
obabel ${f}.pdb -opdbqt -O ${f}.pdbqt -as --partialcharge gasteiger;
mv ${f}.pdbqt ./ion-done
done
```

除完离子这些加氢有点问题？算了library里也有。。

#### 6th

再救一波。。

剩下这些要么nan要么0

nan的基本上gen3D时就nan了，0的此时就有离谱的坐标（一堆0，和接近nan的大数？）

先最小化？还是老问题，直线、断裂等

```shell
for j in *.sdf; do
f=${j%*.sdf};
obminimize -ff MMFF94s -n 1000 ${f}.sdf > ${f}.pdb; 
obabel ${f}.pdb -opdbqt -O ${f}.pdbqt -as --partialcharge gasteiger;
mv ${f}.pdbqt ./mini
done

for j in *.pdbqt; do
f=${j%*.pdbqt};
obminimize -ff MMFF94s -n 1000 ${f}.pdbqt > ${f}.pdb; 
obabel ${f}.pdb -opdbqt -O ${f}.pdbqt -as --partialcharge gasteiger;
mv ${f}.pdbqt ./mini/mini
done
```

倒也总比没有强。有些是好的，手工挑出来吧。再优化一波，去掉0和nan，还有些炸的最后一步做吧

gamma磷酸真的优化不了

51个nan不管了

#### 7th

最终检查，目标：加氢、多个分子，能修个别γ磷酸最好，能修芳环（kekulize）吗

https://openbabel.org/docs/dev/UseTheLibrary/Python_Pybel.html

```
/home/gxf/Desktop/work/projects/tools/Python-for-MD/convert-ligand/convert.py
```

> MDAnalysis、RDkit都不能读取pdbqt。但是读完通过smi可以转换

可是有些正常的，smi生成不了啊！

> ```
> rdkit.Chem.rdmolops.SanitizeFlags.SANITIZE_NONE
> ```
>
>  indicates that no problems were encountered. 没用上  

处理多个分子：ok。可以用来除离子？

get所有smi

```shell
for j in `cat smis.txt`; do
f=${j%/*}
sm=${j#*/}
obabel -:$sm --gen3d -osdf -O $f.sdf
obminimize -ff MMFF94s -n 1000 ${f}.sdf > ${f}.pdb
obabel ${f}.pdb -opdbqt -O ${f}.pdbqt -as --partialcharge gasteiger
done
rm ${f}.sdf ${f}.pdb
rm *d*
```

除掉nan和broken(15)

```shell
find ./ -type f -name '*.pdbqt' | xargs grep -l 'nan' | xargs -n 1 rm -f
for j in `cat broken.txt`; do
rm $j.pdbqt
done
```

还是有没加氢、C5直线的，算了。。

已经炸了的，不能通过片段来救了



> 转了也没有用，还是好多读不了

```shell
for j in *.pdbqt; do
f=${j%*.pdbqt};
obabel ${f}.pdbqt -osdf -O ../sdf/${f}.sdf;
done
find . -name "*" -type f -size 0c | xargs -n 1 rm -f
```



### other

那转不了的到底是哪些呢？没离子也有好多失败的

双分子？

原来的MMFF94可能还不好？但看了下也都没直键的问题

能查找区别了以后，就可以无限次补救了。。。



[RDKit|分子子结构的删除、替换与切割](https://blog.csdn.net/dreadlesss/article/details/105826379)   可以自己生成了？

[a series of questions, including removing solvent](https://rdkit-discuss.narkive.com/CAZ6XfCC/washing-molecules-in-rdkit)

> https://github.com/forlilab/Meeko read pdbqt and Mol to PDBT. not a rdkit.Chem.Mol...



### docking

> docking test: some bonds rotated, some not. it affects!
>
> convert: most bonds are ok, but some of the ligands huddled up (its TP). 
>
> straight O-P-O bond: from convert. not changed in docking...
>
> gen3D和minimize也没啥变化，拉倒吧
>
> those that failed might be: with Na+, Cu2+ ion, water, etc. That's ok
>
> 感觉leili给的初始结构怪怪的，作用力不强，都dock不上去
>
> 还不如equil的ATP，好几个Arg，align了一下，相对位置差不多
>
> 现在docking的site调整好了

对接要多给点空间啊！