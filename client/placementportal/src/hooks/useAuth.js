import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getCurrentUser, loginUser, registerUser } from "../services/auth.service.js";
import { setuser } from "../redux/slices/authSlice.js";
import toast from "react-hot-toast";
import { useEffect } from "react";

export const useRegisterMutation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      toast.success(data.message);
      dispatch(setuser({ user: data.data.user }));
      navigate("/login");
    },
    onError: (error) => {
     toast.error(
      error.response?.data?.message || "Something went wrong"
    );
    },
  });
};

export const useLoginMutation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
         toast.success(data.message);
      dispatch(setuser({ user: data.data.user }));
       if (data.data.user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/student/dashboard");
      }
    },
    onError: (error) => {
      toast.error(
      error.response?.data?.message || "Something went wrong"
    );
    },
  });
};

export const useCurrentUser = () => {
  const dispatch = useDispatch();

  const query = useQuery({
    queryKey: ["current-user"],
    queryFn: getCurrentUser,
    retry: false,
  });
  
  useEffect(() => {
    if (query.data) {
        //  console.log("Current User:", query.data);
      dispatch(setuser({ user: query.data.data.user }));
    }
  }, [query.data, dispatch]);

  return query;
};