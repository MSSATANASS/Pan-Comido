/**
 * Pan Comido - Admin Dashboard Logic
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
    console.warn('Supabase init failed in admin dashboard:', e);
}

/**
 * Initialize page
 */
function init() {
    const dateEl = document.getElementById('currentDate');
    if (dateEl) {
        dateEl.textContent = new Date().toLocaleDateString('es-MX', {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
        });
    }

    loadData();
}

/**
 * Load all data for the dashboard
 */
async function loadData() {
    let orders = [];
    let restaurants = [];

    // 1. Load data from Supabase if available
    try {
        if (useSupabase && supabase) {
            const [ordersRes, restRes] = await Promise.all([
                supabase.from('orders').select('*').order('created_at', { ascending: false }),
                supabase.from('restaurants').select('*')
            ]);

            if (ordersRes.data) orders = ordersRes.data;
            if (restRes.data) restaurants = restRes.data;
        }
    } catch (e) {
        console.warn('Supabase data load failed:', e);
    }

    // Fallback: merge with LocalStorage for demo purposes
    const localOrders = Utils.safeJSONParse(localStorage.getItem('pancomido_orders'), []);
    const localRestData = localStorage.getItem('pancomido_restaurant');
    const localRest = localRestData ? [Utils.safeJSONParse(localRestData)] : [];

    // Simple de-duplication
    const orderMap = new Map();
    [...orders, ...localOrders].forEach(o => {
        if (o.pickup_code) orderMap.set(o.pickup_code, o);
    });
    orders = Array.from(orderMap.values()).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    const restMap = new Map();
    [...restaurants, ...localRest].forEach(r => {
        if (r.name) restMap.set(r.name, r);
    });
    restaurants = Array.from(restMap.values());

    // 2. Calculate Statistics
    const totalRevenue = orders.reduce((sum, o) => sum + parseFloat(o.total_price || 0), 0);
    const commissionRate = typeof CONFIG !== 'undefined' ? CONFIG.COMMISSION_RATE : 0.25;
    const totalCommission = totalRevenue * commissionRate;

    const totalRevEl = document.getElementById('totalRevenue');
    const totalComEl = document.getElementById('totalCommission');
    const totalOrdEl = document.getElementById('totalOrders');
    const activeResEl = document.getElementById('activeRestaurants');
    const foodSavEl = document.getElementById('foodSaved');

    if (totalRevEl) totalRevEl.textContent = Utils.formatCurrency(totalRevenue);
    if (totalComEl) totalComEl.textContent = Utils.formatCurrency(totalCommission);
    if (totalOrdEl) totalOrdEl.textContent = orders.length;
    if (activeResEl) activeResEl.textContent = Math.max(restaurants.length, 1); // Ensure at least 1 for demo
    if (foodSavEl) foodSavEl.textContent = (orders.length * 0.5).toFixed(1) + ' kg';

    // 3. Render Orders Table
    renderOrdersTable(orders);

    // 4. Render Top Restaurants
    renderTopRestaurants(orders);
}

/**
 * Render orders table
 * @param {Array} orders 
 */
function renderOrdersTable(orders) {
    const tbody = document.getElementById('ordersTableBody');
    if (!tbody) return;

    if (orders.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center; padding: 20px;">Sin pedidos registrados</td></tr>';
        return;
    }

    tbody.innerHTML = orders.slice(0, 10).map(o => `
        <tr>
            <td><strong>${o.pickup_code || '---'}</strong></td>
            <td>${Utils.sanitizeInput(o.restaurant_name) || 'Desconocido'}</td>
            <td>${Utils.formatCurrency(o.total_price)}</td>
            <td class="commission">${Utils.formatCurrency(o.total_price * (typeof CONFIG !== 'undefined' ? CONFIG.COMMISSION_RATE : 0.25))}</td>
            <td>
                <span class="status ${o.status === 'completed' ? 'status-active' : 'status-pending'}">
                    ${o.status === 'completed' ? 'Completado' : 'Pendiente'}
                </span>
            </td>
            <td style="font-size: 11px; color: var(--text-light);">
                ${o.created_at ? new Date(o.created_at).toLocaleDateString('es-MX') : '---'}
            </td>
        </tr>
    `).join('');
}

/**
 * Render grouped restaurant stats
 * @param {Array} orders 
 */
function renderTopRestaurants(orders) {
    const restStats = {};
    orders.forEach(o => {
        const name = o.restaurant_name || 'Otros';
        if (!restStats[name]) restStats[name] = { revenue: 0, orders: 0 };
        restStats[name].revenue += parseFloat(o.total_price || 0);
        restStats[name].orders += 1;
    });

    const topRest = Object.entries(restStats)
        .map(([name, stat]) => ({ name, ...stat }))
        .sort((a, b) => b.revenue - a.revenue)
        .slice(0, 5);

    const restContainer = document.getElementById('topRestaurants');
    if (!restContainer) return;

    if (topRest.length === 0) {
        restContainer.innerHTML = '<div style="text-align: center; padding: 20px; color: var(--text-light);">Sin datos suficientes</div>';
        return;
    }

    restContainer.innerHTML = topRest.map(r => `
        <div class="restaurant-item">
            <div class="restaurant-avatar" aria-hidden="true">🏪</div>
            <div class="restaurant-info">
                <div class="restaurant-name">${Utils.sanitizeInput(r.name)}</div>
                <div class="restaurant-stats">${r.orders} ventas</div>
            </div>
            <div class="restaurant-revenue">
                <div class="restaurant-revenue-value">${Utils.formatCurrency(r.revenue)}</div>
                <div class="restaurant-revenue-label">Comisión: ${Utils.formatCurrency(r.revenue * (typeof CONFIG !== 'undefined' ? CONFIG.COMMISSION_RATE : 0.25))}</div>
            </div>
        </div>
    `).join('');
}

// Initialize
document.addEventListener('DOMContentLoaded', init);

// Export for global access if needed
window.loadData = loadData;
