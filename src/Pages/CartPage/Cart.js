import React, { useEffect, useState } from 'react'
import './Cart.css';
import CartItem from '../../Components/CartItem/CartItem';
import {  useSelector } from 'react-redux';
import { ReactComponent as Empty } from "../../Components/svgs/Empty-pana.svg";

function Cart() {
  const currencyList = useSelector((currency) => currency);
  const cartItems = useSelector((cart)=> cart);

  const [products, setProducts] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
   setIndex(currencyList.currency.currencyIndex);
   
  }, [currencyList.currency])
 

  useEffect(() => {
   setProducts(cartItems.cart.itemsList);  
  }, [cartItems])
  
  
  return (

    <div className='cart-page'>
      <h3 className='cart-header'>CART</h3>
      { 
      products.length ? products.map((single) => {
        return <CartItem key={single.id} single={single} />;
      }) :  <div className="empty">
      <div>
        <Empty />
      </div>
      <p>You Have No products In Your Cart Yet</p>
    </div>  
      }
      
      <div>
      {products.length ? <div className='total'> Total:  {(currencyList.currency.currencies[index].symbol)}{(cartItems.cart.totalCartPrice[index])} </div>
      : <div></div> } 

      </div>
      </div>


  )
}

export default Cart