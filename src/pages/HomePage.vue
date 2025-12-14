<template>
  <section class="grid">
    <div class="card p">
      <h1 class="h">Welcome</h1>
      <p class="sub">
        This project demonstrates Vue core directives, components, reactivity, router, Pinia, API calls, styling, animations, and testing.
      </p>

      <div class="cta">
        <RouterLink class="btn" to="/tasks">Go to Tasks</RouterLink>
        <RouterLink class="btn ghost" to="/about">Learn more</RouterLink>
      </div>
    </div>

    <ApiUsersWidget />
  </section>
</template>

<script setup>
import ApiUsersWidget from '../components/api/ApiUsersWidget.vue'
</script>

<style scoped>
.grid{ display:grid; gap: 12px; }
.p{ padding: 18px; }
.h{ margin:0; font-size: 26px; }
.sub{ margin: 10px 0 0; color: var(--muted); line-height: 1.55; }
.cta{ margin-top: 14px; display:flex; gap: 10px; flex-wrap: wrap; }
.btn{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  height: 42px;
  padding: 0 14px;
  border-radius: 12px;
  border: 1px solid color-mix(in srgb, var(--accent), transparent 55%);
  background: color-mix(in srgb, var(--accent), transparent 90%);
}
.btn.ghost{
  border-color: var(--line);
  background: transparent;
  color: var(--text);
}
.btn:hover{ filter: brightness(1.06); transform: translateY(-1px); transition: transform 120ms ease; }
</style>
