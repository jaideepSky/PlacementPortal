import { createSlice, nanoid } from "@reduxjs/toolkit";
import { mockCompanies } from "../../data/mockData.js";

const companySlice = createSlice({

    name:'companies',
    initialState:{
        companiesList : mockCompanies,
        error : null
    },
    reducers:{
        // add company only by admin
        addcompany:(state,action)=>{
            const existingCompany = state.companiesList.find(company => company.name.toLowerCase() === action.payload.name.toLowerCase());
            if(existingCompany){
                state.error = "Company with this name already exists.";
            }
            else{
                const newCompany = {
                    id:nanoid(),
                    ...action.payload
                }
                state.companiesList.push(newCompany);
                state.error = null;
            }
        },

        deletecompany:(state,action)=>{
            state.companiesList = state.companiesList.filter(company => company.id !== action.payload.id);
        },

        updateCompany:(state,action)=>{
            const {id , ...updateData} = action.payload
            const companyIndex = state.companiesList.findIndex(company => company.id === id);
            if(companyIndex!==-1){
                state.companiesList[companyIndex] = {...state.companiesList[companyIndex],...updateData}
            }

        },
         // CLEAR ERROR
    clearError: (state) => {
      state.error = null
    }
    }
})

export default companySlice.reducer;
export const {addcompany,deletecompany,updateCompany,clearError} = companySlice.actions;