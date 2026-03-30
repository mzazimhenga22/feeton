import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Only initialize if we have the credentials
export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

export function getPublicUrl(bucket: string, path: string) {
  if (!path || !supabase) return path || ''
  if (path.startsWith('http')) return path // Already a full URL
  const { data } = supabase.storage.from(bucket).getPublicUrl(path)
  return data.publicUrl
}
