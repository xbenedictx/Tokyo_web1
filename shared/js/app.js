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

document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('loginButton');
    const contactAdmin = document.getElementById('contactAdmin');
    const modal = document.getElementById('contactModal');
    const closeBtn = document.getElementsByClassName('close')[0];
    const contactForm = document.getElementById('contactForm');

    loginButton.addEventListener('click', function() {
        const userType = document.getElementById('userTypeSpinner').value;
        const email = document.getElementById('emailInput').value;
        const password = document.getElementById('passwordInput').value;

        if (!email || !password || !userType) {
            alert('Please fill in all fields');
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                
                if (userType === 'Manager') {
                    window.location.href = '/manager/home.html';
                } else if (userType === 'Supplier') {
                    const supplierRoutes = {
                        'elevazobenedict@gmail.com': '/supplier1/home.html',
                        'supplier2@tokyowebapp.com': '/supplier2/home.html',
                        'supplier3@tokyowebapp.com': '/supplier3/home.html'
                    };
                    
                    const redirectPath = supplierRoutes[email];
                    if (redirectPath) {
                        window.location.href = redirectPath;
                    } else {
                        console.log('Login attempt:', email);
                        alert('Please check your email and try again');
                    }
                }
            })
            .catch((error) => {
                alert('Invalid credentials. Please try again.');
                console.error(error.message);
            });
    });

    contactAdmin.onclick = () => {
        modal.style.display = "block";
    }

    closeBtn.onclick = () => {
        modal.style.display = "none";
    }

    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('nameInput').value;
        const email = document.getElementById('contactEmail').value;
        const message = document.getElementById('messageInput').value;

        console.log('Contact Form Submitted:', { name, email, message });
        
        contactForm.reset();
        modal.style.display = "none";
        alert('Message sent successfully!');
    });

    const togglePassword = document.querySelector('.toggle-password');
    const passwordInput = document.getElementById('passwordInput');

    if (togglePassword) {
        togglePassword.addEventListener('click', () => {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            togglePassword.classList.toggle('show');
        });
    }
});
