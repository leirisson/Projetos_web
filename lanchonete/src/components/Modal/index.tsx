import { PropsWithChildren } from 'react'

type ModalProps = PropsWithChildren<{
  open: boolean
  title?: string
  onClose: () => void
  footer?: React.ReactNode
}>

export function Modal({ open, title, onClose, children, footer }: ModalProps) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-lg rounded-xl border border-gray-200 bg-white shadow-lg">
        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
          <h2 className="text-base font-semibold text-gray-900">{title}</h2>
          <button
            type="button"
            aria-label="Fechar"
            onClick={onClose}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-gray-100"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" stroke="currentColor" fill="none" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <div className="px-4 py-3">{children}</div>
        {footer && <div className="border-t border-gray-200 px-4 py-3">{footer}</div>}
      </div>
    </div>
  )
}
