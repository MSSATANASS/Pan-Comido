/**
 * Pan Comido App - Main Application Logic
 * PWA User Application JavaScript
 */

// Debug Helper for Native App
// Debug Helper for Native App
window.onerror = function (msg, url, line, col, error) {
    // Only show alert in native mode or if explicitly enabled
    if (window.location.protocol === 'file:' || window.Capacitor) {
        // Debounce alerts to avoid loops
        if (!window._errorShown) {
            window._errorShown = true;
            alert("System Error:\n" + msg + "\n\nPlease restart app.");
            setTimeout(() => window._errorShown = false, 5000);
        }
    }
    console.error(msg, error);
    return false; // Let default handler run
};

// Ensure globals exist immediately
window.CONFIG = window.CONFIG || {};
window.Utils = window.Utils || {
    safeJSONParse: (str, fallback) => { try { return JSON.parse(str) } catch { return fallback } },
    sanitizeInput: (s) => s || '',
    isValidEmail: () => true,
    formatCurrency: (n) => '$' + n,
    calculateDiscount: () => 0,
    generatePickupCode: () => 'ERROR'
};

// Ensure globals exist
window.CONFIG = window.CONFIG || {};
window.Utils = window.Utils || {
    // Fallback utils if config.js fails
    safeJSONParse: (str, fallback) => { try { return JSON.parse(str) } catch { return fallback } },
    sanitizeInput: (s) => s || '',
    isValidEmail: () => true,
    formatCurrency: (n) => '$' + n,
    calculateDiscount: () => 0,
    generatePickupCode: () => 'ERROR'
};

// ========================================
// Initialize Supabase
// ========================================
let supabase = null;
try {
    if (window.supabase && typeof window.CONFIG !== 'undefined' && window.CONFIG.SUPABASE_URL) {
        supabase = window.supabase.createClient(window.CONFIG.SUPABASE_URL, window.CONFIG.SUPABASE_ANON_KEY);
    }
} catch (e) {
    console.warn('Supabase init failed:', e);
}

// ========================================
// Application State
// ========================================
window.AppState = {
    currentUser: window.Utils.safeJSONParse(localStorage.getItem('pancomido_user'), null),
    offers: [],
    currentOffer: null,
    quantity: 1
};

// ========================================
// PWA Install Logic
// ========================================
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    const prompt = document.getElementById('installPrompt');
    if (prompt) prompt.style.display = 'flex';
});

async function installPWA() {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            const prompt = document.getElementById('installPrompt');
            if (prompt) prompt.style.display = 'none';
        }
        deferredPrompt = null;
    }
}

function closeInstall() {
    const prompt = document.getElementById('installPrompt');
    if (prompt) prompt.style.display = 'none';
}

// ========================================
// Navigation
// ========================================
window.showScreen = function (screenId) {
    console.log('Showing screen:', screenId);
    // Hide all screens
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));

    // Show target screen
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
    }

    // Update navigation highlights
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

    const navMap = {
        'homeScreen': 0,
        'ordersScreen': 2,
        'profileScreen': 3
    };

    if (navMap[screenId] !== undefined) {
        const navs = document.querySelectorAll('.bottom-nav');
        navs.forEach(nav => {
            const items = nav.querySelectorAll('.nav-item');
            if (items[navMap[screenId]]) {
                items[navMap[screenId]].classList.add('active');
            }
        });
    }

    // Load screen data
    switch (screenId) {
        case 'homeScreen':
            loadOffers();
            break;
        case 'ordersScreen':
            loadOrders();
            break;
        case 'profileScreen':
            updateProfile();
            break;
    }
};

// ========================================
// Authentication
// ========================================
// Export functions to global scope explicitly
window.login = function () {
    // Alert for debugging
    if (window.location.protocol === 'file:' || window.Capacitor) {
        alert('Login function called!');
    }
    console.log('Login attempt');
    const nameInput = document.getElementById('userName');
    const emailInput = document.getElementById('userEmail');

    const name = window.Utils.sanitizeInput(nameInput?.value) || 'Usuario';
    const email = window.Utils.sanitizeInput(emailInput?.value) || 'demo@pancomido.mx';

    // Validate email
    if (email && !window.Utils.isValidEmail(email)) {
        if (window.location.protocol === 'file:' || window.Capacitor) {
            alert('Email invalido');
        }
        showToast('Por favor ingresa un email válido', 'error');
        return;
    }

    if (window.location.protocol === 'file:' || window.Capacitor) {
        alert('Logging in as: ' + name);
    }

    window.AppState.currentUser = { name, email };
    localStorage.setItem('pancomido_user', JSON.stringify(window.AppState.currentUser));
    showScreen('homeScreen');
};

