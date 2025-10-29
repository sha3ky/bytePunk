<template>
  <!-- El drawer usa Quasar QDialog controlado con v-model -->
  <!-- Estado local del drawer -->
  <!-- Cuando se muestra -->
  <!-- Cuando se oculta -->
  <q-dialog
    v-model="localVisible"
    position="left"
    maximized
    transition-show="slide-right"
    transition-hide="slide-left"
    class="animated-drawerLeft"
    @show="onDialogShow"
    @hide="onDialogHide"
  >
    <q-card class="cyber-card metal-drawer">
      <!-- Botón de cerrar -->
      <div>
        <div class="close-btn-container">
          <q-btn flat dense icon="close" color="red" @click="close" />
          <h4 class="text-h4 margins">Sobre mi</h4>
        </div>
      </div>

      <!-- CONTENIDO PRINCIPAL DEL DRAWER -->
      <q-card-section class="text-center">
        <!-- Contenedor simple lado a lado -->
        <div class="side-by-side-container">
          <!-- Robot pequeño -->
          <div>
            <DotLottieVue
              v-if="showLottie"
              autoplay
              loop
              ref="playerRef"
              src="/animation/RobotSaludando.lottie"
              class="small-robot"
              style="width: 250px"
            />
          </div>
          <!-- Preguntas -->

          <div class="questions-side">
            <h3 class="text-h4 q-mb-md text-cyan">Preguntas Frecuentes</h3>

            <q-expansion-item
              class="question-expansion q-mb-sm"
              expand-separator
              default-closed
              icon="person"
              label="¿Quién soy?"
              header-class="text-h6 text-white"
              expand-icon-class="text-cyan"
              group="sobremi-group"
            >
              <q-card class="question-card" flat>
                <q-card-section class="q-pa-md">
                  <div class="about-content">
                    <!-- Introducción Personal -->
                    <div class="about-section">
                      <h4 class="text-cyan q-mb-md">👋 Mi Historia</h4>
                      <p class="text-grey-4">
                        Sha3ky, un apasionado desarrollador full-stack con 5 años de experiencia
                        transformando ideas en soluciones digitales robustas y escalables.
                      </p>
                    </div>

                    <!-- Formación Académica -->
                    <div class="about-section q-mt-lg">
                      <h4 class="text-cyan q-mb-md">🎓 Formación & Estudios</h4>
                      <div class="education-list">
                        <div class="education-item q-mb-sm text-grey-4">
                          <strong
                            >CERTIFICAT PROFESSIONALITAT: [IFCD0210] Desenvolupament d'aplicacions
                            amb tecnologia web</strong
                          >
                          <div class="text-grey-4">MECABIT • 31/07/2020</div>
                        </div>
                        <div class="education-item q-mb-sm text-grey-4">
                          <strong>Técnico básico de ciberseguridad</strong>
                          <div class="text-grey-4">INCIBE • 14/08/2023</div>
                        </div>
                      </div>
                    </div>

                    <!-- Experiencia Profesional -->
                    <div class="about-section q-mt-lg">
                      <h4 class="text-cyan q-mb-md">💼 Trayectoria Profesional</h4>
                      <div class="experience-list">
                        <div class="experience-item q-mb-md">
                          <div class="flex justify-between items-center text-grey-4">
                            <strong>Fullstack</strong>
                            <span class="text-cyan">2025 - 2050</span>
                          </div>
                          <div class="text-grey-4">CyberPunk</div>
                        </div>

                        <div class="experience-item q-mb-md text-grey-4">
                          <div class="flex justify-between items-center">
                            <strong>Frontend</strong>
                            <span class="text-cyan">2021 - 2023</span>
                          </div>
                          <div class="text-grey-4">Fiberpachs</div>
                        </div>
                      </div>
                    </div>

                    <!-- Filosofía de Trabajo -->
                    <div class="about-section q-mt-lg">
                      <h4 class="text-cyan q-mb-md">🚀 Mi Filosofía</h4>
                      <div class="philosophy-grid">
                        <div class="philosophy-item">
                          <strong>🎯 Orientado a Challenges</strong>
                          <p class="text-grey-4 q-mt-xs">
                            Me motiva enfrentar problemas y encontrar soluciones innovadoras que
                            cumplan y superen las expectativas.
                          </p>
                        </div>

                        <div class="philosophy-item">
                          <strong>✅ Compromiso </strong>
                          <p class="text-grey-4 q-mt-xs">
                            Me entrego al 100% para garantizar que cada proyecto se complete con
                            excelencia y dentro de los plazos establecidos.
                          </p>
                        </div>

                        <div class="philosophy-item">
                          <strong>🤝 Enfoque en el Cliente</strong>
                          <p class="text-grey-4 q-mt-xs">
                            Priorizo la comunicación clara y la comprensión profunda de las
                            necesidades del cliente para entregar exactamente lo que necesitan.
                          </p>
                        </div>

                        <div class="philosophy-item">
                          <strong>💡 Innovación Constante</strong>
                          <p class="text-grey-4 q-mt-xs">
                            Siempre busco nuevas tecnologías y metodologías para mejorar procesos y
                            entregar productos de vanguardia.
                          </p>
                        </div>
                      </div>
                    </div>

                    <!-- Metas Personales -->
                    <div class="about-section q-mt-lg">
                      <h4 class="text-cyan q-mb-md">🌟 Lo Que Me Motiva</h4>
                      <p class="text-grey-4">
                        Pasión por la tecnología, centrado en privacidad y aportando soluciones que
                        impacten positivamente en la vida de las personas y buscando constantemente
                        proyectos que representen un desafío técnico.
                      </p>
                    </div>

                    <!-- Fuera del Trabajo -->
                    <div class="about-section q-mt-lg">
                      <h4 class="text-cyan q-mb-md">🎮 Más Allá del Código</h4>
                      <p class="text-grey-4">
                        En el tatami lo doy todo, cumplo a rajatabla lo de "Mente sana en corpore
                        sano". Naturaleza, deporte y buena onda es mi motto.
                      </p>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </q-expansion-item>
            <q-expansion-item
              class="question-expansion q-mb-sm"
              expand-separator
              default-closed
              icon="code"
              label="¿Qué tecnologías y metodologías usas?"
              header-class="text-h6 text-white"
              expand-icon-class="text-cyan"
              group="sobremi-group"
            >
              <q-card class="question-card" flat>
                <q-card-section class="q-pa-md">
                  <div class="tech-stack">
                    <div class="stack-section">
                      <strong class="text-cyan">🎨 Frontend:</strong>
                      <ul class="q-mt-xs">
                        <li><strong>Vue.js 3</strong> - Composition API, Pinia, Vue Router</li>
                        <li><strong>Quasar Framework</strong> - Componentes UI y build tools</li>
                        <li><strong>CSS3/Sass</strong> - Animaciones y diseños responsivos</li>
                      </ul>
                    </div>

                    <div class="stack-section q-mt-md">
                      <strong class="text-cyan">⚙️ Backend:</strong>
                      <ul class="q-mt-xs">
                        <li><strong>Django</strong> - Django REST Framework para APIs</li>
                        <li><strong>PostgreSQL/MySQL</strong> - Bases de datos relacionales</li>
                        <li><strong>Redis</strong> - Caché y sesiones</li>
                      </ul>
                    </div>

                    <div class="stack-section q-mt-md">
                      <strong class="text-cyan">🚀 DevOps & Tools:</strong>
                      <ul class="q-mt-xs">
                        <li><strong>Git/GitHub</strong> - Control de versiones y CI/CD</li>
                        <li><strong>Vite</strong> - Build tool ultra rápido</li>
                      </ul>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </q-expansion-item>

            <q-expansion-item
              class="question-expansion q-mb-sm"
              expand-separator
              default-closed
              icon="schedule"
              label="¿Cuál es el proceso y timeline típico?"
              header-class="text-h6 text-white"
              expand-icon-class="text-cyan"
              group="sobremi-group"
            >
              <q-card class="question-card" flat>
                <q-card-section class="q-pa-md">
                  <div class="timeline-process">
                    <div class="process-phase">
                      <strong class="text-cyan"
                        >📋 Fase 1: Análisis & Planificación (1-3 días)</strong
                      >
                      <ul class="q-mt-xs">
                        <li>Requisitos y especificaciones técnicas</li>
                        <li>Diseño de arquitectura y base de datos</li>
                        <li>Plan de desarrollo y milestones</li>
                      </ul>
                    </div>

                    <div class="process-phase q-mt-md">
                      <strong class="text-cyan">🎨 Fase 2: Diseño & Prototipo (1 semanas)</strong>
                      <ul class="q-mt-xs">
                        <li>Prototipo interactivo y UI/UX</li>
                        <li>Design system y componentes</li>
                        <li>Validación con el cliente</li>
                      </ul>
                    </div>

                    <div class="process-phase q-mt-md">
                      <strong class="text-cyan">⚡ Fase 3: Desarrollo (2-3 semanas)</strong>
                      <ul class="q-mt-xs">
                        <li><strong>MVP:</strong> 2-3 semanas (funcionalidades core)</li>
                        <li><strong>Proyecto Medio:</strong> 4-6 semanas (features avanzados)</li>
                        <li>
                          <strong>Proyecto Complejo:</strong> 8+ semanas (sistemas escalables)
                        </li>
                      </ul>
                    </div>

                    <div class="process-phase q-mt-md">
                      <strong class="text-cyan">🚀 Fase 4: Testing & Lanzamiento (3-7 días)</strong>
                      <ul class="q-mt-xs">
                        <li>Testing integral y corrección de bugs</li>
                        <li>Despliegue en staging y producción</li>
                        <li>Documentación y capacitación</li>
                      </ul>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </q-expansion-item>

            <q-expansion-item
              class="question-expansion q-mb-sm"
              expand-separator
              default-closed
              icon="build"
              label="¿Qué incluye el soporte post-lanzamiento?"
              header-class="text-h6 text-white"
              expand-icon-class="text-cyan"
              group="sobremi-group"
            >
              <q-card class="question-card" flat>
                <q-card-section class="q-pa-md">
                  <div class="support-details">
                    <div class="support-tier">
                      <strong class="text-cyan">🛡️ Soporte Básico (30 días incluido)</strong>
                      <ul class="q-mt-xs">
                        <li><strong>Corrección de bugs críticos</strong> en un máximo de 48h</li>
                        <li><strong>Soporte técnico</strong> para issues de despliegue</li>
                        <li><strong>Documentación técnica</strong> completa del proyecto</li>
                      </ul>
                    </div>

                    <div class="support-tier q-mt-md">
                      <strong class="text-cyan"
                        >🚀 Soporte Extendido (Contratación adicional)</strong
                      >
                      <ul class="q-mt-xs">
                        <li><strong>Mantenimiento mensual</strong> con updates de seguridad</li>
                        <li><strong>Mejoras evolutivas</strong> y nuevas features</li>
                        <li>
                          <strong>Monitoreo 24/7</strong> y alertas de performance en el futuro
                        </li>
                        <li><strong>Backups automáticos</strong> y recovery plans en el futuro</li>
                      </ul>
                    </div>

                    <div class="support-tier q-mt-md">
                      <strong class="text-cyan">💡 Servicios Adicionales</strong>
                      <ul class="q-mt-xs">
                        <li><strong>Auditorías de código</strong> y best practices</li>
                        <li><strong>Optimización de performance</strong> y SEO</li>
                      </ul>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </q-expansion-item>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, watch, nextTick, onMounted, onUnmounted } from 'vue'

