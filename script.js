/* A little piece of VK ♡ */
console.log("GLOW & BLUSH");

// Product information. Keep product image files in the same folder as index.html.
const productList = [
    { name: "Blush", price: 599, image: "product1.jpg", category: "Makeup" },
    { name: "Glitter", price: 450, image: "product2.jpg", category: "Makeup" },
    { name: "Lipstick", price: 850, image: "product3.jpg", category: "Makeup" },
    { name: "Mascara", price: 799, image: "product4.jpg", category: "Makeup" },
    { name: "Night Cream", price: 1200, image: "product5.jpg", category: "Skincare" },
    { name: "Moisturiser", price: 950, image: "product7.jpg", category: "Skincare" },
    { name: "Foot Cream", price: 550, image: "product8.jpg", category: "Skincare" },
    { name: "Eyeliner", price: 400, image: "product9.jpg", category: "Makeup" },
    { name: "Eyeshadow", price: 1000, image: "product10.jpg", category: "Makeup" },
    { name: "Foundation", price: 1500, image: "product11.jpg", category: "Makeup" },
    { name: "Face Primer", price: 900, image: "product12.jpg", category: "Makeup" },
    { name: "Eyelashes", price: 350, image: "product14.jpg", category: "Makeup" },
    { name: "Eye Mask", price: 250, image: "product15.jpg", category: "Skincare" },
    { name: "Nail Polish", price: 300, image: "product17.jpg", category: "Makeup" },
    { name: "Serum", price: 1300, image: "product18.jpg", category: "Skincare" },
    { name: "Lipliner", price: 350, image: "product19.jpg", category: "Makeup" },
    { name: "Setting Spray", price: 750, image: "product20.jpg", category: "Makeup" },
    { name: "Black Mask", price: 200, image: "product21.jpg", category: "Skincare" }
];

const shades = [
    { name: "Rose Pink", color: "#D96B91", image: "product3.jpg" },
    { name: "Peach Nude", color: "#E9B99D", image: "peach-nude.jpg" },
    { name: "Cherry Red", color: "#C62845", image: "cherry-red.jpg" },
    { name: "Berry Wine", color: "#70243F", image: "berry-wine.jpg" }
];

// DOM elements
const productsContainer = document.querySelector(".products");
const countElement = document.querySelector("#count");
const totalElement = document.querySelector("#total");
const cartTotalElement = document.querySelector("#cart-total");
const cartItemsElement = document.querySelector("#cart-items");
const cartPanel = document.querySelector("#cart-panel");
const cartTrigger = document.querySelector("#cartcount");
const searchInput = document.querySelector("#product-search");
const noProductsMessage = document.querySelector("#no-products");

let cart = [];
let selectedCategory = "All";

// Format prices consistently.
const formatPrice = (amount) => `Rs. ${amount.toLocaleString("en-PK")}`;

function updateCartDisplay() {
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    countElement.textContent = itemCount;
    totalElement.textContent = formatPrice(totalPrice);
    cartTotalElement.textContent = `Total: ${formatPrice(totalPrice)}`;

    cartItemsElement.replaceChildren();

    if (cart.length === 0) {
        const emptyMessage = document.createElement("p");
        emptyMessage.className = "empty-cart";
        emptyMessage.textContent = "Your beauty bag is waiting for you.";
        cartItemsElement.append(emptyMessage);
        return;
    }

    cart.forEach((item) => {
        const row = document.createElement("div");
        row.className = "cart-item";

        const details = document.createElement("div");
        details.className = "cart-item-details";

        const name = document.createElement("strong");
        name.textContent = item.name;

        const price = document.createElement("span");
        price.textContent = `${formatPrice(item.price)} × ${item.quantity}`;

        details.append(name, price);

        const removeButton = document.createElement("button");
        removeButton.type = "button";
        removeButton.className = "remove-item";
        removeButton.textContent = "Remove";
        removeButton.setAttribute("aria-label", `Remove ${item.name} from cart`);
        removeButton.addEventListener("click", () => removeFromCart(item.name));

        row.append(details, removeButton);
        cartItemsElement.append(row);
    });
}

function addToCart(product) {
    const existingItem = cart.find((item) => item.name === product.name);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartDisplay();
}

function removeFromCart(productName) {
    const item = cart.find((cartItem) => cartItem.name === productName);
    if (!item) return;

    item.quantity -= 1;
    if (item.quantity <= 0) {
        cart = cart.filter((cartItem) => cartItem.name !== productName);
    }

    updateCartDisplay();
}

