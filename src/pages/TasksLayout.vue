<template>
    <div>
      <router-view />
    </div>
  </template>
  
  <script setup>
  import { onMounted } from "vue";
  import { useTasksStore } from "../stores/tasks";
  
  const tasks = useTasksStore();
  
  onMounted(() => {
    if (tasks.total === 0) {
      tasks.addTask({ title: "Welcome task", notes: "Try adding more tasks.", priority: "normal", tags: ["start"] });
    }
  });
  </script>
  