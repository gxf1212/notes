# Notes on FYP

Notes on the final year project (毕设), Nov 2021~May 2022.

# Stage 1 Protocol: MD

stage 1: from structure to FEP

## Notes

**protein-ATP system**

the RdRp, residue name has already been aliased. only one chain. no disulfide bonds. patched protein terminal

The ATP molecule from FEP, strange atom type, cannot be used for MD system build-up..(maybe we can aliase pdb)

why only one Mg? 虽然确实要两个，但第二个的位置至今under debate。。

notice the binding mode?

## Prepare the docked structure of ligand (not using)

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

### Autodock vina

> Prepare receptor, as well as flexible: see UROPS notes
> 
> - when writing file, always browse and name the file!
> - when recording vina parameters, centers are on the left! not right!
> - when choosing residues, click on the S circle!

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

## Draw and edit molecule

minimization won't change its position too much, but so helpful for later use. Or just modify on minimized ATP...

```shell
obminimize -ff MMFF94 -n 1000 atp.pdb > atp_m.pdb
```

We use Gview and Pymol.

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

Modeling--Tk Console

- create segment for our molecule first...if you start with .pdb file
- for normal ligand, just build normally with the above files, na_nad just deplicates and abandoned

```shell
vmd -dispdev text -e merge.tcl
```

for atp, still built with AutoPSF, topology files **only include top_all36_na.rtf, top_all36_cgenff.rtf**. May also

and only 'formatted' provides the right coordinates! _autopsf adjusts coordinates a little bit (why?)

but Tk console reports error!

> ERROR) Error reading optional structure information from coordinate file atp_autopsf_formatted.pdb
> ERROR) Will ignore structure information in this file.

but **'formatted’ can be recognized by CHARMM-GUI**!

> note: for newly added atoms, parameterization is needed?
> 
> <img src="https://cdn.jsdelivr.net/gh/gxf1212/notes@master/research/Previous-projects/FYP-notes.assets/parameterization.jpg" alt="parameterization" style="zoom:80%;" />
> 
> but may also use 'formatted’. but for remtp I used remtp_autopsf_temp.pdb
> 
> Another way to generate uploadable .pdb is:
> 
> ```shell
> gmx pdb2gmx -f remtp.pdb -o remtp.gro # though failed, we use that .gro file
> obabel -igro remtp.gro -opdb -O remtp-gro.pdb
> ```

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

2022.10.16 update:

```tcl
# vmd -dispdev text -e merge-sol-ion.tcl
package require psfgen
topology top_all36_prot.rtf
topology top_all36_cgenff.rtf
topology toppar_water_ions_namd.str

topology remtp.rtf
segment LIG {pdb remtp.pdb}
coordpdb remtp.pdb LIG

segment MG {pdb mg.pdb}
coordpdb mg.pdb MG

# maybe not using alias here
pdbalias residue HIS HSE
pdbalias atom ILE CD1 CD
pdbalias atom SER HG HG1
pdbalias atom CYS HG HG1

segment PRO {pdb rdrp.pdb}
coordpdb rdrp.pdb PRO

guesscoord
writepdb merged.pdb
writepsf merged.psf

psfcontext reset
mol load psf merged.psf pdb merged.pdb
package require solvate
solvate merged.psf merged.pdb -t 11.5 -o solvated
# files are written
mol delete all
package require autoionize
autoionize -psf solvated.psf -pdb solvated.pdb -sc 0.1 -o system

exit
```

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

### build complex-method 3

build with Gromacs and AmberTools?

#### Appendix: CHARMM-GUI generate files for ligand

