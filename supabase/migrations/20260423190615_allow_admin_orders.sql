-- Allow admins to manage orders (update status, etc)
DROP POLICY IF EXISTS "orders_admin_all" ON public.orders;
CREATE POLICY "orders_admin_all" ON public.orders FOR ALL USING (public.is_admin());
