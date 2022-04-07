import React, { useEffect, useState } from "react";
import "./ProductDescription.css";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../Components/Store/Cart-slice";
import Attributes from "../../Components/Attributes/Attributes";

function ProductDescription() {
  const location = useLocation();
  const from = location.state;
  const single = from.single;

  const cartItems = useSelector((cart) => cart);
  const dispatch = useDispatch();
  const currencyList = useSelector((currency) => currency);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(currencyList.currency.currencyIndex);
  }, [currencyList.currency, cartItems.cart.totalQuantity]);

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

  const prodImages = single.gallery;

  const [prodDisplay, setProdDisplay] = useState(single.gallery[0]);

  return (
    <>
      <div className="p-d">
        <div className="p-d-left">
          <div className="prod-img-list">
            {prodImages.map((prodImage) => {
              return (
                <img
                  src={prodImage}
                  alt="prodImage"
                  key={prodImage}
                  onClick={() => setProdDisplay(prodImage)}
                />
              );
            })}
          </div>
          <div className="prod-img-main">
            <img src={prodDisplay} alt="Product-img" />
          </div>
        </div>
        <div className="p-d-right">
          <h3 className="p-d-name">{single.name}</h3>
          <h4 className="p-d-brand">{single.brand}</h4>
          <div>
            {single.attributes ? (
              single.attributes.map((attribute) => {
                return <Attributes key={attribute.id} attributeArray={attribute}/>;
              })
            ) : (
              <></>
            )}
          </div>

          <h3 className="price">PRICE</h3>
          <h3>
            {single.prices[index].currency.symbol} {single.prices[index].amount}
          </h3>

          <button
            className="add-to-cart"
            onClick={() => {
              addToCart(single);
            }}
          >
            Add To Cart
          </button>

          <div
            className="p-d-description"
            dangerouslySetInnerHTML={{ __html: single.description }}
          ></div>
        </div>
      </div>
    </>
  );
}

export default ProductDescription;
