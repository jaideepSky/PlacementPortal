import { useQuery } from "@tanstack/react-query"
import { getAllApplications, getAllStudents } from "../services/getAllStudents.service.js"

export const useAllStudentData = ()=>{
    const query = useQuery({
        queryKey:["student-data" ],
        queryFn:getAllStudents
    })
    if (query.isError) {
    console.error(query.error.message);
  }
  return query;
    
}

export const useAllApplicationsData = (page , limit=10)=>{
    const query = useQuery({
        queryKey:["application-data", page,limit],
        queryFn: () =>getAllApplications({page, limit})
    })
    if (query.isError) {
    console.error(query.error.message);
  }
  return query;
    
}