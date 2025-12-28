const resolveBaseUrl = (): string => {
  // クライアントサイド（ブラウザ）の場合
  if (typeof window !== 'undefined') {
    // 常に現在のoriginを使用（Mixed Contentエラーを回避）
    // バックエンドは同じドメインのリバースプロキシ経由でアクセスする前提
    return window.location.origin
  }

  // サーバーサイド（SSR）の場合
  // 内部DockerネットワークのURLを優先
  const backendInternalUrl = process.env.BACKEND_INTERNAL_URL
  if (backendInternalUrl) return backendInternalUrl

  // フォールバック
  const envBase = process.env.NEXT_PUBLIC_API_URL
  if (envBase) return envBase

  return ''
}

const resolveUrl = (url: string): string => {
  if (/^https?:\/\//.test(url)) return url
  return `${resolveBaseUrl()}${url}`
}

export const getAuthHeaders = (): HeadersInit => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null
  return {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
  }
}

export const apiRequest = async (url: string, options: RequestInit = {}) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null

  return fetch(resolveUrl(url), {
    ...options,
    headers: {
      'Accept': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      ...options.headers,
    },
  })
}