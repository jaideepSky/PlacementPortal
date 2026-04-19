import { createSlice, nanoid } from "@reduxjs/toolkit";
import { mockUsers } from "../../data/mockData";

const slice = createSlice({
    name:'auth',
    initialState:{
       userdata : null , // current loggedin user details
       role : null, // student or admin
       isAuthenticated : false,
       users: mockUsers,
       error :null,
    },
    reducers:{
        // Login action
        login : (state,action)=>{
            const {email,password} = action.payload;
            const found = state.users.find((user)=>{
                return user.email == email && user.password == password
            })
            
            if(found){
                state.userdata = found
                state.role = found.role
                state.isAuthenticated = true
                state.error = null
            }
            else{
                state.error = "Invalid email or password"
            }
            state.loading = false

        },

        // Register action
        register : (state,action)=>{
            state.loading = true
            const {name,email,password,rollNo,department,year,cgpa,phone} = action.payload
            const exists = state.users.find((user)=>user.email == email)
            if(exists){
                state.error = "Email already exists"
            }
            else{
                const newUser = {
                    id : nanoid(),
                    name:name,
                    email:email,
                    password:password,
                    role:'student', // default role
                    rollNo:rollNo,
                    department:department,
                    year:year,
                    cgpa:cgpa,
                    phone:phone
                }
                state.users.push(newUser)
                state.userdata = newUser
                state.role = 'student'
                state.isAuthenticated = true
                state.error = null
            }
                 state.loading = false
        },
        // Logout action
        logout : (state,action)=>{
            state.userdata = null
            state.role = null
            state.isAuthenticated = false
            state.error = null
             state.loading = false
        },
         // CLEAR ERROR
    clearError: (state) => {
      state.error = null
    }
    }

})
export const {login,register,logout,clearError} = slice.actions
export default slice.reducer