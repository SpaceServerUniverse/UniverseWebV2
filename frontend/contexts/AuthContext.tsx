'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { apiRequest } from '@/utils/api'

interface User {
  id: number
  name: string
  date_joined: string
}

interface AuthContextType {
  user: User | null
  login: (name: string, password: string) => Promise<void>
  logout: () => Promise<void>
  isLoading: boolean
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  const loadCachedUser = (): User | null => {
    if (typeof window === 'undefined') return null
    const raw = localStorage.getItem('auth_user')
    if (!raw) return null
    try {
      return JSON.parse(raw) as User
    } catch {
      localStorage.removeItem('auth_user')
      return null
    }
  }

  const saveCachedUser = (nextUser: User | null) => {
    if (typeof window === 'undefined') return
    if (!nextUser) {
      localStorage.removeItem('auth_user')
      return
    }
    localStorage.setItem('auth_user', JSON.stringify(nextUser))
  }

  // ページロード時に認証状態を確認
  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('auth_token')
      if (!token) {
        setUser(null)
        saveCachedUser(null)
        setIsLoading(false)
        return
      }

      const cachedUser = loadCachedUser()
      if (cachedUser && !user) {
        setUser(cachedUser)
      }

      const response = await apiRequest('/api/me/', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      })

      if (response.ok) {
        const data = await response.json()
        const nextUser = { id: data.id, name: data.name, date_joined: '' }
        setUser(nextUser)
        saveCachedUser(nextUser)
      } else {
        if (response.status === 401 || response.status === 403) {
          setUser(null)
          saveCachedUser(null)
          localStorage.removeItem('auth_token')
        }
      }
    } catch (error) {
      console.error('認証チェックエラー:', error)
      const cachedUser = loadCachedUser()
      if (cachedUser) {
        setUser(cachedUser)
      }
    } finally {
      setIsLoading(false)
    }
  }

  // バリデーションエラーを読みやすい形式に変換
  const formatErrorMessage = (data: any): string => {
    // 単一のerrorメッセージがある場合
    if (data.error) {
      return data.error
    }

    // フィールドエラー形式: {field: [errors]}
    if (typeof data === 'object') {
      const errors: string[] = []
      for (const [field, messages] of Object.entries(data)) {
        if (Array.isArray(messages)) {
          errors.push(...messages)
        } else if (typeof messages === 'string') {
          errors.push(messages)
        }
      }
      if (errors.length > 0) {
        return errors.join('、')
      }
    }

    return 'エラーが発生しました'
  }

  const login = async (name: string, password: string) => {
    const response = await apiRequest('/api/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ name, password }),
    })

    if (!response.ok) {
      const data = await response.json()
      throw new Error(formatErrorMessage(data))
    }

    const data = await response.json()
    localStorage.setItem('auth_token', data.token)
    const nextUser = { id: data.id, name: data.name, date_joined: '' }
    setUser(nextUser)
    saveCachedUser(nextUser)
  }

  const logout = async () => {
    try {
      const token = localStorage.getItem('auth_token')
      if (token) {
        await apiRequest('/api/logout/', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          },
        })
      }
    } catch (error) {
      console.error('ログアウトエラー:', error)
    } finally {
      localStorage.removeItem('auth_token')
      saveCachedUser(null)
      setUser(null)
      router.push('/')
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isLoading,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
