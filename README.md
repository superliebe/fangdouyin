# vue仿抖音

## 2019年12月最新更新
新增留言功能，优化安卓微信环境境下播放不流畅问题

## 基本介绍
制作仿抖音视频列表遇到很多坑，特别是安卓微信内置浏览器，让人脑壳疼,核心代码不多 便于理解

图标css使用的事iconfot字体库，优化页面加载速度 http://at.alicdn.com/t/font_1048614_mi5i5ba1uag.css

组件用到了vant 中的swiper滑动组件

## video原生参数介绍
```
h5 原生 video 属性
webkit-playsinline ios 小窗播放，使视频不脱离文本流，安卓则无效
微信内置x5内核，
x5-video-player-type="h5-page" 启用H5播放器,是wechat安卓版特性，添加此属性，微信浏览器会自动将视频置为全屏
x5-video-player-fullscreen="true" 全屏设置，设置为 true 是防止横屏
x5-video-orientation 控制横竖屏 landscape 横屏，portrain竖屏； 默认portrain
poster：封面
src：播放地址
loop防止播放视频结束后，显示腾讯的广告
```
## 安装步奏
```
cnpm install
```

### 安装后运行
```
cnpm run serve
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
