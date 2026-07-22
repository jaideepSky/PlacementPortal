import api from "../api/axios.js"

export const getCompanies = async()=>{
    const response = await api.get('/company')
    return await(response).data
} 

