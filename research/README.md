# Research hub

<center><img src="https://cdn.jsdelivr.net/gh/gxf1212/notes@master/research/utils/21c.png" alt="21c" style="zoom: 25%;" class="center" /></center>

![logo](/utils/21c.png ':size=300')

This is research hub page. Click on the sidebar to select a chapter and start reading!

- [Programming for MD](/research/Programming-for-MD.md): Python, tcl, bash, specific Python packages, etc.
- [Common tools for MD](/research/Common-tools.md): visualization programs, molecular dynamics basics, Gromacs/NAMD/Amber basics, etc.
- [Preparation and modeling](/research/Preparation-and-modeling.md): general modeling: protein (AF2, Swiss-Model, etc.), protonation state, Leap/VMD, packmol, docking and VS (distribute to other pages later?)
- [Protein-ligand simulation](/research/Protein-ligand-simulation.md): MD/FEP with all MD engines
- [Protein/Amino Acid FEP](/research/AA-MD-FEP.md): MD/FEP with all MD engines
- [Systems with metal ions](/research/Metal-ion.md)
- [Fragments of science](/research/academic-notes.md)
- [MD official tutorials](/research/Previous-projects/MD-tutorials-all.md)

In the future, I will try not to write pages by project, but will still focus on specific themes in each page. Previous projects:
- [NUS project: virtual screening and MD simulation with Gromacs](/research/Previous-projects/UROPS-run-and-result.md)
- [FYP project: FEP on small molecules with NAMD](/research/Previous-projects/FYP-notes.md)



# MD入门流程

很多人问过我分子动力学（生物体系）怎么入门，我慢慢尝试总结一下。

## NAMD

- 做NAMD tutorial第一章，了解大致逻辑
- 尝试自己的体系（从一个pdb结构）
  - 如果你的体系有特别的修饰，先不要加，先做纯蛋白
  - 删除不需要的东西
  - 修正质子化状态
  - 末端处理，等
  - 写出建模的tcl脚本
- 移植我给的参数，大致了解参数含义，然后先跑起来（debug）
  - 了解NVT、NPT等步骤？gmx教程？
- 加上特别的修饰，进行完整的建模
- 集群的使用，获得正式的轨迹
- 轨迹观察、分析，vmd的使用

optional:

- 尝试CHARMM-GUI诸如solution builder之类的一站式工具（看一下对的结果是什么样子）



## Gromacs

推荐的gromacs教程：

- http://www.mdtutorials.com/ (official but I think it's a bit outdated)
- https://tutorials.gromacs.org/ (similar)
- https://jerkwin.github.io/ (into Chinese)
  - https://jerkwin.github.io/9999/10/31/GROMACS%E4%B8%AD%E6%96%87%E6%95%99%E7%A8%8B/
  - [GROMACS分子动力学模拟教程：多肽-蛋白相互作用|Jerkwin](https://jerkwin.github.io/2017/10/20/GROMACS分子动力学模拟教程-多肽-蛋白相互作用/)
- http://md.chem.rug.nl/~mdcourse/index.html (friendly and patient)
- 



latest manual: https://manual.gromacs.org/current/index.html

installation: https://github.com/skblnw/mkrun/blob/master/Installation/compile_gmx.sh

## 学习路线

我个人认为学操作之前不一定学很深的理论（如果只是为应用的话），大概知道MD在干啥、力场是啥就行了。不如在用的时候遇到什么问题再去查或问别人。对具体算法感兴趣，可以再看看。先了解概念、学会技术，再根据需要去看理论的书。

如果是蛋白互作，可以忽略小分子相关软件（chemdraw、openbabel之类的），知道哪些对接是小分子、哪些是大分子就行；软件也不一定都学，比如vmd和pymol先学其中一个，比如Amber和gmx搭体系先选一个。流程就是：建蛋白模型--对接多肽/蛋白--准备体系--进行模拟。主要是先把流程走通。如可以先不看同源建模，先从pdb拿。然后做第二个体系，再尝试把其他的加进去。





```html
<center><img src="https://cdn.jsdelivr.net/gh/gxf1212/notes@master/research/utils/21c.png" alt="21c" style="zoom: 25%;" /></center>
```

