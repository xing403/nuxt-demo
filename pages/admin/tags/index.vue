<template>
  <div>
    <el-descriptions>
      <template #title>
        <el-button type="primary" @click="addTagDialog = true">新增标签</el-button>
      </template>
    </el-descriptions>
    <el-table :data="list" width="100%">
      <el-table-column prop="tagId" label="ID" width="100" />
      <el-table-column prop="tagName" label="标签名称" align="center" />
      <el-table-column prop="createTime" label="发布时间" :formatter="(row) => formatTime(row.createTime)" align="center"
        width="200" />
      <el-table-column prop="updateTime" label="最后更新时间" :formatter="(row) => formatTime(row.updateTime)" align="center"
        width="200" />
      <el-table-column width="260" fixed="right" align="center">
        <template #default="{ row }">
          <el-button type="warning" link @click="handleModify(row)">编辑</el-button>
          <el-button type="danger" link @click="handleDelete(row.tagId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div flex justify-between mt-3>
      <div />
      <el-pagination @current-change="currentChange" v-model:currentPage="page" :page-size="limit"
        layout="prev, pager, next,total" :total="total" background>
      </el-pagination>

    </div>
    <el-dialog title="添加标签" v-model="addTagDialog" width="30%">
      <el-form ref="addTagFormRef" :model="addTagForm" :rules="TagFormRules" label-width="100px">
        <el-form-item label="标签名称" prop="tagName">
          <el-input v-model="addTagForm.tagName" />
        </el-form-item>
        <el-form-item label="标签图标" prop="TagIcon">
          <el-input v-model="addTagForm.tagIcon" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addTagDialog = false">取 消</el-button>
          <el-button type="primary" @click="handleAddTag">确 定</el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog title="编辑标签" v-model="modifyTagDialog" width="30%">
      <el-form ref="modifyTagRef" :model="modifyTagForm" :rules="TagFormRules" label-width="100px">
        <el-form-item label="标签名称" prop="tagName">
          <el-input v-model="modifyTagForm.tagName" />
        </el-form-item>
        <el-form-item label="标签图标" prop="tagIcon">
          <el-input v-model="modifyTagForm.tagIcon" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="modifyTagDialog = false">取 消</el-button>
          <el-button type="primary" @click="handleModifyTag">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import type { Tag } from '~/types/tag';

definePageMeta({
  layout: 'admin',
  middleware: 'login',
})

const modifyTagRef = ref()
const modifyTagForm = ref<Tag>({ tagId: 0, tagName: '', tagIcon: '' })
const modifyTagDialog = ref(false)

const addTagDialog = ref(false)
const addTagFormRef = ref()
const addTagForm = ref<Tag>({ tagName: '', tagIcon: '' })

const TagFormRules = {
  TagName: [
    { required: true, message: '请输入分类名称', trigger: 'blur' },
    { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' },
  ],
}


const router = useRouter()

const page = ref(1)
const limit = ref(10)
const list = ref<Tag[]>([])
const total = ref(0)

function handleGetList() {
  useFetch('/api/admin/tag/list', { method: 'get', params: { page: page.value, limit: limit.value } }).then(({ error, data }) => {
    if (error.value) {
      return
    }
    if (data.value) {
      list.value = data.value.data?.rows ?? []
      total.value = data.value.data?.count ?? 0
    }
  })
}

function currentChange(value: number) {
  router.replace({
    path: '/admin/tags',
    query: {
      page: value,
      limit: limit.value,
    },
  })
  handleGetList()
}
function handleModify(categary: Tag) {
  modifyTagForm.value = categary

  modifyTagDialog.value = true
}

function handleAddTag() {
  addTagFormRef.value && addTagFormRef.value.validate(async (valid: boolean) => {
    if (valid) {
      $fetch('/api/admin/tag/new', {
        method: 'POST',
        body: addTagForm.value,
      }).then((res) => {
        if (res.code === 200) {
          ElMessage.success(res.message)
          addTagDialog.value = false
          addTagFormRef.value.resetFields()
          handleGetList()
        }
      })
    }
  })
}

function handleModifyTag() {
  modifyTagRef.value && modifyTagRef.value.validate(async (valid: boolean) => {
    if (valid) {
      $fetch('/api/admin/tag/update', { method: 'post', body: modifyTagForm.value }).then((res) => {
        if (res.code === 200) {
          modifyTagRef.value.resetFields()
          modifyTagDialog.value = false
          handleGetList()
        }
      })
    }
  })
}

function handleDelete(tagId: number) {
  ElMessageBox.confirm('确定删除该文章吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    $fetch(`/api/admin/tag/${tagId}`, { method: 'delete' }).then((res) => {
      if ((page.value - 1) * limit.value > total.value - 1)
        page.value = page.value - 1
      ElMessage.success(res.message)
      handleGetList()
    }).catch(() => {
      console.dir('删除失败')
    })
  }).catch(() => { })
}

handleGetList()
</script>

<style></style>
