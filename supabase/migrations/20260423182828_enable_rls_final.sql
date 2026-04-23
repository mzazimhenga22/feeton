-- Re-enable RLS with clean policies
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlists ENABLE ROW LEVEL SECURITY;

-- Profiles: Public select, self-manage
DROP POLICY IF EXISTS "profiles_select_all" ON profiles;
DROP POLICY IF EXISTS "profiles_insert_self" ON profiles;
DROP POLICY IF EXISTS "profiles_update_self" ON profiles;
DROP POLICY IF EXISTS "profiles_delete_self" ON profiles;

CREATE POLICY "profiles_select_all" ON profiles FOR SELECT USING (true);
CREATE POLICY "profiles_insert_self" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update_self" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "profiles_delete_self" ON profiles FOR DELETE USING (auth.uid() = id);

-- Products: Public select, admin-manage
DROP POLICY IF EXISTS "products_select_all" ON products;
DROP POLICY IF EXISTS "products_admin_all" ON products;

CREATE POLICY "products_select_all" ON products FOR SELECT USING (true);
CREATE POLICY "products_admin_all" ON products FOR ALL 
USING (
  (SELECT is_admin FROM profiles WHERE id = auth.uid()) = true
);

-- Orders: Owner or admin
DROP POLICY IF EXISTS "orders_select_own" ON orders;
DROP POLICY IF EXISTS "orders_insert_own" ON orders;

CREATE POLICY "orders_select_access" ON orders FOR SELECT 
USING (auth.uid() = user_id OR (SELECT is_admin FROM profiles WHERE id = auth.uid()) = true);

CREATE POLICY "orders_insert_own" ON orders FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Wishlists: Owner only
DROP POLICY IF EXISTS "wishlist_all_own" ON wishlists;
CREATE POLICY "wishlist_all_own" ON wishlists FOR ALL USING (auth.uid() = user_id);
