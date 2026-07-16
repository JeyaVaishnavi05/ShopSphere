const table = document.getElementById("ordersTable");

fetch("http://localhost:5000/api/orders")

.then(res => res.json())

.then(orders => {

  table.innerHTML = "";

  orders.forEach(order => {

    let productList = "";

    order.products.forEach(p => {
      productList += `${p.name} (x${p.quantity})<br>`;
    });

    table.innerHTML += `
      <tr>
        <td>${order.customer?.name || "N/A"}</td>
        <td>${order.customer?.email || "N/A"}</td>
        <td>${order.customer?.phone || "N/A"}</td>
        <td>${order.customer?.address || "N/A"}</td>
        <td>${productList}</td>
        <td>₹${order.total}</td>
        <td>${new Date(order.date).toLocaleDateString()}</td>
      </tr>
    `;

  });

});