import axios from "axios"
import tokens from "../constants/tokens"

const config = {
    baseURL: import.meta.env.VITE_BACKEND_URL
}

const generalRequestInstance = axios.create(config)

const authRequestInstance = axios.create(config)

authRequestInstance.interceptors.request.use((request) => {
    const authToken = localStorage.getItem(tokens.auth_token)
    if(authToken) {
        request.headers.Authorization = `Bearer ${authToken}`
    }
    return request
}, (error) => {
    return Promise.reject(error)
})

export function generalRequest(config) {
    return generalRequestInstance.request(config).then((response) => response.data)
}

export function authRequest(config) {
    return authRequestInstance.request(config).then((response) => response.data)
}