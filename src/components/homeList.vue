<template>
    <div class="home_container">
        <div class="menu_div second_menu">
            <div class="recommend_navigation">
                <div class="recommend_direction direction_first" @click="coursePage(1)">
                    <img class="recommend_img" src="/images/icon_web.png">
                    <div class="recommend_name recommend_name1">Web前端攻城狮</div>
                </div>
                <div class="recommend_direction direction_second" @click="coursePage(3)">
                    <img class="recommend_img" src="/images/icon_ios.png">
                    <div class="recommend_name recommend_name2">iOS攻城狮</div>
                </div>
                <div class="recommend_direction direction_third" @click="coursePage(3)">
                    <img class="recommend_img" src="/images/icon_android.png">
                    <div class="recommend_name recommend_name3">Android攻城狮</div>
                </div>
                <div class="recommend_direction direction_fourth" @click="coursePage(2)">
                    <img class="recommend_img" src="/images/icon_java.png">
                    <div class="recommend_name recommend_name4">后台攻城狮</div>
                </div>
                <div class="clear"></div>
            </div>
            <div class="article_container">
                <div class="article_box" v-for="(item ,index) in allList" :key="index" @click="getArticleDetail(item.total_id)">
                    <div class="article_cover">
                        <img :src="item.total_cover" class="article_cover_img">
                    </div>
                    <div class="article_details">
                        <div class="article_title">
                            <div class="article_details_title">{{item.total_title}}</div>
                        </div>
                        <div class="article_author_class">
                            <div class="article_details_author">作者：{{item.total_author}}</div>
                            <div class="article_details_class">{{item.total_time}}</div>
                            <div class="clear"></div>
                        </div>
                    </div>
                    <div class="clear"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from "vue";

    export default {
        data() {
            return {
                allList: [],
                page: 0,
                loadNextPage: true,
            };
        },
        mounted() {
            this.getArticle();
            //分页监听滚动条
            window.addEventListener("scroll", this.handleScroll);
        },
        methods: {
            //分页——滚动条触碰到底部
            handleScroll() {
                let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                if (document.documentElement.scrollHeight - 200 < document.documentElement.clientHeight + scrollTop) {
                    // console.log(3333333)
                    if (this.loadNextPage) {
                        // console.log("下一页");
                        this.loadNextPage = false;
                        this.page++;
                        this.getArticle();
                    }
                }
            },

            //请求数据列表
            getArticle() {
                let obj = {
                    page: this.page,
                    size: 10
                };
                this.$http.post("/api/total/list", obj).then(res => {
                    //分页进入下一页
                    let data = res.data.result.data;
                    data.length < 10 ? this.loadNextPage = false : this.loadNextPage = true;
                    //分页连接数组
                    this.allList = [...this.allList, ...data];

                    //   console.log(JSON.stringify(this.allList));
                });

            },

            //跳转课程页面
            coursePage(directionId) {
                //   console.log(directionId)
                this.$router.push("/course?direction_id=" + directionId);
            },

            //点击进入文章详情页面
            getArticleDetail(total_id) {
                this.$router.push("/article?total_id=" + total_id);
            }
        }
    };
</script>

<style scoped>
    .recommend_navigation {
        background: #f9f9f9;
    }

    .recommend_direction {
        height: 130px;
        width: 43%;
        border-radius: 16px;
        float: left;
        margin: 8px 13px;
    }

    .direction_first {
        background: #ffdec1;
        box-shadow: 2px 2px 10px 0px #ffdec1;
    }

    .direction_second {
        background: #d9f4ee;
        box-shadow: 2px 2px 10px 0px #d9f4ee;
    }

    .direction_third {
        background: #cbecd7;
        box-shadow: 2px 2px 10px 0px #cbecd7;
    }

    .direction_fourth {
        background: #f2c6dc;
        box-shadow: 2px 2px 10px 0px #f2c6dc;
    }

    .recommend_img {
        height: 74px;
        width: 74px;
        margin: 14px 20px 0px;
    }

    .recommend_name {
        text-align: center;
        margin-top: 8px;
    }

    .recommend_name1 {
        color: #ff7e0c;
    }

    .recommend_name2 {
        color: #4cd2da;
    }

    .recommend_name3 {
        color: #50cb78;
    }

    .recommend_name4 {
        color: #ff1278;
    }

    /* 文章列表 */
    .article_box {
        margin: 22px 0;
    }

    .article_cover {
        float: left;
        margin-left: 12px;
    }

    .article_cover_img {
        width: 110px;
        height: 80px;
        border-radius: 8px;
    }

    .article_details {
        margin-left: 134px;
    }

    .article_author_class {
        color: #999;
        font-size: 14px;
        border-bottom: 2px solid #e8e8e8;
    }

    .article_details_author {
        float: left;
    }

    .article_details_class {
        float: right;
        margin-right: 14px;
    }

    .article_title {
        height: 52px;
    }

    .article_details_title {
        text-align: left;
        font-size: 16px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
    }
</style>