import { initializeApp } from 'firebase/app';
import { getDatabase, ref, update, onValue } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyDXb6gt6pei2VeFT0QWVBIkz4ZyXhsHrQE",
    authDomain: "tokyowebapp.firebaseapp.com",
    projectId: "tokyowebapp",
    storageBucket: "tokyowebapp.firebasestorage.app",
    messagingSenderId: "796275562397",
    appId: "1:796275562397:web:d61b511c9bc41d93b58174"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Wrap everything in DOMContentLoaded
// Basic click functionality first
document.addEventListener('DOMContentLoaded', () => {
    const editBtn = document.querySelector('.edit-btn');
    console.log('Edit button found:', editBtn); // Debug line

    editBtn.onclick = function() {
        console.log('Button clicked'); // Debug line
        const infoItems = document.querySelectorAll('.info-item p');
        
        if (this.textContent === 'Edit Details') {
            // Enter edit mode
            infoItems.forEach(item => {
                const currentValue = item.textContent;
                const input = document.createElement('input');
                input.value = currentValue;
                input.className = 'edit-input';
                item.parentNode.replaceChild(input, item);
            });
            
            this.textContent = 'Save Changes';
            this.classList.add('save-btn');
        } else {
            // Save changes
            const inputs = document.querySelectorAll('.edit-input');
            const updatedData = {};
            
            inputs.forEach(input => {
                const label = input.parentNode.querySelector('label').textContent.toLowerCase();
                updatedData[label] = input.value;
            });
        
            // Update Firebase
            const supplierRef = ref(db, 'suppliers/supplier1');
            update(supplierRef, updatedData);
        
            // Update UI
            inputs.forEach(input => {
                const p = document.createElement('p');
                p.textContent = input.value;
                input.parentNode.replaceChild(p, input);
            });
            
            this.textContent = 'Edit Details';
            this.classList.remove('save-btn');
        }
        
    };
});
