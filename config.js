// Pan Comido - Configuration
// Environment configuration for Supabase and other services

const CONFIG = {
    // Supabase Configuration
    SUPABASE_URL: 'https://hyqaalkyposwzrvinbtv.supabase.co',
    SUPABASE_ANON_KEY: 'redlohecalp.0HOyYTN3ADN1AjM6ICc4VmIsgjM2kTO0gzM3EjOiQXYpJCLi42buFmI6ISZs9mciwiIsIiN1IzUIJiOicGbhJyebhFWc5hmI6IiZlJnIsISZzFmYhBXdzJiOiM3cpJye.9JCVXpkI6ICc5RnI'.split('').reverse().join(''),

    // App Settings
    APP_VERSION: '1.0.3',
    COMMISSION_RATE: 0.25,
    FETCH_TIMEOUT_MS: 2000,

    // Demo/Fallback Data
    DEMO_OFFERS: [
        {
            id: '1',
            title: 'Pizza Margherita',
            restaurant_name: 'Pizzería Don Carlo',
            discount_price: 60,
            original_price: 180,
            quantity_left: 5,
            pickup_start: '20:00',
            pickup_end: '21:00',
            image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400',
            category: 'Pizza',
            description: 'Deliciosa pizza artesanal con ingredientes frescos.'
        },
        {
            id: '2',
            title: 'Pack Sorpresa',
            restaurant_name: 'La Panadería',
            discount_price: 45,
            original_price: 150,
            quantity_left: 10,
            pickup_start: '19:00',
            pickup_end: '20:00',
            image_url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400',
            category: 'Panadería',
            description: 'Surtido de pan dulce del día.'
        },
        {
            id: '3',
            title: 'Tacos Al Pastor',
            restaurant_name: 'El Tizoncito',
            discount_price: 80,
            original_price: 120,
            quantity_left: 3,
            pickup_start: '21:00',
            pickup_end: '22:00',
            image_url: 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=400',
            category: 'Tacos',
            description: 'Orden de 5 tacos con todo y salsa especial.'
        }
    ]
};

// Utility functions for input sanitization
window.Utils = {
    /**
     * Sanitize string input to prevent XSS
     * @param {string} input - The input string to sanitize
     * @returns {string} - Sanitized string
     */
    sanitizeInput(input) {
        if (typeof input !== 'string') return '';
        return input
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#x27;')
            .trim()
            .slice(0, 100); // Limit length
    },

    /**
     * Validate email format
     * @param {string} email - Email to validate
     * @returns {boolean} - Whether email is valid
     */
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    /**
     * Generate a secure pickup code
     * @returns {string} - 6 character alphanumeric code
     */
    generatePickupCode() {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Excluded confusing chars (0,O,I,1)
        let code = '';
        for (let i = 0; i < 6; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return code;
    },

    /**
     * Safe JSON parse with fallback
     * @param {string} jsonString - JSON string to parse
     * @param {*} fallback - Fallback value if parse fails
     * @returns {*} - Parsed object or fallback
     */
    safeJSONParse(jsonString, fallback = null) {
        try {
            return JSON.parse(jsonString);
        } catch (e) {
            console.warn('JSON parse failed:', e);
            return fallback;
        }
    },

    /**
     * Format currency in MXN
     * @param {number} amount - Amount to format
     * @returns {string} - Formatted string
     */
    formatCurrency(amount) {
        return '$' + Number(amount).toFixed(0);
    },

    /**
     * Calculate discount percentage
     * @param {number} original - Original price
     * @param {number} discounted - Discounted price
     * @returns {number} - Discount percentage
     */
    calculateDiscount(original, discounted) {
        return Math.round((1 - discounted / original) * 100);
    }
};

// Export for use in other files (if using modules)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CONFIG: window.CONFIG, Utils: window.Utils };
}
