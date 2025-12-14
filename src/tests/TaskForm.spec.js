import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TaskForm from '../components/tasks/TaskForm.vue'

describe('TaskForm', () => {
  it('disables submit when invalid and emits create when valid', async () => {
    const wrapper = mount(TaskForm)

    const button = wrapper.get('button[type="submit"]')
    expect(button.attributes('disabled')).toBeDefined()

    await wrapper.get('input[type="text"]').setValue('ABC')
    await wrapper.get('textarea').setValue('Hello there')
    expect(wrapper.get('button[type="submit"]').attributes('disabled')).toBeUndefined()

    await wrapper.get('form').trigger('submit')
    expect(wrapper.emitted('create')).toBeTruthy()
    expect(wrapper.emitted('create')[0][0].title).toBe('ABC')
  })
})
