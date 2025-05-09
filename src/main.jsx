import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import CartProvider from './components/context/CartContext.jsx'
import ProductsProvider from './components/context/ProductsContext.jsx'
import { AuthProvider } from './components/context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
    <ProductsProvider>
    <CartProvider>
      <StrictMode>
        <App />
      </StrictMode>
    </CartProvider>
    </ProductsProvider>
    </AuthProvider>
  </BrowserRouter>
)
