import { Hamburger, ShoppingCart } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { useCart } from '../../cart/CartContext'

export function Header() {
  const [open, setOpen] = useState(false)
  const { totalItems } = useCart()
  const opcoes = [
    { id: uuidv4(), label: 'Home', url: '/' },
    { id: uuidv4(), label: 'Hambúrguer', url: '/hamburguer' },
    { id: uuidv4(), label: 'Bebidas', url: '/bebidas' },
    { id: uuidv4(), label: 'Sobremesas', url: '/sobremesas' },
    { id: uuidv4(), label: 'Funcionarios', url: '/login' },
    { id: uuidv4(), icon: <ShoppingCart color="#fff" />, url: '/carrinho' }
  ]

  return (
    <header className="bg-[#0F172A] text-white">
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        <Link
          to="/"
          className="text-lg font-bold text-purple-400 hover:text-purple-300"
        >
          <Hamburger color="#fff" />
        </Link>
        <button
          type="button"
          aria-label="Abrir menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
          className="sm:hidden inline-flex items-center justify-center rounded-md p-2 ring-1 ring-white/10 hover:bg-white/10"
        >
          <svg
            className={`h-6 w-6 ${open ? 'hidden' : 'block'}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
          <svg
            className={`h-6 w-6 ${open ? 'block' : 'hidden'}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <nav className="hidden sm:block">
          <ul className="flex items-center gap-4">
            {opcoes.map((op) => (
              <li key={op.id}>
                <Link
                  className={`relative text-white text-sm sm:text-base font-semibold hover:text-gray-300 ${op.icon ? 'flex items-center gap-2' : ''} ${op.label ? '' : 'bg-[#1E293B] px-2 py-2 rounded-full hover:bg-[#334155]'}`}
                  to={op.url}
                >
                  {op.label ? op.label : (
                    <span className="relative inline-flex">
                      {op.icon}
                      {totalItems > 0 && (
                        <span className="absolute -top-2 -right-2 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-purple-500 px-1 text-xs font-bold text-white">
                          {totalItems}
                        </span>
                      )}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div
        id="mobile-menu"
        className={`${open ? 'block' : 'hidden'} sm:hidden border-t border-white/10`}
      >
        <nav className="px-3 py-3">
          <ul className="flex flex-col gap-2">
            {opcoes.map((op) => (
              <li key={op.id}>
                <Link
                  onClick={() => setOpen(false)}
                  className={`relative block rounded-md px-3 py-2 text-sm font-medium hover:bg-white/10 ${op.icon ? 'flex items-center gap-2' : ''}`}
                  to={op.url}
                >
                  {op.label ? op.label : (
                    <span className="relative inline-flex">
                      {op.icon}
                      {totalItems > 0 && (
                        <span className="absolute -top-2 -right-2 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-purple-500 px-1 text-xs font-bold text-white">
                          {totalItems}
                        </span>
                      )}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
