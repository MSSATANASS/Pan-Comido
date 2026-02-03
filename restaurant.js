/**
 * Pan Comido - Restaurant Panel Logic
 */

// Supabase and Utils are expected to be available from config.js
let supabase = null;
let useSupabase = false;

try {
    if (window.supabase && typeof CONFIG !== 'undefined') {
        supabase = window.supabase.createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_ANON_KEY);
        useSupabase = true;
    }
} catch (e) {
    console.warn('Supabase init failed in restaurant panel:', e);
}

// State
let restaurant = Utils.safeJSONParse(localStorage.getItem('pancomido_restaurant'), {
    name: "Mi Restaurante",
    email: "",
    phone: "",
    address: ""
});
let offers = Utils.safeJSONParse(localStorage.getItem('pancomido_restaurant_offers'), []);
let orders = [];

/**
 * Switch between dashboard sections
 */
function showSection(section, event) {
    // Hide all sections
    document.querySelectorAll('section[id^="section-"]').forEach(s => s.style.display = 'none');

    // Show target section
    const targetSection = document.getElementById('section-' + section);
    if (targetSection) {
        targetSection.style.display = 'block';
    }

    // Update nav active state
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

    // If called from click, event.currentTarget will be the nav item
    if (event) {
        event.currentTarget.classList.add('active');
    } else {
        // Find nav item by text or data (fallback)
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            if (item.getAttribute('onclick')?.includes(section)) {
                item.classList.add('active');
            }
        });
    }

    // Load section data
    switch (section) {
        case 'dashboard': loadDashboard(); break;
        case 'offers': loadOffers(); break;
        case 'orders': loadOrders(); break;
        case 'settings': loadSettings(); break;
    }
}

/**
 * Load dashboard statistics and recent orders
 */
async function loadDashboard() {
    await loadOffers();
    await loadOrders();

    const todayDate = new Date().toDateString();
    const todayOrders = orders.filter(o => new Date(o.created_at).toDateString() === todayDate);

    const revenue = todayOrders.reduce((sum, o) => sum + (o.total_price || 0), 0);
    const commission = revenue * (typeof CONFIG !== 'undefined' ? CONFIG.COMMISSION_RATE : 0.25);

    // Update stats
    const totalRevEl = document.getElementById('totalRevenue');
    const totalOrdEl = document.getElementById('totalOrders');
    const activeOffEl = document.getElementById('activeOffers');
    const foodSavEl = document.getElementById('foodSaved');

    if (totalRevEl) totalRevEl.textContent = Utils.formatCurrency(revenue - commission);
    if (totalOrdEl) totalOrdEl.textContent = orders.length;
    if (activeOffEl) activeOffEl.textContent = offers.filter(o => o.is_active !== false).length;
    if (foodSavEl) foodSavEl.textContent = (orders.length * 0.5).toFixed(1) + ' kg';

    // Recent orders
    const container = document.getElementById('recentOrders');
    if (!container) return;

    if (orders.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">🧾</div>
                <p>Sin pedidos aún</p>
            </div>`;
    } else {
        container.innerHTML = orders.slice(0, 5).map(o => `
            <div style="display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid var(--border);">
                <div>
                    <strong>${o.pickup_code}</strong> - ${Utils.sanitizeInput(o.offer_title) || 'Oferta'}
                    <div style="color: var(--text-light); font-size: 14px;">${Utils.sanitizeInput(o.user_name) || 'Cliente'}</div>
                </div>
                <div style="text-align: right;">
                    <div style="color: var(--primary); font-weight: 600;">${Utils.formatCurrency(o.total_price)}</div>
                    <div style="font-size: 12px; color: var(--text-light);">${o.status === 'pending' ? '⏳ Pendiente' : '✅ Entregado'}</div>
                </div>
            </div>
        `).join('');
    }
}

/**
 * Load offers from Supabase and LocalStorage
 */
async function loadOffers() {
    try {
        if (useSupabase && supabase) {
            const { data, error } = await supabase
                .from('offers')
                .select('*')
                .eq('restaurant_name', restaurant.name);

            if (data) {
                // Merge strategies: favor server data if available
                const serverOffers = data;
                const localOffers = Utils.safeJSONParse(localStorage.getItem('pancomido_restaurant_offers'), []);

                // Simple merge by title/price as ID (in real app would use UUID)
                const merged = [...serverOffers];
                localOffers.forEach(lo => {
                    if (!merged.find(so => so.title === lo.title && so.discount_price === lo.discount_price)) {
                        merged.push(lo);
                    }
                });
                offers = merged;
            }
        }
    } catch (e) {
        console.warn('Load offers failed:', e);
    }

    renderOffers();
}

/**
 * Render offers grid
 */
function renderOffers() {
    const container = document.getElementById('offersGrid');
    if (!container) return;

    if (offers.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">📦</div>
                <p>No tienes ofertas. ¡Crea tu primera!</p>
            </div>`;
        return;
    }

    container.innerHTML = offers.map((o, i) => `
        <div class="offer-card">
            <div class="offer-img" style="background-image: url('${o.image_url || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400'}')">
                <span class="offer-status ${o.is_active !== false ? 'status-active' : 'status-paused'}">
                    ${o.is_active !== false ? 'Activa' : 'Pausada'}
                </span>
            </div>
            <div class="offer-content">
                <div class="offer-title">${Utils.sanitizeInput(o.title)}</div>
                <div class="offer-meta">🕒 ${o.pickup_start} - ${o.pickup_end}</div>
                <div class="offer-price">
                    <span class="price-new">${Utils.formatCurrency(o.discount_price)}</span>
                    <span class="price-old">${Utils.formatCurrency(o.original_price)}</span>
                </div>
                <div class="offer-stock">📦 ${o.quantity_left !== undefined ? o.quantity_left : o.quantity} disponibles</div>
                <div class="offer-actions">
                    <button class="btn-small btn-edit" onclick="toggleOffer(${i})">
                        ${o.is_active !== false ? 'Pausar' : 'Activar'}
                    </button>
                    <button class="btn-small btn-delete" onclick="deleteOffer(${i})">Eliminar</button>
                </div>
            </div>
        </div>
    `).join('');
}

