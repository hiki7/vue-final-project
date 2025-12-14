<template>
  <div class="app">
    <NavBar />
    <main class="container">
      <slot />
    </main>
    <FooterBar />
  </div>
</template>

<script setup>
import NavBar from './NavBar.vue'
import FooterBar from './FooterBar.vue'
</script>

<style scoped>
.app{
  min-height: 100%;
  display: grid;
  grid-template-rows: auto 1fr auto;
}
main{ padding-top: 14px; padding-bottom: 24px; }
</style>
