<template>
    <div class="row" :class="{ done: task.completed, compact: compactMode }">
      <label style="display:flex; align-items:center; gap:10px; cursor:pointer;">
        <input type="checkbox" :checked="task.completed" @change="$emit('toggle', task.id)" />
        <div style="display:flex; flex-direction:column; gap:4px;">
          <div class="title">{{ task.title }}</div>
          <div class="meta" v-if="task.dueDate || (task.tags && task.tags.length)">
            <span v-if="task.dueDate" class="pill">Due: {{ task.dueDate }}</span>
            <span v-for="tag in task.tags" :key="tag" class="pill">#{{ tag }}</span>
          </div>
        </div>
      </label>
  
      <div style="display:flex; gap:10px; align-items:center;">
        <button class="btn" type="button" @click.stop="$emit('open', task.id)">Open</button>
        <button class="btn danger" type="button" @click.stop="$emit('remove', task.id)">Delete</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { storeToRefs } from "pinia";
  import { useSessionStore } from "../stores/session";
  
  defineProps({
    task: { type: Object, required: true }
  });
  
  defineEmits(["toggle", "remove", "open"]);
  
  const session = useSessionStore();
  const { compactMode } = storeToRefs(session);
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
    
    .row:hover {
      transform: translateY(-1px);
      border-color: rgba(255,255,255,.2);
    }
    
    .title {
      font-weight: 650;
      letter-spacing: .1px;
    }
    
    .meta {
      display:flex;
      gap:8px;
      flex-wrap:wrap;
      color: var(--muted);
      font-size: 13px;
    }
    
    .pill {
      border: 1px solid var(--line);
      border-radius: 999px;
      padding: 4px 8px;
      background: rgba(0,0,0,.14);
    }
    
    .done {
      opacity: .78;
    }
    
    .done .title {
      text-decoration: line-through;
      color: rgba(255,255,255,.72);
    }
    
    .row.compact {
      padding: 8px;
      gap: 8px;
      border-radius: 12px;
    }
    
    .row.compact .title {
      font-size: 14px;
    }
    
    .row.compact .meta {
      display: none;
    }
    
    .row.compact :deep(.btn) {
      padding: 8px 10px;
      border-radius: 10px;
    }
</style>
    
  