import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cartSlice";
import favoriteReducer from "../features/favoriteSlice";
import authReducer from "../features/authSlice"; 

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    favorites: favoriteReducer,
    auth: authReducer, 
  }
});

export default store;