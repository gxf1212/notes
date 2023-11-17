# Advanced techniques

# Pulling

New bing:

`pull_coord1_geometry` specifies the type of pulling that will be applied to the system. When `pull_coord1_geometry` is set to `distance`, the pulling force is applied along the vector connecting the two pull groups. When `pull_coord1_geometry` is set to `direction`, the pulling force is applied in a specific direction specified by the `pull_coord1_vec` option.

The difference between setting `pull_coord1_rate` to 0 and specifying `pull_coord1_init` manually for each window and setting `pull_coord1_rate` to a non-zero value and not specifying `pull_coord1_init` is that in the first case, you are performing umbrella sampling, while in the second case, you are performing steered molecular dynamics.

In umbrella sampling, you specify the initial value of the reaction coordinate for each window using the `pull_coord1_init` option. The system is then simulated with a harmonic potential applied to the reaction coordinate to keep it close to the initial value. In steered molecular dynamics, you specify a non-zero pulling rate using the `pull_coord1_rate` option. The system is then simulated with a constant force applied to the reaction coordinate to move it along a predefined path.



https://gromacs.bioexcel.eu/t/protein-ligand-umbrella-sampling-binding-affinity-not-matching-experimental-values/5740

Reducing protein-ligand binding to a one-dimensional reaction coordinate (and as you have, only one spatial dimension of a one-dimensional reaction coordinate) is almost certainly inappropriate. And I’ve seen some recent evidence that any one-dimensional umbrella sampling may not even be reproducible, for a variety of reasons. Ligand binding to proteins is complex (see, e.g. https://doi.org/10.1038/s41467-022-33104-3) and simply trying to compute a binding free energy from a single, chosen path may never be right





## Tutorials

[AMBER高级教程A17：伞形采样实例--计算丙氨酸二肽Phi/Psi旋转过程的平均力势PMF|Jerkwin](https://jerkwin.github.io/2018/04/26/AMBER高级教程A17-伞形采样实例-计算丙氨酸二肽Phi-Psi旋转过程的平均力势PMF/)

我们已经驰豫了初始结构, 接下来计算部分是在单个伞形窗口运行MD. 所需窗口数目的选择与所使用的限制大小有点像魔法难以琢磨. 我们遇到的又一个问题是在我们计算之前能否知道解决方案最理想的选择. 关键点在于记住选择的窗口数的终点必须重叠. 例如, 窗口1必须采到窗口2的一部分, 等等. 这本质上意味着我们不能错误的去选择太多的窗口, 除非你想要花费过多计算时长. 力常数同样地也必须足够大以确保我们实际采集到了合适大小的相空间子集, 我们使窗口更窄去防止它们重叠. 通常我们能够根据沿着路径的位置去调整窗口和限制的大小. 例如, 如果观察两个距离非常近, 处于范德华半径内的离子分离, 我们必须采用很强的限制和大量的窗口. 随着距离的增加, 我们能使用越来越弱的限制和间距更大的窗口.

similar, but In our example here we will be varying the distance between the center of mass of ligand, lovastatin,
and the center of binding pocket.

https://gaseri.org/en/tutorials/gromacs/5-umbrella/#setup

没搞清楚定速度、定距离之类的啥意思





[take two methanes and restrain them at different distances using a harmonic potential (miletic.net)](https://group.miletic.net/en/tutorials/gromacs/5-umbrella/#parameter-files)



[GROMACS中伞型采样算法应用详解 - 分子模拟 (Molecular Modeling) - 计算化学公社 (keinsci.com)](http://bbs.keinsci.com/thread-36490-1-1.html)



https://gitlab.com/gromacs/online-tutorials/umbrella-sampling



https://2022.igem.wiki/cu-egypt/MolecularDynamics.html#short3



Pulling out of membrane



## PMF/US









# Coarse Grained Simulations





## Martini Basics

http://md.chem.rug.nl/images/stories/WORKSHOP2017/lecture-01.pdf



Building block types: apolar, intermediate, polar, charged

about four heavy atoms per bead (include their hydrogen atoms)











