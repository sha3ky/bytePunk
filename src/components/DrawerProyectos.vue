<template>
  <q-dialog
    v-model="localVisible"
    position="bottom"
    maximized
    transition-show="slide-up"
    transition-hide="slide-down"
    @hide="onHide"
  >
    <q-card
      class="cyber-card metal-drawer"
      style="display: flex; flex-direction: column; height: 100vh"
    >
      <!-- Header -->
      <div
        class="close-btn-container"
        style="border-bottom: 1px solid rgba(0, 255, 255, 0.2); flex-shrink: 0"
      >
        <h4 class="text-h4 margins" data-text="Proyectos">Proyectos</h4>
        <q-btn flat dense icon="close" color="cyan" @click="close" />
      </div>

      <!-- CONTENT AREA -->
      <div class="content-area proj-content-area" style="flex: 1; overflow: hidden; padding: 2rem;">
        <transition name="fade" mode="out-in">
          
          <!-- Placeholder (Ninguno seleccionado) -->
          <div
            v-if="!activeProject"
            key="placeholder"
            class="placeholder-msg flex flex-center"
            style="height: 100%"
          >
            <div class="scanner-container text-center">
              <q-icon name="radar" size="6rem" class="radar-spin" color="cyan" />
              <h3 class="placeholder-title">SISTEMA EN ESPERA</h3>
              <p class="placeholder-subtitle">
                > ESTABLECIENDO CONEXIÓN CON REPOSITORIOS...<br>
                > SELECCIONE UN NODO DE DATOS ABAJO PARA CARGAR EL HOLO-REGISTRO.
              </p>
            </div>
          </div>

          <!-- Proyecto Seleccionado -->
          <div v-else key="project" class="project-row">
            <!-- LEFT: iframe -->
            <div class="video-col">
              <div class="project-iframe-wrapper">
                <div class="iframe-frame-corner top-left"></div>
                <div class="iframe-frame-corner top-right"></div>
                <div class="iframe-frame-corner bottom-left"></div>
                <div class="iframe-frame-corner bottom-right"></div>
                <iframe
                  :key="activeProject.video"
                  :src="activeProject.video"
                  allow="autoplay; encrypted-media"
                  allowfullscreen
                  class="project-iframe"
                  style="background-color: #000;"
                ></iframe>
              </div>
            </div>

            <!-- RIGHT: description -->
            <div class="desc-col">
              <div class="glass-panel desc-panel">
                <div class="desc-header">
                  <q-icon name="folder_open" color="cyan" size="2rem" />
                  <h3 class="proj-title">{{ activeProject.label }}</h3>
                </div>

                <div class="tech-chips">
                  <span v-for="tech in activeProject.techs" :key="tech" class="cyber-chip">
                    {{ tech }}
                  </span>
                </div>

                <p class="proj-desc">
                  <span class="prompt-arrow">></span> {{ activeProject.desc }}
                </p>

                <div class="btn-container" v-if="activeProject.key === 'shiftclock'">
                  <q-btn
                    outline
                    color="cyan"
                    icon="launch"
                    label="INICIAR DEMO INTERACTIVA"
                    href="https://controlhorariox.netlify.app/#/"
                    target="_blank"
                    class="demo-btn"
                  />
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>

      <!-- CAROUSEL bottom -->
      <div class="bottom-panel">
        <div class="carousel-track">
          <div
            v-for="project in projects"
            :key="project.key"
            class="carousel-thumb"
            :class="{ active: activeProject && activeProject.key === project.key }"
            @click="selectProject(project)"
          >
            <div class="thumb-overlay"></div>
            <q-img
              :src="project.img"
              :ratio="16 / 9"
              fit="cover"
              style="width: 100%; border-radius: 4px; background: #050508;"
              loading="lazy"
            />
            <span class="thumb-label">[ {{ project.label }} ]</span>
          </div>
        </div>
      </div>
    </q-card>
  </q-dialog>>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: { type: Boolean, required: true },
})
const emit = defineEmits(['update:modelValue'])

const localVisible = ref(props.modelValue)
watch(
  () => props.modelValue,
  (val) => {
    localVisible.value = val
  },
)
watch(localVisible, (val) => emit('update:modelValue', val))

function close() {
  localVisible.value = false
}
function onHide() {
  activeProject.value = null
  emit('update:modelValue', false)
}

/* ---- Data ---- */
const arrayimages = [
  'dnsDynamic',
  'dustrbike',
  'jtcars',
  'lottery',
  'plantsIA',
  'shiftclock',
  'smartStudy',
]

const labelMap = {
  dnsDynamic: 'DNS Dynamic',
  dustrbike: 'DustrBike',
  jtcars: 'JT Cars',
  lottery: 'Lottery',
  plantsIA: 'Plants IA',
  shiftclock: 'ShiftClock',
  smartStudy: 'SmartStudy',
}

