<template>
  <q-dialog
    v-model="localVisible"
    position="right"
    maximized
    transition-show="slide-left"
    transition-hide="slide-right"
    class="animated-drawerRight"
    @show="onDialogShow"
    @hide="onDialogHide"
  >
    <q-card class="cyber-card metal-drawer inicio-card">
      <!-- Header -->
      <div class="close-btn-container" style="border-bottom: 1px solid rgba(0, 255, 255, 0.2)">
        <h4 class="text-h4 margins text" data-text="Inicio">Inicio</h4>
        <q-btn flat dense icon="close" color="cyan" @click="close" />
      </div>

      <!-- Scrollable body -->
      <div class="inicio-body">
        <!-- HERO BANNER -->
        <div class="hero-banner glass-panel">
          <div class="hero-info">
            <div class="availability-badge">
              <span class="dot"></span> Disponible para proyectos
            </div>
            <h2 class="dev-name">Sha3ky</h2>
            <p class="dev-title">Fullstack Developer · IoT · AI Agents</p>
            <p class="dev-tagline">
              Construyo experiencias digitales de alto impacto — desde la base de datos hasta la
              interfaz.
            </p>
            <div class="cta-row">
              <q-btn
                outline
                color="cyan"
                label="Ver Proyectos"
                icon="work"
                class="cta-btn"
                @click="emit('open-projects')"
              />
            </div>
          </div>

          <!-- Planet 3D (solo desktop) -->
          <div v-if="!$q.screen.lt.sm" ref="planetContainer" class="planet-box"></div>
        </div>

        <!-- STATS ROW -->
        <div class="stats-row">
          <div class="stat-card glass-panel">
            <span class="stat-num">5+</span>
            <span class="stat-label">Años de experiencia</span>
          </div>
          <div class="stat-card glass-panel">
            <span class="stat-num">7+</span>
            <span class="stat-label">Proyectos entregados</span>
          </div>
          <div class="stat-card glass-panel">
            <span class="stat-num">3</span>
            <span class="stat-label">Stacks dominados</span>
          </div>
        </div>

        <!-- SKILLS -->
        <div class="section-block glass-panel">
          <h3 class="section-title"><q-icon name="code" color="cyan" /> Skills</h3>
          <div class="skills-grid">
            <div v-for="skill in skills" :key="skill.name" class="skill-item">
              <div class="skill-header">
                <span class="skill-name">{{ skill.name }}</span>
                <span class="skill-pct">{{ skill.pct }}%</span>
              </div>
              <div class="skill-bar-bg">
                <div
                  class="skill-bar-fill"
                  :style="{ width: skill.pct + '%', background: skill.color }"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <!-- TECH STACK CHIPS -->
        <div class="section-block glass-panel">
          <h3 class="section-title"><q-icon name="memory" color="cyan" /> Stack Tecnológico</h3>
          <div class="chips-wrap">
            <q-badge
              v-for="tech in techStack"
              :key="tech.name"
              :style="{ background: tech.bg, color: tech.fg, border: '1px solid ' + tech.border }"
              class="tech-chip"
            >
              {{ tech.name }}
            </q-badge>
          </div>
        </div>

        <!-- SERVICIOS -->
        <div class="services-row">
          <div v-for="svc in services" :key="svc.title" class="service-card glass-panel">
            <q-icon :name="svc.icon" :color="svc.color" size="2.2rem" />
            <div class="svc-title">{{ svc.title }}</div>
            <p class="svc-desc">{{ svc.desc }}</p>
          </div>
        </div>
      </div>
      <!-- end inicio-body -->
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { useQuasar } from 'quasar'
import { initPlanet } from '../assets/js/planet.js'

const props = defineProps({ modelValue: { type: Boolean, required: true } })
const emit = defineEmits(['update:modelValue', 'shown', 'hidden', 'open-projects'])

const localVisible = ref(props.modelValue)
watch(
  () => props.modelValue,
  (val) => {
    localVisible.value = val
  },
)
watch(localVisible, (val) => emit('update:modelValue', val))

const $q = useQuasar()
const planetContainer = ref(null)
let destroyPlanet = null

async function onDialogShow() {
  emit('shown')
  if ($q.screen.lt.sm) return
  await nextTick()
  if (planetContainer.value && !destroyPlanet) {
    destroyPlanet = initPlanet(planetContainer.value)
  }
}

