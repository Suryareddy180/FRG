<script setup>
import { computed, onMounted, onUnmounted } from 'vue'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { clientLogos } from '@/data/clients'

gsap.registerPlugin(ScrollTrigger)

const logoModules = import.meta.glob('@/assets/images/clients/*.{png,jpg,jpeg,webp,svg}', {
  eager: true,
  import: 'default'
})

const logoMap = Object.entries(logoModules).reduce((acc, [path, src]) => {
  const filename = path.split('/').pop()
  if (filename) {
    acc[filename] = src
  }
  return acc
}, {})

const clients = computed(() =>
  clientLogos.map((client) => ({
    ...client,
    src: logoMap[client.file] ?? ''
  }))
)

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
  <div class="selection:bg-primary-600 selection:text-white bg-white min-h-screen">
    <Navbar />

    <main class="pt-36 pb-24 px-fluid-2">
      <section class="container-wide">
        <div class="max-w-4xl mb-12 space-y-4">
          <p class="text-sm uppercase tracking-[0.2em] text-earthy-500">Our Clients</p>
          <h1 class="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-earthy-950">
            Trusted by <span class="text-primary-600 italic">Visionary Partners</span>
          </h1>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          <article
            v-for="client in clients"
            :key="client.name"
            class="rounded-3xl border border-earthy-200 bg-white h-36 md:h-40 p-5 flex items-center justify-center shadow-sm hover:shadow-md transition-shadow"
          >
            <img
              v-if="client.src"
              :src="client.src"
              :alt="`${client.name} logo`"
              class="max-h-full max-w-full object-contain"
              loading="lazy"
            />
            <div
              v-else
              class="text-center text-earthy-700 font-semibold text-sm leading-tight"
            >
              {{ client.name }}
            </div>
          </article>
        </div>
      </section>
    </main>

    <Footer />
  </div>
</template>
