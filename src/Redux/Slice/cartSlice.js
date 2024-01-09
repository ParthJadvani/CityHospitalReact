import { createSlice } from "@reduxjs/toolkit"


const iniState = {
    items: [],
    loading: false,
    error: null
}

export const cartSlice = createSlice ({
    name: 'cart',
    initialState: iniState,
    reducers: {
        // addToCart: (state, action) => {
        //     let item = state.items.some((v) => v.pid === action.payload.pid);
        //     console.log(item);

        //     // if (item) {
        //     //     let index = state.items.findIndex((v) => v.pid === action.payload.pid);
        //     //     state.items[index].qty++;
        //     // } else {
        //     //     state.items.push(action.payload);
        //     // }

        //     // state.items = state.items

        //     console.log(action);
        // },
        // incqQty: (state, action) => {
        //     let index = state.items.findIndex((v) => v.pid === action.payload);
        //     state.items[index].qty++;

        //     state.items = state.items
        // },
        // decQty: (state, action) => {
        //     let index1 = state.items.findIndex((v) => v.pid === action.payload);

        //     if (state.items[index1].qty > 1) {
        //         state.items[index1].qty--;
        //     }

        //     state.items = state.items
        // },
        // removeItem: (state, action) => {
        //     let index2 = state.items.findIndex((v) => v.pid === action.payload);
            
        //     state.items.splice(index2,1);

        //     state.items = state.items
        // }
    }
});

export const {addToCart, incqQty, decQty, removeItem} = cartSlice.actions
export default cartSlice.reducer