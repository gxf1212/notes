# Programming for MD

see [here](/techniques/Prepare-for-the-computer.md) for installation

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

## file processing

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

6. 

## tools

1. download: an example

   ```shell
   for i in {1..19}; do
   wget https://ronlevygroup.cst.temple.edu/courses/2020_fall/chem5302/lectures/chem5302_lecture${i}.pdf --no-check-certificate
   done
   ```

2. 

# Tcl programming

https://sunxiaoquan.wordpress.com/2015/02/20/vmd-tcltk-output-results-to-the-text-file/ 

https://www.ks.uiuc.edu/Research/vmd/current/ug/node193.html 

https://wiki.tcl-lang.org/page/format

https://www.tcl.tk/man/tcl/TclCmd/foreach.html

```tcl
set x {}
foreach i {a b c} j {d e f g} {
    lappend x $i $j
}
```





# RDkit

> 

RDkit cannot read PDB files well...without connect, bond order info is lost. Assign from template? the molecule has to match exactly!





# openbabel

> http://blog.molcalx.com.cn/2021/12/29/oechem-perceive-bond-orders.html
>
> OEchem is a cool tool. Can we get a edu version? Most people don't have it?
>
> 

### 22.10.7

detect triple bonds and remove dihedrals

- obabel convert, to format
- openbabel (python) read PDB file
- get all bonds with bond order 3
- get the two atoms, find through the index
-  your operations

> https://open-babel.readthedocs.io/en/latest/UseTheLibrary/PythonDoc.html
>
> http://openbabel.org/dev-api/classOpenBabel_1_1OBAtom.shtml



# Fundamental Python

- python嵌套列表赋值，想更改其中一个元素但是一整列的元素都被更改,是什么原因呢，应该怎么修改？ - Demon的回答 - 知乎

  https://www.zhihu.com/question/355374988/answer/891028270

  always use for loop rather than multiplication...

- If there is a __init__.py file in a folder, which means this folder is a python model. __init__.py will be run when i import this model.

- 

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
    
    
    
  - a

## operate files and cmd

- When we execute a Python script in cmd in another folder, os.curdir is still your cwd. i.e. cmd parameters is fine.

  But within a script, if you want to execute another file (in the same folder, like .tcl), it can still find it. All the output will be in your cwd.

  We usually don't need `exepath = os.path.dirname(sys.argv[0])`, nor any path when using `os.system()`.

- `os.walk()` : walk through all sub-folders

- `r = os.popen(cmd).read`: get bash output



## building softwares

### argparse

https://zhuanlan.zhihu.com/p/56922793

https://blog.csdn.net/xiaotianlan/article/details/119216435

https://docs.python.org/3/library/argparse.html

https://docs.python.org/3/howto/argparse.html

https://juejin.cn/post/6844903919978545160



nargs是用来说明传入的参数个数， 

- nargs='*' 表示参数可设置零个或多个 
- nargs='+' 表示参数可设置一个或多个 
- nargs='?' 表示参数可设置零个或一个

### warning

```python
with warnings.catch_warnings():
    warnings.simplefilter("ignore")
    your code without warning
```

but failed. if you call a method from other packages, warnings cannot be filtered.

even `python xx.py -W` didn't work



