<template>
  <header class="bar">
    <div class="container inner">
      <div class="brand">
        <span class="dot" aria-hidden="true"></span>
        <RouterLink to="/" class="title">Task Manager</RouterLink>
        <span class="tag">Vue 3</span>
      </div>

      <nav class="links">
        <RouterLink class="link" :class="{ active: route.name === 'home' }" to="/">Home</RouterLink>
        <RouterLink class="link" :class="{ active: route.name === 'tasks' }" to="/tasks">Tasks</RouterLink>
        <RouterLink class="link" :class="{ active: String(route.path).startsWith('/settings') }" to="/settings">Settings</RouterLink>
        <RouterLink class="link" :class="{ active: route.name === 'about' }" to="/about">About</RouterLink>
      </nav>

      <div class="right">
        <div v-if="user.isLoggedIn" class="user">
          <span class="hello">Hi, <strong>{{ user.name || 'User' }}</strong></span>
          <button class="btn" type="button" @click="user.logout()">Log out</button>
        </div>
        <div v-else class="user">
          <RouterLink class="btn" to="/login">Log in</RouterLink>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useUserStore } from '../../stores/user'

const route = useRoute()
const user = useUserStore()
</script>

<style scoped>
.bar{
  position: sticky;
  top: 0;
  z-index: 20;
  backdrop-filter: blur(12px);
  background: color-mix(in srgb, var(--bg), transparent 35%);
  border-bottom: 1px solid var(--line);
}
.inner{
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 14px;
}
.brand{ display:flex; align-items:center; gap:10px; }
.dot{
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent), transparent 75%);
}
.title{ font-weight: 800; letter-spacing: 0.2px; }
.tag{
  font-size: 12px;
  color: var(--muted);
  border: 1px solid var(--line);
  padding: 2px 8px;
  border-radius: 999px;
}
.links{ display:flex; gap:10px; justify-content:center; }
.link{
  padding: 8px 10px;
  border-radius: 10px;
  color: var(--muted);
  border: 1px solid transparent;
  transition: transform 120ms ease, border-color 120ms ease, color 120ms ease;
}
.link:hover{
  transform: translateY(-1px);
  color: var(--text);
  border-color: var(--line);
}
.link.active{
  color: var(--text);
  border-color: color-mix(in srgb, var(--accent), transparent 60%);
  background: color-mix(in srgb, var(--accent), transparent 92%);
}
.right{ display:flex; justify-content:flex-end; }
.user{ display:flex; align-items:center; gap:10px; }
.hello{ color: var(--muted); }
.btn{
  padding: 8px 12px;
  border-radius: 12px;
  background: color-mix(in srgb, var(--panel), transparent 0%);
  border: 1px solid var(--line);
  color: var(--text);
  cursor: pointer;
  transition: transform 120ms ease, border-color 120ms ease;
}
.btn:hover{ transform: translateY(-1px); border-color: color-mix(in srgb, var(--accent), transparent 60%); }
</style>
