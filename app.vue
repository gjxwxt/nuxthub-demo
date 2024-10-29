<template>
  <div>
    <MessageContainer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import MessageContainer from "~/components/common/MessageContainer.vue";
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
}
</style>
