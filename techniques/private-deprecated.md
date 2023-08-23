# private temp

> https://you-get.org/  no Chinese?
>
> https://github.com/yt-dlp/yt-dlp

```shell
pip install --upgrade youtube-dl
# template
# youtube-dl -o "%(playlist)s/%(playlist_index)s - %(title)s.%(ext)s" https://www.youtube.com/playlist?list=PLqMa4P1M6Ha6iHID5YGXeU_b5WMS-P_f9

conda activate download
youtube-dl -o "E:\VideoDownloaded\immunology\%(title)s.%(ext)s" -f mp4 --write-auto-sub -sub-format srt --sub-lang en,zh -u "Xufan Gao" -p 123465acb 	https://www.youtube.com/playlist?list=PLqMa4P1M6Ha6iHID5YGXeU_b5WMS-P_f9
--embed-subs -k 

# try
pip install -U yt-dlp
conda activate download
# youtube-dl -o "E:\VideoDownloaded\test\%(title)s.%(ext)s" --write-sub --sub-format srt --sub-lang en,zh-Hans -u "Xufan Gao" -p 123465acb https://www.youtube.com/watch?v=HGykUOcXz-A
yt-dlp --write-auto-subs --sub-format srt --sub-langs en,zh-Hans --skip-download https://www.youtube.com/watch?v=HGykUOcXz-A

curl \
  'https://youtube.googleapis.com/youtube/v3/captions/4IrifI8LXo0?tlang=en&key=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' \
  --header 'Authorization: Bearer 203161431239-u3s315gg27fitijtsr2cvbhmkm9veqft.apps.googleusercontent.com' \
  --header 'Accept: application/json' \
  --compressed
 

```

### other APIs

1. https://github.com/jdepoix/youtube-transcript-api

   https://www.geeksforgeeks.org/python-downloading-captions-from-youtube/

   连不上

2. https://pytube.io/

   https://steam.oxxostudio.tw/category/python/example/youtube-download.html#a5

   没有自动字幕

