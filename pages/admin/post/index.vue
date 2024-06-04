<template>
  <div>
    <el-table :data="list" width="100%">
      <el-table-column prop="postId" label="ID" width="100" />
      <el-table-column prop="postTitle" label="标题" align="center" />
      <el-table-column prop="createTime" label="发布时间" :formatter="(row) => formatTime(row.createTime)" align="center"
        width="200" />
      <el-table-column prop="updateTime" label="最后更新时间" :formatter="(row) => formatTime(row.updateTime)" align="center"
        width="200" />
      <el-table-column width="260" fixed="right" align="center">
        <template #default="{ row }">
          <el-button type="info" link>预览</el-button>
          <el-button type="warning" link>编辑</el-button>
          <el-button type="danger" link>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div flex justify-between mt-3>
      <div />
      <el-pagination @current-change="currentChange" v-model:currentPage="page" :page-size="limit"
        layout="prev, pager, next,total" :total="total" background>
      </el-pagination>

    </div>

  </div>
</template>

<script lang="ts" setup>
import type { Post } from '~/types/post';

definePageMeta({
  layout: 'admin',
  middleware: 'login',
})
const router = useRouter()
const userStore = useUserStore()
const page = ref(1)
const limit = ref(10)
const list = ref<Post[]>([])
const total = ref(0)

useFetch('/api/admin/post/list', { method: 'get', params: { page: page.value, limit: limit.value }, headers: { 'Authorization': 'Bearer ' + userStore.token } }).then(({ error, data }) => {
  if (error.value) {
    return
  }
  if (data.value) {
    list.value = data.value.data?.rows ?? []
    total.value = data.value.data?.count ?? 0
  }
})

function currentChange(value: number) {
  router.replace({
    path: '/admin/post',
    query: {
      page: value,
      limit: limit.value,
    },
  })

}
</script>

<style></style>