function createProductCard(product) {
    const card = document.createElement("article");
    card.className = "product";
    card.dataset.category = product.category;

    const imageWrap = document.createElement("div");
    imageWrap.className = "product-image-wrap";

    const image = document.createElement("img");
    image.src = product.image;
    image.alt = product.name;
    image.loading = "lazy";
    image.addEventListener("error", () => {
        image.classList.add("image-missing");
        image.alt = `${product.name} image is unavailable`;
    }, { once: true });
    imageWrap.append(image);

    const category = document.createElement("span");
    category.className = "product-category";
    category.textContent = product.category;

    const title = document.createElement("h3");
    title.textContent = product.name;

    const price = document.createElement("p");
    price.className = "product-price";
    price.textContent = formatPrice(product.price);

    if (product.name === "Lipstick") {
        const shadeBox = document.createElement("div");
        shadeBox.className = "shades";
        shadeBox.setAttribute("aria-label", "Choose lipstick shade");

        shades.forEach((shade, index) => {
            const shadeButton = document.createElement("button");
            shadeButton.type = "button";
            shadeButton.className = "shade-btn";
            shadeButton.style.setProperty("--shade-color", shade.color);
            shadeButton.title = shade.name;
            shadeButton.setAttribute("aria-label", shade.name);
            shadeButton.setAttribute("aria-pressed", index === 0 ? "true" : "false");

            if (index === 0) shadeButton.classList.add("selected");

            shadeButton.addEventListener("click", () => {
                image.src = shade.image;
                image.alt = `${product.name} - ${shade.name}`;

                shadeBox.querySelectorAll(".shade-btn").forEach((button) => {
                    button.classList.remove("selected");
                    button.setAttribute("aria-pressed", "false");
                });

                shadeButton.classList.add("selected");
                shadeButton.setAttribute("aria-pressed", "true");
            });

            const option = document.createElement("div");
            option.className = "shade-option";

            const label = document.createElement("span");
            label.className = "shade-label";
            label.textContent = shade.name;

            option.append(shadeButton, label);
            shadeBox.append(option);
        });

        card.append(imageWrap, category, title, shadeBox, price);
    } else {
        card.append(imageWrap, category, title, price);
    }

    const addButton = document.createElement("button");
    addButton.type = "button";
    addButton.className = "button button-add";
    addButton.textContent = "Add to bag";
    addButton.addEventListener("click", () => {
        addToCart(product);
        addButton.textContent = "Added ✓";
        window.setTimeout(() => {
            addButton.textContent = "Add to bag";
        }, 900);
    });

    card.append(addButton);
    return card;
}

function renderProducts() {
    productsContainer.replaceChildren();
    productList.forEach((product) => {
        productsContainer.append(createProductCard(product));
    });
    filterProducts();
}

function filterProducts() {
    const searchText = searchInput.value.toLowerCase().trim();
    const cards = productsContainer.querySelectorAll(".product");
    let visibleCount = 0;

    cards.forEach((card) => {
        const product = productList.find((item) => item.name === card.querySelector("h3").textContent);
        const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
        const matchesSearch = `${product.name} ${product.category}`.toLowerCase().includes(searchText);
        const isVisible = matchesCategory && matchesSearch;

        card.hidden = !isVisible;
        if (isVisible) visibleCount += 1;
    });

    noProductsMessage.hidden = visibleCount !== 0;
}

function setCategory(category) {
    selectedCategory = category;

    const buttons = [
        [document.querySelector("#all-btn"), "All"],
        [document.querySelector("#makeup-btn"), "Makeup"],
        [document.querySelector("#skincare-btn"), "Skincare"]
    ];

    buttons.forEach(([button, value]) => {
        const active = value === category;
        button.classList.toggle("active", active);
        button.setAttribute("aria-pressed", String(active));
    });

    filterProducts();
}

// Category filters and live search
document.querySelector("#all-btn").addEventListener("click", () => setCategory("All"));
document.querySelector("#makeup-btn").addEventListener("click", () => setCategory("Makeup"));
document.querySelector("#skincare-btn").addEventListener("click", () => setCategory("Skincare"));
searchInput.addEventListener("input", filterProducts);

// Shopping bag open/close
cartTrigger.addEventListener("click", () => {
    const willOpen = cartPanel.hidden;
    cartPanel.hidden = !willOpen;
    cartTrigger.setAttribute("aria-expanded", String(willOpen));
});

function closeCart() {
    cartPanel.hidden = true;
    cartTrigger.setAttribute("aria-expanded", "false");
}

document.querySelector("#close-cart").addEventListener("click", closeCart);
document.querySelector("#continue-shopping").addEventListener("click", closeCart);

document.addEventListener("click", (event) => {
    const clickedInsideCart = cartPanel.contains(event.target);
    const clickedTrigger = cartTrigger.contains(event.target);
    if (!cartPanel.hidden && !clickedInsideCart && !clickedTrigger) closeCart();
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeCart();
});

// Scroll reveal animation. Content remains visible if IntersectionObserver is unsupported.
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                currentObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealElements.forEach((element) => observer.observe(element));
} else {
    revealElements.forEach((element) => element.classList.add("show"));
}

document.querySelector("#year").textContent = new Date().getFullYear();

renderProducts();
updateCartDisplay();
console.log("Products loaded successfully!");
