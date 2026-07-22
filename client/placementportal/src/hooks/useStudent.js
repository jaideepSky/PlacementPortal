import { useQuery } from "@tanstack/react-query"
import { getLoggedInStudentData } from "../services/getStudentData.service.js"

export const  useStudentProfile = ()=>{
    const query = useQuery({
        queryKey:["student-data"],
        queryFn:getLoggedInStudentData
    })
    return query
}