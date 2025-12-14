import { ref, watch } from 'vue'

export function useLocalStorage(key, initialValue) {
  const state = ref(initialValue)
  const raw = localStorage.getItem(key)
  if (raw !== null) {
    state.value = raw
  }
  watch(state, (v) => localStorage.setItem(key, v ?? ''), { deep: false })
  return state
}

export function useLocalStorageJson(key, initialValue) {
  const state = ref(initialValue)
  const raw = localStorage.getItem(key)
  if (raw) {
    try {
      state.value = JSON.parse(raw)
    } catch {
      state.value = initialValue
    }
  }
  watch(state, (v) => localStorage.setItem(key, JSON.stringify(v)), { deep: true })
  return state
}
