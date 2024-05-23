<template>
  <div>
    <el-button @click="handleChangeUsernameOnClick">change username</el-button>
    {{ userStore.username }}
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from '~/stores/user';

const userStore = useUserStore();
function handleChangeUsernameOnClick() {
  userStore.username = 'new username';
}
</script>

<style></style>
