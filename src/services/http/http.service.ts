import axios, { AxiosRequestConfig } from "axios";
const VITE_API_URL = import.meta.env.VITE_API_URL;

export class HttpService {
  defaultConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  async post<T>(
    url: string,
    body: unknown,
    axiosConfig?: AxiosRequestConfig
  ): Promise<T> {
    return await axios
      .post(`${VITE_API_URL}${url}`, JSON.stringify(body), {
        ...this.defaultConfig,
        ...axiosConfig,
      })
      .then((axiosResponse) => {
        return axiosResponse.data as T;
      });
  }

  async get<T>(url: string, axiosConfig?: AxiosRequestConfig): Promise<T> {
    return await axios
      .get(`${VITE_API_URL}${url}`, {
        ...this.defaultConfig,
        ...axiosConfig,
      })
      .then((axiosResponse) => {
        return axiosResponse.data as T;
      });
  }

  async patch<T>(
    url: string,
    body: unknown,
    axiosConfig?: AxiosRequestConfig
  ): Promise<T> {
    return await axios
      .patch(`${VITE_API_URL}${url}`, JSON.stringify(body), {
        ...this.defaultConfig,
        ...axiosConfig,
      })
      .then((axiosResponse) => {
        return axiosResponse.data as T;
      });
  }

  async put<T>(
    url: string,
    body: unknown,
    axiosConfig?: AxiosRequestConfig
  ): Promise<T> {
    return await axios
      .put(`${VITE_API_URL}${url}`, JSON.stringify(body), {
        ...this.defaultConfig,
        ...axiosConfig,
      })
      .then((axiosResponse) => {
        return axiosResponse.data as T;
      });
  }

  async delete<T>(url: string): Promise<T> {
    return await axios.delete(`${VITE_API_URL}${url}`).then((axiosResponse) => {
      return axiosResponse.data;
    });
  }
}
