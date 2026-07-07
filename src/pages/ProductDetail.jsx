import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import {getProduct} from "../api/products";
import Loader from "../components/Loader";
import "../styles/ProductDetail.css";

export default function ProductDetail() {
  const {id} = useParams();
  const [product, setProduct] = useState(null);

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

  if (!product) {
    return <Loader />;
  }

  const isClothing = product.category.includes("clothing");

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

        <h2>{`R ${product.price}`}</h2>

        {isClothing && (
          <>
            <h3>Select a size</h3>
            <div className="size-container">
              <button>XS</button>
              <button>S</button>
              <button>M</button>
              <button>L</button>
              <button>XL</button>
            </div>
          </>
        )}

        <div className="product-btn-container">
          <button className="add-to-cart">Add to Bag</button>
          <button className="wishlist-btn">
            Wishlist<i class="fa-regular fa-heart"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
