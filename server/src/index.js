import express from  'express'
import dotenv from 'dotenv';
import connect_DB from './config/db.js';
import { app } from './app.js';
import authRoute from './routes/auth.route.js'
import studentRoute from './routes/studentProfile.route.js'
import companyRoute from './routes/company.route.js'
import applicationRoute from './routes/application.route.js'
import { errorHandler } from './middlewares/globalError.middleware.js';
import dashboardRoute from './routes/dashboard.route.js'
import uploadResumeRoute from './routes/uplodResume.route.js'

dotenv.config();

// *Routes
app.get('/',(req,res)=>{
    res.send("hello placement-portal!!")
})
//*Auth Route
app.use('/api/auth',authRoute )

// * Student Profile Route
app.use('/api/student',studentRoute)

// * Company Route
app.use('/api/company',companyRoute)

// *Application Route
app.use('/api/application',applicationRoute)

// *Dashboard Route
app.use('/api',dashboardRoute)

// *upload resume
app.use('/api/student', uploadResumeRoute)

app.use(errorHandler)


// *Connect DB 
connect_DB()
.then(()=>{
    app.listen(process.env.PORT || 3000 , ()=>{
    console.log(`Server listen at PORT:${process.env.PORT }✅`)
})
})
.catch((error)=>{
    console.log("MongoDB connection error :",error)
})

