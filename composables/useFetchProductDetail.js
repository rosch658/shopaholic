import axios from "axios";
export default async function useFetchProductDetail(id) {
  const { data, error } = await axios.get(
    `https://dummyjson.com/products/${id}`
  );
  if (error) {
    throw createError({
      ...error.value,
      statusMessage:
        "Unable to fetch product detail, please check your network.",
    });
  }
  return { data };
}
