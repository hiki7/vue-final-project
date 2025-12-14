<template>
  <form class="card p form" @submit.prevent="save">
    <div class="head">
      <h2 class="h">Profile</h2>
      <span class="muted">Basic form validation</span>
    </div>

    <label class="field">
      <span class="label">Display name</span>
      <input class="input" v-model="model.name" type="text" placeholder="Your name" />
      <span v-if="errs.name" class="err">{{ errs.name }}</span>
    </label>

    <label class="field">
      <span class="label">Email</span>
      <input class="input" v-model="model.email" type="email" placeholder="you@example.com" />
      <span v-if="errs.email" class="err">{{ errs.email }}</span>
    </label>

    <div class="row">
      <button class="btn ok" type="submit" :disabled="!valid">Save</button>
      <button class="btn" type="button" @click="reset">Reset</button>

      <span class="saved" v-show="saved">Saved.</span>
    </div>
  </form>
</template>

<script setup>
import { computed, reactive, ref, watch } from 'vue'

const props = defineProps({
  initial: {
    type: Object,
    default: () => ({ name: '', email: '' })
  }
})

const emit = defineEmits(['save'])

const model = reactive({ name: props.initial.name, email: props.initial.email })
const errs = reactive({ name: '', email: '' })
const saved = ref(false)

const valid = computed(() => {
  const nameOk = model.name.trim().length >= 2
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(model.email.trim())
  return nameOk && emailOk
})

watch(() => model.name, () => {
  errs.name = model.name.trim().length >= 2 ? '' : 'Name must be at least 2 characters.'
  saved.value = false
})

watch(() => model.email, () => {
  errs.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(model.email.trim()) ? '' : 'Enter a valid email address.'
  saved.value = false
})

function save() {
  if (!valid.value) return
  emit('save', { name: model.name.trim(), email: model.email.trim() })
  saved.value = true
}

function reset() {
  model.name = props.initial.name
  model.email = props.initial.email
  saved.value = false
}
</script>

<style scoped>
.p{ padding: 16px; }
.form{ display:grid; gap: 12px; }
.head{ display:flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 10px; }
.h{ margin:0; font-size: 18px; }
.muted{ color: var(--muted); font-size: 13px; }
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
.row{ display:flex; gap: 10px; align-items: center; flex-wrap: wrap; }
.btn{
  padding: 8px 12px;
  border-radius: 12px;
  border: 1px solid var(--line);
  background: transparent;
  color: var(--text);
  cursor: pointer;
}
.btn:hover{ border-color: color-mix(in srgb, var(--accent), transparent 55%); }
.btn.ok{ border-color: color-mix(in srgb, var(--ok), transparent 55%); }
.btn:disabled{ opacity: 0.55; cursor: not-allowed; }
.saved{ color: var(--ok); font-size: 13px; }
</style>
