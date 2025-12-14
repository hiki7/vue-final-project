<template>
  <section class="grid">
    <div class="card p">
      <div class="top">
        <div>
          <h1 class="h">Settings</h1>
          <p class="sub">Nested routes example.</p>
        </div>

        <div class="tabs">
          <RouterLink class="tab" :class="{ active: route.name === 'settings-profile' }" to="/settings/profile">Profile</RouterLink>
          <RouterLink class="tab" :class="{ active: route.name === 'settings-preferences' }" to="/settings/preferences">Preferences</RouterLink>
        </div>
      </div>
    </div>

    <router-view />
  </section>
</template>

<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<style scoped>
.grid{ display:grid; gap: 12px; }
.p{ padding: 18px; }
.top{ display:flex; justify-content: space-between; align-items:flex-end; gap: 12px; flex-wrap: wrap; }
.h{ margin:0; font-size: 22px; }
.sub{ margin: 8px 0 0; color: var(--muted); }
.tabs{ display:flex; gap: 10px; }
.tab{
  padding: 8px 12px;
  border-radius: 12px;
  border: 1px solid var(--line);
  color: var(--muted);
}
.tab.active{
  color: var(--text);
  border-color: color-mix(in srgb, var(--accent), transparent 55%);
  background: color-mix(in srgb, var(--accent), transparent 92%);
}
</style>
