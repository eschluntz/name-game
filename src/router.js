import { createRouter, createWebHistory } from 'vue-router';
import TheGame from '@/components/game/TheGame.vue'
import ListCreator from '@/components/lists/ListCreator.vue';
import AllLists from '@/components/lists/AllLists.vue'

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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
