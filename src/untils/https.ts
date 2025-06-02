// utils/http.ts
import axios from 'axios'
import type { AxiosRequestConfig } from 'axios' // 使用 type 匯入

type Method = 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head' // 定義 HTTP 方法類型
const apiUrl = 'http://localhost:8080'
export const apiBaseUrl = `${apiUrl}/api`
const apiTimeoutSec = 10

const ajax = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  },
  timeout: apiTimeoutSec * 1000
})

/**
 * 🔐 全局攔截器設定
 */
ajax.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

ajax.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      alert('請先登入')
      // window.location.href = '/auth' // ✅ 你自訂的登入頁面路徑
    }
    return Promise.reject(error)
  }
)

/**
 * 🌐 通用 HTTP 請求封裝
 */
export async function $http<T = any>(method: Method, url: string, ...payload: any[]): Promise<T> {
  const requestData: AxiosRequestConfig = { url, method }

  if (method.toLowerCase() === 'get') {
    requestData.params = payload[0]
  } else {
    requestData.data = payload[0]
    requestData.params = payload[1]
  }

  try {
    const response = await ajax.request<T>(requestData)
    return response.data
  } catch (err: any) {
    if (err.response) {
      throw err.response
    }
    throw err
  }
}

/**
 * 🧪 判斷是否請求成功
 */
export function isResponseOK(err: any, result: any, alertError: boolean = false) {
  if (err && !result) {
    console.warn(err, result)
    if (err.status === 401) {
      alert(err.data.message)
      return false
    }
    if (alertError) {
      const errData = err.data
      let message = ''
      if (typeof errData === 'string') {
        message = errData
      } else {
        message = errData.message
        try {
          alert(JSON.stringify(errData))
        } catch (err) {
          console.error(err)
        }
      }
      alert(message)
    }
    return false
  }
  return true
}

/**
 * 📦 async/await Promise 錯誤包裝
 */
export function asyncDo<T, E = any>(promise: Promise<T>): Promise<[undefined, T] | [E, undefined]> {
  return promise.then<[undefined, T]>((res) => [undefined, res]).catch((err) => [err, undefined])
}
