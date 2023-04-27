<template>
    <div class=" g-3 col-md-4 col-6" v-for="product in products">
        <div class="card">
            <img :src="getImageUrl('Legend.png')" alt="">

            <div class="content px-3">
                <h3>{{ product.title }}</h3>
                <div class="d-flex justify-content-between">
                    <s>$3000</s>
                    <p>${{ product.price }}</p>
                </div>
                <p>特價:{{ product.inStock ? "有" : "沒有" }}</p>
                {{ getImageUrl('Legend.png') }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue"

function getImageUrl(name: string): string {
    return new URL(`/src/assets/image/${name}`, import.meta.url).href
}




// interface Props {
//     products: [
//         {
//             id: number
//             title: string,
//             origin_price?: number,
//             price: number,
//             imageUrl: string
//             inStock: boolean
//         }
//     ]
// }


// defineProps<Props>()

const props = defineProps<{
    products: [
        {
            id: number
            title: string,
            origin_price?: number,
            price: number,
            imageUrl: string
            inStock: boolean
        }
    ]
}>()





onMounted(() => {
    console.log(props);

})

</script>