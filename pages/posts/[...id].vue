<script setup lang="ts">
import type { Post } from '~/types/post';
import type { Tag } from '~/types/tag';

const post = ref<Post>({
  postTitle: '',
  postContent: '',
  postTags: ''
})
const tags = ref<Tag[]>([])

const userStore = useUserStore()
const isNotFound = ref(false)
const route = useRoute()

if (Array.isArray(route.params.id) && route.params.id.length === 1) {
  const [id] = route.params.id
  if (!isNaN(Number(id))) {
    await useFetch('/api/posts/detail', { params: { postId: id } }).then(({ data, error }) => {
      if (error.value) {
        isNotFound.value = true
      }

      if (data.value?.data) {
        post.value = data.value.data
      }
    })

    await useFetch('/api/tags/getTagNames', { method: 'get', params: { postId: id } }).then(({ data, error }) => {
      if (data.value) {
        tags.value = data.value.data as Tag[]
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
      <div class="post-header" flex="~ row" gap-1 justify-between items-center>
        <div class="post-title">
          {{ post.postTitle }}
        </div>
        <div v-if="userStore.isLogin && userStore.username === post.createBy">
          <el-link :href="'/admin/post/write?postId=' + post.postId" type="warning">编辑</el-link>
        </div>
      </div>
      <div class="post-tags">
        <ElTag v-for="tag in tags" :key="tag.tagId">{{ tag.tagName }}</ElTag>
      </div>
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

  .desc-item {
    @apply flex items-center gap-2 text-gray text-sm my-2;

    .label-class {
      @apply flex items-center gap-0.5;
    }
  }
}
</style>
