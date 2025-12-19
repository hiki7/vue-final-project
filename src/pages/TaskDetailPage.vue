<template>
    <PageHeader
      title="Task details"
      :subtitle="task ? `ID: ${task.id}` : 'This task does not exist.'"
    >
      <RouterLink class="btn" to="/tasks">Back</RouterLink>
    </PageHeader>
  
    <div style="height: 14px;"></div>
  
    <div v-if="!task" class="card" style="padding: 14px;">
      <div style="color: var(--muted);">Try going back to the list.</div>
    </div>
  
    <div v-else class="grid cols-2">
      <div class="card" style="padding: 14px;">
        <div style="display:flex; align-items:center; justify-content:space-between; gap:12px;">
          <div style="font-weight:800;">Edit</div>
          <span class="badge">Updated: {{ new Date(task.updatedAt).toLocaleString() }}</span>
        </div>
  
        <hr class="sep" />
  
        <div class="grid">
          <div>
            <label style="font-size:13px; color: var(--muted);">Title</label>
            <input class="input" v-model="draft.title" />
            <div v-if="errors.title" style="color: var(--bad); margin-top: 6px; font-size: 13px;">
              {{ errors.title }}
            </div>
          </div>
  
          <div>
            <label style="font-size:13px; color: var(--muted);">Notes</label>
            <textarea class="input" v-model="draft.notes" rows="5"></textarea>
          </div>
  
          <div class="grid" style="grid-template-columns: 1fr 1fr; gap: 12px;">
            <div>
              <label style="font-size:13px; color: var(--muted);">Due date</label>
              <input class="input" type="date" v-model="draft.dueDate" />
            </div>
            <div>
              <label style="font-size:13px; color: var(--muted);">Priority</label>
              <select class="input" v-model="draft.priority">
                <option value="low">Low</option>
                <option value="normal">Normal</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
  
          <div>
            <label style="font-size:13px; color: var(--muted);">Tags</label>
            <input class="input" v-model="tagsText" placeholder="comma separated" />
          </div>
  
          <div style="display:flex; gap:10px; flex-wrap:wrap;">
            <button class="btn primary" @click="save" :disabled="saving">{{ saving ? "Saving..." : "Save" }}</button>
            <button class="btn" @click="tasks.toggleTask(task.id)">
              {{ task.completed ? "Mark as pending" : "Mark as completed" }}
            </button>
            <button class="btn danger" @click="askDelete = true">Delete</button>
          </div>
        </div>
      </div>
  
      <div class="grid" style="align-content:start;">
        <div class="card" style="padding: 14px;">
          <div style="font-weight:800;">Preview</div>
          <div style="margin-top: 10px;">
            <div class="badge" :style="{ borderColor: task.completed ? 'rgba(45,212,191,.45)' : 'rgba(255,255,255,.12)' }">
              Status: {{ task.completed ? "Completed" : "Pending" }}
            </div>
            <div style="height: 10px;"></div>
            <div style="font-size:18px; font-weight:800;">{{ task.title }}</div>
            <div style="margin-top: 8px; color: var(--muted); white-space: pre-wrap;">{{ task.notes || "No notes." }}</div>
            <div style="height: 12px;"></div>
            <div style="display:flex; gap:8px; flex-wrap:wrap;">
              <span v-if="task.dueDate" class="badge">Due: {{ task.dueDate }}</span>
              <span class="badge">Priority: {{ task.priority }}</span>
              <span v-for="tag in task.tags" :key="tag" class="badge">#{{ tag }}</span>
            </div>
          </div>
  
          <hr class="sep" />
  
          <div style="color: var(--muted); font-size: 13px;">
            Render ticks: {{ updatedTicks }}
          </div>
        </div>
      </div>
    </div>
  
    <ConfirmDialog
      :open="askDelete"
      title="Delete task?"
      message="This will permanently remove the task."
      @cancel="askDelete = false"
      @confirm="remove"
    />
  </template>
  
  <script>
  import { defineComponent, computed, reactive, ref, watch, onMounted, onUpdated } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import { useTasksStore } from "../stores/tasks";
  import PageHeader from "../components/PageHeader.vue";
  import ConfirmDialog from "../components/ConfirmDialog.vue";
  
  export default defineComponent({
    components: { PageHeader, ConfirmDialog },
    setup() {
      const route = useRoute();
      const router = useRouter();
      const tasks = useTasksStore();
  
      const task = computed(() => tasks.byId(String(route.params.id || "")));
  
      const draft = reactive({
        title: "",
        notes: "",
        dueDate: "",
        priority: "normal"
      });
  
      const tagsText = ref("");
      const errors = reactive({ title: "" });
      const saving = ref(false);
      const askDelete = ref(false);
      const updatedTicks = ref(0);
  
      const syncDraft = () => {
        if (!task.value) return;
        draft.title = task.value.title;
        draft.notes = task.value.notes;
        draft.dueDate = task.value.dueDate;
        draft.priority = task.value.priority;
        tagsText.value = (task.value.tags || []).join(", ");
      };
  
      onMounted(() => {
        syncDraft();
        if (task.value) document.title = `Task Tracker — ${task.value.title}`;
      });
  
      onUpdated(() => {
        updatedTicks.value += 1;
      });
  
      watch(task, () => {
        syncDraft();
        if (task.value) document.title = `Task Tracker — ${task.value.title}`;
      });
  
      const save = async () => {
        errors.title = "";
        const title = String(draft.title || "").trim();
        if (!title) {
          errors.title = "Title is required.";
          return;
        }
        if (title.length < 3) {
          errors.title = "Title must be at least 3 characters.";
          return;
        }
  
        saving.value = true;
  
        const tags = tagsText.value
          .split(",")
          .map(s => s.trim())
          .filter(Boolean)
          .slice(0, 6);
  
        tasks.updateTask(task.value.id, {
          title,
          notes: draft.notes,
          dueDate: draft.dueDate,
          priority: draft.priority,
          tags
        });
  
        saving.value = false;
      };
  
      const remove = () => {
        if (!task.value) return;
        tasks.removeTask(task.value.id);
        askDelete.value = false;
        router.push({ name: "tasks" });
      };
  
      return { tasks, task, draft, tagsText, errors, saving, askDelete, updatedTicks, save, remove };
    }
  });
  </script>
  