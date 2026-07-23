import api from "../api/axios"

export const updateStudentProfile = async (updatedData)=>{
    const response = api.patch('/student/profile',updatedData)
    return (await response).data
}