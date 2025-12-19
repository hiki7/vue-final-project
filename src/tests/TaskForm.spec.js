import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import TaskForm from "../components/TaskForm.vue";

describe("TaskForm", () => {
  it("shows validation error for empty title", async () => {
    const w = mount(TaskForm);
    await w.find("form").trigger("submit");
    expect(w.text()).toContain("Title is required.");
  });

  it("emits add with payload when valid", async () => {
    const w = mount(TaskForm);

    const inputs = w.findAll("input");
    await inputs[0].setValue("Buy milk");
    await w.find("form").trigger("submit");

    const emitted = w.emitted("add");
    expect(emitted).toBeTruthy();
    expect(emitted[0][0].title).toBe("Buy milk");
  });
});
