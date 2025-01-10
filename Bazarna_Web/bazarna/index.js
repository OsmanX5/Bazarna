let products;

fetch("./src/data/products.json")
  .then((res) => res.json())
  .then((data) => (products = data));

function addProduct(id) {
  id = (id % (products.length + 1)) + 20;
  console.log("add new product " + id);

  const product = products.find((p) => p.id == id);
  if (product) {
    const items = localStorage.getItem("cartItems");
    const cartItems = items ? JSON.parse(items) : [];
    const existingItem = cartItems.find((item) => item.product.id == id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      cartItems.push({ product, quantity: 1 });
    }
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    numOfItems.style.display = cartItems.length > 0 ? "flex" : "none";
  }
}

const cartButton = document.createElement("div");
const numOfItems = document.createElement("div");
numOfItems.style.display =
  (localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : []
  ).length > 0
    ? "flex"
    : "none";
cartButton.appendChild(numOfItems);

const root = document.createElement("div");
const eventBlocker = document.createElement("div");

cartButton.id = "cart-button";
root.id = "root";
eventBlocker.id = "event-blocker";

document.body.appendChild(cartButton);
document.body.appendChild(root);
document.body.appendChild(eventBlocker);

let isPopupOpen = root?.style.display == "block";

function togglePopup() {
  window.dispatchEvent(new Event("togglePopup"));
  root.style.display = isPopupOpen ? "none" : "block";
  eventBlocker.style.display = isPopupOpen ? "none" : "block";
  isPopupOpen = !isPopupOpen;
}

cartButton.addEventListener("click", () => {
  togglePopup();
});

document.addEventListener("mousedown", (e) => {
  if (isPopupOpen && !root.contains(e.target)) {
    togglePopup();
  }
});
