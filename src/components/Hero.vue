<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowDown } from 'lucide-vue-next'
import SplitType from 'split-type'
import frgLogo from '@/assets/images/logo/frg_logo_v3.png'

const heroImageModules = import.meta.glob('/src/assets/images/hero/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default'
})

gsap.registerPlugin(ScrollTrigger)

const heroRef = ref(null)
const headlineRef = ref(null)
const subtextRef = ref(null)
const ctaRef = ref(null)
const activeSlideIndex = ref(0)
const slideIntervalMs = 4000
let slideTimer = null

const heroSlides = Object.entries(heroImageModules)
  .sort(([pathA], [pathB]) => pathA.localeCompare(pathB))
  .map(([, src]) => src)

const currentHeroImage = computed(() => {
  if (!heroSlides.length) return ''
  return heroSlides[activeSlideIndex.value % heroSlides.length]
})

const showNextSlide = () => {
  if (heroSlides.length <= 1) return
  activeSlideIndex.value = (activeSlideIndex.value + 1) % heroSlides.length
}

const handleImageError = (e) => {
  e.target.src = heroSlides[0] ?? ''
}

onMounted(() => {
  const isMobile = window.matchMedia('(max-width: 768px)').matches

  if (!isMobile) {
    // Split headline text for character animation on desktop
    const splitHeadline = new SplitType(headlineRef.value, { types: 'chars,words' })
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })

    tl.from(splitHeadline.chars, {
      y: 80,
      opacity: 0,
      rotateX: -90,
      stagger: 0.02,
      duration: 1.2,
    })
      .from(subtextRef.value, {
        y: 20,
        opacity: 0,
        duration: 0.8,
      }, '-=0.8')
      .from(ctaRef.value.children, {
        y: 15,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
      }, '-=0.6')
  } else {
    // Fast, reflow-free animation for mobile devices
    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })
    tl.from(headlineRef.value, { y: 20, opacity: 0, duration: 0.6 })
      .from(subtextRef.value, { y: 15, opacity: 0, duration: 0.6 }, '-=0.4')
      .from(ctaRef.value.children, { y: 10, opacity: 0, stagger: 0.1, duration: 0.5 }, '-=0.3')
  }

  // Parallax effect on background image
  gsap.to('.hero-parallax', {
    yPercent: 20,
    ease: 'none',
    scrollTrigger: {
      trigger: heroRef.value,
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  })

  // Subtle zoom effect on load
  gsap.from('.hero-parallax', {
    scale: 1.05,
    duration: 2.5,
    ease: 'expo.out'
  })

  if (heroSlides.length > 1) {
    slideTimer = window.setInterval(showNextSlide, slideIntervalMs)
  }
})

onUnmounted(() => {
  if (slideTimer) {
    window.clearInterval(slideTimer)
    slideTimer = null
  }
})
</script>

<template>
  <section ref="heroRef" class="relative min-h-[100svh] flex flex-col justify-start items-center overflow-hidden">
    <!-- Background Image -->
    <div class="absolute inset-0 z-0 overflow-hidden">
      <Transition name="hero-fade" mode="out-in">
        <img
          :key="currentHeroImage"
          :src="currentHeroImage"
          alt="Fortune Rise Groups - Landscape Architecture and Garden Design in Hyderabad"
          width="1920"
          height="1080"
          class="hero-parallax w-full h-[120%] object-cover will-change-transform"
          loading="eager"
          fetchpriority="high"
          @error="handleImageError"
        />
      </Transition>
      <!-- Premium Gradient Overlay - Darker at top for visibility -->
      <div class="absolute inset-0 bg-gradient-to-b from-black/85 via-black/30 to-earthy-950/90"></div>
    </div>

    <div class="relative z-10 container-wide px-fluid-2 text-center pt-48 md:pt-64 lg:pt-72 pb-24">
      <h1 ref="headlineRef" class="text-clamp-hero font-heading font-bold !text-white mb-8 leading-[1.1] text-balance drop-shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
        Crafting Nature's <span class="text-primary-400 italic">Masterpieces</span>
      </h1>
      <p ref="subtextRef" class="text-clamp-sub !text-earthy-100 mb-8 max-w-3xl mx-auto font-light leading-relaxed text-balance drop-shadow-lg">
        Bespoke landscaping solutions that transform your outdoor space into a sanctuary of beauty and tranquility.
      </p>
      <!-- Logo below description (mobile only) -->
      <div class="flex justify-center mb-10 lg:hidden">
        <img :src="frgLogo" alt="Fortune Rise Groups logo" width="160" height="160" class="h-36 sm:h-40 w-auto object-contain drop-shadow-[0_4px_20px_rgba(0,0,0,0.5)]" />
      </div>
      <div ref="ctaRef" class="flex flex-col sm:flex-row items-center justify-center gap-8">
        <RouterLink to="/projects" class="btn-primary group text-lg px-10 py-5">
          <span>Explore Our Projects</span>
          <ArrowDown class="w-5 h-5 transition-transform group-hover:translate-y-1" />
        </RouterLink>
        <a href="#about" class="group flex items-center gap-3 text-white font-medium text-lg hover:text-primary-400 transition-all">
          <span class="relative">
            Learn More About Us
            <span class="absolute bottom-0 left-0 w-0 h-[2px] bg-primary-400 transition-all group-hover:w-full"></span>
          </span>
        </a>
      </div>
    </div>

    <!-- Scroll Indicator -->
    <div class="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-4">
      <span class="text-white/40 text-[10px] uppercase tracking-[0.3em] font-medium">Scroll to explore</span>
      <div class="w-[1px] h-16 bg-gradient-to-b from-white/60 to-transparent relative overflow-hidden">
        <div class="absolute top-0 left-0 w-full h-1/2 bg-white animate-scroll-line"></div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.text-clamp-hero {
  font-size: clamp(2.2rem, 10vw, 6.5rem);
}

.text-clamp-sub {
  font-size: clamp(1rem, 2.5vw, 1.5rem);
}

@keyframes scroll-line {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(200%); }
}

.animate-scroll-line {
  animation: scroll-line 2s cubic-bezier(0.7, 0, 0.3, 1) infinite;
}

:deep(.char) {
  display: inline-block;
  will-change: transform, opacity;
}

.hero-fade-enter-active,
.hero-fade-leave-active {
  transition: opacity 900ms ease;
}

.hero-fade-enter-from,
.hero-fade-leave-to {
  opacity: 0;
}
</style>
