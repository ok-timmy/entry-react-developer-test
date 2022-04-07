import "./App.css";
import Category from "./Pages/Category/Category";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS_QUERY } from "./graphql/Queries";
import Header from "./Components/Header/Header";
import Cart from "./Pages/CartPage/Cart";
import ProductDescription from "./Pages/PDP/ProductDescription";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./Pages/HomePage/Home";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [categoriesIndex, setCategoriesIndex] = useState('all')
  const { loading, error, data } = useQuery(GET_PRODUCTS_QUERY);
  const filterCategory = (catName) => {
    console.log(catName)
    setCategoriesIndex(catName);
  } 
  useEffect(() => {
    
    filterCategory(categoriesIndex)

  }, [categoriesIndex])

  if (loading) return <h2>Loading...</h2>;
  if (error) console.log(error);
  const { categories } = data;
  

  console.log(categories);
  return (
    <div className="App">
      <Router>
        <Header categories={categories} isOpen={isOpen} setIsOpen={setIsOpen} filterCategory={filterCategory}/>
        <Routes>
          <Route  exact
            path="/"
            element={<Home home={categories[0]}/>}/>
            
          <Route
            exact
            path="/category/:cat_name"
            element={<Category categories={categories}/>}
          />
          <Route path="/cart" element={<Cart categories={categories[categoriesIndex]}/>} />
          <Route path="/product/:name" element={<ProductDescription/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
