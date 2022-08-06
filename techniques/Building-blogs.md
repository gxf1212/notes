# Building blogs



# Build a note site with docsify

## References

read through official! https://docsify.js.org/#/quickstart  生成那种模块API的，或者学习笔记的一个框架

also learn settings and styles from https://github.com/jhildenbiddle/docsify-themeable/tree/master/docs

some translated doc

- https://www.cxyzjd.com/article/jackson0714/105331564
- https://segmentfault.com/a/1190000017576714  

a lot of fancy features: https://zxiaosi.cn/archives/cd1d42d1.html

https://www.yumefx.com/?p=5310

## Basic usage

1. install
   
   ```shell
   sudo npm i docsify-cli -g
   ```

2. serve locally
   
   ```shell
   docsify serve ./ # http://localhost:3000
   ```

3. the first subtitle is not included into the sidebar

### something html

杂记

```html
<p> text </p>
<p align=right> bulabula </p>
<strong> bold text </strong>
<u> underlined text </u>
<li> list item </li>
<!-- comment here -->
<span> 标签被用来组合文档中的行内元素 </span>
<hr> 标签定义 HTML 页面中的主题变化(比如话题的转移),并显示为一条水平线。
<a href='url'> your text </a>
<a href="#main">回到顶部</a>
```

1. `<a>` 标签的 target 属性规定在何处打开链接文档 https://www.w3school.com.cn/tags/att_a_target.asp

### something JavaScript

1. https://blog.csdn.net/sally18/article/details/84326528
   
   点击事件

2. 

## What can docsify do

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

background not solved

```markdown
in coverpage.md
![color](#f0f0f0)
![](_media/bg.png)
```

#### Theme

4 official themes: https://docsify.js.org/#/themes?id=themes and dolphin

```html
<link rel="stylesheet" href="//cdn.jsdelivr.net/npm/docsify@4/lib/themes/vue.css">
<!-- should not miss // and @4! -->
```

some others https://docsify.js.org/#/awesome?id=themes

If you want to modify a theme, download from cdn website rather than GitHub!

> notes
> 
> docsify-themeable is less compatible with 推免服务系统.html
> 
> vue’ s sidebar needs improving

### Show figures

- common md syntax is ok, Windows backslash and Linux slash are all ok. and zooming:
  
  ```html
  <!-- 指定像素值 -->
  ![logo](https://docsify.js.org/_media/icon.svg ':size=50x100')
  ![logo](https://docsify.js.org/_media/icon.svg ':size=100')
  <!-- 支持按百分比缩放 -->
  ![logo](https://docsify.js.org/_media/icon.svg ':size=10%')
  ```
  
  > Typora zooming script is not supported in docsify (but is ok in a normal html, but can center)
  > 
  > already asked in CSDN. https://github.com/HanquanHq/MD-Notes

- no, it supports. But the root directory is not the current directory but the repository’s.....
  
  - in normal md grammar, relative path is ok
  
  - in html, zooming without relative path is ok
  
  - the problem is, in html, <u>it cannot recognize relative path as markdown does (no matter whether zooming)</u>. But it works if you use path relative to the root of repository...which makes figures invisible in local Typora
  
  - 本来还猜测只是重新定义了根目录的原因，加个../就认为是相对路径了。事实上是，不管加不加这些东西，都是从the root of repository开始算的。。所以你以为加了../就是父目录了，其实还是root
    
    but still no luck
  
  - 解决图片问题的思路：
    
    - 上传的时候render为正确的格式
    
    - 把图上传到另一个地方，链接一个网址（缩放？
      
      hexo就是可以渲染出图片，他docsify就是不行
    
    引用网址图片也不行
    
    **解决之道**：要用这个打头（算是git的api？）
    
    https://cdn.jsdelivr.net/gh/gxf1212/notes@master/
    
    其实git他俩用来做图床就是如此
  
  - future tasks:
    
    - centralize figures
    - adjust size, so different from those in Typora!

