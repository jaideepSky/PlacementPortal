import api from "../api/axios.js"

export const getLoggedInStudentData =  async ()=>{
    const response = await api.get('/student/profile')
    return await (response).data
}