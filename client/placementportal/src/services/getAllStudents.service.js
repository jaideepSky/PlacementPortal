import api from "../api/axios"

export const getAllStudents = async()=>{
    const response = await api.get('/student/allData')
    return response.data
}

export const getAllApplications = async()=>{
    const response = await api.get('/application/allData')
    return response.data
}