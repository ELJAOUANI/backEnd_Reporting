import axiosClient from "../api/axios";


const get = async () => {
    try {
      const response = await axiosClient.get("/techniciens/show");
      console.log('from show rout', response.data["techniciens"]);
      return response.data["techniciens"]
    } catch (error) {
      console.error("Erreur lors de la récupération des techniciens :", error);
    }
}

 const deleteTechnicien = async (id) => {
      try {
       
        await axiosClient.delete(`/techniciens/delete/${id}`);
        console.log("Technicien deleted successfully");
       
        // Add any additional logic after deletion (e.g., refresh the list)
      } catch (error) {
        console.error("Error deleting technicien", error);
      }
    }; 
    
    
const addTechnicien = async (technicienData)=> { 
    try {
      const response = await axiosClient.post("techniciens/store" ,technicienData);
      console.log("Response from the backend:", response.data.techniciens);
      return response.data.techniciens;
      } catch (error) {
      throw error.response.data;
      }
    }


    const getById = async (id) => {
      try {
        const response = await axiosClient.get(`/techniciens/get/${id}`);
        console.log(response);
     return response.data["techniciens"]
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données du backend:",
          error,
        );
      }
    };
    
  const updateTechnicien = async (id, updatedTechnicienData) => {
  try {
    const response = await axiosClient.put(`/techniciens/${id}`, updatedTechnicienData);
    return response.data; 
  } catch (error) {
    console.error('Error updating technicien:', error);
    throw error;
  }
};

  
export const TechnicienServices = { 
get,deleteTechnicien ,addTechnicien ,getById ,updateTechnicien
}