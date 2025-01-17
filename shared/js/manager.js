import { checkAuth, handleSignOut } from './auth.js';

document.addEventListener('DOMContentLoaded', () => {
    checkAuth();

    // Load dashboard data
    loadInventoryStats();
    loadRecentShipments();
    
    // Sign out button handler
    document.getElementById('signOutBtn')?.addEventListener('click', handleSignOut);
});

function loadInventoryStats() {
    // Fetch and display inventory statistics
    const stats = {
        totalItems: 156,
        lowStock: 12
    };
    updateDashboardStats(stats);
}

function loadRecentShipments() {
    // Fetch and display recent shipments
    const shipments = [
        {
            date: 'Oct 15, 2023',
            supplier: 'Fresh Veggies Co.',
            status: 'Delivered'
        }
    ];
    updateShipmentsList(shipments);
}