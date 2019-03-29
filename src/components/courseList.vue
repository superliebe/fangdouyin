<template>
    <div class="course_container">
        <div class="close_box">
            <i class="iconfont icon-fanhui" @click="closeList"></i>
            <div class="all_title">轻松学课程</div>
        </div>

        <div class="article_top_nav">
            <div class="top_nav">
                <div class="direction_box">
                    <div class="top_direction" style="border-bottom: 1px solid #e8e8e8;">
                        <div class="all_direction direction_classification" style="margin-left: -6px;">
                            <div class="all_direction_name color_fixed">方向</div>
                        </div>
                        <div class="all_direction direction_classification" v-for="(direction,index) in directionList"
                            :key="index" @click="directionClick(direction.directionId)"
                            :class="clickDirection==direction.directionId?'color_red':''">
                            <div class="all_direction_name">{{direction.classifyName}}</div>
                        </div>

                        <div class="clear"></div>
                    </div>
                </div>
                <div class="classify_box">
                    <div class="top_classify">
                        <div class="all_direction direction_classification" style="margin-left: -6px;">
                            <div class="all_direction_name color_fixed">分类</div>
                        </div>
                        <div class="all_direction direction_classification" @click="classifyClick(0)"
                            :class="clickClassify==0?'color_red':''">
                            <div class="all_direction_name">全部</div>
                        </div>
                        <div class="all_direction direction_classification" v-for="(classify,index) in classifyList"
                            :key="index" @click="classifyClick(classify.classification_id)"
                            :class="clickClassify==classify.classification_id?'color_red':''">
                            <div class="all_direction_name">{{classify.classification_type}}</div>
                        </div>

                        <div class="clear"></div>
                    </div>
                </div>
            </div>
            <div class="article_container">
                <div class="article_box" v-for="(item , index) in courseList" :key="index"
                    @click="getArticleDetail(item.total_id)">
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

        <!--暂无数据-->
        <div class="no_data_box" v-if="courseList==''">
            <div class="no_data_img_box">
                <img class="no_data_img" src="/images/no_data.png">
                <div class="no_data_msg">暂无数据</div>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from "vue";

    export default {
        data() {
            return {
                directionList: [{
                        directionId: 1,
                        classifyName: "前端开发",
                        classifyNum: "12个分类"
                    },
                    {
                        directionId: 2,
                        classifyName: "后台开发",
                        classifyNum: "8个分类"
                    },
                    {
                        directionId: 3,
                        classifyName: "移动开发",
                        classifyNum: "4个分类"
                    },
                    {
                        directionId: 4,
                        classifyName: "数据库",
                        classifyNum: "4个分类"
                    },
                    {
                        directionId: 5,
                        classifyName: "云计算&大数据",
                        classifyNum: "2个分类"
                    },
                    {
                        directionId: 6,
                        classifyName: "运维&测试",
                        classifyNum: "2个分类"
                    },
                    {
                        directionId: 7,
                        classifyName: "UI设计",
                        classifyNum: "4个分类"
                    }
                ],
                classifyList: [{
                        classification_id: 1,
                        classification_type: " HTML / CSS",
                        direction_id: 1
                    },
                    {
                        classification_id: 2,
                        classification_type: "JavaScript",
                        direction_id: 1
                    },
                    {
                        classification_id: 3,
                        classification_type: "Html5",
                        direction_id: 1
                    },
                    {
                        classification_id: 4,
                        classification_type: "CSS3",
                        direction_id: 1
                    },
                    {
                        classification_id: 5,
                        classification_type: "jQuery",
                        direction_id: 1
                    },
                    {
                        classification_id: 6,
                        classification_type: "Node.js",
                        direction_id: 1
                    },
                    {
                        classification_id: 7,
                        classification_type: "AngularJS",
                        direction_id: 1
                    },
                    {
                        classification_id: 8,
                        classification_type: "Bootstrap",
                        direction_id: 1
                    },
                    {
                        classification_id: 9,
                        classification_type: "React.Js",
                        direction_id: 1
                    },
                    {
                        classification_id: 10,
                        classification_type: "Vue.js",
                        direction_id: 1
                    },
                    {
                        classification_id: 11,
                        classification_type: "Sass / Less",
                        direction_id: 1
                    },
                    {
                        classification_id: 12,
                        classification_type: "WebApp",
                        direction_id: 1
                    }
                ],
                courseList: [],
                direction_id: this.$route.query.direction_id,
                clickDirection: this.$route.query.direction_id,
                classification_id: 0,
                clickClassify: 0,
                page: 0,
                loadNextPage: true
            };
        },
        mounted() {
            //   this.getCourseList();
            // this.direction_id = this.$route.query.direction_id;
            // console.log(this.$route.query.direction_id);
            let that = this;
            async function load() {
                await that.getClassify();
                await that.getCourseList();
            }
            load();

            //分页监听滚动条
            window.addEventListener("scroll", this.handleScroll);
        },
        methods: {
            //监听方向点击事件
            directionClick(direction_id) {
                //   console.log(direction_id);
                this.direction_id = direction_id;
                this.clickDirection = direction_id;
                this.classification_id = 0;
                this.clickClassify = 0;
                //   console.log('click'+this.direction_id);
                //   console.log('red'+this.clickDirection);
                this.courseList = [];
                this.page = 0;
                let that = this;
                async function load() {
                    await that.getClassify();
                    await that.getCourseList();
                }
                load();
            },

            //监听点击分类事件
            classifyClick(classification_id) {
                this.classification_id = classification_id;
                this.clickClassify = classification_id;
                //   console.log('click'+this.classification_id);
                //   console.log('red'+this.clickClassify);
                this.courseList = [];
                this.page = 0;
                this.getCourseList();
            },

            //获取分类
            getClassify() {
                let obj = {
                    size: 20,
                    direction_id: this.direction_id
                };
                this.$http.post("/api/classification/list", obj).then(res => {
                    this.classifyList = res.data.result.data;
                    // console.log(JSON.stringify(this.classifyList));
                });
            },

            //分页——滚动条触碰到底部
            handleScroll() {
                let scrollTop =
                    document.documentElement.scrollTop || document.body.scrollTop;
                //判断 如果文档的距离减200小于  屏幕可视距离  加上  滚动条距离顶部的距离，并且 loadNextPage为true ，则page++；
                if (
                    document.documentElement.scrollHeight - 200 <
                    document.documentElement.clientHeight + scrollTop
                ) {
                    if (this.loadNextPage) {
                        // console.log("下一页");
                        this.loadNextPage = false;
                        this.page++;
                        this.getCourseList();
                    }
                }
            },

            //获取文章列表
            getCourseList() {
                if (this.classification_id == 0) {
                    this.classification_id = "";
                }
                let obj = {
                    size: 10,
                    page: this.page,
                    direction_id: this.direction_id,
                    classification_id: this.classification_id
                };
                this.$http.post("/api/total/list", obj).then(res => {
                    // this.courseList = res.data.result.data;
                    //分页进入下一页
                    let data = res.data.result.data;
                    //判断 如果数据个数小于10，不进入下一页，否则loadNextPage设为true进入下一页
                    data.length < 10 ?
                        (this.loadNextPage = false) :
                        (this.loadNextPage = true);
                    //分页连接数组
                    this.courseList = [...this.courseList, ...data];
                    // console.log(JSON.stringify(this.courseList));
                });
            },

            //点击进入文章详情页面
            getArticleDetail(total_id) {
                this.$router.push("/article?total_id=" + total_id);
            },

            //监听返回按钮返回上一页
            closeList(){
                this.$router.go(-1);
            },
        }
    };
