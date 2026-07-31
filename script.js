// ======================================
// ATLAS - MAIN SCRIPT
// Version 2.0
// ======================================

// -----------------------------
// Product Data (Temporary)
// -----------------------------

const product = {
    id: 1,
    name: "iPhone 16 Pro",
    price: 119999,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600"
};

// -----------------------------
// Get Cart
// -----------------------------

function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

// -----------------------------
// Save Cart
// -----------------------------

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// -----------------------------
// Update Cart Count
// -----------------------------

function updateCartCount() {

    const cart = getCart();

    let total = 0;

    cart.forEach(item => {
        total += item.quantity;
    });

    const cartCount = document.getElementById("cart-count");

    if (cartCount) {
        cartCount.textContent = total;
    }

}

// -----------------------------
// Add Product To Cart
// -----------------------------

function addToCart(product) {

    let cart = getCart();

    const existing = cart.find(item => item.id === product.id);

    if (existing) {

        existing.quantity++;

    } else {

        cart.push({
            ...product,
            quantity: 1
        });

    }

    saveCart(cart);

    updateCartCount();

    alert("✅ Product added to cart!");

}

// -----------------------------
// Product Page
// -----------------------------

const addButton = document.getElementById("add-to-cart");

if (addButton) {

    addButton.addEventListener("click", () => {

        addToCart(product);

    });

}

// -----------------------------
// Load Cart Page
// -----------------------------

function loadCart() {

    const cartContainer = document.getElementById("cart-items");

    if (!cartContainer) return;

    const cart = getCart();

    cartContainer.innerHTML = "";

    let totalItems = 0;
    let totalPrice = 0;

    cart.forEach(item => {

        totalItems += item.quantity;
        totalPrice += item.price * item.quantity;

        cartContainer.innerHTML += `

        <div class="cart-item">

            <img src="${item.image}" width="120" alt="${item.name}">

            <div>

                <h3>${item.name}</h3>

                <p>₹${item.price.toLocaleString()}</p>

                <p>Quantity: ${item.quantity}</p>

            </div>

        </div>

        `;

    });

    const totalItemsElement = document.getElementById("total-items");

    if (totalItemsElement) {
        totalItemsElement.textContent = totalItems;
    }

    const totalPriceElement = document.getElementById("total-price");

    if (totalPriceElement) {
        totalPriceElement.textContent =
            "₹" + totalPrice.toLocaleString();
    }

}

// -----------------------------
// Initialize Website
// -----------------------------

updateCartCount();

loadCart();
