import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CartItem from "../../Components/CartItem/CartItem";
import "./Checkout.css";

function Checkout() {
  const currencyList = useSelector((currency) => currency);
  const cartItems = useSelector((cart) => cart);

  const [products, setProducts] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(currencyList.currency.currencyIndex);
  }, [currencyList.currency]);

  useEffect(() => {
    setProducts(cartItems.cart.itemsList);
  }, [cartItems]);

  return (
    <div className="checkout">
      <h4>Checkout</h4>

      <div className="checkout__page">
        <div className="main__cart">
          <h3 className="cart-header">CART</h3>
          {products.length ? (
            products.map((single) => {
              return <CartItem key={single.id} single={single} />;
            })
          ) : (
            <div>You Have No products In Your Cart Yet</div>
          )}

          <div>
            {products.length ? (
              <div> Total: {cartItems.cart.totalCartPrice[index]} </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
        <div className="main__checkout">
            <h5>Order Details</h5>
          <form className="form">
            <div>
              <label htmlFor="firstname">First Name</label>
              <input
                type={"text"}
                placeholder="John"
                className="detail__input"
                id="firstname"
              />
            </div>
            <div>
              <label htmlFor="lastname">Last Name</label>
              <input
                type={"text"}
                placeholder="Doe"
                className="detail__input"
                id="lastname"
              />
            </div>
            <div>
              <label htmlFor="email">Email Address</label>
              <input
                type={"text"}
                placeholder="john@gmail.com"
                className="detail__input"
                id="email"
              />
            </div>
            <div>
              <label htmlFor="address">Address</label>
              <input
                type={"text"}
                placeholder="John Doe"
                className="detail__input"
                id="address"
              />
            </div>
            <div>
              <label htmlFor="city">City</label>
              <input
                type={"text"}
                placeholder="Abuja"
                className="detail__input"
                id="city"
              />
            </div>
            <div>
              <label htmlFor="state">State</label>
              <input
                type={"text"}
                placeholder="FCT"
                className="detail__input"
                id="state"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
