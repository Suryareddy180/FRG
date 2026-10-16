<script setup>
import { onMounted, onUnmounted } from 'vue'
import Navbar from '../components/Navbar.vue'
import Services from '../components/Services.vue'
import CTA from '../components/CTA.vue'
import Footer from '../components/Footer.vue'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let lenis
let lenisTickerCallback

onMounted(() => {
  const isMobile = window.matchMedia('(max-width: 1024px)').matches || 'ontouchstart' in window
  if (!isMobile) {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })
    lenis.on('scroll', () => ScrollTrigger.update())
    lenisTickerCallback = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(lenisTickerCallback)
    gsap.ticker.lagSmoothing(0)
  }
})

onUnmounted(() => {
  if (lenis) lenis.destroy()
  if (lenisTickerCallback) {
    gsap.ticker.remove(lenisTickerCallback)
    lenisTickerCallback = null
  }
})
</script>

<template>
  <div class="selection:bg-primary-600 selection:text-white bg-white">
    <Navbar />
    <main class="pt-20">
      <Services id="services" />
      <CTA />
    </main>
    <Footer />
  </div>
</template>
