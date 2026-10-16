<script setup>
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Sprout, Eye, Target, ArrowRight } from 'lucide-vue-next'
import aboutImg from '@/assets/images/about/aboutus.jpg'

gsap.registerPlugin(ScrollTrigger)

const aboutRef = ref(null)

const handleImageError = (e) => {
  e.target.src = 'https://picsum.photos/1000/1200'
}

onMounted(() => {
  // Parallax on the about image
  gsap.to('.about-image-img', {
    yPercent: 15,
    ease: 'none',
    scrollTrigger: {
      trigger: aboutRef.value,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    }
  })

  // Reveal animations for sections
  const reveals = gsap.utils.toArray('.about-reveal')
  reveals.forEach((el) => {
    gsap.from(el, {
      y: 40,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    })
  })
})
</script>

<template>
  <section ref="aboutRef" class="relative bg-white overflow-hidden py-24 md:py-32 px-fluid-2">
    <!-- Soft background textures -->
    <div class="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40">
      <div class="absolute top-1/4 -right-24 w-96 h-96 bg-primary-50 rounded-full blur-[120px]"></div>
      <div class="absolute bottom-1/4 -left-24 w-96 h-96 bg-earthy-100 rounded-full blur-[120px]"></div>
    </div>

    <div class="container-wide relative z-10">
      <!-- Storytelling About Section -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center mb-32">
        <!-- Image Side -->
        <div class="hidden lg:block lg:col-span-6 about-reveal">
          <div class="relative aspect-[4/5] overflow-hidden rounded-[3rem] shadow-2xl group">
            <img
              :src="aboutImg"
              alt="Lush green garden"
              class="about-image-img w-full h-[120%] object-cover absolute top-[-10%]"
              loading="auto"
              decoding="async"
              @error="handleImageError"
            />
            <div class="absolute inset-0 bg-primary-900/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
        </div>

        <!-- Content Side -->
        <div class="lg:col-span-6 space-y-8 about-reveal">
          <div class="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary-50 border border-primary-100 mb-4">
            <Sprout class="w-4 h-4 text-primary-600" />
            <span class="text-primary-700 font-bold text-xs uppercase tracking-widest">Our Story</span>
          </div>
          
          <h2 class="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-earthy-950 leading-tight">
            Where Nature Meets <span class="text-primary-600 italic">Life</span>
          </h2>
          
          <div class="space-y-6 text-lg text-earthy-700 leading-relaxed max-w-xl">
            <p>
              At <span class="font-bold text-earthy-950">FRG</span>, we believe outdoor spaces are more than just land — they are places where life happens. Spaces where people relax, connect, and create lasting memories.
            </p>
            <p>
              Our passion lies in transforming everyday environments into landscapes that feel <span class="text-primary-700 italic font-medium">alive, welcoming, and meaningful.</span>
            </p>
            <p>
              We work closely with our clients to truly understand their vision. Whether it’s a serene home garden or a large-scale commercial project, we blend creativity, practical expertise, and attention to detail to deliver spaces that are both beautiful and enduring.
            </p>
            <p class="font-heading italic text-xl text-earthy-900 border-l-4 border-primary-500 pl-6 py-2">
              "For us, every project should feel right, look exceptional, and <span class="text-primary-700">stand the test of time.</span>"
            </p>
          </div>

          <div class="pt-6">
            <a href="#contact" class="group inline-flex items-center gap-4 text-earthy-950 font-bold text-lg">
              <span class="border-b-2 border-primary-500 pb-1 group-hover:text-primary-600 transition-colors">Let's grow something beautiful together</span>
              <ArrowRight class="w-5 h-5 text-primary-600 transition-transform group-hover:translate-x-2" />
            </a>
          </div>
        </div>
      </div>

      <!-- Vision & Mission 2-Column Section -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
        <!-- Vision -->
        <div class="about-reveal bg-earthy-50 p-10 md:p-16 rounded-[3rem] border border-earthy-100 flex flex-col items-start hover:shadow-xl transition-shadow duration-500">
          <div class="flex items-center gap-6 mb-10">
            <div class="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-primary-600 shrink-0">
              <Eye class="w-8 h-8" />
            </div>
            <h3 class="text-3xl font-heading font-bold text-earthy-950">Our Vision</h3>
          </div>
          <p class="text-lg text-earthy-700 leading-relaxed font-light">
            To create outdoor spaces that bring people closer to nature — spaces that inspire <span class="text-primary-700">beauty, calm, and balance</span> in everyday life.
          </p>
        </div>

        <!-- Mission -->
        <div class="about-reveal bg-primary-900 text-white p-10 md:p-16 rounded-[3rem] shadow-2xl flex flex-col items-start hover:scale-[1.02] transition-transform duration-500">
          <div class="flex items-center gap-6 mb-10">
            <div class="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-primary-400 shrink-0">
              <Target class="w-8 h-8" />
            </div>
            <h3 class="text-3xl font-heading font-bold !text-white">Our Mission</h3>
          </div>
          <div class="space-y-6 text-base text-primary-100/90 leading-relaxed">
            <p>
              At FRG, we design and build landscapes that go beyond aesthetics. We take time to understand each client’s needs and transform them into spaces that are functional, enjoyable, and meaningful.
            </p>
            <p>
              By combining thoughtful design, quality craftsmanship, and eco-friendly practices, we create landscapes that <span class="text-white font-medium">last, feel right, and make a positive impact.</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
