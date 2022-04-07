import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./ProductCard.css";

function ProductCard({ single }) {
  const currencyList = useSelector((currency) => currency);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(currencyList.currency.currencyIndex);
  }, [currencyList.currency]);
  return (
    <div className="product-card" key={single.id}>
      <div className="product-card-div">
        <Link to={`/product/:${single.name}`} state={{ single: single }}>
          <div className="product-image">
            <img src={single.gallery[0]} alt={"product"} className="image" />
          </div>
        </Link>
        <div className="product-desc">
          <p className="product-name">{single.name}</p>
          <p>
            {single.prices[index].currency.symbol} {single.prices[index].amount}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
