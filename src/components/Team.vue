<script setup>
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const teamRef = ref(null)

const photoModules = import.meta.glob('@/assets/images/team/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default'
})

const photoMap = Object.entries(photoModules).reduce((acc, [path, src]) => {
  const filename = path.split('/').pop() ?? ''
  acc[filename] = src
  return acc
}, {})

const getInitials = (name) =>
  name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()

const ceo = {
  name: 'K.B. Reddy (Nani Reddy)',
  role: 'Chief Executive Officer',
  business:
    'Fortune Rise Groups, established in August 2024, is a creative landscaping firm specializing in design and execution for Residential, Commercial, and Hospitality spaces.',
  photo: 'nani-reddy.png',
}

const team = [
  {
    name: 'Ar.B. Naveen Kumar',
    role: 'Landscape Architect',
    bio: 'Over 14+ years of experience as Landscape Architect. Have experience in designing & developing projects like Residential, Commercial ventures, Gated Communities, Industrial buildings & Highrise Apartments.',
    photo: 'naveen-kumar.jpg',
  },
  {
    name: 'V. Malleswari',
    role: 'Landscape Architect',
    bio: 'Over 4+ Years Experience as Landscape Designing & Developing Projects like Residential, Commercial ventures, Gated Communities, Industrial buildings & Highrise Apartments.',
    photo: 'v-malleswari.jpg',
  },
  {
    name: 'K. Himaja',
    role: 'Landscape Architect',
    bio: 'A results-driven landscape architect with 4+ years of experience in environmental design at Fortune Rise Groups. She creates sustainable outdoor spaces that balance function and aesthetics, with strengths in team coordination, client collaboration.',
    photo: 'k-himaja.jpg',
  },
  {
    name: 'Gowtham Ravinder Reddy',
    role: 'Site Engineer',
    bio: 'Over 2+ Years Experience as Landscape Designing & Developing Projects like Residential, Commercial ventures, Gated Communities, Industrial buildings & Highrise Apartments.',
    photo: 'gowtham-ravinder-reddy.jpg',
  },
  {
    name: 'Ms. Krupali',
    role: 'Landscape Architect',
    bio: 'Over 10+ Years Experience as Landscape Designing & Developing Projects like Residential, Commercial ventures, Gated Communities, Industrial buildings & Highrise Apartments.',
    photo: 'ms-krupali.jpg',
  },
  {
    name: 'Mr. Kishore',
    role: 'Site Engineer',
    bio: 'Over 4+ Years Experience as Landscape Designing & Developing Projects like Residential, Commercial ventures, Gated Communities, Industrial buildings & Highrise Apartments.',
    photo: 'mr-kishore.jpg',
  },
  {
    name: 'Ms. Mohana Naga Divya Sri',
    role: 'Horticulturist',
    bio: 'Over 1+ Years Experience as Landscape Horticulturist Projects like Residential, Commercial ventures, Gated Communities, Industrial buildings & Highrise Apartments.',
    photo: 'mohana-naga-divya-sri.jpg',
  },
]

onMounted(() => {
  const cards = teamRef.value?.querySelectorAll('.team-card')
  if (!cards?.length) return

  gsap.fromTo(
    cards,
    { y: 50, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: teamRef.value,
        start: 'top 85%',
        once: true
      }
    }
  )
})
</script>

<template>
  <section ref="teamRef" class="section-padding bg-white relative overflow-hidden">
    <div class="absolute -top-24 -left-24 w-96 h-96 bg-primary-50 rounded-full blur-3xl opacity-50 z-0"></div>
    <div class="absolute -bottom-20 -right-20 w-80 h-80 bg-primary-100 rounded-full blur-3xl opacity-40 z-0"></div>

    <div class="max-w-7xl mx-auto relative z-10">
      <div class="text-center mb-14 space-y-4">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-earthy-200 shadow-sm mb-4">
          <span class="w-2 h-2 rounded-full bg-primary-600"></span>
          <span class="text-earthy-700 font-medium text-xs uppercase tracking-widest">Our Team</span>
        </div>
        <h2 class="text-4xl md:text-5xl font-heading font-bold text-earthy-950">
          The Creative <span class="text-primary-600 italic">Minds</span>
        </h2>
        <p class="text-lg text-earthy-600 max-w-2xl mx-auto">
          Shaping meaningful outdoor and architectural spaces with expertise and passion.
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 auto-rows-fr">
        <article
          class="team-card group rounded-3xl border border-primary-100 bg-primary-50/60 shadow-[0_14px_36px_rgba(0,0,0,0.06)] hover:shadow-[0_24px_48px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-400 p-6"
        >
          <div class="flex items-start gap-4 mb-4">
            <div class="relative w-20 h-20 rounded-2xl overflow-hidden shrink-0 bg-earthy-100">
              <img
                v-if="photoMap[ceo.photo]"
                :src="photoMap[ceo.photo]"
                :alt="ceo.name"
                class="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
              />
              <div
                v-else
                class="w-full h-full flex items-center justify-center bg-primary-700 text-white text-2xl font-heading font-bold"
              >
                {{ getInitials(ceo.name) }}
              </div>
            </div>

            <div class="min-w-0 flex-1">
              <h3 class="text-lg font-heading font-bold text-earthy-950 leading-snug mb-1">{{ ceo.name }}</h3>
              <p class="text-xs font-semibold uppercase tracking-[0.18em] text-primary-700">{{ ceo.role }}</p>
            </div>
          </div>

          <div>
            <div class="h-px w-full bg-primary-100 mb-3"></div>
            <p class="text-earthy-700 leading-relaxed text-sm team-bio">
              {{ ceo.business }}
            </p>
          </div>
        </article>

        <article
          v-for="(member, i) in team"
          :key="i"
          class="team-card group bg-white rounded-3xl border border-earthy-200 shadow-[0_14px_36px_rgba(0,0,0,0.06)] hover:shadow-[0_24px_48px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-400 p-6"
        >
          <div class="flex items-start gap-4 mb-4">
            <div class="relative w-20 h-20 rounded-2xl overflow-hidden shrink-0">
              <img
                v-if="photoMap[member.photo]"
                :src="photoMap[member.photo]"
                :alt="member.name"
                class="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
              />
              <div
                v-else
                class="w-full h-full flex items-center justify-center bg-primary-700 text-white text-2xl font-heading font-bold"
              >
                {{ getInitials(member.name) }}
              </div>
            </div>

            <div class="min-w-0 flex-1">
              <h3 class="text-lg font-heading font-bold text-earthy-950 leading-snug mb-1">{{ member.name }}</h3>
              <p class="text-xs font-semibold uppercase tracking-[0.18em] text-primary-600">{{ member.role }}</p>
            </div>
          </div>

          <div>
            <div class="h-px w-full bg-earthy-200 mb-3"></div>
            <p class="text-earthy-700 leading-relaxed text-sm team-bio">{{ member.bio }}</p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
</style>