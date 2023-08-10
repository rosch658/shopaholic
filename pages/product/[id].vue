<template>
  <div>
    <div class="detail-hero">
      <div class="image-box">
        <div class="main-image-box">
          <div
            class="main-image"
            :style="{
              backgroundImage: `url(${mainImage})`,
            }"
          />
        </div>
        <div class="image-thumbnails">
          <div
            class="image-thumbnail"
            v-for="(image, index) in product.images"
            :key="`${product.title}-${index}`"
            :style="{
              backgroundImage: `url(${image})`,
            }"
            @mouseover="handleMainImage(image)"
          >
            <div :class="mainImage === image ? 'hover-border' : ''"></div>
          </div>
        </div>
      </div>
      <div class="info-box">
        <h1 class="product-name">{{ product.title }}</h1>
        <div class="side-info">
          <div class="rating">
            <div class="rating-number">{{ product.rating }}</div>
            <div class="rating-starts">
              <!-- Filled star -->
              <div class="stars-wrapper" v-if="filledStar !== 0">
                <div
                  class="star-wrapper"
                  v-for="index in filledStar"
                  :key="index"
                >
                  <div class="star-fill" :style="{ width: '100%' }">
                    <Icon name="ic:baseline-star-rate" class="star-icon" />
                  </div>
                </div>
              </div>
              <!-- Filled Star -->

              <!-- Half star -->
              <div class="star-wrapper">
                <div class="star-fill" :style="{ width: `${halfFilledStar}%` }">
                  <Icon name="ic:baseline-star-rate" class="star-icon" />
                </div>
              </div>
              <!-- Half star -->
            </div>
          </div>
          <div class="stock">94 left</div>
        </div>
        <div class="price-info">
          <h2 class="product-price">${{ product.price }}</h2>
          <h3 class="discount">
            <Icon
              name="ic:outline-trending-down"
              size="3rem"
              class="discount-icon"
            />
            -{{ +product.discountPercentage }}% discount!!
          </h3>
        </div>
        <div class="secondary-info">
          <div class="specifications">
            <div class="specification">Brand</div>
            <div>{{ product.brand }}</div>
            <div class="specification">Category</div>
            <div>{{ product.category }}</div>
          </div>
          <div class="description">{{ product.description }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const id = route.params.id;
const { data: product } = await useFetchProductDetail(id);
const filledStar = Math.trunc(product.rating);
const halfFilledStar = (product.rating - filledStar) * 100;

const mainImage = ref(product.images[0]);
function handleMainImage(imgURL) {
  mainImage.value = imgURL;
}

definePageMeta({
  layout: "custom",
});
</script>

<style scoped>
.detail-hero {
  width: 100%;
  background-color: #fff;
  display: flex;
  border-radius: 5px;
}

/* Image */

.image-box {
  width: 45rem;
  padding: 2rem;
}

.main-image {
  background-position: 50%;
  background-size: contain;
  background-repeat: no-repeat;
  padding-top: 100%;
  width: 100%;
  margin-bottom: 2rem;
}
.image-thumbnails {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.image-thumbnail {
  width: 7.2rem;
  background-position: 50%;
  background-size: contain;
  background-repeat: no-repeat;
  padding-top: 7.2rem;
  cursor: pointer;
  position: relative;
}

.hover-border {
  position: absolute;
  left: 0;
  bottom: 0;
  top: 0;
  right: 0;
  border: 2px solid #e4c06b;
  border-radius: 3px;
}

/* Image */

/* Info */

.info-box {
  padding: 5rem;
  width: 100%;
}

.product-name {
  font-size: 3.2rem;
  color: #897340;
  margin-bottom: 1.2rem;
}

.side-info {
  display: flex;
  font-size: 2rem;
  margin-bottom: 2rem;
}

.rating {
  color: #cdad60;
  display: flex;
  align-items: center;
  padding-right: 10rem;
  border-right: 1px solid #555;
}

.rating-starts {
  display: flex;
  margin-left: 0.4rem;
}

.stars-wrapper {
  display: flex;
}
.star-wrapper {
  width: 2rem;
  height: 2rem;
  position: relative;
  margin-right: 1px;
}

.star-fill {
  overflow: hidden;
  position: absolute;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
}

.star-icon {
  color: #cdad60;
  stroke: #cdad60;
  display: block;
  position: absolute;
  left: 0;
}

.stock {
  padding-left: 1rem;
}

.price-info {
  width: 100%;
  background-color: #faf2e1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem;
  margin-bottom: 4rem;
}

.product-price {
  font-size: 2.8rem;
}

.discount {
  font-size: 1.8rem;
  color: red;
}
.specifications {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  column-gap: 1rem;
  row-gap: 2rem;
  font-size: 2rem;
  padding: 0 2rem;
  margin-bottom: 6rem;
}

.specification {
  font-weight: bold;
}

.description {
  padding: 0 2rem;
  font-size: 2rem;
}

/* Info */
</style>
