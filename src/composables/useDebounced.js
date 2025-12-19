import { ref, watch } from "vue";

export function useDebounced(sourceRef, delay = 250) {
  const debounced = ref(sourceRef.value);
  let t = 0;

  watch(sourceRef, (v) => {
    clearTimeout(t);
    t = window.setTimeout(() => {
      debounced.value = v;
    }, delay);
  }, { immediate: true });

  return debounced;
}
