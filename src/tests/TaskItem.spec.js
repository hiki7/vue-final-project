import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import TaskItem from '../components/tasks/TaskItem.vue'

const router = createRouter({
  history: createMemoryHistory(),
  routes: [{ path: '/tasks/:id', component: { template: '<div />' } }]
})

describe('TaskItem', () => {
  it('renders title and emits toggle', async () => {
    router.push('/tasks/abc123')
    await router.isReady()
    const wrapper = mount(TaskItem, {
      global: { plugins: [router] },
      props: {
        task: { id: 'abc123', title: 'My Task', details: 'Hello world', done: false, priority: 'medium', due: '' }
      }
    })

    expect(wrapper.text()).toContain('My Task')

    await wrapper.get('button.check').trigger('click')
    expect(wrapper.emitted('toggle')).toBeTruthy()
  })

  it('applies done class', () => {
    const wrapper = mount(TaskItem, {
      global: { plugins: [router] },
      props: {
        task: { id: 'abc123', title: 'Done Task', details: 'Ok', done: true, priority: 'low', due: '' }
      }
    })
    expect(wrapper.classes()).toContain('done')
  })
})
