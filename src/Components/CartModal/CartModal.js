import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartModalItem from "../CartModalItem/CartModalItem";
import "./CartModal.css";

function CartModal({ isOpen, setIsOpen, onClickOutside, categories }) {
  const [products, setProducts] = useState({});
  const cartItems = useSelector((cart) => cart.cart);
  const {currency} = useSelector((currency) => currency);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(currency.currencyIndex);
  }, [currency]);

  useEffect(() => {
    setProducts(cartItems.itemsList);
  }, [cartItems]);

  const ref = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutside && onClickOutside();
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [onClickOutside]);

  if (!isOpen) return;
  else
    return (
      <div className="overlay-div">
        <div ref={ref} className="overlay">
         { cartItems.totalQuantity? <>
          <div>
            <h4>
              My Bag <span>{cartItems.totalQuantity} Items</span>
            </h4>
          </div>
          <div className="cart-modal-products">
            {products.map((single) => {
              return <CartModalItem key={single.id} single={single} />;
            })}
          </div>
          <div className="cart-total">
            <h3>Total</h3>
            <h3>{currency.currencies[index].symbol} {parseFloat(cartItems.totalCartPrice[index]).toFixed(2)}</h3>
          </div>
          <div className="cart-buttons">
            <Link to={"/cart"}>
              <button onClick={() => setIsOpen(false)}>VIEW BAG</button>
            </Link>
            <button>CHECK OUT</button>
          </div>
          </> : <div> There is no Item In your Cart</div>}
        </div>
      </div>
    );
}

export default CartModal;
