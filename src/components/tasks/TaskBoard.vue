<template>
  <section class="grid">
    <div class="card p">
      <div class="top">
        <div>
          <h1 class="h">Tasks</h1>
          <p class="sub">Create, filter, and manage your tasks.</p>
        </div>
        <TaskStats :total="store.total" :active="store.active" :completed="store.completed" />
      </div>

      <TaskFilters
        v-model:query="store.ui.query"
        v-model:status="store.ui.status"
        v-model:priority="store.ui.priority"
        v-model:sort="store.ui.sort"
      />
    </div>

    <div class="card p">
      <TaskForm @create="store.addTask" />
    </div>

    <div class="card p">
      <TaskList
        :tasks="store.filtered"
        @toggle="store.toggleTask"
        @remove="askRemove"
        @update="store.updateTask"
      />

      <p v-show="store.filtered.length === 0" class="empty">
        No tasks match your filters.
      </p>
    </div>

    <ConfirmDialog
      :open="confirm.open"
      title="Delete task?"
      :message="confirm.message"
      confirm-text="Delete"
      @cancel="confirm.open = false"
      @confirm="doRemove"
    />
  </section>
</template>

<script setup>
import { reactive } from 'vue'
import { useTasksStore } from '../../stores/tasks'
import TaskForm from './TaskForm.vue'
import TaskFilters from './TaskFilters.vue'
import TaskStats from './TaskStats.vue'
import TaskList from './TaskList.vue'
import ConfirmDialog from '../ui/ConfirmDialog.vue'

const store = useTasksStore()

const confirm = reactive({
  open: false,
  id: '',
  message: ''
})

function askRemove(id) {
  const t = store.getById(id)
  confirm.id = id
  confirm.message = t ? `You are about to delete: "${t.title}". This cannot be undone.` : 'This cannot be undone.'
  confirm.open = true
}

function doRemove() {
  store.removeTask(confirm.id)
  confirm.open = false
}
</script>

<style scoped>
.grid{ display:grid; gap: 12px; }
.p{ padding: 16px; }
.top{ display:flex; gap: 12px; justify-content: space-between; align-items:flex-start; flex-wrap: wrap; }
.h{ margin:0; font-size: 22px; }
.sub{ margin: 6px 0 0; color: var(--muted); }
.empty{
  margin: 12px 0 0;
  color: var(--muted);
  font-size: 13px;
}
</style>
