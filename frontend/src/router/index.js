import Vue from 'vue'
import VueRouter from 'vue-router'
import  store  from '../store/index.js'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

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
  },
  {
    path: '/post/:id',
    name: 'PostSingle',
    component: () => import('../views/PostSingle.vue')
  },
  {
    path: '/profile/:id',
    name: 'Profile',
    component: () => import('../views/Profile.vue')
  },
  {
    path: '/membres',
    name: 'UserList',
    component: () => import('../components/UsersList.vue')
  },
  {
    path: '/derniers',
    name: 'LastPosts',
    component: () => import('../components/LastPosts.vue')
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
