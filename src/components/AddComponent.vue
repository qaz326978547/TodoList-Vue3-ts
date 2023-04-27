<template>
    <div>
        <button class="btn btn-primary" @click="handleAddClick(1, 2)">
            ++++
        </button>
    </div>
</template>

<script setup lang="ts">


const handleAddClick = (a: Number, b: Number) => {
    console.log('使用到emit囉');
}

const emit = defineEmits<{
    (e: 'change', country: string): void
    (e: 'update', country: string): void
}>()

</script>