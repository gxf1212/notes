# Tutorials

The official (or well-known) tutorial for Gromacs, AmberTools, NAMD, etc.

自己学习。后面要整理，把草稿放到quote里！

# Common tools

## Gromacs

some blogs:

https://www.zhihu.com/people/qutesun

https://qinqianshan.com/bioinformatics/molecular_dynamics/

### basic tutorial

http://www.mdtutorials.com/gmx

https://jerkwin.github.io/GMX/

#### 1. lysozyme in water

##### prepare system

```shell
echo 15 | gmx pdb2gmx -f 1aki.pdb -o 1AKI_processed.gro -water spce
# echo 6 | gmx pdb2gmx -f ../1aki.pdb -o 1AKI_processed.gro -water tip3p
gmx editconf -f 1AKI_processed.gro -o 1AKI_newbox.gro -c -d 1.0 -bt cubic
gmx solvate -cp 1AKI_newbox.gro -cs spc216.gro -o 1AKI_solv.gro -p topol.top
gmx grompp -f ions.mdp -c 1AKI_solv.gro -p topol.top -o ions.tpr -maxwarn 1
echo 13 | gmx genion -s ions.tpr -o 1AKI_solv_ions.gro -p topol.top -pname NA -nname CL -nn 8 # equal to -neutral
```

##### preparative runs

```shell
gmx grompp -f minim.mdp -c 1AKI_solv_ions.gro -p topol.top -o em.tpr
gmx mdrun -v -deffnm em -nb gpu
```





#### 5. protein-ligand complex

##### prepare system

```shell
grep ATOM 3HTB_clean.pdb > 3HTB.pdb
echo 9 | gmx pdb2gmx -f 3HTB.pdb -o 3HTB_processed.gro -water spc

grep JZ4 3HTB_clean.pdb > JZ4.pdb # 抽取出含JZ4的行, 保存到JZ4.pdb文件中
conda activate AmberTools21
pdb4amber -i JZ4.pdb -o lig_new.pdb --reduce --dry
antechamber -i lig_new.pdb -fi pdb -o lig.mol2 -fo mol2 -at gaff -c bcc -rn MOL
parmchk2 -i lig.mol2 -f mol2 -o lig.frcmod

tleap
source leaprc.gaff
loadamberparams lig.frcmod
lig=loadmol2 lig.mol2
check lig
saveamberparm lig lig.prmtop lig.inpcrd
quit

conda activate Acpype
acpype -p lig.prmtop -x lig.inpcrd -d
mv MOL_GMX.gro lig.gro
mv MOL_GMX.top drg.itp
rm em.mdp
rm md.mdp
```

the problem is, too hard to get lligand topology, eg. with Amber, why not put the protein together? And then still copy and paste

```shell
cp 3HTB_processed.gro complex.gro
# 复制jz4.gro的坐标部分粘贴到complex.gro文件中, 位于蛋白质原子最后一行的下面, 盒向量的前面. 
# 将complex.gro文件中第二行的数字增加15.
# 在topol.top中; Include Position restraint file这块的后面插入一行, 内容为#include "drg.itp"
# 最后调整[ molecules ]部分, 因为新添加了一个分子,添加:MOL                 1 (from:drg.itp)
```

problem: where to set drg.itp? It has “default” and atoms...

```shell
gmx editconf -f complex.gro -o newbox.gro -bt dodecahedron -d 1.0
gmx solvate -cp newbox.gro -cs spc216.gro -p topol.top -o solv.gro
mx grompp -f em.mdp -c solv.gro -p topol.top -o ions.tpr
gmx genion -s ions.tpr -o solv_ions.gro -p topol.top -pname NA -nname CL -nn 6
```



##### preparative runs



#### 6. methane in water--free energy

http://www.mdtutorials.com/gmx/free_energy/index.html

#### notes

离子名称:如果遇到困难, 请参考`ions.itp`中的正确命名.



### Advanced

Free Energy Calculation with GROMACS Hands-On Tutorial





https://manual.gromacs.org/current/reference-manual/special/free-energy-implementation.html







#### remark

其他

- 毕设那个可以增加investigational等等

## Amber(Tools)

https://ambermd.org/tutorials

### 1. building systems

##### pdb4amber

> gurantee the structure is right

- solve atom naming issues
- fix the structure (missing, terminal, protonation,...)

##### LEaP

> a portal between many chemical structure file types

