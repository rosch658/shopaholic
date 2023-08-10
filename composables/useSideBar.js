import axios from "axios";

export default async function useSideBar() {
  // Category
  const categories = ref([]);
  if (categories.value.length === 0) {
    const fetchCategory = await axios.get(
      "https://dummyjson.com/products/categories"
    );
    categories.value = ["all", ...fetchCategory.data];
  }

  // Brand
  const brands = ref([]);
  let rawData;
  const fetchBrands = async (category) => {
    if (category && category !== "all") {
      const { data } = await axios.get(
        `https://dummyjson.com/products/category/${category}`
      );
      rawData = data;
    } else {
      const { data } = await axios.get(
        "https://dummyjson.com/products?select=brand"
      );
      rawData = data;
    }
    const brandsOfCategory = rawData.products.map((product) => product.brand);
    brands.value = [...new Set(brandsOfCategory)];
  };
  return { categories, brands, fetchBrands };
}
