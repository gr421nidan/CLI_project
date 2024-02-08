import { createRouter, createWebHistory } from 'vue-router'

import Home from "@/components/Home.vue";
import Login from "@/components/Login.vue";
import Registrations from "@/components/Registrations.vue";
import HomeView from "@/views/HomeView.vue";
import Cart from "@/components/Cart.vue";

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  { path: '/registration',
    component: Registrations
  },
  {
    path: '/cart',
    component: Cart
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
