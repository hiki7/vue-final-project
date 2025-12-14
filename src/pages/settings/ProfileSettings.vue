<template>
  <ProfileForm :initial="initial" @save="handleSave" />
</template>

<script setup>
import { computed } from 'vue'
import { useUserStore } from '../../stores/user'
import ProfileForm from '../../components/settings/ProfileForm.vue'

const user = useUserStore()

const initial = computed(() => ({
  name: user.name || '',
  email: (user.session?.email) || 'student@example.com'
}))

function handleSave(payload) {
  user.session = { ...user.session, email: payload.email, name: payload.name }
}
</script>
