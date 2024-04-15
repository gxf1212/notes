# Protein MD and Amino Acid FEP

Somethin about amino acid modification, MD and FEP. Especially, Gromacs AA FEP

> the first part is written during the PSK project. Then contents are added (e.g. from connexin Ab project).



# NAMD+CHARMM

Stage 1: add a residue

To test the stability, we add a residue and run MD first. Don't worry about the parameters, because we'll do FEP later. (We won't mention these trials in the paper?)

We will perform MDS with non-standard AA in gmx. We use CHARMM FF. 

I remember that we cannot easily import CHARMM FF in Amber.



## FEP in NAMD

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

- An alternative choice is to copy atom coordinates. See [fep-sidechain-correction.py](/research/PSK-PSKR?id=fep-sidechain-correctionpy) for details.

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

### Remove a terminal residue

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



### notes for AA FEP (temp)

on the correction of charge change

![image-20221105160917232](https://cdn.jsdelivr.net/gh/gxf1212/notes@master/research/AA-MD-FEP.assets/image-20221105160917232.png)



double mutation, DG12-DG1-DG2最多2~3kcal

多肽，每个AA的buried area



filter the mutation site: through buried area of each residue (residue expose analysis), or alanine scan?



# Gromacs MD

## From PSK project

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



# Gromacs FEP

> https://tutorials.gromacs.org/docs/free-energy-of-solvation.html
>
> [Free energy perturbation - mdp parameters - User discussions - GROMACS forums (bioexcel.eu)](https://gromacs.bioexcel.eu/t/free-energy-perturbation-mdp-parameters/2061)
>
> [How to Calculate the Free Energy of Methane in Water Using Gromacs with Cloud HPC (cloudam.io)](https://www.cloudam.io/post/how-to-calculate-the-free-energy-of-methane-in-water-using-gromacs-with-cloud-hpc)

from Connexin Ab project. **update the code later**

## pmx residue mutation

This workflow is about taking one chain for mutation from one frame in MD simulation

### bound

```shell
# to pdb and split
box=`tail -n 1 system*.gro | awk '{printf "%-10s %-10s %-10s", $1, $2, $3}'`
gmx editconf -f system*.gro -o wt.pdb 
cat wt.pdb | grep -E "SOL|K  |CL  " > wt_sol.pdb
head -n 8470 wt.pdb > wt_con.pdb
# extract the middle part (Ab) as wt_h.pdb
endofh=`grep -n -m 1 'SOL' wt.pdb | cut -d : -f 1`
head -n $((endofh-1)) wt.pdb | tail -n +8471 > wt_h.pdb

# mutate
pmx mutate -f wt_h.pdb -o h.pdb --keep_resid -ff amber99sb-star-ildn-mut
# get proper .itp for the edited chain
gmx pdb2gmx -f h.pdb -o h.gro -ff amber99sb-star-ildn-mut -water none
sed -i 's/\/home\/gxf1212\/data\/local-programs\/miniconda3\/envs\/pmx\/lib\/python3.10\/site-packages\/pmx\/data\/mutff\///g' topol.top 
pmx gentop -p topol.top -o topol_Protein_chain_H_hybrid.itp
# get the hybrid chain and remember to 
# 1. modify the [ moleculetype ] 
# 2. remove the #include xx.ff/forcefield.itp and the final [ system ] etc. field
# but atom orders are changed. in h.gro they are right
sed -i '1,/^\#include "amber99sb-star-ildn-mut.ff\/forcefield.itp"/d' topol_Protein_chain_H_hybrid.itp
sed -i '/#ifdef POSRES/,$d' topol_Protein_chain_H_hybrid.itp
sed -i 's/Protein_chain_A/Protein_chain_H/g' topol_Protein_chain_H_hybrid.itp
fixpmxmass topol_Protein_chain_H_hybrid.itp 
rm topol.top posre.itp
gmx editconf -f h.gro -o h_final.pdb
cat wt_con.pdb h_final.pdb wt_sol.pdb | grep -v END | grep -v TER > sys.pdb
# get the full .gro, copying the original box size (change this for every system!!)
gmx editconf -f sys.pdb -o bound.gro -box $box
# copy the original topol.top from elsewhere as newtop.top and modify: 
# 1. replace the original .itp file for the chain to mutate 
#    with the new hybrid .itp file: topol_Protein_chain_H_hybrid.itp
# 2. replacing all the original ff with the mutation ff in pmx
sed -i "s/amber99sb-ildn/amber99sb-star-ildn-mut/g" topol.top
sed -i "s/topol_Protein_chain_H/topol_Protein_chain_H_hybrid/g" topol.top

mv topol.top newtop.top

rm \#*
mkdir editchains
mv wt*.pdb h* sys.pdb editchains
mkdir bound
mkdir bound/system
mv `ls -F | grep -v /` bound/system/
# move all these to ./bound/system
```

### unbound

even if we can mutate on the whole gro file, we have to split the Ab chain out...

```shell
# now we should add water, but keep the box size the same as bound state
echo 0 | gmx pdb2gmx -f editchains/h.pdb -o h.gro -ff amber99sb-star-ildn-mut -water tip3p
sed -i 's/\/home\/gxf1212\/data\/local-programs\/miniconda3\/envs\/pmx\/lib\/python3.10\/site-packages\/pmx\/data\/mutff\///g' topol.top 
pmx gentop -p topol.top -o top.top  # right after the topol.top is built
gmx editconf -f h.gro -o h_box.gro -box $box
gmx solvate -cp h_box.gro -cs spc216.gro -p top.top -o h_sol.gro -box $box
gmx grompp -f ../mdps/ions.mdp -c h_sol.gro -r h_sol.gro -p top.top -o ions.tpr
echo "SOL" | gmx genion -s ions.tpr -pname K -nname CL -conc 0.15 -neutral -o free.gro -p top.top
# add the below definition in newtop.top (in this specific system) to be consistent with the bound state (but restrains nothing)
#ifdef POSRES_abiss 
#endif
sed -i '/#include "posre.itp"/d' top.top
sed '0,/#ifdef POSRES/{s/#ifdef POSRES/#ifdef POSRES_abiss/}' top.top > newtop.top
fixpmxmass newtop.top 

rm \#* posre.itp topol.top mdout.mdp ions.tpr top.top
mkdir free
mkdir free/system
mv `ls -F | grep -v /` free/system/
# move all these to ./free/system
```

pmx assigns a wrong mass for dummy atoms (divided by 100/33??? what the hell...), so fix it. Someone else report that if you don't edit the simulation is unstable, though I didn't encounter this.

pmx的dummy atom，atomtype.dat文件中质量都没问题，写出来就都除以了（100/33），很精确。估计程序写错了，不必这样设计。离谱，更离谱的是模拟没报过错。

```shell
function fixpmxmass {
sed -i 's/ 3.9633/12.0100/g' $1
sed -i 's/ 1.0000/ 1.0080/g' $1
sed -i 's/ 5.2800/16.0000/g' $1
sed -i 's/ 4.6233/14.0100/g' $1
sed -i 's/10.5798/32.0600/g' $1
}
```

### TEST

```shell
# normal test, get a copy of the folder and
cd bound/system
gmx grompp -f ../../../mdps/em.mdp -c bound.gro -r bound.gro -p newtop.top -o em.tpr -v -maxwarn 2
rm em.tpr mdout.mdp
cd ../../
cd free/system
gmx grompp -f ../../../mdps/em.mdp -c free.gro -r free.gro -p newtop.top -o em.tpr -v -maxwarn 2
rm em.tpr mdout.mdp
cd ../../

gmx mdrun -ntmpi 1 -ntomp 15 -v -deffnm em
gmx grompp -f ../../../mdps/nvt.mdp -c em.gro -r em.gro -p newtop.top -o nvt.tpr -maxwarn 2
gmx mdrun -s nvt.tpr -deffnm nvt -ntmpi 1 -ntomp 15 -nb gpu -bonded gpu -gpu_id 0
gmx grompp -f ../../../mdps/npt.mdp -c nvt.gro -r nvt.gro -t nvt.cpt -p newtop.top -o npt.tpr -maxwarn 2
gmx mdrun -s npt.tpr -deffnm npt -ntmpi 1 -ntomp 15 -nb gpu -bonded gpu -gpu_id 0
gmx grompp -f ../../../mdps/md0.mdp -c npt.gro -r npt.gro -p newtop.top -o md.tpr -maxwarn 2
gmx mdrun -s md.tpr -deffnm md -ntmpi 1 -ntomp 15 -nb gpu -bonded gpu -gpu_id 0
```

### visualize in Pymol

```
remove resn K or resn Cl or resn SOL or resn POC
hide sticks, all
hide lines, all
hide spheres, all
set cartoon_transparency, 0.6
set sphere_scale, 0.4
bg_color white

align--all_to_this
```

### FEP parameters

dummy atoms have epsilon and q both in zero, so 不需要0.00001那种；其实vdw和columb谁先变都差不多.  Of course, still adding soft-core.

Also, since we defined B state, the interactions are always there. We don't need to decouple coulomb first and then vdWs as they did when eliminating something from the solution

An example .mdp file is

```shell
;====================================================
title = production MD simulation
;====================================================

;----------------------------------------------------
; RUN CONTROL
;----------------------------------------------------
; define                = -DPOSRES  ; position restrain the protein
; define                = -DPOSRES_abiss  ; position restrain the membrane part
integrator              = md        ; leap-frog integrator
nsteps                  = 250000    ; 2 * 250000 = 500 ps
dt                      = 0.002     ; 2 fs

;----------------------------------------------------
; OUTPUT CONTROL
;----------------------------------------------------
nstxout                 = 0       ; don't save coordinates to .trr
nstvout                 = 0       ; don't save velocities to .trr
nstfout                 = 0       ; don't save forces to .trr
nstxout-compressed      = 25000   ; xtc compressed trajectory output every 1000 steps (2 ps)
compressed-x-precision  = 1000    ; precision with which to write to the compressed trajectory file
nstlog                  = 50000   ; update log file every 10.0 ps
nstenergy               = 0       ; don't save energies
nstcalcenergy           = 100     ; calculate energies every 100 steps


;----------------------------------------------------
; NEIGHBOR SEARCHING
;----------------------------------------------------
cutoff-scheme           = Verlet
; ns-type                 = grid      ; search neighboring grid cells
nstlist                 = 20        ; With parallel simulations and/or non-bonded force calculation on the GPU, a value of 20 or 40 often gives the best performance. (default is 10)
rlist                   = 1.2       ; short-range neighborlist cutoff (in nm). must be equal to rcoulomb here?
pbc     			    = xyz       ; 3-D PBC
comm-mode       	    = Linear    ; Remove center of mass translation
comm-grps         	    = system    ; group(s) for center of mass motion removal, default is the whole system
nstcomm                 = 100       ; frequency for center of mass motion removal

;----------------------------------------------------
; BONDS
;----------------------------------------------------
continuation            = no        ; first dynamics run
constraint_algorithm    = lincs     ; holonomic constraints
constraints             = H-bonds   ; all bonds (even heavy atom-H bonds) constrained
lincs_iter              = 1         ; accuracy of LINCS (1 is default)
lincs_order             = 12        ; also related to accuracy (4 is default)
; lincs-warnangle         = 30         ; maximum angle that a bond can rotate before LINCS will complain (30 is default)

;----------------------------------------------------
; ELECTROSTATICS
;----------------------------------------------------
coulombtype     	    = PME       ; Particle Mesh Ewald for long-range electrostatics
rcoulomb                = 1.2       ; short-range electrostatic cutoff (in nm)
pme_order       	    = 4         ; cubic interpolation
fourierspacing  	    = 0.10      ; grid spacing for FFT
ewald-rtol              = 1e-6      ; default is 10e-5. relative strength of the Ewald-shifted direct potential at rcoulomb

;----------------------------------------------------
; VDW
;----------------------------------------------------
vdwtype                 = cutoff    ; Plain cut-off
vdw-modifier            = potential-switch  ; Smoothly switches the potential to zero between rvdw-switch and rvdw.
rvdw-switch             = 1.0       ; (0) [nm] where to start switching the LJ force and possibly the potential
rvdw                    = 1.2       ; short-range van der Waals cutoff (in nm)
ewald-rtol-lj           = 1e-3      ; default is 10e-3. in the same way as ewald-rtol controls the electrostatic potential
lj-pme-comb-rule        = Geometric ; lj-pme-comb-rule
DispCorr    		    = EnerPres  ; account for cut-off vdW scheme

;----------------------------------------------------
; TEMPERATURE & PRESSURE COUPL
;----------------------------------------------------
; Temperature coupling is on
tcoupl      		    = V-rescale             ; modified Berendsen thermostat
tc-grps     		    = Protein non-Protein   ; two coupling groups - more accurate
tau_t       		    = 1.0  1.0              ; [ps] time constant for coupling (one for each group in tc-grps), -1 means no temperature coupling
ref_t       		    = 310  310              ; reference temperature, one for each group, in K
; Pressure coupling is off
pcoupl                  = Berendsen             ; combine position restraints with pressure coupling
pcoupltype              = isotropic           
tau_p                   = 1.0                   ; (1) time constant (ps) for pressure coupling (one value for all directions).
ref_p                   = 1.0                   ; reference pressure (bar)
compressibility         = 4.5e-05               ; isothermal compressibility of water (bar^-1)
refcoord-scaling        = com

;----------------------------------------------------
; VELOCITY GENERATION
;----------------------------------------------------
gen_vel     		    = no        ; assign velocities from Maxwell distribution (if gen_vel is 'yes', continuation should be 'no')

;----------------------------------------------------
; FREE ENERGY CALCULATIONS
;----------------------------------------------------
free-energy             = yes
;couple-moltype           = non-Water
;couple-lambda0           = vdw-q
;couple-lambda1           = nonea
;couple-intramol          = no
separate-dhdl-file      = yes
;if no for sc-coul dVcoul/dl might be nan
sc-coul                 = yes       ; apply the soft-core free energy interaction transformation to the Columbic interaction
sc-alpha                = 0.5       ; sc-function=beutler. default = 0
sc-power                = 1         ; default = 1
sc-sigma                = 0.3       ; default = 0.3
nstdhdl                 = 100       ; default = 100. must be a multiple of nstcalcenergy
dhdl-derivatives        = yes       ; default is yes
calc-lambda-neighbors   = -1        ; -1: all states; 1: both neighbors. For normal BAR such as with gmx bar, a value of 1 is sufficient, while for MBAR -1 should be used.
init-lambda-state       = 0
;init-lambda-state      = 0    1    2    3    4    5    6    7    8    9    10   11   12   13   14   15   16   17   18   19   20   21   22   23   24   25   26   27   28  29   30   31
mass-lambdas            = 0.00 0.01 0.02 0.04 0.06 0.09 0.12 0.16 0.20 0.24 0.28 0.32 0.36 0.40 0.44 0.48 0.52 0.56 0.60 0.64 0.68 0.72 0.76 0.80 0.84 0.88 0.91 0.94 0.96 0.98 0.99 1.00
bonded-lambdas          = 0.00 0.01 0.02 0.04 0.06 0.09 0.12 0.16 0.20 0.24 0.28 0.32 0.36 0.40 0.44 0.48 0.52 0.56 0.60 0.64 0.68 0.72 0.76 0.80 0.84 0.88 0.91 0.94 0.96 0.98 0.99 1.00
coul-lambdas            = 0.00 0.01 0.02 0.04 0.06 0.09 0.12 0.16 0.20 0.24 0.28 0.32 0.36 0.40 0.44 0.48 0.52 0.56 0.60 0.64 0.68 0.72 0.76 0.80 0.84 0.88 0.91 0.94 0.96 0.98 0.99 1.00
vdw-lambdas             = 0.00 0.01 0.02 0.04 0.06 0.09 0.12 0.16 0.20 0.24 0.28 0.32 0.36 0.40 0.44 0.48 0.52 0.56 0.60 0.64 0.68 0.72 0.76 0.80 0.84 0.88 0.91 0.94 0.96 0.98 0.99 1.00
; our restrains should persist
; because all components of the lambda vector that are not specified will use fep-lambdas

```

> You are combining position restraints with Parrinello-Rahman pressure
>  coupling, which can lead to instabilities. If you really want to combine
>  position restraints with pressure coupling, we suggest to use Berendsen
>  pressure coupling instead.
>
> Cannot compute PME interactions on a GPU, because PME GPU does not support
> free energy calculations with perturbed charges (multiple grids).
>
> - 第一输出控制，但是这块并没有控制的很好，所以最后还是直接删掉那些文件；
> - 第2部分是一般性参数，这个基本上是follow网上那个tutorial的，第3部分是f1p部分主要follow了师兄的。
>
> 原则一是所有文件已经尽量保持一致，二是参数之间不要冲突，不要出warning和note。



### anaylsis

to save as .pdb file to view in pymol

```shell
python xxx/get_segments_pdb.py sys.pdb
```

check if finished all:

```shell
ls */repeat*/lambda_31/prod/prod.gro
```

visualize

```
hide sticks, all
hide lines, all
hide spheres, all
set cartoon_transparency, 0.6
set sphere_scale, 0.4
set label_size, 20
bg_color white
```

Do not use histograms unless you’re certain you need it. It's kind of big



WARNING: Some of these results violate the Second Law of Thermodynamics:
     This is can be the result of severe undersampling, or (more likely)
     there is something wrong with the simulations.

This is triggered when the shared entropy in one or the other direction is negative: that is an unphysical result that can be the result of very few sampling points leading to large fluctuations.

more windows doesn't solve the second law of thermodynamics problem



### notes

- [GMXLIB global variable is ignored · Issue #1210 · ParmEd/ParmEd (github.com)](https://github.com/ParmEd/ParmEd/issues/1210)

  we can only set one path for `$GMXLIB`, separator `:` not useful. this even affects parmed converting `.top` to `.psf` including `xxx.ff`

  gmx本身能接受GMXLIB多个路径`:`隔开，但似乎pmx指认最后一个？

- FEP模拟中会使用多个window来计算自由能变化，有时会出现某些window无法运行的情况。

- 可以尝试重新运行出现问题的window，或者修改随机数等参数，也可以考虑减少窗口数量。

- 大量窗口的FEP模拟出现问题，可以尝试采用更少的窗口，例如22个窗口。

- window多了，可能用上一个window作为输入应该可以大概率避免这个情况，这可能就是kevin之前提到的，在某个lambda它就是姿势不舒服或者什么其他问题

- FEP模拟中使用的lambda值可能会出现精度问题，导致计算出现偏差。

- 非5和0的lambda引入以后，再四舍五入以后出现大的偏差。纯猜测，没证据

- GROMACS软件在进行计算时会进行近似处理，例如离散化等，这也可能会导致计算出现问题。

- pmx也可以指定fep怎么mapping?

- "state B has non-zero total charge": 没办法

- Some parameters for bonded interaction involving perturbed atoms are specified explicitly in state A, but not B - copying A to B

  这个没关系

- maybe

  ```
  WARNING: Some of these results violate the Second Law of Thermodynamics:
           This is can be the result of severe undersampling, or (more likely)
           there is something wrong with the simulations.
  ```

  no harm?

- 时间长一点就先确定不是时间的问题；有replica exchange采样空间会比重复多次好一点（后续事实证明，确实好一点）



## More on FEP

### ddG decomposition

It is hard to do this in Gromacs since **none of the files record vdW and columb energy** at every step for FEP as NAMD does. 

We have to rerun all production trajectories, to extract vdW and elec energy. 

> rerun: [Useful mdrun features - GROMACS documentation](https://manual.gromacs.org/current/user-guide/mdrun-features.html#re-running-a-simulation)

It is even impossible for sth like pmx-based AA FEP:

```
Fatal error:
Perturbed masses or constraints are not supported by rerun. Either make a .tpr without mass and constraint perturbation, or use GROMACS 2018.4, 2018.5 or later 2018 version.
```

This is an issue as long as there is an **element type** (essentially, mass) **changed** from A to B (rather than defining dummy atom for both A/B state, like dual-topology paradigm).

[Energy decomposition from FEP (narkive.com)](https://gromacs.org-gmx-users.maillist.sys.kth.narkive.com/NbtCy2iY/gmx-users-energy-decomposition-from-fep)

> This is physically meaningless. You want to decompose into enthalpy and entropy instead.

They said this because elec and vdw can be separately decoupled in gromacs, making them not state functions. We decouple them together.

X师兄喜欢先消掉elec再消掉vdw，这样可能能假装做一下decomposition，但是不在意的话可以不管。





FEP中，原子数目改变了，凭什么从哈密顿量中消掉动能？怪不得gmx不支持mass perturbation（不对呀，只是decomposition不支持，那这么说mass perturbation的single topology就是错的？）

至少，dual topology更好，本质上是所有原子都还在，只是调了势能。mass不变的single topology同理

### Time convergence

also works for other FEP in gmx



```shell
```





## MD workflow

Not using? He has provided me a full set of files (top, gro)

> Maybe we need to confirm the end state conformation....
>
> ```shell
> # to pdb and split
> box=`tail -n 1 c*.gro | awk '{printf "%-10s %-10s %-10s", $1, $2, $3}'`
> gmx editconf -f c*.gro -o wt.pdb 
> cat wt.pdb | grep SOL > wt_sol.pdb
> cat wt.pdb | grep 'K  ' >> wt_sol.pdb
> cat wt.pdb | grep 'CL  ' >> wt_sol.pdb
> head -n 8470 wt.pdb > wt_con.pdb
> endofh=`grep -n -m 1 'SOL' wt.pdb | cut -d : -f 1`
> head -n $((endofh-1)) wt.pdb | tail -n +8471 > wt_h.pdb
> pymol wt_h.pdb
> # pick a similar rotamer of the residue in wt_h.pdb, save as h.pdb
> # get proper .itp for the edited chain
> gmx pdb2gmx -f h.pdb -o h.gro -ff amber99sb-star-ildn-mut -water none -ignh 
> mv topol.top topol_Protein_chain_H_hybrid.itp
> rm posre.itp
> code topol_Protein_chain_H_hybrid.itp
> # get the hybrid chain and remember to 
> # 1. modify the [ moleculetype ] 
> # 2. remove the #include xx.ff/forcefield.itp and the final [ system ] etc. field
> # but atom orders are changed. in h.gro they are right
> gmx editconf -f h.gro -o h_final.pdb
> cat wt_con.pdb h_final.pdb wt_sol.pdb | grep -v END | grep -v TER > sys.pdb
> # get the full .gro, copying the original box size (change this for every system!!)
> gmx editconf -f sys.pdb -o bound.gro -box $box
> code newtop.top
> # copy the original topol.top from elsewhere as newtop.top and modify: 
> # 1. replace the original .itp file for the chain to mutate 
> #    with the new hybrid .itp file: topol_Protein_chain_H_hybrid.itp
> # 2. replacing all the original ff with the mutation ff in pmx
> 
> mkdir editchains
> mv wt*.pdb h* sys.pdb c*.gro editchains
> ```
>
> if the system is not neutral, just edit...
>
> - gro, total number of atoms
> - gro, remove an ion; top, change the number of ions
>
> 



## Other notes

- [What is best way to get multiple chains? (kth.se)](https://mailman-1.sys.kth.se/pipermail/gromacs.org_gmx-users/2009-October/045869.html) modeling in gmx

- but in the case of mutating one molecule to another, wherein bonded and nonbonded terms may change, the old-style modifications (the so-called "dual topology approach") would still be required. The GROMACS manual, section 5.7.4, provides an example of such a transformation.

  not checked

- I have a gromacs .gro file with multiple identical chains, i.e. same residue numbers but no chain identifiers. when I save coordinates into pdb in VMD, only one chain is left and the structure is messy (average coordinate?). how to correctly save pdb files from gro file with multiple identical chains?

  answer: save as .gro file

- [Fatal error: atom C1 not found in buiding block 1MET while combining tdb and rtp. error in ignh cmd - User discussions - GROMACS forums (bioexcel.eu)](https://gromacs.bioexcel.eu/t/fatal-error-atom-c1-not-found-in-buiding-block-1met-while-combining-tdb-and-rtp-error-in-ignh-cmd/5804)

  [Newest CHARMM36 port for GROMACS - Third party tools and files](https://gromacs.bioexcel.eu/t/newest-charmm36-port-for-gromacs/868/11)

  For CHARMM36 in the case of an N-terminal MET residue in a polypeptide sequence, you **MUST** interactively choose the appropriate terminal patch. `pdb2gmx` tries to be smart and match by name but in this case, it causes an erroneous attempt to patch with a carbohydrate-specific patch. (2022.11)

  



Thoughts: what might a mutation do to protein-ligand binding?

- 直接相互作用改变：突变可能改变残基的电荷性质或氢键供体/受体性质...
- 构象变化：突变可能引起残基的构象变化，导致结合位点的空间结构发生改变。例如，突变可能导致结合位点的闭合或开放程度发生改变。
- 溶剂效应改变：突变可能影响结合位点的溶剂可及性，可能改变配体与结合位点之间的溶剂效应
- 动态变化：突变可能导致蛋白质整体或局部的动力学特性发生变化，从而影响结合位点的构象动态或动力学稳定性。

