<template>
    <div class="card" style="padding: 14px;">
      <div style="display:flex; align-items:center; justify-content:space-between; gap:10px;">
        <div style="font-weight:700;">Overview</div>
        <span class="badge">Total: {{ total }}</span>
      </div>
  
      <div style="display:flex; gap:10px; flex-wrap:wrap; margin-top: 12px;">
        <span class="badge">Pending: {{ pending }}</span>
        <span class="badge">Completed: {{ completed }}</span>
        <span class="badge" v-show="completed > 0">Nice.</span>
      </div>
  
      <hr class="sep" />
  
      <button class="btn danger" :disabled="completed === 0" @click="$emit('clear-completed')">
        Clear completed
      </button>
    </div>
  </template>
  
  <script setup>
  defineProps({
    total: { type: Number, required: true },
    pending: { type: Number, required: true },
    completed: { type: Number, required: true }
  });
  
  defineEmits(["clear-completed"]);
  </script>
  