// your code goes here
document.addEventListener('DOMContentLoaded', () => {
    let plants = [];
    let cart = [];
  
    const productListContainer = document.querySelector('.product-list-container');
    const categoryButtonsContainer = document.querySelector('.categories-list');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalPrice = document.getElementById('cart-total-price');
  
    // Fetch all plants
    async function fetchPlants() {
      try {
        const res = await fetch('https://openapi.programming-hero.com/api/plants');
        const data = await res.json();
        if (data.status) {
          plants = data.plants;
          renderProducts('all');
        }
      } catch (err) {
        productListContainer.innerHTML = '<p style="color:red;">Failed to load plants data.</p>';
        console.error(err);
      }
    }
  
    // Fetch categories dynamically
    async function fetchCategories() {
      try {
        const res = await fetch('https://openapi.programming-hero.com/api/categories');
        const data = await res.json();
        if (data.status) {
          categoryButtonsContainer.innerHTML = '<button class="category-btn active" data-id="all">All Trees</button>';
          data.categories.forEach(cat => {
            const btn = document.createElement('button');
            btn.className = 'category-btn';
            btn.dataset.id = cat.id;
            btn.textContent = cat.category_name;
            categoryButtonsContainer.appendChild(btn);
          });
          setupCategoryListeners();
        }
      } catch (err) {
        console.error(err);
      }
    }
  
    // Render products based on category
    async function renderProducts(categoryId) {
      productListContainer.innerHTML = '<p>Loading...</p>';
  
      let filteredPlants = plants;
  
      if (categoryId !== 'all') {
        try {
          const res = await fetch(`https://openapi.programming-hero.com/api/category/${categoryId}`);
          const data = await res.json();
          if (data.status) {
            filteredPlants = data.plants;
          } else {
            filteredPlants = [];
          }
        } catch (err) {
          console.error(err);
          filteredPlants = [];
        }
      }
  
      productListContainer.innerHTML = '';
  
      if (filteredPlants.length === 0) {
        productListContainer.innerHTML = '<p style="color:#555;">No plants found in this category.</p>';
        return;
      }
  
      filteredPlants.forEach(p => {
        const div = document.createElement('div');
        div.className = 'product-card';
        div.innerHTML = `
          <img src="${p.image}" alt="${p.name}" class="product-image">
          <h3>${p.name}</h3>
          <p>${p.description.substring(0, 70)}...</p>
          <div class="product-footer">
            <span class="tag">${p.category}</span>
            <span class="price">৳${p.price}</span>
          </div>
          <button class="add-to-cart-btn" data-id="${p.id}">Add to Cart</button>
        `;
        productListContainer.appendChild(div);
      });
  
      document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', e => addToCart(parseInt(e.target.dataset.id)));
      });
    }
  
    // Cart functions
    function renderCart() {
      cartItemsContainer.innerHTML = '';
      let total = 0;
  
      if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="text-align:center;color:#999;">Your cart is empty.</p>';
      }
  
      cart.forEach(item => {
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
          <div>
            <span>${item.name}</span><br>
            <span style="font-size: 14px; color: #555;">৳${item.price} × ${item.quantity}</span>
          </div>
          <button class="remove-item-btn" data-id="${item.id}">×</button>
        `;
        cartItemsContainer.appendChild(div);
        total += item.price * item.quantity;
      });
  
      cartTotalPrice.textContent = `৳${total}`;
  
      document.querySelectorAll('.remove-item-btn').forEach(btn => {
        btn.addEventListener('click', e => removeFromCart(parseInt(e.target.dataset.id)));
      });
    }
  
    function addToCart(id) {
      const existing = cart.find(i => i.id === id);
      const product = plants.find(p => p.id === id);
      if (!product) return;
  
      if (existing) existing.quantity++;
      else cart.push({ ...product, quantity: 1 });
  
      renderCart();
    }
  
    function removeFromCart(id) {
      cart = cart.filter(i => i.id !== id);
      renderCart();
    }
  
    // Category click listeners
    function setupCategoryListeners() {
      const categoryButtons = document.querySelectorAll('.category-btn');
      categoryButtons.forEach(btn => {
        btn.addEventListener('click', e => {
          categoryButtons.forEach(b => b.classList.remove('active'));
          e.target.classList.add('active');
          renderProducts(e.target.dataset.id);
        });
      });
    }
  
    // Initialize
    fetchPlants();
    fetchCategories();
    renderCart();
  });
  