import { ref } from "vue";

export function useTaskTemplates() {
  const templates = ref([]);
  const loading = ref(false);
  const error = ref("");

  const load = async (signal) => {
    loading.value = true;
    error.value = "";
    templates.value = [];

    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=12", { signal });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      const data = await res.json();
      templates.value = Array.isArray(data) ? data : [];
    } catch (e) {
      if (e?.name !== "AbortError") {
        error.value = e?.message ? String(e.message) : "Something went wrong";
      }
    } finally {
      loading.value = false;
    }
  };

  return { templates, loading, error, load };
}
