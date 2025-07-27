import axios from 'axios';
import { apiUrl } from './GlobalConstant';

export const axiosApi = axios.create({ baseURL: apiUrl });
