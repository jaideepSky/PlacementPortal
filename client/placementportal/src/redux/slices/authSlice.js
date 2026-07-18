import { createSlice, nanoid } from "@reduxjs/toolkit";
import { mockUsers } from "../../data/mockData";

const slice = createSlice({
    name:'auth',
    initialState:{
        
       role : null, // student or admin
       isAuthenticated : false,
       user: null,
       loading:false, 
       error :null,
    },
    reducers:{
        // SetUser action
        setuser : (state,action)=>{
            const {user} = action.payload;
            state.role = user.role
            state.isAuthenticated=true
            state.user= user

        },

        
        // Logout action
        logout : (state,action)=>{
            state.user = null
            state.role = null
            state.isAuthenticated = false
          
        },
         // CLEAR ERROR
    clearError: (state) => {
      state.error = null
    }
    }

})
export const {setuser , logout,clearError} = slice.actions
export default slice.reducer