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

const activeCategoryTab = ref('all')

const serviceCategories = [
  {
    id: 'architecture-3d',
    name: '3D Design & Architecture',
    badge: 'Design & Engineering',
    services: [
      {
        title: '3D Landscape Designing Services',
        desc: 'Photorealistic 3D visualization, architectural renders, and day-night elevation modeling for luxury villas, farmhouses, and corporate projects in Hyderabad.',
        tags: ['3D Modeling', 'Virtual Walkthrough', 'Elevation Renders']
      },
      {
        title: 'Architects For Landscape',
        desc: 'Certified landscape architects managing ecological grading, site drainage, hardscape civil engineering, and sustainable outdoor master planning.',
        tags: ['Master Planning', 'Grading & Drainage', 'Civil Hardscapes']
      },
      {
        title: 'Architects For Farm House',
        desc: 'Specialist architects for farm house landscapes, rural weekend retreats, fruit orchards, swimming pool surrounds, gazebos, and entry canopies.',
        tags: ['Farmhouse Master Plan', 'Orchard Zoning', 'Rustic Paving']
      },
      {
        title: 'Landscape Designers For Farmhouse',
        desc: 'Bespoke farmhouse landscape designers blending native trees, boulder water streams, rustic walking pathways, and open-air entertainment decks.',
        tags: ['Natural Waterways', 'Firepits & Decks', 'Native Flora']
      },
      {
        title: 'Landscape Design Consultants',
        desc: 'Technical landscape design consultants providing comprehensive CAD layouts, planting schemes, hardscape details, and ambient lighting plans.',
        tags: ['CAD Blueprints', 'Lighting Plans', 'Planting Schedules']
      },
      {
        title: 'Landscape Consultants',
        desc: 'Trusted landscape consultants offering soil testing, microclimate audits, site feasibility reports, cost budgeting, and project supervision.',
        tags: ['Feasibility Studies', 'Cost Estimation', 'Quality Oversight']
      },
      {
        title: 'Designer Landscape Services',
        desc: 'Exclusive designer landscape services crafting bespoke water walls, sculptural installations, mood illumination, and private garden sanctuaries.',
        tags: ['Water Features', 'Sculptural Focal Points', 'Mood Lighting']
      },
      {
        title: 'Outdoor Landscape Designing Services',
        desc: 'Turnkey outdoor landscape designing services including wooden pergolas, poolside cabanas, barbecue counters, and weather-resistant sit-outs.',
        tags: ['Pergolas & Cabanas', 'Pool Surrounds', 'Outdoor Kitchens']
      },
      {
        title: 'Landscape Designing Services',
        desc: 'Holistic landscape designing services from initial conceptual ideation to complete architectural documentation and on-site implementation.',
        tags: ['Concept Ideation', 'Design Documentation', 'Turnkey Oversight']
      }
    ]
  },
  {
    id: 'contracting-execution',
    name: 'Contracting & Execution',
    badge: 'Turnkey Execution',
    services: [
      {
        title: 'Landscape Contractors',
        desc: 'Leading turnkey landscape contractors in Hyderabad delivering integrated civil hardscapes, stone masonry, automated irrigation, and softscapes.',
        tags: ['Hardscape Masonry', 'Automated Irrigation', 'Civil Contracting']
      },
      {
        title: 'Garden Landscaping Services',
        desc: 'End-to-end garden landscaping services including earthwork grading, nutrient-rich soil preparation, specimen tree installation, and shrub borders.',
        tags: ['Site Grading', 'Topsoil Conditioning', 'Specimen Tree Planting']
      },
      {
        title: 'Landscape Gardening',
        desc: 'Artistic landscape gardening combining lush perennial flowers, evergreen foliage, privacy hedges, and sensory plant palettes tailored for Hyderabad.',
        tags: ['Perennial Gardens', 'Privacy Hedges', 'Sensory Plantings']
      },
      {
        title: 'Garden Developers',
        desc: 'Master garden developers executing large-scale gated community parks, institutional campuses, central avenues, and recreational clubhouses.',
        tags: ['Gated Communities', 'Avenue Plantations', 'Central Parks']
      },
      {
        title: 'Garden Designers',
        desc: 'Creative garden designers curating themed Japanese Zen gardens, tropical resort gardens, rockeries, and modern minimalist courtyards.',
        tags: ['Themed Gardens', 'Zen Rockeries', 'Courtyard Gardens']
      },
      {
        title: 'Gardening Services',
        desc: 'Professional gardening services for private residences, commercial establishments, institutions, and farmhouses across Telangana.',
        tags: ['Full Turnkey Care', 'Expert Horticulturalists', 'Residential & Commercial']
      }
    ]
  },
  {
    id: 'maintenance-care',
    name: 'Garden & Lawn Maintenance',
    badge: 'Horticultural Care',
    services: [
      {
        title: 'Garden Maintenance Services',
        desc: 'Structured monthly and quarterly garden maintenance services including seasonal pruning, organic fertilization, pest control, and soil rejuvenation.',
        tags: ['Seasonal Pruning', 'Organic Fertilization', 'Soil Rejuvenation']
      },
      {
        title: 'Landscape Garden Maintenance Services',
        desc: 'Dedicated commercial and residential landscape garden maintenance services with full-time on-site gardeners and periodic agronomy audits.',
        tags: ['Dedicated Gardeners', 'Agronomy Audits', 'Lawn Care']
      },
      {
        title: 'Rock Garden Maintenance Services',
        desc: 'Specialized rock garden maintenance services covering natural stone cleaning, weed removal, gravel replenishment, succulent care, and drainage checks.',
        tags: ['Boulder Care', 'Gravel Replenishment', 'Succulent Nutrition']
      },
      {
        title: 'Gardening Services For Residential',
        desc: 'Customized residential gardening services for villas and independent homes, ensuring vibrant year-round blooms, manicured lawns, and clean edges.',
        tags: ['Villa Garden Care', 'Lawn Mowing', 'Flowerbed Upkeep']
      }
    ]
  },
  {
    id: 'terrace-indoor',
    name: 'Terrace & Indoor Greenery',
    badge: 'Urban Green Living',
    services: [
      {
        title: 'Terrace Landscape Gardening',
        desc: 'Luxury terrace landscape gardening converting urban concrete rooftops into scenic green sanctuaries with timber decking, planters, and pergolas.',
        tags: ['Rooftop Sanctuaries', 'Weatherproof Decking', 'Engineered Drainage']
      },
      {
        title: 'Roof Gardening Services',
        desc: 'Engineered roof gardening services with structural weight calculations, high-durability root barriers, lightweight soil, and automated drip systems.',
        tags: ['Weight Calculation', 'Root Barriers', 'Micro-Drip Systems']
      },
      {
        title: 'Indoor Gardening Services',
        desc: 'Expert indoor gardening services featuring vertical living green walls, indoor atriums, moss frames, and low-light container plant care.',
        tags: ['Vertical Green Walls', 'Living Partitions', 'Atrium Greenery']
      },
      {
        title: 'Indoor Landscape Designing Services',
        desc: 'Architectural indoor landscape designing services for double-height villa foyers, corporate lobbies, hotel receptions, and sunlit courtyards.',
        tags: ['Lobby Landscapes', 'Foyer Planters', 'Indoor Water Walls']
      },
      {
        title: 'Office Gardening Services',
        desc: 'Corporate office gardening services creating biophilic workstations, breakout green zones, and air-purifying executive desktop plant arrangements.',
        tags: ['Biophilic Workspaces', 'Desk Greenery', 'Air-Purifying Plants']
      },
      {
        title: 'Corporate Gift Plant Dealers',
        desc: 'Premier corporate gift plant dealers in Hyderabad supplying customized branded indoor desk planters, luxury succulents, and corporate event gifts.',
        tags: ['Branded Planters', 'Bulk Corporate Gifts', 'Desktop Succulents']
      }
    ]
  },
  {
    id: 'lawn-grass',
    name: 'Lawn Grass & Turfing',
    badge: 'Turf Supply & Laying',
    services: [
      {
        title: 'Lawn Grass Dealers',
        desc: 'Direct lawn grass dealers supplying farm-fresh natural turf varieties including Mexican Grass, Bermuda Turf, Korean Carpet Grass, and Nilgiri Grass.',
        tags: ['Mexican Grass', 'Bermuda Turf', 'Korean Carpet Grass']
      },
      {
        title: 'Lawn Grass Distributors',
        desc: 'Wholesale lawn grass distributors providing bulk turf delivery, site leveling, weed clearing, rapid sod laying, and lawn establishment across Telangana.',
        tags: ['Bulk Distribution', 'Site Leveling', 'Rapid Sod Laying']
      }
    ]
  }
]