function onDialogHide() {
  emit('hidden')
  destroyPlanet?.()
  destroyPlanet = null
}

function close() {
  localVisible.value = false
}

onMounted(async () => {
  await nextTick()
  if (planetContainer.value && !destroyPlanet && !$q.screen.lt.sm) {
    destroyPlanet = initPlanet(planetContainer.value)
  }
})
onUnmounted(() => {
  destroyPlanet?.()
  destroyPlanet = null
})

defineExpose({ close })

/* ---- Data ---- */
const skills = [
  { name: 'Vue.js / Quasar', pct: 90, color: 'linear-gradient(90deg, #41b883, #00ffff)' },
  { name: 'Django / Python', pct: 78, color: 'linear-gradient(90deg, #0d6efd, #00bcd4)' },
  { name: 'IoT / ESP32', pct: 70, color: 'linear-gradient(90deg, #ff9800, #ffeb3b)' },
  { name: 'AI Agents', pct: 60, color: 'linear-gradient(90deg, #9c27b0, #e040fb)' },
  { name: 'CSS / SCSS', pct: 85, color: 'linear-gradient(90deg, #e91e63, #ff4081)' },
]

const techStack = [
  { name: 'Vue 3', bg: 'rgba(65,184,131,0.15)', fg: '#41b883', border: 'rgba(65,184,131,0.4)' },
  { name: 'Quasar', bg: 'rgba(0,189,215,0.15)', fg: '#00bdd7', border: 'rgba(0,189,215,0.4)' },
  { name: 'Django', bg: 'rgba(9,121,75,0.15)', fg: '#2bbc8a', border: 'rgba(9,121,75,0.4)' },
  {
    name: 'PostgreSQL',
    bg: 'rgba(51,103,145,0.15)',
    fg: '#5b9bd5',
    border: 'rgba(51,103,145,0.4)',
  },
  { name: 'Python', bg: 'rgba(55,118,171,0.15)', fg: '#4eb3f7', border: 'rgba(55,118,171,0.4)' },
  { name: 'ESP32', bg: 'rgba(255,152,0,0.15)', fg: '#ffa726', border: 'rgba(255,152,0,0.4)' },
  { name: 'Three.js', bg: 'rgba(0,0,0,0.3)', fg: '#ffffff', border: 'rgba(255,255,255,0.2)' },
  { name: 'Pinia', bg: 'rgba(255,210,0,0.15)', fg: '#ffd200', border: 'rgba(255,210,0,0.4)' },
  {
    name: 'Git / GitHub',
    bg: 'rgba(240,80,50,0.15)',
    fg: '#f05032',
    border: 'rgba(240,80,50,0.4)',
  },
  { name: 'Vite', bg: 'rgba(100,108,255,0.15)', fg: '#747bff', border: 'rgba(100,108,255,0.4)' },
]

const services = [
  {
    icon: 'code',
    color: 'cyan',
    title: 'Fullstack Web',
    desc: 'Apps web seguras y escalables con Vue + Django. Entrega ágil sin sacrificar calidad.',
  },
  {
    icon: 'sensors',
    color: 'amber',
    title: 'IoT & Hardware',
    desc: 'Prototipos con ESP32/Arduino. Telemetría, domótica y dashboards en tiempo real.',
  },
  {
    icon: 'psychology',
    color: 'purple',
    title: 'Agentes IA',
    desc: 'Automatización inteligente, chatbots y análisis predictivo integrados en tus apps.',
  },
]
</script>

<style scoped>
.inicio-card {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.inicio-body {
  flex: 1;
  overflow-y: auto;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 255, 255, 0.3) transparent;
}

@media (max-width: 600px) {
  .inicio-body {
    padding: 1rem;
    gap: 1rem;
  }
}

/* ---- Hero banner ---- */
.hero-banner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.5rem;
}

.hero-info {
  flex: 1;
}

.availability-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(0, 255, 100, 0.1);
  border: 1px solid rgba(0, 255, 100, 0.4);
  border-radius: 20px;
  padding: 0.25rem 0.85rem;
  font-family: monospace;
  font-size: 0.78rem;
  color: #00ff64;
  margin-bottom: 0.75rem;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #00ff64;
  animation: pulse-dot 1.5s infinite;
}

@keyframes pulse-dot {
  0%,
  100% {
    box-shadow: 0 0 0 0 rgba(0, 255, 100, 0.5);
  }
  50% {
    box-shadow: 0 0 0 6px rgba(0, 255, 100, 0);
  }
}

