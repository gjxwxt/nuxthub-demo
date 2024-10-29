<template>
  <div class="container">
    <h1>用户列表</h1>
    <div v-if="pending">加载中...</div>
    <div v-else-if="error">{{ error.message }}</div>
    <div v-else class="user-list">
      <div v-for="user in data?.users" :key="user.id" class="user-item">
        <h3>{{ user.username }}</h3>
        <p>{{ user.email }}</p>
        <small>注册时间：{{ formatDate(user.created_at) }}</small>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { User } from "~/server/types";

interface ApiResponse {
  users: User[];
}

const { data, pending, error } = await useFetch<ApiResponse>("/api/users");
</script>

<style scoped lang="scss">
.user-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  padding: 1rem;
}

.user-item {
  padding: 1rem;
  border: 1px solid #eee;
  border-radius: 8px;

  h3 {
    margin: 0 0 0.5rem;
  }

  p {
    margin: 0 0 0.5rem;
    color: #666;
  }

  small {
    color: #999;
  }
}
</style>