const filteredCategories = computed(() => {
  if (activeCategoryTab.value === 'all') {
    return serviceCategories
  }
  return serviceCategories.filter((cat) => cat.id === activeCategoryTab.value)
})

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
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
        <div class="space-y-6 max-w-2xl">
          <div class="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white shadow-sm border border-earthy-100">
            <span class="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></span>
            <span class="text-primary-700 font-medium text-xs uppercase tracking-widest">Our Expertise</span>
          </div>
          <component :is="isPage ? 'h1' : 'h2'" class="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-earthy-950">
            Our <span class="text-primary-600 italic">Landscaping</span> Solutions
          </component>
          <p class="text-lg text-earthy-600 leading-relaxed">
            From initial 3D conceptual design to turnkey execution, lawn turf supply, and ongoing garden maintenance, Fortune Rise Groups delivers complete outdoor solutions in Hyderabad.
          </p>
        </div>
        <div class="hidden md:block pb-2">
          <RouterLink to="/contact" class="btn-outline group">
            <span>Get a Consultation</span>
            <ArrowRight class="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </RouterLink>
        </div>
      </div>

      <!-- Sector Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
        <RouterLink
          v-for="(service, index) in services"
          :key="service.title"
          :to="service.projectRoute"
          class="service-card group p-8 bg-white rounded-4xl transition-all duration-700 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] hover:-translate-y-4 flex flex-col border border-earthy-100"
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

      <!-- Specialized 27 Services Directory -->
      <div class="rounded-4xl bg-earthy-50/70 border border-earthy-200/80 p-8 md:p-12 lg:p-16">
        <div class="max-w-3xl mb-12 space-y-4">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-100 text-primary-800 text-xs font-semibold uppercase tracking-wider">
            All-Inclusive Service Catalog
          </div>
          <h2 class="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-earthy-950 leading-tight">
            Specialized <span class="text-primary-600 italic">Landscape &amp; Gardening</span> Services
          </h2>
          <p class="text-earthy-700 text-base md:text-lg leading-relaxed">
            Browse our full capabilities — including 3D landscape designing, natural lawn grass supply, rock garden maintenance, farmhouse architecture, and corporate greening in Hyderabad and Telangana.
          </p>
        </div>

        <!-- Filter Tabs -->
        <div class="flex flex-wrap items-center gap-2.5 mb-12">
          <button
            type="button"
            @click="activeCategoryTab = 'all'"
            :class="[
              'px-5 py-2.5 rounded-full text-xs md:text-sm font-semibold tracking-wide transition-all duration-300',
              activeCategoryTab === 'all'
                ? 'bg-earthy-950 text-white shadow-md'
                : 'bg-white text-earthy-700 border border-earthy-200 hover:border-earthy-300 hover:bg-earthy-100/50'
            ]"
          >
            All Services (27)
          </button>
          <button
            v-for="cat in serviceCategories"
            :key="cat.id"
            type="button"
            @click="activeCategoryTab = cat.id"
            :class="[
              'px-5 py-2.5 rounded-full text-xs md:text-sm font-semibold tracking-wide transition-all duration-300',
              activeCategoryTab === cat.id
                ? 'bg-primary-600 text-white shadow-md'
                : 'bg-white text-earthy-700 border border-earthy-200 hover:border-earthy-300 hover:bg-earthy-100/50'
            ]"
          >
            {{ cat.name }} ({{ cat.services.length }})
          </button>
        </div>

        <!-- Categorized Service Lists -->
        <div class="space-y-16">
          <div
            v-for="cat in filteredCategories"
            :key="cat.id"
            class="space-y-6"
          >
            <div class="flex items-center gap-3 border-b border-earthy-200 pb-4">
              <span class="w-2.5 h-2.5 rounded-full bg-primary-600"></span>
              <h3 class="text-xl md:text-2xl font-heading font-bold text-earthy-950">
                {{ cat.name }}
              </h3>
              <span class="ml-auto text-xs uppercase tracking-wider text-earthy-500 font-medium hidden sm:inline">
                {{ cat.badge }}
              </span>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div
                v-for="service in cat.services"
                :key="service.title"
                class="bg-white rounded-3xl p-7 border border-earthy-200/80 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div class="space-y-3">
                  <h4 class="text-xl font-heading font-bold text-earthy-950 group-hover:text-primary-600 transition-colors">
                    {{ service.title }}
                  </h4>
                  <p class="text-sm text-earthy-700 leading-relaxed">
                    {{ service.desc }}
                  </p>
                </div>

                <div class="mt-6 pt-4 border-t border-earthy-100 space-y-4">
                  <div class="flex flex-wrap gap-1.5">
                    <span
                      v-for="tag in service.tags"
                      :key="tag"
                      class="px-2.5 py-1 rounded-full bg-earthy-100 text-earthy-700 text-[11px] font-medium"
                    >
                      {{ tag }}
                    </span>
                  </div>
                  <RouterLink
                    to="/contact"
                    class="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary-700 group-hover:text-primary-600 transition-colors"
                  >
                    <span>Inquire Now</span>
                    <ArrowRight class="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </RouterLink>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Bottom Catalog CTA -->
        <div class="mt-16 text-center bg-white rounded-3xl p-8 border border-earthy-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
          <div class="text-left space-y-1">
            <h4 class="text-lg md:text-xl font-heading font-bold text-earthy-950">Need a Custom Landscaping or Maintenance Proposal?</h4>
            <p class="text-sm text-earthy-600">Our senior landscape architects and project contractors visit your site anywhere across Hyderabad.</p>
          </div>
          <RouterLink to="/contact" class="btn-primary whitespace-nowrap">
            <span>Schedule Site Visit</span>
            <ArrowRight class="w-4 h-4 ml-2" />
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>
