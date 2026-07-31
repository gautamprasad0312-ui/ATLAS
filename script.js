// -----------------------------
// Product Data
// -----------------------------

function getCurrentProduct() {

    const button = document.getElementById("add-to-cart");

    if (!button) return null;

    const qtyElement = document.getElementById("quantity");

    const quantity = qtyElement
        ? Number(qtyElement.textContent)
        : 1;

    return {

        id: Number(button.dataset.id),

        name: button.dataset.name,

        price: Number(button.dataset.price),

        image: button.dataset.image,

        quantity: quantity

    };

}

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

        const product = getCurrentProduct();

        if (!product) {
            alert("Product not found.");
            return;
        }

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

// =========================
// LOAD CHECKOUT
// =========================

function loadCheckout() {

    const checkoutItems = document.getElementById("checkout-items");

    if (!checkoutItems) return;

    const cart = getCart();

    checkoutItems.innerHTML = "";

    let subtotal = 0;

    if (cart.length === 0) {

        checkoutItems.innerHTML = `
            <p>Your cart is empty.</p>
        `;

        return;

    }

    cart.forEach(item => {

        subtotal += item.price * item.quantity;

        checkoutItems.innerHTML += `

            <div class="checkout-item">

                <img src="${item.image}" alt="${item.name}">

                <div class="checkout-item-info">

                    <h3>${item.name}</h3>

                    <p>Price: ₹${item.price.toLocaleString()}</p>

                    <p>Quantity: ${item.quantity}</p>

                    <strong>
                        ₹${(item.price * item.quantity).toLocaleString()}
                    </strong>

                </div>

            </div>

        `;

    });

    const subtotalElement =
        document.getElementById("checkout-subtotal");

    const totalElement =
        document.getElementById("checkout-total");

    if (subtotalElement) {
        subtotalElement.textContent =
            "₹" + subtotal.toLocaleString();
    }

    if (totalElement) {
        totalElement.textContent =
            "₹" + subtotal.toLocaleString();
    }

}

loadCheckout();

// =========================
// CHECKOUT BUTTON
// =========================

const checkoutButton = document.getElementById("checkout-btn");

if (checkoutButton) {

    checkoutButton.addEventListener("click", () => {

        window.location.href = "checkout.html";

    });

}
// =========================
// CONTINUE TO LOGIN
// =========================

const continueButton = document.getElementById("continue-btn");

if (continueButton) {

    continueButton.addEventListener("click", () => {

        window.location.href = "login.html";

    });

}
// =========================
// EMAIL CONTINUE
// =========================

const emailButton = document.getElementById("email-login");

if (emailButton) {

    emailButton.addEventListener("click", () => {

        const email = document
            .getElementById("email")
            .value
            .trim();

        if (email === "") {

            alert("Please enter your email.");

            return;

        }

        localStorage.setItem("customerEmail", email);

        window.location.href = "address.html";

    });

}
// =========================
// GOOGLE LOGIN
// =========================

const googleButton = document.getElementById("google-login");

if (googleButton) {

    googleButton.addEventListener("click", () => {

        alert("Google Login will be enabled soon.");

    });

}

// =========================
// APPLE LOGIN
// =========================

const appleButton = document.getElementById("apple-login");

if (appleButton) {

    appleButton.addEventListener("click", () => {

        alert("Apple Login will be enabled soon.");

    });

}
// =========================
// SAVE ADDRESS
// =========================

const addressForm = document.getElementById("address-form");

if (addressForm) {

    addressForm.addEventListener("submit", function(e){

        e.preventDefault();

        const address = {

            name: document.getElementById("full-name").value,

            mobile: document.getElementById("mobile").value,

            house: document.getElementById("house").value,

            street: document.getElementById("street").value,

            landmark: document.getElementById("landmark").value,

            city: document.getElementById("city").value,

            state: document.getElementById("state").value,

            pincode: document.getElementById("pincode").value

        };

        localStorage.setItem(
            "deliveryAddress",
            JSON.stringify(address)
        );

        alert("Address Saved Successfully!");

        window.location.href = "payment.html";

    });

}
// -----------------------------
// BUY NOW
// -----------------------------

const buyButton = document.getElementById("buy-now");

if (buyButton) {

    buyButton.addEventListener("click", () => {

        const product = getCurrentProduct();

        if (!product) {
            alert("Product not found.");
            return;
        }

        addToCart(product);

        window.location.href = "checkout.html";

    });

}
