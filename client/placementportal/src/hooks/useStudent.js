import { useMutation, useQuery } from "@tanstack/react-query";
import { getLoggedInStudentData } from "../services/getStudentData.service.js";
import { updateStudentProfile } from "../services/upadateStudentProfile.service.js";
import toast from "react-hot-toast";
import {useNavigate} from 'react-router'

export const useStudentProfile = () => {
  const query = useQuery({
    queryKey: ["student-data"],
    queryFn: getLoggedInStudentData,
  });
  return query;
};

export const useUpdateStudentProfile = () => {
    const navigate =  useNavigate()
  return useMutation({
    mutationFn: updateStudentProfile,
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error) => {
      console.log(error.response?.data);
      if (error.response?.status === 401) {
    toast.error("Session expired. Please log in again.");
    navigate("/login");
    return;
  }

  toast.error(error.response?.data?.message || "Something went wrong");
    },
  });
};
