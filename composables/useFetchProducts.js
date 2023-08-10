import axios from "axios";
const filteredData = ref([]);
const previousKeyword = ref("");
const products = ref([]);
export default async function useFetchProducts(keyword, filters) {
  if (keyword.value !== "all" && keyword.value !== previousKeyword.value) {
    const { data, error } = await axios.get(
      `https://dummyjson.com/products/search?q=${keyword.value}`
    );

    if (error) {
      throw createError({
        ...error.value,
        statusMessage: "Unable to fetch products, please check your network.",
      });
    }
    products.value = data.products;
    previousKeyword.value = keyword.value;
  } else if (
    keyword.value === "all" &&
    keyword.value !== previousKeyword.value
  ) {
    const { data, error } = await axios.get(`https://dummyjson.com/products`);

    if (error) {
      throw createError({
        ...error.value,
        statusMessage: "Unable to fetch products, please check your network.",
      });
    }

    products.value = data.products;
    previousKeyword.value = keyword.value;
  }

  // Filtered products
  filteredData.value = products.value;
  const { category, brands, minPrice, maxPrice } = filters;

  if (category.value && category.value !== "all") {
    const newData = filteredData.value.filter(
      (product) => product.category === category.value
    );
    filteredData.value = newData;
  }

  if (brands.value && brands.value !== "all") {
    const brandsArr = brands.value.split(",");
    const newData = filteredData.value.filter((product) =>
      brandsArr.includes(product.brand)
    );
    filteredData.value = newData;
  }

  if (maxPrice.value || minPrice.value) {
    if (maxPrice.value && !minPrice.value) {
      const newData = filteredData.value.filter(
        (product) => product.price < maxPrice.value
      );
      filteredData.value = newData;
    } else if (!maxPrice.value && minPrice.value) {
      const newData = filteredData.value.filter(
        (product) => product.price > minPrice.value
      );
      filteredData.value = newData;
    } else {
      const newData = filteredData.value.filter(
        (product) =>
          product.price > minPrice.value && product.price < maxPrice.value
      );
      filteredData.value = newData;
    }
  }

  return { filteredData };
}
