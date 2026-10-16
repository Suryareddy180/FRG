<script setup>
import { ref, onMounted } from 'vue'
import frgLogo from '@/assets/images/logo/3.png'

const visible = ref(false)

onMounted(() => {
  // Trigger entrance animation after mount
  requestAnimationFrame(() => {
    visible.value = true
  })
})
</script>

<template>
  <div class="min-h-screen bg-earthy-950 flex flex-col items-center justify-center px-6 overflow-hidden relative">
    <!-- Subtle background texture -->
    <div class="absolute inset-0 opacity-[0.04]" style="background-image: radial-gradient(#948461 1px, transparent 1px); background-size: 36px 36px;"></div>
    <!-- Glow blobs -->
    <div class="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 rounded-full bg-primary-900/20 blur-[120px] pointer-events-none"></div>

    <!-- Logo -->
    <div
      :class="[
        'transition-all duration-1000 ease-out',
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      ]"
    >
      <img
        :src="frgLogo"
        alt="Fortune Rise Groups"
        class="w-56 sm:w-72 lg:w-96 h-auto object-contain drop-shadow-[0_8px_40px_rgba(0,0,0,0.6)]"
      />
    </div>

    <!-- Divider -->
    <div
      :class="[
        'mt-10 w-24 h-0.5 bg-linear-to-r from-transparent via-primary-500 to-transparent transition-all duration-1000 delay-300 ease-out',
        visible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
      ]"
    ></div>

    <!-- Coming Soon text -->
    <div
      :class="[
        'mt-8 text-center transition-all duration-1000 delay-500 ease-out',
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      ]"
    >
      <h1 class="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-white tracking-wide">
        Coming Soon
      </h1>
      <p class="mt-4 text-earthy-400 text-base sm:text-lg font-light tracking-widest uppercase">
        Something beautiful is growing
      </p>
    </div>
  </div>
</template>
