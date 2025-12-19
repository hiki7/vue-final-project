<template>
    <PageHeader title="Not found" subtitle="This route does not exist." />
  
    <div style="height: 14px;"></div>
  
    <div class="card" style="padding: 14px;">
      <div style="color: var(--muted); line-height: 1.6;">
        Try going back to Home or Tasks.
      </div>
  
      <div style="display:flex; gap:10px; flex-wrap:wrap; margin-top: 12px;">
        <RouterLink class="btn primary" to="/">Home</RouterLink>
        <RouterLink class="btn" to="/tasks">Tasks</RouterLink>
      </div>
    </div>
  </template>
  
  <script setup>
  import PageHeader from "../components/PageHeader.vue";
  </script>
  