import jwt from 'jsonwebtoken'
 const isLoggedIn = async (req , res , next)=>{

     console.log(jwt.decode(req.cookies.token));
   try {
     console.log(req.cookies)
     let token = req.cookies?.token
     console.log("Token Found :",token?"Yes":"No");
     if(!token){
        console.log("No Token Found");
        return res.status(401).json({
            success:false,
            message:"Authentication Failed"
        }) 
     }
    const decoded =  jwt.verify(token,process.env.JWT_SECRET)
    console.log("Decoded data :",decoded);
    req.user = decoded
    next()
   } catch (error) {
        console.log("Auth  Middleware Error ");
        console.log(error);
    console.log(error.name);
    console.log(error.message);
        return res.status(500).json({
            success:false,
            message:"Internal Server Error"
        }) 
   }

}

export {isLoggedIn}