import { createRouter, createWebHistory } from 'vue-router'

import Home from "@/components/Home.vue";
import Login from "@/components/Login.vue";
import Registrations from "@/components/Registrations.vue";

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  { path: '/registration',
    component: Registrations }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
