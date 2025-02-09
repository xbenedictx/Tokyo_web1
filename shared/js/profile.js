dEventListener('DOMContentLoaded', () => {
    const editBtn = document.querySelector('.edit-btn');
    
    // Load initial data
    loadSupplierData();

    editBtn.onclick = function() {
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
            update(supplierRef, updatedData)
                .then(() => {
                    console.log('Data saved successfully');
                })
                .catch((error) => {
                    console.error('Error saving data:', error);
                });

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

function loadSupplierData() {
    const supplierRef = ref(db, 'suppliers/supplier1');
    onValue(supplierRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
            Object.entries(data).forEach(([key, value]) => {
                const element = document.querySelector(`.info-item:has(label:contains('${key}')) p`);
                if (element) {
                    element.textContent = value;
                }
            });
        }
    });
}
