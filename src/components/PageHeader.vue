<template>
    <div style="display:flex; align-items:flex-end; justify-content:space-between; gap:14px; flex-wrap:wrap;">
      <div>
        <h1 style="margin:0; font-size: 22px; letter-spacing:.2px;">{{ title }}</h1>
        <div v-if="subtitle" style="margin-top:6px; color: var(--muted); font-size: 14px;">
          {{ subtitle }}
        </div>
      </div>
      <div>
        <slot />
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    title: { type: String, required: true },
    subtitle: { type: String, default: "" }
  });
  </script>
  