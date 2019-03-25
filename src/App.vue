<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">首页</router-link> |
      <router-link to="/about">课程</router-link>
    </div>-->
    <transition :name="transitionName">
      <router-view/>
    </transition>
    <!-- <router-view/> -->
  </div>
</template>

<script>
import Vue from "vue";
export default {
  data() {
    return {
      transitionName: ""
    };
  },
  mounted() {},
  methods: {},
  watch: {
    //使用watch 监听$router的变化
    $route(to, from) {
      //   console.log(to, from);
      //如果to的索引值为0，不添加任何动画；如果to索引大于from索引,判断为前进状态,反之则为后退状态
      if (to.meta.index > 0) {
        if (to.meta.index < from.meta.index) {
          this.transitionName = "slide-right";
        } else {
          this.transitionName = "slide-left";
        }
      } else if (to.meta.index == 0 && from.meta.index > 0) {
        this.transitionName = "slide-right";
      } else if (to.meta.index == 0 && from.meta.index == 0) {
        this.transitionName = "";
      }

      //当然，如果你没有需要设置索引值为0的页面可以直接用着一段
      //   if (to.meta.index < from.meta.index) {
      //     this.transitionName = "slide-right";
      //   } else {
      //     this.transitionName = "slide-left";
      //   }
    }
  },
};
</script>


<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

* {
  margin: 0;
  padding: 0;
}
.clear {
  clear: both;
}

/* 切换动画 */

.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 500ms;
  position: absolute;
}

.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}

.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
</style>
