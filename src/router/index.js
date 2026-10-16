import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Projects from '../pages/Projects.vue'
import ProjectDetail from '../pages/ProjectDetail.vue'
import ServicesPage from '../pages/ServicesPage.vue'
import TeamPage from '../pages/TeamPage.vue'
import ContactPage from '../pages/ContactPage.vue'
import ClientsPage from '../pages/ClientsPage.vue'
import BlogPage from '../pages/BlogPage.vue'
import FAQPage from '../pages/FAQPage.vue'
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
    component: Projects
  },
  {
    path: '/project/:projectSlug',
    name: 'ProjectDetail',
    component: ProjectDetail,
    props: true
  },
  {
    path: '/services',
    name: 'Services',
    component: ServicesPage
  },
  {
    path: '/team',
    name: 'Team',
    component: TeamPage
  },
  {
    path: '/clients',
    name: 'Clients',
    component: ClientsPage
  },
  {
    path: '/blog',
    name: 'Blog',
    component: BlogPage
  },
  {
    path: '/faq',
    name: 'FAQ',
    component: FAQPage
  },
  {
    path: '/contact',
    name: 'Contact',
    component: ContactPage
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
