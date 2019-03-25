<template>
  <div class="details_container">
    <div class="details_box" v-for="(item , index) in totalList" :key="index">
      <div class="details_title">
        <div class="article_title">{{item.total_title}}</div>
      </div>
      <div class="detaile_article">
        <div class="detaile_author">
          <div class="article_author">作者：{{item.total_author}}</div>
          <div class="article_time">{{item.total_time}}</div>
          <div class="clear"></div>
        </div>
        <!-- <div class="detaile_collect">
          <icon class="iconfont icon-shoucang" style="font-size:20px;"></icon>
        </div>-->
        <div class="article_detail" v-html="item.total_content"></div>
        <div class="clear"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  data() {
    return {
      total_id: this.$route.query.total_id,
      totalList: []
    };
  },
  mounted() {
    this.getTotalDetail();
  },
  methods: {
    //获取文章详情
    getTotalDetail() {
      let obj = {
        total_id: this.total_id
      };
      this.$http.post("/api/total/detail", obj).then(res => {
        this.totalList = res.data.result.data;
      });
    }
  }
};
</script>

<style scoped>
.details_box {
  text-align: left;
}
.details_container {
  padding: 10px;
}

.article_title {
  font-size: 19px;
  letter-spacing: 2px;
  font-weight: 600;
}

.detaile_article {
  color: #999;
  margin-top: 10px;
}

.detaile_author {
  /* float: left; */
  font-size: 14px;
  margin-top: 16px;
}
.article_detail {
  margin-top: 20px;
  /* float: left; */
  line-height: 26px;
  color: #333;
}

.article_author {
  float: left;
}

.article_time {
  float: left;
  margin-left: 50px;
}

.detaile_collect {
  float: right;
  margin-right: 40px;
  position: relative;
  top: -6px;
}

.detaile_content {
  margin-top: 40px;
}

.wxParse-p {
  line-height: 58px;
}

.wxParse-pre {
  background: #e8e8e8;
  line-height: 46px;
}

.wxParse-h4 {
  margin: 16px 0;
}

.wxParse-img {
  width: 100% !important;
}
.detail_collect {
  color: #f44;
} 
</style>
<style>
.article_detail p img {
  width: 100%;
}
.article_detail pre {
  width: 100%;
  overflow: auto;
}
</style>

