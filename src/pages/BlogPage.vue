<script setup>
import { computed, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, CalendarDays, Tag } from 'lucide-vue-next'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import { getProjectBySlug } from '@/data/projects'

gsap.registerPlugin(ScrollTrigger)

const blogBlueprints = [
  {
    projectSlug: 'yoshitha-2024',
    title: 'How Native Planting Improved Long-Term Maintenance for a Real Estate Layout',
    intro:
      'A practical breakdown of how plant zoning, water-conscious species selection, and phased implementation reduced recurring maintenance effort without compromising visual quality.',
    focusAreas: ['Native plant palette', 'Water zones', 'Seasonal color retention'],
    publishedOn: '2026-06-28'
  },
  {
    projectSlug: 'it-tower',
    title: 'Commercial Landscape Planning for Daily Footfall and Heat Control',
    intro:
      'This project focused on high-traffic pathways, shaded waiting zones, and durable hardscape edges that could handle everyday office use while staying visually premium.',
    focusAreas: ['Pedestrian circulation', 'Heat mitigation', 'Low-disruption upkeep'],
    publishedOn: '2026-06-15'
  },
  {
    projectSlug: 'subrahmanyam-farmhouse',
    title: 'Building a Relaxed Farmhouse Experience with Structured Planting Layers',
    intro:
      'From entry sequence to sit-out zones, this farmhouse layout used layered greens and curated focal points to balance privacy, openness, and weekend usability.',
    focusAreas: ['Entry framing', 'Layered planting', 'Experience zones'],
    publishedOn: '2026-06-01'
  },
  {
    projectSlug: 'dr-lalitha-hatkar-villa',
    title: 'Residential Landscape Design That Keeps Privacy and Daylight in Balance',
    intro:
      'A residence-focused case study on screening strategy, compact lawn planning, and softscape selection tailored for elegant everyday use.',
    focusAreas: ['Visual privacy', 'Compact lawn design', 'Premium softscape'],
    publishedOn: '2026-05-21'
  },
  {
    projectSlug: 'dundigal-layout',
    title: 'Open-Space Planning for a Large Layout: Parks, Paths, and Play Areas',
    intro:
      'Learn how zoning helped organize active and passive spaces for a large development while preserving a cohesive visual identity across the site.',
    focusAreas: ['Large-site zoning', 'Family-friendly parks', 'Consistent landscape language'],
    publishedOn: '2026-05-05'
  },
  {
    projectSlug: 'vinuthuna-pharma',
    title: 'Industrial Landscaping that Prioritizes Safety, Clarity, and Green Cover',
    intro:
      'This article highlights practical strategies for industrial campuses where wayfinding, clear edge definition, and hardy planting matter most.',
    focusAreas: ['Clear site edges', 'Durable species', 'Operational safety'],
    publishedOn: '2026-04-19'
  }
]

const formatDate = (value) =>
  new Date(value).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })

const blogPosts = computed(() =>
  blogBlueprints
    .map((item) => {
      const project = getProjectBySlug(item.projectSlug)

      if (!project) {
        return null
      }

      return {
        ...item,
        project,
        publishedLabel: formatDate(item.publishedOn)
      }
    })
    .filter(Boolean)
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

  const cards = gsap.utils.toArray('.blog-card')
  cards.forEach((card) => {
    gsap.from(card, {
      y: 40,
      opacity: 0,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: card,
        start: 'top 88%',
        toggleActions: 'play none none none'
      }
    })
  })
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
        <div class="max-w-4xl mb-14 space-y-5">
          <p class="text-sm uppercase tracking-[0.2em] text-earthy-500">Blog & Case Studies</p>
          <h1 class="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-earthy-950 leading-tight">
            Real Landscape Stories from <span class="text-primary-600 italic">FRG Project Sites</span>
          </h1>
          <p class="text-lg text-earthy-700 leading-relaxed">
            Practical insights, planning decisions, and execution lessons from our residential, commercial, farmhouse,
            industrial, and layout projects. Each article is linked to the corresponding project gallery.
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <article
            v-for="post in blogPosts"
            :key="post.project.slug"
            class="blog-card rounded-4xl border border-earthy-200 bg-white overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
          >
            <img
              :src="post.project.image"
              :alt="post.project.title"
              class="w-full h-64 object-cover"
              loading="lazy"
              decoding="async"
            />

            <div class="p-7 space-y-5">
              <div class="flex flex-wrap items-center gap-3 text-xs text-earthy-600 font-semibold tracking-[0.14em] uppercase">
                <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 text-primary-700">
                  <Tag class="w-3.5 h-3.5" />
                  {{ post.project.category }}
                </span>
                <span class="inline-flex items-center gap-2">
                  <CalendarDays class="w-3.5 h-3.5" />
                  {{ post.publishedLabel }}
                </span>
              </div>

              <h2 class="text-2xl font-heading font-bold text-earthy-950 leading-snug">
                {{ post.title }}
              </h2>

              <p class="text-earthy-700 leading-relaxed">
                {{ post.intro }}
              </p>

              <ul class="flex flex-wrap gap-2">
                <li
                  v-for="point in post.focusAreas"
                  :key="point"
                  class="px-3 py-1 rounded-full border border-earthy-200 text-xs font-medium text-earthy-700"
                >
                  {{ point }}
                </li>
              </ul>

              <div class="flex flex-wrap items-center gap-4 pt-1">
                <RouterLink
                  :to="`/project/${post.project.slug}`"
                  class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors"
                >
                  View Project Gallery
                  <ArrowRight class="w-4 h-4" />
                </RouterLink>

                <RouterLink
                  :to="`/projects/${post.project.categorySlug}`"
                  class="inline-flex items-center gap-2 text-earthy-800 font-semibold hover:text-primary-700 transition-colors"
                >
                  Explore {{ post.project.category }} Projects
                  <ArrowRight class="w-4 h-4" />
                </RouterLink>
              </div>
            </div>
          </article>
        </div>
      </section>
    </main>

    <Footer />
  </div>
</template>
