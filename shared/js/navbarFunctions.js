document.getElementById('sideNavBar').addEventListener('click', function(event) {
    event.preventDefault();  // Prevents the default behavior of the <a> tag (navigating)
        
    const icon = document.getElementById('iconHome');  // Assume 'iconHome' is the id of the icon element
    
    switch (icon.id) {
        case 'iconHome':
            if (icon.src.includes('icon_home.svg')) {
                icon.src = '../shared/icons/icon_home_selected.svg';  // Change to active icon
            } else {
                icon.src = '../shared/icons/icon_home.svg';  // Revert back to home icon
            }
            break;
            
        case 'iconOrder':
            if (icon.src.includes('icon_order.svg')) {
                icon.src = '../shared/icons/icon_order_selected.svg';  // Change to active icon
            } else {
                icon.src = '../shared/icons/icon_order.svg';  // Revert back to order icon
            }
            break;
    
        case 'iconStock':
            if (icon.src.includes('icon_stock.svg')) {
                icon.src = '../shared/icons/icon_stock_selected.svg';  
            } else {
                icon.src = '../shared/icons/icon_stock.svg';  
            }
            break;
    
        case 'iconRecipes':
            if (icon.src.includes('icon_recipes.svg')) {
                icon.src = '../shared/icons/icon_recipes_selected.svg';  
            } else {
                icon.src = '../shared/icons/icon_recipes.svg';  
            }
            break;
    
        case 'iconSupplier':
            if (icon.src.includes('icon_stock.svg')) {
                icon.src = '../shared/icons/icon_supplier_selected.svg';  
            } else {
                icon.src = '../shared/icons/icon_supplier.svg';  
            }
            break;
    
        // Add other cases for other icons as needed
        default:
            console.log('Icon not recognized');
    }
});
// alert('hello');