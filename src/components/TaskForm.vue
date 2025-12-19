<template>
    <div class="card" style="padding: 14px;">
      <div style="font-weight:700; margin-bottom:10px;">Add a task</div>
  
      <form @submit.prevent="submit">
        <div class="grid">
          <div>
            <input class="input" v-model="form.title" placeholder="Task title" />
            <div v-if="errors.title" style="color: var(--bad); margin-top: 6px; font-size: 13px;">
              {{ errors.title }}
            </div>
          </div>
  
          <div>
            <textarea class="input" v-model="form.notes" rows="3" placeholder="Notes (optional)"></textarea>
          </div>
  
          <div class="grid" style="grid-template-columns: 1fr 1fr; gap: 12px;">
            <div>
              <input class="input" type="date" v-model="form.dueDate" />
            </div>
            <div>
              <select class="input" v-model="form.priority">
                <option value="low">Low</option>
                <option value="normal">Normal</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
  
          <div style="display:flex; gap:10px; flex-wrap:wrap;">
            <input class="input" style="flex:1 1 220px;" v-model="tagInput" placeholder="Tags (comma separated)" />
            <button class="btn primary" type="submit" :disabled="submitting">
              {{ submitting ? "Adding..." : "Add task" }}
            </button>
          </div>
  
          <div v-if="errors.form" style="color: var(--bad); font-size: 13px;">
            {{ errors.form }}
          </div>
        </div>
      </form>
    </div>
  </template>
  
  <script setup>
  import { reactive, ref, watchEffect } from "vue";
  
  const emit = defineEmits(["add"]);
  
  const form = reactive({
    title: "",
    notes: "",
    dueDate: "",
    priority: "normal"
  });
  
  const tagInput = ref("");
  const submitting = ref(false);
  
  const errors = reactive({
    title: "",
    form: ""
  });
  
  watchEffect(() => {
    if (form.title.trim().length >= 3) errors.title = "";
    if (errors.form) errors.form = "";
  });
  
  const validate = () => {
    errors.title = "";
    errors.form = "";
  
    const t = form.title.trim();
    if (!t) {
      errors.title = "Title is required.";
      return false;
    }
    if (t.length < 3) {
      errors.title = "Title must be at least 3 characters.";
      return false;
    }
    return true;
  };
  
  const submit = async () => {
    if (!validate()) return;
  
    submitting.value = true;
  
    const tags = tagInput.value
      .split(",")
      .map(s => s.trim())
      .filter(Boolean)
      .slice(0, 6);
  
    emit("add", {
      title: form.title,
      notes: form.notes,
      dueDate: form.dueDate,
      priority: form.priority,
      tags
    });
  
    form.title = "";
    form.notes = "";
    form.dueDate = "";
    form.priority = "normal";
    tagInput.value = "";
  
    submitting.value = false;
  };
  </script>
  