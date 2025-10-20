import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// ------------------- Define Product type -------------------
export interface Product {
  id: string;
  productName: string;
  price: number;
  discount?: number;
  productImages?: string[];
  _count: {
    review: number;
  };
  // Add other fields if needed (like seller, category, brand)
}

// ------------------- Wishlist state -------------------
interface WishlistState {
  products: Product[];
}

const initialState: WishlistState = {
  products: [],
};

// ------------------- Slice -------------------
export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addRemoveToWishlist: (state, action: PayloadAction<Product>) => {
      const existing = state.products.find((p) => p.id === action.payload.id);
      if (existing) {
        state.products = state.products.filter((p) => p.id !== action.payload.id);
      } else {
        state.products.push(action.payload);
      }
    },

    deleteFromWishlist: (state, action: PayloadAction<Product>) => {
      state.products = state.products.filter((p) => p.id !== action.payload.id);
    },

    makeWishlistEmpty: (state) => {
      state.products = [];
    },
  },
});

export const { addRemoveToWishlist, deleteFromWishlist, makeWishlistEmpty } = wishlistSlice.actions;
export default wishlistSlice.reducer;
