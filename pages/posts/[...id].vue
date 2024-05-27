<script setup lang="ts">
import type { Post } from '~/types/post';

const post = ref<Post>({
  postId: 0,
  postContent: '',
  createBy: '',
  createTime: undefined,
  postTags: '',
  postTitle: '',
  updateBy: '',
  updateTime: '',
  isDelete: '0',
})
const isNotFound = ref(false)
const route = useRoute()

if (Array.isArray(route.params.id) && route.params.id.length === 1) {
  const [id] = route.params.id
  if (!isNaN(Number(id))) {
    await useLazyAsyncData('posts-detail', () => $fetch('/api/posts/detail', {
      params: {
        postId: Number(id)
      },
    })).then(({ data }) => {
      if (data.value === null) {
      } else if (data.value?.code === 200 && data.value?.data) {
        post.value = data.value.data
      } else {
        isNotFound.value = data.value.code === 404
      }
    })
  } else {
    isNotFound.value = true
  }
}

</script>

<template>
  <div class="main-container">
    <NotFound v-if="isNotFound" />
    <div v-else class="post-container">
      <div class="post-title">
        {{ post.postTitle }}
      </div>
      <div flex="~ row" gap-1 justify-between>
        <div class="post-tags">
          <ElTag v-for="tag in (post.postTags ?? '').split(',').filter(item => item != '')" :key="tag">
            {{ tag }}
          </ElTag>
        </div>
        <div>{{ formatTime(post.createTime, 'YYYY-MM-DD HH:mm') }}</div>
      </div>
      <div mt-4>
        <PostContent v-model="post.postContent" />
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
