const orderItemsDiv = document.getElementById("order-items");
const orderTotalSpan = document.getElementById("order-total");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function loadOrder(){

  let total = 0;
  orderItemsDiv.innerHTML = "";

  cart.forEach(item => {

    total += item.price * item.quantity;

    orderItemsDiv.innerHTML += `
      <div class="product">
        <p>${item.name}</p>
        <p>₹${item.price} × ${item.quantity}</p>
      </div>
    `;

  });

  orderTotalSpan.innerText = total;
}
function placeOrder(){

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const address = document.getElementById("address").value;
  const phone = document.getElementById("phone").value;

  if(!name || !email || !address || !phone){
    alert("Please fill all fields");
    return;
  }

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const total = cart.reduce((sum,item)=>
    sum + item.price * item.quantity ,0);

  fetch("http://localhost:5000/api/orders",{

    method:"POST",

    headers:{
      "Content-Type":"application/json"
    },

    body:JSON.stringify({

      customer:{
        name:name,
        email:email,
        phone:phone,
        address:address
      },

      products:cart,
      total:total

    })

  })
  .then(res=>res.json())
  .then(data=>{

    alert("Order placed successfully!");

    localStorage.removeItem("cart");

    window.location.href="index.html";

  })
  .catch(err=>{
    console.error(err);
  });

}
loadOrder();