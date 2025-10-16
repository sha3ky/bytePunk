<template>
  <!-- El drawer usa Quasar QDialog controlado con v-model -->
  <!-- Estado local del drawer -->
  <!-- Cuando se muestra -->
  <!-- Cuando se oculta -->
  <q-dialog
    v-model="localVisible"
    position="bottom"
    maximized
    transition-show="slide-up"
    transition-hide="slide-down"
    class="animated-drawerBottom"
  >
    <q-card class="cyber-card metal-drawer">
      <!-- Botón de cerrar -->
      <div>
        <div class="close-btn-container">
          <h4 class="text-h4 margins">Proyectos</h4>
          <q-btn flat dense icon="close" color="red" @click="close" />
        </div>
      </div>

      <q-card-section class="text-center">
        <div class="row justify-start">
          <!-- Columna izquierda: miniaturas -->

          <div class="col-auto q-pa-md">
            <div
              class="q-gutter-y-sm"
              style="
                overflow-x: visible;
                overflow-y: auto;
                width: 300px;
                max-width: 20vw;
                max-height: 80vh;
              "
            >
              <div v-for="(src, index) in images" :key="index" class="relative-position">
                <!-- Miniatura -->
                <q-img
                  v-show="!showVideo || index !== indexZoomed"
                  :ref="(el) => (thumbRef[index] = el)"
                  class="cursor-pointer"
                  :class="index === indexZoomed ? 'fixed-top-right q-mr-md q-mt-md z-top' : void 0"
                  style="border-radius: 3%/5%"
                  :style="
                    index === indexZoomed
                      ? `
          position: fixed;
          top: ${screenWidth < 400 ? '28vh' : '33vh'};
          left: 50%;
          transform: translate(-50%, -50%);
          width: clamp(250px, 48vw, 600px);
          max-height: 78vh;
          z-index: 2000;
          border-radius: 12px;
          transition: opacity 0.3s ease-in-out, filter 0.3s ease-in-out;`
                      : void 0
                  "
                  :src="src"
                  @click="zoomImage(index)"
                  loading="lazy"
                />
                <!-- 🎥 Video embebido SOLO dentro de la imagen ampliada -->
                <transition name="fade">
                  <div v-if="showVideo && index === indexZoomed" class="iframe-wrapper">
                    <iframe
                      :key="linkVideo"
                      :src="linkVideo"
                      allow="autoplay; encrypted-media"
                      allowfullscreen
                    ></iframe>
                    <!--  "allow" ="autoplay; encrypted-media"  -->
                  </div>
                </transition>
              </div>
            </div>
          </div>

          <!-- Columna derecha: contenido “aaa” -->
          <div class="col grow q-pa-md content-col">
            <div class="content-placeholder">
              <p style="color: white" class="descripcionProyecto">
                {{ videoNotes }}
              </p>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
/*
  🔧 IMPORTS
  - ref, watch, onMounted, onUnmounted → control del ciclo de vida
  - nextTick → asegura que el DOM esté renderizado antes de manipularlo
  - useQuasar → acceso a info de pantalla (breakpoints)
  - initPlanet → tu efecto 3D personalizado
*/
import { ref, watch, onMounted, onUnmounted, onBeforeUpdate, nextTick } from 'vue'
import { morph } from 'quasar'
const screenWidth = ref(0)
/*
  🧩 Props
  - El padre controla la visibilidad con v-model o :visible.
  - Aquí usamos v-model simplificado (modelValue).
*/
const props = defineProps({
  modelValue: { type: Boolean, required: true },
})
/*
  🔁 Emits
  - update:modelValue → comunicación reactiva con el padre (v-model)
  - shown, hidden → eventos personalizados por si el padre quiere escuchar
*/
const emit = defineEmits(['update:modelValue', 'shown', 'hidden'])
const localVisible = ref(props.modelValue)

