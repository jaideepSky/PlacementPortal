import { createSlice, nanoid } from "@reduxjs/toolkit";
import { mockApplications } from "../../data/mockData.js";

const applicationSlice = createSlice({

    name:'applications',
    initialState:{
        list :mockApplications,
        error : null
    },
    reducers:{
        // Student applies for a job
        applyToCompany : (state,action)=>{
            const { studentId, companyId } = action.payload;
            
            // check if the student has already applied to the company
            const existingApplication = state.list.find((application)=>application.studentId === studentId && application.companyId === companyId)
            if(existingApplication){
                state.error = "You have already applied to this company."
            }
            else{
                const newApplication = {
                    id : nanoid(),
                    status : "pending",
                    appliedAt :  new Date().toISOString().split('T')[0],
                    ...action.payload
                }
                state.list.push(newApplication)
                state.error = null
            }
        },
        // Admin updates application status
        updateApplicationStatus : (state,action)=>{
            const {id , status} = action.payload;
            const index = state.list.findIndex((application)=>application.id === id)
            if(index !== -1){
                state.list[index].status = status; // Update the status of the application
                
            }
        },
         // CLEAR ERROR
    clearError: (state) => {
      state.error = null
    }
    }
})

export default applicationSlice.reducer;
export const { applyToCompany, updateApplicationStatus, clearError } = applicationSlice.actions;