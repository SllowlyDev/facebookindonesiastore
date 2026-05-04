const defaultProducts = [
    {
        id: 'michat-1hari',
        name: 'Michat Fresh 1 Hari',
        shortDesc: 'Akun siap pakai',
        description: '• Akun sudah jadi tinggal pakai\\n• Gmail aktif 1 hari setelah itu dihapus otomatis sistem\\n• Garansi verifikasi login michat',
        price: 5000,
        stock: 999,
        category: 'michat',
        icon: 'fas fa-comments',
        badge: 'Best Seller',
        badgeColor: 'bg-pink-500'
    },
    {
        id: 'michat-permanen',
        name: 'Michat Fresh Permanen',
        shortDesc: 'Akun permanen',
        description: '• Akun sudah jadi tinggal pakai\\n• Gmail aktif permanen dengan garansi verifikasi 1x24 jam\\n• Garansi verifikasi login michat',
        price: 10000,
        stock: 999,
        category: 'michat',
        icon: 'fas fa-comments',
        badge: 'Popular',
        badgeColor: 'bg-pink-400'
    },
    {
        id: 'gmail-1hari',
        name: 'Gmail Fresh 1 Hari',
        shortDesc: 'Belum jadi michat',
        description: '• Akun belum jadi michat\\n• Gmail aktif 1 hari setelah itu dihapus otomatis sistem\\n• Tidak ada garansi verifikasi michat',
        price: 3000,
        stock: 999,
        category: 'gmail',
        icon: 'fab fa-google',
        badge: null,
        badgeColor: null
    },
    {
        id: 'gmail-permanen',
        name: 'Gmail Fresh Permanen',
        shortDesc: 'Manual team',
        description: '• Gmail polos pembuatan manual (team)\\n• Email aktif permanen dengan garansi verifikasi 1x24 jam\\n• Tidak ada garansi verifikasi michat',
        price: 7000,
        stock: 999,
        category: 'gmail',
        icon: 'fab fa-google',
        badge: 'New',
        badgeColor: 'bg-pink-300'
    },
    {
        id: 'wa-indo',
        name: 'WhatsApp Fresh Indonesia',
        shortDesc: 'Nomor Indonesia',
        description: '• WhatsApp biasa/business tanpa kartu\\n• WhatsApp aktif permanen\\n• Nomor random tidak bisa dipilih\\n• Terima nomor - masukkan nomor - terima OTP - selesai',
        price: 10000,
        stock: 999,
        category: 'whatsapp',
        icon: 'fab fa-whatsapp',
        badge: 'Hot',
        badgeColor: 'bg-pink-500'
    },
    {
        id: 'wa-luar',
        name: 'WhatsApp Fresh Luar Negeri',
        shortDesc: 'Nomor internasional',
        description: '• WhatsApp biasa/business tanpa kartu\\n• WhatsApp aktif permanen\\n• Nomor random tidak bisa dipilih\\n• Terima nomor - masukkan nomor - terima OTP - selesai',
        price: 20000,
        stock: 999,
        category: 'whatsapp',
        icon: 'fab fa-whatsapp',
        badge: 'Premium',
        badgeColor: 'bg-pink-400'
    },
    {
        id: 'youtube-premium',
        name: 'YouTube Premium 1 Bulan',
        shortDesc: 'Aktif 30 hari',
        description: '• YouTube premium aktif setelah terima undangan melalui email gmail\\n• Masa aktif 30 hari\\n• Tidak perlu login Gmail',
        price: 15000,
        stock: 999,
        category: 'youtube',
        icon: 'fab fa-youtube',
        badge: 'Best Deal',
        badgeColor: 'bg-pink-500'
    }
];

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

function formatPrice(price) {
    return price.toLocaleString('id-ID');
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function generateInvoice() {
    const prefix = 'CC-';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 5; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return prefix + result;
}

function showLoading() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) overlay.classList.add('active');
}

function hideLoading() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) overlay.classList.remove('active');
}

function getAdminWhatsApp() {
    return localStorage.getItem('cici_wa_number') || '82123829824';
}

// ==========================================
// DARK MODE
// ==========================================

