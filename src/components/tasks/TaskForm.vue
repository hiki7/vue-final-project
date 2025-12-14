<template>
  <form class="form" @submit.prevent="submit">
    <div class="head">
      <h2 class="h">Add a task</h2>
      <span class="hint">Tip: press <kbd>Enter</kbd> to submit</span>
    </div>

    <div class="grid">
      <label class="field">
        <span class="label">Title</span>
        <input class="input" v-model="form.title" type="text" placeholder="e.g., Prepare presentation" />
        <span v-if="errors.title" class="error">{{ errors.title }}</span>
      </label>

      <label class="field">
        <span class="label">Details</span>
        <textarea class="input area" v-model="form.details" rows="3" placeholder="What exactly needs to be done?"></textarea>
        <span v-if="errors.details" class="error">{{ errors.details }}</span>
      </label>

      <div class="row">
        <label class="field">
          <span class="label">Priority</span>
          <select class="input" v-model="form.priority">
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </label>

        <label class="field">
          <span class="label">Due date (optional)</span>
          <input class="input" v-model="form.due" type="date" />
        </label>

        <button class="btn" type="submit" :disabled="!isValid">
          Add task
        </button>
      </div>

      <p v-if="!isValid" class="note">Fill the required fields to enable the submit button.</p>
    </div>
  </form>
</template>

<script setup>
import { computed, reactive, watchEffect } from 'vue'

const emit = defineEmits(['create'])

const form = reactive({
  title: '',
  details: '',
  priority: 'medium',
  due: ''
})

const errors = reactive({
  title: '',
  details: ''
})

const isValid = computed(() => {
  return form.title.trim().length >= 3 && form.details.trim().length >= 5
})

watchEffect(() => {
  errors.title = form.title.trim().length < 3 ? 'Title must be at least 3 characters.' : ''
  errors.details = form.details.trim().length < 5 ? 'Details must be at least 5 characters.' : ''
})

function submit() {
  if (!isValid.value) return
  emit('create', { ...form })
  form.title = ''
  form.details = ''
  form.priority = 'medium'
  form.due = ''
}
</script>

<style scoped>
.form{ display:flex; flex-direction: column; gap: 12px; }
.head{ display:flex; justify-content: space-between; gap: 10px; align-items: baseline; flex-wrap: wrap; }
.h{ margin:0; font-size: 18px; }
.hint{ color: var(--muted); font-size: 13px; }
.grid{ display:grid; gap: 12px; }
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
.area{ resize: vertical; min-height: 72px; }
.row{ display:flex; gap: 10px; align-items: end; flex-wrap: wrap; }
.btn{
  height: 42px;
  padding: 0 14px;
  border-radius: 12px;
  border: 1px solid color-mix(in srgb, var(--accent), transparent 55%);
  background: color-mix(in srgb, var(--accent), transparent 90%);
  color: var(--text);
  cursor: pointer;
  transition: transform 120ms ease, filter 120ms ease;
}
.btn:hover{ transform: translateY(-1px); filter: brightness(1.05); }
.btn:disabled{
  cursor: not-allowed;
  opacity: 0.55;
  transform: none;
  filter: none;
}
.error{ color: var(--danger); font-size: 12px; }
.note{ margin:0; color: var(--muted); font-size: 13px; }
</style>
