import Vue from 'vue'
import VueRouter from 'vue-router'
import  store  from '../store/index.js'
import Home from '../views/Home.vue'

Vue.use(VueRouter)


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresLogin: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/singin',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/logout',
    name: 'Logout',
    component: () => import('../views/Logout.vue')
  }
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresLogin) && !store.state.userLogged) {
      // set Vuex state's globalError, then redirect
      next("/Login")
  } else {
      next()
  }
})

export default router
