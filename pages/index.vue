<template>
  <div class="container">
    <h1>欢迎使用 Nuxt 3</h1>

    <div class="demo-section">
      <h2>按钮组件演示</h2>
      <div class="button-group">
        <BaseButton variant="primary" @click="increment">
          计数器 +1
        </BaseButton>
        <BaseButton variant="secondary" @click="decrement">
          计数器 -1
        </BaseButton>
        <BaseButton variant="danger" @click="reset"> 重置计数器 </BaseButton>
      </div>
      <p>当前计数：{{ count }}</p>
      <p>当前时间：{{ formatDate(new Date()) }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatDate } from "~/utils/format";
import { useCounter } from "~/composables/useCounter";
import BaseButton from "~/components/common/BaseButton.vue";

// 确保解构出所有需要的值
const { count, increment, decrement, reset } = useCounter(0);
</script>

<style scoped lang="scss">
.container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.demo-section {
  margin-top: 2rem;
  padding: 1rem;
  border: 1px solid #eee;
  border-radius: 8px;
}

.button-group {
  display: flex;
  gap: 1rem;
  margin: 1rem 0;
}
</style>
