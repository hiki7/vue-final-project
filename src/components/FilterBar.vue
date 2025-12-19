<template>
    <div class="card" style="padding: 14px;">
      <div style="display:flex; gap:12px; flex-wrap:wrap;">
        <div style="flex: 1 1 220px;">
          <input
            class="input"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            placeholder="Search tasks..."
          />
        </div>
  
        <div style="flex: 0 0 180px;">
          <select class="input" v-model="priority">
            <option value="all">All priorities</option>
            <option value="low">Low</option>
            <option value="normal">Normal</option>
            <option value="high">High</option>
          </select>
        </div>
  
        <label class="badge" style="cursor:pointer;">
          <input type="checkbox" v-model="localShowCompleted" />
          Show completed
        </label>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from "vue";
  
  const props = defineProps({
    modelValue: { type: String, default: "" },
    showCompleted: { type: Boolean, default: true }
  });
  
  const emit = defineEmits(["update:modelValue", "update:showCompleted", "update:priority"]);
  
  const localShowCompleted = ref(props.showCompleted);
  const priority = ref("all");
  
  watch(() => props.showCompleted, (v) => {
    localShowCompleted.value = v;
  });
  
  watch(localShowCompleted, (v) => {
    emit("update:showCompleted", v);
  });
  
  watch(priority, (v) => {
    emit("update:priority", v);
  });
  </script>
  