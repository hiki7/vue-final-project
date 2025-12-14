<template>
  <div class="stats">
    <div class="pill">
      <span class="k">Total</span>
      <span class="v">{{ total }}</span>
    </div>
    <div class="pill">
      <span class="k">Active</span>
      <span class="v">{{ active }}</span>
    </div>
    <div class="pill">
      <span class="k">Done</span>
      <span class="v">{{ completed }}</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  total: { type: Number, required: true },
  active: { type: Number, required: true },
  completed: { type: Number, required: true }
})
</script>

<style scoped>
.stats{ display:flex; gap: 8px; flex-wrap: wrap; }
.pill{
  display:flex;
  gap: 10px;
  align-items: center;
  padding: 8px 10px;
  border-radius: 999px;
  border: 1px solid var(--line);
  background: color-mix(in srgb, var(--panel), transparent 0%);
}
.k{ color: var(--muted); font-size: 12px; }
.v{ font-weight: 800; }
</style>
