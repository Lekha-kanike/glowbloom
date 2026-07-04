import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { toggleFavorite } from "../features/favoriteSlice";

function Favorites() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const favorites = useSelector(state => state.favorites.items || []);

  function handleClearAll() {
    if (window.confirm("Remove all favorites?")) {
      favorites.forEach(item => dispatch(toggleFavorite(item)));
    }
  }

  return (
    <div className="favorites-container">
      <div className="favorites-header">
        <div>
          <h1 className="page-title">My Favorites</h1>
          {favorites.length > 0 && (
            <p style={{color: '#757575', marginTop: '-20px', textAlign: 'center'}}>
              {favorites.length} items saved
            </p>
          )}
        </div>

        {favorites.length > 0 && (
          <button
            onClick={handleClearAll}
            className="clear-all-btn delete-btn"
          >
            Clear All
          </button>
        )}
      </div>

      {favorites.length === 0 ? (
        <div className="empty-favorites">
          <svg style={{width: '180px', height: '180px', margin: '0 auto 24px', color: '#FFC1E3'}} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>

          <h2 style={{fontSize: '28px', fontWeight: '700', color: '#702963', marginBottom: '12px'}}>
            No favorites yet
          </h2>
          <p style={{color: '#757575', marginBottom: '24px', maxWidth: '400px', margin: '0 auto 24px'}}>
            Save your favorite products here. Tap the heart icon on any product to add it to your favorites.
          </p>

          <button
            onClick={() => navigate("/products")}
            className="add-btn"
          >
            Start Shopping →
          </button>
        </div>
      ) : (
        <div className="favorites-grid">
          {favorites.map(product => {
            const discountPercent = product.mrp && product.rate 
              ? Math.round(((product.mrp - product.rate) / product.mrp) * 100)
              : 0;

            return (
              <div key={product.id} className="favorite-card">
                {/* OFFER BADGE */}
                {discountPercent > 0 && (
                  <div className="offer-badge">{discountPercent}% OFF</div>
                )}

                <Link to={`/products/${product.id}`}>
                  <img src={product.image} alt={product.name} />
                </Link>

                <div className="favorite-content">
                  <p style={{fontSize: '13px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px'}}>
                    {product.category}
                  </p>
                  
                  <Link to={`/products/${product.id}`}>
                    <h2>{product.name}</h2>
                  </Link>

                  <div style={{display: 'flex', alignItems: 'center', gap: '6px', margin: '12px 0'}}>
                    <span style={{color: '#FFB400', fontSize: '16px'}}>⭐</span>
                    <span style={{fontSize: '15px', fontWeight: '600'}}>{product.rating}</span>
                  </div>

                  <div className="price-section">
                    <span className="current-price">₹{product.rate}</span>
                    {product.mrp > product.rate && (
                      <span className="mrp">₹{product.mrp}</span>
                    )}
                  </div>

                  <button onClick={() => dispatch(toggleFavorite(product))}>
                    Remove from Favorites
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Favorites;