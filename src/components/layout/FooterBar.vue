<template>
  <footer class="foot">
    <div class="container inner">
      <div class="left">
        <span class="muted">Course Final Project</span>
      </div>
      <div class="right">
        <span class="muted">Built with Vue Router + Pinia + Vitest</span>
      </div>
    </div>
  </footer>
</template>

<script setup>
</script>

<style scoped>
.foot{
  border-top: 1px solid var(--line);
  background: color-mix(in srgb, var(--bg), transparent 20%);
}
.inner{
  display:flex;
  justify-content: space-between;
  align-items:center;
  padding: 16px 20px;
}
.muted{ color: var(--muted); font-size: 13px; }
</style>
