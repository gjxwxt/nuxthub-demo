<template>
  <button
    class="base-button"
    :class="[variant]"
    :disabled="disabled"
    :type="type"
    @click="emit('click')"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
interface Props {
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

const props = withDefaults(defineProps<Props>(), {
  variant: "primary",
  disabled: false,
  type: "button",
});

const emit = defineEmits<{
  click: [];
}>();
</script>

<style scoped lang="scss">
.base-button {
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;

  &.primary {
    background-color: #4caf50;
    color: white;
    &:hover {
      background-color: #45a049;
    }
  }

  &.secondary {
    background-color: #f5f5f5;
    color: #333;
    &:hover {
      background-color: #e8e8e8;
    }
  }

  &.danger {
    background-color: #f44336;
    color: white;
    &:hover {
      background-color: #da190b;
    }
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}
</style>
