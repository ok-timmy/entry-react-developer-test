import React, { useEffect, useState } from "react";
// import ProductCard from "../../Components/ProductCard/ProductCard";
import "./Home.css";
import { ReactComponent as HomeImage1 } from "../../Components/svgs/Ecommerce checkout laptop-amico.svg";
import { ReactComponent as Image1 } from "../../Components/svgs/Self checkout-amico.svg";
import { ReactComponent as Image2 } from "../../Components/svgs/Devices-amico.svg";
import { ReactComponent as Image3 } from "../../Components/svgs/Choosing clothes-pana.svg";
import { Link } from "react-router-dom";


function Home({ home }) {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    setFeaturedProducts(home.products);
  }, []);

  const featuredProductsList = featuredProducts.slice(0, 3);

  return (
    <>
      <section className="sectionOne">
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
      </section>

      <section className="sectionTwo">
        <h3 className="featured">Categories</h3>
        <div className="featured-products">
          <div className="category__card">
            <div className="card-svg"><Image1/></div>
            <h5>All Categories</h5>
            <p> This category Leads to all products</p>
            <button>View All</button>
          </div>

          <div className="category__card">
            <div className="card-svg"><Image3/></div>
            <h5>Fashion</h5>
            <p> This category Leads to all products</p>
            <button>View All</button>
          </div>

          <div className="category__card">
            <div className="card-svg"><Image2/></div>
            <h5>Technology</h5>
            <p> This category Leads to all products</p>
            <button>View All</button>
          </div>
        </div>
      </section>

      <section className="home__category">
        <h3 className="featured">Featured Products </h3>
        <div className="featured-products">
          {featuredProductsList.map((single) => {
            return <div className="featured-card" key={single.id}>
            <div className="featured-card-div">
              <Link to={`/product/:${single.name}`} state={{ single: single }}>
                <div className="featured-product-image">
                  <img src={single.gallery[0]} alt={"product"} className="image" />
                </div>
              </Link>
            </div>
          </div>;
          })}
        </div>
      </section>
    </>
  );
}

export default Home;
