<template>
  <!-- El drawer usa Quasar QDialog controlado con v-model -->
  <!-- Estado local del drawer -->
  <!-- Cuando se muestra -->
  <!-- Cuando se oculta -->
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
    <q-card class="cyber-card metal-drawer">
      <!-- Botón de cerrar -->
      <div>
        <div class="close-btn-container">
          <h4 class="text-h4 margins">Inicio</h4>
          <q-btn flat dense icon="close" color="red" @click="close" />
        </div>
      </div>

      <!-- CONTENIDO PRINCIPAL DEL DRAWER -->
      <q-card-section class="text-center">
        <!-- Hero -->
        <div class="text-h2 q-mb-sm neon-text text-grey-5">Construyendo el futuro digital</div>
        <div class="text-h3 q-mb-md">Fullstack + Agentes IA + IoT</div>

        <!-- CTA -->
        <!--  <q-btn glossy class="btnProyectos" size="md" label="Explorar proyectos" /> -->

        <!-- Mini secciones -->
        <div class="row justify-around q-mt-md section-preview">
          <!-- FULLSTACK -->
          <div class="col-xs-12 col-sm-4 text-center q-mb-md fs-col">
            <q-icon name="code" size="60px" color="cyan" />
            <div class="text-h4 q-mt-xs">Fullstack</div>
            <p class="text-grey-5 text-size">
              Apps web seguras y escalables que impulsan tu negocio. Entrega ágil sin sacrificar
              calidad en el código.
            </p>
          </div>

          <!-- PLANETA -->
          <div v-if="!$q.screen.lt.sm" class="col-xs-12 col-sm-4 text-center q-mb-md planet-col">
            <div ref="planetContainer" class="planet-box"></div>
          </div>

          <!-- IoT -->
          <div class="col-xs-12 col-sm-4 text-center q-mb-md iot-col">
            <q-icon name="sensors" size="60px" color="amber" />
            <div class="text-h4 q-mt-xs">IoT</div>
            <p class="text-grey-5 text-size">
              Prototipos funcionales y telemetría fiable con ESP32/Arduino. Construimos soluciones
              IoT a medida para validar ideas de control físico y domótica.
            </p>
          </div>
        </div>

        <!-- Agentes IA -->
        <div class="text-center">
          <q-icon name="memory" size="60px" color="purple" />
          <div class="text-h4 q-mt-xs">Agentes IA</div>
          <p class="text-grey-5 q-mx-auto text-size" style="width: 50%">
            Nos enfocamos en el potencial de la automatización y el análisis inteligente. Esta área
            está en fase de prueba y aprendizaje.
          </p>
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
import { ref, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { useQuasar } from 'quasar'
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

/*
  💡 Estado local
  - Necesario porque Quasar maneja su propio v-model internamente.
  - localVisible mantiene sincronía entre el padre y el QDialog.
*/

const localVisible = ref(props.modelValue)

/*
  🕹️ Sincronización bidireccional
  - Cuando el padre cambia, el hijo actualiza localVisible.
  - Cuando el hijo cambia (por animaciones o cierre interno),
    se emite el nuevo valor hacia el padre.
*/

watch(
  () => props.modelValue,
  (val) => (console.log('propsEmit', props.modelValue), (localVisible.value = val)),
)
watch(localVisible, (val) => emit('update:modelValue', val))

/*
  🧠 Quasar + Planet Setup
*/
const $q = useQuasar()
const planetContainer = ref(null)
let destroyPlanet = null

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

/*
  🚪 Función de cierre manual
  - Permite cerrar el drawer desde dentro o desde el padre si se expone.
*/
function close() {
  localVisible.value = false
}

/*
  ♻️ Limpieza en desmontaje
*/
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

/*
  🪄 defineExpose
  - Permite al padre acceder a métodos internos si lo necesita.
  - Ej: this.$refs.drawer.close()
*/
defineExpose({ close })
</script>
