import api from "../api/axios"

export const applyApplication = async(companyId)=>{
    console.log(companyId)
    const response = await api.post(`/application/apply/${companyId}`)
    return response.data
}
