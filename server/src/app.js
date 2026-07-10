import express, { urlencoded } from 'express'
import  cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import session from 'express-session'
dotenv.config({
    path:'./.env'
})

const app = express()
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json())
app.use(express.urlencoded())
app.use(express.static("public"))
app.use(cookieParser())
app.use(session({
    secret : process.env.SESSION_SECRET,
    resave : false,
    saveUninitialized:false,
    cookie:{
        maxAge:1000*60*10 // 10 min
    }
    
}))

export {app}