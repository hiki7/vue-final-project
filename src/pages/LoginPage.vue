<template>
  <section class="grid">
    <div class="card p">
      <h1 class="h">Log in</h1>
      <p class="sub">A simple page used by the navigation guard for Settings.</p>

      <form class="form" @submit.prevent="submit">
        <label class="field">
          <span class="label">Your name</span>
          <input class="input" v-model="name" type="text" placeholder="e.g., Alex" />
          <span v-if="err" class="err">{{ err }}</span>
        </label>

        <button class="btn ok" type="submit">Log in</button>
      </form>
    </div>

    <div class="card p tip">
      <h2 class="h2">Why this exists</h2>
      <p class="sub">
        The course requirements include a basic navigation guard. Settings routes require a session.
      </p>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'

const route = useRoute()
const router = useRouter()
const user = useUserStore()

const name = ref('')
const err = ref('')

function submit() {
  if (name.value.trim().length < 2) {
    err.value = 'Name must be at least 2 characters.'
    return
  }
  err.value = ''
  user.login(name.value)
  const redirect = typeof route.query.redirect === 'string' ? route.query.redirect : '/settings'
  router.push(redirect)
}
</script>

<style scoped>
.grid{ display:grid; gap: 12px; grid-template-columns: 1.1fr 0.9fr; }
.p{ padding: 18px; }
.h{ margin:0; font-size: 22px; }
.h2{ margin:0; font-size: 18px; }
.sub{ margin: 10px 0 0; color: var(--muted); line-height: 1.55; }
.form{ margin-top: 14px; display:grid; gap: 12px; }
.field{ display:flex; flex-direction: column; gap: 6px; }
.label{ font-size: 12px; color: var(--muted); }
.input{
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid var(--line);
  background: color-mix(in srgb, var(--panel), transparent 0%);
  color: var(--text);
  outline: none;
}
.input:focus{ border-color: color-mix(in srgb, var(--accent), transparent 55%); }
.err{ color: var(--danger); font-size: 12px; }
.btn{
  height: 42px;
  padding: 0 14px;
  border-radius: 12px;
  border: 1px solid var(--line);
  background: transparent;
  color: var(--text);
  cursor: pointer;
}
.btn.ok{ border-color: color-mix(in srgb, var(--ok), transparent 55%); }
.btn:hover{ border-color: color-mix(in srgb, var(--accent), transparent 55%); }
.tip{ align-self: start; }
@media (max-width: 900px){
  .grid{ grid-template-columns: 1fr; }
}
</style>
