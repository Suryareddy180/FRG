<script setup>
import { RouterLink } from 'vue-router'
import { CircleHelp, MessageCircleMore, PhoneCall } from 'lucide-vue-next'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'

const faqItems = [
  {
    question: 'What landscaping services does Fortune Rise Groups provide?',
    answer:
      'We handle end-to-end landscape work including 3D landscape designing services, hardscape and softscape execution, terrace landscape gardening, roof gardening services, automated irrigation layouts, and long-term garden maintenance services for residential, commercial, farmhouse, and industrial sites.'
  },
  {
    question: 'Do you work only in Hyderabad?',
    answer:
      'Our core design and execution operations are in Hyderabad, Secunderabad, Gachibowli, Kukatpally, Jubilee Hills, and Banjara Hills. We also take up large residential, resort, and farmhouse projects across Telangana and Andhra Pradesh.'
  },
  {
    question: 'How is project cost estimated?',
    answer:
      'Pricing is calculated based on site square footage, design complexity, 3D visualization requirements, natural stone and hardscape selection, plant palettes, irrigation automation, and long-term maintenance expectations. Following an on-site consultation, we share a transparent itemized estimate.'
  },
  {
    question: 'How long does a typical landscape project take?',
    answer:
      'Smaller residence projects can be completed in a few weeks, while larger layouts or commercial campuses may take multiple phases. We provide a realistic timeline after finalizing design and material approvals.'
  },
  {
    question: 'Can you redesign an existing garden or rock garden instead of starting from scratch?',
    answer:
      'Yes. We regularly upgrade existing spaces by refreshing plant palettes, rejuvenating lawn grass, installing rock garden features, upgrading irrigation, and introducing durable paving without unnecessary structural disruption.'
  },
  {
    question: 'Do you provide ongoing landscape and garden maintenance services?',
    answer:
      'Yes. We offer structured monthly and quarterly maintenance plans covering seasonal pruning, organic soil nourishment, pest monitoring, lawn mowing, rock garden maintenance services, and automated drip irrigation checks.'
  },
  {
    question: 'Do you design and execute farmhouse landscapes?',
    answer:
      'Yes. Our experienced landscape architects and designers specialize in farmhouse master planning, entry tree canopies, organic fruit orchards, swimming pool surrounds, and leisure sit-outs across Hyderabad and outskirts.'
  },
  {
    question: 'Do you supply and install natural lawn grass (Lawn Grass Dealers & Distributors)?',
    answer:
      'Yes. As trusted lawn grass dealers and distributors in Hyderabad, Fortune Rise Groups supplies and installs premium natural turf varieties including Mexican Grass, Bermuda Turf, Korean Carpet Grass, and Nilgiri Grass for residential lawns, commercial layouts, and sports villas.'
  },
  {
    question: 'What do your Rock Garden Maintenance and Garden Maintenance Services include?',
    answer:
      'Our comprehensive garden maintenance services and specialized rock garden maintenance services include periodic pruning, lawn mowing, organic soil fertilization, pest monitoring, boulder repositioning, gravel cleaning, drip irrigation calibration, and seasonal plant replacements.'
  },
  {
    question: 'Do you provide Indoor Gardening Services and Corporate Gift Plants?',
    answer:
      'Yes. We offer turnkey indoor gardening services, indoor landscape designing services, and office gardening services for IT parks, hotels, and luxury residences. In addition, we are corporate gift plant dealers supplying customized branded indoor planters and succulent arrangements.'
  },
  {
    question: 'How do your 3D Landscape Designing Services and Farmhouse Architects operate?',
    answer:
      'Our certified architects for landscape and architects for farm house create detailed 2D master plans and realistic 3D landscape designing services. We visualize hardscape pathways, water bodies, gazebos, swimming pool decks, and plantation layers before site execution starts.'
  },
  {
    question: 'What solutions do you offer for Terrace Landscape Gardening and Roof Gardening Services?',
    answer:
      'We engineer lightweight, fully waterproofed terrace landscape gardening and roof gardening services. We incorporate root barriers, lightweight potting media, automatic drip irrigation, shaded sit-outs, and vertical green walls designed specifically for rooftop microclimates.'
  },
  {
    question: 'Can I see past work before starting?',
    answer:
      'Absolutely. You can browse our project portfolio by category and also view project-specific case studies in our blog section to understand planning decisions and real execution outcomes.'
  },
  {
    question: 'How do I start a new project with Fortune Rise Groups?',
    answer:
      'You can contact us through our contact page or call +91-9867890999 directly. Our team schedules a consultation, evaluates your site, and recommends a tailored design and execution approach.'
  }
]
</script>

<template>
  <div class="selection:bg-primary-600 selection:text-white bg-white min-h-screen">
    <Navbar />

    <main class="pt-36 pb-24 px-fluid-2">
      <section class="container-wide">
        <div class="max-w-4xl mb-12 space-y-5">
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary-200 bg-primary-50 text-primary-700 text-xs font-semibold uppercase tracking-[0.16em]">
            <CircleHelp class="w-4 h-4" />
            Frequently Asked Questions
          </div>
          <h1 class="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-earthy-950 leading-tight">
            Answers Before You Start Your <span class="text-primary-600 italic">Landscape Project</span>
          </h1>
          <p class="text-lg text-earthy-700 leading-relaxed">
            Common questions from homeowners, developers, and commercial teams planning outdoor spaces with FRG Landscapes.
          </p>
        </div>

        <div class="space-y-4">
          <details
            v-for="item in faqItems"
            :key="item.question"
            class="group rounded-3xl border border-earthy-200 bg-white px-6 py-5 shadow-sm open:shadow-md"
          >
            <summary class="list-none cursor-pointer flex items-start justify-between gap-4">
              <h2 class="text-lg md:text-xl font-heading font-semibold text-earthy-950 pr-4">
                {{ item.question }}
              </h2>
              <span class="mt-1 text-primary-600 text-xl leading-none transition-transform group-open:rotate-45">+</span>
            </summary>
            <p class="mt-4 text-earthy-700 leading-relaxed md:text-lg">
              {{ item.answer }}
            </p>
          </details>
        </div>

        <div class="mt-14 rounded-4xl border border-earthy-200 bg-earthy-50 p-8 md:p-10">
          <h2 class="text-2xl md:text-3xl font-heading font-bold text-earthy-950 mb-4">Need a project-specific estimate?</h2>
          <p class="text-earthy-700 md:text-lg mb-6">
            Share your site requirements and we will guide you with the right landscape direction, timeline, and execution plan.
          </p>
          <div class="flex flex-wrap gap-4">
            <RouterLink to="/contact" class="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors">
              <MessageCircleMore class="w-4 h-4" />
              Contact FRG
            </RouterLink>
            <RouterLink to="/projects" class="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-earthy-300 text-earthy-800 font-semibold hover:bg-white transition-colors">
              <PhoneCall class="w-4 h-4" />
              View Project Portfolio
            </RouterLink>
          </div>
        </div>
      </section>
    </main>

    <Footer />
  </div>
</template>
