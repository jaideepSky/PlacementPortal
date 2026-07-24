import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { getCompanies } from "../services/getCompanyData.service.js";
import { addCompany } from "../services/addCompany.service.js";
import { toast } from "react-hot-toast";
import { deleteCompany } from "../services/deleteCompany.service.js";
import { updateCompany } from "../services/updateCompany.service.js";

export const useGetCompanies = () => {
  const query = useQuery({
    queryKey: ["companies"],
    queryFn: getCompanies,
  });
  return query;
};

export const useAddCompany = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: addCompany,
    onSuccess: (data) => {
       queryClient.invalidateQueries({
        queryKey: ["companies"],
      })
      toast.success(data.message);
    },
    onError: (error) => {
      console.log(error.response?.data);
      toast.error(error.response?.data?.message || "Something went wrong");
    },
  });
};

export const usedeleteCompany = ()=>{
   const queryClient = useQueryClient()
    return useMutation({
       mutationFn:deleteCompany,
       onSuccess: (data) => {
        queryClient.invalidateQueries({
        queryKey: ["companies"],
      })
      toast.success(data.message);
    },
    onError: (error) => {
      console.log(error.response?.data);
      toast.error(error.response?.data?.message || "Something went wrong");
    },

    })
}

export const useUpdataCompany = ()=>{
  const queryClient = useQueryClient()
    return useMutation({
        mutationFn:updateCompany,
        onSuccess: (data) => {
          queryClient.invalidateQueries({
        queryKey: ["companies"],
      })
      toast.success(data.message);
    },
    onError: (error) => {
      console.log(error.response?.data);
      toast.error(error.response?.data?.message || "Something went wrong");
    },
    })
}


