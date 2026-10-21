<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { Menu, X } from 'lucide-vue-next'
import gsap from 'gsap'
import frgLogo from '@/assets/images/logo/frg_logo_v3.png'
import companyProfilePdf from '@/assets/images/about/FORTUNE RISE GROUPS COMPANY PROFILE_v2.pdf'

const route = useRoute()
const isScrolled = ref(false)
const isMenuOpen = ref(false)
const navContainer = ref(null)
const logoSrc = frgLogo

const isHomeRoute = computed(() => route.path === '/' || route.path === '/index.html')
const showBigLogo = computed(() => isHomeRoute.value && !isScrolled.value && !isMenuOpen.value)
const useSolidNavbar = computed(() => !isHomeRoute.value || isScrolled.value || isMenuOpen.value)

const handleScroll = () => {
  // Use a slightly larger threshold for hash jumps
  isScrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  
  // Always check scroll position on mount
  handleScroll()
  
  // Initial entry animation for navbar
  if (navContainer.value) {
    gsap.fromTo(navContainer.value, 
      { y: -30, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        ease: 'power2.out', 
        delay: 0.5,
        clearProps: "y,opacity",
        onComplete: () => {
          handleScroll()
        }
      }
    )
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const navLinks = [
  // { name: 'Home', href: '/index.html#home' },
  { name: 'About', href: '/#about' },
  { name: 'Services', href: '/services' },
  { name: 'Projects', href: '/projects' },
  { name: 'Team', href: '/team' },
  { name: 'Clients', href: '/clients' },
  { name: 'Testimonials', href: '/#testimonials' },
  { name: 'Contact', href: '/contact' },
]
</script>

<template>
  <nav
    :class="[
      'fixed top-0 left-0 w-full z-50 px-fluid-2 transition-[padding] duration-500',
      useSolidNavbar ? 'py-4' : 'py-8'
    ]"
  >
    <div 
      ref="navContainer"
      :class="[
        'nav-container max-w-7xl mx-auto flex justify-between items-center rounded-full px-8',
        useSolidNavbar ? 'py-3 transition-[padding] duration-500' : 'py-2 transition-[padding] duration-500'
      ]"
    >
      <!-- Logo -->

      <RouterLink
        to="/"
        aria-label="Fortune Rise Groups Home"
        class="flex items-center gap-3 group"
      >
        <img
          :src="logoSrc"
          alt="Fortune Rise Groups logo"
          :class="[
            'hidden lg:block w-auto object-contain drop-shadow-sm origin-left transition-all duration-700',
            showBigLogo ? 'h-30 scale-125' : (useSolidNavbar ? 'h-28 scale-95' : 'h-44 scale-100')
          ]"
        />
        <span :class="['text-xl lg:text-2xl font-heading font-bold transition-colors duration-500 tracking-tight hidden sm:inline xl:hidden', useSolidNavbar ? 'text-white' : 'text-white!']">
          Fortune Rise Groups
        </span>
        <span class="sr-only">Fortune Rise Groups Home</span>
      </RouterLink>

      <div
        :class="[
          'hidden xl:flex items-center gap-14 lg:gap-16 rounded-full px-8 py-3 transition-[background-color,border,box-shadow] duration-500',
           useSolidNavbar ? 'bg-earthy-950/92 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.28)] border border-earthy-800/80' : 'bg-transparent border-transparent shadow-none'
        ]"
      >
        <!-- <RouterLink
          to="/index.html#home"
          :class="['text-xl lg:text-2xl font-heading font-bold transition-colors duration-500 tracking-tight whitespace-nowrap', useSolidNavbar ? 'text-white' : 'text-white!']"
        >
          Fortune Rise Groups
        </RouterLink> -->
        <div class="flex items-center gap-8 lg:gap-10">
          <RouterLink
            v-for="link in navLinks"
            :key="link.name"
            :to="link.href"
            :class="[
              'relative font-medium text-xs lg:text-sm uppercase tracking-widest transition-colors duration-300 hover:text-primary-500 group/link',
               useSolidNavbar ? 'text-earthy-300' : 'text-white/90!'
            ]"
          >
            {{ link.name }}
            <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 transition-all duration-300 group-hover/link:w-full"></span>
          </RouterLink>
          <a
            :href="companyProfilePdf"
            target="_blank"
            rel="noopener noreferrer"
            :class="[
              'relative font-medium text-xs lg:text-sm uppercase tracking-widest transition-colors duration-300 hover:text-primary-500 group/link',
               useSolidNavbar ? 'text-earthy-300' : 'text-white/90!'
            ]"
          >
            Our Profile
            <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 transition-all duration-300 group-hover/link:w-full"></span>
          </a>
        </div>
      </div>

      <!-- Mobile Menu Toggle -->
      <button
        :class="[
          'xl:hidden p-2.5 rounded-full transition-colors relative z-50',
          useSolidNavbar
            ? 'bg-earthy-800 border border-earthy-700 hover:bg-earthy-700'
            : 'bg-black/30 border border-white/20 hover:bg-black/50 backdrop-blur-sm'
        ]"
        @click="isMenuOpen = !isMenuOpen"
        aria-label="Toggle menu"
      >
        <Menu v-if="!isMenuOpen" class="w-6 h-6 text-white" />
        <X v-else class="w-6 h-6 text-white" />
      </button>
    </div>

    <!-- Mobile Menu -->
    <Transition
      enter-active-class="transition duration-500 ease-expo-out"
      enter-from-class="opacity-0 -translate-y-10 scale-95"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition duration-300 ease-expo-in"
      leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 -translate-y-10 scale-95"
    >
      <div
        v-if="isMenuOpen"
         class="absolute top-full left-6 right-6 mt-4 bg-earthy-950/95 backdrop-blur-2xl shadow-2xl rounded-4xl xl:hidden flex flex-col p-6 gap-1 border border-earthy-800/80"
      >
        <RouterLink
          to="/"
          class="text-white font-heading font-medium text-base py-2.5 border-b border-earthy-800 flex items-center justify-between group"
          @click="isMenuOpen = false"
        >
          Home
          <span class="text-earthy-400 group-hover:text-primary-500 transition-colors text-lg leading-none">›</span>
        </RouterLink>
        <RouterLink
          v-for="link in navLinks"
          :key="link.name"
          :to="link.href"
           class="text-white font-heading font-medium text-base py-2.5 border-b border-earthy-800 flex items-center justify-between group"
          @click="isMenuOpen = false"
        >
          {{ link.name }}
          <span class="text-earthy-400 group-hover:text-primary-500 transition-colors text-lg leading-none">›</span>
        </RouterLink>
        <a
          :href="companyProfilePdf"
          target="_blank"
          rel="noopener noreferrer"
          class="text-white font-heading font-medium text-base py-2.5 border-b border-earthy-800 flex items-center justify-between group"
          @click="isMenuOpen = false"
        >
          Our Profile
          <span class="text-earthy-400 group-hover:text-primary-500 transition-colors text-lg leading-none">›</span>
        </a>
      </div>
    </Transition>
  </nav>
</template>

<style scoped>
.ease-expo-out {
  transition-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
}
.ease-expo-in {
  transition-timing-function: cubic-bezier(0.95, 0.05, 0.795, 0.035);
}
</style>
