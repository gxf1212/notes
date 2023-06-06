# Preparation and Modeling

This page is about protein/ligand/.... structure modeling and preprocessing.



# Protein structure

## Homology modeling

### Modeller

[ModWeb (ucsf.edu)](https://modbase.compbio.ucsf.edu/modweb/)

[Tutorial (salilab.org)](https://salilab.org/modeller/tutorial/basic.html)



Can it just add missing residues, rather than build all side chains again? Maybe ligand interaction map will be changed...



## AF2



Multimer





## Protonation state

### H++ server



The right way to obtain Amber FF file:

```shell
ambpdb -c -p > ambpdb.pdb
```



### propka3

HSE no!

### Other

- http://compbio.clemson.edu/pka_webserver/

- predict protonation pH

  [PlayMolecule - Click. Compute. Discover.](https://playmolecule.com/proteinPrepare)

- https://github.com/isayevlab/pKa-ANI





# System setup

also refer to [related programming](Programming-for-MD.md#modeling-and-analysis)

## CHARMM-GUI

### LigandRM

or CgenFF

#### Basics

> if you want to perfectly retain its coordinates and atom names, use CGenFF server!
>
> oh...CHARMM-GUI slightly optimizes the coordinates. It doesn't matter.
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
> - after GUI, the ligand/residue name is changed into LIG
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
> - 

then just click, click...and download all files



**attype warning: triple bonded non-nitrile nitrogen not supported; skipped molecule.**



### PDB reader

residue mutation, etc.

only for CHARMM FF...



CSML search: whether this ligand already in FF. If not, go to LigandRM.



## VMD

for visualization with VMD, see [Common tools](Common-tools.md#VMD)



https://anaconda.org/conda-forge/psfgen





## AmberTools (tleap)



- tleap will always renumber residues (starting from 1) and you cannot set residue index in tleap.

   fix it via parmed (sometimes useful) or MDA (for analysis)

   ```python
   # amber2gmx.py
   
   ```

   

- calculate # of ions (protein mass) for tleap

   - tleap calculate number of ions:
     Total mass 459655.794 amu, Density 0.846 g/cc
     Added 23449 residues.

     online calculator: https://www.desmos.com/scientific

   - open with Pymol, click A--compute--molecular weight

- addIonsRand

   or ions are on one surface

   <img src="https://cdn.jsdelivr.net/gh/gxf1212/notes@master/research/Preparation-and-modeling.assets/tleap-ion.png" alt="tleap-ion" style="zoom: 50%;" />

- 





## Packmol

it may built complex systems, but

- can only add certain number of water; we must calculate through density and volume?
- is not responsible for generating .top files



[Packmol的使用-构建分子动力学初始结构](https://zhuanlan.zhihu.com/p/491254490)

```
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





# Docking









## Protein-peptide docking



## Protein-NA docking





# Virtual Screening of Drugs

This part is from 2021 UROPS project. 

for basic usage of Python packages like rdkit and openbabel, please [go to this link](Programming-for-MD#small-molecule). If I use them to construct a library, maybe I'll write here.

Contents need more organization....

## Database setup

structure-based virtual screening (SBVS)

### Example: FDA approved

- zinc: 4161765

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

  - 

  > | similarity | 70   | 50   | 45   | 42   |
  > | ---------- | ---- | ---- | ---- | ---- |
  > | quantity   | 300  | 484  | 644  | 923  |
  >
  > similarity 30
  >
  > | type     | approved | experimental | Nutraceutical |
  > | -------- | -------- | ------------ | ------------- |
  > | quantity | 771      | 1000+        | ~100          |
  >
  > all drugs (not sure with structure?)
  >
  > | type     | approved | approved+experimental+nutraceutical |
  > | -------- | -------- | ----------------------------------- |
  > | quantity | 2679     | 882                                 |

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

4. [world](https://zinc.docking.org/substances/subsets/world/)natural products (optional)

from ATP mimics to **their** analogs (2D), might be a lot? 

### result list

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

- docking box: the search space (for the whole ligand rather than the center)
- 

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





> ### running result
>
> my workstation: 42 sec for 1st ligand (1 min ~20 sec on lab). about 2 times faster cpu
>
> #### try1
>
> - lab: 712, about 6 hours
> - my workstation: the first one, 81min, about 60 times of rigid in lab; first 5, about 5 hours
> - use little memory but **most of the cpu** (90% in lab)
> - really no GPU acceleration on Vina, maybe optimized algorithm. autodock has GPU version
>
> #### try2
>
> - my: 56 for 13min9sec (789sec). exhau=24
>   - 3221 will be 12.6 hours
> - lab: 16 for 28min54sec (1736sec). 1575 will be 47.47 hours
>



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

4. Discovery Studio

   - Interaction analysis

5. LigPlot

   - prepare

     - must make a complex

       ```shell
       pymol cat.pml -- ./ 2cqg_1_rigid.pdb out_ligand_1.pdb # failed to customize parameters. use the simple one
       python 
       ```

     - or try save molecule together in pymol

   - The molecular interactions (hydrogen bonds and hydrophobic interactions) between the target proteins and compounds

6. PLP https://plip-tool.biotec.tu-dresden.de/plip-web/plip/index

   - may ruin the ligand?? no
   - should have hydrophobic...
   - download the pse file

7. Protein Plus https://proteins.plus/ containing poseview

   

8. ADMET: http://www.swissadme.ch

   - accepts smiles, each line one molecule (in batch)
   - items
     - Lipinski’s rule of five
     - Pan-assay interference compounds (PAINS) filter
     - carcinogenic patterns 

9. PASS analysis: biological activity predictions

> Identification of natural compounds as potent inhibitors of SARS-CoV-2....



### docking result



### attention

- You should probably avoid search spaces bigger than  `30 x 30 x 30` Angstrom, unless you also increase "`--exhaustiveness`".



### appendix

1. obminimize options

   ```shell
   obminimize # see options. other tutorials to further discuss these!!
   
   options:      description:
     -c crit     set convergence criteria (default=1e-6)
     -cg         use conjugate gradients algorithm (default)
     -sd         use steepest descent algorithm
     -newton     use Newton2Num linesearch (default=Simple)
     -ff ffid    select a forcefield:
     		GAFF    General Amber Force Field (GAFF).
   		Ghemical    Ghemical force field.
   		MMFF94    MMFF94 force field. # good for ligands
   		MMFF94s    MMFF94s force field.
   		UFF    Universal Force Field.
     -h          add hydrogen atoms
     -n steps    specify the maximum numer of steps (default=2500)
     -cut        use cut-off (default=don't use cut-off)
     -rvdw rvdw  specify the VDW cut-off distance (default=6.0)
     -rele rele  specify the Electrostatic cut-off distance (default=10.0)
     -pf freq    specify the frequency to update the non-bonded pairs (default=10)
   ```

   necessary? https://www.researchgate.net/post/Energy_Minimization_and_Docking_why_is_it_necessary

2. vina

   ```shell
   vina --help # or any wrong input.
   Input:
     --receptor arg        rigid part of the receptor (PDBQT)
     --flex arg            flexible side chains, if any (PDBQT)
     --ligand arg          ligand (PDBQT)
   
   Search space (required):
     --center_x arg        X coordinate of the center
     --center_y arg        Y coordinate of the center
     --center_z arg        Z coordinate of the center
     --size_x arg          size in the X dimension (Angstroms)
     --size_y arg          size in the Y dimension (Angstroms)
     --size_z arg          size in the Z dimension (Angstroms)
   
   Output (optional):
     --out arg             output models (PDBQT), the default is chosen based on 
                           the ligand file name
     --log arg             optionally, write log file
   
   Misc (optional):
     --cpu arg                 the number of CPUs to use (the default is to try to
                               detect the number of CPUs or, failing that, use 1)
     --seed arg                explicit random seed
     --exhaustiveness arg (=8) exhaustiveness of the global search (roughly 
                               proportional to time): 1+
     --num_modes arg (=9)      maximum number of binding modes to generate
     --energy_range arg (=3)   maximum energy difference between the best binding 
                               mode and the worst one displayed (kcal/mol)
   
   Configuration file (optional):
     --config arg          the above options can be put here
   
   Information (optional):
     --help                display usage summary
     --help_advanced       display usage summary with advanced options
     --version             display program version
   # You should probably avoid search spaces bigger than 30 x 30 x 30 Angstrom, unless you also increase "--exhaustiveness".
   ```

   

3. other commands

   ```shell
   cat *.smi > total.smi # into one file
   ```