/**
 * Create a new offer
 */
async function createOffer(e) {
    e.preventDefault();
    const form = e.target;

    const offer = {
        restaurant_name: restaurant.name,
        title: Utils.sanitizeInput(form.title.value),
        description: Utils.sanitizeInput(form.description.value),
        original_price: parseFloat(form.original_price.value),
        discount_price: parseFloat(form.discount_price.value),
        quantity: parseInt(form.quantity.value),
        quantity_left: parseInt(form.quantity.value),
        category: form.category.value,
        pickup_start: form.pickup_start.value,
        pickup_end: form.pickup_end.value,
        image_url: form.image_url.value || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
        is_active: true,
        created_at: new Date().toISOString()
    };

    try {
        if (useSupabase && supabase) {
            const { error } = await supabase.from('offers').insert([offer]);
            if (error) throw error;
        }
    } catch (e) {
        console.warn('Supabase create offer failed:', e);
    }

    offers.push(offer);
    localStorage.setItem('pancomido_restaurant_offers', JSON.stringify(offers));

    alert('¡Oferta publicada exitosamente!');
    form.reset();
    showSection('offers');
}

/**
 * Toggle offer active status
 */
function toggleOffer(index) {
    if (!offers[index]) return;

    offers[index].is_active = !offers[index].is_active;
    localStorage.setItem('pancomido_restaurant_offers', JSON.stringify(offers));

    // Sync with Supabase if possible (using title/price as key for demo)
    if (useSupabase && supabase) {
        supabase.from('offers')
            .update({ is_active: offers[index].is_active })
            .eq('restaurant_name', restaurant.name)
            .eq('title', offers[index].title)
            .then(({ error }) => {
                if (error) console.warn('Supabase toggle failed:', error);
            });
    }

    renderOffers();
}

/**
 * Delete an offer
 */
function deleteOffer(index) {
    if (!offers[index]) return;

    if (confirm('¿Estás seguro de que deseas eliminar esta oferta?')) {
        const deletedOffer = offers.splice(index, 1)[0];
        localStorage.setItem('pancomido_restaurant_offers', JSON.stringify(offers));

        if (useSupabase && supabase) {
            supabase.from('offers')
                .delete()
                .eq('restaurant_name', restaurant.name)
                .eq('title', deletedOffer.title)
                .then(({ error }) => {
                    if (error) console.warn('Supabase delete failed:', error);
                });
        }

        renderOffers();
    }
}

/**
 * Load orders for this restaurant
 */
