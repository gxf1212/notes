# Deal with videos

关于处理视频、图片（搬运）等技术



# 字幕工作

## 总结

YouTube很多视频本身就带字幕，可以用插件、网站什么的下载：

- youtube-dual-subtitles
- https://downsub.com/

还可以写代码批量下载

没有字幕的也可以用常见的剪辑软件自动识别（如剪映）

但没有特别好的翻译工具，因为YouTube没有自动生成字幕很可能是因为音频质量较差，你识别的也不准



## YouTube&翻译

### 直接获取（手动一个个）

- downsub翻译质量不错 https://downsub.com/

  > subdown好像很垃圾

- https://www.youtube.com/watch?v=eOa1hpvjsW4

  安装Tampermonkey插件，根据下方https://mind.airmore.cn/doc/9a21605043提示安装脚本

- https://www.dual-subtitles.com/zh-CN/whatsnew/3.6.0 这个插件也能下，它跟DownSub的内容似乎一样，断句不太一样。。只能在每个视频的页面上点开、下载

  但他俩的前提都是要YouTube本身提供cc字幕。
  
- 

> - https://checksub.com/   no dual-subtitle, all languages
> - 

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

- 自动翻译字幕，下载SubtitleTranslate？

  [https://github.com/mepeichun/SubtitleTranslate](https://link.zhihu.com/?target=https%3A//github.com/mepeichun/SubtitleTranslate/archive/refs/heads/master.zip)


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
> - Free YouTube Subtitles Download https://www.dvdvideosoft.com/download.htm?fname=FreeYouTubeSubtitlesDownload.exe&ls=allDownloads
>
>   free, failed...and not batch...
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

#### youtube_transcript_api

[youtube-transcript-api](https://github.com/jdepoix/youtube-transcript-api), one-line substitle, it's easier than yt-dlp...

```shell
pip install youtube_transcript_api
youtube_transcript_api 5UuLFnUhkMA --languages en zh-Hans --format srt > xxx.srt
```

we may need `pip install --upgrade youtube-dl` for parsing playlist. You can also do that with simple crawling packages or other toolkits. <font color=red>This is a full workflow I'm using (2023.3.10).</font>

```python
# please switch your vpn to global mode
# paste the link here, execute this block, then choose one of the rest blocks
# this block is just about preparation
url = 'https://www.youtube.com/playlist?list=PLp6SESWaMNKLk5dPAqYlB1NAmqXrrKAA8'

import os, time
sleep = 1
from youtube_dl import YoutubeDL

def youtubeDL(url):
    # https://imyshare.com/article/19/
    ydl = YoutubeDL({'cachedir': False, 'quiet': True, 'extract_flat': True,})
    result = ydl.extract_info(url, download=False,)
    return result

# TODO: we have to provide link to the playlist, not one of the videos with playlist id
info = youtubeDL(url)
ids = [video['id'] for video in info['entries']]
titles = [video['title'] for video in info['entries']]
dirname = info['title']
os.chdir('E:\VideoDownloaded')
if not os.path.exists(dirname):
    os.mkdir(dirname)
os.chdir(dirname)
```

Download

```python
from youtube_transcript_api import YouTubeTranscriptApi
from youtube_transcript_api.formatters import SRTFormatter
formatter = SRTFormatter()
for i in range(len(ids)):
    # get data
    vid = ids[i]
    title = titles[i]
    transcript_list = YouTubeTranscriptApi.list_transcripts(vid)
    transcript = transcript_list.find_transcript(['en'])
    en = transcript.fetch()
    zhHans = transcript.translate('zh-Hans').fetch()
    # match English and Chinese lines
    entime = [str(entry['start']) for entry in en]
    zhtime = [str(entry['start']) for entry in zhHans]
    zhdict = dict(zip(zhtime, zhHans))
    enzhdict = dict(zip(entime, en))
    add_zh = []
    for ek in entime:
        if ek in zhtime:
            enzhdict[ek]['text'] += '\n'+zhdict[ek]['text']
    en_zh = list(enzhdict.values())
    # write into a file
    formatted = formatter.format_transcript(en_zh)
    with open(title+'.srt', 'w', encoding='utf-8') as file:
        file.write(formatted)
    print('Finished no. {} of {} videos: {}'.format(i, len(ids), titles[i]))
    time.sleep(sleep)

```

都没有合并字幕功能，好在不难

各种语言的字幕条数不一样？各种工具下下来的都是

但英语一定是最长的那个嘛？（看起来是没有相同是start time的）

解决办法：把其他语言的按照start time匹配到英语的上



#### debug

`WARNING: [youtube] <urlopen error timed out>. Retrying (1/3)... `

> when I first time met this problem in the command of youtube-dl of downloading, I have tried to change the VPN software V2rayU from the pac mode to (全局)/**global mode**, then everything is ok. Maybe it can help you.

this also solved [youtube-transcript-api](https://github.com/jdepoix/youtube-transcript-api) connection error...

but youtube api:

```
TimeoutError: [WinError 10060] 由于连接方在一段时间后没有正确答复或连接的主机没有反应，连接尝试失败。
```

#### YouTube API

请告诉我使用 Python 从 YouTube API 获取 YouTube 视频的字幕的详细步骤，附上相关的图片、网页链接等

ChatGPT：由于我不能提供图片、链接等，因此只能提供您一个简略的指南。

1. 创建Google API项目：首先，您需要创建一个Google API项目并启用YouTube API，以便使用YouTube API的功能。您可以在Google Developers Console上创建项目（https://console.developers.google.com/）。
2. 获取API密钥：然后，您需要获取YouTube API的密钥，以便使用API访问YouTube视频。
3. 安装必要的库：接下来，您需要安装必要的库，例如Google API Client库。您可以使用pip安装该库：

```shell
pip install --upgrade google-api-python-client
```

1. 获取YouTube视频的ID：接下来，您需要获取YouTube视频的ID，以便在后面使用YouTube API访问该视频。
2. 访问YouTube API：接下来，您需要使用YouTube API访问该视频的字幕，并获取字幕信息。以下是使用Python代码的示例：

```python
from googleapiclient.discovery import build

# Build the service
service = build("youtube", "v3", developerKey="YOUR_API_KEY")

# Call the API to retrieve the caption tracks for a video
video_id = "YOUR_VIDEO_ID"
results = service.captions().list(part="snippet", videoId=video_id).execute()

# Iterate through the captions and print the language and name
for caption in results.get("items", []):
    print("Language: %s" % caption["snippet"]["language"])
    print("Name: %s" % caption["snippet"]["name"])
```

请注意，在上述代码中，您需要替换“YOUR_API_KEY”和“YOUR_VIDEO_

#### other failed

##### crawl from downsub

video url粘进downsub，搜索。按f12，转到“网络”，搜索playlist，~~url copy下来然后请求~~ 直接copy响应值保存到json文件。

这里得到的url和get_info，和中英双语的不一样

最关键的是那个urlEncrypt，每次下载（刷新）都不一样

##### youtube-dl

https://github.com/ytdl-org/youtube-dl

https://imyshare.com/article/19/

CRTubeGet调用它？

`yt_dlp.utils.RegexNotFoundError: Unable to extract Initial JS player n function name`的时候可以直接用youtube-dl程序下载

网速极慢？。。

```shell
pip install --upgrade youtube-dl
youtube-dl -o "E:\VideoDownloaded\immunology\%(title)s.%(ext)s" -f mp4 --write-auto-sub -sub-format srt --sub-lang en,zh -u xxx -p xxx 	https://www.youtube.com/playlist?list=PLqMa4P1M6Ha6iHID5YGXeU_b5WMS-P_f9
```



##### yt-dlp

https://github.com/yt-dlp/yt-dlp

字幕只有vtt文件？用：https://pypi.org/project/vtt-to-srt3/

```shell
pip install -U yt-dlp vtt_to_srt3
yt-dlp --write-auto-subs --sub-format srt --sub-langs en,zh-Hans --skip-download https://www.youtube.com/watch?v=HGykUOcXz-A
vtt_to_srt.py xx.srt
```

https://you-get.org/  no Chinese?

## 获取、识别

下载B站：

> https://gitee.com/KGDKL/BiliCC-Srt   

单个的也可在bilibili助手下载

自己的则在编辑字幕的界面上传和下载

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

## 编辑

确定是否有字幕的方法：找个播放器。。

万兴喵影，编辑srt：https://miao.wondershare.cn/help/video-guide/edit-srt.html

剪映大概也行



[用SrtEdit软件校准字幕时间](https://jingyan.baidu.com/article/925f8cb8fe1132c0dde0563f.html)   [Download here](https://www.pc6.com/softview/SoftView_51082.html)

记住校准所有！！缺点：是不是有些符号不能识别？弄完还要edit一下，去掉乱码



> 下方黑边：https://tieba.baidu.com/p/2232837166
>
> https://jingyan.baidu.com/article/c275f6bafcbf16a23d7567b0.html
>
> 感觉还是用PR。喵影还算方便、多样化，但目前没发现能加在下方
>
> https://www.bilibili.com/s/video/BV1Pa4y1s75q 批量合并字幕用Gihosoft TubeGet，可软，但不知B站是否可
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

# 下载视频等

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



[Question Detail (coursera.support)](https://www.coursera.support/s/question/0D51U00003BlZ0jSAF/purchase-course-to-unlock-this-item-but-i-already-have-the-full-course-by-financial-aid?language=en_US)



## YouTube/各种视频

下载YouTube视频：<font color=red> **CR TubeGet**</font> 。直接搜索下载。

> 特殊时期，只有正版的能成功解析。。



其他的，都只是玩。我下载基本都用**CR TubeGet**了

> also free: https://www.dvdvideosoft.com/en8, and subtitle downloader, converter
>
> Gihosoft TubeGet: good, but not free...老报错，正版的就能成功解析。。

单个视频Google上还挺多，但分辨率限制？

私享视频（private video）：别人看不了，用来生成字幕？

### you-get

命令行，下各种视频：https://github.com/soimort/you-get。B站、YouTube等的playlist应该都行

之前好像用来下过爱奇艺视频，但发现CR TubeGet也能用。现在好像没在用？

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



### 各种视频

免费，解析，各平台：https://jx.618g.com/?url=

在线这个挺好：https://tool.lu/videoparser/ 但爱奇艺是f4v

可下蓝光的：https://www.hotbox.fun 但爱奇艺不可。。

硕鼠：https://www.flvcd.com/  但爱奇艺不可。。

操作：https://www.veryhuo.com/a/view/86746.html

下MOOC：https://www.cnblogs.com/PyJun/p/12917936.html

从html提取剧集网址：https://mp.weixin.qq.com/s?__biz=MzIzMTU2OTkwOQ==&mid=2247484196&idx=1&sn=ebe86680c7a391bf3a5df181867cc947&chksm=e8a363bedfd4eaa84e4e6d842e2e7ab17d38023f630911c371a787d4ea83741877344296b4ac&scene=21#wechat_redirect

https://www.apowersoft.cn/  一个处理视频的网站

短视频截图（封面）可用，本地还是用爱奇艺播放器，左边的相机标志可截图

## 其他

### 歌曲

酷狗音乐上的kgm格式如何转换mp3？ - 知乎 https://www.zhihu.com/question/277580025

插件、解析（可以爬取。。）、软件，都可以

不管用了。。网页端VIP的只给播放1min

[怎么直接下载网页版酷狗音乐上的歌曲，在哪保存-百度经验](https://jingyan.baidu.com/article/2a138328dad459074a134fcc.html)



网易云直接得到mp3：[轻松下载网易云音乐中的歌曲_网易云音乐根据id下载](https://blog.csdn.net/songxiaolingbaobao/article/details/117747808)

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

微信

- https://zhuanlan.zhihu.com/p/23942729



https://mp.weixin.qq.com/s/2FlSEINnaAfjIPdTYDvU3A 百度文库、视频解析



# 剪辑、处理视频

[学生党适合的10款视频剪辑软件！ - 章鱼剪辑的文章 - 知乎](https://zhuanlan.zhihu.com/p/266663791)

[各位 B 站的 up 主们，你们一般用什么视频软件进行剪辑？ - 导演盒饭呢的回答 - 知乎](https://www.zhihu.com/question/48412892/answer/2063926466)

- 剪映（抖音

- 万兴喵影 https://miao.wondershare.cn/

- [PR，见后](#PR)



视频剪辑导出太慢，是配置太菜，或资源被占

万兴耗时间也差不多，最好的分辨率大小也差不多

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



## ffmpeg

crop a video. remove 'to' option: until the end

```shell
ffmpeg -i meeting_01.mp4 -vcodec copy -acodec copy -ss 00:00:37 -to 00:51:00 meeting_01_strip.mp4 -y
```



## 其他

- 必剪：可以加三连啥的，可以识别，不能导入srt
- 裁剪视频：https://split-video.com/zh/ （也要挺久）



## 常识

- 在Premiere Pro cc中，有时视频像素较高，像4K,8K，而我们的电脑配置又不是那么高，在pr中预览视频的时候就会出现卡顿，而代理剪辑就可以对素材进行代理处理，方便我们进行编辑预览

  代理剪辑：如素材为4K视频，直接通过pr软件打开，电脑配置如果不是特别高的话，可能就无法正常预览编辑，而代理剪辑则是将4K视频先进行转码，使我们的电脑可以正常预览剪辑，等编辑完成后在转换成原始4K格式
  
- 视频压制是通过使用一些算法和技术来减小视频文件的大小，以便更容易地存储、传输和共享视频。这些算法和技术可以减少视频中的冗余数据，并对视频进行压缩，从而减小视频文件的大小，而不会对视频的质量产生太大的影响。压制视频的过程可以简单地理解为压缩（编码）+重新制作。在压制视频时，可以根据需要将字幕加入原视频，避免被平台进行二压处理。

  虽然GPU加速可以提高视频压制的速度和效率，但GPU加速在编码速度上可能会稍逊于一些传统的CPU编码器，对于一些对视频质量要求较高的场景，如专业影视制作，仍然推荐使用CPU进行视频压制。

- 



# 其他常用功能

## 处理音频

### 会议纪要

**[腾讯会议 自动会议纪要-操作指南](https://cloud.tencent.com/document/product/1095/53483)**。但是要企业版

[Windows 实时语音转文字](https://blog.csdn.net/qq_41095608/article/details/126308275)

联想语音助手已经满足我的需要了，但是这玩意半天退出不了

最后就用系统自带的录音机。可以上传到钉钉，或加载到剪映以转换成文字



[什么是智能纪要,如何配置智能纪要_钉钉会议](https://help.aliyun.com/document_detail/208719.html) 要钱？

https://www.jianshu.com/p/e3cdd268ef59
顶端搜索“钉钉闪记”

![](E:\GitHub-repo\notes\techniques\images\dingtalk-meeting.jpg)

线下会议应该够用了

其实钉钉和剪映效果差不多，效率和编辑界面都还行

除了钉钉要上传，以及要分开每个文件



https://clideo.com/editor/merge-audio



> 出席人：是参加该会议的人，在会上有发言权，表决权，选举权和被选举权等等所有与会者应有权力；
> 列席人：则是指在别人开会时旁听的人，一般可以发言，但不能表决。



## 录制视频

[Win11录屏没有声音怎么办？Win11录屏带声音的三种方法](https://zhuanlan.zhihu.com/p/562793694)

自带工具就行了。。



腾讯会议录制者好像只会录共享的屏幕……然后只要有人开麦就有声音。但不要单独录音频文件



## 观看视频

去除广告的插件：

- AD block
- 广告终结者

腾讯视频国际版（App）也还好



GreasyFork脚本：[全网VIP视频免费破解去广告、全网音乐直接下载……](https://greasyfork.org/zh-CN/scripts/370634-%E6%87%92%E4%BA%BA%E4%B8%93%E7%94%A8-%E5%85%A8%E7%BD%91vip%E8%A7%86%E9%A2%91%E5%85%8D%E8%B4%B9%E7%A0%B4%E8%A7%A3%E5%8E%BB%E5%B9%BF%E5%91%8A-%E5%85%A8%E7%BD%91%E9%9F%B3%E4%B9%90%E7%9B%B4%E6%8E%A5%E4%B8%8B%E8%BD%BD-%E7%9F%A5%E4%B9%8E%E5%A2%9E%E5%BC%BA-%E7%9F%AD%E8%A7%86%E9%A2%91%E6%97%A0%E6%B0%B4%E5%8D%B0%E4%B8%8B%E8%BD%BD-%E7%99%BE%E5%BA%A6%E7%BD%91%E7%9B%98%E7%9B%B4%E6%8E%A5%E4%B8%8B%E8%BD%BD%E7%AD%89%E5%A4%9A%E5%8A%9F%E8%83%BD%E5%B7%A5%E5%85%B7%E7%AE%B1-%E5%8A%9F%E8%83%BD%E5%8F%AF%E7%8B%AC%E7%AB%8B%E5%BC%80%E5%85%B3-%E9%95%BF%E6%9C%9F%E6%9B%B4%E6%96%B0-%E6%94%BE%E5%BF%83%E4%BD%BF%E7%94%A8-v6)

其实是从别的渠道得到的视频，嵌入到原来的网页中。。所以弹幕之类的有的就没了，且可能不清晰

必须要点左边的vip，选择源



迅雷影音：放视频自动匹配字幕文件。可是它流氓啊？？ 



电脑里的视频画面比声音快是因为配置不够？



# Adobe series

## PR

### basics

- 轨道右侧是工具栏，比如说剃刀工具，可以剪切视频和音频。

- [PR如何给视频的某一段中的局部添加马赛克？ - 知乎](https://www.zhihu.com/question/67869397/answer/2313201400)

- [Premiere Pro 中的语音到文本功能](https://helpx.adobe.com/cn/premiere-pro/using/speech-to-text.html)

- [Adobe premiere怎么把浮动面板关闭？_火星网校](https://www.hxsd.tv/wenda/11068/)

- [PR导入字幕](https://jingyan.baidu.com/article/d621e8daeaee396965913f8f.html)

## Adobe illustrator

- 我们可以按快捷键Ctrl+，就是放大视图，按快捷键Ctrl-就是缩小视图；滚轮是上下，Ctrl+滚轮是左右

  [ai画板上下左右移动快捷键，画板缩小放大快捷键-百度经验](https://jingyan.baidu.com/article/9113f81b7e4bdc2b3314c740.html)

- 使用定界框旋转对象

  1. 选择一个或多个对象。
  2. 使用“选择”工具 ，将位于定界框外部的鼠标指针移近一个定界框手柄，待指针形状变为 之后再拖动鼠标。

- [如何在 Illustrator 中移动、对齐和分布对象 (adobe.com)](https://helpx.adobe.com/cn/illustrator/using/moving-aligning-distributing-objects.html)

## PS

钉钉里那些。。。？



# 秀米

## 文字

- [秀米编辑器如何设置文字上标 - 百度经验](https://jingyan.baidu.com/article/3c48dd34dd97d3a00be358ff.html)
  第三步：在出现的界面中，输入内容后光标定位在需要设置角标的地方，点击【格式】，选择【文字上标】，并在编辑界面中，输入文字即可。

  <img src="https://cdn.jsdelivr.net/gh/gxf1212/notes@master/research/academic-notes.asssets/xiumi-text.png" alt="xiumi-text" style="zoom: 50%;" />

- [第二节 调整细节格式](https://c.xiumi.us/board/v5/2a5va/287435172) 文字格式刷设置
  
- [在秀米中前后元素的重叠规律以及如何改变前后元素的重叠层次 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/430995397)

[微信公众号 Markdown 排版](https://zhuanlan.zhihu.com/p/385098206)

# B站运营

- B站审核：中国地图；敏感词汇：（工人）运动，反gong。。

- B站分段章节、视频链接、问卷等功能  https://www.bilibili.com/read/cv13543699

  > YouTube可自动生成视频章节

- 上传到B站，课程也就1080P，否则压制；动画720P就行了

- 可能必须要参与特定活动才能联合投稿，直接在投稿里面设置就可以。而且我现在创作等级也不够

- 必剪 PC 端可以登录B站账号，在视频作品导出完成后，就能在软件中马上发布。和B站网页版的上传流程、界面完全一致，能够修改封面、添加标签，也能定时发布。

- https://pay.bilibili.com/pay-v2-web/shell_withdraw  创作激励提现



提现



推广金



## 专栏

还真是csdn识别我本地markdown最好


知乎也还行，就是不能在列表中嵌套代码框



B站的代码框只能点点点，不识别markdown

