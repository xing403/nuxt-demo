<template>
  <el-container>
    <el-aside width="200px">
      <admin-sidebar />
    </el-aside>
    <el-container>
      <el-header>
        <admin-header />
      </el-header>
      <el-main>
        <slot />
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>

</script>

<style></style>
