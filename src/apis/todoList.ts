import { $http, isResponseOK, asyncDo } from '@/untils/https'

export namespace TodoList {
  export async function getAllTodoList() {
    const [err, result] = await asyncDo($http<any>('get', '/todos'))
    if (!isResponseOK(err, result, true)) return null
    return result
  }
}
