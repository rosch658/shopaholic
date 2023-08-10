import axios from "axios";
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

  const { category, brands, minPrice, maxPrice } = filters;

  if (category.value && category.value !== "all") {
    const newData = products.value.filter(
      (product) => product.category === category.value
    );
    products.value = newData;
  }

  if (brands.value && brands.value !== "all") {
    const brandsArr = brands.value.split(",");
    const newData = products.value.filter((product) =>
      brandsArr.includes(product.brand)
    );
    products.value = newData;
  }

  if (maxPrice.value || minPrice.value) {
    if (maxPrice.value && !minPrice.value) {
      const newData = products.value.filter(
        (product) => product.price < maxPrice.value
      );
      products.value = newData;
    } else if (!maxPrice.value && minPrice.value) {
      const newData = products.value.filter(
        (product) => product.price > minPrice.value
      );
      products.value = newData;
    } else {
      const newData = products.value.filter(
        (product) =>
          product.price > minPrice.value && product.price < maxPrice.value
      );
      products.value = newData;
    }
  }

  return { products };
}
