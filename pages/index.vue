<template>
  <div class="main-container">
    <div v-infinite-scroll="getPostsList" class="post-list" :infinite-scroll-disabled="isLoading">
      <NuxtLink class="post-item" v-for="post in list" :key="post.postId" :to="`posts/${post.postId}`">
        <div v-if="post.postCover" class="post-cover" w-200px h-150px>
          <el-image :src="post.postCover" class="post-cover-img" style="width: 200px;height: 150px;" fit="cover" />
        </div>
        <div class="post-content">
          <h2 class="post-title">{{ post.postTitle }}</h2>
          <span :class="[post.postCover ? 'w-600px' : 'w-820px']" h-4em line-clamp-3>
            {{ post.postContent }}
          </span>
          <div class="post-desc" flex="~ row" gap-2>
            <div class="desc-item post-viewer">
              <div class="label-class">
                <span>阅读量</span>
                <Icon name="carbon:view" />
              </div>
              <span>{{ post.postViewer }}</span>
            </div>
            <div class="desc-item post-collect">
              <div class="label-class">
                <span>收藏量</span>
                <Icon name="mdi:bookmark-box-multiple-outline" />
              </div>
              <span>{{ post.postCollect }}</span>
            </div>
            <div class="desc-item post-star">
              <div class="label-class">
                <span>点赞量</span>
                <Icon name="mdi:thumb-up-outline" />
              </div>
              <span>{{ post.postStar }}</span>
            </div>
            <div class="desc-item post-star">
              <div class="label-class">
                <span>发布日期</span>
              </div>
              <span>{{ formatTime(post.createTime, 'YYYY-MM-DD') }}</span>
            </div>
          </div>
        </div>
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
  useFetch('/api/posts/list', {
    method: 'get',
    params: {
      page: page.value,
      pageSize: pageSize.value
    }
  }).then(({ data, error }) => {
    if (error) {

    }
    if (data.value) {
      total.value = data.value?.data?.count || 0
      list.value.push(...(data.value?.data?.rows || []))
    }
  }).finally(() => {
    page.value += 1
    if (list.value.length < total.value) {
      isLoading.value = false
    }
  })
}

</script>

<style lang="postcss">
.post-list {
  @apply max-w-820px m-auto;
}

.post-item {
  @apply flex gap-5 w-100% my-2 p-2;
  @apply b-b-warmgray-200 b-b-1px b-b-solid;

  .post-cover {
    @apply flex-shrink-0;
  }

  .post-content {
    @apply flex-1;

    .post-title {
      @apply text-xxl font-bold my-2;
    }

    .desc-item {
      @apply flex items-center gap-2 text-gray text-sm my-2;

      .label-class {
        @apply flex items-center gap-0.5;
      }
    }
  }
}
</style>