> relative path
> 
> https://docsify.js.org/#/zh-cn/configuration?id=relativepath not useful
> 
> <font color=red>世界上怎么会有这么傻逼的设计？！！专门跟Typora过不去吗？？不得不改变创作方式！</font>那这话也不合适
> 
> **Test figure usage**
> 
> use the website, a centered figure should look like this:
> 
> <center><img src="https://cdn.jsdelivr.net/gh/gxf1212/notes@master/course/molecular-immunology/molecular-immunology.assets/5-c1q.png" alt="5-c1q" style="zoom:50%;" align="center" /></center>
> 
> `align="center" ` does not work.....`<center></center>` or `<p style="text-align:center;"><p/>` works. 
> 
> I'm not particular about centering. The site looks all right though.
> 
> 根目录probably not work
> 
> <img src="/course/molecular-immunology/molecular-immunology.assets/1-lymphnode.jpg" alt="1-lymphnode" style="zoom:50%;" />
> 
> 正常本地目录probably not work
> 
> <img src="~/desktop/work/Git-repo/notes/course/molecular-immunology/molecular-immunology.assets/1-lymphnode2.jpg" alt="1-lymphnode2" style="zoom:50%;" />
> 
> this should ok, but `':size=50%'` does not work locally using provided syntax
> 
> ![logo](~/desktop/work/Git-repo/notes/course/molecular-immunology/molecular-immunology.assets/1-lymphnode2.jpg ':size=50%')
> 
> ![logo](~/desktop/work/Git-repo/notes/course/molecular-immunology/molecular-immunology.assets/1-lymphnode2.jpg ':size=100%')
> 
> To use the website, should not contain a single backslash in Typora...
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
> ![](https://cdn.jsdelivr.net/gh/gxf1212/notes@master/course/Advanced-biology/molecular-immunology/molecular-immunology.assets/1-lymphnode2.jpg)
> 
> both markdown and html syntax works ok
> 
> <img src="https://cdn.jsdelivr.net/gh/gxf1212/notes@master/course/Advanced-biology/molecular-immunology/molecular-immunology.assets/1-lymphnode2.jpg" style="zoom:50%;" />

## Customize functions

还是有待发展啊！期待更多好玩的功能

TODO list:

- [ ] figure centralize

- [ ] gitee automatically deploy?

- [ ] 打赏

- [ ] 访问量统计：busuanzi

- [ ] \ce的重新render

- [ ] 图片的重新render
  
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
  <span id="sitetime"></span> # in footer['copy']
  <p id="sitetime"></p> # add a linebreak..
  ```

- you should not 

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

  > https://github.com/upupming/docsify-katex LaTeX equation support
  >
  > - [**supported functions**!](https://upupming.site/docsify-katex/docs/#/supported)
  > - https://github.com/upupming/docsify-katex/issues/11 italic fon
  >
  > https://github.com/iPeng6/docsify-sidebar-collapse sidebar collapse

- blacklist:

  ```html
  <script src="//cdn.jsdelivr.net/npm/docsify@latest/lib/docsify.min.js"></script>
  ```

  navbar vanishes!..mouse can't scroll. code highlight is gone.

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

3. syntax supporting problems like:

   - [x] support of textsubscript: must use `<sub></sub>` tag; 

     must add \ to \~ if there are more than two \~. same for ^

   - [x] support of \ce{NaCl}: may use $\text{Al(OH)}_3$...

   - [x] support of `\begin{align*}` ?? as well as gather, equation ...

4. 点击效果

   - 桃心

     ```html
     <script src="//cdn.jsdelivr.net/gh/jerryc127/butterfly_cdn@2.1.0/js/click_heart.js"></script>
     ```

   - 文本，如富强民主文明和谐：use `click-text.js`

     [十个拿来就能用的网页炫酷特效](https://www.toutiao.com/article/7087843770217284132) or [this](https://chowdera.com/2022/194/202207120537561961.html)：蜘蛛网特效等

     重要的js code：

     - `s[e].el.style.cssText = .....`和`i(".heart{width: 10px;height: 10px;position: fixed;background: #f00; .....`是心形版本，并且能调格式。
     - `var arr = new Array(xx, xx)`和`a.innerText = arr[parseInt(arr.length * Math.random())];`配合，是文字版本

     more icons: search, or fontawesome

5. 插件，文字统计 https://github.com/827652549/docsify-count

   阅读进度条[docsify-progress](https://github.com/HerbertHe/docsify-progress) 这个插件与字数插件不兼容

6. sitetime.js：运行时间统计

7. [docsify 构建文档网站之定制功能（全网最全） | 码农家园](https://www.codenong.com/cs107071378/) 

   [ETS' NoteBook - By Mr.Wu - 微信公众号：码客趣分享 🌹](https://notebook.js.org/#/)

   - 显示pdf？

   - Docsify-alerts https://www.npmjs.com/package/docsify-plugin-flexible-alerts

     ```markdown
     > [!NOTE]
     > 
     > [!TIP]
     > 
     > [!WARNING]
     > 
     > [!ATTENTION]
     > 
     ```

     可自定义

8. 更新时间 https://github.com/pfeak/docsify-updated

   write markdown and append to the end

9. PDF reader embedded

   https://github.com/lazypanda10117/docsify-pdf-embed

   uses PDFObject

   - put it between `<body></body>` (not `<head>` as the document said)
   - use relative path to the repository root

10. 也许有一天，博客的课程列表那里能做成iGem那个建模首页那样，文字和图片的。

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

  - modify `live2d_path` if you fork...

    ```js
    const live2d_path = "https://fastly.jsdelivr.net/gh/gxf1212/live2d-widget@master/"
    ```

    also @master in `index.html`. just modify them two when changing the source.

- `waifu.css`

  - the style: size, position, ...

  - see [我的自定义多交互live2d折腾经历 - c10udlnk - 博客园](https://www.cnblogs.com/c10udlnk/p/14727173.html)

- `waifu-tips.js`

  - defines basic events (with messages), functions, icons, models
  - model Id? models also in api? see 我的自定义....
  - 说话
    - 检测用户活动状态：不活动时自动说的话。。
  - consider switching to https://github.com/mosuzi/live_fe/blob/master/assets/waifu-tips.js, to get a toolbar?

- `waifu-tips.json`

  - provides sentences for icons/events (like clicking)?
  - 说话
    - "mouseover": [{"selector": "#live2d"...
    - 

experiences

- L2Dwidget.init 设置大小、调位置咋样都没用。。要clone下来自己改
- 看板娘L2Dwidget盯着鼠标移动（好像已经有了see more settings in the code

[看板娘对话自定义](https://dp2px.com/2019/09/19/hexo-live2d/#live2d-%E7%9C%8B%E6%9D%BF%E5%A8%98%E5%AF%B9%E8%AF%9D%E8%87%AA%E5%AE%9A%E4%B9%89)

> 能响应的：
> \- // 检测用户活动状态，并在空闲时显示消息
> \- window.addEventListener("copy"，"你都复制了些什么呀
> \- window.addEventListener("visibilitychange"，"哇，你终于回来了～"
> \- 欢迎阅读xxx？
> \- "mouseover": [{"selector": "#live2d",
> \- "click": [{"selector": "#live2d",
>  showmessage的text可以是列表？

- [ ] why serve locally, it shows other messages like "傍晚了！窗外夕阳的景色很美丽呢，最美不过夕阳红～"
- [ ] buttons still not there
- [ ] 欢迎阅读「document」

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

# Build Hexo Pages (not organized yet)

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

