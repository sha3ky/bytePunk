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
            id="tsparticles"
            :options="particlesOptions"
            @particles-loaded="particlesLoaded"
            class="particles-bg"
          />

          <!-- Contenido central -->
          <div class="hero-content">
            <h1 class="hero-title glitch" data-text="BytePunk Studios">BytePunk Studios</h1>
            <p class="hero-subtitle">Fullstack + IoT para un futuro industrial inteligente</p>

            <!-- Radial Menu -->
            <div class="radial-menu">
              <!-- Botón central -->
              <button class="cybr-btn center-btn" @click="toggleMenu">
                <span class="span"></span>
                <span class="txt">☰</span>
              </button>

              <!-- Items -->
              <transition-group
                name="radial"
                tag="div"
                class="radial-items"
                v-if="open"
                appear
                mode="out-in"
              >
                <div
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
      <q-drawer
        v-model="drawers.right"
        side="right"
        :overlay="true"
        behavior="mobile"
        class="metal-drawer animated-drawer"
      >
        <div class="drawer-content q-pa-md">
          <q-card class="cyber-card">
            <q-card-section>
              <div class="text-h5">🚀 Proyectos</div>
              <p>Aquí irán tus proyectos fullstack + IoT con un diseño brutal.</p>
            </q-card-section>
          </q-card>
        </div>
      </q-drawer>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted, onUnmounted, reactive } from 'vue'
const loading = ref(true)
const drawers = reactive({
  top: false,
  right: false,
  bottom: false,
  left: false,
})
const screenWidth = ref(window.innerWidth)
const updateWidth = () => (screenWidth.value = window.innerWidth)

onMounted(() => window.addEventListener('resize', updateWidth))
onUnmounted(() => window.removeEventListener('resize', updateWidth))

const open = ref(false)
const items = [
  { label: 'Inicio' }, // arriba
  { label: 'Proyectos' }, // derecha
  { label: 'Contacto' }, // abajo
  { label: 'Sobre mí' }, // izquierda
]

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
        drawers.left = true
        break
      case 'Sobre mí':
        drawers.top = true
        break
    }
  }, 400) // espera la animación del menú radial
}

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

onMounted(() => {
  // Espera al menos que el CSS, imágenes y partículas estén listas
  window.addEventListener('load', () => {
    setTimeout(() => {
      loading.value = false
    }, 500) // da un margen para transiciones (ajusta si quieres)
  })
})
</script>

<style scoped>
.hero-section {
  position: relative;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Imagen de fondo */
.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('/imagenes/circuito.webp') no-repeat center center;
  background-size: cover;
  filter: brightness(0.4);
  z-index: 0;
}

/* Capa de partículas */
.particles-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

/* Contenido central */
.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  color: #fff;
  max-width: 800px;
  padding: 20px;
}

.hero-title {
  font-family: 'GlitchGoblin', sans-serif;
  font-size: 4rem;
  font-weight: bolder;
  color: #fcee09;
  position: relative;
  letter-spacing: 2px;
  text-shadow:
    0 0 5px #fcee09,
    0 0 15px #fcee09,
    0 0 30px #ff005d,
    0 0 60px #00eaff;
  animation: flicker 2s infinite alternate;
}

/* Efecto glitch con pseudo-elementos */
.glitch::before,
.glitch::after {
  content: attr(data-text);
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  overflow: hidden;
  color: #fcee09;
  background: transparent;
  clip: rect(0, 900px, 0, 0);
}

.glitch::before {
  left: 2px;
  text-shadow: -2px 0 #ff005d;
  animation: glitchTop 2s infinite linear alternate-reverse;
}

.glitch::after {
  left: -2px;
  text-shadow: -2px 0 #00eaff;
  animation: glitchBottom 1.5s infinite linear alternate-reverse;
}

/* Animaciones */
@keyframes glitchTop {
  0% {
    clip: rect(0, 9999px, 0, 0);
  }
  10% {
    clip: rect(10px, 9999px, 40px, 0);
  }
  20% {
    clip: rect(20px, 9999px, 50px, 0);
  }
  30% {
    clip: rect(30px, 9999px, 80px, 0);
  }
  40% {
    clip: rect(10px, 9999px, 60px, 0);
  }
  50% {
    clip: rect(0, 9999px, 0, 0);
  }
  100% {
    clip: rect(0, 9999px, 0, 0);
  }
}

@keyframes glitchBottom {
  0% {
    clip: rect(0, 9999px, 0, 0);
  }
  10% {
    clip: rect(50px, 9999px, 80px, 0);
  }
  20% {
    clip: rect(60px, 9999px, 90px, 0);
  }
  30% {
    clip: rect(70px, 9999px, 100px, 0);
  }
  40% {
    clip: rect(20px, 9999px, 60px, 0);
  }
  50% {
    clip: rect(0, 9999px, 0, 0);
  }
  100% {
    clip: rect(0, 9999px, 0, 0);
  }
}

@keyframes flicker {
  0%,
  18%,
  22%,
  25%,
  53%,
  57%,
  100% {
    opacity: 1;
  }
  20%,
  24%,
  55% {
    opacity: 0.8;
  }
}

.hero-subtitle {
  font-family: 'Orbitron', sans-serif;
  font-size: 2rem;
  font-weight: 500;
  color: #ffffff;
  letter-spacing: 1px;
  margin: 15px 0 0;
  opacity: 0.85;
  text-shadow:
    0 0 5px rgba(255, 255, 255, 0.2),
    0 0 10px rgba(0, 234, 255, 0.1);
}
</style>
