-- Create Wishlists table
CREATE TABLE IF NOT EXISTS wishlists (
  user_id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  items JSONB NOT NULL DEFAULT '[]',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE wishlists ENABLE ROW LEVEL SECURITY;

-- Policies for Wishlists
DROP POLICY IF EXISTS "Users can view own wishlist" ON wishlists;
CREATE POLICY "Users can view own wishlist" ON wishlists FOR SELECT USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can update own wishlist" ON wishlists;
CREATE POLICY "Users can update own wishlist" ON wishlists FOR ALL USING (auth.uid() = user_id);
