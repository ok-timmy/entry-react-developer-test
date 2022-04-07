import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Attributes from "../Attributes/Attributes";
import { cartActions } from "../Store/Cart-slice";
import "./CartItem.css";

function CartItem({ single }) {
  const currencyList = useSelector((currency) => currency);
  const [index, setIndex] = useState(0);

  useEffect(() => {
   setIndex(currencyList.currency.currencyIndex);
   
  }, [currencyList.currency])
  const dispatch = useDispatch();

  const addToCart = (single) => {
    dispatch(
      cartActions.addtoCart({
        name: single.name,
        id: single.id,
        prices: single.prices,
        gallery: single.gallery,
      })
    );
  };

  const removeFromCart = (single) => {
    dispatch(
      cartActions.removeFromCart(single)
    );
  };

  console.log(single);
  return (
    <div className="cart-item-content">
      <div className="cart-item-left">
        <h3 className="cart-item-name">{single.name}</h3>
        <h4 className="cart-item-brand">{single.brand}</h4>
        <h3 className="cart-item-price">
          {single.prices[index].currency.symbol}
          {single.prices[index].amount}
        </h3>

        <div>
          {
            single.attributes? (single.attributes.map((attribute)=> {
             return <Attributes attributeArray={attribute}/>
            })) : <></>
          }
        </div>
      </div>
      <div className="cart-item-right">
        <div className="cart-item-right-content">
          <button onClick={() => addToCart(single)}><i class="bi bi-plus-lg"></i></button>
          <span>{single.quantity}</span>
          <button onClick={()=> removeFromCart(single)}><i class="bi bi-dash-lg"></i></button>
        </div>
        <div className="cart-item-img">
          <img src={single.gallery[0]} alt="cart-item-img" />
        </div>
      </div>
    </div>
  );
}

export default CartItem;
