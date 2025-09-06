import axios, { type AxiosInstance, type AxiosResponse } from "axios"
import type {
  AuthResponse,
  LoginRequest,
  SignupRequest,
  Journal,
  GenerateJournalRequest,
} from "../types"

class ApiService {
  async ping(): Promise<AxiosResponse<any>> {
    return this.api.post("/auth/ping")
  }
  private api: AxiosInstance
  private baseURL = "https://wizard-journal-backend.onrender.com"

  constructor() {
    this.api = axios.create({
      baseURL: this.baseURL,
      headers: {
        "Content-Type": "application/json",
      },
    })

    this.setupInterceptors()
  }

  private setupInterceptors() {
    // Request interceptor to add auth token
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("token")
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => Promise.reject(error),
    )

    // Response interceptor to handle token refresh
    this.api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true

          try {
            const refreshToken = localStorage.getItem("refreshToken")
            if (refreshToken) {
              const response = await this.refreshToken(refreshToken)
              localStorage.setItem("token", response.data.token)
              localStorage.setItem("refreshToken", response.data.refreshToken)

              // Retry the original request with new token
              originalRequest.headers.Authorization = `Bearer ${response.data.token}`
              return this.api(originalRequest)
            }
          } catch (refreshError) {
            // Refresh failed, redirect to login
            localStorage.removeItem("token")
            localStorage.removeItem("refreshToken")
            window.location.href = "/login"
            return Promise.reject(refreshError)
          }
        }

        return Promise.reject(error)
      },
    )
  }

  // Auth endpoints
  async signup(data: SignupRequest): Promise<AxiosResponse<AuthResponse>> {
    return this.api.post("/auth/signup", data)
  }

  async login(data: LoginRequest): Promise<AxiosResponse<AuthResponse>> {
    return this.api.post("/auth/login", data)
  }

  async refreshToken(refreshToken: string): Promise<AxiosResponse<AuthResponse>> {
    return this.api.post("/auth/refresh-token", { refreshToken })
  }

  // Journal endpoints
  async getAllJournals(): Promise<AxiosResponse<Journal[]>> {
    return this.api.get("/journal/all")
  }

  async createJournal(data: Partial<Journal>): Promise<AxiosResponse<Journal>> {
    return this.api.post("/journal/insert", data)
  }

  async editJournal(id: string, data: Partial<Journal>): Promise<AxiosResponse<Journal>> {
    return this.api.put(`/journal/edit/${id}`, data)
  }

  async deleteJournal(id: string): Promise<AxiosResponse<void>> {
    return this.api.delete(`/journal/delete/${id}`)
  }

  // AI endpoints
  async generateJournal(data: GenerateJournalRequest): Promise<AxiosResponse<Journal>> {
    return this.api.post("/journal/generate", data)
  }
}

export const apiService = new ApiService()
