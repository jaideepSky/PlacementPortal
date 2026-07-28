import express, { urlencoded } from 'express'
import  cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'

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


export {app}