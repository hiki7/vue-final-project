<template>
  <section class="grid">
    <div class="card p">
      <div class="row top">
        <div>
          <h1 class="h">Task details</h1>
          <p class="sub" v-if="task">Manage a single task by ID.</p>
          <p class="sub" v-else>Task not found.</p>
        </div>
        <RouterLink class="btn" to="/tasks">Back to list</RouterLink>
      </div>

      <div v-if="task" class="details">
        <div class="kv">
          <span class="k">Title</span>
          <span class="v">{{ task.title }}</span>
        </div>
        <div class="kv">
          <span class="k">Status</span>
          <span class="v">{{ task.done ? 'Done' : 'Active' }}</span>
        </div>
        <div class="kv">
          <span class="k">Priority</span>
          <span class="v">{{ task.priority }}</span>
        </div>
        <div class="kv">
          <span class="k">Due</span>
          <span class="v">{{ task.due || '—' }}</span>
        </div>

        <hr class="hr" />

        <label class="field">
          <span class="k">Details</span>
          <textarea class="input" v-model="draft.details" rows="4"></textarea>
        </label>

        <div class="row">
          <button class="btn ok" type="button" @click="save" :disabled="draft.details.trim().length < 5">
            Save details
          </button>
          <button class="btn" type="button" @click="store.toggleTask(task.id)">
            {{ task.done ? 'Mark active' : 'Mark done' }}
          </button>
          <button class="btn danger" type="button" @click="store.removeTask(task.id)">
            Delete
          </button>
        </div>

        <p class="note" v-if="draft.details.trim().length < 5">
          Details should be at least 5 characters.
        </p>
      </div>

      <div v-else class="nf">
        <RouterLink class="btn" to="/tasks">Go to Tasks</RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, reactive, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useTasksStore } from '../stores/tasks'

const route = useRoute()
const store = useTasksStore()

const task = computed(() => store.getById(String(route.params.id)))

const draft = reactive({ details: '' })

watch(task, (t) => {
  draft.details = t?.details || ''
}, { immediate: true })

function save() {
  if (!task.value) return
  if (draft.details.trim().length < 5) return
  store.updateTask(task.value.id, { details: draft.details.trim() })
}
</script>

<style scoped>
.grid{ display:grid; gap: 12px; }
.p{ padding: 18px; }
.top{ justify-content: space-between; align-items: flex-start; flex-wrap: wrap; }
.h{ margin:0; font-size: 22px; }
.sub{ margin: 6px 0 0; color: var(--muted); }
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
.btn.danger{ border-color: color-mix(in srgb, var(--danger), transparent 55%); }
.details{ margin-top: 12px; display:grid; gap: 10px; }
.kv{ display:grid; grid-template-columns: 120px 1fr; gap: 10px; }
.k{ color: var(--muted); }
.v{ font-weight: 700; }
.hr{ border: none; border-top: 1px solid var(--line); margin: 8px 0; }
.field{ display:flex; flex-direction: column; gap: 6px; }
.input{
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid var(--line);
  background: color-mix(in srgb, var(--panel), transparent 0%);
  color: var(--text);
  outline: none;
}
.note{ margin:0; color: var(--danger); font-size: 12px; }
.nf{ margin-top: 12px; }
.row{ display:flex; gap: 10px; flex-wrap: wrap; align-items:center; }
</style>
