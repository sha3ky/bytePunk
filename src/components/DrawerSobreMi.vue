<template>
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
    <q-card class="cyber-card metal-drawer sobremi-card">
      <!-- Header -->
      <div class="close-btn-container" style="border-bottom: 1px solid rgba(0, 255, 255, 0.2); flex-shrink: 0; display: flex; justify-content: space-between; align-items: center; padding: 1.25rem;">
        <h4 class="text-h4 margins" data-text="Sobre Mí">Sobre Mí</h4>
        <q-btn flat dense icon="close" color="cyan" @click="close" />
      </div>

      <!-- Scrollable body -->
      <div class="sobremi-body">
        
        <div class="profile-layout">
          
          <!-- Avatar / Side Info -->
          <div class="profile-sidebar">
            <DotLottieVue
              v-if="showLottie"
              autoplay
              loop
              ref="playerRef"
              src="/animation/RobotSaludando.lottie"
              class="robot-lottie"
            />
            <div class="sys-badge">
              <span class="badge-label">PROFILE ID:</span>
              <span class="badge-value text-cyan">SHA3KY_SYSADMIN</span>
            </div>
            <div class="sys-badge">
              <span class="badge-label">CLASS:</span>
              <span class="badge-value">FULLSTACK ARCHITECT</span>
            </div>
          </div>

          <!-- Main Terminal / Story -->
          <div class="profile-content">
            <div class="terminal-ui">
              <div class="term-header">
                <div class="term-dots">
                  <span></span><span></span><span></span>
                </div>
                <div class="term-title">sha3ky@bytepunk: ~</div>
              </div>
              
              <div class="term-body">
                <!-- Comando 1 -->
                <div class="cmd-line">
                  <span class="prompt">sha3ky@bytepunk:~$</span> cat about.txt
                </div>
                <div class="cmd-output">
                  Llevo más de 5 años transformando ideas en código. No me limito a "crear webs", arquitecto ecosistemas digitales completos. Si un problema parece difícil, ahí es donde entro yo.
                </div>

                <!-- Comando 2 -->
                <div class="cmd-line">
                  <span class="prompt">sha3ky@bytepunk:~$</span> ./scan_capabilities.sh --projects
                </div>
                <div class="cmd-output">
                  <ul class="tree-list">
                    <li>
                      <span class="node text-cyan">[JT Cars]</span> 
                      <span class="desc">└── Escalabilidad sólida Fullstack con Django y Vue 3.</span>
                    </li>
                    <li>
                      <span class="node text-amber">[Plants IA & SmartStudy]</span> 
                      <span class="desc">└── Integración de IA para hacer que la app "piense" sola.</span>
                    </li>
                    <li>
                      <span class="node text-purple">[Lottery & DustrBike]</span> 
                      <span class="desc">└── Animaciones fluidas, sonido y lógica interactiva pesada.</span>
                    </li>
                    <li>
                      <span class="node text-green">[Shiftclock]</span> 
                      <span class="desc">└── Foco en arquitecturas ultra privadas y seguras (Local-First).</span>
                    </li>
                    <li>
                      <span class="node text-grey-4">[DNS Dynamic]</span> 
                      <span class="desc">└── Entregas relámpago y prototipado ágil sin sacrificar impacto visual.</span>
                    </li>
                  </ul>
                </div>

                <!-- Comando 3 -->
                <div class="cmd-line">
                  <span class="prompt">sha3ky@bytepunk:~$</span> cat philosophy.log
                </div>
                <div class="cmd-output text-grey-4">
                  > Challenges First: Me gusta enfrentarme a los límites.<br>
                  > Compromiso Total: Si empiezo algo, lo entrego al nivel máximo.<br>
                  > Mens Sana in Corpore Sano: Natación, gimnasio, tatami y naturaleza.<br>  <br>Mantener la mente fuera del ordenador asegura el código más limpio.
                </div>

                <!-- Cursor -->
                <div class="cmd-line">
                  <span class="prompt">sha3ky@bytepunk:~$</span> <span class="cursor-blink"></span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, watch, nextTick, onMounted } from 'vue'
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'

const props = defineProps({
  modelValue: { type: Boolean, required: true },
})
const emit = defineEmits(['update:modelValue', 'shown', 'hidden'])

