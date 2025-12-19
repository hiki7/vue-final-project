import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "./assets/main.css";
import { useTasksStore } from "./stores/tasks";
import { useSessionStore } from "./stores/session";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

const tasks = useTasksStore(pinia);
tasks.hydrate();
tasks.$subscribe(() => tasks.persist());

const session = useSessionStore(pinia);
session.hydrate();
session.$subscribe(() => session.persist());

router.beforeEach((to) => {
  const s = useSessionStore(pinia);
  if (to.meta?.requiresAuth && !s.isAuthenticated) {
    return { name: "login", query: { redirect: to.fullPath } };
  }
  return true;
});

app.mount("#app");
