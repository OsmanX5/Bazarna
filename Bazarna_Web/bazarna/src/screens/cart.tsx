import { useGlobalState } from "../App";

export default function Cart() {
  const {
    cartItems,
    changeCartItems,
    changePrice,
    changeScreen,
    calcCartItemsTotalPrice,
  } = useGlobalState();

  // Remove item from cart
  const removeItem = (productId: number) => {
    const updatedCart = cartItems.filter(
      (item) => item.product.id !== productId
    );
    changeCartItems(updatedCart);
  };

  // Change quantity of an item
  const changeQty = (productId: number, qty: number) => {
    const updatedCart = cartItems.map((item) =>
      item.product.id === productId ? { ...item, quantity: qty } : item
    );
    changeCartItems(updatedCart);
  };

  // Handle checkout
  const handleClickCheckout = () => {
    const totalPrice = calcCartItemsTotalPrice();
    changePrice(totalPrice);
    changeScreen("shipping");
  };

  // Handle negotiation
  const handleClickNegotiate = () => {
    const totalPrice = calcCartItemsTotalPrice();
    changePrice(totalPrice);
    changeScreen("bot");
  };

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold text-center">Your Cart</h1>

      {/* Cart Items */}
      <div className="space-y-4">
        {cartItems.length === 0 ? (
          <div className="text-center text-gray-500">Your cart is empty!</div>
        ) : (
          cartItems.map((item) => (
            <div
              key={item.product.id}
              className="flex items-center justify-between p-4 border rounded-lg shadow-sm bg-base-100"
            >
              <div className="flex items-center space-x-4">
                <div>
                  <h2 className="text-lg font-semibold">{item.product.name}</h2>
                  <p className="text-gray-600">${item.product.price}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) =>
                    changeQty(item.product.id, Number(e.target.value))
                  }
                  className="w-16 p-2 border rounded input input-bordered"
                />
                <button
                  className="btn btn-error btn-sm"
                  onClick={() => removeItem(item.product.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Actions */}
      {cartItems.length > 0 && (
        <div className="space-y-4">
          <div className="text-right">
            <p className="text-lg font-bold">
              Total: ${calcCartItemsTotalPrice().toFixed(2)}
            </p>
          </div>
          <div className="flex justify-between">
            <button
              className="btn btn-warning mr-2"
              onClick={handleClickNegotiate}
            >
              Negotiate Price
            </button>
            <button className="btn btn-success" onClick={handleClickCheckout}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
