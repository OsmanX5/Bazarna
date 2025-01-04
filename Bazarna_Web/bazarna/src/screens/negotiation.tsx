import { useEffect, useState } from "react";
import { useGlobalState } from "../App";
import storage from "../utils/storage";

const numberOfTrys = 3;
const maximumDiscountPercentage = 20;

const Negotiation = () => {
  const [remainingTrys, setRemainingTrys] = useState<number>(0);
  const [currentPrice, setCurrentPrice] = useState<number>(0);

  const { calcCartItemsTotalPrice, screen, changePrice, changeScreen } =
    useGlobalState();

  useEffect(() => {
    const fullPrice = calcCartItemsTotalPrice();
    const negotiations = storage.getNegotiations();
    if (fullPrice in negotiations) {
      setRemainingTrys(negotiations[fullPrice].remainingTrys);
      setCurrentPrice(negotiations[fullPrice].currentPrice);
    } else {
      setRemainingTrys(numberOfTrys);
      setCurrentPrice(fullPrice);
    }
  }, [screen]);

  const handleNegotiate = (text: string) => {
    const numOfWords = text.split(" ").length;
    const fullPrice = calcCartItemsTotalPrice();
    const discountPercentage =
      numOfWords > 5
        ? Math.floor(Math.random() * maximumDiscountPercentage)
        : 0;
    const discountedPrice = fullPrice - (fullPrice * discountPercentage) / 100;

    const newPrice = Math.min(discountedPrice, currentPrice);

    storage.setNegotiations({
      ...storage.getNegotiations(),
      [fullPrice]: {
        currentPrice: newPrice,
        remainingTrys: remainingTrys - 1,
      },
    });
    setCurrentPrice(newPrice);
    setRemainingTrys(remainingTrys - 1);
  };

  const handleAcceptPrice = () => {
    changePrice(currentPrice);
    changeScreen("shipping");
  };

  const handleBack = () => {
    changeScreen("cart");
  };

  return (
    <div className="w-full flex flex-col justify-between bg-white p-6 rounded-lg">
      <h2 className="text-xl font-semibold text-center mb-4">
        Bot Negotiation
      </h2>
      <div className="flex justify-center mb-4">
        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
          <span className="text-sm text-gray-500">Bot Image</span>
        </div>
      </div>
      <div className="mb-4">
        <textarea
          className="textarea textarea-bordered w-full"
          placeholder="write here ..."
        ></textarea>
        <div className="flex justify-end mb-4">
          <button
            disabled={remainingTrys === 0}
            onClick={() => handleNegotiate("a b c d e f")}
            className="btn btn-primary btn-sm"
          >
            Send
          </button>
        </div>
      </div>
      <div className="text-center mb-4">
        <p className="text-lg font-medium">
          Total:{" "}
          <span className="text-green-600">{currentPrice.toFixed(2)}</span>
        </p>
      </div>
      <div className="flex justify-between">
        <button onClick={handleBack} className="btn btn-outline btn-sm">
          Back
        </button>
        <button onClick={handleAcceptPrice} className="btn btn-error btn-sm">
          Accept Price
        </button>
      </div>
    </div>
  );
};

export default Negotiation;
