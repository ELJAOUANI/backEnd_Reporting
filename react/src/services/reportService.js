import axiosClient from "../api/axios";

const get = async () =>{
    try {
    const response = await axiosClient.get("/reports/show");
    return response.data["reports"]
  } catch (error) {
    console.log(error);
    throw new Error(error.message)
  }
}

export const reportService = {
    get
}