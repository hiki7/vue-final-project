<template>
  <section class="card p">
    <h1 class="h">404 — Not Found</h1>
    <p class="sub">The page you requested does not exist.</p>

    <div class="row">
      <RouterLink class="btn" to="/">Home</RouterLink>
      <RouterLink class="btn" to="/tasks">Tasks</RouterLink>
    </div>
  </section>
</template>

<script setup>
</script>

<style scoped>
.p{ padding: 18px; }
.h{ margin:0; font-size: 24px; }
.sub{ margin: 10px 0 0; color: var(--muted); }
.row{ margin-top: 14px; display:flex; gap: 10px; flex-wrap: wrap; }
.btn{
  height: 42px;
  display:inline-flex;
  align-items:center;
  justify-content:center;
  padding: 0 14px;
  border-radius: 12px;
  border: 1px solid var(--line);
  background: transparent;
}
.btn:hover{ border-color: color-mix(in srgb, var(--accent), transparent 55%); }
</style>
