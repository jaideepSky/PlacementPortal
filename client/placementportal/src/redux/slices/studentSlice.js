import { createSlice, nanoid } from "@reduxjs/toolkit";
import { mockStudents } from "../../data/mockData.js";

const studentSlice = createSlice({

    name:'students',
    initialState:{
        studentsList : mockStudents,
        selected : null,
        error : null ,
    },
    reducers:{
        // add student - Admin only
        addStudent : (state , action)=>{
            const existingStudent = state.studentsList.find((student)=>student.email === action.payload.email)
            if(existingStudent){
                state.error = "Student with this email already exists."
            }
            else{
                const newStudent  = {
                    id: nanoid(),
                    skills : [],
                    ...action.payload,
                }
                state.studentsList.push(newStudent)
                state.error = null
            }
        },

        // delete student - Admin only
        deleteStudent : (state,action)=>{
            state.studentsList = state.studentsList.filter((student)=>student.id !== action.payload.id)
        },

        // update student - Admin and student themselves
        updateStudent : (state,action)=>{
            const {id , ...updateData} = action.payload
            const findIndex = state.studentsList.findIndex((student)=>student.id === id)
            if(findIndex !== -1){
                state.studentsList[findIndex] = {...state.studentsList[findIndex], ...updateData}
                    
            }
        },
        // add skill to student -  student themselves
        addSkill : (state,action)=>{
            const {id,skill} = action.payload
            const find = state.studentsList.find((student)=>student.id === id)
            if(find){
               if(find.skills.includes(skill)){
                state.error = "Skill already exists for this student."
               }
               else{
                find.skills.push(skill)
                state.error = null
               }
            }
        },
         // CLEAR ERROR
    clearError: (state) => {
      state.error = null
    }

    }
})

export default studentSlice.reducer;
export const {addStudent,deleteStudent,updateStudent,addSkill,clearError} = studentSlice.actions;