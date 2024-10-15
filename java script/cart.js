// Get items from localStorage or create an empty array
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to add items to cart
function addToCart(product, price, image) {
    // Check if the item is already in the cart
    const existingItem = cart.find(i => i.product === product);

    if (existingItem) {
        // If the item already exists, increase the quantity
        existingItem.quantity += 1;
    } else {
        // If it's a new item, add it to the cart
        const item = { product, price, image, quantity: 1 };
        cart.push(item);
    }

    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    alert(`${product} has been added to your cart!`);
}

// Function to load cart items to the cart page
function loadCartItems() {
    const cartItemsContainer = document.querySelector('.cart-items');
    cartItemsContainer.innerHTML = ''; // Clear current items

    let totalPrice = 0;
    cart.forEach((item, index) => {
        const itemTotalPrice = item.price * item.quantity;
        totalPrice += itemTotalPrice;

        // Create HTML for each cart item
        const cartItemHTML = `
        <div class="cart-item">
            <div class="item-info">
                <img src="${item.image}" alt="${item.product}" class="product-image">
                <div class="item-details">
                    <h3>${item.product}</h3>
                </div>
            </div>
            <div class="item-price">
                <span class="current-price">฿${item.price}</span>
            </div>
            <div class="item-quantity">
                <button class="qty-btn" onclick="changeQuantity(${index}, -1)">-</button>
                <input type="text" value="${item.quantity}" class="quantity-input" disabled>
                <button class="qty-btn" onclick="changeQuantity(${index}, 1)">+</button>
            </div>
            <button class="delete-btn" onclick="removeItem(${index})">🗑️</button>
        </div>
        `;
        cartItemsContainer.innerHTML += cartItemHTML;
    });

    // Update the total price
    document.querySelector('.total-amount').innerText = `฿${totalPrice}`;
    document.querySelector('.final-amount').innerText = `฿${totalPrice}`;
}

// Function to change item quantity
function changeQuantity(index, change) {
    cart[index].quantity += change;

    // Remove item if quantity is less than 1
    if (cart[index].quantity < 1) {
        cart.splice(index, 1);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    loadCartItems(); // Reload the cart items
}

// Function to remove item from cart
function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCartItems(); // Reload the cart items
}

// Load the cart items when cart page loads
if (document.querySelector('.cart-items')) {
    loadCartItems();
}