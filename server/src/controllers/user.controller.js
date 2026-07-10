import { register } from "../service/user.service.js"

const registerUser = async(req,res)=>{
    const {name , email ,password} = req.body
    
  if (!name || !email || !password) {
    return res.status(404).json({
      message: "All fields are required",
    });
  }
    try {
        const user =  await register(name,email,password)
        res.status(201).json({
            success:true,
            message:"User registered successfully",
            data:user
        })
        console.log(user)
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message : "error signing up",
            error : error.message
        })
    }

}

const loginUser = async()=>{

}

const logoutUser = async()=>{

}

export {registerUser,loginUser,logoutUser}