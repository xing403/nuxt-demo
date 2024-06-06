<template>
  <div>
    <el-descriptions>
      <template #title>
        <el-button type="primary" @click="addCategoryDialog = true">新增分类</el-button>
      </template>
    </el-descriptions>
    <el-table :data="list" width="100%">
      <el-table-column prop="categoryId" label="ID" width="100" />
      <el-table-column prop="categoryName" label="分类名称" align="center" />
      <el-table-column prop="createTime" label="发布时间" :formatter="(row) => formatTime(row.createTime)" align="center"
        width="200" />
      <el-table-column prop="updateTime" label="最后更新时间" :formatter="(row) => formatTime(row.updateTime)" align="center"
        width="200" />
      <el-table-column width="260" fixed="right" align="center">
        <template #default="{ row }">
          <el-button type="warning" link @click="handleModify(row)">编辑</el-button>
          <el-button type="danger" link @click="handleDelete(row.categoryId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div flex justify-between mt-3>
      <div />
      <el-pagination @current-change="currentChange" v-model:currentPage="page" :page-size="limit"
        layout="prev, pager, next,total" :total="total" background>
      </el-pagination>

    </div>
    <el-dialog title="添加分类" v-model="addCategoryDialog" width="30%">
      <el-form ref="addCategoryFormRef" :model="addCategoryForm" :rules="categoryFormRules" label-width="100px">
        <el-form-item label="分类名称" prop="categoryName">
          <el-input v-model="addCategoryForm.categoryName" />
        </el-form-item>
        <el-form-item label="分类描述" prop="categoryDesc">
          <el-input v-model="addCategoryForm.categoryDesc" type="textarea" />
        </el-form-item>
        <el-form-item label="分类图标" prop="categoryIcon">
          <el-input v-model="addCategoryForm.categoryIcon" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addCategoryDialog = false">取 消</el-button>
          <el-button type="primary" @click="handleAddCategory">确 定</el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog title="编辑分类" v-model="modifyCategoryDialog" width="30%">
      <el-form ref="modifyCategoryRef" :model="modifyCategoryForm" :rules="categoryFormRules" label-width="100px">
        <el-form-item label="分类名称" prop="categoryName">
          <el-input v-model="modifyCategoryForm.categoryName" />
        </el-form-item>
        <el-form-item label="分类描述" prop="categoryDesc">
          <el-input v-model="modifyCategoryForm.categoryDesc" type="textarea" />
        </el-form-item>
        <el-form-item label="分类图标" prop="categoryIcon">
          <el-input v-model="modifyCategoryForm.categoryIcon" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="modifyCategoryDialog = false">取 消</el-button>
          <el-button type="primary" @click="handleModifyCategory">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import type { Category } from '~/types/category';

definePageMeta({
  layout: 'admin',
  middleware: 'login',
})

const modifyCategoryRef = ref()
const modifyCategoryForm = ref<Category>({ categoryId: 0, categoryName: '', categoryDesc: '', categoryIcon: '' })
const modifyCategoryDialog = ref(false)

const addCategoryDialog = ref(false)
const addCategoryFormRef = ref()
const addCategoryForm = ref<Category>({ categoryName: '', categoryDesc: '', categoryIcon: '' })

const categoryFormRules = {
  categoryName: [
    { required: true, message: '请输入分类名称', trigger: 'blur' },
    { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' },
  ],
}


const router = useRouter()

const page = ref(1)
const limit = ref(10)
const list = ref<Category[]>([])
const total = ref(0)

function handleGetList() {
  useFetch('/api/admin/category/list', { method: 'get', params: { page: page.value, limit: limit.value } }).then(({ error, data }) => {
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
    path: '/admin/category',
    query: {
      page: value,
      limit: limit.value,
    },
  })
  handleGetList()
}
function handleModify(categary: Category) {
  modifyCategoryForm.value = categary

  modifyCategoryDialog.value = true
}

function handleAddCategory() {
  addCategoryFormRef.value && addCategoryFormRef.value.validate(async (valid: boolean) => {
    if (valid) {
      $fetch('/api/admin/category/new', {
        method: 'POST',
        body: addCategoryForm.value,
      }).then((res) => {
        if (res.code === 200) {
          ElMessage.success(res.message)
          addCategoryDialog.value = false
          addCategoryFormRef.value.resetFields()
          handleGetList()
        }
      })
    }
  })
}

function handleModifyCategory() {
  modifyCategoryRef.value && modifyCategoryRef.value.validate(async (valid: boolean) => {
    if (valid) {
      $fetch('/api/admin/category/update', { method: 'post', body: modifyCategoryForm.value }).then((res) => {
        if (res.code === 200) {
          modifyCategoryRef.value.resetFields()
          modifyCategoryDialog.value = false
          handleGetList()
        }
      })
    }
  })
}

function handleDelete(categoryId: number) {
  ElMessageBox.confirm('确定删除该文章吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    $fetch(`/api/admin/category/${categoryId}`, { method: 'delete' }).then((res) => {
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