const localVisible = ref(props.modelValue)
const playerRef = ref(null)
const showLottie = ref(false)

watch(
  () => props.modelValue,
  (val) => {
    localVisible.value = val
  }
)
watch(localVisible, (val) => emit('update:modelValue', val))

async function onDialogShow() {
  emit('shown')
}

function onDialogHide() {
  emit('hidden')
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

defineExpose({ close })
</script>

<style scoped>
.sobremi-card {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.sobremi-body {
  flex: 1;
  overflow-y: auto;
  padding: 2rem;
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 255, 255, 0.3) transparent;
}

.sobremi-body::-webkit-scrollbar {
  width: 6px;
}
.sobremi-body::-webkit-scrollbar-thumb {
  background: rgba(0, 255, 255, 0.3);
  border-radius: 4px;
}

/* --- Layout Principal --- */
.profile-layout {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 2.5rem;
  max-width: 1200px;
  margin: 0 auto;
}

.profile-sidebar {
  flex-shrink: 0;
  width: 250px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.robot-lottie {
  width: 100%;
  filter: drop-shadow(0 0 15px rgba(0, 255, 255, 0.2));
}

.sys-badge {
  display: flex;
  flex-direction: column;
  background: rgba(0, 255, 255, 0.05);
  border-left: 3px solid #00ffff;
  padding: 0.8rem 1rem;
}

.badge-label {
  font-family: monospace;
  font-size: 0.75rem;
  color: rgba(200, 200, 255, 0.5);
  letter-spacing: 1px;
}

.badge-value {
  font-family: 'Cyber', sans-serif;
  font-size: 1rem;
  letter-spacing: 1px;
  margin-top: 0.2rem;
}

.profile-content {
  flex: 1;
  width: 100%;
}

/* --- Consola / Terminal --- */
.terminal-ui {
  background: rgba(4, 8, 15, 0.95);
  border: 1px solid rgba(0, 255, 255, 0.15);
  border-radius: 6px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.8), inset 0 0 20px rgba(0, 255, 255, 0.02);
  overflow: hidden;
  font-family: monospace;
}

.term-header {
  background: rgba(255, 255, 255, 0.03);
  padding: 0.6rem 1rem;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(0, 255, 255, 0.1);
}

.term-dots {
  display: flex;
  gap: 8px;
}
.term-dots span {
  width: 12px; height: 12px;
  border-radius: 50%;
  background: #ff5f56;
}
.term-dots span:nth-child(2) { background: #ffbd2e; }
.term-dots span:nth-child(3) { background: #27c93f; }

.term-title {
  flex: 1;
  text-align: center;
  color: rgba(200, 200, 255, 0.4);
  font-size: 0.85rem;
  letter-spacing: 1px;
}

.term-body {
  padding: 2rem;
  color: rgba(220, 220, 255, 0.85);
  font-size: 0.95rem;
  line-height: 1.6;
}

.cmd-line {
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
  color: #fff;
}
.cmd-line:first-child {
  margin-top: 0;
}

.prompt {
  color: #00ffff;
  font-weight: bold;
  margin-right: 0.5rem;
  text-shadow: 0 0 5px rgba(0, 255, 255, 0.3);
}

.cmd-output {
  margin-bottom: 1.5rem;
  padding-left: 0.5rem;
}

.tree-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.tree-list li {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.node {
  font-weight: 600;
  font-size: 0.95rem;
}

.desc {
  color: rgba(200, 200, 255, 0.6);
  padding-left: 0.5rem;
  font-size: 0.85rem;
}

.cursor-blink {
  display: inline-block;
  width: 10px;
  height: 1.2em;
  background: #00ffff;
  vertical-align: text-bottom;
  animation: blink 1s step-end infinite;
  box-shadow: 0 0 5px rgba(0, 255, 255, 0.5);
}

@keyframes blink {
  50% { opacity: 0; }
}

@media (max-width: 900px) {
  .sobremi-body {
    padding: 1rem;
  }
  .profile-layout {
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }
  .profile-sidebar {
    width: 200px;
    align-items: center;
  }
  .sys-badge {
    width: 100%;
    align-items: center;
  }
  .term-body {
    padding: 1rem;
    font-size: 0.85rem;
  }
  .cmd-output {
    margin-bottom: 1rem;
  }
}
</style>
