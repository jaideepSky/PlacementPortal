import bcrypt from 'bcrypt'
import User from '../models/user.model.js'
const register = async(name,email,password)=>{
    const hashedPassword = await bcrypt.hash(password,10)
    const user  = await User.create({name ,email ,  password:hashedPassword})
    return await user
}
export {register}