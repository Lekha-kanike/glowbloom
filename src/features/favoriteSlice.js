import { createSlice } from "@reduxjs/toolkit";

const favoriteSlice = createSlice({
  name: "favorites",

  initialState: JSON.parse(
    localStorage.getItem(
      "favorites"
    )
  ) || []
  ,

  reducers: {

    addFavorite: (state, action) => {

      const exists = state.find(
        product =>
          product.id === action.payload.id
      );

      if (!exists) {
        state.push(action.payload);

        localStorage.setItem(
          "favorites",
          JSON.stringify(state)
        );

        alert("Product added to favorites!");
      }

    },

    removeFavorite: (state, action) => {

      const updated =
        state.filter(
          product =>
            product.id !==
            action.payload
        );

      localStorage.setItem(
        "favorites",
        JSON.stringify(updated)
      );

      return updated;
    }

  }
});

export const {
  addFavorite,
  removeFavorite
} = favoriteSlice.actions;

export default favoriteSlice.reducer;