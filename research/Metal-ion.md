# Metal ion

From the PSKR1-Al<sup>3+</sup> project. Modeling (inclulding advanced FF parametrization) and simulation (maybe advanced techniques) involving metal ions. Maybe related literature and binding site prediction.

- Amber special setup (e.g. MCPB.py)
- special MD (US, etc.)

## First things to know

- Alkaline earth metal ions are expected to bind to dsDNA through electrostatic and van der Waals interactions due to their closed-shell electronic structure; therefore, classical force fields can accurately model DNA–ion interactions of alkaline earth metal ions.

- parameter fitting targets: IOD, HFE, CN, 

  water residence time or exchange rate, coefficient of diffusion

- 

- 



# Fundamental usage



## Randomly add ions

### tleap

```python
tleap
source leaprc.protein.ff14SB
pro = loadpdb ambpdb.pdb
check pro
source leaprc.water.tip3p
solvatebox pro TIP3PBOX 10.0 iso
# loadAmberParams frcmod.ions234lm_iod_tip3p
addIonsRand pro AL 10
charge pro
# avoid alternating ions
addIonsRand pro Cl- 62 
addIonsRand pro K+ 40
charge pro
check pro
saveamberparm pro pro.prmtop pro.inpcrd
quit
```

However, by default tleap renumbers all residues! To make it easier finding residues of interest in literatures, we renumber it back. This may not work for systems with multiple chains since I haven't found chain identifiers (told me if I'm wrong). We may make another pdb file with identifiers when analyzing trajectories.



```python
# both .gro and .top
# python convert_amber2gmx_via_parmed.py pro 688

import parmed as pmd 
import sys
prefix = sys.argv[1]
offset = int(sys.argv[2])
amber = pmd.load_file(prefix+'.prmtop', prefix+'.inpcrd')
# test
# prefix = '/path/to/pro'
# offset = 688

print('Read Amber files. Renumbering residues...')
for residue in amber.residues:
    _ = residue.idx
    residue._idx += offset
    residue.number += offset
# 'all': maintain order. combine is from the following two functions, under parmed.gromacs.gromacstop/gro.py
# pmd.gromacs.GromacsGroFile.write(amber, prefix+'.gro', combine='all')
# pmd.gromacs.GromacsTopologyFile.from_structure(amber).write(prefix+'.top', combine='all')
amber.save(prefix+'.top', overwrite=True, combine='all')
amber.save(prefix+'.gro', overwrite=True, combine='all')
print('Gromacs files saved.')
```

If you run with Amber, you cannot renumber like this. Do this in vmd when viewing trajectories:

```tcl
set all [atomselect top "protein or resname AL or resid 1 to 1500"]
foreach idx [$all get index] {
    set atom [atomselect top "index $idx"]
    $atom set resid [expr [$atom get resid] + 688]
}
```



### vmd

must be with the help of packmol (for uncommon ions)

```shell
packmol < packmol.inp
grep -v ' AL ' pro_al.pdb > protein.pdb
grep ' AL ' pro_al.pdb > al.pdb
vmd -dispdev text -e merge-sol-ion.tcl
python /home/gxf1212/data/work/PSKR1-Al/try/with-Al/convert_charmm2gmx_via_parmed.py pro 688
```

where

```shell
# packmol.inp

```

and

```tcl
# vmd
```

