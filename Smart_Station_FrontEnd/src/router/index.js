import { createRouter, createWebHistory } from 'vue-router'
import AddJourney from '../views/AddJourney.vue'
import CalendarOverview from '../views/CalendarOverview.vue'
import DateOverview from '../views/DateOverview.vue'

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
    {
      path: '/date/:date',
      name: 'date-overview',
      component: DateOverview,
      props: true,
    },
  ],
})

export default router
