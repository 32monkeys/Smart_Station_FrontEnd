import { createRouter, createWebHistory } from 'vue-router'
import AddJourney from '../views/AddJourney.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/add-journey',
      name: 'add-journey',
      component: AddJourney,
    },
  ],
})

export default router
