document.addEventListener('DOMContentLoaded', function() {
    const toggleBtn = document.getElementById('toggleBtn');
    const sideNavBar = document.getElementById('sideNavBar');
    const contentWrapper = document.querySelector('.contentWrapper');
    
    if (toggleBtn) {
        toggleBtn.addEventListener('click', function() {
            sideNavBar.classList.toggle('expanded');
            contentWrapper.classList.toggle('nav-expanded');
        });
    }

    const addItemBtn = document.getElementById('addItemBtn');
    const addItemModal = document.getElementById('addItemModal');
    const closeBtn = document.querySelector('.close-btn');
    const addItemDoneBtn = document.getElementById('addItemDoneBtn');

    if (addItemBtn) {
        addItemBtn.addEventListener('click', function() {
            if (addItemModal) {
                addItemModal.classList.add('active');
            }
        });
    }
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            if (addItemModal) {
                addItemModal.classList.remove('active');
            }
        });
    }

    if (addItemDoneBtn) {
        addItemDoneBtn.addEventListener('click', function() {
            const loadingStatus = document.querySelector('.status-message.loading');
            if (loadingStatus) {
                loadingStatus.style.display = 'block';
            }

            setTimeout(function() {
                if (loadingStatus) {
                    loadingStatus.style.display = 'none';
                }
                
                const successStatus = document.querySelector('.status-message.success');
                if (successStatus) {
                    successStatus.style.display = 'block';
                    
                    setTimeout(function() {
                        successStatus.style.display = 'none';
                        if (addItemModal) {
                            addItemModal.classList.remove('active');
                        }
                    }, 2000);
                }
            }, 1500);
        });
    }

    const stockCards = document.querySelectorAll('.stock-card');
    stockCards.forEach(card => {
        card.addEventListener('click', function() {
            const itemId = this.getAttribute('data-item-id');
            if (itemId) {
                window.location.href = `selected-inventory-item.html?id=${itemId}`;
            }
        });
    });

    const sortButtons = document.querySelectorAll('.sort-buttons button');
    sortButtons.forEach(button => {
        button.addEventListener('click', function() {
            sortButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            console.log('Sorting by:', this.textContent);
        });
    });

    const uploadBox = document.querySelector('.upload-box');
    if (uploadBox) {
        uploadBox.addEventListener('click', function() {
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = 'image/*';
            fileInput.style.display = 'none';
            
            fileInput.addEventListener('change', function(e) {
                if (e.target.files && e.target.files[0]) {
                    const reader = new FileReader();
                    
                    reader.onload = function(event) {
                        uploadBox.innerHTML = 'Image selected: ' + e.target.files[0].name;
                    };
                    
                    reader.readAsDataURL(e.target.files[0]);
                }
            });
            
            document.body.appendChild(fileInput);
            fileInput.click();
            
            fileInput.onchange = null;
            document.body.removeChild(fileInput);
        });
        
        uploadBox.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.style.borderColor = '#888';
        });
        
        uploadBox.addEventListener('dragleave', function(e) {
            e.preventDefault();
            this.style.borderColor = '#ccc';
        });
        
        uploadBox.addEventListener('drop', function(e) {
            e.preventDefault();
            this.style.borderColor = '#ccc';
            
            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                const file = e.dataTransfer.files[0];
                if (file.type.match('image.*')) {
                    uploadBox.innerHTML = 'Image selected: ' + file.name;
                }
            }
        });
    }
});