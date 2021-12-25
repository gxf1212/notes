# Course Notes

This is the homepage for course notes. Click the sidebar to view.

- structural biology
- molecular immunology
- bioinformatics (part)

**Notes**

1. if you want to include figures, you should set the path as (an example):
   
    ```shell
    <img src="https://gitee.com/gxf1212/notes/raw/master/course/molecular-immunology/molecular-immunology.assets/5-c1q.png" alt="5-c1q" style="zoom:50%;" align="center" />
    ```

    i.e. use the API provided by Gitee. 
    
    And it does not matter whether you use slash or backslash (but it matters locally in Typora...? I hate Windows...).
    
    Then after deploying, you should press Ctrl+F5. Or you will see the cache where the content is not updated!
    
2. note that katex only supports these environments that you often use (of course something other):
   - aligned
   - gathered
   - cases
   - various matrices, array

    check https://upupming.site/docsify-katex/docs/#/supported for more





**Test figure usage**

use the website, a centered figure should look like this:

<img src="https://gitee.com/gxf1212/notes/raw/master/course/molecular-immunology/molecular-immunology.assets/5-c1q.png" alt="5-c1q" style="zoom:50%;" align="center" />

根目录probably not work

<img src="/course/molecular-immunology/molecular-immunology.assets/1-lymphnode.jpg" alt="1-lymphnode" style="zoom:50%;" />

正常本地目录probably not work

<img src="E:/GitHub_repo/notes/course/molecular-immunology/molecular-immunology.assets/1-lymphnode2.jpg" alt="1-lymphnode2" style="zoom:50%;" />

this should ok, but `':size=50%'` does not work locally using provided syntax

![logo](E:\GitHub_repo\notes\course\README.assets\1-lymphnode2.jpg ':size=50%')

![logo](https://gitee.com/gxf1212/notes/raw/master/course/molecular-immunology/molecular-immunology.assets/1-lymphnode2.jpg ':size=100%')

To use the website, should not contain a single backslash, though works normally in Typora...

<img src="https://gitee.com/gxf1212/notes/raw/master/course/molecular-immunology/molecular-immunology.assets\5-c1q.png" alt="5-c1q" style="zoom:50%;" />
