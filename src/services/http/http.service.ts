// import axios, { AxiosRequestConfig } from "axios";
// import { Action, Thunk, action, thunk } from "easy-peasy";
const VITE_API_URL = import.meta.env.VITE_API_URL;

import axios from "axios";

// interface ApiResponseStatus {
//   type: string;
// }

// export interface ApiModel {
//   responseStatus: ApiResponseStatus | null;
//   setResponseStatus: Action<ApiModel, ApiResponseStatus | null>;

//   callApi: Thunk<
//     ApiModel,
//     {
//       method: "get" | "post" | "put" | "patch" | "delete";
//       url: string;
//       data?: any;
//       config?: AxiosRequestConfig;
//       errorMap?: Record<string, string>;
//       onSuccess?: (res: any) => void;
//     }
//   >;
// }

// export const apiModel: ApiModel = {
//   responseStatus: null,

//   setResponseStatus: action((state, payload) => {
//     state.responseStatus = payload;
//   }),

//   callApi: thunk(
//     async (actions, { method, url, data, config, errorMap, onSuccess }) => {
//       url = VITE_API_URL + url;
//       try {
//         const response = await axios({
//           method,
//           url,
//           data,
//           ...config,
//         });

//         actions.setResponseStatus({ type: "success" });
//         if (onSuccess) onSuccess(response.data);
//       } catch (err: any) {
//         const code = err.response?.data?.code || "unknown";
//         const errorType = errorMap?.[code] || "unknown";
//         actions.setResponseStatus({ type: errorType });
//         // console.error(`[API ERROR - ${method.toUpperCase()} ${url}]`, err);
//       }
//     }
//   ),
// };

type ApiErrorDetail = {
  code: string;
  field?: string;
  message: string;
};

type CallApiResult<T> = {
  data: T | null;
  error: ApiErrorDetail[] | "server_error" | null;
};
export async function callApi<T>({
  method,
  url,
  data,
}: {
  method: "get" | "post" | "put" | "delete";
  url: string;
  data?: any;
}): Promise<CallApiResult<T>> {
  url = VITE_API_URL + url;
  try {
    const res = await axios({ method, url, data });
    return { data: res.data, error: null };
  } catch (err: any) {
    const res = err.response;
    if (res.status === 400 && Array.isArray(res.data?.errors)) {
      return { data: null, error: res.data.errors };
    }
    return { data: null, error: "server_error" };
  }
}

// export async function callApi({
//   method,
//   url,
//   data,
// }: {
//   method: "get" | "post" | "put" | "delete";
//   url: string;
//   data?: any;
// }) {
//   url = VITE_API_URL + url;
//   try {
//     const res = await axios({ method, url, data });
//     return { data: res.data, error: null };
//   } catch (err: any) {
//     console.log(err);
//     const res = err.response;
//     if (res.status === 400 && Array.isArray(res.data?.errors)) {
//       return { data: null, error: err.response?.data?.errors };
//       // err.response?.data?.errors;
//     }
//     return { data: null, error: "server_error" };
//   }
// }
