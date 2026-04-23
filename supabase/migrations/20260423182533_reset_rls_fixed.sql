-- Reset all policies on all tables
DROP POLICY IF EXISTS "Public read products" ON products;
DROP POLICY IF EXISTS "Admins can manage products" ON products;
DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON profiles;
DROP POLICY IF EXISTS "Users can manage own profile" ON profiles;
DROP POLICY IF EXISTS "Admins can manage all profiles" ON profiles;
DROP POLICY IF EXISTS "Users can manage their own profile" ON profiles;
DROP POLICY IF EXISTS "Admins can view all orders" ON orders;
DROP POLICY IF EXISTS "Users can view their own orders" ON orders;
DROP POLICY IF EXISTS "Users can place orders" ON orders;

-- Profiles: Ultra-safe policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "profiles_select_all" ON profiles FOR SELECT USING (true);
CREATE POLICY "profiles_insert_self" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update_self" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "profiles_delete_self" ON profiles FOR DELETE USING (auth.uid() = id);

-- Products: Everyone can read, only admins (non-recursive check) manage
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "products_select_all" ON products FOR SELECT USING (true);
-- To avoid recursion, we use a subquery that only looks at a specific column
-- and we rely on the profiles_select_all policy being simple.
CREATE POLICY "products_admin_all" ON products FOR ALL 
USING (
  (SELECT is_admin FROM profiles WHERE id = auth.uid() LIMIT 1) = true
);

-- Orders
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "orders_select_own" ON orders FOR SELECT USING (auth.uid() = user_id OR (SELECT is_admin FROM profiles WHERE id = auth.uid() LIMIT 1) = true);
CREATE POLICY "orders_insert_own" ON orders FOR INSERT WITH CHECK (auth.uid() = user_id);
