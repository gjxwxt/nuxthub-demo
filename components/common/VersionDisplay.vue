<template>
  <div class="version-display">v{{ version }}</div>
</template>

<script setup lang="ts">
const { version, fetchVersion } = useVersion();

onMounted(() => {
  fetchVersion();
});
</script>

<style lang="scss" scoped>
.version-display {
  position: fixed;
  bottom: 16px;
  right: 16px;
  padding: 4px 8px;
  background-color: rgba(0, 0, 0, 0.2);
  color: white;
  border-radius: 4px;
  font-size: 12px;
  user-select: none;
}
</style>
