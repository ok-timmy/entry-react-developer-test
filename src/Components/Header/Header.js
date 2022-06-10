import React, { useEffect, useState } from "react";
import CartModal from "../CartModal/CartModal";
import "./Header.css";
import { GET_CURRENCIES } from "../../graphql/Queries";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { currencyActions } from "../Store/currency";

function Header({ categories, setIsOpen, isOpen }) {
  const cartItemsLength = useSelector((cart) => cart.cart.itemsList.length);
  const currencyList = useSelector((currency) => currency);
  const dispatch = useDispatch();
  const [allCurrencies, setAllCurrencies] = useState([]);
  const [active, setActive] = useState();

  const getCurrencies = (currencies) => {
    dispatch(currencyActions.getCurrencies(currencies));
  };

  const changeCurrency = (selectedCurrency) => {
    dispatch(currencyActions.changeCurrency(selectedCurrency));
  };

  useEffect(() => {
    setAllCurrencies(currencyList.currency.currencies);
  }, [currencyList]);

  const { loading, error, data } = useQuery(GET_CURRENCIES);

  if (loading) {
    return <div className="loader"></div>;
  } else if (error) {
    console.log(error);
  } else {
    const { currencies } = data;
    getCurrencies(currencies);
  }

  return (
    <>
      <header className="header">
        <nav className="nav-left">
          <ul>
            {categories.map((category) => {
              return (
                <li key={category.name}>
                  <Link
                    to={`/category/:${category.name}`}
                    state={{ param: `${category.name}` }}
                    className={active === category.name ? "nav-link" : ""}
                    onClick={(e) => {
                      setActive(category.name);
                    }}
                  >
                    <span>{category.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="logo" onClick={() => setActive("")}>
          <Link to={"/"}>
            <i className="fa fa-shopping-bag" aria-hidden="true"></i>
          </Link>
        </div>
        <nav className="nav-right">
          <ul>
            <li>
              <select
                className="currency-select"
                aria-label="Default select example"
                onChange={(e) => {
                  changeCurrency(e.target.value);
                }}
                multiple={false}
              >
                {allCurrencies.map((allCurrency) => {
                  return (
                    <option key={allCurrency.symbol} value={allCurrency.label}>
                      {allCurrency.symbol} {allCurrency.label}
                    </option>
                  );
                })}
              </select>
            </li>
            <li>
              <button onClick={() => setIsOpen(!isOpen)}>
                <i className="bi bi-cart2">
                  <span>{cartItemsLength}</span>
                </i>
              </button>
            </li>
          </ul>
        </nav>
        <CartModal
          categories={categories}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          onClickOutside={() => {
            setIsOpen(false);
          }}
        />
      </header>
    </>
  );
}

export default Header;
