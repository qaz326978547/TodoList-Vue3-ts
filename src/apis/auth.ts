import { $http, isResponseOK, asyncDo } from '@/untils/https'

export namespace ApiAuth {
  export async function register(data: { name: string; password: string; email: string }) {
    const [err, result] = await asyncDo($http<any>('post', '/auth/register', data))
    if (!isResponseOK(err, result, true)) return null
    return result
  }

  export async function login(data: { name: string; password: string; email: string }) {
    const [err, result] = await asyncDo($http<any>('post', '/auth/login'))
    if (!isResponseOK(err, result, true)) return null
    return result
  }
}
