# Statistical Mechanics and Molecular Simulation

Get the textbook: [Tuckerman, M. E. (2010). Statistical mechanics: Theory and molecular simulation. Oxford: Oxford University Press.
](https://gitee.com/gxf1212/notes/raw/master/course/Physics-biophysics/statistical-mechanics/(Oxford%20Graduate%20Texts)%20Mark%20E.%20Tuckerman%20-%20Statistical%20Mechanics_%20Theory%20and%20Molecular%20Simulation-Oxford%20University%20Press,%20USA%20(2010).pdf)

Since there's too many equations to number and refer to, I'll write this in LaTeX.

Just read the following PDF.



```pdf
/course/Physics-biophysics/statistical-mechanics/demo.pdf
```

```pdf
/course/Physics-biophysics/statistical-mechanics/(Oxford%20Graduate%20Texts)%20Mark%20E.%20Tuckerman%20-%20Statistical%20Mechanics_%20Theory%20and%20Molecular%20Simulation-Oxford%20University%20Press,%20USA%20(2010).pdf
```


> another method might be (no plugin required? failed)
>
> ```html
> <embed src="https://mozilla.github.io/pdf.js/web/viewer.html?file=https://gitee.com/gxf1212/notes/raw/master/course/Physics-biophysics/statistical-mechanics/demo.pdf" height=800px; width=100%>
> ```



To use [QYXF LaTeX template](https://gitee.com/qyxf/qyxf-book) in English:

- change all `ctexbook` into `book`; comment the `\ctexset` command

- `\titleformat{\chapter}.....`

- `\renewcommand{\tablename}{Tab.}`, etc.

- if you'd like to include a little Chinese, add `\usepackage{ctex}` **before** the section title settings
  - `\ctexset` in .cls cannot be used...just for ctexbook?
  
- date: `\ctexset{today=old}`

- change `作品信息、环境名称` in the .cls

- you may also want to modify `\titlecontents` (and other customization)

- installing the font

  > 可以在 `D:\texlive\2020\texmf-dist\fonts\opentype`（你看你的安装目录）下找一个合适的位置，建一个文件夹，把字体拷进去，或把字体压缩包解压到那里，然后在命令行中输入，`fc-cache -fv`
  >
  > 如果已经从网上正确下载安装了字体，但是仍然报错的话，可以点击右键，选择**为所有用户安装**就可以

  I'm using XITS as the "mainfont" but the default math font

- LaTeX法语 https://www.icode9.com/content-4-1230085.html

