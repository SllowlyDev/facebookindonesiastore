// ==========================================
// SllowlyStore - Main JavaScript
// ==========================================

// Default Products Data
const defaultProducts = [
    {
        id: 'fb-tools',
        name: 'Tools Auto Create Facebook Mentah',
        shortDesc: 'Auto create akun FB',
        description: 'Alat program untuk memproduksi akun Facebook mentah belum konfirmasi secara otomatis. Tools ini memudahkan Anda membuat akun Facebook dalam jumlah besar untuk kebutuhan bisnis.',
        price: 35000,
        stock: 50,
        category: 'tools',
        icon: 'fas fa-robot',
        badge: 'Popular',
        badgeColor: 'badge-popular',
        image: 'https://cdn-icons-png.flaticon.com/512/5968/5968764.png'
    },
    {
        id: 'fb-mentah',
        name: 'Akun Facebook Mentah',
        shortDesc: 'Belum konfirmasi OTP',
        description: 'Akun Facebook belum diberi OTP atau belum dikonfirmasi. Cocok untuk kebutuhan dasar atau verifikasi manual.',
        price: 500,
        stock: 1000,
        category: 'facebook',
        icon: 'fab fa-facebook',
        badge: 'Best Seller',
        badgeColor: 'badge-popular',
        image: 'https://cdn-icons-png.flaticon.com/512/733/733547.png'
    },
    {
        id: 'fb-fresh',
        name: 'Akun Facebook Fresh',
        shortDesc: 'Fresh manual/otomatis',
        description: 'Akun Facebook fresh langsung secara manual/otomatis dari tools. Siap pakai untuk berbagai kebutuhan.',
        price: 2000,
        stock: 500,
        category: 'facebook',
        icon: 'fab fa-facebook',
        badge: 'New',
        badgeColor: 'badge-new',
        image: 'https://cdn-icons-png.flaticon.com/512/733/733547.png'
    },
    {
        id: 'fb-fresh-low',
        name: 'Akun Facebook Fresh Low',
        shortDesc: 'Dengan foto profil',
        description: 'Akun Facebook fresh dengan spesifikasi sudah dipasang foto profil lengkap dengan yang lain. Lebih trusted dan siap digunakan.',
        price: 3000,
        stock: 300,
        category: 'facebook',
        icon: 'fab fa-facebook',
        badge: null,
        badgeColor: null,
        image: 'https://cdn-icons-png.flaticon.com/512/733/733547.png'
    },
    {
        id: 'fb-fresh-medium',
        name: 'Akun Facebook Fresh Medium',
        shortDesc: '2FA + Email akses',
        description: 'Akun Facebook fresh sudah siap pakai berbagai kebutuhan dengan keamanan autentikasi 2 faktor dan email akses. Level tertinggi keamanan.',
        price: 5000,
        stock: 200,
        category: 'facebook',
        icon: 'fab fa-facebook',
        badge: 'Premium',
        badgeColor: 'badge-popular',
        image: 'https://cdn-icons-png.flaticon.com/512/733/733547.png'
    },
    {
        id: 'gmail-bekas',
        name: 'Akun Gmail Bekas',
        shortDesc: 'Pemakaian wajar',
        description: 'Akun Gmail bekas pemakaian wajar seperti Youtube Premium, TikTok, Facebook dan sebagainya. Sudah memiliki history aktivitas.',
        price: 3000,
        stock: 400,
        category: 'gmail',
        icon: 'fab fa-google',
        badge: null,
        badgeColor: null,
        image: 'https://cdn-icons-png.flaticon.com/512/732/732200.png'
    },
    {
        id: 'gmail-fresh',
        name: 'Akun Gmail Fresh',
        shortDesc: 'Untuk verifikasi',
        description: 'Akun Gmail fresh cocok untuk kebutuhan verifikasi aplikasi atau pendaftaran. Bersih dan siap digunakan untuk berbagai platform.',
        price: 5000,
        stock: 350,
        category: 'gmail',
        icon: 'fab fa-google',
        badge: 'New',
        badgeColor: 'badge-new',
        image: 'https://cdn-icons-png.flaticon.com/512/732/732200.png'
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
    const prefix = 'INV-';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 5; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return prefix + result;
}

function showLoading() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        overlay.classList.add('active');
    }
}

function hideLoading() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        overlay.classList.remove('active');
    }
}

// ==========================================
// DARK MODE
// ==========================================

function initDarkMode() {
    const darkMode = localStorage.getItem('sllowly_darkmode') === 'true';
    if (darkMode) {
        document.documentElement.classList.add('dark');
    }
    updateDarkModeIcons();
}

