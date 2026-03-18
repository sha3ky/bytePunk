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

      <DrawerInicio v-model="drawers.right" @open-projects="openProyectos" />
      <DrawerProyectos v-model="drawers.bottom" />
      <DrawerSobreMi v-model="drawers.left" />
      <DrawerContacto v-model="drawers.top" />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, reactive, onMounted, computed, watch } from 'vue'
import { useQuasar } from 'quasar'

import DrawerInicio from '../components/DrawerInicio.vue'
import DrawerProyectos from 'src/components/DrawerProyectos.vue'
import DrawerSobreMi from 'src/components/DrawerSobreMi.vue'
import DrawerContacto from 'src/components/DrawerContacto.vue'
import { useBoolean } from '../composable/useBoolean'

// Usar el composable correctamente
const { setBoolean, computedBoolean } = useBoolean()

const $q = useQuasar()

const loading = ref(true)
const drawers = reactive({
  top: false,
  right: false,
  bottom: false,
  left: false,
})
const open = ref(false)

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
  const isMobile = $q.screen.width < 768
  const r = isMobile ? 85 : 200 // Radio reactivo al resize
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

const openProyectos = () => {
  drawers.right = false
  setTimeout(() => {
    drawers.bottom = true
  }, 300)
}

const isAnyDrawerOpen = computed(() => {
  return drawers.top || drawers.right || drawers.bottom || drawers.left
})

// Watch que controla las partículas basado en los drawers
watch(isAnyDrawerOpen, (newValue) => {
  if (newValue) {
    // Si algún drawer se abre → OCULTAR partículas
    setBoolean('noParticle', false)
  } else {
    // Si todos los drawers se cierran → MOSTRAR partículas
    setBoolean('noParticle', true)
  }
})
onMounted(async () => {
  // Fix: use a direct timeout so loader always disappears
  setTimeout(() => {
    loading.value = false
  }, 1200)
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
    color: { value: ['#bf5fff', '#00ffff', '#2196f3'] },
    links: { color: '#00ffff', distance: 130, enable: true, opacity: 0.25, width: 1 },
    move: { enable: true, speed: 1.5 },
    number: { value: 90 },
    opacity: { value: { min: 0.2, max: 0.7 } },
    shape: { type: 'circle' },
    size: { value: { min: 1, max: 3 } },
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

<style scoped>
.hero-section {
  background: #050508;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.background {
  position: fixed;
  inset: 0;
  background:
    radial-gradient(ellipse at 20% 50%, rgba(90, 0, 180, 0.18) 0%, transparent 60%),
    radial-gradient(ellipse at 80% 30%, rgba(0, 180, 255, 0.15) 0%, transparent 55%),
    radial-gradient(ellipse at 60% 80%, rgba(160, 0, 255, 0.12) 0%, transparent 50%),
    #050508;
  z-index: 0;
}

.particles-bg {
  position: fixed;
  inset: 0;
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2rem;
}

.hero-title {
  font-family: 'GlitchGoblin', Cyber, sans-serif;
  font-size: clamp(2rem, 10vw, 4rem);
  line-height: 1.1;
  color: #fff;
  letter-spacing: 3px;
  text-transform: uppercase;
  margin-bottom: 0.75rem;
  text-shadow:
    0 0 10px rgba(0, 255, 255, 0.6),
    0 0 30px rgba(0, 255, 255, 0.3),
    0 0 60px rgba(0, 255, 255, 0.15);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.hero-subtitle {
  font-size: clamp(0.9rem, 4vw, 1.3rem);
  color: rgba(0, 255, 255, 0.75);
  letter-spacing: 1.5px;
  margin-bottom: 1.5rem;
  font-family: monospace;
  line-height: 1.4;
  padding: 0 1rem;
}

.loader-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: #050508;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loader-spinner {
  font-family: Cyber;
  font-size: clamp(1.5rem, 5vw, 3rem);
  color: #00ffff;
  letter-spacing: 4px;
  animation: flicker 1.5s infinite ease-in-out;
  text-shadow: 0 0 20px #00ffff, 0 0 40px #00ffff;
}

@keyframes flicker {
  0%, 100% { opacity: 1; }
  45% { opacity: 0.85; }
  50% { opacity: 0.3; }
  55% { opacity: 0.9; }
}
</style>