const techMap = {
  dnsDynamic: ['Vue 3', 'Tailwind', 'Prototypado Rápido'],
  dustrbike: ['Quasar', 'Three.js', 'UI Experimental'],
  jtcars: ['Django', 'Vue 3', 'PostgreSQL'],
  lottery: ['Vue', 'Lógica Interactiva', 'UX/UI'],
  smartStudy: ['AI Agents', 'OpenAI', 'Educación'],
  shiftclock: ['Local-First', 'SQLite', 'Seguridad'],
  plantsIA: ['Python AI', 'Visión Artificial', 'Vue']
}

const descripcionVideo = {
  dnsDynamic:
    'Proyecto ágil para un cliente que necesitaba una solución visualmente atractiva y funcional en muy poco tiempo.',
  dustrbike:
    'Experimento inicial con Quasar Framework para poner a prueba sus límites. Aún en desarrollo y mejora continua.',
  jtcars:
    'Proyecto fullstack consolidado para el mundo automotor. Backend sólido en Django combinado con un frontend responsivo. Arquitectura enfocada en escalabilidad.',
  lottery:
    'Unión de frontend, backend, movimientos fluidos, ruteadores de audio inmersivos y lógica de estado en fase de testing visual.',
  smartStudy: 
    'App gamificada diseñada para facilitar el aprendizaje de forma segura e independiente.',
  shiftclock:
    'Para quien necesite extrema simplicidad y absoluta privacidad. Control horario robusto, fácil de usar, todo en local y sin requerir red.',
  plantsIA:
    'Proyecto backend-heavy avanzado integrado con modelos de IA para el procesamiento en tiempo real. Alta perfomance.',
}

const videosDeProyecto = {
  dnsDynamic:
    'https://www.youtube.com/embed/AMAIv0ZH1hs?si=fv4n7gWfr52njJV&autoplay=1&mute=1&rel=0&modestbranding=1',
  dustrbike:
    'https://www.youtube.com/embed/g4DmVtIZa5U?si=RdFjHemaB91eXu-I&autoplay=1&mute=1&rel=0&modestbranding=1',
  jtcars:
    'https://www.youtube.com/embed/Hdr3X0rF4Go?si=ice48WyBuCYFvars&autoplay=1&mute=1&rel=0&modestbranding=1',
  lottery:
    'https://www.youtube.com/embed/zFbQqwFu12c?si=tAer0OpaxweSlUyU&autoplay=1&mute=1&rel=0&modestbranding=1',
  smartStudy:
    'https://www.youtube.com/embed/1xIGW-drB44?si=x788Ws5R4N2nbyj5&autoplay=1&mute=1&rel=0&modestbranding=1',
  shiftclock:
    'https://www.youtube.com/embed/jQd_CPiV2vo?si=t9Xa0TldavXOSEmu&autoplay=1&mute=1&rel=0&modestbranding=1',
  plantsIA:
    'https://www.youtube.com/embed/Y8Xxh1kEirM?si=XoUzJc_7niYdtM0Y&autoplay=1&mute=1&rel=0&modestbranding=1',
}

const projects = arrayimages.map((key) => ({
  key,
  label: labelMap[key],
  img: `/imagenes/appsimg2/${key}.webp`,
  video: videosDeProyecto[key],
  desc: descripcionVideo[key],
  techs: techMap[key] || ['Tecnología Cypher']
}))

const activeProject = ref(null)

function selectProject(project) {
  if (activeProject.value?.key === project.key) {
    activeProject.value = null
    return
  }
  activeProject.value = null
  setTimeout(() => {
    activeProject.value = project
  }, 120)
}

defineExpose({ close })
</script>

<style scoped>
/* Placeholder Radar */
.radar-spin {
  animation: radar-sweep 3s linear infinite;
  opacity: 0.8;
  filter: drop-shadow(0 0 15px rgba(0, 255, 255, 0.7));
  margin-bottom: 1.5rem;
}

@keyframes radar-sweep {
  100% { transform: rotate(360deg); }
}

.placeholder-title {
  font-family: 'Cyber', sans-serif;
  font-size: 2rem;
  color: #fff;
  letter-spacing: 3px;
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.4);
  margin: 0 0 0.5rem;
}

.placeholder-subtitle {
  font-family: monospace;
  font-size: 0.9rem;
  color: rgba(200, 200, 255, 0.7);
  line-height: 1.6;
}

/* Side-by-side layout (Grid) */
.project-row {
  display: grid;
  grid-template-columns: minmax(0, 1.3fr) minmax(0, 1fr);
  gap: 2.5rem;
  height: 100%;
  align-items: center;
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
}

.video-col {
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 0;
  width: 100%;
}

/* Custom Iframe Styling */
.project-iframe-wrapper {
  position: relative;
  width: 100%;
  padding: 4px;
  background: rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(0, 255, 255, 0.25);
  border-radius: 8px;
  box-shadow: 0 0 30px rgba(0, 255, 255, 0.1);
  box-sizing: border-box;
  overflow: hidden;
}

