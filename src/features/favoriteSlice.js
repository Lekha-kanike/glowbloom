import { createSlice } from "@reduxjs/toolkit";

const favoriteSlice = createSlice({
  name: "favorites",
  initialState: {
    items: JSON.parse(localStorage.getItem("favorites")) || [],
  },
  reducers: {
    toggleFavorite: (state, action) => {
      const product = action.payload;
      const index = state.items.findIndex(item => item.id === product.id);
      
      if (index >= 0) {
        state.items.splice(index, 1); // untey remove
      } else {
        state.items.push(product); // lekapothey add
      }
      
      localStorage.setItem("favorites", JSON.stringify(state.items));
    },
  }
});

export const { toggleFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;