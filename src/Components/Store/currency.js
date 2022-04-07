import { createSlice } from "@reduxjs/toolkit";


const currencySlice = createSlice({
  name: "currency",
  initialState: {
    currencyIndex: 0,
    currencies: []
  },

  reducers: {
    changeCurrency(state, action) {
        console.log(action.payload)
      const newCurrency = action.payload;
      const currencies = state.currencies;
      const index = currencies.findIndex(currency => currency.label === newCurrency);
      state.currencyIndex = index;
    },

    getCurrencies(state, action) {
      const allCurrencies = action.payload;
      state.currencies = allCurrencies;
    },
  },
});


export const currencyActions = currencySlice.actions;
export default currencySlice;
