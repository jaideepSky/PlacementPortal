import { AppleIcon } from "lucide-react"
import api from "../api/axios"

export const addCompany = async (data)=>{
    const response = await api.post('/company',data)
    return response.data
} 