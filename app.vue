<script setup lang="ts">
import zhCn from 'element-plus/es/locale/lang/zh-cn'
const userStore = useUserStore()
const locale = ref(zhCn)
onMounted(async () => {
  await nextTick()
  const token = localStorage.getItem('token')
  if (!!token) {
    userStore.token = token
    userStore.getUserInfo()
  }
})
</script>
<template>
  <el-config-provider :locale="locale">
    <DevOnly>
      <el-affix>
        <el-alert title="开发中" type="warning" effect="light" show-icon :closable="false" />
      </el-affix>
    </DevOnly>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </el-config-provider>
</template>
