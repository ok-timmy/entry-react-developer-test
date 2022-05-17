import React, { useEffect, useState } from "react";
import ProductCard from "../../Components/ProductCard/ProductCard";
import "./Home.css";
import { ReactComponent as HomeImage1 } from "../../Components/svgs/Ecommerce checkout laptop-amico.svg";

function Home({ home }) {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    setFeaturedProducts(home.products);
  }, []);

  const featuredProductsList = featuredProducts.slice(0, 3);

  return (
    <>
      <div className="sectionOne">
        <div className="sectionOne__left">
          <h3 className="sectionOne__header">It is a long established fact </h3>
          <p>
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using 'Content here, content
            here', making it look like readable English.
          </p>
          <button>Start Shopping Now</button>
        </div>
        <div className="sectionOne__right">
          <HomeImage1 />
        </div>
      </div>

      <section className="home__category">
        <h3 className="featured">Featured Products </h3>
        <div className="featured-products">
          {featuredProductsList.map((single) => {
            return <ProductCard key={single.id} single={single} />;
          })}
        </div>
      </section>
    </>
  );
}

export default Home;
