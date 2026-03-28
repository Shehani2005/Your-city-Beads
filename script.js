// Get user data from localStorage and convert it from JSON to object
const user = JSON.parse(localStorage.getItem("user"));

// If user exists, show their name in the navbar
if(user){
    const nav = document.getElementById("navbar");

    const li = document.createElement("li");
    li.innerHTML = "Hello, " + user.name;
    nav.appendChild(li);
}

// Logout function (removes user data and redirects to login page)
function logout(){
    localStorage.removeItem("user");
    alert("Logged out");
    window.location.href = "login.html";
}

// Variable to track edit mode
let isEditing = false;

// Get profile elements
const nameEl = document.getElementById("userName");
const emailEl = document.getElementById("email");
const phoneEl = document.getElementById("phone");
const addressEl = document.getElementById("address");
const profilePic = document.getElementById("profilePic");
const saveBtn = document.getElementById("saveBtn");

// Load user data into profile fields
if (user) {
    nameEl.innerText = user.name;   //Set name
    emailEl.value = user.email;     //Set email
    phoneEl.value = user.phone;     //Set phone
    addressEl.value = user.address; // Set address

    updateInitials(user.name);    // Show initials in profile picture
}

// Disable input fields at the beginning
setInputsDisabled(true);

// Function to enable editing mode
function toggleEdit() {
    isEditing = true;         // Set editing to true
    setInputsDisabled(false);        // Enable input fields
    saveBtn.style.display = "block";            // Show save button
}

// Save profile
function saveProfile() {
    const updatedUser = {
        name: nameEl.innerText,     // Get updated name
        email: emailEl.value,       // Get updated email
        phone: phoneEl.value,       // Get updated phone
        address: addressEl.value,   // Get updated address
        password: user.password     // Keep old password
    };

    // Save updated user back to localStorage
    localStorage.setItem("user", JSON.stringify(updatedUser));

    updateInitials(updatedUser.name);   // Update initials display

    setInputsDisabled(true);          // Disable inputs again
    saveBtn.style.display = "none";   // Hide save button

    alert("Profile updated!");        // Show confirmation
} 

// Enable/disable input fields
function setInputsDisabled(state) {
    emailEl.disabled = state;        // Disable/enable email
    phoneEl.disabled = state;        // Disable/enable phone
    addressEl.disabled = state;      // Disable/enable address
}

// Generate initials from name
function updateInitials(name) {
    const initials = name
        .split(" ")           // Split name into words
        .map(word => word[0])       // Take first letter of each word
        .join("")           // Join letters
        .toUpperCase();     // Convert to uppercase

    profilePic.innerText = initials;    // Display initials
}

// Signup form submit event
document.getElementById("signupForm").addEventListener("submit", function(e){
    e.preventDefault();

     // Create user object from form inputs
    const user = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        password: document.getElementById("password").value
    };

    const confirmPassword = document.getElementById("confirmPassword").value;

    // Check if passwords match
    if(user.password !== confirmPassword){
        document.getElementById("signupError").style.display = "block";
        return;
    }

    // Save user in localStorage
    localStorage.setItem("user", JSON.stringify(user));

    alert("Registered successfully!");
    window.location.href = "login.html";    // Redirect to login page
});

// Login form submit event
document.getElementById("loginForm").addEventListener("submit", function(e){
    e.preventDefault();    // Prevent page reload

    // Get entered email and password
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

     // Get stored user
    const user = JSON.parse(localStorage.getItem("user"));

    // If no user found
    if(!user){
        alert("No account found! Please sign up.");
        window.location.href = "signup.html";
        return;
    }

    // Check login credentials
    if(email === user.email && password === user.password){
        alert("Login successful!");
        window.location.href = "index.html";
    } else {
        document.getElementById("loginError").style.display = "block";  // Show error
    }
});

//JavaScript for login 
const loginForm = document.getElementById('loginForm');
// Add event listener for form submission
loginForm.addEventListener('submit', function(e){
    // Prevent page reload
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Simple demo login check
        if(email === "test@example.com" && password === "1234"){
            // Success message
            alert("Login successful!");
        } else {
            // Show error message if login fails
            document.getElementById('loginError').style.display = "block";
        }
    });

//Sign up
    // Get the signup form element by its ID
    const signupForm = document.getElementById('signupForm');
    // Add an event listener for the 'submit' event of the form
    signupForm.addEventListener('submit', function(e){
        // Prevent the default form submission 
            e.preventDefault();
            
            // Get the value entered in the password field
            const password = document.getElementById('password').value;
            // Get the value entered in the confirm password field
            const confirmPassword = document.getElementById('confirmPassword').value;

            // Check if the password and confirm password match
            if(password !== confirmPassword){
                // If they don't match, show an error message
                document.getElementById('signupError').style.display = "block";
            } else {
                // If passwords match, show a success alert
                alert("Registration successful! Please login.");
                 // Redirect the user to the login page
                window.location.href = "login.html"; // redirect to login page
            }
        });
    
