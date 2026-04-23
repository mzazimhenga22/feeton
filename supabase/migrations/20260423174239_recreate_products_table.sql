DROP TABLE IF EXISTS products CASCADE;

CREATE TABLE products (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  price TEXT NOT NULL,
  category TEXT NOT NULL,
  tag TEXT NOT NULL,
  description TEXT NOT NULL,
  image TEXT NOT NULL,
  gallery TEXT[] NOT NULL,
  colorway TEXT NOT NULL,
  release_status TEXT NOT NULL,
  drop_date TEXT NOT NULL,
  supporting_note TEXT NOT NULL,
  story TEXT NOT NULL,
  highlights TEXT[] NOT NULL,
  specs JSONB NOT NULL,
  sizes TEXT[] NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read products" ON products FOR SELECT USING (true);
CREATE POLICY "Allow all for seeding" ON products FOR ALL USING (true) WITH CHECK (true);
