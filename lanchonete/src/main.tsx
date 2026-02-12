import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './auth/AuthContext'
import { CartProvider } from './cart/CartContext'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <StrictMode>
      <AuthProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AuthProvider>
    </StrictMode>
  </BrowserRouter>

)
