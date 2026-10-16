<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight } from 'lucide-vue-next'
import ctaBg from '@/assets/images/about/aboutus.jpg'

gsap.registerPlugin(ScrollTrigger)

const ctaRef = ref(null)

onMounted(() => {
  gsap.from('.cta-content-reveal', {
    y: 50,
    opacity: 0,
    duration: 1.2,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: ctaRef.value,
      start: 'top 80%',
    }
  })

  // Parallax on CTA background
  gsap.to('.cta-bg-img', {
    yPercent: 15,
    ease: 'none',
    scrollTrigger: {
      trigger: ctaRef.value,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    }
  })
})
</script>

<template>
  <section ref="ctaRef" class="section-padding bg-earthy-50 relative overflow-hidden">
    <!-- Inner Box with Primary Background -->
    <div class="bg-primary-950 rounded-[3rem] p-fluid-3 relative overflow-hidden shadow-2xl mx-auto container-wide">
      <!-- Background Image with Overlay -->
      <div class="absolute inset-0 z-0 overflow-hidden">
        <img
          :src="ctaBg"
          alt="Fortune Rise Groups landscape design and garden execution"
          class="cta-bg-img w-full h-[120%] object-cover opacity-20 absolute top-[-10%] will-change-transform"
          loading="lazy"
          decoding="async"
        />
        <!-- Gradient Overlay -->
        <div class="absolute inset-0 bg-gradient-to-r from-primary-950 via-primary-900/90 to-transparent"></div>
      </div>

      <div class="relative z-10 grid grid-cols-1 lg:grid-cols-2 items-center gap-16 lg:gap-24">
        <div class="cta-content-reveal space-y-10">
          <div class="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary-900/50 border border-primary-800 backdrop-blur-sm">
            <span class="w-2 h-2 rounded-full bg-primary-400"></span>
            <span class="text-primary-100 font-medium text-xs uppercase tracking-widest">Limited Availability</span>
          </div>
          <h2 class="text-4xl md:text-6xl lg:text-7xl font-heading font-bold !text-white leading-[1.1] text-balance">
            Ready to <span class="text-primary-400 italic">Elevate</span> Your Outdoor Living Space?
          </h2>
          <p class="text-xl !text-primary-100/90 max-w-xl leading-relaxed">
            From concept to creation, we're here to turn your vision into reality. Let's build something beautiful together.
          </p>
          <div class="flex flex-col sm:flex-row gap-8">
            <RouterLink to="/contact" class="btn-primary text-lg px-10 py-5 group shadow-xl">
              <span>Get a Free Quote</span>
              <ArrowRight class="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </RouterLink>
            <RouterLink to="/projects" class="group flex items-center gap-4 text-white font-medium text-lg hover:text-primary-400 transition-all py-5 px-6">
              <span class="relative">
                View Our Projects
                <span class="absolute bottom-0 left-0 w-full h-[1px] bg-white/20 group-hover:bg-primary-400 transition-colors"></span>
              </span>
            </RouterLink>
          </div>
        </div>

        <div class="hidden lg:flex justify-end items-center">
          <div class="relative w-[28rem] h-[28rem] rounded-full border border-primary-800/30 flex items-center justify-center">
            <div class="absolute inset-0 animate-spin-slow">
              <div class="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-primary-500 rounded-full shadow-[0_0_20px_#3e8c40]"></div>
            </div>
            <div class="w-[22rem] h-[22rem] rounded-full border border-primary-700/50 flex items-center justify-center backdrop-blur-sm">
              <div class="w-[16rem] h-[16rem] rounded-full bg-gradient-to-br from-primary-600 to-primary-800 flex flex-col items-center justify-center text-white shadow-2xl relative group cursor-default overflow-hidden">
                <div class="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-700"></div>
                <span class="text-6xl font-heading font-bold relative z-10">FRG</span>
                <span class="text-xs uppercase tracking-[0.4em] font-bold mt-2 text-primary-200 relative z-10">Est. 2023</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.animate-spin-slow {
  animation: spin 15s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>
