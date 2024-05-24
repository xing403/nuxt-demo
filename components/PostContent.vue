<template>
  <div>
    {{ content }}
  </div>
</template>

<script lang="ts" setup>
const { content } = defineProps<{
  content?: string;
}>();


</script>

<style></style>
