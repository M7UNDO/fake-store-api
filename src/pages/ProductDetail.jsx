import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../api/products";
import { CartContext } from "../context/CartContext";
import { FavouritesContext } from "../context/FavouritesContext";
import Loader from "../components/Loader";
import "../styles/ProductDetail.css";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("M");
  const { addToCart, cartItems } = useContext(CartContext);
  const { toggleFavourite, isFavourite } = useContext(FavouritesContext);

  useEffect(() => {
    async function loadProduct() {
      try {
        const data = await getProduct(id);
        setProduct(data);
      } catch (error) {
        console.log(error);
      }
    }
    loadProduct();
  }, [id]);

  if (!product) return <Loader />;

  const cartItem = cartItems.find((item) => item.id === product.id);
  const currentQuantity = cartItem ? cartItem.quantity : 0;
  const isClothing = product.category.includes("clothing");
  const favourited = isFavourite(product.id);

  const handleAddToCartClick = () => {
    const productWithSize = isClothing ? { ...product, size: selectedSize } : product;
    addToCart(productWithSize);
  };

  return (
    <div className="product-detail-page">
      <div className="details-image-holder">
        <img src={product.image} alt={product.description} />
      </div>

      <div className="product-details">
        <div className="product-heading">
          <h1>{product.title}</h1>
          <p className="product-category">{product.category}</p>
        </div>
        <p className="product-description">{product.description}</p>
        <h2>R {product.price}</h2>

        {isClothing && (
          <div className="size-container">
            {["XS", "S", "M", "L", "XL"].map((sz) => (
              <button
                key={sz}
                className={selectedSize === sz ? "active" : ""}
                onClick={() => setSelectedSize(sz)}
              >
                {sz}
              </button>
            ))}
          </div>
        )}

        <div className="product-btn-container">
          <button className="add-to-cart" onClick={handleAddToCartClick}>
            {currentQuantity > 0 ? `Add to Bag (${currentQuantity})` : "Add to Bag"}
          </button>
          
          <button 
            className={`favourite-btn ${favourited ? "active" : ""}`} 
            onClick={() => toggleFavourite(product)}
          >
            <svg viewBox="0 0 24 24" fill={favourited ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            {favourited ? "Favourited" : "Add to Favourites"}
          </button>
        </div>
      </div>
    </div>
  );
}