function initDarkMode() {
    const darkMode = localStorage.getItem('cici_darkmode') === 'true';
    if (darkMode) {
        document.documentElement.classList.add('dark');
    }
    updateDarkModeIcons();
}

function toggleDarkMode() {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('cici_darkmode', isDark);
    updateDarkModeIcons();
}

function updateDarkModeIcons() {
    const isDark = document.documentElement.classList.contains('dark');
    document.querySelectorAll('[id^="darkModeIcon"]').forEach(icon => {
        if (isDark) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    });
}

// ==========================================
// PRODUCTS
// ==========================================

function initProducts() {
    if (!localStorage.getItem('cici_products')) {
        localStorage.setItem('cici_products', JSON.stringify(defaultProducts));
    }
}

function getProducts() {
    return JSON.parse(localStorage.getItem('cici_products') || '[]');
}

function saveProducts(products) {
    localStorage.setItem('cici_products', JSON.stringify(products));
}

function renderProducts(filter = 'all') {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;

    const products = getProducts();
    const filtered = filter === 'all' ? products : products.filter(p => p.category === filter);

    grid.innerHTML = filtered.map(product => `
        <div class="product-card bg-white/5 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-pink-200/20 dark:border-pink-500/20 shadow-lg hover:shadow-pink-500/20 card-hover group transition-all duration-300">
            <div class="relative h-44 overflow-hidden bg-gradient-to-br from-pink-50/50 to-pink-100/30 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center">
                <div class="product-img w-20 h-20 rounded-2xl bg-gradient-to-br from-pink-400/20 to-pink-600/20 flex items-center justify-center shadow-inner">
                    <i class="${product.icon} text-3xl text-pink-500 dark:text-pink-400"></i>
                </div>
                ${product.badge ? `<span class="absolute top-3 left-3 ${product.badgeColor} text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md">${product.badge}</span>` : ''}
                <span class="absolute top-3 right-3 bg-green-500/90 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md">Tersedia</span>
            </div>
            <div class="p-5">
                <div class="flex items-center justify-between mb-2">
                    <span class="px-2 py-0.5 rounded bg-pink-500/10 text-pink-600 dark:text-pink-400 text-xs font-semibold uppercase tracking-wide">${product.category}</span>
                    <span class="text-xs text-gray-400">Stok: ${product.stock}</span>
                </div>
                <h3 class="text-base font-bold mb-1.5 text-gray-900 dark:text-white group-hover:text-pink-500 transition-colors leading-tight">${product.name}</h3>
                <div class="text-gray-500 dark:text-gray-400 text-xs mb-3 line-clamp-3 leading-relaxed whitespace-pre-line">${product.description}</div>
                <div class="flex items-center justify-between mb-3">
                    <div>
                        <span class="text-xl font-bold text-pink-600 dark:text-pink-400">Rp${formatPrice(product.price)}</span>
                    </div>
                </div>
                <div class="flex items-center space-x-2 mb-3">
                    <button onclick="decreaseQty('${product.id}')" class="w-7 h-7 rounded-lg border border-pink-200 dark:border-pink-500/30 flex items-center justify-center hover:bg-pink-50 dark:hover:bg-pink-500/10 transition-colors">
                        <i class="fas fa-minus text-xs text-pink-500"></i>
                    </button>
                    <input type="number" id="qty-${product.id}" value="1" min="1" max="${product.stock}" class="w-10 h-7 text-center border border-pink-200 dark:border-pink-500/30 rounded-lg bg-white dark:bg-gray-800 text-sm focus:outline-none focus:border-pink-500 text-gray-900 dark:text-white" readonly>
                    <button onclick="increaseQty('${product.id}')" class="w-7 h-7 rounded-lg border border-pink-200 dark:border-pink-500/30 flex items-center justify-center hover:bg-pink-50 dark:hover:bg-pink-500/10 transition-colors">
                        <i class="fas fa-plus text-xs text-pink-500"></i>
                    </button>
                </div>
                <button onclick="addToCart('${product.id}')" class="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 py-2.5 rounded-xl text-white font-semibold shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 transition-all flex items-center justify-center space-x-2 text-sm">
                    <i class="fas fa-shopping-bag"></i>
                    <span>Beli Sekarang</span>
                </button>
            </div>
        </div>
    `).join('');
}

