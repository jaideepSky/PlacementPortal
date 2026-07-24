import api from "../api/axios"

export const updateCompany = async({data , id})=>{
    const response = await api.patch(`/company/${id}`, data)
    return response.data
}