Note: `solvate` is not able to rotate the molecule very well as tleap (or N ter always unfolds? I haven't try) to add solvent molecules. I've set the distance to edge to 1.1 nm (really big!) and distances to image is still within vdW cutoff (1 nm). And options like `iso` is not availible (but yes for tleap and `gmx editconf`). We might manually set the length of three edges.



## 12-6-4 model

> The new potential with designed parameters could reproduce the experimental HFE, IOD and CN values at the same time without significant compromise. Especially for the highly charged metal ions, the 12-6-4 LJ-type nonbonded model performs much better than the 12-6 one overall.

NOT for CN!!



https://ambermd.org/tutorials/advanced/tutorial20/12_6_4.php

```shell
# parmed -i 1264_parmed.in -p pro-tleap.prmtop
loadRestrt pro-tleap.inpcrd
setOverwrite True
add12_6_4 @%Al3+ watermodel TIP3P
outparm pro-1264.prmtop pro-1264.inpcrd
```



Users can use the "printDetails" command in ParmEd to check the detailed information about the ions. Moreover, users can use the "printLJMatrix" command in ParmEd to check the C12, C6 and C4 parameters related to the ions (C4 parameters are only checkable by using ParmEd in Amber16 or higher version).

```shell
parmed -i check_1264_parmed.in -p pro-1264.prmtop
```

where

```shell
# check_1264_parmed.in
printDetails :AL 
printLJMatrix :AL
```

The A, B, and C coefficients are C12, C6, and C4 terms respectively.

also, check the structure:

```shell
ambpdb -p pro-1264.prmtop -c pro-1264.inpcrd > pro-1264.pdb
pymol pro-1264.pdb
rm pro-1264.pdb
```





# QM-refitted parameters

## Sobtop

Sobtop is absolutely simpler than MCPB.py. Choose this for simple systems like hydrated Al<sup>3+</sup>.

We generate parameters for them (.itp file), and insert into Gromacs .top file.





Workflow:

```mermaid
graph LR

s(set up normal system \n and convert to gmx) --insert-ions--> i(ions inserted) --> r(protein) --tleap--> gg(gmx gro) --> c(combined.pdb)
r --tleap--> gt(gmx top) --edit--> ct(combined.top)
i --> ion(the ions) --> c
```



the final system:

```mathematica
[ system ]
; Name
Generic title

[ molecules ]
; Compound       #mols
system               1
alh2o               10
```

"alh2o" is the complex ion.



This is the setup script for random run with complex ions.

```shell
#!/bin/bash
# bash ../../setup.sh
# conda activate AmberTools22

# protein with other ions in box
cat > tleap_protein_box.in << EOF
source leaprc.protein.ff14SB 
source leaprc.water.tip3p
pro = loadpdb ambpdb.pdb 
solvatebox pro TIP3PBOX 10.0 iso
charge pro
addIonsRand pro Cl- 60
addIonsRand pro K+ 38
saveamberparm pro pro_solv.prmtop pro_solv.inpcrd 
quit
EOF
tleap -f tleap_protein_box.in
python /data/gxf1212/work/PSKR1-Al/try/with-Al/convert_amber2gmx_via_parmed.py pro_solv 688

# insert Al ion
gmx insert-molecules -f pro_solv.gro -ci alh2o.pdb -nmol 10 -o pro_alh2o.gro -replace SOL
gmx editconf -f pro_alh2o.gro -o pro_alh2o.pdb
grep -E "WAT|K\+|Cl-" pro_alh2o.pdb > pro_water.pdb
grep "ATOM" pro_alh2o.pdb | grep -v "MOL" | grep -E -v "WAT|K\+|Cl-" > pro_pdb.pdb

# model the rest part
cat > tleap_protein_cavity.in << EOF
source leaprc.protein.ff14SB 
source leaprc.water.tip3p
pro = loadpdb pro_pdb.pdb 
wat = loadpdb pro_water.pdb
sys = combine {pro wat}
saveamberparm sys pro_inserted.prmtop pro_inserted.inpcrd 
quit
EOF
tleap -f tleap_protein_cavity.in
python /data/gxf1212/work/PSKR1-Al/try/with-Al/convert_amber2gmx_via_parmed.py pro_inserted 688
gmx editconf -f pro_inserted.gro -o pro_inserted.pdb

# recombine .gro file
(grep -v "ENDMOL" pro_inserted.pdb; grep "MOL" pro_alh2o.pdb) > pro_recombined.pdb
rm pro_recombined.pdb.pdb 
# optional: get segments. 
python /home/gxf1212/data/work/make_hybrid_top/FEbuilder/tools/get_segments_pdb.py pro_recombined.pdb
box=`tail -n 1 pro_alh2o.gro | awk '{printf "%-10s %-10s %-10s", $1, $2, $3}'`
gmx editconf -f pro_recombined.pdb.pdb -o pro.gro -box $box

cp pro_inserted.top pro.top
## edit .top file yourself
read -p "Paused. Edit pro.top file. Press Enter when finished."

# finish modeling
rm \#* 
cp pro.gro ../pro.gro
cp pro.top ../pro.top
cd ..
echo 4 | gmx genrestr -f pro.gro -o posres_bb.itp

# equil. optional
MDRUN="gmx mdrun -ntmpi 1 -ntomp 15 -nb gpu -pme gpu -bonded gpu -update gpu -gpu_id 0"
if [ ! -f em.tpr ]; then
    gmx grompp -f ../../mdps/em.mdp -c pro.gro -r pro.gro -p pro.top -o em.tpr
fi
if [ -f em.tpr ] && [ ! -f em.gro ]; then
    gmx mdrun -s em.tpr -deffnm em -ntmpi 1 -ntomp 15 -nb gpu -gpu_id 0 -v
fi
if [ ! -f nvt.tpr ]; then
    gmx grompp -f ../../mdps/nvt.mdp -c em.gro -r em.gro -p pro.top -o nvt.tpr
fi
if [ -f nvt.tpr ] && [ ! -f nvt.gro ]; then
    $MDRUN -s nvt.tpr -deffnm nvt
fi
if [ ! -f npt.tpr ]; then
    gmx grompp -f ../../mdps/npt.mdp -c nvt.gro -r nvt.gro -t nvt.cpt -p pro.top -o npt.tpr
fi
if [ -f npt.tpr ] && [ ! -f npt.gro ]; then
    $MDRUN -s npt.tpr -deffnm npt
fi
if [ ! -f md.tpr ]; then
    gmx grompp -f ../../mdps/md.mdp -c npt.gro -r npt.gro -p pro.top -o md.tpr
fi

if [ ! -f md.tpr ]; then
    echo "Setup is successful! You can run md.tpr now."
else
    echo "Setup is not successful! Check the command line output."
fi
```

How to edit the `.top` file:

- paste novel atomtypes to the `[ atomtypes ]` section





## MCPB.py

This tool is compatible with Amber FF modeling without any pain...

### Protein-Metal



### Hydrated Al<sup>3+</sup>

Oh, they will just keep the six waters. Don't include more...





## Other

`OptC4.py` optimizes the C4 terms in the metal-site-complex of a protein system. 

haven't been updated since 8 years ago...



# Run MD





## Amber+12-6-4

Here is an example to run a simple MD with Amber. Recall [here](#12-6-4-model) for the setup.

```
├── infile
│   ├── all.sh
│   ├── catcrd.in
│   ├── heat.in
│   ├── md_conti.in
│   ├── md_conti.sh
│   ├── md.in
│   ├── md.mdin
│   ├── md.sh
│   ├── min1.in
│   ├── min2.in
│   ├── min3.in
│   ├── npt.in
│   └── nvt.in
└── system
    ├── 1264_parmed.in
    ├── check_1264_parmed.in
    ├── leap.log
    ├── pro-1264.inpcrd
    ├── pro-1264.pdb
    ├── pro-1264.prmtop
    ├── pro-tleap.inpcrd
    └── pro-tleap.prmtop

```

`min1.min`:

```
Minimize
 &cntrl
  imin=1, maxcyc=10000, ncyc=5000, ! minimization
  iwrap=1, ntx=1, 
  cut=8, ntb=1, ! pbc
  ntr=1, restraint_wt=10, restraintmask= '!:WAT,K+,Cl-', ! restraint
 /

```



`npt.in`

```
NPT
 &cntrl
  imin=0, ! md
  iwrap=1, irest=1, ntx=5,
  cut=12, ! ntb=2, 
  ntr=1, restraint_wt=2, restraintmask= '@CA,N,C', ! restraint
  ntc=2, ntf=2, ! SHAKE
  temp0=310.0, ! final temperature
  ntt=3, gamma_ln=5.0, ig=-1, ! thermostat
  ntp=1, pres0=1.0, taup=2, barostat=2,  ! 
  nstlim=2500000, dt=0.002, ! 5ns
  ntpr=25000, ntwx=25000, ntwr=25000, ! output
/

```

barostat= 1 (default) for Berendsen, 2 for MC barostat (recommended)



Run in your cwd:

```shell
#!/bin/bash
# nohup bash ./infile/md.sh 2&>error.log &

topfile=./system/pro-1264.prmtop
inicrd=./system/pro-1264.inpcrd
pmemd.cuda -O -i ./infile/md.in -p ${topfile} -c npt.rst7 -r md.rst7 -o md.out -inf md.info -x md.nc;
```

or

```shell
#!/bin/bash
# bash ./infile/all.sh 2&>error.log &
topfile=./system/pro-1264.prmtop
inicrd=./system/pro-1264.inpcrd
pmemd.cuda -O -i ./infile/min1.in -p ${topfile} -c ${inicrd} -ref ${inicrd} -o min1.out -r min1.rst7;
pmemd.cuda -O -i ./infile/min2.in -p ${topfile} -c min1.rst7 -ref min1.rst7 -o min2.out -r min2.rst7;
pmemd.cuda -O -i ./infile/min3.in -p ${topfile} -c min2.rst7 -o min3.out -r min3.rst7;
pmemd.cuda -O -i ./infile/heat.in -p ${topfile} -c min3.rst7 -ref min3.rst7 -o heat.out -r heat.rst7;
pmemd.cuda -O -i ./infile/nvt.in -p ${topfile} -c heat.rst7 -ref heat.rst7 -o nvt.out -r nvt.rst7 -x nvt.nc;
pmemd.cuda -O -i ./infile/npt.in -p ${topfile} -c nvt.rst7 -ref nvt.rst7 -o npt.out -r npt.rst7 -x npt.nc;
pmemd.cuda -O -i ./infile/md.in -p ${topfile} -c npt.rst7 -r md.rst7 -o md.out -inf md.info -x md.nc;
```

- -ref refc input (optional) reference coords for position restraints



restarting: http://archive.ambermd.org/201706/0128.html

```
MD
 &cntrl
  imin=0, ! md
  iwrap=1, irest=1, ntx=5,
  cut=12, ! ntb=2, 
  ntc=2, ntf=2, ! SHAKE
  temp0=310.0, ! final temperature
  ntt=3, gamma_ln=5.0, ig=-1, ! thermostat
  ntp=1, pres0=1.0, taup=2, barostat=2 ! barostat
  nstlim=500000000, dt=0.002, ! 1000ns
  ntpr=50000, ntwx=250000, ntwr=250000, ! output
/

```

and

```shell
#!/bin/bash
# nohup bash ./infile/md_conti.sh 2&>error.log &

topfile=./system/pro-1264.prmtop
inicrd=./system/pro-1264.inpcrd
pmemd.cuda -O -i ./infile/md.in -p ${topfile} -c md.rst7 -r md.rst7 -o md2.out -inf md.info -x md2.nc;

```





# Visualization



## Pymol settings 

(transfer to Pymol section?)

general 

```python
hide spheres, all
hide nb_spheres, all
center resn AL
show spheres, resn AL
hide lines, all
bg_color white
set cartoon_transparency, 0.6
set sphere_scale, 0.3
set label_size, 30
show sticks, (byres) all within 6 of resn AL
alter (all), resi=str(int(resi)+688)
label sele, "%s%s" % (resn, resi)
hide everything, resn WAT
```

## PBC processing

```shell
gmx23
echo 0 | gmx trjconv -s md.tpr -f md.part0001.xtc -o md_pbcmol.xtc -pbc mol -ur compact
vmd -dispdev text -e /path/to/vmd_traj.tcl
gmx22 # for MDAnalysis, which does not support newer gmx...
gmx grompp -f ../mdps/em.mdp -c pro.gro -r pro.gro -p pro.top -o mda.tpr
gmx23
# verify periodic distance, which is not a problem for tleap "iso"
echo 4 | gmx mindist -f md_pbcmol_wrap.xtc -s md.tpr -od minimal-periodic-distance.xvg -pi
xmgrace minimal-periodic-distance.xvg
```

where

```tcl
# vmd -dispdev text -e vmd_traj.tcl

mol new npt.gro type gro first 0 last -1 step 1 filebonds 1 autobonds 1 waitfor all
animate delete beg 0 end 0
mol addfile md_pbcmol.xtc type xtc first 0 last -1 step 1 filebonds 1 autobonds 1 waitfor all
package require pbctools
pbc wrap -centersel "protein" -compound residue -center com -all
animate write trr md_pbcmol_wrap.trr
echo 0 | gmx trjconv -f md_pbcmol_wrap.trr -s md.tpr -o md_pbcmol_wrap.xtc
rm md_pbcmol_wrap.trr
exit
```

Here we have only one protein but multiple ions in the solution. We first fix the protein structure with `-pbc mol`. Then we should make the protein in the center of the box in every frame <u>so that protein-ion contact events are correctly recorded</u>, otherwise, some part of the protein are in the vaccum. This does not seem achievable in `gmx trjconv`. But VMD cannot produce a smaller `.xtc` file...

For the later kinase-substrate system (with ATP and Al ion?), `-pbc nojump` easily makes the two chains together





# Analysis



## RDF

The spatial distribution of ions surrounding DNA was analyzed using radial distribution functions (RDFs) and occupancy of DNA binding sites.

https://docs.mdanalysis.org/stable/documentation_pages/analysis/rdf.html

https://amberhub.chpc.utah.edu/radial-rdf/