> charmm-gui, what do the files do? what is needed? these?
> 
> ![parameterization](https://cdn.jsdelivr.net/gh/gxf1212/notes@master/research/Previous-projects/FYP-notes.assets/parameterization.jpg)

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

4. 

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
package require autoionize
autoionize -psf solvated.psf -pdb solvated.pdb -sc 0.1 -o system
# params, to be consistent

```

#### method 2-GUI

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

## Setup MD in Gromacs

### convert namd to Gromacs formats

> prepare, equillibrate in NAMD, run in gmx. i.e. convert equilibrated system to gmx (.gro/top, ndx, velocity)
>
> just a try. not suitable for fep

**This is also important if we want to cluster in gmx.** Refer to [Making clusters in gmx](/research/Previous-projects/FYP-notes?id=making-clusters-in-gmx) and [2023.1 update](#_20231-update).

https://www.ks.uiuc.edu/Research/vmd/plugins/topotools/

TopoTools, not only converting to gmx and lammps, more importantly editing your topology

1. make the latest coordinates as pdb, and then .gro

   this workflow may also help you skip building CHARMM FF for gromacs (if you encounter a complicated system). In this case, please use the .pdb file and skip to making a box. Also refer to [CHARMM-GUI solution builder](#charmm-gui-solution-builder).

   ```tcl
   # under ./equil
   mol load psf ../common/system.psf
   mol addfile rdrp-atp-equil.coor
   set sel [atomselect top all]
   $sel writepdb equilibrated.pdb
   quit
   ```

   make a box. find the length of cell basis vector from your measure or `equil.namd`

   ```shell
   # under gmx
   gmx editconf -f equilibrated.pdb -o equilibrated.gro \
   -box 9.88560037612915 9.641799974441528 11.786500322818756  \
   -center 5.6079001903533936 5.597199988365173 5.69505016207695 # x y z
   ```

   check in pymol to see if they are the same

   > [!WARNING]
   >
   > pymol/vmd measurement in angstrom; gmx: nm!!!
   >
   > divide the numbers got from namd by 10....

2. to specify T coupling groups in gmx:

   ```shell
   gmx make_ndx -f equilibrated.gro -o index.ndx
   > 1|13|14
   > 21|22|23
   > q
   ```

   > Protein_ATP_Mg    TIP3_SOD_CLA
   >
   > paste into
   >
   > ```shell
   > tc_grps        = non-Water Water # Membrane-containing MD simulation
   > tc_grps        = Protein_ligand_ion Other # normal solution system
   > ## deprecated
   > # compressed-x-grp or energygrps  = Protein MOL MN # list all main species 
   > ```

3. get .top file

   ```tcl
   # vmd, under equil
   package require topotools
   # Load the structure into VMD.
   mol new ../common/system.psf
   mol addfile equilibrated.pdb
   # Pass along a list of parameters to generate structure.top, suitable for preparing gromacs simulations.
   cd ../common/toppar
   topo writegmxtop ../../equil/structure.top [list par_all36m_prot.prm par_all36_cgenff.prm toppar_water_ions_namd.str lig.prm ] 
   # atp: with toppar_all36_na_nad_ppi.str, no lig
   # par_all36_na.prm
   exit
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

4. also the velocity in the last frame (find how to load into gmx, .cpt?)

   > [!NOTE]
   >
   > you might not need the velocity (since usually we need to equilibrate the system again when converted to gmx).

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

5. make the .tpr file

   ```shell
   # This would be prepared for simulation using grompp to create a tpr file
   gmx grompp -f md.mdp -c equilibrated.gro -r equilibrated.gro \
   -p structure.top -n index.ndx -o simulation.tpr -maxwarn 4
   # not that many warnings
   # supress repeated param definition
   -t velocity.cpt 
   gmx mdrun -deffnm simulation -nb gpu
   ```

   > cannot resolve the problem of duplicated dihedral angles...



### build in gmx 

#### CHARMM FF

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

#### Amber?

## Clustering Anaylsis

preparation

```shell
catdcd -o rdrp-atp-prod-all.dcd rdrp-atp-prod*dcd
```

### Clustering in gmx

- https://www.ks.uiuc.edu/Research/namd/mailing_list/namd-l.2011-2012/0654.htmlanalyze .dcd in gmx
- http://www.ks.uiuc.edu/Development/MDTools/catdcd/ catdcd: dcd I/O basics. failed
- [Using GROMACS force distribution analysis (FDA) tool with NAMD trajectories](9https://hits-mbm.github.io/guides/namd-fda.html) a good reference! do as him!

#### prepare

1. make the initial structure, topology file, as did in [Run in Gromacs](#Run-in-Gromacs). We need `.tpr` or `.gro` for option `-s`
   
   > The .pdb contains structural parameters (charge?) like the .tpr file? not enough in `mdconvert` but ok for `gmx rms`?

2. convert the trajectory file
   
   1. mdconvert
      
      ```shell
      # convert trajectory file
      conda activate AmberTools21 # MDtraj
      f=rdrp-atp-prod
      mdconvert -o ${f}.xtc -t equilibrated.gro ${f}.dcd # normal xtc. .tpr is not recognized
      gmx trjconv -f ${f}.xtc -o ${f}_nj.xtc -pbc nojump # movie, water not go to infinity?
      # gmx check -f ${f}_nj.xtc
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

#### clustering

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

   ```shell
   gmx trjconv -s simulation.tpr -n index.ndx -f ${f}_fit.xtc -o traj.pdb -tu ns -dt 0.3
   ```
   
   to make a traj pdb
   
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

3. clustering
   
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

#### analysis

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

#### other

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

   do not add index file

3. 

### 2023.1 update

#### a full working example

> https://blog.sciencenet.cn/blog-548663-981600.html

##### prepare

```shell
# bash ../../make_equil_clus.sh
vmd -dispdev text -e ../../make_equil_clus.tcl

gmx editconf -f equilibrated.pdb -o equilibrated.gro \
-box 9.88560037612915 9.641799974441528 11.786500322818756  \
-center 5.6079001903533936 5.597199988365173 5.69505016207695

echo -e "13|2|3\n 10|11|12\n q" | gmx make_ndx -f equilibrated.gro -o index.ndx

gmx grompp -f ../../md_fake.mdp -c equilibrated.gro -r equilibrated.gro \
-p structure.top -n index.ndx -o simulation.tpr -maxwarn 4

mv structure.top index.ndx simulation.tpr equilibrated.gro ../prod2  # prod prod3
```

```tcl
# vmd -dispdev text -e ../../make_equil_clus.tcl

mol load psf ../common/system.psf
mol addfile rdrp-remtp-equil.coor
set sel [atomselect top all]
$sel writepdb equilibrated.pdb
mol delete all

package require topotools
mol new ../common/system.psf
mol addfile equilibrated.pdb
cd ../common/toppar
topo writegmxtop ../../equil2/structure.top [list par_all36m_prot.prm par_all36_cgenff.prm toppar_water_ions_namd.str remtp.prm] 
# change the target directory here!

quit
```

##### 1st round

```shell
f=rdrp-remtp-prod
mdconvert -o ${f}.xtc -t equilibrated.gro ../${f}.dcd 
echo 24 | gmx trjconv -f ${f}.xtc -s simulation.tpr -o ${f}_nojump.xtc -pbc nojump -n index.ndx
echo 16 24 | gmx trjconv -f ${f}_nojump.xtc -s simulation.tpr -o ${f}_fit.xtc -fit rot+trans -n index.ndx
rm ${f}.xtc ${f}_nojump.xtc
echo 16 2 | gmx rms -s simulation.tpr -n index.ndx -f ${f}_fit.xtc -m rmsd-lig.xpm -tu ns
mv rmsd.xvg rmsd-lig.xvg

rm \#*\#
echo 16 24 | gmx cluster -s ../simulation.tpr -n ../index.ndx -f ../${f}_fit.xtc -dm ../rmsd-lig.xpm \
-dist rmsd-distribution.xvg -o clusters.xpm -sz cluster-sizes.xvg -tr cluster-transitions.xpm \
-ntr cluster-transitions.xvg -clid cluster-id-over-time.xvg -cl clusters.pdb \
-cutoff 0.25 -method gromos
obabel -ipdb clusters.pdb -opdb -O c1-0.1-.pdb -m 1&>split.log  # not good
for f in *.pdb; do mv $f c1-0.1-$f; done
```

> tu is micro second?

visualize

```shell
xmgrace cluster-id-over-time.xvg
xmgrace cluster-sizes.xvg
pymol *.pdb
split_states cluster
save c01.pdb, *001
save c02.pdb, *002
align initial, *
# align all to initial
set cartoon_transparency, 0.6
bg_color white
```

```tcl
animate delete beg 0 end 0
animate write dcd prod.dcd sel [atomselect top "protein or resname LIG or resname MG"] waitfor all
```

##### 2nd round

```shell
# in cluster
echo -e "chain p & 16 & r ... \n name 26 pocket_bb \n q" | \
gmx make_ndx -f ../../common/system.pdb -n index.ndx -o index_clus.ndx

f=rdrp-remtp-prod
echo 26 2 | gmx rms -s simulation.tpr -n index_clus.ndx -f ${f}_fit.xtc -m rmsd-lig_pocket.xpm -tu ns
mv rmsd.xvg rmsd-lig_pocket.xvg

mkdir clus-0.1-pocket && cd clus-0.1-pocket
rm \#*\#
echo 26 24 | gmx cluster -s ../simulation.tpr -n ../index_clus.ndx -f ../${f}_fit.xtc -dm ../rmsd-lig_pocket.xpm \
-dist rmsd-distribution.xvg -o clusters.xpm -sz cluster-sizes.xvg -tr cluster-transitions.xpm \
-ntr cluster-transitions.xvg -clid cluster-id-over-time.xvg -cl clusters.pdb \
-cutoff 0.1 -method gromos

obabel -ipdb clusters.pdb -opdb -O c1-0.1-po-.pdb -m # 1&>split.log
mkdir clusters
for f in c1*.pdb; do mv $f clusters/$f; done
```

> using system.pdb, thus we can select chain

```
set sele ""
set sel [atomselect top "protein and name CA and (same residue as within 10 of (resname LIG))"]
foreach resid [$sel get resid] {
    append sele  " $resid"
}
puts $sele
```

##### more about PBC processing

https://manual.gromacs.org/documentation/current/onlinehelp/gmx-trjconv.html

- Our goal is just making what we are interested in together...once that is done, fit rot+trans may not be necessary...

- if the system interacts with its image, then this trajectory is WRONG.

- [GROMACS轨迹周期性边界条件的处理](https://blog.sciencenet.cn/blog-548663-981600.html)：`-pbc whole`, `-pbc atom -center`. not useful all the time

- if gmx does not work, just try VMD first.

- when trjconv fitting, 
  `Masses were requested, but for some atom(s) masses could not be found in the database. Use a tpr file as input, if possible, or add these atoms to the mass database.`
  that's why I must use .tpr (Mg2+!)
  by default it weights by mass

  Also,
  pbc mol puts the center of mass of molecules in the box, and requires a run input file to be supplied with -s.

- 

some suggests

> If the .tpr file is good, i.e. has everything assembled the way you want, then the first step is `trjconv -pbc nojump`. That will make sure that nothing gets split over PBC. Then center the protein in the box (`trjconv -center`), and subsequently put all molecules in the box (`-pbc mol -ur compact/rect`).

I've tried

```shell
# problematic
f=rdrp-remtp-prod
# pbc fixed
mdconvert -o ${f}_all.xtc -t equilibrated.gro prod.dcd
echo 24 | gmx trjconv -f ${f}_all.xtc -s simulation.tpr -o ${f}_fit.xtc -n index.ndx
echo 16 2 | gmx rms -s simulation.tpr -n index.ndx -f ${f}_fit.xtc -m rmsd-lig.xpm -tu ns
mv rmsd.xvg rmsd-lig.xvg

# yq, should always work for simple protein-ligand
f=rdrp-remtp-prod
mdconvert -o ${f}.xtc -t equilibrated.gro ../${f}.dcd
echo 0 24 | gmx editconf -f equilibrated.gro -c -o dry.gro -n index.ndx  # for visualization
echo 24 | gmx trjconv -f ${f}.xtc -s simulation.tpr -o ${f}_pbcwhole.xtc -pbc whole -n index.ndx 
echo 24 | gmx trjconv -f ${f}_pbcwhole.xtc -s simulation.tpr -o ${f}_nojump.xtc -pbc nojump -n index.ndx
echo 24 | gmx trjconv -f ${f}_nojump.xtc -s simulation.tpr -o ${f}_pbcmol.xtc -pbc mol -ur compact -n index.ndx 
echo 16 24 | gmx trjconv -f ${f}_pbcmol.xtc -s simulation.tpr -o ${f}_fit.xtc -fit rot+trans -n index.ndx

source ../../../yq_pbc.sh
do_pbc ../../common/system.psf ../rdrp-remtp-prod.dcd
mdconvert -o ${f}.xtc -t equilibrated.gro wrapped.dcd 
echo 24 | gmx trjconv -f ${f}.xtc -s simulation.tpr -o ${f}_pbcwhole.xtc -pbc whole -n index.ndx
echo 16 24 | gmx trjconv -f ${f}_pbcwhole.xtc -s simulation.tpr -o ${f}_fit.xtc -fit rot+trans -n index.ndx
rm wrapped.dcd ${f}.xtc ${f}_pbcwhole.xtc 
echo 16 2 | gmx rms -s simulation.tpr -n index.ndx -f ${f}_fit.xtc -m rmsd-lig.xpm -tu ns
```

##### plotting the result

> https://docs.mdanalysis.org/1.0.0/documentation_pages/auxiliary/XVG.html MDAnalysis can also read xvg?

```python
from gromacs.fileformats.xvg import XVG
from matplotlib import font_manager
import matplotlib.pyplot as plt
import numpy as np
import re,os
import pandas as pd


def read_gmx_xvg(xvg_path):
    xvg_rmsd = XVG(xvg_path)
    data = xvg_rmsd.array.T
    return data


path = '/home/gxf1212/data/work/RdRp/9.12-temp/new-build/11.15-RemTP-site-MD/MD/new-md/clustering/1st/'
data = read_gmx_xvg(path+'2-0.1.xvg')
plot_clustering(data[:,1], 0.5)
# 0.5: ns per frame
```

where

```python
def plot_clustering(idxs, nsperframe, biggest=10):
    fig = plt.figure(figsize=(8,6))
    ax = fig.add_subplot(111)
    labels = ax.get_xticklabels() + ax.get_yticklabels()
    [label.set_fontname('Arial') for label in labels]
    [label.set_fontsize(14) for label in labels]
    [label.set_fontweight('roman') for label in labels]
    font_la = {'family': 'Microsoft YaHei', 'weight': 'demibold', 'size': 16}
    plt.xlabel('time(ns)', fontdict=font_la)
    plt.ylabel('cluster id #', fontdict=font_la)
    biggest = min(biggest, int(max(idxs)))
    plt.yticks(np.arange(biggest+1))

    x = np.arange(len(idxs))*nsperframe
    y = [min(i, biggest) for i in idxs]
    plt.scatter(x, y, s=1)
    plt.show()
    print("The number of clusters: {0:d}".format(len(set(idxs))))
    print("The biggest cluster lasted for {0:.1f} ns ({1:.1%})".format(np.sum(idxs==1)*nsperframe, np.sum(idxs==1)/len(idxs)))
    print("The second  cluster lasted for {0:.1f} ns ({1:.1%})".format(np.sum(idxs==2)*nsperframe, np.sum(idxs==2)/len(idxs)))
    print("The unclustered frames (>=no. {2:d}) occupies {0:.1f} ns or {1:.1%}".format(np.sum(idxs>=biggest)*nsperframe, np.sum(idxs>=biggest)/len(idxs), biggest))
```

#### in VMD

gmx其实正常make index还好，但是涉及RNA、segment之类的就恶心，序号乱了、难以选择。用完trjconv可以转回dcd用vmd聚类。gmx还不告诉我聚类的是哪一帧。以后尽量还是vmd。

cmd: http://www-s.ks.uiuc.edu/Research/vmd/vmd-1.9.4/ug/node139.html

- [QT algorithm](https://sites.google.com/site/dataclusteringalgorithms/quality-threshold-clustering-algorithm-1). similar to `gmx cluster -method gromos` ?
- [a well-wrapped code](https://github.com/anjibabuIITK/CLUSTER-ANALYSIS-USING-VMD-TCL/blob/master/clustering.tcl)

```tcl
# after loading trajectory and aligning protein backbone
# modified from: http://github.com/anjibabuIITK/CLUSTER-ANALYSIS-USING-VMD-TCL
set number 9
set rcutoff 1
set step_size 1
set nframes [molinfo top get numframes]
set inf 0
set nf $nframes
set totframes [expr $nf - 1 ]
set selA [atomselect top "resname LIG"]
set lists [measure cluster $selA num $number cutoff $rcutoff first $inf last $totframes step $step_size distfunc rmsd weight mass]
set file [open "clus_result.dat" w]
for {set i 1} {$i <= [llength $lists]} {incr i} {
    set lst [lindex $lists [expr $i-1]]
    puts $file [format "cluster %d: %d" $i [llength $lst]]
    puts $file $lst
    puts $file ""
}
close $file

set c01 [lindex [lindex $lists 0] 0]
set sel [atomselect top all frame $c01]
set real_frame [expr $c01+1]
$sel writepdb c01_${real_frame}.pdb
puts [format "write the centroid of 1st cluster: frame %d" $real_frame]

set c02 [lindex [lindex $lists 1] 0]
set sel [atomselect top all frame $c02]
set real_frame [expr $c02+1]
$sel writepdb c02_${real_frame}.pdb
puts [format "write the centroid of 2nd cluster: frame %d" $real_frame]
```

and plot as done in gmx

```python
def read_vmd_clus_result(file):
    data = []
    with open(file, 'r') as f:
        while f.readline().strip().startswith('cluster'):
            line = f.readline().strip()
            data.append([int(fr) for fr in line.split()])
            _ = f.readline()  # empty
    return data


path = 'xxx/clus_result.dat'
data = read_vmd_clus_result(path)

id_with_time = []
for i in range(len(data)):
    cl = data[i]
    id_with_time += [(fr, i+1) for fr in cl]
id_with_time.sort(key=lambda x:x[0])
plot_clustering(np.array(id_with_time)[:,1], 0.5)
```

> other programs: https://readthedocs.org/projects/bitclust/downloads/pdf/latest/
>
> a plugin: https://github.com/luisico/clustering

#### pocket alignment

after getting a centroid aligning protein backbone

```tcl
# output for gmx
set sele ""
set sel [atomselect top "protein and name CA and (same residue as within 10 of (resname LIG))"]
foreach resid [$sel get resid] {
    append sele  " $resid"
}
puts $sele
# output for vmd
set sele "segname PRO and ("
set sel [atomselect top "protein and name CA and (same residue as within 10 of (resname LIG))"]
foreach resid [$sel get resid] {
    append sele  "residue $resid or "
}
puts $sele
# output for pymol
set sele ""
set sel [atomselect top "protein and name CA and (same residue as within 10 of (resname LIG))"]
foreach resid [$sel get resid] {
    append sele  "$resid+"
}
puts $sele
```





### Analysis of binding mode?

Here not that much is required...

## GAFF (not using)

### building steps

#### prepare for protein

> https://docs.bioexcel.eu/2020_06_09_online_ambertools4cp2k/03-prepPDB/index.html

problem: atom types varies between CHARMM and Amber. Maybe protonation state is also a problem

```shell
pdb4amber rdrp.pdb -o rdrp_p.pdb -y
# -y: no hydrogen
grep 'CD  ILE' -rl rdrp_p.pdb | xargs sed -i 's/CD  ILE/CD1 ILE/g'
# OT1, OT2 to OXT
```

> FATAL:  Atom .R<ILE 772>.A<CD 20> does not have a type.
>
> FATAL:  Atom .R<CPHE 804>.A<OT1 22> does not have a type.

compute molecular weight

- [pymol](https://kpwu.wordpress.com/2013/04/06/pymol-compute-molecular-weight/): Simple click “A” right next to the (select) object, and go down to “compute”, then choose “molecular weight” to calculate MW of object either “explicit” or “**with missing hydrogens**” mode. The missing hydrogens mode means PyMOL automatically add missed protons of object and calculate the proton-added MW.
- pdb2gmx will also output mw

> rdrp.pdb: pymol, 91.9756253 kD

> failed
>
> ```shell
> grep 'HSE' -rl rdrp.pdb | xargs sed -i 's/ HSE / HIS /g'
> echo 12 7 | gmx pdb2gmx -f rdrp.pdb -o rdrp_a.pdb -ignh
> # 99sb-ildn, no water
> rm *.itp *.top
> ```

#### ligand topology

##### re-investigate resp calculation

- http://sobereva.com/441  RESP拟合静电势电荷的原理以及在Multiwfn中的计算

  - 是通过最小二乘法最小化基于原子电荷计算的与基于波函数计算的静电势在这些拟合点上的偏差得到，并同时通过拉格朗日乘子法约束原子电荷加和等于体系净电荷
  - 拟合静电势最常见、最知名的就是Merz-Kollman (MK)和CHELPG这两种。MK和CHELPG结果通常差异不太大
  - 柔性分子有很多不同构象，动力学模拟过程中构象经常发生变化，而拟合静电势电荷计算结果又对构象很敏感。

- http://sobereva.com/531 RESP2原子电荷的思想以及在Multiwfn中的计算

  - q_RESP2(0.5) = 0.5*q_gas + 0.5*q_solv
    其中q_gas是气相下的RESP电荷，q_solv是用PCM模型表现实际溶剂时的RESP电荷

  - 基于结构文件傻瓜式一键调用Gaussian和Multiwfn计算RESP2电荷

    对中性单重态分子计算用于水溶剂MD模拟的RESP2(0.5)电荷：./RESP2.sh H2O.pdb

  - 此脚本用的计算级别只要打开.sh文件一看便知

- 

examples\RESP\RESP2.sh. modify the script:

- g16
- params, like nproc

```shell
bash ./RESP2.sh remtp.pdb -4
bash ./restart.sh remtp.pdb -4
```





##### old method

```shell
conda activate AmberTools21
f=remtp
antechamber -i ${f}.pdb -fi pdb -o ${f}.gjf -fo gcrt -pf y \
-gm "%mem=4096MB" -gn "%nproc=4" -ch ${f} -nc -4 \
-gk "#B3LYP/6-311G** em=GD3BJ scrf=solvent=water SCF=tight \
iop(6/33=2,6/42=6,6/50=1) pop=CHELPG" -ge ${f}_resp.gesp -gv 1 -at gaff
g16 ${f}.gjf
antechamber -i ${f}_resp.gesp -fi gesp -o ${f}.mol2 -fo mol2 -pf y -c resp
parmchk2 -i ${f}.mol2 -f mol2 -o ${f}.frcmod
align_gauss `pwd`/ remtp h

antechamber -i ${f}.pdb -fi pdb -o ${f}.mol2 -fo mol2 -at gaff -c bcc -rn MOL -nc -4
parmchk2 -i ${f}.mol2 -f mol2 -o ${f}.frcmod
```

#### combine

```shell
conda activate AmberTools21
tleap
source leaprc.ff99SBildn
pro = loadpdb rdrp_p.pdb
check pro 
source leaprc.gaff
loadamberparams remtp.frcmod
lig = loadmol2 remtp_aligned.mol2
check lig
source leaprc.water.tip3p
mg = loadpdb mg.pdb
com = combine {pro lig mg}
solvatebox com TIP3PBOX 11.5
# 0.1 M ion
charge com
addIons2 com Cl- 41 Na+ 53

saveamberparm com com.prmtop com.inpcrd
quit

leaprc.protein.ff14SB
```

#### similar processes

```shell
conda activate Acpype
acpype -p com.prmtop -x com.inpcrd -d -c user
mv com_GMX.gro com.gro
mv com_GMX.top com.top
mv em.mdp em_test.mdp
mv md.mdp md_test.mdp
grep "WAT" -rl ./com.gro | xargs sed -i "s/WAT/SOL/g" 
grep "WAT" -rl ./com.top | xargs sed -i "s/WAT/SOL/g"
grep " IP " -rl ./com.top | xargs sed -i "s/ IP / Na+ /g" 
grep " IM " -rl ./com.top | xargs sed -i "s/ IM / Cl- /g" 
gmx grompp -f em1.mdp -c com.gro -r com.gro -p com.top -o em.tpr -maxwarn 1 
gmx mdrun -v -deffnm em
gmx grompp -f em2.mdp -c em.gro -r em.gro -p com.top -o em2.tpr -maxwarn 1 
gmx mdrun -v -deffnm em2
gmx make_ndx -f em2.gro -o index.ndx
gmx grompp -f nvt.mdp -c em.gro -r em.gro -n index.ndx -p com.top -o nvt.tpr
gmx mdrun -deffnm nvt
gmx grompp -f npt.mdp -c nvt.gro -r nvt.gro -n index.ndx -t nvt.cpt -p com.top -o npt.tpr
gmx mdrun -deffnm npt
gmx grompp -f md.mdp -c npt.gro -r npt.gro -n index.ndx -t npt.cpt -p com.top -o final.tpr

```





# Stage 2 Protocol: FEP

## FEP (relative) building systems

### Fundamentals

please see FEbuilder document....

NAMD supports such a traditional dual-topology alchemical setup, which may be applied to perform both absolute and relative FEP calculation

VMD does not yet provide a hybrid topology setup tool, and CHARMM-GUI is testing a beta version (that is not yet available online) to automatically generate all input files for NAMD. For the time being, users can utilize an alternative hybrid structure preparation tool, such as FESetup or AmberTools, and then manually convert the generated CHARMM-formatted input files into a format that can be read by NAMD.

readings

- https://www.cresset-group.com/about/news/fep-drug-discovery-toolbox/
  
  - FEP可能稳定不动，但如果pose变了，是应该动的
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

> [!NOTES]
>
> This part will be integrated into FEbuilder documentation later....

#### A brief flow

- get stable complex structure, modify the ligand properly to obtain the other one

  > 可以不用GaussView编辑啊，直接在charmm-gui上。。但是tnd给我把手性搞错。。。

- get `.pdb`, `.rtf` and `.prm` files from CHARMM-GUI Ligand Reader & Modeller 
  
  - no AutoPSF required, retaining coordinates and names (same for ligand A and B)

  > deprecated: get `.mol2`, `.rtf` and `.prm` (in one single `.str`) files from [CGenFF](https://cgenff.umaryland.edu/) or MolFacture in VMD 
  >
  
- run the make_hybrid code to obtain the `hybrid.rtf` and `hybrid.pdb` file (with atoms renamed and B value assigned)
  
  - see below

  > for MTP: Now: just stick to the paper: the CH2 also considered as "common atoms". we only add a neutral hydrogen atom
  
- run `merge-fep.tcl` to build the ligand and complex with VMD. do include `top_all36_cgenff.rtf`!

- solvate and ionize them. a new version of `sol-ion-fep.tcl` is created to make sure the systems have the same size (ligand more atoms?)

- run the 2nd script `edit_FEP.py` to edit the beta field in the .pdb file

- run the 3rd script `edit_psf.py` to remove unparametrized angles/dihedrals, etc.

  - regenerate angles dihedrals is not useful

  - auto-detect triple bonds is ok

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

#### Basic thoughts of make_hybrid.py script

- data structure
  - The molecule is stored in a `Ligand object`. The core is `atomdict`. the key is the original atom name, the value contains all info, like FF atom type, coordinate (read in the .rtf and .pdb file together).
  - All other properties are stored by tuples of atom **keys** (atom names initially, **+tag** in hybrid) (and other data), so that when we change the atom name to write in hybrid molecules, we just index through the dict (by GetXXX functions)
- flow
  - read files
    - you will alway need to make sure that your topology and coordinate info match in every line: 1) in order; 2) remember to adjust which line to start reading.
  - common structure: use RDkit package, get it from two .pdb files, find the corresponding atom indices in each molecule
  - verification: position and charge nearly the same, or removed from common
  - modification: add A, B to atom name. C for common atoms
  - combination: a `Ligand` object 'hybrid'
    - atomdict, key is name+tag, same value, count common atoms point to the same `Atom` object
    - thus we can use **set** operations to merge bonds, etc.
  - output: just write formatted strings into .rtf and .pdb files
- 

如果所连接的mother atom type不同，就要手动分开所连的H，即使H的type不同

否则：FATAL ERROR: Atom xx has bad hydrogen group size. Check for duplicate bonds.

Hydrogen groups are the base unit for domain decomposition in NAMD. They are determined almost exclusively by bond connectivity and this is usually where issues arise.

Forces are applied only between non-bonded, non-hydrogen pairs of atoms. When using rigid bonds, forces are applied to the center of mass of hydrogen groups.



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

#### Rescuing the parameters

extensive trials on dihedrals

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
> 事后回答：namd3已经自动忽略互相看不见的bonded parameters了，只是warning而已

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
5. edit .pdb file: assign beta values, and it's done

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

### merge

22.10.16, FEbuilder generate script

```tcl
# usage: vmd -dispdev text -e merge-and-solvate.tcl > vmd.log

package require psfgen
psfcontext reset
# ff
topology ./toppar_water_ions_namd.str
topology ./top_all36_prot.rtf
topology ./top_all36_cgenff.rtf
topology hybrid.rtf

# load hybrid
segment LIG {pdb hybrid.pdb}
coordpdb hybrid.pdb LIG
# other pdb
segment MG {pdb mg.pdb}
coordpdb mg.pdb MG
# write ligand
writepdb ligand-merged.pdb
writepsf ligand-merged.psf

# load protein
pdbalias residue HIS HSE
segment PRO {pdb rdrp.pdb}
coordpdb rdrp.pdb PRO
guesscoord
# write complex
writepdb complex-merged.pdb
writepsf complex-merged.psf
# solvation and ionization
package require solvate
package require autoionize
# ionize complex
mol delete all
mol load psf complex-merged.psf pdb complex-merged.pdb
solvate complex-merged.psf complex-merged.pdb -t 11.5 -o complex-solvated
mol delete all
autoionize -psf complex-solvated.psf -pdb complex-solvated.pdb -sc 0.15 -o complex
set everyone [atomselect top all]
set minmax [measure minmax $everyone]

# identical volume, but a little difference in number of atoms
mol delete all
mol load psf ligand-merged.psf pdb ligand-merged.pdb
solvate ligand-merged.psf ligand-merged.pdb -minmax $minmax -o ligand-solvated
mol delete all
autoionize -psf ligand-solvated.psf -pdb ligand-solvated.pdb -sc 0.15 -o ligand

exit
```

### other

https://molvs.readthedocs.io/en/latest/index.html  Molecule Validation and Standardization, maybe correct the smiles, process small molecules



### QM-optimized parameters (tbc)

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
>    > 
>    > > ```
>    > > resname END
>    > > ```
>    > > 
>    > > and view with coloring method 'Beta'
> 
> 3. build the dual topology file
> 
> 3. 
> 
> 4. run the simulation
> 
> 5. 
> 
> > failed
> 
> > ```shell
> > awk -F " " '{if ($18==END) $62= 1.00}' complex.pdb > complex.fep
> > grep "END" -rl complex.fep | xargs sed -i "s/ 0.00     / 1.00     /g"
> > ```
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
> 
> #### Absolute
> 
> easier, build as before until making FEP

#### CHARMM-GUI

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
> 
> 2. upload your complex file (containing the starting ligand)
> 
> 3. choose chain (all)
> 
> 4. build topology, choosing a file for the ligand
> 
> 5. solvate. choose box size and ion conc
> 
> 6. Generate grid information for PME FFT automatically (default)
> 
> 7. select Ligand Molecule for Free Energy Calculation
> 
> 8. PBC (default)
> 
> 9. upload ligand
> 
> 10. select program, force field, **check ligand**; ion for the ligand, distance from edge, 310K, etc.
> 
> 11. Relative: clustering, choose molecule pairs
> 
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
> > !TIP
> 
> > may use `ligandrm.pdb` or `drawing3D.mol2`,  etc. when building. They don't align? just moved somewhat.
> > 
> > When choosing a structural file (instead of using RCSB .pdb (but maybe that only provides topology?)) for the ligand's topology, use`drawing3D.mol2` 
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
> > !TIP
> 
> > Conclusion: because the processing moves the ligands, it's fine to use either ligandrm or drawing_3D...
> > 
> > you may check the structure after equilibration
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
>   - Relative: Use this option only when the scaffold coordinate of a pair of ligands are **identical.**
>   
>   Absolute just cares 'in position', Relative should make sure 'same position'.
> 
> - result
>   
>   - Absolute: one folder for one ligand
>   - Relative: one for a pair of FEP molecule
> 
> to prepare multiple ligands. support multiple files and one file containing ligands.
> 
> #### result
> 
> - where: go to `namd`, 1,2,... (2-3, ...) means different ligands
> - FEP: all of ligand INI disappear, all END appear, no common searching...

#### FEPrepare

> - https://feprepare.vi-seem.eu/indexlpg.php  a server
>   - https://www.zhihu.com/zvideo/1356250979265093632  https://www.zhihu.com/people/qutesun/zvideos
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

#### From Amber+Gaussian

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
> ```

#### Paratool in VMD

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

#### Taking another set of starting coordinates

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
> FESetup for NAMD
> 
> no tutorial, no option manual, only code...
> 
> #### PyAutoFEP
> 
> https://github.com/luancarvalhomartins/PyAutoFEP
> 
> Automated, Streamlined, and Accurate Absolute Binding Free-Energy Calculations
> 
> #### PMX
> 
> [another tool: pmx](http://pmx.mpibpc.mpg.de/sardinia2018_tutorial2/index.html)
> 
> http://pmx.mpibpc.mpg.de/webserver.html  can perform protein and DNA mutation
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

## FEP running with NAMD

### Configurations

reference:

- FEP tutorial: equil, shift
- protein-ligand: only production
- Kevin: GPU

order: make lig-equil, modify into com-equil/lig-prod-forward, then into backward

#### ligand paramters

1. It's found that the aromatic ring cannot retain its planar structure, though in pymol hybrid.pdb still looks fine (though ligand.pdb Ar dotted bonds is gone). 因为后面对芳环只有参数的限制，程序不知道关于芳香键的标记

   ![remtp-dihedral](https://cdn.jsdelivr.net/gh/gxf1212/notes@master/research/Previous-projects/FYP-notes.assets/remtp-dihedral.jpg)

   31 17 19 34: CG3C50 CG2R57 NG2RC0 CG2RC0 (purple)

   31 17 36 18: CG3C50 CG2R57 CG2R51 CG2R51 (green)

   34 19 24 32: CG2RC0 NG2RC0 NG2R62 CG2R64 (orange)

   18 34 35 22: CG2R51 CG2RC0 CG2R64 NG2R62 (pink)

   35 22 32 24: CG2R64 NG2R62 CG2R64 NG2R62 (blue)

   coplanar four atoms. there must be at least two common atoms to make two dihedrals coplanar

   another thing is to control rotations of the groups, i.e. cis-Ar, phosphate group contacting hydrogens....

   > these modifications are made before the first equilibration, before 22.5.1

   cis might be fine (25 31 17 36)? no!

   If I don't apply even bigger $k$ values, they are still a bit away from planar...!!

2. 1 4 21 23: PG1 OG303 CG321 CG3C51

   ![remtp-dihedral](https://cdn.jsdelivr.net/gh/gxf1212/notes@master/research/Previous-projects/FYP-notes.assets/remtp-dihedral2.jpg) 

   > ./par_all36_cgenff.prm:CG3C51 CG321  OG303  PG1        0.6000  1   180.00 ! B5SP carbocyclic sugars reset to EP_2 phospho-ser/thr
   >
   > ./par_all36_cgenff.prm:CG3C51 CG321  OG303  PG1        0.6500  2     0.00 ! B5SP carbocyclic sugars reset to EP_2 phospho-ser/thr
   >
   > ./par_all36_cgenff.prm:CG3C51 CG321  OG303  PG1        0.0500  3     0.00 ! B5SP carbocyclic sugars reset to EP_2 phospho-ser/thr
   >
   > optimal angle: 0

   I only keep

   ```
   CG3C51 CG321  OG303  PG1        0.6500  1     0.00     ! manually added, in prod-dihe
   ```

   Then the minimum point is just 180 degree. Suitable slope too.

   but no! when k=9.65 that dihedral still moves slightly away (in prod-restrict)

4. to prevent the oxygen from folding back. actually 21-23 is nearly perpendicular to the ribose "plane"

   <img src="https://cdn.jsdelivr.net/gh/gxf1212/notes@master/research/Previous-projects/FYP-notes.assets/remtp-fold-back.png" alt="remtp-foldback" style="zoom:50%;" />

   21 23 25 31: CG321 CG3C51 OG3C51 CG3C50

   > ./hybrid2.prm:CG321  CG3C51 OG3C51 CG3C50     0.3000  3     0.00 ! /tmp/php , from CG321 CG3C51 OG3C51 CG3C51, penalty= 0.8
   >
   > optimal angle: -60, 60, 180
   >
   > initial: 137.44635
   >
   > fine
   >
   > - prod-dihe/ligand1/c03: 157.66055
   > - ligand2/dihe-fine1: 141.65534
   > - ligand2/fine1: 151.13087
   >
   > failed
   >
   > - complex2/dihe-failed1-lig: 86.83992
   > - complex2/failed1-lig: 99.32578
   > - prod-dihe/ligand1/c04: 83.83505

   21 23 26 29: CG321 CG3C51 CG3C51 CG3C51

   > ./par_all36_cgenff.prm:CG321  CG3C51 CG3C51 CG3C51     **0.1900**  3     0.00 ! alkane, 4/98, yin and mackerell, thf, viv
   >
   > optimal: -180, -60, 60, 180
   >
   > initial: -153.51054
   >
   > fine
   >
   > - prod-dihe/ligand1/c03: -166.96539
   > - ligand2/dihe-fine1: -140.73695
   > - ligand2/fine1: -161.30931
   >
   > failed
   >
   > - complex2/dihe-failed1-lig: -93.94408
   > - complex2/failed1-lig: -93.40841
   > - prod-dihe/ligand1/c04: -84.28765

   ```
   CG321  CG3C51 OG3C51 CG3C50     0.9000  1     0.00     ! manually added
   CG321  CG3C51 CG3C51 CG3C51     0.5700  1     0.00     ! manually added
   ```

   Though that does not restrain the dihedral in the optimal, it works fine.   

4. 25 31 17 36: OG3C51 CG3C50 CG2R57 CG2R51

   29 31 17 36: CG3C51 CG3C50 CG2R57 CG2R51

   ![remtp-dihedral](https://cdn.jsdelivr.net/gh/gxf1212/notes@master/research/Previous-projects/FYP-notes.assets/remtp-dihedral3.jpg) 
   
   > in hybrid2.prm
   >
   > CG2R51 CG2R57 CG3C50 CG3C51     0.3500  3   180.00 ! /tmp/php , from CG2R51 CG2R51 CG3C51 CG3C51, penalty= 21
   >
   > optimal: -60, 60, 180
   >
   > CG2R51 CG2R57 CG3C50 OG3C51     0.2800  1   180.00 ! /tmp/php , from CG2R51 CG2R51 CG3C52 OG3C51, penalty= 25
   >
   > CG2R51 CG2R57 CG3C50 OG3C51     0.9800  2   180.00 ! /tmp/php , from CG2R51 CG2R51 CG3C52 OG3C51, penalty= 25
   >
   > CG2R51 CG2R57 CG3C50 OG3C51     1.7500  3   180.00 ! /tmp/php , from CG2R51 CG2R51 CG3C52 OG3C51, penalty= 25
   >
   > optimal: 0; sub-optimal: $\pm$125
   
   > the two dihedrals
   >
   > in ori (c01 not so ideal): 50.47070, -69.64504
   >
   > c01: 81.9996 -109.7405
   >
   > equil2/ligand/fine3: 65.38997 -45.18305
   >
   > equil2/ligand/fine1: 32.69268 -80.13612
   >
   > equil2/ligand/fine2: 32.31323 -84.86327
   >
   > equil/ligand/fine6:   49.75553 -66.17808
   >
   > equil/ligand/fine5:   47.29112 -66.99147
   >
   > try not to look like c01, almost 0 degree (but fits the parameters...)

   not changed now since it works ok in prod-window (not at its minimum, 0 degree)

   no, not ok. at its highest??
   
   > OG3C51 CG3C50 CG2R57 CG2R51

other

> stupid mistake: this is for 4 21 23 25: OG303 CG321 CG3C51 OG3C51
>
> > ./par_all36_cgenff.prm:OG303  CG321  CG3C51 OG3C51     3.4000  1   180.00 ! NA, sugar
> >
> > optimal: 0 degree
>
> fine
>
> - prod-dihe/ligand1/c03: -45.03162
> - ligand2/dihe-fine1: -45.09206
>
> failed
>
> - complex2/dihe-failed1-lig: -34.30922
> - complex2/failed1-lig: -53.21200
> - prod-dihe/ligand1/c04: -44.75677

#### simualtion params

```tcl
timestep                1.0
dcdfreq                 10000        ;# not too large!

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
langevinPistonDecay     50;              # not too large!
langevinPistonTemp      $temp
StrainRate              0.0 0.0 0.0

# CUT-OFFS
switching                on
switchdist               8.0            # not too large!
cutoff                   9.0
pairlistdist            10.0
```

> - 频繁的输出限制了性能。最重要的是，outputEnergies（在 NAMD 2.x 中默认为 1）应该设置得更高。
> - Because an unnecessarily high damping constant can significantly slow the system’s dynamics, one should always find the minimum langevinDamping coefficient sufficient to maintain the temperature. A value of 1.0 is often a good starting point.

debug

- **`fullElectFrequency `** number of timesteps between full electrostatic evaluations 
  **Acceptable Values:** positive integer factor of `stepspercycle`
  **Default Value:** `nonbondedFreq`
  **Description:** This parameter specifies the number of timesteps between each full electrostatics evaluation. It is recommended that `fullElectFrequency` be chosen so that the product of `fullElectFrequency` and `timestep` does not exceed 4.0 unless `rigidBonds all` or `molly on` is specified, in which case the upper limit is perhaps doubled.

  https://www.ks.uiuc.edu/Research/namd/2.14/ug/node37.html

  fepout frequency should be divisible by**`fullElectFrequency `**, or it outputs strange values like 

  ```
  #            STEP                 Elec                            vdW                    dE           dE_avg         Temp             dG
  #                           l             l+dl             l            l+dl         E(l+dl)-E(l)
  #NEW FEP WINDOW: LAMBDA SET TO 0 LAMBDA2 1e-05
  FepEnergy:      5   -2714273.9751  -2714273.9751     43874.7888     43874.7886        -0.0002        -0.0009       309.7335        -0.0009
  FepEnergy:     10    -570204.1720   -570204.1724     44091.0213     44091.0210        -0.0007        -0.0009       310.7679        -0.0009
  FepEnergy:     15   -2715308.6708  -2715308.6709     44325.5930     44325.5927        -0.0005        -0.0009       311.2865        -0.0009
  FepEnergy:     20    -570867.6301   -570867.6303     44489.5360     44489.5357        -0.0005        -0.0009       311.4340        -0.0009
  FepEnergy:     25   -2714179.2297  -2714179.2298     43204.0980     43204.0977        -0.0004        -0.0009       311.2577        -0.0009
  FepEnergy:     30    -570252.3523   -570252.3528     43980.1734     43980.1732        -0.0007        -0.0009       311.2319        -0.0009
  FepEnergy:     35   -2714092.7010  -2714092.7011     43537.0497     43537.0495        -0.0003        -0.0009       310.0326        -0.0009
  ```

  although the energy difference is similar

- aaa



#### alch parameters

https://www.ks.uiuc.edu/Research/namd/2.13/ug/node61.html

recommend

```shell
alchVdwLambdaEnd        1.0
alchElecLambdaStart     0.1        # so early
alchVdWShiftCoeff       1.0
alchOutFreq             1000       # should be small
alchDecouple            on
```

> ```
> alchVdWShiftCoeff       6.0
> alchDecouple            off        # our ligand is charged..
> ```

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
    bincoordinates         $outputbase-prod-forward.coor
    binvelocities        $outputbase-prod-forward.vel
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
    bincoordinates         $outputbase-prod-forward.coor
    binvelocities        $outputbase-prod-forward.vel
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

```shell
grep "Running FEP window" ./*.log 
```

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
rm *merged* *solvated* *psf complex.pdb ligand.pdb
# common
vmd -dispdev text -e measure-fep.tcl -args ligand # complex
# equil
namd3 +p4 fep-lig-equil > fep-lig-equil.log  # +auto-provision +idlepoll
# may go to analysis and check?
vmd ../common/system.psf -pdb ../common/system.pdb -dcd rdrp-atp-equil.dcd
```

**MAKE SURE WE MEASURED PBC BOX**!!! I don't know if the result is totally unreliable (pbc wrap may save the visualization) but we'd better don't do this (the PBC settings may cannot be changed later (.xst?))

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

conda activate pymol
pymol *.pdb ../../../c01-hyb.pdb
import psico.mcsalign
mcsalign fine2, c01-hyb
# align_ligand `pwd`/*.pdb `pwd`/../../../c01-hyb.pdb

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

- 



## FEP results

> The relative binding free energy (ΔΔG) of ATP was found to be −4.88 ± 0.62 kcal/mol, while that of RemTP was −7.68 ± 0.57 kcal/mol

> 4.25: see mail list



### Free energy analysis

#### ParseFEP

##### basics

see tutorial-FEP for basic usage.

data explained https://www.ks.uiuc.edu/Research/namd/2.14/ug/node66.html

```shell
# parsefep -forward ../*forward-all*.fepout -backward ../*backward-all*.fepout -gc 0 -bar
# now we must use GUI since problem occurs in 'display'
rm file* && bash grace.summary.exec

exit
rm file* && plotfep
cd ../../ligand3/
mkdir fepout && cd fepout
vmd
```

adjusting

https://www.ks.uiuc.edu/Research/namd/mailing_list/namd-l.2018-2019/0204.html
https://www.ks.uiuc.edu/Research/namd/mailing_list/namd-l.2013-2014/0568.html

> ```shell
> # plot
> xmgrace -pexec arrange (3,1,0.10,0.40,0.20,OFF,OFF,OFF) -pexec with string ;
>         	                         string on ;
>         	                         string g0 ;
>         	                         string loctype view ;
>         	                         string 0.030, 0.950 ;
>         	                         string char size 1.6 ;
>         	                         string def "\f{Helvetica-Bold}ParseFEP\f{Helvetica}: Summary "  -graph 0 -block temp.ParseFEP.log -bxy 1:3 -pexec xaxis ticklabel on ;
>                                                          xaxis tick major 0.1 ; 
>                                                          xaxis tick minor 0.02 ;
>                                                          xaxis ticklabel format decimal ; 
>                                                          xaxis ticklabel prec 1 ; 
>                                                          xaxis ticklabel font "Helvetica" ;
>                                                          xaxis ticklabel char size 0.8 ;
>                                                          xaxis label char size 1.2 ;
>                                                          xaxis label place spec ;
>                                                          xaxis label place  0.00,0.07 ;
>                                                          xaxis label "\f{Symbol}l" ;
>                                                          yaxis label char size 1.2 ;
>                                                          yaxis label place spec ;
>                                                          yaxis label place  0.00,-1.15 ;
>                                                          yaxis label  "\r{180}\f{Symbol}D\1G\0\f{Helvetica} (kcal/mol)" ;
>                                                          yaxis ticklabel format decimal ; 
>                                                          yaxis ticklabel prec 3 ; 
>                                                          yaxis ticklabel font "Helvetica" ;
>                                                          yaxis ticklabel char size 0.8 -pexec kill g1 -pexec kill g2 -hardcopy -printfile summary.png -hdevice PNG
> ```
>



- For unidirectional FEP calculations, ParseFEP provides a graphical representation of the underlying probability distribution (black), the Boltzmann weight (red), and the product of the two (green). 

  ![parsefep-probability.1](https://cdn.jsdelivr.net/gh/gxf1212/notes@master/research/Previous-projects/FYP-notes.assets/parsefep-probability.1.png)

- For bidirectional FEP calculations, ParseFEP displays the probability distributions characterizing the forward and the backward transformations. These distibutions are shown for all the windows, or strata, found in the *alchOutFile* file. It is, therefore, assumed that the output files for the FEP calculations performed in the two directions contain the same number of intermediate states.



##### fepout file

**fullElectFrequency** number of timesteps between full electrostatic evaluations. It should be either divided by `stepspercycle` or the inverse. Or NAMD3 just stops.

It should also be either divided by `alchOutFreq` (.fepout) and `outputenergies` (.log) or the inverse. 

The values we are using is 

```tcl
stepspercycle           20
fullElectFrequency      1
alchOutFreq				5
```

2/10 is also ok

> https://www.ks.uiuc.edu/Research/namd/2.14/ug/node37.html



#### using alchemlyb

https://alchemlyb.readthedocs.io/

https://alchemtest.readthedocs.io/en/latest/install.html

steps

- [parsing namd](https://alchemlyb.readthedocs.io/en/latest/parsing/alchemlyb.parsing.namd.html?highlight=namd)
- combine forward and backward, substitute np.nan
- check convergence
- fit with a estimator
  - `delta_f_.loc[0.00, 1.00]`

alchemlyb这个包处理得十分粗糙，首先没有考虑分开vdW和coul，数据只读取了dE；然后是数据虽然能比较自由得组合，但是其他lambda下的能量根本不知道，留下了许多nan；最后是他给出那个forward和backward合并的方案，难道不是加了两份dE吗？虽然数值不太一样？感觉没道理

`from alchemlyb.parsing import namd`，28个window，每个window输出1000次，最终得到29029*29的DataFrame。29列是所有lambda point，每一组只有那个window两端点的lambda那一列有数据，最后一组（feplambda=1）没有data。data可能是转换后的dE

#### dG-λ plot

```python
def plot_both_dg_lambda(data, title=None, filename=None):
    # fig = plt.figure(figsize=(12,9))
    fig=plt.figure(figsize=(6,7.5))
    ax = fig.add_subplot(111)
    font_la = {'family': 'dengxian', 'weight': 'demibold', 'size': 14}  # Arial,dengxian,Microsoft YaHei
    # latex is supported. embrace your code with $
    plt.xlabel('$\mathbf{\lambda}$', fontdict=font_la, labelpad=20)
    plt.ylabel('$\Delta G$ (kcal/mol)', fontdict=font_la, labelpad=20)
    plt.xticks([])
    plt.yticks([])
    ax.spines['top'].set_visible(False)
    ax.spines['right'].set_visible(False)
    ax.spines['bottom'].set_visible(False)
    ax.spines['left'].set_visible(False)
    x = (data[0] + data[1]) / 2
    ax1 = fig.add_subplot(211)
    ax1.plot(x,data[2])
    ax1.plot(x, pd.Series([0] * len(x)), color='k')
    ax1.set_title('Each-step $\Delta G$')
    ax2 = fig.add_subplot(212)
    ax2.plot(x,data[3])
    ax2.set_title('Accumulated $\Delta G$')

    # plt.tight_layout()
    if title is not None:
        plt.title(title)
    if filename is not None:
        plt.savefig(filename+'.png')
    plt.show()

filename = 'xxx.fepout'
if not os.path.exists(filename+'.csv'):
    os.system('bash get_dg_lambda.sh '+filename)
data = pd.read_csv(filename+'.csv',header=None)
plot_both_dg_lambda(data, filename=os.path.join(os.path.dirname(filename),'dg_lambda'))
```

and

```shell
# bash get_dg_lambda.sh filename
fn=$1
awk '/^#Free energy/ {printf "%.5f,%.5f,%.9f,%.4f\n",$8,$9,$12,$19}' ${fn}.fepout > ${fn}.csv
```

#### Kevin's decomposition

```shell
bash mknamd_fep_decomp.sh *.fepout 10000 510000 500
bash mknamd_fep_decomp_convergence.sh *.fepout 10000 510000 500 10 > outdecomp/log.txt
```

This gives dA?

怎么把bound和unbound放在一起decomposition？


We may also just read from .fepout:

```shell
tail -n 1 *.fepout | cut -c 92- # the final number of the final line
for f in `ls | grep l`; do echo $f; cd $f && tail -n 1 *fepout | cut -c 92- && cd ..; done
```

This gives dG. ParseFEP only gives dA if only forward is provided.

but why don't we use BAR? We cannot presume that the binding pocket is favorable for the end-state ligand. We should have equilibrated the end state (MDS) before going on. Plus, we should have started every window from the same equilibrated structure (as done in gmx). In namd starting from the previous window is to minimize the error and just acceptable.



### Trajectory analysis

#### visualization in VMD

22.11.7 update: a recent VMD script that does everything

> cannot execute by vmd -dispdev ... (when 这些抠出来的命令 was added)

##### overall

```tcl
# vmd
# source ../../vis_traj.tcl 
# under prod
# resname HYB
# don't remember to update selection!!

# set path complex1
set path ligand3

set sys [string range ${path} 0 end-1]
mol new ../common/${sys}-fep.psf type psf
mol addfile ./${path}/${sys}-prod-forward.dcd type dcd waitfor all

display projection Orthographic
# display axes off
color Display {Background} white
label textthickness 2.5
set numframes [molinfo top get numframes]

# make representation
mol delrep 0 top
mol representation NewCartoon 0.300000 10.000000 4.100000 0
mol color Beta
# mol color Structure
mol selection {protein}
mol material AOShiny
# mol material Transparent
mol addrep top

# add rep after setting up
mol representation Licorice 0.300000 12.000000 12.000000
mol color Type
mol selection {resname HYB}
mol material Opaque
mol addrep top
# mol drawframes top 0 {0:10:559}

mol representation VDW 1.000000 12.000000
mol color Type
mol selection {resname MG}
mol material Opaque
mol addrep top

mol representation CPK 0.200000
mol color Type
# mol selection {protein and residue 436 to 443 or residue 567 or residue 721}
# mol selection {(within 5 of (resname HYB)) and (not water)}
mol selection {(protein or water) and (same residue as within 5 of (residue LIG or segname MG))}
mol material Opaque
mol addrep top
# update selection every frame
mol selupdate 3 top 1
mol colupdate 3 top 1
# 3 means no.3 rep; 1 means True

## from rmsdtt.tcl
proc align_bound {} {
# align the protein
package require rmsdtt
# open the window
set w [rmsdtt_tk_cb]
# set the states of checkboxes
set rmsdtt::trace_only 0
set rmsdtt::noh 0
set rmsdtt::bb_only 1
# rmsdtt::set_sel  # verify selection
rmsdtt::doAlign

# change selection text
$w.top.left.sel delete 1.0 end
$w.top.left.sel insert end "resname HYB"
set rmsdtt::bb_only 0
# set rmsdtt::xmgrace 1
# set rmsdtt::multiplot 0
set rmsdtt::plot_sw 1
set rmsdtt::save_sw 1
set rmsdtt::save_file ${path}-rmsd.dat
rmsdtt::doRmsd
}

# aligning the ligand
proc align_unbound {} {
package require rmsdtt
set w [rmsdtt_tk_cb]
$w.top.left.sel delete 1.0 end
$w.top.left.sel insert end "resname HYB"
set rmsdtt::trace_only 0
set rmsdtt::noh 0
set rmsdtt::bb_only 0
rmsdtt::doAlign
}

if { $complex == "bound"} {
	align_bound
} else {
	align_unbound
}

# move to center. maybe execute again after aligning the protein...
set lig [atomselect top "resname HYB" frame 1]
set cen [measure center $lig weight mass]
foreach {x y z} $cen { break }
molinfo top set center_matrix "{{1 0 0 [expr -$x]} {0 1 0 [expr -$y]} {0 0 1 [expr -$z]} {0 0 0 1}}"
# use negative...
```

code source: 

- save visualization state
- `rmsdtt.tcl`
- https://www.ks.uiuc.edu/Research/vmd/plugins/pbctools/

in Windows, we have to load the pdb file...so

```tcl
set sys [string range ${path} 0 end-1]
mol new ../common/${sys}-fep.pdb type pdb first 0 last -1 step 1 filebonds 1 autobonds 1 waitfor all
mol addfile ./${path}/${sys}-prod-forward.dcd type dcd waitfor all
animate delete beg 0 end 0
```

##### pbc wrap

https://www.ks.uiuc.edu/Research/vmd/plugins/pbctools/

vmd加的水是各边添加pad，如果蛋白是个长条（x轴），转一下，y轴可能伸出去。。pbc也没用

即使是为了别让两个image相互作用，也应该让水盒子大一些

我们要的只是把所有的component放在一起。必须先pbc再align。

```tcl


# after that, maybe ..
animate write dcd my.dcd
```

 

#### RMSD tool in VMD

if we don't need to cluster, we just use VMD.

##### preparation

cat

```shell
cd ligand1
prefix=rdrp-mtp-remtp-ligand-prod
catdcd -o all.dcd -stride 4 ${prefix}-forward.dcd ${prefix}-backward.dcd 
cd ..
cd complex1
prefix=rdrp-mtp-remtp-complex-prod
catdcd -o all.dcd -stride 4 ${prefix}-forward.dcd ${prefix}-backward.dcd 
cd ..
```

> https://www.ks.uiuc.edu/Research/vmd/current/ug/node198.html
>
> https://www.ks.uiuc.edu/Research/vmd/mailing_list/vmd-l/3517.html
>
> [tcl基本语法：中括号[ ]、大括号{ }、双引号“ ”](https://blog.csdn.net/sinat_41774721/article/details/120884601)

```tcl
# MD LIG. copy from here. use a script for FEP

# load psf and dcd file
mol new system.psf type psf
mol addfile rdrp-remtp-equil-all.dcd type dcd waitfor all

# make representation
mol delrep 0 top
mol representation NewCartoon 0.300000 10.000000 4.100000 0
mol color Structure
mol selection {protein}
mol material Opaque
mol addrep top
# add rep after setting up

mol representation Licorice 0.300000 12.000000 12.000000
mol color Type
mol selection {resname LIG}
mol material Opaque
mol addrep top

mol representation VDW 1.000000 12.000000
mol color Type
mol selection {resname MG}
mol material Opaque
mol addrep top

mol representation Lines 1.000000
mol color Type
mol selection {protein and residue 436 to 443 or residue 567 or residue 721}
mol material Opaque
mol addrep top
# Val: 557, 442

# move to center
set lig [atomselect top "resname LIG"]
set cen [measure center $lig weight mass]
foreach {x y z} $cen { break }
molinfo top set center_matrix "{{1 0 0 [expr -$x]} {0 1 0 [expr -$y]} {0 0 1 [expr -$z]} {0 0 0 1}}"
# use negative...

```

##### RMSD tool

https://www.ks.uiuc.edu/Research/vmd/plugins/rmsdtt/

In VMD tutorial 4.2 (4: DATA ANALYSIS IN VMD)

- Extensions → Analysis → RMSD Trajectory Tool 

- type your selection

  - backbone: C,CA,N; trace: CA

- Click the Align button (with protein backbone selected?)

- Click the RMSD button. Make sure the Plot checkbox is selected.

- first and last

  ```tcl
  set sel [atomselect top all frame 0]
  $sel writepdb first.pdb
  set sel [atomselect top all frame 199]
  $sel writepdb last.pdb
  ```

- 

#### RMSD each window

https://www.ks.uiuc.edu/Research/vmd/mailing_list/vmd-l/att-3497/rmsd.tcl

```tcl
# vmd -dispdev text -e ../../get_rmsd.tcl -args complex1 560 28

proc rmsd_lig { psffile dcdfile selligand } {
    mol new $psffile type psf
    mol addfile $dcdfile type dcd waitfor all

    set molid top
    set seltext "protein and name C CA N"
    set ref [atomselect $molid $seltext frame 0]
    set sel [atomselect $molid $seltext]
    set all [atomselect $molid all]
    set n [molinfo $molid get numframes]

    for { set i 1 } { $i < $n } { incr i } {
      $sel frame $i 
      $all frame $i
      $all move [measure fit $sel $ref]
    }

    set ref [atomselect $molid $selligand frame 0]
    set sel [atomselect $molid $selligand]
    set n [molinfo $molid get numframes]

    for { set i 1 } { $i < $n } { incr i } {
      $sel frame $i
      lappend rms [ measure rmsd $sel $ref ]
    }

    $ref delete
    $sel delete
    mol delete all
    return $rms
}


set path [lindex $argv 0]
set sys [string range ${path} 0 end-1]
if {$sys == "complex"} then {set name "bound"} else {set name "unbound"}

set total [lindex $argv 1]
set numwin [lindex $argv 2]
set frameperwin [ expr $total / $numwin ]

file delete ${path}-rmsd-window.dat
set outfile [open ${path}-rmsd-window.dat w]
puts -nonewline $outfile "n"
for { set i 1 } { $i <= $frameperwin } { incr i } { puts -nonewline $outfile [format { %s} $i] }
puts $outfile ""

for { set i 0 } { $i < $numwin } { incr i } {
    set ii [expr $i+1]
    catdcd -o temp.dcd -first [expr $i * $frameperwin + 1 ] -last [expr $ii * $frameperwin] ./${path}/rdrp-${name}-prod-forward.dcd
    set dcdfile temp.dcd
    set psffile ../common/${sys}-fep.psf
    set selligand "resname HYB"

    set res [rmsd_lig $psffile $dcdfile $selligand]
    set mean [vecmean $res]

    puts -nonewline $outfile [format {%.2d} ${ii}]
    foreach rms $res { puts -nonewline $outfile [format { %.3f} $rms] }
    puts $outfile [format { %.3f} $mean]

    file delete temp.dcd
    puts "finished window $ii"
}

close $outfile
exit
```





#### Time convergence

- Kevin's decomp and .fepout file don't agree

  Kevin's agree with parseFEP, but parseFEP says it's calculating ΔA (FEP)....



#### VMD movie making

```tcl
package require vmdmovie
MovieMaker::moviemaker
# install netpbm
# set MovieMaker::presmooth 1
set MovieMaker::prescale 1
set MovieMaker::cleanfiles 0
set MovieMaker::movieformat imgif
set MovieMaker::framerate 30
set MovieMaker::workdir ./
set MovieMaker::basename ${path}
set MovieMaker::trjstep 20
set MovieMaker::renderer libtachyon
set MovieMaker::movietype trajectory
# you should click on the trjstep. this window doesn't really recognize what we write there...
MovieMaker::buildmovie
bash create_movie.sh $path
```

we are using Tachyon Internal

options: https://www.ks.uiuc.edu/Research/vmd/current/ug/node112.html

render: https://www.ks.uiuc.edu/Research/vmd/current/ug/node147.html

To scale and smooth: `conda install netpbm` (smoothing causes error)

[tutorial (just see see)](http://www.ks.uiuc.edu/Training/Tutorials/vmd-imgmv/imgmv/imgmv-tutorial.pdf)

> Most of the supported renderers perform lighting calculations at every pixel, and so there’s less need to set the graphical representation res- olution parameters to high values.
>
> how to display many frames at once. Click the Trajectory tab again. Above the smoothing control, notice the Draw Multiple Frames control. It is set to now by default, which is simply the current frame. Enter 0:10:199, which selects every tenth frame from the range 0 to 199.

```shell
for file in *ppm; do
f=`basename $file .ppm`
convert $f.ppm $f.png
done
python png2gif.py $1
rm *png *ppm untitled.gif
```

where 

```python
import imageio as iio
import os, sys

giffile = sys.argv[1]+'.gif'
images_data = []
for f in sorted(os.listdir('.')):
    if f.endswith('.png'):
        data = iio.v3.imread(f)
        images_data.append(data)
iio.mimwrite(giffile, images_data, format= '.gif', fps = 5)
```

> other not using
>
> - http://sobereva.com/15
>
> - http://www.ks.uiuc.edu/Research/vmd/script_library/scripts/trajectory_movie/
>
>   don't use this because we can't process rgb files
>
>   明明有png却unsupported，明明有单独都能用却invalid command name全部已读
>
> - another solution
>
>   ```tcl
>   for {set fn 0} {$fn < ${numframes}} {incr fn 20} {
>      set filename snap.[format "%05d" $fn]
>      render TachyonInternal $filename.tga
>      animate goto $fn
>   }
>   exec convert -delay 5 -loop 4 -colors 32 snap.*.tga $path.gif
>   foreach k [glob *.tga] { file delete $k }
>   foreach k [glob *.dat] { file delete $k }
>   ```
>
>   but not so clear...





#### Making clusters in gmx

> [!NOTE]
>
>I have to note all of you that calculating (whole traj) RMSD and making clusters in FEP is MEANINGLESS.

##### collect trajectory files (prod-window)

> draft

```shell
bash catdcd.sh ${p} ${f} 6 510 0 _0_0.1
bash catdcd.sh ${p} ${f} 6 510 7140 _0.9_1

f=backward
f=forward

catdcd -o ${f}.dcd ${f}_*.dcd 

bash catdcd.sh ${p} ${f} 6 51 0 _0_0.1
bash catdcd.sh ${p} ${f} 6 51 714 _0.9_1
bash catdcd2.sh ${p} ${f} 16 10 0_0.1_0.9

catdcd -num ${f}.dcd
catdcd -num ${p}/*.dcd
```

##### make aligned trajectory

> now for prod-dihe

```shell
# cd equil-try folder
## step1: run make_equil.tcl with saving equilibrated
## step2: find box info
p=complex1
gmx editconf -f ${p}/equilibrated.pdb -o ${p}/equilibrated.gro \
-box 102.65500259399414 92.92599868774414 112.19599914550781 \
-center 2.9195003509521484 -1.5780010223388672 -3.006999969482422
p=ligand1
gmx editconf -f ${p}/equilibrated.pdb -o ${p}/equilibrated.gro \
-box 102.65199661254883 92.91299819946289 112.18100357055664 \
-center 2.9200000762939453 -1.5814990997314453 -3.010499954223633 
## step3: make the top file
vmd -dispdev text -e make_top.tcl -args complex1
vmd -dispdev text -e make_top.tcl -args ligand1
## step4: to deal with t coupling better, make a index file
cd $p
echo "10|11|12" | echo "13|2|3" | gmx make_ndx -f equilibrated.gro -o index.ndx
# ligand
echo "4|5|6" | echo "2|3" | gmx make_ndx -f equilibrated.gro -o index.ndx
## step5: make .tpr
gmx grompp -f ../md_fake.mdp -n index.ndx -c equilibrated.gro -r equilibrated.gro -p structure.top -o simulation.tpr -maxwarn 4
# ligand: md_fake2
# copy: index.ndx equilibrated.gro simulation.tpr
## step 6: making traj. in folder clustering
f=forward
num=24
conda activate AmberTools21 
mdconvert -o ${f}.xtc -t equilibrated.gro ../*${f}.dcd
gmx trjconv -f ${f}.xtc -o ${f}_nj.xtc -pbc nojump
## step7: fit. protein for least square fit, system for output. ligand 13: HYB_MG
echo 13 0 | gmx trjconv -s simulation.tpr -n index.ndx -f ${f}_nj.xtc -fit rot+trans -o ${f}_fit.xtc
rm ${f}.xtc
# optional, full traj
echo ${num} | gmx trjconv -f ${f}_fit.xtc -s simulation.tpr -n index.ndx -o traj-${f}.pdb -tu ps -dt 5
# dt=280 (total number of frames)/70 (how many frames we want). dt is a scaling factor
```

##### clustering

```shell
## step8: get rmsd matrix. protein for least square fit, ligand for rmsd calculation
echo 13 2 | gmx rms -s simulation.tpr -n index.ndx -f ${f}_fit.xtc -m rmsd-lig-${f}.xpm -tu ns
gmx xpm2ps -f rmsd-lig-${f}.xpm -o rmsd-lig-${f}.eps -rainbow blue
mv rmsd.xvg rmsd_${f}.xvg
xmgrace rmsd_forward.xvg rmsd_backward.xvg  -hdevice PNG -hardcopy -printfile rmsd.png
# black red
## step9: clustering
mkdir clus-${f} && cd clus-${f}
rm \#*\#
echo 13 ${num} | gmx cluster -s ../simulation.tpr -n ../index.ndx -f ../${f}_fit.xtc -dm ../rmsd-lig-${f}.xpm \
-dist rmsd-distribution.xvg -o clusters.xpm -sz cluster-sizes.xvg -tr cluster-transitions.xpm \
-ntr cluster-transitions.xvg -clid cluster-id-over-time.xvg -cl clusters-${f}.pdb \
-cutoff 0.25 -method gromos
# ligand: 13 13
xmgrace cluster-id-over-time.xvg
xmgrace cluster-sizes.xvg
# pymol
pymol *.pdb
split_states cluster

cd ..
```

1. visualize `clusters.pdb`, compare with the initial structure
2. calculate RMSD with `c01.pdb`

#### see the last frames

not that useful

in VMD

```tcl
set sys "complex"
if {$sys == "complex"} then {set name "bound"} else {set name "unbound"}
foreach i {1 2 3 4 5 6} {
mol new ../common/${sys}-fep.psf type psf
mol addfile ./${sys}${i}/rdrp-${name}-prod-forward.dcd type dcd waitfor all
# mol addfile ./${sys}${i}/rdrp-mtp-remtp-${sys}-prod-forward.dcd type dcd waitfor all
set numframes [molinfo top get numframes]
# set sel [atomselect top "protein or resname HYB or resname MG" frame 0]
# $sel writepdb 0-${path}.pdb
set sel [atomselect top "protein or resname HYB or resname MG" frame [expr ${numframes} - 1]]
$sel writepdb last-${sys}${i}.pdb
mol delete all
}
```

in pymol

```pymol
load last-complex1.pdb
load last-complex2.pdb
load last-complex3.pdb
load last-complex4.pdb
load last-complex5.pdb
load last-complex6.pdb
align last-complex2, last-complex1
align last-complex3, last-complex1
align last-complex4, last-complex1
align last-complex5, last-complex1
align last-complex6, last-complex1
hide cartoon, last-complex2
hide cartoon, last-complex3
hide cartoon, last-complex4
hide cartoon, last-complex5
hide cartoon, last-complex6
# color secondary structure
color red, ss h
color yellow, ss s
color green, ss l+''
color atomic, resn HYB
hide everything, resn MG
set cartoon_transparency, 0.6, last-complex1 and chain P
bg_color white
center (last-complex1 and resn HYB)
```



## Other ligand pairs

> We'll use GAFF (2?). CGenFF sucks.

```shell
conda activate AmberTools21



```







> ### building info
>
> #### rempty-remtp
>
> ```
> distance error H12A CB
> distinct charge C12A C12B
> different type C5A C5B
> before merging: O2A -0.548 O2B -0.545 ave= -0.5465
> before merging: C2A 0.132 C2B 0.141 ave= 0.1365
> before merging: C3A 0.137 C3B 0.14 ave= 0.1385
> before merging: C4A 0.051 C4B 0.043 ave= 0.047
> before merging: O4A -0.648 O4B -0.646 ave= -0.647
> +1: -3.999
> -1: -3.997amb
> 0: -4.65
> ```
>
> the ribose differ a little bit
>
> > PG1 OG303 CG321 CG3C51 (ATOMS 5 10 8 11)
>
> #### remtp-2OH-NH2
>
> in ori, leili's param
>
> NH2: 2*0.34-0.915=-0.235, OH: 0.42-0.65=-0.23. no more modification.



# Stage 3 Protocol: the full system

## MD simulation

### Mg<sup>2+</sup> force field

general materials

- [Introduction to Ion Parameters](https://ambermd.org/AmberModels_ions.php)
- [Amber file format: frcmod](https://ambermd.org/FileFormats.php#frcmod)
- [Tutorial for Modeling Metal Ions in AMBER](https://ambermd.org/tutorials/advanced/tutorial20/index.htm): provide index(es)
  - MCPB.py
  - Nonbonded Model: 12-6 and 12-6-4
- use Amber in CHARMM
  - https://ambermd.org/tutorials/pengfei/gaff4charmm.htm
  - use ParmEd to convert Amber prmtop file to gromacs and CHARMM formats: amb2chm_psf_crd.py

- other
  - namd可以有一个范德华势能-距离曲线的势能

![protein-RNA-ligand-Mg](FYP-notes.assets\protein-RNA-ligand-Mg.png)

we should use iod (ion-oxygen distances)? 

> Panteva and York Fine-Tuned Divalent Cation Parameters for Nucleic Acids?

should be matched to water model



### Zn<sup>2+</sup> force field

- [Modeling Zinc Enzyme System using the 12-6 LJ Nonbonded Model](https://ambermd.org/tutorials/advanced/tutorial20/12_6.htm)
  - only the ion parameters for +3 and +4 ions had errors in these four files
- ZAFF: https://ambermd.org/tutorials/advanced/tutorial20/ZAFF.htm
- [other: multi-point ](https://www.mayo.edu/research/labs/computer-aided-molecular-design/projects/zinc-protein-simulations-using-cationic-dummy-atom-cada-approach)

deprotonated cysteine residue stabilizes zinc-finger structure even in the preference of negatively charged DNA molecule



### Amber+new Mg FF

refer to [GAFF (not using)](#GAFF-not-using)

#### AmberTools

##### debug

- pdb4amber does a preliminary check on your PDB file and cleans potential errors in the protein structure.

- tleap reports 'FATAL: Atom .R<A 930>.A<OP2 22> does not have a type.'

  remove 5TER of your RNA from .pdb file

- 

### CHARMM-GUI solution builder

> it's a bit slow in the solvating step, but effective and versatile (gmx+charmm)



### other

edit RNA: cannot easily mutate a novel base to a normal base in either VMD or pymol, I don't know why. 

CHARMM-GUI cannot mutate NA?? rubbish! but if we have made novel nucleotides' FF, we can just upload and model it. Maybe just vmd can do this.

solution: edit the structure, edit the atom names to agree with the normal base, model it in vmd. if you don't edit atom names, they won't be recognized by vmd.

## FEP





# Stage n protocol: GMX FEP 

## FEP building systems

### Tools

#### pmx package

[installation summary](https://gxf1212.github.io/notes/#/techniques/Prepare-for-the-computer?id=pmx)

[official installation. remember to set gmxlib](https://degrootlab.github.io/pmx/installation.html#gmxlib)

https://degrootlab.github.io/pmx/index.html 官方文档

https://github.com/deGrootLab/pmx/tree/develop  

注意是dev版，master是Python2写的，已经不更新了

- .py版

  - http://pmx.mpibpc.mpg.de/ server，只能protein/DNA mutation

  - http://pmx.mpibpc.mpg.de/summerSchool2020_tutorial2/index.html tutorial from [here](http://pmx.mpibpc.mpg.de/tutorial.html)

    不知道是哪个版本，但doc里有？

- 文件夹版，官文啥都没说

  - https://www.youtube.com/watch?v=NSeiQUwc8-I 视频教程
  - https://github.com/deGrootLab/pmx/blob/develop/tutorials/ligand_tutorial.ipynb 是视频所用的tutorial
  - https://github.com/deGrootLab/pmx/tree/master/protLig_benchmark 视频所用的文件

- 命令行，没别的资料

  - https://degrootlab.github.io/pmx/scripts/index.html

- Python版：还是看官文

```shell
pmx -h
pmx mutate -h
```

`xxx/miniconda3/envs/pmx/lib/python3.10/site-packages/pmx/data/mutff`: path to hybrid residue ff database

- protein
  - mutate       Mutate protein or DNA/RNA
  - gentop       Fill hybrid topology with B states
  - analyse      Estimate free energy from Gromacs xvg files
- ligand
  - atomMapping   Ligand alchemy: map atoms for morphing
    - generate pairs for hybrid
  - ligandHybrid  Ligand alchemy: hybrid structure/topology
  - abfe         Setup files for an ABFE calculation 
    - combine protein and ligand, top and crd?
  - doublebox    Place two input structures into a single box
- check
  - genlib       Generate pmx ff library
  - gmxlib       Show/set GMXLIB path

#### charmm2gmx

[`cgenff_charmm2gmx_py3_nx2.py`](http://mackerell.umaryland.edu/download.php?filename=CHARMM_ff_params_files/cgenff_charmm2gmx_py3_nx2.py) in [charmff site](http://mackerell.umaryland.edu/charmm_ff.shtml#gromacs).

```shell
conda create -n charmm2gmx python=3.7 -y
conda activate charmm2gmx
conda install networkx=2.3 numpy
```

notes: cgenff_charmm2gmx_py3_nx2.py

- Code tested with Python 3.5.2 and 3.7.3. Code tested with NetworkX 2.3.
- Please be sure to use the same version of CGenFF in your simulations that was used during parameter generation
- To avoid duplicated parameters, do NOT select the 'Include parameters that are already in CGenFF' option when uploading a molecule into CGenFF.
- If your topology has lone pairs, you must use GROMACS version 2020 or newer to use 2fd construction

### From CgenFF to pmx


1. Preparation

   - generate .mol2 and .str file from [CGenFF](https://cgenff.umaryland.edu/)
   - modification: change the residue name in `.str`  and `.mol2` file to 'LIG'
   
   > files required: .pdb and .itp file that matches. 
   >
   > source: 1) CHARMM-GUI; 2) CGenFF+ParmEd (psf2itp?)
   
1. get cgenff files for gmx

   ```shell
   # l1=atp
   l1=remtp
   l2=rempty
   conda activate charmm2gmx
   charmm_path=~/gromacs-2021.5-gpu/share/gromacs/top/charmm36-jul2021.ff
   python cgenff_charmm2gmx_py3_nx2.py LIG ${l1}.mol2 ${l1}.str ${charmm_path}
   rename "s/lig/${l1}/" lig* -f
   python cgenff_charmm2gmx_py3_nx2.py LIG ${l2}.mol2 ${l2}.str ${charmm_path}
   rename "s/lig/${l2}/" lig* -f
   ```
   
   charmm2gmx generates 4 files for each ligand: .prm, .itp, .top, _ini.pdb
   
   > The molecule topology has been written to lig.itp. Additional parameters needed by the molecule are written to lig.prm. They are included in the system .top
   
2.  use pmx to merge the ligands

   ```shell
   conda activate AmberTools21
   pmx atomMapping -i1 ${l1}_ini.pdb -i2 ${l2}_ini.pdb -o1 pairs1.dat
   pmx ligandHybrid -i1 ${l1}_ini.pdb -i2 ${l2}_ini.pdb -itp1 ${l1}.itp -itp2 ${l2}.itp -pairs pairs1.dat 
   
   
   ```
   
   - atom mapping: outputs pairs and mapping score
   
3. 





> not using or failed
> ```shell
>python ./ref/psf2itp.py /home/moonlight/Desktop/work/projects/undergraduate/FYP/FEP/remtp-atp/build-pmx/cgenff/atp atp.psf
> gmx pdb2gmx -f ${l1}_ini.pdb -o ${l1}_cg.pdb
> ```
> 
> s



### From MATCH to pmx









# Extra protocol (not using)

## FEprepare

主要是LibParGen，OPLS-AA，现在用不了？

就算FEprepare支持cgenff，也要转mol2为pdb



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



## AlphaFold2 modeling

https://github.com/sokrypton/ColabFold

22.6.23 try

may just use AlphaFold2.ipynb to build a (complex) model..

using GPU in colab

20 min for each ~944 rdrp (alone) model, more for complexes?



not that useful (cannot recognize my pdb file):

https://www.rcsb.org/alignment



## Deal with Halogen in CHARMM/NAMD

不用charmm力场当然不会有问题. I met [this error](https://www.ks.uiuc.edu/Research/namd/mailing_list/namd-l.2020-2021/1575.html) and:

```
Warning: The Langevin gamma parameters differ over the particles, 
Warning: requiring extra work per step to constrain rigid bonds. 
Warning: Disabling lonepair support due to incompatability with SOA.
```

- `LPH CLGR1 0.00 0.0000 ! aromatic halogen to lone pair`: such bonded terms no longer exist in cgenff.prm file (namd older version uses that). [reference](https://www.charmm.org/ubbthreads/ubbthreads.php?ubb=showflat&Number=38297)
- You need to build it using PSFGen 2.0.  It should be correct if you see a !NUMLP  section (in .psf), as Dave pointed out. 倒也没必要手动删掉这个键
- 最新namd3也没办法，该问题正在解决中。
- [an interesting try]([https://notebooks.githubusercontent.com/view/ipynb?browser=chrome&color_mode=auto&commit=4592b5cde47f385ade6a78c854a2989f25417775&device=unknown&enc_url=68747470733a2f2f7261772e67697468756275736572636f6e74656e742e636f6d2f7175616e74616f73756e2f6e6f7465626f6f6b2f343539326235636465343766333835616465366137386338353461323938396632353431373737352f2545372542422539442545352541462542392545372542422539332545352539302538382545382538372541412545372539342542312545382538332542442545352542392542332545382541312541312532425f654142465f254534254241253843254535253930253838254534254238253830424645455f316d71355f6571756c6962726174696f696e2e6970796e62&logged_in=false&nwo=quantaosun%2Fnotebook&path=%E7%BB%9D%E5%AF%B9%E7%BB%93%E5%90%88%E8%87%AA%E7%94%B1%E8%83%BD%E5%B9%B3%E8%A1%A1%2B_eABF_%E4%BA%8C%E5%90%88%E4%B8%80BFEE_1mq5_equlibratioin.ipynb&platform=android&repository_id=358492452&repository_type=Repository&version=104](https://notebooks.githubusercontent.com/view/ipynb?browser=chrome&color_mode=auto&commit=4592b5cde47f385ade6a78c854a2989f25417775&device=unknown&enc_url=68747470733a2f2f7261772e67697468756275736572636f6e74656e742e636f6d2f7175616e74616f73756e2f6e6f7465626f6f6b2f343539326235636465343766333835616465366137386338353461323938396632353431373737352f2545372542422539442545352541462542392545372542422539332545352539302538382545382538372541412545372539342542312545382538332542442545352542392542332545382541312541312532425f654142465f254534254241253843254535253930253838254534254238253830424645455f316d71355f6571756c6962726174696f696e2e6970796e62&logged_in=false&nwo=quantaosun%2Fnotebook&path=绝对结合自由能平衡%2B_eABF_二合一BFEE_1mq5_equlibratioin.ipynb&platform=android&repository_id=358492452&repository_type=Repository&version=104))

**目前的办法：加参数，用namd3普通或namd2跑。Add 'lonepairs on' to namd.conf and don't  use CUDASOAintergrate**. And remember to include various .rtf files.

```
!!! IMPORTANT!!!
!!! The following topology & parameter files should be read before reading top_all36_cgenff.rtf/par_all36_cgenff.prm
!!! for correctly implementing the TERM between the chlorine with the lone-pair and the carbonyl oxygen in amides
!!! 1) top_all36_prot.rtf/par_all36_prot.rtf
!!! 2) top_all36_na.rtf/par_all36_na.rtf
!!! 3) top_all36_carb.rtf/par_all36_carb.rtf
```

> 我当时就把CUDASOAintegrate on注释掉，然后将CPU核增加到11个，和跑gromacs一样的配置。
>
> 1GPU+10CPU速度还可以。比一堆纯CPU快很多。和正常跑差多少呢？60%-70%的样子

F没有lonepair

Question: 

- 脂肪族的cl可以不用加lone pair呀 (like CH3Cl in cgenff.ref), but CHARMM-GUI still adds a lone pair
- charmm-gui recognizes Cl as CH3???







