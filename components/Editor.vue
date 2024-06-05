<template>
  <ClientOnly>
    <mavon-editor ref="mdRef" v-model="content" w-full h-800px />
  </ClientOnly>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: string,
}>()
const content = toRef(props.modelValue)
const mdRef = ref()

watch(props, ({ modelValue }) => {
  if (content.value != modelValue) {
    content.value = modelValue
  }
})

</script>
