import {createSlice} from '@reduxjs/toolkit'

const reportSlice = createSlice({
    name:"repport/slice",
    initialState:{
        data:[]
    },
    reducers:{
        set(state,action){
            try{
                state.data = action.payload;
            }catch(e){
                console.log("err",e);
            }
        }
    }
});

export const reportAction = reportSlice.actions;
export default reportSlice.reducer;
