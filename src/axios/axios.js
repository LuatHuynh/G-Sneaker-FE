import axios from "axios";

const BASE_URL = "https://g-sneaker-huynhluat.onrender.com/api/v1";
const PRODUCT_PATH = "products";

const createdAxios = axios.create({
  baseURL: BASE_URL,
});

export const getAllProducts = async function () {
  const products = await createdAxios.get(PRODUCT_PATH);
  return products.data.products || [];
};