function toggleDarkMode() {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('sllowly_darkmode', isDark);
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
    if (!localStorage.getItem('sllowly_products')) {
        localStorage.setItem('sllowly_products', JSON.stringify(defaultProducts));
    }
}

function getProducts() {
    return JSON.parse(localStorage.getItem('sllowly_products') || '[]');
}

function renderProducts(filter = 'all') {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;

    const products = getProducts();
    const filtered = filter === 'all' ? products : products.filter(p => p.category === filter);

    grid.innerHTML = filtered.map(product => `
        <div class="product-card bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-lg card-hover group">
            <div class="relative h-48 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
                <div class="product-img w-24 h-24 rounded-2xl bg-gradient-to-br from-primary/20 to-primary-light/20 flex items-center justify-center">
                    <i class="${product.icon} text-4xl text-primary"></i>
                </div>
                ${product.badge ? `<span class="absolute top-4 left-4 ${product.badgeColor} text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">${product.badge}</span>` : ''}
                <div class="absolute top-4 right-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-bold text-primary shadow-lg">
                    Stok: ${product.stock}
                </div>
                <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                    <button onclick="quickAddToCart('${product.id}')" class="bg-white text-primary px-6 py-2 rounded-full font-semibold shadow-lg hover:bg-primary hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0">
                        <i class="fas fa-cart-plus mr-2"></i>Tambah
                    </button>
                </div>
            </div>
            <div class="p-6">
                <div class="flex items-center space-x-2 mb-2">
                    <span class="px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium capitalize">${product.category}</span>
                </div>
                <h3 class="text-lg font-bold mb-2 group-hover:text-primary transition-colors">${product.name}</h3>
                <p class="text-gray-500 dark:text-gray-400 text-sm mb-4 line-clamp-2">${product.description}</p>
                <div class="flex items-center justify-between">
                    <div>
                        <span class="text-2xl font-bold text-primary">Rp${formatPrice(product.price)}</span>
                    </div>
                    <div class="flex space-x-2">
                        <button onclick="decreaseQty('${product.id}')" class="w-8 h-8 rounded-lg border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                            <i class="fas fa-minus text-xs"></i>
                        </button>
                        <input type="number" id="qty-${product.id}" value="1" min="1" max="${product.stock}" class="w-12 h-8 text-center border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-sm focus:outline-none focus:border-primary">
                        <button onclick="increaseQty('${product.id}')" class="w-8 h-8 rounded-lg border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                            <i class="fas fa-plus text-xs"></i>
                        </button>
                    </div>
                </div>
                <button onclick="addToCart('${product.id}')" class="w-full mt-4 btn-primary py-3 rounded-xl text-white font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2">
                    <i class="fas fa-shopping-cart"></i>
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
        if (val < product.stock) {
            input.value = val + 1;
        }
    }
}

function decreaseQty(productId) {
    const input = document.getElementById(`qty-${productId}`);
    if (input) {
        let val = parseInt(input.value) || 1;
        if (val > 1) {
            input.value = val - 1;
        }
    }
}

// ==========================================
// CART
// ==========================================

function getCart() {
    return JSON.parse(localStorage.getItem('sllowly_cart') || '[]');
}

function saveCart(cart) {
    localStorage.setItem('sllowly_cart', JSON.stringify(cart));
}

function addToCart(productId) {
    const qtyInput = document.getElementById(`qty-${productId}`);
    const qty = qtyInput ? parseInt(qtyInput.value) || 1 : 1;
    const products = getProducts();
    const product = products.find(p => p.id === productId);

    if (!product) return;

    if (product.stock < qty) {
        Swal.fire({
            icon: 'error',
            title: 'Stok Tidak Cukup',
            text: `Stok tersedia hanya ${product.stock} item`,
            confirmButtonColor: '#7C3AED'
        });
        return;
    }

    let cart = getCart();
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        const newQty = existingItem.qty + qty;
        if (newQty > product.stock) {
            Swal.fire({
                icon: 'error',
                title: 'Stok Tidak Cukup',
                text: `Total pesanan melebihi stok (${product.stock})`,
                confirmButtonColor: '#7C3AED'
            });
            return;
        }
        existingItem.qty = newQty;
    } else {
        cart.push({ id: productId, qty: qty });
    }

    saveCart(cart);
    updateCartUI();

    Swal.fire({
        icon: 'success',
        title: 'Ditambahkan!',
        text: `${product.name} x${qty} ditambahkan ke keranjang`,
        confirmButtonColor: '#7C3AED',
        timer: 1500,
        showConfirmButton: false
    });
}

function quickAddToCart(productId) {
    const products = getProducts();
    const product = products.find(p => p.id === productId);
    if (!product) return;

    if (product.stock < 1) {
        Swal.fire({
            icon: 'error',
            title: 'Stok Habis',
            text: 'Maaf, produk ini sedang out of stock',
            confirmButtonColor: '#7C3AED'
        });
        return;
    }

    let cart = getCart();
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        if (existingItem.qty + 1 > product.stock) {
            Swal.fire({
                icon: 'error',
                title: 'Stok Tidak Cukup',
                confirmButtonColor: '#7C3AED'
            });
            return;
        }
        existingItem.qty += 1;
    } else {
        cart.push({ id: productId, qty: 1 });
    }

    saveCart(cart);
    updateCartUI();

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true
    });

    Toast.fire({
        icon: 'success',
        title: `${product.name} ditambahkan`
    });
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
        Swal.fire({
            icon: 'error',
            title: 'Stok Tidak Cukup',
            text: `Maksimal ${product.stock} item`,
            confirmButtonColor: '#7C3AED'
        });
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
        if (totalItems > 0) {
            el.classList.remove('hidden');
        } else {
            el.classList.add('hidden');
        }
    });
}

function openCart() {
    const sidebar = document.getElementById('cartSidebar');
    const content = document.getElementById('cartContent');
    if (sidebar && content) {
        sidebar.classList.remove('hidden');
        setTimeout(() => {
            content.classList.remove('translate-x-full');
        }, 10);
        renderCartItems();
    }
}

function closeCart() {
    const sidebar = document.getElementById('cartSidebar');
    const content = document.getElementById('cartContent');
    if (content) {
        content.classList.add('translate-x-full');
    }
    setTimeout(() => {
        if (sidebar) sidebar.classList.add('hidden');
    }, 300);
}

function renderCartItems() {
    const container = document.getElementById('cartItems');
    if (!container) return;

    const cart = getCart();
    const products = getProducts();

    if (cart.length === 0) {
        container.innerHTML = `
            <div class="text-center py-8">
                <i class="fas fa-shopping-basket text-4xl text-gray-300 mb-4"></i>
                <p class="text-gray-500">Keranjang masih kosong</p>
                <a href="index.html#products" onclick="closeCart()" class="inline-block mt-4 text-primary hover:underline">Belanja Sekarang</a>
            </div>
        `;
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
            <div class="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
                <div class="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-primary-light/20 flex items-center justify-center flex-shrink-0">
                    <i class="${product.icon} text-primary text-sm"></i>
                </div>
                <div class="flex-1 min-w-0">
                    <h4 class="font-medium text-sm truncate">${product.name}</h4>
                    <p class="text-xs text-gray-500">Rp${formatPrice(product.price)}</p>
                </div>
                <div class="flex items-center space-x-2">
                    <button onclick="updateCartQty('${item.id}', ${item.qty - 1})" class="w-6 h-6 rounded-md border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700">
                        <i class="fas fa-minus text-xs"></i>
                    </button>
                    <span class="w-8 text-center text-sm font-medium">${item.qty}</span>
                    <button onclick="updateCartQty('${item.id}', ${item.qty + 1})" class="w-6 h-6 rounded-md border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700">
                        <i class="fas fa-plus text-xs"></i>
                    </button>
                </div>
                <button onclick="removeFromCart('${item.id}')" class="text-red-500 hover:text-red-600 p-1">
                    <i class="fas fa-trash text-sm"></i>
                </button>
            </div>
        `;
    }).join('');

    const totalEl = document.getElementById('cartTotal');
    if (totalEl) {
        totalEl.textContent = 'Rp' + formatPrice(total);
    }
}

function goToCheckout() {
    const cart = getCart();
    if (cart.length === 0) {
        Swal.fire({
            icon: 'warning',
            title: 'Keranjang Kosong',
            text: 'Silakan tambahkan produk terlebih dahulu',
            confirmButtonColor: '#7C3AED'
        });
        return;
    }
    window.location.href = 'checkout.html';
}

// ==========================================
// STOCK MANAGEMENT
// ==========================================

function updateStockAfterOrder(cart) {
    const products = getProducts();
    cart.forEach(item => {
        const product = products.find(p => p.id === item.id);
        if (product) {
            product.stock = Math.max(0, product.stock - item.qty);
        }
    });
    localStorage.setItem('sllowly_products', JSON.stringify(products));
}

// ==========================================
// STATUS ICONS
// ==========================================

function getStatusIcon(status) {
    const icons = {
        'Diproses': 'clock',
        'Berhasil': 'check-circle',
        'Ditolak': 'times-circle'
    };
    return icons[status] || 'clock';
}
