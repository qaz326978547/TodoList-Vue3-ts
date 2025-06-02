<template>
  <div>
    <label for="">帳號</label>
    <input type="text" v-model="userData.name" placeholder="請輸入帳號" />
    <label for="">密碼</label>
    <input type="password" v-model="userData.password" placeholder="請輸入密碼" />
    <label for="">電子郵件</label>
    <input type="email" v-model="userData.email" placeholder="請輸入電子郵件" />
    <button @click="register">註冊</button>
    <button @click="login">登入</button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ApiAuth } from '@/apis/auth'

const userData = ref({
  name: '',
  password: '',
  email: ''
})

const register = async () => {
  const { name, password, email } = userData.value
  if (name && password && email) {
    try {
      const response = await ApiAuth.register(userData.value)
      console.log(response)
    } catch (error) {
      console.error(error)
    }
  } else {
    alert('請填寫所有欄位')
  }
}

const login = async () => {
  const { name, password, email } = userData.value
  if (name && password && email) {
    try {
      const response = await ApiAuth.login(userData.value)
      console.log(response)
    } catch (error) {
      console.error(error)
    }
  } else {
    alert('請填寫所有欄位')
  }
}
</script>
