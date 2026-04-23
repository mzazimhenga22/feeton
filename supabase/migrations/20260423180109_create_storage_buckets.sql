-- Create products bucket
INSERT INTO storage.buckets (id, name, public) 
VALUES ('products', 'products', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public to read images
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'products');

-- Allow admins to manage images
CREATE POLICY "Admin Manage Images" ON storage.objects FOR ALL USING (
  bucket_id = 'products' AND 
  (SELECT is_admin FROM public.profiles WHERE id = auth.uid()) = TRUE
);