/* zoom imagenes */
const thumbRef = ref([])
const indexZoomed = ref(void 0)
const arrayimages = [
  'dnsDynamic',
  'dustrbike',
  'jtcars',
  'lottery',
  'plantsIA',
  'shiftclock',
  'Aiteacher',
]
const images = ref(
  Array(7)
    .fill(null)
    .map((_, i) => '/imagenes/appsimg2/' + arrayimages[i] + '.webp'),
)
const descripcionVideo = {
  dnsDynamic:
    'Proyecto ágil desarrollado para un cliente que necesitaba una solución visualmente atractiva y funcional en muy poco tiempo.  Actualmente sigue en fase de iteración y mejoras.',
  dustrbike:
    'Experimento inicial con Quasar Framework para poner a prueba sus límites en rendimiento y escalabilidad. Este proyecto marcó el inicio de una serie de optimizaciones y aprendizajes que hoy aplico en desarrollos más avanzados.',
  jtcars:
    'Proyecto fullstack para el mundo auto. Fue un comienzo con el django y la verdad descubri la facilidad que tiene este framework para escalar y para usar.',
}
const videosDeProyecto = {
  // Clave (Key)     : Valor (Value)
  dnsDynamic:
    'https://www.youtube.com/embed/AMAIv0ZH1hs?si=fv4n7gWfr52njJV&autoplay=1&mute=1&rel=0&modestbranding=1',
  dustrbike:
    'https://www.youtube.com/embed/g4DmVtIZa5U?si=RdFjHemaB91eXu-I&autoplay=1&mute=1&rel=0&modestbranding=1',
  jtcars:
    'https://www.youtube.com/embed/GlIQvOBZtTA?si=LuyC6uvNDd6w3QzF&autoplay=1&mute=1&rel=0&modestbranding=1',
}

const showVideo = ref(false)
const linkVideo = ref('')
const videoNotes = ref('')

function getVideoUrlAndData(index) {
  const key = arrayimages[index] // p.ej. 'dnsDynamic'
  return key || '' // fallback vacío si no hay match
}

async function zoomImage(index) {
  const prev = indexZoomed.value
  let cancel

  // 1) apaga vídeo y limpia src para forzar desmontaje
  showVideo.value = false
  linkVideo.value = ''
  await nextTick()

  // 2) prepara nuevo src ANTES de animar

  let key = getVideoUrlAndData(index)
  linkVideo.value = videosDeProyecto[key]
  videoNotes.value = descripcionVideo[key]
  // 3) resetea el zoom y anima
  indexZoomed.value = void 0

  if (index !== void 0 && index !== prev) {
    cancel = morph({
      from: thumbRef.value[index].$el,
      onToggle: () => {
        indexZoomed.value = index
        // 4) enciende el vídeo solo si hay URL válida
        showVideo.value = !!linkVideo.value
      },
      duration: 500,
      onEnd: async (end) => {
        // si se cierra la animación hacia atrás
        if (end === 'from' && indexZoomed.value === index) {
          indexZoomed.value = void 0
          showVideo.value = false
          linkVideo.value = ''
          await nextTick()
        }
      },
    })
  }

  // 5) animación de cierre si había uno abierto
  if (prev !== void 0 && (cancel === void 0 || cancel() === false)) {
    morph({
      from: thumbRef.value[prev].$el,
      waitFor: 100,
      duration: 300,
    })
  }
}

/*🚪 Función de cierre manual
  - Permite cerrar el drawer desde dentro o desde el padre si se expone.*/

function close() {
  localVisible.value = false
}

watch(
  () => props.modelValue,
  (val) => (console.log('propsEmit', props.modelValue), (localVisible.value = val)),
)

watch(localVisible, (val) => emit('update:modelValue', val))

/*♻️ Limpieza en desmontaje*/

onMounted(async () => {
  screenWidth.value = window.innerWidth
  window.addEventListener('resize', () => {
    screenWidth.value = window.innerWidth
  })
})

onUnmounted(() => {
  window.removeEventListener('resize', () => {
    screenWidth.value = window.innerWidth
  })
})
onBeforeUpdate(() => {
  thumbRef.value = []
})

/*
  🪄 defineExpose
  - Permite al padre acceder a métodos internos si lo necesita.
  - Ej: this.$refs.drawer.close()
*/
defineExpose({ close })
</script>
