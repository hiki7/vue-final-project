import { computed } from 'vue'
import { defineStore } from 'pinia'
import { useLocalStorageJson } from '../composables/useLocalStorage'

export const useUserStore = defineStore('user', () => {
  const session = useLocalStorageJson('tm_user_session', { isLoggedIn: false, name: '' })

  const isLoggedIn = computed(() => session.value.isLoggedIn)
  const name = computed(() => session.value.name)

  function login(userName) {
    session.value = { isLoggedIn: true, name: userName.trim() }
  }

  function logout() {
    session.value = { isLoggedIn: false, name: '' }
  }

  return { session, isLoggedIn, name, login, logout }
})
