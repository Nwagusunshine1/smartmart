// Product data
const products = [
  {
    name: "Phone Holder",
    price: 3500,
    image: "https://via.placeholder.com/200x160?text=Holder"
  }
  {
    name: "Car Charger",
    price: 4000,
    image: "https://via.placeholder.com/200x160?text=Car+Charger"
  },
  {
    name: "Power Bank 20000mAh",
    price: 15000,
    image: "https://via.placeholder.com/200x160?text=Power+Bank"
  },
  {
    name: "Silicone Phone Case",
    price: 2000,
    image: "https://via.placeholder.com/200x160?text=Case"
  }
];

let cartCount = 0;
let cartTotal = 0;

function renderProducts() {
  const productList = document.getElementById("product-list");

  products.forEach(product => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img src="product.image" alt="{product.name}">
      <h3>product.name</h3>
      <p>₦{product.price}</p>
      <button onclick="addToCart(${product.price})">Add to Cart</button>
    `;
    productList.appendChild(div);
  });
}

function addToCart(price) {
  cartCount++;
  cartTotal += price;document.getElementById("cart-count").innerText = cartCount;
   
  document.getElementById("cart-total").innerText = cartTotal;
  }
  
  renderProducts();