// AURA LUXE TECH - E-Store Application Logic v3.0 — Bài 2: Mua hàng trực tuyến

document.addEventListener('DOMContentLoaded', () => {

  // ============================================================
  // PRELOADER
  // ============================================================
  const preloader = document.getElementById('preloader');
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add('hidden');
      setTimeout(() => initScrollReveal(), 400);
    }, 2200);
  }

  // ============================================================
  // AMBIENT PARTICLE SYSTEM
  // ============================================================
  const canvas = document.getElementById('particleCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    const PARTICLE_COUNT = 35;

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.2;
        this.opacity = Math.random() * 0.4 + 0.1;
        this.fadeDir = Math.random() > 0.5 ? 1 : -1;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.opacity += this.fadeDir * 0.003;
        if (this.opacity <= 0.05 || this.opacity >= 0.5) this.fadeDir *= -1;
        if (this.x < -10 || this.x > canvas.width + 10 || this.y < -10 || this.y > canvas.height + 10) this.reset();
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 175, 55, ${this.opacity})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.update(); p.draw(); });
      requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }

  // ============================================================
  // STATE
  // ============================================================
  let currentCategory = 'all';
  let currentSearch = '';
  let currentSort = 'featured';
  let wishlist = JSON.parse(localStorage.getItem('aura_wishlist') || '[]');
  let cart = JSON.parse(localStorage.getItem('aura_cart') || '[]');

  // ============================================================
  // DOM ELEMENTS
  // ============================================================
  const productsGrid = document.getElementById('productsGrid');
  const searchInput = document.getElementById('searchInput');
  const clearSearchBtn = document.getElementById('clearSearchBtn');
  const sortSelect = document.getElementById('sortSelect');
  const categoryPills = document.getElementById('categoryPills');
  const resultCount = document.getElementById('resultCount');
  const liveCounter = document.getElementById('liveCounter');
  const heroFeatured = document.getElementById('heroFeatured');
  const wishlistNavBtn = document.getElementById('wishlistNavBtn');
  const wishlistCountEl = document.getElementById('wishlistCount');

  // Modal
  const modal = document.getElementById('productModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalImg = document.getElementById('modalImg');
  const modalCat = document.getElementById('modalCat');
  const modalTitle = document.getElementById('modalTitle');
  const modalPrice = document.getElementById('modalPrice');
  const modalWarranty = document.getElementById('modalWarranty');
  const modalDesc = document.getElementById('modalDesc');
  const modalSpecsTable = document.getElementById('modalSpecsTable');
  const modalBadge = document.getElementById('modalBadge');
  const modalAddCartBtn = document.getElementById('modalAddCartBtn');
  const modalShareBtn = document.getElementById('modalShareBtn');
  const modalWishlistBtn = document.getElementById('modalWishlistBtn');
  const toastContainer = document.getElementById('toastContainer');
  const backToTopBtn = document.getElementById('backToTop');

  // Cart
  const cartNavBtn = document.getElementById('cartNavBtn');
  const cartCountEl = document.getElementById('cartCount');
  const cartOverlay = document.getElementById('cartOverlay');
  const cartCloseBtn = document.getElementById('cartCloseBtn');
  const cartBody = document.getElementById('cartBody');
  const cartEmpty = document.getElementById('cartEmpty');
  const cartFooter = document.getElementById('cartFooter');
  const cartHeaderCount = document.getElementById('cartHeaderCount');
  const cartSubtotal = document.getElementById('cartSubtotal');
  const cartTotal = document.getElementById('cartTotal');
  const btnCheckout = document.getElementById('btnCheckout');
  const btnClearCart = document.getElementById('btnClearCart');

  // Checkout
  const checkoutModal = document.getElementById('checkoutModal');
  const checkoutCloseBtn = document.getElementById('checkoutCloseBtn');
  const checkoutForm = document.getElementById('checkoutForm');
  const checkoutItems = document.getElementById('checkoutItems');
  const checkoutSubtotal = document.getElementById('checkoutSubtotal');
  const checkoutTotal = document.getElementById('checkoutTotal');
  const btnPlaceOrder = document.getElementById('btnPlaceOrder');

  // Order Success
  const orderSuccessModal = document.getElementById('orderSuccessModal');
  const orderNumber = document.getElementById('orderNumber');
  const orderTotalDisplay = document.getElementById('orderTotalDisplay');
  const orderPayment = document.getElementById('orderPayment');
  const btnContinueShopping = document.getElementById('btnContinueShopping');

  let activeProduct = null;

  // ============================================================
  // HELPERS
  // ============================================================
  function formatPrice(num) {
    return num.toLocaleString('vi-VN') + '₫';
  }

  // ============================================================
  // INITIAL COUNTER
  // ============================================================
  if (liveCounter && window.PRODUCTS) {
    liveCounter.querySelector('span:last-child').textContent = `${PRODUCTS.length} Tuyệt tác công nghệ`;
  }

  updateWishlistBadge();
  updateCartBadge();

  // ============================================================
  // SKELETON LOADING
  // ============================================================
  function showSkeletons(count = 8) {
    let skeletons = '';
    for (let i = 0; i < count; i++) {
      skeletons += `
        <div class="skeleton-card">
          <div class="skeleton-img"></div>
          <div class="skeleton-body">
            <div class="skeleton-line short"></div>
            <div class="skeleton-line long"></div>
            <div class="skeleton-line medium"></div>
            <div class="skeleton-line short"></div>
          </div>
        </div>
      `;
    }
    productsGrid.innerHTML = skeletons;
  }
  showSkeletons();

  // ============================================================
  // SCROLL REVEAL
  // ============================================================
  function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealElements.forEach(el => observer.observe(el));
  }

  function revealCards() {
    const cards = document.querySelectorAll('.product-card');
    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('card-visible'), index * 80);
          cardObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    cards.forEach(card => cardObserver.observe(card));
  }

  // ============================================================
  // WISHLIST SYSTEM
  // ============================================================
  function isWishlisted(productId) { return wishlist.includes(productId); }

  function toggleWishlist(productId) {
    const idx = wishlist.indexOf(productId);
    if (idx > -1) {
      wishlist.splice(idx, 1);
      showToast('✦ Đã xóa khỏi danh sách yêu thích');
    } else {
      wishlist.push(productId);
      showToast('❤ Đã thêm vào danh sách yêu thích!', 'success');
    }
    localStorage.setItem('aura_wishlist', JSON.stringify(wishlist));
    updateWishlistBadge();
    updateWishlistUI(productId);
  }

  function updateWishlistBadge() {
    if (wishlistCountEl) {
      wishlistCountEl.textContent = wishlist.length;
      wishlistCountEl.classList.toggle('active', wishlist.length > 0);
    }
  }

  function updateWishlistUI(productId) {
    document.querySelectorAll(`.card-wishlist-btn[data-id="${productId}"]`).forEach(btn => {
      btn.classList.toggle('wishlisted', isWishlisted(productId));
      btn.classList.add('pop-anim');
      setTimeout(() => btn.classList.remove('pop-anim'), 400);
    });
    if (modalWishlistBtn && activeProduct && activeProduct.id === productId) {
      modalWishlistBtn.classList.toggle('wishlisted', isWishlisted(productId));
    }
  }

  // ============================================================
  // CART SYSTEM (Bài 2)
  // ============================================================
  function getCartItem(productId) {
    return cart.find(item => item.id === productId);
  }

  function addToCart(productId) {
    const existing = getCartItem(productId);
    if (existing) {
      existing.qty += 1;
      showToast(`🛒 Đã tăng số lượng: ${existing.qty} sản phẩm`, 'success');
    } else {
      const product = PRODUCTS.find(p => p.id === productId);
      if (!product) return;
      cart.push({ id: product.id, qty: 1 });
      showToast(`🛒 Đã thêm "${product.name}" vào giỏ hàng!`, 'success');
    }
    saveCart();
    updateCartBadge();
    renderCartSidebar();

    // Bounce animation on cart icon
    if (cartNavBtn) {
      cartNavBtn.classList.remove('bounce');
      void cartNavBtn.offsetWidth;
      cartNavBtn.classList.add('bounce');
    }
  }

  function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartBadge();
    renderCartSidebar();
    showToast('🗑️ Đã xóa sản phẩm khỏi giỏ hàng');
  }

  function updateCartQty(productId, delta) {
    const item = getCartItem(productId);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
      removeFromCart(productId);
      return;
    }
    saveCart();
    updateCartBadge();
    renderCartSidebar();
  }

  function clearCart() {
    cart = [];
    saveCart();
    updateCartBadge();
    renderCartSidebar();
    showToast('🗑️ Đã xóa toàn bộ giỏ hàng');
  }

  function saveCart() {
    localStorage.setItem('aura_cart', JSON.stringify(cart));
  }

  function getCartTotal() {
    return cart.reduce((sum, item) => {
      const product = PRODUCTS.find(p => p.id === item.id);
      return sum + (product ? product.price * item.qty : 0);
    }, 0);
  }

  function getCartItemCount() {
    return cart.reduce((sum, item) => sum + item.qty, 0);
  }

  function updateCartBadge() {
    const count = getCartItemCount();
    if (cartCountEl) {
      cartCountEl.textContent = count;
      cartCountEl.classList.toggle('active', count > 0);
    }
  }

  // ============================================================
  // CART SIDEBAR RENDERING
  // ============================================================
  function renderCartSidebar() {
    const itemCount = getCartItemCount();
    cartHeaderCount.textContent = `(${itemCount})`;

    if (cart.length === 0) {
      cartEmpty.style.display = 'block';
      cartFooter.style.display = 'none';
      // Remove item elements
      document.querySelectorAll('.cart-item').forEach(el => el.remove());
      return;
    }

    cartEmpty.style.display = 'none';
    cartFooter.style.display = 'block';

    // Remove old items
    document.querySelectorAll('.cart-item').forEach(el => el.remove());

    // Render items
    cart.forEach(item => {
      const product = PRODUCTS.find(p => p.id === item.id);
      if (!product) return;

      const itemEl = document.createElement('div');
      itemEl.className = 'cart-item';
      itemEl.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="cart-item-img" 
          onerror="this.src='https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=900&auto=format&fit=crop'">
        <div class="cart-item-info">
          <div class="cart-item-name">${product.name}</div>
          <div class="cart-item-price">${formatPrice(product.price * item.qty)}</div>
          <div class="cart-item-controls">
            <button type="button" class="qty-btn qty-minus" data-id="${item.id}">−</button>
            <span class="qty-value">${item.qty}</span>
            <button type="button" class="qty-btn qty-plus" data-id="${item.id}">+</button>
            <button type="button" class="cart-item-remove" data-id="${item.id}">Xóa</button>
          </div>
        </div>
      `;
      cartBody.insertBefore(itemEl, cartEmpty);
    });

    // Update totals
    const total = getCartTotal();
    cartSubtotal.textContent = formatPrice(total);
    cartTotal.textContent = formatPrice(total);

    // Attach qty events
    cartBody.querySelectorAll('.qty-minus').forEach(btn => {
      btn.addEventListener('click', () => updateCartQty(btn.dataset.id, -1));
    });
    cartBody.querySelectorAll('.qty-plus').forEach(btn => {
      btn.addEventListener('click', () => updateCartQty(btn.dataset.id, 1));
    });
    cartBody.querySelectorAll('.cart-item-remove').forEach(btn => {
      btn.addEventListener('click', () => removeFromCart(btn.dataset.id));
    });
  }

  // Open/Close Cart Sidebar
  function openCart() {
    renderCartSidebar();
    cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    cartOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  cartNavBtn.addEventListener('click', openCart);
  cartCloseBtn.addEventListener('click', closeCart);
  cartOverlay.addEventListener('click', (e) => {
    if (e.target === cartOverlay) closeCart();
  });
  btnClearCart.addEventListener('click', clearCart);

  // ============================================================
  // CHECKOUT SYSTEM (Bài 2)
  // ============================================================
  btnCheckout.addEventListener('click', () => {
    if (cart.length === 0) {
      showToast('⚠ Giỏ hàng trống, hãy thêm sản phẩm!', 'error');
      return;
    }
    closeCart();
    openCheckout();
  });

  function openCheckout() {
    renderCheckoutItems();
    checkoutModal.classList.add('active');
    checkoutModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeCheckout() {
    checkoutModal.classList.remove('active');
    checkoutModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  checkoutCloseBtn.addEventListener('click', closeCheckout);
  checkoutModal.addEventListener('click', (e) => {
    if (e.target === checkoutModal) closeCheckout();
  });

  function renderCheckoutItems() {
    checkoutItems.innerHTML = cart.map(item => {
      const product = PRODUCTS.find(p => p.id === item.id);
      if (!product) return '';
      return `
        <div class="checkout-item">
          <img src="${product.image}" alt="${product.name}" class="checkout-item-img"
            onerror="this.src='https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=900&auto=format&fit=crop'">
          <div class="checkout-item-info">
            <div class="checkout-item-name">${product.name}</div>
            <div class="checkout-item-qty">SL: ${item.qty} × ${product.priceFormatted}</div>
          </div>
          <div class="checkout-item-subtotal">${formatPrice(product.price * item.qty)}</div>
        </div>
      `;
    }).join('');

    const total = getCartTotal();
    checkoutSubtotal.textContent = formatPrice(total);
    checkoutTotal.textContent = formatPrice(total);
  }

  // ============================================================
  // PLACE ORDER
  // ============================================================
  btnPlaceOrder.addEventListener('click', () => {
    // Validate form
    const name = document.getElementById('custName').value.trim();
    const phone = document.getElementById('custPhone').value.trim();
    const address = document.getElementById('custAddress').value.trim();

    // Clear previous errors
    document.querySelectorAll('.form-input.error').forEach(el => el.classList.remove('error'));

    let hasError = false;

    if (!name) {
      document.getElementById('custName').classList.add('error');
      hasError = true;
    }
    if (!phone || phone.length < 9) {
      document.getElementById('custPhone').classList.add('error');
      hasError = true;
    }
    if (!address) {
      document.getElementById('custAddress').classList.add('error');
      hasError = true;
    }

    if (hasError) {
      showToast('⚠ Vui lòng điền đầy đủ thông tin bắt buộc!', 'error');
      return;
    }

    if (cart.length === 0) {
      showToast('⚠ Giỏ hàng trống!', 'error');
      return;
    }

    // Generate order number
    const orderNum = 'ALT-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).substring(2, 6).toUpperCase();
    const total = getCartTotal();
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;

    const paymentNames = {
      'cod': '💵 Thanh toán khi nhận hàng (COD)',
      'bank': '🏦 Chuyển khoản ngân hàng',
      'installment': '💳 Trả góp 0%'
    };

    // Show success
    closeCheckout();

    orderNumber.textContent = orderNum;
    orderTotalDisplay.textContent = formatPrice(total);
    orderPayment.textContent = paymentNames[paymentMethod] || paymentMethod;

    orderSuccessModal.classList.add('active');
    orderSuccessModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Clear cart
    cart = [];
    saveCart();
    updateCartBadge();

    // Reset form
    checkoutForm.reset();

    showToast('🎉 Đặt hàng thành công! Cảm ơn quý khách.', 'success');
  });

  // Continue Shopping
  btnContinueShopping.addEventListener('click', () => {
    orderSuccessModal.classList.remove('active');
    orderSuccessModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  });

  // ============================================================
  // FILTER & SORT
  // ============================================================
  function getFilteredProducts() {
    let list = [...PRODUCTS];
    if (currentCategory !== 'all') list = list.filter(p => p.category === currentCategory);
    if (currentSearch.trim() !== '') {
      const q = currentSearch.toLowerCase().trim();
      list = list.filter(p => {
        return p.name.toLowerCase().includes(q)
          || p.description.toLowerCase().includes(q)
          || p.shortDesc.toLowerCase().includes(q)
          || p.categoryName.toLowerCase().includes(q)
          || Object.entries(p.specs || {}).some(([k, v]) => k.toLowerCase().includes(q) || v.toLowerCase().includes(q));
      });
    }
    switch (currentSort) {
      case 'price-asc': list.sort((a, b) => a.price - b.price); break;
      case 'price-desc': list.sort((a, b) => b.price - a.price); break;
      case 'name-asc': list.sort((a, b) => a.name.localeCompare(b.name, 'vi')); break;
    }
    return list;
  }

  // ============================================================
  // RENDER PRODUCT CARDS
  // ============================================================
  function renderProducts() {
    const list = getFilteredProducts();
    resultCount.textContent = `Đang hiển thị ${list.length} / ${PRODUCTS.length} sản phẩm`;

    if (list.length === 0) {
      productsGrid.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">✦</div>
          <h3>Không tìm thấy sản phẩm phù hợp</h3>
          <p>Hãy thử thay đổi từ khóa tìm kiếm hoặc chọn danh mục khác.</p>
          <button type="button" class="btn-detail" id="resetFilterBtn">Đặt lại bộ lọc</button>
        </div>
      `;
      const resetBtn = document.getElementById('resetFilterBtn');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          currentCategory = 'all';
          currentSearch = '';
          searchInput.value = '';
          clearSearchBtn.style.display = 'none';
          document.querySelectorAll('.pill-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.category === 'all'));
          renderProducts();
        });
      }
      return;
    }

    productsGrid.innerHTML = list.map(item => {
      const miniSpecs = Object.entries(item.specs || {}).slice(0, 2).map(([k, v]) => 
        `<span class="spec-tag">${v}</span>`
      ).join('');
      const heartFill = isWishlisted(item.id) ? 'currentColor' : 'none';
      const wishlistedClass = isWishlisted(item.id) ? 'wishlisted' : '';

      return `
        <article class="product-card" data-id="${item.id}" role="button" aria-label="Xem chi tiết ${item.name}">
          <button type="button" class="card-wishlist-btn ${wishlistedClass}" data-id="${item.id}" title="Yêu thích">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="${heartFill}" stroke="currentColor" stroke-width="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
          <button type="button" class="card-addcart-btn" data-id="${item.id}" title="Thêm vào giỏ hàng">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
          </button>
          <div class="card-badge-container">
            <span class="card-badge ${item.badgeType || 'silver'}">${item.badge}</span>
          </div>
          <div class="card-img-wrap">
            <img src="${item.image}" alt="${item.name}" class="card-img" loading="lazy"
              onerror="this.src='https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=900&auto=format&fit=crop'">
          </div>
          <div class="card-body">
            <span class="card-category">${item.categoryName}</span>
            <h3 class="card-title">${item.name}</h3>
            <p class="card-desc">${item.shortDesc}</p>
            <div class="card-specs-mini">${miniSpecs}</div>
            <div class="card-footer">
              <div class="card-price-group">
                <span class="card-price-label">Giá niêm yết</span>
                <span class="card-price">${item.priceFormatted}</span>
              </div>
              <button type="button" class="btn-detail view-detail-btn" data-id="${item.id}">
                Xem chi tiết <span>→</span>
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');

    attachCardEvents();
    requestAnimationFrame(() => revealCards());
  }

  // ============================================================
  // ATTACH CARD EVENTS
  // ============================================================
  function attachCardEvents() {
    document.querySelectorAll('.view-detail-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        openDetailModal(btn.getAttribute('data-id'));
      });
    });
    document.querySelectorAll('.product-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('.card-wishlist-btn') || e.target.closest('.card-addcart-btn')) return;
        openDetailModal(card.getAttribute('data-id'));
      });
    });
    document.querySelectorAll('.card-wishlist-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleWishlist(btn.getAttribute('data-id'));
      });
    });
    document.querySelectorAll('.card-addcart-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        addToCart(btn.getAttribute('data-id'));
      });
    });
  }

  // ============================================================
  // PRODUCT DETAIL MODAL
  // ============================================================
  function openDetailModal(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;
    activeProduct = product;

    modalImg.src = product.image;
    modalImg.alt = product.name;
    modalImg.onerror = () => { modalImg.src = 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=900&auto=format&fit=crop'; };
    modalCat.textContent = product.categoryName;
    modalTitle.textContent = product.name;
    modalPrice.textContent = product.priceFormatted;
    modalWarranty.textContent = product.warranty || 'Bảo hành chính hãng 12 tháng';
    modalDesc.textContent = product.description;
    modalBadge.textContent = product.badge;

    modalSpecsTable.innerHTML = Object.entries(product.specs || {}).map(([k, v]) => `
      <tr><td>${k}</td><td>${v}</td></tr>
    `).join('');

    if (modalWishlistBtn) modalWishlistBtn.classList.toggle('wishlisted', isWishlisted(product.id));

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  modalCloseBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (modal.classList.contains('active')) closeModal();
      if (cartOverlay.classList.contains('active')) closeCart();
      if (checkoutModal.classList.contains('active')) closeCheckout();
      if (orderSuccessModal.classList.contains('active')) {
        orderSuccessModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    }
  });

  // ============================================================
  // MODAL ACTIONS
  // ============================================================
  modalAddCartBtn.addEventListener('click', () => {
    if (!activeProduct) return;
    addToCart(activeProduct.id);
  });

  if (modalWishlistBtn) {
    modalWishlistBtn.addEventListener('click', () => {
      if (!activeProduct) return;
      toggleWishlist(activeProduct.id);
    });
  }

  modalShareBtn.addEventListener('click', () => {
    if (!activeProduct) return;
    const shareText = `${activeProduct.name} - ${activeProduct.priceFormatted} tại AURA LUXE TECH`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText).then(() => {
        showToast('✦ Đã sao chép thông tin sản phẩm!', 'success');
      }).catch(() => showToast(`✦ ${shareText}`));
    } else {
      showToast(`✦ ${shareText}`);
    }
  });

  if (wishlistNavBtn) {
    wishlistNavBtn.addEventListener('click', () => {
      if (wishlist.length === 0) {
        showToast('✦ Danh sách yêu thích trống. Nhấn ❤ trên sản phẩm để thêm!');
      } else {
        showToast(`❤ Bạn đang yêu thích ${wishlist.length} sản phẩm`, 'success');
      }
    });
  }

  if (heroFeatured) {
    heroFeatured.addEventListener('click', () => openDetailModal('prod-01'));
  }

  // ============================================================
  // SEARCH (debounced)
  // ============================================================
  let searchDebounce = null;
  searchInput.addEventListener('input', (e) => {
    currentSearch = e.target.value;
    clearSearchBtn.style.display = currentSearch ? 'block' : 'none';
    clearTimeout(searchDebounce);
    searchDebounce = setTimeout(() => renderProducts(), 200);
  });

  clearSearchBtn.addEventListener('click', () => {
    searchInput.value = '';
    currentSearch = '';
    clearSearchBtn.style.display = 'none';
    searchInput.focus();
    renderProducts();
  });

  // ============================================================
  // SORT & CATEGORY
  // ============================================================
  sortSelect.addEventListener('change', (e) => {
    currentSort = e.target.value;
    renderProducts();
  });

  categoryPills.addEventListener('click', (e) => {
    const pill = e.target.closest('.pill-btn');
    if (!pill) return;
    document.querySelectorAll('.pill-btn').forEach(btn => btn.classList.remove('active'));
    pill.classList.add('active');
    currentCategory = pill.dataset.category || 'all';
    renderProducts();
  });

  // ============================================================
  // BACK TO TOP
  // ============================================================
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      backToTopBtn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
    backToTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // ============================================================
  // TOAST SYSTEM
  // ============================================================
  function showToast(message, type = 'default') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px) translateX(20px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  // ============================================================
  // INITIAL RENDER
  // ============================================================
  setTimeout(() => renderProducts(), 2400);

});
