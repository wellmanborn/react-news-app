import axios from 'axios';
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
    baseURL: "http://localhost:8000/",
    withCredentials: true,
});

const onRequest = (config) => {
    if ((
            config.method === 'post' ||
            config.method === 'put' ||
            config.method === 'delete'
        ) &&
        !Cookies.get('XSRF-TOKEN')) {
        return setCSRFToken()
            .then(() => config);
    }
    return config;
}
const onResponse = response => {
    return response;
}
const onRejected = (error) => {
    if (error.response.status === 401) {
        localStorage.removeItem('userDetails');
        window.location.href = "login";
    }
    return Promise.reject(error);
}
const setCSRFToken = () => {
    return axiosInstance.get('/sanctum/csrf-cookie');
}

axiosInstance.interceptors.request.use(onRequest, error => Promise.reject(error))
axiosInstance.interceptors.response.use(onResponse, onRejected)

export default axiosInstance;