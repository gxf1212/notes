# Preparation and Modeling

This page is about protein/ligand/.... structure modeling and preprocessing, including docking, virtual screening, etc.



# Protein structure

see also [NA-simulation](NA-simulation.md), [Metal-ion](Metal-ion.md), etc. for these systems

## Homology modeling

精细side chain控制，还是要谨慎用AlphaFold呀，不如同源建模

### Swiss-Model

you can provide alignment file or .pdb file as a template in Swiss-Model server

Swiss-Model的结果，最长也就是模板的长度？？



you can provide alignment file or .pdb file as a template in Swiss-Model server

### Modeller

[ModWeb (ucsf.edu)](https://modbase.compbio.ucsf.edu/modweb/)

[Tutorial (salilab.org)](https://salilab.org/modeller/tutorial/basic.html)



Can it just add missing residues, rather than build all side chains again? Maybe ligand interaction map will be changed...

### I-TASSER

> not very good?

https://zhanggroup.org/I-TASSER/

https://zhanggroup.org/COTH for protein complex

it gives broken structure…



### Other

Prime: Schrödinger that incorporates homology modeling and fold recognition into one package. remove mutations introduced in the crystallization constructs (if any) and build missing side chains and missing loops.



[PHYRE2 Protein Fold Recognition Server (ic.ac.uk)](http://www.sbg.bio.ic.ac.uk/phyre2/html/page.cgi?id=index)

mainly single chain. Threading





## New prediction

For CASP details, read [CASP](#CASP)

### AlphaFold

https://github.com/sokrypton/ColabFold   all kinds of fold

https://alphafold.ebi.ac.uk/ 

https://colab.research.google.com/github/deepmind/alphafold/blob/main/notebooks/AlphaFold.ipynb









### RosettaFold

[Servers | RosettaCommons](https://www.rosettacommons.org/software/servers)



### ESMFold

https://www.cgl.ucsf.edu/chimerax/docs/user/tools/esmfold.html



### CombFold

[Nat. Methods | CombFold预测大型蛋白质复合物结构 (qq.com)](https://mp.weixin.qq.com/s/ttTl4rSWlGmWrLLELrTQHQ)



### Other

https://tulip.rnet.missouri.edu/deepcomplex/web_index.html

also, no restraint



## Protonation state

> [!NOTE]
>
> check especial the region around ligands!

放弃了，反正case-by-case，实在是想起来了就用一下H++

His整体是6.0，one that is part of an imidazole ring (Nπ) and one that is part of an imine group (Nτ). The Nπ nitrogen has a lone pair of electrons that can act as a Lewis base and accept a proton（带双键那个）。这就是MD的不足了，只能同时用一个形式，不能叠加态。

### H++ server

[H++ (web-based computational prediction of protonation states and pK of ionizable groups in macromolecules)](http://newbiophysics.cs.vt.edu/H++/)

The right way to obtain Amber FF file:

```shell
ambpdb -c xxx.crd -p xxx.top > ambpdb.pdb
# maybe then use pdb4amber. but tleap can recognize this
```

> [!NOTE]
>
> I don't think in all cases the results (for HIS) is right...for this single conformation, we try to form as many H bonds as possible.

Disadvantage: clean the structure before submitting

### propka3

Simple conda install. Simple run:

```shell
propka3 xx.pdb
```

propka3 doesn't print HIS because their residue name is HSE, etc. .... PoDaFang

```Bash
for key in HSE HSD HSP HID HIE HIP ; do
grep $key -rl $file.pdb | xargs sed -i "s/${key}/HIS/g" 
done
```

cannot model and replace residue names? write a script?

它没说忽略了其他成分，配体等

### Other

- http://compbio.clemson.edu/pka_webserver/

- [PlayMolecule - proteinPrepare: predict protonation pH](https://playmolecule.com/proteinPrepare)

- https://github.com/isayevlab/pKa-ANI



## Loop modeling

or remodeling

- [ModLoop (ucsf.edu)](https://modbase.compbio.ucsf.edu/modloop/)
- [Loop Modeling (rosettacommons.org)](https://new.rosettacommons.org/demos/latest/tutorials/loop_modeling/loop_modeling)
- http://rcd.iqfr.csic.es/ (not available?)



## Structure Fixing

### PDBFixer







# Docking

Multimers(Colabfold): https://colab.research.google.com/github/sokrypton/ColabFold/blob/main/AlphaFold2.ipynb

HADDOCK: https://wenmr.science.uu.nl/haddock2.4/submit/1

CoDockPP: http://codockpp.schanglab.org.cn/

I-TASSER: https://zhanggroup.org/I-TASSER/



HDOCK: http://hdock.phys.hust.edu.cn/ 有离线版  

## Protein-protein docking

or Protein-peptide. We should **also try protein complex structure prediction**!

### HADDOCK

[HADDOCK file submission](https://wenmr.science.uu.nl/haddock2.4/submit_file)

> [HADDOCK Web Server - Settings](https://wenmr.science.uu.nl/haddock2.4/library)
>
> [Obtaining HADDOCK – Bonvin Lab](https://www.bonvinlab.org/software/haddock2.4/download/)

- almost rigid docking by default
- many features, like restraint, MD optimization (with CHARMM FF/NAMD), etc.

> HADDOCK distinguishes itself from ab-initio docking methods in the fact that it encodes information from identified or predicted protein interfaces in ambiguous interaction restraints (AIRs) to drive the docking process. It also allows to define specific unambiguous distance restraints (e.g. from MS cross-links) and supports a variety of other experimental data including NMR residual dipolar couplings, pseudo contact shifts and cryo-EM maps.
> HADDOCK can deal with a large class of modeling problems including protein-protein, protein-nucleic acids and protein-ligand complexes, including multi-bodies (N>2) assemblies.



![](https://cdn.jsdelivr.net/gh/gxf1212/notes@master/research/Programming-Preparation.assets/HADDOCK-flexible.jpg)

haddock flexible is in step 2



### zdock

https://zdock.umassmed.edu/

- totally rigid…..
- specify interacting and non-interacting residues
- very fast



### RosettaDock

[submit RosettaDock-5.0 job - ROSIE (jhu.edu)](https://r2.graylab.jhu.edu/apps/submit/docking)

> [Servers | RosettaCommons](https://www.rosettacommons.org/software/servers)
>
> [Index - ROSIE (jhu.edu)](https://r2.graylab.jhu.edu/)

it’s flexible, ensemble docking by default. 



### FlexPepDock

http://flexpepdock.furmanlab.cs.huji.ac.il/



### Clus Pro 2.0

https://cluspro.bu.edu/home.php

### trRosetta

[yanglab.nankai.edu.cn](http://yanglab.nankai.edu.cn/trRosetta/)



Oh, I think there must be more tools....

## Protein-NA docking

### HADDOCK



## Protein-ligand docking



### AutoDock vina series

move from virtual screening...



## Other

Allosite: provide a protein, 光预测别构在哪，不管正构在哪...

[AlloReverse (shsmu.edu.cn)](https://mdl.shsmu.edu.cn/AlloReverse/)



# Modeling novel residues

> this also applies to unit of a polymer

## VMD+CHARMM

非标准残基的教程

- [ks.uiuc.edu/Training/Tutorials/science/forcefield-tutorial/forcefield.pdf](https://www.ks.uiuc.edu/Training/Tutorials/science/forcefield-tutorial/forcefield.pdf)
- [topology-tutorial.pdf (uiuc.edu)](http://www.ks.uiuc.edu/Training/Tutorials/science/topology/topology-tutorial.pdf)

summary

- hybrid topology做对是一切的基础
- 需更改mutator.tcl
- 需手动设定在哪突变
- 其他都是自动化的

做topology的要求：

### For novel residues

- 一个原则是，尽量和parent residue接近。

  Take the sulfonated TYR as example, the partial charges in the aromatic ring will change, but the atom types of your common part had better be the same as your parent residue. 

  > correction: mainchain atom charges must be the same. That's one of the reasons why we mutate everything to Ala instead of Gly.

- 另一个原则是，如果不想编辑pdb文件（两个态单独pdb都要生成），就需要写完整的IC，还要check sidechain conformation

  只要有IC，完全可以不需要PDB文件。但是CHARMM-GUI和cgenff不会提供任何IC，只有从现存的rtf中找

#### Search from similar topology

1. in CHARMM FF folder (toppar/stream/prot). You may search and visualize them in [CHARMM-GUI PDB reader](https://www.charmm-gui.org/?doc=input/pdbreader) --- Non-standard amino acid / RNA substitution --- select image (the figure below). Search by "Parent amino acid" or smiles substructure. 

   - `toppar_all36_prot_modify_res.str`: a lot of modified residues
   - `toppar_all36_prot_c36m_d_aminoacids.str`: D amino acids
     those files also include common patches.
   - `toppar_all36_prot_na_combined.str`: phosphorylated residues or patches

   Finally, find to residue entries in those files. **You should first use this if what you want is already in them.**

2. in CHARMM-GUI LigandRM, search for similar residues. Upload that residue, and it may suggest similar parts from cgenff.rtf, etc (but may not include `prot_modify_res.str`). 

3. If no exact match is found, we may combine groups from >=2 residues. Modularization in CHARMM FF is great! [Force field tutorial](https://www.ks.uiuc.edu/Training/Tutorials/science/forcefield-tutorial/forcefield.pdf) seems to provide an example of combining.

It's acceptable to make the topology by hand (since examination is necessary), but FEP should be automatic.

> Other ways to search for useful parts?
>
> read FF files, always gain so much...

<img src="https://cdn.jsdelivr.net/gh/gxf1212/notes@master/research/AA-MD-FEP.assets/search-nonstandard-residue.png" alt="image-20221105205515004" style="zoom:50%;" />

visit [this site](https://www.charmm-gui.org/?doc=input/pdbreader_uaa&jobid=6615771465&rowId=0&segid=PROA) for the above page!

##### steps

- find where you can graft topologies
- copy atoms here
  - adjust charges
  - add bonds (and impr, etc.)
  - add IC terms
- try setup and run, so that you know what parameters are missing

##### Notes during making tys.rtf

> - the provided TYM.rtf is different from the provided TYS residue. It was built like general small molecules. Though Leili also mentioned this CHARMM-GUI workflow, I will try to avoid using LigandRM. 
> - Doing that manually doesn't hurt because I have to inspect the files. But for small molecules, (automatically) doing some QM optimization is useful.
> - SO4- charge: -1.005


Both of the workflows get different atom types from normal TYR. I'll just keep most of the types aligned with standard TYR. 

- It's strange in the provided .str that the atomtype of CB is like that of small molecules (CG321), whose bond parameters with CA (CT1) doesn't exist...as the partial charges are the same, I just change CG321 into CT2 (like normal residues), but it still won't work. **So all atom types (that could be aligned) in the side chain should also align with the parent standard residue.**
- Maybe, we can transfer the IC terms of TYR to TYS (if cannot align?)...

#### Modify from LigandRM

I do not recommend building with LigandRM since it just treats our residue as a normal small molecule and atom names are not that of amino acids, unless you make an effort to replace the standard AA part (e.g. a small molecule attached to a standard AA) back, and add missing parameter terms...

But one advantage for this: theoretically this can be automated (for many similar ligands).



没有写IC的novel residue（rtf），guesscoord以后坐标全变成0了。然而我们从小分子做的很难自己整一个IC（而且也不对）
只能在vmd里，先把其他链建好（guesscoord），加入novel residue，做一个selection但不选择原来那个residue，就是一个坐标是对的pdb、psf了，当然要set一下segname,resid,chain id等。然后加水和离子。

再试试吧，发现guesscoord对它没有影响，psf里的键也是对的，虽然pymol显示不出来..

### Write a two-end patch

This is mainly for strange peptides with noncanonical cyclizations, e.g. Glu and Lys, or even involving UAAs.

写一个类似disulfide的patch的技术要领：

- find a template for the new group (atom type, charge, etc.)
- delete unnecessary atoms, but keep those aligned
- add or redefine atoms
- add necessary bonds (if pdb file is nicely built, no need to add angles/dihedrals)
- add necessary parameters (copy from others)

e.g. connecting lysine and glutamate

```
read rtf card append
* residues and patches associated with reactive RNA FF
*
31  1
! from ALY, stick to protein atom types. 
! other refs: KHB/LA2, PRK

!  HN-N                   
!    HE1  HZ1   HG1
!    |    /    /
!  --CE--NZ   CG--
!    |     \ /  \ 
!    HE2    CD   HG2
!           ||
!           OE1
PRES NHGC       ! Lysine NH2 linked to Glutamic acid CO(O-)
DELETE ATOM 1HZ2
DELETE ATOM 1HZ3
DELETE ATOM 2OE2
GROUP   
ATOM 1CE  CT2    -0.02
ATOM 1HE1 HA2     0.09
ATOM 1HE2 HA2     0.09
ATOM 1NZ  NH1    -0.47
ATOM 1HZ1 H       0.31
GROUP
ATOM 2CD  C       0.51
ATOM 2OE1 O      -0.51
GROUP
ATOM 2CG  CT2    -0.18  
ATOM 2HG1 HA2     0.09 
ATOM 2HG2 HA2     0.09  

BOND 1NZ  2CD

END

ANGLES
CT2A CT2  C      52.000   108.0000 ! from CT2  CT1  C

DIHEDRALS
C    CT2  CT2A  CT1     0.2000  3     0.00 ! From X    CT1  CT2  X  !temporary RJP
CT2A CT2  C    O        1.4000  1     0.00 ! from O    C    CT1  CT2
HA2  CT2A CT2  C        0.2000  3     0.00 ! Same as C CT CT3 HA3 ; kevo
```

and

```tcl
package require psfgen
psfcontext reset

topology top_all36_prot_1.rtf
topology conh2.str
pdbalias residue HIS HSE
pdbalias atom ILE CD1 CD

segment PEP {
    pdb peptide_dh.pdb
    first NTER
    last CT2
    }
patch NHGC PEP:14 PEP:10
# regenerate angles dihedrals
coordpdb peptide_dh.pdb PEP
guesscoord
writepdb peptide.pdb
writepsf peptide.psf
package require solvate
# ionize complex
mol delete all
mol load psf peptide.psf pdb peptide.pdb
solvate peptide.psf peptide.pdb -t 12 -o system
exit
```

## AmberTools+tleap

[Amber Basic Tutorials - Tutorial A26 ](https://ambermd.org/tutorials/basic/tutorial5/index.php) or

[Amber基础教程B5：模拟绿色荧光蛋白及构建修饰的氨基酸残基|Jerkwin](https://jerkwin.github.io/2018/01/07/Amber基础教程B5-模拟绿色荧光蛋白及构建修饰的氨基酸残基/)

[Amber Custom Residue Parameterization – JIGGLINGS AND WIGGLINGS](https://carlosramosg.com/amber-custom-residue-parameterization)

existing residue libraries:

- [The AMBER ff15ipq-m Force Field Tutorial](http://ambermd.org/tutorials/advanced/tutorial36/index.php): a library of unnatural amino acids, especially beta amino acids
- `mod_amino.lib`, very few
- sth containing `ipq`: protonation states

### e.g. 2d3i

separate all parts, and model them

```shell
ambpdb -p *.top -c *.crd > ambpdb.pdb
# manually check
metalpdb2mol2.py -i al.pdb -o al.mol2 -c 3
antechamber -fi pdb -fo mol2 -i co3.pdb -o co3.mol2 -at gaff -nc -2 -c bcc -pf y
parmchk2 -i co3.mol2 -o co3.frcmod -f mol2
```

deprotonated TYR

```shell
# create a terminal-capped model
antechamber -fi pdb -i 1.pdb -fo ac -o tym.ac -c bcc -at amber -nc -1
# manually compare atom types with standard AA
# .mc file: define mainchain atoms other than head/tail; omit cap atoms
prepgen -i tym.ac -o tym.prepin -m tym.mc -rn TYM
parmchk2 -i tym.prepin -f prepi -o frcmod.tym -a Y \
         -p $AMBERHOME/dat/leap/parm/parm10.dat  # get parameters of protein residues
grep -v "ATTN" frcmod.tym > frcmod1.tym # Strip out ATTN lines
parmchk2 -i tym.prepin -f prepi -o frcmod2.tym  # other params from GAFF
```

> Note: `ATTN: need revision` lines might be problematic and removed (replaced by those from gaff). 
>
> `parm10.dat` works with Amber14SB. If you require other backgrounds, maybe use other parm files
>
> Amber14引入了parmchk2, 用法和parmchk 一样. 而parmchk2要比parmchk要好, 因为它将对所有子结构进行搜索打分, 对所有参数比较打分得到其中最适合的参数，而parmchk只是检查其中某几个子结构的参数文件来获取缺失参数.

where `tym.mc` is defined as

```
HEAD_NAME N
TAIL_NAME C
MAIN_CHAIN CA
OMIT_NAME C01
OMIT_NAME C02
OMIT_NAME H01
OMIT_NAME H02
OMIT_NAME H03
OMIT_NAME H04
OMIT_NAME H05
OMIT_NAME H06
PRE_HEAD_TYPE C
POST_TAIL_TYPE N
CHARGE -1.0
```

and `1.pdb` is extracted and termini are capped with (e.g.) CH<sub>3</sub> that is omitted above

````pdb
ATOM      1  N   TYR    88      -5.248  -1.000  25.800  1.00  0.00           N  
ATOM      2  CA  TYR    88      -6.622  -0.750  26.213  1.00  0.00           C  
ATOM      3  C   TYR    88      -6.654  -0.356  27.678  1.00  0.00           C  
ATOM      4  O   TYR    88      -5.631  -0.404  28.358  1.00  0.00           O  
ATOM      5  CB  TYR    88      -7.529  -1.969  25.966  1.00  0.00           C  
ATOM      6  CG  TYR    88      -7.069  -3.286  26.553  1.00  0.00           C  
ATOM      7  CD1 TYR    88      -6.085  -4.047  25.921  1.00  0.00           C  
ATOM      8  CD2 TYR    88      -7.660  -3.804  27.711  1.00  0.00           C  
ATOM      9  CE1 TYR    88      -5.703  -5.289  26.413  1.00  0.00           C  
ATOM     10  CE2 TYR    88      -7.281  -5.053  28.216  1.00  0.00           C  
ATOM     11  CZ  TYR    88      -6.302  -5.792  27.557  1.00  0.00           C  
ATOM     12  OH  TYR    88      -5.941  -7.046  28.016  1.00  0.00           O  
ATOM     13  C01 TYR    88      -7.976   0.107  28.317  1.00  0.00           C  
ATOM     14  C02 TYR    88      -5.306  -1.790  24.562  1.00  0.00           C  
ATOM     15  H01 TYR    88      -6.062  -2.568  24.661  1.00  0.00           H  
ATOM     16  H02 TYR    88      -8.238   1.095  27.938  1.00  0.00           H  
ATOM     17  H03 TYR    88      -7.861   0.152  29.400  1.00  0.00           H  
ATOM     18  H04 TYR    88      -8.768  -0.599  28.066  1.00  0.00           H  
ATOM     19  H05 TYR    88      -4.334  -2.248  24.376  1.00  0.00           H  
ATOM     20  H06 TYR    88      -5.564  -1.138  23.727  1.00  0.00           H  
ATOM     21  H   TYR    88      -4.628  -1.486  26.434  1.00  0.00           H  
ATOM     22  HA  TYR    88      -7.033   0.094  25.657  1.00  0.00           H  
ATOM     23  HB2 TYR    88      -8.525  -1.764  26.351  1.00  0.00           H  
ATOM     24  HB3 TYR    88      -7.627  -2.100  24.888  1.00  0.00           H  
ATOM     25  HD1 TYR    88      -5.602  -3.652  25.047  1.00  0.00           H  
ATOM     26  HD2 TYR    88      -8.414  -3.230  28.229  1.00  0.00           H  
ATOM     27  HE1 TYR    88      -4.931  -5.858  25.922  1.00  0.00           H  
ATOM     28  HE2 TYR    88      -7.747  -5.444  29.107  1.00  0.00           H  
TER   
END
````

finally go to tleap

```shell
tleap
source leaprc.protein.ff14SB
source leaprc.gaff
source leaprc.water.tip3p
loadAmberPrep tym.prepin
loadAmberParams frcmod2.tym
loadAmberParams frcmod1.tym
loadAmberParams frcmod.ions234lm_iod_tip3p
loadAmberParams co3.frcmod
protein = loadpdb fixed.pdb
al = loadpdb al.pdb
co3 = loadmol2 co3.mol2
pro = combine {protein al co3}
solvatebox pro TIP3PBOX 12.0
charge pro
# avoid alternating ions
addIonsRand pro Cl- 30
addIonsRand pro Na+ 34
saveamberparm pro pro.prmtop pro.inpcrd
quit
```

> [!NOTE]
>
> `frcmod1.tym`, which is load later, overwrites what are already in `frcmod2.tym`

`tym.prepin`

```
   0    0    2

This is a remark line
molecule.res
TYM   INT  0
CORRECT     OMIT DU   BEG
  0.0000
   1  DUMM  DU    M    0  -1  -2     0.000      .0        .0      .00000
   2  DUMM  DU    M    1   0  -1     1.449      .0        .0      .00000
   3  DUMM  DU    M    2   1   0     1.523   111.21       .0      .00000
   4  N     N     M    3   2   1     1.540   111.208  -180.000 -0.784327
   5  H     H     E    4   3   2     1.011   127.816   -52.528  0.404780
   6  CA    CX    M    4   3   2     1.456    19.360  -121.187  0.084200
   7  CB    CT    3    6   4   3     1.539   111.990    39.865  0.000930
   8  CG    CA    S    7   6   4     1.513   116.601    53.445 -0.316457
   9  CD1   CA    B    8   7   6     1.395   120.882   -79.430 -0.043509
  10  CE1   CA    B    9   8   7     1.389   121.402  -176.679 -0.322452
  11  CZ    C     B   10   9   8     1.386   119.862    -0.177  0.579275
  12  CE2   CA    B   11  10   9     1.392   120.129    -0.254 -0.322452
  13  CD2   CA    S   12  11  10     1.400   119.556     0.351 -0.043509
  14  HD2   HA    E   13  12  11     1.080   119.362  -179.517  0.072836
  15  HE2   HA    E   12  11  10     1.079   120.147  -179.957  0.104346
  16  OH    O     E   11  10   9     1.383   119.350   178.170 -0.763539
  17  HE1   HA    E   10   9   8     1.077   120.511  -179.073  0.104346
  18  HD1   HA    E    9   8   7     1.074   119.028     4.519  0.072836
  19  HB2   HC    E    7   6   4     1.087   109.488   176.075  0.019836
  20  HB3   HC    E    7   6   4     1.090   107.863   -67.968  0.019836
  21  HA    H1    E    6   4   3     1.091   110.101   -80.299  0.039982
  22  C     C     M    6   4   3     1.517   109.771   162.828  0.606549
  23  O     O     E   22   6   4     1.229   120.422    -6.524 -0.513506


LOOP
  CD2   CG

IMPROPER
  CD2  CD1   CG   CB
   CG  CE1  CD1  HD1
   CZ  CD1  CE1  HE1
  CE2  CE1   CZ   OH
   CZ  CD2  CE2  HE2
  CE2   CG  CD2  HD2
   CA   +M    C    O

DONE
STOP
```

why three dummy atoms? You should keep them. See [AMBER Prep File Specification](https://ambermd.org/doc/prep.html)



## Gromacs

Here I mean generating gmx `.rtp` series files (and then [Adding a Residue to a gmx Force Field](#adding-a-residue-to-a-gmx-force-field)), or simply `.itp`/`.gro` file.

### CHARMM



### sobtop

Sobtop mainly works for Amber FF, RESP(2) charge, Gromacs MD



### Amber

- [A Jerkwin example 芋螺毒素小肽实例](https://jerkwin.github.io/2017/09/20/GROMACS%E9%9D%9E%E6%A0%87%E5%87%86%E6%AE%8B%E5%9F%BA%E6%95%99%E7%A8%8B2-%E8%8A%8B%E8%9E%BA%E6%AF%92%E7%B4%A0%E5%B0%8F%E8%82%BD%E5%AE%9E%E4%BE%8B/)  antechamber bcc+acpype, manually edit
- [ambermd.org tutorial4b](https://ambermd.org/tutorials/basic/tutorial4b/)
- [Using antechamber and parmchk for Ligands | Computational Chemistry Resources](https://emleddin.github.io/comp-chem-website/AMBERguide-antechamber.html)   bcc charge and tleap for drug mol
- [GROMOS力场自定义非标准残基的方式 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/87402839)  ATB, GROMOS, Multiwfn拟合RESP电荷



## Adding a Residue to a gmx Force Field

### Gromacs ff folder

(downloaded from charmm)

```shell
sudo cp -r charmm36-jul2021.ff /your/working/directory
```

> we may not copy into `/usr/share/gromacs/top` because we may not have permission. But gmx can recognize the folder in your cwd or `GMXLIB`.

and modify files related to that residue

> on provided files
>
> - `residuetype.dat`: only one line added
>
> senior sister: keep the backbone charge distribution of Y-SO3 identical to that of Y, and spare the extra charge in the side chain. I'll use that.

> - `.itp` file: gromacs topology file
> - `.rtp` file: residue type. its format looks like `.rtf` file in NAMD, defining one and another molecules.
> - `.atp` file: atom type. looks like `xxx.inp` in NAMD, defining atom types and masses.
> - `.r2b` file: Residue to rtp building block table. a map.
> - `.arn` file: atom renaming specification
> - `.hdb` file:

### Adding a residue

[reference](https://manual.gromacs.org/current/how-to/topology.html#adding-a-residue-to-a-force-field)

- put `residuetype.dat` in both the cwd and forcefield.ff folder

> maybe I'll handcraft one later.

# System setup

also refer to [related programming](Programming.md#modeling-and-analysis)

My opinion (23.10.17): rtp文件其实并不难写，和rtf的复杂度几乎相同，扩展参数的复杂度和prm也基本相同。问题是gmx建模的可扩展性极差，对于非标准成分频繁更改力场文件令人难以接受，所以也没人开发自动转化为rtp等格式、自动加入gmx格式力场的程序。其实vmd（加水）和tleap（序号、插入），`sobtop`好像也不能随机塞东西，包括`packmol`用法很迷它们弊端也很明显，竟然显示出`gmx insert-molecules`的不可替代性，所以对非聚合物体系（不是聚合物、+非标准残基的蛋白），都暂且忍受了。对特殊聚合物，往往需要用vmd/tleap建模再转过去。对于偶尔一用的residue，还是勉强添加到gmx中，当然要先看看有没有（如之前那个TYM）。

## CHARMM-GUI

### LigandRM

or CgenFF

see [CHARMM-GUI for ligands](Protein-ligand-simulation.md#charmm-gui-for-ligands)



### PDB reader

- pdb reader可以residue mutation, protonation etc., 加磷酸、生成psf，但好像会renumber。

- only for CHARMM FF...go to force field converter

- 也不识别多条链，你的pdb必须要有chain ID

- CSML search: whether this ligand already in FF (and RCSB?). If not, go to LigandRM. 

  > It seems that this is also done in Ligandrm...



### Force Field converter

[CHARMM-GUI Force Field converter](https://charmm-gui.org/?doc=input/converter.ffconverter)

Supports Amber/OPLS-AA, etc. in most cases.

You must provide `.psf` and CHARMM `.crd`, which can come from PDB reader

Called by other tools like Membrane Builder



### Solution builder

- We just don't use CHARMM-GUI `.mdp` files...

  <img src="https://cdn.jsdelivr.net/gh/gxf1212/notes@master/research/Programming-Preparation.assets/GUI-Berendsen.png" style="zoom:50%;" />

- GUI automatically generates gradually-released restraint for all kinds of species, which gmx cannot...

  ![](https://cdn.jsdelivr.net/gh/gxf1212/notes@master/research/Programming-Preparation.assets/GUI-restraint.jpg)





## VMD

### Tips

> [!NOTE]
>
> For visualization with VMD, see [MD fundamentals](MD-fundamentals.md#VMD)
>
> For a modeling example, see [Protein-Ligand setup](Protein-ligand-simulation.md#setup-with-vmd)

- VMD scripting is highly flexible and provides many possibilities.

  The only default is that each chain needs to be manually separated (which is just `gmx pdb2gmx` good at). To split chains, refer to:

  [mkrun/Gromacs/fep/mkpy_split_chains.py at master · skblnw/mkrun · GitHub](https://github.com/skblnw/mkrun/blob/master/Gromacs/fep/mkpy_split_chains.py)

  or my script (which was meant to assign segnames):

  ```python
  
  ```

- vmd可以读已有的psf和pdb，也是gmx和tleap不可以的

### Disadvantages

- mainly works for CHARMM series force field.
  - There are limited Amber/OPLS-AA files, and "use at your own risk". converting from other tools might be easier.
  - gmx and charmm are using different potential energy forms...add a minus to epsilon!
  
- solvate: cannot rotate (despite this option exists) and add water isotropically (unless do this manually). Have to use a HUGE box, otherwise the protein interacts with itself...

  > `vmd solvate -rotate` 只能手动确定哪个边最长，然后补其他的。。

  > tleap, `pdb2gmx`, GUI 等都可以达到类似`iso`的效果吧

- for large systems, it takes untolerably long to convert to gmx via parmed since every water is to be explicitly written...



See [convert_charmm2gmx_via_parmed.py](Programming.md#charmm2gmx)



#### Other

> https://anaconda.org/conda-forge/psfgen

The comment “use in generate statement” indicates that the NTER patch is used during segment generation, and is applied before angles and dihedrals are generated. An example of the other type of patch, those applied after segment generation, is the LINK patch given below. These types of patches are used to alter protonation state, create disulphide bonds...



有了坐标，IC不起作用



## AmberTools (tleap)

leap stands for "Livermore Energy-aware molecular Prototyping".

### Preparation

Then users need to combine these fragments into a single PDB file. Afterwards pdb4amber can be used to re-sequence the PDB file. The final PDB file should meet the criteria mentioned above.

For residues that are identical except the coordinates (e.g., the water molecules in the PDB file), only one mol2 file is enough.

### Tips

- `addIonsRand`

  otherwise (`addIons`), ions are on one surface

  <img src="https://cdn.jsdelivr.net/gh/gxf1212/notes@master/research/Programming-Preparation.assets/tleap-ion.png" alt="tleap-ion" style="zoom: 50%;" />

- `solvateBox obj distance`

  > If the distance parameter is a single NUMBER then the minimum distance is the same for the x, y, and z directions, unless the STRING "iso" parameter is specified to make the box or truncated octahedron isometric. For solvateBox if "iso" is used, the solute is rotated to orient the principal axes, otherwise it is just centered on the origin.

  `iso` is particularly useful for reducing the size of system and guaranteeing no interaction-with-image problem!! **superiority over VMD!**

- When tleap encounters multiple definitions for the same atom type, it uses the last definition it encounters.

- 最后一个residue有OXT原子就没事，如果后面还有水就报错（确定不是`pdb2gmx`？）

- `iso`就可以用1nm的边距，这样镜像间绝对至少有2nm的距离。

### Disadvantages

- tleap will always renumber residues (starting from 1) and you cannot set residue index in tleap.

  fix it via parmed (sometimes useful) or MDA (for analysis)

  See [convert_amber2gmx_via_parmed.py](Programming.md#amber2gmx)

- Amber无区分chain的方式？tleap最高层次就是unit

- calculate # of ions (protein mass) for tleap: 

  https://www.phys.ksu.edu/personal/schmit/SLTCAP/SLTCAP.html

  - tleap calculate number of ions:
    Total mass 459655.794 amu, Density 0.846 g/cc
    Added 23449 residues.

    online calculator: https://www.desmos.com/scientific  to obtain protein mass

  - open with Pymol, click A--compute--molecular weight

  Question: what about non-protein system (like membrane)?

- tleap is also unable to insert molecules

### Commands

```shell
desc variable
# Print a description of the object variable.
```



### Other

使用文本编辑器打开生成的.inpcrd文件，然后查找其中的盒子参数。盒子参数位于文件的最后一行，包含三个数字，分别表示盒子在x、y和z方向上的长度。



## gmx

### pdb2gmx

prepare the system

- The protonation state of N- and C-termini can be chosen interactively with the `-ter` flag.

- pdb2gmx产生的蛋白拓扑文件时可以加上`-his`选项来人工选择各个组氨酸的质子化态

- `-ter` option for termini (only useful for proteins)

- https://manual.gromacs.org/documentation/2020-current/onlinehelp/gmx-pdb2gmx.html  add -ff folder. xx.ff, forcefield.itp in 

- `pdb2gmx` can recognize terminal residue's COO^-^ if chain ID is assigned

- gmx区分的方式就是多个.itp文件，所以没有chain

Force field

- source: local directory, installation top folder, `GMXLIB` variable

- 

### Other tools

#### insert-molecules

Monte-Carlo based. vmd/tleap don't have this...

或者，分子只能插入在position.dat（-ip）中定义的位置。该文件应具有3列（x，y，z），该列给出与输入分子位置（-ci）相比较的位移。



#### editconf

- https://gromacs.bioexcel.eu/t/merging-two-gro-files/2960/2 editconf converts between .pdb and .gro (etc.) freely

## Packmol

it may built complex systems, but

- can only add certain number of water; we must calculate through density and volume?
- is not responsible for generating .top files, and `gmx pdb2gmx` cannot handle such (usually) complex systems



[Packmol的使用-构建分子动力学初始结构](https://zhuanlan.zhihu.com/p/491254490)

```bash
tolerance 2.0
filetype pdb
output system.pdb

structure ambpdb.pdb
  number 1
  center
  fixed 0. 0. 0. 0. 0. 0.
end structure

structure aloh.pdb
  number 10
  inside box -30. -30. -30. 30. 30. 30.
end structure
```





## Special purposes

### Renumber residues

- [Renumber a PDB file from 1 (umcn.nl)](https://swift.cmbi.umcn.nl/servers/html/renumb.html)
- http://dunbrack3.fccc.edu/PDBrenum/ only for PDB and UniProt?? 
- I remember a tool to set arbitrary numbers?

common tools can also do this

- [Chimera](https://www.cgl.ucsf.edu/chimera/docs/ContributedSoftware/editing/renumber.html)

- Pymol

  ```
  alter (all), resi=str(int(resi)+688)
  alter sele, resi=str(int(resi)+688)
  ```

- VMD 

  ```tcl
  set all [atomselect top "protein or resname AL or resid 1 to 1500"]
  foreach idx [$all get index] {
      set atom [atomselect top "index $idx"]
      $atom set resid [expr [$atom get resid] + 688]
  }
  ```

it would also be simple in Python with my `read_pdb` code....





# Virtual Screening of Drugs

This part is from 2021 UROPS project, structure-based virtual screening (SBVS)

for basic usage of Python packages like rdkit and openbabel, please [go to this link](Programming.md#small-molecule). If I use them to construct a library, maybe I'll write here.

Contents need more organization....put before system setup later

## Database setup

### Example: FDA approved

- zinc: 4161765 is ATP

  - https://zinc.docking.org/substances/subsets/

  - fda and antiviral are from drugbank

    - https://www.fda.gov/drugs/drug-approvals-and-databases/drugsfda-data-files not very useful

  - to note:

    | name                                                         | explanation                                                  | quantity | reamrk       | filtered with 0.4 | converted |
    | ------------------------------------------------------------ | ------------------------------------------------------------ | -------- | ------------ | ----------------- | --------- |
    | [investigational-only](https://zinc.docking.org/substances/subsets/investigational-only/) | Investigational compounds - in **clinical trials** - not approved or used as drugs | 3897     | may filter   | 1223              |           |
    | [in-trials](https://zinc.docking.org/substances/subsets/in-trials/) | Compounds that have been investigated, including drugs<br />investigational + drugs? "drugs"=world | 9800     |              |                   |           |
    | [world](https://zinc.docking.org/substances/subsets/world/)  | Approved drugs in major juridications, including the **FDA**, i.e **DrugBank approved** | 5903     | ok           |                   | 4655      |
    | [in-vivo-only](https://zinc.docking.org/substances/subsets/in-vivo-only/) | Substances tested in animals but not in man,  e.g. **DrugBank Experimental**<br />**experimental**: validating the drug in experiment? going through the FDA approval process? | 18387    | ok or filter | 3038              |           |
    | [in-man-only](https://zinc.docking.org/substances/subsets/in-man-only/) | Substances that have been in man, but not approved or in trials,  e.g **nutriceuticals** and many metabolites | 101378   | filter       |                   |           |
    | [natural-products](https://zinc.docking.org/substances/subsets/natural-products/) | Natural products, also known as **secondary metabolites**, i.e. explicitly  excluding metabolites | ~224200  |              |                   |           |
    | [biogenic](https://zinc.docking.org/substances/subsets/biogenic/) | Made by nature, including primary metabolites (metabolites) and secondary metabolites (natural products) | 308035   | filter?      |                   |           |

    > filter means filter and use

  - no similarity search?

- pubchem: 5957

  - usage

    - [pubchem doc](https://pubchemdocs.ncbi.nlm.nih.gov/downloads)
    - [server website](ftp://ftp.ncbi.nlm.nih.gov/pubchem/), [csdn blog](https://blog.csdn.net/u012325865/article/details/77148242?ops_request_misc=%25257B%252522request%25255Fid%252522%25253A%252522161111360916780266232622%252522%25252C%252522scm%252522%25253A%25252220140713.130102334..%252522%25257D&request_id=161111360916780266232622&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~sobaiduend~default-4-77148242.pc_search_result_hbase_insert&utm_term=pubchem)
    - a good tutorial: [How to Search PubChem for Chemical Information](https://chem.libretexts.org/Courses/University_of_Arkansas_Little_Rock/ChemInformatics_(2017)%3A_Chem_4399_5399/6%3A_How_to_Search_PubChem_for_Chemical_Information_(Part_2))
    - tool with cut-off value: https://chemminetools.ucr.edu/eisearch/query/

  - Fingerprint Tanimoto-based 2-dimensional similarity

    - convert structure to fingerprint, which is a 2-value vector, indicating if this character exists
      $$
      Tanimoto=\dfrac{N_{AB}}{N_A+N_B-N_{AB}}
      $$

    - in pubchem, only includes substructures and superstructures

      see http://blog.molcalx.com.cn/2019/01/29/fingerprint.html and pubchem usage mentioned above

- drugbank: 00171

  - https://go.drugbank.com/drugs/DB00171: targets!

  - https://go.drugbank.com/structures/search/small_molecule_drugs/structure#results search by similarity

  - downloaded 

    | type     | approved | experimental | investigational | nutraceutical | metabolite |
    | -------- | -------- | ------------ | --------------- | ------------- | ---------- |
    | quantity | 2509     | 6186         | 3289            | 107           | 2566       |

    - all are planar molecule!!!
    - some molecule is big!

  - superdrug2: 66

  - <u>approved or clinical drugs</u>
  - limited similarity search
  
- https://tripod.nih.gov/npc/

### preference

1. FDA approved: drugbank

   **approved**: zinc and drugbank

   ATP mimics (like kinase inhibitor) in FDA

   - drugbank ~2000
   - the most FDA, search by myself?
   
2. experimental <u>analog</u>

   drugbank; in-vivo (has filtered. available?)

3. **chemical similar**

   pubchem

4. [world](https://zinc.docking.org/substances/subsets/world/) natural products (optional)

from ATP mimics to **their** analogs (2D), might be a lot? 

### result list

> 2021.2

| name                                                         | quantity | preference     | filtered with 0.4 | converted |
| ------------------------------------------------------------ | -------- | -------------- | ----------------- | --------- |
| world-not-fda                                                | 4288     | 1st            | no                | 3221      |
| drugbank-approved                                            | 2509     | 1st            | no                | 1867      |
| superdrug-3d                                                 | 3992     | additional 1st | no                | 3932      |
| [in-vivo-only](https://zinc.docking.org/substances/subsets/in-vivo-only/) | 18387    | 2nd            | 3038              | 2466      |
| [investigational-only](https://zinc.docking.org/substances/subsets/investigational-only/) | 3897     | 2nd            | 1223              | 992       |
| pubchem-2d similar                                           | 13002    | 3rd-1          | no                | 10739     |
| [in-man-only](https://zinc.docking.org/substances/subsets/in-man-only/) | 101378   |                |                   |           |
| [natural-products](https://zinc.docking.org/substances/subsets/natural-products/) | ~224200  |                |                   |           |
| [biogenic](https://zinc.docking.org/substances/subsets/biogenic/) | 308035   |                |                   |           |

- pubchem 

  - 2d simi: 6880 (obabel: 10782)
  - 3d simi: 117

- zinc

  - simi: 194 (30%) (~480)
  - fda: 659 (~1345)
  - all approved: 5880
    - (obabel: 4660)
  - filter the subsets
  - 

- superdrug2

  - all: 6054??
    - pick the first conformer
    - search according to Entry ID (000001) or compound name
    - include something like I~2~,O~2~,N~2~.......
  - got 3992, converted 3937

- 


for more databases, see http://cheminfo.charite.de/superdrug2/downloads.html

### backup

> [https://tripod.nih.gov/npc/](https://www.researchgate.net/deref/https%3A%2F%2Ftripod.nih.gov%2Fnpc%2F)Currently having more than 7000 FDA approved compounds.It is free and updated daily.Install it and select criteria according to your need and export file as .tsv(can be opened in excel)The exported file will have drug name, SMILES and other required information.SMILES can be converted to SDF or mol or mol2 according to your need using OpenBabel tool.
>
> ## download small molecule pdb files 
>
> for virtual screening
>
> ### download all and see data
>
> ```shell
> wget -m -np ftp://ftp.ncbi.nlm.nih.gov/pubchem/Compound_3D/01_conf_per_cmpd/SDF/ 
> # download **all** the compounds in the current directory
> # /home/work/data lib
> # but that's too big and unnecessary
> ```
>
> ### download what you need
>
> [bulk download with id file](https://blog.csdn.net/recher_he1107/article/details/106276198?utm_medium=distribute.pc_relevant.none-task-blog-baidujs_utm_term-2&spm=1001.2101.3001.4242)
>
> maybe I'll use smiles to determine similarity between atp and ligands...
>
> ### convert .sdf to .pdb in batches
>
> .sdf: structure data file
>
> Openbabel has a interface with Python...
>
> It **can do things in batch**, but **no outputing pdb**....but don't forget its functions....
>
> > so use my shell
> >
> > ```shell
> > # run the following command under where your small molecules are
> > # to convert into any format **in batch**
> > bash /home/user/Desktop/work/xufan/bin/all_to_pdb.sh # to pdb
> > bash /home/user/Desktop/work/xufan/bin/all_to_pdbpt.sh # to pdbpt
> > bash /home/user/Desktop/work/xufan/bin/sdf_split_convert.sh # split multi comformers and convert
> > ```
> >
> > https://blog.csdn.net/TQCAI666/article/details/99835557?utm_medium=distribute.pc_relevant.none-task-blog-searchFromBaidu-1.control&depth_1-utm_source=distribute.pc_relevant.none-task-blog-searchFromBaidu-1.control
> >
> > https://blog.csdn.net/u012325865/article/details/77914358
> >
> > finally I found simpler commands...

## AutoDock Tools and vina

Good results especially for ligands with 8 or more rotatable bonds 

### Basics

#### algorithms and settings

- docking box: the search space (for the whole ligand, rather than the center)
- AutoGrid is initially **used to calculate the noncovalent energy of interaction between the rigid part of the receptor and a probe atom that is located at various grid points of the lattice**. Furthermore, AutoGrid generates an electrostatic potential grid map and a desolvation map.

#### parameters

- exhaustiveness: One execution of Vina tries to predict where and how a putative ligand can best bind to a given protein, in which Vina may repeat the calculations **several times** with different randomizations
- seed: same seed (explicitly assigned) produces the same results
- cpu: repeated computation for a ligand is done on separate CPUs at the same time. By default, Vina tries to create as many threads as the number of available 

#### Files

- pdb file: 

  - **HETATM** is applied to  non-standard residues of protein, DNA or RNA, as well as atoms in other  kinds of groups, such as carbohydrates, substrates, ligands, solvent,  and metal ions.

  > - https://jerkwin.github.io/2015/06/05/PDB%E6%96%87%E4%BB%B6%E6%A0%BC%E5%BC%8F%E8%AF%B4%E6%98%8E/
  > - https://www.cgl.ucsf.edu/chimera/docs/UsersGuide/tutorials/pdbintro.html

- pdbqt file format: http://autodock.scripps.edu/faqs-help/faq/faqsection_view?section=Technical%20Questions

- .mol2 file format: http://paulbourke.net/dataformats/mol2/

### Workflow

```shell
# visualized window
adt # or from "start"
```

#### receptor

- fget structure

  - download .pdb file
  - use Swiss Model: upload sequence, then it shows which template (pdb link), identity...and you can download modeled .pdb file

- preparation of docking

  - edit--delete water (delete any other things)

  - edit--hydrogen--add (only polar is needed)

  - edit--misc--repair missed atoms

  - > edit--hydrogens--edit histidine Hs. my: +1
    >
    > hydrogen: note AutoDock Vina does not use charges or nonpolar hydrogens, so this setting is not expected to affect results except for the presence or absence of nonpolar hydrogens in the processed receptor 

  - edit--charge--add kollman

    http://expertcomputationalchemistry.blogspot.com/2016/08/the-difference-between-kollman-charges.html?m=1

  - edit--charge--check total...

  - Flexible Residues (optional): some residues are flexible. the ligand is always flexible (rotatable bonds)!

    https://zhuanlan.zhihu.com/p/92658440

    - decide flexible residues
    - Flexible Residues>Input>Choose Micromolecule
    - select residues in sidebar
    - Flexible Residues>Choose Torsions in Currently Selected Residues
    - FlexibleResidues>Output>Save Flexible PDBQT (grid--open also ok?)
    - Must also save rigid part! (same as rigid docking)

> energy minimization under pH=7? not all did this
>
> https://www.cnblogs.com/iloveyoucc/archive/2012/07/10/2585529.html

#### ligand

##### convert

see *Virtual Screening based prediction of potential drugs for COVID-19*

```shell
# 1. split ligand .sdf into the current directory and to pdbqt in batch. some split; minimize and then to pdbqt?
obabel -isdf fda.sdf -opdbqt -O *.pdbqt --split

# 2. read smiles from .csv and convert to pdbqt
# obabel adds hydrogen, partial charge, torsion (root and branch) 
bash smi2pdbqt-zinc.sh atp.csv
# single use, -: is a indicator of smiles!!!
obabel -:'Nc1ncnc2c1ncn2[C@@H]1O[C@H](CO[P@](=O)(O)O[P@](=O)(O)OP(=O)(O)O)[C@@H](O)[C@H]1O' --gen3d -opdbqt -O atp.pdbqt -as -h --partialcharge gasteiger

# 3. convert 2d .sdf to pdbqt
obabel -isdf atp.sdf -osdf -O *.sdf --split
bash pubchem2pdbqt.sh
rm -rf *.sdf
# remove MODEL tag so as to run vina normally
sed -i '1d' *.pdbqt
sed -i '$d' *.pdbqt 
bash my_obminimize.sh

# 4. convert 3d .sdf to pdbqt
bash multi-sdf2pdbqt.sh

# 4. convert 3d .sd to pdbqt
obabel *.sd -opdbqt -O *.pdbqt -as -h --partialcharge gasteiger
```

> summary on the conversion
>
> - from smiles (zinc): single conversion is ok, but not all is ok in batch
> - from sdf (pubchem): those failed is not ok though single conversion

> obabel with smiles: https://zhuanlan.zhihu.com/p/40577681

> must add torsional bonds to ligand pdbqt. vina just detect this! 
>
> For vina, kollman for macromulecule and gasteiger for ligand. but since <u>your ligand is a  peptide, you should add kollman to the ligand as well</u>.

or raccoon http://autodock.scripps.edu/resources/raccoon. to boot:

```shell
pythonsh /home/user/Desktop/work/xufan/bin/raccoon.py # in mgltools/bin
```

##### process

**should use GAFF force field!!**

2023 Q: just MMFF94 for docking?

```shell
# minimize the energy of ligands. overwrite the sdf files. not always necessary.
obminimize -ff MMFF94 -n 1000 *.pdbqt 
# obabel -ipdb antibody_HL.pdb -opdbqt -O antibody_HL.pdbqt 
# delete. or do these in a separate directory...
rm -rf *.sdf 
# add prefix
for i in `ls | grep pdbqt`; do 
	if [[ ${i:0:4} != "com" && ${i:0:4} != "conf" && ${i:0:4} != "vina" ]]; then 
	mv -f $i "ligand_"$i
fi done
for i in `ls | grep sdf`; do 
	if [[ ${i:0:4} != "com" && ${i:0:4} != "conf" && ${i:0:4} != "vina" ]]; then 
	mv -f $i "pubchem_"$i
fi done
```

note:

- **ligands only have polar hydrogens**!! openbabel won't add polar hydrogen.....
  - some atoms do have improper orientation which may affect hydrogen bond formation
    - hydrogen on the aromatic N, on the plane?
    - some carbon chain is a straight line...should be zigzag
      - luckily the bonds are rotatable?
    - some C=O are added a hydrogen???
- ligands should keep the aromatic atoms! they should be close to planar (not exactly..?)
- obminimize is suitable for .sdf file because it omits charge, etc
- and we'd better minimize energy under 3d structure!
- the generated 3d structure vs original?
  - after minimization and docking, the mean value is similar and the generated has wider ranges in both ends
  - so I think it's reasonable. if we increase exhaustiveness....
  - increasing num of modes does not seem to change the distribution.... and time. the range may both 
- world-not-fda do not corresponding to zinc id???

##### check ligand torsion

- Ligand--Input--Choose your ligand, Yes, load its torsion
- Ligand--Torsion Tree--Choose Torsions
  - unrotatable shown as red, rotatable shown as green, semi-rotatable: magenta

##### reference

ligand and receptor, overall refer to:

- https://www.youtube.com/watch?v=7YTzG2PtzlE very good..
- https://blog.computsystmed.com/archives/autodock-series-introduction-to-molecular-docking, esp ligand torsion
- ligand torsion, official: https://www.scripps.edu/sanner/software/adt/Tutorial/AutotorsTutorial.html

> if more processing needed (I forgot..)
>
> http://muchong.com/t-1695403-1
>
> - 加氢删水
> - assign type，保存为pdbqt文件
> - 重新打开

#### grid

- grid-macromolecule--choose
- grid-grid box. set appropriate parameters and copy them into the conf.txt
- problems
  - rotate box? choose size wisely? where to set as center? 
  - the box divides where the ligand would appear **or its center**? I think it's bigger to include all related residues.

  - spacing: do not need to consider in vina? so in adt, use spacing=1?

#### run

rigid

```shell
vina --config config_rigid.txt # single dock
# I have modified the shell
bash vina_screen_local.sh conf_rigid.txt # conf as argument
```

flexible: over 100 times of time consumption. I would only use it to do deep screening

do not run multiple tasks together?! it make all tasks stop..

```shell
#! /bin/bash

count=0 # progress
num=$(ls -l | grep ZINC | wc -l) # total number of ligands
start=$(date +%s)

for f in ZINC*.pdbqt; do
    b=basename $f .pdbqt
    let count++
    
    echo 
    echo 
    echo Processing ligand $b \($count of $num\).
    mkdir -p $b
    vina --config $1 --ligand $f --out ${b}/out.pdbqt --log ${b}/log.txt 
    # replaced conf.txt by $1
    
    now=$(date +%s)
    hour=$(( (now-start)/3600 ))
    min=$(( (now-start-3600*hour)/60 ))
    sec=$(( (now-start)%60 ))
    echo 
    echo 
    echo Finished processing ligand $b \($count of $num\). Running for $hour hours $min minutes $sec seconds.
done
```

`config_rigid.txt`:

```
receptor = 2cqg_1_rigid.pdbqt

center_x =  5.714
center_y = -4.169
center_z = -0.78

size_x = 30
size_y = 34
size_z = 22

exhaustiveness=24
num_modes=9
```



Benchmark?

running result in UROPS.md



### docking analysis

the final table may include:

- info
  - id, name 
  - 2d structure (MW)
  - other real information
    -  real IC~50~?.....
  
- calculated results
  - $\Delta G$
  - other drug-like properties
  
- structure
  - active residue? or hydrogen bond, non H bond on the protein 
  
  - ligand H-Donor and Acceptor atom
  
    > consider: number of interactions, bond length, conformation
  
  - plot
    - ligPlot?
    - APBS?
    - ?
  - close contact?
  
- goal

  - self-justification, interacting with key residues







see [Protein-ligand simulation](/research/Protein-ligand-simulation.md#visualize-protein-ligand).









1. pre: data

   ```shell
   vina_split --input out.pdbqt # split output pdbqt, single
   bash ./vina_split_batch.sh # in batch
   ```
   
   run my python code for ranking, where
   
   ```shell
   #! /bin/bash
   
   for f in ligand_*/; do
       cd $f
       vina_split --input out.pdbqt
       echo splited $f
       cd ..
   done
   ```
   
2. ADT: analyze
   1. marcomolecule--choose
   2. dockings--open autodock virtual screening ligand (a folder with multiple?)
   3. dockings--show interactions
   4. hydrogen bonds (not good...)
   1. hb-build-set params...
      2. hb-display (as spheres)
   5. label atom + ligand--change torsion: show all atom types and numbers
   
3. pymol

   ```shell
   cd ligand_11158091
   obabel -ipdbqt *.pdbqt -opdb -O *.pdb
   ```

   **must use the structure for docking (pdbqt or pdb)** rather than use the original pdb, or the ligand always clash with our receptor!!!

   but the beta sheets have been broken.......

   - measure distance
     
     - wizard--measurement
     - 貌似氢键分为强氢键2.5--3.0，中等3.0--3.5
     
   - show contact

     - import receptor and ligand
     - all--find--polar contact--within selection; all--find--any contact--3.0AA
     - select--...--with any atoms

     still some are unreasonable

     > show H bond
     >
     > - all--preset--whatever (cartoon)
     > - receptor--show as--lines
     >
     > not as reasonable, because only O and O is connecting. will the environment give the H?

     options

     - set h_bond_cutoff_center, 3.0    then reload the H bond

   - polar contact distance

     - all--find--polar contacts--from other atoms in object        (if in one complex)

   https://pymolwiki.org/index.php/Displaying_Biochemical_Properties

8. ADMET: http://www.swissadme.ch

   - accepts smiles, each line one molecule (in batch)
   - items
     - Lipinski’s rule of five
     - Pan-assay interference compounds (PAINS) filter
     - carcinogenic patterns 

9. PASS analysis: biological activity predictions

> Identification of natural compounds as potent inhibitors of SARS-CoV-2....





### attention

- You should probably avoid search spaces bigger than  `30 x 30 x 30` Angstrom, unless you also increase "`--exhaustiveness`".



## Methods

23.5.14 group tutorial

Vina系列:
AutoDock Vina, AutoDock-GPU, AutoDockFR, AutoDock-CrankPep, QuickVina2, Smina, Vina-Carb, VinaXB, Vinardo, QuickVina-W

FR：柔性；Pep：肽；Carb：糖；。。
共价对接：先选基团
柔性对接应该不用MD
MMFF对于小分子更精细
modeller补链？
smina，-6kcal，不能结合的能排掉，不一定能真的结合
对应实验值。。
-6是考虑误差，其实有点不够
可能拿晶体结构去拟合，所以可能比同源模型结果更好？
看一下最大类中心的构象是否合适



对接：结合位点裸露在膜外可以提取出来直接做，如果在膜中或者膜内这两种情况难说，不是很多物质能都进膜内







