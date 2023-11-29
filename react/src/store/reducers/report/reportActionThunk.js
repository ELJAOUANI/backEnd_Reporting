/* eslint-disable no-unused-vars */
import { reportService } from "../../../services/reportService";
import { reportAction } from "./reportSlice";

const fetch = () =>{
    return async (dispatch,_state)=>{
        try {
            const data = await reportService.get();
            console.log("fetch",data)
            dispatch(reportAction.set(data))
        } catch (error) {
            console.log(error);
        }
    }
}
export const reportActionThunk = {
    fetch
}
