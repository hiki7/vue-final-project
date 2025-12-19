import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import TaskItem from "../components/TaskItem.vue";

describe("TaskItem", () => {
  it("emits toggle on checkbox change", async () => {
    setActivePinia(createPinia());
    const task = { id: "1", title: "X", completed: false, dueDate: "", tags: [] };
    const w = mount(TaskItem, { props: { task } });
    await w.find('input[type="checkbox"]').trigger("change");
    expect(w.emitted("toggle")).toBeTruthy();
    expect(w.emitted("toggle")[0]).toEqual(["1"]);
  });

  it("applies done class when completed", () => {
    setActivePinia(createPinia());
    const task = { id: "1", title: "X", completed: true, dueDate: "", tags: [] };
    const w = mount(TaskItem, { props: { task } });
    expect(w.classes()).toContain("done");
  });
});
