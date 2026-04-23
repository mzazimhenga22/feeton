import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/supabase'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Only initialize if we have the credentials
export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient<Database>(supabaseUrl, supabaseAnonKey)
  : null

function normalizeStoragePath(bucket: string, rawPath: string) {
  if (!rawPath) return '';

  if (rawPath.startsWith('http')) {
    return rawPath;
  }

  let normalized = rawPath.trim().replace(/^\/+/, '');

  try {
    normalized = decodeURIComponent(normalized);
  } catch {
    // Keep the original value if it was not URI-encoded.
  }

  const publicPathPrefix = `storage/v1/object/public/${bucket}/`;
  const bucketPrefix = `${bucket}/`;

  if (normalized.startsWith(publicPathPrefix)) {
    return normalized.slice(publicPathPrefix.length);
  }

  if (normalized.startsWith(bucketPrefix)) {
    return normalized.slice(bucketPrefix.length);
  }

  return normalized;
}

export function getPublicUrl(bucket: string, path: string) {
  if (!path || !supabase) return path || ''
  if (path.startsWith('http')) return path // Already a full URL
  const normalizedPath = normalizeStoragePath(bucket, path)
  const { data } = supabase.storage.from(bucket).getPublicUrl(normalizedPath)
  return data.publicUrl
}
