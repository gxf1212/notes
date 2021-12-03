# Notes on FYP

Notes on the final year project (毕设), Nov 2021~May 2022.

## background

> 9.27

- It was originally developed by Gilead Sciences, Inc. to treat Ebola virus disease.
- RdRp=NSP12. cofactor: nsp7/nsp8, etc.
  - of course needs helicase (NSP13), etc.

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

### other

- *High-throughput rational design of the remdesivir binding site in the RdRp of SARS-CoV-2: implications for potential resistance*

哪些突变能resistance



### our paper and guidance

The relative binding free energy between remdesivir(RemTP) and ATP was calculated to be -2.80 ± 0.84 kcal/mol, where remdesivir bound much stronger to SARS-CoV-2 RdRp than the natural substrate ATP.  

Key residues D618, S549 and R555 are found to be the contributors to the binding affinity of remdesivir.

https://www.linkedin.com/in/leili-zhang-046769bb

https://scholar.google.com/citations?user=Kwwx85EAAAAJ&hl=en



> 11.16
>
> Of course. We should be able to share the files for purposes such as reproducibility. Plus, all data that are published are made available to the public, including these files. Force fields are also already shared in the published version of the paper. But for your purpose, I think by only reproducing the MD simulations and free energy calculations of ATP should suffice. 
>
> Please find the attached zip file containing structures for ATP-RdRp-Mg complex (MD simulation), ATP-water ("free state" FEP), ATP-RdRp-Mg complex ("bound state" FEP). **ATP force field is in the default CHARMM force field files. All force fields are in CHARMM36, downloaded from MacKerrell's group page.** Please let me know if anything is unclear. Also, please use NAMD to conduct all simulations to get similar results. I don't think version matters.
> https://drive.google.com/file/d/1bMH1-PUtWAadcOmz8MTEbhy4jcZgtPUk/view?usp=sharing



## work calendar

21.11.16

other todo:

- download CHARMM ff files
- read the paper carefully!
- dock RemTP on the structure





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

2. 

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

2. 



### Some other notes with VMD and NAMD

> ERROR: failed on end of segment MOLECULE DESTROYED BY FATAL ERROR!

probably need to add top/itp file







## Stage 1 Protocol

### Notes

#### protein-ATP system

the RdRp, residue name has already been aliased. only one chain

why only one Mg? 虽然确实要两个，但第二个的位置至今under debate。。

notice the binding mode?



### Prepare another ligand

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

##### info&convert

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

If from a normal .pdb

```shell
f=atp
obabel ${f}.pdb -opdbqt -O ${f}.pdbqt -as --partialcharge gasteiger 
```

> The ligand may move away after obabel, but it doesn’t matter

> Alternative: ADTools
>
> - Edit--Hydrogen--Merge non-polar
> - Edit--Atom--Assign AD4 Type
> - Edit--Charge--Compute Gasteiger
> - Save as PDBQT
>   - always Browse for a name!!
>   - maybe select what to save
>
> failed?? compare the text!

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
obabel ${f}.pdbqt -opdb -O ${f}_d.pdb  # you have to got .pdb first, or c
obabel ${f}_d.pdb -opdb -O ${f}.pdb -p 7.0 -as
rm ${f}_d.pdb
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

#### build complex-method 1

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

> #### build complex-method 2
>
> use console, include topology
>
> Modeling--Tk Console
>
> ```tcl
> package require psfgen
> resetpsf
> topology top_all36_prot.rtf
> topology /home/gxf/vmd/lib/plugins/noarch/tcl/readcharmmtop1.2/top_all27_prot_lipid_na.inp
> coordpdb rdrp.pdb
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
> #### build complex-method 3
>
> build with Gromacs and AmberTools?

##### Appendix: CHARMM-GUI generate files for ligand

but not used in method 1

1. Use CHARMM-GUI---input generator---ligand reader and modeller

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

   focus on `ligandrm.pdb/psf`, which can be put into a merging .tcl, as **an alternative way of AutoPSF** in generating files for ligand (other tools for protein, etc?). Carefully choose the force field!

   > my experience
   >
   > at first, when I upload the built .pdb file, or replace ATOM with HETATM, or add hydrogen, the server did not recognize the ligand, always.
   >
   > 1. 11.27, align 2ILY (original structure) with the built .pdb, use its ATP
   >
   >    find 2 kinds of topologies in step 2
   >
   >    - toppar_all36_na_nad_ppi.str            NAD, NADH, ADP, ATP and others.
   >    - top_all36_cgenff.rtf., par_all36_cgenff.prm. but with hydrogen. can I later remove?
   >      - if you modify the protonation state, you can still not generate a correct cGenFF structure. The “Exact” field only provides ATP in toppar_all36_na_nad_ppi.str
   >      - maybe I’ll use toppar_all36_na_nad_ppi.str first
   >
   > 2. 11.28, CHARMM-GUI failed building Mg2+

#### solvation and ionization

- solvate https://www.ks.uiuc.edu/Research/vmd/plugins/solvate/
- autoionize https://www.ks.uiuc.edu/Research/vmd/plugins/autoionize/

##### method 1 (scripting, easier?)

In the last step, you have obtained combine.pdb and .psf

```shell
vmd merged.psf -pdb merged.pdb
```

where the solvation script writes:

```tcl
package require solvate
solvate merged.psf merged.pdb -t 15 -o solvated
```

In a new vmd session, load the solvated structure

```tcl
package require psfgen
resetpsf

readpsf solvated.psf
coordpdb solvated.pdb

set everyone [atomselect top all]
measure minmax $everyone
measure center $everyone
```

This is meant to 



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

> this GUI doesn’t have ionization, neither choose water model?? 

###### Ionization

Extensions--Modeling--Add ions (autoionize)

very straightforward

- Choose salt, additional ions
- Neutralize and set NaCl concentration to 0.15 mol/L

> it’s not replacing water mols, it adds ions

##### measurement

> note: system info
>
> RdRp-ATP-Mg













### NAMD for MDS





TIP3P water





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









### Clustering

```
gmx cluster
```







### FEP (same) with NAMD



























