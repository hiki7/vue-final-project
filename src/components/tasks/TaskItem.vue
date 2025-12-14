<template>
  <article class="item" :class="{ done: task.done, high: task.priority === 'high' }">
    <div class="left">
      <button class="check" type="button" @click="$emit('toggle')" :aria-pressed="task.done">
        <span v-if="task.done">✓</span>
        <span v-else>○</span>
      </button>

      <div class="content">
        <div class="line">
          <RouterLink class="title" :to="`/tasks/${task.id}`">{{ task.title }}</RouterLink>
          <span class="badge" :class="task.priority">{{ task.priority }}</span>
        </div>

        <p class="details" v-if="task.details">{{ task.details }}</p>
        <p class="details muted" v-else>No details provided.</p>

        <div class="meta">
          <span v-show="task.due" class="chip">Due: {{ task.due }}</span>
          <span class="chip">ID: {{ task.id.slice(0, 6) }}</span>
        </div>
      </div>
    </div>

    <div class="actions">
      <button class="btn" type="button" @click="openEdit = !openEdit">
        {{ openEdit ? 'Close' : 'Edit' }}
      </button>
      <button class="btn danger" type="button" @click="$emit('remove')">Delete</button>
    </div>

    <div v-if="openEdit" class="edit">
      <label class="field">
        <span class="label">Update title</span>
        <input class="input" v-model="draft.title" type="text" />
      </label>

      <label class="field">
        <span class="label">Update details</span>
        <textarea class="input area" v-model="draft.details" rows="2"></textarea>
      </label>

      <div class="row">
        <label class="field">
          <span class="label">Priority</span>
          <select class="input" v-model="draft.priority">
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </label>

        <label class="field">
          <span class="label">Due date</span>
          <input class="input" v-model="draft.due" type="date" />
        </label>

        <button class="btn ok" type="button" @click="applyEdit" :disabled="!canSave">
          Save
        </button>
      </div>
      <p v-if="!canSave" class="warn">Title must be at least 3 characters.</p>
    </div>
  </article>
</template>

<script setup>
import { computed, reactive, ref, watch } from 'vue'

const props = defineProps({
  task: { type: Object, required: true }
})

const emit = defineEmits(['toggle', 'remove', 'update'])

const openEdit = ref(false)

const draft = reactive({
  title: props.task.title,
  details: props.task.details,
  priority: props.task.priority,
  due: props.task.due
})

watch(() => props.task, (t) => {
  if (!openEdit.value) {
    draft.title = t.title
    draft.details = t.details
    draft.priority = t.priority
    draft.due = t.due
  }
}, { deep: true })

const canSave = computed(() => draft.title.trim().length >= 3)

function applyEdit() {
  if (!canSave.value) return
  emit('update', { title: draft.title.trim(), details: draft.details.trim(), priority: draft.priority, due: draft.due })
  openEdit.value = false
}
</script>

<style scoped>
.item{
  padding: 12px;
  border-radius: 16px;
  border: 1px solid var(--line);
  background: color-mix(in srgb, var(--panel), transparent 0%);
  display: grid;
  gap: 10px;
}
.item.done{
  opacity: 0.82;
  border-color: color-mix(in srgb, var(--ok), transparent 70%);
}
.item.high{
  box-shadow: 0 0 0 1px color-mix(in srgb, var(--danger), transparent 80%), var(--shadow);
}
.left{ display:flex; gap: 12px; }
.check{
  width: 38px;
  height: 38px;
  border-radius: 12px;
  border: 1px solid var(--line);
  background: transparent;
  color: var(--text);
  cursor: pointer;
  display:flex;
  align-items:center;
  justify-content:center;
}
.check:hover{ border-color: color-mix(in srgb, var(--accent), transparent 55%); }
.content{ flex:1; min-width: 0; }
.line{ display:flex; align-items:center; gap: 8px; justify-content: space-between; }
.title{
  font-weight: 800;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.details{ margin: 8px 0 0; color: color-mix(in srgb, var(--text), transparent 20%); }
.details.muted{ color: var(--muted); }
.badge{
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 999px;
  border: 1px solid var(--line);
  text-transform: capitalize;
  color: var(--muted);
}
.badge.high{ border-color: color-mix(in srgb, var(--danger), transparent 60%); color: var(--text); }
.badge.medium{ border-color: color-mix(in srgb, var(--accent), transparent 60%); color: var(--text); }
.badge.low{ border-color: color-mix(in srgb, var(--ok), transparent 70%); color: var(--text); }

.meta{ display:flex; gap: 8px; margin-top: 10px; flex-wrap: wrap; }
.chip{
  font-size: 12px;
  color: var(--muted);
  border: 1px solid var(--line);
  padding: 2px 8px;
  border-radius: 999px;
}
.actions{ display:flex; gap: 8px; justify-content: flex-end; }
.btn{
  padding: 8px 12px;
  border-radius: 12px;
  border: 1px solid var(--line);
  background: transparent;
  color: var(--text);
  cursor: pointer;
}
.btn:hover{ border-color: color-mix(in srgb, var(--accent), transparent 55%); }
.btn.danger{ border-color: color-mix(in srgb, var(--danger), transparent 60%); }
.btn.ok{ border-color: color-mix(in srgb, var(--ok), transparent 55%); }
.btn:disabled{ opacity: 0.55; cursor: not-allowed; }
.edit{
  border-top: 1px dashed var(--line);
  padding-top: 10px;
  display:grid;
  gap: 10px;
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
.area{ resize: vertical; }
.row{ display:flex; gap: 10px; align-items: end; flex-wrap: wrap; }
.warn{ margin:0; color: var(--danger); font-size: 12px; }
</style>
