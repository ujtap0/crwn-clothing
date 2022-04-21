import { createContext, useState, useEffect } from "react";

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: ()=>{},
  removeItemFromCart: ()=>{},
  deleteItemToCart: ()=> {},
  cartCount: 0,
  totlaPrice: 0,
});

//아래 코드의 문제점: 
//alwayt return a new array with new objects or only a new object 

//<LOGIC>
//make a new cart item if this cart is empty of any of this product that they're trying to add
//find the existing cart item for this product and then just increase the quntity by one
// const addCartItem = (cartItems, productToAdd) => {
//   //find if cartItems contains productToAdd
//     const item = cartItems.find((cartItem)=> cartItem.id === productToAdd.id)
//     //if found, increase quntity
//     if(item){
//       const index= cartItems.indexOf(item)
//       cartItems[index].quntity + 1
//     }else{
//       const newArr = [{...productToAdd, quntity: 1}]
//       cartItems = cartItems.concat(newArr)
//     }
//   // return new array with modified cartItems/ new cart item
//   return cartItems
// }

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id)
  if(existingCartItem){
    return cartItems.map((cartItem) => cartItem.id === productToAdd.id ? {...cartItem, quantity: cartItem.quantity + 1} : cartItem)
  }
  return [...cartItems, {...productToAdd, quantity:1}];
}

const removeCartItem = (cartItems, productToRemove) => {
  const indexOfCartItem = cartItems.findIndex((cartItem) => cartItem.id === productToRemove.id);
  const existingCartItem = cartItems[indexOfCartItem]
  if(existingCartItem.quantity > 1){
    const updateItem = {...existingCartItem, quantity: existingCartItem.quantity -1}
    let updateItems = [...cartItems];
    updateItems[indexOfCartItem] = updateItem
    return updateItems
  }else if(existingCartItem.quantity === 1){
    return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id)
  }
}

const deleteCartItem = (cartItems, productToDelete) => {
  return cartItems.filter(cartItem => cartItem.id !== productToDelete.id)
}

export const CartProvider = ({children}) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(()=>{
    const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
    setCartCount(newCartCount)

  },[cartItems])
  
  useEffect(()=>{
    const newTotalPrice = cartItems.reduce((total, cartItem)=> total + cartItem.quantity*cartItem.price, 0)
    setTotalPrice(newTotalPrice)
  },[cartItems])

  //useEffect를 쓸 때 하나의 역할만 담당하도 하는 것이 좋다 그래서 useEffect를 두번 써준다

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd))
  }
  const removeItemFromCart = (productToRemove) =>{
    setCartItems(removeCartItem(cartItems, productToRemove))
  }
  const deleteItemToCart = (productToDelete) =>{
    setCartItems(deleteCartItem(cartItems, productToDelete))
  }
  
  const value = {isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartCount, removeItemFromCart, deleteItemToCart, totalPrice}
  return <CartContext.Provider value={value}>
    { children }
  </CartContext.Provider>
}



//product
//{id, name, price, imageUrl}
//cart Item
//{id, name, price, imageUrl, quantity}