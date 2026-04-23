ALTER TABLE profiles ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT FALSE;

-- Only admins can see all profiles
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;
CREATE POLICY "Admins can view all profiles" ON profiles FOR SELECT USING (
  (SELECT is_admin FROM profiles WHERE id = auth.uid()) = TRUE
);

-- Admins can manage everything in products
DROP POLICY IF EXISTS "Admins can manage products" ON products;
CREATE POLICY "Admins can manage products" ON products FOR ALL USING (
  (SELECT is_admin FROM profiles WHERE id = auth.uid()) = TRUE
);

-- Admins can view all orders
DROP POLICY IF EXISTS "Admins can view all orders" ON orders;
CREATE POLICY "Admins can view all orders" ON orders FOR SELECT USING (
  (SELECT is_admin FROM profiles WHERE id = auth.uid()) = TRUE
);
