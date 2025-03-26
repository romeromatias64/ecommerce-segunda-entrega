import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import CartProvider from './components/context/CartContext.jsx'
import ProductsProvider from './components/context/ProductsContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ProductsProvider>
    <CartProvider>
      <StrictMode>
        <App />
      </StrictMode>,
    </CartProvider>
    </ProductsProvider>
  </BrowserRouter>
)
