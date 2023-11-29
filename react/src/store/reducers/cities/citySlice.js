import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  city: [],
  error: null,
};
const citySlice = createSlice({
    name:"city",
    initialState ,
    reducers:{
        set(state,action){
            try{
                state.city = action.payload;
            }catch(e){
                console.log("err",e);
            }
        }
    }
});

export const cityAction = citySlice.actions;
export default citySlice.reducer;


