import axios from 'axios';

export const api = axios.create({
    baseURL: import.meta.env.VITE_PROFILE_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
