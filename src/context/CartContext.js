import React, { createContext, useState } from "react"

const CartContext = createContext({
  cartList: [],
  addCartItem: () => {},
  removeCartItem: () => {},
  clearCart: () => {},
  updateCartItemQuantity: () => {}, // Ensure this is added
})

export const CartProvider = ({ children }) => {
  const [cartList, setCartList] = useState([])

  const addCartItem = product => {
    const productExists = cartList.find(item => item.id === product.id)
    if (productExists) {
      setCartList(prevCartList =>
        prevCartList.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        )
      )
    } else {
      setCartList(prevCartList => [...prevCartList, product])
    }
  }

  const removeCartItem = id => {
    setCartList(prevCartList => prevCartList.filter(item => item.id !== id))
  }

  const clearCart = () => {
    setCartList([])
  }

  const updateCartItemQuantity = (id, newQuantity) => {
    setCartList(prevCartList =>
      prevCartList.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    )
  }

  return (
    <CartContext.Provider
      value={{
        cartList,
        addCartItem,
        removeCartItem,
        clearCart,
        updateCartItemQuantity, // Ensure this is passed to the provider
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartContext


