import { defineStore } from "pinia";
import { nanoid } from "nanoid";

const STORAGE_KEY = "task-tracker.tasks.v1";

export const useTasksStore = defineStore("tasks", {
  state: () => ({
    tasks: [],
    showCompleted: true
  }),
  getters: {
    total: (s) => s.tasks.length,
    completedCount: (s) => s.tasks.filter(t => t.completed).length,
    pendingCount: (s) => s.tasks.filter(t => !t.completed).length,
    byId: (s) => (id) => s.tasks.find(t => t.id === id)
  },
  actions: {
    addTask(payload) {
      const title = String(payload?.title ?? "").trim();
      if (!title) return false;

      const task = {
        id: nanoid(),
        title,
        notes: String(payload?.notes ?? "").trim(),
        dueDate: payload?.dueDate || "",
        priority: payload?.priority || "normal",
        tags: Array.isArray(payload?.tags) ? payload.tags : [],
        completed: false,
        createdAt: Date.now(),
        updatedAt: Date.now()
      };

      this.tasks.unshift(task);
      return task.id;
    },
    toggleTask(id) {
      const t = this.byId(id);
      if (!t) return;
      t.completed = !t.completed;
      t.updatedAt = Date.now();
    },
    updateTask(id, patch) {
      const t = this.byId(id);
      if (!t) return false;

      const nextTitle = patch?.title != null ? String(patch.title).trim() : t.title;
      if (!nextTitle) return false;

      t.title = nextTitle;
      t.notes = patch?.notes != null ? String(patch.notes).trim() : t.notes;
      t.dueDate = patch?.dueDate != null ? patch.dueDate : t.dueDate;
      t.priority = patch?.priority != null ? patch.priority : t.priority;
      t.tags = patch?.tags != null ? patch.tags : t.tags;
      t.updatedAt = Date.now();
      return true;
    },
    removeTask(id) {
      this.tasks = this.tasks.filter(t => t.id !== id);
    },
    clearCompleted() {
      this.tasks = this.tasks.filter(t => !t.completed);
    },
    importTemplate(todo) {
      const title = String(todo?.title ?? "").trim();
      if (!title) return false;

      const id = nanoid();
      this.tasks.unshift({
        id,
        title,
        notes: "Imported from templates",
        dueDate: "",
        priority: todo?.completed ? "low" : "normal",
        tags: ["template"],
        completed: !!todo?.completed,
        createdAt: Date.now(),
        updatedAt: Date.now()
      });
      return id;
    },
    setShowCompleted(v) {
      this.showCompleted = !!v;
    },
    persist() {
      const payload = JSON.stringify({ tasks: this.tasks, showCompleted: this.showCompleted });
      localStorage.setItem(STORAGE_KEY, payload);
    },
    hydrate() {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      try {
        const parsed = JSON.parse(raw);
        this.tasks = Array.isArray(parsed?.tasks) ? parsed.tasks : [];
        this.showCompleted = parsed?.showCompleted !== false;
      } catch {
        this.tasks = [];
        this.showCompleted = true;
      }
    }
  }
});