/* import { useQuasar } from 'quasar' */
/* import { initPlanet } from '../assets/js/planet.js' */

import { DotLottieVue } from '@lottiefiles/dotlottie-vue'
const playerRef = ref(null)
/* const $q = useQuasar() */
const showLottie = ref(false)
let destroyPlanet = null
const props = defineProps({
  modelValue: { type: Boolean, required: true },
})
const emit = defineEmits(['update:modelValue', 'shown', 'hidden'])
const localVisible = ref(props.modelValue)

watch(
  () => props.modelValue,
  (val) => (console.log('propsEmit', props.modelValue), (localVisible.value = val)),
)
watch(localVisible, (val) => emit('update:modelValue', val))

async function onDialogShow() {
  emit('shown') // opcional, por si el padre quiere reaccionar
}

function onDialogHide() {
  emit('hidden') // opcional
  if (destroyPlanet) {
    destroyPlanet()
    destroyPlanet = null
  }
}

function close() {
  localVisible.value = false
}

onMounted(async () => {
  await nextTick()
  setTimeout(() => {
    showLottie.value = true
  }, 1000)
})

onUnmounted(() => {})

/*
  🪄 defineExpose
  - Permite al padre acceder a métodos internos si lo necesita.
  - Ej: this.$refs.drawer.close()
*/
defineExpose({ close })
</script>
<style scoped></style>

🎯
