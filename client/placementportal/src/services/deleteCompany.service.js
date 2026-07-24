import api from "../api/axios"

export const deleteCompany = async(companyId)=>{
    const response  = await api.delete(`/company/${companyId}`)
    return response.data
}