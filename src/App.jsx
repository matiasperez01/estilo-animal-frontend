import { Routes, Route } from 'react-router-dom'
import { CartProvider } from './store/CartContext'
import Navbar from './components/Navbar'
import CartPanel from './components/CartPanel'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import Checkout from './pages/Checkout'
import About from './pages/About'
import ProductDetail from './pages/ProductDetail'
import Admin from './pages/admin/Admin'
import AdminLogin from './pages/admin/AdminLogin'
import AdminProductos from './pages/admin/AdminProductos'
import AdminCategorias from './pages/admin/AdminCategorias'
import AdminPedidos from './pages/admin/AdminPedidos'
import AdminRoute from './components/AdminRoute'
import SizeGuide from './pages/SizeGuide'

export default function App() {
  return (
    <CartProvider>
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route path="/admin" element={
          <AdminRoute>
            <Admin />
          </AdminRoute>
        }>
          <Route index element={<AdminProductos />} />
          <Route path="categorias" element={<AdminCategorias />} />
          <Route path="pedidos" element={<AdminPedidos />} />
        </Route>

        <Route path="/*" element={
          <>
            <Navbar />
            <CartPanel />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tienda" element={<Catalog />} />
              <Route path="/guia-de-talles" element={<SizeGuide />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/nosotros" element={<About />} />
              <Route path="/producto/:id" element={<ProductDetail />} />
            </Routes>
            <a
              href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER}?text=Hola! Quiero consultar sobre sus productos 🐾`}
              target="_blank"
              rel="noreferrer"
              className="whatsapp-float"
              aria-label="Contactar por WhatsApp"
            >
              💬
            </a>
          </>
        } />
      </Routes>
    </CartProvider>
  )
}