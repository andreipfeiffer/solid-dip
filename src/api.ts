import axios from "axios";
import { API_URL } from "./shared";

const instance = axios.create({
  baseURL: API_URL,
  headers: { Authorization: localStorage.getItem("token") },
});

// export const ProductStatus = {
//   InStock: "in_stock",
//   OutOfStock: "out_of_stock",
// } as const;

// type ProductStatus = (typeof ProductStatus)[keyof typeof ProductStatus];

// type Product = {
//   id: number;
//   status: ProductStatus;
//   name: string;
//   price: number;
// };

// export type CartItem = Product & {
//   quantity: number;
// };

// export type Cart = Record<number, CartItem>;

export async function getCart() {
  try {
    const response = await instance.get("/cart");
    return response.data;
  } catch (error) {
    return {};
  }
}

// export async function saveItemInCart(item: CartItem) {
//   return instance.post("/cart", { item });
// }
