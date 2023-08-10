<template>
  <div class="product-page">
    <SideBar />
    <CardList :products="productList" />
  </div>
</template>

<script setup>
definePageMeta({
  layout: "custom",
});

const route = useRoute();
const productList = ref([]);

const keyword = computed(() => route.query.keyword);
const category = computed(() => route.query.category);
const brands = computed(() => route.query.brands);
const minPrice = computed(() => route.query.minPrice);
const maxPrice = computed(() => route.query.maxPrice);

async function fetchProducts() {
  const { filteredData } = await useFetchProducts(keyword, {
    category,
    brands,
    minPrice,
    maxPrice,
  });
  productList.value = filteredData.value;
}

fetchProducts();

watch([keyword, category, brands, minPrice, maxPrice], fetchProducts, {
  immediate: true,
});
</script>

<style scoped>
.product-page {
  max-height: 80vh;
  display: flex;
  gap: 5rem;
}
</style>
