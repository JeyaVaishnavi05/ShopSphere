const cartItemsDiv = document.getElementById("cart-items");
const totalSpan = document.getElementById("total");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* Render Cart */
function renderCart() {
  cartItemsDiv.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    cartItemsDiv.innerHTML += `
      <div class="product">
        <h3>${item.name}</h3>
        <p>₹${item.price} × ${item.quantity}</p>
        <button onclick="removeItem(${index})">Remove</button>
      </div>
    `;
  });

  totalSpan.innerText = total;
}

/* Remove Item */
function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

/* Checkout */
function checkout() {
  alert("Checkout successful!");
  localStorage.removeItem("cart");
  cart = [];
  renderCart();
}

/* Dark Mode Toggle */
function toggleDarkMode(){
  document.body.classList.toggle("dark");

  if(document.body.classList.contains("dark")){
    localStorage.setItem("darkMode","enabled");
  }else{
    localStorage.setItem("darkMode","disabled");
  }
}

/* Apply saved dark mode immediately */
if(localStorage.getItem("darkMode") === "enabled"){
  document.body.classList.add("dark");
}

/* Load cart */
renderCart();

function goCheckout(){
  if(cart.length === 0){
    alert("Cart is empty");
    return;
  }

  window.location.href = "checkout.html";
}

//CHECKOUT

function checkout() {

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const total = cart.reduce((sum, item) =>
    sum + item.price * item.quantity, 0);

  fetch("http://localhost:5000/api/orders", {

    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify({
      products: cart,
      total: total
    })

  })
  .then(res => res.json())
  .then(() => {

    alert("Order placed!");

    localStorage.removeItem("cart");

  });

}