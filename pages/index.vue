<template>
  <div class="main-container">
    <div v-infinite-scroll="getPostsList" class="post-list" :infinite-scroll-disabled="isLoading">
      <NuxtLink class="post-item" v-for="post in list" :key="post.postId" :to="`posts/${post.postId}`">
        <div class="post-title">{{ post.postTitle }}</div>
        <div class="post-create-time">{{ formatTime(post.createTime, "YYYY-MM-DD") }}</div>
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Post } from '~/types/post';

const page = ref(1)
const pageSize = ref(10)
const list = ref<Post[]>([])
const total = ref(0)
const isLoading = ref(false)
function getPostsList() {
  isLoading.value = true
  useAsyncData('posts-list', () => $fetch('/api/posts/list', {
    method: 'get',
    params: {
      page: page.value,
      pageSize: pageSize.value
    }
  })).then(({ data }) => {
    total.value = data.value?.data?.count || 0
    list.value.push(...(data.value?.data?.rows || []))
  }).finally(() => {
    page.value += 1
    if (list.value.length < total.value) {
      isLoading.value = false
    }
  })
}

</script>

<style lang="postcss" scoped>
.post-list {
  @apply max-w-820px m-auto;

  .post-item {
    @apply flex flex-row gap-2;
    @apply ml-3em line-height-loose;

    @apply text-gray-400 dark:text-gray-600;

    .post-title {
      @apply text-xl font-600;
    }

    .post-create-time {
      @apply text-warmgray-400 text-sm;
      @apply 'hover:text-gray-500';
    }

    &+& {
      @apply pt-2em;
    }

    &:hover {
      @apply text-black dark:text-gray-200;
    }
  }
}
</style>
