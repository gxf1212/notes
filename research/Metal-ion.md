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



## 12-6-4 model

https://ambermd.org/tutorials/advanced/tutorial20/12_6_4.php







# QM-refitted parameters

## Sobtop

Sobtop is absolutely simpler than MCPB.py. Choose this for simple systems like hydrated Al<sup>3+</sup>.

We generate parameters for them (.itp file), and insert into Gromacs .top file.





## MCPB.py

This tool is compatible with Amber FF modeling without any pain...

### Protein-Metal



### Hydrated Al<sup>3+</sup>

Oh, they will just keep the six waters. Don't include more...























