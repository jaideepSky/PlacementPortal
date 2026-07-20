import { createSlice, nanoid } from "@reduxjs/toolkit";
import { mockUsers } from "../../data/mockData";

const slice = createSlice({
    name:'auth',
    initialState: {
  role: null,
  user: null,
  isAuthenticated: false,
  authChecked: false,
},
    reducers:{
        // SetUser action
       setuser: (state, action) => {
  const { user } = action.payload;
  state.user = user;
  state.role = user.role;
  state.isAuthenticated = true;
  state.authChecked = true;
},

        
        // Logout action
       logout: (state) => {
  state.user = null;
  state.role = null;
  state.isAuthenticated = false;
  state.authChecked = true;
},
         // CLEAR ERROR
    clearError: (state) => {
      state.error = null
    }
    }

})
export const {setuser , logout,clearError} = slice.actions
export default slice.reducer