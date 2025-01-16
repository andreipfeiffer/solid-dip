export function addItemToCart(cart: any, item: any) {
  let quantity = item.quantity;

  if (isOutOfStock(item)) {
    quantity = 0;
  }

  return {
    ...cart,
    [item.id]: { ...item, quantity },
  };
}

export function getCartTotal(cart: any): number {
  return Object.values(cart).reduce(
    (acc: number, item: any) => acc + item.price * item.quantity,
    0
  );
}

function isOutOfStock(item: any) {
  // return item.status === ProductStatus.OutOfStock;
  return false;
}
