import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    itemsList: [],
    totalQuantity: 0,
    totalPrices: [],
    totalCartPrice: [],
  },

  reducers: {
    calcTotalPrice(state, action) {

      if (!state.itemsList) {
        state.totalPrices = [
          {
            amount: 0,
            currency: { __typename: "Currency", label: "USD", symbol: "$" },
          },
          {
            amount: 0,
            currency: { __typename: "Currency", label: "GBP", symbol: "£" },
          },
          {
            amount: 0,
            currency: { __typename: "Currency", label: "AUD", symbol: "A$" },
          },
          {
            amount: 0,
            currency: { __typename: "Currency", label: "JPY", symbol: "¥" },
          },
          {
            amount: 0,
            currency: { __typename: "Currency", label: "RUB", symbol: "₽" },
          },
        ];
      } else {
        const totalPricesArray = [];
        for (let i = 0; i < state.itemsList.length; i++) {
          let newPriceArray = state.itemsList[i].totalPrice;
          totalPricesArray.push(newPriceArray);
        }
        // console.log(current(state.totalPrices));
        state.totalPrices = totalPricesArray;

        const totalCostArray = [];
        for(let j=0; j<totalPricesArray.length; j++){
          const eachItemCostArray = [];
          for(let k=0; k<totalPricesArray[j].length; k++){
          let newCostArray = totalPricesArray[j][k].amount;
          eachItemCostArray.push(newCostArray);
        }
      totalCostArray.push(eachItemCostArray);}
        // console.log(totalCostArray)
        state.totalPrices = totalCostArray;
      }
    },

    calcCartTotalAmount(state, action) {
      if (state.totalPrices.length === 1) {
        state.totalCartPrice = state.totalPrices[0];
      } else {
        // console.log(state.totalCartPrice)

        function sumArrays(arrays) {
          const n = arrays.reduce((max, xs) => Math.max(max, xs.length), 0);
          const result = Array.from({ length: n });
          const myTotal = result.map((_, i) => arrays.map(xs => xs[i] || 0).reduce((sum, x) => sum + x, 0));
          state.totalCartPrice= myTotal
        }

        sumArrays(state.totalPrices);
        // console.log(state.totalCartPrice);

      }
    },

    addtoCart(state, action) {
      const newItem = action.payload;
if (newItem.selected === []) {
  alert('Please Select A Feature')
}
      //To check if Item is already available
      const existingItem = state.itemsList.find(
        (item) => item.name === newItem.name
      );

      if (existingItem) {
             
        let newPrices = [];
        for (let i = 0; i < existingItem.prices.length; i++) {
          const priceForEachCurrency =
            ((existingItem.prices[i].amount) /(existingItem.quantity)).toFixed(2);
          newPrices.push({
            amount: JSON.parse(parseFloat(
              parseFloat(existingItem.prices[i].amount) + parseFloat(priceForEachCurrency)
            ).toFixed(2)),
            currency: {
              __typename: "Currency",
              label: existingItem.prices[i].currency.label,
              symbol: existingItem.prices[i].currency.symbol,
            },
          });
        }
        existingItem.quantity++;
        existingItem.prices = newPrices;
        existingItem.totalPrice = newPrices;
      } else {
        state.itemsList.push({
          id: newItem.id,
          prices: newItem.prices,
          quantity: 1,
          totalPrice: newItem.prices,
          name: newItem.name,
          gallery: newItem.gallery,
        });
        state.totalQuantity++;
      }

      const totalAction = state.itemsList;

      cartSlice.caseReducers.calcTotalPrice(state, totalAction);
      cartSlice.caseReducers.calcCartTotalAmount(state, totalAction);


    },

    removeFromCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.itemsList.find(
        (item) => item.name === newItem.name
      );

      if (existingItem.quantity > 1) {
        let newPrices = [];
        for (let i = 0; i < existingItem.prices.length; i++) {
          const priceForEachCurrency =
          ((existingItem.prices[i].amount) /(existingItem.quantity)).toFixed(2);
        newPrices.push({
          amount: JSON.parse(parseFloat(
            parseFloat(existingItem.prices[i].amount) - parseFloat(priceForEachCurrency)
          ).toFixed(2)),
            currency: {
              __typename: "Currency",
              label: existingItem.prices[i].currency.label,
              symbol: existingItem.prices[i].currency.symbol,
            },
          });
        
        }
        existingItem.quantity--;
        existingItem.prices = newPrices;
        existingItem.totalPrice = newPrices;

      } else {
        const existingItem = state.itemsList.find(
          (item) => item.name === newItem.name
        );
        let itemsLists;
        itemsLists = state.itemsList.filter((items) => items !== existingItem);

        state.itemsList = itemsLists;
        state.totalQuantity--;
      }
    
      cartSlice.caseReducers.calcTotalPrice(state, action);
      cartSlice.caseReducers.calcCartTotalAmount(state, action);
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
