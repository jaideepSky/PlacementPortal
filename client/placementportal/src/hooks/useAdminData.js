import { useQuery } from "@tanstack/react-query"
import { getAdminData } from "../services/getAdminData.service.js"

export const useAdminData = ()=>{
    const query = useQuery({
        queryKey:["admin-data"],
        queryFn:getAdminData
    })
    if (query.isError) {
    console.error(query.error.message);
  }
  return query;
}