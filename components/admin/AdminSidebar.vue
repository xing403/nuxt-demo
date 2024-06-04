<template>
  <el-menu router h-100vh>
    <el-menu-item index="/admin">首页</el-menu-item>
    <el-menu-item index="/admin/post">我的文章</el-menu-item>
    <el-menu-item index="/admin/category">我的分类</el-menu-item>
    <el-menu-item index="/admin/tags">我的标签</el-menu-item>
    <el-menu-item index="/">返回前台</el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
const route = useRoute()
</script>

<style></style>
