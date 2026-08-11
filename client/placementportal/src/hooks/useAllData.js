import { useQuery } from "@tanstack/react-query"
import { getAllApplications, getAllStudents } from "../services/getAllStudents.service.js"

export const useAllStudentData = (page , limit=10)=>{
    const query = useQuery({
        queryKey:["student-data" , page,limit],
        queryFn:getAllStudents({page, limit})
    })
    if (query.isError) {
    console.error(query.error.message);
  }
  return query;
    
}

export const useAllApplicationsData = ()=>{
    const query = useQuery({
        queryKey:["application-data"],
        queryFn:getAllApplications
    })
    if (query.isError) {
    console.error(query.error.message);
  }
  return query;
    
}