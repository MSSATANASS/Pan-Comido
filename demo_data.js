/**
 * Pan Comido - Rich Demo Data
 * Used to populate the app for sales demonstrations.
 */

const DemoData = {
    restaurants: [
        {
            id: 1,
            name: "Pizzería Don Carlo",
            address: "Av. Reforma 222, CDMX",
            cuisine: "Italiana",
            rating: 4.8,
            image_url: "https://images.unsplash.com/photo-1595854341625-f5b2b1a56242?w=500",
            total_saved: 120, // kg
            active: true
        },
        {
            id: 2,
            name: "Sushi Express",
            address: "Calle Génova 45, Zona Rosa",
            cuisine: "Japonesa",
            rating: 4.5,
            image_url: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500",
            total_saved: 85,
            active: true
        },
        {
            id: 3,
            name: "La Panadería de Barrio",
            address: "Colima 120, Roma Norte",
            cuisine: "Panadería",
            rating: 4.9,
            image_url: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500",
            total_saved: 200,
            active: true
        },
        {
            id: 4,
            name: "Tacos El Pastorcito",
            address: "Insurgentes Sur 100, CDMX",
            cuisine: "Mexicana",
            rating: 4.7,
            image_url: "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=500",
            total_saved: 45,
            active: true
        },
        {
            id: 5,
            name: "Green Salad Bar",
            address: "Sonora 20, Condesa",
            cuisine: "Saludable",
            rating: 4.6,
            image_url: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500",
            total_saved: 30,
            active: true
        }
    ],

    offers: [
        {
            id: "d1",
            restaurant_id: 1,
            title: "Pizza Margherita Familiar",
            restaurant_name: "Pizzería Don Carlo",
            description: "Pizza familiar de 35cm, masa madre, elaborada hoy al medio día.",
            original_price: 250,
            discount_price: 80,
            quantity_left: 3,
            pickup_start: "20:00",
            pickup_end: "21:30",
            image_url: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500",
            category: "Pizza",
            status: "active"
        },
        {
            id: "d2",
            restaurant_id: 2,
            title: "Caja Sorpresa Sushi",
            restaurant_name: "Sushi Express",
            description: "Mix de rollos (California, Philadelphia) y nigiris. Aprox 12 piezas.",
            original_price: 300,
            discount_price: 100,
            quantity_left: 5,
            pickup_start: "21:00",
            pickup_end: "22:00",
            image_url: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=500",
            category: "Sushi",
            status: "active"
        },
        {
            id: "d3",
            restaurant_id: 3,
            title: "Bolsa de Pan Dulce",
            restaurant_name: "La Panadería de Barrio",
            description: "Surtido de conchas, cuernitos y donas del día. Ideal para cenar.",
            original_price: 150,
            discount_price: 50,
            quantity_left: 8,
            pickup_start: "19:00",
            pickup_end: "20:30",
            image_url: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?w=500",
            category: "Panadería",
            status: "active"
        },
        {
            id: "d4",
            restaurant_id: 4,
            title: "Orden de Tacos (5)",
            restaurant_name: "Tacos El Pastorcito",
            description: "5 Tacos al pastor con piña, cilantro y cebolla. Salsa aparte.",
            original_price: 120,
            discount_price: 60,
            quantity_left: 4,
            pickup_start: "22:00",
            pickup_end: "23:00",
            image_url: "https://images.unsplash.com/photo-1565060207036-7c97805d6cb4?w=500",
            category: "Mexicana",
            status: "active"
        }
    ],

    orders: [
        {
            id: "ord_001",
            pickup_code: "DEMO01",
            restaurant_name: "Pizzería Don Carlo",
            title: "Pizza Margherita Familiar",
            total_price: 80,
            status: "completed",
            created_at: new Date(Date.now() - 86400000).toISOString() // Yesterday
        },
        {
            id: "ord_002",
            pickup_code: "DEMO02",
            restaurant_name: "Sushi Express",
            title: "Caja Sorpresa Sushi",
            total_price: 100,
            status: "completed",
            created_at: new Date(Date.now() - 172800000).toISOString() // 2 days ago
        },
        {
            id: "ord_003",
            pickup_code: "DEMO03",
            restaurant_name: "La Panadería de Barrio",
            title: "Bolsa de Pan Dulce",
            total_price: 50,
            status: "pending",
            created_at: new Date(Date.now() - 3600000).toISOString() // 1 hour ago
        }
    ]
};

/**
 * Injects Demo Data into LocalStorage if not present or requested
 */
function injectDemoData(force = false) {
    if (force || !localStorage.getItem('pancomido_demo_initialized')) {
        console.log('🧪 Injecting Pan Comido Demo Data...');

        // Save Restaurants
        localStorage.setItem('pancomido_restaurants', JSON.stringify(DemoData.restaurants));

        // Save Offers (Merging with any existing demo offers logic)
        localStorage.setItem('pancomido_offers', JSON.stringify(DemoData.offers));

        // Save Orders
        localStorage.setItem('pancomido_orders', JSON.stringify(DemoData.orders));

        // Mark as initialized
        localStorage.setItem('pancomido_demo_initialized', 'true');

        // Set user role
        const demoUser = { name: "Usuario Demo", email: "demo@pancomido.com", role: "user" };
        localStorage.setItem('pancomido_user', JSON.stringify(demoUser));

        alert("🧪 Modo Demo Activado\n\nDatos de prueba cargados correctamente.\nListo para la presentación.");
    }
}

function clearDemoData() {
    localStorage.removeItem('pancomido_restaurants');
    localStorage.removeItem('pancomido_offers');
    localStorage.removeItem('pancomido_orders');
    localStorage.removeItem('pancomido_demo_initialized');
    console.log('🧹 Demo Data Cleared');
}
