<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page class="hero-section">
        <!-- LOADER -->
        <div v-if="loading" class="loader-overlay">
          <div class="loader-spinner">BytePunk Studios</div>
        </div>

        <!-- CONTENIDO PRINCIPAL -->
        <div v-else>
          <!-- Imagen de fondo -->
          <div class="background"></div>

          <!-- Partículas -->
          <vue-particles
            v-if="showParticle"
            id="tsparticles"
            :options="particlesOptions"
            @particles-loaded="particlesLoaded"
            class="particles-bg"
          />

          <!-- Contenido central -->
          <div class="hero-content">
            <h1 class="hero-title glitch" data-text="BytePunk Studios">BytePunk Studios</h1>
            <p class="hero-subtitle">Fullstack + IoT + Agentes IA para un futuro inteligente</p>

            <!-- Radial Menu -->
            <div class="radial-menu">
              <!-- Botón central -->
              <button class="cybr-btn center-btn" @click="toggleMenu">
                <span class="span"></span>
                <span class="txt">☰</span>
              </button>

              <!-- Items -->
              <transition-group name="radial" tag="div" class="radial-items" appear mode="out-in">
                <!--  -->
                <div
                  v-show="open"
                  v-for="(item, i) in items"
                  :key="item.label"
                  class="radial-wrapper"
                  :style="getWrapperStyle(i)"
                >
                  <button class="cybr-btn radial-item" @click="onItemClick(item)">
                    <span class="span"></span>
                    <span class="txt">{{ item.label }}</span>
                  </button>
                </div>
              </transition-group>
            </div>
          </div>
        </div>
      </q-page>

      <DrawerInicio v-model="drawers.right" />
      <DrawerProyectos v-model="drawers.bottom" />
      <DrawerSobreMi v-model="drawers.left" />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, reactive, onMounted, computed, watch } from 'vue'

import DrawerInicio from '../components/DrawerInicio.vue'
import DrawerProyectos from 'src/components/DrawerProyectos.vue'
import DrawerSobreMi from 'src/components/DrawerSobreMi.vue'
import { useBoolean } from '../composable/useBoolean'

// Usar el composable correctamente
const { setBoolean, computedBoolean } = useBoolean()

const loading = ref(true)
const drawers = reactive({
  top: false,
  right: false,
  bottom: false,
  left: false,
})
const open = ref(false)
const screenWidth = ref(window.innerWidth)
/* const updateWidth = () => (screenWidth.value = window.innerWidth) */

const items = [
  { label: 'Inicio' },
  { label: 'Proyectos' },
  { label: 'Sobre mí' },
  { label: 'Contacto' },
]
const showParticle = computedBoolean('noParticle')

const toggleMenu = () => (open.value = !open.value)

// Nuevo cálculo de posiciones radiales
const getPosition = (i) => {
  const isMobile = screenWidth.value < 768
  const r = isMobile ? 100 : 140 // Radio para móvil y escritorio
  const angles = [0, 90, 180, 270] // arriba, derecha, abajo, izquierda
  const angle = angles[i] * (Math.PI / 180)

  const x = Math.cos(angle) * r
  const y = Math.sin(angle) * r

  return {
    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
  }
}

const getWrapperStyle = (i) => {
  const base = getPosition(i)
  return {
    ...base,
    transitionDelay: `${i * 120}ms`,
  }
}

const onItemClick = (item) => {
  open.value = false

  setTimeout(() => {
    switch (item.label) {
      case 'Inicio':
        drawers.right = true

        break
      case 'Proyectos':
        drawers.bottom = true

        break
      case 'Contacto':
        drawers.top = true

        break
      case 'Sobre mí':
        drawers.left = true

        break
    }
  }, 400) // espera la animación del menú radial
}

const isAnyDrawerOpen = computed(() => {
  return drawers.top || drawers.right || drawers.bottom || drawers.left
})

// Watch que controla las partículas basado en los drawers
watch(isAnyDrawerOpen, (newValue) => {
  debugger
  if (newValue) {
    // Si algún drawer se abre → OCULTAR partículas
    setBoolean('noParticle', false)
  } else {
    // Si todos los drawers se cierran → MOSTRAR partículas
    setBoolean('noParticle', true)
  }
})
onMounted(async () => {
  // listener de resize
  /*   window.addEventListener('resize', updateWidth)
   */
  // loading
  window.addEventListener('load', () => {
    setTimeout(() => {
      loading.value = false
    }, 500)
  })
})
/* -------- Particles -------- */
const particlesOptions = {
  background: { color: { value: 'transparent' } },
  fpsLimit: 60,
  interactivity: {
    events: { onHover: { enable: true, mode: 'repulse' } },
    modes: { repulse: { distance: 100, duration: 0.4 } },
  },
  particles: {
    color: { value: ['#9c27b0', '#2196f3'] },
    links: { color: '#ffffff', distance: 150, enable: true, opacity: 0.3, width: 1 },
    move: { enable: true, speed: 2 },
    number: { value: 80 },
    opacity: { value: 0.6 },
    shape: { type: 'circle' },
    size: { value: { min: 1, max: 4 } },
  },
  detectRetina: true,
  responsive: [
    {
      maxWidth: 768,
      options: {
        particles: {
          number: { value: 30 },
          move: { speed: 1 },
        },
      },
    },
  ],
}

const particlesLoaded = async (container) => {
  console.log('Particles container loaded', container)
}
</script>

<style scoped></style>
