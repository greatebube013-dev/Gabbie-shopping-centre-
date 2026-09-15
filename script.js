// PRODUCT DATA
const products = [
  { id: 1, name: "Wireless Headphones", price: 25000, img: "https://picsum.photos/200?1" },
  { id: 2, name: "Smartphone", price: 180000, img: "https://picsum.photos/200?2" },
  { id: 3, name: "Laptop Bag", price: 12000, img: "https://picsum.photos/200?3" },
  { id: 4, name: "Bluetooth Speaker", price: 30000, img: "https://picsum.photos/200?4" },
  { id: 5, name: "Smart Watch", price: 55000, img: "https://picsum.photos/200?5" },
  { id: 6, name: "Power Bank", price: 18000, img: "https://picsum.photos/200?6" },
  { id: 7, name: "Gaming Keyboard", price: 35000, img: "https://picsum.photos/200?7" },
  { id: 8, name: "Webcam HD", price: 22000, img: "https://picsum.photos/200?8" },
  { id: 9,name: "iPhone 12 Pro", price:400000, img:"https://picsum.photos/200?9"},
  { id: 10, name: "Google Pixel 11pro", price:2000000, img:"https://picsum.photos/200?10"}
];

let cart = [];

// DISPLAY PRODUCTS
function displayProducts(items) {
  const list = document.getElementById('product-list');
  list.innerHTML = '';
  
  if(items.length === 0) {
    list.innerHTML = '<p style="text-align:center; grid-column:1/-1;">No products found 😢</p>';
    return;
  }

  items.forEach(p => {
    list.innerHTML += `
      <div class="product">
        <img src="${p.img}" alt="${p.name}">
        <h3>${p.name}</h3>
        <div class="price">₦${p.price.toLocaleString()}</div>
        <button class="btn" onclick="addToCart(${p.id})">Add to Cart</button>
      </div>
    `;
  });
}

// ADD TO CART
function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  updateCart();
  alert(`${product.name} added to cart! 🛒`);
}

// REMOVE FROM CART
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
  showCart();
}

// UPDATE CART
function updateCart() {
  document.getElementById('cart-count').innerText = cart.length;
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  document.getElementById('cart-total').innerText = total.toLocaleString();
}

// SHOW CART ITEMS
function showCart() {
  const cartItems = document.getElementById('cart-items');
  cartItems.innerHTML = '';
  
  if(cart.length === 0) {
    cartItems.innerHTML = '<p>Your cart is empty</p>';
  } else {
    cart.forEach((item, index) => {
      cartItems.innerHTML += `
        <div class="cart-item">
          <img src="${item.img}" width="50" style="border-radius:5px;">
          <span>${item.name}</span>
          <span>₦${item.price.toLocaleString()}</span>
          <button onclick="removeFromCart(${index})" style="background:red; color:white; border:none; padding:5px 8px; border-radius:5px; cursor:pointer;">X</button>
        </div>
      `;
    });
  }
}

// SEARCH PRODUCTS
function searchProducts() {
  const query = document.getElementById('search').value.toLowerCase();
  const filtered = products.filter(p => p.name.toLowerCase().includes(query));
  displayProducts(filtered);
}

// CHECKOUT
function checkout() {
  if(cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  alert(`Order Placed! 🎉\n\nTotal: ₦${total.toLocaleString()}\nItems: ${cart.length}\n\nThank you for shopping with GABBIE!`);
  cart = [];
  updateCart();
  showCart();
}

// LOAD PRODUCTS WHEN PAGE OPENS
window.onload = function() {
  displayProducts(products);
};