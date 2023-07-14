# Metal ion

From the PSKR1-Al<sup>3+</sup> project. Modeling (inclulding advanced FF parametrization) and simulation (maybe advanced techniques) involving metal ions. Maybe related literature and binding site prediction.

- Amber special setup (e.g. MCPB.py)
- special MD (US, etc.)



# Fundamental usage

## First things to know

- parameter fitting targets: IOD, HFE, CN, 

  water residence time or exchange rate, coefficient of diffusion

- 

- 





## Randomly add ions

### tleap



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





## MCPB.py

This tool is compatible with Amber FF modeling without any pain...

### Protein-Metal



### Hydrated Al<sup>3+</sup>

Oh, they will just keep the six waters. Don't include more...





## Other

`OptC4.py` optimizes the C4 terms in the metal-site-complex of a protein system. See Subsection 18.2.4.

haven't been updated since 8 years ago...



# Run MD













