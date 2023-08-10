<template>
  <div v-bind="containerProps" style="height: 1000px">
    <div class="card-list" v-bind="wrapperProps">
      <div v-for="product in list" :key="product.index" class="card-list-item">
        <Card :product="product.data" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useVirtualList } from "@vueuse/core";
const props = defineProps(["products"]);
const { products } = toRefs(props);

const { list, containerProps, wrapperProps } = useVirtualList(products, {
  itemHeight: 220,
});
</script>

<style scoped>
.card-list {
  width: 100%;
}

.card-list-item {
  height: 20rem;
  margin-bottom: 2rem;
}
</style>
