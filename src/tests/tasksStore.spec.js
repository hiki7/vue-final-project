import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useTasksStore } from '../stores/tasks'

describe('tasks store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
  })

  it('adds and toggles tasks', () => {
    const store = useTasksStore()
    const before = store.total
    store.addTask({ title: 'New task', details: 'Some details', priority: 'low', due: '' })
    expect(store.total).toBe(before + 1)

    const id = store.filtered[0].id
    const wasDone = store.filtered[0].done
    store.toggleTask(id)
    expect(store.getById(id).done).toBe(!wasDone)
  })
})
