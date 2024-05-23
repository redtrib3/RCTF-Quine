import { createRouter, createWebHistory } from 'vue-router';
import Challenges from '../views/Challenges.vue';
import NotFound from '../views/404.vue';


const routes = [
  
  {
    path: '/',
    name: 'Challenges',
    component: Challenges,
    meta: {
      title: 'Challenges - redtrib3',
    }
  },
  {
    path: '/:catchAll(.*)',
    name: 'Not-Found',
    component: NotFound,
    meta: {
      hideFooter: true,
      title: 'Not Found'
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to) => {
  document.title = to.meta?.title ?? 'redtrib3'
})

export default router
