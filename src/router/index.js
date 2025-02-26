import { createRouter, createWebHistory } from 'vue-router';
import BoardList from '../components/BoardList.vue';
import BoardDetail from '../components/BoardDetail.vue';
import BoardCreate from '../components/BoardCreate.vue';

const routes = [
  { path: '/', component: BoardList },
  { path: '/board/read/:id', component: BoardDetail },
  { path: '/board/create', component: BoardCreate } 
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
