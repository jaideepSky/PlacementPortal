import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router'
import {useMutation} from '@tanstack/react-query'
import { registerUser } from '../services/auth.service.js'
import {  setuser } from '../redux/slices/authSlice.js'



export const  useRegisterMutation = ()=>{
const dispatch = useDispatch()
const navigate = useNavigate()
return  useMutation({
    mutationFn : registerUser,
    onSuccess:(data)=>{
        dispatch(setuser({user:data.data.user}))
            navigate("/student/dashboard");
    },
    onError:(error)=>{
        console.log(error.response?.data)
    }
})
}



