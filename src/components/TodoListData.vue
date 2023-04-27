<template>
    <ul class="tab">
        <li :class="{ active: currentState == state.title }" @click="currentState = state.title" v-for="state in states"
            :key="state.id">
            {{ state.title }}
        </li>
    </ul>
    <div class="cart_content">
        <ul class="list">
            <template v-if="currentState == '全部'">
                <li v-for="list in props.todoList" :key="list.id">
                    <label class="checkbox" for="">
                        <input type="checkbox" :checked="list.isCompleted" @click="isCompleted(list)" />
                        <span>{{ list.content }}</span>
                    </label>
                    <a href="#" class="delete" @click.prevent="deleteTodoList(list.id)"></a>
                </li>
            </template>
            <template v-else-if="currentState == '待完成' || '已完成'">
                <li v-for="list in visibleTodoList" :key="list.id">
                    <label class="checkbox" for="">
                        <input type="checkbox" :checked="list.isCompleted" @click="isCompleted(list)" />
                        <span>{{ list.content }}</span>
                    </label>
                    <a href="#" class="delete" @click.prevent="deleteTodoList(list.id)"></a>
                </li>
            </template>
        </ul>
        <div class="list_footer">
            <p>{{ getTodoListNum }}個待完成項目</p>
            <a href="#" @click.prevent="deleteCompleted">清除已完成項目</a>
        </div>

    </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { onMounted, ref, watch, type Ref, toRefs, toRef } from 'vue'
//state
const states = ref([
    {
        id: 1,
        title: "全部"
    },
    {
        id: 2,
        title: "待完成"
    },
    {
        id: 3,
        title: "已完成"
    }
])

//getTodoList
const emit = defineEmits(['getTodoList', 'deleteCompleted'])

const getTodoList = () => {
    emit('getTodoList')
}
//deleteCompleted
const deleteCompleted = () => {
    emit('deleteCompleted')
}
const currentState = ref("全部")

const visibleTodoList = ref<TodoList[]>([])
watch(currentState, (newVal) => {
    if (newVal == "待完成") {
        visibleTodoList.value = props.todoList.filter((item) => {
            return item.isCompleted === false
        })
    }
    else if (newVal == "已完成") {
        visibleTodoList.value = props.todoList.filter((item) => {
            return item.isCompleted === true
        })
    }
    else {
        getTodoList()
        visibleTodoList.value = props.todoList.filter((item) => {
            return item.isCompleted === false
        })
    }
})
//props
interface TodoList {

    id?: number,
    content: string,
    isCompleted: boolean
}

interface Props {
    todoList: TodoList[],
    getTodoListNum: Ref<number> | number
}

const props = defineProps<Props>()
const { todoList, getTodoListNum } = toRefs(props)


//delete
const deleteTodoList = async (id: number | undefined) => {
    await axios.delete(`https://type-script-demo.vercel.app/todoList/${id}`)
        .then((res) => {
            console.log('delete', res.data);
            getTodoList()
        })
        .catch(function (error) {
            console.log(error)
        })
}


//isCompleted
const isCompleted = async (list: TodoList) => {
    list.isCompleted = !list.isCompleted
    await axios.patch(`https://type-script-demo.vercel.app/todoList/${list.id}`, list)
        .then((res) => {
            console.log(res.data);
            getTodoList()
        })
        .catch(function (error) {
            console.log(error)
        })
}

//deleteAll 

</script>