window.loginGuest = function () {
    console.log('Guest login');
    window.AppState.currentUser = { name: 'Invitado', email: 'invitado@pancomido.mx' };
    localStorage.setItem('pancomido_user', JSON.stringify(window.AppState.currentUser));
    showScreen('homeScreen');
};

window.logout = function () {
    window.AppState.currentUser = null;
    localStorage.removeItem('pancomido_user');
    showScreen('loginScreen');
};

// ========================================
// Offers Management
// ========================================
window.loadOffers = async function () {
    const container = document.getElementById('offersList');
    if (!container) return;

    // Show loading skeleton
    container.innerHTML = `
        <div class="skeleton skeleton-card"></div>
        <div class="skeleton skeleton-card"></div>
    `;

    try {
        // Timeout race: max wait time for API
        const fetchPromise = new Promise(async (resolve, reject) => {
            try {
                if (supabase) {
                    const { data, error } = await supabase
                        .from('offers')
                        .select('*')
                        .eq('is_active', true)
                        .gt('quantity_left', 0);

                    if (error) reject(error);
                    else resolve(data);
                } else {
                    resolve(null);
                }
            } catch (e) {
                reject(e);
            }
        });

        const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Timeout')), window.CONFIG.FETCH_TIMEOUT_MS || 2000)
        );

        const data = await Promise.race([fetchPromise, timeoutPromise]);

        if (data && data.length > 0) {
            window.AppState.offers = data;
        } else {
            throw new Error('No data');
        }
    } catch (e) {
        console.log('Using demo data:', e.message);
        // Fallback to demo data
        window.AppState.offers = window.CONFIG.DEMO_OFFERS || [];
    }

    renderOffers(window.AppState.offers);
};

function renderOffers(list) {
    const container = document.getElementById('offersList');
    if (!container) return;

    if (list.length === 0) {
        container.innerHTML = '<div class="loading">No hay ofertas disponibles 😔</div>';
        return;
    }

    container.innerHTML = list.map(o => {
        const discount = Utils.calculateDiscount(o.original_price, o.discount_price);
        const sanitizedTitle = Utils.sanitizeInput(o.title);
        const sanitizedRestaurant = Utils.sanitizeInput(o.restaurant_name);

        return `
            <article class="offer-card" 
                     onclick="showOffer('${o.id}')" 
                     tabindex="0" 
                     role="button"
                     aria-label="${sanitizedTitle} de ${sanitizedRestaurant}, ${discount}% de descuento"
                     onkeypress="if(event.key==='Enter')showOffer('${o.id}')">
                <div class="offer-img" 
                     style="background-image: url('${o.image_url || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400'}')"
                     role="img"
                     aria-label="${sanitizedTitle}">
                    <span class="offer-badge" aria-label="Quedan ${o.quantity_left} unidades">🔥 Quedan ${o.quantity_left}</span>
                    <span class="offer-discount" aria-label="${discount}% de descuento">-${discount}%</span>
                </div>
                <div class="offer-content">
                    <div class="offer-header">
                        <span class="offer-name">${sanitizedTitle}</span>
                        <div class="offer-rating" aria-label="Calificación 4.8 estrellas">★ 4.8</div>
                    </div>
                    <div class="offer-restaurant">🏪 ${sanitizedRestaurant}</div>
                    <div class="offer-time" aria-label="Horario de recogida">🕒 ${o.pickup_start} - ${o.pickup_end}</div>
                    <div class="offer-price">
                        <span class="price-new" aria-label="Precio ${o.discount_price} pesos">${Utils.formatCurrency(o.discount_price)}</span>
                        <span class="price-old" aria-label="Precio original ${o.original_price} pesos">${Utils.formatCurrency(o.original_price)}</span>
                    </div>
                </div>
            </article>
        `;
    }).join('');
}

