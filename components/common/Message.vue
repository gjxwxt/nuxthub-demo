<template>
  <Transition name="fade">
    <div :class="['message', `message--${type}`]" @click="$emit('close')">
      {{ content }}
    </div>
  </Transition>
</template>

<script setup lang="ts">
defineProps<{
  type: "success" | "error" | "info" | "warning";
  content: string;
}>();

defineEmits<{
  close: [];
}>();
</script>

<style lang="scss" scoped>
.message {
  padding: 12px 20px;
  border-radius: 4px;
  margin-bottom: 8px;
  cursor: pointer;

  &--success {
    background-color: #f0f9eb;
    color: #67c23a;
  }

  &--error {
    background-color: #fef0f0;
    color: #f56c6c;
  }

  &--warning {
    background-color: #fdf6ec;
    color: #e6a23c;
  }

  &--info {
    background-color: #f4f4f5;
    color: #909399;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
