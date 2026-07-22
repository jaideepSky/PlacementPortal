import api from "../api/axios"

export  const getloggedInStudentApplications =  async ()=>{
const response = await api.get('/application/my')
return await (response).data
}