function increaseQty(productId) {
    const input = document.getElementById(`qty-${productId}`);
    const products = getProducts();
    const product = products.find(p => p.id === productId);
    if (input && product) {
        let val = parseInt(input.value) || 1;
        if (val < product.stock) input.value = val + 1;
    }
}

function decreaseQty(productId) {
    const input = document.getElementById(`qty-${productId}`);
    if (input) {
        let val = parseInt(input.value) || 1;
        if (val > 1) input.value = val - 1;
    }
}

// ==========================================
// CART
// ==========================================

function getCart() {
    return JSON.parse(localStorage.getItem('cici_cart') || '[]');
}

function saveCart(cart) {
    localStorage.setItem('cici_cart', JSON.stringify(cart));
}

function addToCart(productId) {
    const qtyInput = document.getElementById(`qty-${productId}`);
    const qty = qtyInput ? parseInt(qtyInput.value) || 1 : 1;
    const products = getProducts();
    const product = products.find(p => p.id === productId);

    if (!product) return;

    if (product.stock < qty) {
        Swal.fire({ icon: 'error', title: 'Stok Tidak Cukup', text: `Stok tersedia hanya ${product.stock} item`, confirmButtonColor: '#EC4899' });
        return;
    }

    let cart = getCart();
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        const newQty = existingItem.qty + qty;
        if (newQty > product.stock) {
            Swal.fire({ icon: 'error', title: 'Stok Tidak Cukup', text: `Total pesanan melebihi stok (${product.stock})`, confirmButtonColor: '#EC4899' });
            return;
        }
        existingItem.qty = newQty;
    } else {
        cart.push({ id: productId, qty: qty });
    }

    saveCart(cart);
    updateCartUI();

    Swal.fire({ icon: 'success', title: 'Ditambahkan!', text: `${product.name} x${qty} ditambahkan`, confirmButtonColor: '#EC4899', timer: 1500, showConfirmButton: false });
}

function quickAddToCart(productId) {
    const products = getProducts();
    const product = products.find(p => p.id === productId);
    if (!product) return;

    if (product.stock < 1) {
        Swal.fire({ icon: 'error', title: 'Stok Habis', text: 'Maaf, produk ini sedang out of stock', confirmButtonColor: '#EC4899' });
        return;
    }

    let cart = getCart();
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        if (existingItem.qty + 1 > product.stock) {
            Swal.fire({ icon: 'error', title: 'Stok Tidak Cukup', confirmButtonColor: '#EC4899' });
            return;
        }
        existingItem.qty += 1;
    } else {
        cart.push({ id: productId, qty: 1 });
    }

    saveCart(cart);
    updateCartUI();

    const Toast = Swal.mixin({ toast: true, position: 'top-end', showConfirmButton: false, timer: 2000, timerProgressBar: true });
    Toast.fire({ icon: 'success', title: `${product.name} ditambahkan` });
}

function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
    updateCartUI();
    renderCartItems();
}

function updateCartQty(productId, newQty) {
    const products = getProducts();
    const product = products.find(p => p.id === productId);
    if (!product) return;

    newQty = parseInt(newQty) || 1;
    if (newQty < 1) newQty = 1;
    if (newQty > product.stock) {
        Swal.fire({ icon: 'error', title: 'Stok Tidak Cukup', text: `Maksimal ${product.stock} item`, confirmButtonColor: '#EC4899' });
        newQty = product.stock;
    }

    let cart = getCart();
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.qty = newQty;
        saveCart(cart);
        updateCartUI();
        renderCartItems();
    }
}

function updateCartUI() {
    const cart = getCart();
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

    document.querySelectorAll('[id^="cartCount"]').forEach(el => {
        el.textContent = totalItems;
        if (totalItems > 0) el.classList.remove('hidden');
        else el.classList.add('hidden');
    });
}

