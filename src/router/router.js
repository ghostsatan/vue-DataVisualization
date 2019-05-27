import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
// 路由懒加载,可以实现首次加载速度慢的问题
const Meshing = resolve => require(['@/components/Meshing/Meshing'], resolve)
const router = new Router({
  // 使用history模式,后端需要修改(链接地址:https://router.vuejs.org/zh/guide/advanced/navigation-guards.html#%E5%85%A8%E5%B1%80%E5%AE%88%E5%8D%AB)
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      // 路由和指向都变化
      redirect: '/Meshing'
      // 路由不变指向变
      // alias:'/Study'
      // component:Study
    },
    {
      path: '/Meshing',
      name: 'Meshing',
      meta: {
        title: '城市运行监控',
        keepAlive: true // 需要缓存
      },
      component: Meshing
    }
  ]
})
// 全局路由守卫(用户超时打开新的路由会跳转到登录页面)
router.beforeEach((to, from, next) => {
  // // to: Route: 即将要进入的目标 路由对象
  // // from: Route: 当前导航正要离开的路由
  // // next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
  // if (document.cookie == undefined||document.cookie==""){
  //   console.log(to.path)
  //   if (to.path === '/login') { // 如果是登录页面路径，就直接next()
  //     next()
  //   } else { // 不然就跳转到登录
  //     next('/login')
  //   }
  // } else {
  //   next()
  // }
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
export default router
