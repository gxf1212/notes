# Specific Software Usage

Here shows some specific experiences on daily working.

Fret not over bygones, and the forward journey take.

> wakeonlan
>
> future: onedrive cloud mount, not occupying  my HD...
>
> 能装/home还是尽量



可以在 C:\texlive\2019\texmf-dist\fonts\opentype（你看你的安装目录）下找一个合适的位置，建一个文件夹，把思源字体拷进去，然后在命令行中输入，fc-cache -fv

建一个Libertinus文件夹，放进去

```
\mathop{\arg\min}\limits_{\alpha} % \limits must follow an operator
\atop %下标换行
```

http://www.noobyard.com/article/p-nymwcdnd-nx.html  插入Python代码升级方案（类似jupyter notebook的配色？）

https://blog.csdn.net/u012428169/article/details/80558331 没有进行特殊命令处理，但是显示的图片和表格标号跟它们在LaTeX编辑环境中放置的章节有关，这并不是一般文章要求的。

https://www.codenong.com/cs106438317/ 解决! Package natbib Error: Bibliography not compatible with author-year



# cloud backup and sync for files in all platforms

> 工作文件的同步备份网盘，alias：私有同步云盘
>
> 总结：https://zhuanlan.zhihu.com/p/65644792 国内外40个
>
> https://mp.weixin.qq.com/s?__biz=MzA5NjEwNjE0OQ==&mid=2247486950&idx=1&sn=696f1a10603f5a4843e407034d36cdd4&source=41#wechat_redirect 详细！
>
> https://funletu.com/1368/.html 国内的汇总。联通沃家云、电信天翼云、移动和彩云
>
> https://zhuanlan.zhihu.com/p/360780042 百度阿里迅雷腾讯详细对比
>
> https://zhuanlan.zhihu.com/p/44103820 如何搭建自己的私有云盘

## Requirement

同步的特点：本地云端都要存，倒不用不同平台都同步；不需要分享文件

考虑的因素：容量；传输速度；价格。尽量别限制流量

其他要求：跨平台能弄就弄；和文件系统结合倒随便；文件大小其实都能解决

> 速度慢也拉倒，但能白嫖大空间的，或交了钱的应该不会限制吧
>
> 那么问题来了，为啥不用git呢。。

Windows上平时文档以100GB为单位，但其实不常更新；加上手机，容量要求500G以下

Linux和iPad上，如果时常要存项目数据，需要TB级别的

但我希望手机、（尤其是）Pad能不仅是同步，而是云端硬盘。。

- win上：软件包（<100G），本科文件（~56G），视频素材？
- 手机：照片、表情包？
- Pad：也就goodnotes（课本、课件、笔记）和xmind了，主要是要云空间

