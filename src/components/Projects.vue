<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Plus, ArrowUpRight } from 'lucide-vue-next'
import { featuredProjects } from '@/data/projects'

gsap.registerPlugin(ScrollTrigger)

const projectsRef = ref(null)
const projects = featuredProjects
const runtimeCoverImages = ref({})

const getProjectImage = (project) => runtimeCoverImages.value[project.folderName] ?? project.image

const loadRuntimeProjectCovers = async () => {
  try {
    const response = await fetch(`/project-covers.php?t=${Date.now()}`, {
      cache: 'no-store'
    })

    if (!response.ok) {
      return
    }

    const payload = await response.json()

    if (!payload?.covers || typeof payload.covers !== 'object') {
      return
    }

    runtimeCoverImages.value = payload.covers
  } catch {
    // Ignore runtime cover loading failures on environments without PHP support.
  }
}

onMounted(() => {
  loadRuntimeProjectCovers()

  const projectItems = gsap.utils.toArray('.project-item')
  
  projectItems.forEach((item, i) => {
    // Reveal animation
    gsap.from(item, {
      y: 100,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: item,
        start: 'top 90%',
      },
      delay: (i % 3) * 0.1
    })

    // Parallax on internal image
    const img = item.querySelector('img')
    gsap.to(img, {
      yPercent: 15,
      ease: 'none',
      scrollTrigger: {
        trigger: item,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    })
  })
})
</script>

<template>
  <section ref="projectsRef" class="section-padding bg-white overflow-hidden">
    <div class="container-wide">
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
        <div class="space-y-6 max-w-2xl">
          <div class="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-earthy-50 border border-earthy-200">
            <span class="w-2 h-2 rounded-full bg-primary-500"></span>
            <span class="text-earthy-700 font-medium text-xs uppercase tracking-widest">Portfolio</span>
          </div>
          <h2 class="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-earthy-950">
            Showcasing Our <span class="text-primary-600 italic">Landscaping</span> Excellence
          </h2>
          <p class="text-lg text-earthy-600 leading-relaxed">
            A selection of our most recent and most impressive projects, highlighting our attention to detail and design flair.
          </p>
        </div>
        <div>
          <RouterLink to="/projects" class="btn-primary group">
            <span>View All Projects</span>
            <ArrowUpRight class="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </RouterLink>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
        <RouterLink
          v-for="project in projects"
          :key="project.title"
          :to="`/project/${project.slug}`"
          class="project-item group cursor-pointer"
        >
          <div class="relative overflow-hidden rounded-4xl aspect-4/5 mb-6">
            <img
              :src="getProjectImage(project)"
              :alt="project.title"
              width="800"
              height="1000"
              class="w-full h-[120%] object-cover absolute top-[-10%] transition-transform duration-700 will-change-transform group-hover:scale-110"
              loading="lazy"
              decoding="async"
            />
            
            <!-- Hover Overlay -->
            <div class="absolute inset-0 bg-primary-950/40 opacity-0 group-hover:opacity-100 transition-all duration-700 flex items-center justify-center backdrop-blur-[2px]">
              <div class="w-16 h-16 rounded-full bg-white flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-500 delay-100">
                <Plus class="w-8 h-8 text-primary-600" />
              </div>
            </div>

            <!-- Category Tag -->
            <div class="absolute top-6 left-6 px-4 py-2 bg-white/90 backdrop-blur-md rounded-full text-xs font-bold tracking-widest uppercase text-primary-700 shadow-lg">
              {{ project.category }}
            </div>
          </div>

          <div class="space-y-2">
            <h3 class="text-2xl font-heading font-bold text-earthy-950 group-hover:text-primary-600 transition-colors duration-300 flex items-center justify-between">
              {{ project.title }}
              <ArrowUpRight class="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0" />
            </h3>
            <div class="w-full h-px bg-earthy-200 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
          </div>
        </RouterLink>
      </div>
    </div>
  </section>
</template>
