import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import FilterBar from "../components/FilterBar.vue";

describe("FilterBar", () => {
  it("emits update:modelValue when typing", async () => {
    const w = mount(FilterBar, {
      props: { modelValue: "", showCompleted: true }
    });

    const input = w.find("input");
    await input.setValue("abc");

    expect(w.emitted("update:modelValue")).toBeTruthy();
    expect(w.emitted("update:modelValue")[0]).toEqual(["abc"]);
  });
});
