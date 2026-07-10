import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { DB_NAME } from '../constant.js'
dotenv.config({
    path : './env'
})
const connect_DB = async()=>{
try {
    const connectInstance =  await mongoose.connect(`${process.env.DB_URL}/${DB_NAME}`)
    console.log(`Database is connected✅`)
    // console.log(connectInstance)
} catch (error) {
        console.log('MongoDB connection Error❌ :' ,error)
        process.exit(1)
      
}

}

export  default connect_DB