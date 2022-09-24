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



## Dealing with novel residues

### make the topology

upload to CHARMM-GUI. [A Jerkwin example of preparation](https://jerkwin.github.io/2017/09/20/GROMACS%E9%9D%9E%E6%A0%87%E5%87%86%E6%AE%8B%E5%9F%BA%E6%95%99%E7%A8%8B2-%E8%8A%8B%E8%9E%BA%E6%AF%92%E7%B4%A0%E5%B0%8F%E8%82%BD%E5%AE%9E%E4%BE%8B/).





> on provided files
>
> - `residuetype.dat`: only one line added
>
> senior sister: keep the backbone charge distribution of Y-SO3 identical to that of Y, and spare the extra charge in the side chain. I'll use that.



### prepare ff files

(downloaded from charmm)

```shell
sudo cp -r charmm36-jul2021.ff /your/working/directory
```

> we may not copy into `/usr/share/gromacs/top` because we may not have permission. But gmx can recognize the folder in your cwd.

and modify files related to that residue

gmx: [Adding a Residue to a Force Field](https://manual.gromacs.org/current/how-to/topology.html#adding-a-residue-to-a-force-field)



> maybe I'll handcraft one later

## System setup

1. we can normally go through gmx workflow. 

   ```shell
   gmx pdb2gmx -f prot.pdb -o prot.gro -ignh -water tip3p -ff charmm36-jul2021
   # check ff. no .ff
   
   
   gmx pdb2gmx -f pept.pdb -o pept.gro -ignh -water tip3p -ff charmm36-jul2021
   ```

   

2. 







