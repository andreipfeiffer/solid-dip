import { describe, it, expect } from "vitest";
import { addItemToCart, getCartTotal } from "./utils";

describe("addItemToCart", () => {
  it("should add item to cart", () => {
    const cart = {};
    const item = getInStockItemStub({ id: 1, qty: 1, price: 10 });

    const newCart = addItemToCart(cart, item);

    expect(newCart).toEqual({ [item.id]: item });
  });

  it.skip("should not add out of stock item to cart", () => {
    const cart = {};
    const item = getOutOfStockItemStub({ id: 1, qty: 1, price: 10 });

    const newCart = addItemToCart(cart, item);

    expect(newCart).toEqual({});
  });
});

describe("getCartTotal", () => {
  it("should return 0 for an empty cart", () => {
    const cart = {};
    const total = getCartTotal(cart);
    expect(total).toBe(0);
  });

  it("should calculate the total correctly for a non-empty cart", () => {
    const cart = {
      1: getInStockItemStub({ id: 1, qty: 2, price: 10 }),
      2: getInStockItemStub({ id: 2, qty: 3, price: 20 }),
    };

    const total = getCartTotal(cart);
    expect(total).toBe(10 * 2 + 20 * 3);
  });
});

function getInStockItemStub(params: {
  id: number;
  qty: number;
  price: number;
}) {
  return {
    id: params.id,
    name: `Item ${params.id}`,
    price: params.price,
    quantity: params.qty,
    status: "in_stock",
  } as const;
}

function getOutOfStockItemStub(params: {
  id: number;
  qty: number;
  price: number;
}) {
  return {
    id: params.id,
    name: `Item ${params.id}`,
    price: params.price,
    quantity: params.qty,
    status: "out_of_stock",
  } as const;
}
