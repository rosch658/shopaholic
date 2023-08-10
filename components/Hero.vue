<template>
  <div class="hero-page">
    <div class="hero-img">
      <div class="search-box">
        <div class="search-field">
          <h1 class="hero-title">Find some goods</h1>
          <SearchBar />
        </div>
      </div>
      <div class="hero-shadow"></div>
    </div>
  </div>
</template>

<style scoped>
.hero-img {
  background-image: url("https://cdn.shopify.com/s/files/1/0070/7032/files/trending-products_c8d0d15c-9afc-47e3-9ba2-f7bad0505b9b.png?format=webp&v=1614559651&width=1024");
  background-repeat: no-repeat;
  background-position: bottom;
  background-size: cover;
  width: 100%;
  height: 100vh;
  position: relative;
}

.search-box {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}

.search-field {
  width: 50%;
  text-align: center;
}

.search-field h1 {
  font-size: 8rem;
  color: #fff;
  margin-bottom: 4rem;
}

.hero-shadow {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
  opacity: 50%;
  background-color: #292929;
}
</style>
