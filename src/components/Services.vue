<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { 
  Sprout, 
  Hammer, 
  ArrowRight,
  Home,
  Building2,
  Hotel
} from 'lucide-vue-next'
import service1 from '@/assets/images/services/service-1.jpg'
import service2 from '@/assets/images/services/service-2.jpg'
import service3 from '@/assets/images/services/service-3.jpg'
import { allProjects, buildSlug } from '@/data/projects'

gsap.registerPlugin(ScrollTrigger)

const servicesRef = ref(null)

const categoryImageFallbacks = {
  'Commercial': service2,
  'Residences': service1,
  'Farmhouse': service3,
  'Resorts': service3,
  'Industrial': service1,
}

const getServiceImage = (category) => allProjects.find((project) => project.category === category)?.image ?? categoryImageFallbacks[category] ?? service1

const props = defineProps({
  isPage: {
    type: Boolean,
    default: false
  }
})

const services = [
  {
    title: 'Commercial',
    description: 'Landscape contracting and office gardening services for corporate campuses, business parks, and retail centers.',
    icon: Building2,
    color: 'bg-blue-50',
    iconColor: 'text-blue-600',
    image: getServiceImage('Commercial'),
    projectRoute: `/projects/${buildSlug('Commercial')}`
  },
  {
    title: 'Residences',
    description: 'Bespoke 3D landscape designing, residential terrace landscape gardening, and roof gardening services for villas and luxury homes.',
    icon: Home,
    color: 'bg-primary-50',
    iconColor: 'text-primary-600',
    image: getServiceImage('Residences'),
    projectRoute: `/projects/${buildSlug('Residences')}`
  },
  {
    title: 'Farmhouse',
    description: 'Specialized architects for farm house landscapes, rural estate master planning, rock gardens, and natural water features.',
    icon: Sprout,
    color: 'bg-earthy-100',
    iconColor: 'text-earthy-700',
    image: getServiceImage('Farmhouse'),
    projectRoute: `/projects/${buildSlug('Farmhouse')}`
  },
  {
    title: 'Resorts',
    description: 'Turnkey outdoor landscape designing services for boutique resorts, luxury hotels, and destination retreats.',
    icon: Hotel,
    color: 'bg-rose-50',
    iconColor: 'text-rose-600',
    image: getServiceImage('Resorts'),
    projectRoute: `/projects/${buildSlug('Resorts')}`
  },
  {
    title: 'Industrial',
    description: 'Durable landscape architecture, green belts, and functional outdoor solutions for pharmaceutical and manufacturing facilities.',
    icon: Hammer,
    color: 'bg-orange-50',
    iconColor: 'text-orange-600',
    image: getServiceImage('Industrial'),
    projectRoute: `/projects/${buildSlug('Industrial')}`
  },
  {
    title: 'Realestate',
    description: 'Master garden developers and lawn grass distributors for gated communities, layout parks, and large-scale ventures.',
    icon: Building2,
    color: 'bg-green-50',
    iconColor: 'text-green-600',
    image: getServiceImage('Realestate'),
    projectRoute: `/projects/${buildSlug('Realestate')}`
  }
]

onMounted(() => {
  // Preload unique service images so repeated cards can render from cache.
  ;[service1, service2, service3].forEach((src) => {
    const img = new Image()
    img.decoding = 'async'
    img.src = src
  })

  const cards = gsap.utils.toArray('.service-card')
  
  cards.forEach((card) => {
    gsap.from(card, {
      y: 48,
      opacity: 0,
      duration: 0.6,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: card,
        start: 'top 92%',
        toggleActions: 'play none none none'
      },
      delay: 0
    })
  })
})
</script>

<template>
  <section ref="servicesRef" class="section-padding bg-white relative overflow-hidden">
    <!-- Subtle background pattern -->
    <div class="absolute inset-0 opacity-[0.03] pointer-events-none -z-10" style="background-image: radial-gradient(#3e8c40 1px, transparent 1px); background-size: 40px 40px;"></div>

    <div class="container-wide">
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
        <div class="space-y-6 max-w-2xl">
          <div class="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white shadow-sm">
            <span class="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></span>
            <span class="text-primary-700 font-medium text-xs uppercase tracking-widest">Our Expertise</span>
          </div>
          <component :is="isPage ? 'h1' : 'h2'" class="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-earthy-950">
            Our <span class="text-primary-600 italic">Landscaping</span> Solutions
          </component>
          <p class="text-lg text-earthy-600 leading-relaxed">
            We offer a comprehensive range of services to bring your outdoor vision to life, from initial design to final implementation and ongoing care.
          </p>
        </div>
        <div class="hidden md:block pb-2">
          <RouterLink to="/contact" class="btn-outline group">
            <span>Get a Consultation</span>
            <ArrowRight class="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </RouterLink>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <RouterLink
          v-for="(service, index) in services"
          :key="service.title"
          :to="service.projectRoute"
          class="service-card group p-8 bg-white rounded-4xl transition-all duration-700 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] hover:-translate-y-4 flex flex-col"
        >
          <div class="relative overflow-hidden rounded-2xl aspect-16/10 mb-8">
            <img
              :src="service.image"
              :alt="`Fortune Rise Groups - ${service.title} Landscape Designing and Gardening Services in Hyderabad`"
              width="800"
              height="500"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              :loading="index < 3 ? 'eager' : 'lazy'"
              :fetchpriority="index < 3 ? 'high' : 'auto'"
              decoding="async"
            />
            <div :class="['absolute top-4 left-4 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-700 group-hover:rotate-10 shadow-lg', service.color]">
              <component :is="service.icon" :class="['w-6 h-6', service.iconColor]" />
            </div>
          </div>
          
          <div class="grow space-y-3">
            <h3 class="text-2xl font-heading font-bold text-earthy-950 group-hover:text-primary-600 transition-colors duration-500">
              {{ service.title }}
            </h3>
            <p class="text-earthy-600 leading-relaxed">
              {{ service.description }}
            </p>
          </div>

        </RouterLink>
      </div>
    </div>
  </section>
</template>