window.showOffer = function (id) {
    window.AppState.currentOffer = window.AppState.offers.find(o => o.id == id);
    if (!window.AppState.currentOffer) return;

    window.AppState.quantity = 1;
    const offer = window.AppState.currentOffer;
    const discount = window.Utils.calculateDiscount(offer.original_price, offer.discount_price);

    // Update detail screen
    const detailImg = document.getElementById('detailImg');
    const detailTitle = document.getElementById('detailTitle');
    const detailRestaurant = document.getElementById('detailRestaurant');
    const detailDesc = document.getElementById('detailDesc');
    const detailTime = document.getElementById('detailTime');
    const detailStock = document.getElementById('detailStock');
    const detailDiscount = document.getElementById('detailDiscount');
    const qtyValue = document.getElementById('qtyValue');

    if (detailImg) detailImg.style.backgroundImage = `url('${offer.image_url}')`;
    if (detailTitle) detailTitle.textContent = offer.title;
    if (detailRestaurant) detailRestaurant.textContent = offer.restaurant_name;
    if (detailDesc) detailDesc.textContent = offer.description || 'Delicioso producto disponible para rescate.';
    if (detailTime) detailTime.textContent = `${offer.pickup_start} - ${offer.pickup_end}`;
    if (detailStock) detailStock.textContent = `${offer.quantity_left} disponibles`;
    if (detailDiscount) detailDiscount.textContent = `-${discount}%`;
    if (qtyValue) qtyValue.textContent = '1';

    updatePrice();
    showScreen('detailScreen');
};

window.changeQty = function (delta) {
    const newQty = window.AppState.quantity + delta;
    const maxQty = window.AppState.currentOffer?.quantity_left || 10;

    if (newQty >= 1 && newQty <= maxQty) {
        window.AppState.quantity = newQty;
        const qtyValue = document.getElementById('qtyValue');
        if (qtyValue) qtyValue.textContent = window.AppState.quantity;
        updatePrice();
    }
};

function updatePrice() {
    const totalPrice = document.getElementById('totalPrice');
    if (totalPrice && window.AppState.currentOffer) {
        totalPrice.textContent = window.Utils.formatCurrency(window.AppState.currentOffer.discount_price * window.AppState.quantity);
    }
}

// ========================================
// Reservations
// ========================================
// ========================================
// Reservations
// ========================================
window.reserveOffer = async function () {
    if (!window.AppState.currentOffer) return;

    const code = window.Utils.generatePickupCode();
    const offer = window.AppState.currentOffer;

    const order = {
        offer_id: offer.id,
        offer_title: offer.title,
        restaurant_name: offer.restaurant_name,
        user_email: window.AppState.currentUser?.email,
        user_name: window.AppState.currentUser?.name,
        quantity: window.AppState.quantity,
        total_price: offer.discount_price * window.AppState.quantity,
        saved: (offer.original_price - offer.discount_price) * window.AppState.quantity,
        commission: offer.discount_price * window.AppState.quantity * (window.CONFIG.COMMISSION_RATE || 0.25),
        pickup_code: code,
        pickup_time: `${offer.pickup_start} - ${offer.pickup_end}`,
        status: 'pending'
    };

    // Save to Supabase
    try {
        if (supabase) {
            await supabase.from('orders').insert([order]);
        }
    } catch (e) {
        console.warn('Supabase order save failed:', e);
    }

    // Save locally for offline/speed
    const orders = window.Utils.safeJSONParse(localStorage.getItem('pancomido_orders'), []);
    orders.unshift({ ...order, created_at: new Date().toISOString() });
    localStorage.setItem('pancomido_orders', JSON.stringify(orders));

    // Show success modal
    const pickupCode = document.getElementById('pickupCode');
    if (pickupCode) pickupCode.textContent = code;

    // Generate WhatsApp link
    const msg = `Hola ${offer.restaurant_name}, reservé *${window.AppState.quantity}x ${offer.title}* en Pan Comido. Mi código es *${code}*. Voy a recogerlo.`;
    const waUrl = `https://wa.me/?text=${encodeURIComponent(msg)}`;
    const waLink = document.getElementById('waLink');
    if (waLink) waLink.href = waUrl;

    const modal = document.getElementById('successModal');
    if (modal) modal.classList.add('show');
};

