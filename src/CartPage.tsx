import { useEffect } from "react";

import { getCart } from "./api";
import { useCartStore } from "./store";
import "./CartPage.css";

export function CartPage(props: { onLogout: () => void }) {
  const store = useCartStore();

  useEffect(() => {
    (async () => {
      const cart = await getCart();
      store.init(cart);
    })();
  }, []);

  const cartItems = Object.values(store.items);

  return (
    <div>
      <nav className="nav">
        <button onClick={addNewItemToCart}>Add to cart</button>
        <button onClick={props.onLogout}>Logout</button>
      </nav>

      {cartItems.length > 0 ? (
        <ul className="cart">
          {cartItems.map((item) => (
            <li key={item.id}>
              <span>{item.name}</span>
              <span>&times; {item.quantity}</span>
              {item.quantity > 0 ? (
                <button
                  onClick={() =>
                    store.updateQuantity(item.id, item.quantity + 1)
                  }
                >
                  +
                </button>
              ) : (
                <em className="empty">Out of stock</em>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <div className="empty_cart">
          <em className="empty">No items in cart</em>
        </div>
      )}

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
      status: Math.random() < 0.5 ? "in_stock" : "out_of_stock",
    } as const;

    store.addToCart(item);
  }
}
