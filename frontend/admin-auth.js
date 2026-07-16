function login(){

const user = document.getElementById("username").value;
const pass = document.getElementById("password").value;

if(user === "admin@ss" && pass === "admin1234"){

localStorage.setItem("adminLoggedIn","true");

window.location.href = "admin-dashboard.html";

}
else{

document.getElementById("error").innerText="Invalid login";

}

}