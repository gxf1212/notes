# Deal with videos

关于处理视频、图片（搬运）等技术

# 剪辑

[学生党适合的10款视频剪辑软件！ - 章鱼剪辑的文章 - 知乎](https://zhuanlan.zhihu.com/p/266663791)

[各位 B 站的 up 主们，你们一般用什么视频软件进行剪辑？ - 导演盒饭呢的回答 - 知乎](https://www.zhihu.com/question/48412892/answer/2063926466)

- 剪映（抖音

- 万兴喵影 https://miao.wondershare.cn/

## 剪映

剪映的不可取代之处在于：

- 免费识别和导出字幕
- 他俩一些基础的特效，是免费的

剪映要在C盘留缓存

> 清除缓存文件?不影响历史草稿使用，如需使用贴纸、特效等素材将重新下载。
>
> 我的视频呢？缓存明显比界面显示的多。。

notes

- 画面叠放：画面---层级
- 剪映导出就要大，按1920\*1080（**1080p**），调整视频大小为**16:9**

> 导出时才明白，我那个画面太小，按正常720p导出，导致在B站上很小有一堆黑屏。。

## 喵影

Wondershare

> 喵影的不可取代之处在于：
>
> - 字幕的效果也不错
> - 必剪不支持导入srt。。

它好像缓存文件在安装的那里（必剪似乎也是？），但wfp文件保存了视频信息吧。。

## 其他

- 必剪：可以加三连啥的，可以识别，不能导入srt
- 裁剪视频：https://split-video.com/zh/ （也要挺久）

## 常识

- 在Premiere Pro cc中，有时视频像素较高，像4K,8K,而我们的电脑配置又不是那么高,在pr中预览视频的时候就会出现卡顿,而代理剪辑就可以对素材进行代理处理,方便我们进行编辑预览

  代理剪辑：如素材为4K视频,直接通过pr软件打开,电脑配置如果不是特别高的话,可能就无法正常预览编辑,而代理剪辑则是将4K视频先进行转码,使我们的电脑可以正常预览剪辑,等编辑完成后在转换成原始4K格式



# 字幕

## 编辑

确定是否有字幕的方法：找个播放器。。

万兴喵影，编辑srt：https://miao.wondershare.cn/help/video-guide/edit-srt.html

剪映大概也行



[用SrtEdit软件校准字幕时间](https://jingyan.baidu.com/article/925f8cb8fe1132c0dde0563f.html)

记住校准所有！！缺点：是不是有些符号不能识别？弄完还要edit一下，去掉乱码

[PR导入字幕](https://jingyan.baidu.com/article/d621e8daeaee396965913f8f.html)

> 下方黑边：https://tieba.baidu.com/p/2232837166
>
> https://jingyan.baidu.com/article/c275f6bafcbf16a23d7567b0.html
>
> 感觉还是用PR。喵影还算方便、多样化，但目前没发现能加在下方
>
> https://www.bilibili.com/s/video/BV1Pa4y1s75q 批量合并字幕用那个软件，可软，但不知B站是否可
>
> https://zhuanlan.zhihu.com/p/240417302
>
> Arctime和Aegisub可以尝试，对照视频编辑srt字幕。能不能导入导出？
>
> smartling那个用的是CAT tool
>
> https://arctime.org/guide.html
>
> 

## 获取、识别

下载B站：https://gitee.com/KGDKL/BiliCC-Srt   自己的则在编辑字幕的界面上传和下载

> 但是剪映（要转格式）和万兴（有限制）应该都可以识别英文吧

https://jingyan.baidu.com/article/597a0643786861702b5243b4.html

关于剪映识别：

- Indian English识别错误我也没辙
- 有批量替换的功能
- 字幕轴和视频播放轴可跳转

总的来说，编辑文字比万兴好一点

> outdated
>
> 转换工具官网 https://guihet.com/jianyingtool.html 好东西！
>
> JianYingSRT.exe，剪映导出字幕的位置：
>
> C:\Users\Lenovo\AppData\Local\JianyingPro\User Data\Projects\com.lveditor.draft\课程字幕\draft_content.json
>
> 剪映无法导入，其他无法导出，要改英文的话，只能一次改好
>
> 下载B站：https://gitee.com/KGDKL/BiliCC-Srt   自己的则在编辑字幕的界面上传和下载
> 
> 各种文件格式的转换器（要钱） https://gotranscript.com/subtitle-converter vtt转srt
>
> 识别英文：https://www.huiyingzimu.com （已经用掉免费的机会了

## 翻译

- downsub翻译质量不错 https://downsub.com/

  > subdown好像很垃圾

- https://www.youtube.com/watch?v=eOa1hpvjsW4

  安装Tampermonkey插件，根据下方https://mind.airmore.cn/doc/9a21605043提示安装脚本

- https://www.dual-subtitles.com/zh-CN/whatsnew/3.6.0 这个插件也能下，它跟DownSub的内容似乎一样。。只能在每个视频的页面上点开、下载

  但他俩的前提都是要YouTube本身提供cc字幕。

### 如果没有翻译

从剪映中翻译：https://zhuanlan.zhihu.com/p/507350509

工具：https://www.ggzha.com/pc/12999.html            https://guihet.com/

没试过？



[link](https://www.zhihu.com/search?type=content&q=字幕翻译免费)  注意评论区有很多人推荐的

- https://sight.youdao.com/  网易自营的智能转写翻译服务。

  简单，以前偶尔用，但还是不行

  > 每天能免费体验2小时？太好了。
  >
  > 下面那几个渣渣都不能同时识别字幕并翻译
  >
  > 但它识别出的一句话太长了还是不行。。所以必须先用剪映识别再上传翻译（帮助if识别不了。。）
  >
  > 当然，字幕翻译只能做到一条一条局部翻，无法考虑语境。。<u>直接识别似乎能好一点</u>，但是热力学专业名词还是不行
  >
  > 大问题：切断一句话。。。？

- https://www.nikse.dk/SubtitleEdit/Online#  可以用Google、微软翻译。

  https://github.com/SubtitleEdit/subtitleedit/releases  程序

  很快。但需要合并双语的。。还要去掉`</font>`

  似乎也无法考虑语境，如果是字幕翻译的话

  - 可以代替剪辑软件，对着视频来调整英文字幕，如果提前从剪映导出了（当然，刷新就没了）
    - 双击可跳转；似乎不能批量改
  - 当然，改中文还是在万兴里面吧

- （没试过）不过可以先推荐一个能完成第一步的：Google Chrome现在可以为英语视频自动生成字幕。在Chrome中打开【设置】→【高级】→【无障碍】（英文版：Settings→Advanced→Accessibility），如下图所示，开启【实时字幕】选项；Chrome会自动下载实时字幕文件，下载完毕后就可以开始生成字幕了。

> 感觉不太行的
>
> - https://translatesubtitles.com/subtitletranslator/index.php
>
>   确实免费，但只能做到一条一条局部翻，这个热力学的名词仍然不太行
>
> - https://lyndasub.mybanzou.net/
>
>   > 字幕英翻中在线机翻人工校对的翻译工具 – 免费限制版
>   >
>   > 安装此油猴脚本
>   >
>   > 安装过脚本后直接访问本主页 就可以在此下方显示出来了。
>
>   确实免费，但只能做到一条一条局部翻，这个热力学的名词仍然不太行
>
> - http://www.nandongni.com/fanyi
>
>   提出来，放搜狗？（可以指定生物医学话题）但还是无法联系多行
>
> - https://www.zimujiang.com/lan/trans.html 要钱，可以识别和翻译。人工智障。。以后不要用了
>
> - https://github.com/1c7/Translate-Subtitle-File 只是个集成接口
>
>   说明文档 https://doc.tern.1c7.me/zh/folder/setting/#%E4%BA%9A%E9%A9%AC%E9%80%8A
>
> 其他一些可试用的：
>
> - 微软的软件，AI视频字幕
>
> 必须要钱的：
>
> - http://www.autocaption.net/home 还挺快？
> - https://www.1sj.tv/ 人工翻

### 批量获取双语字幕

video url粘进downsub，搜索。按f12，转到“网络”，搜索playlist，~~url copy下来然后请求~~ 直接copy响应值保存到json文件。

这里得到的url和get_info，和中英双语的不一样

最关键的是那个urlEncrypt，每次下载（刷新）都不一样



# 下载

## 国内课程

- 爱课程
- 网易云？

其他

- 中科院 https://v.ucas.ac.cn/main/index.do 显然这位dalao是搬运他们本校的资源
- 西交也有版权，搬不了


## 网课

在线播放、一键全套下载Coursera课程 - 特里斯丹的文章 - 知乎 https://zhuanlan.zhihu.com/p/144752839

下载Coursera视频：https://github.com/FLZ101/dl_coursera

> 下载edX视频：https://github.com/coursera-dl/edx-dl （没试过）

```shell
# dl_coursera --help
conda activate coursera-dl
dl_coursera --cookies coursera.org_cookies.txt --slug dna-sequencing --outdir ./dna-sequencing --how aria2-rpc # all ok

dl_coursera --cookies coursera.org_cookies.txt --slug chemical-biology --outdir ./Coursera/chemical-biology-geneve --how aria2-rpc

```

能再看就不下视频了，当练习

## YouTube/各种视频

下载YouTube视频：CRTubeGet

下原有、自动生成的、机器翻译的YouTube字幕：https://downsub.com/

单个视频Google上还挺多，但分辨率限制？

私享视频（private video）：别人看不了，生成字幕？

### you-get

命令行，下各种视频：https://github.com/soimort/you-get

```shell
conda install you-get ffmpeg

conda activate download

you-get --playlist -o E:\VideoDownloaded\TomAndJerry https://www.iqiyi.com/a_19rrjppomh.html
https://www.iqiyi.com/a_19rrhc3lb9.html
https://www.bilibili.com/video/BV1gL411471e/

you-get -i https://www.iqiyi.com/v_19rrnai4ck.html
# you-get -o E:\VideoDownloaded\TomAndJerry -O 第51集 三只小猫 https://www.iqiyi.com/v_19rrjvc424.html#curid=131128800_266980ee97a4eef2b624603f66714ea4
# https://www.iqiyi.com/v_19rrnai4ck.html  # 高清
you-get -o E:\VideoDownloaded\TomAndJerry 
you-get -o E:\VideoDownloaded 
```

B站、YouTube等的playlist应该都行

> 现在好像没在用？

### youtube-dl

https://github.com/ytdl-org/youtube-dl

CRTubeGet调用？`yt_dlp.utils.RegexNotFoundError: Unable to extract Initial JS player n function name`的时候可以直接用youtube-dl程序下载

```shell
pip install --upgrade youtube-dl
# template
# youtube-dl -o "%(playlist)s/%(playlist_index)s - %(title)s.%(ext)s" https://www.youtube.com/playlist?list=PLqMa4P1M6Ha6iHID5YGXeU_b5WMS-P_f9

conda activate download
youtube-dl -o "E:\VideoDownloaded\immunology\%(title)s.%(ext)s" -f mp4 --write-auto-sub -sub-format srt --sub-lang en,zh -u "Xufan Gao" -p 123465acb 	https://www.youtube.com/playlist?list=PLqMa4P1M6Ha6iHID5YGXeU_b5WMS-P_f9
--embed-subs -k 

# try
conda activate download
# youtube-dl -o "E:\VideoDownloaded\test\%(title)s.%(ext)s" --write-sub --sub-format srt --sub-lang en,zh-Hans -u "Xufan Gao" -p 123465acb https://www.youtube.com/watch?v=HGykUOcXz-A
yt-dlp --write-auto-subs --sub-format srt --sub-langs en,zh-Hans --skip-download https://www.youtube.com/watch?v=HGykUOcXz-A

curl \
  'https://youtube.googleapis.com/youtube/v3/captions/4IrifI8LXo0?tlang=en&key=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' \
  --header 'Authorization: Bearer 203161431239-u3s315gg27fitijtsr2cvbhmkm9veqft.apps.googleusercontent.com' \
  --header 'Accept: application/json' \
  --compressed

```

- must double quote in Windows
- 缺点：网速极慢；合并字幕功能？
- 分辨率那个还是没成功啊！
- 字幕只有vtt文件？

### other APIs

1. https://github.com/jdepoix/youtube-transcript-api

   https://www.geeksforgeeks.org/python-downloading-captions-from-youtube/

   连不上

2. https://pytube.io/

   https://steam.oxxostudio.tw/category/python/example/youtube-download.html#a5

   没有自动字幕

3. https://zhuanlan.zhihu.com/p/422397038   https://www.bilibili.com/video/BV1g44y1t7PY 升级版youtube-dl

   是那种连着两行的（翻译的和之前一样，会有部分缺失）。对应倒是没问题

4. 直接Google API

   https://developers.google.com/explorer-help/code-samples#curl

   https://segmentfault.com/a/1190000012769292

   https://developers.google.com/explorer-help/code-samples#curl

   https://developers.google.com/oauthplayground

   https://developers.google.com/youtube/v3/docs/captions/download?apix=true

5. 

### 各种视频

免费，解析，各平台：https://jx.618g.com/?url=

在线这个挺好：https://tool.lu/videoparser/ 但爱奇艺是f4v

可下蓝光的：https://www.hotbox.fun 但爱奇艺不可。。

硕鼠：https://www.flvcd.com/  但爱奇艺不可。。

操作：https://www.veryhuo.com/a/view/86746.html

下MOOC：https://www.cnblogs.com/PyJun/p/12917936.html

从html提取剧集网址：https://mp.weixin.qq.com/s?__biz=MzIzMTU2OTkwOQ==&mid=2247484196&idx=1&sn=ebe86680c7a391bf3a5df181867cc947&chksm=e8a363bedfd4eaa84e4e6d842e2e7ab17d38023f630911c371a787d4ea83741877344296b4ac&scene=21#wechat_redirect

https://www.apowersoft.cn/  一个处理视频的网站

短视频截图（封面）可用，本地还是用爱奇艺播放器，左边的相机标志

## 其他

### 歌曲

酷狗音乐上的kgm格式如何转换mp3？ - 知乎 https://www.zhihu.com/question/277580025

插件、解析（可以爬取。。）、软件，都可以

不管用了。。网页端VIP的只给播放1min

### 歌词文件

网易云音乐怎么下载歌词? - superDog的回答 - 知乎 https://www.zhihu.com/question/27638171/answer/146004899

### 喜马拉雅

https://tieba.baidu.com/p/6526572524              https://zhuanlan.zhihu.com/p/270928398

网速慢，无法在线转换格式怎么办？

https://www.cnblogs.com/zmdComeOn/p/11600827.html

> 在Python环境里面装的ffmpeg，见前面的download部分
>
> 选项必须在它们影响的文件之前
>
> 这里只要调一下比特率就行
>
> https://stackoverflow.com/questions/42947957/how-to-convert-high-bitrate-mp3-to-lower-rate-using-ffmpeg/43060972#43060972
>
> 不知道为啥就正确了，可能是某些模式下规定了bitrate

迅捷音频转换器是要钱的

但其实，百度网盘里面是可以播放m4a文件的

### 修复视频

https://clideo.com/video-enhancer

Topaz Video Enhance AI（要钱）

### 图片

https://zh-cn.aiseesoft.com/image-upscaler/

全功能 AI 图像放大器，一键提高图像分辨率。大概4K以下免费？

### 课本

外文当然是：https://libgen.unblockit.how/

Z-lib打不开。。

资源库，如：http://library.lol/main/CF53A185682FE6401B62EBFC8E3F539E

### 科研工具

- https://www.its203.com/article/woodcorpse/108068084 100个在线生信小工具_刘永鑫的博客
- https://foxirj.com/typora typora cracked 

### movie

- https://aidi.tv/play/1190-1-1.html  西西里的美丽传说 完整

# B站

- B站审核：中国地图；敏感词汇：（工人）运动，反gong。。

- B站分段章节、视频链接、问卷等功能  https://www.bilibili.com/read/cv13543699

  > YouTube可自动生成视频章节

- 上传到B站，课程也就1080P，否则压制；动画720P就行了

- 可能必须要参与特定活动才能联合投稿，直接在投稿里面设置就可以。而且我现在创作等级也不够

- 必剪 PC 端可以登录B站账号，在视频作品导出完成后，就能在软件中马上发布。和B站网页版的上传流程、界面完全一致，能够修改封面、添加标签，也能定时发布。


# 处理视频

## ffmpeg

crop a video. remove 'to' option: until the end

```shell
ffmpeg -i meeting_01.mp4 -vcodec copy -acodec copy -ss 00:00:37 -to 00:51:00 meeting_01_strip.mp4 -y
```

腾讯会议录制者好像只会录共享的屏幕……然后只要有人开麦就有声音。但不要单独录音频文件







钉钉客户免费享有聊天消息云端存储180天

开通钉钉专业版，内部聊天记录（包含内部群以及内部单聊）保存时间将从180天调整为2年









