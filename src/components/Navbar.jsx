import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));
  
  const favorites = useSelector((state) => state.favorites?.items || []);
  const cartCount = useSelector((state) => state.cart?.totalQuantity || 0);

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/products">Products</Link>
      <Link to="/favorites">
        Favorites {favorites.length > 0 && `(${favorites.length})`}
      </Link>
      <Link to="/cart">
        Cart {cartCount > 0 && `(${cartCount})`}
      </Link>

      {!user && (
        <>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </>
      )}

      {user && <Link to="/logout">Logout</Link>}
    </nav>
  );
}

export default Navbar;