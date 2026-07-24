import { useQuery } from "@tanstack/react-query"
import { getAllApplications, getAllStudents } from "../services/getAllStudents.service.js"

export const useAllStudentData = ()=>{
    const query = useQuery({
        queryKey:["student-data"],
        queryFn:getAllStudents
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