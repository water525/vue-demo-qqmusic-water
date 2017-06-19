import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {path: '/', redirect: '/home/recom'},
    {
      path: '/home',
      component: Home,
      children: [
        {path: '/home/recom', component: resolve => require(['@/components/Recom.vue'], resolve)},
        {path: '/home/toplist', component: resolve => require(['@/components/Toplist.vue'], resolve)},
        {path: '/home/search', component: resolve => require(['@/components/Search.vue'], resolve)}
      ]
    },
    {path: '/songlist/:id', component: resolve => require(['@/components/SongList.vue'], resolve)}
  ]
});
