<template>
    <PageHeader title="Settings" subtitle="Protected route (requires login)." />
  
    <div style="height: 14px;"></div>
  
    <div class="grid cols-2">
      <div class="card" style="padding: 14px;">
        <div style="font-weight:800;">Preferences</div>
  
        <hr class="sep" />
  
        <div class="grid">
          <label class="badge" style="cursor:pointer;">
            <input type="checkbox" v-model="tasksShowCompleted" />
            Show completed tasks in list
          </label>
  
          <label class="badge" style="cursor:pointer;">
            <input type="checkbox" v-model="compactMode" />
            Compact mode
          </label>
  
          <div>
            <div style="font-size:13px; color: var(--muted); margin-bottom: 8px;">Account email</div>
            <input class="input" v-model="email" />
            <div style="margin-top:6px; color: var(--muted); font-size: 13px;">
              This is stored locally for demo purposes.
            </div>
          </div>
  
          <div style="display:flex; gap:10px; justify-content:flex-end;">
            <button class="btn danger" @click="logout">Logout</button>
          </div>
        </div>
      </div>
  
      <div class="card" style="padding: 14px;">
        <div style="font-weight:800;">Preview</div>
        <div style="margin-top: 10px;">
          <div class="badge" :style="{ borderColor: compactMode ? 'rgba(96,165,250,.45)' : 'rgba(255,255,255,.12)' }">
            Compact mode: {{ compactMode ? "On" : "Off" }}
          </div>
          <div style="height: 10px;"></div>
          <div class="badge" :style="{ borderColor: tasksShowCompleted ? 'rgba(45,212,191,.45)' : 'rgba(251,113,133,.35)' }">
            Show completed: {{ tasksShowCompleted ? "On" : "Off" }}
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from "vue";
  import PageHeader from "../components/PageHeader.vue";
  import { useSessionStore } from "../stores/session";
  import { useTasksStore } from "../stores/tasks";
  import { useRouter } from "vue-router";
  
  const router = useRouter();
  const session = useSessionStore();
  const tasks = useTasksStore();
  
  const email = computed({
    get: () => session.email,
    set: (v) => session.login(v)
  });
  
  const compactMode = computed({
    get: () => session.compactMode,
    set: (v) => session.setCompactMode(v)
  });
  
  const tasksShowCompleted = computed({
    get: () => tasks.showCompleted,
    set: (v) => tasks.setShowCompleted(v)
  });
  
  const logout = () => {
    session.logout();
    router.push("/");
  };
  </script>
  