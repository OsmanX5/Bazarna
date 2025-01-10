import { CartItem, Negotiations } from "../types/types";

const localStorageKeys = {
  cartItems: "cartItems",
  negotiations: "negotiations",
};

const storage = {
  getCartItems: () => {
    const cartItems = localStorage.getItem(localStorageKeys.cartItems);
    if (!cartItems) {
      return [];
    }
    return JSON.parse(cartItems) as CartItem[];
  },

  setCartItems: (items: CartItem[]) => {
    localStorage.setItem(localStorageKeys.cartItems, JSON.stringify(items));
  },

  setNegotiations: (negotiations: Negotiations) => {
    localStorage.setItem(
      localStorageKeys.negotiations,
      JSON.stringify(negotiations)
    );
  },

  getNegotiations: () => {
    const negotiations = localStorage.getItem(localStorageKeys.negotiations);
    if (!negotiations) {
      return {};
    }
    return JSON.parse(negotiations) as Negotiations;
  },
};

export default storage;
