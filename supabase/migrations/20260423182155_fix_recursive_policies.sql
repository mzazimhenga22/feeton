-- Fix recursive policies for profiles
DROP POLICY IF EXISTS "Admins can manage all profiles" ON profiles;
DROP POLICY IF EXISTS "Users can manage their own profile" ON profiles;

-- 1. Allow everyone to read profiles (non-recursive)
CREATE POLICY "Profiles are viewable by everyone" 
ON profiles FOR SELECT 
USING (true);

-- 2. Allow users to manage their own profile
CREATE POLICY "Users can manage own profile" 
ON profiles FOR ALL 
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- 3. Fix products management policy
DROP POLICY IF EXISTS "Admins can manage products" ON products;
CREATE POLICY "Admins can manage products" 
ON products FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() AND is_admin = true
  )
);

-- 4. Fix orders management policy
DROP POLICY IF EXISTS "Admins can view all orders" ON orders;
CREATE POLICY "Admins can view all orders" 
ON orders FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() AND is_admin = true
  )
);
