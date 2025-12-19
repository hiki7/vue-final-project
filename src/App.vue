<template>
  <div :class="['container', { compact: session.compactMode }]">
    <NavBar />
    <div style="height: 14px;"></div>
    <router-view />
  </div>
</template>

<script setup>
import NavBar from "./components/NavBar.vue";
import { useSessionStore } from "./stores/session";

const session = useSessionStore();
</script>
