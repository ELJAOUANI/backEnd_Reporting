import { TechnicienServices } from "../../../services/technicienServices";
import { addTechnicienFailure, addTechnicienStart, addTechnicienSuccess, 
  deleteTechnicienFailure, deleteTechnicienStart, deleteTechnicienSuccess, 
  // editTechnicienFailure, 
  // editTechnicienStart, 
  // editTechnicienSuccess, 
  fetchTechniciensFailure,fetchTechniciensStart,fetchTechniciensSuccess, getTechnicienFailure, getTechnicienStart, getTechnicienSuccess, updateTechnicienFailure, updateTechnicienStart, updateTechnicienSuccess} from "./technicienSlice";


export const fetchTechniciens = () => async (dispatch) => {
  try {
    dispatch(fetchTechniciensStart());

    const techniciens = await TechnicienServices.get();
    dispatch(fetchTechniciensSuccess(techniciens));
    return techniciens
  } catch (error) {
    dispatch(fetchTechniciensFailure('Failed to fetch techniciens.'));
    console.error('Error fetching techniciens:', error);
  }
};


export const deleteTechnicien = (id) => async (dispatch) => {
  try {
    dispatch(deleteTechnicienStart());

    await TechnicienServices.deleteTechnicien(id);
    dispatch(deleteTechnicienSuccess());
  } catch (error) {
    dispatch(deleteTechnicienFailure('Error deleting technicien.'));
    console.error('Error deleting technicien:', error);
    throw error; // Rethrow the error to handle it in the calling code if needed
  }
};
// eslint-disable-next-line no-unused-vars
const addTechnicienthunk = (technicienData)=> async  (dispatch,_)=> {
  try {
    dispatch(addTechnicienStart());
    const addedTechnicien = await TechnicienServices.addTechnicien(technicienData);
    dispatch(addTechnicienSuccess(addedTechnicien));
    return addedTechnicien;
  } catch (error) {
    dispatch(addTechnicienFailure(error));
  }
}

// eslint-disable-next-line no-unused-vars
// const updateTechnicienThunk = (id,technicienData) => async (dispatch,_) => {
//   try {
//     dispatch(editTechnicienStart());
//     const updatedTechnicien = await TechnicienServices.updateTechnicien(id, technicienData);
//     dispatch(editTechnicienSuccess(updatedTechnicien));
//     return updatedTechnicien;
//   } catch (error) {
//     dispatch(editTechnicienFailure(error));
//   }
// };


export const updateTechnicien = (id, updatedTechnicienData) => async (dispatch) => {
  try {
    dispatch(updateTechnicienStart());
    const updatedTechnicien = await TechnicienServices.updateTechnicien(id, updatedTechnicienData);
    dispatch(updateTechnicienSuccess(updatedTechnicien));
    return updatedTechnicien;
  } catch (error) {
    dispatch(updateTechnicienFailure(error));
    throw error;
  }
};







// eslint-disable-next-line no-unused-vars
export const getTechnicienThunk = (id) => async (dispatch,_) => {
  try {
    dispatch(getTechnicienStart());

    const techniciens = await TechnicienServices.getById(id);
    dispatch(getTechnicienSuccess(techniciens));
    console.log(techniciens);
    return techniciens
  } catch (error) {
    dispatch(getTechnicienFailure('Failed to fetch techniciens.'));
    console.error('Error fetching techniciens:', error);
  }
};




export const technicienActionThunk = {
    fetchTechniciens ,deleteTechnicien, addTechnicienthunk  ,getTechnicienThunk
}

