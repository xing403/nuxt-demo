<template>
  <div class="post-body" v-html="mdDom">
  </div>
</template>

<script lang="ts" setup>
import markdownIt from 'markdown-it'
defineOptions({
  name: "PostContent",
});
const md = new markdownIt()
const model = defineModel<string>();
const mdDom = md.render(model.value || "");
</script>
