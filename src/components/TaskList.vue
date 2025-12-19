<template>
    <div class="card" style="padding: 14px;">
      <div style="display:flex; align-items:center; justify-content:space-between; gap:10px;">
        <div style="font-weight:700;">Tasks</div>
        <span class="badge">{{ countLabel }}</span>
      </div>
  
      <div v-if="tasks.length === 0" style="margin-top: 12px; color: var(--muted);">
        Nothing here yet.
      </div>
  
      <transition-group name="list" tag="ul" style="list-style:none; padding:0; margin:12px 0 0 0;">
        <li v-for="t in tasks" :key="t.id" style="margin-bottom:10px;">
          <TaskItem
            :task="t"
            @toggle="$emit('toggle', $event)"
            @remove="$emit('remove', $event)"
            @open="$emit('open', $event)"
          />
        </li>
      </transition-group>
    </div>
  </template>
  
  <script setup>
  import { computed } from "vue";
  import TaskItem from "./TaskItem.vue";
  
  const props = defineProps({
    tasks: { type: Array, required: true }
  });
  
  defineEmits(["toggle", "remove", "open"]);
  
  const countLabel = computed(() => `${props.tasks.length} item(s)`);
  </script>
  
  <style scoped>
  .list-enter-active, .list-leave-active {
    transition: all .18s ease;
  }
  .list-enter-from, .list-leave-to {
    opacity: 0;
    transform: translateY(6px);
  }
  .list-move {
    transition: transform .18s ease;
  }
  </style>
  