import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '../stores/user'

const routes = [
  { path: '/', name: 'home', component: () => import('../pages/HomePage.vue') },
  { path: '/tasks', name: 'tasks', component: () => import('../pages/TasksPage.vue') },
  { path: '/tasks/:id', name: 'task-details', component: () => import('../pages/TaskDetailsPage.vue'), props: true },
  { path: '/about', name: 'about', component: () => import('../pages/AboutPage.vue') },

  {
    path: '/settings',
    component: () => import('../pages/settings/SettingsLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      { path: '', redirect: { name: 'settings-profile' } },
      { path: 'profile', name: 'settings-profile', component: () => import('../pages/settings/ProfileSettings.vue') },
      { path: 'preferences', name: 'settings-preferences', component: () => import('../pages/settings/PreferencesSettings.vue') }
    ]
  },

  { path: '/login', name: 'login', component: () => import('../pages/LoginPage.vue') },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('../pages/NotFoundPage.vue') }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

router.beforeEach((to) => {
  const user = useUserStore()
  if (to.meta.requiresAuth && !user.isLoggedIn) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }
})

export default router