3. https://zhuanlan.zhihu.com/p/422397038   https://www.bilibili.com/video/BV1g44y1t7PY 升级版youtube-dl

   yt-dlp 是那种连着两行的（翻译的和之前一样，会有部分缺失）。对应倒是没问题

   自动翻译字幕，下载SubtitleTranslate：

   [https://github.com/mepeichun/Su](https://link.zhihu.com/?target=https%3A//github.com/mepeichun/SubtitleTranslate/archive/refs/heads/master.zip)

4. 直接Google API

   https://developers.google.com/explorer-help/code-samples#curl

   https://segmentfault.com/a/1190000012769292

   https://developers.google.com/oauthplayground

   https://developers.google.com/youtube/v3/docs/captions/download?apix=true

5. 







#### old try

1. **From here, you should see “on new system”**

   ```shell
   ./configure --prefix=/media/kemove/fca58054-9480-4790-a8ab-bc37f33823a4/programfiles/root-like-programs --enable-float --enable-shared --enable-sse2 --enable-avx --enable-threads
   # SINGLE AND DOUBLE PRECISION: see official manual
   # --enable-float : single. default: double, which is not so useful in gromacs but QM/MM needs it..
   
   make
   make -j install
   ```

   - enter "root" by `su`

     ```shell
     # under the unzipped gromacs directory
     mkdir build
     cd build
     cmake .. \
     -DCMAKE_INSTALL_PREFIX=/media/kemove/fca58054-9480-4790-a8ab-bc37f33823a4/programfiles/gromacs-2021 \
     -DGNX_BUILD_OWN_FFTW=ON \
     -DGMX_FFT_LIBRARY=fftw3 \
     -DFFTWF_LIBRARY=/media/kemove/fca58054-9480-4790-a8ab-bc37f33823a4/programfiles/root-like-programs/fftw-single/lib/libfftw3f.so \
     -DFFTWF_LIBRARY=/media/kemove/fca58054-9480-4790-a8ab-bc37f33823a4/programfiles/root-like-programs/lib/libfftw3f.so \
     -DFFTWF_INCLUDE_DIR=/media/kemove/fca58054-9480-4790-a8ab-bc37f33823a4/programfiles/root-like-programs/include \
     -DGNX_MPI=ON \
     -DGMX_GPU=CUDA \
     -DGMX_CUDA_TOOLKIT_ROOT_DIR=/usr/local/cuda
     # in older versions, -DGMX_GPU=ON 
     make
     make check
     make install
     gedit /.bashrc
     export PATH=$PATH:/media/kemove/fca58054-9480-4790-a8ab-bc37f33823a4/programfiles/gromacs-2021/bin/
     source /media/kemove/fca58054-9480-4790-a8ab-bc37f33823a4/programfiles/gromacs/bin/GMXRC
     ```

     > - library desired path : /media/kemove/fca58054-9480-4790-a8ab-bc37f33823a4/programfiles/root-like-programs (double). single have a separate folder

> - no problem with cuda
> - .. = ../ !!!
> - -DCMAKE_PREFIX_PATH is for cmake to search for library

   problems:

- > Could not find fftw3f library named libfftw3f, please specify its location in CMAKE_PREFIX_PATH or FFTWF_LIBRARY by hand (e.g. -DFFTWF_LIBRARY='/path/to/libfftw3f.so')
  > CMake Error at cmake/gmxManageFFTLibraries.cmake:92 (MESSAGE):
  > Cannot find FFTW 3 (with correct precision - libfftw3f for mixed-precision
  > GROMACS or libfftw3 for double-precision GROMACS).  Either choose the right
  > precision, choose another FFT(W) library (-DGMX_FFT_LIBRARY), enable
  >
  > the

  >   advanced option to let GROMACS build FFTW 3 for you
  >   (-DGMX_BUILD_OWN_FFTW=ON), or use the really slow GROMACS built-in fftpack
  >   library (-DGMX_FFT_LIBRARY=fftpack).

  solved

- 上次装到：运行install.sh，报的信息放在build父目录的output。realvnc也不行

  ```
  
  ```

  CMake Warning:
    Manually-specified variables were not used by the project:

      GMX_CUDA_TOOLKIT_ROOT_DIR
       GNX_BUILD_OWN_FFTW
      GNX_MPI

  ```
  
  ```

so the successful version is 

```shell
cmake .. -DCMAKE_INSTALL_PREFIX=/media/kemove/fca58054-9480-4790-a8ab-bc37f33823a4/programfiles/gromacs-2021-gpu \
-DGMX_MPI=ON -DCMAKE_C_COMPILER=mpicc -DCMAKE_CXX_COMPILER=mpicxx \
-DGMX_FFT_LIBRARY=fftw3 -DCMAKE_PREFIX_PATH=/media/kemove/fca58054-9480-4790-a8ab-bc37f33823a4/programfiles/root-like-programs/fftw-single/ \
-DREGRESSIONTEST_DOWNLOAD=ON \
-DGMX_GPU=CUDA -DCUDA_TOOKIT_ROOT_DIR=/usr/local/cuda/

make -j 6
make check
make install
```

- guide on cmake: https://blog.csdn.net/wgw335363240/article/details/37758337

  - > CMake Error: The current CMakeCache.txt directory /media/kemov`:q!` 强制退出，不保存

  - openssl: https://www.cnblogs.com/new-journey/p/13323301.html





# Other---the first time I install Ubuntu

not helpful now

> 既然可以制定路径，那为啥不新建一个文件夹呢？以后还是直接在programfiles吧

## thinking

### todo

1. language!!
2. how to directly operate files in that mechanical hard disk...rather than in command line
3. anaconda
   2. cuda, cudnn
   3. gromacs, ...
4. connection
   1. Linux账户和密码，访问密码，SSH等
5. gnome desktop, and beautify kde
6. 

### extra things I did

- installed `build-essential`, which helps compile c and c++ (gcc?..) 

  https://blog.csdn.net/yzpbright/article/details/81515459

- installed `fcitx-libpinyin`

- failed to install `nextstrain`

### my objective

don't do too much on this machine, like writing LaTeX...

just be a helper calculator, and a platform to learn Linux. (zheteng is allowed)

(dad could use it too, but keep good organization)

# Other thing I did at Fedora and KDE

Try to be clear about the commands for Dedian/RedHat systems!

## installation

1. typora

   - https://github.com/RPM-Outpost/typora in fedora, generate a rpm package

     ```
     yum install rpm-build -y
     ```

   - theme directory (in Fedora): 

     ```
     /var/lib/flatpak/app/io.typora.Typora/x86_64/stable/67e4ba33309d2516bf011b564be7292dc9a5a1fa46c3bfb0a4a09b8f647cec52/files/typora/resources/app/style/themes
     ```

- use sync in firefox to share with pc...but I can **ctrl+c,v**..

- maybe I'll send email to send files from laptop..

- screenshot: PrtSc. Kolourpaint.

- ocr: ru

  ```
  /home/user/Desktop/work/xufan/bin/Image2LaTeX-linux/bin/Image2LaTeX
  ```

  ```
  killall -9 FoxitReader
  ```

## library

https://libfaq.nus.edu.sg/faq/71315

google scholar, pubmed

all from library home!

