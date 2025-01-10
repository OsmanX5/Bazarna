export type Product = {
  id: number;
  name: string;
  price: number;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export type ShippingDetails = {
  name: string;
  email: string;
  phoneNumber?: string;
  address: string;
};

export type Screens = "cart" | "bot" | "shipping";

export type GloablState = {
  cartItems: CartItem[];
  screen: Screens;
  price: number;

  changeScreen: (screen: Screens) => void;
  changeCartItems: (items: CartItem[]) => void;
  changePrice: (price: number) => void;
  calcCartItemsTotalPrice: () => number;
  clearState: () => void;
};

export type Negotiations = Record<
  number,
  { remainingTrys: number; currentPrice: number }
>;
