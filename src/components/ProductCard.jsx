import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addFavorite } from "../features/favoriteSlice";


function ProductCard({ product }) {
  const dispatch = useDispatch();

  function handleFavorite() {
    dispatch(addFavorite(product));
  }
  return (
    <div className="card">
      <img
        src={product.image}
        alt={product.name}
      />

      <h3>{product.name}</h3>

      <p>{product.description}</p>

      <p>{product.category}</p>

      <p>₹ {product.rate}</p>

      <p>⭐ {product.rating}</p>

   <div className="card-actions">
 <Link
   className="view-btn"
   to={`/products/${product.id}`}
 >
   View
 </Link>

 <Link
   className="edit-btn"
   to={`/edit-product/${product.id}`}
 >
   Edit
 </Link>

 <button
   className="delete-btn"
   onClick={() => onDelete(product.id)}
 >
   Delete
 </button>

 <button
        className="favorite-btn"
        onClick={handleFavorite}
      >
        ❤ Add To Favorites
      </button>

</div>
    </div>
  );
}

export default ProductCard;