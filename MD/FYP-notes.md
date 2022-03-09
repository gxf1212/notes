# Notes on FYP

Notes on the final year project (毕设), Nov 2021~May 2022.

## background

> 9.27

- It was originally developed by Gilead Sciences, Inc. to treat Ebola virus disease.
- RdRp=NSP12. cofactor: nsp7/nsp8, etc.
  - of course needs helicase (NSP13), etc.
- 老药新用：drug repurposing

### Mechanism

- *Mechanism of SARS-CoV-2 polymerase stalling by remdesivir* (nature communications)

We show that <u>addition of the fourth nucleotide following remdesivir incorporation</u> into the RNA product is impaired by <u>a barrier to further RNA translocation</u>. This translocation barrier causes retention of the RNA 3ʹ-nucleotide in the substrate-binding site of the RdRp and interferes with entry of the next nucleoside triphosphate, thereby **stalling RdRp**. In the structure of the remdesivir-stalled state, the 3ʹ-nucleotide of the RNA product is matched and located with the  template base in the active center, and this may impair proofreading by  the viral 3ʹ-exonuclease.

- *Remdesivir is a delayed translocation inhibitor of SARS-CoV-2 replication* (PDB: [7L1F](http://www.rcsb.org/pdb/explore.do?structureId=7L1F))

Here, we present a 3.9-Å-resolution cryo-EM reconstruction of a <u>remdesivir-stalled RNA-dependent RNA polymerase complex</u>, revealing full  <u>incorporation of 3 copies of remdesivir monophosphate (RMP) and a  partially incorporated fourth RMP</u> in the active site. The structure reveals that RMP blocks RNA translocation after incorporation of 3 bases following RMP, resulting in delayed chain termination

- *Structural basis for inhibition of the RNA-dependent RNA polymerase from SARS-CoV-2 by remdesivir* (science)

Here we report the cryo–electron microscopy structure of the SARS-CoV-2  RdRp, both in the apo form at 2.8-angstrom resolution and <u>in complex with a 50-base template-primer RNA and remdesivir</u> at 2.5-angstrom resolution. The complex structure reveals that the partial double-stranded RNA template is inserted into the central channel of the RdRp, where remdesivir is covalently incorporated into the primer  strand at the first replicated base pair, and terminates chain elongation.

### simulation

- *Revealing the Inhibition Mechanism of RNA-Dependent RNA Polymerase (RdRp) of  SARS-CoV-2 by Remdesivir and Nucleotide Analogues: A Molecular Dynamics  Simulation Study*

In this work, we have examined the action of remdesivir and other two  ligands <u>screened from the library of nucleotide analogues</u> using docking  and molecular dynamics (MD) simulation studies.

The binding energy data reveal that compound-17 (−59.6 kcal/mol) binds  more strongly as compared to compound-8 (−46.3 kcal/mol) and remdesivir  (−29.7 kcal/mol) with RdRp. 找到两个更强的

筛选的更是一大堆了，搜    remdesivir analog screening sars-cov-2 RdRp

### other similar simulation

- *High-throughput rational design of the remdesivir binding site in the RdRp of SARS-CoV-2: implications for potential resistance*

  哪些突变能resistance

- *SARS-CoV-2 RNA dependent RNA polymerase (RdRp) targeting: an in silico perspective*

  2021 April, only RdRp dynamic. docked several our drugs with vina

- 



## Software usage

record sth general

### gmx

1. check installation info

   ```shell
   gmx -version
   ```

2. 

#### .mdp options

##### vdw

use “switch”, Smoothly switches the potential to zero between rvdw-switch (page 211) and rvdw
(page 212). i.e. a switching distance of 10 Å and a smooth cutoff distance of 12Å in the paper

With GPU-accelerated PME or with separate PME ranks, [gmx mdrun](https://manual.gromacs.org/documentation/2018/onlinehelp/gmx-mdrun.html#gmx-mdrun) will automatically tune the CPU/GPU load balance by scaling [`rcoulomb`](https://manual.gromacs.org/documentation/2018/user-guide/mdp-options.html#mdp-rcoulomb) and the grid spacing.





> ### MD simulation (ATP-Mg^2+^) with Gromacs
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







### Pymol

1. delete命令！

2. select atom name

   ```
   sele name HA
   ```

   see more identifiers  https://pymolwiki.org/index.php/Selection_Algebra

3. 

### VMD techniques

杂记, some extra functions, that I encountered. for details, check vmd-ug.pdf

#### General

1. run in terminal

   ```shell
   vmd -dispdev text -e combine.tcl
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
	
7. 

5. To know about your system, like checking the number of atoms, just load it into vmd (also when executing scripts) and see the cmd.

#### VMD Graphics

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

### shell

1. shell 统计出现行数

   ```shell
   cat complex_ATPP.pdb | grep "SOD" | wc -l
   ```

   - cat显示内容
   - grep查找字符
   - wc计算字数

2. if 判断文件或目录是否存在

   https://blog.csdn.net/m0_38039437/article/details/100160042



### Some other notes with VMD and NAMD

> ERROR: failed on end of segment MOLECULE DESTROYED BY FATAL ERROR!

probably need to add top/itp file







## Stage 1 Protocol

stage 1: from structure to FEP

### Notes

**protein-ATP system**

the RdRp, residue name has already been aliased. only one chain. no disulfide bonds. patched protein terminal

The ATP molecule from FEP, strange atom type, cannot be used for MD system build-up..(maybe we can aliase pdb)

why only one Mg? 虽然确实要两个，但第二个的位置至今under debate。。

notice the binding mode?



### Prepare the docked structure (ligand)

#### basic

original .pdb文件 去除原子类型??

two types of processings

- directly from pdb structure (pdb to pdb)
- make (whatever type) into pdbqt and dock first, then convert (pdbqt or original) to pdb

#### docking

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

#### Autodock vina

> Prepare receptor, as well as flexible: see UROPS notes
>
> - when writing file, always browse and name the file!
> - when recording vina parameters, centers are on the left! not right!
> - when choosing residues, click on the S circle!
>

##### info&convert existing structure

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

##### docking commands

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

#### Other about modeling

tools that can **both draw** a molecule **and convert** through SMILES.  Your own molecule!

##### ZINC+obabel

- ZINC: search and draw, copy that smiles

- convert to anything by obabel

  ```shell
  f='Nc1ncnc2c1ncn2[C@@H]1O[C@H](CO[P@](=O)(O)O[P@](=O)(O)OP(=O)(O)O)[C@@H](O)[C@H]1O'
  obabel -:$f --gen3d -opdbqt -O atp.pdbqt -as -h --partialcharge gasteiger # for vina
  ```

##### Avogadro

> an alternative for ChemBioOffice in Linux

[building-with-smiles](https://avogadro.cc/docs/building-molecules/building-with-smiles/): Build--Insert

output: File--Export--Molecule--xxx.pdb

https://avogadro.cc/docs/tools/draw-tool/

##### GaussView: using

load pdb into it. Almost no changes in the position. But we are so familiar with modelling!

One thing you MUST do is: unify the residue name (change for edited atoms). or AutoPSF says sth like 'failed on end of segment'

##### DSV

may also edit small molecule and prepare for docking (usable?)

`Small Molecules` in the second line of menu. Also `Chemistry` in the 1st line. Delete in the 3rd line. 

May vary a bit if you `Clean Geometry` to optimize structure. 

Not as familiar as Gauss.

> UCSF-Chimera doesn' t seem to add groups. So does Avogradro
>
> but can prepare for UCSF DOCK (adt, and other?) https://zhuanlan.zhihu.com/p/148384183

#### Finally

you should change the name of the ligand? not really needed

```shell
grep "ATP" -rl ./remtp.pdb | xargs sed -i "s/ATP/LIG/g"
```

### Prepare the system with VMD etc.

#### reference

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

#### build complex structure

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

#### build complex-method 1 (deprecated)

> it is said that when you use AutoPSF you cannot track the topology file used. It’s suggested to adopt method 2

##### make the all .pdb and .psf with AutoPSF

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

##### use console to combine all molecules

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

#### build complex-method 2 (using)

> use console, include topology. [How to create a PSF file](https://sassie-web.chem.utk.edu/docs/structures_and_force_fields/notes.html)
>

Modeling--Tk Console

- create segment for our molecule first...if you start with .pdb file
- for normal ligand, just build normally with the above files, na_nad just deplicates and abandoned

```shell
vmd -dispdev text -e merge.tcl
```

for atp, still built with AutoPSF, topology files **only include top_all36_na.rtf, top_all36_cgenff.rtf**. 

and only 'formatted' provides the right coordinates! _autopsf adjusts coordinates a little bit (why?)

but Tk console reports error!

>ERROR) Error reading optional structure information from coordinate file atp_autopsf_formatted.pdb
>ERROR) Will ignore structure information in this file.

but **'formatted’ can be recognized by CHARMM-GUI**!

> important note: for newly added atoms, parameterization is needed.
>
> ![parameterization](https://gitee.com/gxf1212/notes/raw/master/MD/MD.assets/parameterization.jpg)

the successful version:

```tcl
# for atp, still built with AutoPSF, topology files except top_all36_na.rtf,
# top_all36_cgenff.rtf are deleted..and only 'formatted' provides the right coordinates!
package require psfgen
resetpsf
topology top_all36_prot.rtf
topology toppar_water_ions.str

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
> 

#### build complex-method 3

build with Gromacs and AmberTools?



##### Appendix: CHARMM-GUI generate files for ligand

but not used in method 1

Use CHARMM-GUI---input generator---ligand reader and modeller

refer to preparation videos mentioned above

> **CHARMM GUI basic tips**
>
> - after GUI, the ligand name is changed into LIG
> - Only molecules in the **HETATM** record in a PDB file are recognized.
> - **adopt available RCSB SDF structure** preferentially
> - make sure that the Marvin JS structure is correct
> - <font color=red>All hydrogen and missing atoms should be explicitly placed for accurate result.</font> or report error
> - Users can modify the protonation state if necessary. 
>   - or select other protonation state in the next step
> - **The coordinates will be preserved if you upload .pdb file.**
>   - uploading your own .pdb file is suggested
>   - you can align .pdb files later, only it considers coordinates
>   - if you are to upload file, .mol2 is prefered? 
> - you may want to “Find similar residues in the CHARMM FF”
> - the outputed residue name is ‘LIG’

then just click, click...and download all files

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

##### Appendix 2: about the topology

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



#### solvation and ionization

- solvate https://www.ks.uiuc.edu/Research/vmd/plugins/solvate/
- autoionize https://www.ks.uiuc.edu/Research/vmd/plugins/autoionize/

##### method 1 (scripting, easier?)

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
solvate merged.psf merged.pdb -t 11.5 -o solvated # files are written
mol delete all
# the ionization script writes:
autoionize -psf solvated.psf -pdb solvated.pdb -sc 0.1 -o system
# params, to be consistent
```

#####  method 2-GUI

> note: a trick: Extension--Modeling--Automatic PSF Builder--Options, check 'add solvation box' and 'ionization' options, follow the PSF building protocol, and you will get completely solvated and ionized system!!!
>
> though the parameters cannot be set...

###### Solvation

Extension--Modeling--Add Solvation Box

- You can rotate to minimize volume

- WT: residue name for waters. can change

- if you check 'use molecular dimension', the min and max in 3D will be calculated automatically, and you only need to add 'padding' (and measure) as we usually did. 

  otherwise we can specify all the parameters manually
  
- Click 'solvate', molecular info (# of water) is shown in Terminal again.

> this GUI doesn’t have ionization, neither choose water model?? TIP3P water is the default...

###### Ionization

Extensions--Modeling--Add ions (autoionize)

very straightforward

- Choose salt, additional ions
- Neutralize and set NaCl concentration to 0.15 mol/L

> it’s not replacing water mols, it adds ions

##### measurement of the system 

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

### Setting up a MD simulation 

for basics about .namd parameters, please read 

- fundamental
  - ug 2.2 NAMD configuration file
    - 2.2.5 Required NAMD configuration parameters. basic params links
  - ug 7 Standard Minimization and Dynamics Parameters
  - namd-tutorial-unix chp 1 and appendix

- [online tutorial](https://www.ks.uiuc.edu/Training/Tutorials/namd/namd-tutorial-unix-html/node26.html)
- note in .conf
- [Kevin's scripts](https://github.com/skblnw/mkrun/tree/master/NAMD). don't ever forget!

#### on the scripts

Below are parameters you should notice in every simulation.

##### constants and options

- outputbase: your system
- 
- restarting a simulation: set `INPUTNAME`
- gradually increase the temperature: set `ITMEP`$\neq$`FTEMP`
- when temp gets stable, `langevin on`
- `PSWITCH` and `langevinPiston on`: constant pressure

##### system and parameters 

###### (debugging)

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

###### solution

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

##### restarting

- The “reinitvels” command reinitializes velocities to a random distribution based on the given temperature.
- 

##### boxes, restrains

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

##### minimization, equilibration, NVT and NPT

all use conjugated gradient....not much to discuss

> default: minimization < Perform <u>conjugate gradient</u> energy minimization? >

NPT: Langevin dynamics+Nos´e-Hoover Langevin piston

NVT: delete piston...

> compare the tutorial files, ws and wb
>
> no params difference between npt and production??

By now the Kevin script is compatible with the tutorial. Just ignore the other option, set `constraintScaling` to 1.

` numsteps` = `run` ?

###### steps

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

##### other settings

- With wrapping, some molecules will jump between sides of the cell in the trajectory file to yield the periodic image nearest to the origin. Without wrapping, molecules will have smooth trajectories, but water in the trajectory may appear to explode as individual molecules diffuse. Wrapping only affects output, not the correctness of the simulation.

  ```
  wrapAll             on 
  ```

- `on` = `yes`?

- 

- 

##### Guidance

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

#### work flow

##### commands

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
> │   ├── param.prm
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
namd3 +auto-provision +idlepoll pro-lig-prod > pro-lig-prod.log
```

> on lab computer:
>
> ```shell
> namd3 +p1 +devices 0 pro-lig-prod > pro-lig-prod.log
> ```
>
> In your NAMD configuration file, set `CUDASOAintegrate` to `on`. only use one cpu to achieve 2-fold acceleration of namd3.
>
> [namd3-gpu](https://developer.nvidia.com/blog/delivering-up-to-9x-throughput-with-namd-v3-and-a100-gpu/)

##### testing the run

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

#### Analysis basics and check

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

animate read dcd rdrp-atp-p.dcd
```







#### Run in Gromacs

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
   
2. get .top file

   ```tcl
   package require topotools
   # Load the structure into VMD.
   mol new system.psf
   mol addfile equilibrated.pdb
   # Pass along a list of parameters to generate structure.top, suitable for preparing gromacs simulations.
   topo writegmxtop structure.top [list par_all35_ethers.prm par_all36_carb.prm par_all36_cgenff.prm par_all36_lipid_ljpme.prm par_all36m_prot.prm par_all36_na.prm] 
   ```

   > don't include `param.prm ` because gmx never tolerate duplication a little bit
   >
   > ```
   > ERROR 50 [file structure.top, line 7884]:
   > Encountered a second block of parameters for dihedral type 9 for the same
   > atoms, with either different parameters and/or the first block has
   > multiple lines. This is not supported.
   > ```

   CHRAMM ff website also provides many .itp file for gmx

   > copy your folder to `~/gromacs-2021.5-gpu/share/gromacs/top` and you can add at the beginning of `.top` file:
   >
   > ```c
   > #include "charmm36-jul2021.ff/forcefield.itp"
   > ```

   but we don't need that much, which causes hundreds of duplications again (for atomtype, just warnings).

   ```c
   #include "charmm36-jul2021.ff/ffnonbonded.itp"
   ```

   which really includes parameters for these ions. `ions.itp` only defines atoms.

   Put it before `[ atomtypes ]` in your `.top` file

3. also the velocity in the last frame! (find how to load into gmx, .cpt?)

   ```tcl
   ## from tutorial
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

3. to run in gmx, specify T coupling groups:

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
   
4. make the .tpr file
   
   ```shell
   # This would be prepared for simulation using grompp to create a tpr file
   gmx grompp -f md.mdp -c equilibrated.gro -r equilibrated.gro \
   -p structure.top -n index.ndx -o simulation.tpr -maxwarn 400
   # not that much warnings
   # supress repeated param definition
   -t velocity.cpt 
   gmx mdrun -deffnm simulation -nb gpu
   ```
   
   > cannot resolve the problem of duplicated dihedral angles...





### Clustering Anaylsis

preparation

```shell
catdcd -o rdrp-atp-prod-all.dcd rdrp-atp-prod*dcd
```



#### Clustering

##### in gmx

- https://www.ks.uiuc.edu/Research/namd/mailing_list/namd-l.2011-2012/0654.htmlanalyze .dcd in gmx
- http://www.ks.uiuc.edu/Development/MDTools/catdcd/ catdcd: dcd I/O basics. failed
- [Using GROMACS force distribution analysis (FDA) tool with NAMD trajectories](9https://hits-mbm.github.io/guides/namd-fda.html) a good reference! do as him!

###### prepare

1. make the initial structure, topology file, as did in [Run in Gromacs](#Run-in-Gromacs). We need `.tpr` or `.gro` for option `-s`

   > The .pdb contains structural parameters (charge?) like the .tpr file? not enough in `mdconvert` but ok for `gmx rms`?

2. convert the trajectory file

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

3. we may also use vmd to do that. the result is just the same

   ```shell
   f=rdrp-atp-prod
   vmd ../common/system.psf ${f}.dcd
   # cmd?
   # After VMD was opened select the molecule. Then click on `File` and select `Save Coordinates`. Now choose the trr format and save it.
   gmx trjconv -f ${f}-vmd.trr -o ${f}_nj.xtc -pbc nojump
   ```

4. optional: watch movie (don't for the 300-ns one! it eats all memory...)

   > ```shell
   > # pymol
   > load equilibrated.gro, final
   > load rdrp-atp-prod.xtc, final
   > # vmd
   > menu animate on
   > mol load psf ../common/system.psf pdb ../common/equilibrated.pdb
   > animate read dcd rdrp-atp-prod.dcd
   > ```

5. general checking

   ```shell
   # choose 4 backbone
   echo "4\n 4" | gmx rms -s equilibrated.gro -f ${f}_nj.xtc -tu ns -o rmsd_bb.xvg
   xmgrace rmsd_bb.xvg
   echo 4 | gmx rmsf -s equilibrated.gro -f ${f}_nj.xtc -o rmsf_bb.xvg -res
   xmgrace rmsf_bb.xvg
   ```

   > problem:
   >
   > > Can not find mass in database for atom MG in residue 921 MG
   > >
   > > Masses and atomic (Van der Waals) radii will be guessed based on residue and atom names
   >
   > just change 'MG' to 'Mg' in .pdb, solved. Do this only when gmx is needed...

###### clustering

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
   echo 4 24 | gmx trjconv -s equilibrated.gro -n index.ndx -f ${f}_nj.xtc -fit rot+trans -o ${f}_fit.xtc
   ```

   > is that necessary?
   >
   > `Select group for least squares fit`: I think it's **what to align**. backbone
   >
   > `Select group for output`: **what to keep** in the _fit.xtc. only our protein_atp_mg!
   >
   > view with `pro-lig.pdb`, no 1st frame problem
   
2. make rmsd matrix first

   ```shell
   f=rdrp-atp-prod
   echo 4 19 | gmx rms -s equilibrated.gro -n index.ndx -f ${f}_fit.xtc -m rmsd-lig.xpm -tu ns #-f2 ${f}_fit.xtc
   gmx xpm2ps -f rmsd-lig.xpm -o rmsd-lig.eps -rainbow blue
   # a matrix, not readable data encoding...
   # ps2pdf rmsd-matrix.eps
   ```

   > `Select group for RMSD calculation`: ATP! the output
   >
   > ```shell
   > xmgrace rmsd.xvg
   > ```

2. clustering

   ```shell
   rm \#*\#
   # run
   echo 4 24 | gmx cluster -s ../equilibrated.gro -n ../index.ndx -f ../${f}_fit.xtc -dm ../rmsd-lig.xpm \
   -dist rmsd-distribution.xvg -o clusters.xpm -sz cluster-sizes.xvg -tr cluster-transitions.xpm \
   -ntr cluster-transitions.xvg -clid cluster-id-over-time.xvg -cl clusters.pdb \
   -cutoff 0.15 -method gromos
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

###### analysis

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

###### other

1. trjcat? no!

   ```shell
   f=rdrp-atp-prod
   gmx trjcat -f ${f}.dcd -o ${f}.xtc
   gmx trjcat -f *.dcd *.dcd *.dcd -o trajectory.xtc # concatenate multiple files
   ```

2. failed [catdcd](http://www.ks.uiuc.edu/Development/MDTools/catdcd/)

   ```tcl
   set f rdrp-atp-prod
   catdcd -o ${f}.trr -i ../common/equilibrated.pdb ${f}.dcd
   ```

3. rmsd/rmsf of NTP

4. 

   




##### in VMD







#### Analysis of binding mode?









### FEP (same) with NAMD



























