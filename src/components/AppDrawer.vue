<!-- src/components/AppDrawer.vue -->
<template>
  <q-dialog
    v-model="localModel"
    :position="position"
    :maximized="maximized"
    :transition-show="transitionShow"
    :transition-hide="transitionHide"
    :class="dialogClass"
    @show="handleShow"
    @hide="handleHide"
  >
    <!-- Usa tu card dentro del drawer -->
    <q-card>
      <!-- Slot opcional para header (botón cerrar, etc.) -->
      <slot name="header">
        <div class="q-pa-md">
          <q-btn flat label="Cerrar" color="primary" @click="close" />
        </div>
      </slot>

      <!-- Contenido principal -->
      <slot />
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'
/* aqui definimos las propiedades del componente ( define props )*/
const props = defineProps({
  modelValue: { type: Boolean, required: true },
  position: { type: String, default: 'right' }, // 'right' | 'left' | 'top' | 'bottom'
  maximized: { type: Boolean, default: true },
  transitionShow: { type: String, default: 'slide-left' },
  transitionHide: { type: String, default: 'slide-right' },
  dialogClass: { type: String, default: '' },
})

const emit = defineEmits(['update:modelValue', 'shown', 'hidden'])

const localModel = ref(props.modelValue)
watch(
  () => props.modelValue,
  (v) => (localModel.value = v),
)
watch(localModel, (v) => emit('update:modelValue', v))

async function handleShow() {
  // Asegura que el DOM teletransportado esté en el body
  await nextTick()
  await new Promise((r) => requestAnimationFrame(r))
  emit('shown')
}
function handleHide() {
  emit('hidden')
}

function close() {
  localModel.value = false
}

// Útil si el padre quiere cerrar imperativamente
defineExpose({ close })
</script>
