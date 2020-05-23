import axios from 'axios';
import { BASE_URL } from '../App.constants';

const axiosInstance = axios.create({
  baseURL: BASE_URL
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log('Has error');  // TODO: handle error
    return Promise.reject(error);
  }
)
export default axiosInstance;
