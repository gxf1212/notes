# Statistical Mechanics and Molecular Simulation

Get the textbook: [Tuckerman, M. E. (2010). Statistical mechanics: Theory and molecular simulation. Oxford: Oxford University Press.](https://gitee.com/gxf1212/notes/raw/master/course/Physics-biophysics/statistical-mechanics/Mark-E-Tuckerman-Statistical-Mechanics-Theory-and-Molecular-Simulation-Oxford-University-Press-USA-(2010).pdf)

Since there's too many equations to number and refer to, I'll write this in LaTeX.

Just read the following PDF.



```pdf
https://raw.githubusercontent.com/gxf1212/notes/master/course/Physics-biophysics/statistical-mechanics/demo.pdf
```



<i src="https://mozilla.github.io/pdf.js/web/viewer.html?file=https://raw.githubusercontent.com/gxf1212/notes/master/course/Physics-biophysics/statistical-mechanics/demo.pdf" height=800px; width=100%>




Other

> failed bacause a download session starts and no preview...
>
> ````
> ```pdf
> https://raw.githubusercontent.com/gxf1212/notes/master/course/Physics-biophysics/statistical-mechanics/demo.pdf
> ```
> ````
>
> failed because gitee doesn't show until login...
>
> ````
> ```pdf
> https://gitee.com/gxf1212/notes/raw/master/course/Physics-biophysics/statistical-mechanics/demo.pdf
> ```
> ````
>
> another method might be (no plugin required?...
>
> ```html
> <embed src="https://mozilla.github.io/pdf.js/web/viewer.html?file=https://raw.githubusercontent.com/gxf1212/notes/master/course/Physics-biophysics/statistical-mechanics/demo.pdf" height=800px; width=100%>
> ```
>
> failed
>
> ```
> <script type="text/javascript">
>   //loads pdf files for resume
>   window.onload = function (){
>     var success = new PDFObject({ 
>       url: "https://raw.githubusercontent.com/gxf1212/notes/master/course/Physics-biophysics/statistical-mechanics/demo.pdf" 
>     }).embed("my_pdf_object");
>   };
> </script>
> ```
>
> 


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

