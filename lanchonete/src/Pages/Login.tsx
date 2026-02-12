import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { postLoginWeb } from '../services/webhook-services'
import { compare } from 'bcryptjs'
import { useAuth } from '../auth/AuthContext'

export function Login() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string>('')
  const [user, setUser] = useState<{ ID: string; NAME: string; EMAIL: string; row_number?: number } | null>(null)
  const navigate = useNavigate()
  const location = useLocation() as { state?: { redirectTo?: string } }
  const { login } = useAuth()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const email = String(formData.get('email') || '')
    const password = String(formData.get('password') || '')
    if (!email || !password) return
    try {
      setLoading(true)
      setMessage('')
      setUser(null)
      const res = await postLoginWeb({ email, password })
      if (!res.ok) {
        const msg = res.text || ''
        let friendly = `Falha no login: ${res.status}`
        if (msg.includes('A listener indicated an asynchronous response') || msg.includes('message channel closed')) {
          friendly = 'Falha de extensão/browser: canal de mensagem fechado'
        }
        setMessage(friendly)
        setLoading(false)
        return
      }
      if (res.data) {
        const hash = (res.data as any).PASSWORD ?? (res.data as any).password
        const ok = await compare(password, hash)
        if (!ok) {
          setMessage('Senha incorreta')
        } else {
          const normalized = {
            ID: (res.data as any).ID ?? (res.data as any).id,
            NAME: (res.data as any).NAME ?? (res.data as any).name,
            EMAIL: (res.data as any).EMAIL ?? (res.data as any).email,
            row_number: (res.data as any).row_number ?? (res.data as any).ROW_NUMBER
          }
          setUser(normalized)
          login({ ID: normalized.ID, NAME: normalized.NAME, EMAIL: normalized.EMAIL })
          setMessage('Login efetuado')
          const redirectTo = location.state?.redirectTo
          if (redirectTo) {
            navigate(redirectTo, { replace: true })
          } else {
            navigate('/dashboard', { replace: true })
          }
        }
      } else {
        const body = res.text || ''
        setMessage(body || 'Login efetuado')
      }
      setLoading(false)
      e.currentTarget.reset()
    } catch (err: any) {
      if (err?.name === 'AbortError') {
        setMessage('Tempo de resposta excedido (timeout)')
      } else if (typeof err?.message === 'string' && err.message.includes('message channel closed')) {
        setMessage('Falha de extensão/browser: canal de mensagem fechado')
      } else {
        setMessage('Erro de conexão com o webhook')
      }
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-md px-3 sm:px-6 py-8">
      <h1 className="text-xl sm:text-2xl font-bold mb-4">Entrar</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-brand"
            placeholder="seu@email.com"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Senha
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-brand"
            placeholder="••••••••"
          />
        </div>
        <div className="flex items-center justify-between">
          <label className="inline-flex items-center gap-2 text-sm text-gray-700">
            <input type="checkbox" name="remember" className="rounded border-gray-300 text-brand focus:ring-brand" />
            Lembrar de mim
          </label>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex h-11 w-full items-center justify-center rounded-lg bg-brand text-white font-medium hover:bg-brand-dark transition-colors disabled:opacity-60"
        >
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
        {message && (
          <p className="text-sm text-gray-800 bg-gray-100 rounded-md px-3 py-2">{message}</p>
        )}
      </form>
      {user && (
        <div className="mt-4 rounded-lg border border-gray-200 bg-white p-4">
          <h2 className="text-sm font-semibold text-gray-900">Usuário autenticado</h2>
          <div className="mt-2 text-sm text-gray-800">
            <div>ID: {user.ID}</div>
            <div>Nome: {user.NAME}</div>
            <div>Email: {user.EMAIL}</div>
            <div>Linha: {user.row_number}</div>
          </div>
        </div>
      )}
    </div>
  )
}
