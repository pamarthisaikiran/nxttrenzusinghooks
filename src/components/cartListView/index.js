import { useContext } from 'react'
import CartContext from '../../context/CartContext'
import CartItem from '../CartItems'

import './index.css'

const CartListView = () => {
  const { cartList } = useContext(CartContext) // Using useContext to access cartList

  return (
    <ul className="cart-list">
      {cartList.map(eachCartItem => (
        <CartItem key={eachCartItem.id} cartItemDetails={eachCartItem} />
      ))}
    </ul>
  )
}

export default CartListView
