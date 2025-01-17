import { checkAuth, handleSignOut } from './auth.js';
import { updateTransactionStatus, getTransactionHistory } from './transaction.js';

document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    initializeSupplierDashboard();
    setupEventListeners();
});

function initializeSupplierDashboard() {
    loadActiveDeliveries();
    loadRecentTransactions();
    loadProfileData();
    updateNotifications();
}

function setupEventListeners() {
    // Navigation handlers
    document.getElementById('signOutBtn')?.addEventListener('click', handleSignOut);
    
    // Delivery form handlers
    const deliveryForm = document.getElementById('deliveryForm');
    if (deliveryForm) {
        deliveryForm.addEventListener('submit', handleDeliverySubmission);
    }

    // Transaction handlers
    setupTransactionHandlers();
    
    // Profile form handlers
    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        profileForm.addEventListener('submit', handleProfileUpdate);
    }
}

// Delivery Functions
function loadActiveDeliveries() {
    const deliveries = [
        {
            id: 'DEL001',
            status: 'On the way',
            eta: '30 minutes',
            items: [
                { name: 'Carrots', quantity: '10kg' },
                { name: 'Cabbage', quantity: '5kg' }
            ]
        }
    ];
    updateDeliveryStatus(deliveries);
}

function handleDeliverySubmission(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    // Process delivery submission
}

// Transaction Functions
function loadRecentTransactions() {
    getTransactionHistory('supplier1').then(transactions => {
        updateTransactionList(transactions);
    });
}

function setupTransactionHandlers() {
    const transactionButtons = document.querySelectorAll('.transaction-action');
    transactionButtons.forEach(button => {
        button.addEventListener('click', handleTransactionAction);
    });
}

function handleTransactionAction(e) {
    const action = e.target.dataset.action;
    const transactionId = e.target.dataset.id;
    
    switch(action) {
        case 'accept':
            updateTransactionStatus(transactionId, 'accepted');
            break;
        case 'decline':
            updateTransactionStatus(transactionId, 'declined');
            break;
    }
}

// Profile Functions
function loadProfileData() {
    const profileData = {
        companyName: 'Fresh Veggies Co.',
        contactPerson: 'John Doe',
        email: 'john@freshveggies.com',
        phone: '(123) 456-7890'
    };
    updateProfileFields(profileData);
}

function handleProfileUpdate(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    // Process profile update
}

// UI Update Functions
function updateDeliveryStatus(deliveries) {
    const statusContainer = document.querySelector('.status-cards');
    if (!statusContainer) return;

    const deliveryHTML = deliveries.map(delivery => `
        <div class="status-card">
            <h3>Delivery #${delivery.id}</h3>
            <p>Status: ${delivery.status}</p>
            <p>ETA: ${delivery.eta}</p>
            <button class="action-button">Update Status</button>
        </div>
    `).join('');

    statusContainer.innerHTML = deliveryHTML;
}

function updateTransactionList(transactions) {
    const listContainer = document.querySelector('.transaction-list');
    if (!listContainer) return;

    const transactionHTML = transactions.map(transaction => `
        <div class="transaction-item">
            <span class="date">${transaction.date}</span>
            <span class="type">${transaction.type}</span>
            <span class="status status-${transaction.status.toLowerCase()}">${transaction.status}</span>
        </div>
    `).join('');

    listContainer.innerHTML = transactionHTML;
}

function updateProfileFields(data) {
    Object.keys(data).forEach(key => {
        const field = document.getElementById(`${key}Input`);
        if (field) field.value = data[key];
    });
}

function updateNotifications() {
    // Handle real-time notifications
}
