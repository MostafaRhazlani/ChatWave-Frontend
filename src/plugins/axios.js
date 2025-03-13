import axios from 'axios';

axios.defaults.baseURL = 'http://127.0.0.1:8000/api/';

axios.interceptors.request.use(
    config => {
        const authToken = localStorage.getItem('token');

        if (authToken) {
            config.headers['Authorization'] = 'Bearer ' + authToken;
        }
        
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default axios;
