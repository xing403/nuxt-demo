<template>
  <div>
    <el-form :model="form" ref="formRef" :rules="rules" label-position="top">
      <el-row :gutter="20">
        <el-col :span="20">
          <el-form-item prop="postTitle">
            <el-input v-model="form.postTitle" size="large" placeholder="请输入标题" />
          </el-form-item>
          <el-form-item prop="postContent">
            <Editor v-model="form.postContent" />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item prop="postCategory">
            <el-select v-model="form.postCategory" w-full filterable allow-create default-first-option
              :value-on-clear="0" clearable @change="handleChangePostCategory" placeholder="请选择分类">
              <el-option label="未分组" :value="0" />
              <el-option v-for="item in categoryList" :key="item.categoryId" :label="item.categoryName"
                :value="item.categoryId as number" />
            </el-select>
          </el-form-item>
          <el-form-item prop="postTags">
            <el-select v-model="tags" multiple placeholder="文章标签" w-full>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleConfirm">提交</el-button>
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>
  </div>
</template>

<script lang="ts" setup>
import type { Category } from '~/types/category';
import type { Post } from '~/types/post';
definePageMeta({
  middleware: ['login'],
  layout: 'admin'
})
const form = ref<Post>({
  postTitle: '',
  postContent: '',
  postCover: '',
})
const formRef = ref()
const tags = ref<Array<string | number>>([])
const rules = {
  postTitle: [
    { required: true, message: '请输入标题', trigger: 'blur' },
    { min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur' }
  ]
}
const router = useRouter()
const userStore = useUserStore()
const { postId } = useRoute().query
const categoryList = ref<Array<Category>>([])

useFetch<Post>(`/api/admin/post/${postId}`, { method: 'get', headers: { 'Authorization': `Bearer ${userStore.token}` } }).then(({ data, error }) => {
  if (error.value) {
    ElMessage.error(error.value.statusMessage)
    router.push('/admin/post')
    return
  }
  if (data.value) {
    form.value = data.value
    tags.value = data.value.postTags ? data.value.postTags.split(',').filter(item => item != '') : []
  }
})

function handleConfirm() {
  form.value.postTags = tags.value.join(',')
  formRef.value && formRef.value.validate((valid: boolean) => {
    if (valid) {
      $fetch('/api/admin/post/update', {
        method: 'post',
        body: form.value,
        headers: { 'Authorization': `Bearer ${userStore.token}` }
      }).then((res) => {
        console.log(res)
        ElMessage.success('提交成功')
        setTimeout(() => {
          router.back()
        }, 200);
      })
    }
  })
}

useFetch('/api/admin/category/all', { method: 'get' }).then(({ data }) => {
  if (data.value) {
    categoryList.value = data.value.data as Category[]
  }
})
function handleChangePostCategory(categoryName: string | number) {
  if (typeof categoryName === 'string') {

    $fetch('/api/admin/category/new', { method: 'post', body: { categoryName: categoryName } }).then(res => {
      categoryList.value.unshift({ categoryName: categoryName, categoryId: res.data })
    })
  }
}
</script>

<style></style>
