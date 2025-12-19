import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/", name: "home", component: () => import("../pages/HomePage.vue") },
  {
    path: "/tasks",
    component: () => import("../pages/TasksLayout.vue"),
    children: [
      { path: "", name: "tasks", component: () => import("../pages/TasksPage.vue") },
      { path: ":id", name: "task-detail", component: () => import("../pages/TaskDetailPage.vue") }
    ]
  },
  { path: "/explore", name: "explore", component: () => import("../pages/ExplorePage.vue") },
  { path: "/login", name: "login", component: () => import("../pages/LoginPage.vue") },
  {
    path: "/settings",
    name: "settings",
    meta: { requiresAuth: true },
    component: () => import("../pages/SettingsPage.vue")
  },
  { path: "/:pathMatch(.*)*", name: "not-found", component: () => import("../pages/NotFoundPage.vue") }
];

export default createRouter({
  history: createWebHistory(),
  routes
});
