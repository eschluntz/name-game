import { createRouter, createWebHistory } from 'vue-router';
import TheGame from '@/components/game/TheGame.vue'
import ListCreator from '@/components/lists/ListCreator.vue';
import AllLists from '@/components/lists/AllLists.vue'
import Error404 from '@/components/Error404.vue'

const routes = [
  {
    path: '/create',
    component: ListCreator,
  },
  {
    path: '/lists',
    component: AllLists,
  },
  {
    path: '/edit/:initWhichList',
    component: ListCreator,
    props: true,
  },
  {
    path: '/game/:whichList',
    component: TheGame,
    props: true,
  },
  {
    path: '/',
    redirect: '/game/ceos'
  },
  {                                                                                                                                                                                   
    path: '/:pathMatch(.*)*',                                                                                                                                                         
    name: 'error404',                                                                                                                                                                                      
    component: Error404                                                                                                                                                               
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
