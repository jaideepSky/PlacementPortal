import { createSlice, nanoid } from "@reduxjs/toolkit";
import { mockCompanies } from "../../data/mockData.js";

const companySlice = createSlice({

    name:'companies',
    initialState:{
        companies : mockCompanies,
        error : null
    },
    reducers:{
        // add company only by admin
        addcompany:(state,action)=>{
            const existingCompany = state.companies.find(company => company.name.toLowerCase() === action.payload.name.toLowerCase());
            if(existingCompany){
                state.error = "Company with this name already exists.";
            }
            else{
                const newCompany = {
                    id:nanoid(),
                    ...action.payload
                }
                state.companies.push(newCompany);
                state.error = null;
            }
        },

        deletecompany:(state,action)=>{
            state.companies = state.companies.filter(company => company.id !== action.payload.id);
        },

        updateCompany:(state,action)=>{
            const {id , ...updateData} = action.payload
            const companyIndex = state.companies.findIndex(company => company.id === id);
            if(companyIndex!==-1){
                state.companies[companyIndex] = {...state.companies[companyIndex],...updateData}
            }

        },
    }
})

export default companySlice.reducer;
export const {addcompany,deletecompany,updateCompany} = companySlice.actions;