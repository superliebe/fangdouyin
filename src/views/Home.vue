<template>
    <div class="container_box" id="video_box">
        <div class="van_swipe">
            <!--vant van-swipe 滑动组件 -->
            <van-swipe :show-indicators="false" @change="onChange" vertical :loop="false">
                <van-swipe-item v-for="(item, index) in videoList" :key="index" class="product_swiper">
                    <div class="video_container">
                        <!--video属性
                    webkit-playsinline ios 小窗播放，使视频不脱离文本流，安卓则无效
                    微信内置x5内核，
                    x5-video-player-type="h5" 启用H5播放器,是wechat安卓版特性，添加此属性，微信浏览器会自动将视频置为全屏
                    x5-video-player-fullscreen="true" 全屏设置，设置为 true 是防止横屏
                    x5-video-orientation 控制横竖屏 landscape 横屏，portrain竖屏； 默认portrain
                    x5-playsinline="" 使安卓实现h5同层播放，实现与ios同样效果，但兼容部分机型
                    poster：封面
                    src：播放地址
                    -->
                        <video class="video_box" width="100%" height="100%" webkit-playsinline="true" x5-playsinline=""
                            x5-video-player-type="h5" x5-video-player-fullscreen="" playsinline preload="auto"
                            :poster="item.cover" :src="item.url" :playOrPause="playOrPause" x-webkit-airplay="allow"
                            x5-video-orientation="portrait" @click="pauseVideo" @ended="onPlayerEnded($event)"
                            loop="loop">
                        </video>
                        <!-- 封面 -->
                        <img v-show="isVideoShow" class="play" @click="playvideo" :src="item.cover" />
                        <!-- 播放暂停按钮 -->
                        <img v-show="iconPlayShow" class="icon_play" @click="playvideo" src="/video/icon_play.png" />
                    </div>
                    <!-- 右侧点赞、分享功能 -->
                    <div class="tools_right">
                        <div class="tools_r_li" @click="changeFollow(item,index)">
                            <i class="iconfont icon-shoucang icon_right" :class="item.follow?'follow_active':''"></i>
                            <div class="tools_r_num">28.1w</div>
                        </div>
                        <div class="tools_r_li" @click="changeShare">
                            <i class="iconfont icon-iconfontforward icon_right"></i>
                            <div class="tools_r_num">5.5w</div>
                        </div>
                    </div>
                    <!-- 底部作品描述 -->
                    <div class="production_box">
                        <div class="production_name">
                            @抖音
                        </div>
                        <div class="production_des">
                            年轻的时候要注意‘养生’，少玩手机多睡觉！少玩手机多睡觉！少玩手机多睡觉！切记少玩手机多睡觉！少玩手机多睡觉！少玩手机多睡觉！@ 抖音小助手
                        </div>
                    </div>
                </van-swipe-item>
            </van-swipe>
            <!--底部操作栏-->
            <div class="container_bottom">
                <div class="bottom_tab" :class="tabIndex==0?'tab_active':''" @click="changeTab(0)">
                    <span class="bottom_tab_span ">首页</span>
                </div>
                <div class="bottom_tab" :class="tabIndex==1?'tab_active':''" @click="changeTab(1)">
                    <span class="bottom_tab_span">我的</span>
                </div>
            </div>
            <!--分享弹框-->
            <!-- <div class="share_hover" v-show="showShareBox"></div> -->
            <div class="share_box" :class="showShareBox?'share_active':''">
                <div class="share_tips">分享到</div>
                <ul class="share_ul">
                    <li class="share_li pengyouquan_li">
                        <i class="iconfont icon-pengyouquan pengyouquan"></i>
                    </li>
                    <li class="share_li">
                        <i class="iconfont icon-weixin weixin"></i>
                    </li>
                    <li class="share_li" @click="copyUrl">
                        <i class="iconfont icon-lianjie lianjie"></i>
                    </li>
                    <div class="clear"></div>
                </ul>
                <div class="share_cancel" @click="cancelShare">取消</div>
            </div>
        </div>
    </div>
