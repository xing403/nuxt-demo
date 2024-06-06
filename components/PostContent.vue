<template>
  <ClientOnly>
    <div class="post-body">
      <mavon-editor class="z-1" v-model="model" w-full h-auto :editable="false" :toolbarsFlag="false" :subfield="false"
        :boxShadow="false" defaultOpen="preview" />
    </div>
  </ClientOnly>
</template>

<script lang="ts" setup>
const model = defineModel()

</script>
