import { createContext, useContext, useEffect, useMemo, useState } from 'react'

export type CartItem = {
  id: string
  title: string
  price: number
  imageUrl: string
  quantity: number
}

type CartContextType = {
  items: CartItem[]
  totalItems: number
  totalPrice: number
  addItem: (item: Omit<CartItem, 'quantity'>, qty?: number) => void
  removeItem: (id: string) => void
  increment: (id: string) => void
  decrement: (id: string) => void
  clear: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

function calcTotals(items: CartItem[]) {
  const totalItems = items.reduce((acc, it) => acc + it.quantity, 0)
  const totalPrice = items.reduce((acc, it) => acc + it.quantity * it.price, 0)
  return { totalItems, totalPrice }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  useEffect(() => {
    try {
      const raw = localStorage.getItem('cart:items')
      if (raw) {
        const parsed = JSON.parse(raw) as CartItem[]
        if (Array.isArray(parsed)) setItems(parsed)
      }
    } catch {}
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem('cart:items', JSON.stringify(items))
    } catch {}
  }, [items])

  const value = useMemo<CartContextType>(() => {
    const { totalItems, totalPrice } = calcTotals(items)
    return {
      items,
      totalItems,
      totalPrice,
      addItem: (item, qty = 1) => {
        setItems((prev) => {
          const found = prev.find((it) => it.id === item.id)
          if (found) {
            return prev.map((it) =>
              it.id === item.id ? { ...it, quantity: it.quantity + qty } : it
            )
          }
          return [...prev, { ...item, quantity: qty }]
        })
      },
      removeItem: (id) => {
        setItems((prev) => prev.filter((it) => it.id !== id))
      },
      increment: (id) => {
        setItems((prev) =>
          prev.map((it) => (it.id === id ? { ...it, quantity: it.quantity + 1 } : it))
        )
      },
      decrement: (id) => {
        setItems((prev) =>
          prev
            .map((it) => (it.id === id ? { ...it, quantity: Math.max(0, it.quantity - 1) } : it))
            .filter((it) => it.quantity > 0)
        )
      },
      clear: () => setItems([])
    }
  }, [items])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
