import api from "../api/axios"

export const getAllStudents = async({ page = 1, limit = 10 })=>{
    const response = await api.get(`/student/allData?page=${page}&limit=${limit}`)
    return response.data
}

export const getAllApplications = async()=>{
    const response = await api.get('/application/allData')
    return response.data
}