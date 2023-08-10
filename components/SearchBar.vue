<template>
  <form class="search-bar" @submit.prevent="handleSubmit(searchInput)">
    <input
      placeholder="Shop now! Starts with entering any keyword or 'all'..."
      v-model.trim="searchInput"
    />
    <button>
      <Icon name="ic:baseline-search" size="3rem" />
      <span>SEARCH</span>
    </button>
  </form>
</template>

<script setup>
const searchInput = ref("");
const router = useRouter();

function handleSubmit(input) {
  if (!searchInput.value) return;
  router.push({
    path: "/search",
    query: {
      keyword: searchInput.value,
    },
  });
}
</script>

<style scoped>
.search-bar {
  width: 100%;
  display: flex;
  justify-content: center;
}

.search-bar input {
  width: 100%;
  font-size: 2.2rem;
  border: none;
  border-bottom-left-radius: 50px;
  border-top-left-radius: 50px;
  padding: 1.4rem 4rem;
}

.search-bar input:focus {
  outline-style: none;
}

.search-bar button {
  font-size: 2rem;
  font-weight: 500;
  color: #fff;
  border: none;
  display: flex;
  align-items: center;
  gap: 1rem;
  border-bottom-right-radius: 50px;
  border-top-right-radius: 50px;
  padding: 1.4rem 6rem 1.4rem 4rem;
  background-color: #cdad60;

  transition: background-color 0.3s;
  cursor: pointer;
}

.search-bar button:hover {
  background-color: #b69a56;
}

.search-icon {
  height: 3rem;
}
</style>
