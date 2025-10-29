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
                max-height: 70vh;
              "
            >
              <!--  <div v-for="(src, index) in images" :key="index" class="relative-position">

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

                <transition name="fade">
                  <div v-if="showVideo && index === indexZoomed" class="iframe-wrapper">
                    <iframe
                      :key="linkVideo"
                      :src="linkVideo"
                      allow="autoplay; encrypted-media"
                      allowfullscreen
                    ></iframe>

                  </div>
                </transition>
              </div> -->

              <!-- En tu template -->
              <div v-for="(src, index) in images" :key="index" class="relative-position">
                <!-- Miniatura -->
                <q-img
                  v-show="!showVideo || index !== indexZoomed"
                  :ref="(el) => (thumbRef[index] = el)"
                  class="cursor-pointer"
                  :class="index === indexZoomed ? 'fixed-top-right q-mr-md q-mt-md z-top' : void 0"
                  style="border-radius: 3%/5%"
                  :style="index === indexZoomed ? getZoomedImageStyle() : void 0"
                  :src="src"
                  @click="zoomImage(index)"
                  loading="lazy"
                />

                <!-- Video -->
                <transition name="slide-up">
                  <div v-if="showVideo && index === indexZoomed" class="iframe-wrapper">
                    <iframe
                      :key="linkVideo"
                      :src="linkVideo"
                      allow="autoplay; encrypted-media"
                      allowfullscreen
                      class="video-iframe"
                    ></iframe>
                  </div>
                </transition>
              </div>
            </div>
          </div>

          <!-- Columna derecha: contenido “aaa” -->
          <div class="content-placeholder">
            <p style="color: white" class="descripcionProyecto">
              {{ videoNotes }}
            </p>

            <div
              v-if="showLinkControlHorario"
              class="flex flex-center"
              style="max-width: 50vh; margin: 0 auto"
            >
              <q-item
                clickable
                v-ripple
                href="https://controlhorariox.netlify.app/#/"
                target="_blank"
                style="color: white; border: 1px solid white; border-radius: 4px"
                class="q-px-lg q-py-sm"
              >
                <q-item-section avatar>
                  <q-icon name="launch" color="white" />
                </q-item-section>

                <q-item-section> Control Horario (Proyecto Local) </q-item-section>
              </q-item>
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
const showLinkControlHorario = ref(false)
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
  'smartStudy',
]
const images = ref(
  Array(7)
    .fill(null)
    .map((_, i) => '/imagenes/appsimg2/' + arrayimages[i] + '.webp'),
)
const descripcionVideo = {
  dnsDynamic:
    'Proyecto ágil desarrollado para un cliente que necesitaba una solución visualmente atractiva y funcional en muy poco tiempo. La comunicación continua nos ayuda a pulir posibles bugs.',
  dustrbike:
    'Experimento inicial con Quasar Framework para poner a prueba sus límites. Aún en desarrollo y mejora continua, implementar un lazy-loading ayudaría a eliminar esos efectos de carga. En breve añadiré mejoras y optimizaciones.',
  jtcars:
    'Proyecto fullstack para el mundo auto. Fue un comienzo con el django y la verdad descubrí la facilidad que tiene este framework para escalar y para usar. Proyecto completado y desplegado a la espera de cambiar del dominio provisional al definitivo.',
  lottery:
    'Proyecto en desarrollo, la unión de frontend, backend, movimientos, sonidos, lógica es algo que me motiva para seguir utilizando distintas herramientas de lo más variadas. Proyecto en fase de testing.',
  smartStudy:
    'Proyecto divertido para niños que quieran aprender con la ayuda de una IA. Pendiente de cambiar por una IA más inteligente en un futuro próximo.',
  shiftclock:
    'Otro proyecto para quien necesite simpleza, robustez, todo local, sin acceso externo. Enlace para los interesados para un control horario fácil de usar.',
  plantsIA:
    'Proyecto fullstack en estado avanzado. Uno de mis primeros proyectos donde he insertado una IA específica. La IA es en versión base, funciona a las mil maravillas pero aún así a veces me encuentro algún que otro bug.',
}

const videosDeProyecto = {
  // Clave (Key)     : Valor (Value)
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

const showVideo = ref(false)
const linkVideo = ref('')
const videoNotes = ref('')

function getVideoUrlAndData(index) {
  const key = arrayimages[index] // p.ej. 'dnsDynamic'
  return key || '' // fallback vacío si no hay match
}
const getZoomedImageStyle = () => {
  const isMobile = screenWidth.value < 400
  return {
    position: 'fixed',
    top: isMobile ? '28vh' : '33vh',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'clamp(250px, 75vw, 800px)',
    height: 'calc(clamp(250px, 75vw, 800px) * 9/16)', // Misma proporción 16:9
    maxHeight: '78vh',
    zIndex: '2000',
    borderRadius: '12px',
    transition: 'opacity 0.3s ease-in-out, filter 0.3s ease-in-out',
  }
}
async function zoomImage(index) {
  const prev = indexZoomed.value

  // Si hacemos click en la misma imagen que ya está ampliada, cerrar
  if (index === prev) {
    // Cerrar la actual
    showVideo.value = false
    linkVideo.value = ''
    indexZoomed.value = void 0

    if (prev !== void 0) {
      morph({
        from: thumbRef.value[prev].$el,
        duration: 300,
      })
    }
    return
  }

  // 1) Apagar vídeo actual y limpiar
  showVideo.value = false
  linkVideo.value = ''
  await nextTick()

  // 2) Preparar nuevo contenido ANTES de animar
  let key = getVideoUrlAndData(index)
  linkVideo.value = videosDeProyecto[key]
  videoNotes.value = descripcionVideo[key]
  showLinkControlHorario.value = key === 'shiftclock'

  // 3) Resetear el zoom anterior
  indexZoomed.value = void 0

  // 4) Si hay una imagen anterior abierta, cerrarla primero
  if (prev !== void 0) {
    await new Promise((resolve) => {
      morph({
        from: thumbRef.value[prev].$el,
        duration: 300,
        onEnd: resolve,
      })
    })
    await nextTick()
  }

  // 5) Abrir nueva imagen
  if (index !== void 0) {
    morph({
      from: thumbRef.value[index].$el,
      onToggle: () => {
        indexZoomed.value = index
      },
      duration: 500,
      onEnd: async (end) => {
        // Si la animación termina en el estado "from" (cerrado)
        if (end === 'from' && indexZoomed.value === index) {
          showVideo.value = false
          linkVideo.value = ''
          indexZoomed.value = void 0
          await nextTick()
        }
        // Si la animación termina en el estado "to" (abierto)
        else if (end === 'to' && indexZoomed.value === index) {
          // Encender el vídeo solo si hay URL válida después de la animación
          showVideo.value = !!linkVideo.value
        }
      },
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
