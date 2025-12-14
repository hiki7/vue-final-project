<template>
  <Transition name="fade">
    <div v-if="open" class="overlay" role="dialog" aria-modal="true">
      <div class="box card">
        <div class="head">
          <h3 class="h">{{ title }}</h3>
          <button class="x" type="button" @click="$emit('cancel')" aria-label="Close">✕</button>
        </div>
        <p class="msg">{{ message }}</p>
        <div class="actions">
          <button class="btn" type="button" @click="$emit('cancel')">Cancel</button>
          <button class="btn danger" type="button" @click="$emit('confirm')">{{ confirmText }}</button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
defineProps({
  open: { type: Boolean, default: false },
  title: { type: String, default: 'Confirm' },
  message: { type: String, default: '' },
  confirmText: { type: String, default: 'Confirm' }
})
defineEmits(['confirm', 'cancel'])
</script>

<style scoped>
.overlay{
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.55);
  display:flex;
  align-items:center;
  justify-content:center;
  padding: 18px;
  z-index: 50;
}
.box{
  width: min(520px, 100%);
  padding: 14px;
}
.head{
  display:flex;
  justify-content: space-between;
  align-items:center;
  gap: 10px;
}
.h{ margin:0; font-size: 16px; }
.x{
  width: 34px;
  height: 34px;
  border-radius: 12px;
  border: 1px solid var(--line);
  background: transparent;
  color: var(--text);
  cursor: pointer;
}
.msg{ color: var(--muted); margin: 10px 0 0; }
.actions{ display:flex; gap: 10px; justify-content: flex-end; margin-top: 14px; }
.btn{
  padding: 8px 12px;
  border-radius: 12px;
  border: 1px solid var(--line);
  background: transparent;
  color: var(--text);
  cursor: pointer;
}
.btn:hover{ border-color: color-mix(in srgb, var(--accent), transparent 55%); }
.btn.danger{ border-color: color-mix(in srgb, var(--danger), transparent 55%); }

.fade-enter-active, .fade-leave-active{ transition: opacity 160ms ease; }
.fade-enter-from, .fade-leave-to{ opacity: 0; }
</style>
