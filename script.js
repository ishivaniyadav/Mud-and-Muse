// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Cart button functionality
function handleCartButtons(selector) {
    document.querySelectorAll(selector).forEach(button => {
        button.addEventListener('click', () => {
            
        });
    });
}

// Apply to all product buttons
handleCartButtons('.product-card button');
handleCartButtons('.product-item button');

// Contact form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for reaching out! We’ll get back to you soon.');
        this.reset();
    });
}

// Remove duplicate testimonials
const testimonials = document.querySelectorAll('.testimonial-item');
const uniqueContents = new Set();
testimonials.forEach(item => {
    const content = item.innerText.trim();
    if (uniqueContents.has(content)) {
        item.remove();
    } else {
        uniqueContents.add(content);
    }
});
// Cart system
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update cart count
function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').innerText = count;
}

// Add item to cart
function addToCart(name, price, image) {
    const existing = cart.find(item => item.name === name);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ name, price, image, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

// Hook add to cart buttons
document.querySelectorAll('.product-card button, .product-item button').forEach(button => {
    button.addEventListener('click', (e) => {
        const card = e.target.closest('.product-card, .product-item');
        const name = card.querySelector('h3').innerText;
        const price = parseFloat(card.querySelector('p').innerText.replace('$', ''));
        const image = card.querySelector('img').src;
        addToCart(name, price, image);
        alert(`${name} added to cart!`);
    });
});

// Initialize cart count on page load
updateCartCount();
// Modal Elements
const shopModal = document.getElementById('shop-modal');
const modalImage = document.getElementById('modal-image');
const modalPrice = document.getElementById('modal-price');
const modalCheckoutBtn = document.getElementById('modal-checkout-btn');
const closeBtn = document.querySelector('.close-btn');

// Open modal on Shop Now click
document.querySelectorAll('.product-category .shop-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
        const productCategory = e.target.closest('.product-category');
        const imgSrc = productCategory.querySelector('img').src;
        const name = productCategory.querySelector('h3').innerText;
        const randomPrice = (Math.floor(Math.random() * 100) + 10); // random price $10-$109

        modalImage.src = imgSrc;
        document.getElementById('modal-name').innerText = name;
        modalPrice.innerText = `$${randomPrice}`;
        shopModal.style.display = 'block';
    });
});

// Close modal
closeBtn.addEventListener('click', () => {
    shopModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target == shopModal) {
        shopModal.style.display = 'none';
    }
});

// Proceed to checkout button inside modal
// Proceed to checkout button inside modal
modalCheckoutBtn.addEventListener('click', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({
        name: document.getElementById('modal-name').innerText,
        price: parseFloat(document.getElementById('modal-price').innerText.replace('$', '')),
        image: document.getElementById('modal-image').src,
        quantity: 1
    });
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount(); // update navbar cart count
    shopModal.style.display = 'none';
    
    // Redirect to cart page
    window.location.href = "cart.html";
});

