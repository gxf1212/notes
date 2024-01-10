# RNA simulation

TODO: Thanks for Protein-RNA互作.pdf from Mark



# Basics

## Secondory structure

### 点括号注释

`.` 表示未配对核苷酸， `()` 表示配对核苷酸。如果存在交叉配对，就依次用`[ ]`，`{ } ` 

<img src="https://cdn.jsdelivr.net/gh/gxf1212/notes@master/research/RNA-simulation.assets/dot-parentheses.png" style="zoom:67%;" />



### Prediction

形成碱基互补配对的自由能为负值，而未形成碱基互补配对的自由能为正值

MFE (Minimum Free Energy)算法，由Zuker提出

自由能 ≠ 碱基对的数目

现在流行是机器学习和同源比对相结合，对更长的RNA序列进行二级结构预测  



http://wiki.chenglab.net/mediawiki/index.php/How_to_do_MDs#MD_parameters
做DNA/RNA末端要restrain住



# Tools

https://rna-tools.online/tools/rpr/



RNAfold WebServer: http://rna.tbi.univie.ac.at/cgi-bin/RNAWebSuite/RNAfold.cgi

RNAeval WebServer: http://rna.tbi.univie.ac.at/cgi-bin/RNAWebSuite/RNAeval.cgi

The **RNAfold web server** will predict secondary structures

The **RNAeval web server** calculates the energy of a RNA sequence on a given secondary structure.



[Xiao Lab (hust.edu.cn)](http://biophy.hust.edu.cn/new/3dRNA/create)

3dRNA/DNA Web Server
Automatic building of ncRNA and DNA 3D structures



预测二级结构:

- Mfold Sever http://www.mfold.org/mfold/applications/rna-folding-form.php
- RNAfold Sever http://rna.tbi.univie.ac.at//cgi-bin/RNAWebSuite/RNAfold.cgi
- Vfold2D: http://ma.physics.missouri.edu/vfold2D/index.html 如果考虑存在“假节” pseudoknot结构

已知二级结构，预测三级结构:

- IsRNA2
- RNAComposer: https://rnacomposer.cs.put.poznan.pl      http://rnacomposer.ibch.poznan.pl/
- FARFAR2 Rosetta







## Modeling

[Circular RNA topology file from case on 2009-10-21 (Amber Archive Oct 2009) (ambermd.org)](http://archive.ambermd.org/200910/0327.html)

```
bond <unit>.<residue #>.<atom name> <unit>.<residue #>.<atom name>
```



[cRNAsp12 (xxulab.org.cn)](http://xxulab.org.cn/crnasp12/)

cRNAsp12 Web Server for the Prediction of Circular RNA Secondary Structures and Stabilities
