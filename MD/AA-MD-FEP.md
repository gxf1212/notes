# Protein MD and Amino Acid FEP

Somethin about amino acid modification, MD and FEP. Maybe running MD using Gromacs.

> the following part is written during the PSK project

# Stage 1: add a residue

To test the stability, we add a residue and run MD first. Don't worry about the parameters, because we'll do FEP later. (We won't mention these trials in the paper?)

We will perform MDS with non-standard AA in gmx. We use CHARMM FF. 

I remember that we cannot easily import CHARMM FF in Amber.

## Deal with novel residues

### make the topology (gmx)

- [A Jerkwin example of preparation](https://jerkwin.github.io/2017/09/20/GROMACS%E9%9D%9E%E6%A0%87%E5%87%86%E6%AE%8B%E5%9F%BA%E6%95%99%E7%A8%8B2-%E8%8A%8B%E8%9E%BA%E6%AF%92%E7%B4%A0%E5%B0%8F%E8%82%BD%E5%AE%9E%E4%BE%8B/).
- [a zhihu example](https://zhuanlan.zhihu.com/p/87402839)

upload to CHARMM-GUI?

- http://sobereva.com/soft/Sobtop/

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

### prepare the ff files

(downloaded from charmm)

```shell
sudo cp -r charmm36-jul2021.ff /your/working/directory
```

> we may not copy into `/usr/share/gromacs/top` because we may not have permission. But gmx can recognize the folder in your cwd.

and modify files related to that residue

gmx: [Adding a Residue to a Force Field](https://manual.gromacs.org/current/how-to/topology.html#adding-a-residue-to-a-force-field)



- put `residuetype.dat` in both the cwd and forcefield.ff folder

> maybe I'll handcraft one later. now using previously made ff

### make the topology (namd)

summary
- hybrid topology做对是一切的基础
- 需更改mutator.tcl
- 需手动设定在哪突变
- 其他都是自动化的

做topology的要求：

#### Making correct topology files for novel residues

- 一个原则是，尽量和parent residue接近。
  
    Take the sulfonated TYR as example, the partial charges in the aromatic ring will change, but the atom types of your common part had better be the same as your parent residue. 

  > correction: mainchain atom charges must be the same. That's one of the reasons why we mutate everything to Ala instead of Gly.
  
- 另一个原则是，如果不想编辑pdb文件（两个态单独pdb都要生成），就需要写完整的IC，还要check sidechain conformation
  
    只要有IC，完全可以不需要PDB文件。但是CHARMM-GUI和cgenff不会提供任何IC，只有从现存的rtf中找

Ways to generate novel residue topology:

1. in CHARMM FF folder (toppar/stream/prot). You may search and visualize them in [CHARMM-GUI PDB reader](https://www.charmm-gui.org/?doc=input/pdbreader) --- Non-standard amino acid / RNA substitution --- select image (the figure below). Search by "Parent amino acid" or smiles substructure. 

    - `toppar_all36_prot_modify_res.str`: a lot of modified residues
    - `toppar_all36_prot_c36m_d_aminoacids.str`: D amino acids
    those files also include common patches.

    Finally, find to residue entries in those files.

2. in CHARMM-GUI LigandRM, search for similar residues. Upload that residue, and it may suggest similar parts from cgenff.rtf, etc (but may not include `prot_modify_res.str`). 

3. If no exact match is found, we may combine groups from >=2 residues. Modularization in CHARMM FF is great! [Force field tutorial](https://www.ks.uiuc.edu/Training/Tutorials/science/forcefield-tutorial/forcefield.pdf) seems to provide an example of combining.

I do not recommend building with LigandRM since it just treats our residue as a normal small molecule and atom names are not that of amino acids.

It's acceptable to make the topology by hand (since examination is necessary), but FEP should be automatic.

> Other ways to search for useful parts?
>
> read FF files, always gain so much...

<img src="https://cdn.jsdelivr.net/gh/gxf1212/notes@master/MD/AA-MD-FEP.assets/search-nonstandard-residue.png" alt="image-20221105205515004" style="zoom:50%;" />


#### Notes during making tys.rtf

> - the provided TYM.rtf is different from the provided TYS residue. It was built like general small molecules. Though Leili also mentioned this CHARMM-GUI workflow, I will try to avoid using LigandRM. 
> - Doing that manually doesn't hurt because I have to inspect the files. But for small molecules, (automatically) doing some QM optimization is useful.
> - SO4- charge: -1.005


Both of the workflows get different atom types from normal TYR. I'll just keep most of the types aligned with standard TYR. 
- It's strange in the provided .str that the atomtype of CB is like that of small molecules (CG321), whose bond parameters with CA (CT1) doesn't exist...as the partial charges are the same, I just change CG321 into CT2 (like normal residues), but it still won't work. **So all atom types (that could be aligned) in the side chain should also align with the parent standard residue.**
- Maybe, we can transfer the IC terms of TYR to TYS (if cannot align?)...



## System setup

### pre-process the pdb files

- assign chain names for the receptor and ligand. [reference](https://www.researchgate.net/post/How_to_change_the_protein_chain_names_X_into_A_B_C_D_after_MD_simulations_in_Gromacs) or [this](https://pymolwiki.org/index.php?title=Alter)

  ```shell
  alter sele, chain='A'  # in pymol
  ```

- We may not use 'HETATM' for novel residues? (maybe fixed later) The peptide should still be considered as 'protein'!

- fix the atom name, e.g. when a terminal COO- turns into the normal CO (atom type OT1, OT2)

- note that we use option `-ter` to automatically fix the terminal residue (NH3<sup>+</sup>,COO<sup>-</sup>). So do not add (or just remove) the extra atoms.

- merge them. you can easily mutate a residue in Pymol.

  ```shell
  cat *.pdb | grep ' A ' > complex.pdb
  cat *.pdb | grep ' B ' >> complex.pdb
  ```

- 

### mutate a residue

In pymol: https://pymolwiki.org/index.php/Mutagenesis

then select a proper rotamer.

### gmx workflow

we can normally go through the gmx workflow. 

```shell
# cd the folder where the complex pdb file is
# charmm36.ff is the folder containing all ff needed
cp -r ../mdps/charmm36.ff ../mdps/residuetypes.dat .
gmx pdb2gmx -f *.pdb -o complex.gro -ignh -water tip3p -ff charmm36
gmx editconf -f complex.gro -o complex_box.gro -c -d 1.2 -bt cubic
gmx grompp -v -f ../mdps/em_vac_pme.mdp -c complex_box.gro -p topol.top -o em_vac.tpr -maxwarn 1
gmx mdrun -v -deffnm em_vac
gmx solvate -cp complex_box.gro -cs spc216.gro -o complex_solv.gro -p topol.top
gmx grompp -f ../mdps/ions.mdp -c complex_solv.gro -p topol.top -o ions.tpr -maxwarn 1
echo 13 | gmx genion -s ions.tpr -o complex_solv_ions.gro -p topol.top -pname NA -nname CL -neutral -conc 0.15
gmx grompp -f ../mdps/em.mdp -c complex_solv_ions.gro -p topol.top -o em.tpr
gmx mdrun -v -deffnm em
gmx grompp -f ../mdps/em2.mdp -c em.gro -p topol.top -o em2.tpr
gmx mdrun -v -deffnm em2
gmx grompp -f ../mdps/nvt.mdp -c em2.gro -p topol.top -r em2.gro -o nvt.tpr
gmx mdrun -deffnm nvt
grep "POSRES" -rl ./topol_Protein_chain_B.itp | xargs sed -i "s/POSRES/TEMPOR/g"  # no more restrain for the ligand
gmx grompp -f ../mdps/npt.mdp -c nvt.gro -p topol.top -r nvt.gro -t nvt.cpt -o npt.tpr
nohup bash ../mdps/run_npt.sh 2&>1 &
gmx grompp -f ../mdps/md.mdp -c npt.gro -p topol.top -t npt.cpt -o final.tpr -maxwarn 1
gmx mdrun -deffnm final

# index
echo -e "5 & a 1-9470 \n 1 & ! a 1-9470 \n q" | gmx make_ndx -f final.tpr -o index.ndx
echo -e "\n[center] \n9528\n\n" >> index.ndx
grep "MainChain" -rl index.ndx | xargs sed -i "s/MainChain_&_a_1-9470/Receptor_Mainchain/g"
grep "MainChain" -rl index.ndx | xargs sed -i "s/Protein_&_\!a_1-9470/Peptide/g"

# to restart
gmx mdrun -s npt.tpr -cpi npt.cpt -append
nohup bash ../mdps/run_npt2.sh 2&>1 &
# get coordinates from cpt
echo 0 | gmx trjconv -f npt.cpt -s npt.tpr -o npt_cpt.gro
```

> don't care too much about em 'not converage'?

### post-processing

```shell
echo "21 0" | gmx trjconv -s final.tpr -f final*.xtc -o 720ns_center.gro -n index.ndx -pbc atom -center -b 720000 -e 720000
# 500ps a frame
remove resn SOL or resn NA or resn CL
save 720ns_center.pdb

## under result
# nojump
cp ../index.ndx .
echo 21 0 | gmx trjconv -s final.tpr -f final.part*.xtc -o final_nojump.xtc -n index.ndx -pbc nojump -center -dt 1000
# fit
echo 19 21 1 | gmx trjconv -s final.tpr -f final_nojump.xtc -o final_fit.xtc -n index.ndx -fit rot+trans -center -dt 1000
# rms
echo 19 20 | gmx rms -s final.tpr -f final_fit.xtc -m rmsd-lig.xpm -n index.ndx -o rmsd_lig.xvg
xmgrace rmsd_lig.xvg
# visualization
pymol 
load ../complex.gro
load final_fit.xtc, complex
show lines, resi 200-550 within 4 of resi 33
show sticks, resi 28-33
# clustering

cd ..
rm -r cluster
mkdir cluster
cd cluster
# run
echo 20 1 | gmx cluster -s ../final.tpr -n ../index.ndx -f ../final_fit.xtc -dm ../rmsd-lig.xpm \
-dist rmsd-distribution.xvg -o clusters.xpm -sz cluster-sizes.xvg -tr cluster-transitions.xpm \
-ntr cluster-transitions.xvg -clid cluster-id-over-time.xvg -cl clusters.pdb \
-cutoff 0.15 -method gromos
rm \#*\#

split_states clusters
save c01.pdb, clusters_0001


```



## FEP

three situations

- try to avoid modifications involving Gly (since the patches are different). 
- I haven't tried Proline

### AA mutation

#### summary

file structure

```text
cwd
|---ff
|   |---xxx.rtf
|   |---xxx.rtf
|---resi.pdb
|---build-mutate.sh
|---build-mutate.tcl
|---edit_pdb.py
|---fep-sidechain-correction
```

summary

- normal AA mutation: just run...
- with novel residue: make a hybrid topology file with A and B carefully labeled.
- all mutation: edit fep-sidechain-correction terms, or switch CG and HB1/2 atom. 

#### workflow

```shell
#!/bin/bash
# usage: bash build-mutate.sh last

resi=$1

rm complex* ligand* p* *.fep.* *-solvated* mtemp-PEP.pdb

grep " A " ${resi}.pdb > prot.pdb
grep " B " ${resi}.pdb > pept.pdb

vmd -dispdev text -e build-mutate.tcl

mkdir ../${resi}
mv complex-fep.* ../${resi}
mv ligand-fep.* ../${resi}

rm complex* p* ligand* *.fep.* 
```

where

```tcl
#!/bin/bash
# not using
# vmd -dispdev text -e build-mutate.tcl -args 6D
# set resi [lindex $argvs 0]

package require psfgen
psfcontext reset
topology ./ff/top_all36_prot.rtf
# topology ./ff/top_all36_hybridnew.inp
topology ./ff/top_all36_cgenff.rtf
topology ./ff/toppar_water_ions_namd.str
topology ./ff/TYM.rtf
pdbalias residue HIS HSE
pdbalias residue HIP HSP

# preprocessing pept
segment PEP {
    pdb pept.pdb
    first NTER
    last CTER
    }
coordpdb pept.pdb PEP
guesscoord
writepdb pept-fixed.pdb
writepsf pept-fixed.psf

# do mutation. though reporting error, files are usable
set resi 27
package require mutator
mutator_core -psf pept-fixed.psf -pdb pept-fixed.pdb -ressegname PEP -resid $resi -mut ALA -o pept_MUTATE -FEP ligand
# patch already added
# mv ligand.tmp.fep.psf means failed
# -ressegname PEP may prevent some errors from occuring, but we still cannot load ligand.fep.psf in vmd
mv ligand.fep ligand.fep.pdb
python fep-sidechain-correction.py $resi
delatom PEP
segment PEP {pdb ligand.fep.pdb}
coordpdb ligand.fep.pdb PEP

segment PRO {pdb prot.pdb}
coordpdb prot.pdb PRO
guesscoord
writepdb complex.fep.pdb
writepsf complex.fep.psf

# remove temp
file delete prot.pdb
file delete pept.pdb
file delete pept-fixed.pdb
file delete pept-fixed.psf
mol delete all
puts "Building hybrid finished."

package require solvate
package require autoionize

puts "Solvating complex..."
mol load psf complex.fep.psf pdb complex.fep.pdb
solvate complex.fep.psf complex.fep.pdb -t 11.5 -o complex-solvated
mol delete all
autoionize -psf complex-solvated.psf -pdb complex-solvated.pdb -sc 0.1 -o complex
set everyone [atomselect top all]
set minmax [measure minmax $everyone]
mol delete all
resetpsf

puts "Solvating ligand..."
mol load psf ligand.fep.psf pdb ligand.fep.pdb
solvate ligand.fep.psf ligand.fep.pdb -minmax $minmax -o ligand-solvated
mol delete all
autoionize -psf ligand-solvated.psf -pdb ligand-solvated.pdb -sc 0.1 -o ligand

python edit_fep.py
mv complex.psf complex-fep.psf
mv ligand.psf ligand-fep.psf

exit

# com=`ls | grep pdb`
# rm p*.pdb
# separate the chains.
# set com [glob *.pdb]
```

##### making hybrid topology involving a novel residue

- the first residue: no change in mainchain atoms (including '+N', '-C', etc.).

  remove the mainchain 6 atoms in the second residue

  ```
  ! ALA
  !RESI ALA          0.00
  !GROUP   
  !ATOM N    NH1    -0.47 !     |
  !ATOM HN   H       0.31 !  HN-N
  !ATOM CA   CT1     0.07 !     |     HB1
  !ATOM HA   HB1B    0.09 !     |    /
  GROUP                   !  HA-CA--CB-HB2
  ATOM CB   CT3    -0.27  !     |    \
  ATOM HB1B HA3     0.09  !     |     HB3
  ATOM HB2B HA3     0.09  !   O=C
  ATOM HB3B HA3     0.09  !     |
  GROUP                   !
  !ATOM C    C       0.51
  !ATOM O    O      -0.51
  ```

- remove the common (same) terms in the second residue

  ```
  BOND C  CA  C  +N  CA HA N  HN  N  CA   
  DOUBLE O  C 
  IMPR N -C CA HN  C CA +N O   
  CMAP -C  N  CA  C   N  CA  C  +N
  DONOR HN N   
  ACCEPTOR O C
  
  IC -C   CA   *N   HN    1.3551 126.4900  180.0000 115.4200  0.9996
  IC -C   N    CA   C     1.3551 126.4900  180.0000 114.4400  1.5390
  IC N    CA   C    +N    1.4592 114.4400  180.0000 116.8400  1.3558
  IC +N   CA   *C   O     1.3558 116.8400  180.0000 122.5200  1.2297
  IC CA   C    +N   +CA   1.5390 116.8400  180.0000 126.7700  1.4613   
  IC N    C    *CA  HA    1.4592 114.4400 -120.4500 106.3900  1.0840
  ```

- find the uncommon atoms (add tags) and rename all terms

  - if CB is a common atom, please rename it to 'CM', or it's beta will be 1 
  - otherwise, add bond 'CBB CA' (if it's lost)

- concatenate them and note with sth like `!ALA`

- side chain conformation: if the generated rotamer doesn't agree with your initial structure (usually the dihedral CA-CB-CG-CD rotates 120 degrees, just swap the two atoms on CB (CG, HB,...). Find the IC terms **involving CB and any of the two atoms, but not more than CD**. 

  > HB atoms aren't connected with CD, 
  >
  > and dihedral CA-CB-CG-CD doesn't change if we swap CG and HB1
  >
  > 只在四个原子中存在它俩都连接的原子(CB)，并且其他任一原子不能和它俩其中任一个成键（不能是它俩中某个自己的那条路）时！需要替换（成环另说）。所以很可能出现CA

  An example of TYS:

  ```shell
  grep "IC " -a tys.rtf | grep CBA | grep -v CD1A | grep -v CD2A | grep CGA or the other atom
  xargs sed -i "s/CGA /TEMP/g" 
  xargs sed -i "s/HB1A/CGA /g"
  xargs sed -i "s/TEMP/HB1A/g"
  ```

  found

  ```
  IC N    CA   CBA  HB2A  1.4528  111.47  -50.80  109.26   1.5053
  IC HB2A CA   *CBA HB1A  1.5053  109.26 -119.49  110.96   1.1098
  IC HB1A CA   *CBA CGA   1.1098  110.96 -120.98  111.10   1.1112
  ```

  we have to check the structure after building up...

- An alternative choice is to copy atom coordinates. See [fep-sidechain-correction.py](/MD/PSK-PSKR?id=fep-sidechain-correctionpy) for details.

- charge of residue: the sum of the two residues. 

  - R2A or A2R: +1
  - E2A or A2E: -1
  - R2E or E2R: 0

- name of residue: X2Y. 

  - X atoms: labeled with 'A'
  - Y atoms: labeled with 'B'
  - usually we let the bigger residue disappear (label 'A')

  This is IMPORTANT for **`mutator` to recognize FEP settings**! If the mutation involves a novel residue, you may see:

  ```
  can't read "aa(TYM)": no such element in array
  ```

  that's why we also have to **edit mutator.tcl** !

- To ensure the program works properly, we need to build a pdb file with the residue to be mutated correctly named (the same as the first residue).

##### mutator.tcl

- `mutator_core`: is just from VMD plugin [Mutator](https://www.ks.uiuc.edu/Research/vmd/plugins/mutator/)

  > `mutate` (in psfgen) in the segment, we have to modify beta values in .pdb

- the code

  - 前面array set aa那里需要定义新的residue
  - set hyb那里其实就是就包含hybrid residue的格式，不一定是大写字母。。

- `mutator_core -psf pept-fixed.psf -pdb pept-fixed.pdb -o pept_MUTATE -resid 32 -mut LYS -FEP ligand`

  if `-FEP` is provided, it will mutate to the hybrid residue rather than the new residue.

- `-ressegname PEP` may prevent some errors from occuring, but we still cannot load ligand.fep.psf in vmd. Without this option, standard AA mutations are still ok?...(but nonstandard...)

- don't worry if you see the following error:

  ```
  Info) Using plugin psf for structure file ligand.fep.psf
  psfplugin) Failed to parse segname in PSF file:
  psfplugin)   '         1 PEP      28       TYM      N        NH3     -0.300000       14.0070           0
  ```

  - also, patches don't destroy standard residue mutations
  - also, some other errors in VMD that won't interrupt the execution.

  But we should immediately add (other components) your protein receptor, since this psf file cannot be load later

- 

##### other VMD notes

- How to generate the atom coordinates? **IC**, provided in standard topology files.

- notes on `guesscoord`

  Guessing missing coordinates. The tolopogy file contains default internal coordinates which can be used to guess the locations of many atoms, hydrogens in particular. <u>In the output pdb file, the occupancy field of guessed atoms will be set to 0, atoms which are known are set to 1, and atoms which could not be guessed are set to -1</u>. Some atoms are “poorly guessed” if needed bond lengths and angles were missing from the topology file. Similarly, waters with missing hydrogen coordinates are given a default orientation.

  -1 means failed...

- `mutator` seems not to be generating beta value (ok in B2Y)?? try later. We may edit_pdb with hand-made `pept-hyb.pdb`.

- 是啊，突变成大的最好多平衡一会大基团。。

##### `fep-sidechain-correction.py` 

We had better keep the sidechain orientation fixed (especially for novel residues)

Looks like below. I temporarily map hybrid atom names back to the standard atom names. So the coordinates are exactly the same.

```python
import sys, os
resi = sys.argv[1]

# resi = '27'
standard = {'R2A': {  # Arg
    'N': 'N',
    'HN': 'HN',
    'CA': 'CA',
    'HA': 'HA',
    'CBA': 'CB',
    'HB1A': 'HB1',
    'HB2A': 'HB2',
    'CGA': 'CG',
    'HG1A': 'HG1',
    'HG2A': 'HG2',
    'CDA': 'CD',
    'HD1A': 'HD1',
    'HD2A': 'HD2',
    'NEA': 'NE',
    'HEA': 'HE',
    'CZA': 'CZ',
    'NH1A': 'NH1',
    'H11A': '1HH1',
    'H12A': '2HH1',
    'NH2A': 'NH2',
    'H21A': '1HH2',
    'H22A': '2HH2',
    },
    'F2A': {  # Phe
        'N': 'N',
        'HN': 'HN',
        'CA': 'CA',
        'HA': 'HA',
        'CBA': 'CB',
        'HB1A': 'HB1',
        'HB2A': 'HB2',
        'CGA': 'CG',
        'CD1A': 'CD1',
        'HD1A': 'HD1',
        'CD2A': 'CD2',
        'HD2A': 'HD2',
        'CE1A': 'CE1',
        'HE1A': 'HE1',
        'CE2A': 'CE2',
        'HE2A': 'HE2',
        'CZA': 'CZ',
        'HZA': 'HZ',
    },
    'N2A': {  # Asn
        'N': 'N',
        'HN': 'HN',
        'CA': 'CA',
        'HA': 'HA',
        'HT1': 'H1',
        'HT2': 'H2',
        'HT3': 'H3',
        'CBA': 'CB',
        'HB1A': 'HB1',
        'HB2A': 'HB2',
        'CGA': 'CG',
        'OD1A': 'OD1',
        'ND2A': 'ND2',
        'H21A': '1HD2',
        'H22A': '2HD2',
    },
    'S2A': {  # Ser
        'N': 'N',
        'HN': 'HN',
        'CA': 'CA',
        'HA': 'HA',
        'HT1': 'H1',
        'HT2': 'H2',
        'HT3': 'H3',
        'CBA': 'CB',
        'HB1A': 'HB1',
        'HB2A': 'HB2',
        'OGA': 'OG',
        'HG1A': 'HG1',
    },
    'Y2A': {  # TYR
        'N': 'N',
        'HN': 'HN',
        'CA': 'CA',
        'HA': 'HA',
        'CBA': 'CB',
        'HB1A': 'HB1',
        'HB2A': 'HB2',
        'CGA': 'CG',
        'CD1A': 'CD1',
        'HD1A': 'HD1',
        'CD2A': 'CD2',
        'HD2A': 'HD2',
        'CE1A': 'CE1',
        'HE1A': 'HE1',
        'CE2A': 'CE2',
        'HE2A': 'HE2',
        'CZA': 'CZ',
        'OHA': 'OH',
        'HHA': 'HH'
    },
    'Z2A': {  # HSP
        'N': 'N',
        'HN': 'HN',
        'CA': 'CA',
        'HA': 'HA',
        'CBA': 'CB',
        'HB1A': 'HB1',
        'HB2A': 'HB2',
        'CGA': 'CG',
        'CD2A': 'CD2',
        'HD2A': 'HD2',
        'CE1A': 'CE1',
        'HE1A': 'HE1',
        'ND1A': 'ND1',
        'HD1A': 'HD1',
        'NE2A': 'NE2',
        'HE2A': 'HE2',
    }
}

def read_pdb(file, tag=''):
    d = {}
    pdb = open(file, 'r').readlines()
    for line in pdb:
        atmn = line[12:16].strip()
        if line[22:26].strip() == resi:  # this residue
            if atmn not in ['C', 'O', 'OT1', 'OT2', 'N', 'HN', 'HT1', 'HT2', 'HT3', 'CA', 'HA']:  # don't change mainchain
                atomna = standard[line[17:20]][line[12:16].strip()] if tag == 'A' and atmn.endswith('A') \
                    else line[12:16].strip()  # if fep, map to normal name. no map if endswith B
                d[atomna] = line
    return d


def edit_coor(ori, fep, fepname='ligand.fep.pdb'):
    for atm in (ori.keys() & fep.keys()):
        before = ori[atm][30:53]
        after = fep[atm][30:53]
        os.system('grep "'+after+'" -rl '+fepname+' | xargs sed -i "s/'+after+'/'+before+'/g" '+fepname)


#%% main
ori = read_pdb('pept-fixed.pdb')
fep = read_pdb('ligand.fep.pdb', tag='A')  # assuming the disappearing residue is big and the appearing one is Ala
edit_coor(ori, fep)

```

### remove a terminal residue

file structure

```text
cwd
|---ff
|   |---xxx.rtf
|   |---xxx.rtf
|---resi.pdb
|---edit_pdb.py
```

1. separate protein and peptide

   ```shell
   resi=A0
   grep " A " ${resi}.pdb > prot.pdb
   grep " B " ${resi}.pdb > pept.pdb
   ```

   edit pept.pdb (remove C ter) to `save pept-cter.pdb`

2. manually combine the topology of the last two residues (`code ./ff/CAK.inp`)

   **C terminal**

   - terminal

     - remove 'C','O' atoms; remove '+N','O' terms (we still need 'C' terms)
     - change '-C' to 'CM' (no more '-'!)
     - add C terminal CO2 patch and terms
     - change 'C' to 'CTA', add A to OT1/2 (CO2 patch)
     - add bond 'CTA CAA'
     - all atoms in the terminal residue will end with 'A', modify all modules

   - the next

     - change '+N' (to 'NA', no more '+'!), '+CA' (to 'CAA'), '-C' (no change)
     - add CO2 patch and terms, change that 'C' to 'CTB', add B to OT1/2 (CO2 patch)
     - add bond 'CTB CA'
     - 'C' and 'O' in the next residue will end with 'M' (avoid conflicting with C beta), modify all modules

   **N terminal**

   - terminal

     - remove '-C', 'HN' terms (we need N terms)

     - change '+N' to 'N2A', '+CA' to 'C2A'

     - replace NHCA with NH3 patch (atoms and terms)

       > - CA and HA: charge
       > - N and HN: type and charge
       > - also add patch terms

     - all atoms in the terminal residue will end with 'A', modify all modules

       - 'C' and 'O' also to 'CM', 'OM' to avoid conflicting with usual CA!!! stupid CMAP won't recognize...
       - 'N' to 'NAA'

   - the next

     - change '-C' to 'CM', 'CA' to 'CAB' 

     - mainchain: 'HN' to 'HNA', 'N' to 'N2A', 'CA' to 'C2A', 'HA' to 'H2A'

     - add NH3 patch terms (not deleting -C...)

       - all atoms in patch will end with 'B', modify all modules

       - add bond 'CAB CB', 'CAB C', 'CAB HAB', 'CAB NB'

         > in patch, those bonds exist in residues; while we must add them for a new residue
         > in terminal, we have modified the original bonds and dihedrals

       - copy any terms containing 'HNA', 'N2A', 'C2A' and 'H2A', and not containing CM. change their names to the B series. remove the duplicated terms.

         > in the case of TYM:
         >
         > ```
         > IMPR C C2A +N O          
         > DONOR HNA N2A   
         > IC N2A   C2A  C    +N   1.4501 106.5200  180.0000 117.3300  1.3484
         > IC +N   C2A  *C   O     1.3484 117.3300  180.0000 120.6700  1.2287
         > IC C2A  C    +N   +C2A  1.5232 117.3300  180.0000 124.3100  1.4513
         > IC N2A  C    *C2A CB    1.4501 106.5200  122.2700 112.3400  1.5606
         > IC N2A  C    *C2A H2A   1.4501 106.5200 -116.0400 107.1500  1.0833
         > IC N2A  C2A  CB   CG    1.4501 111.4300  180.0000 112.9400  1.5113
         > IC CG   C2A  *CB  HB1   1.5113 112.9400  118.8900 109.1200  1.1119
         > IC CG   C2A  *CB  HB2   1.5113 112.9400 -123.3600 110.7000  1.1115
         > ```

   - Then 

     - combine them

     - charge: that of the next residue plus 1 (Nter) or minus 1 (Cter). e.g. LYS is 0.00. The terminal Ala doesn't count. 

   > note:
   >
   > - ctrl+F: 'CA ', one space to find all? no, in the end of a line, like C, O... don't leave out...

3. get fixed and truncated peptide

   ```tcl
   package require psfgen
   psfcontext reset
   topology ./ff/top_all36_prot.rtf
   # topology ./ff/top_all36_hybridnew.inp
   topology ./ff/top_all36_cgenff.rtf
   topology ./ff/toppar_water_ions_namd.str
   topology ./ff/TYM.rtf
   
   # preprocessing pept
   segment PEP {
       pdb pept.pdb
       first NTER
       last CTER
   }
   coordpdb pept.pdb PEP
   guesscoord
   writepdb pept-fixed.pdb
   #writepsf pept-fixed.psf
   
   resetpsf
   segment PEP {
       pdb pept-cter.pdb
       first NTER
       last CTER
   }
   coordpdb pept-cter.pdb PEP
   guesscoord
   writepdb pept-1.pdb
   #writepsf pept-1.psf
   
   exit
   ```

4. manually combine the last two residues (`cp pept-fixed.pdb pept-hyb.pdb && code pept-hyb.pdb`)

   C terminal

   - copy `pept-fixed.pdb` into that
   - change residue name and number
   - append a CO2 patch for the next residue in the end
   - copy the coordinate of the previous CO and N+ for it
   - change all cooresponding atom name and number
   - modify the beta value: all atoms in the terminal residue and 'CM', 'OM': -1, CO2 patch of the next residue: '+1'

   N terminal

   - similar. no need to copy coordinates if we use pept-fixed.pdb

5. test

   ```tcl
   package require psfgen
   psfcontext reset
   topology ./ff/top_all36_prot.rtf
   topology ./ff/top_all36_cgenff.rtf
   topology ./ff/toppar_water_ions_namd.str
   topology ./ff/TYM.rtf
   #topology ./ff/CAT.rtf
   topology ./ff/NAB.rtf
   # only patch the other terminal
   segment PEP {
       pdb pept-hyb.pdb
       # first NTER
       last CTER
   }
   coordpdb pept-hyb.pdb PEP
   guesscoord
   writepdb ligand.fep.pdb
   writepsf ligand.fep.psf
   ```

6. the following steps

   ```tcl
   pdbalias residue HIS HSE
   segment PRO {pdb prot.pdb}
   coordpdb prot.pdb PRO
   guesscoord
   writepdb complex.fep.pdb
   writepsf complex.fep.psf
   
   mol delete all
   puts "Building hybrid finished."
   
   package require solvate
   package require autoionize
   
   puts "Solvating complex..."
   mol load psf complex.fep.psf pdb complex.fep.pdb
   solvate complex.fep.psf complex.fep.pdb -t 11.5 -o complex-solvated
   mol delete all
   autoionize -psf complex-solvated.psf -pdb complex-solvated.pdb -sc 0.1 -o complex
   set everyone [atomselect top all]
   set minmax [measure minmax $everyone]
   mol delete all
   resetpsf
   
   puts "Solvating ligand..."
   mol load psf ligand.fep.psf pdb ligand.fep.pdb
   solvate ligand.fep.psf ligand.fep.pdb -minmax $minmax -o ligand-solvated
   mol delete all
   autoionize -psf ligand-solvated.psf -pdb ligand-solvated.pdb -sc 0.1 -o ligand
   
   exit
   ```

7. get beta value from `pept-hyb.pdb`, and organize all files

   ```shell
   python edit_fep.py
   # maybe edit psf in the future
   mv complex.psf complex-fep.psf
   mv ligand.psf ligand-fep.psf
   
   rm -r ../${resi}/*.*
   mkdir ../${resi}
   mv complex-fep.* ../${resi}
   mv ligand-fep.* ../${resi}
   
   mkdir ${resi}
   mv ${resi}.pdb ${resi}
   mv pept-hyb.pdb ${resi}
   rm complex* ligand* p*
   ```

8. If we are making another topology but with the same terminal residue, we just need to

   - make the hybrid pdb
   - for new.inp, 
     - keep the terminal terms and CO2 patch for the next residue, paste the new blocks of info
     - only modify '+N', '+CA', 'C', 'O' terms
       - select 'C' as ' C ' (two spaces). 'O' is the same.



### notes

#### on the correction of charge change

![image-20221105160917232](E:\GitHub_repo\notes\MD\PSK-PSKR.assets\image-20221105160917232.png)











