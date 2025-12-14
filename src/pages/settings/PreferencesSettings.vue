<template>
  <section class="card p">
    <h2 class="h">Preferences</h2>
    <p class="sub">Demonstrates v-if / v-else and dynamic classes.</p>

    <div class="row">
      <button class="btn" type="button" @click="mode = mode === 'compact' ? 'comfortable' : 'compact'">
        Toggle density
      </button>

      <span class="chip" :class="mode">{{ mode }}</span>
    </div>

    <div class="panel" :class="mode">
      <p v-if="mode === 'compact'" class="muted">
        Compact mode reduces spacing.
      </p>
      <p v-else class="muted">
        Comfortable mode increases spacing.
      </p>

      <div class="demo">
        <div class="box" v-for="n in 6" :key="n">Item {{ n }}</div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
const mode = ref('comfortable')
</script>

<style scoped>
.p{ padding: 18px; }
.h{ margin:0; font-size: 18px; }
.sub{ margin: 10px 0 0; color: var(--muted); }
.row{ display:flex; gap: 10px; align-items:center; margin-top: 14px; flex-wrap: wrap; }
.btn{
  padding: 8px 12px;
  border-radius: 12px;
  border: 1px solid var(--line);
  background: transparent;
  color: var(--text);
  cursor: pointer;
}
.btn:hover{ border-color: color-mix(in srgb, var(--accent), transparent 55%); }

.chip{
  font-size: 12px;
  border: 1px solid var(--line);
  padding: 2px 8px;
  border-radius: 999px;
  color: var(--muted);
  text-transform: capitalize;
}
.chip.compact{ border-color: color-mix(in srgb, var(--accent), transparent 55%); color: var(--text); }
.chip.comfortable{ border-color: color-mix(in srgb, var(--ok), transparent 55%); color: var(--text); }

.panel{
  margin-top: 14px;
  border: 1px solid var(--line);
  border-radius: 16px;
  background: color-mix(in srgb, var(--panel), transparent 0%);
  transition: padding 160ms ease;
}
.panel.compact{ padding: 10px; }
.panel.comfortable{ padding: 18px; }

.muted{ color: var(--muted); margin: 0; }

.demo{ display:grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-top: 12px; }
.box{
  border: 1px solid var(--line);
  border-radius: 14px;
  padding: 12px;
  text-align:center;
}
@media (max-width: 720px){
  .demo{ grid-template-columns: repeat(2, 1fr); }
}
</style>
