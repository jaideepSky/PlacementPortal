import {  useQuery } from "@tanstack/react-query"
import { useNavigate } from "react-router"
import { getCompanies } from "../services/getCompanyData.service.js"

export const useGetCompanies = ()=>{
    const query = useQuery({
        queryKey:["companies"],
        queryFn:getCompanies,
        
    })
    return query
}