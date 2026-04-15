import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import studentSlice from "./slices/studentSlice";
import companySlice from "./slices/companySlice";
import applicationSlice from "./slices/applicationSlice";

const store = configureStore({
    reducer:{
        auth: authSlice,
        students: studentSlice,
        companies: companySlice,
        applications : applicationSlice,

    }
})
export default store;