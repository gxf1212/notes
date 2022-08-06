# Techniques

This is techniques simulation study page. Click on the sidebar to select a theme and start reading!

The content is continuously being updated.

#### Tutorial share

- [鸟哥的Linux私房菜-基础学习篇](https://gitee.com/gxf1212/notes/raw/master/utils/tutorials/鸟哥的Linux私房菜-基础学习篇(第四版)高清完整书签PDF版.pdf)
- [Linux就该这么学](https://gitee.com/gxf1212/notes/raw/master/utils/tutorials/Linux就该这么学-高清晰PDF.pdf)



#### Notes on docsify and Gitee usage

will be integrated into the page of docsify usage later.

1. if you want to include figures, you should set the path as (an example):

   ```shell
   <img src="https://gitee.com/gxf1212/notes/raw/master/course/molecular-immunology/molecular-immunology.assets/5-c1q.png" alt="5-c1q" style="zoom:50%;" />
   ```

   i.e. use the API provided by Gitee. 

   - And it does not matter whether you use slash or backslash (but it matters locally in Typora...).
   - If centering is needed, you should use `<center></center>`.
   - You should not use space to avoid issues in html (%20).

   > You should write normally in Typora (go back to root), don't change that until figrues are uploaded. 
   >
   > First correct all slashes, then replace `../../` with the website prefix

2. Then after deploying, you should press Ctrl+F5, which will cost ten seconds or so. Or you will see the cache where the content is not updated!

3. note that katex only supports these environments that you often use (of course something other):

   - aligned
   - gathered
   - cases
   - various matrices, array

    check https://upupming.site/docsify-katex/docs/#/supported for more

4. Gitee screened words (“可能包含违禁违规内容，请排查调整后再行重试。”). try to avoid them

   - 某PN
   - 某pǐn（drug）相关

5. including multimedia: all failed as https://www.yumefx.com/?p=5310 said. could as well write html

   > - code
>
   >   ```markdown
   >   [logging代码块](/utils/click-text.js ':include :type=code :fragment=demo')
   >   ```
>
   > - video
>
   >   ```markdown
>   [分子生物物理学课程](https://www.bilibili.com/video/BV1gL411471e ':include :type=video controls width=100%')
   >   ```
   >
   > - audio
>
   > - webpage
>
   >   ```
>   [东山月光下的个人主页](https://space.bilibili.com/441196634 ':include :type=iframe width=100% height=800px')
   >   ```
>
   >   [东山月光下的个人主页](https://space.bilibili.com/441196634 ':include :type=iframe width=100% height=800px')

   <iframe src="//player.bilibili.com/player.html?aid=463175258&bvid=BV1gL411471e&cid=414590978&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" width=100% height=800px > </iframe>

   - 
   
     [cinwell website](https://cinwell.com ':include :type=iframe width=100% height=400px')

6. 

