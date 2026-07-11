
const authorise = (role)=>{
    return (req ,res , next)=>{
        if(userRole !== role){
         return res.status(403).json({
                success: false,
                message: "Access Denied"
            });
    }
    next()
    }

}

export default authorise