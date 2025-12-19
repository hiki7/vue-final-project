import { describe, it, expect, beforeEach } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { useTasksStore } from "../stores/tasks";

describe("tasks store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    localStorage.clear();
  });

  it("adds task and toggles it", () => {
    const s = useTasksStore();
    const id = s.addTask({ title: "Test task" });
    expect(s.total).toBe(1);
    expect(s.byId(id).completed).toBe(false);
    s.toggleTask(id);
    expect(s.byId(id).completed).toBe(true);
  });

  it("persists and hydrates", () => {
    const s1 = useTasksStore();
    s1.addTask({ title: "Persist me" });
    s1.persist();

    const s2 = useTasksStore();
    s2.hydrate();
    expect(s2.total).toBe(1);
  });
});
