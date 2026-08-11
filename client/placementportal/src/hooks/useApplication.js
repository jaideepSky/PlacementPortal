import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getloggedInStudentApplications } from "../services/getApplicationData.service.js";
import { applyApplication } from "../services/applyApplication.service.js";
import toast from "react-hot-toast";
import { updateApplication } from "../services/updateApplication.service.js";
import { useSelector } from "react-redux";

export const useLoggedInStudentApplications = () => {
  const {user} = useSelector((state) => state.auth.user);
  const query = useQuery({
    queryKey: ["application-data",user?._id],
    queryFn: getloggedInStudentApplications,
  });
  if (query.isError) {
    console.error(query.error.message);
  }
  return query;
};

export const useApplyApplication = () => {
   const queryClient = useQueryClient()
  return useMutation({
    mutationFn: applyApplication,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey:["application-data"]
      })
      
      toast.success(data.message);
    },
    onError: (error) => {
        console.log(error.response.message)
      toast.error(error.response?.data?.message || "Something went wrong");
    },
  });
};

export const useUpdateApplication =()=>{
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn:updateApplication,
    onSuccess:(data)=>{
      queryClient.invalidateQueries({
        queryKey:["application-data"]
      })
      toast.success(data.message);
    },
    onError: (error) => {
        console.log(error.response.message)
      toast.error(error.response?.data?.message || "Something went wrong");
    },
  })
}