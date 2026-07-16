// PRODUCTS COUNT

fetch("http://localhost:5000/api/products")
.then(res=>res.json())
.then(products=>{

document.getElementById("totalProducts").innerText = products.length;

});


// ORDER ANALYTICS

fetch("http://localhost:5000/api/products")
.then(res=>res.json())
.then(products=>{
document.getElementById("totalProducts").innerText = products.length;
});

fetch("http://localhost:5000/api/orders/analytics")
.then(res=>res.json())
.then(data=>{

document.getElementById("totalOrders").innerText = data.totalOrders;
document.getElementById("totalCustomers").innerText = data.totalCustomers;
document.getElementById("revenue").innerText = data.revenue;

});

// SALES CHART

fetch("http://localhost:5000/api/orders")
.then(res=>res.json())
.then(orders=>{

const labels = [];
const sales = [];

orders.forEach(order=>{

const date = new Date(order.date).toLocaleDateString();

labels.push(date);

sales.push(order.total);

});

const ctx = document.getElementById("salesChart");

new Chart(ctx,{

type:"line",

data:{
labels:labels,
datasets:[{
label:"Sales",
data:sales,
borderColor:"blue",
fill:false
}]
}

});

});