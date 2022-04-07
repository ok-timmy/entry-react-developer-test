import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./Cart-slice";
import currencySlice from "./currency";

 const store = configureStore({
     reducer : {
         cart: cartSlice.reducer,
         currency: currencySlice.reducer
     }
 });

 export default store;