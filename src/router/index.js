import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Characters.vue'),
    },
    {
      path: '/characters',
      name: 'characters',
      component: () => import('../views/Characters.vue'),
    },
    {
      path: '/characters/:id',
      name: 'character',
      component: () => import('../views/Character.vue'),
    },
    // Will match everything and put it under `route.params.pathMatch`
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: () => import('../views/NotFound.vue'),
    },
  ],
})

export default router