</template>
<script>
    import Vue from "vue";
    import {
        Swipe,
        SwipeItem
    } from 'vant';
    Vue.use(Swipe).use(SwipeItem);

    export default {
        name: 'videoChild',
        data() {
            let u = navigator.userAgent;
            return {
                current: 0,
                videoList: [{
                    url: 'http://video.jishiyoo.com/eb978106f01f4eed95db9f537d7d9be8/6dbdc80e5c754784abe2e5be96c5feed-514a8b14506d55be68a9d9e3c2810057-ld.mp4',
                    cover: 'http://bendipin.oss-cn-beijing.aliyuncs.com/images/product-1552213211141.png',
                    follow: false,
                }, {
                    url: 'http://video.jishiyoo.com/4bd2b77bad9b45639564becc2bed8e29/30d4e2b677074d079e8c03698edee232-32ca5c6feec9c6445decdd413320bcea-ld.mp4',
                    cover: 'http://bendipin.oss-cn-beijing.aliyuncs.com/images/product-1552140113110.png',
                    follow: true,
                }, {
                    url: 'http://video.jishiyoo.com/f843c93d4f3f4bee844690fe1fdfc750/28e2548c47ce4d0cb310697f0ca4c7a3-14818dd00765a9a86871da6734b1be28-ld.mp4',
                    cover: 'http://bendipin.oss-cn-beijing.aliyuncs.com/images/product-1552117102331.png',
                    follow: false,
                }, {
                    url: 'http://video.jishiyoo.com/c082827a58584a2c864fa403f1aafabf/d5333562c5c74bcdb5bd3fe92073cd9c-6375039a2dd07d44dfaf66c1a32287ff-ld.mp4',
                    cover: 'http://bendipin.oss-cn-beijing.aliyuncs.com/images/file-1552022662595.png',
                    follow: false,
                }],
                isVideoShow: true,
                playOrPause: true,
                video: null,
                iconPlayShow: true,
                isAndroid: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, // android终端
                isiOS: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
                tabIndex: 0,
                showShareBox: false
            }
        },
        methods: {
            //改变菜单
            changeTab(index) {
                this.tabIndex = index
            },
            //改变收藏状态
            changeFollow(item, index) {
                this.videoList[index].follow = !this.videoList[index].follow
            },
            //展示分享弹窗
            changeShare() {
                this.showShareBox = true
            },
            //取消分享
            cancelShare() {
                this.showShareBox = false
            },
            //滑动改变播放的视频
            onChange(index) {
                //改变的时候 暂停当前播放的视频
                let video = document.querySelectorAll('video')[this.current];
                video.pause();
                this.playOrPause = false;
                this.current = index;
                if (this.isiOS) {
                    //ios切换直接自动播放下一个
                    this.isVideoShow = false;
                    this.pauseVideo()
                } else {
                    //安卓播放时重置显示封面。图标等
                    this.isVideoShow = true;
                    this.iconPlayShow = true
                }
            },
            playvideo(event) {
                let video = document.querySelectorAll('video')[this.current];
                console.log("playvideo：" + this.current);
                this.isVideoShow = false;
                this.iconPlayShow = false
                video.play();
                window.onresize = function () {
                    video.style.width = window.innerWidth + "px";
                    video.style.height = window.innerHeight + "px";
                }

            },
            pauseVideo() { //暂停\播放
                let video = document.querySelectorAll('video')[this.current]
                console.log("pauseVideo" + this.current)
                if (this.playOrPause) {
                    video.pause()
                    this.iconPlayShow = true
                } else {
                    video.play()
                    this.iconPlayShow = false
                }
                this.playOrPause = !this.playOrPause
            },
            onPlayerEnded(player) { //视频结束
                this.isVideoShow = true
                this.current += this.current
            },
            //复制当前链接
            copyUrl() {
                let httpUrl = window.location.href;
                var oInput = document.createElement('input');
                oInput.value = httpUrl;
                document.body.appendChild(oInput);
                oInput.select(); // 选择对象
                document.execCommand("Copy"); // 执行浏览器复制命令
                oInput.className = 'oInput';
                oInput.style.display = 'none';
                alert("链接复制成功")
            }
        }
    }
