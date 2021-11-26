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



### initial structure

### our paper

The relative binding free energy between remdesivir(RemTP) and ATP was calculated to be -2.80 ± 0.84 kcal/mol, where remdesivir bound much stronger to SARS-CoV-2 RdRp than the natural substrate ATP.  

Key residues D618, S549 and R555 are found to be the contributors to the binding affinity of remdesivir.

https://www.linkedin.com/in/leili-zhang-046769bb

https://scholar.google.com/citations?user=Kwwx85EAAAAJ&hl=en



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



### AutoDockTools and vina

- when writing file, always browse and name the file!
- when recording vina parameters, centers are on the left! not right!



### Pymol

delete命令！



### VMD techniques

杂记, some extra functions

#### General

1. run in terminal

   ```shell
   vmd -dispdev text -e combine.tcl
   ```

2. 

#### VMD Graphics

1. Graphics--representation: for visualization.

   select atoms syntax?

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

4. 

5. 



### Some other notes with VMD and NAMD

> ERROR: failed on end of segment MOLECULE DESTROYED BY FATAL ERROR!

probably need to add top/itp file







## Protocol

### Notes

#### protein-ATP system

why only one Mg? 虽然确实要两个，但第二个的位置至今under debate。。

notice the binding mode?



### Prepare another ligand

#### info&convert

RemdesivirTP https://pubchem.ncbi.nlm.nih.gov/compound/56832906

```shell
# pubchem 2d, for docking
f=remtp
obabel ${f}.sdf -osdf -O ${f}-t.sdf --gen3D 
obminimize -ff MMFF94 -n 1000 ${f}-t.sdf > ${f}.pdb
obabel ${f}.pdb -opdbqt -O ${f}.pdbqt -as --partialcharge gasteiger 
rm ${f}.sdf ${f}-t.sdf ${f}.pdb
```

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



```shell
f=remtp
# vina
vina --config conf_rigid.txt --ligand ${f}.pdbqt > ${f}_log.txt
vina_split --input ${f}_out.pdbqt
rm ${f}_out.pdbqt
mkdir ${f}
mv ${f}_* ./${f}

```





### Prepare the system with VMD etc.

some tutorials:

- https://www.youtube.com/watch?v=IET_FvCk9XE

- https://www.youtube.com/watch?v=Pj40ZnybXds

  > separate ligands and protein, generate .pdb and .psf files in GUI for all ligands (with H), combine them, solvate. 

> other
>
> - http://zarbi.chem.yale.edu/ligpargen/namd_tutorial.html

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

1. normally build your complex.pdb (by docking etc). Remember the Mg^2+^.

   > whatever name is ok. we don’t use this .pdb

2. generate files for ligand

   1. Use CHARMM-GUI---input generator---ligand reader and modeller

      > **CHARMM GUI notes**
      >
      > after GUI, the ligand name is changed into LIG
      >
      > - Only molecules in the **HETATM** record in a PDB file are recognized.
      > - **adopt available RCSB SDF structure** preferentially
      > - make sure that the Marvin JS structure is correct
      > - <font color=red>All hydrogen and missing atoms should be explicitly placed for accurate result.</font>
      > - Users can modify the protonation state if necessary. the coordinates will be preserved.
      >   - or select a similar structure
      > - if you are to upload file, .mol2 is prefered? 
      > - To make position of .psf file right, you should upload your own .pdb file!

   2. 

3. load complex.pdb into VMD, 

   1. Extensions---Modeling---Automatic psf Builder would be a GUI

      > **AutoPSF notes**
      >
      > - .pdb file provides molecular infomation (namely coordinates)
      > - topology files (.itp, .rtp) contain all the parameters, i.e. force field info
      > - top files convert .pdb files into .psf files, which contains full information
      >
      > should click in every step
      >
      > if no patch, directly generate files at step 3

   2. use console to combine: Extensions---Tk console

   2. use console, include topology?

4. 



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





























