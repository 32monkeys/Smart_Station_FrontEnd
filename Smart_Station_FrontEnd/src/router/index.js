import { createRouter, createWebHistory } from 'vue-router'
import AddJourney from '../views/AddJourney.vue'
import CalendarOverview from '../views/CalendarOverview.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/calendar-overview',
    },
    {
      path: '/add-journey',
      name: 'add-journey',
      component: AddJourney,
    },
    {
      path: '/calendar-overview',
      name: 'calendar-overview',
      component: CalendarOverview,
    },
  ],
})

export default router
