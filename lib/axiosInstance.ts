import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_HOST,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
})

export default axiosInstance;