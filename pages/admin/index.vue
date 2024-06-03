<template>
  <div>
    hello world, this is admin/index page
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: ['login'],
  layout: 'admin'
})
</script>

<style></style>
