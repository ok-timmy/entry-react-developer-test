import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./Checkout.css";
import { ReactComponent as Empty } from "../../Components/svgs/Empty-pana.svg";
import Attributes from "../../Components/Attributes/Attributes";
import Paystack from "../../Components/Paystack/paystack";

function Checkout() {
  // const currencyList = useSelector((currency) => currency);
  const cartItems = useSelector((cart) => cart);
  const { currency } = useSelector((currency) => currency);
  const [name, setname] = useState({
    firstName: "",
    lastName: "",
  });
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState({
    contact1: "",
    contact2: "",
  });

  const shippingCosts = [20, 16.02, 28.51, 2583.51, 1300.0];

  const [products, setProducts] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(currency.currencyIndex);
  }, [currency]);

  useEffect(() => {
    setProducts(cartItems.cart.itemsList);
  }, [cartItems]);

  return (
    <div className="checkout">
      <h4 className="checkout__header">Checkout</h4>

      <div className="checkout__page">
        <div className="main__cart">
          <h3 className="cart__header">CART</h3>
          {products.length ? (
            products.map((single) => {
              return (
                <div className="cart__item" key={single.id}>
                  <div className="cart__item__left">
                    <div>
                      {" "}
                      <label>Name:</label>
                      <span className="cart__item__name"> {single.name}</span>
                    </div>
                    {single.brand && (
                      <div>
                        <label>Brand:</label>
                        <span className="cart__item__brand">
                          {" "}
                          {single.brand}
                        </span>
                      </div>
                    )}
                    <div>
                      <label> Price: </label>
                      <span className="cart__item__price">
                        {single.prices[index].currency.symbol}
                        {single.prices[index].amount}
                      </span>
                    </div>
                    <div>
                      <label>Quantity:</label>
                      <span> {single.quantity}</span>
                    </div>

                    <div>
                      {single.attributes ? (
                        single.attributes.map((attribute) => {
                          return <Attributes attributeArray={attribute} />;
                        })
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                  <div className="cart__item__right">
                    <div className="cart__item__right__content"></div>
                    <div className="cart__item__img">
                      <img src={single.gallery[0]} alt="cart__item__img" />
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="empty">
              <div>
                <Empty />
              </div>
              <p>You Have No products In Your Cart Yet</p>
            </div>
          )}

          <div>
            {products.length ? (
              <div className="costs">
                {" "}
                <div>
                  <label>Shipping Cost:</label>
                  <span>
                    {currency.currencies[index].symbol} {shippingCosts[index]}
                  </span>
                </div>
                <div>
                  <label>Total:</label>{" "}
                  <span>
                    {currency.currencies[index].symbol}{" "}
                    {cartItems.cart.totalCartPrice[index]}
                  </span>
                </div>{" "}
                <div>
                  <label>Sub Total</label>
                  <span>
                    {currency.currencies[index].symbol}{" "}
                    {shippingCosts[index] +
                      cartItems.cart.totalCartPrice[index]}
                  </span>
                </div>
              </div>
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
                value={name.firstName}
                onChange={(e) =>
                  setname((prev) => ({ ...prev, firstName: e.target.value }))
                }
              />
            </div>
            <div>
              <label htmlFor="lastname">Last Name</label>
              <input
                type={"text"}
                placeholder="Doe"
                className="detail__input"
                id="lastname"
                value={name.lastName}
                onChange={(e) =>
                  setname((prev) => ({ ...prev, lastName: e.target.value }))
                }
              />
            </div>
            <div>
              <label htmlFor="email">Email Address</label>
              <input
                type={"text"}
                placeholder="john@gmail.com"
                className="detail__input"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="number1">Mobile Number 1</label>
              <input
                type={"text"}
                placeholder="+2348123456789"
                className="detail__input"
                id="number1"
                value={contact.contact1}
                onChange={(e) =>
                  setContact((prev) => ({ ...prev, contact1: e.target.value }))
                }
              />
            </div>
            <div>
              <label htmlFor="number2">Mobile Number 2</label>
              <input
                type={"text"}
                placeholder="+2348123456789"
                className="detail__input"
                id="number2"
                value={contact.contact2}
                onChange={(e) =>
                  setContact((prev) => ({ ...prev, contact2: e.target.value }))
                }
              />
            </div>
            <div>
              <label htmlFor="address">Address</label>
              <input
                type={"text"}
                placeholder="13, Garki Crescent, Ajah"
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
          <div className="button__div">
            <Paystack
              name={name}
              email={email}
              contact={contact}
              cartPrice={
                Number(cartItems.cart.totalCartPrice[0]*100)
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
