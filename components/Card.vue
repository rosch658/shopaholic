<template>
  <div class="card-container">
    <div class="card">
      <img :src="product.thumbnail" />
      <div class="product-info">
        <h1 @click="navigateTo(`/product/${product.id}`)">
          {{ product.title }}
        </h1>
        <p>{{ product.description }}</p>
      </div>
      <div class="product-price">
        <div class="discount">
          <Icon
            name="ic:outline-trending-down"
            size="2rem"
            class="discount-icon"
          />
          <span>-{{ +product.discountPercentage }}%</span>
        </div>
        <p class="price">$ {{ +product.price }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["product"]);
</script>

<style scoped>
.card-container {
  overflow: hidden;
  height: 100%;
  border-radius: 5px;
}
.card {
  box-shadow: 0 0 4px 0 rgba(46 38 21/ 0.2);
  height: 100%;
  border-radius: 5px;
  display: flex;
  position: relative;
  background-color: #fff;
}

.card:hover {
  transform: scale(1.02);
  background-color: #fcf9f0;
  transition: all 0.3s;
}

.card img {
  margin-right: 2rem;
  min-width: 25rem;
  width: 25rem;
  height: 100%;
}

.product-info {
  padding: 2rem 1rem;
}

.product-info h1 {
  text-decoration: none;
  font-size: 2.4rem;
  font-weight: 600;
  color: #897340;
  cursor: pointer;
}

.product-info p {
  font-size: 1.8rem;
  margin-top: 1rem;
}

.product-price {
  font-weight: 600;
  font-size: 2.2rem;
  position: absolute;
  text-align: center;
  right: 2.6rem;
  bottom: 2rem;
}

.discount {
  font-size: 2rem;
  color: red;
  margin-bottom: 0.6rem;
  text-align: center;
  display: flex;
}

.discount .discount-icon {
  margin-right: 0.4rem;
}
</style>
