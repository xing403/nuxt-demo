<template>
  <el-affix>
    <el-header>
      <el-menu mode="horizontal" router :ellipsis="false">
        <el-menu-item index="/">
          首页
        </el-menu-item>
        <div flex-grow h-full flex flex-col justify-center items-center>
          <el-input style="width: 800px;">
            <template #append>
              <el-button>
                搜索
              </el-button>
            </template>
          </el-input>
        </div>
        <el-menu-item v-if="!userStore.isLogin" :index="`/login?redirect=${route.fullPath}`">未登录</el-menu-item>
        <el-sub-menu v-else index="2">
          <template #title>{{ userStore.username }}</template>
          <el-menu-item index="/admin">进入后台</el-menu-item>

        </el-sub-menu>
      </el-menu>
    </el-header>
  </el-affix>
</template>

<script lang="ts" setup>
const userStore = useUserStore()
const route = useRoute()
</script>

<style></style>
