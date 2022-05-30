import axios from "axios";
import { TIMEOUT, API_BASE_URL } from "../config/Config";



// /axios global settings

axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';

export const AxiosInstance = axios.create({

  baseURL: API_BASE_URL,
  timeout: TIMEOUT

});