function openCart() {
    const sidebar = document.getElementById('cartSidebar');
    const content = document.getElementById('cartContent');
    if (sidebar && content) {
        sidebar.classList.remove('hidden');
        setTimeout(() => content.classList.remove('translate-x-full'), 10);
        renderCartItems();
    }
}

function closeCart() {
    const sidebar = document.getElementById('cartSidebar');
    const content = document.getElementById('cartContent');
    if (content) content.classList.add('translate-x-full');
    setTimeout(() => { if (sidebar) sidebar.classList.add('hidden'); }, 300);
}

function renderCartItems() {
    const container = document.getElementById('cartItems');
    if (!container) return;

    const cart = getCart();
    const products = getProducts();

    if (cart.length === 0) {
        container.innerHTML = `
            <div class="text-center py-8">
                <i class="fas fa-shopping-basket text-4xl text-pink-200 dark:text-pink-800 mb-4"></i>
                <p class="text-gray-500">Keranjang masih kosong</p>
                <a href="index.html#products" onclick="closeCart()" class="inline-block mt-4 text-pink-500 hover:underline">Belanja Sekarang</a>
            </div>`;
        document.getElementById('cartTotal').textContent = 'Rp0';
        return;
    }

    let total = 0;
    container.innerHTML = cart.map(item => {
        const product = products.find(p => p.id === item.id);
        if (!product) return '';
        const itemTotal = product.price * item.qty;
        total += itemTotal;
        return `
            <div class="flex items-center space-x-4 p-4 bg-pink-50/50 dark:bg-gray-900 rounded-xl border border-pink-100 dark:border-pink-500/10">
                <div class="w-12 h-12 rounded-lg bg-gradient-to-br from-pink-400/20 to-pink-600/20 flex items-center justify-center flex-shrink-0">
                    <i class="${product.icon} text-pink-500 text-sm"></i>
                </div>
                <div class="flex-1 min-w-0">
                    <h4 class="font-medium text-sm text-gray-900 dark:text-white truncate">${product.name}</h4>
                    <p class="text-xs text-gray-500">${item.qty} x Rp${formatPrice(product.price)}</p>
                </div>
                <div class="flex items-center space-x-2">
                    <button onclick="updateCartQty('${item.id}', ${item.qty - 1})" class="w-6 h-6 rounded-md border border-pink-200 dark:border-pink-500/30 flex items-center justify-center hover:bg-pink-100 dark:hover:bg-pink-500/10">
                        <i class="fas fa-minus text-xs text-gray-500"></i>
                    </button>
                    <span class="w-8 text-center text-sm font-medium text-gray-900 dark:text-white">${item.qty}</span>
                    <button onclick="updateCartQty('${item.id}', ${item.qty + 1})" class="w-6 h-6 rounded-md border border-pink-200 dark:border-pink-500/30 flex items-center justify-center hover:bg-pink-100 dark:hover:bg-pink-500/10">
                        <i class="fas fa-plus text-xs text-gray-500"></i>
                    </button>
                </div>
                <button onclick="removeFromCart('${item.id}')" class="text-red-400 hover:text-red-500 p-1">
                    <i class="fas fa-trash text-sm"></i>
                </button>
            </div>`;
    }).join('');

    const totalEl = document.getElementById('cartTotal');
    if (totalEl) totalEl.textContent = 'Rp' + formatPrice(total);
}

function goToCheckout() {
    const cart = getCart();
    if (cart.length === 0) {
        Swal.fire({ icon: 'warning', title: 'Keranjang Kosong', text: 'Silakan tambahkan produk terlebih dahulu', confirmButtonColor: '#EC4899' });
        return;
    }
    window.location.href = 'checkout.html';
}

function updateStockAfterOrder(cart) {
    const products = getProducts();
    cart.forEach(item => {
        const product = products.find(p => p.id === item.id);
        if (product) product.stock = Math.max(0, product.stock - item.qty);
    });
    saveProducts(products);
}

function getStatusIcon(status) {
    const icons = { 'Diproses': 'clock', 'Berhasil': 'check-circle', 'Ditolak': 'times-circle' };
    return icons[status] || 'clock';
}