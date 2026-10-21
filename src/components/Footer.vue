<script setup>
import { RouterLink } from 'vue-router'
import { Facebook, Instagram, Twitter, Linkedin, ArrowRight } from 'lucide-vue-next'
import frgLogo from '@/assets/images/logo/frg_logo_v3.png'

const logoSrc = frgLogo

const footerLinks = {
  Services: [
    { name: '3D Landscape Designing', href: '/services' },
    { name: 'Landscape Contractors', href: '/services' },
    { name: 'Garden Maintenance Services', href: '/services' },
    { name: 'Lawn Grass Dealers & Supply', href: '/services' },
    { name: 'Architects For Farm House', href: '/projects/farmhouse' },
    { name: 'Terrace & Roof Gardening', href: '/projects/residences' },
    { name: 'Rock Garden Maintenance', href: '/services' },
    { name: 'Indoor & Office Gardening', href: '/services' }
  ],
  Company: [
    { name: 'About Us', href: '/#about' },
    { name: 'Our Projects', href: '/projects' },
    { name: 'Blog & Case Studies', href: '/blog' },
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

const targetSearchTerms = [
  'Gardening Services',
  'Garden Maintenance Services',
  'Landscape Contractors',
  '3D Landscape Designing Services',
  'Architects For Farm House',
  'Architects For Landscape',
  'Corporate Gift Plant Dealers',
  'Designer Landscape Services',
  'Garden Designers',
  'Garden Developers',
  'Garden Landscaping Services',
  'Gardening Services For Residential',
  'Indoor Gardening Services',
  'Indoor Landscape Designing Services',
  'Landscape Consultants',
  'Landscape Design Consultants',
  'Landscape Designers For Farmhouse',
  'Landscape Designing Services',
  'Landscape Garden Maintenance Services',
  'Landscape Gardening',
  'Lawn Grass Dealers',
  'Lawn Grass Distributors',
  'Office Gardening Services',
  'Outdoor Landscape Designing Services',
  'Rock Garden Maintenance Services',
  'Roof Gardening Services',
  'Terrace Landscape Gardening'
]

const socialIcons = [
  { name: 'Facebook', icon: Facebook, href: 'https://facebook.com' },
  { name: 'Instagram', icon: Instagram, href: 'https://instagram.com' },
  { name: 'Twitter', icon: Twitter, href: 'https://twitter.com' },
  { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com' }
]
</script>

<template>
  <footer class="relative bg-earthy-950 text-white pt-16 pb-8 overflow-hidden">
    <div class="max-w-7xl mx-auto px-6 md:px-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">
        <!-- Logo and Info -->
        <div class="space-y-8">
          <RouterLink to="/" aria-label="Fortune Rise Groups Home" class="inline-flex items-center gap-4 group">
            <img
              :src="logoSrc"
              alt="Fortune Rise Groups logo"
              width="64"
              height="64"
              class="h-16 w-auto object-contain"
            />
            <span class="text-2xl font-heading font-bold text-white tracking-tight leading-tight">
              Fortune Rise <span class="text-primary-300 italic">Groups</span>
            </span>
          </RouterLink>
          <p class="text-earthy-300 leading-relaxed text-lg">
            Elevating the art of nature through innovative 3D landscape design, contracting, and sustainable gardening practices. Creating outdoor sanctuaries across Hyderabad since 2011.
          </p>
          <div class="flex items-center gap-4">
            <a
              v-for="(social, index) in socialIcons"
              :key="index"
              :href="social.href"
              :aria-label="`Visit Fortune Rise Groups on ${social.name}`"
              target="_blank"
              rel="noopener noreferrer"
              class="w-12 h-12 rounded-full border border-earthy-800 flex items-center justify-center hover:bg-primary-600 hover:border-primary-600 transition-all duration-300 group"
            >
              <component :is="social.icon" class="w-5 h-5 text-earthy-300 group-hover:text-white transition-colors" />
              <span class="sr-only">{{ social.name }}</span>
            </a>
          </div>
        </div>

        <!-- Links Columns -->
        <div v-for="(links, title) in footerLinks" :key="title" class="space-y-8">
          <h3 class="text-xl font-heading font-bold text-white uppercase tracking-widest">{{ title }}</h3>
          <ul class="space-y-3.5">
            <li v-for="link in links" :key="link.name">
              <RouterLink
                :to="link.href"
                class="text-earthy-400 hover:text-primary-400 transition-colors flex items-center gap-2 group text-sm"
              >
                <ArrowRight class="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                {{ link.name }}
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>

      <!-- Keyword Internal Linking Cloud for Search Engines & Visitors -->
      <div class="py-8 border-t border-earthy-800/80 mb-6">
        <h4 class="text-xs uppercase tracking-[0.2em] font-semibold text-earthy-400 mb-4">
          Core Landscaping &amp; Gardening Services in Hyderabad &amp; Telangana
        </h4>
        <div class="flex flex-wrap gap-2 text-xs">
          <RouterLink
            v-for="term in targetSearchTerms"
            :key="term"
            to="/services"
            class="px-2.5 py-1 rounded-md bg-earthy-900 border border-earthy-800 text-earthy-400 hover:text-white hover:border-primary-500 hover:bg-primary-950/40 transition-colors"
          >
            {{ term }}
          </RouterLink>
        </div>
      </div>

      <!-- Newsletter and Copyright -->
      <div class="pt-6 border-t border-earthy-800 flex flex-col md:flex-row items-center justify-between gap-6">
        <p class="text-earthy-500 text-sm order-2 md:order-1">
          &copy; 2026 Fortune Rise Groups (FRG Landscapes). All rights reserved.
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
