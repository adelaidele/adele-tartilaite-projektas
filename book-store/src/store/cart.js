/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import SessionStorage from '../libs/SessionStorage';
import APIService from "../services/api-service";

const initialState = {
    cart: [],
    currentItem: null,
  };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, {payload}) {
      const inCart = state.cart.find((item) => item.id === payload.id ? true : false);
      state.cart = inCart
      ? state.cart.map((item) =>
          item.id === payload.id
            ? { ...item, qty: item.qty + 1 }
            : item
        )
      : [...state.cart, { ...payload, qty: 1 }];
    },
    removeFromCart(state, {payload}) {
      state.cart = state.cart.filter((item) => item.id !== payload);
    },
    adjustQty(state, {payload}){
      state.cart = state.cart.map((item) => {
        return item.id === payload.id ? {...item, qty: +payload.qty} : item
      });
    }
  },
});

export const { addToCart, removeFromCart, adjustQty } = cartSlice.actions;

export const selectCart = (state) => state.cart;

export default cartSlice.reducer;
