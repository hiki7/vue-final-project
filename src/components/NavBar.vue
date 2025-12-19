<template>
    <div class="card" style="padding: 14px;">
      <div style="display:flex; align-items:center; justify-content:space-between; gap:12px;">
        <div style="display:flex; align-items:center; gap:10px;">
          <div style="width:36px; height:36px; border-radius:12px; border:1px solid var(--line); background: rgba(96,165,250,.14); display:flex; align-items:center; justify-content:center;">
            TT
          </div>
          <div>
            <div style="font-weight:800; letter-spacing:.2px;">Task Tracker</div>
            <div style="font-size:13px; color: var(--muted);">Signed in as: {{ session.displayName }}</div>
          </div>
        </div>
  
        <div style="display:flex; gap:10px; flex-wrap:wrap; justify-content:flex-end;">
          <RouterLink class="btn" :class="{ primary: isActive('home') }" to="/">Home</RouterLink>
          <RouterLink class="btn" :class="{ primary: isActive('tasks') }" to="/tasks">Tasks</RouterLink>
          <RouterLink class="btn" :class="{ primary: isActive('explore') }" to="/explore">Templates</RouterLink>
          <RouterLink class="btn" :class="{ primary: isActive('settings') }" to="/settings">Settings</RouterLink>
  
          <button v-if="session.isAuthenticated" class="btn danger" @click="logout">Logout</button>
          <RouterLink v-else class="btn primary" to="/login">Login</RouterLink>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useRoute } from "vue-router";
  import { useSessionStore } from "../stores/session";
  
  const route = useRoute();
  const session = useSessionStore();
  
  const isActive = (name) => route.name === name;
  
  const logout = () => {
    session.logout();
  };
  </script>
  
  <style scoped>
  .btn.primary {
    box-shadow: 0 0 0 1px rgba(96,165,250,.18) inset;
  }
  </style>
  