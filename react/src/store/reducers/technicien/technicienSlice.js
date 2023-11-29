import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  techniciens: [],
  loading: false,
  error: null,
};

const technicienSlice = createSlice({
  name: 'technicien',
  initialState,
  reducers: {
    fetchTechniciensStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchTechniciensSuccess: (state, action) => {
      state.techniciens = action.payload;
      state.loading = false;
    },
    fetchTechniciensFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
     deleteTechnicienStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteTechnicienSuccess: (state) => {
      state.loading = false;
      
 
    },
    deleteTechnicienFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
     addTechnicienStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    addTechnicienSuccess: (state, action) => {
      state.techniciens.push(action.payload);
      state.loading = false;
    },
    addTechnicienFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    
    //   editTechnicienStart: (state) => {
    //   state.loading = true;
    //   state.error = null;
    // },
    // editTechnicienSuccess: (state, action) => {
    //   // Find the index of the edited technicien in the array
    //   const editedTechnicienIndex = state.techniciens.findIndex(
    //     (technicien) => technicien.id === action.payload.id
    //   );

    //   // Update the technicien in the array/
    //   if (editedTechnicienIndex !== -1) {
    //     state.techniciens[editedTechnicienIndex] = action.payload;
    //   }

    //   state.loading = false;
    // },
    // editTechnicienFailure: (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload;
    // },

     updateTechnicienStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateTechnicienSuccess: (state, action) => {
      const updatedTechnicien = action.payload;
      const updatedTechniciens = state.techniciens.map((tech) =>
        tech.id === updatedTechnicien.id ? updatedTechnicien : tech
      );
      state.techniciens = updatedTechniciens;
      state.loading = false;
    },
    updateTechnicienFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  
     getTechnicienStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getTechnicienSuccess: (state, action) => {
      state.loading = false;
      state.techniciens = action.payload;
    },
    getTechnicienFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
  
});


export const {
  fetchTechniciensStart,
  fetchTechniciensSuccess,
  fetchTechniciensFailure,
  deleteTechnicienStart,
  deleteTechnicienSuccess,
  deleteTechnicienFailure,
  addTechnicienStart,
  addTechnicienSuccess,
  addTechnicienFailure,
  // editTechnicienStart,
  // editTechnicienSuccess,
  // editTechnicienFailure,
   updateTechnicienStart,
  updateTechnicienSuccess,
  updateTechnicienFailure,
  getTechnicienStart, 
  getTechnicienSuccess, 
  getTechnicienFailure
} = technicienSlice.actions;
export default technicienSlice.reducer;
