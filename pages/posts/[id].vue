<script setup lang="ts">
import type { Post } from '~/types/post';

const router = useRoute()
const path = computed(() => Array.isArray(router.params.id) ? router.params.id.join('/') : router.params.id)
const post = ref<Post>()

await useFetch(`/api/posts/detail`, {
  params: {
    postId: path.value
  }
}).then(({ data }) => {
  if (data.value?.code === 200) {
    post.value = data.value?.data
  }
})

</script>

<template>
  <div class="main-container">
    <div class="post-container">
      <div class="post-title">
        {{ post?.postTitle }}
      </div>
      <div flex="~ row" gap-1 justify-between>
        <div v-if="post?.postTags" class="post-tags">
          <ElTag v-for="tag in post.postTags.split(',').filter(item => item != '')" :key="tag">
            {{ tag }}
          </ElTag>
        </div>
        <div>{{ formatTime(post?.createTime) }}</div>
      </div>
      <div mt-4>
        <PostContent :content="post?.postContent"></PostContent>
      </div>
    </div>
  </div>
</template>
<style lang="postcss" scoped>
.post-container {
  max-width: 980px;
  margin: auto;

  .post-title {
    @apply text-2xl font-bold py-3 my-2;
  }

  .post-tags {
    @apply flex gap-1;
  }
}
</style>
