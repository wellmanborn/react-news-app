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

const setCSRFToken = () => {
    return axiosInstance.get('/sanctum/csrf-cookie');
}
axiosInstance.interceptors.request.use(onRequest, null);
export default axiosInstance;