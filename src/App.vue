<template>
  <div class="container">
    <h1>TODO LIST</h1>
    <div class="card input">
      <input type="text" placeholder="請輸入待辦事項" v-model="textInput" @keyup.enter="addList" />
      <a href="#" class="btn_add" @click.prevent="addList">+</a>
    </div>
    <div class="card card_list">
      <todo-list-data
        @deleteCompleted="deleteCompleted"
        :getTodoListNum="getTodoListNum"
        :todoList="todoList"
        @getTodoList="getTodoList"
      ></todo-list-data>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { onMounted, ref } from 'vue'
import TodoListData from './components/TodoListData.vue'
onMounted(() => {
  getTodoList()
})

interface TodoList {
  id?: number
  content: string
  isCompleted: boolean
}

const todoList = ref<TodoList[]>([])

const getTodoListNum = ref<number>(0)
const getTodoList = () => {
  axios
    .get('https://type-script-demo.vercel.app/todoList')
    .then((res) => {
      console.log(res.data)
      todoList.value = res.data
      const unCompletedNum = todoList.value.filter((item) => {
        return item.isCompleted === false
      })
      getTodoListNum.value = unCompletedNum.length
      console.log(getTodoListNum.value)

      console.log('todolist', todoList.value)
    })
    .catch(function (error) {
      console.log(error)
    })
}

const checkbox = ref(false)
const textInput = ref('')
//add
const addList = async () => {
  const todoList: TodoList = {
    content: textInput.value,
    isCompleted: checkbox.value ? true : false
  }
  if (textInput.value !== '') {
    await axios
      .post('https://type-script-demo.vercel.app/todoList', todoList)
      .then((res) => {
        console.log('post', res.data)
        textInput.value = ''
        getTodoList()
      })
      .catch(function (error) {
        console.log(error)
      })
  } else {
    alert('請輸入文字')
  }
}
//deleteCompleted
const deleteCompleted = async () => {
  todoList.value.filter((item) => {
    if (item.isCompleted === true) {
      axios.delete(`https://type-script-demo.vercel.app/todoList/${item.id}`).then((res) => {
        console.log(res.data)
        getTodoList()
      })
    }
  })

  // axios.delete("https://type-script-demo.vercel.app/todoList")
  //   .then((res) => {
  //     console.log(res.data);
  //     console.log('已清除');

  //     console.log(todoList.value);

  //   })
  //   .catch((error) => {
  //     console.log(error);

  //   })
}
</script>
<style>
h1 {
  text-align: center;
}
</style>
