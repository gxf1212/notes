# UROPS: Running programs

Specific protocol and experiences for the project I did in NUS, Jan~May 2021. Some a little more about Autodock and Gromacs basics will be temporarily added.

UROPS: undergraduate research opportunity project in science. 

This page is about:

- small molecule database
- Autodock Vina: virtual screening
- Gromacs: protein-ligand simulation and analysis
- OE PCR

## Database

structure-based virtual screening (SBVS)

### ATP, profile

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
   - 

2. experimental <u>analog</u>

   drugbank; in-vivo (has filtered. available?)

3. **chemical similar**

   pubchem

4. [world](https://zinc.docking.org/substances/subsets/world/)natural products (optional)

from ATP mimics to **their** analogs (2D), might be a lot? 

#### final

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

### result list

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

- drugbank

  get:

  | type     | fda  | experimental | nutraceutical |      |
  | -------- | ---- | ------------ | ------------- | ---- |
  | quantity |      |              |               |      |

  

  > and problem with similarity function in drugbank? one contains ATP scores 1.0

- 



it seems not so similar at 40%...



for more databases, see http://cheminfo.charite.de/superdrug2/downloads.html



### backup

> [https://tripod.nih.gov/npc/](https://www.researchgate.net/deref/https%3A%2F%2Ftripod.nih.gov%2Fnpc%2F)Currently having more than 7000 FDA approved compounds.It is free and updated daily.Install it and select criteria according to your need and export file as .tsv(can be opened in excel)The exported file will have drug name, SMILES and other required information.SMILES can be converted to SDF or mol or mol2 according to your need using OpenBabel tool.



## AutoDock vina and main virtual screening

- pdb file: 

  - **HETATM** is applied to  non-standard residues of protein, DNA or RNA, as well as atoms in other  kinds of groups, such as carbohydrates, substrates, ligands, solvent,  and metal ions.

  > - https://jerkwin.github.io/2015/06/05/PDB%E6%96%87%E4%BB%B6%E6%A0%BC%E5%BC%8F%E8%AF%B4%E6%98%8E/
  > - https://www.cgl.ucsf.edu/chimera/docs/UsersGuide/tutorials/pdbintro.html

- pdbqt file format: http://autodock.scripps.edu/faqs-help/faq/faqsection_view?section=Technical%20Questions

- .mol2 file format: http://paulbourke.net/dataformats/mol2/

### flow

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
> - 重新打开，

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

my workstation: 42 sec for 1st ligand (1 min ~20 sec on lab). about 2 times faster cpu



do not run multiple tasks together?! it make all tasks stop..



### running result

#### try1

- lab: 712, about 6 hours
- my workstation: the first one, 81min, about 60 times of rigid in lab; first 5, about 5 hours
- use little memory but **most of the cpu** (90% in lab)
- really no GPU acceleration on Vina, maybe optimized algorithm. autodock has GPU version

#### try2

- my: 56 for 13min9sec (789sec). exhau=24
  - 3221 will be 12.6 hours
- lab: 16 for 28min54sec (1736sec). 1575 will be 47.47 hours



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
    - 
  - close contact?
  
- goal

  - self-justification, interacting with key residues



1. pre: data

   ```shell
   vina_split --input out.pdbqt # split output pdbqt, single
   bash ./vina_split_batch.sh # in batch
   ```
   
   run my python code for ranking
   
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

   

## MD simulation

- https://manual.gromacs.org/archive/5.0.4/online/gro.html gro file format

- http://www.mdtutorials.com/gmx/index.html simple example tutorials 

- https://manual.gromacs.org/current/user-guide/index.html#user-guide

- https://jerkwin.github.io/GMX/GMXtut-0 an example of Amber99sb-ildn ff and a great Chinese tutorial of http://www.mdtutorials.com

- https://jerkwin.github.io/GMX/GMXtut-5 protein-ligand, no analysis

  > https://jerkwin.github.io/2018/11/24/Barnett_GROMACS%E6%95%99%E7%A8%8B/

- http://kangsgo.com/94.html with ligand

- https://www.bonvinlab.org/education/molmod/simulation free protein
  
  - https://github.com/haddocking/molmod-data/tree/master/mdp .mdp file
  
- https://zhuanlan.zhihu.com/p/149862369 for pymol viewing

- https://www.cnblogs.com/w-guangyu/p/7787396.html .mdp file, but should read documentation!

### single protein

1. for each protein, always check:

   1. **if the position is right**

   2. **if non-polar hydrogens are added** (only for method 1)

   3. delete water (we can skip)

      ```shell
      grep -v HOH 2cqg_1.pdb > 2cqg_1.pdb
      ```

      Always check your .pdb file for entries listed under the comment MISSING

      the PDB file should contain only protein atoms

#### method 1

1. generate topology

   ```shell
   gmx pdb2gmx -f 2cqg_1.pdb -o 2cqg_1.gro -water tip3p -ignh
   ```

   **choose a force field: type the number**

   AMBER99SB-ILDN protein, nucleic AMBER94 (Lindorff-Larsen et al., Proteins 78, 1950-58, 2010)

   - `-water spc`指定所用的水的模型
     - https://lammps.sandia.gov/doc/Howto_tip3p.html
   - `-ignh`参数会让程序自动忽略输入pdb文件中的氢原子并根据相应的力场**自动添加符合力场要求的氢原子**

   > note
   >
   > - 检查组氨酸质子化状态所做的选择, 注意蛋白质的总电荷数
   > - path to forcefield files: `~/gromacs-2021.5-gpu/share/gromacs/top`. refer to `forcefield.itp` under each folder to use that forcefield
   > - 

   > output
   >
   > - The topology for the molecule.   
   >   - The topology (topol.top by default) contains all the  information necessary to define the molecule within a simulation.  This  information includes nonbonded parameters (atom types and charges) as  well as bonded parameters (bonds, angles, and dihedrals).
   > - A position restraint file.   
   >   - .itp
   >   - it defines a force constant used to keep atoms in place during equilibration
   > - A post-processed structure file.
   >   - .gro

   > There are 3784 dihedrals,  268 impropers, 2506 angles 
   >    3611 pairs,   1386 bonds and   0 virtual sites 
   >
   > Total mass 9777.308 a.m.u. 
   >
   > Total charge 2.000 e

   > error: 
   >
   > Atom HB3 in residue LYS 102 was not found in rtp entry NLYS with 24 atoms while sorting atoms. (ignore it)

2. I did not perform EM in vaccum

3. define the box 

   ```shell
   gmx editconf -f 2cqg_1.gro -o 2cqg_1_newbox.gro -c -d 1.0 -bt cubic
   ```

   The above command centers the protein in the box (-c), and places it at least 1.0 nm from the box edge (-d 1.0). The box type is defined as a cube (-bt cubic).

4. solvate

   ```shell
   gmx solvate -cp 2cqg_1_newbox.gro -cs spc216.gro -o 2cqg_1_solv.gro -p topol.top
   # also backed up the former .top as #topol.top.1#
   ```

   The configuration of the protein (-cp) is contained in  the output of the previous editconf step, and the configuration of the  solvent (-cs) is part of the standard GROMACS installation.  We are using spc216.gro, which is a generic equilibrated 3-point solvent model.  You can use spc216.gro as the solvent configuration for SPC, SPC/E, or TIP3P water, since they are all three-point water models.
   
5. add ions

   ```shell
   gmx grompp -f ions.mdp -c 2cqg_1_solv.gro -p topol.top -o ions.tpr
   ```

   > generated .trp (which is just a helper file to add ions) and mdout.mdp (not used later??)

   I don't know if ions.mdp is functioning?? seems they are related to energy minimization

   ```shell
   gmx genion -s ions.tpr -o 2cqg_1_solv_ions.gro -p topol.top -pname NA -nname CL -neutral -conc 0.15 # -nn 8
   ```

   定义了阳离子和阴离子的名称(分别使用`-pname`和`-nname`), 告诉`genion`只需要添加必要的离子来中和蛋白质所带的净电荷, 添加的阴离子数目为8(`-nn 8`). 对于`genion`, 除了简单地中和体系所带的净电荷以外, 你也可以同时指定`-neutral`和`-conc`选项来添加指定浓度的离子. 关于如何使用这些选项, 请参考`genion`的说明.

   `-neutral`选项保证体系总的净电荷为零, 体系呈电中性, `-conc`选项设定需要的离子浓度(这里为0.15 M). `-g`选项指定输出日志文件的名称. `-norandom`选项会依据静电势来放置离子而不是随机放置(默认), 但我们在这里使用随机放置方法.

   出现提示后, 选择13 “SOL”. 这意味这我们将用离子替换一些溶剂分子. 

   > backed up topol.top to ./#topol.top.2#

6. energy minimization

   1. ```shell
      gmx grompp -f em_sol_pme.mdp -c 2cqg_1_solv_ions.gro -p topol.top -o em.tpr
      ```

      - entol: some use 10, others 250,1000....
      - emstep = 0.01 may need nsteps = 50000 

      see manual P206

   2. then run

      ```shell
      gmx mdrun -v -deffnm em
      ```

      - `-v`: show infomation
      - `-deffnm`: input file
      - I set Fmax=250, conjugated gradient, just based on the performance, otherwise it's hard to converge

      but if not converging, must run `gmx grompp` again!!!

   3. output 

      > Polak-Ribiere Conjugate Gradients converged to Fmax < 250 in 388 steps 
      > Potential Energy  = -4.6409103e+05 
      > Maximum force   =  1.8645695e+02 on atom 1365 
      > Norm of force   =  9.9704073e+00

      > generate **em.gro** trr log edr
      >
      > - `em.log`: ASCII文本的日志文件, 记录了能量最小化过程
      > - `em.edr`: 二进制能量文件
      > - `em.trr`: 全精度的二进制轨迹文件
      > - `em.gro`: 能量最小化后的结构

   4. result

      - Epot应当是负值, 根据体系大小和水分子的多少, 大约在105–106的数量级(对水中的单个蛋白质而言). 
      - 第二个重要的指标是力的最大值Fmax.

      ```shell
      gmx energy -f em.edr -o em.xvg # choose 10 for potential
      ```

      analysis: 

      ```shell
      yum install grace
      xmgrace em.xvg # outputs a plot
      ```

7. NVT

   ```shell
   gmx grompp -f nvt.mdp -c em.gro -p topol.top -o nvt.tpr
   gmx mdrun -deffnm nvt
   ```

   - using constraints = h_bonds as suggested by gmx

   - `pcoupl = no`: 不使用压力耦合

   - 除注释外, 所用参数的完整解释可以在GROMACS手册中找到.

   - > **说明**: 当模拟运行时间较长时, 你可以使用后台运行方法, 如
     >
     > gmx-5.x: `nohup gmx mdrun -deffnm npt-pr &`
     >
     > 为检查模拟运行进度, 可使用`tail`命令查看日志文件, 如 `tail -n 25 npt-pr.log`

   - > 对于`coulombtype`, PME代表粒子网格Ewald(Particle Mesh Ewald)静电方法[5,6]. 当体系中含有电荷时(暴露的带电氨基酸残基, 离子, 极化的脂类等), PME是计算长程静电相互作用的最好方法. `constraints`的`all-bonds`选项可使用线性约束算法(LINCS, Linear Constraint algorithm)固定体系中所有键的长度(当模拟的时间步长>0.001 ps时, 使用此选项非常重要[7]).

   ```shell
   gmx energy -f nvt.edr -o nvt.xvg # 提示时输入`16 0`来选择体系温度并退出
   xmgrace nvt.xvg
   ```

8. NPT 

   ```shell
   gmx grompp -f npt.mdp -c nvt.gro -r nvt.gro -t nvt.cpt -p topol.top -o npt.tpr
   gmx mdrun -deffnm npt
   ```

   changes:

   - 使用了Parrinello-Rahman控压器.

   - `continuation = yes`: 我们将从NVT平衡阶段开始继续进行模拟

   - `gen_vel =no`: 从轨迹中读取速度

     现在要使用`-t`选项以包括NVT平衡过程中的产生的检查点文件. 这个文件包含了继续模拟所需要的所有状态变量. 为使用NVT过程中得到的速度我们必须包含这个文件. 坐标文件(`-c`)是NVT模拟的最终输出文件.

   > 对于NVT预平衡而言，最重要的是需要检查体系的温度是否达到设定的300 K并基本维持在300 K附近。
   >
   > 对于NPT预平衡而言，则需要注意体系的密度或者盒子的体积是否达到稳定，也需要关注温度是否恒定；因为控压算法的关系，体系中的压力波动往往较大，故而压力的瞬时值会较之设定值有着较大的偏移，一般只需要保证体系的密度较为稳定即可。
   >
   > ```shell
   > gmx energy -f npt.edr -o npt-pressure.xvg # 17
   > gmx energy -f npt.edr -o npt-density.xvg # 23
   > xmgrace npt-pressure.xvg
   > xmgrace npt-density.xvg
   > ```
   >
   > 在Xmgrace中, 依次点击菜单 `Data` -> `Transformations` -> `Running averages...`, 在弹出的对话框中设定`Length of average`, `Accept`即可. `Length of average`的具体数值要根据具体数据的特点来设, 越大, 得到的平均线越平滑. 自己试几次就知道了.
   >
   > `Data` -> `FeatureExtraction` -> `Y average`,`Data` -> `export...`
   >
   > mean pressure: -79.846729
   >
   > density: 1008.3168
   >
   > in matlab: https://ww2.mathworks.cn/matlabcentral/fileexchange/70607-import-and-plot-gromacs-xvg-data-files
   >
   > check by pymol:
   >
   > ```shell
   > gmx trjconv -f npt.trr -o npt.xtc
   > load nvt.gro, npt # theFormer.gro
   > load npt.xtc, npt # same name
   > show sticks,resi 105+106+107+109+110+113+114+137+145+147+149+151+132+176+177+179+181+183
   > color magenta,resi 105+106+107+109+110+113+114+137+145+147+149+151+132+176+177+179+181+183
   > ```
   >
   > check by vmd
   >
   > ```shell
   > # in extensions--tk console
   > cd /home/gxf/Desktop/xufan/MD/try/2cqg_1
   > mol load gro npt.gro trr npt.trr
   > # in extensions--visualization--movie maker
   > # movie settings--trajectory
   > # 
   > ```
   >
   > I found it's somehow good except those water who crosses the boundary showed their bond across the whole box and make it a mess
   >
   > if still not sure, check more properties
   >
   > ```shell
   > gmx energy -f npt.edr -o npt-temp.xvg # temp, 15
   > xmgrace npt-temp.xvg
   > gmx energy -f npt.edr -o npt-vol.xvg # volume, 22
   > xmgrace npt-vol.xvg
   > ```


10. production simulation

    ```shell
    gmx grompp -f md.mdp -c npt.gro -t npt.cpt -p topol.top -o final_2cqg.tpr
    gmx mdrun -deffnm final_2cqg
    ```

    read the tail of the log for progress:

    ```shell
    tail -n 13 final_2cqg.log
    ```

    https://www.runoob.com/linux/linux-comm-tail.html

    ```
    gmx mdrun -deffnm final_2cqg -nb gpu
    ```

    如果可用的GPU卡超过一个, 或者想利用GROMACS支持的杂合并行方案对计算进行划分, 请参考GROMACS手册以及网络上的资料. 这些技术细节超出了本教程的范围.

    

#### method 2

> It's never possible for a half-completed file in Amber to be put into gromacs for ANY processing!
>
> I've tried
>
> - define tip3p in Amber and solvate in gromacs
> - Amber cannot calculate num of ions itself

see method 1 for detailed parameters

1. delete Hs

   ```shell
   reduce 2cqg_1.pdb -Trim > 2cqg_1_noh.pdb
   ```

2. get amber .gro .top files

   ```shell
   # tleap -s -f leap_free.in > leap_free.out
   conda activate AmberTools20
   tleap
   source leaprc.ff99SBildn
   pro = loadpdb 2cqg_1_noh.pdb
   check pro
   source leaprc.water.tip3p
   solvatebox pro TIP3PBOX 10.0
   charge pro
   addIons2 pro Cl- 15 Na+ 13
   charge pro
   check pro
   saveamberparm pro 2cqg.prmtop 2cqg.inpcrd
   quit
   ```

   calculate the number of ions you need and modify the leap.in by (may take a while)

   https://ambermd.org/tutorials/basic/tutorial8/index.php https://www.phys.ksu.edu/personal/schmit/SLTCAP/SLTCAP.html

   > - mw of protein: 9.762 kDa
   > - concentration: 150
   > - Net charge: 2.00
   > - number of water: 5560

3. get .top and .gro

   ```shell
   conda activate Acpype
   acpype -p 2cqg.prmtop -x 2cqg.inpcrd -d
   # rename
   mv 2cqg_GMX.gro 2cqg_1_solv.gro
   mv 2cqg_GMX.top topol.top
   # also generated em.mdp and md.mdp for test
   mv em.mdp em_test.mdp
   mv md.mdp md_test.mdp
   ```

4. change the representation

   ```shell
   grep "WAT" -rl ./2cqg_1_solv.gro | xargs sed -i "s/WAT/SOL/g" 
   grep "WAT" -rl ./topol.top | xargs sed -i "s/WAT/SOL/g" 
   # WAT in Amber, "SOL" in gromacs; just need to change those under moleculetype and molecule
   # can do for all files under a dir
   # change in topol.top (under "atom") IM to Cl-, IP to Na+
   grep " IP " -rl ./com.top | xargs sed -i "s/ IP / Na+ /g" 
   grep " IM " -rl ./com.top | xargs sed -i "s/ IM / Cl- /g" 
   ```

   > atom name 1397 in topol.top and 2cqg_1_solv.gro does not match (NA+ - CL-) 
   >
   > atom name 1397 in topol.top and 2cqg_1_solv.gro does not match (NA+ - CL-) 
   >
   > atom name 1399 in topol.top and 2cqg_1_solv.gro does not match (NA+ - CL-) 
   >
   > atom name 1399 in topol.top and 2cqg_1_solv.gro does not match (NA+ - CL-) 
   >
   > atom name 1400 in topol.top and 2cqg_1_solv.gro does not match (NA+ - CL-)
   >
   > atom name 1400 in topol.top and 2cqg_1_solv.gro does not match (NA+ - CL-) 
   >
   > WARNING 1 [file topol.top, line 14435]: 
   > 14 non-matching atom names 
   > atom names from topol.top will be used 
   > atom names from 2cqg_1_solv.gro will be ignored
   >
   > **use `-maxwarn 2`** 
   >
   > 
   >
   > Excluding 3 bonded neighbours molecule type '2cqg' 
   >
   > turning H bonds into constraints... 
   >
   > Excluding 1 bonded neighbours molecule type 'CL-' 
   >
   > turning H bonds into constraints... 
   >
   > Excluding 1 bonded neighbours molecule type 'NA+' 
   >
   > turning H bonds into constraints... 
   >
   > Excluding 2 bonded neighbours molecule type 'SOL' 
   >
   > turning H bonds into constraints...
   >
   > **it's just name-related problem. I don't know if it matters**

   > don't do position restraint!!!!
   >
   > ```shell
   > echo 1 | gmx genrestr -f 2cqg_1_solv.gro -o pro.itp -fc 1000 1000 1000
   > ```
   >
   >    add them to the end of protein part in .top file
   >
   > ```shell
   > #include "pro.itp"
   > ```

5. energy minimization

   ```shell
   gmx grompp -f em_sol_pme.mdp -c 2cqg_1_solv.gro -r 2cqg_1_solv.gro -p topol.top -o em.tpr -maxwarn 2  # after position restraint, must add -r same.gro
   gmx mdrun -v -deffnm em
   echo 11 0 | gmx energy -f em.edr -o em.xvg # potential
   echo 10 0 | gmx energy -f em.edr -o em.xvg # if no restraint
   xmgrace em.xvg
   ```

   > `grompp`程序将会提示此体系的净电荷不为零, 还会输出一些与体系和控制参数有关的其他信息. 该程序也会产生一个额外的输出文件(`mdout.mdp`), 里面包含所有控制参数的设置。
   >
   > 我咋不信在em这步的？可以作为参考，比如group的设置。甚至FEP的东西都出来了。。

6. nvt

   delete: "define PORES..."

   ```shell
   gmx grompp -f nvt.mdp -c em.gro -r em.gro -p topol.top -o nvt.tpr
   gmx mdrun -deffnm nvt
   echo 16 0 | gmx energy -f nvt.edr -o nvt.xvg
   echo 15 0 | gmx energy -f nvt.edr -o nvt.xvg # temperature if no restraint
   xmgrace nvt.xvg
   # no-posre mean: 300.19
   # posre mean: 299.6911
   ```

   > after this step, the cubic water is partially torted, but recovered after npt. from the animation we can see it recovers in several steps gradually. Amazing!
   >
   > it might not be related to porse.itp
   >
   > either does the restrained version! (seemed smaller, only corner?)

7. npt

   ```shell
   gmx grompp -f npt.mdp -c nvt.gro -r nvt.gro -t nvt.cpt -p topol.top -o npt.tpr
   gmx mdrun -deffnm npt
   ```

8. check (restraint # non-restraint)

   ```shell
   echo 17 0 | gmx energy -f npt.edr -o npt-pressure.xvg # 16
   xmgrace npt-pressure.xvg
   # may delete the first line. still -39.901572
   echo 23 0 | gmx energy -f npt.edr -o npt-density.xvg # 22
   xmgrace npt-density.xvg
   # additional
   echo 15 0 | gmx energy -f npt.edr -o npt-temp.xvg # 14
   xmgrace npt-temp.xvg
   echo 22 0 | gmx energy -f npt.edr -o npt-vol.xvg # volume, 21
   xmgrace npt-vol.xvg
   ```

   by pymol

   ```shell
   gmx trjconv -f npt.trr -o npt.xtc
   # in pymol
   load nvt.gro, npt # theFormer.gro
   load npt.xtc, npt # same name
   ```

9. run

      ```shell
   gmx grompp -f md.mdp -c npt.gro -r npt.gro -t npt.cpt -p topol.top -o final_2cqg.tpr
   gmx mdrun -deffnm final_2cqg -nb gpu
   ```

      > You are using pressure coupling with absolute position restraints, this will give artifacts. Use the refcoord_scaling option.
      >
      > solve: add refcoord_scaling    = com in `md.mdp`

      > non-posre: 5h45min; posre: 

#### result of method 2

[Analysis reference](https://jerkwin.github.io/2017/10/20/GROMACS%E5%88%86%E5%AD%90%E5%8A%A8%E5%8A%9B%E5%AD%A6%E6%A8%A1%E6%8B%9F%E6%95%99%E7%A8%8B-%E5%A4%9A%E8%82%BD-%E8%9B%8B%E7%99%BD%E7%9B%B8%E4%BA%92%E4%BD%9C%E7%94%A8/#%E7%AC%AC%E4%B8%89%E9%83%A8%E5%88%86-%E5%88%86%E5%AD%90%E5%8A%A8%E5%8A%9B%E5%AD%A6%E6%A8%A1%E6%8B%9F%E6%95%B0%E6%8D%AE%E7%9A%84%E5%88%86%E6%9E%90%E4%B8%80)

> save fig in xmgrace: file--print setup--check "print to file" and edit filename--file--print, or
>
> ```shell
> grace -nxy input.xvg -hdevice PNG -hardcopy -printfile output.png
> ```
>
> the units are all nm

1. visualization

   ```shell
   # -pbc mol: to consider pbc when running out
   gmx trjconv -f final_2cqg.trr -o final_2cqg.xtc -dt 50
   echo 0 | gmx trjconv -s final_2cqg.tpr -f final_2cqg.xtc -o final_2cqg_noPBC.xtc -pbc mol -ur compact -dt 50 # choose 0
   echo 0 | gmx trjconv -f final_2cqg.xtc -o final_2cqg_nojump.xtc -pbc nojump -dt 50
   # pymol
   load npt.gro, final_2cqg
   load final_2cqg_noPBC.xtc, final_2cqg # do not show protein crossing the box
   # load final_2cqg_nojump.xtc, final_2cqg # do not let molecules go back to the box, bad visualization
   # load final_2cqg.xtc, final_2cqg
   ```

   if protein runs out of water box, (might caused by not restricting position)

   - (not useful in pymol) http://bbs.keinsci.com/thread-2085-1-1.html

   - http://www.mdbbs.org/thread-9782-1-1.html

     同五楼，对MD没有影响，在分析和view的时候，可以用ptraj 把分子放到盒子中间，可以先
     center mask
     image center familiar
     trajout mdcrd
     一般你的分子就到盒子中间了。。
     具体在ambertools的manual上有。。。

2. 周期性映像间的最小距离

   ```shell
   echo 4 | gmx mindist -f final_2cqg.xtc -s final_2cqg.tpr -od minimal-periodic-distance.xvg -pi # choose 4 backbone
   xmgrace minimal-periodic-distance.xvg
   ```

   要注意小距离事件是不时出现还是持续出现. 如果持续出现, 很可能影响蛋白的动力学; 如果只是偶尔出现, 那基本没有影响.

   不仅直接相互作用需要担心, 非直接效应, 即以水为媒介的间接相互作用也可能引起问题. 例如, 蛋白可以导致水在离其最近的四个溶剂化层中出现有序性, 这大约对应于1 nm的距离. 理想情况下, 最小距离不应该小于2 nm.

3. get rmsd

   RMSD通常用于表征结构到平衡态的收敛情况. 如前面所讲, RMSD是结构变化对原子总数的平均, 基本上是一个距离表征, 低的值最有意义. (**使用初始结构作为参考结构**)

   ```shell
   # all choose 1 protein
   echo "1\n 1" | gmx rms -s final_2cqg.tpr -f final_2cqg_nojump.xtc -o rmsd_pro.xvg -tu ns 
   xmgrace rmsd_pro.xvg
   # all choose 4 backbone
   echo "4\n 4" | gmx rms -s final_2cqg.tpr -f final_2cqg_nojump.xtc -o rmsd_bb.xvg -tu ns 
   xmgrace rmsd_bb.xvg
   ```

   > -tu: Unit for time values. default: ps

4. get rmsf

   除了能量等性质, 也能够通过结构的变化和弛豫来考察模拟趋向平衡的收敛性. 通常,  这种弛豫仅仅使用结构到参考结构(如晶体结构)的欧几里德距离来衡量. 这一距离被称为均方根偏差(RMSD). 然而,  我们也建议再考察一下到平均结构的弛豫, 即相对于平均结构的RMSD, 个中原因将在下节说明. 但是要计算相对于平均结构的RMSD,  需要首先获得平均结构. **平均结构**可以在计算[均方根波动(RMSF)](http://en.wikipedia.org/wiki/Root_mean_square_fluctuation)时**顺便获得**.

   RMSF计算每个原子相对于其平均位置的涨落, 表征了结构的变化对时间的平均, 给出了蛋白各个区域柔性的表征,  对应于晶体学中的b因子(温度因子). 通常, 我们预期RMSF和温度因子类似, 这可以用于考察模拟结果是否与晶体结构符合.  

   RMSF(和平均结构)使用`rmsf`命令计算. `-oq`选项**可以计算b因子**, 并将其添加到参考结构中. 我们最关心的是每个残基的涨落, 这可使用选项`-res`设定.

   ```shell
   echo 4 | gmx rmsf -f final_2cqg.xtc -s final_2cqg.tpr -o rmsf-per-residue.xvg -ox average.pdb -oq bfactors-residue.pdb -res
   xmgrace rmsf-per-residue.xvg
   ```

   使用`xmgrace`查看RMSF的图形, 区分柔性和刚性区域.

5. secondary structure

   `.xvg`文件包含一个时间序列, 列出了每帧中与每一二级结构类型相关的残基数目. 

   更多的细节在.xpm文件中, 它使用颜色编码了每个残基在一段时间内的二级结构.

   ```shell
   gmx do_dssp -f final_2cqg_nojump.xtc -s final_2cqg.tpr -o secondary-structure.xpm -sc secondary-structure.xvg
   xmgrace secondary-structure.xvg
   gmx xpm2ps -f secondary-structure.xpm -o secondary-structure.eps -size 4000
   ps2pdf secondary-structure.eps
   ```

6. 

#### single-result-notes

for a brief compare

for no restraint:

>- minimal distance
>  - min: 1.657, about twice. average: 2.4776703
>
>- rmsd
>  - protein
>    - mean: 0.23964283 
>    - std dev: 0.043064737
>  - backbone
>    - mean: 0.15873299 
>    - std dev: 0.04248219
>- rmsf
>  - all-backbone
>    - mean: 0.095364286
>    - std: 0.076359395
>  - exclude 

for restraint:

> - minimal distance
>   - min: 1.657, about twice. average: 2.4776703
> - rmsd
>   - protein
>     - mean: 0.23964283 
>     - std dev: 0.043064737
>   - backbone
>     - mean: 0.15873299 
>     - std dev: 0.04248219
> - rmsf
>   - all-backbone
>     - mean: 0.095364286
>     - std: 0.076359395
>   - exclude 

### generate the topology of ligands

> choose a good conformation:
>
> - atp: drugbank 5, **pubchem 5**(=zinc6)

> see: 
>
> - [使用GAFF力场参数化小分子的自动化工具](https://jerkwin.github.io/2019/07/14/%E8%AE%B8%E6%A5%A0-%E4%BD%BF%E7%94%A8GAFF%E5%8A%9B%E5%9C%BA%E5%8F%82%E6%95%B0%E5%8C%96%E5%B0%8F%E5%88%86%E5%AD%90%E7%9A%84%E8%87%AA%E5%8A%A8%E5%8C%96%E5%B7%A5%E5%85%B7/) but did not understood the script
> - [使用AmberTools+ACPYPE+Gaussian创建小分子GAFF力场的拓扑文件](https://jerkwin.github.io/2015/12/08/%E4%BD%BF%E7%94%A8AmberTools+ACPYPE+Gaussian%E5%88%9B%E5%BB%BA%E5%B0%8F%E5%88%86%E5%AD%90GAFF%E5%8A%9B%E5%9C%BA%E7%9A%84%E6%8B%93%E6%89%91%E6%96%87%E4%BB%B6/) with gui and script examples
> - user protocols
>   - https://zhuanlan.zhihu.com/p/188735956 use gaussian and resp charge
>   - https://gohom.win/2015/11/12/AMBER-Ligand/
>   - http://kangsgo.com/94.html
> - summary
>   - [几种生成有机分子GROMACS拓扑文件的工具](http://bbs.keinsci.com/thread-428-1-1.html) generate charge
>   - [RESP2原子电荷的思想](http://sobereva.com/531) intro to resp charge
>
> comments:
>
> - it's better to work under Linux environment. Windows cmd does not support statement like `f=atp`. you may install WSL (Windows subsystem for Linux) and find your files at `\mnt`
> - tools needed: conda (AmberTools, acpype), Gaussian+MDanalysis, openbabel, gromacs, bash shell
> - [download G16 for Linux](https://murbsch-my.sharepoint.com/:f:/g/personal/gxf1212_880n_vip/Em7CrTdwlC5Horhyc1RxCBEBdlhKyrUy5Og55gbckLL4sg?e=XD0A7B)

#### Steps

1. add non-polar hydrogens

   ```shell
   f=atp_zinc_6
   f=atp_pubchem_5
   obabel $f.pdb -opdb -O ${f}_h.pdb -p 7.0
   obminimize -ff MMFF94 -n 1000 ${f}_h.pdb > ${f}_m.pdb
   # below is not useful
   # reduce $f.pdb > ${f}_h.pdb
   # pdb4amber -i $f.pdb -o ${f}_h.pdb --reduce
   # no longer -h, p adds h considering pH
   ```

   or try adtools (laji!) or pymol (also laji!)

   but I believe non-polar hydrogen should be added

   > if added extra hydrogen: pymol can delete atom, but I think GaussView can edit all bonds! Maybe 
   >

2. get gaussian input file

   ```shell
   # conda activate AmberTools20
   antechamber -i ${f}_m.pdb -fi pdb -o ${f}.gjf -fo gcrt -pf y \
   -gm "%mem=4096MB" -gn "%nproc=4" -ch ${f} -nc 2 \
   -gk "#B3LYP/6-31G* em=GD3BJ scrf=solvent=water iop(6/33=2) pop=CHELPG" -ge ${f}_resp.gesp -gv 1 
   # change your charge!
   # no opt 
   ```
   
   http://gohom.win/2015/09/17/AutoCalcRESP/ 自动计算ESP和RESP电荷(AMBER and G09) explains parameters

   https://zhuanlan.zhihu.com/p/59070901 use its gaussian setting

   http://ambermd.org/antechamber/ac.html#antechamber antechamber parameters

3. run gaussian

   ```shell
   g16 ${f}.gjf
   tail -n 13 ${f}.log
   ```

   `B3LYP/6-31G* em=GD3BJ`: 8h51min to optimize. 

   we don’t optimize

   get .log, .chk, .gesp files

   > segmentation violation
   >
   > 成因：提供这种报错信息毫无意义，任何原因Gaussian报错退出都会有类似的输出。
   >
   > 解决：**用文本编辑器打开输出文件**，如上图中为“a.out”文件，**拖到最后看最终报错**。Linux下也是如此，可用 nano, tail, cat, vi 等命令阅读文件。看到真正报错后，可按照相应信息（如下文中涉及的这些报错）进行解决。

4. get .mol2 file with the resp charge

   > alternative: generate this with .log file

   ```shell
   # conda activate AmberTools20
   antechamber -i ${f}_resp.gesp -fi gesp -o ${f}.mol2 -fo mol2 -pf y -c resp
   parmchk2 -i ${f}.mol2 -f mol2 -o ${f}.frcmod # check GAFF parameters. additional parameters are here
   ```

   https://zhuanlan.zhihu.com/p/59070901

   also get some *out file

   > for drugbank618
   >
   > Warning: The assigned bond types may be wrong, please : 
   > (1) double check the structure (the connectivity) and/or  
   > (2) adjust atom valence penalty parameters in APS.DAT, and/or  
   > (3) increase PSCUTOFF in define.h and recompile bondtype.c 
   >    (be cautious, using a large value of PSCUTOFF (>100) will  
   >    significantly increase the computation time). 
   >
   > Info: The number of path atoms exceeded MAXPATHATOMNUM for atom (ID: 7, Name: C7). 
   >     Automatically increasing to 10000. 
   > Info: The number of path atoms exceeded MAXPATHATOMNUM for atom (ID: 8, Name: O1). 
   >     Automatically increasing to 10000.

5. **ALIGN**. accidentally, gaussian output structure runs away from the docked. 

   run python to get ${f}_aligned.mol2
   
   ```shell
   ~/Desktop/work/projects/undergraduate/NUS-UROPS/md/prepare/align.py PEP
   ```
   

#### A simplified alternative

bcc charge

```shell
conda activate AmberTools21
pdb4amber -i lig.pdb -o lig_new.pdb --reduce --dry
antechamber -i lig_new.pdb -fi pdb -o lig.mol2 -fo mol2 -at gaff -c bcc -rn MOL
parmchk2 -i lig.mol2 -f mol2 -o lig.frcmod
```



> draft
> 
> ```shell
> tleap
> source leaprc.gaff  # 载入力场
> loadamberparams atp_pubchem_5.frcmod  # 载入配体参数化文件
> lig=loadmol2 atp_pubchem_5_aligned.mol2  # 载入配体
> check lig  # 检查配体
> saveamberparm lig atp_pubchem_5.prmtop atp_pubchem_5.inpcrd  # 保存amber输入文件
> quit
> ```


### combine the ligand and protein

> - thanks for https://zhuanlan.zhihu.com/p/197979734 to release me for copying texts!
> - http://sobereva.com/266 要处理xxx.mol2就执行./acpype.py -i xxx.mol2，算完后会新产生一个xxx目录，里头有_GMX后缀的.gro、.itp、.top，直接在GROMACS里用即可。
> - http://bbs.keinsci.com/thread-13564-1-1.html AmberTools+ACPYPE产生的就是完整形式的top文件（包括成键项与非键项参数）。参数都已经齐全了还要include干啥。 but acpype don't produce position restraint
> - [SLTCAP tool to calculate the number of ions](https://www.phys.ksu.edu/personal/schmit/SLTCAP/SLTCAP.html)

1. get old fflig2

   ```shell
   cp /home/gxf/miniconda3/envs/AmberTools20/dat/leap/cmd/oldff/leaprc.ff99SBildn /home/gxf/miniconda3/envs/AmberTools20/dat/leap/cmd/leaprc.ff99SBildn
   ```

   now (22.2.17)

   ```shell
   cd /home/gxf/.conda/envs/AmberTools21/dat/leap/cmd/
   cd /home/gxf/anaconda3/envs/AmberTools21/dat/leap/cmd/
   ```

2. get amber input file

   ```shell
   # cannot use $f here
   tleap
   source leaprc.ff99SBildn # 载入蛋白质的力场
   pro = loadpdb 2cqg_1_noh.pdb # 载入蛋白质. if error, just edit in pymol
   
   check pro 
   source leaprc.gaff  # 载入力场
   loadamberparams atp_pubchem_5.frcmod # 载入配体参数化文件
   
   lig=loadmol2 atp_pubchem_5_aligned.mol2 # 载入配体
   check lig # 检查配体
   com = combine {pro lig} # 将蛋白质和配体组合形成复合物
   source leaprc.water.tip3p
   solvatebox com TIP3PBOX 10.0 # 对复合物进行溶剂化，盒子边缘距离复合物最小 1 nm
   check com
   addIons2 com Cl- 14 Na+ 12 # 根据计算好的离子数添加
   charge com
   check com # 最后的检查
   saveamberparm com com.prmtop com.inpcrd # 保存amber输入文件
   quit
   # check: see if ok
   # if no english, you can copy and paste...
   ```

   > FATAL:  Atom .R<NLYS 102>.A<H 25> does not have a type.
   >
   > ```shell
   > reduce 2cqg_1_a.pdb -Trim > 2cqg_1_noh.pdb
   > ```
   >
   > Try removing the hydrogen atoms from the PDB file in those residues.  Leap will add the ones it needs back in.  If you continue to get complaints involving unrecognized hydrogens, you can remove all hydrogens using "reduce" with "-Trim".  See the manual for instructions on using reduce.
   >
   > 以上在tleap里的操作是一步一步来做，一个简单的办法是将以上所有操作写入leap.in文件，按如下操作一步完成：

   ```
   tleap -s -f leap.in > leap.out
   ```

   but have to run in cmd

   ```shell
   conda activate AmberTools20
   tleap
   source leaprc.ff99SBildn
   pro = loadpdb 2cqg_1_noh.pdb
   check pro 
   source leaprc.gaff
   loadamberparams atp_haddock.frcmod
   lig=loadmol2 atp_haddock_aligned.mol2
   check lig
   com = combine {pro lig}
   source leaprc.water.tip3p
   solvatebox com TIP3PBOX 10.0
   charge com
   addIons2 com Cl- 14 Na+ 12
   charge com
   check com
   saveamberparm com com.prmtop com.inpcrd
   quit
   
   loadamberparams atp_pubchem_5.frcmod
   lig=loadmol2 atp_pubchem_5_aligned.mol2
   ```

   other choice of force fields:

   ```shell
   source leaprc.gaff2
   source leaprc.protein.ff14SB
   ```

   or, multiple ligand

   ```shell
   tleap
   source leaprc.ff99SBildn
   proA = loadpdb A_noh.pdb
   proB = loadpdb B_noh.pdb
   source leaprc.gaff
   loadamberparams LIG1.frcmod
   lig1=loadmol2 LIG1_aligned.mol2
   loadamberparams LIG2.frcmod
   lig2=loadmol2 LIG2_aligned.mol2
   com = combine {proA proB lig1 lig2}
   source leaprc.water.tip3p
   solvatebox com TIP3PBOX 10.0
   charge com
   addIons2 com Cl- 19 Na+ 26
   charge com
   check com
   saveamberparm com com.prmtop com.inpcrd
   quit
   ```

   > calculate the number of ions: https://ambermd.org/tutorials/basic/tutorial8/index.php https://www.phys.ksu.edu/personal/schmit/SLTCAP/SLTCAP.html
   >
   > - mw of protein: 9.762 kDa
   > - concentration: 150
   > - Net charge: 2.00
   > - number of water: 5206
   >
   > Warning: The unperturbed charge of the unit (1.999900) is not zero.
   >
   > Warning: Close contact of 1.432869 angstroms between .R<CASP 185>.A<H 2> and .R<MOL 186>.A<H10 41>
   >
   > one thing that matters is, when measuring mw of the protein, we must **include hydrogens**:
   >
   > ```shell
   > conda activate AmberTools21
   > reduce 2fbw_pro.pdb > 2fbw_h.pdb  # add hydrogen
   > python3 ~/Desktop/work/projects/tools/Python-for-MD/prepare/mw.py ~/Desktop/work/projects/undergraduate/SDH/md/lig1/ 2fbw_h.pdb
   > 
   > ```

3. convert to gmx
   
   >   history command (in 2021)
   >   
   >     ```shell
   >    conda activate Acpype
   >    acpype -p com.prmtop -x com.inpcrd -d -c user
   >    # rename
   >    mv com_GMX.gro com.gro
   >    mv com_GMX.top com.top
   >    # also generated em.mdp and md.mdp for test
   >    mv em.mdp em_test.mdp
   >    mv md.mdp md_test.mdp
   >     ```
   >
   >    and process some text
   >
   >    ```shell
   >    grep "WAT" -rl ./com.gro | xargs sed -i "s/WAT/SOL/g" 
   >    grep "WAT" -rl ./com.top | xargs sed -i "s/WAT/SOL/g"
   >    # change in topol.top (under "atom") IM to Cl-, IP to Na+
   >    grep " IP " -rl ./com.top | xargs sed -i "s/ IP / Na+ /g" 
   >    grep " IM " -rl ./com.top | xechoargs sed -i "s/ IM / Cl- /g" 
   >    ```
   
   note that the output has changed in 2022! output into a folder; add a run.sh and .itp file, but we don't use them.
   
   ```shell
   conda activate Acpype
   acpype -p com.prmtop -x com.inpcrd -d -c user
   cd com.amb2gmx
   mv com_GMX.gro com.gro
   mv com_GMX.top com.top
   grep "WAT" -rl ./com.gro | xargs sed -i "s/WAT/SOL/g" 
   grep "WAT" -rl ./com.top | xargs sed -i "s/WAT/SOL/g" 
   ```
   
   > [acpype server](https://www.bio2byte.be/acpype/), but not using

### MD with one ligand

https://jerkwin.github.io/GMX/GMXtut-5/#%E6%A6%82%E8%BF%B0

you may use my scripts: [download here](https://gitee.com/gxf1212/notes/raw/master/MD/utils/gmx-md-scripts.zip), but refer to Jerkwin tutorial for details; or modify from his.

1. 将蛋白质和ligand放到分开的坐标文件中 (I don't need)

   ```shell
   grep JZ4 3HTB_clean.pdb > JZ4.pdb
   ```

   remove original H

   ```
   conda activate AmberTools20
   reduce A.pdb -Trim > A_noh.pdb
   reduce B.pdb -Trim > B_noh.pdb
   ```

2. generate topology of ligand

   see above

3. combine ligand and protein

   see above

   then same as free protein

4. em

   ```shell
   gmx grompp -f em_sol_pme.mdp -c com.gro -r com.gro -p com.top -o em.tpr -maxwarn 1 
   gmx mdrun -v -deffnm em
   echo 10 | gmx energy -f em.edr -o em.xvg # potential
   xmgrace em.xvg
   # potential turns negative??
   ```

   > if F in -CF3 connects, don't worry because gro文件仅仅是坐标文件，没有拓扑信息，VMD默认的原子之间的距离小于一定的值，就自动成键，如果你同时把拓扑信息导入就可以了。
   >
   > 注意, pdb文件中一般不包含成键连接信息, 而PyMOL像大多数分子查看软件一样绘制了原子之间的成键, 这些成键是自动根据原子间的距离来确定的.
   >
   > http://blog.sciencenet.cn/blog-548663-1082458.html

6. combine protein and ligand, water and ion

   ```shell
   gmx make_ndx -f em.gro -o index.ndx
   > 1 | 13 # protein and Mol
   > q # quit
   ```

   and change in nvt/npt.mdp as outputed: 

   ```
   energygrps = Protein_MOL Water_and_ions
   ```

6. nvt

   ```shell
   gmx grompp -f nvt.mdp -c em.gro -r em.gro -n index.ndx -p com.top -o nvt.tpr
   gmx mdrun -deffnm nvt
   echo "15\n0" | gmx energy -f nvt.edr -o nvt.xvg # temperature
   xmgrace nvt.xvg
   ```
   
   > only ATP reported this error (before removing H), index better than noindex
   >
   > Step 641, time 1.282 (ps)  LINCS WARNING 
   > relative constraint deviation after LINCS: 
   > rms 0.009870, max 0.261503 (between atoms 1408 and 1409) 
   > bonds that rotated more than 30 degrees: 
   >  atom 1 atom 2  angle  previous, current, constraint length 
   >   1403  1404  69.3   0.0975  0.0973    0.0973 
   >   1408  1409  90.0   0.1293  0.1227    0.0973
   >
   > <u>the variables set in the GMXRC file</u>
   
7. npt

   ```shell
   gmx grompp -f npt.mdp -c nvt.gro -r nvt.gro -n index.ndx -t nvt.cpt -p com.top -o npt.tpr
   gmx mdrun -deffnm npt
   ```
   
8. check (with atp data)

   ```shell
   echo "16\n0" | gmx energy -f npt.edr -o npt-pressure.xvg
   xmgrace npt-pressure.xvg
   # may delete the first line..
   echo "22\n0" | gmx energy -f npt.edr -o npt-density.xvg # 1007.82
   xmgrace npt-density.xvg
   # additional
   echo "14\n0" | gmx energy -f npt.edr -o npt-temp.xvg # 300.077
   xmgrace npt-temp.xvg
   echo "21\n0" | gmx energy -f npt.edr -o npt-vol.xvg # volume
   xmgrace npt-vol.xvg
   ```

   ```shell
   # movie
   gmx trjconv -f npt.trr -o npt.xtc
   pwd
   # in pymol
   cd dir
   # theFormer.gro, then same name
   load nvt.gro, npt 
   load npt.xtc, npt
   show sticks,resi 4+5+6+8+9+12+13+36+44+46+48+50+31+75+76+78+80+82
   color magenta,resi 4+5+6+8+9+12+13+36+44+46+48+50+31+75+76+78+80+82
   ```

   ```shell
   # rmsd
   echo "4\n 4" | gmx rms -s npt.tpr -f npt.xtc -o rmsd_npt_bb.xvg -tu ns 
   xmgrace rmsd_npt_bb.xvg
   ```

10. run

       ```shell
    gmx grompp -f md.mdp -c npt.gro -r npt.gro -n index.ndx -t npt.cpt -p com.top -o final_com.tpr
    gmx mdrun -deffnm final_com
    gmx mdrun -deffnm final_com -nb gpu
       ```

always check:

- position restraint
- .mdp files

> backup: no index
>
> ```shell
> gmx grompp -f nvt.mdp -c em.gro -r em.gro -p com.top -o nvt.tpr
> gmx mdrun -deffnm nvt
> echo "15\n0" | gmx energy -f nvt.edr -o nvt.xvg # temperature
> xmgrace nvt.xvg
> ```
>
> 

### appendix

#### flow

for a batch of ligand:

- run setup_gaussian.sh
- run run_gaussian
- run after_gaussian
- run get_complex
- solvate and got complex
- run process complex (under Acpype!!!)
- > add #include to .top
- and do em, nvt, npt step by step

#### for other ligands

```shell
loadamberparams ligand_drugbank1336_1.frcmod
lig=loadmol2 ligand_drugbank1336_1_aligned.mol2
# don't forget to align!
loadamberparams ligand_drugbank1593_1.frcmod
lig=loadmol2 ligand_drugbank1593_1_aligned.mol2

loadamberparams ligand_drugbank1971_1.frcmod
lig=loadmol2 ligand_drugbank1971_1_aligned.mol2
loadamberparams ligand_drugbank479_2.frcmod
lig=loadmol2 ligand_drugbank479_2_aligned.mol2
loadamberparams ligand_ZINC000022058728_5.frcmod
lig=loadmol2 ligand_ZINC000022058728_5_aligned.mol2

loadamberparams ligand_drugbank1561_1.frcmod
lig=loadmol2 ligand_drugbank1561_1_aligned.mol2

loadamberparams ligand_drugbank2478_1.frcmod
lig=loadmol2 ligand_drugbank2478_1_aligned.mol2

loadamberparams ligand_drugbank2066_1.frcmod
lig=loadmol2 ligand_drugbank2066_1_aligned.mol2

loadamberparams ligand_drugbank2478_1.frcmod
lig=loadmol2 ligand_drugbank2478_1_aligned.mol2

loadamberparams ligand_ZINC000230122970_4.frcmod
lig=loadmol2 ligand_ZINC000230122970_4_aligned.mol2

loadamberparams ligand_drugbank1444_1.frcmod
lig=loadmol2 ligand_drugbank1444_1_aligned.mol2

loadamberparams ligand_drugbank1593_4.frcmod
lig=loadmol2 ligand_drugbank1593_4_aligned.mol2

loadamberparams ligand_drugbank1444_3.frcmod
lig=loadmol2 ligand_drugbank1444_3_aligned.mol2

loadamberparams ligand_ZINC000004215648_2.frcmod
lig=loadmol2 ligand_ZINC000004215648_2_aligned.mol2

loadamberparams ligand_ZINC000100054746_1.frcmod
lig=loadmol2 ligand_ZINC000100054746_1_aligned.mol2

loadamberparams ligand_drugbank479_2.frcmod
lig=loadmol2 ligand_drugbank479_2_aligned.mol2

loadamberparams ligand_drugbank2119_3.frcmod
lig=loadmol2 ligand_drugbank2119_3_aligned.mol2

loadamberparams ligand_ZINC000000537802_1.frcmod
lig=loadmol2 ligand_ZINC000000537802_1_aligned.mol2

loadamberparams ligand_drugbank1773_1.frcmod
lig=loadmol2 ligand_drugbank1773_1_aligned.mol2

loadamberparams ligand_ZINC000095618900_2.frcmod
lig=loadmol2 ligand_ZINC000095618900_2_aligned.mol2
```

```shell
conda activate AmberTools20
tleap
source leaprc.ff99SBildn
pro = loadpdb 2cqg_1_noh.pdb
check pro 
source leaprc.gaff

loadamberparams atp_zinc_6.frcmod
lig=loadmol2 atp_zinc_6_aligned.mol2

com = combine {pro lig}
source leaprc.water.tip3p
solvatebox com TIP3PBOX 10.0
charge com
addIons2 com Cl- 14 Na+ 12 # 5206
addIons2 com Cl- 15 Na+ 13 # >5400
addIons2 com Cl- 16 Na+ 1 # 1593

charge com
check com
saveamberparm com com.prmtop com.inpcrd
quit
```

```
show sticks,resi 105+106+107+109+110+113+114+137+145+147+149+151+132+176+177+179+181+183
color magenta,resi 105+106+107+109+110+113+114+137+145+147+149+151+132+176+177+179+181+183
```

#### Potential problems

1. system explosion, too large force: 

   [from Jerkwin](https://jerkwin.github.io/2016/12/28/GROMACS%E6%9C%AF%E8%AF%AD-%E7%88%86%E7%A0%B4(Blowing_Up)/)

2. 谈谈分子动力学模拟蛋白-配体复合物过程中配体发生脱离的原因 http://sobereva.com/632

### result

- `topol.tpr`: 运行输入文件, 包含模拟开始时体系的完整描述
- `confout.gro`: 结构文件, 包含最后一步的坐标和速度
- `traj.trr`: 全精度轨迹, 包括随时间变化的位置, 速度和力
- `traj.xtc`: 压缩轨迹, 轻量, 只包含低精度(0.001 nm)的坐标信息
- `ener.edr`: 随时间变化的有关能量数据
- `md.log`: 模拟过程的日志, 包含模拟过程中的信息

#### trajectory files

- final.xtc (obtained from the simulation): also ok for visualization, but will cross the faces of your box
- `noPBC`保持结构完好，不会通过一个面跳跃到相对的一个面
- `nojump`把体系放在最中间，使所有原子处于盒子中；但溶剂会飞向无穷远

> 教程中性质计算都用这个。实际上各种轨迹算出来的有一点小差别，最好还是全部nojump

获得xtc文件后, 如果在后续分析中不需要速度和力的话, 你可以删除trr文件.

#### free result commands

1. visualization

   ```shell
   gmx trjconv -f final_2cqg.trr -o final_2cqg.xtc -dt 50
   echo 0 | gmx trjconv -s final_2cqg.tpr -f final_2cqg.xtc -o final_2cqg_noPBC.xtc -pbc mol -ur compact -dt 50
   ```

   ```shell
   load npt.gro, final_2cqg
   load final_2cqg_noPBC.xtc, final_2cqg
   show sticks,resi 4+5+6+8+9+12+13+36+44+46+48+50+31+75+76+78+80+82
   color magenta,resi 4+5+6+8+9+12+13+36+44+46+48+50+31+75+76+78+80+82
   ```

2. distance

   ```shell
   echo 4 | gmx mindist -f final_2cqg.xtc -s final_2cqg.tpr -od minimal-periodic-distance.xvg -pi # choose 4 backbone
   xmgrace minimal-periodic-distance.xvg
   ```

3. rmsd, rmsf

   ```shell
   echo 0 | gmx trjconv -f final_2cqg.xtc -o final_2cqg_nojump_2.xtc -pbc nojump -dt 50
   echo "4\n 4" | gmx rms -s final_2cqg.tpr -f final_2cqg_nojump_2.xtc -o rmsd_bb.xvg -tu ns 
   xmgrace rmsd_bb.xvg
   echo 4 | gmx rmsf -f final_2cqg.xtc -s final_2cqg.tpr -o rmsf-per-residue.xvg -ox average.pdb -oq bfactors-residue.pdb -res
   xmgrace rmsf-per-residue.xvg
   ```

   to pick a time interval:

   ```shell
   gmx trjconv -f final_2cqg.trr -o final_2cqg_20-50.xtc -b 20000 -e 50000 -dt 50
   echo 0 | gmx trjconv -f final_2cqg.xtc -o final_2cqg_nojump_20-50.xtc -pbc nojump -b 20000 -e 50000 -dt 50
   echo "4\n 4" | gmx rms -s final_2cqg.tpr -f final_2cqg_nojump_20-50.xtc -o rmsd_bb_20-50.xvg -tu ns 
   xmgrace rmsd_bb_20-50.xvg
   echo 4 | gmx rmsf -f final_2cqg_20-50.xtc -s final_2cqg.tpr -o rmsf-per-residue_20-50.xvg -ox average_20-50.pdb -oq bfactors-residue_20-50.pdb -res
   xmgrace rmsf-per-residue_20-50.xvg
   ```

4. get pdb

   ```shell
   echo 1 | gmx trjconv -f final_2cqg_nojump_2.xtc -s final_2cqg.tpr -o traj.pdb -tu ns
   
   split_state traj
   run /home/gxf/Desktop/xufan/MD/real-simulation/further/align_traj.py # 961
   run /home/gxf/Desktop/xufan/MD/real-simulation/first-run/align_traj.py # 201
   # change to a contrasting color
   color yellow, traj* 
   show show sticks, resn MOL
   ```

5. properties

   - Rg

     ```shell
     echo 1 | gmx gyrate -s final_2cqg.tpr -f final_2cqg.xtc -o gyrate.xvg
     xmgrace gyrate.xvg
     ```

   - sasa

     ```shell
     echo 1 | gmx sasa -f final_2cqg_nojump.xtc -s final_2cqg.tpr -n index.ndx -o sasa.xvg
     xmgrace sasa.xvg
     echo 1 | gmx sasa -f final_2cqg_later_nojump.xtc -s final_2cqg.tpr -n index.ndx -or sasa-residue.xvg
     xmgrace sasa-residue.xvg
     ```

   - hbond

     ```shell
     echo "1\n 13" | gmx hbond -f final_2cqg_nojump.xtc -s final_2cqg.tpr -num pro_lig_hnum.xvg -ang pro_lig_hang.xvg # protein and ligand
     xmgrace pro_lig_hnum.xvg
     xmgrace pro_lig_hang.xvg
     ```

6. 

#### ligand-result commands (not corrected!!!)

good resources

- [分子动力学模拟数据的分析一（详细！）](https://jerkwin.github.io/2017/10/20/GROMACS%E5%88%86%E5%AD%90%E5%8A%A8%E5%8A%9B%E5%AD%A6%E6%A8%A1%E6%8B%9F%E6%95%99%E7%A8%8B-%E5%A4%9A%E8%82%BD-%E8%9B%8B%E7%99%BD%E7%9B%B8%E4%BA%92%E4%BD%9C%E7%94%A8/#%E7%AC%AC%E4%B8%89%E9%83%A8%E5%88%86-%E5%88%86%E5%AD%90%E5%8A%A8%E5%8A%9B%E5%AD%A6%E6%A8%A1%E6%8B%9F%E6%95%B0%E6%8D%AE%E7%9A%84%E5%88%86%E6%9E%90%E4%B8%80)
- https://jerkwin.github.io/GMX/GMXtut-0 also detailed
- https://zhuanlan.zhihu.com/p/149863158
- https://www.mdanalysis.org/MDAnalysisTutorial

> save fig in xmgrace: file--print setup--check "print to file" and edit filename--file--print, or
>
> ```shell
> grace -nxy input.xvg -hdevice PNG -hardcopy -printfile output.png
> ```
>
> the units are all nm

1. check properties

   usually they are satisfied...
   
   ```shell
   echo "16\n0" | gmx energy -f final_com.edr -o final_com-pressure.xvg
   xmgrace final_com-pressure.xvg
   echo "22\n0" | gmx energy -f final_com.edr -o final_com-density.xvg
   xmgrace final_com-density.xvg
   echo "14\n0" | gmx energy -f final_com.edr -o final_com-temp.xvg
   xmgrace final_com-temp.xvg
   echo "21\n0" | gmx energy -f final_com.edr -o final_com-vol.xvg
   xmgrace final_com-vol.xvg
   ```
   
2. visualization

   ```shell
   gmx trjconv -f final_com.trr -o final_com.xtc -dt 50 # fundamental
   echo 0 | gmx trjconv -s final_com.tpr -f final_com.xtc -n index.ndx -o final_com_noPBC.xtc -pbc mol -ur compact -dt 50
   # -pbc mol: to consider pbc when running out, do not show protein crossing the box
   ```

   > optional
   >
   > ```shell
   > bash center.sh
   > echo 0 | gmx trjconv -s final_com.tpr -f final_com.xtc -n index_center.ndx -o final_com_noPBC.xtc -pbc mol -ur compact -dt 50
   > ```
   
   pymol
   
      ```python
   load npt.gro, final_com
   load final_com_noPBC.xtc, final_com
   show sticks,resi 4+5+6+8+9+12+13+36+44+46+48+50+31+75+76+78+80+82
   color magenta,resi 4+5+6+8+9+12+13+36+44+46+48+50+31+75+76+78+80+82
      ```
   
   - http://www.mdbbs.org/thread-9782-1-1.html
   
     同五楼，对MD没有影响，在分析和view的时候，可以用ptraj 把分子放到盒子中间，可以先
     center mask
     image center familiar
      trajout mdcrd
     一般你的分子就到盒子中间了。。
      具体在ambertools的manual上有。。。
   
3. 周期性映像间的最小距离

   ```shell
   echo 4 | gmx mindist -f final_com.xtc -s final_com.tpr -od minimal-periodic-distance.xvg -pi # choose 4 backbone
   xmgrace minimal-periodic-distance.xvg
   ```

4. no jump trajectory, **prepare for next**

   ```shell
   echo 0 | gmx trjconv -f final_com.xtc -o final_com_nojump.xtc -pbc nojump -dt 50
   ```

5. get rmsd

   RMSD通常用于表征结构到平衡态的收敛情况. 如前面所讲, RMSD是结构变化对原子总数的平均, 基本上是一个距离表征, 低的值最有意义. (使用初始结构作为参考结构)

   ```shell
   # all choose 4 backbone
   echo "4\n 4" | gmx rms -s final_com.tpr -f final_com_nojump.xtc -o rmsd_bb.xvg -tu ns 
   xmgrace rmsd_bb.xvg
   xmgrace -nxy rmsd_bb.xvg -hdevice PNG -hardcopy -printfile rmsd_bb.png
   
   # all choose 1 protein
   echo "1\n 1" | gmx rms -s final_com.tpr -f final_com_nojump.xtc -o rmsd_pro.xvg -tu ns
   xmgrace rmsd_pro.xvg
   ```
   
6. get rmsf

   除了能量等性质, 也能够通过结构的变化和弛豫来考察模拟趋向平衡的收敛性. 通常,  这种弛豫仅仅使用结构到参考结构(如晶体结构)的欧几里德距离来衡量. 这一距离被称为均方根偏差(RMSD). 然而,  我们也建议再考察一下到平均结构的弛豫, 即相对于平均结构的RMSD, 个中原因将在下节说明. 但是要计算相对于平均结构的RMSD,  需要首先获得平均结构. 平均结构可以在计算[均方根波动(RMSF)](http://en.wikipedia.org/wiki/Root_mean_square_fluctuation)时顺便获得.

   RMSF计算每个原子相对于其平均位置的涨落, 表征了结构的变化对时间的平均, 给出了蛋白各个区域柔性的表征,  对应于晶体学中的b因子(温度因子). 通常, 我们预期RMSF和温度因子类似, 这可以用于考察模拟结果是否与晶体结构符合.  RMSF(和平均结构)使用`rmsf`命令计算. `-oq`选项可以计算b因子, 并将其添加到参考结构中. 我们最关心的是每个残基的涨落, 这可使用选项`-res`设定.

   get rmsf, average, b-factors

   ```shell
   # backbone
   echo 4 | gmx rmsf -f final_com.xtc -s final_com.tpr -o rmsf-per-residue.xvg -ox average.pdb -oq bfactors-residue.pdb -res
   xmgrace rmsf-per-residue.xvg
   xmgrace -nxy rmsf-per-residue.xvg -hdevice PNG -hardcopy -printfile rmsf-per-residue.png
   ```
   

    使用`xmgrace`查看RMSF的图形, 区分柔性和刚性区域.

7. secondary structure

   just calculate from python. need a traj.pdb. to prepare:

   >    `.xvg`文件包含一个时间序列, 列出了每帧中与每一二级结构类型相关的残基数目. 
   >
   >    更多的细节在.xpm文件中, 它使用颜色编码了每个残基在一段时间内的二级结构.
   >
   >    ```shell
   >    gmx do_dssp -f final_com_nojump.xtc -s final_com.tpr -o secondary-structure.xpm -sc secondary-structure.xvg
   >    xmgrace secondary-structure.xvg
   >    gmx xpm2ps -f secondary-structure.xpm -o secondary-structure.eps -size 4000
   >    ps2pdf secondary-structure.eps
   >    ```

8. get the pdbs

   ```shell
   # protein and mol
   echo 24 | gmx trjconv -f final_com_nojump.xtc -s final_com.tpr -n index.ndx -o traj.pdb -tu ns
   # in pymol. no need to specify wd
   split_state traj
   run /home/gxf/Desktop/xufan/MD/real-simulation/further/align_traj.py # 961
   run /home/gxf/Desktop/xufan/MD/real-simulation/first-run/align_traj.py # 201
   # change to a contrasting color
   color yellow, traj* 
   show 
   show sticks, resn MOL
   ```

   采用Pymol画豪猪图 http://kangsgo.com/156.html   https://zhuanlan.zhihu.com/p/149863158

   ```
   
   ```

   查看小分子的运动轨迹?? just see in pymol

9. gmx_mmpbsa

   - http://ambermd.org/tutorials/advanced/tutorial3/py_script/section3.htm   
   - https://github.com/Valdes-Tresanco-MS/gmx_MMPBSA/tree/master/docs/examples in `/home/gxf/Desktop/xufan/MD/try0/examples`, some of which is outdated, also see this https://pypi.org/project/gmx-MMPBSA/1.0.0/
   - params: refer to Amber manual P759
   - debug
     - http://muchong.com/t-9083279-1 DecompError: Mismatch in number of decomp terms!

   > MM/PBSA的预测结果更接近实验数值，而MM/GBSA则对相对结合自由能预测性能更优。 http://blog.sciencenet.cn/blog-2877557-1268444.html
   >
   > PB costs a lot of time.... in /simulation-past/further/atp-2nd, there's a result of PB
   >
   > GB needs several minutes. 2.074 min 50ns (30)
   >
   > On the other hand, in the so-called Multiple Trajectory (MT) approximation, the snapshots for each one of the species (i.e. complex, receptor, and ligand) are extracted from their own trajectory file. This approximation, theoretically more rigorous though, leads to higher standard deviation of the binding free energies. We use ST
   >
   > You should use the default mask assignment if possible because it provides a good error catch.

   > other useless:
   >
   > AMBER tutorial https://jerkwin.github.io/2018/01/28/AMBER%E9%AB%98%E7%BA%A7%E6%95%99%E7%A8%8BA3-MM-PBSA/
   >
   > https://jerkwin.github.io/GMX/GMXtut-9/   some fundamental knowledge
   >
   > normal .xtc, not nojump?

   1. principle
   
      https://en.wikipedia.org/wiki/Implicit_solvation#Generalized_Born_model equation
      
      http://sobereva.com/42
      
   2. run
   
      ```shell
      gmx trjconv -f final_com.trr -o final_com_later.xtc -b 2000 -e 10000 -dt 50
      # single trajectory method, and collect file into a folder
      # same for decomposition, but costs too much time...
      # mmpbsa-decomp-10.in	mmpbsa-50.in	mmpbsa-decomp-50.in
      conda activate AmberTools20
      gmx_MMPBSA -O -i mmpbsa-10.in -cs final_com.tpr -ci index.ndx -cg 1 13 -ct final_com_later.xtc -lm atp_pubchem_5_aligned.mol2 -nogui
      mkdir gmx_MMPBSA
      mv _GMXMMPBSA_* ./gmx_MMPBSA
      mv COM* LIG.prmtop REC.prmtop reference.frc gmx_MMPBSA.log FINAL_RESULTS_MMPBSA.dat ./gmx_MMPBSA
      ```
   
      - The script creates <u>three unsolvated mdcrd</u> files (complex, receptor, and ligand) using ptraj that are the coordinates analyzed during the GB and PB calculations. 
      - The <u>*.mdout files</u> contain the <u>energies for all frames</u> specified. 
      - A PDB file of the average structure is created align (via RMS) all snapshots to <u>prepare for a quasi-harmonic entropy calculation</u> with ptraj if one is requested. 
      - All files created by MMPBSA.py should begin <u>with the prefix '_MMPBSA_'</u> except for the final output file.
      - When a topology file is defined, the ligand mol2 file is not needed. The ligand mol2 file only required when `gmx_MMPBSA` build the amber topology from a structure

   3. ana
   
      ```shell
      gmx_MMPBSA_ana -p ./gmx_MMPBSA/_GMXMMPBSA_info 
      # pop out a window same as when the program finished, showing all components changing with time
      ```
   
      > VDWAALS = van der Waals contribution from MM.
      > EEL = electrostatic energy.
      > EPB/EGB = the electrostatic contribution to the solvation free energycalculated by PB or GB respectively.
      > ESURF/ECAVITY/ENPOLAR = nonpolar contribution to the solvation free energy calculatedby an empirical model.
      > DELTA G binding = final estimated binding free energy calculated from the terms above. (kcal/mol)

      read with python: https://gohom.win/2016/03/30/amber-mmpbsa/

      plot result: https://www.jianshu.com/p/615328ef542d

   4. other
   
      ```shell
      conda activate AmberTools20
      for f in `ls -F | grep ligand`; do 
      cd $f
      mol2=`ls | grep _aligned.mol2`
      rm -rf mmpbsa-10.in
      rm -rf ./gmx_MMPBSA
      cp /home/gxf/Desktop/xufan/MD/real-simulation/mmgbsa-50.in ./
      gmx_MMPBSA -O -i mmgbsa.in -cs final_com.tpr -ci index.ndx -cg 1 13 -ct final_com_later.xtc -lm ${mol2} -nogui
      mkdir ./gmx_MMPBSA
      mv _GMXMMPBSA_* ./gmx_MMPBSA
      mv COM* LIG.prmtop REC.prmtop reference.frc gmx_MMPBSA.log FINAL_RESULTS_MMPBSA.dat ./gmx_MMPBSA
      for fi in `ls | grep '#'`; do
      rm -rf $fi
      done
      cd ..
      done
      cd ..
      ```
   
      ```shell
      # pbsa
      conda activate AmberTools20
      cp /home/gxf/Desktop/xufan/MD/real-simulation/mmpbsa-50.in ./
      mol2=`ls | grep _aligned.mol2`
      gmx_MMPBSA -O -i mmpbsa-50.in -cs final_com.tpr -ci index.ndx -cg 1 13 -ct final_com_later.xtc -lm ${mol2} -nogui
      mkdir ./gmx_MMPBSA-pbsa
      mv _GMXMMPBSA_* COM* LIG.prmtop REC.prmtop reference.frc gmx_MMPBSA.log FINAL_RESULTS_MMPBSA.dat ./gmx_MMPBSA-pbsa
      ```
      
      in amber
      ```shell
      echo 0 | gmx trjconv -s final_com.tpr -f final_com.xtc -n index.ndx -o final_com_later_noPBC.xtc -pbc mol -ur compact -dt 50 -b 20000 -e 50000 
      # conda activate AmberTools20
      MMPBSA.py -O -i mmgbsa-decomp.in -cp com.prmtop -y final_com_later_noPBC.xtc
      mkdir gmx_MMGBSA-decomp
      mv _MMPBSA_* gmx_MMPBSA.log FINAL_RESULTS_MMPBSA.dat FINAL_DECOMP_MMPBSA.dat ./gmx_MMGBSA-decomp
      
      gmx_MMPBSA_ana -p ./gmx_MMGBSA-decomp/_MMPBSA_info
      ```
      
      > other
      >
      > ```shell
      > # P765
      > # conda activate AmberTools
      > mdconvert -o final_com_later.crd final_com_later.xtc 
      > ```
      >
      > 
   
10. solvent accessible surface area

    https://qinqianshan.com/bioinformatics/protein_design/solvent-accessibility/

    疏水相互作用被认为是驱动蛋白质折叠的主要作用力，与溶剂接触的区域都是极性区域，也就是疏水作用力比较弱的区域。因此通过研究蛋白质表面与溶剂的接触情况， 能够用来研究蛋白质的疏水性, 稳定性，蛋白蛋白相互作用，蛋白折叠等。

    某种程度上和分子的溶解自由能相关，对于表面完全疏水的大分子，可以近似认为其溶解自由能和其SASA成正比，对于既有亲水和疏水表面的分子SASA和溶解自由能的关系可能会复杂一些。

    溶剂可及表面积可还可进一步细分为亲水性SAS和疏水性SAS. 

    the bigger sasa is, the more it is exposed to water (hydrophilic)

    ```shell
    echo 1 | gmx sasa -f final_com_nojump.xtc -s final_com.tpr -n index.ndx -o sasa.xvg -or sasa-residue.xvg
    xmgrace sasa.xvg
    xmgrace sasa-residue.xvg
    ```

    - `-o`: Total area as a function of time
    - `-or`: Average area per residue
    - `-odg`: Estimated solvation free energy as a function of time

11. `g_hbond`统计氢键

    ```shell
    echo "1\n 20" | gmx hbond -f final_com_nojump.xtc -s final_com.tpr -num pro_wat_hnum.xvg -ang pro_wat_hang.xvg # protein and water
    xmgrace pro_wat_hnum.xvg # num with time
    xmgrace pro_wat_hang.xvg # angle distribution
    echo "1\n 13" | gmx hbond -f final_com_nojump.xtc -s final_com.tpr -num pro_lig_hnum.xvg -ang pro_lig_hang.xvg # protein and ligand
    xmgrace pro_lig_hnum.xvg
    xmgrace pro_lig_hang.xvg
    ```

13. 聚类分析

    ```shell
    mkdir cluster
    cd cluster
    rm -rf ./*
    gmx cluster -s ../final_com.gro -f ../final_com.xtc -dm rmsd-matrix.xpm -dist rmsd-distribution.xvg -o clusters.xpm -sz cluster-sizes.xvg -tr cluster-transitions.xpm -ntr cluster-transitions.xvg -clid cluster-id-over-time.xvg -cl clusters.pdb -cutoff 0.2 -method gromos
    xmgrace cluster-id-over-time.xvg
    cd ..
    ```

    Distances between structures can be determined from a trajectory or read from an .xpm (page 433) matrix file with the -dm option

    • -dist writes the RMSD distribution.
    • -ev writes the eigenvectors of the RMSD matrix diagonalization.
    • -sz writes the cluster sizes.
    • -tr writes a matrix of the number transitions between cluster pairs.
    • -ntr writes the total number of transitions to or from each cluster.
    • -clid writes the cluster number as a function of time.

14. salt bridge

    ```shell
    mkdir saltbridge
    cd saltbridge
    rm -rf ./*
    gmx saltbr -f ../final_com_nojump.xtc -s ../final_com.tpr -t 0.5 -sep
    cd ..
    ```

    程序会输出一系列xvg文件, 给出-/-, +/-(最关注的)和+/+残基间的距离. 当需要时, 通过设置`-sep`选项, 这个程序可以为每对相反的带电残基产生一个输出文件, 这些残基位于轨迹中的某点, 彼此处于一定的截断距离范围内(这里是0.5 nm, 通过`-t`选项设置). 这将产生许多文件, 所以分析时最好建立一个单独的目录. 

    not so meaningful

15. 蛋白质回旋半径

    回旋半径可以表征蛋白质结构的紧实度，同样也可以依靠回旋半径来表征模拟过程中蛋白质的肽链松散程度的变化

    ```shell
    echo 1 | gmx gyrate -s final_com.tpr -f final_com.xtc -o gyrate.xvg
    xmgrace gyrate.xvg
    ```

16. 构象主成分分析

    一个常用的, 但常常理解不深的分析方法是对轨迹进行主成分分析(PCA, PrincipalComponents Analysis).  这种方法有时候也称为本征动力学(ED, essential dynamics), 目的在于识别原子的大尺度集约运动,  从而揭示隐藏在原子波动后面的结构信息, <u>帮助确定哪些运动方式对蛋白质的整体动力学贡献最大</u>.

    ```shell
    mkdir covar
    cd covar
    rm -rf ./*
    gmx covar -s ../final_com.tpr -f ../final_com.xtc -o eigenvalues.xvg -v eigenvectors.trr -xpma covar.xpm ascii covariances.dat
    cd ..
    ```

16. calculate distance, angle, etc.

    https://jerkwin.github.io/2018/01/14/GROMACS%E8%AE%A1%E7%AE%97%E8%B7%9D%E7%A6%BB%E7%9A%84%E6%96%B9%E6%B3%95%E5%8F%8A%E6%B3%A8%E6%84%8F%E7%82%B9/

    > https://jerkwin.github.io/GMX/GMXman-8/

    ```
    
    ```

17. ramachandran plot for rationality

    ```shell
    gmx rama -f final_com_later_nojump.xtc -s final_com.tpr -o ramachandran.xvg
    xmgrace ramachandran.xvg
    egrep "@|LEU-24" ramachandran.xvg > rama-LEU-24.xvg
    
    for f in `ls|grep ligand_`; do
    cd $f
    echo 1 | gmx trjconv -s final_com.tpr -f final_com.xtc -n index.ndx -o final_com_rama.xtc -pbc mol -ur compact -b 20000 -e 50000 -dt 300
    echo 1 | gmx trjconv -f final_com_rama.xtc -s final_com.tpr -n index.ndx -o traj_rama.pdb -tu ns
    cd ..
    done
    ```

    http://molprobity.biochem.duke.edu

    upload pdb file, do **Multi-model Ramachandran plot kinemage** only. download result and read

    > results:
    >
    > ~5min to upload/process 151 pdb files
    >
    > trim+rama: 4sec for 1 file
    >
    > | sys         | favored (98%) | allowed | outlier (<0.2%) |
    > | ----------- | ------------- | ------- | --------------- |
    > | free        | 96.25%        | 3.49%   | 0.24%           |
    > | ATP         | 96.19%        | 3.53%   | 0.28%           |
    > | azilsartan  | 96.87%        | 2.89%   | 0.24%           |
    > | lumacaftor  | 96.65%        | 3.20%   | 0.15%           |
    > | ponatinib   | 96.15%        | 3.37%   | 0.33%           |
    > | midostaurin | 96.20%        | 3.56%   | 0.24%           |
    > | indacaterol | 96.46%        | 3.17%   | 0.37%           |

18. d

#### summary result commands (updating)

want full time for property-time, but want "later" for per residue...

input: .tpr, .xtc, .ndx

1. visualization

   ```shell
   gmx trjconv -f final.trr -o final.xtc -dt 50
   echo 0 | gmx trjconv -s final.tpr -f final.xtc -n index.ndx -o final_noPBC.xtc -pbc mol -ur compact -dt 50 # choose 0 system
   ```

   ```shell
   load npt.gro, final
   load final_noPBC.xtc, final
   show sticks,resi 4+5+6+8+9+12+13+36+44+46+48+50+31+75+76+78+80+82
   color magenta,resi 4+5+6+8+9+12+13+36+44+46+48+50+31+75+76+78+80+82
   ```

   ```shell
   vmd npt.gro final.xtc
   ```

2. distance

   ```shell
   echo 4 | gmx mindist -f final.xtc -s final.tpr -od minimal-periodic-distance.xvg -pi # choose 4 backbone, similar to C alpha. but for whole protein, it's much smaller???
   xmgrace minimal-periodic-distance.xvg
   ```

3. prepare

   ```shell
   gmx trjconv -f final.trr -o final_later.xtc -b 2000 -e 10000 -dt 50 # exclude initial state
   echo 0 | gmx trjconv -f final.trr -o final_nojump.xtc -pbc nojump -dt 50 # full no jump
   echo 0 | gmx trjconv -f final.trr -o final_later_nojump.xtc -pbc nojump -b 2000 -e 10000 -dt 50 # later no jump
   ```

4. rmsd, rmsf

   ```shell
   echo "3\n 3" | gmx rms -s final.tpr -f final_nojump.xtc -o rmsd_ca.xvg -tu ns # C alpha
   xmgrace rmsd_ca.xvg
   echo 3 | gmx rmsf -s final.tpr -f final_nojump.xtc -o rmsf-per-residue.xvg -ox average.pdb -oq bfactors-residue.pdb -res
   xmgrace rmsf-per-residue.xvg
   echo "17\n 17" | gmx rms -s final.tpr -f final_nojump.xtc -o rmsd_lig.xvg -tu ns
   ```

5. get pdb

   ```shell
   echo 24 | gmx trjconv -s final.tpr -f final_nojump.xtc -n index.ndx -o traj.pdb -tu ns
   # in pymol
   split_state traj
   run /home/gxf/Desktop/xufan/MD/real-simulation/further/align_traj.py 
   run /home/gxf/Desktop/xufan/MD/real-simulation/further/align_traj_cus.py # 961
   run /home/gxf/Desktop/xufan/MD/real-simulation/first-run/align_traj.py # 201
   # tools
   run /home/gxf/Desktop/xufan/MD/real-simulation/first-run/align.pml
   hide sticks, resi 1-84
   show sticks, resi 12+44+46+48
   show sticks, resi 44+46+9
   
   save traj_1001.pdb, traj_1001
   
   show sticks,resi 4+5+6+8+9+12+13+36+44+46+48+50+31+75+76+78+80+82
   color magenta,resi 4+5+6+8+9+12+13+36+44+46+48+50+31+75+76+78+80+82
   ```

6. properties

   - Rg

     ```shell
     echo 1 | gmx gyrate -s final.tpr -f final_nojump.xtc -o gyrate.xvg
     xmgrace gyrate.xvg
     ```

   - sasa

     ```shell
     echo 1 | gmx sasa -f final_nojump.xtc -s final.tpr -n index.ndx -o sasa.xvg
     xmgrace sasa.xvg
     echo 1 | gmx sasa -f final_later_nojump.xtc -s final.tpr -n index.ndx -or sasa-residue.xvg
     xmgrace sasa-residue.xvg
     ```

   - hbond

     ```shell
     echo "1\n 13" | gmx hbond -f final_nojump.xtc -s final.tpr -num pro_lig_hnum.xvg -ang pro_lig_hang.xvg # protein and ligand
     xmgrace pro_lig_hnum.xvg
     xmgrace pro_lig_hang.xvg
     ```

7. mmpbsa

   ```shell
   conda activate AmberTools20
   mol2=`ls | grep _aligned.mol2`
   gmx_MMPBSA -O -i mmgbsa.in -cs final.tpr -ci index.ndx -cg 1 13 -ct final_later_noPBC.xtc -lm ${mol2} -nogui
   mkdir ./gmx_MMGBSA
   mv _GMXMMPBSA_* COM* LIG.prmtop REC.prmtop reference.frc gmx_MMPBSA.log FINAL_RESULTS_MMPBSA.dat ./gmx_MMGBSA
   
   gmx_MMPBSA_ana -p ./gmx_MMPBSA/_GMXMMPBSA_info 
   ```
   
7. gmx do_dssp?

9. 



#### summary on result analysis in literature

##### principles

- if not must exclude the first few seconds, we can include
- often calculate mean and standard deviation
- we want screening criteria

##### items

- see if it's stable?? 
  
  - position 我们从分子动力学轨迹最后的 200 ns 中间隔 50 ns 均匀提取五个结构。
  
- rmsd (C$\alpha$ atom)
  - is about stability, default the difference from the starting structure
  
  - evaluate the time required for a system to reach structural equilibrium
  
  - **calculate its mean and stddev** **after equillibrium** (2ns, 20ns?)
  
  - large: structure changed. what change? mostly not good..?
  
  - ligand: implying that the bound NS2B cofactor is still capable to sample a large ensemble of conformations. 
  
    > Further, investigation of the ligands rmsd was conducted. This unravels the flexibility of the ligands in the pocket at specific times followed by enhanced conformational stability towards the end of the simulation.
  
  - 
  
- rmsf **after equilibrium (C$\alpha$ atom)**
  
  - label those higher than average
  - <u>repeat 3 times? analyze in batch...</u>
  
  > these two: lower better...(average), not considering initial structure etc.
  
- Rg and sasa
  
  flexibility vs stability (with H bond..) may just make a table for reference
  
  - radius of gyration: 
    - lower means stable
  - sasa: lower (in GBSA, param is positive)
    -  (SASA) measures the ligand induced conformational changes (<u>with original</u>) over the period of simulation
  
- energy
  - non-polar binding free energy (<u>van der Waal interaction</u>) decreased indicating much stronger binding
  - average MM energy?
  - **contribution of all energy components. which is negative and which positive**
  - **decomposition by residue**
    - those which are negative is to stabilize
    - analyze energy components and structures
  
- dynamic cross-correlation matrix
  
  - https://www.mpibpc.mpg.de/grubmueller/g_correlation more accurate way to find correlation
  - (different) 对二者的协方差矩阵进行对角线化，得到 P II 所有本征向量所对应的本征值之和（总平方波动）为 4.1332 ｎｍ２，高于 PR 1 的总平方波动值2.3586 nm２．这一结果与前述动态几何属性比较结果一致，均说明 P II 具备比 PR I 强的整体构象柔性
  
- ss, and statistical analysis of structure analysis, 

  like similarity with free, residue ss distribution, 
  
- Ramachandran plot

  https://warwick.ac.uk/fac/sci/moac/people/students/peter_cock/python/ramachandran/drawing/#downloads

  Favored, % 75.9 72.9
  Allowed, % 18.2 21.4
  Generously allowed, % 3.5 3.2
  Disallowed, % 2.4 2.4

- 

> - Hydrogen bond analysis is performed to know the flexibility of ligand protein and protein ligand stable conformations. Higher hydrogen bonding maintains higher protein stable conformations
>   - considering the cut-off 3.0 Å and cut-off angle of 20 degree
>   - 更少的氢键数（ＮＨＢ）和范德华接触（ＮＮＣ）．以上结果均说明 ＰＲ１ 底物结合部位具有更强的构象柔性．
>   - I think not significant for my system
> - 分析配体到蛋白质表面的径向分布函数，可以获得稳定时期配体到蛋白质表面的距离等信息。
> - PCA
>   - The first 10 eigenvectors of the apo-NSP9 and its complexes with ... showed slightly <u>lower motions</u> than the other predicted hits, while the apo-NSP9 showed less global motions than the other systems (Figure 3a). The PCA analysis result suggested that avodart formed a slightly <u>more stable</u> complex
> - 自由能图谱的特征. local minima
>   - the number of LM means stable sub-conformations
>   - the energy means stability (in reverse, flexibility)
> - The entropy contribution
>   - computationally expensive, we only considered 10 snapshots from the MD simulation trajectories
>   - won't calculate because not much contribution
> - the trajectory was analyzed for the volume variation of both the allosteric and the ATP binding pockets, for the purpose of identifying a conformational ensemble in which the ATP pocket will be in an occluded state and the allosteric one being most exposed. By doing so, we were aiming to utilize that conformation to identify small molecules with good binding afnities to the allosteric pocket that could trap the enzyme in this (inactive) conformational state.
> - 
> - 规则二级结构残基数目(SSE)?
> - structural alternation?

### failed commands

1. gauss

   ```shell
   # below are original options
   #-gk "#HF/6-31G* SCF=tight Test Pop=MK iop(6/33=2) iop(6/42=6) iop(6/50=1) opt nosymm"
   #-gk "#b3lyp/6-31g(d) scrf=(smd,solvent=water) geom=connectivity empiricaldispersion=gd3 pop=mk iop(6/33=2,6/42=6,6/50=1) opt nosymm" -ge ${f}_resp.gesp -gv 1
   #-gk "#B3LYP/6-311G** em=GD3BJ opt scrf=solvent=water iop(6/33=2) pop=CHELPG" -ge ${f}_resp.gesp -gv 1
   ```
   
2. visual

   ```shell
   # load final_com_nojump.xtc, final_com # do not let molecules go back to the box, bad visualization
   # load final_com.xtc, final_com

3. if protein runs out of water box, (might caused by not restricting position)

   - (not useful in pymol) http://bbs.keinsci.com/thread-2085-1-1.html

4. also remove h for ligand

   ```shell
   reduce ${f}_aligned.mol2 -Trim > ${f}_aligned2.mol2
   obabel ${f}_aligned.mol2 -omol2 -O ${f}_aligned2.mol2 -d
   ```

   

### try atp

1. with neutral pH hydrogen, -2 charge

   ```shell
   antechamber -i ${f}_m.pdb -fi pdb -o ${f}.gjf -fo gcrt -pf y \
   -gm "%mem=4096MB" -gn "%nproc=4" -ch ${f} -nc -4 \
   -gk "#B3LYP/6-31G* em=GD3BJ scrf=solvent=water iop(6/33=2) pop=CHELPG" -ge ${f}_resp.gesp -gv 1
   
   ...
   
   conda activate AmberTools20
   tleap
   source leaprc.ff99SBildn
   pro = loadpdb 2cqg_1_noh.pdb
   check pro 
   source leaprc.gaff
   loadamberparams atp_zinc_6.frcmod
   lig=loadmol2 atp_zinc_6_aligned.mol2
   
   loadamberparams atp_pubchem_5.frcmod
   lig=loadmol2 atp_pubchem_5_aligned.mol2
   check lig
   com = combine {pro lig}
   source leaprc.water.tip3p
   solvatebox com TIP3PBOX 10.0
   charge com
   addIons2 com Cl- 12 Na+ 14
   check com
   saveamberparm com com.prmtop com.inpcrd
   quit
   ```

   >zinc-6: Warning: Close contact of 1.475312 angstroms between .R<MOL 186>.A<H10 41> and .R<MOL 186>.A<O12 30>
   >
   >pubchem-5: check com is OK.





## expressing a protein

### draft

length: 401, 744

- PCR: template, primer (F1, R1; F2, R2), polymerase (buffer, Mg2+), dNTP, H2O (autocleave?)

  > F1~R2: 68, 65, 70, 67~68
  >
  > I guess 60~65 is ok, maybe set 60,61,62,63,64,65; or just 63 and 65, a single tube
  >
  > primer: make it 0.5 $\mu$M; template same volume?
  >
  > Taq?
  >
  > 50 $\mu$L~5$\mu$g DNA (0.2MDa)

- gel: agarose, add EB, TAE, marker

  > Marker: 100bp DNA Ladder
  >
  > 1*TAE
  >
  > agarose: 1.2%

- plasmid: bacteria culture, P1 (LyseBlue..?), P2, N3, spin column, PB, PE, EB or water

- Gel Cleanup: PB, PE, EB or water

  > PE (ethanol?)

- overlap PCR: two segments, 

  > annealing temp: 68?

- competent cells: 



### operation

- autoclave: sterilization
  - water over the lid
  - use glass bottle, not tubes; not too full, 2/3
  - Loosen all lids to prevent pressure buildup
  - two barrels, everything in the top one, no touching the water!
  - everything be tagged with autoclave label
- plate
  - Make up at least two plates in case one does not grow.
  - 
- 



https://www.sigmaaldrich.com/catalog/product/sigma/l3147?lang=en&region=SG

https://www.sigmaaldrich.com/catalog/product/sigma/l3522?lang=en&region=SG

https://www.sigmaaldrich.com/catalog/product/sigma/l3522?lang=en&region=SG





Under non-standard reaction conditions, some restriction enzymes are  capable of cleaving sequences which are similar, but not identical, to  their defined recognition sequence. This altered specificity has been  termed “star activity". 





## simulation for Myricetin

Myricetin: 杨梅黄酮是一种天然的黄酮醇，是存在于许多水果、蔬菜、浆果及药材等植物中的黄酮类化合物。杨梅黄酮是红葡萄酒中的酚类化合物之一。 杨梅黄酮可抗氧化。体外研究表明，高浓度的杨梅黄酮可降低低密度脂蛋白胆固醇。芬兰的一项研究发现，高杨梅黄酮摄入的人群其前列腺癌的发生率较低。

- NS2B cofactor: 48~96, $\beta$+loop
- NS3 protease: 





residue number: free



closed_s3: 41844 atoms, 205.3 ns/day

project1: ~11000 atoms, 400ns/day

























NMR

https://www.ccpn.ac.uk/v3-software/downloads/version-3.0.3-downloads