window.closeModal = function () {
    const modal = document.getElementById('successModal');
    if (modal) modal.classList.remove('show');
    showScreen('ordersScreen');
};

// ========================================
// Orders Management
// ========================================
// ========================================
// Orders Management
// ========================================
window.loadOrders = async function () {
    const container = document.getElementById('ordersList');
    if (!container) return;

    container.innerHTML = '<div class="loading"><div class="spinner"></div>Cargando...</div>';

    let orders = [];

    // Fetch from Supabase
    try {
        if (supabase && window.AppState.currentUser) {
            const { data } = await supabase
                .from('orders')
                .select('*')
                .eq('user_email', window.AppState.currentUser.email)
                .order('created_at', { ascending: false });

            if (data) orders = data;
        }
    } catch (e) {
        console.warn('Supabase orders fetch failed:', e);
    }

    // Merge with local orders
    const localOrders = window.Utils.safeJSONParse(localStorage.getItem('pancomido_orders'), []);
    const orderMap = new Map();
    [...orders, ...localOrders].forEach(o => orderMap.set(o.pickup_code, o));
    const finalOrders = Array.from(orderMap.values())
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    if (finalOrders.length === 0) {
        container.innerHTML = '<div class="loading">No tienes pedidos activos.</div>';
        return;
    }

    container.innerHTML = finalOrders.map(o => {
        const sanitizedRestaurant = window.Utils.sanitizeInput(o.restaurant_name);
        const sanitizedTitle = window.Utils.sanitizeInput(o.offer_title);

        return `
            <article class="order-card" aria-label="Pedido de ${sanitizedTitle}">
                <div class="order-top">
                    <span class="order-restaurant">${sanitizedRestaurant}</span>
                    <span class="order-status ${o.status === 'pending' ? 'status-pending' : 'status-completed'}" 
                          role="status">
                        ${o.status === 'pending' ? 'Pendiente' : 'Completado'}
                    </span>
                </div>
                <div class="order-item">🛍️ ${o.quantity}x ${sanitizedTitle}</div>
                <div class="order-item">💰 Total: <b>${window.Utils.formatCurrency(o.total_price)}</b></div>
                <div class="order-code" aria-label="Código de entrega ${o.pickup_code}">
                    <div class="code-label">Código de entrega</div>
                    <div class="code-value">${o.pickup_code}</div>
                </div>
                ${o.status === 'pending' ? `
                    <a href="https://wa.me/?text=${encodeURIComponent(`Hola, voy por mi pedido ${o.pickup_code} de ${o.offer_title}.`)}" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       class="btn-whatsapp" 
                       style="margin-top:16px;"
                       aria-label="Contactar restaurante por WhatsApp">
                        <span aria-hidden="true">💬</span> Contactar Restaurante
                    </a>
                ` : ''}
            </article>
        `;
    }).join('');
};

// ========================================
// Profile
// ========================================
window.updateProfile = function () {
    if (window.AppState.currentUser) {
        const profileName = document.getElementById('profileName');
        const profileEmail = document.getElementById('profileEmail');

        if (profileName) profileName.textContent = window.AppState.currentUser.name;
        if (profileEmail) profileEmail.textContent = window.AppState.currentUser.email;
    }

    const orders = window.Utils.safeJSONParse(localStorage.getItem('pancomido_orders'), []);
    const totalSaved = orders.reduce((sum, o) => sum + (o.saved || 0), 0);

    const userOrders = document.getElementById('userOrders');
    const userSaved = document.getElementById('userSaved');

    if (userOrders) userOrders.textContent = orders.length;
    if (userSaved) userSaved.textContent = window.Utils.formatCurrency(totalSaved);
};

// ========================================
// Toast Notifications
// ========================================
// ========================================
// Toast Notifications
// ========================================
window.showToast = function (message, type = 'info') {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 100px;
        left: 50%;
        transform: translateX(-50%);
        background: ${type === 'error' ? '#ef4444' : '#22c55e'};
        color: white;
        padding: 12px 24px;
        border-radius: 12px;
        font-weight: 600;
        z-index: 2000;
        animation: slideUp 0.3s;
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
};

