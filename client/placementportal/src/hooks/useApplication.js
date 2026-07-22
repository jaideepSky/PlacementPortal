import { useMutation, useQuery } from "@tanstack/react-query";
import { getloggedInStudentApplications } from "../services/getApplicationData.service.js";
import { applyApplication } from "../services/applyApplication.service.js";
import toast from "react-hot-toast";

export const useLoggedInStudentApplications = () => {
  const query = useQuery({
    queryKey: ["application-data"],
    queryFn: getloggedInStudentApplications,
  });
  if (query.isError) {
    console.error(query.error.message);
  }
  return query;
};

export const useApplyApplication = () => {
  return useMutation({
    mutationFn: applyApplication,
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error) => {
        console.log(error.response.message)
      toast.error(error.response?.data?.message || "Something went wrong");
    },
  });
};
