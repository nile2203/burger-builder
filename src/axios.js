import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://burger-builder-39f9c.firebaseio.com',
});

export default axiosInstance;