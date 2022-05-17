import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../Store/Cart-slice';
import './CartModalItem.css'
import Attributes from '../Attributes/Attributes'

function CartModalItem({single}) {
  const dispatch = useDispatch();
  const currencyList = useSelector((currency) => currency);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(currencyList.currency.currencyIndex);
  }, [currencyList.currency]);

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

  return (
    <div className="cart-modal-item-content">
      <div className="cart-modal-item-left">
        <h3 className="cart-modal-item-name">{single.name}</h3>
        <h4 className="cart-modal-item-brand">{single.brand}</h4>
        <h3 className="cart-modal-item-price">{single.prices[index].currency.symbol} {single.prices[index].amount}</h3>

        <div>
        {
            single.attributes ? (single.attributes.map((attribute)=> {
             return <Attributes attributeArray={attribute}/>
            })) : <></>
          }
        </div>
      </div>
      <div className="cart-modal-item-right">
        <div className="cart-modal-item-right-content">
          <button onClick={()=>addToCart(single)}><span><i className="bi bi-plus-lg"></i></span></button>
          <span>{single.quantity}</span>
          <button onClick={()=> removeFromCart(single)}><span><i className="bi bi-dash-lg"></i></span></button>
        </div>
        <div className="cart-modal-item-img">
          <img src={single.gallery[0]} alt="cart-modal-item-img" />
        </div>
      </div>
    </div>
  )
}

export default CartModalItem