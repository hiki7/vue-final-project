<template>
    <PageHeader title="Tasks" subtitle="Add, filter, complete and open task details.">
      <button class="btn" @click="showConfirm = true" :disabled="tasks.completedCount === 0">Clear completed</button>
    </PageHeader>
  
    <div style="height: 14px;"></div>
  
    <div class="grid cols-2">
      <div class="grid">
        <TaskForm @add="onAdd" />
  
        <FilterBar
          v-model="search"
          :show-completed="tasks.showCompleted"
          @update:showCompleted="tasks.setShowCompleted"
          @update:priority="priority = $event"
        />
  
        <TaskList
          :tasks="visibleTasks"
          @toggle="tasks.toggleTask"
          @remove="askDelete"
          @open="openTask"
        />
      </div>
  
      <div class="grid" style="align-content:start;">
        <StatsCard
          :total="tasks.total"
          :pending="tasks.pendingCount"
          :completed="tasks.completedCount"
          @clear-completed="showConfirm = true"
        />
  
        <div class="card" style="padding: 14px;">
          <div style="font-weight:700;">Tips</div>
          <div style="margin-top: 8px; color: var(--muted); line-height: 1.55;">
            Use search to filter tasks. Toggle “Show completed” to hide finished items.
            Click “Open” on a task to edit it.
          </div>
        </div>
      </div>
    </div>
  
    <ConfirmDialog
      :open="showConfirm"
      title="Clear completed tasks?"
      message="This will permanently remove all completed tasks."
      @cancel="showConfirm = false"
      @confirm="clearCompleted"
    />
  
    <ConfirmDialog
      :open="!!deleteId"
      title="Delete task?"
      message="This will permanently remove the selected task."
      @cancel="deleteId = ''"
      @confirm="doDelete"
    />
  </template>
  
  <script setup>
  import { computed, ref } from "vue";
  import { useRouter } from "vue-router";
  import { useTasksStore } from "../stores/tasks";
  import { useDebounced } from "../composables/useDebounced";
  
  import PageHeader from "../components/PageHeader.vue";
  import TaskForm from "../components/TaskForm.vue";
  import FilterBar from "../components/FilterBar.vue";
  import TaskList from "../components/TaskList.vue";
  import StatsCard from "../components/StatsCard.vue";
  import ConfirmDialog from "../components/ConfirmDialog.vue";
  
  const router = useRouter();
  const tasks = useTasksStore();
  
  const search = ref("");
  const debouncedSearch = useDebounced(search, 220);
  const priority = ref("all");
  
  const showConfirm = ref(false);
  const deleteId = ref("");
  
  const visibleTasks = computed(() => {
    const q = String(debouncedSearch.value || "").trim().toLowerCase();
    return tasks.tasks.filter(t => {
      if (!tasks.showCompleted && t.completed) return false;
      if (priority.value !== "all" && t.priority !== priority.value) return false;
      if (!q) return true;
      return t.title.toLowerCase().includes(q) || (t.notes || "").toLowerCase().includes(q);
    });
  });
  
  const onAdd = (payload) => {
    tasks.addTask(payload);
  };
  
  const openTask = (id) => {
    router.push({ name: "task-detail", params: { id: String(id) } });
  };

  const clearCompleted = () => {
    tasks.clearCompleted();
    showConfirm.value = false;
  };
  
  const askDelete = (id) => {
    deleteId.value = id;
  };
  
  const doDelete = () => {
    tasks.removeTask(deleteId.value);
    deleteId.value = "";
  };
  </script>
  