# PSK project

## Background

2022.9.17

背景：结合这个受体，能促进植物生长、保鲜

天然底物：YIYTQ，五肽，两个Y上有SO3H

结构：蛋白保守；结合位点稳定（保守），一个反β sheet扣住五肽

目标：找更强的；成本降低（SO3H贵，摆脱掉？）

已经发现

- 两个SO3H对反β sheet的结合重要，变成A会破坏。但好像并没有很贡献结合能？跟带正电的都不太稳定
- 1号和4号的很多FEP都不太行，或被实验否掉
- 5号Q变为RK等正电的可能有希望

另外，实验发现Q上结合biotin会保持结合力。基于biotin做设计？

其他实验也很多，可以据此设计

The atomic coordinates and structure factors have been deposited in the Protein Data Bank. The PDB code of free DcPSKRLRR is 4Z62. The PDB codes of PSK–PSKR1LRR and PSK–DcPSKRLRR are 4Z63 and 4Z5W, respectively. The PDB codes of PSK–PSKR1LRR–SERK1LRR and PSK–DcPSKRLRR–SERK2LRR are 4Z64 and
4Z61, respectively  

想法：

- 应该不用管coreceptor

- biotin结合的位置？β重复单元，还是反β sheet？

  <img src="E:\GitHub_repo\notes\MD\PSK-PSKR.assets\PSKR-biotin.png" alt="PSKR-biotin" style="zoom:67%;" />

  此图可能支持前者？biotin能不能缩短哪个链？

- 但也可能只是，不影响活性。。

- biotin能不能变为正常AA？但是延长我觉得也应该在N端

- 

第一步：长出来一个AA，两边都看看

变动：都行。也可以Q5K再添加。



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





## System setup

### pre-process the pdb files

