import Vue from "vue";
import Router from "vue-router";
// import Home from "./views/Home.vue";
import HomeList from "./components/homeList.vue"
import CourseList from "./components/courseList.vue"
import ArticleDetail from "./components/articleDetail.vue"

Vue.use(Router);

export default new Router({
    routes: [
        // {
        //   path: "/",
        //   name: "home",
        //   component: Home
        // },
        // {
        //   path: "/about",
        //   name: "about",
        //   // route level code-splitting
        //   // this generates a separate chunk (about.[hash].js) for this route
        //   // which is lazy-loaded when the route is visited.
        //   component: () =>
        //     import(/* webpackChunkName: "about" */ "./views/About.vue")
        // }
        {
            path: "/",
            name: "homeList",
            //翻页动画效果
            meta:{
                index:1
            },
            component: HomeList
        },
        {
            path: "/course",
            name: "courseList",
            meta:{
                index:2
            },
            component: CourseList
        },
        {
            path:"/article",
            name:"articleDetail",
            
            meta:{
                index:2
            },
            component:ArticleDetail
        }

    ]
});