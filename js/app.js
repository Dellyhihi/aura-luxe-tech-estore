// AURA LUXE TECH - E-Store Application Logic v4.0
// Full Feature: Search, Filter, Sort, Cart, Checkout, Wishlist, Compare, Stock, Rating, Gallery, Coupon, Swipe, Keyboard Nav

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
  // FALLBACK IMAGE
  // ============================================================
  const FALLBACK_IMG = 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=900&auto=format&fit=crop';

  // ============================================================
  // STATE
  // ============================================================
  let currentCategory = 'all';
  let currentSearch = '';
  let currentSort = 'featured';
  let priceMin = 0;
  let priceMax = 100000000;
  let wishlist = JSON.parse(localStorage.getItem('aura_wishlist') || '[]');
  let cart = JSON.parse(localStorage.getItem('aura_cart') || '[]');
  let compareList = JSON.parse(localStorage.getItem('aura_compare') || '[]');
  let appliedCoupon = null;

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
  const breadcrumbCurrent = document.getElementById('breadcrumbCurrent');

  // Price range
  const priceMinInput = document.getElementById('priceMin');
  const priceMaxInput = document.getElementById('priceMax');
  const priceMinVal = document.getElementById('priceMinVal');
  const priceMaxVal = document.getElementById('priceMaxVal');

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
  const modalCompareBtn = document.getElementById('modalCompareBtn');
  const modalStars = document.getElementById('modalStars');
  const modalRatingText = document.getElementById('modalRatingText');
  const modalStock = document.getElementById('modalStock');
  const modalGalleryThumbs = document.getElementById('modalGalleryThumbs');
  const relatedGrid = document.getElementById('relatedGrid');
  const toastContainer = document.getElementById('toastContainer');
  const backToTopBtn = document.getElementById('backToTop');

  // Compare
  const compareNavBtn = document.getElementById('compareNavBtn');
  const compareCountEl = document.getElementById('compareCount');
  const compareModal = document.getElementById('compareModal');
  const compareCloseBtn = document.getElementById('compareCloseBtn');
  const compareTableWrapper = document.getElementById('compareTableWrapper');

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
  const checkoutDiscountRow = document.getElementById('checkoutDiscountRow');
  const checkoutDiscount = document.getElementById('checkoutDiscount');
  const btnPlaceOrder = document.getElementById('btnPlaceOrder');
  const couponInput = document.getElementById('couponInput');
  const applyCouponBtn = document.getElementById('applyCouponBtn');
  const couponStatus = document.getElementById('couponStatus');

  // Order Success
  const orderSuccessModal = document.getElementById('orderSuccessModal');
  const orderNumber = document.getElementById('orderNumber');
  const orderTotalDisplay = document.getElementById('orderTotalDisplay');
  const orderPayment = document.getElementById('orderPayment');
  const btnContinueShopping = document.getElementById('btnContinueShopping');
  const btnEmailOrder = document.getElementById('btnEmailOrder');

  let activeProduct = null;

  // ============================================================
  // HELPERS
  // ============================================================
  function formatPrice(num) {
    return num.toLocaleString('vi-VN') + '₫';
  }

  function renderStars(rating) {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5 ? 1 : 0;
    const empty = 5 - full - half;
    return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
  }

  function getStockLabel(stock) {
    if (stock === 0) return { text: 'Hết hàng', cls: 'out-of-stock' };
    if (stock <= 5) return { text: `Sắp hết — Còn ${stock} sản phẩm`, cls: 'low-stock' };
    return { text: `Còn ${stock} sản phẩm`, cls: 'in-stock' };
  }

  function getStockBadgeCls(stock) {
    if (stock === 0) return 'out-of-stock-badge';
    if (stock <= 5) return 'low-stock';
    return 'in-stock';
  }

  // ============================================================
  // INITIAL COUNTER
  // ============================================================
  if (liveCounter && window.PRODUCTS) {
    liveCounter.querySelector('span:last-child').textContent = `${PRODUCTS.length} Tuyệt tác công nghệ`;
  }

  updateWishlistBadge();
  updateCartBadge();
  updateCompareBadge();

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
  // COMPARE SYSTEM
  // ============================================================
  function isComparing(productId) { return compareList.includes(productId); }

  function toggleCompare(productId) {
    const idx = compareList.indexOf(productId);
    if (idx > -1) {
      compareList.splice(idx, 1);
      showToast('✦ Đã xóa khỏi so sánh');
    } else {
      if (compareList.length >= 3) {
        showToast('⚠ Tối đa so sánh 3 sản phẩm!', 'error');
        return;
      }
      compareList.push(productId);
      showToast('≡ Đã thêm vào so sánh!', 'success');
    }
    localStorage.setItem('aura_compare', JSON.stringify(compareList));
    updateCompareBadge();
    if (modalCompareBtn && activeProduct && activeProduct.id === productId) {
      modalCompareBtn.classList.toggle('comparing', isComparing(productId));
    }
  }

  function updateCompareBadge() {
    if (compareCountEl) {
      compareCountEl.textContent = compareList.length;
      compareCountEl.classList.toggle('active', compareList.length > 0);
    }
  }

  function openCompareModal() {
    if (compareList.length === 0) {
      showToast('≡ Chưa có sản phẩm để so sánh. Nhấn biểu tượng ≡ trên sản phẩm!');
      return;
    }
    renderCompareTable();
    compareModal.classList.add('active');
    compareModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeCompareModal() {
    compareModal.classList.remove('active');
    compareModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function renderCompareTable() {
    const products = compareList.map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean);
    if (products.length === 0) {
      compareTableWrapper.innerHTML = '<p class="compare-empty">Chưa có sản phẩm nào để so sánh.</p>';
      return;
    }

    // Collect all spec keys
    const allSpecs = new Set();
    products.forEach(p => Object.keys(p.specs || {}).forEach(k => allSpecs.add(k)));

    let html = '<table class="compare-table"><tbody>';
    
    // Product images + names
    html += '<tr><th>Sản phẩm</th>';
    products.forEach(p => {
      html += `<td>
        <img src="${p.image}" alt="${p.name}" class="compare-product-img" onerror="this.src='${FALLBACK_IMG}'">
        <div class="compare-product-name">${p.name}</div>
        <div class="compare-product-price">${p.priceFormatted}</div>
        <button type="button" class="compare-remove-btn" data-id="${p.id}">✕ Xóa</button>
      </td>`;
    });
    html += '</tr>';

    // Rating
    html += '<tr><th>Đánh giá</th>';
    products.forEach(p => {
      html += `<td>${renderStars(p.rating)} ${p.rating}/5 (${p.reviewCount})</td>`;
    });
    html += '</tr>';

    // Stock
    html += '<tr><th>Tồn kho</th>';
    products.forEach(p => {
      const s = getStockLabel(p.stock);
      html += `<td style="color:var(--${s.cls === 'out-of-stock' ? 'danger' : s.cls === 'low-stock' ? 'warning' : 'success'})">${s.text}</td>`;
    });
    html += '</tr>';

    // Specs
    allSpecs.forEach(key => {
      html += `<tr><th>${key}</th>`;
      products.forEach(p => {
        html += `<td>${(p.specs || {})[key] || '—'}</td>`;
      });
      html += '</tr>';
    });

    html += '</tbody></table>';
    compareTableWrapper.innerHTML = html;

    // Attach remove events
    compareTableWrapper.querySelectorAll('.compare-remove-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        toggleCompare(btn.dataset.id);
        renderCompareTable();
      });
    });
  }

  compareNavBtn.addEventListener('click', openCompareModal);
  compareCloseBtn.addEventListener('click', closeCompareModal);
  compareModal.addEventListener('click', (e) => { if (e.target === compareModal) closeCompareModal(); });

  // ============================================================
  // CART SYSTEM
  // ============================================================
  function getCartItem(productId) {
    return cart.find(item => item.id === productId);
  }

  function addToCart(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;
    if (product.stock === 0) {
      showToast('⚠ Sản phẩm đã hết hàng!', 'error');
      return;
    }
    const existing = getCartItem(productId);
    if (existing) {
      if (existing.qty >= product.stock) {
        showToast(`⚠ Chỉ còn ${product.stock} sản phẩm trong kho!`, 'error');
        return;
      }
      existing.qty += 1;
      showToast(`🛒 Đã tăng số lượng: ${existing.qty} sản phẩm`, 'success');
    } else {
      cart.push({ id: product.id, qty: 1 });
      showToast(`🛒 Đã thêm "${product.name}" vào giỏ hàng!`, 'success');
    }
    saveCart();
    updateCartBadge();
    renderCartSidebar();

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
    const product = PRODUCTS.find(p => p.id === productId);
    const newQty = item.qty + delta;
    if (newQty <= 0) {
      removeFromCart(productId);
      return;
    }
    if (product && newQty > product.stock) {
      showToast(`⚠ Chỉ còn ${product.stock} sản phẩm trong kho!`, 'error');
      return;
    }
    item.qty = newQty;
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
      document.querySelectorAll('.cart-item').forEach(el => el.remove());
      return;
    }

    cartEmpty.style.display = 'none';
    cartFooter.style.display = 'block';
    document.querySelectorAll('.cart-item').forEach(el => el.remove());

    cart.forEach(item => {
      const product = PRODUCTS.find(p => p.id === item.id);
      if (!product) return;

      const itemEl = document.createElement('div');
      itemEl.className = 'cart-item';
      itemEl.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="cart-item-img" loading="lazy"
          onerror="this.src='${FALLBACK_IMG}'">
        <div class="cart-item-info">
          <div class="cart-item-name">${product.name}</div>
          <div class="cart-item-price">${formatPrice(product.price * item.qty)}</div>
          <div class="cart-item-controls">
            <button type="button" class="qty-btn qty-minus" data-id="${item.id}" aria-label="Giảm số lượng">−</button>
            <span class="qty-value">${item.qty}</span>
            <button type="button" class="qty-btn qty-plus" data-id="${item.id}" aria-label="Tăng số lượng">+</button>
            <button type="button" class="cart-item-remove" data-id="${item.id}" aria-label="Xóa sản phẩm">Xóa</button>
          </div>
        </div>
      `;
      cartBody.insertBefore(itemEl, cartEmpty);
    });

    const total = getCartTotal();
    cartSubtotal.textContent = formatPrice(total);
    cartTotal.textContent = formatPrice(total);

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
  cartOverlay.addEventListener('click', (e) => { if (e.target === cartOverlay) closeCart(); });
  btnClearCart.addEventListener('click', clearCart);

  // ============================================================
  // CHECKOUT SYSTEM
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
    appliedCoupon = null;
    if (couponInput) couponInput.value = '';
    if (couponStatus) { couponStatus.textContent = ''; couponStatus.className = 'coupon-status'; }
    if (checkoutDiscountRow) checkoutDiscountRow.style.display = 'none';
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
  checkoutModal.addEventListener('click', (e) => { if (e.target === checkoutModal) closeCheckout(); });

  function renderCheckoutItems() {
    checkoutItems.innerHTML = cart.map(item => {
      const product = PRODUCTS.find(p => p.id === item.id);
      if (!product) return '';
      return `
        <div class="checkout-item">
          <img src="${product.image}" alt="${product.name}" class="checkout-item-img" loading="lazy"
            onerror="this.src='${FALLBACK_IMG}'">
          <div class="checkout-item-info">
            <div class="checkout-item-name">${product.name}</div>
            <div class="checkout-item-qty">SL: ${item.qty} × ${product.priceFormatted}</div>
          </div>
          <div class="checkout-item-subtotal">${formatPrice(product.price * item.qty)}</div>
        </div>
      `;
    }).join('');

    updateCheckoutTotals();
  }

  function updateCheckoutTotals() {
    const subtotal = getCartTotal();
    let discount = 0;
    if (appliedCoupon) {
      discount = Math.round(subtotal * appliedCoupon.discount);
    }
    const total = subtotal - discount;

    checkoutSubtotal.textContent = formatPrice(subtotal);
    if (checkoutDiscountRow && appliedCoupon && discount > 0) {
      checkoutDiscountRow.style.display = 'flex';
      checkoutDiscount.textContent = '-' + formatPrice(discount);
    }
    checkoutTotal.textContent = formatPrice(total);
  }

  // ============================================================
  // COUPON SYSTEM
  // ============================================================
  if (applyCouponBtn) {
    applyCouponBtn.addEventListener('click', () => {
      const code = couponInput.value.trim().toUpperCase();
      if (!code) {
        couponStatus.textContent = 'Vui lòng nhập mã giảm giá';
        couponStatus.className = 'coupon-status error';
        return;
      }
      const coupon = window.COUPONS && window.COUPONS[code];
      if (!coupon) {
        couponStatus.textContent = 'Mã giảm giá không hợp lệ';
        couponStatus.className = 'coupon-status error';
        appliedCoupon = null;
        updateCheckoutTotals();
        return;
      }
      const subtotal = getCartTotal();
      if (subtotal < coupon.minOrder) {
        couponStatus.textContent = `Đơn hàng tối thiểu ${formatPrice(coupon.minOrder)} để áp dụng mã này`;
        couponStatus.className = 'coupon-status error';
        appliedCoupon = null;
        updateCheckoutTotals();
        return;
      }
      appliedCoupon = coupon;
      couponStatus.textContent = `✓ Áp dụng thành công: ${coupon.label}`;
      couponStatus.className = 'coupon-status success';
      updateCheckoutTotals();
      showToast(`🎉 Mã giảm giá "${code}" đã được áp dụng!`, 'success');
    });
  }

  // ============================================================
  // FORM VALIDATION (Vietnamese)
  // ============================================================
  const VN_PHONE_REGEX = /^(0[1-9])[0-9]{8}$/;

  function validateField(input, errorEl, validator) {
    const value = input.value.trim();
    const error = validator(value);
    if (error) {
      input.classList.add('error');
      if (errorEl) errorEl.textContent = error;
      return false;
    }
    input.classList.remove('error');
    if (errorEl) errorEl.textContent = '';
    return true;
  }

  function validateCheckoutForm() {
    const nameInput = document.getElementById('custName');
    const phoneInput = document.getElementById('custPhone');
    const addressInput = document.getElementById('custAddress');
    const emailInput = document.getElementById('custEmail');

    let valid = true;

    valid = validateField(nameInput, document.getElementById('custNameError'), (v) => {
      if (!v) return 'Vui lòng nhập họ và tên';
      if (v.length < 2) return 'Họ tên phải có ít nhất 2 ký tự';
      return null;
    }) && valid;

    valid = validateField(phoneInput, document.getElementById('custPhoneError'), (v) => {
      if (!v) return 'Vui lòng nhập số điện thoại';
      const cleaned = v.replace(/\s/g, '');
      if (!VN_PHONE_REGEX.test(cleaned)) return 'Số điện thoại VN không hợp lệ (VD: 0901234567)';
      return null;
    }) && valid;

    valid = validateField(addressInput, document.getElementById('custAddressError'), (v) => {
      if (!v) return 'Vui lòng nhập địa chỉ giao hàng';
      if (v.length < 10) return 'Địa chỉ quá ngắn, vui lòng nhập đầy đủ';
      return null;
    }) && valid;

    if (emailInput && emailInput.value.trim()) {
      valid = validateField(emailInput, document.getElementById('custEmailError'), (v) => {
        if (v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return 'Email không hợp lệ';
        return null;
      }) && valid;
    }

    return valid;
  }

  // Scroll into view on mobile when input focused
  document.querySelectorAll('#checkoutForm .form-input').forEach(input => {
    input.addEventListener('focus', () => {
      if (window.innerWidth <= 768) {
        setTimeout(() => input.scrollIntoView({ behavior: 'smooth', block: 'center' }), 300);
      }
    });
  });

  // ============================================================
  // PLACE ORDER
  // ============================================================
  btnPlaceOrder.addEventListener('click', () => {
    if (!validateCheckoutForm()) {
      showToast('⚠ Vui lòng điền đầy đủ thông tin bắt buộc!', 'error');
      return;
    }

    if (cart.length === 0) {
      showToast('⚠ Giỏ hàng trống!', 'error');
      return;
    }

    const orderNum = 'ALT-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).substring(2, 6).toUpperCase();
    const subtotal = getCartTotal();
    let discount = 0;
    if (appliedCoupon) discount = Math.round(subtotal * appliedCoupon.discount);
    const total = subtotal - discount;
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;

    const paymentNames = {
      'cod': '💵 Thanh toán khi nhận hàng (COD)',
      'bank': '🏦 Chuyển khoản ngân hàng',
      'installment': '💳 Trả góp 0%'
    };

    // Build email link
    const custName = document.getElementById('custName').value.trim();
    const custEmail = document.getElementById('custEmail').value.trim();
    const custPhone = document.getElementById('custPhone').value.trim();
    const orderSummary = cart.map(item => {
      const p = PRODUCTS.find(pr => pr.id === item.id);
      return p ? `${p.name} x${item.qty} = ${formatPrice(p.price * item.qty)}` : '';
    }).filter(Boolean).join('\n');

    const mailSubject = encodeURIComponent(`Xác nhận đơn hàng ${orderNum} - AURA LUXE TECH`);
    const mailBody = encodeURIComponent(
      `Mã đơn hàng: ${orderNum}\nKhách hàng: ${custName}\nSĐT: ${custPhone}\n\nSản phẩm:\n${orderSummary}\n\nTổng: ${formatPrice(total)}\nPhương thức: ${paymentNames[paymentMethod]}`
    );

    closeCheckout();

    orderNumber.textContent = orderNum;
    orderTotalDisplay.textContent = formatPrice(total);
    orderPayment.textContent = paymentNames[paymentMethod] || paymentMethod;

    if (btnEmailOrder) {
      btnEmailOrder.href = `mailto:${custEmail || 'contact@auraluxetech.vn'}?subject=${mailSubject}&body=${mailBody}`;
    }

    orderSuccessModal.classList.add('active');
    orderSuccessModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    cart = [];
    saveCart();
    updateCartBadge();
    appliedCoupon = null;
    checkoutForm.reset();

    showToast('🎉 Đặt hàng thành công! Cảm ơn quý khách.', 'success');
  });

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
    // Price filter
    list = list.filter(p => p.price >= priceMin && p.price <= priceMax);

    switch (currentSort) {
      case 'price-asc': list.sort((a, b) => a.price - b.price); break;
      case 'price-desc': list.sort((a, b) => b.price - a.price); break;
      case 'name-asc': list.sort((a, b) => a.name.localeCompare(b.name, 'vi')); break;
      case 'rating-desc': list.sort((a, b) => b.rating - a.rating); break;
    }
    return list;
  }

  // ============================================================
  // RENDER PRODUCT CARDS
  // ============================================================
  function renderProducts() {
    const list = getFilteredProducts();
    resultCount.textContent = `Đang hiển thị ${list.length} / ${PRODUCTS.length} sản phẩm`;

    // Update breadcrumb
    if (breadcrumbCurrent) {
      const catNames = { 'all': 'Tất cả sản phẩm', 'smartphone': 'Điện thoại', 'audio': 'Âm thanh & Tai nghe', 'wearable': 'Đồng hồ thông minh', 'tablet': 'Máy tính bảng', 'laptop': 'Máy tính xách tay', 'gaming': 'Gaming' };
      breadcrumbCurrent.textContent = catNames[currentCategory] || 'Tất cả sản phẩm';
    }

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
          priceMin = 0;
          priceMax = 100000000;
          if (priceMinInput) priceMinInput.value = 0;
          if (priceMaxInput) priceMaxInput.value = 100000000;
          if (priceMinVal) priceMinVal.textContent = '0₫';
          if (priceMaxVal) priceMaxVal.textContent = '100.000.000₫';
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
      const outOfStockClass = item.stock === 0 ? 'out-of-stock' : '';
      const stockInfo = getStockLabel(item.stock);
      const stockBadgeCls = getStockBadgeCls(item.stock);

      return `
        <article class="product-card ${outOfStockClass}" data-id="${item.id}" role="button" tabindex="0" aria-label="Xem chi tiết ${item.name}">
          <button type="button" class="card-wishlist-btn ${wishlistedClass}" data-id="${item.id}" title="Yêu thích" aria-label="Thêm ${item.name} vào yêu thích">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="${heartFill}" stroke="currentColor" stroke-width="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
          <button type="button" class="card-addcart-btn" data-id="${item.id}" title="${item.stock === 0 ? 'Hết hàng' : 'Thêm vào giỏ hàng'}" aria-label="${item.stock === 0 ? 'Hết hàng' : 'Thêm ' + item.name + ' vào giỏ hàng'}">
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
            <img src="${item.image}" alt="${item.name} - ${item.categoryName}" class="card-img" loading="lazy"
              onerror="this.src='${FALLBACK_IMG}'">
            <span class="card-stock-badge ${stockBadgeCls}">${stockInfo.text}</span>
          </div>
          <div class="card-body">
            <span class="card-category">${item.categoryName}</span>
            <h3 class="card-title">${item.name}</h3>
            <div class="card-rating">
              <span class="card-stars">${renderStars(item.rating)}</span>
              <span class="card-rating-text">${item.rating} (${item.reviewCount})</span>
            </div>
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
      // Keyboard: Enter/Space to open
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openDetailModal(card.getAttribute('data-id'));
        }
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

    // Set all data BEFORE showing modal
    modalImg.src = product.image;
    modalImg.alt = product.name;
    modalImg.onerror = () => { modalImg.src = FALLBACK_IMG; };
    modalCat.textContent = product.categoryName;
    modalTitle.textContent = product.name;
    modalPrice.textContent = product.priceFormatted;
    modalWarranty.textContent = product.warranty || 'Bảo hành chính hãng 12 tháng';
    modalDesc.textContent = product.description;
    modalBadge.textContent = product.badge;

    // Rating
    modalStars.textContent = renderStars(product.rating);
    modalRatingText.textContent = `${product.rating}/5 (${product.reviewCount} đánh giá)`;

    // Stock
    const stockInfo = getStockLabel(product.stock);
    modalStock.textContent = stockInfo.text;
    modalStock.className = 'modal-stock ' + stockInfo.cls;

    // Disable add to cart if out of stock
    if (modalAddCartBtn) {
      modalAddCartBtn.disabled = product.stock === 0;
      modalAddCartBtn.innerHTML = product.stock === 0
        ? 'Hết hàng'
        : `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg> Thêm vào giỏ hàng`;
    }

    // Specs table
    modalSpecsTable.innerHTML = Object.entries(product.specs || {}).map(([k, v]) => `
      <tr><td>${k}</td><td>${v}</td></tr>
    `).join('');

    // Gallery thumbnails
    const gallery = product.gallery || [product.image];
    modalGalleryThumbs.innerHTML = gallery.map((img, i) => `
      <img src="${img}" alt="${product.name} - Ảnh ${i+1}" class="modal-thumb ${i === 0 ? 'active' : ''}" data-src="${img}" loading="lazy"
        onerror="this.src='${FALLBACK_IMG}'">
    `).join('');

    modalGalleryThumbs.querySelectorAll('.modal-thumb').forEach(thumb => {
      thumb.addEventListener('click', () => {
        modalImg.src = thumb.dataset.src;
        modalGalleryThumbs.querySelectorAll('.modal-thumb').forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
      });
    });

    // Wishlist & Compare state
    if (modalWishlistBtn) modalWishlistBtn.classList.toggle('wishlisted', isWishlisted(product.id));
    if (modalCompareBtn) modalCompareBtn.classList.toggle('comparing', isComparing(product.id));

    // Related products
    renderRelatedProducts(product);

    // Show modal
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function renderRelatedProducts(product) {
    const related = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3);
    if (related.length === 0) {
      relatedGrid.innerHTML = '<p style="color:var(--text-dim);font-size:0.82rem;">Không có sản phẩm liên quan.</p>';
      return;
    }
    relatedGrid.innerHTML = related.map(p => `
      <div class="related-card" data-id="${p.id}">
        <img src="${p.image}" alt="${p.name}" class="related-card-img" loading="lazy" onerror="this.src='${FALLBACK_IMG}'">
        <div class="related-card-name">${p.name}</div>
        <div class="related-card-price">${p.priceFormatted}</div>
      </div>
    `).join('');

    relatedGrid.querySelectorAll('.related-card').forEach(card => {
      card.addEventListener('click', () => {
        openDetailModal(card.dataset.id);
      });
    });
  }

  function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  modalCloseBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

  // Keyboard: Escape to close modals
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (modal.classList.contains('active')) closeModal();
      if (cartOverlay.classList.contains('active')) closeCart();
      if (checkoutModal.classList.contains('active')) closeCheckout();
      if (compareModal.classList.contains('active')) closeCompareModal();
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

  if (modalCompareBtn) {
    modalCompareBtn.addEventListener('click', () => {
      if (!activeProduct) return;
      toggleCompare(activeProduct.id);
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
    clearSearchBtn.style.display = currentSearch ? 'flex' : 'none';
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
  // PRICE RANGE FILTER
  // ============================================================
  if (priceMinInput && priceMaxInput) {
    priceMinInput.addEventListener('input', () => {
      priceMin = parseInt(priceMinInput.value);
      if (priceMin > parseInt(priceMaxInput.value)) {
        priceMin = parseInt(priceMaxInput.value);
        priceMinInput.value = priceMin;
      }
      priceMinVal.textContent = formatPrice(priceMin);
      renderProducts();
    });

    priceMaxInput.addEventListener('input', () => {
      priceMax = parseInt(priceMaxInput.value);
      if (priceMax < parseInt(priceMinInput.value)) {
        priceMax = parseInt(priceMinInput.value);
        priceMaxInput.value = priceMax;
      }
      priceMaxVal.textContent = formatPrice(priceMax);
      renderProducts();
    });
  }

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

  // Footer category links
  document.querySelectorAll('[data-footer-cat]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const cat = link.dataset.footerCat;
      currentCategory = cat;
      document.querySelectorAll('.pill-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.category === cat));
      renderProducts();
      window.scrollTo({ top: document.querySelector('.products-section').offsetTop - 80, behavior: 'smooth' });
    });
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
  // SWIPE GESTURES (Mobile)
  // ============================================================
  function setupSwipe(element, onSwipe) {
    let startX = 0, startY = 0, distX = 0, distY = 0;
    element.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    }, { passive: true });
    element.addEventListener('touchmove', (e) => {
      distX = e.touches[0].clientX - startX;
      distY = e.touches[0].clientY - startY;
    }, { passive: true });
    element.addEventListener('touchend', () => {
      if (Math.abs(distX) > 80 && Math.abs(distX) > Math.abs(distY)) {
        onSwipe(distX > 0 ? 'right' : 'left');
      }
      if (Math.abs(distY) > 80 && Math.abs(distY) > Math.abs(distX)) {
        onSwipe(distY > 0 ? 'down' : 'up');
      }
      distX = 0; distY = 0;
    }, { passive: true });
  }

  // Swipe right to close cart
  const cartSidebar = document.getElementById('cartSidebar');
  if (cartSidebar) {
    setupSwipe(cartSidebar, (dir) => {
      if (dir === 'right') closeCart();
    });
  }

  // ============================================================
  // SCHEMA.ORG JSON-LD
  // ============================================================
  function injectSchemaJsonLd() {
    const schemaEl = document.getElementById('schemaJsonLd');
    if (!schemaEl || !window.PRODUCTS) return;

    const itemList = PRODUCTS.map((p, i) => ({
      '@type': 'Product',
      'position': i + 1,
      'name': p.name,
      'description': p.shortDesc,
      'image': p.image,
      'brand': {
        '@type': 'Brand',
        'name': p.name.split(' ')[0]
      },
      'offers': {
        '@type': 'Offer',
        'price': p.price,
        'priceCurrency': 'VND',
        'availability': p.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
        'seller': {
          '@type': 'Organization',
          'name': 'AURA LUXE TECH'
        }
      },
      'aggregateRating': {
        '@type': 'AggregateRating',
        'ratingValue': p.rating,
        'reviewCount': p.reviewCount
      }
    }));

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      'name': 'AURA LUXE TECH - Sản phẩm công nghệ cao cấp',
      'numberOfItems': PRODUCTS.length,
      'itemListElement': itemList
    };

    schemaEl.textContent = JSON.stringify(schema);
  }

  // ============================================================
  // TOAST SYSTEM
  // ============================================================
  function showToast(message, type = 'default') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    toast.setAttribute('role', 'alert');
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
  setTimeout(() => {
    renderProducts();
    injectSchemaJsonLd();
  }, 2400);

});
