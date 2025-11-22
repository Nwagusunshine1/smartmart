// ================================
// LOAD CART FROM LOCAL STORAGE
// ================================
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Elements
const cartItemsBox = document.getElementById("cart-items");
const totalPriceBox = document.getElementById("total-price");

// ================================
// SHOW ITEMS IN CART
// ================================
function displayCart() {
  cartItemsBox.innerHTML = "";

  if (cart.length === 0) {
    cartItemsBox.innerHTML = "<p>Your cart is empty.</p>";
    totalPriceBox.textContent = "$0";
    return;
  }

  cart.forEach((item, index) => {
    const div = document.createElement("div");
    div.classList.add("cart-item");

    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      
      <div class="item-details">
        <h4>${item.name}</h4>
        <p>Price:₦${item.price}</p>
      </div>

      <div class="quantity-box">
        <button class="quantity-btn" onclick="decreaseQty(${index})">-</button>
        <span class="quantity-number">${item.quantity}</span>
        <button class="quantity-btn" onclick="increaseQty(${index})">+</button>
      </div>

      <button class="quantity-btn" style="background:#dc3545" onclick="removeItem(${index})">X</button>
    `;

    cartItemsBox.appendChild(div);
  });

  updateTotal();
}

// ================================
// INCREASE QUANTITY
// ================================
function increaseQty(index) {
  cart[index].quantity++;
  saveCart();
  displayCart();
}

// ================================
// DECREASE QUANTITY
// ================================
function decreaseQty(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity--;
  } else {
    cart.splice(index, 1);
  }
  saveCart();
  displayCart();
}

// ================================
// REMOVE ITEM COMPLETELY
// ================================
function removeItem(index) {
  cart.splice(index, 1);
  saveCart();
  displayCart();
}

// ================================
// UPDATE TOTAL PRICE
// ================================
function updateTotal() {
  let total = 0;
  cart.forEach(item => {
    total += item.price * item.quantity;
  });

  totalPriceBox.textContent = "₦" + total.toFixed(2);
}

// ================================
// SAVE CART TO LOCAL STORAGE
// ================================
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// ================================
// CHECKOUT WITH FLUTTERWAVE
// ================================
document.getElementById("checkout-btn").addEventListener("click", function () {
  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  // Calculate total
  let totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  FlutterwaveCheckout({
    public_key: "FLWPUBK_TEST-bddb742db2701a4db11d38cb505a69d5-X", // ⚠️ Replace with your real key
    tx_ref: "TX-" + Date.now(),
    amount: totalAmount,
    currency: "NGN",
    customer: {
      email: "sunshinerealestate090@gmail.com", // you can collect user email from your login form
      phonenumber: "08000000000",
      name: "Cart Customer"
    },
    callback: function (data) {
      alert("Payment Successful!");
      cart = [];
      saveCart();
      displayCart();
       localStorage.setItem("cart", JSON.stringify(cart));
          window.location.href = "payment-success.html";
        
    },
    onclose: function () {
      console.log("Payment closed");
    }
  });
});

// Load cart on page start
displayCart();
