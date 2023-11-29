import axiosClient from "../api/axios";

 const fetchCities = async () => {
    try{
 const response =  await axiosClient.get("cities/show")
      return response.data.cities
     } catch (error) {
    throw error.response.data;
  }
}

export const CityService = { 
    fetchCities
}