import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./style.css";
import App from "./App";
import { CartProvider } from "./store/cart-reducer";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </StrictMode>
);
