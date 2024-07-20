<script setup lang="ts">
import Skeleton from './components/Skeleton.vue';
</script>

<template>
  <div class="container">
    <Skeleton width="18rem" height="2rem" borderRadius="1rem" />
    <Skeleton width="14rem" height="1rem" borderRadius=".25rem" />
    <Skeleton width="14rem" height="1rem" borderRadius=".1rem" />
    <Skeleton width="14rem" height="1rem" />
  </div>
</template>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
}
</style>
