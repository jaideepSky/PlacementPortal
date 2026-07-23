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
        console.error(error.name, error.message);
        

     if (error.name === "TokenExpiredError") {
    return res.status(401).json({
      success: false,
      message: "Session expired. Please log in again.",
    });
  }

  if (error.name === "JsonWebTokenError") {
    return res.status(401).json({
      success: false,
      message: "Invalid token.",
    });
  }

  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
   }

}

export {isLoggedIn}