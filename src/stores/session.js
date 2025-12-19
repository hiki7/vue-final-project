import { defineStore } from "pinia";

const STORAGE_KEY = "task-tracker.session.v1";

export const useSessionStore = defineStore("session", {
  state: () => ({
    isAuthenticated: false,
    email: "",
    compactMode: false
  }),
  getters: {
    displayName: (s) => (s.email ? s.email.split("@")[0] : "Guest")
  },
  actions: {
    login(email) {
      this.isAuthenticated = true;
      this.email = String(email || "").trim();
      return true;
    },
    logout() {
      this.isAuthenticated = false;
      this.email = "";
    },
    setCompactMode(v) {
      this.compactMode = !!v;
    },
    persist() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        isAuthenticated: this.isAuthenticated,
        email: this.email,
        compactMode: this.compactMode
      }));
    },
    hydrate() {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      try {
        const p = JSON.parse(raw);
        this.isAuthenticated = !!p?.isAuthenticated;
        this.email = String(p?.email || "");
        this.compactMode = !!p?.compactMode;
      } catch {
        this.isAuthenticated = false;
        this.email = "";
        this.compactMode = false;
      }
    }
  }
});
