import { useState } from "react";
import { useGlobalState } from "../App";
import { sleep } from "../utils/utils";

const Shipping = () => {
  const { changeScreen, price, clearState } = useGlobalState();

  const [isLoading, setIsLoading] = useState(false);
  const [orderId, setOrderId] = useState<string>();

  const handleBack = () => {
    changeScreen("cart");
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await sleep(1000);
      setOrderId("123456");
      clearState();
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return orderId ? (
    <OrderConfirmationPopup orderId={orderId} handleBack={handleBack} />
  ) : (
    <div className=" bg-white p-6 rounded-lg">
      <h2 className="text-xl font-semibold text-center mb-4">
        Shipping Details
      </h2>
      <form>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="fullName">
            Full Name
          </label>
          <input
            id="fullName"
            type="text"
            className="input input-bordered w-full"
            placeholder="Enter your full name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="input input-bordered w-full"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-sm font-medium mb-1"
            htmlFor="phoneNumber"
          >
            Phone Number (Optional)
          </label>
          <input
            id="phoneNumber"
            type="tel"
            className="input input-bordered w-full"
            placeholder="Enter your phone number"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="address">
            Address
          </label>
          <textarea
            id="address"
            className="textarea textarea-bordered w-full"
            placeholder="Enter your address"
          ></textarea>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold">Total: ${price.toFixed(2)}</p>
        </div>
        <div className="flex justify-between">
          <button
            onClick={handleBack}
            className="btn btn-outline btn-sm"
            type="button"
          >
            Cancel
          </button>
          <button
            disabled={isLoading}
            className="btn btn-error btn-sm"
            type="button"
            onClick={handleSubmit}
          >
            {isLoading ? "Placing order..." : "Place Order"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Shipping;

const OrderConfirmationPopup = (props: {
  orderId: string;
  handleBack: () => void;
}) => {
  return (
    <div className="bg-white p-6 rounded-lg text-center">
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 bg-green-200 rounded-full flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      </div>
      <p className="text-lg font-medium mb-6">
        Thank you for the order #{props.orderId}, we will contact you soon
      </p>
      <button onClick={props.handleBack} className="btn btn-error btn-sm">
        Back to shopping
      </button>
    </div>
  );
};
