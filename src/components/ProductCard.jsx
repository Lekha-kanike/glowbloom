import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../features/favoriteSlice"; 

function ProductCard({ product, onDelete }) {
  const dispatch = useDispatch();
  
  const favorites = useSelector((state) => state.favorites.items);
  const isFavorite = favorites.some(item => item.id === product.id);

  function handleFavorite() {
    dispatch(toggleFavorite(product)); 
  }

  return (
    <div className="card">
      {/* OFFER BADGE - Top Left */}
      {product.discount > 0 && (
        <div className="offer-badge">
          {product.discount}% OFF
        </div>
      )}
      
      {/* FAV HEART ICON - Top Right */}
      <button 
        className={`fav-icon ${isFavorite ? 'active' : ''}`}
        onClick={handleFavorite}
      >
        {isFavorite ? '♥' : '♡'}
      </button>

      <img src={product.image} alt={product.name} />
      
      <div className="card-content">
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <p>{product.category}</p>

        <div className="price-section">
          <span className="current-price">₹ {product.rate}</span>
          {product.mrp > product.rate && (
            <span className="mrp">₹ {product.mrp}</span>
          )}
          {product.discount > 0 && (
            <span className="discount-badge">{product.discount}% OFF</span>
          )}
        </div>

        {/* STOCK BADGE */}
        <span className={`stock-badge ${
          product.stock > 10 ? 'in-stock' : 
          product.stock > 0 ? 'low-stock' : 
          'out-stock'
        }`}>
          {product.stock > 10 ? 'In Stock' : 
           product.stock > 0 ? `Only ${product.stock} left` : 
           'Out of Stock'}
        </span>

        <p>⭐ {product.rating}</p>

        <div className="card-actions">
          <Link className="view-btn" to={`/products/${product.id}`}>View</Link>
          <Link className="edit-btn" to={`/edit-product/${product.id}`}>Edit</Link>
          <button className="delete-btn" onClick={() => onDelete(product.id)}>Delete</button>

          <button className="favorite-btn" onClick={handleFavorite}>
            {isFavorite ? "Remove Fav" : "Add To Favorites"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;