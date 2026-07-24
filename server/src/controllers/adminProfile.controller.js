import User from "../models/auth.model.js"

export const getAdminProfile = async(req,res)=>{
    try {
        const user = await User.findById(req.user.id)
        if(!user){
            return  res.json({
                success:false,
                message:"User not found"
            })
        }

        return res.status(200).json({
            success:true,
            data:user,
            message:"User Data fetched successfully"
        })
        
    } catch (error) {
       return res.status(500).json({
            success:false,
            error: error.message,
            message:"Internal Server Error"
        })     
    }
}