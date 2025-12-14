<template>
  <div class="filters">
    <label class="field">
      <span class="label">Search</span>
      <input class="input" v-model="local.query" type="text" placeholder="Title or details..." />
    </label>

    <label class="field">
      <span class="label">Status</span>
      <select class="input" v-model="local.status">
        <option value="all">All</option>
        <option value="active">Active</option>
        <option value="done">Done</option>
      </select>
    </label>

    <label class="field">
      <span class="label">Priority</span>
      <select class="input" v-model="local.priority">
        <option value="all">All</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
    </label>

    <label class="field">
      <span class="label">Sort</span>
      <select class="input" v-model="local.sort">
        <option value="recent">Recent</option>
        <option value="alpha">A → Z</option>
        <option value="priority">Priority</option>
      </select>
    </label>

    <button class="clear" type="button" @click="clearAll">
      Clear
    </button>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue'

const props = defineProps({
  query: { type: String, default: '' },
  status: { type: String, default: 'all' },
  priority: { type: String, default: 'all' },
  sort: { type: String, default: 'recent' }
})

const emit = defineEmits(['update:query', 'update:status', 'update:priority', 'update:sort'])

const local = reactive({
  query: props.query,
  status: props.status,
  priority: props.priority,
  sort: props.sort
})

watch(() => props.query, v => (local.query = v))
watch(() => props.status, v => (local.status = v))
watch(() => props.priority, v => (local.priority = v))
watch(() => props.sort, v => (local.sort = v))

watch(() => local.query, v => emit('update:query', v))
watch(() => local.status, v => emit('update:status', v))
watch(() => local.priority, v => emit('update:priority', v))
watch(() => local.sort, v => emit('update:sort', v))

function clearAll() {
  local.query = ''
  local.status = 'all'
  local.priority = 'all'
  local.sort = 'recent'
}
</script>

<style scoped>
.filters{
  margin-top: 14px;
  display:grid;
  grid-template-columns: 1.6fr 1fr 1fr 1fr auto;
  gap: 10px;
  align-items:end;
}
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
.clear{
  height: 42px;
  padding: 0 14px;
  border-radius: 12px;
  border: 1px solid var(--line);
  background: transparent;
  color: var(--text);
  cursor:pointer;
}
.clear:hover{ border-color: color-mix(in srgb, var(--accent), transparent 55%); }

@media (max-width: 860px){
  .filters{ grid-template-columns: 1fr 1fr; }
  .clear{ grid-column: 1 / -1; }
}
</style>
