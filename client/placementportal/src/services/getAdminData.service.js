import api from "../api/axios"

export const getAdminData  = async()=>{
    const response  = await api.get('/adminData') 
    return response.data
}