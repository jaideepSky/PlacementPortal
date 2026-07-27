import api from "../api/axios"

export const updateApplication = async ({appId , status})=>{
    const response = await api.patch(`/application/status/${appId}` , {status})
    return response.data
}