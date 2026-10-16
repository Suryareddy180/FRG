<script setup>
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MapPin, Globe, Map, Navigation, Phone, Mail, MessageCircle } from 'lucide-vue-next'

gsap.registerPlugin(ScrollTrigger)

const contactRef = ref(null)

const props = defineProps({
  isPage: {
    type: Boolean,
    default: false
  }
})

const directionsUrl = 'https://maps.app.goo.gl/Er2RvfCUTYXQch7Y9'
const mapEmbedUrl =
  'https://www.google.com/maps?q=Phase+2,+Shanthi+Nilayam,+15-25%2F648,+Kukatpally+Housing+Board+Colony,+KPHB+Phase+2,+Kukatpally,+Hyderabad,+Telangana+500072&output=embed'
const phoneDisplay = '098678 90999'
const phoneHref = 'tel:+919867890999'
const emailAddress = 'connect@fortunerisegroups.in'
const emailHref = 'mailto:connect@fortunerisegroups.in'
const whatsappHref = 'https://wa.me/919867890999'

onMounted(() => {
  gsap.from('.location-card', {
    x: -50,
    opacity: 0,
    duration: 1,
    scrollTrigger: {
      trigger: contactRef.value,
      start: 'top 80%',
      end: 'bottom 20%',
      scrub: false
    }
  })

  gsap.from('.map-card', {
    x: 50,
    opacity: 0,
    duration: 1,
    scrollTrigger: {
      trigger: contactRef.value,
      start: 'top 80%',
      end: 'bottom 20%',
      scrub: false
    }
  })
})
</script>

<template>
  <section ref="contactRef" class="section-padding bg-white relative overflow-hidden">
    <div class="absolute -bottom-20 -right-20 w-80 h-80 bg-primary-100 rounded-full blur-3xl opacity-60 z-0"></div>

    <div class="max-w-7xl mx-auto relative z-10">
      <div class="text-center mb-14 space-y-4">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-earthy-200 shadow-sm mb-4">
          <span class="w-2 h-2 rounded-full bg-primary-600"></span>
          <span class="text-earthy-700 font-medium text-xs uppercase tracking-widest">Contact / Location</span>
        </div>
        <component :is="isPage ? 'h1' : 'h2'" class="text-4xl md:text-5xl font-heading font-bold text-earthy-950">
          Visit Our <span class="text-primary-600 italic">Office</span>
        </component>
        <p class="text-lg text-earthy-600 max-w-2xl mx-auto">
          A clean and clear location hub to find us quickly and get directions without any hassle.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
        <div class="location-card bg-white p-8 md:p-10 rounded-3xl border border-earthy-200 shadow-[0_18px_45px_rgba(0,0,0,0.08)] space-y-8">
          <div class="space-y-4">
            <div class="flex items-center gap-3">
              <span class="w-10 h-10 rounded-xl bg-primary-100 text-primary-700 inline-flex items-center justify-center">
                <MapPin class="w-5 h-5" />
              </span>
              <h3 class="text-2xl font-heading font-bold text-earthy-950">Our Office</h3>
            </div>

            <div class="pl-1 space-y-1 text-earthy-700 leading-relaxed">
              <p class="font-medium">Phase 2, Shanthi Nilayam</p>
              <p>15-25/648, Kukatpally Housing Board Colony</p>
              <p>KPHB Phase 2, Kukatpally</p>
              <p>Hyderabad, Telangana - 500072</p>
            </div>
          </div>

          <div class="rounded-2xl border border-primary-200 bg-primary-50 px-5 py-4">
            <div class="flex items-start gap-3">
              <Globe class="w-5 h-5 text-primary-700 mt-0.5" />
              <div>
                <p class="text-xs font-semibold uppercase tracking-widest text-primary-700">Service Areas</p>
                <p class="text-base md:text-lg font-semibold text-earthy-900">Telangana &amp; Andhra Pradesh</p>
              </div>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row gap-4 pt-2">
            <a
              :href="directionsUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary-600 text-white font-semibold shadow-sm hover:bg-primary-700 hover:-translate-y-0.5 transition-all duration-300"
            >
              <Navigation class="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              Get Directions
            </a>
            <a
              :href="phoneHref"
              class="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-earthy-300 text-earthy-800 font-semibold hover:bg-earthy-100 transition-colors"
            >
              <Phone class="w-4 h-4" />
              Call Us
            </a>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <a
              :href="emailHref"
              class="inline-flex items-center gap-2 rounded-xl border border-earthy-200 bg-earthy-50 px-4 py-3 text-earthy-800 hover:border-primary-300 hover:text-primary-700 transition-colors"
            >
              <Mail class="w-4 h-4" />
              <span class="text-sm font-medium">{{ emailAddress }}</span>
            </a>
            <a
              :href="whatsappHref"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 rounded-xl border border-earthy-200 bg-earthy-50 px-4 py-3 text-earthy-800 hover:border-primary-300 hover:text-primary-700 transition-colors"
            >
              <MessageCircle class="w-4 h-4" />
              <span class="text-sm font-medium">WhatsApp: {{ phoneDisplay }}</span>
            </a>
          </div>
        </div>

        <div class="map-card bg-white p-5 md:p-6 rounded-3xl border border-earthy-200 shadow-[0_18px_45px_rgba(0,0,0,0.08)]">
          <div class="h-full w-full flex flex-col gap-4">
            <div class="flex items-center gap-3 px-2">
              <span class="w-9 h-9 rounded-lg bg-primary-100 text-primary-700 inline-flex items-center justify-center">
                <Map class="w-5 h-5" />
              </span>
              <div>
                <p class="text-xs font-semibold uppercase tracking-widest text-earthy-500">Map</p>
                <p class="text-xl font-heading font-bold text-earthy-950">Find Us on Google Maps</p>
              </div>
            </div>

            <div class="relative min-h-80 md:min-h-96 rounded-2xl overflow-hidden border border-earthy-200 shadow-sm">
              <iframe
                :src="mapEmbedUrl"
                class="absolute inset-0 w-full h-full"
                title="FRG Location Map"
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                allowfullscreen
              ></iframe>
            </div>

            <a
              :href="directionsUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center justify-center gap-2 rounded-xl border border-primary-200 bg-primary-50 px-5 py-3 text-primary-800 font-semibold hover:bg-primary-100 transition-colors"
            >
              <MapPin class="w-4 h-4" />
              Open in Google Maps
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
