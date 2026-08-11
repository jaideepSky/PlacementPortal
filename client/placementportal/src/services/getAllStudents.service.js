import api from "../api/axios"

export const getAllStudents = async()=>{
    const response = await api.get(`/student/allData`)
    return response.data
}

export const getAllApplications = async({ page = 1, limit = 10 })=>{
    const response = await api.get(`/application/allData?page=${page}&limit=${limit}`)
    return response.data
}