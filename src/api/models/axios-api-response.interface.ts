import { AxiosError } from 'axios';

export interface AxiosApiResponse<T> {
    response?: T;
    error?: AxiosError;
}
