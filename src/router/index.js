import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import { applyRouteSeo } from '@/seo'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/projects/:category?',
    name: 'Projects',
    component: () => import('../pages/Projects.vue')
  },
  {
    path: '/project/:projectSlug',
    name: 'ProjectDetail',
    component: () => import('../pages/ProjectDetail.vue'),
    props: true
  },
  {
    path: '/services',
    name: 'Services',
    component: () => import('../pages/ServicesPage.vue')
  },
  {
    path: '/team',
    name: 'Team',
    component: () => import('../pages/TeamPage.vue')
  },
  {
    path: '/clients',
    name: 'Clients',
    component: () => import('../pages/ClientsPage.vue')
  },
  {
    path: '/blog',
    name: 'Blog',
    component: () => import('../pages/BlogPage.vue')
  },
  {
    path: '/faq',
    name: 'FAQ',
    component: () => import('../pages/FAQPage.vue')
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('../pages/ContactPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }

    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    }

    return { left: 0, top: 0, behavior: 'auto' }
  }
})

router.afterEach((to) => {
  applyRouteSeo(to)

  // Force top reset for non-hash routes in case smooth-scroll libraries keep old position.
  if (!to.hash) {
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    })
  }
})

export default router
