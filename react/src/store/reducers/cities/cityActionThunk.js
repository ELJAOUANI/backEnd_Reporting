import { CityService } from "../../../services/cityService";
import { cityAction } from "./citySlice";

const fetch = () =>{
    // eslint-disable-next-line no-unused-vars
    return async (dipatch,_state)=>{
        try {
            const data = await CityService.fetchCities();
            console.log("fetch",data)
            dipatch(cityAction.set(data))
        } catch (error) {
            console.log(error);
        }
    }
}
export const cityActionThunk = {
    fetch
}
