import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomePage.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/AboutPage.vue')
  },
  {
    path: '/purchase',
    name: 'Purchase',
    component: () => import('../views/PurchasePage.vue')
  },
  {
    path: '/category/:slug',
    name: 'Category',
    component: () => import('../views/CategoryPage.vue')
  },
  {
    path: '/safety',
    name: 'Safety',
    component: () => import('../views/SafetyPage.vue')
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('../views/ContactPage.vue')
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('../views/CartPage.vue')
  },
  {
    path: '/admin/login',
    name: 'AdminLogin',
    component: () => import('../views/admin/AdminLogin.vue')
  },
  {
    path: '/admin',
    name: 'AdminDashboard',
    component: () => import('../views/admin/AdminDashboard.vue'),
    meta: { requiresAuth: true }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 }
  }
})

// Navigation guard for admin routes
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters['auth/isAuthenticated']) {
      next({ name: 'AdminLogin' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
