<script setup lang="ts">
import zhCn from 'element-plus/es/locale/lang/zh-cn'
const locale = ref(zhCn)
</script>
<template>
  <el-config-provider :locale="locale">
    <DevOnly>
      <el-affix fixed z-9999 bottom-0 right-0 w-200px>
        <el-alert title="开发中" type="warning" effect="light" show-icon :closable="false" />
      </el-affix>
    </DevOnly>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </el-config-provider>
</template>
