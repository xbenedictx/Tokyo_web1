import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDXb6gt6pei2VeFT0QWVBIkz4ZyXhsHrQE",
    authDomain: "tokyowebapp.firebaseapp.com",
    projectId: "tokyowebapp",
    storageBucket: "tokyowebapp.firebasestorage.app",
    messagingSenderId: "796275562397",
    appId: "1:796275562397:web:d61b511c9bc41d93b58174"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

// DOM Elements
const userTypeSpinner = document.getElementById('userTypeSpinner');
const emailInput = document.getElementById('emailInput');
const passwordInput = document.getElementById('passwordInput');
const loginButton = document.getElementById('loginButton');
const modal = document.getElementById('contactModal');
const contactAdmin = document.getElementById('contactAdmin');
const closeBtn = document.getElementsByClassName('close')[0];
const contactForm = document.getElementById('contactForm');

// Add floating label effect
const inputs = document.querySelectorAll('.form-input');
inputs.forEach(input => {
    input.addEventListener('input', () => {
        if (input.value) {
            input.classList.add('has-value');
        } else {
            input.classList.remove('has-value');
        }
    });
});

// Login functionality
loginButton.addEventListener('click', async () => {
    const selectedRole = userTypeSpinner.value;
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!selectedRole || !email || !password) {
        alert('Please fill in all fields');
        return;
    }

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        if (selectedRole === 'Manager') {
            window.location.href = 'manager.html';
        } else {
            window.location.href = 'supplier.html';
        }
    } catch (error) {
        alert('Invalid credentials');
    }
});

// Modal functionality
contactAdmin.onclick = function() {
    modal.style.display = "block";
}

closeBtn.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Contact form submission
contactForm.onsubmit = async function(e) {
    e.preventDefault();
    const name = document.getElementById('nameInput').value;
    const email = document.getElementById('contactEmail').value;
    const message = document.getElementById('messageInput').value;
    
    try {
        await addDoc(collection(db, "contactRequests"), {
            name: name,
            email: email,
            message: message,
            timestamp: new Date(),
            status: "pending"
        });
        
        alert('Your message has been sent to the admin. We will contact you soon!');
        modal.style.display = "none";
        contactForm.reset();
    } catch (error) {
        alert('Error sending message. Please try again.');
    }
}
