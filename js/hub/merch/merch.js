document.addEventListener('DOMContentLoaded', () => {
    const cartCount = document.getElementById('cart-count'); // Cart count display
    let cart = [];  // Array to hold cart items

    // ==== Cart Management ====
    function toggleCart() {
        const cartTab = document.getElementById('cart-tab');
        cartTab.classList.toggle('hidden');
        displayCartItems();
    }

    function closeCartIfClickedOutside(event) {
        const cartTab = document.getElementById('cart-tab');
        const cartIcon = document.getElementById('cart-icon');
        if (!cartTab.contains(event.target) && !cartIcon.contains(event.target)) {
            cartTab.classList.add('hidden');
        }
    }

    function addToCart(product) {
        const quantityInput = document.querySelector(`#quantity-${product.id}`);
        const quantity = parseInt(quantityInput?.value || 1);

        if (quantity <= 0) {
            alert("Please select a valid quantity.");
            return;
        }

        const existingProduct = cart.find(item => item.id === product.id);

        // Restrict the quantity to a maximum of 5
        if (existingProduct) {
            const newQuantity = existingProduct.quantity + quantity;
            if (newQuantity > 5) {
                alert("You can't add more than 5 units of this item.");
                return;
            }
            existingProduct.quantity = newQuantity;
        } else {
            if (quantity > 5) {
                alert("You can't add more than 5 units of this item.");
                return;
            }
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                quantity
            });
        }

        cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
        alert(`${quantity} ${product.name}(s) added to cart`);
        displayCartItems();
    }

    function removeFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);
        cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
        displayCartItems();
    }

    function displayCartItems() {
        const cartItemsContainer = document.getElementById('cart-items');
        const cartTotal = document.getElementById('cart-total-price');

        cartItemsContainer.innerHTML = '';
        let totalPrice = 0;

        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <p>${item.name} (x${item.quantity})</p>
                <p>$${(item.price * item.quantity).toFixed(2)}</p>
                <button class="remove-item" data-product-id="${item.id}">X</button>
            `;
            cartItemsContainer.appendChild(cartItem);
            totalPrice += item.price * item.quantity;

            // Attach event listener to the remove button
            const removeButton = cartItem.querySelector('.remove-item');
            removeButton.addEventListener('click', () => {
                removeFromCart(item.id);
            });
        });

        cartTotal.textContent = totalPrice.toFixed(2);
    }

    // ==== Product Display Management ====
    async function showProducts(subcategoryName) {
        const productDisplaySection = document.getElementById('product-display-section');
        const productsContainer = document.getElementById('products-container');

        // Hide other sections
        document.querySelectorAll('.category-section').forEach(section => {
            section.style.display = 'none';
        });
        productDisplaySection.style.display = 'block'; // Show products section

        // Clear the previous products in the container
        productsContainer.innerHTML = '';

        // Fetch products based on subcategory
        let productsData = [];
        try {
            productsData = await fetchProducts(subcategoryName);
        } catch (error) {
            console.error('Error fetching product data:', error);
        }

        // Display products
        if (productsData.length === 0) {
            const noProductsMessage = document.createElement('p');
            noProductsMessage.textContent = 'No products available for this category.';
            productsContainer.appendChild(noProductsMessage);
        } else {
            productsData.forEach(product => {
                const productCard = createProductCard(product);
                productsContainer.appendChild(productCard);
            });
        }
    }

    async function fetchProducts(subcategoryName) {
        const subcategoryMapping = {
            't-shirts': 't-shirts.json',
            'hoodies': 'hoodies.json',
            'caps': 'caps.json',
            'keychains': 'keychain.json',
            'glasses': 'glasses.json',
            'mini-toys': 'mini-toys.json',
            'posters': 'poster.json'
        };

        const fileName = subcategoryMapping[subcategoryName];
        const filePath = `data/merch/${fileName}`;

        try {
            const response = await fetch(filePath);
            if (!response.ok) {
                throw new Error(`Failed to fetch ${filePath}: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error(`Error fetching products for ${subcategoryName}:`, error);
            return [];
        }
    }

    function createProductCard(product) {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="product-info">
                <h4>${product.name}</h4>
                <p>${product.description}</p>
                <div class="quantity-selector">
                    QTY <input type="number" id="quantity-${product.id}" name="quantity" min="1" max="5" value="1">
                </div>
                <p class="price">$${product.price}</p>
                <button class="add-to-cart" data-product-id="${product.id}">Add to Cart</button>
            </div>
        `;

        productCard.querySelector('.add-to-cart').addEventListener('click', () => {
            addToCart(product);
        });
        return productCard;
    }

    // ==== Category and Subcategory Management ====
    function toggleSubcategory(categoryName) {
        // Hide all subcategory sections first
        document.querySelectorAll('.category-section').forEach(section => {
            section.style.display = 'none';
        });

        // Show the subcategories of the selected category
        const section = document.getElementById(`${categoryName}-section`);
        section.style.display = 'block';
    }

    // ==== Global Event Listeners ====
    document.addEventListener('click', closeCartIfClickedOutside);

    // Expose functions to global scope (if needed for inline event listeners)
    window.toggleCart = toggleCart;
    window.toggleSubcategory = toggleSubcategory;
    window.showProducts = showProducts;
});
