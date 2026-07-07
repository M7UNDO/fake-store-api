import {useEffect, useState} from "react";
import {getProducts} from "../api/products";
import ProductCard from "../components/ProductCard";
import Hero from "../components/Hero";
import Loader from "../components/Loader";
import ProductsHero from "../assets/images/hero/kate-laine-PLH1lwjWvVg-unsplash.jpg";
import "../styles/Products.css";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    }

    loadProducts();
  }, []);

  if (!products) {
    return <Loader />;
  }

  return (
    <div className="product-page">
      <Hero
        heroImg={ProductsHero}
        heroAlt="Group of young adults enjoying a sunny day on a rooftop, embodying urban leisure and friendship."
        heading="Contemporary Style, Timeless Design"
        subheading="Discover a curated collection of clothing, accessories, and tech that blend minimalism with modern function."
      />
      <section className="product-section">
        <h2>Products</h2>
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              src={product.image}
              alt={product.description}
              title={product.title}
              category={product.category}
              price={`R ${product.price}`}
              link={product.id}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
