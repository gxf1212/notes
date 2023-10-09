# Enhanced Samping & Coarse Grained

# PMF

## Tutorials

[AMBER高级教程A17：伞形采样实例--计算丙氨酸二肽Phi/Psi旋转过程的平均力势PMF|Jerkwin](https://jerkwin.github.io/2018/04/26/AMBER高级教程A17-伞形采样实例-计算丙氨酸二肽Phi-Psi旋转过程的平均力势PMF/)

我们已经驰豫了初始结构, 接下来计算部分是在单个伞形窗口运行MD. 所需窗口数目的选择与所使用的限制大小有点像魔法难以琢磨. 我们遇到的又一个问题是在我们计算之前能否知道解决方案最理想的选择. 关键点在于记住选择的窗口数的终点必须重叠. 例如, 窗口1必须采到窗口2的一部分, 等等. 这本质上意味着我们不能错误的去选择太多的窗口, 除非你想要花费过多计算时长. 力常数同样地也必须足够大以确保我们实际采集到了合适大小的相空间子集, 我们使窗口更窄去防止它们重叠. 通常我们能够根据沿着路径的位置去调整窗口和限制的大小. 例如, 如果观察两个距离非常近, 处于范德华半径内的离子分离, 我们必须采用很强的限制和大量的窗口. 随着距离的增加, 我们能使用越来越弱的限制和间距更大的窗口.


similar, but In our example here we will be varying the distance between the center of mass of ligand, lovastatin,
and the center of binding pocket.

https://gaseri.org/en/tutorials/gromacs/5-umbrella/#setup

没搞清楚定速度、定距离之类的啥意思

https://zhuanlan.zhihu.com/p/385098206



[take two methanes and restrain them at different distances using a harmonic potential (miletic.net)](https://group.miletic.net/en/tutorials/gromacs/5-umbrella/#parameter-files)



### Pulling out of membrane













# Coarse Grained Simulations





## Martini Basics

http://md.chem.rug.nl/images/stories/WORKSHOP2017/lecture-01.pdf



Building block types: apolar, intermediate, polar, charged

about four heavy atoms per bead (include their hydrogen atoms)











