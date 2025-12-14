<template>
  <section class="card p">
    <div class="head">
      <h2 class="h">API demo</h2>
      <div class="row">
        <span class="muted">Fetch users</span>
        <button class="btn" type="button" @click="loadUsers">Reload</button>
      </div>
    </div>

    <div v-if="loading" class="state">Loading...</div>
    <div v-else-if="error" class="state err">{{ error }}</div>
    <ul v-else class="list">
      <li v-for="u in users" :key="u.id" class="user">
        <div class="name">{{ u.name }}</div>
        <div class="meta">
          <span class="chip">{{ u.email }}</span>
          <span class="chip">{{ u.company?.name }}</span>
        </div>
      </li>
    </ul>
  </section>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const users = ref([])
const loading = ref(false)
const error = ref('')
let controller = null

async function loadUsers() {
  if (controller) controller.abort()
  controller = new AbortController()

  loading.value = true
  error.value = ''
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/users', { signal: controller.signal })
    if (!res.ok) throw new Error(`Request failed (${res.status})`)
    users.value = await res.json()
  } catch (e) {
    if (String(e?.name) !== 'AbortError') {
      error.value = e?.message || 'Something went wrong.'
    }
  } finally {
    loading.value = false
  }
}

onMounted(loadUsers)
onUnmounted(() => controller?.abort())
</script>

<style scoped>
.p{ padding: 16px; }
.head{ display:flex; justify-content: space-between; align-items: center; gap: 10px; flex-wrap: wrap; }
.h{ margin:0; font-size: 18px; }
.row{ display:flex; align-items:center; gap: 10px; }
.btn{
  padding: 8px 12px;
  border-radius: 12px;
  border: 1px solid var(--line);
  background: transparent;
  color: var(--text);
  cursor: pointer;
}
.btn:hover{ border-color: color-mix(in srgb, var(--accent), transparent 55%); }
.muted{ color: var(--muted); font-size: 13px; }
.state{ margin-top: 12px; color: var(--muted); }
.err{ color: var(--danger); }
.list{ margin: 12px 0 0; padding: 0; list-style: none; display:grid; gap: 10px; }
.user{
  border: 1px solid var(--line);
  border-radius: 14px;
  padding: 10px 12px;
  background: color-mix(in srgb, var(--panel), transparent 0%);
}
.name{ font-weight: 800; }
.meta{ margin-top: 8px; display:flex; gap: 8px; flex-wrap: wrap; }
.chip{
  font-size: 12px;
  color: var(--muted);
  border: 1px solid var(--line);
  padding: 2px 8px;
  border-radius: 999px;
}
</style>
