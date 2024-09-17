import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from "./components/ProtectedRoute"
import ProductItemDetails from "./components/ProductItemDetails"
import  { CartProvider } from './context/CartContext'

import './App.css'

 /* const App = () => (
  <Router>
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductItemDetails />} />
        <Route path="/cart" element={<Cart />} />
      </Route>
     
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>
) */

  const App = () => {
    return (
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductItemDetails />} />
              <Route path="/cart" element={<Cart />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </CartProvider>
    )
  }
  
  export default App