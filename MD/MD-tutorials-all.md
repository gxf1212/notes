# Tutorials

The official (or well-known) tutorial for Gromacs, AmberTools, NAMD, etc.

自己在学习。后面要整理，把草稿放到quote里！

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



#### notes

离子名称:如果遇到困难, 请参考`ions.itp`中的正确命名.



#### 备注

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

### psfgen : building system

#### user guide

##### steps

Generating PSF and PDB files for use with NAMD will typically consist of the following steps:
1. Preparing separate PDB files containing individual segments of protein, solvent, etc. before running
psfgen.
2. Reading in the appropriate topology definition files and aliasing residue and atom names found in the
PDB file to those found in the topology files. This will generally include selecting a default protonation
state for histidine residues.
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

In psfgen, each of these groups must be assigned to their own segment. This applies most strictly in the case of protein chains, each of which must be assigned to its own segment so that N-terminal and C-terminal patches can be applied. 

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



#### tutorial

an example http://www.ks.uiuc.edu/Research/namd/tutorial/NCSA2002/hands-on/



## NAMD

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
  - 

##### notes

- Hydrogen atoms, however, are not typically detected by X-ray crystallography since their sizes are too small to interact with the radiation

- in `top_all27_prot_lipid.inp`

  The viable states are one in which the δ nitrogen of histidine is protonated (listed with residue name “HSD" in the topology file), one in which the $\varepsilon$ nitrogen of histidine is protonated (“HSE"), and one in which both nitrogens are protonated (“HSP").

  ![组氨酸- 生物百科- 生物行](/home/gxf/desktop/work/practice/MD/tutorials.assets/images.png)

- load .psf and then .pdb file


##### restart a simulation

```tcl
set inputname input
set outputname output

bincoordinates			$inputname.coor
binvelocities				$inputname.vel 
ExtendedSystem		  $inputname.xsc

firsttimestep 92000

# if you have also specified a .vel restart file, comment out
# temperature         $temperature
 
# Do not set the periodic cell basis if you have also specified an .xsc restart file!
# cellBasisVector1    20.0  0    0
# cellBasisVector2     0   20.0  0
# cellBasisVector3     0    0   50.0
# cellOrigin                 0    0    0

# comment out processes that no longer need!
# minimize 1000
```

about restart files:

- NAMD can also create restart files, one of which is a pdb file which stores atomic coordinates, and the other of which stores atomic velocities. `restartname` < restart files prefix >   Default Value: `outputname.restart`
- Furthermore, NAMD will store the file from the previous cycle each time it writes a new file. The filename is appended with a .old
  extension; it is created in case NAMD fails in writing the new restart file.

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

   provides a <u>mapping</u> between bonded and nonbonded interactions involving the various combinations of atom types found in the <u>topology</u> file and specific spring constants and <u>similar parameters</u> for all of the bond, angle, dihedral, improper, and van der Waals terms in the CHARMM potential function.

   contains all of the **numerical constants** needed to evaluate forces and energies

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

#### my exploration: building the system

- http://zarbi.chem.yale.edu/ligpargen/namd_tutorial.html  for a single protein. resembles namd tutorial, which gives

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

- https://www.youtube.com/watch?v=IET_FvCk9XE

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
  writepdb al1.pdb，
  puts "HE TERMINADO!!”
  quit
  ```

  ![prms](/home/gxf/desktop/work/Git-repo/notes/MD/MD-tutorials-all.assets/prms.png)

  he has to add a lot of prm files because of not adding topology when building! not recommended.

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

- I know! It does not matter how many molecules you want to include (just merge). You only need to build one molecule.

- 

- 

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

<img src="/home/gxf/desktop/work/practice/MD/tutorials.assets/sendpix0.jpg" alt="lambda" style="zoom: 80%;" />

Solid lines represent outgoing atoms and dashed lines represent incoming atoms.
Two variables define how the perturbed system is coupled or decoupled from its environment, viz. λ~elec~ (alchElecLambdaStart) and λ~vdW~ (alchVdwLambdaEnd). 

> In the present scenario, λ~vdW~ = 1.0, meaning that the van der Waals interactions for outgoing and incoming particles will be, respectively, scaled down starting from λ = 1.0 − λ~vdW~ = 0.0 to λ = 1.0, and scaled up starting from λ = 0.0 to λ = λ~vdW~. If λ~elec~ = 0.4,
> electrostatic interactions for outgoing and incoming particles are, respectively, scaled down from  λ = 0.0 to λ = 1.0 - λ~elec~ = 0.6, and scaled up from  λ = λ~elec~ to 1 λ = 1.0.
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

> Moreover, it should be noted that even for a small and quickly relaxing system such as the hybrid tripeptide, convergence of the FEP equation requires a significant time. In some cases, <u>very short runs may give better results</u> than moderately longer ones, because the former provide a local sampling around the starting configuration, while the latter start exploring nearby conformations, yet are not long enough to fully sample them.

> In general, whether or not intramolecular interactions ought to be perturbed — i.e. `alchDecouple` set to off or on, respectively — requires careful attention. As has been seen here, ignoring perturbed intramolecular interactions is computationally advantageous in the sense that it obviates the need for the gas-phase simulation depicted in Figure 9. This choice is fully justified in the case of rigid, or sufficiently small molecules. If, however, the system of interest can assume multiple conformations, setting alchDecouple to on may no longer be appropriate. This is due to the fact that on account of the environment, specifically its permittivity, the conformational space explored in the low-pressure gaseous phase is likely to be different from that in an aqueous medium.
>
> - small, gaseous----on; large: off

> In all cases, <u>visualizing MD trajectories</u> is strongly advisable if one wishes to understand the behavior of the system and to solve possible sampling issues. Looking at the present tyrosine-to-alanine trajectories, it appears that the main conformational degree of freedom that has to be sampled is the rotation of the tyrosine hydroxyl group. Convergence is actually faster for the solvated system than for the tripeptide in vacuum, because fluctuations of the solvent help the tyrosine side chain pass the rotational barriers, which does not happen frequently in vacuum.

#### K+ binding to 18C6

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

1 CPU+1 GPU, ~0.00530185/step, need ~29.45 hours; 2 CPU+2 GPU0.00318633/step

forward breaks at 0.48~0.5 (then 0.62~0.64), backward at 0.52~0.5

Alchemy-unbound, 11612 atoms

2 CPU+2 GPU, 0.00438178/step

##### post-treatment

```shell
parsefep -forward frwd.fepout -backward back.fepout -gc 0 -bar
parsefep -forward frwd-01.fepout -backward back-01.fepout -gc 0 -bar
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
> - The single-node version of NAMD 3.0 has <font color=red>almost everything offloaded to the GPU</font>, so large CPU core counts are NOT necessary to get good performance. We recommend running NAMD **with a low +p count, maybe 2-4** depending on system size, especially if the user plans on running **multiple replica** simulations within a node.

- 测试
  - 在1-LargeSim，和namd2基本一样...
  - 在ApoA1，namd3还变慢了。。
- 特点
  - 4个CPU就配4个GPU核心，8个对应8个（1个——0个？）
  - 小体系，4个不一定比1个快。。（可能差不多）

还是不对啊，大小体系都没有加速！难道真是GPU不合适？

##### Summary & Tips

- 后面应该测试
  - 最优CPU和GPU核数
  - namd3在小体系的表现

版本特点

- 2.1.3 版本的 Linux-x86_64-multicore-CUDA 是在 CUDA 8.0 下编译的二进制可执行文件，如果运行平台也是 CUDA 8.0，可以直接运行，如果是更高的版本，需要从源码编译安装. 我的: 
  - NAMD_Git-2021-08-23_Linux-x86_64-multicore-CUDA, Version Nightly Build (2021-08-23) Platforms
  
    > Alchemical free-energy perturbation is not supported in CUDA version
  
  - [NAMD_3.0alpha9_Linux-x86_64-multicore-CUDA-SingleNode.tar.gz](https://www.ks.uiuc.edu/Research/namd/alpha/3.0alpha/download/NAMD_3.0alpha9_Linux-x86_64-multicore-CUDA-SingleNode.tar.gz) (Standard simulation.) **(February 28, 2021)**

GPU的配置

- namd2,namd3都是CUDA版本，似乎在CPU多的时候(如8个)自动启用GPU，少了即使加`+idlepoll`都不启用....
- NAMD 计算时，计算量、CPU进程数和GPU数量匹配很重要。
  - 体系太小，GPU利用率很低，加速不明显。
  - 甚至GPU个数越少越好,太并行不好!!! GPU过多,增加CPU也没用.
  - CPU进程数增加也能帮助小体系，CPU数多才启用GPU。。
- 相比于纯CPU版，GPU确实能提速4～5倍



