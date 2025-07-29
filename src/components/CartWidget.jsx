import React from "react";
import cartIcon from "../assets/cart.png";
import '../NavBar.css';

function CartWidget() {
  return (
    <div className="cart-widget">
      <img src={cartIcon} alt="Cart" />
      <span className="item-count">0</span>
    </div>
  );
}

export default CartWidget;
