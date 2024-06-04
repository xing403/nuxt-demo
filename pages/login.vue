<template>
  <div flex items-center h-screen flex-wrap bg-warm-gray-1>
    <div class="login-bg" flex-1>

    </div>
    <div class="login-container">
      <div v-show="formType === 'login'">
        <el-form :model="form" ref="loginRef" :rules="loginRules" label-position="top">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="form.username" />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="form.password" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleLogin" w-full>登录</el-button>
          </el-form-item>
          <el-form-item>
            还没有账号？<el-button type="primary" @click="formType = 'register'" text>注册</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div v-show="formType === 'register'">
        <el-form :model="register" ref="registerRef" :rules="registerRules" label-position="top">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="register.username" placeholder="请输入用户名" />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="register.password" type="password" placeholder="请输入密码" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleRegister" w-full>注册</el-button>
          </el-form-item>
          <el-form-item>
            已有帐号?<el-button type="primary" @click="formType = 'login'" text>返回登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>
import type { User } from '~/types/user';
definePageMeta({
  layout: false
})
const formType = ref<'login' | 'register'>('login')
const loginRef = ref()
const loginRules = {}
const userStore = useUserStore()
const form = ref<User>({
  username: '',
  password: '',
})

const redirect = computed(() => useRoute().query.redirect as string ?? '/')

function handleLogin() {
  loginRef.value.validate((valid: boolean) => {
    if (valid) {
      useFetch('/api/user/login', { method: 'POST', body: form.value }).then(({ data, error }) => {
        if (error.value) {
          return ElMessage.error(error.value.data.message)
        }
        if (data.value) {
          userStore.token = data.value.data.token
          userStore.username = data.value.data.username
          ElMessage.success(data.value.message)
          userStore.getUserInfo()
          useRouter().replace(redirect.value)
          localStorage.setItem('token', data.value.data.token)
        }
      })
    }
  })
}
const registerRef = ref()
const registerRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
  ],
}
const register = ref<User>({
  username: '',
  password: '',
})
function handleRegister() {
  registerRef.value.validate((valid: boolean) => {
    if (valid) {
      useFetch('/api/user/register', { method: 'POST', body: register.value }).then(({ data, error }) => {
        if (error.value) {
          return ElMessage.error(error.value.data.message)
        }
        ElMessage.success(data.value?.message)
      })
    }
  })
}
</script>

<style lang="postcss">
.login-container {
  @apply flex flex-col justify-center h-screen bg-white px-2;

  &>div {
    @apply w-75 mx-5;
  }

}
</style>
