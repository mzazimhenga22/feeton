import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export function getPublicUrl(bucket: string, path: string) {
  if (!path) return ''
  if (path.startsWith('http')) return path // Already a full URL
  const { data } = supabase.storage.from(bucket).getPublicUrl(path)
  return data.publicUrl
}