async function loadOrders() {
    try {
        if (useSupabase && supabase) {
            const { data, error } = await supabase
                .from('orders')
                .select('*')
                .eq('restaurant_name', restaurant.name)
                .order('created_at', { ascending: false });

            if (data) orders = data;
            if (error) throw error;
        }
    } catch (e) {
        console.warn('Load orders failed:', e);
    }

    const container = document.getElementById('ordersList');
    if (!container) return;

    if (orders.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">🧾</div>
                <p>Sin pedidos aún. Cuando los clientes compren, aparecerán aquí.</p>
            </div>`;
        return;
    }

    container.innerHTML = `
        <div class="orders-table-container">
            <table class="orders-table">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Cliente</th>
                        <th>Oferta</th>
                        <th>Total</th>
                        <th>Estado</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    ${orders.map(o => `
                        <tr>
                            <td style="font-weight: 600;">${o.pickup_code}</td>
                            <td>${Utils.sanitizeInput(o.user_name) || 'Cliente'}</td>
                            <td>${Utils.sanitizeInput(o.offer_title) || 'Oferta'}</td>
                            <td style="color: var(--primary); font-weight: 600;">${Utils.formatCurrency(o.total_price)}</td>
                            <td>
                                <span class="status-badge" style="background: ${o.status === 'pending' ? '#fef3c7' : '#dcfce7'}; color: ${o.status === 'pending' ? '#d97706' : '#16a34a'};">
                                    ${o.status === 'pending' ? 'Pendiente' : 'Entregado'}
                                </span>
                            </td>
                            <td>
                                ${o.status === 'pending' ?
            `<button class="btn-small btn-primary" onclick="markDelivered('${o.id}', '${o.pickup_code}')">Marcar entregado</button>` :
            '✅'
        }
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

/**
 * Mark an order as delivered/completed
 */
async function markDelivered(orderId, pickupCode) {
    try {
        if (useSupabase && supabase) {
            const { error } = await supabase
                .from('orders')
                .update({ status: 'completed' })
                .eq('id', orderId);

            if (error) {
                // Fallback for orders created locally that might not have a Supabase ID
                await supabase
                    .from('orders')
                    .update({ status: 'completed' })
                    .eq('pickup_code', pickupCode);
            }
        }
    } catch (e) {
        console.warn('Mark delivered failed:', e);
    }

    // Update local state if needed
    orders = orders.map(o => o.pickup_code === pickupCode ? { ...o, status: 'completed' } : o);

    loadOrders();
    // Also update dashboard if visible
    if (document.getElementById('section-dashboard').style.display !== 'none') {
        loadDashboard();
    }
}

/**
 * Load settings into form
 */
function loadSettings() {
    const nameInput = document.getElementById('restaurantName');
    const emailInput = document.getElementById('restaurantEmail');
    const phoneInput = document.getElementById('restaurantPhone');
    const addressInput = document.getElementById('restaurantAddress');

    if (nameInput) nameInput.value = restaurant.name;
    if (emailInput) emailInput.value = restaurant.email || '';
    if (phoneInput) phoneInput.value = restaurant.phone || '';
    if (addressInput) addressInput.value = restaurant.address || '';
}

/**
 * Save restaurant settings
 */
async function saveSettings(e) {
    e.preventDefault();

    const newSettings = {
        name: Utils.sanitizeInput(document.getElementById('restaurantName').value),
        email: Utils.sanitizeInput(document.getElementById('restaurantEmail').value),
        phone: Utils.sanitizeInput(document.getElementById('restaurantPhone').value),
        address: Utils.sanitizeInput(document.getElementById('restaurantAddress').value)
    };

    restaurant = newSettings;
    localStorage.setItem('pancomido_restaurant', JSON.stringify(restaurant));

    try {
        if (useSupabase && supabase) {
            const { data: existing } = await supabase
                .from('restaurants')
                .select('id')
                .eq('email', restaurant.email);

            if (existing && existing.length > 0) {
                await supabase.from('restaurants').update(restaurant).eq('email', restaurant.email);
            } else {
                await supabase.from('restaurants').insert([restaurant]);
            }
        }
    } catch (e) {
        console.warn('Save settings Supabase failed:', e);
    }

    alert('¡Configuración guardada correctamente!');
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    loadDashboard();

    // Fix nav clicks (since we extracted to JS)
    window.showSection = showSection;
    window.createOffer = createOffer;
    window.toggleOffer = toggleOffer;
    window.deleteOffer = deleteOffer;
    window.markDelivered = markDelivered;
    window.saveSettings = saveSettings;
});
