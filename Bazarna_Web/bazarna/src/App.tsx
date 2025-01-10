import { createContext, useContext, useEffect, useState } from "react";
import { CartItem, GloablState, Screens } from "./types/types";
import storage from "./utils/storage";
import Cart from "./screens/cart";
import Negotiation from "./screens/negotiation";
import Shipping from "./screens/shipping";

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [price, setPrice] = useState(0);
  const [screen, setScreen] = useState<Screens>("cart");

  const changeScreen = (screen: Screens) => {
    setScreen(screen);
  };

  const changeCartItems = (items: CartItem[]) => {
    setCartItems(items);
    storage.setCartItems(items);
  };

  const changePrice = (price: number) => {
    setPrice(price);
  };

  const calcCartItemsTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  const clearState = () => {
    setCartItems([]);
    setPrice(0);
    storage.setCartItems([]);
    storage.setNegotiations({});
  };

  useEffect(() => {
    const onTogglePopup = () => {
      const newCartItems = storage.getCartItems();
      changeCartItems(newCartItems);
    };

    window.addEventListener("togglePopup", onTogglePopup);

    return () => {
      window.removeEventListener("togglePopup", onTogglePopup);
    };
  }, []);

  return (
    <GlobalStateContext.Provider
      value={{
        calcCartItemsTotalPrice,
        cartItems,
        changeCartItems,
        changePrice,
        changeScreen,
        screen,
        clearState,
        price,
      }}
    >
      {screen === "cart" && <Cart />}
      {screen === "bot" && <Negotiation />}
      {screen === "shipping" && <Shipping />}
    </GlobalStateContext.Provider>
  );
}

const GlobalStateContext = createContext<GloablState | undefined>(undefined);

export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error("useGlobalState must be used within a GlobalStateProvider");
  }
  return context;
};

export default App;
