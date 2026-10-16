<script setup>
import { Quote, Star, Leaf } from 'lucide-vue-next'

const stories = [
  {
    name: 'Pardha Saradhi G',
    role: 'IT Engineer',
    title: 'Green Escape After Long Days',
    quote: "Working in tech means I spend hours staring at screens. Fortune Rise Groups designed a terrace garden for my apartment that genuinely de-stresses me every evening. The plant selection, lighting, and layout are perfectly thought through.",
    rating: 5,
    initials: 'PS',
    color: 'bg-emerald-600'
  },
  {
    name: 'Ravi Achanta',
    role: 'Entrepreneur',
    title: 'First Impression, Every Time',
    quote: "The entrance landscaping at my office campus has become a talking point among every client who visits. Fortune Rise Groups understood our brand identity and translated it into a living, breathing design. ROI beyond what I imagined.",
    rating: 5,
    initials: 'RA',
    color: 'bg-amber-600'
  },
  {
    name: 'Niranjan',
    role: 'Speaker',
    title: 'An Outdoor Stage of My Own',
    quote: "I host workshops and small gatherings regularly. The garden and seating area that Fortune Rise Groups created for my home feels like a true open-air venue. Every guest comments on the ambience. It reflects exactly who I am.",
    rating: 5,
    initials: 'NJ',
    color: 'bg-sky-600'
  },
  {
    name: 'GSP Reddy',
    role: 'Business Professional',
    title: 'Value That Speaks for Itself',
    quote: "I was skeptical about investing in professional landscaping, but Fortune Rise Groups changed my perspective completely. The transformation of our residence was delivered on time, within budget, and the quality has held up beautifully over the years.",
    rating: 5,
    initials: 'GR',
    color: 'bg-violet-600'
  },
  {
    name: 'Srinivas Reddy',
    role: 'Politician',
    title: 'A Legacy Garden',
    quote: "When you are in public life, your home is a reflection of your values. Fortune Rise Groups created a landscape for my farmhouse that balances grandeur with warmth. The layout, the water features, and the greenery together make it a place I am proud to welcome guests.",
    rating: 5,
    initials: 'SR',
    color: 'bg-rose-600'
  }
]
</script>

<template>
  <section class="section-padding bg-white relative overflow-hidden">
    <!-- Subtle Background Accents -->
    <div class="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40">
      <div class="absolute top-1/4 -left-24 w-96 h-96 bg-primary-200/30 rounded-full blur-[120px]"></div>
      <div class="absolute bottom-1/4 -right-24 w-96 h-96 bg-primary-100/40 rounded-full blur-[120px]"></div>
    </div>

    <div class="container-wide relative z-10">
      <div class="max-w-3xl mb-16 md:mb-24">
        <div class="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white border border-earthy-200 shadow-sm mb-8">
          <span class="w-2 h-2 rounded-full bg-primary-500"></span>
          <span class="text-primary-700 font-medium text-xs uppercase tracking-widest">Client Stories</span>
        </div>
        <h2 class="text-4xl md:text-5xl lg:text-7xl font-heading font-bold mb-8 leading-tight text-earthy-950">
          Voices of <span class="text-primary-600 italic">Nature</span>
        </h2>
        <p class="text-xl text-earthy-700 leading-relaxed">
          Every project is a journey. Explore how we've helped our clients reconnect with the natural world through thoughtful design and craftsmanship.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
        <div
          v-for="story in stories"
          :key="story.name"
          class="group flex flex-col bg-white border border-earthy-200 rounded-[2.5rem] p-8 md:p-10 transition-all duration-500 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] hover:-translate-y-2"
        >
          <div class="flex items-center gap-1 mb-6">
            <Star v-for="i in story.rating" :key="i" class="w-4 h-4 fill-yellow-400 text-yellow-400" />
          </div>

          <h3 class="text-2xl font-heading font-bold mb-4 text-earthy-900 group-hover:text-primary-600 transition-colors">
            {{ story.title }}
          </h3>

          <div class="relative mb-8">
            <Quote class="absolute -top-2 -left-2 w-10 h-10 text-earthy-100" />
            <p class="relative z-10 text-lg text-earthy-800 font-heading italic leading-relaxed">
              "{{ story.quote }}"
            </p>
          </div>

          <div class="mt-auto flex items-center gap-4 pt-8 border-t border-earthy-100">
            <div class="relative">
              <div
                :class="[story.color, 'w-14 h-14 rounded-full flex items-center justify-center border-2 border-earthy-100 group-hover:border-primary-500 transition-colors']"
              >
                <span class="text-white font-bold text-sm tracking-wide">{{ story.initials }}</span>
              </div>
              <div class="absolute -bottom-1 -right-1 w-5 h-5 bg-primary-600 rounded-full flex items-center justify-center border-2 border-white">
                <Leaf class="w-2.5 h-2.5 text-white" />
              </div>
            </div>
            <div>
              <h4 class="font-bold text-earthy-900 leading-none mb-1">{{ story.name }}</h4>
              <p class="text-earthy-500 text-xs font-medium uppercase tracking-widest">{{ story.role }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Simple CTA at bottom -->
      <!-- <div class="mt-20 text-center">
        <p class="text-earthy-600 mb-6">Ready to tell your story?</p>
        <a href="#contact" class="inline-flex items-center gap-4 text-earthy-900 font-bold group">
          <span class="text-lg border-b-2 border-primary-500 pb-1 group-hover:text-primary-600 transition-colors">Start Your Journey</span>
          <span class="w-12 h-px bg-earthy-300 group-hover:w-16 group-hover:bg-primary-500 transition-all duration-300"></span>
        </a>
      </div> -->
    </div>
  </section>
</template>

<style scoped>
/* Simplified component, no custom complex CSS needed */
</style>