-- Pan Comido Database Schema for Supabase
-- Copy and paste this into Supabase SQL Editor

-- Restaurants table
CREATE TABLE restaurants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE,
  phone TEXT,
  address TEXT,
  lat DECIMAL,
  lng DECIMAL,
  category TEXT,
  rating DECIMAL DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Offers table
CREATE TABLE offers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id UUID REFERENCES restaurants(id) ON DELETE CASCADE,
  restaurant_name TEXT,
  title TEXT NOT NULL,
  description TEXT,
  original_price DECIMAL NOT NULL,
  discount_price DECIMAL NOT NULL,
  quantity INTEGER NOT NULL,
  quantity_left INTEGER NOT NULL,
  category TEXT,
  pickup_start TEXT,
  pickup_end TEXT,
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Orders table
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  offer_id UUID REFERENCES offers(id),
  offer_title TEXT,
  restaurant_name TEXT,
  user_email TEXT,
  user_name TEXT,
  quantity INTEGER NOT NULL,
  total_price DECIMAL NOT NULL,
  saved DECIMAL NOT NULL,
  commission DECIMAL NOT NULL,
  pickup_code TEXT NOT NULL,
  pickup_time TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE restaurants ENABLE ROW LEVEL SECURITY;
ALTER TABLE offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Public policies (for demo - in production, add proper auth)
CREATE POLICY "Allow all on restaurants" ON restaurants FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on offers" ON offers FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on orders" ON orders FOR ALL USING (true) WITH CHECK (true);

-- Insert demo restaurant
INSERT INTO restaurants (name, email, address, category, rating) 
VALUES ('Pizzería Don Carlo', 'carlo@pizza.mx', 'Av. Reforma 123, CDMX', 'Pizza', 4.8);

-- Insert demo offers
INSERT INTO offers (restaurant_name, title, description, original_price, discount_price, quantity, quantity_left, category, pickup_start, pickup_end, image_url)
VALUES 
('Pizzería Don Carlo', 'Pizza Margherita Familiar', 'Pizza de masa artesanal con tomate y mozzarella', 180, 60, 5, 5, 'Pizza', '20:00', '21:00', 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400'),
('Sushi Zen', 'Combo Sushi Premium', '12 piezas variadas de sushi', 250, 85, 8, 8, 'Sushi', '21:00', '22:00', 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400'),
('La Panadería del Centro', 'Caja Sorpresa Panadería', 'Pan dulce y salado variado', 150, 45, 10, 10, 'Panadería', '19:00', '20:00', 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400');
