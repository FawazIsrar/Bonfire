// Shared Shopping Cart Logic for Bonfire Pizza & Kitchen
(function () {
    // 1. Inject Cart CSS Styles
    const style = document.createElement('style');
    style.innerHTML = `
        .cart-drawer {
            position: fixed;
            top: 0;
            right: -420px;
            width: 420px;
            height: 100vh;
            background: #fdf9ef; /* Match light background */
            border-left: 1px solid rgba(175, 41, 3, 0.1);
            box-shadow: -10px 0 35px rgba(0, 0, 0, 0.1);
            z-index: 1000;
            transition: right 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            display: flex;
            flex-direction: column;
        }
        .cart-drawer.open {
            right: 0;
        }
        .cart-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0, 0, 0, 0.35);
            backdrop-filter: blur(4px);
            -webkit-backdrop-filter: blur(4px);
            z-index: 990;
            opacity: 0;
            visibility: hidden;
            transition: all 0.4s ease;
        }
        .cart-overlay.open {
            opacity: 1;
            visibility: visible;
        }
        .toast-notification {
            position: fixed;
            bottom: 24px;
            right: 24px;
            background: #af2903;
            color: #ffffff;
            padding: 12px 24px;
            border-radius: 30px;
            box-shadow: 0 8px 24px rgba(175, 41, 3, 0.3);
            z-index: 2000;
            transform: translateY(100px);
            opacity: 0;
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            font-family: 'Space Grotesk', sans-serif;
            font-weight: 600;
        }
        .toast-notification.show {
            transform: translateY(0);
            opacity: 1;
        }
        @media (max-width: 480px) {
            .cart-drawer {
                width: 100vw;
                right: -100vw;
            }
        }
    `;
    document.head.appendChild(style);

    // 2. Injected HTML Elements
    const overlay = document.createElement('div');
    overlay.id = 'cart-overlay';
    overlay.className = 'cart-overlay';
    document.body.appendChild(overlay);

    const drawer = document.createElement('div');
    drawer.id = 'cart-drawer';
    drawer.className = 'cart-drawer p-6 font-body-md text-on-background';
    drawer.innerHTML = `
        <div class="flex justify-between items-center border-b border-surface-container-high pb-4 mb-4">
            <h3 class="font-headline-md text-headline-md text-primary flex items-center gap-2">
                <span class="material-symbols-outlined text-[28px]" style="font-variation-settings: 'FILL' 1;">shopping_cart</span>
                <span>Your Order</span>
            </h3>
            <button id="close-cart-btn" class="p-1 text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center rounded-full hover:bg-surface-container">
                <span class="material-symbols-outlined">close</span>
            </button>
        </div>
        <div id="cart-items-list" class="flex-grow overflow-y-auto space-y-4 pr-1">
            <!-- Items populated by JS -->
        </div>
        <div class="border-t border-surface-container-high pt-4 mt-4 space-y-4">
            <div class="flex justify-between font-headline-sm text-headline-sm font-bold">
                <span>Subtotal:</span>
                <span id="cart-total" class="text-primary font-price-display text-price-display">Rs. 0</span>
            </div>
            <button id="checkout-btn" class="w-full bg-primary text-on-primary font-label-lg text-label-lg py-3 rounded-full hover:bg-surface-tint transition-colors shadow-md">
                Checkout Now
            </button>
        </div>
    `;
    document.body.appendChild(drawer);

    const toast = document.createElement('div');
    toast.id = 'cart-toast';
    toast.className = 'toast-notification';
    document.body.appendChild(toast);

    // 3. Cart State Management
    let cart = JSON.parse(localStorage.getItem('bonfire_cart')) || [];

    // Helper to format currency
    function formatCurrency(value) {
        if (typeof value === 'string' && !isNaN(value)) {
            value = parseFloat(value);
        }
        if (value < 100) {
            // Assume USD from original landing page (e.g. $18)
            return `$${value}`;
        }
        return `Rs.${value}`;
    }

    // Save cart state
    function saveCart() {
        localStorage.setItem('bonfire_cart', JSON.stringify(cart));
        updateCartUI();
    }

    // Show toast notification
    function showToast(message) {
        toast.innerText = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 2500);
    }

    // Add item to cart
    function addToCart(name, price) {
        const parsedPrice = parseFloat(price);
        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ name, price: parsedPrice, quantity: 1 });
        }
        saveCart();
        showToast(`Added ${name} to cart!`);
    }

    // Modify quantity
    function updateQuantity(name, amount) {
        const item = cart.find(item => item.name === name);
        if (!item) return;
        item.quantity += amount;
        if (item.quantity <= 0) {
            cart = cart.filter(i => i.name !== name);
        }
        saveCart();
    }

    // Remove item
    function removeItem(name) {
        cart = cart.filter(item => item.name !== name);
        saveCart();
    }

    // Update the visual cart drawer and badge
    function updateCartUI() {
        const listContainer = document.getElementById('cart-items-list');
        const totalSpan = document.getElementById('cart-total');
        const badgeSpans = document.querySelectorAll('.cart-badge');

        // Render Items
        listContainer.innerHTML = '';
        let total = 0;
        let totalItems = 0;

        if (cart.length === 0) {
            listContainer.innerHTML = `
                <div class="flex flex-col items-center justify-center h-48 text-center text-on-surface-variant opacity-75">
                    <span class="material-symbols-outlined text-5xl mb-2">production_quantity_limits</span>
                    <p class="font-body-md">Your cart is empty.</p>
                </div>
            `;
        } else {
            cart.forEach(item => {
                total += item.price * item.quantity;
                totalItems += item.quantity;

                const itemRow = document.createElement('div');
                itemRow.className = 'flex justify-between items-center bg-surface-container-low p-3 rounded-xl border border-surface-container-high';
                itemRow.innerHTML = `
                    <div class="flex-grow">
                        <h4 class="font-bold text-on-surface text-sm">${item.name}</h4>
                        <span class="text-xs text-primary font-price-display font-bold">${formatCurrency(item.price)}</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <button class="cart-qty-btn flex items-center justify-center w-7 h-7 bg-surface-container rounded-full text-on-surface hover:bg-primary hover:text-on-primary transition-all font-bold text-sm" data-name="${item.name}" data-action="minus">-</button>
                        <span class="font-bold text-sm text-on-surface w-4 text-center">${item.quantity}</span>
                        <button class="cart-qty-btn flex items-center justify-center w-7 h-7 bg-surface-container rounded-full text-on-surface hover:bg-primary hover:text-on-primary transition-all font-bold text-sm" data-name="${item.name}" data-action="plus">+</button>
                        <button class="cart-remove-btn text-on-surface-variant hover:text-primary ml-2 flex items-center justify-center" data-name="${item.name}">
                            <span class="material-symbols-outlined text-[20px]">delete</span>
                        </button>
                    </div>
                `;
                listContainer.appendChild(itemRow);
            });
        }

        totalSpan.innerText = formatCurrency(total);

        // Update Nav Badge
        badgeSpans.forEach(badge => {
            badge.innerText = totalItems;
            if (totalItems > 0) {
                badge.style.display = 'flex';
            } else {
                badge.style.display = 'none';
            }
        });
    }

    // Toggle Drawer Open / Close
    function openCart() {
        drawer.classList.add('open');
        overlay.classList.add('open');
    }

    function closeCart() {
        drawer.classList.remove('open');
        overlay.classList.remove('open');
    }

    // 4. Attach Event Listeners
    document.addEventListener('DOMContentLoaded', () => {
        updateCartUI();

        // Open Cart clicks (delegated to find any click triggers)
        document.addEventListener('click', (e) => {
            const trigger = e.target.closest('.cart-trigger');
            if (trigger) {
                e.preventDefault();
                openCart();
            }

            // Close Cart click
            if (e.target.closest('#close-cart-btn') || e.target.closest('#cart-overlay')) {
                closeCart();
            }

            // Add to Cart Button Click
            const addBtn = e.target.closest('.add-to-cart-btn');
            if (addBtn) {
                e.preventDefault();
                const name = addBtn.getAttribute('data-name');
                const price = addBtn.getAttribute('data-price');
                if (name && price) {
                    addToCart(name, price);
                }
            }

            // Quantity buttons click
            const qtyBtn = e.target.closest('.cart-qty-btn');
            if (qtyBtn) {
                const name = qtyBtn.getAttribute('data-name');
                const action = qtyBtn.getAttribute('data-action');
                if (name && action) {
                    updateQuantity(name, action === 'plus' ? 1 : -1);
                }
            }

            // Remove button click
            const removeBtn = e.target.closest('.cart-remove-btn');
            if (removeBtn) {
                const name = removeBtn.getAttribute('data-name');
                if (name) {
                    removeItem(name);
                }
            }
        });

        // Checkout Button
        const checkoutBtn = document.getElementById('checkout-btn');
        checkoutBtn.addEventListener('click', () => {
            if (cart.length === 0) {
                showToast("Your cart is empty!");
                return;
            }
            alert("🔥 Order placed successfully! The kitchen is already heating up the wood oven for you.");
            cart = [];
            saveCart();
            closeCart();
        });
    });
})();
