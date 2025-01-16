import { CartPage } from "./CartPage.tsx";

export function App() {
  const token = localStorage.getItem("token");

  function login() {
    localStorage.setItem("token", "valid-token");
    window.location.reload();
  }

  function logout() {
    localStorage.removeItem("token");
    window.location.reload();
  }

  if (!token) {
    return <button onClick={login}>Login</button>;
  }

  return <CartPage onLogout={logout} />;
}
