// =========================
// ATLAS SHOPPING CART
// =========================

const product = {
    id: 1,
    name: "iPhone 16 Pro",
    price: 119999,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600"
};

// ---------- ADD TO CART ----------

const addBtn = document.getElementById("add-to-cart");

if (addBtn) {

    addBtn.addEventListener("click", () => {

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        const existing = cart.find(item => item.id === product.id);

        if (existing) {
            existing.quantity++;
        } else {
            cart.push({
                ...product,
                quantity: 1
            });
        }

        localStorage.setItem("cart", JSON.stringify(cart));

updateCartCount();

alert("Product added to cart!");
    });

}

// ---------- LOAD CART ----------

const cartContainer = document.getElementById("cart-items");

if (cartContainer) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let totalItems = 0;
    let totalPrice = 0;

    cart.forEach(item => {

        totalItems += item.quantity;
        totalPrice += item.price * item.quantity;

        cartContainer.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}" width="120">

                <div>

                    <h3>${item.name}</h3>

                    <p>₹${item.price.toLocaleString()}</p>

                    <p>Quantity: ${item.quantity}</p>

                </div>

            </div>
        `;

    });

    document.getElementById("total-items").innerText = totalItems;

    document.getElementById("total-price").innerText =
        "₹" + totalPrice.toLocaleString();

}
// =========================
// UPDATE CART COUNT
// =========================

function updateCartCount() {

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    let total = 0;

    cart.forEach(item => {
        total += item.quantity;
    });

    const cartCount = document.getElementById("cart-count");

    if (cartCount) {
        cartCount.textContent = total;
    }

}

updateCartCount();
