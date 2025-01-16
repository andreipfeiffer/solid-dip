export function addItemToCart(cart: any, item: any) {
  // const isOutOfStock = item.status === ProductStatus.OutOfStock;
  const isOutOfStock = false;

  if (isOutOfStock) {
    return cart;
  }

  return {
    ...cart,
    [item.id]: item,
  };
}

export function getCartTotal(cart: any): number {
  return Object.values(cart).reduce(
    (acc: number, item: any) => acc + item.price * item.quantity,
    0
  );
}
