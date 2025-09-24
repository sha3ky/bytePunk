<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page class="hero-section">
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
              <span class="txt">☰ Menu</span>
            </button>

            <!-- Items -->
            <transition-group name="radial" tag="div" class="radial-items" v-if="open">
              <button
                v-for="(item, i) in items"
                :key="item.label"
                class="cybr-btn radial-item"
                :style="getPosition(i)"
                @click="onItemClick(item)"
              >
                <span class="span"></span>
                <span class="txt">{{ item.label }}</span>
              </button>
            </transition-group>
          </div>

          <!-- <div class="hero-buttons">
            <button class="cybr-btn">
              Proyectos
              <span aria-hidden class="cybr-btn__glitch">Proyectos</span>
              <span aria-hidden class="cybr-btn__tag">R25</span>
            </button>
          </div> -->
          <!--  <div class="hero-buttons">
            <button class="cybr-btn">
              <span class="span"></span>
              <span class="txt">🚀 Proyectos</span>
            </button>
          </div> -->
        </div>
        <!--  <div class="logo-3d-container">
          <iframe
            src="https://my.spline.design/tu-escena/xyz123/"
            frameborder="0"
            width="100%"
            height="500"
          ></iframe>
        </div> -->
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

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

const onItemClick = (item) => {
  console.log('Click en', item.label)
  open.value = false
}

// posiciones fijas: top, right, bottom, left
// posiciones fijas: top, right, bottom, left
const getPosition = (i) => {
  const isMobile = screenWidth.value < 768

  if (isMobile) {
    const gapVH = 6 // separación en vh (ajústalo entre 5–7)
    const positions = [
      { transform: `translate(-50%, calc(-50% - ${gapVH * 2}vh))` }, // Inicio
      { transform: `translate(-50%, calc(-50% - ${gapVH}vh))` }, // Proyectos
      { transform: `translate(-50%, calc(-50% + ${gapVH}vh))` }, // Contacto
      { transform: `translate(-50%, calc(-50% + ${gapVH * 2}vh))` }, // Sobre mí
    ]
    return positions[i]
  }

  // Desktop (radial)
  const r = 100
  const btnWidth = 380
  const gap = 20

  const positions = [
    { transform: `translate(-50%, calc(-50% - ${r}px))` },
    { transform: `translate(calc(-50% + ${btnWidth / 2 + gap}px), -50%)` },
    { transform: `translate(-50%, calc(-50% + ${r}px))` },
    { transform: `translate(calc(-50% - ${btnWidth / 2 + gap}px), -50%)` },
  ]
  return positions[i]
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
} /* Imagen de fondo */
.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('/imagenes/city.jpg') no-repeat center center;
  background-size: cover;
  filter: brightness(0.4); /* oscurece un poco para contraste */
  z-index: 0;
} /* Capa de partículas */
.particles-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
} /* Contenido central */
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
  color: #fcee09; /* amarillo cyberpunk */
  position: relative; /* text-transform: uppercase; */
  letter-spacing: 2px;
  text-shadow:
    0 0 5px #fcee09,
    0 0 15px #fcee09,
    0 0 30px #ff005d,
    0 0 60px #00eaff;
  animation: flicker 2s infinite alternate;
} /* Efecto glitch con pseudo-elementos */
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
  clip: rect(0, 900px, 0, 0); /* se animará */
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
} /* Animaciones */
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
  font-family: 'Orbitron', sans-serif; /* futurista pero seria */
  font-size: 2rem; /* más pequeño que antes */
  font-weight: 500;
  color: #ffffff;
  letter-spacing: 1px;
  margin: 15px 0 0;
  opacity: 0.85;
  text-shadow:
    0 0 5px rgba(255, 255, 255, 0.2),
    0 0 10px rgba(0, 234, 255, 0.1); /* sutil glow */
}
.hero-buttons {
  margin-top: 40px;
  display: flex;
  justify-content: center;
} /* menu style */
.center-btn {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
} /* Items radiales */ /* Contenedor del radial. Lo centramos y bajamos un poco para no tocar el título */
.radial-menu {
  position: relative;
  width: 100%;
  height: 32vh; /* alto lógico en vh para que quepa el anillo */
  margin-top: 2vh;
  z-index: 3;
} /* Botón central */
.center-btn {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(
    -50%,
    -50%
  ); /* el estilo inline de los items lo sobreescribe solo en items */
  width: clamp(160px, 35vw, 220px);
  height: clamp(48px, 7vh, 65px);
  font-size: 1.05rem;
  z-index: 3;
} /* Grupo de items: no intercepta clicks “vacíos” */
.radial-items {
  position: absolute;
  inset: 0;
  z-index: 2;
} /* Cada item cyberpunk; el transform FINAL lo pone getPosition(i) inline */
.radial-item {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 200px;
  height: 45px;
  cursor: pointer;
} /* Transiciones de aparición */
.radial-enter-from,
.radial-leave-to {
  opacity: 0;
  transform: translate(-50%, -50%);
}
.radial-enter-to,
.radial-leave-from {
  opacity: 1;
} /* Un poco más compacto en pantallas pequeñas */
@media (max-width: 768px) {
  .cybr-btn {
    width: 90%; /* que ocupe casi toda la pantalla */
    max-width: 320px;
    height: 25px; /* un poco más pequeño */
    font-size: 0.9rem;
  }
  .center-btn {
    width: 90%;
    max-width: 320px;
  }
}
</style>
