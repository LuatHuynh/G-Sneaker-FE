import { useEffect, useState } from "react";

import OurProduct from "./components/ourProduct";
import CartProduct from "./components/cartProduct";
import { getAllProducts } from "./axios/axios";
import nike from "./assets/nike.png";
import { useCart } from "./store/cart-reducer";

function App() {
  const [products, setProducts] = useState([]);
  // const productsInstore =
  const { state, dispatch } = useCart();

  function containsId(array, targetId) {
    return array.some((obj) => obj.id === targetId);
  }

  function handleAddItem(id) {
    const foundObject = products.find((obj) => obj.id === id);
    if (containsId(state.items, id)) {
      return;
    }
    dispatch({
      type: "ADD_ITEM",
      payload: { ...foundObject, quantity: 1 },
    });
  }

  function handleRemoveItem(itemId) {
    dispatch({
      type: "REMOVE_ITEM",
      payload: itemId,
    });
  }

  function handleIncrementQuantity(itemId) {
    dispatch({
      type: "INCREMENT_QUANTITY",
      payload: itemId,
    });
  }

  function handleDecrementQuantity(itemId) {
    dispatch({
      type: "DECREMENT_QUANTITY",
      payload: itemId,
    });
  }

  function countTotal(cart) {
    return cart.reduce((total, item) => {
      return total + item.quantity * item.price;
    }, 0);
  }

  function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  const total = countTotal(state.items);

  useEffect(() => {
    if (state.items.length > 0) {
      saveCart(state.items);
    }
  }, [total]);

  useEffect(() => {
    const storedCartJson = localStorage.getItem("cart");
    if (storedCartJson) {
      const storedCart = JSON.parse(storedCartJson);
      console.log("load tu local len");
      console.log(storedCart);
      dispatch({
        type: "RESTORED_CART",
        payload: storedCart,
      });
    }
  }, []);

  useEffect(() => {
    getAllProducts().then((data) => {
      setProducts(data);
    });
  }, []);
  return (
    <div className="app">
      <div class="our-products-container">
        <img className="logo" src={nike}></img>
        <h2 className="title">
          <b>Our Products</b>
        </h2>
        <div class="scroll-container" id="content">
          {products.map((product) => {
            const isAdded = containsId(state.items, product.id);
            return (
              <OurProduct
                product={product}
                addClick={() => {
                  handleAddItem(product.id);
                }}
                isAdded={isAdded}
              ></OurProduct>
            );
          })}
        </div>
      </div>

      <div class="our-products-container">
        <img className="logo" src={nike}></img>
        <div className="flex-row justify-content-center">
          <div className="flex-row width-300">
            <h2 className="title padding-left-0">
              <b>Your cart</b>
            </h2>
            <h2>
              <b>${total.toFixed(2)}</b>
            </h2>
          </div>
        </div>
        <div class="scroll-container" id="content">
          {state.items.map((product) => {
            return (
              <CartProduct
                product={product}
                addClick={() => {
                  handleAddItem(product.id);
                }}
                minusClick={() => {
                  handleDecrementQuantity(product.id);
                }}
                plusClick={() => {
                  handleIncrementQuantity(product.id);
                }}
                removeClick={() => {
                  handleRemoveItem(product.id);
                }}
              ></CartProduct>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
