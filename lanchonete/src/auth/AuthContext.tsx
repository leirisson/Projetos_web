import { createContext, useContext, useEffect, useMemo, useState } from 'react'

export type AuthUser = {
  ID: string
  NAME: string
  EMAIL: string
}

type AuthContextType = {
  user: AuthUser | null
  isAuthenticated: boolean
  login: (user: AuthUser) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)

  useEffect(() => {
    try {
      const raw = localStorage.getItem('auth:user')
      if (raw) {
        const parsed = JSON.parse(raw) as AuthUser
        if (parsed?.ID && parsed?.EMAIL) {
          setUser(parsed)
        }
      }
    } catch {}
  }, [])

  const value = useMemo<AuthContextType>(() => ({
    user,
    isAuthenticated: !!user,
    login: (u: AuthUser) => {
      setUser(u)
      try {
        localStorage.setItem('auth:user', JSON.stringify(u))
      } catch {}
    },
    logout: () => {
      setUser(null)
      try {
        localStorage.removeItem('auth:user')
      } catch {}
    }
  }), [user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
