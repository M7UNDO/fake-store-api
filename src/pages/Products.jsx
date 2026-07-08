import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { getProducts } from "../api/products";
import ProductCard from "../components/ProductCard";
import Hero from "../components/Hero";
import Loader from "../components/Loader";
import ProductsHero from "../assets/images/hero/kate-laine-PLH1lwjWvVg-unsplash.jpg";
import "../styles/Products.css";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const currentSearch = searchParams.get("search") || "";
  const currentCategory = searchParams.get("category") || "";
  const currentSort = searchParams.get("sort") || "";
  const currentPriceRange = searchParams.get("priceRange") || "";

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  useEffect(() => {
    let result = [...products];

    if (currentSearch) {
      result = result.filter((p) =>
        p.title.toLowerCase().includes(currentSearch.toLowerCase()) ||
        p.description.toLowerCase().includes(currentSearch.toLowerCase())
      );
    }

    if (currentCategory) {
      result = result.filter((p) => p.category.toLowerCase() === currentCategory.toLowerCase());
    }

    if (currentPriceRange) {
      const [min, max] = currentPriceRange.split("-").map(Number);
      result = result.filter((p) => p.price >= min && p.price <= max);
    }

    if (currentSort === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (currentSort === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (currentSort === "rating") {
      result.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));
    }

    setFilteredProducts(result);
  }, [products, currentSearch, currentCategory, currentSort, currentPriceRange]);

  const handleFilterChange = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  const clearAllFilters = () => {
    setSearchParams({});
  };

  if (loading) return <Loader />;

  return (
    <div className="product-page">
      <Hero
        heroImg={ProductsHero}
        heroAlt="Curated modern catalog collection baseline summary visual representation."
        heading="Contemporary Style, Timeless Design"
        subheading="Discover a curated collection of clothing, accessories, and tech that blend minimalism with modern function."
      />

      <section className="product-section">
        <div className="search-status-header">
          <div className="status-text-pane">
            {currentSearch && (
              <>
                <span className="search-label">Your search Results for:</span>
                <h1 className="search-term">"{currentSearch}"</h1>
              </>
            )}
            {!currentSearch && currentCategory && (
              <h1 className="search-term-category">{currentCategory}</h1>
            )}
            {!currentSearch && !currentCategory && <h1 className="search-term-category">All Products</h1>}
            <span className="results-counter">({filteredProducts.length})</span>
          </div>

          <button className="filter-toggle-action-btn" onClick={() => setIsFilterOpen(true)}>
            Filter & Sort <i className="fa-solid fa-sliders"></i>
          </button>
        </div>

        <div className="product-grid">
          {filteredProducts.map((product) => (
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

      {/* Slide-out Drawer Panel overlay */}
      <div className={`filter-sidebar-drawer ${isFilterOpen ? "drawer-visible" : ""}`}>
        <div className="drawer-header-pane">
          <h2>Filter & Sort</h2>
          <button className="drawer-close-btn" onClick={() => setIsFilterOpen(false)}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="drawer-body-scroll">
          <div className="filter-group-section">
            <h3>Sort By</h3>
            <button 
              className={`filter-option-row ${currentSort === "price-low" ? "selected" : ""}`}
              onClick={() => handleFilterChange("sort", "price-low")}
            >
              Price Low to High
            </button>
            <button 
              className={`filter-option-row ${currentSort === "price-high" ? "selected" : ""}`}
              onClick={() => handleFilterChange("sort", "price-high")}
            >
              Price High to Low
            </button>
            <button 
              className={`filter-option-row ${currentSort === "rating" ? "selected" : ""}`}
              onClick={() => handleFilterChange("sort", "rating")}
            >
              Highest Rating
            </button>
          </div>

          <div className="filter-group-section">
            <h3>Price Ranges</h3>
            <button 
              className={`filter-option-row ${currentPriceRange === "0-50" ? "selected" : ""}`}
              onClick={() => handleFilterChange("priceRange", "0-50")}
            >
              R 0.00 - R 50.00
            </button>
            <button 
              className={`filter-option-row ${currentPriceRange === "50-100" ? "selected" : ""}`}
              onClick={() => handleFilterChange("priceRange", "50-100")}
            >
              R 50.00 - R 100.00
            </button>
            <button 
              className={`filter-option-row ${currentPriceRange === "100-500" ? "selected" : ""}`}
              onClick={() => handleFilterChange("priceRange", "100-500")}
            >
              R 100.00 - R 50.000
            </button>
          </div>

          <div className="filter-group-section">
            <h3>Categories</h3>
            {["men's clothing", "women's clothing", "jewelery", "electronics"].map((cat) => (
              <button
                key={cat}
                className={`filter-option-row ${currentCategory === cat ? "selected" : ""}`}
                onClick={() => handleFilterChange("category", cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="drawer-footer-actions">
          <button className="clear-all-btn" onClick={clearAllFilters}>Clear All</button>
          <button className="apply-results-btn" onClick={() => setIsFilterOpen(false)}>
            Apply ({filteredProducts.length})
          </button>
        </div>
      </div>
      
      {isFilterOpen && <div className="drawer-backdrop-blur" onClick={() => setIsFilterOpen(false)}></div>}
    </div>
  );
}