import React, { useEffect, useState } from "react";
import "./Category.css";
import ProductCard from "../../Components/ProductCard/ProductCard";
import { useLocation } from "react-router-dom";

function Category({ categories}) {
 
    const [products, setProducts] = useState([])
    const [category, setCategory] = useState(categories.name)


  const location = useLocation();
  const from = location.state
  const dodo = from.param;
  // console.log(dodo);




useEffect(() => {
    if(dodo === 'all') {
        setProducts( categories[0].products);
        setCategory(categories[0].name);
    } else if(dodo === 'clothes') {
        setProducts( categories[1].products);
        setCategory(categories[1].name)
    }
    else {
        setProducts( categories[2].products);
        setCategory(categories[2].name);
    }

}, [dodo])

  

  return (
    <section className="category-page">
      <h3 className="category-name">{category} </h3>

      <div className="products-grid">
        {products.map((single) => {
          return <ProductCard key={single.id} single={single} />;
        })}
      </div>
    </section>
  );
}

export default Category;
