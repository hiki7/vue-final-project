import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import ApiUsersWidget from '../components/api/ApiUsersWidget.vue'

function flush() {
  return new Promise(r => setTimeout(r, 0))
}

describe('ApiUsersWidget', () => {
  const originalFetch = global.fetch

  beforeEach(() => {
    global.fetch = vi.fn(async () => ({
      ok: true,
      json: async () => ([
        { id: 1, name: 'Leanne Graham', email: 'leanne@example.com', company: { name: 'Acme' } }
      ])
    }))
  })

  afterEach(() => {
    global.fetch = originalFetch
    vi.restoreAllMocks()
  })

  it('renders users after fetch', async () => {
    const wrapper = mount(ApiUsersWidget)
    await flush()
    await flush()

    expect(wrapper.text()).toContain('Leanne Graham')
    expect(wrapper.text()).toContain('leanne@example.com')
  })

  it('shows error state on failure', async () => {
    global.fetch = vi.fn(async () => ({ ok: false, status: 500 }))
    const wrapper = mount(ApiUsersWidget)
    await flush()
    await flush()
    expect(wrapper.text()).toContain('Request failed (500)')
  })
})
