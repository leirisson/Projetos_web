import { useCart } from '../cart/CartContext'
import { Link } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import { useState, useEffect } from 'react'
import { Modal } from '../components/Modal'
import { postOrderWeb } from '../services/webhook-services'

export function Cart() {
  const { items, totalItems, totalPrice, increment, decrement, removeItem, clear } = useCart()
  const { user } = useAuth()
  const [open, setOpen] = useState(false)
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
        <h1 className="text-xl sm:text-2xl font-bold">Carrinho</h1>
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
      <h1 className="text-xl sm:text-2xl font-bold">Carrinho</h1>
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
                    <div className="text-xs text-gray-600">R$ {it.price.toFixed(2)}</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(it.id)}
                    className="text-xs font-medium text-red-600 hover:text-red-700"
                  >
                    Remover
                  </button>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => decrement(it.id)}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 bg-white"
                  >
                    -
                  </button>
                  <div className="w-10 text-center text-sm">{it.quantity}</div>
                  <button
                    type="button"
                    onClick={() => increment(it.id)}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 bg-white"
                  >
                    +
                  </button>
                  <div className="ml-auto text-sm text-gray-700">
                    Subtotal: R$ {(it.quantity * it.price).toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <div className="text-sm text-gray-900 font-semibold">Resumo</div>
          <div className="mt-2 text-sm text-gray-700">
            <div>Itens: {totalItems}</div>
            <div>Total: R$ {totalPrice.toFixed(2)}</div>
          </div>
          <button
            type="button"
            onClick={clear}
            className="mt-4 inline-flex h-11 w-full items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-900 font-medium hover:bg-gray-50"
          >
            Limpar carrinho
          </button>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="mt-3 inline-flex h-11 w-full items-center justify-center rounded-lg bg-brand text-white font-medium hover:bg-brand-dark"
          >
            Finalizar pedido
          </button>
          <Modal
            open={open}
            onClose={() => setOpen(false)}
            title="Dados para entrega"
            footer={
              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-10 items-center justify-center rounded-md border border-gray-300 bg-white px-3 text-gray-900 hover:bg-gray-50"
                >
                  Cancelar
                </button>
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
                    try {
                      setPlacing(true)
                      setMessage('')
                      const payload = {
                        customerId: user?.ID || 'guest',
                        customerEmail,
                        customerName,
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
                      setOpen(false)
                    } catch {
                      setMessage('Erro de conexão ao finalizar pedido')
                    } finally {
                      setPlacing(false)
                    }
                  }}
                  className="inline-flex h-10 items-center justify-center rounded-md bg-brand px-3 text-white font-medium hover:bg-brand-dark disabled:opacity-60"
                >
                  {placing ? 'Finalizando...' : 'Confirmar pedido'}
                </button>
              </div>
            }
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
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
                <label htmlFor="customerEmail" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
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
              <div>
                <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700 mb-1">Número para contato</label>
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
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Endereço</label>
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
                <label htmlFor="referencePoint" className="block text-sm font-medium text-gray-700 mb-1">Ponto de referência</label>
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
                <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700 mb-1">Forma de pagamento</label>
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
              {paymentMethod === 'cash' && (
                <div>
                  <label htmlFor="cashChange" className="block text-sm font-medium text-gray-700 mb-1">Valor para troco</label>
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
              )}
            </div>
            {message && (
              <p className="mt-3 text-xs text-gray-800 bg-gray-100 rounded-md px-3 py-2">{message}</p>
            )}
          </Modal>
        </div>
      </div>
    </div>
  )
}
