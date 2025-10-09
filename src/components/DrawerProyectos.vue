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
    @show="onDialogShow"
    @hide="onDialogHide"
  >
    <q-card class="cyber-card metal-drawer">
      <!-- Botón de cerrar -->
      <div class="close-btn-container">
        <q-btn flat round dense icon="close" color="primary" @click="close" />
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
              <q-img
                v-for="(src, index) in images"
                :key="index"
                :ref="
                  (el) => {
                    thumbRef[index] = el
                  }
                "
                class="cursor-pointer"
                :class="index === indexZoomed ? 'fixed-top-right q-mr-md q-mt-md z-top' : void 0"
                style="border-radius: 3%/5%"
                :style="
                  index === indexZoomed
                    ? 'width: 800px; max-width: clamp(230px, 45vw, 500px); margin-top: 10vh; margin-right: clamp(5vw, 7vw - 2vw, 13vw);'
                    : void 0
                "
                :src="src"
                @click="zoomImage(index)"
                loading="lazy"
              />
            </div>
          </div>

          <!-- Columna derecha: contenido “aaa” -->
          <div class="col grow q-pa-md content-col">
            <div class="content-placeholder">
              <p>
                Lorem ipsum is a dummy or placeholder text commonly used in graphic design,
                publishing, and web development. Its purpose is to permit a page layout to be
                designed, independently of the copy that will subsequently populate it, or to
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
import { ref, watch, nextTick, onMounted, onUnmounted, onBeforeUpdate } from 'vue'
import { useQuasar, morph } from 'quasar'
import { initPlanet } from '../assets/js/planet.js'

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
const $q = useQuasar()
const planetContainer = ref(null)
let destroyPlanet = null
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
    .map((_, i) => '/public/imagenes/appsimg2/' + arrayimages[i] + '.webp'),
)
console.log(images)
function zoomImage(index) {
  const indexZoomedState = indexZoomed.value
  let cancel = void 0

  indexZoomed.value = void 0

  if (index !== void 0 && index !== indexZoomedState) {
    cancel = morph({
      from: thumbRef.value[index].$el,
      onToggle: () => {
        indexZoomed.value = index
      },
      duration: 500,
      onEnd: (end) => {
        if (end === 'from' && indexZoomed.value === index) {
          indexZoomed.value = void 0
        }
      },
    })
  }

  if (indexZoomedState !== void 0 && (cancel === void 0 || cancel() === false)) {
    morph({
      from: thumbRef.value[indexZoomedState].$el,
      waitFor: 100,
      duration: 300,
    })
  }
}

async function onDialogShow() {
  emit('shown') // opcional, por si el padre quiere reaccionar
  if ($q.screen.lt.sm) return // no carga planeta en móviles
  await nextTick()
  if (planetContainer.value && !destroyPlanet) {
    destroyPlanet = initPlanet(planetContainer.value)
  }
}

function onDialogHide() {
  emit('hidden') // opcional
  if (destroyPlanet) {
    destroyPlanet()
    destroyPlanet = null
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
  await nextTick()
  if (planetContainer.value && !destroyPlanet) {
    destroyPlanet = initPlanet(planetContainer.value)
  }
})

onUnmounted(() => {
  destroyPlanet?.()
  destroyPlanet = null
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
<style scoped>
.close-btn-container {
  position: sticky;
  top: 0;
  z-index: 10;
  background: rgba(10, 10, 20, 0.7); /* fondo semitransparente para legibilidad */
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  padding: 0.5rem 1rem;
}
</style>
