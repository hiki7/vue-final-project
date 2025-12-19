<template>
    <transition name="fade">
      <div v-if="open" class="overlay" @click.self="$emit('cancel')">
        <div class="modal card">
          <div style="font-weight:800;">{{ title }}</div>
          <div style="margin-top:8px; color: var(--muted);">{{ message }}</div>
  
          <div style="display:flex; gap:10px; justify-content:flex-end; margin-top: 14px;">
            <button class="btn" @click="$emit('cancel')">Cancel</button>
            <button class="btn danger" @click="$emit('confirm')">Confirm</button>
          </div>
        </div>
      </div>
    </transition>
  </template>
  
  <script setup>
  defineProps({
    open: { type: Boolean, default: false },
    title: { type: String, default: "Confirm" },
    message: { type: String, default: "" }
  });
  
  defineEmits(["confirm", "cancel"]);
  </script>
  
  <style scoped>
  .overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,.55);
    display:flex;
    align-items:center;
    justify-content:center;
    padding: 18px;
    z-index: 50;
  }
  
  .modal {
    width: min(520px, 100%);
    padding: 14px;
    border-radius: 18px;
    animation: pop .16s ease;
  }
  
  @keyframes pop {
    from { transform: scale(.98); opacity: .7; }
    to { transform: scale(1); opacity: 1; }
  }
  
  .fade-enter-active, .fade-leave-active { transition: opacity .16s ease; }
  .fade-enter-from, .fade-leave-to { opacity: 0; }
  </style>
  