.iframe-frame-corner {
  position: absolute;
  width: 15px;
  height: 15px;
  border: 2px solid #00ffff;
  pointer-events: none;
  z-index: 10;
}
.top-left { top: -2px; left: -2px; border-right: none; border-bottom: none; }
.top-right { top: -2px; right: -2px; border-left: none; border-bottom: none; }
.bottom-left { bottom: -2px; left: -2px; border-right: none; border-top: none; }
.bottom-right { bottom: -2px; right: -2px; border-left: none; border-top: none; }

.project-iframe {
  width: 100%;
  aspect-ratio: 16 / 9;
  border: none;
  border-radius: 4px;
  display: block;
}

.desc-col {
  display: flex;
  align-items: stretch;
  min-width: 0;
  width: 100%;
}

.glass-panel {
  background: rgba(0, 20, 40, 0.5);
  border: 1px solid rgba(0, 255, 255, 0.15);
  box-shadow: inset 0 0 20px rgba(0, 255, 255, 0.05), 0 10px 30px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(12px);
  border-radius: 12px;
  padding: 2rem;
}

.desc-panel {
  width: 100%;
  height: auto;
  max-height: 100%;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 255, 255, 0.3) transparent;
  display: flex;
  flex-direction: column;
}

@media (max-width: 600px) {
  .desc-panel {
    padding: 1.25rem;
  }
  .proj-title {
    font-size: 1.8rem;
  }
}

.desc-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.proj-title {
  font-family: 'Cyber', sans-serif;
  font-size: 2.2rem;
  color: #fff;
  margin: 0;
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
  letter-spacing: 2px;
}

.tech-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.cyber-chip {
  font-family: monospace;
  font-size: 0.75rem;
  padding: 0.3rem 0.6rem;
  background: rgba(0, 255, 255, 0.1);
  border: 1px solid rgba(0, 255, 255, 0.3);
  color: #00ffff;
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.proj-desc {
  font-family: monospace;
  font-size: 0.95rem;
  color: rgba(220, 220, 255, 0.85);
  line-height: 1.7;
  flex: 1;
}

.prompt-arrow {
  color: #00ffff;
  font-weight: bold;
  margin-right: 0.4rem;
}

.btn-container {
  margin-top: 1.5rem;
}

.demo-btn {
  width: 100%;
  font-family: 'Cyber', sans-serif;
  letter-spacing: 2px;
  font-size: 0.9rem;
  padding: 0.6rem;
}

/* Mobile: stack vertically */
@media (max-width: 900px) {
  .proj-content-area {
    padding: 1rem !important;
  }
  .project-row {
    grid-template-columns: 1fr;
    overflow-y: auto;
    gap: 1.5rem;
    align-items: start;
  }
}

/* Carousel */
.bottom-panel {
  flex-shrink: 0;
  background: rgba(0, 10, 20, 0.8);
  border-top: 1px solid rgba(0, 255, 255, 0.2);
  padding: 1rem 1.5rem;
  backdrop-filter: blur(10px);
}

.carousel-track {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 255, 255, 0.4) transparent;
}

.carousel-track::-webkit-scrollbar {
  height: 6px;
}
.carousel-track::-webkit-scrollbar-track {
  background: rgba(255,255,255,0.05);
  border-radius: 4px;
}
.carousel-track::-webkit-scrollbar-thumb {
  background: rgba(0, 255, 255, 0.4);
  border-radius: 4px;
}

.carousel-thumb {
  position: relative;
  flex-shrink: 0;
  width: clamp(140px, 15vw, 200px);
  cursor: pointer;
  border-radius: 6px;
  border: 1px solid rgba(0, 255, 255, 0.2);
  overflow: hidden;
  transition: all 0.3s ease;
  background: #000;
}

.thumb-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 255, 255, 0.15);
  z-index: 1;
  transition: background 0.3s;
}

.carousel-thumb:hover {
  border-color: rgba(0, 255, 255, 0.8);
  transform: translateY(-4px);
  box-shadow: 0 5px 15px rgba(0, 255, 255, 0.2);
}

.carousel-thumb:hover .thumb-overlay {
  background: transparent;
}

.carousel-thumb.active {
  border-color: #00ffff;
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.6);
  transform: scale(1.02);
}

.carousel-thumb.active .thumb-overlay {
  background: transparent;
}

.thumb-label {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.85);
  text-align: center;
  padding: 0.4rem 0.5rem;
  font-family: monospace;
  font-size: 0.75rem;
  color: rgba(200, 255, 255, 0.7);
  letter-spacing: 1px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  z-index: 2;
  border-top: 1px solid rgba(0, 255, 255, 0.2);
}

.carousel-thumb.active .thumb-label {
  color: #00ffff;
  background: rgba(0, 40, 60, 0.9);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
