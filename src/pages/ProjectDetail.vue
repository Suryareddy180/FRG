<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { ChevronLeft, ChevronRight, Play, X } from 'lucide-vue-next'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import { getProjectBySlug, getProjectGallery } from '@/data/projects'

const route = useRoute()

const scrollToTop = () => {
  window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
}

const project = computed(() => getProjectBySlug(route.params.projectSlug))
const staticGalleryItems = computed(() => (project.value ? getProjectGallery(project.value) : []))
const runtimeGalleryItems = ref([])
const galleryItems = computed(() => {
  if (staticGalleryItems.value.length) {
    return staticGalleryItems.value
  }

  return runtimeGalleryItems.value
})
const activeMedia = computed(() => galleryItems.value[activeImageIndex.value] ?? null)
const isLightboxOpen = ref(false)
const activeImageIndex = ref(0)

const loadRuntimeGallery = async () => {
  runtimeGalleryItems.value = []

  if (!project.value || staticGalleryItems.value.length) {
    return
  }

  try {
    const response = await fetch(
      `/project-media.php?folder=${encodeURIComponent(project.value.folderName)}&t=${Date.now()}`,
      {
        cache: 'no-store'
      }
    )

    if (!response.ok) {
      return
    }

    const payload = await response.json()

    if (!Array.isArray(payload?.items)) {
      return
    }

    runtimeGalleryItems.value = payload.items
      .filter((item) => typeof item?.src === 'string' && (item.type === 'image' || item.type === 'video'))
      .map(({ src, type }) => ({ src, type }))
  } catch {
    // Ignore runtime media fetch failures in environments without PHP support.
  }
}

const openLightbox = (index) => {
  activeImageIndex.value = index
  isLightboxOpen.value = true
}

const closeLightbox = () => {
  isLightboxOpen.value = false
}

const showPreviousImage = () => {
  if (!galleryItems.value.length) return
  activeImageIndex.value = (activeImageIndex.value - 1 + galleryItems.value.length) % galleryItems.value.length
}

const showNextImage = () => {
  if (!galleryItems.value.length) return
  activeImageIndex.value = (activeImageIndex.value + 1) % galleryItems.value.length
}

const handleKeydown = (event) => {
  if (!isLightboxOpen.value) return

  if (event.key === 'Escape') {
    closeLightbox()
  } else if (event.key === 'ArrowLeft') {
    showPreviousImage()
  } else if (event.key === 'ArrowRight') {
    showNextImage()
  }
}

watch(isLightboxOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
})

onMounted(() => {
  scrollToTop()
  window.addEventListener('keydown', handleKeydown)
  loadRuntimeGallery()
})

watch(() => route.params.projectSlug, () => {
  scrollToTop()
  activeImageIndex.value = 0
  loadRuntimeGallery()
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <div v-if="project" class="selection:bg-primary-600 selection:text-white bg-white min-h-screen">
    <Navbar />

    <main class="pt-38 pb-24 px-fluid-2">
      <section class="container-wide space-y-8">
        <div class="flex items-center justify-between gap-6 flex-wrap">
          <div>
            <p class="text-sm uppercase tracking-[0.2em] text-earthy-500 mb-2">Gallery</p>
            <h1 class="text-2xl md:text-3xl font-heading font-bold text-earthy-950">{{ project.category }}</h1>
          </div>
          <RouterLink to="/projects" class="btn-outline">
            Browse All Projects
          </RouterLink>
        </div>

        <div v-if="galleryItems.length" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          <div
            v-for="(item, index) in galleryItems"
            :key="`${project.slug}-${index}`"
            class="overflow-hidden rounded-4xl bg-earthy-100 border border-earthy-200"
          >
            <button
              type="button"
              class="w-full relative"
              @click="openLightbox(index)"
              :aria-label="`Open media item ${index + 1} in full view`"
            >
              <img
                v-if="item.type === 'image'"
                :src="item.src"
                :alt="`${project.title} - ${project.category} Landscape Project photo ${index + 1}`"
                class="w-full h-80 object-cover cursor-zoom-in"
                loading="lazy"
                decoding="async"
              />

              <video
                v-else
                :src="item.src"
                class="w-full h-80 object-cover"
                muted
                preload="metadata"
                playsinline
              />

              <div
                v-if="item.type === 'video'"
                class="absolute inset-0 bg-black/30 flex items-center justify-center"
              >
                <span class="inline-flex items-center gap-2 rounded-full bg-white/90 text-earthy-900 px-4 py-2 text-xs font-semibold tracking-[0.14em] uppercase">
                  <Play class="w-4 h-4" />
                  Play Video
                </span>
              </div>
            </button>
          </div>
        </div>

        <div v-else class="rounded-4xl border border-earthy-200 bg-earthy-50 px-8 py-12 text-center">
          <p class="text-lg text-earthy-700">
            No project media has been added yet for this project. Project folder may contain images or videos.
          </p>
        </div>
      </section>
    </main>

    <div
      v-if="isLightboxOpen && galleryItems.length"
      class="fixed inset-0 z-70 bg-black/85 backdrop-blur-sm flex items-center justify-center px-4"
      @click="closeLightbox"
    >
      <button
        type="button"
        class="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 text-white border border-white/30 flex items-center justify-center hover:bg-white/20 transition-colors"
        @click.stop="closeLightbox"
        aria-label="Close image viewer"
      >
        <X class="w-6 h-6" />
      </button>

      <button
        type="button"
        class="absolute left-4 md:left-8 w-12 h-12 rounded-full bg-white/10 text-white border border-white/30 flex items-center justify-center hover:bg-white/20 transition-colors"
        @click.stop="showPreviousImage"
        aria-label="Show previous media"
      >
        <ChevronLeft class="w-7 h-7" />
      </button>

      <img
        v-if="activeMedia?.type === 'image'"
        :src="activeMedia.src"
        :alt="`${project.title} large view ${activeImageIndex + 1}`"
        class="max-h-[85vh] max-w-[90vw] object-contain rounded-2xl"
        @click.stop
      />

      <video
        v-else-if="activeMedia?.type === 'video'"
        :src="activeMedia.src"
        class="max-h-[85vh] max-w-[90vw] object-contain rounded-2xl bg-black"
        controls
        autoplay
        playsinline
        @click.stop
      />

      <button
        type="button"
        class="absolute right-4 md:right-8 w-12 h-12 rounded-full bg-white/10 text-white border border-white/30 flex items-center justify-center hover:bg-white/20 transition-colors"
        @click.stop="showNextImage"
        aria-label="Show next media"
      >
        <ChevronRight class="w-7 h-7" />
      </button>
    </div>

    <Footer />
  </div>

  <div v-else class="min-h-screen bg-earthy-50 text-earthy-950 flex items-center justify-center px-6">
    <div class="text-center space-y-6">
      <h1 class="text-3xl font-heading font-bold">Project not found</h1>
      <p class="text-earthy-600">The requested project does not exist in the current catalog.</p>
    </div>
  </div>
</template>