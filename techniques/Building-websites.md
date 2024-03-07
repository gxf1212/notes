# Building websites

I've tried docsify, sphinx and hexo

# Build a note site with docsify

Docsify makes it easy to create a documentation website, but is not a static-site generator and is not SEO friendly.

## References

read through the official! https://docsify.js.org/#/quickstart  生成那种模块API的，或者学习笔记的一个框架

also learn settings and styles from [docsify-themeable/docs at master · jhildenbiddle/docsify-themeable (github.com)](https://github.com/jhildenbiddle/docsify-themeable/tree/master/docs)

some translated doc: [javascript - docsify - 生成文档网站简单使用教程 - 个人文章 - SegmentFault 思否](https://segmentfault.com/a/1190000017576714) 

a lot of fancy features: [小四先生的栈 (zxiaosi.cn)](https://zxiaosi.cn/archives/cd1d42d1.html)      [Docsify文档系统 (yumefx.com)](https://www.yumefx.com/?p=5310)

## Basics

You should know some html, javascript, ...

1. installation

   Windows: Node.js; Unix: `sudo apt install npm`

   ```shell
   sudo npm i docsify-cli -g
   npm i docsify-cli -g	# windows
   ```

2. serve locally

   ```shell
   docsify serve ./ # http://localhost:3000
   ```

3. the first subtitle is not included into the sidebar

Basic functions

- visualize .md as html
- customize sidebar, navbar, cover page
  - write links by yourself
  - can show any .md as TOC
- plug-in, 留言、访问计数 etc 

easier than hexo, ...

### Elements

#### Pages

```html
window.$docsify = {
    homepage: true, // default name: README.md
    coverpage: true, //default: _coverpage.md
    homepage: 'README.md', // specify file name
    coverpage: '/_coverpage.md',
    // sidebar, navbar are similar
}
```

https://docsify.js.org/#/cover  cover page customize, multiple cover

Actually we can assign a cover or home page for every subdirectory using the default file name (README, _coverpage). But it seems that it’s only necessary for **course notes**.

#### Sidebar

https://docsify.js.org/#/more-pages?id=nested-sidebars

- `_sidebar.md`的加载逻辑是从每层目录下获取文件，如果当前目录不存在该文件则回退到上一级目录。
- 配置`alias`字段后，所有页面都会显示项目根目录`_sidebar.md`文件的配置作为侧边栏，子目录的`_sidebar.md`文件会失效。
- 需要在 `./docs` 目录创建 `.nojekyll` 命名的空文件，阻止 GitHub Pages 忽略命名是下划线开头的文件。

it seems that bars and cover must be put in root because the subdirectories have their own...

but after introducing the “sidebar collapse”, I don’t think the sidebar is messy any more. you can come back to other notes through it easily. The navbar is not used. 

Also, the sidebar should be further beautified (**colored**) to clarify the file structure. And the text size in vue?



.list最后一行不要留空的"- "

### Beautify

#### Cover

```html
// multiple covers and custom file name
coverpage: {
    '/': 'cover.md',
    '/zh-cn/': 'cover.md',
  },

// logo
window.$docsify = {
  logo: '/_media/icon.svg',
};
```

background (for `vue.css`)

```markdown
in coverpage.md
![color](#f0f0f0)
![](_media/bg.png)
```

#### Theme

4 official themes: [Themes](https://docsify.js.org/#/themes) and dolphin

```html
<link rel="stylesheet" href="//cdn.jsdelivr.net/npm/docsify@4/lib/themes/vue.css">
<!-- should not miss // and @4! -->
```

some others [Awesome docsify themes](https://docsify.js.org/#/awesome?id=themes)

> [docsify-darklight-theme](https://docsify-darklight-theme.boopathikumar.me/#/)

If you want to modify a theme, download from cdn website rather than GitHub!

> notes
> 
> docsify-themeable is less compatible with 推免服务系统.html
> 
> vue’ s sidebar needs improving

[docsify-darklight-theme](https://docsify-darklight-theme.boopathikumar.me/#/configuration): only color (no format) is cha

### Show figures

省流：

```html
<img src="https://cdn.jsdelivr.net/gh/user-name/repo-name@master/path/to/figure" style="zoom:50%;" />
```

to attach files, we can only also paste the cdn path, not the relative path, to show them **correctly both locally and in website**.

rename: 以后notes site需要批量调整文件名，还得是用Linux的命令

```shell
sed -i 's/E:\\GitHub-repo\\notes\\techniques\\images\\/https\:\/\/cdn.jsdelivr.net\/gh\/gxf1212\/notes\@master\/techniques\/images/g' *.md

sed -i 's/E:\\GitHub-repo\\notes\\research\\/https\:\/\/cdn.jsdelivr.net\/gh\/gxf1212\/notes\@master\/research\//g' *.md
sed -i 's/assets\\/assets\//g' *.md
```

#### 探索历程

- common md syntax is ok, Windows backslash and Linux slash are both ok. and zooming:

  ```html
  <!-- 指定像素值 -->
  ![logo](https://docsify.js.org/_media/icon.svg ':size=50x100')
  ![logo](https://docsify.js.org/_media/icon.svg ':size=100')
  <!-- 支持按百分比缩放 -->
  ![logo](https://docsify.js.org/_media/icon.svg ':size=10%')
  ```

  centering is not supported here...

  > Typora zooming script is not supported in docsify (but is ok in a normal html, but center works)
  >
  > already asked in CSDN. https://github.com/HanquanHq/MD-Notes

  no, it supports. But the root directory is not the current directory but the repository’s.....

  - in normal md grammar, relative path is ok

  - in html, zooming without relative path is ok

  - the problem is, in html, <u>it cannot recognize relative path as markdown does (no matter whether zooming)</u>. But it works if you use path relative to the root of repository...which makes figures invisible in local Typora

  - 本来还猜测只是重新定义了根目录的原因，加个`../`就认为是相对路径了。事实上是，不管加不加这些东西，都是从the root of repository开始算的。。所以你以为加了../就是父目录了，其实还是root

    but still no luck

- 解决图片问题的思路：

  - 上传的时候render为正确的html格式

  - 把图上传到另一个地方，链接一个网址以实现缩放
    
    hexo就是可以渲染出图片，他docsify就是不行

  引用网址图片也不行

  **解决之道**：要用这个打头（算是git的api？）

  `https://cdn.jsdelivr.net/gh/gxf1212/notes@master/` or 

  `https://gitee.com/gxf1212/notes/raw/master/`

  其实git他俩用来做图床就是如此

- both markdown and html (for zooming) syntaxes work ok

  ```markdown
  ![](https://cdn.jsdelivr.net/gh/gxf1212/notes@master/course/Advanced-biology/molecular-immunology/molecular-immunology.assets/1-lymphnode2.jpg)
  ```

  ![](https://cdn.jsdelivr.net/gh/gxf1212/notes@master/course/Advanced-biology/molecular-immunology/molecular-immunology.assets/1-lymphnode2.jpg)


  ```html
  <img src="https://cdn.jsdelivr.net/gh/gxf1212/notes@master/course/Advanced-biology/molecular-immunology/molecular-immunology.assets/1-lymphnode2.jpg" style="zoom:50%;" />
  ```

  <img src="https://cdn.jsdelivr.net/gh/gxf1212/notes@master/course/Advanced-biology/molecular-immunology/molecular-immunology.assets/1-lymphnode2.jpg" style="zoom:50%;" />

This zooming works in local and preview but not really the web page?? This also failed

```html
<center><img src="https://cdn.jsdelivr.net/gh/gxf1212/notes@master/research/utils/21c.png" alt="21c" style="zoom: 25%;" class="center" /></center>
```

`width=400` or `width=40%` work (as for videos), and all kinds of centering always works:

```shell
<div align="center"><img src="https://cdn.jsdelivr.net/gh/gxf1212/notes@master/research/utils/21c.png" alt="21c" width=400 /></div>
```

  - And it does not matter whether you use slash or backslash (but it matters locally in Typora...).
  - If centering is needed, you should add `<center></center>`.
  - You should not use space to avoid issues in html (%20).

  > You should write normally in Typora (go back to root), don't change that until figrues are uploaded. 
  >
  > First correct all slashes, then replace `../../` with the website prefix

future tasks:

- [ ] centralize figures
- [ ] adjust size, so different from those in Typora!

> #### 探索历程
>
> <font color=red>世界上怎么会有这么傻逼的设计？！！专门跟Typora过不去吗？？不得不改变创作方式！</font>那这话也不合适
>
> **Test figure usage**
>
> use the website, a centered figure should look like this:
>
> <center> <img src="https://cdn.jsdelivr.net/gh/gxf1212/notes@master/course/Advanced-biology/molecular-immunology/molecular-immunology.assets/1-lymphnode2.jpg" style="zoom:50%;" /> </center>
>
> `align="center" ` does not work.....`<center></center>` or `<p style="text-align:center;"><p/>` works. 
>
> I'm not particular about centering. The site looks all right though.
>
> relative path  https://docsify.js.org/#/zh-cn/configuration?id=relativepath not useful
>
> 根目录probably does not work
>
> <img src="/course/molecular-immunology/molecular-immunology.assets/1-lymphnode.jpg" alt="1-lymphnode" style="zoom:50%;" />
>
> 正常本地目录probably does not work
>
> <img src="~/desktop/work/Git-repo/notes/course/molecular-immunology/molecular-immunology.assets/1-lymphnode2.jpg" alt="1-lymphnode2" style="zoom:50%;" />
>
> this should ok, but `':size=50%'` does not work locally using provided syntax
>
> ![logo](~/desktop/work/Git-repo/notes/course/molecular-immunology/molecular-immunology.assets/1-lymphnode2.jpg ':size=50%')
>
> ![logo](~/desktop/work/Git-repo/notes/course/molecular-immunology/molecular-immunology.assets/1-lymphnode2.jpg ':size=100%')
>
> To use a website link, we **should not contain a single backslash in Typora**...(fine in the website?)
>
> <img src="https://cdn.jsdelivr.net/gh/gxf1212/notes@master/course/molecular-immunology/molecular-immunology.assets\5-c1q.png" alt="5-c1q" style="zoom:50%;" />
>
> ```
> https://gitee.com/gxf1212/notes/raw/master/
> https://cdn.jsdelivr.net/gh/gxf1212/notes@master/
> ```
>
> 没想到个别的（本地都）显示不了，即使那个图片确实存在
>
> Figure in GitHub
>
> ![](https://raw.githubusercontent.com/gxf1212/notes/master/course/Advanced-biology/molecular-immunology/molecular-immunology.assets/1-lymphnode2.jpg)
>
> But CDN also works?
>
> <img src="https://unpkg.com/gxf1212/notes@master/course/Advanced-biology/molecular-immunology/molecular-immunology.assets/1-lymphnode2.jpg" style="zoom:50%;" />
>
> if you want to include figures, you could also set the path as (an example):
>
> ```shell
> <img src="https://gitee.com/gxf1212/notes/raw/master/course/molecular-immunology/molecular-immunology.assets/5-c1q.png" alt="5-c1q" style="zoom:50%;" />
> ```
>
> i.e. use the API provided by Gitee. not using now

### Include files & media

At first, all failed as https://www.yumefx.com/?p=5310 said. Local links don't work, regardless of path! (like `../utils/click-text.js`) We have to use the cdn path (like figures) after all.

We could as well **write html**, which is recognized by both Typora and docsify. It's definitely more unlimited than markdown. The spelling of parameters might be identical. You can check [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe) for these attributes. Add `<center></center>` to keep the media in the middle.

#### code

> [!TIP|label:Usage] 
>
> ```markdown
> [代码块](https://cdn.jsdelivr.net/gh/gxf1212/notes@master/utils/jsutility/hitokoto.js ':include :type=code')
> ```
>

it will show

[代码块](https://cdn.jsdelivr.net/gh/gxf1212/notes@master/utils/jsutility/hitokoto.js ':include :type=code')

> `:fragment=demo'`: part of the code. refer to [this link](https://docsify.js.org/#/embed-files?id=embedded-code-fragments)

#### audio

the markdown format does not allow spaces in the file name...

```markdown
[audio]("https://cdn.jsdelivr.net/gh/gxf1212/notes@master/utils/audio/92 《三体》最终季 第十集 歌者.mp3" ':include :type=audio controls width=100%')
```

Because **double qoute is not allowed in markdown path**...removing the spaces, it does not show the audio play bar locally.

> [!TIP|label:Usage] 
>
> the right version is
>
> ```markdown
> [Apologize.mp3](https://cdn.jsdelivr.net/gh/gxf1212/notes@master/utils/audio/Apologize.mp3 ':include :type=audio controls')
> ```
>
> [Apologize.mp3](https://cdn.jsdelivr.net/gh/gxf1212/notes@master/utils/audio/Apologize.mp3 ':include :type=audio controls')
>
> html works for paths with spaces, and shows play bar locally.
>
> ```html
> <audio id="audio" controls="" preload="none"> <source id="mp3" src="https://cdn.jsdelivr.net/gh/gxf1212/notes@master/utils/audio/92 《三体》最终季 第十集 歌者.mp3"> </audio>
> ```
>
> <audio id="audio" controls="" preload="none">
>       <source id="mp3" src="https://cdn.jsdelivr.net/gh/gxf1212/notes@master/utils/audio/92 《三体》最终季 第十集 歌者.mp3">
> </audio>

this one, just start downloading the file...because 'iframe' equals to 'open a website'.

```html
<iframe src="https://cdn.jsdelivr.net/gh/gxf1212/notes@master/utils/audio/92 《三体》最终季 第十集 歌者.mp3" > </iframe>
```

> Music163 (网易云音乐) outer link player (will automatically play in Typora?)
>
> ```html
> <iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=330 height=86 src="//music.163.com/outchain/player?type=2&id=407761576&auto=1&height=66"></iframe>
> ```
>

#### video

> [!TIP|label:Usage] 
>
> it's common to copy from all kinds of video platforms (eg: B站，分享--嵌入代码)
>
> ```html
> <iframe src="//player.bilibili.com/player.html?aid=463175258&bvid=BV1gL411471e&cid=414590978&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" width=90% height=500px > </iframe>
> ```
>

<center><iframe src="//player.bilibili.com/player.html?aid=463175258&bvid=BV1gL411471e&cid=414590978&page=1"  scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" width=90% height=500px > </iframe></center>

> - width and height, choose one?
> - `align="middle"` doesn't work
> - no cc substitles...

Copy the link of the file/player (corresponding type=video/iframe), rather than the website (as the following)

```
[分子生物物理学课程](https://www.bilibili.com/video/BV1gL411471e ':include :type=video controls width=100%')
```

> https://www.w3schools.com/html/html_youtube.asp

We may replace it with the link to our videos files. 

> [!TIP|label:Usage] 
>
> Also we can write html. Do not include the source file in `iframe`
>
> ```html
> <center><video width=50% controls>  
>  <source src="https://cdn.jsdelivr.net/gh/gxf1212/notes@master/utils/video/Tom-on-broom.mp4" type="video/mp4"> 
> </video></center>
> ```

<center><video width=50% controls>  
    <source src="https://cdn.jsdelivr.net/gh/gxf1212/notes@master/utils/video/Tom-on-broom.mp4" type="video/mp4"> 
</video></center>

#### webpage

> [!TIP|label:Usage] 
>
> both works.
>
> ```markdown
> [东山月光下的个人主页](https://space.bilibili.com/441196634 ':include :type=iframe width=100% height=400px')
> ```
>
> ```html
> <iframe src="https://space.bilibili.com/441196634" scrolling="yes" border="0" frameborder="no" framespacing="0" allowfullscreen="true" width=100% height=600px > </iframe>
> ```
>

<iframe src="https://space.bilibili.com/441196634" scrolling="yes" border="0" frameborder="no" framespacing="0" allowfullscreen="true" width=100% height=600px > </iframe>

> not logged in

### Notes on deploying and trial

1. Then after deploying, you should press Ctrl+F5, which will cost ten seconds or so. Or you will see the cache where the content is not updated!
2. Gitee screened words (“可能包含违禁违规内容，请排查调整后再行重试。”). try to avoid them

   - 某PN
   - 某pǐn（drug）相关
3. 


## Customize functions

还是有待发展啊！期待更多好玩的功能

TODO list:

- [x] gitee automatically deploy?

- [x] \ce的重新render

- [x] 图片的重新render
  
- [ ] figure centralize
  
- [ ] 打赏
  
- [ ] 访问量统计：busuanzi

  > https://docsify.js.org/#/zh-cn/markdown?id=markdown-%e9%85%8d%e7%bd%ae
  > 
  > https://github.com/docsifyjs/docsify/issues/850

### basic problems

refer to [html](#something-html)

- if a there’s a new version of a plug-in, how to update?  @latest

- principle: add scripts directly, or from the `src` (they all return js script!)
  
  so we can certainly save the long scripts in another file and call it...
  
  eg:
  
  ```html
  <script src="./utils/sitetime.js"></script>
  ```

- there are some ways to define sth with your code
  
  ```html
  document.getElementById("sitetime").innerHTML = "bulabula"  # defined in .js file
  ```
  
  once get an element, we can put it in any tag, just by refering to `id`:
  
  ```html
  <span id="sitetime"></span> // in footer['copy']
  <p id="sitetime"></p> // add a linebreak..
  ```

- you should not ...

- add things after:

  ```html
  <!-- Docsify v4 -->
  ```

  like

  ```html
  <script src="//unpkg.com/docsify-copy-code"></script> <!-- copy to clipboard -->
  <script src="//unpkg.com/prismjs/components/prism-bash.js"></script> <!-- code highlight -->
  <script src="//unpkg.com/docsify/lib/plugins/search.js"></script> <!--  search engine -->
  <script src="//cdn.jsdelivr.net/npm/docsify/lib/plugins/emoji.min.js"></script> <!--  emoji -->
  <script src="//cdn.jsdelivr.net/npm/docsify-katex@latest/dist/docsify-katex.js"></script> <!--  equations -->
  ```

  to add plug-in

- blacklist:

  ```html
  <script src="//cdn.jsdelivr.net/npm/docsify@latest/lib/docsify.min.js"></script>
  ```

  navbar vanishes!..mouse can't scroll. code highlight is gone.

  2022.8.6 update: don't use latest **inside `<head>`** (but fine in `<body>`...) or you can't see the page

- customize title with quoted text

  ```markdown
  [NAMD/VMD和FEP计算基本操作](/MD/FYP-notes.md "2333")
  ```

  the default page title will be that in the sidebar, like "分子免疫学笔记"

- 如何搞背景？

  https://segmentfault.com/a/1190000017576714  失败了

  为啥呢？原来用vue主题就可以了。theme-simple不支持。。。。

  侧边栏还可以搞个图片

### common functions

1. Fontawesome 

   https://www.npmjs.com/package/docsify-fontawesome

   > not solved! refer to https://jhildenbiddle.github.io/docsify-themeable/#/?

2. scroll to the top 

   https://github.com/zhengxiangqi/docsify-scroll-to-top

3. sidebar collapse 

   https://github.com/iPeng6/docsify-sidebar-collapse 

4. LaTeX equation support https://github.com/upupming/docsify-katex 

   - [**supported functions**!](https://upupming.site/docsify-katex/docs/#/supported)
   - https://github.com/upupming/docsify-katex/issues/11 italic fon

   note that katex only supports these environments that you often use (of course something other):

   - aligned
   - gathered
   - cases
   - various matrices, array

   check https://upupming.site/docsify-katex/docs/#/supported for more

   syntax supporting problems like:

   - [x] support of textsubscript: must use `<sub></sub>` tag; 

     > must add `\` to `\~` if there are more than two `\~`. same for `^` in typora. 

   - [x] support of `\ce{NaCl}`: may use $\text{Al(OH)}_3$...

   - [x] support of `\begin{align*}` ?? as well as gather, equation ...

5. 网页图标

   在 index.html 的 head 部分导入网页图标：

   ```html
   <link rel="icon" href="static/img/logo.ico" type="image/x-icon"/>
   ```

6. 点击效果

   - 桃心

     ```html
     <script src="//cdn.jsdelivr.net/gh/jerryc127/butterfly_cdn@2.1.0/js/click_heart.js"></script>
     ```

   - 文本，如富强民主文明和谐：use `click-text.js`

     [十个拿来就能用的网页炫酷特效](https://www.toutiao.com/article/7087843770217284132) or [this](https://chowdera.com/2022/194/202207120537561961.html)：蜘蛛网特效等

     重要的 js code：

     - `s[e].el.style.cssText = .....`和`i(".heart{width: 10px;height: 10px;position: fixed;background: #f00; .....`是心形版本，并且能调格式。
     - `var arr = new Array(xx, xx)`和`a.innerText = arr[parseInt(arr.length * Math.random())];`配合，是文字版本

     more icons: search, or fontawesome

7. 插件，文字统计 https://github.com/827652549/docsify-count

   阅读进度条[docsify-progress](https://github.com/HerbertHe/docsify-progress) 这个插件与字数插件不兼容

8. sitetime.js：运行时间统计

9. [docsify 构建文档网站之定制功能（全网最全） | 码农家园](https://www.codenong.com/cs107071378/) 

   [ETS' NoteBook - By Mr.Wu - 微信公众号：码客趣分享 🌹](https://notebook.js.org/#/)

   - 显示pdf？

   - Docsify-alerts https://www.npmjs.com/package/docsify-plugin-flexible-alerts

     ```markdown
     > [!NOTE]
     > 
     > [!TIP|label:Usage] 
     > 
     > [!WARNING]
     > 
     > [!ATTENTION]
     > 
     ```

     可自定义

10. 更新时间 https://github.com/pfeak/docsify-updated

   write markdown and append to the end

11. PDF reader embedded

    https://github.com/lazypanda10117/docsify-pdf-embed

    uses PDFObject

    - put it between `<body></body>` (not `<head>` as the document said)
       - use relative path to the repository root

12. 也许有一天，博客的课程列表那里能做成iGem那个建模首页那样，文字和图片的。

### live2d girl

https://blog.csdn.net/weixin_44897405/article/details/103214635

这个东西叫做：live2d看板娘。https://github.com/stevenjoezhang/live2d-widget. I've also forked it.

https://gitcode.net/mirrors/stevenjoezhang/live2d-widget/-/tree/master  GitHub镜像。代码两处都要改。

#### version 1

developer的js. components:

- `autoload.js`

  - the one needed to be included in `index.html`

    ```html
      <script src="https://cdn.jsdelivr.net/gh/stevenjoezhang/live2d-widget@latest/autoload.js"></script>
    ```

  - calls the API, your settings, etc.

    ```js
    cdnPath: "https://fastly.jsdelivr.net/gh/fghrsh/live2d_api/"
    ```

    which contains info about the models. 

  - modify `live2d_path` if you fork...

    ```js
    const live2d_path = "https://fastly.jsdelivr.net/gh/gxf1212/live2d-widget@master/"
    ```

    also @master in `index.html`. just modify them two when changing the source.

- `waifu.css`

  - the style: size, position, ...

  - see [我的自定义多交互live2d折腾经历 - c10udlnk - 博客园](https://www.cnblogs.com/c10udlnk/p/14727173.html)
    - 常用配置说明
    - 运用CDN添加自定义模型

  ![waifu-tips-arguments](https://cdn.jsdelivr.net/gh/gxf1212/notes@master/techniques/images/waifu-tips-arguments.png)

  to show three lines completely: 

  ```json
  	margin: -45px 20px;  
  	min-height: 85px;
  ```

- `waifu-tips.js`

  - defines basic events (with messages), functions, icons, models
  - model Id? models also in api? see 我的自定义....
  - 说话
    - 检测用户活动状态：不活动时自动说的话。。
  - consider switching to https://github.com/mosuzi/live_fe/blob/master/assets/waifu-tips.js, to get a toolbar?

- `waifu-tips.json`

  - provides sentences for icons/events (like clicking)?
  - 说话
    - `"mouseover": [{"selector": "#live2d"...`
    - ...

experiences

- L2Dwidget.init 设置大小、调位置咋样都没用。。要clone下来自己改
- 看板娘L2Dwidget盯着鼠标移动（好像已经有了see more settings in the code

[看板娘对话自定义](https://dp2px.com/2019/09/19/hexo-live2d/#live2d-%E7%9C%8B%E6%9D%BF%E5%A8%98%E5%AF%B9%E8%AF%9D%E8%87%AA%E5%AE%9A%E4%B9%89)

> 能响应的：
> - // 检测用户活动状态，并在空闲时显示消息
> - window.addEventListener("copy"，"你都复制了些什么呀
> - window.addEventListener("visibilitychange"，"哇，你终于回来了～"
> - 欢迎阅读xxx？
> - "mouseover": [{"selector": "#live2d",
> - "click": [{"selector": "#live2d",
>  showmessage的text可以是列表？

problems

- [ ] why serve locally, it shows other messages like "傍晚了！窗外夕阳的景色很美丽呢，最美不过夕阳红～"
- [ ] buttons still not there
- [ ] 欢迎阅读「document」
- [ ] switch models?

#### version 2 (not using)

L2Dwidget.min.js

> 人物有哪些选择？参考7. 提供的
>
> ```
> jsonPath: "https://unpkg.com/live2d-widget-model-shizuku@latest/assets/shizuku.model.json",
> ```
>
> [GitHub - evrstr/live2d-widget-models](https://github.com/evrstr/live2d-widget-models) 给的似乎没用？
>
> [教你使用看板娘](https://www.icode9.com/content-4-1173614.html) maybe
>
> [Hexo博客添加看板娘 | 陈亮的个人博客](http://blog.itchenliang.club/posts/22350780-f32d-11ea-bb4a-d3e1cbe3d592/#%E5%AE%89%E8%A3%85%E6%8F%92%E4%BB%B6) hexo的，方案一
>
> [Live2d Demo](https://summerscar.me/live2dDemo/) 调试模型、参数的效果，好慢

- 就可以设置大小、位置
- cannot find the one in developer’s model...
- 但不能说话。。也不能盯着鼠标，甚至还有点模糊 (not in the unpkg.com one)

```html
  <!-- <script src="https://eqcn.ajz.miesnfu.com/wp-content/plugins/wp-3d-pony/live2dw/lib/L2Dwidget.min.js"></script> -->
  <script src="https://unpkg.com/live2d-widget/lib/L2Dwidget.min.js"></script>
  <script src="https://unpkg.com/live2d-widget/lib/L2Dwidget.0.min.js"></script>
  <script>
　　L2Dwidget.init({ 
　　  "model": {jsonPath:"https://unpkg.com/live2d-widget-model-shizuku@1.0.5/assets/shizuku.model.json","scale": 1 }, 
　　  "display": { "position": "right", "width": 100, "height": 200,"hOffset": 0, "vOffset": -20 }
    });
  </script>
```



### mindmap

> [!TIP]
>
> [AntHubTC/docsify-xmind: A live preview of your xmind fiile 在docsify的md文档中能查看xmind文档 (github.com)](https://github.com/AntHubTC/docsify-xmind)
>
> 直接就是原封不动的样式，原来的味道。没试过

https://github.com/up9cloud/docsify-mindmap 照着做

steps

- iPad端导出xmind为markdown
- 用写的程序处理
- 粘到markdown里

note

- mindmap和json有别
- json放弃了，转换太复杂，必须把字典字符串合理得换行。。
- 处理markdown文本：#换成缩进，*是七级标题，再缩进再加，还有强制换行的
- 开头空格无所谓
- 设计者应该是把空两个作为一个tab的
- 中文还是支持的

问题

- 美化？
- Typora看不了都没啥，本地部署预览不了？

https://github.com/fex-team/kityminder-core 更高端的？

> markmap
>
> ```
> npm install yarn
> yarn add markm
> ```
>
> failed
>
> 不适用于xmind的思维导图展示，写代码修改？
>
> https://juejin.cn/post/7000874049333100551
>
> https://zhuanlan.zhihu.com/p/352795634
>
> failed

### hitokoto

一言开源社区 https://developer.hitokoto.cn/ 

一般方法：https://www.jianshu.com/p/3a58d9a796c3，不需要另外那两个脚本

很好，coverpage不会有。

放在哪呢？docsify的这些主题，往下划，header栏就看不到了

https://hitokoto.cn/dashboard#/ 控制台，看、提交句子的

自定义：

- 自己写点话？审核要一年？？
- 如何查，比如所有关于三体的
- 格式：改js？只能控制show出哪些文字，没法搞局部下划线啥的
  - 解决破折号前空格
- 调节请求参数，可以选定句子范围
- token？

其他

https://www.jinrishici.com/doc/ 今日诗词API

### other functions

1. Gittalk (not applied)
   
   https://segmentfault.com/a/1190000018072952
   
   https://www.cnblogs.com/fozero/p/10256858.html 
   
5. 插件，share自己的社交媒体
   
   https://coroo.github.io/docsify-share/#/?id=getting-started
   
13. 辅以页脚系统 https://github.com/erickjx/docsify-footer-enh
    
    - do not support `\n`, only html `<br/>`
    
    - params
      
      | params | content                                               |
      | ------ | ----------------------------------------------------- |
      | copy   | Copyright text to display (just write your main text) |
      | auth   | Author text                                           |
      | style  | Footer CSS inline style                               |
      | class  | Footer Classes to include                             |
      | pre    | Html pre footer text                                  |

16. badge。 是用什么东西生成的吗。。
    
    ![](https://forthebadge.com/images/badges/makes-people-smile.svg)
    <img src="https://img.shields.io/badge/version-v2.0.0-green.svg" data-origin="https://img.shields.io/badge/version-v2.0.0-green.svg" alt=""> 

17. Pagination，暂时没弄
    
    > 在文档的最下方会展示上一个文档和下一个文档。
    
    ```html
    pagination: {
      previousText: '上一章节',
      nextText: '下一章节',
      crossChapter: true,
      crossChapterText: true,
    }
    ```
    
    需要引入两个 js 文件：
    
    ```html
    <script src="//cdn.jsdelivr.net/npm/docsify/lib/docsify.min.js"></script>
    <script src="//cdn.jsdelivr.net/npm/docsify-pagination/dist/docsify-pagination.min.js"></script>
    ```

18. 
    

more plugins: https://docsify.js.org/#/awesome?id=plugins，https://docsify.js.org/#/plugins?id=pagination

## Important notes on publishing

- gitee pages 自动部署
  
  https://gitee.com/yanglbme/gitee-pages-action
  
  不想在GitHub上弄一个同样的仓库。。先不弄了（22年夏天更：已经全转GitHub了）
  
  https://bibichuan.gitee.io/posts/5cbf8e2a.html

- 部署到 gitee pages 的静态页面更新后部分样式未刷新问题
  原因是在重新提交文件并执行更新 gitee pages 操作后，协商缓存ETag和Last-Modified虽然会改变，但是强缓存Cache-Control仍然存在，且优先级更高，导致内容未发生改变。
  解决方案： ctrl+F5 强制刷新
  原文链接：https://blog.csdn.net/PorkCanteen/article/details/122068290

- 百度提供了一个提交链接的入口，地址如下：
  
  > https://ziyuan.baidu.com/linksubmit/url
  
  填写码云 Pages 的链接：https://itwanger.gitee.io/，并「提交」，见下图：
  
  这样做的好处是，网站可以主动向百度搜索推送数据，缩短爬虫发现网站链接的时间。当然了，百度收录需要一段时间

- 



https://github.com/docsifyjs/docsify/issues/656

有些代码是否可用？

https://github.com/lufei/notes

https://code.google.com/archive/p/sitemap-generators/wikis/SitemapGenerators.wiki

Google提供的生成器

生成工具很多，感觉docsify本身不适合。。还是参考已有的

> https://neilpatel.com/blog/xml-sitemap/

## other features, examples and Gitee

[showcases](https://docsify.js.org/#/awesome?id=showcase)  [hitokoto links](https://hitokoto.cn/friendship)

1. https://wiki.xhhdd.cc/#/
   
   她的站可学习一下。如warning框、等待信息，没找到源码。翻页见下
   
   Typecho是一个基于PHP的开源博客程序。

2. https://github.com/lufei/notes
   
   他的配置也是值得参考的。美化上，向他学习一波。
   
   - 比如vue如何换背景色
   - 如何插入文艺词句（但说实话没太多机会看到了）
   - https://jingyan.baidu.com/article/08b6a591afce9d14a9092241.html 百度统计访问？
   - 他自己搞的主题？https://github.com/sy-records/docsify-nightly

3. https://www.cnblogs.com/juemuren4449/p/12904699.html 
- It is ridiculous that if I include a YouTube or Bilibili link in .md, I cannot deploy...No, solved
- markdown based wiki system http://dynalon.github.io/mdwiki/#!index.md
- 几（十）款制作帮助文档的工具汇总 https://blog.mimvp.com/article/38752.html
- 快写鸭：多平台同时发布
- 其他：https://mubu.com/home 做大纲、思维导图的，挺漂亮
- 
- 

### Debugging

> #### 22.1.19
> 
> local serving is fine; 
> 
> - sidebar and navbar is missing;
> - cannot see the cover page;
> - even we can open a note, click on any subtitle, redirected to the global README (get started).
> 
> solution: should make an empty file .nojekyll, or _files are ignored!
> 
> still not ok. should not use router mode (if you have refered to the site with # in your link, like https://gxf1212.gitee.io/notes/#/utils/about
> 
> why don't I use .md? because it adds an arrow in the side bar...
> 
> how to avoid popping out a window? write html...

### other notes

#### CDN

内容分发网络 (Content delivery network) 是指一种透过互联网互相连接的电脑网络系统，利用最靠近每位用户的服务器，更快、更可靠地将音乐、图片、视频、应用程序及其他文件发送给用户，来提供高性能、可扩展性及低成本的网络内容传递给用户。

[手动刷新Jsdelivr缓存的方法](https://www.aff.vin/refreshing-jsdelivr.html)

```
https://purge.jsdelivr.net/gh/gxf1212/live2d-widget@master/
```

unpkg is **a free content delivery network (CDN)** that automatically distributes public packages published to npm. unpkg partners with cloudfare and heroku to make this automatic distributing possible

CSDN：投稿，再次上传markdown文件，链接变了。。。

https://www.bilibili.com/read/cv403592/ 专栏markdown

# Build Python documentation in Sphinx

sphinx

- https://www.sphinx-doc.org/en/master/
- api https://sphinx-apidoc.readthedocs.io/zh_CN/latest/
- doc https://zh-sphinx-doc.readthedocs.io/en/latest/

examples:

- https://github.com/openbabel/documentation
- https://degrootlab.github.io/pmx/index.html
- https://alchemlyb.readthedocs.io/en/latest/
- https://deepchem.readthedocs.io/en/latest/index.html

writing contents, refer to:

- https://openbabel.org/docs/dev/UseTheLibrary/Python_PybelAPI.html
- https://www.rdkit.org/docs/source/rdkit.Chem.rdchem.html

more examples: https://sphinx-doc.readthedocs.io/zh_CN/master/examples.html

> other documentation types:
>
> - [MMPBSA](https://github.com/Valdes-Tresanco-MS/gmx_MMPBSA): purely markdown+readthedocs?

## Basics

> - [使用Sphinx写项目文档](https://blog.hszofficial.site/recommend/2020/11/27/%E4%BD%BF%E7%94%A8Sphinx%E5%86%99%E9%A1%B9%E7%9B%AE%E6%96%87%E6%A1%A3/)
>- [Sphinx+gitee+Read the Docs搭建在线文档系统](https://www.bilibili.com/read/cv11923872)

### steps & elements

- installation

  ```shell
  conda create -n sphinx
  conda activate sphinx
  pip install -U sphinx  # or
  # conda install sphinx
  ```
  
  > - it's recommended to use `pip`, at least on Windows
  > - if you want to build a code API or insert docstrings, please install sphinx right in the environment for development! The packages needs to be imported.
  
  other basic installation:
  
  - markdown and extensions
  - themes
  
- start

  ```shell
  mkdir docs
  cd docs
  sphinx-quickstart
  ```

  generally they put all your code in GitHub, `mkdir docs` (or sth like `examples`). Some `mkdir src` and put all code there, but it's not necessary.

- build

  ```shell
  # in /xx/docs, which has two folders: build and source
  make html
  make html SPHINXOPTS=-vvv # to debug
  ```

- We no longer see warnings if we run `make html` again (no new modification)?

- 

- change a theme: do as they stated (see [below](#sphinx-themes))

- enable markdown (see [below](#markdown-support))


>other not using
>
>- [sphinx-autobuild](https://sphinx-extensions.readthedocs.io/en/latest/sphinx-autobuild.html): access http://127.0.0.1:8000/ with your browser
>
>  ```shell
>  pip install -i https://pypi.tuna.tsinghua.edu.cn/simple sphinx-autobuild
>  ```
>
>- 
>

### rst syntax

- https://www.sphinx-doc.org/en/master/usage/restructuredtext/basics.html
- https://www.sphinx-doc.org/en/master/usage/restructuredtext/directives.html  all kinds of directives



1. [section headers](https://www.sphinx-doc.org/en/master/usage/restructuredtext/basics.html#sections) are created by underlining (and optionally overlining) the section title with a punctuation character, **at least as long as the text**.

   - convention
     - `#` with overline, for parts
     - `*` with overline, for chapters
     - `=` for sections
     - `-` for subsections
     - `^` for subsubsections
     - `"` for paragraphs

2. table of contents

   ```rst
   .. toctree::
      :maxdepth: 1
      :caption: User Documentation
   
      installation
      Tutorials/index.rst
      principle
   ```

   - write valid file names here (`.rst` or `.md` or others). It's ok without the extension name.
   - these will show up in main text as well as the left sidebar
   - blue titles (section in toc?), as in pmx site: just add multiple tocs, as pmx doc did
   - maxdepth: controls depth shown in the page (not sidebar)
   - multiple such toc in the index, to make the sidebar in sections (like pmx, etc.)
   
3. insert figures, and control its size/position

   ```rst
   .. image:: cycle.png
       :width: 400px
       :align: center
   ```

   markdown cannot do this (only html can).

4. alert

   ```rst
   alert
   ----------
   
   .. important::
   
       This sample documentation was generated on |today|, and `today` will be replaced by that date.
   
   .. note::
      This is note text. 
      
      Use a note for information you want the user to pay particular attention to.
   ```

5. todo

   https://www.sphinx-doc.org/en/master/usage/extensions/todo.html#confval-todo_include_todos

   ```python
   extensions = [
       "sphinx.ext.todo",
       ]
   todo_include_todos = True
   ```

   then

   ```rst
   .. todo::   
      Move this whole section into a guide on rST or directives
   ```

6. glossary  https://sphinx-themes.org/sample-sites/sphinx-sizzle-theme/kitchen-sink/lists/#glossary



## Markdown support (MyST)

[Markdown — Sphinx documentation (sphinx-doc.org)](https://www.sphinx-doc.org/en/master/usage/markdown.html)

[Markdown — Sphinx 1.8.5 文档 (sphinx-doc.readthedocs.io)](https://sphinx-doc.readthedocs.io/zh-cn/master/usage/markdown.html)

The official site says *MyST-Parser*...

```shell
# pip install --upgrade recommonmark
# here we use
pip install --upgrade myst-parser # or
# conda install -c conda-forge myst-parser docutils -y
```

If something is wrong, maybe re-install MyST-parser

### interpreters

**choose only one of them**

[recommonmark](https://recommonmark.readthedocs.io/en/latest/index.html)

```python
extensions = ['recommonmark']
```

[myst-parser](https://myst-parser.readthedocs.io/en/latest/index.html)

```python
extensions = ['myst_parser']
```

[mr2](https://github.com/miyakogi/m2r) is archived. Maybe m2r2....

### insert other file formats

[FAQ (myst-parser.readthedocs.io)](https://myst-parser.readthedocs.io/en/latest/faq/index.html)

#### Basics

e.g. insert .md into .rst

````markdown
```{eval-rst}
.. include:: include-rst.rst
```
````

insert .md into .rst

```rst
.. include:: include.md
  :parser: myst_parser.sphinx_
```

#### syntax

- [subscript-superscript](https://myst-parser.readthedocs.io/en/latest/syntax/typography.html#subscript-superscript)
- [Cross-references](https://myst-parser.readthedocs.io/en/latest/syntax/cross-referencing.html#inline-links-with-implicit-text): normal markdown inline links

#### Images

[Images and figures](https://myst-parser.readthedocs.io/en/latest/syntax/images_and_figures.html#figures-images-with-captions) not quite successful?

For centered figures with captions:

```html
<center>
<img src="../_static/images/interactive.png" width="900px" />
FEbuilder will pop out figures like this
<center/>
```

[Syntax Extensions--HTML Images](https://myst-parser.readthedocs.io/en/latest/syntax/optional.html#syntax-images-html): simply markdown cannot implement a centered image. Either html, or rst. But for html only `width` works? Typora default: `style="zoom=..."`

### extensions

#### math

[Syntax Extensions optional.html math-shortcuts](https://myst-parser.readthedocs.io/en/latest/syntax/optional.html#math-shortcuts)

the same as usual...

#### other

[ryanfox/sphinx-markdown-tables: A markdown table plugin for Sphinx (github.com)](https://github.com/ryanfox/sphinx-markdown-tables)

[mgaitan/sphinxcontrib-mermaid: Mermaid diagrams in yours sphinx powered docs (github.com)](https://github.com/mgaitan/sphinxcontrib-mermaid)

```shell
pip install sphinx-markdown-tables sphinxcontrib-mermaid
```

mermaid only works in rst?



> other
>
> ```shell
> pandoc README.md --from markdown --to rst -s -o readme.rst
> ```
>



### recommonmark

```python
extensions = [
    'recommonmark',
    'sphinx.ext.mathjax'
    ]
# source_parsers = {'.md': 'recommonmark.parser.CommonMarkParser'}
```

[sphinx-markdown-checkbox](https://pypi.org/project/sphinx-markdown-checkbox/): Inspired by [sphinx-markdown-tables](https://github.com/ryanfox/sphinx-markdown-tables), this project renders markdown checkboxes as HTML using [pycmarkgfm](https://github.com/zopieux/pycmarkgfm), because [Recommonmark](https://github.com/rtfd/recommonmark) does not support markdown checkboxes.


## Themes

To hunt for themes

- https://www.sphinx-doc.org/en/master/usage/theming.html#builtin-themes
- https://sphinx-themes.org/

before everything starts:

```shell
pip install sphinx_theme
```

> https://github.com/LinxiFan/Sphinx-theme

1. [Stanford](https://sphinx-themes.org/#theme-sphinx-theme): color changed
2. [press_theme](https://github.com/schettino72/sphinx_press_theme). beautiful, but ruined by sidebar title level
3. [Yummy](https://sphinx-themes.org/#theme-yummy-sphinx-theme). beautiful page, terrible font
4. [Sizzle](https://sphinx-themes.org/#theme-sphinx-sizzle-theme): font. caption font??
5. [Basicstrap](https://sphinx-themes.org/#theme-sphinxjp-themes-basicstrap): also great. 
6. [Material](https://sphinx-themes.org/#theme-sphinx-material): toc on the right, no toc for all pages...
7. [Piccolo](https://sphinx-themes.org/#theme-piccolo-theme): blue theme
8. [Karma](https://sphinx-themes.org/#theme-karma-sphinx-theme)
9. [Furo](https://sphinx-themes.org/#theme-furo): new gromacs doc
10. [The PyData Sphinx Theme](https://pydata-sphinx-theme.readthedocs.io/en/stable/index.html): looks fine too. 

> other
>
> - [sphinx-rtd-theme](https://pypi.org/project/sphinx-rtd-theme/)  one of the most classical: [alchemyb](https://alchemlyb.readthedocs.io/en/latest/)
>
>   [Renku](https://sphinx-themes.org/#theme-renku-sphinx-theme): light background? change GitHub link?
>
>   [Book](https://sphinx-themes.org/#theme-sphinx-book-theme): great.
>
>   But they don't work with sphinx 5.3.0, thus including markdown failed
>
> - [sphinxdoc](https://sphinx-themes.org/#theme-default-sphinxdoc): openbabel doc
>
> - [classic](https://sphinx-themes.org/#theme-default-classic): old gromacs doc

### Press

the best font and color! but

- only shows headings in this page

- does not recognize subpages (as *piccolo_theme* does)

- press theme causes the first level title shown twice,

  一个md文件，除了第一个一级标题外没有别的小标题（目录不算；一级标题不算，而且渲染出来大小都和页面标题一样）时，sidebar就会有两个这个一级标题。。

> I guess the mechanism is: press downgrade the title levels, while stanford keeps all first-levels in sidebar and removes duplicated titles

### stanford

while in stanford theme, other first level titles in one `.md` file are also shown in the sidebar...

but rendered as the first **first level title**.

- in rtd/alabaster/stanford/etc. theme, other first level titles in one `.md` file are also shown in the sidebar...
- so we just **start from second level title** in a page.

### sizzle

https://github.com/vsajip/sphinx_sizzle_theme

[The Sizzle theme for Sphinx (red-dove.com)](https://docs.red-dove.com/sphinx_sizzle_theme/index.html)

- [sidebar](https://docs.red-dove.com/sphinx_sizzle_theme/index.html#sidebar)
- https://docs.red-dove.com/sphinx_sizzle_theme/index.html#summary-detail-lists

### Furo

sidebar is fine

### Pydata

subpages left, called "Section Navigation". nothing if no subpages (kind of strange) 

this page headings on the right

### theme options

usually these are theme-specific.

[HTML Theming — Sphinx documentation (sphinx-doc.org)](https://www.sphinx-doc.org/en/master/usage/theming.html#builtin-themes)



- sidebar toc title font
- insert inline rst into .md file
- chemical formula support
- icon



## Code API/reference

Using autodoc extension. 

| website   | code path (`sys.path.insert`) | intra-package import |
| --------- | ----------------------------- | -------------------- |
| rdkit     | $HOME/rdkit                   | absolute             |
| deepchem  | $HOME/deepchem                | absolute             |
| alchemlyb | $HOME/src/alchemlyb           | relative             |
| pmx       | $HOME/src/pmx                 | relative             |
| lomap     | $HOME/lomap                   | relative             |
| biometall | $HOME/biometall               | relative             |
|           |                               | relative             |
|           |                               | relative             |


### Steps

[a full guide](https://www.slideshare.net/shimizukawa/sphinx-autodoc-automated-api-documentation-europython-2015-in-bilbao)

1. add path to code

   ```python
   import sys, os
   sys.path.insert(0, os.path.abspath('../../'))
   ```

2. add `autodoc` extension

   ```python
   extensions = [
       ...
       'sphinx.ext.autodoc',
       ...
       ]
   ```

3. write in any .rst file or block. See below.

4. Your code will be executed at `make html`. If you document scripts (as opposed to library modules), make sure their main routine is protected by a `if __name__ == '__main__'` condition.

### Autodoc syntax

Refer to [autodoc document](https://www.sphinx-doc.org/en/master/usage/extensions/autodoc.html) ([intro to autodoc](https://www.sphinx-doc.org/en/master/usage/quickstart.html#autodoc)) for more

```rst
api content
------------

.. automodule:: module name (.py file)
   :members:
   :undoc-members:
   :show-inheritance:

.. autofunction:: get_triple_bond_pairs
   
    `make_hybrid.get_triple_bond_pairs`. Extra text that will follow the docstring is added here. A blank line must be present before the extra text.
    
.. autofunction:: AssignBondOrdersFromTemplate
   
    Not from make_hybrid, but prefix is `make_hybrid.Assign...`!!
    
.. autofunction:: utils.AssignBondOrdersFromTemplate
   
    This works well if put elsewhere (without `automodule`). Don't worry about the warning 'duplicate object description of ...' if a function shows up twice throughout the document.
  
references
------------
:class:`make_hybrid.Ligand` generates a link to the API reference (automodule).


```



> how to show source code button in documentation (just beside the API doc)?
> [parmed.topologyobjects.Residue — ParmEd documentation](https://parmed.github.io/ParmEd/html/topobj/parmed.topologyobjects.Residue.html#parmed.Residue)

### Docstrings

- https://sphinx-rtd-tutorial.readthedocs.io/en/latest/docstrings.html examples
- https://www.sphinx-doc.org/en/master/tutorial/describing-code.html maybe also write in .rst
- You can see the string by `help(function name)`



```rst
.. py:function:: lumache.get_random_ingredients(kind=None, num=3)

    Return a list of random ingredients as strings. ``kind`` will be parsed as code, while `kind` will be rendered italic. **Bold text** is also supported.
    
    Refering to methods/classes/modules is different from that in .rst file. 
    
    - :py:func:`utils.get_ff`
    
    - :class:`make_hybrid.Ligand`
    
    - add module name before function/class name, or the reference will fail
    
    - :mod:`make_hybrid`. :mod: and :py:mod: are both ok.
    
    - from other packages: `text <url>`_.
    
    - download: :download:`text <url>`_.
    
    - leave a blank line between each item.
   	You should not add linebreak inside an item. This line is outside the list, and causes a warning: "WARNING: Bullet list ends without a blank line; unexpected unindent.".
   	
    What if we add a tab?
    
    - This line is rendered bold
    	This line gets an indent, and linebreaks here are supported.
   
    	An indent of 4 characters is a quote box.
        
        	Nesting quote box...
	
	.. note::
		it's also ok to use rst directives here. Two colons!!
	
	.. deprecated:: 0
		add version number after that

	code (also, a blank line):

    >>> lines = open(file, 'r').readlines()
    >>> for line in lines:
    >>>     if line.startswith('ATOM') or line.startswith('HETATM'):
    >>>         segname = line[72:76].strip()  # original segname
    >>>         if segname != '':
    >>>             return segname

    :Example:
    
    example box above. Maybe code here.
    
    Leave a blank line, and...
    
    :param kind: Optional "kind" of ingredients. Here it's ok to just ignore the blank line.
    :type kind: list[str] or None
    :param num: Another parameter.
    :type num: int
    :return: The ingredients list.
    :rtype: list[str]
    
    Also, leave a blank line if you have something after that; otherwise, "WARNING: Field list ends without a blank line; unexpected unindent."
```



docstring基本是得写rst格式

- 写完整的句子，首字母大写、加句号
- vmd, obabel用正常字体，扩展名、文件名用斜体，代码片段用双反引号，某个方法要引用，甚至引用如rdkit的文档（超链接？待定）
- TODO之前缩进一下
- notes for developers?



## todo

- [x] python code api. 
  - [ ] `sphinx-apidoc`?

- [ ] figure icon above the search bar
- [ ] multilingual
- [ ] in-line rst inserted into markdown
- [x] alert?
- [x] docstring format (more?)
- [x] utils.AssignBondOrdersFromTemplate
- [x] math
- [ ] page overview when mouse hovers, in MyST site



## readthedocs

Private repositories are not supported...

https://www.cnblogs.com/jonnyan/p/14207711.html

# WordPress

tbc...







# Hexo 

(not organized yet)

## Setup

[build-blog-website-by-hexo](https://www.cnblogs.com/liuxianan/p/build-blog-website-by-hexo-github.html#%E4%BD%BF%E7%94%A8hexo%E5%86%99%E5%8D%9A%E5%AE%A2)

Git 全局设置:

```bash
git config --global user.name "XJTUChemBioer"
git config --global user.email "741844489@qq.com"

git config --global user.name "高旭帆"
git config --global user.email "gxf1212@stu.xjtu.edu.cn"
```

generate key

```bash
ssh-keygen -t rsa -C "741844489@qq.com" 
ssh-keygen -t rsa -C "gxf1212@stu.xjtu.edu.cn"
cat /c/Users/Lenovo/.ssh/id_rsa.pub
```

[link](https://yushuaigee.gitee.io/2021/01/02/%E4%BB%8E%E9%9B%B6%E5%BC%80%E5%A7%8B%E5%85%8D%E8%B4%B9%E6%90%AD%E5%BB%BA%E8%87%AA%E5%B7%B1%E7%9A%84%E5%8D%9A%E5%AE%A2(%E4%B8%89)%E2%80%94%E2%80%94%E5%9F%BA%E4%BA%8E%20Gitee%20pages%20%E5%BB%BA%E7%AB%99/#%E4%B8%89%E3%80%81Gitee-Pages-%E5%8F%91%E5%B8%83)

test successful

```
ssh -T git@gitee.com
```

为了装Hexo，先装Git和Node.js（win上可运行npm）并Add to PATH

```
npm install -g hexo
hexo init xjtu-chembioer
cd xjtu-chembioer
npm install hexo-deployer-git --save
```

```
C:\Users\Lenovo\AppData\Roaming\npm
```

常用 [link](https://yushuaigee.gitee.io/2021/01/02/%E4%BB%8E%E9%9B%B6%E5%BC%80%E5%A7%8B%E5%85%8D%E8%B4%B9%E6%90%AD%E5%BB%BA%E8%87%AA%E5%B7%B1%E7%9A%84%E5%8D%9A%E5%AE%A2(%E4%B8%89)%E2%80%94%E2%80%94%E5%9F%BA%E4%BA%8E%20Gitee%20pages%20%E5%BB%BA%E7%AB%99/#3-%E6%B5%8B%E8%AF%95-Gitee-Pages-%E9%A1%B5%E9%9D%A2)

```bash
hexo new "postName" #新建文章
hexo new page "pageName" #新建页面
hexo generate #生成静态页面至public目录
hexo server #开启预览访问端口（默认端口4000，'ctrl + c'关闭server）
hexo deploy #部署到GitHub
hexo help  # 查看帮助
hexo version  #查看Hexo的版本

hexo n
hexo s  # Ctrl+C退出
hexo clean   # 清除缓存
# 更新、提交并部署：（不用在Gitee上手动。。）
hexo g
hexo d
```

更改deploy设置：https://www.jianshu.com/p/b748100ddef1

换主题：clone到文件夹，更改`_config.yml`

```bash
git clone https://github.com/shenliyang/hexo-theme-snippet/ themes/asnippet
git clone https://github.com/https://littleee.github.io/ themes/asnippet
```

```bash
# 在hexo根目录下
npm install --save hexo-pdf
```

如何在hexo博客网页中实现pdf在线预览

https://bibichuan.github.io/posts/5affe24.html

使用hexo等工具，在git上只提交下面的一个`.deploy_git`文件夹。。clone根本没用



## SEO

SEO：search engine optimization

hexo+github pages个人博客做百度、谷歌、bing等搜索引擎收录

https://reiner.host/posts/2262a2b8.html

hexo生成sitemap？

https://cloud.tencent.com/developer/article/1736970

提交你的域名

https://search.google.com/search-console/welcome

> 请求编入索引：已将网址添加到优先抓取队列中。 多次提交同一网页并不能改变该网页的队列顺序或优先级

https://ziyuan.baidu.com/site/index#/

百度资源

# Jekyll

## installation

https://www.jekyll.com.cn/docs/

[Jekyll on Windows | Jekyll • 一个简洁的博客、静态网站生成工具](https://www.jekyll.com.cn/docs/installation/windows/)

https://rubyinstaller.org/



## templates

https://jekyllrb.com/showcase/

Jekyll官网也可以做成程序文档的样子？





## step-by-step guide

https://www.jekyll.com.cn/docs/step-by-step/01-setup/



### Other

Docusaurus is a project for building, deploying, and maintaining open source project websites easily.

mkdocs material



# Thoughts

如果要把自己的code拆成很多个分页面，并且不用手动把每个页面加入到目录中，那么notion和语雀之类的东西反倒是比较有效的，而长得比较好看的那种博客，都要手动设置
那个wiki template是不是也可以这样？
我忘记了docsify那个自动整目录怎么整
然后docsify还有语雀，应该是可以写评论的
语雀就是纯内部用，然后其他平台比较适合公开

语雀的问题：单次上传文件个数限制；不认识的文件格式不让上传

如果放集群使用等信息，需要考虑安全性，那只能是语雀或钉钉群这种，都要验证

其实像Kevin那个repo的形式就挺好的
