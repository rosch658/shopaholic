<template>
  <div class="side-bar">
    <!-- Category -->
    <div class="options">
      <p class="filter">Catagory</p>
      <p class="selected-option" @click="handleModal('category')">
        {{ route.query.category || "All" }}
      </p>
      <div class="option-box" v-if="modal.category">
        <div
          v-for="category in categories"
          :key="category"
          class="category"
          :class="category === route.query.category ? 'selected' : ''"
          @click="handleCategory(category)"
        >
          {{ category }}
        </div>
      </div>
    </div>
    <!-- Category -->

    <!-- Brand -->
    <div class="options">
      <p class="filter">Brand</p>
      <p class="selected-option" @click="handleCheckbox">
        {{ selectedBrandText }}
      </p>
      <div class="option-box" v-if="modal.brand">
        <div class="checkbox" v-for="brand in brands" :key="brand">
          <input
            type="checkbox"
            id="brand"
            v-model="checkboxValue"
            :value="brand"
          />
          <label for="brand"> {{ brand }}</label>
        </div>
      </div>
    </div>
    <!-- Brand -->

    <!-- Price -->
    <div class="options option-last">
      <p class="filter">Price</p>
      <p class="selected-option" @click="handleModal('price')">
        {{ priceRangeText }}
      </p>
      <div class="option-box price-box" v-if="modal.price">
        <input type="text" placeholder="Min" v-model="priceRange.min" />
        <input type="text" placeholder="Max" v-model="priceRange.max" />
        <button @click="handlePrice">Submit</button>
      </div>
    </div>
    <!-- Price -->
  </div>
</template>

<script setup>
import axios from "axios";

const route = useRoute();
const router = useRouter();

// Modal
const modal = reactive({
  category: false,
  brand: false,
  price: false,
});
function handleModal(option) {
  const filters = ["category", "brand", "price"];
  filters.forEach((filter) => {
    if (option === filter) modal[option] = !modal[option];
    else modal[filter] = false;
  });
}

// Category
const { categories, brands, fetchBrands } = await useSideBar();
const selectedCategory = ref(route.query.category || "All");
function handleCategory(selection) {
  handleModal("category");
  router.push({
    query: {
      keyword: route.query.keyword,
      category: selection || route.query.category,
      brands: route.query.brands ? "all" : route.query.brands,
      maxPrice: route.query.maxPrice,
      minPrice: route.query.minPrice,
    },
  });
  selectedCategory.value = selection;
  fetchBrands(selection);
  checkboxValue.value = [];
}

// Brand
fetchBrands(route.query.category);
const checkboxValue = ref([]);
const selectedBrandText = computed(() =>
  checkboxValue.value.length === 0
    ? "All"
    : `Select ${checkboxValue.value.length} brands`
);

function handleCheckbox() {
  const brandsQueryText = checkboxValue.value.join(",");
  handleModal("brand");
  router.push({
    query: {
      keyword: route.query.keyword,
      category: route.query.category,
      brands: brandsQueryText || "all",
      maxPrice: route.query.maxPrice,
      minPrice: route.query.minPrice,
    },
  });
}

// Price
const priceRange = reactive({
  max: null,
  min: null,
});

const priceRangeText = computed(() => {
  const maxPrice = route.query.maxPrice;
  const minPrice = route.query.minPrice;

  if (!maxPrice && !minPrice) return "All";
  else if (!minPrice && maxPrice) return `< $${maxPrice}`;
  else if (!maxPrice && minPrice) return `> $${minPrice}`;
  else return `$${minPrice}-${maxPrice}`;
});

function handlePrice() {
  if (priceRange.max && priceRange.max < priceRange.min) return;
  handleModal("price");
  router.push({
    query: {
      keyword: route.query.keyword,
      category: route.query.category,
      brands: route.query.brands,
      maxPrice: priceRange.max,
      minPrice: priceRange.min,
    },
  });
}
</script>

<style>
.side-bar {
  width: 50rem;
  height: 24rem;
  box-shadow: 0 0 3px 0 rgba(46 38 21 / 0.3);
  background-color: #fff;
  border-radius: 5px;
}

.options {
  font-size: 2rem;
  padding: 3rem 1.8rem;
  border-bottom: 1px solid rgba(46 38 21 / 0.3);
  display: flex;
  justify-content: space-between;
  position: relative;
}

.option-last {
  border: none;
}

.selected-option {
  font-weight: 500;
  color: #b69a56;
  cursor: pointer;
  text-transform: capitalize;
}

.option-box {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.4rem 3.2rem;
  border-radius: 3px;
  padding: 3.2rem 4rem;
  position: absolute;
  background-color: #fff;
  box-shadow: 0 1px 3px 0 rgba(46 38 21 / 0.3);
  top: 0;
  left: 102%;
  z-index: 50;
}

.option-box .category {
  width: 18rem;
  cursor: pointer;
  transition: all 0.3s;
  text-transform: capitalize;
}

.option-box p:hover {
  color: #b69a56;
}

.option-box .selected {
  color: #b69a56;
  text-decoration: underline;
}

.checkbox {
  width: 100%;
  padding: 1rem 0;
  display: flex;
  align-content: stretch;
}

.checkbox input {
  margin-right: 0.6rem;
}

.checkbox label {
  width: 18rem;
  display: inline-block;
}

.price-box {
  display: block;
}

.price-box input {
  border-radius: 5px;
  border: 1px solid #555;
  padding: 1.2rem 2.4rem;
  margin-bottom: 1rem;
}

.price-box button {
  width: 100%;
  background-color: #897340;
  color: #fff;
  border: none;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  padding: 1.2rem 2.4rem;
  cursor: pointer;
}
</style>
