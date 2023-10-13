# Polymer & Membrane

Since I got a project on polymer/ligand-membrane interaction, I put these two topics together...



[Running membrane simulations in GROMACS - GROMACS documentation](https://manual.gromacs.org/current/how-to/special.html#running-membrane-simulations)



# Membrane setup

membrane setup tutorials

- [Building Systems - Membrane Systems (ambermd.org)](https://ambermd.org/tutorials/MembraneSystems.php)
  - Basic, lipid14, from CHARMM-GUI: [An Amber Lipid Force Field Tutorial](https://ambermd.org/tutorials/advanced/tutorial16/)
  - [Membrane System Setup with PACKMOL-Memgen](https://ambermd.org/tutorials/advanced/tutorial38/index.php)
- [The Lipid21 Force Field is recommended in Amber](https://ambermd.org/AmberModels_lipids.php)

## CHARMM-GUI

### Membrane



#### Result

##### top

restraint of POPC during equilibration

```
```



[Restraints - Dihedral restraints](https://manual.gromacs.org/documentation/current/reference-manual/functions/restraints.html#dihedral-restraints)

[Bonded interactions - Improper dihedrals](https://manual.gromacs.org/documentation/current/reference-manual/functions/bonded-interactions.html#improper-dihedrals)

##### mdp



### Membrane protein





## Packmol









## VMD

http://www.ks.uiuc.edu/Training/Tutorials/science/membrane/mem-tutorial.pdf





# Ligand-membrane setup

- database/server of ligand-membrane interaction
  - https://molmedb.upol.cz/detail/intro  no data, only indices of papers. many too small ligands like CO<sub>2</sub>
  - https://permm.phar.umich.edu/  calculate passive permeability of molecules across the lipid bilayer

## Amber





### GUI+gmx



```shell

```







## CHARMM



### GUI+gmx

Also, build membrane with CHARMM-GUI membrane builder



```shell

```







# Polymer setup





Pulling out of membrane: see [Pulling](Enhanced-sampling-Coarse-Grain.md)





# Analysis

## Basic membrane properties

[KALP-15 in DPPC -- Analysis](http://www.mdtutorials.com/gmx/membrane_protein/09_analysis.html)

[GROMACS如何做之膜模拟|Jerkwin](http://jerkwin.github.io/2016/09/19/GROMACS如何做之膜模拟/)  read outer links, e.g. [membrane_simulations.pdf by Erik Lindahl](https://extras.csc.fi/chem/courses/gmx2007/Erik_Talks/membrane_simulations.pdf)

[An Amber Lipid Force Field Tutorial](https://ambermd.org/tutorials/advanced/tutorial16/)  analysis with cpptraj, what to analyze



- Deuterium Order Parameters
- Density of the Membrane
- Area per Lipid Headgroup
- Bilayer Thickness
- Lateral Diffusion of Lipids







