-- Nuclear RLS Reset: Drops EVERY policy in the public schema
DO $$
DECLARE
    pol RECORD;
BEGIN
    FOR pol IN (SELECT policyname, tablename FROM pg_policies WHERE schemaname = 'public') LOOP
        EXECUTE 'DROP POLICY IF EXISTS ' || quote_ident(pol.policyname) || ' ON ' || quote_ident(pol.tablename);
    END LOOP;
END $$;

-- 1. Profiles: The core of the recursion issue
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "profiles_read_all" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "profiles_manage_own" ON public.profiles FOR ALL USING (auth.uid() = id);

-- 2. Products: Public read, Admin manage (NO RECURSION)
-- To avoid recursion, we check is_admin column directly in the policy check 
-- but only if we can avoid selecting from the same table in a way that triggers RLS.
-- PostgreSQL allows selecting from the table in the policy if it's a simple check.
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "products_read_all" ON public.products FOR SELECT USING (true);
CREATE POLICY "products_admin_all" ON public.products FOR ALL USING (
  (SELECT is_admin FROM public.profiles WHERE id = auth.uid()) = true
);

-- 3. Orders: User or Admin
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "orders_select_access" ON public.orders FOR SELECT USING (
  auth.uid() = user_id OR (SELECT is_admin FROM public.profiles WHERE id = auth.uid()) = true
);
CREATE POLICY "orders_insert_own" ON public.orders FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 4. Wishlists: Owner only
ALTER TABLE public.wishlists ENABLE ROW LEVEL SECURITY;
CREATE POLICY "wishlists_all_own" ON public.wishlists FOR ALL USING (auth.uid() = user_id);

-- 5. Force Admin for Derrick
UPDATE public.profiles SET is_admin = true WHERE email = 'waitathuderrick@gmail.com';
