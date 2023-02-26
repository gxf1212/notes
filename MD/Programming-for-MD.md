# Programming for MD

see [here](/techniques/Prepare-for-the-computer.md) for installation

this page also includes usage of pymol, vmd, gmx, etc.

# Bash (shell)

跟系统相关的，请阅读《Linux基础》

1. syntax error: unexpected end of file

   https://unix.stackexchange.com/questions/591208/fix-syntax-error-unexpected-end-of-file-in-a-for-loop
   可能是Windows下编辑的问题，MS-DOS CRLF line delimiters?

   解决：去unix编辑

2. 

3. 


## text processing

### string spliting

- separator

  ```shell
  f=unbound.fepout.csv
  ${f#*.}  # fepout.csv
  ${f##*.}  # csv
  ${f%.*}  # unbound.fepout
  ${f%%.*}  # unbound
  ```

  to recite

  - #: keep right, * at left; %: keep left, * at right
  - one # or %: cut the first one; two: keep the last one

- exact length

  ```shell
  f=unbound.fepout.csv
  ${f:1:3}  # nbo
  ${f:1:-3} # nbound.fepout.
  ${f:0-1}  # the last char
  ```

- cut: split with any char

  ```shell
  cat /etc/passwd | head -n 5 | cut -d : -f 1
  ```

  > d: delimiter

- b

- c

- d

### awk

example

```shell
awk '/^#Free energy/ {printf "%.5f,%.5f,%.9f\n",$8,$9,$12}' ${fn}.fepout > ${fn}.csv
```

> take all lines with "#Free energy", print the no. 8,9,12 word (separated by space) to the output file

awk必须单引号

## file processing

### grep

