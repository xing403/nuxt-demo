<template>
  <div>
    <el-form :model="form" ref="formRef" :rules="rules" label-position="top">
      <el-row :gutter="20">
        <el-col :span="20">
          <el-form-item prop="postTitle">
            <el-input v-model="form.postTitle" />
          </el-form-item>
          <el-form-item prop="postContent">
            <Editor v-model="form.postContent" />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item prop="postCategory">
            <el-select v-model="form.postCategory" w-full>
              <el-option label="未分组" :value="0" />
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

useFetch<Post>(`/api/admin/post/${postId}`, { method: 'get', headers: { 'Authorization': `Bearer ${userStore.token}` } }).then(({ data, error }) => {
  if (error.value) {
    ElMessage.error(error.value.statusMessage)
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

</script>

<style></style>
