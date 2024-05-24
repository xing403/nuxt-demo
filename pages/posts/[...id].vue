<script setup lang="ts">
const router = useRoute()
const path = computed(() => Array.isArray(router.params.id) ? router.params.id.join('/') : router.params.id)
</script>

<template>
  <div>
    {{ path }}
  </div>
</template>
