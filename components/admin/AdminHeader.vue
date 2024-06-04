<template>
  <div flex="~ row" h-full justify-between items-center>
    <div></div>
    <div>{{ userStore.username }}</div>
  </div>
</template>

<script lang="ts" setup>
const userStore = useUserStore()
</script>

<style></style>
