import { createRouter, createWebHistory } from 'vue-router'
import VerticalView from '@/views/VerticalView.vue'
import HorizontalView from '@/views/HorizontalView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/v',
      name: 'vertical',
      component: VerticalView
    },
    {
      path: '/h',
      name: 'horizontal',
      component: HorizontalView
    },
    // fallback
    {
      path: '/:pathMatch(.*)*',
      redirect: { name: 'vertical' }
    }
  ]
})

export default router
