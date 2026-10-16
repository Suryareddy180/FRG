<script setup>
import { RouterLink } from 'vue-router'
import { Facebook, Instagram, Twitter, Linkedin, ArrowRight } from 'lucide-vue-next'
import frgLogo from '@/assets/images/logo/frg_logo_v3.png'

const logoSrc = frgLogo

const footerLinks = {
  Services: [
    { name: 'Landscape Design', href: '/services' },
    { name: 'Irrigation Systems', href: '/services' },
    { name: 'Hardscaping', href: '/services' },
    { name: 'Garden Maintenance', href: '/services' }
  ],
  Company: [
    { name: 'About Us', href: '/#about' },
    { name: 'Our Projects', href: '/projects' },
    { name: 'Blog', href: '/blog' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Our Team', href: '/team' },
    { name: 'Client Testimonials', href: '/#testimonials' },
    { name: 'Contact Us', href: '/contact' }
  ],
  Legal: [
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
    { name: 'Cookie Policy', href: '#' }
  ]
}

const socialIcons = [
  { icon: Facebook, href: '#' },
  { icon: Instagram, href: '#' },
  { icon: Twitter, href: '#' },
  { icon: Linkedin, href: '#' }
]
</script>

<template>
  <footer class="relative bg-earthy-950 text-white pt-16 pb-8 overflow-hidden">
    <div class="max-w-7xl mx-auto px-6 md:px-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">
        <!-- Logo and Info -->
        <div class="space-y-8">
          <RouterLink to="/index.html#home" class="inline-flex items-center gap-4 group">
            <img
              :src="logoSrc"
              alt="Fortune Rise Groups logo"
              class="h-16 w-auto object-contain"
            />
            <span class="text-2xl font-heading font-bold text-white tracking-tight leading-tight">
              Fortune Rise <span class="text-primary-300 italic">Groups</span>
            </span>
          </RouterLink>
          <p class="text-earthy-300 leading-relaxed text-lg">
            Elevating the art of nature through innovative design and sustainable landscaping practices. Creating outdoor sanctuaries since 2011.
          </p>
          <div class="flex items-center gap-4">
            <a
              v-for="(social, index) in socialIcons"
              :key="index"
              :href="social.href"
              class="w-12 h-12 rounded-full border border-earthy-800 flex items-center justify-center hover:bg-primary-600 hover:border-primary-600 transition-all duration-300 group"
            >
              <component :is="social.icon" class="w-5 h-5 text-earthy-300 group-hover:text-white transition-colors" />
            </a>
          </div>
        </div>

        <!-- Links Columns -->
        <div v-for="(links, title) in footerLinks" :key="title" class="space-y-8">
          <h3 class="text-xl font-heading font-bold text-white uppercase tracking-widest">{{ title }}</h3>
          <ul class="space-y-4">
            <li v-for="link in links" :key="link.name">
              <RouterLink
                :href="link.href"
                :to="link.href"
                class="text-earthy-400 hover:text-primary-400 transition-colors flex items-center gap-2 group"
              >
                <ArrowRight class="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                {{ link.name }}
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>

      <!-- Newsletter and Copyright -->
      <div class="pt-8 border-t border-earthy-800 flex flex-col md:flex-row items-center justify-between gap-6">
        <p class="text-earthy-500 text-sm order-2 md:order-1">
          &copy; 2026 FRG Landscapes. All rights reserved. Designed with <span class="text-primary-500">♥</span> for Nature.
        </p>
        <div class="flex items-center gap-8 order-1 md:order-2">
          <p class="text-earthy-300 font-medium">Ready to start? <RouterLink to="/contact" class="text-primary-400 hover:text-primary-300 transition-colors underline decoration-primary-800 underline-offset-8">Get a free quote</RouterLink></p>
        </div>
      </div>
    </div>

    <!-- Background Decorative Element -->
    <div class="absolute -bottom-32 -right-32 w-72 h-72 bg-primary-900 rounded-full blur-3xl opacity-20 pointer-events-none"></div>
  </footer>
</template>