.dev-name {
  font-family: Cyber;
  font-size: clamp(1.8rem, 4vw, 3rem);
  color: #fff;
  margin: 0 0 0.25rem;
  text-shadow: 0 0 16px rgba(0, 255, 255, 0.5);
  letter-spacing: 2px;
}

.dev-title {
  color: #00ffff;
  font-family: monospace;
  font-size: 0.95rem;
  letter-spacing: 1.5px;
  margin: 0 0 0.75rem;
}

.dev-tagline {
  color: rgba(210, 210, 255, 0.75);
  font-size: 0.88rem;
  line-height: 1.6;
  max-width: 380px;
  margin-bottom: 1.25rem;
}

.cta-row {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.cta-btn {
  font-family: monospace;
  letter-spacing: 1px;
  font-size: 0.82rem;
}

.planet-box {
  width: 180px;
  height: 180px;
  flex-shrink: 0;
}

/* ---- Stats ---- */
.stats-row {
  display: flex;
  gap: 0.75rem;
}

.stat-card {
  flex: 1;
  text-align: center;
  padding: 1rem 0.5rem;
  border-radius: 12px;
}

.stat-num {
  display: block;
  font-family: Cyber;
  font-size: clamp(1.6rem, 3vw, 2.4rem);
  color: #00ffff;
  text-shadow: 0 0 12px rgba(0, 255, 255, 0.5);
}

.stat-label {
  display: block;
  font-family: monospace;
  font-size: 0.72rem;
  color: rgba(200, 200, 255, 0.6);
  letter-spacing: 1px;
  margin-top: 0.25rem;
}

/* ---- Section headings ---- */
.section-block {
  padding: 1.25rem;
  border-radius: 12px;
}

.section-title {
  font-family: Cyber;
  font-size: 1rem;
  color: rgba(0, 255, 255, 0.85);
  letter-spacing: 2px;
  text-transform: uppercase;
  margin: 0 0 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* ---- Skills ---- */
.skills-grid {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.skill-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.3rem;
}

.skill-name {
  font-family: monospace;
  font-size: 0.82rem;
  color: rgba(200, 200, 255, 0.85);
}

.skill-pct {
  font-family: monospace;
  font-size: 0.78rem;
  color: rgba(0, 255, 255, 0.6);
}

.skill-bar-bg {
  height: 5px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 4px;
  overflow: hidden;
}

.skill-bar-fill {
  height: 100%;
  border-radius: 4px;
  box-shadow: 0 0 8px rgba(0, 255, 255, 0.3);
  transition: width 0.8s ease;
}

/* ---- Tech chips ---- */
.chips-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-chip {
  font-family: monospace;
  font-size: 0.78rem;
  padding: 0.35rem 0.75rem;
  border-radius: 20px;
  letter-spacing: 0.5px;
}

/* ---- Services ---- */
.services-row {
  display: flex;
  gap: 0.75rem;
}

.service-card {
  flex: 1;
  padding: 1.25rem;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.5rem;
  transition: box-shadow 0.3s;
}

.service-card:hover {
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.2);
}

.svc-title {
  font-family: Cyber;
  font-size: 0.9rem;
  color: #fff;
  letter-spacing: 1px;
}

.svc-desc {
  font-size: 0.78rem;
  color: rgba(200, 200, 255, 0.65);
  line-height: 1.5;
  margin: 0;
}

/* ---- Mobile ---- */
@media (max-width: 600px) {
  .hero-banner {
    flex-direction: column;
    align-items: flex-start;
    padding: 1.2rem;
  }
  .dev-name {
    font-size: clamp(1.8rem, 8vw, 2.5rem);
  }
  .dev-tagline {
    font-size: 0.82rem;
  }
  .cta-row {
    justify-content: center;
    width: 100%;
  }
  .cta-btn {
    width: 100%;
  }

  .stats-row {
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  .stat-card {
    flex: 1 1 calc(50% - 0.5rem);
    padding: 0.8rem 0.2rem;
  }
  .stat-card:nth-child(3) {
    flex: 1 1 100%; /* El tercero ocupa toda la fila en móvil para no desbalancear */
  }

  .stat-num {
    font-size: 1.6rem;
  }
  .stat-label {
    font-size: 0.70rem;
  }

  .services-row {
    flex-direction: column;
  }
  
  .section-block, .service-card {
    padding: 1rem;
  }
}
</style>
