import api from "../api/axios.js"


// *Register Service
export const registerUser = async(userData) => {
    const response = api.post('/auth/register', userData)
    return (await response).data
}

// *Login Service
export const loginUser = async(credentials) => {
    const response = api.post('/auth/login',credentials)
    return (await response).data
}

// *Logout Service
export const logoutUser = async() => {
    const response = api.post('/auth/logout')
    return (await response).data
}


// *GetCurrentUser Service
export const getCurrentUser = async () => {
    const response = await api.get("/auth/me");
    return response.data;
};