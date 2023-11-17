# Programming for MD

See [here](/techniques/Prepare-for-the-computer.md) for installation

This page doesn't include usage of pymol, vmd, gmx, etc. It's not just about basic programming. Specific tools are included.

# Bash (shell)

跟系统相关的，请阅读《Linux基础》

1. syntax error: unexpected end of file

   https://unix.stackexchange.com/questions/591208/fix-syntax-error-unexpected-end-of-file-in-a-for-loop

   可能是Windows下编辑的问题，MS-DOS CRLF line delimiters?

   解决：去unix编辑

2. 反斜杠后面紧跟回车，表示下一行是当前行的续行。

3. multiple paths:

   ```shell
   PATH='/path/one;path/two;...'
   ```

4. 在`=`运算符两边不能有空格。

5. 


## text processing

### string spliting

- delimiter

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

- exact length: `${parameter:offset:length}`

  ```shell
  f=unbound.fepout.csv
  ${f:1:3}  # nbo
  ${f:1:-3} # nbound.fepout.
  ${f: -1}  # the last char
  ```

  To get the last character of a string in a shell script, you can use the following command: `echo "${str: -1}"`. The space after the colon (:) is REQUIRED

- cut: split with any char

  ```shell
  cat /etc/passwd | head -n 5 | cut -d : -f 1
  ```

  > d: delimiter

- 

- 

### Output

- `printf "format" $variable`

### awk

- **awk必须单引号**



examples

- take all lines with "#Free energy", print the no. 8,9,12 word (separated by space) to the output file

  ```shell
  awk '/^#Free energy/ {printf "%.5f,%.5f,%.9f\n",$8,$9,$12}' ${fn}.fepout > ${fn}.csv
  ```
  
- I have a commas-separated file, please use awk to get the second element in each line and also filter those lines containing keyword 'spiro'Sent message. I have a commas-separated file, please use awk to get the second element in each line and also filter those lines containing keyword 'spiro'

  To use awk to get the second element in each line and also filter those lines containing keyword ‘spiro’, you can use a command like this:
  
  ```shell
  awk -F ',' '$0~/spiro/ {print $2}' file.csv
  ```
  
  This command will:
  
  - Use a comma (,) as the field separator (-F) for each line
  - Match lines that contain ‘spiro’ in any field ($0~/spiro/)
  - Print the second field ($2) of those lines
  - Read from file.csv

### sed

#### file search

