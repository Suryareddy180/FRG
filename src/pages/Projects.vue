<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { RouterLink } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import { allProjects, getCategoryBySlug, getProjectsByCategory, projectCategories } from '@/data/projects'

const route = useRoute()

const activeCategory = computed(() => {
  const categorySlug = route.params.category
  return typeof categorySlug === 'string' ? getCategoryBySlug(categorySlug) ?? null : null
})

const visibleProjects = computed(() => {
  if (!activeCategory.value) {
    return allProjects
  }

  return getProjectsByCategory(activeCategory.value.slug)
})

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
})
</script>

<template>
  <div class="selection:bg-primary-600 selection:text-white bg-white min-h-screen">
    <Navbar />

    <main class="pt-40 pb-24 px-fluid-2">
      <section class="container-wide">
        <div class="mb-16">
          <div class="max-w-4xl space-y-6">
            <h1 class="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-earthy-950 max-w-3xl">
              <span v-if="activeCategory">{{ activeCategory.label }}</span>
              <template v-else>
                Project Portfolio Built Across <span class="text-primary-600 italic">Residential and Commercial</span> Spaces
              </template>
            </h1>
          </div>
        </div>

        <div class="flex flex-wrap gap-3 mb-12">
          <RouterLink
            to="/projects"
            :class="[
              'px-4 py-2 rounded-full border text-xs font-semibold tracking-[0.16em] uppercase transition-colors',
              !activeCategory ? 'bg-primary-600 border-primary-600 text-white' : 'bg-white border-earthy-200 text-earthy-700 hover:border-primary-300 hover:text-primary-700'
            ]"
          >
            All
          </RouterLink>
          <RouterLink
            v-for="category in projectCategories"
            :key="category.slug"
            :to="`/projects/${category.slug}`"
            :class="[
              'px-4 py-2 rounded-full border text-xs font-semibold tracking-[0.16em] uppercase transition-colors',
              activeCategory?.slug === category.slug ? 'bg-primary-600 border-primary-600 text-white' : 'bg-white border-earthy-200 text-earthy-700 hover:border-primary-300 hover:text-primary-700'
            ]"
          >
            {{ category.label }}
          </RouterLink>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          <RouterLink
            v-for="project in visibleProjects"
            :key="project.slug"
            :to="`/project/${project.slug}`"
            class="group"
          >
            <article class="project-item cursor-pointer">
              <div class="relative overflow-hidden rounded-4xl aspect-4/3 bg-earthy-100">
                <img
                  :src="getProjectImage(project)"
                  :alt="project.title"
                  class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div class="absolute inset-0 bg-earthy-950/15 group-hover:bg-earthy-950/35 transition-colors duration-500"></div>
                <div class="absolute top-6 left-6 px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-[11px] font-semibold tracking-[0.14em] uppercase text-primary-700 shadow-lg">
                  {{ project.category }}
                </div>
              </div>
            </article>
          </RouterLink>
        </div>

        <div v-if="!visibleProjects.length" class="rounded-4xl border border-earthy-200 bg-earthy-50 px-8 py-12 text-center mt-10">
          <p class="text-lg text-earthy-700">No projects are available for this category yet.</p>
        </div>
      </section>
    </main>

    <Footer />
  </div>
</template>