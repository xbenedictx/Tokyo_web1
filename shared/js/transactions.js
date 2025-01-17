export const updateTransactionStatus = async (transactionId, newStatus) => {
    try {
        // Update transaction status in database
        return { success: true, message: 'Status updated successfully' };
    } catch (error) {
        console.error('Error updating transaction:', error);
        return { success: false, message: error.message };
    }
};

export const getTransactionHistory = async (supplierId, dateRange) => {
    try {
        // Fetch transaction history
        return [
            {
                id: '123',
                date: 'Oct 15, 2023',
                items: ['Carrots - 10kg', 'Cabbage - 5kg'],
                status: 'Completed'
            }
        ];
    } catch (error) {
        console.error('Error fetching transactions:', error);
        return [];
    }
};
