import { createRouter, createWebHistory } from 'vue-router';
import TheGame from '@/components/TheGame.vue'
import ListCreator from '@/components/ListCreator.vue';

const routes = [
  {
    path: '/create/:whichList',
    component: ListCreator,
    props: true,
  },
  {
    path: '/game/:whichList',
    component: TheGame,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
