import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../services/api";
import { toggleFavorite } from "../features/favoriteSlice";
import { addToCart } from "../features/cartSlice";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [showReviews, setShowReviews] = useState(false);
  const [loading, setLoading] = useState(true);

  const favorites = useSelector((state) => state.favorites.items || []);
  const isFavorite = product && favorites.some(item => item.id === product.id);

  useEffect(() => {
    getProduct();
  }, [id]);

  async function getProduct() {
    try {
      const response = await api.get(`/products/${id}`);
      setProduct(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  function handleAddFavorite() {
    dispatch(toggleFavorite(product));
    if (isFavorite) {
      alert("Removed from Favorites! 🤍");
    } else {
      alert("Added to Favorites! ❤️");
    }
  }

  function handleAddToCart() {
    dispatch(addToCart(product));
    alert("Added to Cart! 🛒");
  }

  if (loading) {
    return <div className="page-title">Loading...</div>;
  }

  if (!product) {
    return <div className="page-title">Product not found 😕</div>;
  }

  return (
    <div className="product-detail-container">
      <button
        onClick={() => navigate(-1)}
        className="back-btn"
      >
        ← Back to Products
      </button>

      <div className="detail-grid">
        <div className="detail-image-wrapper">
          {product.discount > 0 && (
            <div className="offer-badge">{product.discount}% OFF</div>
          )}
          <button
            className={`fav-icon ${isFavorite? 'active' : ''}`}
            onClick={handleAddFavorite}
          >
            {isFavorite? '♥' : '♡'}
          </button>
          <img
            src={product.image}
            alt={product.name}
          />
        </div>

        <div className="detail-content">
          <p style={{color: '#9ca3af', textTransform: 'uppercase', fontSize: '14px', letterSpacing: '1px', marginBottom: '8px'}}>
            {product.category}
          </p>
          <h1>{product.name}</h1>

          <div style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px'}}>
            <span style={{color: '#FFB400', fontSize: '20px'}}>⭐</span>
            <span style={{fontSize: '18px', fontWeight: '600'}}>{product.rating}</span>
            <span style={{color: '#757575'}}>({product.reviews?.length || 0} reviews)</span>
          </div>

          <div className="price-section" style={{marginBottom: '24px'}}>
            <span className="current-price" style={{fontSize: '32px'}}>₹{product.rate}</span>
            {product.mrp > product.rate && (
              <>
                <span className="mrp" style={{fontSize: '20px'}}>₹{product.mrp}</span>
                <span className="discount-badge">Save ₹{product.mrp - product.rate}</span>
              </>
            )}
          </div>

          <p style={{color: '#555', lineHeight: '1.7', marginBottom: '28px', fontSize: '15px'}}>
            {product.description}
          </p>

          <div className="detail-actions">
            <button
              onClick={handleAddFavorite}
              className={isFavorite? "delete-btn" : "add-btn"}
            >
              {isFavorite? "❤️ Remove from Favorites" : "🤍 Add to Favorites"}
            </button>

            <button onClick={handleAddToCart} className="view-btn">
              Add to Cart
            </button>
          </div>

          {product.offers && (
            <div style={{background: '#E8F5E9', border: '2px solid #81C784', padding: '14px', borderRadius: '10px', marginBottom: '20px'}}>
              <p style={{color: '#2E7D32', fontSize: '14px', fontWeight: '600', margin: 0}}>
                🎁 {product.offers}
              </p>
            </div>
          )}

          <span className={`stock-badge ${
            product.stock > 10? 'in-stock' :
            product.stock > 0? 'low-stock' :
            'out-stock'
          }`}>
            {product.stock > 0? `${product.stock} units available` : "Out of Stock"}
          </span>
        </div>
      </div>

      {/* Info Sections */}
      <div className="info-sections">
        <div className="info-card">
          <h3>Best For</h3>
          <p>{product.usage}</p>
        </div>

        <div className="info-card">
          <h3>How to Use</h3>
          <p>{product.howToUse}</p>
        </div>

        <div className="info-card">
          <h3>Key Ingredients</h3>
          <div style={{display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '12px'}}>
            {product.ingredients?.map((item, idx) => (
              <span key={idx} className="stock-badge in-stock">
                {item}
              </span>
            ))}
          </div>
        </div>

        {product.clinicalResults && (
          <div className="info-card" style={{background: '#E3F2FD', borderColor: '#90CAF9'}}>
            <h3>Clinical Results</h3>
            <p>{product.clinicalResults}</p>
          </div>
        )}

        <div className="info-card">
          <h3>What Makes It Special</h3>
          <p>{product.whatMakesItToBuy}</p>
        </div>

        <div className="info-card">
          <h3>Tax Details</h3>
          <p>
            GST: {product.taxDetails?.gst}
            {product.taxDetails?.inclusive? " (inclusive)" : " + Extra"}
          </p>
        </div>

        <div className="info-card">
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
            <h3 style={{margin: 0}}>
              Customer Reviews ({product.reviews?.length || 0})
            </h3>
            <button
              onClick={() => setShowReviews(!showReviews)}
              className="add-btn"
              style={{width: 'auto', padding: '12px 24px'}}
            >
              {showReviews? "Hide Reviews ↑" : "Show Reviews ↓"}
            </button>
          </div>

          {showReviews && (
            <div style={{marginTop: '20px'}}>
              {product.reviews && product.reviews.length > 0? (
                product.reviews.map(review => (
                  <div key={review.id} style={{borderBottom: '1px solid #f0f0f0', paddingBottom: '16px', marginBottom: '16px'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '8px'}}>
                      <div>
                        <span style={{fontWeight: '600', color: '#702963'}}>{review.user}</span>
                        <div style={{display: 'flex', gap: '2px', margin: '4px 0'}}>
                          {[...Array(5)].map((_, i) => (
                            <span key={i} style={{color: i < review.rating? '#FFB400' : '#ddd'}}>
                              ⭐
                            </span>
                          ))}
                        </div>
                        <span style={{fontSize: '13px', color: '#999'}}>{review.date}</span>
                      </div>
                    </div>
                    <p style={{color: '#555', margin: 0}}>{review.comment}</p>
                  </div>
                ))) : (
                  <p style={{color: '#999', textAlign: 'center', padding: '32px 0'}}>No reviews yet. Be the first to review!</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;