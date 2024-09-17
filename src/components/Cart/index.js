import { useContext } from 'react'
import Header from '../Header'
import CartListView from '../cartListView'
import CartContext from '../../context/CartContext'

import './index.css'

const Cart = () => {
  const { cartList } = useContext(CartContext) // Using useContext to access cartList
  const totalPrice=cartList.reduce(
    (acc,item)=> acc + item.price*item.quantity,0
  )

  return (
    <>
      <Header />
      <div className="cart-container">
        <div className="cart-content-container">
          <h1 className="cart-heading">My Cart: {cartList.length} </h1>
          <CartListView />
        </div>
        <div>
          
          <p className='tot-para'>Total Amount Rs {totalPrice} /-</p>
          <button className='btn-cart'>Pay Now</button>
        </div>
      </div>
    </>
  )
}

export default Cart
