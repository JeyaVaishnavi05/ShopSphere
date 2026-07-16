const recommendationDiv = document.getElementById("recommendations");
const productList = document.getElementById("product-list");

let allProducts = [];

/* LOAD PRODUCTS */

fetch("http://localhost:5000/api/products")
  .then(response => response.json())
  .then(products => {
    allProducts = products;
    displayProducts(products);
  })
  .catch(error => {
    console.error("Error fetching products:", error);
  });


/* DISPLAY PRODUCTS */

function displayProducts(products) {

  productList.innerHTML = "";

  products.forEach(product => {

    const div = document.createElement("div");
    div.className = "product";

    div.innerHTML = `
      <img src="images/${product.image}" alt="${product.name}" class="product-img">
      <h3>${product.name}</h3>
      <p class="price">₹${product.price}</p>
      <p class="category">${product.category}</p>
      <p>${product.description}</p>
      <button onclick="addToCart('${product._id}')">Add to Cart</button>
    `;

    productList.appendChild(div);

  });

}


/* ADD TO CART */

function addToCart(id) {

  fetch(`http://localhost:5000/api/products/${id}`)
    .then(res => res.json())
    .then(product => {

      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      const existing = cart.find(item => item._id === id);

      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push({ ...product, quantity: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(cart));

      alert("Added to cart");

      loadRecommendations(product.category, product._id);

    });

}


/* LOAD RECOMMENDATIONS */

function loadRecommendations(category, currentProductId) {

  fetch(`http://localhost:5000/api/products/recommend/${category}`)
    .then(res => res.json())
    .then(products => {

      recommendationDiv.innerHTML = "";

      products
        .filter(p => p._id !== currentProductId) // remove current product
        .forEach(product => {

          const div = document.createElement("div");
          div.className = "product";

          div.innerHTML = `
            <img src="images/${product.image}" class="product-img">
            <h3>${product.name}</h3>
            <p class="price">₹${product.price}</p>
            <button onclick="addToCart('${product._id}')">Add to Cart</button>
          `;

          recommendationDiv.appendChild(div);

        });

    });

}


/* FILTER + SEARCH + SORT */

function filterCategory() {

  const category = document.getElementById("categoryFilter").value;
  const minPrice = document.getElementById("minPrice").value;
  const maxPrice = document.getElementById("maxPrice").value;
  const sortOption = document.getElementById("sortOption").value;
  const search = document.getElementById("searchInput").value;

  let url = "http://localhost:5000/api/products?";

  if (category) url += `category=${category}&`;
  if (minPrice) url += `minPrice=${minPrice}&`;
  if (maxPrice) url += `maxPrice=${maxPrice}&`;
  if (sortOption) url += `sort=${sortOption}&`;
  if (search) url += `search=${search}&`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      displayProducts(data);
    })
    .catch(error => console.error(error));

}


/* DARK MODE */

function toggleDarkMode() {

  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }

}


/* LOAD SAVED THEME */

window.onload = function () {

  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
  }

  filterCategory();

  // show default recommendations
  loadRecommendations("electronics");

};