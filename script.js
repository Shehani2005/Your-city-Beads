const user = JSON.parse(localStorage.getItem("user"));

if(user){
    const nav = document.getElementById("navbar");

    const li = document.createElement("li");
    li.innerHTML = "Hello, " + user.name;
    nav.appendChild(li);
}

// logout function
function logout(){
    localStorage.removeItem("user");
    alert("Logged out");
    window.location.href = "login.html";
}

let isEditing = false;

const user = JSON.parse(localStorage.getItem("user"));

const nameEl = document.getElementById("userName");
const emailEl = document.getElementById("email");
const phoneEl = document.getElementById("phone");
const addressEl = document.getElementById("address");
const profilePic = document.getElementById("profilePic");
const saveBtn = document.getElementById("saveBtn");

// Load user data
if (user) {
    nameEl.innerText = user.name;
    emailEl.value = user.email;
    phoneEl.value = user.phone;
    addressEl.value = user.address;

    updateInitials(user.name);
}

// Disable inputs initially
setInputsDisabled(true);

// Toggle edit mode
function toggleEdit() {
    isEditing = true;
    setInputsDisabled(false);
    saveBtn.style.display = "block";
}

// Save profile
function saveProfile() {
    const updatedUser = {
        name: nameEl.innerText,
        email: emailEl.value,
        phone: phoneEl.value,
        address: addressEl.value,
        password: user.password
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));

    updateInitials(updatedUser.name);

    setInputsDisabled(true);
    saveBtn.style.display = "none";

    alert("Profile updated!");
}

// Enable/Disable inputs
function setInputsDisabled(state) {
    emailEl.disabled = state;
    phoneEl.disabled = state;
    addressEl.disabled = state;
}

// Update initials
function updateInitials(name) {
    const initials = name
        .split(" ")
        .map(word => word[0])
        .join("")
        .toUpperCase();

    profilePic.innerText = initials;
}
document.getElementById("signupForm").addEventListener("submit", function(e){
    e.preventDefault();

    const user = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        password: document.getElementById("password").value
    };

    const confirmPassword = document.getElementById("confirmPassword").value;

    if(user.password !== confirmPassword){
        document.getElementById("signupError").style.display = "block";
        return;
    }

    localStorage.setItem("user", JSON.stringify(user));

    alert("Registered successfully!");
    window.location.href = "login.html";
});

document.getElementById("loginForm").addEventListener("submit", function(e){
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const user = JSON.parse(localStorage.getItem("user"));

    if(!user){
        alert("No account found! Please sign up.");
        window.location.href = "signup.html";
        return;
    }

    if(email === user.email && password === user.password){
        alert("Login successful!");
        window.location.href = "index.html";
    } else {
        document.getElementById("loginError").style.display = "block";
    }
});

function sortLowToHigh() {
    let productList = document.getElementById("product-list");
    let products = Array.from(productList.getElementsByClassName("product"));

    products.sort(function(a, b) {
        return a.dataset.price - b.dataset.price;
    });

    productList.innerHTML = "";

    products.forEach(function(product) {
        productList.appendChild(product);
    });
}