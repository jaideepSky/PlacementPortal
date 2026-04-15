import { createSlice, nanoid } from "@reduxjs/toolkit";
import { mockStudents } from "../../data/mockData.js";

const studentSlice = createSlice({

    name:'students',
    initialState:{
        students : mockStudents,
        selected : null,
        error : null ,
    },
    reducers:{
        // add student - Admin only
        addStudent : (state , action)=>{
            const existingStudent = state.students.find((student)=>student.email === action.payload.email)
            if(existingStudent){
                state.error = "Student with this email already exists."
            }
            else{
                const newStudent  = {
                    id: nanoid(),
                    skill : [],
                    ...action.payload,
                }
                state.students.push(newStudent)
                state.error = null
            }
        },

        // delete student - Admin only
        deleteStudent : (state,action)=>{
            state.students = state.students.filter((student)=>student.id !== action.payload.id)
        },

        // update student - Admin and student themselves
        updateStudent : (state,action)=>{
            const {id , ...updateData} = action.payload
            const findIndex = state.students.findIndex((student)=>student.id === id)
            if(findIndex !== -1){
                state.students[findIndex] = {...state.students[findIndex], ...updateData}
                    
            }
        },
        // add skill to student -  student themselves
        addSkill : (state,action)=>{
            const {id,skill} = action.payload
            const find = state.students.find((student)=>student.id === id)
            if(find){
               if(state.students[find].skill.includes(skill)){
                state.error = "Skill already exists for this student."
               }
               else{
                state.students[find].skill.push(skill)
                state.error = null
               }
            }
        }

    }
})

export default studentSlice.reducer;
export const {addStudent,deleteStudent,updateStudent,addSkill} = studentSlice.actions;