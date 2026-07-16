const API_URL = "http://localhost:5000/api/products";

let allProducts = [];

/* =========================
   LOAD PRODUCTS
========================= */

function loadProducts(){

fetch(API_URL)
.then(res => res.json())
.then(products => {

allProducts = products;

renderProducts(products);

})
.catch(err => console.error(err));

}


/* =========================
   RENDER PRODUCTS
========================= */

function renderProducts(products){

const list = document.getElementById("product-list");
list.innerHTML = "";

products.forEach((p)=>{

list.innerHTML += `
<div class="product">

<img src="images/${p.image}" class="product-img">

<h3>${p.name}</h3>
<p>₹${p.price}</p>
<p>${p.category}</p>

<div class="actions">

<button onclick='openEdit("${p._id}","${p.name}","${p.price}","${p.category}","${p.image}")'>
Edit
</button>

<button onclick="deleteProduct('${p._id}')">
Delete
</button>

</div>

</div>
`;

});

}


/* =========================
   SEARCH PRODUCTS
========================= */

function searchProducts(){

const keyword = document.getElementById("search").value.toLowerCase();

const filtered = allProducts.filter(p =>

p.name.toLowerCase().includes(keyword) ||
p.category.toLowerCase().includes(keyword)

);

renderProducts(filtered);

}


/* =========================
   ADD PRODUCT
========================= */

function addProduct(){

const name = document.getElementById("name").value.trim();
const price = document.getElementById("price").value;
const category = document.getElementById("category").value.trim();
let image = document.getElementById("image").value.trim();

if(!name || !price || !category || !image){
alert("Please fill all fields");
return;
}

// remove folder if user accidentally types images/
image = image.replace("images/","");

fetch(`${API_URL}/add`,{
method:"POST",
headers:{ "Content-Type":"application/json" },
body:JSON.stringify({
name,
price:Number(price),
category,
image
})
})
.then(res=>res.json())
.then(()=>{

alert("Product Added");

document.getElementById("name").value="";
document.getElementById("price").value="";
document.getElementById("category").value="";
document.getElementById("image").value="";

loadProducts();

})
.catch(err => console.error(err));

}


/* =========================
   DELETE PRODUCT
========================= */

function deleteProduct(id){

if(!confirm("Delete this product?")) return;

fetch(`${API_URL}/${id}`,{
method:"DELETE"
})
.then(res=>res.json())
.then(()=>{

alert("Product Deleted");

loadProducts();

})
.catch(err => console.error(err));

}


/* =========================
   EDIT PRODUCT
========================= */
function openEdit(id,name,price,category,image){

document.getElementById("edit-id").value = id;
document.getElementById("edit-name").value = name;
document.getElementById("edit-price").value = price;
document.getElementById("edit-category").value = category;
document.getElementById("edit-image").value = image;

document.getElementById("editModal").style.display = "flex";

}

function closeModal(){

document.getElementById("editModal").style.display="none";

}


/* =========================
   UPDATE PRODUCT
========================= */
function updateProduct(){

const id = document.getElementById("edit-id").value;

const updatedProduct = {

name: document.getElementById("edit-name").value,
price: Number(document.getElementById("edit-price").value),
category: document.getElementById("edit-category").value,
image: document.getElementById("edit-image").value

};

fetch(`${API_URL}/${id}`,{
method:"PUT",
headers:{
"Content-Type":"application/json"
},
body: JSON.stringify(updatedProduct)
})
.then(res=>res.json())
.then(data=>{

alert("Product Updated Successfully");

closeModal();
loadProducts();

})
.catch(err => console.error(err));

}
/* =========================
   PAGE LOAD
========================= */

window.onload = loadProducts;