Given structure and parameters (force field), `LEaP` will generate a topology file (`.prmtop`") and coordinate file (`.inpcrd`)

- `frcmod`: **FOR**ce field **MOD**ifications

### 7. free energies

#### [7.3 Thermodynamic Integration using soft core potentials](https://ambermd.org/tutorials/advanced/tutorial9/index.html)









## VMD

http://www.ks.uiuc.edu/Training/Tutorials/vmd-index.html

tcl scripting: https://www.ks.uiuc.edu/Training/Tutorials/vmd/tutorial-html/node4.html same as PDF tutorial

https://www.ks.uiuc.edu/Research/vmd/script_library/ VMD Script Library

http://www.ks.uiuc.edu/Research/vmd/plugins/ plugins, each has its own documentation (maybe its own tutorial)...

### VMD Command-Line Options

When started, the following command-line options may be given to VMD. Note that if a command-line option does not start with a dash (-), and is not part of another option, it is assumed to be a PDB filename. Thus, the Unix command

```
vmd molecule.pdb
```

will start VMD and load a molecule from the file `molecule.pdb`. On the Windows platform, one must preface the VMD invocation with the Windows `start` command

```
start vmd molecule.pdb
```

- `-h | -?` : Print a summary a command-line options to the console.

- `-e filename` : After initialization, execute the text commands in filename, and then resume normal operation.

- `-psf filename` : Load the specified molecule (in PSF format) at startup. The PSF file only contains the molecular structure; a PDB or DCD file must also be specified when this option is used.

- `-pdb filename` : Load the specified molecule (in PDB format) at startup.

- `-dcd filename` : Load the specified trajectory file (in binary DCD format) at startup. The DCD file only contains atomic coordinates; a PDB or PSF file must also be specified when this option is used.

- -dispdev < win | text | cave | caveforms | none >:

  Specify the type of graphical display to use. The possible display devices include:

  - `win`: a standard graphics display window.
  - `text`: do not provide any graphics display window.
  - `cave`: use the CAVE virtual environment for display, forms are disabled.
  - `caveforms`: use the CAVE virtual environment for display and with forms enabled. This is useful with `-display machine:0` for remote display of the forms when the CAVE uses the local screen.
  - `none`: same as text.

  It is possible to use VMD as a filter to convert coordinate files into rendered images, by using the

  `-dispdev text` and `-e` options.

- `-dist z` : Specify the distance to the VMD image plane.

- `-height y` : Specify the height of the VMD image plane.

- `-pos x y` : Specify the position for the graphics display window. The position (x,y) is the number of pixels from the lower-left corner of the display to the lower-left corner of the graphics window.

- `-size x y` : Specify the size for the graphics display window, in pixels.

- `-nt` : Do not display the VMD title at startup.

- `-startup filename` : Use filename as the VMD startup command script, instead of the default **.vmdrc** or **vmd.rc** file.

- `-debug [level` : Turn on output of debugging messages, and optionally set the current debug level (1=few messages ... 5=many verbose messages). Note this is only useful if VMD has been compiled with debugging option included.

### Using VMD (PDF tutorial)

#### Working with a Single Molecule

##### Load molecule

File → New Molecule...

> Just type the four letter code of the protein **in the File Name text entry** of the Molecule File Browser window and press the Load button. VMD will download it automatically.

......

##### Displaying the Molecule

##### Graphical Representations

#### Trajectory and movie making

#### Scripting in VMD

- Tcl is a rich language
- Tk is an extension to Tcl that permits GUI

##### The Basics

```tcl
# set, puts
puts "Hello, world!"
set x 10
puts $x  # $ refer to value
set str "protein"
puts "this is a $str"
# math
expr 1 + 1
expr 3 * $x
set y [expr 3 * $x]
# write file
set file [open "out.dat" w]
for {set x 0} {$x < 10} {incr x} {  # should add space. x refer to variable
puts $file [expr $x+1]  # puts writes into $file
}
close $file  # otherwise not saved
```

<font color=red>A bracketed expression will automatically be substituted by the return value of the expression inside the brackets</font>

##### VMD scripting

1. load molecule

   ```tcl
   mol new 1ubq.pdb
   ```

   terminal tells basic info: atoms, residues, waters, components, ...

2. selection

   ```tcl
   atomselect moleculeID selection
   ```

   - mol-ID
   - selection: see 1.3

   ```tcl
   set crystal [atomselect top "all"]
   ```

   The result of atomselect is a function, defining an object to operate on

3. properties

   ```tcl
   $crystal num  # number of atoms
   $crystal moveby {10 0 0}  # unit: angstrom
   ```

   

4. 

##### from online

1. tcl中注释符为“#”，#之后的内容会被忽略。要注意的是注释语句与代码语句之间也要用换行或分号分隔。

   ```tcl
   if { 0 } {
   write your comment here
   '#' is not necessary because tcl does not parse 
   }
   ```

2. 

### psfgen : building system

also seen in NAMD-ug chp3.4 Creating PSF Structure Files

#### user guide

##### <font color=red>steps</font>

Generating PSF and PDB files for use with NAMD will typically consist of the following steps:
1. Preparing separate PDB files containing individual segments of protein, solvent, etc. before running psfgen.
2. Reading in the appropriate topology definition files and aliasing residue and atom names found in the PDB file to those found in the topology files. This will generally include selecting a default protonation state for histidine residues.
3. Generating the default structure using segment and pdb commands.
4. Applying additional patches to the structure.
5. Reading coordinates from the PDB files.
6. Deleting unwanted atoms, such as overlapping water molecules.
7. Guessing missing coordinates of hydrogens and other atoms.
8. Writing PSF and PDB files for use in NAMD.

##### commands

For the commands, please check NAMD user guide!

- `segment`: Build a segment of the molecule. A segment is typically a single chain of protein or DNA, with default patches applied to the termini. 

##### Scripts

###### Preparing separate PDB files

In psfgen, each of these groups must **be assigned to their own segment**. This applies most strictly in the case of protein chains, each of which must be assigned to its own segment so that **N-terminal and C-terminal patches** can be applied. 

```tcl
# Split a file containing protein and water into separate segments.
# Creates files named myfile_water.pdb, myfile_frag0.pdb, myfile_frag1.pdb,...
# Requires VMD.
mol load pdb myfile.pdb
set water [atomselect top water]
$water writepdb myfile_water.pdb
set protein [atomselect top protein]
set chains [lsort -unique [$protein get pfrag]]
foreach chain $chains {
set sel [atomselect top "pfrag $chain"]
$sel writepdb myfile_frag${chain}.pdb
}
```

###### BPTI example

http://www.ks.uiuc.edu/Research/namd/tutorial/NCSA2002/hands-on

see that folder. see the scripts

include cry

#### other two: solvate and ionized

```
Usage: solvate <psffile> <pdbfile> <option1?> <option2?>...
Usage: solvate <option1?> <option2?>...  to just create a water box
Options:
    -o <output prefix> (data will be written to output.psf/output.pdb)
    -s <segid prefix> (should be either one or two letters; default WT)
    -b <boundary> (minimum distance between water and solute, default 2.4)
    -minmax {{xmin ymin zmin} {xmax ymax zmax}}
    -rotate (rotate molecule to minimize water volume)
    -rotsel <selection> (selection of atoms to check for rotation)
    -rotinc <increment> (degree increment for rotation)
    -t <pad in all directions> (override with any of the following)
    -x <pad negative x>
    -y <pad negative y>
    -z <pad negative z>
    +x <pad positive x>
    +y <pad positive y>
    +z <pad positive z>
    The following options allow the use of solvent other than water:
      -spsf <solventpsf> (PSF file for nonstandard solvent)
      -spdb <solventpdb> (PDB file for nonstandard solvent)
      -stop <solventtop> (Topology file for nonstandard solvent)
      -ws <size> (Box length for nonstandard solvent)
      -ks <keyatom> (Atom occuring once per residue for nonstandard solvent)
```

### Mutator

https://www.ks.uiuc.edu/Research/vmd/plugins/mutator/

Extensions---Modeling---Mutate residues

click 'Generate FEP files'

```shell
mutator_core -psf pept6.psf -pdb pept6.pdb -o pept-gly -resid 33 -mut Gly -FEP hybrid
```



note (too old?)

- Because of atom name changes, patches that **modify the side chains** cannot be used with the provided hybrid topologies. Standard patches for the termini should work fine, although it is always advisable to carefully inspect the resulting structure.
- In the particular case of glycine, **the alpha carbon atom has to be modified** in the transformation. For that reason, most patches will probably cause problems. Also, mutating a glycine will cause some angle and dihedral parameters to be duplicated, possibly modifying backbone conformational preferences. In short, <u>do not mutate a residue from or to glycine unless you know what you are doing</u>.
- Since proline has a special structure (and is actually not an amino acid), <u>hybrids involving proline are not supported</u>. (now it's fine?)
- If the PSF produced by Mutator/FEP is further processed (by psfgen, solvate, ionize, etc.), the non bonded exclusion lists are likely to be lost. The resulting PSF should then be [alchemified](http://www.edam.uhp-nancy.fr/Alchemify/) again to add these lists back. (NAMD deals with that!)

### check structure

### other tips

- GPU determine VMD capability; memory determines how big (and parallel) trajectory you can load.

  https://www.ks.uiuc.edu/Research/vmd/current/ug/node12.html

  > Since the choice of the GPU chipset or card has the biggest impact on the visualization capabilities and performance of VMD, this is the hardware component that is worth spending money on if one's intended use of VMD is primarily focused on visualization related tasks.....
  >
  > Following the choice of graphics accelerator, the amount of available system memory tends to have the next most significant impact on the performance and capability of VMD. The more memory a machine has, the more frames can be loaded at once from large molecular dynamics trajectory files. For batch-mode analysis tasks that consist primarily of scripting, system memory is frequently the resource that limits feasability of many analysis tasks.

  Actually VMD didn't take too many memory here

## NAMD

Some collected guidance (from web, paper, etc.) is just for reference, like a dictionary to look up.

### Fundamental tutorial

user guide: http://www.ks.uiuc.edu/Research/namd/2.14/ug/

namd tutorial: http://www.ks.uiuc.edu/Training/Tutorials/namd-index.html

- Case studies: [water ](http://www.ks.uiuc.edu/Training/CaseStudies/index.html#h2ocs)• [DNA ](http://www.ks.uiuc.edu/Training/CaseStudies/index.html#dnacs)• [lipid   bilayers ](http://www.ks.uiuc.edu/Training/CaseStudies/index.html#lipcs)• [BPTI](http://www.ks.uiuc.edu/Training/CaseStudies/index.html#bptics) • [ubiquitin ](http://www.ks.uiuc.edu/Training/CaseStudies/index.html#ubqcs)• [myoglobin](http://www.ks.uiuc.edu/Training/CaseStudies/index.html#myocs) • [aquaporin ](http://www.ks.uiuc.edu/Training/CaseStudies/index.html#aqpcs)• [ion   channels ](http://www.ks.uiuc.edu/Training/CaseStudies/index.html#channelscs)• [titin ](http://www.ks.uiuc.edu/Training/CaseStudies/index.html#titincs)• [lh2](http://www.ks.uiuc.edu/Training/CaseStudies/index.html#lh2cs)
- A video reviewing the conceptual foundations of NAMD, "Statistical Mechanics of Proteins" as recorded by Dr. Klaus Schulten in November 2010 is available [here](http://www.ks.uiuc.edu/Training/video2/namd/).

all tutorial: http://www.ks.uiuc.edu/Training/Tutorials/ including 

- [VMD Tutorials](http://www.ks.uiuc.edu/Training/Tutorials/#vmd) • [NAMD Tutorials](http://www.ks.uiuc.edu/Training/Tutorials/#namd) • [Free Energy Methods](http://www.ks.uiuc.edu/Training/Tutorials/#freeenergymethods) • [Bioinformatics](http://www.ks.uiuc.edu/Training/Tutorials/#bioinformatics) • [Bionanotechnology](http://www.ks.uiuc.edu/Training/Tutorials/#bionanotechnology) • [Specialized Topics](http://www.ks.uiuc.edu/Training/Tutorials/#specializedtopics)

#### 1 basics

##### contents

- the four files needed
- generate necessary files through VMD
- set the configurations

##### notes

- Hydrogen atoms, however, are not typically detected by X-ray crystallography since their sizes are too small to interact with the radiation

- in `top_all27_prot_lipid.inp`

  The viable states are one in which the δ nitrogen of histidine is protonated (listed with residue name “HSD" in the topology file), one in which the $\varepsilon$ nitrogen of histidine is protonated (“HSE"), and one in which both nitrogens are protonated (“HSP").

  ![组氨酸- 生物百科- 生物行](https://cdn.jsdelivr.net/gh/gxf1212/notes@master/MD/MD.assets/his.png)

- load .psf and then .pdb file

##### restart a simulation

just need to reset these:

```tcl
set inputname input
set outputname output

bincoordinates			$inputname.coor
binvelocities				$inputname.vel 
ExtendedSystem		  $inputname.xsc

firsttimestep 92000
```

> note
>
> ```tcl
> # if you have also specified a .vel restart file, comment out
> # temperature         $temperature
>  
> # Do not set the periodic cell basis if you have also specified an .xsc restart file!
> # cellBasisVector1    20.0  0    0
> # cellBasisVector2     0   20.0  0
> # cellBasisVector3     0    0   50.0
> # cellOrigin                 0    0    0
> 
> # comment out processes that no longer need!
> # minimize 1000
> ```
>
> `.dcd.` file only contains frames. It doesn't matter even if some steps are lost before the next frame is recorded. We only need to consider `.coor`, `.vel` and `.xsc`. Set output frequency properly so that they match.

about restart files:

- NAMD can also create restart files, one of which is a pdb file which stores atomic coordinates, and the other of which stores atomic velocities. `restartname` < restart files prefix >   Default Value: `outputname.restart`
- Furthermore, NAMD will store the file from the previous cycle each time it writes a new file. The filename is appended with a .old extension; it is created in case NAMD fails in writing the new restart file.

#### 2 Analysis

##### M-B distribution



##### Temperature

```shell
vmd
source ../2-3-energies/namdstats.tcl
data_time TEMP ubq-nve.log
exit # vmd
xmgrace TEMP.dat

```





#### Appendix: file types

> 11.28 read everything before the examples

1. The PDB file

   NAMD and VMD ignore everything in a PDB file except for the ATOM and HETATM records. (**coordinates**)

2. The PSF file 

   contains six main sections of interest: atoms, bonds, angles, dihedrals, impropers (dihedral force terms used to maintain planarity), and cross-terms. (**structure**)

3. The topology file `.rtf`

   The topology file defines the atom types used in the **force field**;

   The CHARMM force field is divided into a topology file, which is needed to **generate the PSF file and a parameter file**, 

   - the <u>atom names, types, bonds, and partial charges</u> of each residue type; 

     and any <u>patches</u> necessary to link or otherwise <u>mutate</u> these basic residues.

   - allow the automatic <u>assignment of coordinates to hydrogens and other atoms missing</u>

   - it is preferable to use these pre-combined files. 

   http://mackerell.umaryland.edu/charmm_ff.shtml

4. The parameter file `.prm`

   provides a <u>mapping</u> between **bonded and nonbonded interactions** involving the various combinations of **atom types** found in the <u>topology</u> file and specific spring **constants** and <u>similar parameters</u> for all of the bond, angle, dihedral, improper, and van der Waals terms in the CHARMM potential function.

   contains all of the <font color=red>**numerical constants**</font> needed to evaluate forces and energies

   https://charmm-gui.org/?doc=lecture&module=molecules_and_topology&lesson=3

5. The configuration file `.conf` or `.namd`

   - specifies virtually everything about the simulation to be done
   - (except parallel execution details) portable
   - case-insensitive 
   - order-dependent (“action” commands)

6. Other

   - `.str`: extra info
   - `.crd`: coordinate
   - `.inp` input (into some program, like charmm-gui)
     - but tutorials use it as topology??
     - `.tcl` = `.pgn`

#### Appendix: details in topology files

- ref中的ACCE：acceptor
- IC and BILD are equivalent; BUILd would appear to be a 3rd synonym.
- <u>Explicit hydrogen bond terms are no longer present in the CHARMM force field</u> and are therefore not calculated by NAMD. The DONOR and ACCEPTOR statements, shown below, specify pairs of atoms eligible to form hydrogen bonds. The psfgen module in VMD ignores these statements and does not incorporate hydrogen bonding information into the PSF file.
- The DOUBLE statement is a synonym for BOND and does not affect the resulting PSF file. The order of bonds, or of the atoms within a bond, is not significant.

### My exploration

#### building the system

- http://zarbi.chem.yale.edu/ligpargen/namd_tutorial.html  

  build a single protein. resembles namd tutorial, which is

  ```tcl
  package require psfgen
  topology top_all27_prot_lipid.inp
  pdbalias residue HIS HSE
  pdbalias atom ILE CD1 CD
  segment U {pdb ubqp.pdb}
  coordpdb ubqp.pdb U
  guesscoord
  writepdb ubq.pdb
  writepsf ubq.psf
  
  # in .namd
  parameters          ../common/par_all27_prot_lipid.inp 
  ```

- https://www.youtube.com/watch?v=Pj40ZnybXds

  separate ligands and protein, generate .pdb and .psf files in GUI for all ligands (with H), combine them (load all .pdb .psf, save together), solvate, add parameters at simulation. 

  ```tcl
  package require psfgen
  resetpsf
  readpsf protein.psf
  readpsf ligand.psf
  readpsf ligand1.psf
  coordpdb protein.pdb
  coordpdb ligand.pdb
  coordpdb ligand1.pdb
  writepsf all.psf
  writepdb al1.pdb
  puts "HE TERMINADO!!”
  quit
  ```

  ![prms](https://cdn.jsdelivr.net/gh/gxf1212/notes@master/MD/MD.assets/prms.png)

  > he has to add a lot of prm files because of not adding topology when building! not recommended.

  Now I understand! but should we use lig.rtf when building?

- https://www.youtube.com/watch?v=IET_FvCk9XE very details VMD usage

  This Indian guy used AutoPSF to model the protein itself! and CHARMM-GUI for ligand. 
  
  finally merge the files as the above guy does, no `topology xxx`
  
  no simulation script
  
- FEP tutorial, build 18C6 and potassium

  ```tcl
  package require psfgen
  topology 18crown6.top
  segment 18C6 { pdb 18crown6.pdb }
  coordpdb 18crown6.pdb
  writepsf 18crown6.psf
  
  resetpsf
  topology top_all22_prot.inp
  segment POT { residue 0 POT }
  writepdb potassium.pdb
  writepsf potassium.psf
  
  resetpsf
  readpsf 18crown6.psf
  coordpdb 18crown6.pdb
  readpsf potassium.psf
  coordpdb potassium.pdb
  writepsf complex.psf
  writepdb complex.pdb
  
  # move K+ to the center of mass of 18C6
  set sel [atomselect top "segname 18C6"]
  set vec [measure center $sel]
  set sel2 [atomselect top "segname POT"]
  $sel2 moveby $vec
  set all [atomselect top "all"]
  $all writepdb compex_new.pdb
  
  # in .namd
  parameters              ../par_all35_ethers.prm
  ```

  > in protein-ligand binding, .namd files
  >
  > ```tcl
  > parameters           ../ForceField/par_all27_prot_lipid.prm
  > ```

I know! It does not matter how many molecules you want to include (just merge). You only need to build one molecule.

- https://www.youtube.com/watch?v=adxccOTFD_Q

  ```tcl
  mol new a48.psfmol addfile a48.pdb
  set al [atomselect top "all"]set sizeV [measure minmax $al]
  package require solvate
  solvate a48.psf a48.pdb -o a48.sol -b 1.5 -minmax f21 5855]} {200 184 176]
  mol delete top
  package require psfgenresetpsf
  ##工onize
  #conc = ion concentrationset conc 1.5
  package require autoionize
   autoionize -psf a48.sol.psf -pdba48.sol.pdb -o a48.out -sc $conc -cation POT
  ```

  

#### solvation and ionization

- still the many-parameter guy, tutorial 1, https://www.youtube.com/watch?v=IArpsQsZ95U 

  GUI-based

  a lazy command:

  ```tcl
  puts " Copy/paste for NAMD: "
  puts "cellBasisVector1 [ expr $xmax - $xmin ] 0 0 "
  puts "cellBasisVector2 0 [ expr $ymax - $ymin ] 0 "
  puts "cellBasisVector3 0 0 [ expr $zmax - $zmin ] "
  puts "cellOrigin [ expr ($xmax + $xmin)/2 ] [ expr ($ymax + $ymin)/2 ] [ expr ($zmax + $zmin)/2 ] "
  puts "-------------------------------------------------------"
  ```
  
  copy that into Tk Console. but see FYP-notes for complete

#### simulation parameters

##### equilibration steps

settings in tutorial:

1. minimize nonbackbone atoms

   ```
   minimize 1000
   output min_fix
   ```

2. min all atoms

   ```
   fixedAtoms off
   minimize 1000
   output min_all
   ```

3. heat with CAs restrained

   ```
   # langevin on
   run 3000
   output heat
   ```

4. equilibrate volume with CAs restrained

   ```
   langevinPiston on
   run 5000
   output equil_ca
   ```

5. equilibrate volume without restraints

   ```
   constraintScaling	0
   run 10000
   ```

> should adjust the # of step

##### values

This part is kind of 鸡肋. just for obtaining intuiations

| paper              | minimize1, type | mini whole   | after mini            | npt/ns     | prod | remark |
| ------------------ | --------------- | ------------ | --------------------- | ---------- | ---- | ------ |
| 1                  | backbone, cg    | 2+5000 steps | equ*2(npt)--prod(npt) | 0.004+0.01 | 100  |        |
| 2                  | water, cg       | 10,000       | equ(npt)--prod(nvt)   | 1          | 51   |        |
| 3                  | all, cg         | 20,000       | equ(npt)--prod(npt)   | 1.4(6?)    | 20   | vdW,12 |
| 4                  | all, sg         | 50,000       | equ(nvt)--prod(npt)   | 2+8        | 150  | gmx    |
|                    |                 |              |                       |            |      |        |
| K<sup>+</sup>-18C6 | all, cg         | 1000         | same as 3             | 10000      |      |        |
| my gmx             | all, cg         | 5000         | same as 4             | 0.1+0.1    |      |        |

common

- NAMD, TIP3P water, CHARMM ff, 310K, 1atm, PME
- 缓慢升温的script？

OUR: Simulations were performed with GROMACS 5.1.2. Van der Waals interactions were treated with a switching distance of 10 Å and a smooth cutoff distance of 12 Å. Electrostatic interactions were treated with Particle Mesh Ewald with a grid size of 1 Å

1. *Structural insight to hydroxychloroquine-3Clike proteinase complexation from SARS-CoV-2: inhibitor modelling study through molecular docking and MD-simulation study*

   > Subsequent energy minimization was performed by the conjugate gradient method. The process was conducted in two successive stages; initial energy minimization was performed for **2000** steps by fixing the backbone atoms, followed by a final minimization for **5000** steps that were carried out for all atoms of the system to ensure the removal of any residual steric clashes. Then the energy minimized structures were simulated at constant temperature (310 K) and pressure (1 atm) by Langevin dynamics (Gullingsrud et al., [2001](https://www.tandfonline.com/doi/full/10.1080/07391102.2020.1804458#)) using periodic boundary condition. The Particle Mesh Ewald method was applied for full-electrostatics and the Nose–Hoover Langevin piston method was used to control the pressure and dynamical properties of the barostat(Feller et al., [1995](https://www.tandfonline.com/doi/full/10.1080/07391102.2020.1804458#)). All-atom molecular dynamics simulation for 100 ns was carried out for HCQ, Mod I, and Mod II docked 3CL-protease structure. The atomic coordinates of simulated <u>structures were recorded at every 2 ps</u> for further analysis.

2. *SARS-CoV-2 RNA dependent RNA polymerase (RdRp) targeting: an in silico perspective*

   > **Water** is minimized (conjugate gradient), followed by the minimization of the protein system for **10000** steps each. The temperature is adjusted slowly to reach 310 K, and then an equilibration run is performed with the NPT ensemble (constant number of molecules, pressure, and temperature) for **1 ns**. This is followed by the **production run at the NVT ensemble** (constant number of molecules, volume, and temperature) for 51 ns (nvt???)

3. *In silico identification of widely used and welltolerated drugs as potential SARS-CoV-2 3Clike protease and viral RNA-dependent RNA polymerase inhibitors for direct use in clinical trials*

   > Energy minimization was performed for **20,000** steps by conjugate gradient method. Systems was gradually heated and equilibrated in NPT ensemble for 1.4 ns. Throughout equilibration, constrains on the proteins were gradually removed starting from 2 kcal/mol/Å2. At each stage constrains were reduced by 0.5 kcal/mol/Å2 and system were equilibrated for **0.4 ns**. After equilibration, a production run of 20 ns for each complex was performed. Time step was set to 2fs. van der Waals (12 Å cut-off) and long-range
   > electrostatic interactions (via particle-mesh Ewald) were included to calculate the force acting on the system. Production runs were performed at 310 K and under 1 atm

4. *In silico identification of novel SARS-COV-2 2′-O-methyltransferase (nsp16) inhibitors: structure-based virtual screening, molecular dynamics simulation and MM-PBSA approaches*

   > employing the steepest descent minimisation algorithm with a maximum of **50,000** steps and <10.0 kJ/mol force. Then, the solvated energy minimised structures were equilibrated with two consecutive steps. Firstly, <u>NVT ensemble with constant number of particles, volume and temperature (310 K) was done for **2 ns** followed by NPT ensemble with constant number of particles, pressure and temperature for **8 ns**</u>. In the two systems, only the solvent molecules were allowed for free movement to ensure its equilibration in the system while other atoms were restrained. The long range electrostatic interactions were obtained by the particle mesh Eshwald method with a 12 Å cut-off and 12 Å Fourier spacing[26](https://www.tandfonline.com/doi/full/10.1080/14756366.2021.1885396#). Finally, the three well-equilibrated systems (one empty protein and two protein-ligand complexes) were then entered the production stage without any restrains for 150 ns with a time step of 2 fs, and after every 10 ps the structural coordinates were saved to retrieve 15000 frames for each processed complex.

5. *Microbial Natural Products as Potential Inhibitors ofSARS-CoV-2 Main Protease (Mpro)*

   > Molecular dynamic simulations (MDS) for the free Mpro enzyme and ligand–enzyme complexes
   > were performed using the Nanoscale Molecular Dynamics (NAMD) 2.6 software [25], employing
   > the CHARMM27 force field [26]. Hydrogen atoms were added to initial coordinates for Mpro using
   > the psfgen plugin included in the Visual Molecular Dynamic (VMD) 1.9 software [27]. Subsequently,
   > the protein system was solvated using TIP3P water particles and 0.15 M NaCl. The equilibration
   > procedure comprised **1500** minimization steps followed by **30 ps** of MDS at 10 k with fixed protein atoms.
   > Then, the entire system was minimized over **1500** steps at 0 K, followed by gradual heating from
   > 10 to 310 K using temperature reassignment during the initial 60 ps of the **100 ps** equilibration
   > MDS. The final step involved NTP simulation (**30 ps**) using the Nose–Hoover Langevin piston
   > pressure control at 310 K and 1.01325 bars for density (volume) fitting [28]. Thereafter, the MDS
   > was continued for 25 ns for the entire system (20 ns for the enzyme–ligand complexes).

6. *The impact of curcumin derived polyphenols on the structure and flexibility COVID-19 main protease binding pocket: a molecular dynamics simulation study*

   >The generated NAMD compatible files for the
   >proteins and the ligands were then merged, and then complex subjected to solvated,
   >minimized, and equilibrated. The systems were solvated in a cubic water-box with the
   >explicit solvation model TIP3P.20 we used a distance of 1.0 Å between the cell wall and the
   >solvated atoms of the system. Counter-ions were also added to neutralize the system.
   >The energy minimization (n steps = **5,000**) was conducted using the steepest descent
   >approach (1,000 ps) for each protein-ligand complex. Particle Mesh Ewald (PME) method
   >was employed for energy calculation and electrostatic and Van der Waals interactions; cut-off distance for the short-range Van der Waals was set to 10 Å, where Coulomb cut-off
   >and neighbor list were fixed at 8 Å. Finally, a 50 ns molecular dynamics simulation
   >was carried out for all the complexes with n steps 1,000,000.

5. 

##### FEP: other users

| paper     | MD/ns | FEP each/ns | # windows | array                                                        | repeat |
| --------- | ----- | ----------- | --------- | ------------------------------------------------------------ | ------ |
| our redem | 100   |             | 21        | (0.00, 0.00001, 0.0001, 0.001, 0.01, 0.05, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 0.95, 0.99, 0.999, 0.9999, 0.99999, 1.00) | 10     |
| 1         | 20    | 2           | 9         | 0.00, 0.10, 0.25, 0.35, 0.50, 0.65, 0.75, 0.90, and 1.00     | 2      |
|           |       |             |           |                                                              |        |
|           |       |             |           |                                                              |        |
|           |       |             |           |                                                              |        |
|           |       |             |           |                                                              |        |

1. Assessing potential inhibitors of SARS-CoV-2 main protease from available drugs using free energy perturbation simulations







- fast pulling of ligand (FPL)

- 



### Specialized topics

#### Building Gramicidin A: Equilibration

see: http://www.ks.uiuc.edu/Research/namd/tutorial/NCSA2002/hands-on/

see details in the scripts

```
# execute in vmd console
eval [::http::data [::http::geturl http://www.ks.uiuc.edu/Research/namd/tutorial/NCSA2002/hands-on/control.vmd]]
```

and find necessary files in /tmp/

execute them in vmd console in order: (the first in step 0)

##### prepare the system

```shell
source view_protein.vmd
source build_protein.vmd
source replicate_lipids.vmd
source arrange_lipids.vmd
source save_positions.vmd
source add_water.vmd
source remove_water.vmd
source fix_backbone.vmd
source restrain_ca.vmd
# vmd -dispdev text -e
```

> files
>
> - pope1: initial
> - pope: many POPEs overlapping, to be moved
> - pope/protein_move: centered and arranged
> - pope_gram: combined
> - pope_gram_wat: with box
> - grama.pdb: water deleted, used in simulations

> questions on lipids arrangement
>
> - the template POPE should be roughly  parallel with, let's say, the z axis?
> - -35 is a subtle number. make sure the head of POPE is outwards...
> - POPE molecules not completerly separated? 35 and the length...
>
> in step 3
>
> - press 8. pressing shift to rotate, without shift to translate (originally, move the whole)
> - make the helix inside and parallel to the lipids
>
> in step 6
>
> - should delete all water around the lipid region ($|z|<z_0$)
> - and outside the periodic box (according to the shape). measure well!!
> - select and tag the atoms to be deleted by setting the beta value
>
> set beta = 1 for "protein and backbone", and 0.5 for "protein and name CA" to be restrained. write a pdb for both of them

##### run simulation

```shell
namd2 +p8 equil.namd > equil.log
```

> 20000 steps in total. see .namd for details

```shell
namd2 +p8 +idlepoll nptsim.namd > nptsim.log
```



#### ffTk tutorial

http://www.ks.uiuc.edu/Research/vmd/plugins/fftk/

restart Gaussian optimization: copy the .gjf file, add 'restart' to 'opt=', specify a .chk file.

http://bbs.keinsci.com/thread-1821-1-1.html



#### DNA-protein systems

https://bionano.physics.illinois.edu/tutorials/introduction-md-simulation-dna-protein-systems



### Free Energy Tutorial

#### enthane-to-enthane

conf files for NAMD FEP calculation；function details of runFEP etc. 

https://zhuanlan.zhihu.com/p/374427832

```shell
vmd setup.psf -pdb zero.fep # to color with Beta, see appearing and vanishing part
```

Recall that the system you have created contains a) atoms in the initial state that will gradually vanish, b) atoms that will gradually appear towards the final state, and c) atoms that are present throughout the whole transformation. 

NAMD distinguishes between these three classes of atoms based on information in the alchFile...Change the B column so that vanishing and appearing atoms are tagged with a -1.00 and 1.00 flag respectively, while unchanging atoms are tagged with 0.00.

Visualize: `vmd setup.psf -pdb zero.fep`. In the Graphics/Representations menu, set the selection text to “not water” and select the coloring method Beta.

`runFEP { start stop dLambda nSteps } `; alchEquilSteps and numSteps

Analysis: To obtain BAR free-energy differences, Extensions $\to$ Analysis $\to$ Analyze FEP Simulation. set Gram-Charlier order to 0

> “end-point catastrophes”: Molecules of the surroundings can in turn clash against incoming or outgoing chemical moieties, which can lead to numerical instabilities in the trajectory, manifested in large fluctuations in the average potential energy. The result is slow convergence.

#### solvate an ion

The distance separating the cation in the primary and the adjacent cells = 30 $\AA$

<img src="https://cdn.jsdelivr.net/gh/gxf1212/notes@master/MD/MD.assets/sendpix0.jpg" alt="lambda" style="zoom: 80%;" />

Solid lines represent outgoing atoms and dashed lines represent incoming atoms.
Two variables define how the perturbed system is coupled or decoupled from its environment, viz. λ~elec~ (alchElecLambdaStart) and λ~vdW~ (alchVdwLambdaEnd). 

> - `alchElecLambdaStart`: E interactions the appearing atoms starts to be scaled up
> - `alchVdwLambdaEnd`: V interactions the appearing atoms finishes to be scaled up
>
> In the present scenario, λ~vdW~ = 1.0, meaning that the van der Waals interactions for outgoing and incoming particles will be, respectively, scaled down starting from λ = 1.0 − λ~vdW~ = 0.0 to λ = 1.0, and scaled up starting from λ = 0.0 to λ = λ~vdW~. If λ~elec~ = 0.4, electrostatic interactions for outgoing and incoming particles are, respectively, scaled down from  λ = 0.0 to λ = 1.0 - λ~elec~ = 0.6, and scaled up from  λ = λ~elec~ to λ = 1.0.
>
> | atoms    | vdW       | elec      |
> | -------- | --------- | --------- |
> | outgoing | **1结束** | 0开始     |
> | incoming | 0开始     | **1结束** |
>
> 加粗的“1结束”表示两个参数的值

Charging an ion, ∆G is expected to vary with the size of the primary cell.  

the size-dependence correction is equal to +1/2 ξ~Ewald~ $(q_1^2 −q_0^2)$, where $q_0$ and $q_1$ are the charges for the reference and the target states — i.e. +1 and 0, and ξ~Ewald~ = −2.837/L, where L is the length of the cell???

charging free energy is very sensitive to the force field parameters utilized

#### mutation to alanine

> solvation free energy change

`alchDecouple` < Disable scaling of nonbonded interactions within alchemical partitions >
Acceptable Values: on or off
Default Value: off
Description: With alchDecouple set to on, only nonbonded interactions of perturbed, incoming and outgoing atoms with their environment are scaled, while interactions within the subset of perturbed atoms are preserved. On the contrary, if alchDecouple is set to off, interactions within the perturbed subset of atoms are also scaled and contribute to the cumulative free energy.

> on就是不更改intramolecular interaction



gmx: `couple-intramol`

- no
  All intra-molecular non-bonded interactions for moleculetype couple-moltype (page 231) are replaced by exclusions and explicit pair interactions. In this manner the decoupled state of the molecule corresponds to the proper vacuum state without periodicity effects.

- yes

  The intra-molecular Van der Waals and Coulomb interactions are also turned on/off. This can be useful for partitioning free-energies of relatively large molecules, where the intramolecular non-bonded interactions might lead to kinetically trapped vacuum conformations. The 1-4 pair interactions are not turned off.

> on=no, off=yes

```tcl
# a typical FEP setting
source                  ../../tools/fep.tcl

alch                    on
alchType                FEP
alchFile                ../solvate.fep
alchCol                 B
alchOutFile             forward-off.fepout
alchOutFreq             10

alchVdwLambdaEnd        1.0
alchElecLambdaStart     0.5
alchVdWShiftCoeff       4.0
alchDecouple            off

alchEquilSteps          100
set numSteps            500

runFEP 0.0 1.0 0.05 $numSteps
```

The whole last paragraphs are worth reading later......

> The net solvation free energy change ∆∆G for the Ala–Tyr–Ala $\to$ (Ala)3 transformation is found to be +7.7 kcal/mol. Alternately, a single decoupling/recoupling simulation indicates a hydration free energy difference of +8.1 kcal/mol, in agreement with the double annihilation scheme. This result may be related to the differential hydration free energy of side–chain analogues, i.e. the difference in the hydration free energy of methane and p–cresol, that is, respectively, 1.9 + 6.1 = +8.0 kcal/mol [21, 22]. Interestingly enough, Scheraga and coworkers have estimated the side–chain contribution for this mutation to be equal to +8.5 kcal/mol [23].
>
> This very close agreement with experimental determinations based on side–chain analogues, as well as other computational estimates, may be in part coincidental or due to fortuitous <u>**cancellation of errors**</u>. Indeed, some deviation could be expected due to environment effects — viz. the mutation of a residue embedded in a small peptide chain versus that of an isolated, prototypical organic molecule[24] — and, to a lesser extent, the limited accuracy of empirical force fields. The first explanation may be related to the concept of “self solvation” of the side chain. Here, the tyrosyl fragment is not only solvated predominantly by the aqueous environment, but also, to a certain degree, by the peptide chain, which, under certain circumstances, can form hydrogen bonds with the hydroxyl group.

> Moreover, it should be noted that even for a small and quickly relaxing system such as the hybrid tripeptide, convergence of the FEP equation requires a significant time. In some cases, <u>**very short runs may give better results**</u> than moderately longer ones, because the former provide a local sampling around the starting configuration, while the latter start exploring nearby conformations, yet are not long enough to fully sample them.

> In general, whether or not intramolecular interactions ought to be perturbed — i.e. `alchDecouple` set to off or on, respectively — requires careful attention. As has been seen here, ignoring perturbed intramolecular interactions is computationally advantageous in the sense that it obviates the need for the gas-phase simulation depicted in Figure 9. This choice is fully justified in the case of rigid, or sufficiently small molecules. If, however, the system of interest can assume multiple conformations, setting alchDecouple to on may no longer be appropriate. This is due to the fact that on account of the environment, specifically its permittivity, the conformational space explored in the low-pressure gaseous phase is likely to be different from that in an aqueous medium.
>
> - small, gaseous----on; large: off

> In all cases, <u>visualizing MD trajectories</u> is strongly advisable if one wishes to understand the behavior of the system and to solve possible sampling issues. Looking at the present tyrosine-to-alanine trajectories, it appears that the main conformational degree of freedom that has to be sampled is the rotation of the tyrosine hydroxyl group. Convergence is actually faster for the solvated system than for the tripeptide in vacuum, because fluctuations of the solvent help the tyrosine side chain pass the rotational barriers, which does not happen frequently in vacuum.

#### K^+^ binding to 18C6

The size-dependence correction imposed by the long-range nature of charge–dipole interactions is expected to cancel out if the dimensions of the simulation cell are identical for the two vertical legs of the thermodynamic cycle.

> use solvated.psf, equilibration.dcd for displacement of K^+^ and center of 18C6
>
> ```shell
> displacement.
> xmgrace COM-ion.dat
> ```
>
> The maximum fluctuation in the distance between the center of mass of 18–crown–6 and the potassium ion will serve as the basis for a positional restraint introduced in the subsequent free-energy calculation, in which the ion is annihilated in its bound state.

note: previous NAMD (colvar), Default Value for lowerWalls:  `lowerBoundary`. manually add `lowerWall` and `upperWall`

The difference between the net free-energy changes for the ion in its free and bound states yields the binding free energy, to which the contribution due to the positional restraint ought to be added. Confining the ion in a spherical volume enclosed in the ionophore to prevent it from escaping as host:guest coupling fades out is tantamount to a loss of translational entropy, which can be evaluated analytically. This entropic term corresponds to a free-energy contribution equal to 
$$
−1/β \ln(c_0\Delta v)
$$
(∆v is the effective volume sampled by the guest and $c_0$ is the usual standard concentration), which in the case of a spherical volume element of 0.52 $\AA^3$ , amounts to about 4.8 kcal/mol.

### Protein:ligand BFE

standard binding free energies

the geometrical and the alchemical routes are overall equivalent.

#### Geometrical route



what is X-ray.pdb?

what does the restraint mean?

#### Alchemical route

##### runs and performances

```shell
# run FEP
namd3 +p2 frwd-01.namd > frwd-01.log
namd3 +p2 back-01.namd > back-01.log
# rerun
namd3 +p2 frwd-re01.namd > frwd-re01.log
namd3 +p2 back-re01.namd > back-re01.log
# actually using TI
namd3 rest-01.namd > rest-01.log
namd3 rest-02.namd > rest-02.log
```

the hugest files are: `.colvars`, `.traj`, `.log`, `.fepout`, `.dcd`

timestep: 2fs. use namd3

| system            | alchEquilSteps | numSteps       | numMinSteps | numWindows | resource & time used |
| ----------------- | -------------- | -------------- | ----------- | ---------- | -------------------- |
| Alchemy-bound     | 100000         | 400000 (0.8ns) | 1000        | 20         |                      |
| Alchemy-unbound   | 50000          | 250000 (0.5ns) | 1000        | 20         |                      |
| Restraint-bound   |                |                |             |            | 5.4059h, similar     |
| Restraint-unbound |                |                |             |            |                      |

Alchemy-bound, 11366 atoms

1 CPU+1 GPU, ~0.00530185/step, need ~29.45 hours; 2 CPU+2 GPU 0.00318633/step

forward breaks at 0.48~0.5 (then 0.62~0.64), backward at 0.52~0.5

Alchemy-unbound, 11612 atoms

2 CPU+2 GPU, 0.00438178/step

##### post-treatment

```shell
parsefep -forward frwd.fepout -backward back.fepout -gc 0 -bar
parsefep -forward frwd-01.fepout -backward back-01.fepout -gc 0 -bar
# parsefep -forward ../forward-shift.fepout -backward ../backward-shift.fepout -gc 0 -bar 
```

plot FEP calculation

```shell
# execute this file, which contains xmgrace command, to obtain the summary.png
# using temp.ParseFEP.log, temp.reverse.log
bash ./grace.summary.exec
```

As for the restraints

```shell
grep "dA/dLambda" rest-01.log > rest-01.t
```



##### restarting FEP

- find in the .log file: `TCL: Running FEP window` to see Lambda value
- find in the .fepout file: `#NEW FEP WINDOW: LAMBDA SET TO` to see Lambda value

cannot get continuous files, just concatenate the .fepout file for analysis

seems no need to use the restart file, just restart from the interrupted window...

> question: does the later lambda window use the velocity etc. from the former window?

##### notes in the tutorial

1. Evaluating the contribution to the standard binding free energy of the geometrical restraints is appreciably less demanding from a computational perspective. The contribution of each restraint acting on a collective variable is determined alchemically, by decreasing in a stepwise fashion the force constant from its nominal value to zero — and proceeding similarly in the opposite direction. Yet, in contrast with the free-energy calculations wherein the substrate is decoupled reversibly from the protein, the present simulations will be carried out in the framework of **thermodynamic integration**, within the colvars module.

2. For the alchemical route, stratification is also strongly advised, and typical simulation times can amount to <u>as low as 6 ns</u> to evaluate the free-energy contribution of <u>the geometrical restraints</u> in the bound state to <u>as much as 40 ns for the BAR estimator</u>. The reader is encouraged to examine alternate sampling strategies capable of offering the best precision:cost ratio.

3. remember to

   - monitor convergence of the free energy
   - verify that thermodynamic micro-reversibility is satisfied (ParseFEP)

   > `alchVdwLambdaEnd set` to 1.0 and `alchElecLambdaStart` set to 0.5: When the substrate is removed from the protein, electrostatic interactions (0~0.5) are turned off faster than van der Waals interactions (0~1). For λ > 0.5, only the latter remain, which explains the point of inflection, midway on the reaction path.

4. the relative inaccuracy of the forward simulation is related to the area under P~1~(∆U) where there is no overlap with P~0~(∆U)

#### summary

- Central to both the alchemical and the geometrical routes is the choice of atoms, or groups thereof, utilized to define the position and the orientation of the ligand with respect to the protein. It should be clearly understood that ∆G~0~ is an <u>invariant of this choice</u>. 
- A good reference three-dimensional structure? A natural choice is the **energy-minimized** crystallographic structure of the protein:ligand complex solvated in the aqueous environment. Another relevant option consists in running an adequately long molecular-dynamics simulations past the thermalization stage and compute an average structure, which ought to be energy-minimized to remove spurious averaging artifacts, notably from freely rotating methyl groups

### VMD usage (summarized)

BTW, record some of the features in VMD

https://www.ks.uiuc.edu/Training/Tutorials/vmd/tutorial-html/ the same as .pdf

- scripting https://www.ks.uiuc.edu/Training/Tutorials/vmd/tutorial-html/node4.html

1. Anything that can be done in the VMD graphical interface can be done with text commands. The Tcl commands that you enter in the VMD TkConsole window can also be entered in the vmd console window.

2. open some molecule

   ```shell
   vmd y2a.psf y2a.pdb
   vmd y2a.psf -pdb y2a.fep
   ```

3. solvate (should be similar to solvating with Extensions---Modeling---Add Solvation Box)  (but see 02 charging an ion?)

   ```tcl
   package require solvate
   solvate y2a.psf y2a.pdb -t 15 -o solvate
   ```

4. visualize trajectory?

   ```shell
   vmd ../../solvate.psf forward.dcd
   ```

5. run in terminal

   ```shell
   vmd -dispdev text -e ubq.pgn
   vmd -dispdev text -e wat_sphere.tcl
   ```

6. in cmd, **parsefep** <option 1> <option 2> ..., with the following options:

   - -forward <file name>: FEP *alchOutFile* file for the forward transformation,
   - -entropy: Compute enthaply and entropy differences,
   - -gc <max order>: Gram-Charlier expansion at a given order,
   - -gauss: Gaussian approximation to model the underlying probability distribution,
   - -backward <file name>: FEP *alchOutFile* file for the backward transformation,
   - -<sos|bar>: use the SOS or BAR estimator.

   ```shell
   parsefep -forward forward.fepout -backward backward.fepout -gc 0 -bar
   ```

7. At VMD comd, when ? appears, type ] and Enter

   https://www.ks.uiuc.edu/Research/vmd/mailing_list/vmd-l/0516.html

8. run in Tk Console (load .pdb and .psf) or terminal/cmd of VMD. an example:

   ```tcl
   package require psfgen
   topology ../common/top_all22_prot.inp
   topology 18crown6.top
   
   segment A {pdb 18crown6.pdb}
   coordpdb 18crown6.pdb A
   
   writepsf 18C6.psf
   writepdb 18C6.pdb
   ```

   notes:

   - remember to include **packages**
   - use `resetpsf` in Tk Console, no need to use in cmd
   - top selection is not useful in cmd

   

9. atomselect

   ```tcl
   atomselect molid selection
   ```

   resid, resname, alpha, protein, water

   and, not, ....

10. 



### GPU tutorial

files at http://www.ks.uiuc.edu/Training/Tutorials/namd-index.html

http://www.ks.uiuc.edu/Research/namd/2.14/ug/node110.html

中科大--NAMD 软件安装指南

http://www.ks.uiuc.edu/Research/namd/utilities/ 其他安装包、benchmark体系

#### the official tutorial

##### simulation

```shell
namd2 +p8 +setcpuaffinity +idlepoll benchmark_gpu_cpu8.conf > benchmark_gpu_cpu8.log
namd2_cpu +p8 +setcpuaffinity benchmark_cpu8.conf > benchmark_cpu8.log

grep Benchmark benchmark_gpu.log
```



##### visualization



##### Accelerated Molecular Dynamics

an all-atom enhanced sampling technique that enables the study of large conformational changes in proteins which normally occur on millisecond or longer time scales. 



#### parameters of the command

> from NVIDIA website

{charmOpts}的参数说明：

- ++nodelist {nodeListFile} – 多节点运行需要指定的节点列表文件
- Charm++ 也支持++mpiexec 参数， 用于作业调度系统.
- ++p \$totalPes – 指定总的 PE 线程数
  - ++ppn \$pesPerProcess – 每个节点的线程数， 推荐：  #ofCoresPerNode/#ofGPUsPerNode - 1，即[(节点核数)/(每节点 GPU 数) ]-1，留一个核心用于通信。
  - 总进程数为\$totalPes/\$pesPerProcess

{namdOpts}的参数说明：

- NAMD 继承{charmOpts}后面设置的参数，如： '++p' ， '++ppn' ， '+p'

- 如果没有{charmOpts}，采用 multi-core 计算，使用'+p' 设置计算的核数.

- '+setcpuaffinity' 选项是为了核绑定，不会到处跳动。

- '+pemap #-#' – 这是设置 thread 线程和 CPU 核心的映射。

- '+commap #-#' – 这是设置通信线程的范围。

- 范例：双 CPU，每 CPU 16 核心，参数设置如下:

  ```
  +setcpuaffinity +pemap 1-15,17-31 +commap 0,16
  ```

GPU 选项:

- '+devices {CUDA IDs}' – 指定 NAMD 调用的 GPU ID
- if did not find +devices i,j,k,... argument, using all

示例

```shell
namd2 +p8 +setcpuaffinity +idlepoll task.conf > task.log
```

#### testing

测试 https://zhuanlan.zhihu.com/p/36217563

https://www.nvidia.cn/data-center/gpu-accelerated-applications/namd/

https://www.ks.uiuc.edu/Research/namd/benchmarks/ 官网测试

https://zh.wikipedia.org/wiki/%E9%98%BF%E5%A7%86%E8%BE%BE%E5%B0%94%E5%AE%9A%E5%BE%8B 阿姆达尔定律，并行计算的效率提升

##### Alpha版本

https://www.ks.uiuc.edu/Research/namd/alpha/3.0alpha/#downloads Alpha版本介绍

> - is intended for small to medium systems (**10 thousand to 1 million atoms**). For larger simulations,  you should stick to the regular integration scheme
> - suitable for the  computational capabilities of a **single GPU**-accelerated compute node
> - it **might slow your simulation** down if you are not running on a Volta, Turing, or Ampere GPU!  If your GPU is older, we recommend that you stick to NAMD 2.x.
> - The single-node version of NAMD 3.0 has <font color=red>**almost everything offloaded to the GPU**</font>, so large CPU core counts are NOT necessary to get good performance. We recommend running NAMD **with a low +p count, maybe 2-4** depending on system size, especially if the user plans on running **multiple replica** simulations within a node.

- NAMD3上的试验
  
  - 一般，4个CPU就配4个GPU核心，8个对应8个（1个——0个？）
  - 小体系，**4个不一定比1个快多少**。。（可能差不多）
    - 所以说，可以省出CPU来多跑几个体系？
  
- 测试
  
  - 在1-LargeSim，和namd2基本一样...
  
  - 在9w原子的RdRp，+p8稍微快于namd2，比+p2没提升太多
  
  - 在ApoA1，namd3还变慢了。。
  
  - 前面的FEP
  
    > Alchemy-bound, 11366 atoms
    >
    > 1 CPU+1 GPU, ~0.00530185/step, need ~29.45 hours; 2 CPU+2 GPU 0.00318633/step
    >
    > forward breaks at 0.48~0.5 (then 0.62~0.64), backward at 0.52~0.5
    >
    > Alchemy-unbound, 11612 atoms
    >
    > 2 CPU+2 GPU, 0.00438178/step
  
  - 

> 还是不对啊，大小体系都没有加速！难道真是GPU不合适？
>
> 要跟无GPU的对比，再试试

##### experiences

- 

##### Summary & Tips

> 版本特点
>
> - 2.1.3 版本的 Linux-x86_64-multicore-CUDA 是在 CUDA 8.0 下编译的二进制可执行文件，如果运行平台也是 CUDA 8.0，可以直接运行，如果是更高的版本，需要从源码编译安装. 我的: 
>
>   - NAMD_Git-2021-08-23_Linux-x86_64-multicore-CUDA, Version Nightly Build (2021-08-23) Platforms
>
>     > Alchemical free-energy perturbation is not supported in CUDA version
>
>   - [NAMD_3.0alpha9_Linux-x86_64-multicore-CUDA-SingleNode.tar.gz](https://www.ks.uiuc.edu/Research/namd/alpha/3.0alpha/download/NAMD_3.0alpha9_Linux-x86_64-multicore-CUDA-SingleNode.tar.gz) (Standard simulation.) **(February 28, 2021)**
>

GPU的配置

- 相比于纯CPU版，GPU确实能提速4～5倍（GPU tutorial）

- namd2,namd3都是CUDA版本，似乎在CPU多的时候(如8个)自动启用GPU，少了即使加`+idlepoll`都不启用....

  - 但是，**namd2真的很依赖CPU**！！

    > RdRp，去掉+p8 +idlepoll，performance有时不太变？？

  - 我的机子，大一点的（100k），还是用namd3

  - 到底用哪个，每个体系还是测试一下

- NAMD 计算时，计算量、CPU进程数和 GPU 数量匹配很重要。
  - **体系太小，GPU利用率很低，加速不明显。**
    - 甚至GPU个数越少越好,太并行不好!!! GPU过多,增加CPU也没用.
  - CPU进程数增加也能帮助小体系，CPU数多才启用GPU。。（namd2/3的自动机制）
  - p.s. more GPU means more communication time
  - 

- 

##### 后面应该测试的

- 为什么比Gromacs慢好多？？
- 最优CPU和GPU核数，namd2怎么分配的
- namd3在小体系的表现
- 试一下namd3少CPU多跑几个体系？

> wall clock指实际流逝的时间
>
> CPU总时间（user + sys）是CPU执行用户进程操作和内核（代表用户进程执行）系统调用所耗时间的总和，即该进程（包括线程和子进程）所使用的实际CPU时间。
>
> https://blog.csdn.net/xingchenxuanfeng/article/details/73549506



# Misc experiences

There might be something valuable, thus they can be integrated...but most are drafts, add to gitignore later

## 22.2.17 Amber building PEP

> failed
>
> ```shell
> # ligand
> f=PEP
> obabel $f.pdb -opdb -O ${f}_h.pdb -p 7.0 --partialcharge gasteiger
> obminimize -ff MMFF94 -n 1000 ${f}_h.pdb > ${f}_m.pdb # -3 charge!
> 
> antechamber -i ${f}.pdb -fi pdb -o ${f}_h.pdb -fo pdb -pf y -c wc
> ```


openbabel induces connectivity error in the molecule sometimes, and this time both the oxygen atom in the carboxyl group is assigned a negative charge.

antechamber: `-c bcc -nc 3` (or mulliken, etc.), if not equal to formal charge, will perform QM calculation (Gasteiger will not)

> unchanged
>
> ```shell
> antechamber -i ${f}.pdb -fi pdb -o ${f}.gjf -fo gcrt -pf y \
> -gm "%mem=4096MB" -gn "%nproc=4" -ch ${f} -nc -1 \
> -gk "#B3LYP/6-31G* em=GD3BJ scrf=solvent=water iop(6/33=2) pop=CHELPG" -ge ${f}_resp.gesp -gv 1 
> antechamber -i ${f}_resp.gesp -fi gesp -o ${f}.mol2 -fo mol2 -pf y -c resp
> parmchk2 -i ${f}.mol2 -f mol2 -o ${f}.frcmod
> ```
>
> goes fine

If possible, you could open this document with markdown editors.

You may try programs to add the real charge on PEP because I think the hydrogens in the carboxyl group and phosphate group should be removed.

Here is the command I used:

Try to edit the molecule in GView to make sure the bonds are right (actually some tutorials did so? see UROPS notes)

```shell
# lig
# conda activate A
f=PEP_gv
f=PEP2_gv
antechamber -i ${f}.pdb -fi pdb -o ${f}.gjf -fo gcrt -pf y \
-gm "%mem=4096MB" -gn "%nproc=4" -ch ${f} -nc -3 \
-gk "#B3LYP/6-31G* em=GD3BJ scrf=solvent=water SCF=tight \
iop(6/33=2,6/42=6,6/50=1) pop=CHELPG" -ge ${f}_resp.gesp -gv 1 -at gaff
g16 ${f}.gjf
antechamber -i ${f}_resp.gesp -fi gesp -o ${f}.mol2 -fo mol2 -pf y -c resp
parmchk2 -i ${f}.mol2 -f mol2 -o ${f}.frcmod
# python ~/Desktop/work/projects/undergraduate/NUS-UROPS/md/prepare/align.py ~/Desktop/work/practice/with others/AroG-PEP $f
python ~/Desktop/work/projects/undergraduate/NUS-UROPS/md/prepare/align.py ~/Desktop/work/projects/undergraduate/SDH/md/lig1/ lig1

# pro
cat ./original/input_E2ES.pdb | grep ATOM > ori.pdb
sele resi  1-350
save chain1.pdb, sele
sele resi  351-700
save chain2.pdb, sele
pdb4amber -i chain1.pdb -o pro1.pdb
pdb4amber -i chain2.pdb -o pro2.pdb
rm ori.pdb chain1.pdb chain2.pdb
cat ./original/input_E2ES.pdb | grep MN > mn.pdb

# combine
tleap
source leaprc.protein.ff14SB
pro1 = loadpdb pro1.pdb 
pro2 = loadpdb pro2.pdb
check pro1 
check pro2
source leaprc.gaff2
loadamberparams PEP_gv.frcmod
lig1 = loadmol2 PEP_gv_aligned.mol2
check lig1
loadamberparams PEP2_gv.frcmod
lig2 = loadmol2 PEP2_gv_aligned.mol2
check lig2
source leaprc.water.tip3p
ion = loadpdb mn.pdb
com = combine {pro1 pro2 lig1 lig2 ion}
# -5*2-3*2+2*2=-12
solvatebox com TIP3PBOX 10.0
charge com
addIons2 com Cl- 36 Na+ 48
check com
saveamberparm com com.prmtop com.inpcrd
quit

conda activate Acpype
acpype -p com.prmtop -x com.inpcrd -d -c user
cd com.amb2gmx
mv com_GMX.gro com.gro
mv com_GMX.top com.top
grep "WAT" -rl ./com.gro | xargs sed -i "s/WAT/SOL/g" 
grep "WAT" -rl ./com.top | xargs sed -i "s/WAT/SOL/g" 
```

then generally the same if you use gromacs...

Note: in mdp:

```
tc-grps                  = Protein_MOL_MN Water_and_ions
energygrps               = Protein MOL MN
```

- energy: list all main species
- tc: Water_and_ion (exclude MN!) and the other

updated gmx .mdp files? problem with rvdw settings

```shell
gmx grompp -f md.mdp -c npt.gro -r npt.gro -n index.ndx -t npt.cpt -p com.top -o final.tpr -maxwarn 1
gmx mdrun -deffnm final
```

after that

```shell
# visualize
gmx trjconv -f final.trr -o final_later.xtc -b 2000 -e 10000 -dt 20
echo 0 | gmx trjconv -s final.tpr -f final_later.xtc -n index.ndx -o final_noPBC.xtc -pbc mol -ur compact -dt 20
load npt.gro, final
load final_noPBC.xtc, final

# analysis
echo 0 | gmx trjconv -f final.trr -o final_nojump.xtc -pbc nojump -e 10000 -dt 20 # -b 2000
echo "3\n 3" | gmx rms -s final.tpr -f final_nojump.xtc -o rmsd_ca.xvg -tu ns # C alpha
xmgrace rmsd_ca.xvg
echo 3 | gmx rmsf -f final_nojump.xtc -s final.tpr -o rmsf-per-residue.xvg -ox average.pdb -oq bfactors-residue.pdb -res
xmgrace rmsf-per-residue.xvg

```

## 22.3.14 pca

### traj convert

https://ambermd.org/tutorials/basic/tutorial2/section6.htm

load into vmd in turn:

- .prmtop

- .nc

- > .mdcrd

[vmd save trajectory](https://www.researchgate.net/post/How_to_write_pdb_file_of_protein_ligand_system_of_a_particular_frame_using_VMD)   select the molecule, File--save coordinates

then

```shell
acpype -p EAS.prmtop -x EAS.inpcrd
# should use nojump
echo 0 | gmx trjconv -f EAS.trr -o EAS_nj.xtc -pbc nojump 
# remove _GMX
gmx make_ndx -f EAS.gro -o index.ndx # only if necesssary
gmx grompp -f md.mdp -c EAS.gro -r EAS.gro -p EAS.top -o EAS.tpr -maxwarn 1
```

### FEL

> [Jerkwin FEL](https://jerkwin.github.io/2017/10/20/GROMACS%E5%88%86%E5%AD%90%E5%8A%A8%E5%8A%9B%E5%AD%A6%E6%A8%A1%E6%8B%9F%E6%95%99%E7%A8%8B-%E5%A4%9A%E8%82%BD-%E8%9B%8B%E7%99%BD%E7%9B%B8%E4%BA%92%E4%BD%9C%E7%94%A8/#8-%E8%87%AA%E7%94%B1%E8%83%BD%E5%BD%A2%E8%B2%8C%E5%9B%BE)
>
>  FEL通常使用两个变量来表示, 它们反映了体系的特定性质, 并表征了构象变化. 例如你可以使用绕一根特定键的扭转角, 或分子的回旋半径, 或相对于天然状态的RMSD来作为这两个变量. 第三个变量是自由能, 可以从体系相对前面所选变量的分布(概率分布)来估计. 当使用三维表示时, 形貌图中的谷表示低自由能区域, 代表体系的亚稳定构象, 丘表示连接这些亚稳定状态的能量势垒.
>
> 帧数要尽量多！
>
> 不太一样，这里是指定了两个变量，就是算了xyz的一堆数据点。这里是Rg和RMSD
>
> 基于covar的是你的PCA变量，其实也一样，就是要算PCA变量而已

http://sobereva.com/73   steps

- 使用g_covar获取协方差矩阵的一切
- 使用g_anaeig将轨迹投影到PC1与PC2上
- 使用ddtpd做自由能面图

#### covar

对PCA分析, 我们主要关心蛋白质骨架上的原子. 但是backbone效果很不明显，所以用C alpha。#是backbone的

```shell
echo "3\n 3" | gmx covar -s EAS.tpr -f EAS_nj.xtc -o eigenvalues.xvg -v eigenvectors.trr -xpma covar.xpm -ascii covariances.dat -xpm covara.xpm
gmx xpm2ps -f covara.xpm -o covara.eps -do covara.m2p
xmgrace eigenvalues.xvg
```

> g_covar -f 输入的轨迹文件 -s 输入的结构文件 -n [输入的index文件] -o 输出的本征值文件 -v 输出的本征向量文件 -av 输出的平均结构文件 -l 输出的日志文件 -ascii [输出的协方差矩阵数据文件] -xpm [图形描述的N阶协方差矩阵] -xpma [图形描述的3N阶协方差矩阵]
>
> Note: the fit and analysis group are identical,
>       while the fit is mass weighted and the analysis is not.
>       Making the fit non mass weighted.

> dimension of the matrix: 3 mes number of atoms of your group

#### anaeig

```shell
echo "3\n 3" | gmx anaeig -s EAS.tpr -f EAS_nj.xtc -v eigenvectors.trr -eig eigenvalues.xvg -first 1 -last 2 -2d 2d.xvg
xmgrace 2d.xvg
```

> 首先allnowat.xtc各帧会被align到eigenvectors.trr里记录的参考结构上，然后投影到-first和-last所选的本征向量，命令中1、2就是指前两个本征向量，即PC1和PC2。-2d 2d.xvg代表将每帧结构在PC1和PC2上的投影值输出到2d.xvg。

> you may want to inspect the first two eigenvalues
>
> ```shell
> gmx anaeig -s ../topol.tpr -f ../traj.xtc -v eigenvectors.trr -eig eigenvalues.xvg -proj proj-ev1.xvg -extr ev1.pdb -rmsf rmsf-ev1.xvg -first 1 -last 1
> gmx anaeig -s ../topol.tpr -f ../traj.xtc -v eigenvectors.trr -eig eigenvalues.xvg -proj proj-ev2.xvg -extr ev2.pdb -rmsf rmsf-ev2.xvg -first 2 -last 2
> ```
>
>  选项`-extr`沿着选定的特征值从轨迹中提取极端结构. 把这些结构导入PyMOL查看
>
> `-proj`：分别输出各个

尝试理解

- 聚类画的图横坐标是时间，PCA画的图横坐标是空间。
- 纵坐标都是每一帧的构象，重复采样的结果
- 但其实都是对空间（坐标、结构）聚类
  - 前者是直接算距离，后者是提出新指标
  - 纵坐标是构象，一般搞成概率密度。算能量（？）

23.1 dPCA 二面角主成分分析

- https://zhuanlan.zhihu.com/p/479009558
- [Jerkwin](https://jerkwin.github.io/GMX/GMXman-8/#811-二面角主成分分析)

## 22.5.2 SDH

```
antechamber -i lig1_aligned.mol2  -o lig.mol2 -fo mol2 -at gaff -c bcc -rn MOL
parmchk2 -i lig.mol2 -f mol2 -o lig.frcmod
```





```
tleap
source leaprc.protein.ff14SB
ca = loadpdb ca_noh.pdb 
cb = loadpdb cb_noh.pdb
cc = loadpdb cc_noh.pdb
cd = loadpdb cd_noh.pdb
source leaprc.gaff
loadamberparams lig4.frcmod
lig = loadmol2 lig4_aligned.mol2

loadamberparams lig.frcmod
lig = loadmol2 lig.mol2
check lig
source leaprc.water.tip3p
com = combine {ca cb cc cd lig}
solvatebox com TIP3PBOX 12.0
charge com
addIons2 com Cl- 88 Na+ 85
check com
saveamberparm com com.prmtop com.inpcrd
quit
```

















