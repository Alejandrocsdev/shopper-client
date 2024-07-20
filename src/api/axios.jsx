import axios from 'axios'

const { VITE_NODE_ENV, VITE_DEV_BASE_URL, VITE_PROD_BASE_URL } = import.meta.env
const baseURL = VITE_NODE_ENV === 'production' ? VITE_PROD_BASE_URL : VITE_DEV_BASE_URL

const axiosInstance = axios.create({
  baseURL
})

export const axiosPrivate = axios.create({
  baseURL,
  withCredentials: true
})

export default axiosInstance
