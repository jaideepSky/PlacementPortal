import api from "../api/axios.js"

export const loginUser = async(credentials) => {
    const response = api.post('/auth/login',credentials)
    return (await response).data
}

export const registerUser = async(userData) => {
    const response = api.post('/auth/register', userData)
    return (await response).data
}

export const logoutUser = async() => {
    const response = api.post('/auth/logout')
    return (await response).data
}