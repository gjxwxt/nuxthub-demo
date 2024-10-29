<template>
  <div class="message-container">
    <Message
      v-for="message in messages"
      :key="message.id"
      :type="message.type"
      :content="message.content"
      @close="remove(message.id)"
    />
  </div>
</template>

<script setup lang="ts">
import Message from "./Message.vue";
const { messages, remove } = useMessage();
</script>

<style lang="scss" scoped>
.message-container {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  pointer-events: none;

  :deep(.message) {
    pointer-events: auto;
  }
}
</style>
