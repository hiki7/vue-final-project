<template>
    <PageHeader
      title="Welcome"
      subtitle="Create tasks, import templates from the API, and keep everything organized."
    />
  
    <div style="height: 14px;"></div>
  
    <div class="grid cols-2">
      <div class="card" style="padding: 14px;">
        <div style="font-weight:800; font-size: 16px;">Quick start</div>
        <div style="margin-top: 8px; color: var(--muted); line-height: 1.55;">
          Go to Tasks to add items. Use Templates to import pre-made tasks from an external API.
          Settings is protected and requires login.
        </div>
  
        <div style="display:flex; gap:10px; flex-wrap:wrap; margin-top: 12px;">
          <RouterLink class="btn primary" to="/tasks">Open Tasks</RouterLink>
          <RouterLink class="btn" to="/explore">Browse Templates</RouterLink>
        </div>
      </div>
  
      <div class="card" style="padding: 14px;">
        <div style="font-weight:800; font-size: 16px;">Your status</div>
        <div style="margin-top: 10px; display:flex; gap:10px; flex-wrap:wrap;">
          <span class="badge">Signed in: {{ session.isAuthenticated ? "Yes" : "No" }}</span>
          <span class="badge">Name: {{ session.displayName }}</span>
        </div>
  
        <hr class="sep" />
  
        <div style="display:flex; gap:10px; flex-wrap:wrap;">
          <RouterLink v-if="!session.isAuthenticated" class="btn primary" to="/login">Login</RouterLink>
          <button v-else class="btn danger" @click="session.logout()">Logout</button>
          <RouterLink class="btn" to="/settings">Settings</RouterLink>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import PageHeader from "../components/PageHeader.vue";
  import { useSessionStore } from "../stores/session";
  
  const session = useSessionStore();
  </script>
  