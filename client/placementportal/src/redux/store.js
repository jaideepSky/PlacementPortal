import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";

const store = configureStore({
    reducer:{
        auth: authSlice,
        students: studentSlice,
        companies: companySlice,

    }
})
export default store;