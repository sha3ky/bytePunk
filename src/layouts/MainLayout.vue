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
          <div class="hero-buttons">
            <button class="cybr-btn">
              Proyectos<span aria-hidden>_</span>
              <span aria-hidden class="cybr-btn__glitch">Proyectos</span>
              <span aria-hidden class="cybr-btn__tag">R25</span>
            </button>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
const particlesOptions = {
  background: { color: { value: 'transparent' } },
  fpsLimit: 60,
  interactivity: {
    events: { onHover: { enable: true, mode: 'repulse' } },
    modes: { repulse: { distance: 100, duration: 0.4 } },
  },
  particles: {
    color: { value: ['#00f0ff', '#ff00ff'] }, // neon cyan + magenta
    links: { color: '#00f0ff', distance: 150, enable: true, opacity: 0.3, width: 1 },
    move: { enable: true, speed: 2 },
    number: { value: 90 },
    opacity: { value: 0.7 },
    shape: { type: 'circle' },
    size: { value: { min: 1, max: 5 } },
  },
  detectRetina: true,
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
}

/* Imagen de fondo */
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
  font-weight: normal;
  color: #fcee09; /* amarillo cyberpunk */
  position: relative;
  /*   text-transform: uppercase;
 */
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
  font-family: 'Orbitron', sans-serif; /* futurista pero seria */
  font-size: 1.6rem; /* más pequeño que antes */
  font-weight: 400;
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
}

/* Colores más cyberpunk */
</style>
