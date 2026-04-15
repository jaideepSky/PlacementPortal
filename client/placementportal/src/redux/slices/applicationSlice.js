import { createSlice } from "@reduxjs/toolkit";
import { mockApplications } from "../../data/mockData.js";

const applicationSlice = createSlice({

    name:'applications',
    initialState:mockApplications,
    reducers:{}
})

export default applicationSlice.reducer;