import axios from "axios";
import {authenticationInterceptor} from "@/iam/services/authentication.interceptor.js";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const http = axios.create({
    baseURL: 'http://localhost:5175/api/v1/'
})

http.defaults.headers.common["Content-Type"] = "application/json";
http.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

// Add a request interceptor
http.interceptors.request.use(authenticationInterceptor);

export default http;
