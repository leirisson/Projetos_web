import bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { postWebhookApp } from '../services/webhook-services'

export function Register() {
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const name = String(formData.get('name') || '')
    const email = String(formData.get('email') || '')
    const password = await hashedPassword(String(formData.get('password') || ''))
    if (!name || !email || !password) return
    setLoading(true)
    setTimeout(async () => {
      setLoading(false)
      const responseWebhook = await postWebhookApp({ id: uuidv4(), name, email, password })
      if (responseWebhook.ok) {
        alert('Conta criada com sucesso!')
      } else {
        alert('Erro ao criar conta. Tente novamente.')
      }
      e.currentTarget.reset()
    }, 600)
  }

  async function hashedPassword(password: string) {
    const hashed = await bcrypt.hash(password, 8)
    return hashed
  }

  return (
    <div className="mx-auto max-w-md px-3 sm:px-6 py-8">
      <h1 className="text-xl sm:text-2xl font-bold mb-4">Criar conta</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Nome
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-brand"
            placeholder="Seu nome"
          />
        </div>
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
            autoComplete="new-password"
            required
            className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-brand"
            placeholder="••••••••"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="!inline-flex h-11 w-full items-center justify-center rounded-lg !bg-blue text-white font-medium hover:bg-brand-dark transition-colors disabled:opacity-60"
        >
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </button>
        <p className="!text-sm text-gray-700">
          Já tem conta?{' '}
          <Link to="/login" className="font-medium text-brand hover:text-brand-dark">
            Entrar
          </Link>
        </p>
      </form>
    </div>
  )
}
