// composables/useBoolean.js
import { ref, computed } from 'vue'

export function useBoolean() {
  const booleanStates = ref({})

  const setBoolean = (key, value) => {
    booleanStates.value[key] = value
  }

  const toggleBoolean = (key) => {
    booleanStates.value[key] = !booleanStates.value[key]
  }

  const getBoolean = (key) => {
    return booleanStates.value[key] ?? true // Nullish coalescing
  }

  const computedBoolean = (key) => {
    return computed(() => booleanStates.value[key] ?? true)
  }

  // Opcional: resetear todos los estados
  const resetAll = () => {
    booleanStates.value = {}
  }

  return {
    setBoolean,
    toggleBoolean,
    getBoolean,
    computedBoolean,
    booleanStates,
    resetAll, // Opcional
  }
}