- [bash - Sed: get lines beginning with some prefix - Stack Overflow](https://stackoverflow.com/questions/13202715/sed-get-lines-beginning-with-some-prefix/13202791#13202791)

  Try doing this :

  ```bash
  awk '/^RIM-COD/' file.txt
  ```

  Or

  ```bash
  grep "^RIM-COD" file.txt
  ```

  Or

  ```bash
  sed -n '/^RIM-COD/p' file.txt
  ```

- to support a varible, double quote! single does not work

#### file editing

- another most application: replacing text

  ```shell
  sed -i 's/to be replaced/to fill in/g'
  ```

  regex is supported. For example:

  ```shell
  sed -i "s/init-lambda-state.*/init-lambda-state = $jj/g" ../mdps/md_$jj.mdp
  ```

- `sed -i "s/#SBATCH -p quick/#SBATCH -p ${queue}/g" fe*.slurm.sh`
  
  - `"`: replace with varible value
  - `'`: keep ${string}
  
- range of action

  ```shell
  sed -i '1,/^\#include "amber99sb-star-ildn-mut.ff\/forcefield.itp"/d' topol_Protein_chain_H_hybrid.itp
  # remove everything before (including) something
  sed -i '/#ifdef POSRES/,$d' topol_Protein_chain_H_hybrid.itp
  # remove everything after  (including) something
  sed '0,/#ifdef POSRES/{s/#ifdef POSRES/#ifdef POSRES_abiss/}' top.top > newtop.top
  ```

  - `0,/#ifdef POSRES/`: This specifies a range of lines to search for the pattern. The range is defined from the beginning of the file (line 0) to the first line containing `#ifdef POSRES`.
  - `{s/#ifdef POSRES/#ifdef POSRES_abiss/}`: This is the substitution command within the specified range. It replaces the first occurrence of `#ifdef POSRES` with `#ifdef POSRES_abiss`.

- Append "This is a new line." before a line containing "Pattern":

  ```shell
  sed -i '/Pattern/i This is a new line.' input_file > output_file
  ```

  Append "This is a new line." after a line containing "Pattern":

  ```shell
  sed '/Pattern/a This is a new line.' input_file > output_file
  ```

  Append "This line goes after line 3." after the third line (at line 4):

  ```shell
  sed '3a This line goes after line 3.' input_file > output_file
  ```

  Insert "This line goes at line 3." at the third line:

  ```shell
  sed '3i This line goes at line 3.' input_file > output_file
  ```

  Append "This is the last line." after the last line of the file:

  ```shell
  sed '$a This is the last line.' input_file > output_file
  ```

  After running one of these commands, the modified content will be written to `output_file`. **If you want to edit the file in-place, you can use the `-i` option with `sed`**

- 

### alternative

If you don't want to or can't edit a file with varying filenames every time, you just create one. Variable values will be replaced.

```shell
cat > tleap.in << EOF
source leaprc.protein.ff14SB 
source leaprc.lipid21
source leaprc.water.tip3p
source leaprc.gaff
loadAmberPrep ${f}.prepi
loadamberparams ${f}.prepi.frcmod
sys = loadpdb system.pdb
charge sys
addIonsRand sys Cl- 13
addIonsRand sys Na+ 13
saveamberparm sys system.prmtop system.inpcrd 
quit
EOF
tleap -f tleap.in > tleap.log
```



## File processing

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
   ls -lh # proper magnitude
   ls -l --blocksize=g  # gb
   ```

2. 

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

## Control

### for loop



### if statement

1. shell-if表达式关于文件存在判断，变量比较判断用法

   https://blog.csdn.net/khx0910/article/details/106383294/

2. if 判断文件或目录是否存在

   https://blog.csdn.net/m0_38039437/article/details/100160042

### function

[Bash函数 - Bash Shell教程 (yiibai.com)](https://www.yiibai.com/bash/bash-functions.html)

### arguments of a script

1. `.sh` file has arguments: https://www.runoob.com/linux/linux-shell-passing-arguments.html

2. 默认参数(变量默认值) 比较low的方式

   ```shell
   if [ ! $1 ]; then
       $1='default'
   fi
   ```

3. 

### math

1. perform string: [[]]

   perform any math: (()) or between ``

   `$( )` to store any outputed number in a variable

   ```shell
   # e.g. 
   left_water=$(( $all_water - $removed_water ))
   ```

2. keep the calculated result

   ```shell
   i=`expr ${f:0-1} + 1`
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

## stdin stdout

### xargs

The `xargs` command is used to build and execute command lines from standard input. So, `xargs -n 1` means that `xargs` will use at most one argument per command line. For example:

```shell
rpm -qa | grep -i devel | xargs -n 1 dnf remove -y
```

### pipeline



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

3. 

4. 


## examples

1. download: an example of for loop

   ```shell
   for i in {1..19}; do
   wget https://ronlevygroup.cst.temple.edu/courses/2020_fall/chem5302/lectures/chem5302_lecture${i}.pdf --no-check-certificate
   done
   ```

   or

   ```shell
   for i in aa bb cc; do
   echo $i
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

2. 如果你想要更简单的方法来生成一个包含两位数字符串的数组，可以使用以下命令：

   ```shell
   numbers=($(seq -f "%02g" 1 20))
   ```

   这将创建一个名为`numbers`的数组变量，其中包含20个元素，每个元素都是一个两位数的字符串。
   你可以使用`${numbers[@]}`来访问数组中的所有元素。例如，要打印数组中的所有元素，可以使用以下命令：

   ```shell
   echo ${numbers[@]}
   ```

3. batch submit jobs

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

4. The error message "value too great for base" occurs because the leading zero in the number 09 is interpreted as an octal (base 8) number in Bash, and octal numbers cannot have a digit 9.
   To overcome this issue and generate the desired two-digit numbers with leading zeros, you can use the printf function with a format specifier. Here's an example:

   ```bash
   #!/bin/bash
   for ii in 09 10 11
   do
       jj=$(printf "%02d" $((10#$ii+1)))
       echo "ii: $ii, jj: $jj"
   done
   ```
   
   In this example, `10#$ii` is used to explicitly specify that the variable $ii should be interpreted as a base-10 number. The printf statement then formats the number with %02d, which ensures it is printed with two digits and leading zeros if necessary.


# Tcl programming

## String

- format strings: https://wiki.tcl-lang.org/page/format

- append something to a string: https://wiki.tcl-lang.org/page/append



## List

everything about lists https://zetcode.com/lang/tcl/lists/

- `llength $list`: Count the number of elements in a list

- [Adding & Deleting members of a list (tcl.tk)](https://tcl.tk/man/tcl8.5/tutorial/Tcl15.html)

  ```tcl
  lappend listName ?arg1 arg2 ... argn?
  ```

- [从 Tcl 中的列表中删除重复元素 - IT工具网 (coder.work)](https://www.coder.work/article/6876472)

  ```tcl
  set uniqueList [lsort -unique $myList]
  ```

- 



## Vector

Everything: https://www.ks.uiuc.edu/Research/vmd/current/ug/node193.html 



## Control

- if...else

  ```tcl
  if {boolean_expression} {
    # statement(s) will execute if the boolean expression is true 
  } else {
    # statement(s) will execute if the boolean expression is false
  }
  ```

- for loop

  ```tcl
  for {set i 1} {$i <= 8} {incr i} { 
  	puts $i 
  } 
  ```

- foreach: https://www.tcl.tk/man/tcl/TclCmd/foreach.html

  [TCL foreach的用法-CSDN博客](https://blog.csdn.net/ciscomonkey/article/details/118881550)

  ```tcl
  set list {1 2 3 4 5}
  foreach item $list {
      puts $item
  }
  ```

  multiple lists:

  ```tcl
  set x {}
  foreach i {a b c} j {d e f g} {
      lappend x $i $j
  }
  ```

- 



## Files

- [Output results to the text file](https://sunxiaoquan.wordpress.com/2015/02/20/vmd-tcltk-output-results-to-the-text-file/)
- https://wiki.tcl-lang.org/page/file+delete



## Function

[Tcl Tutorial 笔记9 · proc 参数传递与return_tcl proc { a 16}_Taurus_ZSZ的博客-CSDN博客](https://blog.csdn.net/qq_39597489/article/details/111411707)

```tcl
proc example {first {second ""} args} {
    if {$second eq ""} {
        puts "There is only one argument and it is: $first"
        return 1
    } else {
        if {$args eq ""} {
            puts "There are two arguments - $first and $second"
            return 2
        } else {
            puts "There are many arguments:\n$first and $second and $args"
            return "many"
        }
    }
}

set count1 [example ONE]
set count2 [example ONE TWO]
set count3 [example ONE TWO THREE]
set count4 [example ONE TWO THREE FOUR]

puts "The example was called with a varying number of arguments:"
puts "    $count1, $count2, $count3, and $count4"
```





# Fundamental Python

## Basics

- python嵌套列表赋值，想更改其中一个元素但是一整列的元素都被更改,是什么原因呢，应该怎么修改？ - Demon的回答 - 知乎

  https://www.zhihu.com/question/355374988/answer/891028270

  always use for loop rather than multiplication...

- If there is a __init__.py file in a folder, which means this folder is a python model. __init__.py will be run when i import this model.

- [Python3字典合并的几种方法](https://blog.csdn.net/asialee_bird/article/details/79809248)

- [Python去除字符串左右两侧的数字](https://blog.csdn.net/Jason_WangYing/article/details/114080708)：`str1.rstrip(string.digits)`

  [python去除字符串中开头|结尾|所有字母、数字](https://cloud.tencent.com/developer/article/1610931)

- [Python 中下划线的 5 种含义 | 菜鸟教程 (runoob.com)](https://www.runoob.com/w3cnote/python-5-underline.html)

  <img src="https://cdn.jsdelivr.net/gh/gxf1212/notes@master/research/Programming-for-MD.assets/underline.png" alt="underline" style="zoom:50%;" />

- [Convert Letters to Numbers and vice versa in Python | bobbyhadz](https://bobbyhadz.com/blog/python-convert-letters-to-numbers): `chr()`, `ord()`

- pmx倒是有个规范：类内方法都是下划线开头

- `assert`: https://www.tutorialsteacher.com/python/python-assert
  应该assert还是try except呢？后处理内容比较多、不一定退出程序时，只能用except
  
- for a directory

  ```
  - utils.py
  - folder
    - my.py
  ```

  In `my.py`, you can import utils.py using the following code. If you don't want to convert your directory structure into a package, you can modify the import statement to use an absolute import:

  ```python
  import sys
  import os
  sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
  import utils
  ```

  

  
  


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

有时候`os.system`可能执行不完就开始进行下一个命令，但是文件还没有生成完，所以就会报错了。所以要用：

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

- `os.walk()` : walk through all sub-folders. see https://www.runoob.com/python/os-walk.html

- `os.getenv(PATH)`：获取环境变量（Windows/Linux通用），而不是`popen("which xxx")`

  也可以使用 `os` 模块中的 `os.environ` 和 `os.pathsep` 来获取 `PATH` 环境变量并将其转换为目录列表。下面是一个示例代码：

  ```
  import os
  
  path = os.environ['PATH']
  dirs = path.split(os.pathsep)
  
  print(dirs)
  ```

  这段代码首先从 `os.environ` 字典中获取 `PATH` 环境变量的值，然后使用 `os.pathsep`（路径分隔符）将其分割为目录列表。最后，打印出目录列表。

- [glob — Unix style pathname pattern expansion](https://docs.python.org/3/library/glob.html#module-glob).



### read and write

- If you want to write bytes then you should open the file in binary mode. `f = open('/tmp/output', 'wb')`

## matplotlib 



### spines

```python
for axis in ['top','bottom','left','right']:
    ax.spines[axis].set_linewidth(30)  #设置坐标轴的粗细
    ax.spines[axis].set_color("gold")
    ax.spines[axis].set_zorder(0)
```



If you want to set this for *all* the ticks in your axes,

```python
ax = plt.gca()
ax.tick_params(width=5,...)
```



### Other about plot

[python翻转和旋转图片 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/53492846)



### fonts

- how to add fonts?

  - just copy .ttf files to font dir  [Linux下的python修改画图的字体](https://blog.csdn.net/qq_32442683/article/details/108298763)

    ```python
    import os
    import matplotlib
    font_directory = os.path.join(matplotlib.get_data_path(), 'fonts', 'ttf')  # ~/miniconda3/envs/work/lib/python3.7/site-packages/matplotlib/mpl-data/fonts/ttf
    os.system("copy *.ttf *.TTF "+font_directory)  # cp for Unix
    cache_dir = matplotlib.get_cachedir()
    os.system("rm -r "+cache_dir)  # /home/gxf1212/.cache/matplotlib
    # re-import matplotlib
    ```
  
  - [use .ttf file temporarily](https://www.cnblogs.com/arkenstone/p/6411055.html)
  
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
  
    [after removing cache....](https://blog.csdn.net/u014712482/article/details/85802563)here's how we can check name for ![](https://img-blog.csdnimg.cn/20190104211934391.jpg)

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
  
- use font dictionary for labels, etc.

  ```python
  
  ```

- 渲染LaTeX公式是matplotlib自己的功能，Python本身不具有

  simply `$\your \equation$` in a string

- 

### coloring

- color bars according to value gradient:

  ```python
  cmap = plt.cm.get_cmap('gist_rainbow')  # viridis, Set3, tab20b, Paired, winter
  norm = plt.Normalize(min(y), max(y))
  plt.bar(x, y, color=cmap(norm(y)), alpha=0.5)
  ```

- 

### seaborn

- [Python 绘制列表数据的小提琴图Violin Plot](https://zhuanlan.zhihu.com/p/596479904)  better than `plt.violinplot`

  [Python数据可视化的例子——小提琴图（violin）](https://blog.csdn.net/weixin_48615832/article/details/108452781)



## pandas

- 通过指定行及列索引号进行索引, 返回DataFrame对象

  ```shell
  df.iloc[[0, 1], [1, 2]]
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

  <img src="https://cdn.jsdelivr.net/gh/gxf1212/notes@master/research/Programming-for-MD.assets/exclusive.png" alt="exclusive" style="zoom:80%;" />

- `parser.print_help()`

  `parser.parse_args(['-h'])`: just exits here and print help

- 

### logging

In Python’s `logging` module, there are several methods you can use to log messages of different levels of severity. Here are some examples:

```python
import logging

logging.debug('This is a debug message.')
logging.info('This is an informational message.')
logging.warning('This is a warning message.')
logging.error('This is an error message.')
logging.critical('This is a critical message.')
```

The logging levels in Python’s logging module are used to indicate the severity of log messages. The available levels, in increasing order of severity, are: DEBUG, INFO, WARNING, ERROR, and CRITICAL. When you log a message using one of the logging methods (debug, info, warning, error, or critical), the message is only recorded if its level is greater than or equal to the logging level of the logger and all its handlers.

### pyinstall



it requires a few minutes to pack up...

### warning

```python
with warnings.catch_warnings():
    warnings.simplefilter("ignore")
    your code without warning
```

but failed. if you call a method from other packages, warnings cannot be filtered.

even `python xx.py -W` didn't work

### other

- https://docs.python.org/3/faq/programming.html#how-do-i-share-global-variables-across-modules
- When a project reaches major version v1 it is considered stable.

### Debug

- [AttributeError: partially initialized module ''has no attribute''(most likely due to a circular import](https://blog.csdn.net/c_lanxiaofang/article/details/103997425)

  Don't name your .py file the same as any package you're going to import.

- 





# Small molecule

## File formats

mol2:

- [谈谈记录化学体系结构的mol2文件](http://sobereva.com/655)
  - mol2文件里以#作为第一列的是注释行，空行也被完全无视。mol2文件是自由格式，因此空格数目完全随意。
  - 即便你不想定义原子所属的子结构信息而只想定义原子电荷，也必须随便写上子结构序号和子结构名字来占位，比如此例用0 UNK0来占位。
- https://chemicbook.com/2021/02/20/mol2-file-format-explained-for-beginners-part-2.html
- http://chemyang.ccnu.edu.cn/ccb/server/AIMMS/mol2.pdf
- [mol2 format in details](https://www.structbio.vanderbilt.edu/archives/amber-archive/2007/att-1568/01-mol2_2pg_113.pdf)

## RDkit

- [The RDKit Documentation](https://www.rdkit.org/docs/index.html)
- The RDKit blog is now hosted here: https://greglandrum.github.io/rdkit-blog/

### Fundamental

- RDkit is stronger in ipynb



### Read/Write/Convert

- 



### Working with Molecules



### Draw molecule

#### Draw.MolToImage

Simply the structure

- `Draw.MolsToGridImage` is equivalent to typing the Mol variable in ipynb

- show structure quickly (not in jupyter notebook): 

  ```python
  from rdkit import Chem
  def see_mol(mol):
      newmol = Chem.MolFromSmiles(Chem.MolToSmiles(mol))  # make it 2D
      Chem.Draw.MolToImage(newmol, size=(600, 600)).show()
  ```

  直接画三维的反倒看不清

  RDKit isn't actually adding Hs here, it just recognizes that the P atoms have implicit Hs on them and then when drawing the molecule shows those implicit Hs.

- with highlighting:

  ```python
  def see_highlight(mol, option):
      newmol = Chem.MolFromSmiles(Chem.MolToSmiles(mol))
      if option == 'chiral':
      	highlightatms = [atm.GetIdx() for atm in newmol.GetAtoms() if str(atm.GetChiralTag()).startswith('CHI_TETRAHEDRAL') and atm.GetAtomicNum() == 6]
      elif option == 'aromatic':
          aromatic = [atm.GetIdx() for atm in newmol.GetAtoms() if atm.GetIsAromatic()]
      Chem.Draw.MolToImage(newmol, size=(600, 600), highlightAtoms=highlightatms).show()
  ```

- different colors?

  ```python
  highlight = a list of indices of the mol to be highlighted
  highlight_map = {}
  for h in highlight:
      highlight_map[h] = (1, 1, 0.6)   # color
  ```

- [RDKit: New drawing options in the 2020.03 release](http://rdkit.blogspot.com/2020/04/new-drawing-options-in-202003-release.html)

<img src="https://cdn.jsdelivr.net/gh/gxf1212/notes@master/research/Programming-for-MD.assets/draw-highlight.png" style="zoom: 67%;" />



#### Other

- rdkit确实改不了字体

- [MartonVass_MCSAlignedDepiction.ipynb (github.com)](https://gist.github.com/greglandrum/82d9a86acb3b00d3bb1df502779a5810)

  https://www.jianshu.com/p/b0148c74e85d 

- 

  - 



#### MolDraw2D

```python
# python /home/gxf1212/data/work/analysis/draw_charge.py xx.mol2 <xx.str/rtf/mol2>
# visualize ligands with charges. support charges from mol2/itp file or CgenFF rtf/str file
# note that order of atoms must be the same! And the xx.mol2 is totally correct!

import sys, io, re
from rdkit import Chem
from rdkit.Chem import Draw, AllChem
from PIL import Image

file = sys.argv[1]
cfile = sys.argv[2] if len(sys.argv) >= 2 else None
edge = 1200

mol = Chem.MolFromMol2File(file, removeHs=False, sanitize=False)
_ = AllChem.Compute2DCoords(mol)

d = Draw.rdMolDraw2D.MolDraw2DCairo(edge, edge)
opt = d.drawOptions()
opt.baseFontSize = 0.45  # default 0.6

charges = get_charge(cfile)
for i in range(len(mol.GetAtoms())):
    atom = mol.GetAtomWithIdx(i)
    atom.SetProp('atomNote', "%.3f" % charges[i])
    # atom.SetProp('molAtomMapNumber', index)  # only numbers are accepted
    opt.atomLabels[i] = atom.GetSymbol()

d.DrawMolecule(mol)
d.FinishDrawing()
Image.open(io.BytesIO(d.GetDrawingText())).show()
```

how to get charges?

```python
def get_charge(cfile):
    # assuming orders match that in .mol2 file
    lines = open(cfile, 'r').readlines()
    charges = []
    if cfile.endswith('.itp'):
        for i in range(len(lines)):
            if lines[i].startswith('[ atoms ]'):
                start = i+2
            elif lines[i].startswith('[ bonds ]'):
                end = i-2  # one space from previous section
                break
        for i in range(start, end+1):
            fields = re.split('\\s+', lines[i])
            charges.append(float(fields[7]))
    elif cfile.endswith('.str') or cfile.endswith('.rtf'):
        for i in range(len(lines)):
            if lines[i].startswith('GROUP  '):
                start = i+1
            elif lines[i].startswith('BOND '):
                end = i-2  # one space from previous section
                break
        for i in range(start, end+1):
            fields = re.split('\\s+', lines[i])
            charges.append(float(fields[3]))
    elif cfile.endswith('.mol2'):
        start = len(lines)
        for i in range(len(lines)):
            if lines[i].startswith('@<TRIPOS>ATOM'):
                start = i+1
            elif lines[i].startswith('@<TRIPOS>') and i > start:
                end = i-1  # no space from previous section
                break
        for i in range(start, end+1):
            fields = re.split('\\s+', lines[i])
            charges.append(float(fields[9]))
    return charges
```

Result

<img src="https://cdn.jsdelivr.net/gh/gxf1212/notes@master/research/Programming-for-MD.assets/draw-charge.jpg" style="zoom: 50%;" />

#### Draw ligand libraries

a series of ligands with similar backbone, for screening or FEP. Align them 2D first.

```python
from rdkit import Chem, Geometry
from rdkit.Chem import Draw, AllChem, rdFMCS


def align_mols_2d(mols):
    mcs = Chem.rdFMCS.FindMCS(mols, atomCompare=rdFMCS.AtomCompare.CompareAny,
                              bondCompare=rdFMCS.BondCompare.CompareAny, ringMatchesRingOnly=True)
    core = Chem.MolFromSmarts(mcs.smartsString)  # common structure
    _ = AllChem.Compute2DCoords(core)
    for i in range(len(mols)):
        _ = AllChem.Compute2DCoords(mols[i])  # resolve clashes
        # _ = AllChem.EmbedMolecule(mols[i])  # same as the above
        _ = AllChem.GenerateDepictionMatching2DStructure(mols[i], core)  # all align to core
        _ = AllChem.NormalizeDepiction(mols[i])

        
file = 'xxx.smi'
mols = []
lines = open(file, 'r').readlines()
for smi in lines:
    mols.append(Chem.MolFromSmiles(smi.strip()))
legends = [str(i+1) for i in range(len(mols))]  # whatever rules
align_mols_2d(mols)
img = Draw.MolsToGridImage(mols, molsPerRow=12, subImgSize=(300, 300), useSVG=True, legends=legends)
with open(file+'.svg', 'w') as f:
    f.write(img)
```

Result

![](https://cdn.jsdelivr.net/gh/gxf1212/notes@master/research/Programming-for-MD.assets/draw-library.png)

- ligands with different scafford, not well aligned...

- allowRGroups=True, H positions might change (extension), neither better nor worse

  [rdkit.Chem.rdDepictor.GenerateDepictionMatching2DStructure](https://www.rdkit.org/docs/source/rdkit.Chem.rdDepictor.html#rdkit.Chem.rdDepictor.GenerateDepictionMatching2DStructure)

#### with matplotlib

[add rdkit image into matplotlib image](https://gist.github.com/iwatobipen/1b384d145024663151b3252bf16d2aa8) 

```python
# put two Image.open(io.BytesIO(d.GetDrawingText())) horizontally together, a temporary solution
font = {'family': 'Arial', 'weight': 'demibold', 'size': edge/50}
fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(edge/100*2, edge/100), dpi=100, subplot_kw={'aspect': 'equal'})
fig.subplots_adjust(wspace=0, hspace=0)
ax1.axis('off')
ax1.imshow(imgs[0])
ax1.text(0.5, 0.03, 'Reference', transform=ax1.transAxes, fontdict=font,
         verticalalignment='bottom', horizontalalignment='center')
ax2.axis('off')
ax2.imshow(imgs[1])
ax2.text(0.5, 0.03, 'Mutant', transform=ax2.transAxes, fontdict=font,
         verticalalignment='bottom', horizontalalignment='center')
buf = io.BytesIO()
fig.savefig(buf)
buf.seek(0)
Image.open(buf).show()
```




### Substructure search

让RDkit得到正确的手性信息：除了一一对应pybel和rdkit的原子，去改那个chiralTag，估计没啥好办法



> other
>
> - R里面的MCS search：https://academic.oup.com/bioinformatics/article/29/21/2792/195951
> - [RDKit blog - 3D maximum common substructure](https://greglandrum.github.io/rdkit-blog/posts/2022-06-23-3d-mcs.html)





### Utilities

- https://www.rdkit.org/docs/source/rdkit.Chem.rdmolops.html
- https://www.rdkit.org/docs/source/rdkit.Chem.AllChem.html



Assign bond order的过程，虽然可能改变smiles或者说这个原子上连了几个氢，但事实上在find mcS的过程中，还是用原来pdb的氢去align的

I'm using a modified version of `AssignBondOrdersFromTemplate` that does not set the number of explicit hydrogens.





### Fingerprint

[rdkit.Chem.rdMolDescriptors module — The RDKit documentation](https://www.rdkit.org/docs/source/rdkit.Chem.rdMolDescriptors.html?highlight=maccs)



### Other

[add_formal_charges.ipynb](https://gist.github.com/greglandrum/7f546d1e35c2df537c68a64d887793b8)



#### about pdb file

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

usage

```shell
import openbabel
import pybel
mymol = pybel.readstring("smi", "CCCC")
```

conda installed openbabel contains the cmd command `obabel`

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



# Modeling and analysis

## ParmEd

### Convert among MD engines

In ParmEd, the `idx` attribute of a `Residue` object represents the index of the residue in the `Structure` object that contains it. This attribute is automatically set and updated by ParmEd and should not be changed manually.

Though, we can modify residue numbers for Amber files

#### amber2gmx

```python
# both .gro and .top
# python ../convert_amber2gmx_via_parmed.py pro 688

import parmed as pmd 
import sys
prefix = sys.argv[1]
offset = int(sys.argv[2])
amber = pmd.load_file(prefix+'.prmtop', prefix+'.inpcrd')

for residue in amber.residues:
    _ = residue.idx
    residue._idx += offset
    residue.number += offset
# 'all': maintain order. Option combine is from the following two functions, under parmed/gromacs/gromacstop/gro.py
# pmd.gromacs.GromacsGroFile.write(amber, prefix+'.gro', combine='all')
# pmd.gromacs.GromacsTopologyFile.from_structure(amber).write(prefix+'.top', combine='all')
amber.save(prefix+'.top', overwrite=True, combine='all')
amber.save(prefix+'.gro', overwrite=True, combine='all')
```

> call `.idx` before assigning value for `._idx`, works.....removing `residue._idx += offset` just causes no edit, and `residue.idx = xx` is not allowed (protected)
>
> remember that _a is not a private variable...
>
> https://parmed.github.io/ParmEd/html/_modules/parmed/gromacs/gromacstop.html#GromacsTopologyFile.from_structure
>
> https://parmed.github.io/ParmEd/html/_modules/parmed/topologyobjects.html#Residue



#### charmm2gmx

```python
# both .gro and .top
# python convert_charmm2gmx_via_parmed.py pro 688

import parmed as pmd 
from parmed.charmm import CharmmParameterSet
import sys
prefix = sys.argv[1]
offset = int(sys.argv[2])

structure = pmd.load_file(prefix+'.psf')
for residue in structure.residues:
    _ = residue.idx
    residue._idx += offset
    residue.number += offset
parameter = CharmmParameterSet('par_all36m_prot.prm', 'toppar_water_ions_namd.str')  # add more if necessary
# parmed does not realize that gmx adopts the absolute value while charmm files store the real value (negative!)
for atomname, atomtype in parameter.atom_types.items():
    atomtype.epsilon *= -1
    atomtype.epsilon_14 *= -1
structure.load_parameters(parameter)
structure.save(prefix+'.top', overwrite=True, combine='all')
structure = pmd.load_file(prefix+'.pdb')
structure.save(prefix+'.gro', overwrite=True, combine='all')
```

> !NOTE
>
> `par_all36m_prot.prm`, officially all atom types are commented, but should not for parmed, or it cannot find atomtypes. 
>
> Other such files may have similar problems.



#### gmx2amber

```python
# python gmx2amber.py aloh

import parmed as pmd
import sys
prefix = sys.argv[1]

parm = pmd.load_file(prefix+'.itp', prefix+'.gro')
parm.write(prefix+'.prmtop')
parm.write(prefix+'.inpcrd')
```

not tried (see [problems](#problems)). so is it possible to convert to `.prepin` files?



#### renumber gmx files

```python
# python gmx_renumber_via_parmed.py pro 688

import parmed as pmd 
import sys
prefix = sys.argv[1]
offset = int(sys.argv[2])
gmx = pmd.load_file(prefix+'.top', prefix+'.gro')

for residue in gmx.residues:
    _ = residue.idx
    residue._idx += offset
    residue.number += offset
gmx.remake_parm()
gmx.save(prefix+'.top', overwrite=True)
gmx.save(prefix+'.gro', overwrite=True)
```





### Problems

- It seems you are getting a ParameterError from ParmEd because it found unequal bond types defined between AL3+ and ow atoms in your Gromacs topology file. This means that there are different bond parameters for the same pair of atom types, which is not allowed by Amber force field. You need to either assign different atom types to the atoms that have different bond parameters, or use a single bond parameter for all AL3±ow bonds.

  > In your GROMACS file, each bond term is specified independently. In CHARMM, however, parameters are defined between different atom types, which makes it impossible (by definition) to define different bond terms between two pairs of atoms that have the same sets of atom types.

  https://github.com/ParmEd/ParmEd/blob/master/parmed/parameters.py
  https://github.com/ParmEd/ParmEd/issues/1111
  https://github.com/ParmEd/ParmEd/issues/968

  In short: gmx .top should not contain different parameters (written right after bonds, angles, etc., e.g. asymmetric $\ce{Al(OH)(H2O)5^2+}$ generated by sobtop) when converting to Amber files. strange! Amber parameters are explicitly written. Charmm not.





## MDAnalysis

### Basics

#### read data

```python
import MDAnalysis as mda
u = mda.Universe('md.tpr', 'md.xtc')  # gmx
u = mda.Universe('pro.prmtop', 'md.nc')  # Amber
```



#### selection

[3. Selection commands — MDAnalysis 2.5.0 documentation](https://docs.mdanalysis.org/stable/documentation_pages/selections.html)

Mostly looks like vmd syntax



> https://github.com/MDAnalysis/mdanalysis/issues/2082
> In MDAnalysis, you can select atoms using a syntax very similar to CHARMM’s atom selection syntax. However, there isn’t a built-in keyword to select all lipids in a Universe



#### work through all frames

```python
for i in range(len(u.trajectory)):
    u.trajectory[i]
    ...
```



### GromacsWrapper

https://gromacswrapper.readthedocs.io/en/latest/



## NetworX

### basics

In NetworkX, you can add nodes to a graph using the `add_node` method. You can specify the name of the node as the first argument to this method. For example:

```python
import networkx as nx

G = nx.Graph()
G.add_node('A')
G.add_node('B')
```

This will create a new graph `G` with two nodes named `'A'` and `'B'`.
To add edges between nodes, you can use the `add_edge` method. This method takes two arguments, which are the names of the nodes that you want to connect with an edge. For example:

```python
G.add_edge('A', 'B')
```

This will add an edge between nodes `'A'` and `'B'`.
If you want to add edges by node index instead of node name, you can use the `nodes` attribute of the graph to get a list of nodes and then use indexing to access the nodes by their index. For example:

```python
nodes = list(G.nodes)
G.add_edge(nodes[0], nodes[1])
```

This will add an edge between the first and second nodes in the graph.

