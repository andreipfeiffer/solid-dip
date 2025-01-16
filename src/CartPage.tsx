import { useEffect } from "react";

import { getCart } from "./api";
import { useCartStore } from "./store";

export function CartPage(props: { onLogout: () => void }) {
  const store = useCartStore();

  useEffect(() => {
    (async () => {
      const cart = await getCart();
      store.init(cart);
    })();
  }, []);

  return (
    <div>
      <button onClick={addNewItemToCart}>Add to cart</button>
      <button onClick={props.onLogout}>Logout</button>

      <ul>
        {Object.values(store.items).map((item) => (
          <li key={item.id}>
            {item.quantity} x {item.name}
            <button
              onClick={() => store.updateQuantity(item.id, item.quantity + 1)}
            >
              +
            </button>
          </li>
        ))}
      </ul>

      <strong>TOTAL: {store.getTotal()}</strong>
    </div>
  );

  async function addNewItemToCart() {
    const index = Object.values(store.items).length + 1;

    const item = {
      id: index,
      name: `Product ${index}`,
      price: 10,
      quantity: 1,
      status: "in_stock",
    } as const;

    store.addToCart(item);
  }
}
