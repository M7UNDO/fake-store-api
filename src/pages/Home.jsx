import React, {useEffect, useState} from "react";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import {getProducts} from "../api/products";
import ClothingHero from "../assets/images/hero/alvin-MYfq3tf34p8-unsplash.jpg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/Home.css";
import Slider from "react-slick";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHomeData() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchHomeData();
  }, []);

  if (loading) return <Loader />;

   console.log("Slider:", Slider);

  const sliderSettings = {
    dots: true,
    infinite:false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {breakpoint: 1024, settings: {slidesToShow: 3}},
      {breakpoint: 768, settings: {slidesToShow: 2}},
      {breakpoint: 480, settings: {slidesToShow: 1}},
    ],
  };

  return (
    <>
      <Hero
        heroImg={ClothingHero}
        heroAlt="Group of young adults enjoying a sunny day on a rooftop, embodying urban leisure and friendship."
        heading="Contemporary Style, Timeless Design"
        subheading="Discover a curated collection of clothing, accessories, and tech that blend minimalism with modern function."
        link="/products"
        cta="Explore Our Products"
      />

      <section className="category-section">
        <div className="section-heading">
          <h2>Categories</h2>
          <p className="section-subheading">
            Browse our selection of unique products, from contemporary fashion and sleek electronics to elegant
            jewellery and statement accessories. Whatever your style, we've got something that fits.
          </p>
        </div>

        <div className="category-container">
          <div className="category-item clothing-cat">
            <h3>Clothing</h3>
          </div>
          <div className="category-item jewel-cat">
            <h3>Accessories</h3>
          </div>
          <div className="category-item electronics-cat">
            <h3>Electronics</h3>
          </div>
        </div>
      </section>

      <section className="featured-products-section">
        <div className="section-heading">
          <h2>Featured Products</h2>
          <p className="section-subheading">
            Handpicked items that represent the best of what we offer, a blend of style, design, and function.
          </p>
        </div>

        <div className="featured-grid">
          {products.slice(0, 5).map((product, idx) => (
            <div
              key={product.id}
              className={`featured-item item-${idx + 1}`}
              style={{backgroundImage: `url(${product.image})`}}
            >
              <div className="featured-item-overlay">
                <h4>{product.title}</h4>
                <p>R {product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="latest-arrivals-section">
        <div className="section-heading">
          <h2>Latest Arrivals</h2>
          <p className="section-subheading">
            Stay ahead of the curve with our newest releases. Each item is handpicked for quality, design, and
            originality, explore what's trending this season.
          </p>
        </div>
        <div className="latest-arrival-container">
          {/*<Slider {...sliderSettings}>
            {products.slice(5, 12).map((product) => (
              <div key={product.id} className="carousel-card-wrapper">
                <ProductCard
                  src={product.image}
                  alt={product.description}
                  title={product.title}
                  category={product.category}
                  price={`R ${product.price}`}
                  link={product.id}
                />
              </div>
            ))}
          </Slider>*/}
        </div>
      </section>
    </>
  );
}
