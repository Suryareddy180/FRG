<script setup>
import { onMounted, onUnmounted } from 'vue'
import Navbar from '../components/Navbar.vue'
import Hero from '../components/Hero.vue'
import About from '../components/About.vue'
import Services from '../components/Services.vue'
import ClientStories from '../components/ClientStories.vue'
import CTA from '../components/CTA.vue'
import Footer from '../components/Footer.vue'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let lenis
let lenisTickerCallback

onMounted(() => {
  // Initialize Lenis for smooth scrolling (desktop only — native scroll on mobile)
  const isMobile = window.matchMedia('(max-width: 1024px)').matches || 'ontouchstart' in window
  if (!isMobile) {
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  })

  lenis.on('scroll', () => {
    ScrollTrigger.update()
  })

  lenisTickerCallback = (time) => {
    lenis.raf(time * 1000)
  }

  gsap.ticker.add(lenisTickerCallback)

  gsap.ticker.lagSmoothing(0)
  }

  // Global ScrollReveal effect
  const revealElements = document.querySelectorAll('.reveal')
  revealElements.forEach((el) => {
    gsap.from(el, {
      y: 60,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      }
    })
  })
})

onUnmounted(() => {
  if (lenis) {
    lenis.destroy()
  }
  if (lenisTickerCallback) {
    gsap.ticker.remove(lenisTickerCallback)
    lenisTickerCallback = null
  }
})
</script>

<template>
  <div class="selection:bg-primary-600 selection:text-white">
    <Navbar />
    <main>
      <Hero id="home" />
      <About id="about" class="reveal" />
      <Services id="services" :is-page="false" class="reveal" />
      <ClientStories id="testimonials" class="reveal" />
      <CTA class="reveal" />
    </main>
    <Footer />
  </div>
</template>

<style>
.reveal {
  will-change: transform, opacity;
}
</style>