</script>

<style scoped>
    /* 返回按钮 */
    .close_box {
        position: absolute;
        top: 20px;
        left: 20px;
    }

    .icon-fanhui {
        font-size: 20px;
    }
    .all_title{
    float: right;
    margin-left: 126px;
    }

    /*暂无数据*/
    .no_data_box {
        text-align: center;
        padding-top: 80px;
    }

    /* 小轮播 */
    .article_top_nav {
        margin-top: 46px;
        padding: 0 10px;
    }

    .direction_box,
    .classify_box {
        width: 100%;
        text-align: left;
    }

    .top_direction,
    .top_classify {
        white-space: nowrap;
        overflow: auto;
    }

    .direction_classification {
        line-height: 18px;
        display: inline-block;
        padding: 18px 10px;
        color: #555;
    }

    .color_fixed {
        color: #000;
    }

    .intercept_border {
        border-bottom: 1px solid #e8e8e8;
        margin-top: 16px;
    }

    .color_red {
        color: #f79f1f;
    }

    /* 文章列表 */
    .article_container {
        margin-top: 16px;
    }

    .article_box {
        margin: 10px 0;
    }

    .article_cover {
        float: left;
        margin-left: 12px;
    }

    .article_cover_img {
        width: 98px;
        height: 72px;
        border-radius: 8px;
    }

    .article_details {
        margin-left: 120px;
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
        margin-right: 8px;
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