<script setup lang="ts">
import type { Post } from '~/types/post';

const post = ref<Post>()
const route = useRoute()

if (Array.isArray(route.params.id) && route.params.id.length === 1) {
  const [id] = route.params.id
  if (!isNaN(Number(id))) {
    await useLazyAsyncData('posts-detail', () => $fetch('/api/posts/detail', {
      params: {
        postId: Number(id)
      },
    })).then(({ data }) => {
      if (data.value?.code === 200) {
        post.value = data.value?.data
      }
    })
  }
}

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
        <div>{{ formatTime(post?.createTime, 'YYYY-MM-DD HH:mm') }}</div>
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
