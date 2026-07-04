import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeFromCart, decreaseQuantity, addToCart, clearCart } from "../features/cartSlice";

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, totalQuantity, totalAmount } = useSelector(state => state.cart);

  if (items.length === 0) {
    return (
      <div className="cart-container">
        <div className="empty-cart">
          <h2 className="page-title">Your Cart is Empty 🛒</h2>
          <p style={{color: '#757575', marginBottom: '28px', fontSize: '16px'}}>
            Add some products to get started
          </p>
          <button
            onClick={() => navigate("/products")}
            className="add-btn"
            style={{width: 'auto', padding: '14px 40px', margin: '0 auto'}}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1 className="page-title">Shopping Cart ({totalQuantity} items)</h1>

      <div className="cart-layout">
        {/* Left - Cart Items */}
        <div className="cart-items">
          {items.map(item => (
            <div key={item.id} className="cart-item">
              <img
                src={item.image}
                alt={item.name}
              />

              <div className="cart-item-content">
                <h3>{item.name}</h3>
                <p className="category">{item.category}</p>
                <p className="item-price">₹{item.rate}</p>

                <div className="quantity-controls">
                  <button
                    onClick={() => dispatch(decreaseQuantity(item.id))}
                    className="qty-btn"
                  >
                    -
                  </button>
                  <span className="qty-display">{item.quantity}</span>
                  <button
                    onClick={() => dispatch(addToCart(item))}
                    className="qty-btn"
                  >
                    +
                  </button>

                  <button
                    onClick={() => dispatch(removeFromCart(item.id))}
                    className="remove-btn"
                  >
                    Remove
                  </button>
                </div>
              </div>

              <div className="item-total">
                <p>₹{item.rate * item.quantity}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Right - Order Summary */}
        <div className="order-summary">
          <h2>Order Summary</h2>
          
          <div className="summary-row">
            <span>Subtotal</span>
            <span className="amount">₹{totalAmount}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span className="free-shipping">Free</span>
          </div>
          <div className="summary-total">
            <span>Total</span>
            <span>₹{totalAmount}</span>
          </div>

          <button className="checkout-btn add-btn">
            Proceed to Checkout
          </button>
          
          <button
            onClick={() => dispatch(clearCart())}
            className="clear-cart-btn delete-btn"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;