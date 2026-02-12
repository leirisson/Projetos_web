import { useCart } from '../cart/CartContext'
import { useAuth } from '../auth/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { postOrderWeb } from '../services/webhook-services'

export function Checkout() {
  const { items, totalItems, totalPrice, clear } = useCart()
  const { isAuthenticated, user } = useAuth()
  const navigate = useNavigate()
  const [placing, setPlacing] = useState(false)
  const [message, setMessage] = useState<string>('')
  const [customerName, setCustomerName] = useState<string>('')
  const [customerEmail, setCustomerEmail] = useState<string>('')
  const [contactPhone, setContactPhone] = useState<string>('')
  const [address, setAddress] = useState<string>('')
  const [referencePoint, setReferencePoint] = useState<string>('')
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'credit' | 'debit' | 'pix' | ''>('')
  const [cashChange, setCashChange] = useState<string>('')

  useEffect(() => {
    if (user) {
      setCustomerName(user.NAME || '')
      setCustomerEmail(user.EMAIL || '')
    }
  }, [user])

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 py-6 sm:py-8">
        <h1 className="text-xl sm:text-2xl font-bold">Checkout</h1>
        <p className="mt-2 text-sm text-gray-700">Seu carrinho está vazio.</p>
        <Link
          to="/"
          className="mt-4 inline-flex h-11 items-center justify-center rounded-lg bg-brand px-4 text-white font-medium hover:bg-brand-dark"
        >
          Ver produtos
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 py-6 sm:py-8">
      <h1 className="text-xl sm:text-2xl font-bold">Checkout</h1>

      <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-1">
            Nome
          </label>
          <input
            id="customerName"
            name="customerName"
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Seu nome"
            className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </div>
        <div>
          <label htmlFor="customerEmail" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            id="customerEmail"
            name="customerEmail"
            type="email"
            value={customerEmail}
            onChange={(e) => setCustomerEmail(e.target.value)}
            placeholder="seu@email.com"
            className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </div>
      </div>

      <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700 mb-1">
            Número para contato
          </label>
          <input
            id="contactPhone"
            name="contactPhone"
            type="tel"
            value={contactPhone}
            onChange={(e) => setContactPhone(e.target.value)}
            placeholder="(00) 90000-0000"
            className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </div>
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
            Endereço
          </label>
          <input
            id="address"
            name="address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Rua, número, bairro, cidade"
            className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </div>
        <div>
          <label htmlFor="referencePoint" className="block text-sm font-medium text-gray-700 mb-1">
            Ponto de referência
          </label>
          <input
            id="referencePoint"
            name="referencePoint"
            type="text"
            value={referencePoint}
            onChange={(e) => setReferencePoint(e.target.value)}
            placeholder="Próximo a..."
            className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </div>
        <div>
          <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700 mb-1">
            Forma de pagamento
          </label>
          <select
            id="paymentMethod"
            name="paymentMethod"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value as any)}
            className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-brand"
          >
            <option value="">Selecione</option>
            <option value="cash">Dinheiro</option>
            <option value="credit">Crédito</option>
            <option value="debit">Débito</option>
            <option value="pix">Pix</option>
          </select>
        </div>
      </div>
      {paymentMethod === 'cash' && (
        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label htmlFor="cashChange" className="block text-sm font-medium text-gray-700 mb-1">
              Valor para troco
            </label>
            <input
              id="cashChange"
              name="cashChange"
              type="number"
              min="0"
              step="0.01"
              value={cashChange}
              onChange={(e) => setCashChange(e.target.value)}
              placeholder="Ex.: 100.00"
              className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-brand"
            />
          </div>
        </div>
      )}

      <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-3">
          {items.map((it) => (
            <div key={it.id} className="flex gap-3 rounded-lg border border-gray-200 bg-white p-3">
              <img
                src={it.imageUrl}
                alt={it.title}
                className="h-20 w-24 rounded-md object-cover"
                loading="lazy"
                decoding="async"
              />
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-sm font-semibold text-gray-900">{it.title}</div>
                    <div className="text-xs text-gray-600">Qtd: {it.quantity}</div>
                  </div>
                  <div className="text-sm text-gray-700">R$ {(it.quantity * it.price).toFixed(2)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <div className="text-sm text-gray-900 font-semibold">Resumo do Pedido</div>
          <div className="mt-2 text-sm text-gray-700">
            <div>Itens: {totalItems}</div>
            <div>Total: R$ {totalPrice.toFixed(2)}</div>
          </div>
          <button
            type="button"
            disabled={
              placing ||
              !customerName ||
              !customerEmail ||
              !customerEmail.includes('@') ||
              !contactPhone ||
              !address ||
              paymentMethod === '' ||
              (paymentMethod === 'cash' && (!cashChange || isNaN(parseFloat(cashChange)) || parseFloat(cashChange) <= 0))
            }
            onClick={async () => {
              const cid = user?.ID || 'guest'
              const cname = customerName
              const cemail = customerEmail
              try {
                setPlacing(true)
                setMessage('')
                const payload = {
                  customerId: cid,
                  customerEmail: cemail,
                  customerName: cname,
                  contactPhone,
                  address,
                  referencePoint,
                  paymentMethod: paymentMethod as 'cash' | 'credit' | 'debit' | 'pix',
                  cashChange: paymentMethod === 'cash' ? parseFloat(cashChange) : undefined,
                  items: items.map(it => ({
                    id: it.id,
                    title: it.title,
                    price: it.price,
                    quantity: it.quantity,
                    subtotal: it.quantity * it.price
                  })),
                  totalItems,
                  totalPrice,
                  createdAt: new Date().toISOString()
                }
                const res = await postOrderWeb(payload)
                if (!res.ok) {
                  setMessage(`Falha ao finalizar: ${res.status} ${res.text || ''}`)
                  setPlacing(false)
                  return
                }
                setMessage('Pedido confirmado!')
                clear()
                navigate('/dashboard', { replace: true })
              } catch {
                setMessage('Erro de conexão ao finalizar pedido')
              } finally {
                setPlacing(false)
              }
            }}
            className="mt-3 inline-flex h-11 w-full items-center justify-center rounded-lg bg-brand text-white font-medium hover:bg-brand-dark disabled:opacity-60"
          >
            {placing ? 'Finalizando...' : 'Confirmar pedido'}
          </button>
          {message && (
            <p className="mt-2 text-xs text-gray-800 bg-gray-100 rounded-md px-3 py-2">{message}</p>
          )}
        </div>
      </div>
    </div>
  )
}
