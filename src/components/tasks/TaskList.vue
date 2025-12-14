<template>
  <div class="list">
    <TransitionGroup name="list" tag="div" class="items">
      <TaskItem
        v-for="t in tasks"
        :key="t.id"
        :task="t"
        @toggle="$emit('toggle', t.id)"
        @remove="$emit('remove', t.id)"
        @update="$emit('update', t.id, $event)"
      />
    </TransitionGroup>
  </div>
</template>

<script setup>
import TaskItem from './TaskItem.vue'

defineProps({
  tasks: { type: Array, required: true }
})

defineEmits(['toggle', 'remove', 'update'])
</script>

<style scoped>
.items{ display:grid; gap: 10px; }
.list{ margin-top: 2px; }

.list-enter-active,
.list-leave-active{
  transition: all 180ms ease;
}
.list-enter-from{ opacity: 0; transform: translateY(6px); }
.list-leave-to{ opacity: 0; transform: translateY(-6px); }
</style>