1. [grep多个关键字“与”和“或”](https://blog.csdn.net/mmbbz/article/details/51035401)

   ```shell
   grep -E '123|abc' filename
   ```

2. 

### ls

1. check file size

   ```shell
   man ls
   ls -l # kb
   ls -lh # proper magnitud
   ls -l --blocksize=g  # gb
   ```

2. 

### find

1. find:

   ```shell
   sudo find / -name "*your-query*" # all that contains your query
   ```

2. select file according to size:

   https://blog.csdn.net/Cassiel60/article/details/89016530?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-2.control&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-2.control

   ```shell
   find . -name "*" -type f -size 0c > out.txt # output
   find . -name "*" -type f -size 0c | xargs -n 1 rm -f # delete
   ```

3. 

### count

1. shell 统计出现行数

   ```shell
   cat complex_ATPP.pdb | grep "SOD" | wc -l
   ```

   - cat显示内容
   - grep查找字符
   - wc计算字数

   ```shell
   ls | grep query # return all direcotries and files containing the query string
   ls -l | grep query | wc -l # count the number of files whose names contain
   grep -o query filename | wc -l # count the number of query appearances in a text file
   grep -n query filename # return lines with line numbers
   ```

2. count string

   https://www.runoob.com/linux/linux-comm-grep.html

   ```shell
   grep -o '$$$$' atp.sdf | wc -l
   ```

3. 

### other

1. unify the format of file names

   https://blog.csdn.net/vipchenvip/article/details/103280418

   ```shell
   # length=12
   rename ZINC ZINC0 ZINC????????.pdbqt # 8
   rename ZINC ZINC0 ZINC?????????.pdbqt # 9
   # 10
   # 11
   # in order!!
   rename ZINC0 ZINC ZINC??????????????.pdbqt # 14
   rename ZINC0 ZINC ZINC?????????????.pdbqt # 13
   ```

2. 

## advanced (scripting)

1. process files line by line

   https://www.cnblogs.com/iloveyoucc/archive/2012/07/10/2585529.html

   ```shell
   while read line
   do
       echo $line
   done < file
   ```

2. https://cloud.tencent.com/developer/ask/sof/806010

   如何在Bash函数中添加默认参数？`${1:-.}`

3. if 判断文件或目录是否存在

   https://blog.csdn.net/m0_38039437/article/details/100160042

4. keep the calculated result

   ```shell
   i=`expr ${f:0-1} + 1`
   ```

5. shell-if表达式关于文件存在判断，变量比较判断用法

   https://blog.csdn.net/khx0910/article/details/106383294/

6. 默认参数(变量默认值) 比较low的方式

   ```shell
   if [ ! $1 ]; then
       $1='default'
   fi
   ```

7. 

## examples

1. download: an example

   ```shell
   for i in {1..19}; do
   wget https://ronlevygroup.cst.temple.edu/courses/2020_fall/chem5302/lectures/chem5302_lecture${i}.pdf --no-check-certificate
   done
   ```

   advanced: https://linuxhandbook.com/seq-command/

   ```shell
   user@localhost:~$ seq 3 6
   3
   4
   5
   6
   ```

2. batch submit jobs

   https://www.cnblogs.com/wutou/p/16398524.html

   https://blog.csdn.net/weixin_42303136/article/details/107204483

   > 在shell 中字符串的截取格式是这样的: ${string:start:length} 意思为将 string 从 start 开始截取 length 个字符,然后返回,length 如果省略则截取到字符串末尾。

   ```shell
   #!/bin/bash
   # bash batch_submit.sh RdRp
   
   jobn=$1
   pert=`pwd | awk -F '/' '{print $(NF-1)}'` # name of system
   line=`cat -n fep.pbs.sh | grep "path=" | awk '{print $1}' | head -n 1`
   
   for f in `ls -F | grep /`; do 
   file=${f:0:-1}  # remove /
   abbv=${file:0:1}${file: -1}  # first and last char
   sed -i "${line}d" fep.pbs.sh
   sed -i "${line}i\path=${file}" fep.pbs.sh
   qsub fep.pbs.sh -N ${jobn}-FEP-${pert}-${abbv}
   echo submitted ${jobn}-FEP-${pert}-${abbv}
   done
   ```

3. 

# Tcl programming

- control

  - if...else

    ```tcl
    if {boolean_expression} {
      # statement(s) will execute if the boolean expression is true 
    } else {
      # statement(s) will execute if the boolean expression is false
    }
    ```

  - foreach: https://www.tcl.tk/man/tcl/TclCmd/foreach.html

    double:

    ```tcl
    set x {}
    foreach i {a b c} j {d e f g} {
        lappend x $i $j
    }
    ```

  - 

- vector and list

  - everything about lists https://zetcode.com/lang/tcl/lists/

  - `llength $list`: Count the number of elements in a list

  - Vectors: https://www.ks.uiuc.edu/Research/vmd/current/ug/node193.html 

- strings

  - format strings: https://wiki.tcl-lang.org/page/format

  - append something to a string: https://wiki.tcl-lang.org/page/append

- files

  - [Output results to the text file](https://sunxiaoquan.wordpress.com/2015/02/20/vmd-tcltk-output-results-to-the-text-file/)
  - https://wiki.tcl-lang.org/page/file+delete

- 

  



# Small molecule

## RDkit



### fundamental

- show structure quickly (not in jupyter notebook): 

  ```python
  def see_mol(mol):
      newmol = Chem.MolFromSmiles(Chem.MolToSmiles(mol))
      Chem.Draw.MolToImage(newmol, size=(600, 600)).show()
  ```

  直接画三维的反倒看不清

  RDKit isn't actually adding Hs here, it just recognizes that the P atoms have implicit Hs on them and then when drawing the molecule shows those implicit Hs.

- 



### MCS search

让RDkit得到正确的手性信息：除了一一对应pybel和rdkit的原子，去改那个chiralTag，估计没啥好办法



Assign bond order的过程，虽然可能改变smiles或者说这个原子上连了几个氢，但事实上在find mcS的过程中，还是用原来pdb的氢去align的

I'm using a modified version of `AssignBondOrdersFromTemplate` that does not set the number of explicit hydrogens.



https://www.rdkit.org/docs/source/rdkit.Chem.rdmolops.html

various utilities



future reference:

- R里面的MCS search：https://academic.oup.com/bioinformatics/article/29/21/2792/195951



### pdb file

RDkit cannot read PDB files well...without connect, bond order info is lost. Assign from template? the molecule has to match exactly! This template (smiles) could come from `pybel.readfile`. 

But no such way to assign chirality...

读pdb啥手性都没有，sdf有些没必要的（磷），smiles甚至有氧。这些识别的不对，还不如pdb。同时其实sdf下所有氢被排除在common之外，并不清楚其和手性的关系，反正就是不行

failed to read chirality even (with the help of openbabel)

```python
    def _get_rdk_mol(self, mol, format: str = 'smiles'):
        """
        Return: RDKit Mol (w/o H)
        """
        if format == 'pdb':
            return Chem.rdmolfiles.MolFromPDBBlock(mol.write("pdb"))
        elif format == 'smiles':
            return Chem.rdmolfiles.MolFromSmiles(mol.write("smiles"))

        # cp = subprocess.call(["obabel", lig.pdbfile+".pdb", "-osdf", '-O', lig.pdbfile+".sdf"],
        #                      stderr=subprocess.PIPE, stdout=subprocess.PIPE)
        # rmol = Chem.MolFromPDBFile(lig.pdbfile+'.pdb.pdb', removeHs=False)
        # pmol = pybel.readfile('pdb', lig.pdbfile+".pdb.pdb").__next__()  # only one file.
        # template = AllChem.MolFromSmiles(pmol.write('smi').split('\t')[0])
        # AllChem.AssignBondOrdersFromTemplate(template, rmol)
        # Chem.MolToSmiles(rdmol)
        # rdmol = Chem.MolFromMol2File()
        # AllChem.AssignAtomChiralTagsFromStructure(rmol)
        # AllChem.AssignAtomChiralTagsFromStructure(rmol)
        # AllChem.AssignStereochemistryFrom3D(rmol)
```





## openbabel

> - http://blog.molcalx.com.cn/2021/12/29/oechem-perceive-bond-orders.html
>
>   OEchem is a cool tool. Can we get a edu version? Most people don't have it? PubChem and CHARMM-GUI are using that.
>
> - 

### pybel and obabel

https://openbabel.github.io/api/3.0/classOpenBabel_1_1OBAtom.shtml

this might actually be cpp api, but it's callable in Python (boost package)

pybel is written 10 years ago!! but it's just calling `OBMol.obconversion.ReadFile`

so pybel is just a Python interface...

但可以通过pybelMol.OBMol下OBMol的methods来操纵这个pybelMol的结构！！

### read/write files

- write files

  ```python
  with Chem.SDWriter(prefix+'.sdf') as w:
      w.write(m)
  ```

- `obabel -isdf remtp.pdb.sdf -osmi` in cmd 等价于 `mol.write('smi')` in Python

- 

### file formats

- smiles: Configuration at tetrahedral carbon is specified by @ or @@. Consider the four bonds in the order in which they appear, left to right, in the SMILES form. Looking toward the central carbon from the perspective of the first bond, the other three are either clockwise or counter-clockwise. These cases are indicated with @@ and @, respectively (because the @ symbol itself is a counter-clockwise spiral).

  [obabel](https://openbabel.github.io/api/3.0/classOpenBabel_1_1OBTetrahedralStereo.shtml), [rdkit](https://www.rdkit.org/docs/source/rdkit.Chem.rdchem.html?highlight=rdkit%20chem%20rdchem%20chiraltype#rdkit.Chem.rdchem.ChiralType)

- smiles: 小写是芳香，大写是脂肪；可以带电荷

### examples

detect triple bonds and remove dihedrals

- obabel convert, to format
- openbabel (python) read PDB file
- get all bonds with bond order 3
- get the two atoms, find through the index
- your operations

> https://open-babel.readthedocs.io/en/latest/UseTheLibrary/PythonDoc.html
>
> http://openbabel.org/dev-api/classOpenBabel_1_1OBAtom.shtml



### other

https://pypi.org/project/chemdraw/

# Fundamental Python

## Basics

- python嵌套列表赋值，想更改其中一个元素但是一整列的元素都被更改,是什么原因呢，应该怎么修改？ - Demon的回答 - 知乎

  https://www.zhihu.com/question/355374988/answer/891028270

  always use for loop rather than multiplication...

- If there is a __init__.py file in a folder, which means this folder is a python model. __init__.py will be run when i import this model.

- [Python3字典合并的几种方法](https://blog.csdn.net/asialee_bird/article/details/79809248)

- [Python去除字符串左右两侧的数字](https://blog.csdn.net/Jason_WangYing/article/details/114080708)：`str1.rstrip(string.digits)`

  [python去除字符串中开头|结尾|所有字母、数字](https://cloud.tencent.com/developer/article/1610931)

  

## operating files and cmd

### about bash commands

- [调用外部进程的几种方法](https://juejin.cn/post/6912824179511263240)

  Python的os等包也并不是内置了shell的功能，而是调用。最好不要调用bash的东西，否则Windows下可能用不了。最好用Python内置的命令，比如os，也有更高级的

- `r = os.popen(cmd).read`: get bash output

- 

- 

- 

shutil是个增强版的：

- 
- 也没有grep

有时候os.system可能执行不完就开始进行下一个命令，但是文件还没有生成完，所以就会报错了。所以要用：

### subprocess

read more: https://docs.python.org/3/library/subprocess.html#frequently-used-arguments

- 调用后一直阻塞到执行结束：

  ```shell
  subprocess.call()
  ```

  `call()` cannot process output; `run()` cannot stuck until finished

  `subprocess.Popen()`有个`wait()`表示等待子进程结束，但不行？

- [subprocess.Popen重定向输出](https://blog.csdn.net/linxinfa/article/details/93595913) or [this](https://blog.csdn.net/weixin_39622628/article/details/111438771)

  ```python
  cp = subprocess.Popen(["grep", str(var)+".pdb"], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
  out, err = cp.communicate()
  ```

- PIPE本身可容纳的量比较小，所以程序会卡死，所以一大堆内容输出过来的时候，会导致PIPE不足够处理这些内容，因此需要将输出内容定位到其他地方，例如临时文件等

- `shell=True`: call shell; provide a single string as cmd is ok



### about path

- When we execute a Python script in cmd in another folder, os.curdir is still your cwd. i.e. cmd parameters is fine.

  But within a script, if you want to execute another file (in the same folder, like .tcl), it can still find it. All the output will be in your cwd.

  We usually don't need `exepath = os.path.dirname(sys.argv[0])`, nor any path when using `os.system()`.

- `os.walk()` : walk through all sub-folders. https://www.runoob.com/python/os-walk.html

- `os.getenv(PATH)`：获取环境变量（Windows/Linux通用），而不是`popen("which xxx")`

- [glob — Unix style pathname pattern expansion](https://docs.python.org/3/library/glob.html#module-glob).



### read and write

- If you want to write bytes then you should open the file in binary mode. `f = open('/tmp/output', 'wb')`

## matplotlib 

### fonts

- how to add fonts?

  - just copy .ttf files to `~/miniconda3/envs/work/lib/python3.7/site-packages/matplotlib/mpl-data/fonts/ttf`

    https://blog.csdn.net/qq_32442683/article/details/108298763

  - [use .ttf file](https://www.cnblogs.com/arkenstone/p/6411055.html)

    ```python
    from matplotlib.font_manager import FontProperties
    chinese_font = FontProperties(fname='/usr/share/fonts/MyFonts/YaHei.Consolas.1.11b.ttf')
    ...
    plt.text(x, y, display, fontsize=12, fontproperties=chinese_font)
    ```

  - find from somewhere else

    ```python
    font_dirs = ['/home/gxf1212/data/local-programs/Fonts']
    font_files = font_manager.findSystemFonts(fontpaths=font_dirs)
    for font_file in font_files:
        font_manager.fontManager.addfont(font_file)
    ```

  - [check usable Chinese font family in matplotlib](https://www.cnblogs.com/arkenstone/p/6411055.html)

    ```python
    from matplotlib.font_manager import FontManager
    import subprocess
    
    fm = FontManager()
    mat_fonts = set(f.name for f in fm.ttflist)
    
    output = subprocess.check_output(
        'fc-list :lang=zh -f "%{family}\n"', shell=True)
    output = output.decode('utf-8')
    # print '*' * 10, '系统可用的中文字体', '*' * 10
    # print output
    zh_fonts = set(f.split(',', 1)[0] for f in output.split('\n'))
    available = mat_fonts & zh_fonts
    
    print('*' * 10, '可用的字体', '*' * 10)
    for f in available:
        print(f)
    ```

    copy the results into `font_la = {'family': 'dengxian'}`. capitalization does not matter.

  - after installing font for the system (see [here](/techniques/Linux-fundamental#system-settings))

    ```python
    import matplotlib
    matplotlib.get_cachedir()
    ```

    `rm -rf` it! then just use the `available` fonts above. No need to configure as other blogs did.

    [after removing cache....](https://blog.csdn.net/u014712482/article/details/85802563)here's how we can check name for ![在这里插入图片描述](https://img-blog.csdnimg.cn/20190104211934391.jpg)

    ```python
    import matplotlib as plt
    import matplotlib.font_manager as font_manager
    fontpath = '/usr/share/fonts/truetype/msttcorefonts/simkai.ttf'
    prop = font_manager.FontProperties(fname=fontpath)
    print(prop.get_name())
    ```

  - choose a font

    ```python
    # global setting
    plt.rcParams['font.family'] = 'Machine Gunk'
    plt.rcParams['font.size'] = '14'
    
    # one-b
    font_la = {'family': 'Arial', 'weight': 'demibold', 'size': 16}
    plt.xlabel('time (ns)', fontdict = font_la)
    
    # or
    labels = ax.get_xticklabels() + ax.get_yticklabels()
    [label.set_fontname('Arial') for label in labels]
    [label.set_fontsize(12) for label in labels]
    [label.set_fontweight('roman') for label in labels]
    ```

  - 

## building softwares

### argparse

references

https://zhuanlan.zhihu.com/p/56922793

https://blog.csdn.net/xiaotianlan/article/details/119216435

https://docs.python.org/3/library/argparse.html

https://docs.python.org/3/howto/argparse.html

https://juejin.cn/post/6844903919978545160





- nargs是用来说明传入的参数个数， 

  - nargs='*' 表示参数可设置零个或多个 
  - nargs='+' 表示参数可设置一个或多个 
  - nargs='?' 表示参数可设置零个或一个

- this argument = True if defined, False if not in cmd

  ```python
  parser.add_argument('--feature', action=argparse.BooleanOptionalAction)
  ```

  but only works when python version >= 3.9. [history syntax](https://nono.ma/attributeerror-module-argparse-has-no-attribute-booleanoptionalaction)

- [dict 和 Namespace 之间的转换](https://goodgoodstudy.blog.csdn.net/article/details/106243837)

- `parser.print_help()`

  Why can't I `-h` on Windows??

- 互斥参数组：https://michael728.github.io/2018/12/09/python-argparse-note/ 

  <img src="E:\GitHub-repo\notes\MD\Programming-for-MD.assets\exclusive.png" alt="exclusive" style="zoom:80%;" />

- 



### warning

```python
with warnings.catch_warnings():
    warnings.simplefilter("ignore")
    your code without warning
```

but failed. if you call a method from other packages, warnings cannot be filtered.

even `python xx.py -W` didn't work

### other

https://docs.python.org/3/faq/programming.html#how-do-i-share-global-variables-across-modules

