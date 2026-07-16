fetch("http://localhost:5000/api/orders")

.then(res=>res.json())

.then(orders=>{

  const table = document.getElementById("orderTable");

  orders.forEach(order=>{

    table.innerHTML += `
    
    <tr>
      <td>${order.customer.name}</td>
      <td>${order.customer.email}</td>
      <td>${order.customer.phone}</td>
      <td>₹${order.total}</td>
      <td>${new Date(order.date).toLocaleDateString()}</td>
    </tr>
    
    `;

  });

});