- assign chain names for the receptor and ligand. [reference](https://www.researchgate.net/post/How_to_change_the_protein_chain_names_X_into_A_B_C_D_after_MD_simulations_in_Gromacs) or [this](https://pymolwiki.org/index.php?title=Alter)

  ```shell
  alter sele, chain='A'  # in pymol
  ```

- We may use 'HETATM' for novel residues. The peptide is still considered as 'protein'.

- fix the atom name, e.g. when a terminal COO- turns into the normal CO (atom type OT1, OT2)

- note that we use option `-ter` to automatically fix the terminal residue (NH3+,COO-). So do not add (or just remove) the extra atoms.

- merge them. you can easily mutate a residue in Pymol.

  ```shell
  cat *.pdb | grep ' A ' > complex.pdb
  cat *.pdb | grep ' B ' >> complex.pdb
  ```

- 

### mutate a residue

In pymol: https://pymolwiki.org/index.php/Mutagenesis

select a proper rotamer.

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

echo -e "5 & a 1-9470 \n 1 & ! a 1-9470 \n q" | gmx make_ndx -f final.tpr -o index.ndx
echo -e "\n[center] \n9528\n\n" >> index.ndx
grep "MainChain" -rl index.ndx | xargs sed -i "s/MainChain_&_a_1-9470/Receptor_Mainchain/g"
grep "MainChain" -rl index.ndx | xargs sed -i "s/Protein_&_\!a_1-9470/Peptide/g"

# to restart
gmx mdrun -s npt.tpr -cpi npt.cpt -append
nohup bash ../mdps/run_npt2.sh 2&>1 &
```

> don't care too much about em 'not converage'?

#### notes

- gmx log file not that useful

  ```
  nstxout     = 0       ; save coordinates every 10.0 ps
  nstvout     = 0       ; save velocities every 1.0 ps
  nstenergy   = 0       ; save energies every 1.0 ps
  nstlog      = 5000    ; update log file every 10.0 ps
  ```

  in npt.mdp. nstlog=0 in em.mdp

- run consecutively

  ```shell
  sleep 6h && gmx mdrun ....  # if the first run uses 'nohup'
  ```

  or in a local machine

  ```shell
  namd3 ..... [Enter]
  namd3 .... # before job finishes
  ```

- 最好把本地机设成禁止自动suspend、black screen (gnome Settings--power)，否则跑着跑着无法看到图形界面。。

- gmx中断后保持步数? 

  http://bbs.keinsci.com/thread-17980-1-1.html

  https://blog.csdn.net/MurphyStar/article/details/113679744

  -extend. edit .tpr file and provide .cpt file

  > Fatal error: Cannot change a simulation algorithm during a checkpoint restart. Perhaps you should make a new .tpr with grompp -f new.mdp -t npt.cpt 

  The cpt file extension stands for portable checkpoint file. The complete state of the simulation is stored in the checkpoint file

  `gmx trjconv -f npt.cpt -s npt.tpr -o npt_cpt.gro`

  recover interrupted simulation, to get the .gro

- default

  - vmd aligns protein noh 
  - pymol aligns protein Calpha 

  be careful doing selection

- In gromacs, chain names are lost!

- pymol show contact residues http://shdf611.lofter.com/post/1cd0a1d0_a6e8874

- doing MSA: cluster omega

- pocket alignment，最好只用pocket的原子

- vmd有propka别忘了



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

### workflow

```shell
#!/bin/bash
# usage: bash build-mutate.sh last

resi=$1

rm complex* ligand* p* *.fep.* *-solvated* mtemp-PEP.pdb

grep " A " ${resi}.pdb > prot.pdb
grep " B " ${resi}.pdb > pept.pdb

vmd -dispdev text -e build-mutate.tcl

python edit_fep.py
mv complex.psf complex-fep.psf
mv ligand.psf ligand-fep.psf

mkdir ../${resi}
mv complex-fep.* ../${resi}
mv ligand-fep.* ../${resi}

rm complex* p* ligand* *.fep.* *-solvated* 
```

where

```tcl
#!/bin/bash
# vmd -dispdev text -e build-mutate.tcl
 
# set resi [lindex $argvs 0]

package require psfgen
psfcontext reset
topology ./ff/top_all36_prot.rtf
# topology ./ff/top_all36_hybridnew.inp
topology ./ff/top_all36_cgenff.rtf
topology ./ff/toppar_water_ions_namd.str
topology ./ff/TYM.rtf

# preprocessing pept
segment PEP {pdb pept.pdb}
patch NTER PEP:28
coordpdb pept.pdb PEP
guesscoord
writepdb pept-fixed.pdb
writepsf pept-fixed.psf

# do mutation. though reporting error, files are usable
package require mutator
mutator_core -psf pept-fixed.psf -pdb pept-fixed.pdb -o pept_MUTATE -resid 32 -mut LYS -FEP ligand
mv ligand.fep ligand.fep.pdb
# mv ligand.tmp.fep.psf ligand.fep.psf

alias residue HIS HSE
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

exit
```



- `mutator_core`: is just from VMD plugin [Mutator](https://www.ks.uiuc.edu/Research/vmd/plugins/mutator/)

- don't worry if you see the following error:

  ```
  Info) Using plugin psf for structure file ligand.fep.psf
  psfplugin) Failed to parse segname in PSF file:
  psfplugin)   '         1 PEP      28       TYM      N        NH3     -0.300000       14.0070           0
  ```

  - also, patches don't destroy standard residue mutations
  - also, some other errors in VMD that won't interrupt the execution.

- `mutator_core -psf pept-fixed.psf -pdb pept-fixed.pdb -o pept_MUTATE -resid 32 -mut LYS -FEP ligand`

  if `-FEP` is provided, it will mutate to the hybrid residue rather than the new residue.

  That program may need some certain mechanism to generate the atom coordinates and beta value, which aren't provided in `top_all36_hybrid.inp`.

- 



是啊，突变成大的最好多平衡一会大基团。。









