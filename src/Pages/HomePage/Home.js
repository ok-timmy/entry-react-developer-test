import React, { useEffect, useState } from 'react'
import ProductCard from '../../Components/ProductCard/ProductCard';

function Home({home}) {

    const [products, setProducts] = useState([])
    const [category, setCategory] = useState()

    useEffect(() => {
     setProducts(home.products)
     setCategory(home.name)
    }, [])
    

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

export default Home