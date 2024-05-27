<script setup lang="ts">
const router = useRoute()
const path = computed(() => Array.isArray(router.params.all) ? router.params.all.join('/') : router.params.all)
</script>

<template>
  <div>
    the page {{ path }} is 404
  </div>
</template>
