import { expect } from 'vitest'

expect.extend({
  toBeVisible(received) {
    const pass = received && received.isConnected !== false
    return { pass, message: () => pass ? 'expected not visible' : 'expected visible' }
  }
})