</script>
<style scoped>
    .clear {
        clear: both;
    }

    .video-player {
        height: 100vh;
        width: 100vw;
    }

    .product_swiper {
        width: 100vw;
        height: 100vh;
    }

    .van_swipe {
        width: 100vw;
        height: 100vh;
    }

    .van-swipe {
        width: 100%;
        height: 100%;
    }

    .container_box {
        width: 100vw;
        height: 100vh;
    }

    .video_box {
        object-fit: fill !important;
        z-index: 999;
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        overflow: hidden;
    }

    video {
        object-position: 0 0;
    }

    .icon_play {
        position: absolute;
        top: 44%;
        right: 0;
        left: 0;
        bottom: auto;
        margin: auto;
        z-index: 999;
        height: 60px;
        background: rgba(0, 0, 0, 0.5);
        border-radius: 50%;
    }

    .play,
    .platStart {
        position: absolute;
        margin: auto;
        top: 0;
        left: 0;
        z-index: 999;
        width: 100%;
        height: 100%;
    }

    /* 点赞，转发 */
    .tools_right {
        z-index: 1001;
        position: absolute;
        right: 16px;
        bottom: 238px
    }

    .tools_r_li {
        margin-bottom: 20px;
        color: #fff;
        font-size: 14px;
    }

    .tools_r_li:last-child {
        margin-bottom: 0px;
    }

    .icon_right {
        margin-bottom: 5px;
        font-size: 42px;
        display: block;
        text-shadow: 0px 0px 10px #9d9d9d;
        /*transition: .5s;*/
    }

    .production_box {
        z-index: 1001;
        position: absolute;
        /* right: 16px; */
        bottom: 60px;
        text-align: left;
        padding: 0 15px 15px 15px;
        color: #fff;
        width: 100%;
        left: 0;
        box-sizing: border-box;
        background: -webkit-linear-gradient(top, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0));
        /* Safari 5.1 - 6.0 */
        background: -o-linear-gradient(top, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0));
        /* Opera 11.1 - 12.0 */
        background: -moz-linear-gradient(top, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0));
        /* Firefox 3.6 - 15 */
        background: linear-gradient(to top, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0));
        /* 标准的语法 */
    }

    .production_name {
        font-weight: 700;
        font-size: 18px;
        margin-bottom: 10px;
    }

    .production_des {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        min-height: 62px;
    }

    .container_bottom {
        position: fixed;
        bottom: 0;
        width: 100%;
        background: rgba(0, 0, 0, 0.2);
        height: 60px;
        border-top: 1px solid rgba(255, 255, 255, 0.7);
    }

    .production_top {
        display: inline-block;
        padding: 6px;
        margin-bottom: 5px;
        background: rgba(0, 0, 0, .3);
        border-radius: 6px;
        margin-top: 5px;
    }

    .product_go {
        color: #fbdd21;
    }

    .production_title {
        margin-left: 4px;
    }

    .bottom_tab {
        width: 50%;
        text-align: center;
        float: left;
        color: #c9c9c9;
        padding: 10px 0;
    }

    .bottom_tab_span {
        line-height: 38px;
        border-bottom: 2px solid transparent;
        font-weight: 600;
        font-size: 16px;
        display: inline-block;
        padding: 0 4px;
        transition: .5s all;
    }

    .tab_active .bottom_tab_span {
        border-bottom: 2px solid #fff;
        color: #fff;
    }

    .icon-shoucang {
        transition: .5s all;
    }

    .follow_active {
        color: #f44;
        animation: showHeart .5s ease-in-out 0s;
    }

    /*animation-name：用来调用@keyframes定义好的动画，与@keyframes定义的动画名称一致*/
    /*animation-duration ：指定元素播放动画所持续的时间*/
    /*animatino-timing-function ： 和transition中的transition-timing-function 中的值一样。根据上面@keframes中分析的animation中可能存在多个小动画，因此这里的值设置是针对每一个小动画所在时间范围内的属性变换速率。*/
    /*animation-delay：定义在浏览器开始执行动画之前等待的时间，这里是指整个animation执行之前的等待时间，而不是上面说的多个小动画*/
    /*animation-iteration-count：定义动画的播放次数，其通常为整数，默认是1,；取值为infinite，动画将无限次的播放。*/
    /*animation-direction：主要用来设置动画播放方向*/
    @keyframes showHeart {
        0% {
            color: #f44;
            transform: scale(1);
        }

        25% {
            color: #fff;
            transform: scale(0);
        }

        80% {
            color: #f44;
            transform: scale(1.2);
        }

        100% {
            color: #f44;
            transform: scale(1);
        }
    }

    /*分享样式*/
    .share_hover {
        position: fixed;
        display: none;

    }

    .share_box {
        position: fixed;
        bottom: -300px;
        width: 100%;
        z-index: 1002;
        background: #fff;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        transition: .5s;
    }

    .share_tips {
        text-align: center;
        line-height: 38px;
        color: #333;
    }

    .share_ul {
        box-sizing: border-box;
        padding: 0 25px 25px;
        border-bottom: 1px solid #e8e8e8;
    }

    .share_li {
        float: left;
        width: 33%;
        text-align: center;
    }

    .share_li i {
        font-size: 44px;
    }

    .share_cancel {
        text-align: center;
        line-height: 48px;
        color: #777;
        text-align: center;
    }

    .pengyouquan {
        color: #47D000;

    }

    .pengyouquan_li {
        animation: rotating 8s linear infinite
    }

    @keyframes rotating {
        from {
            transform: rotate(0)
        }

        to {
            transform: rotate(360deg)
        }
    }

    .weixin {
        color: #20CA2E;
    }

    .lianjie {
        color: #cdcdcd;
    }

    .share_active {
        bottom: 0px;
    }
</style>