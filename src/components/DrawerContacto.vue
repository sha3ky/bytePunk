<template>
  <q-dialog
    v-model="localVisible"
    maximized
    transition-show="slide-down"
    transition-hide="slide-up"
    @hide="onHide"
  >
    <q-card class="cyber-card metal-drawer" style="display: flex; flex-direction: column; height: 100dvh;">
      <!-- Header -->
      <div class="close-btn-container">
        <h4 class="text-h4 margins" data-text="Terminal de Contacto">Terminal de Contacto</h4>
        <q-btn flat dense icon="close" color="cyan" @click="close" />
      </div>

      <!-- Scrollable body -->
      <div class="contact-scroll-area" style="flex: 1; overflow-y: auto;">
        <q-card-section class="flex flex-center" style="min-height: 80vh">
          <div
            class="contact-form-wrapper glass-panel"
            style="width: 100%; max-width: 500px; padding: 2rem"
          >
            <p class="text-subtitle1 text-center" style="color: #00fff9; margin-bottom: 2rem">
              &gt;&gt; INICIANDO PROTOCOLO DE COMUNICACIÓN... &lt;&lt;
            </p>

            <q-input
              v-model="form.name"
              dark
              color="cyan"
              label="Identificador (Nombre)"
              label-color="cyan"
              placeholder="Introduce tu nombre"
              class="q-mb-md"
              outlined
            >
              <template v-slot:prepend>
                <q-icon name="person" color="cyan" />
              </template>
            </q-input>

            <q-input
              v-model="form.email"
              dark
              color="cyan"
              label="Enlace de Retorno (Email)"
              label-color="cyan"
              placeholder="tu@email.com"
              type="email"
              class="q-mb-md"
              outlined
            >
              <template v-slot:prepend>
                <q-icon name="email" color="cyan" />
              </template>
            </q-input>

            <q-input
              v-model="form.message"
              dark
              color="cyan"
              label="Transmisión (Mensaje)"
              label-color="cyan"
              placeholder="Escribe tu mensaje aquí..."
              type="textarea"
              class="q-mb-xl"
              outlined
            >
              <template v-slot:prepend>
                <q-icon name="chat" color="cyan" />
              </template>
            </q-input>

            <div class="text-center">
              <q-btn
                outline
                color="cyan"
                label="ENVIAR DATOS"
                class="full-width"
                style="border-radius: 4px; border-width: 2px; font-weight: bold; letter-spacing: 2px"
                @click="sendMessage"
              />
            </div>
          </div>
        </q-card-section>
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'

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
  emit('update:modelValue', false)
}

const form = reactive({
  name: '',
  email: '',
  message: '',
})

function sendMessage() {
  if (!form.name || !form.email || !form.message) {
    alert('>> ERROR: FALTAN DATOS EN LA TRANSMISIÓN <<')
    return
  }

  const destination = 'sha3ky@yahoo.es' // Cambia esto por tu correo real
  const subject = `Contacto Web BytePunk: ${form.name}`
  const body = `Nombre: ${form.name}\nEmail: ${form.email}\n\nMensaje:\n${form.message}`

  // Abrir cliente de correo del usuario
  window.location.href = `mailto:${destination}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

  alert('>> ABRIENDO CLIENTE DE CORREO... <<')

  // Limpiar formulario tras un pequeño delay
  setTimeout(() => {
    form.name = ''
    form.email = ''
    form.message = ''
  }, 1000)
}

defineExpose({ close })
</script>

<style scoped>
.q-input:hover {
  filter: drop-shadow(0 0 8px rgba(0, 255, 255, 0.4));
}
</style>
