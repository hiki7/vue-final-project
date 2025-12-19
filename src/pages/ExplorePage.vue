<template>
    <PageHeader title="Templates" subtitle="Fetched from an external API. Import items into your task list." />
  
    <div style="height: 14px;"></div>
  
    <LoadingState v-if="loading" />
  
    <div v-else-if="error" class="card" style="padding: 14px;">
      <div style="font-weight:800; color: var(--bad);">Could not load templates</div>
      <div style="margin-top: 8px; color: var(--muted);">{{ error }}</div>
      <div style="margin-top: 12px;">
        <button class="btn primary" @click="reload">Retry</button>
      </div>
    </div>
  
    <div v-else class="card" style="padding: 14px;">
      <div style="display:flex; align-items:center; justify-content:space-between; gap:10px; flex-wrap:wrap;">
        <div style="font-weight:800;">API Templates</div>
        <span class="badge">{{ templates.length }} item(s)</span>
      </div>
  
      <hr class="sep" />
  
      <ul style="list-style:none; padding:0; margin:0;">
        <li v-for="t in templates" :key="t.id" style="margin-bottom: 10px;">
          <div class="row" :class="{ done: t.completed }">
            <div style="display:flex; flex-direction:column; gap:6px;">
              <div style="font-weight:700;">{{ t.title }}</div>
              <div style="color: var(--muted); font-size: 13px;">Status: {{ t.completed ? "Completed" : "Pending" }}</div>
            </div>
  
            <div style="display:flex; gap:10px;">
              <button class="btn primary" @click="importOne(t)">Import</button>
              <RouterLink class="btn" to="/tasks">Open tasks</RouterLink>
            </div>
          </div>
        </li>
      </ul>
  
      <hr class="sep" />
  
      <button class="btn" @click="reload">Refresh</button>
    </div>
  </template>
  
  <script>
  import { defineComponent, onMounted, onUnmounted } from "vue";
  import { useTaskTemplates } from "../composables/useTaskTemplates";
  import { useTasksStore } from "../stores/tasks";
  import PageHeader from "../components/PageHeader.vue";
  import LoadingState from "../components/LoadingState.vue";
  
  export default defineComponent({
    components: { PageHeader, LoadingState },
    setup() {
      const tasks = useTasksStore();
      const { templates, loading, error, load } = useTaskTemplates();
  
      let controller = new AbortController();
  
      const reload = async () => {
        controller.abort();
        controller = new AbortController();
        await load(controller.signal);
      };
  
      const importOne = (t) => {
        tasks.importTemplate(t);
      };
  
      onMounted(async () => {
        await load(controller.signal);
      });
  
      onUnmounted(() => {
        controller.abort();
      });
  
      return { templates, loading, error, reload, importOne };
    }
  });
  </script>
  
  <style scoped>
  .row {
    display:flex;
    align-items:center;
    justify-content:space-between;
    gap:12px;
    padding: 12px;
    border-radius: 14px;
    border: 1px solid var(--line);
    background: rgba(255,255,255,.04);
    transition: transform .12s ease, border-color .12s ease, background .12s ease;
  }
  .row:hover { transform: translateY(-1px); border-color: rgba(255,255,255,.2); }
  .done { opacity: .75; }
  </style>
  