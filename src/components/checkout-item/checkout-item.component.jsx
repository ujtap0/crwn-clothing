import { useContext } from "react";
import { CartContext } from "../../context/cart.context";

import './checkout-item.styles.scss'

const CheckoutItem = ({ item }) => {
  const {name, price, imageUrl, quantity} = item;
  const {addItemToCart, removeItemToCart, deleteItemToCart} = useContext(CartContext)

  const increaseBtnHandler = () => addItemToCart(item)
  const decreaseBtnHandler = () => removeItemToCart(item)
  const deleteBtnHandler = () => deleteItemToCart(item)

  let itemTotalPrice = price*quantity
  return(
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <span onClick={decreaseBtnHandler} className="arrow">{'<'}</span>
        <span className="value">{quantity}</span>
        <span onClick={increaseBtnHandler} className="arrow">{'>'}</span>
      </span>
      <span className="price">{itemTotalPrice}</span>
      <span onClick={deleteBtnHandler} className="remove-button">&#10005;</span>
    </div>
  )
}
export default CheckoutItem