import { computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import { useLocalStorageJson } from '../composables/useLocalStorage'

function makeId() {
  return Math.random().toString(16).slice(2) + Date.now().toString(16)
}

export const useTasksStore = defineStore('tasks', () => {
  const tasks = useLocalStorageJson('tm_tasks', [
    { id: 't1', title: 'Finish Vue course project', details: 'Add router, Pinia, API request, and tests', done: false, priority: 'high', due: '' },
    { id: 't2', title: 'Review Composition API', details: 'Practice ref/reactive/computed/watch', done: true, priority: 'medium', due: '' }
  ])

  const ui = reactive({
    query: '',
    status: 'all',
    priority: 'all',
    sort: 'recent'
  })

  const total = computed(() => tasks.value.length)
  const completed = computed(() => tasks.value.filter(t => t.done).length)
  const active = computed(() => total.value - completed.value)

  const filtered = computed(() => {
    const q = ui.query.trim().toLowerCase()
    let list = tasks.value.slice()

    if (q) {
      list = list.filter(t => (t.title + ' ' + t.details).toLowerCase().includes(q))
    }
    if (ui.status === 'active') list = list.filter(t => !t.done)
    if (ui.status === 'done') list = list.filter(t => t.done)
    if (ui.priority !== 'all') list = list.filter(t => t.priority === ui.priority)

    if (ui.sort === 'alpha') list.sort((a, b) => a.title.localeCompare(b.title))
    if (ui.sort === 'priority') {
      const rank = { high: 0, medium: 1, low: 2 }
      list.sort((a, b) => (rank[a.priority] ?? 9) - (rank[b.priority] ?? 9))
    }
    if (ui.sort === 'recent') list.sort((a, b) => String(b.id).localeCompare(String(a.id)))
    return list
  })

  const getById = computed(() => (id) => tasks.value.find(t => t.id === id))

  function addTask(payload) {
    const task = {
      id: makeId(),
      title: payload.title.trim(),
      details: payload.details.trim(),
      done: false,
      priority: payload.priority,
      due: payload.due || ''
    }
    tasks.value = [task, ...tasks.value]
  }

  function toggleTask(id) {
    tasks.value = tasks.value.map(t => t.id === id ? { ...t, done: !t.done } : t)
  }

  function removeTask(id) {
    tasks.value = tasks.value.filter(t => t.id !== id)
  }

  function updateTask(id, patch) {
    tasks.value = tasks.value.map(t => t.id === id ? { ...t, ...patch } : t)
  }

  function setQuery(v) { ui.query = v }
  function setStatus(v) { ui.status = v }
  function setPriority(v) { ui.priority = v }
  function setSort(v) { ui.sort = v }

  return {
    tasks, ui,
    total, completed, active,
    filtered, getById,
    addTask, toggleTask, removeTask, updateTask,
    setQuery, setStatus, setPriority, setSort
  }
})