// ========================================
// Keyboard Navigation
// ========================================
document.addEventListener('keydown', (e) => {
    // ESC to close modal
    if (e.key === 'Escape') {
        const modal = document.getElementById('successModal');
        if (modal?.classList.contains('show')) {
            closeModal();
        }
    }
});

// ========================================
// Initialize App
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    // Register Service Worker
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('./sw.js')
                .then(reg => console.log('SW registered:', reg.scope))
                .catch(err => console.error('SW registration failed:', err));
        });
    }

    // Auto-login if user exists
    if (AppState.currentUser) {
        showScreen('homeScreen');
    }
});

// Legacy support - make functions globally available
window.login = login;
window.loginGuest = loginGuest;
window.logout = logout;
window.showScreen = showScreen;
window.showOffer = showOffer;
window.changeQty = changeQty;
window.reserveOffer = reserveOffer;
window.closeModal = closeModal;
// ========================================
// PWA Install Logic - Debugged for Native
// ========================================
window.installPWA = async function () {
    // No-op or different logic for native
    console.log('Install PWA clicked');
    if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            closeInstall();
        }
        deferredPrompt = null;
    }
};

window.closeInstall = function () {
    const prompt = document.getElementById('installPrompt');
    if (prompt) prompt.style.display = 'none';
};

// ========================================
// Initialize App
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    // Debug: Prove JS is Alive
    const isNative = window.location.protocol === 'file:' || window.Capacitor;
    if (isNative) {
        alert("JS LOADED OK. \nTap any button to test.");
        document.body.classList.add('is-native');
    }

    console.log('DOM Content Loaded');

    // Add active class for touch feedback support
    document.addEventListener('touchstart', function () { }, true);

    // Register Service Worker only if NOT native
    if (!isNative && 'serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('./sw.js')
                .then(reg => console.log('SW registered:', reg.scope))
                .catch(err => console.error('SW registration failed:', err));
        });
    }

    if (isNative) {
        // Hide install prompt permanently in native
        const installPrompt = document.getElementById('installPrompt');
        if (installPrompt) installPrompt.style.display = 'none !important';

        // Hide PWA specifics
        const style = document.createElement('style');
        style.innerHTML = `
            .phone-frame { 
                height: 100vh !important; 
                max-width: 100% !important; 
                width: 100% !important;
                box-shadow: none !important; 
                border: none !important;
                margin: 0 !important;
                padding: 0 !important;
                overflow: visible !important;
            }
            body { background: var(--bg) !important; margin: 0 !important; overflow: auto !important; }
            .install-prompt { display: none !important; }
            .modal-overlay { z-index: 99999 !important; } /* Ensure modals are on top */
        `;
        document.head.appendChild(style);
    }

    // Auto-login if user exists
    try {
        if (window.AppState && window.AppState.currentUser) {
            showScreen('homeScreen');
        }
    } catch (e) {
        console.error("Auto-login error", e);
    }

    // Attach Event Listeners explicitly (More robust than onclick attributes)
    function attachSafeClick(id, handler) {
        const el = document.getElementById(id);
        if (el) {
            // Remove old listeners by cloning
            const newEl = el.cloneNode(true);
            el.parentNode.replaceChild(newEl, el);

            newEl.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                if (isNative) alert("Click detected on " + id);
                handler();
            });
            // Native touch behavior
            newEl.addEventListener('touchend', (e) => {
                // e.preventDefault(); // Don't prevent default on touch, let it click? No, double fire.
                // Just let click handle it usually, or handle here.
                // For hybrid apps, click is usually fine unless 300ms delay is an issue.
            });
            console.log(`Attached listener to ${id}`);
        } else {
            console.warn(`Element ${id} not found`);
        }
    }

    // Attach to Login Button
    attachSafeClick('btnLogin', () => window.login());

    // Attach to Guest Button
    attachSafeClick('btnGuest', () => window.loginGuest());

    // Debug: Global touch listener to see what is being hit
    if (isNative) {
        document.addEventListener('click', (e) => {
            console.log('Global Click:', e.target);
            // alert('Hit: ' + e.target.tagName + '.' + e.target.className); // Uncomment for extreme debug
        });
    }
});
