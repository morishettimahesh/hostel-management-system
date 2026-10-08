import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  AxiosError,
} from "axios";
import type { ApiResponse, ApiErrorResponse } from "@hostel/shared";

/**
 * Custom Error wrapper for standardized API client exceptions
 */
export class ApiClientError extends Error {
  public status: number;
  public code: string;
  public details?: unknown;

  constructor(
    message: string,
    status: number = 500,
    code: string = "UNKNOWN_ERROR",
    details?: unknown
  ) {
    super(message);
    this.name = "ApiClientError";
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

/**
 * Creates and configures the Axios client instance for API requests.
 */
function createHttpClient(): AxiosInstance {
  const baseURL = import.meta.env.VITE_API_BASE_URL || "/api";
  const timeout = Number(import.meta.env.VITE_API_TIMEOUT) || 15000;

  const instance = axios.create({
    baseURL,
    timeout,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  // Request Interceptor: Attach Auth Token if available
  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("auth_token");
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response Interceptor: Standardize error formatting
  instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError<ApiErrorResponse>) => {
      if (error.response) {
        const errorData = error.response.data?.error;
        return Promise.reject(
          new ApiClientError(
            errorData?.message || error.message || "An unexpected API error occurred",
            error.response.status,
            errorData?.code || "API_ERROR",
            errorData?.details
          )
        );
      } else if (error.request) {
        return Promise.reject(
          new ApiClientError(
            "No response received from server. Please check your network connection.",
            0,
            "NETWORK_ERROR"
          )
        );
      }
      return Promise.reject(new ApiClientError(error.message, 500, "REQUEST_SETUP_ERROR"));
    }
  );

  return instance;
}

export const httpClient = createHttpClient();

/**
 * Base HTTP helper methods providing strictly typed API requests
 */
export const apiClient = {
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await httpClient.get<ApiResponse<T>>(url, config);
    return response.data;
  },

  async post<T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await httpClient.post<ApiResponse<T>>(url, data, config);
    return response.data;
  },

  async put<T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await httpClient.put<ApiResponse<T>>(url, data, config);
    return response.data;
  },

  async patch<T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await httpClient.patch<ApiResponse<T>>(url, data, config);
    return response.data;
  },

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await httpClient.delete<ApiResponse<T>>(url, config);
    return response.data;
  },
};
