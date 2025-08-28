import { apiFetch } from "./api";

export interface RegisterInput { name: string; email: string; password: string; }
export interface LoginInput { email: string; password: string; }
export interface AuthUser { id: number; name: string; email: string; }
export interface LoginResponse { token: string; user: AuthUser; }

export const auth = {
  async register(input: RegisterInput): Promise<{ message: string }> {
    return apiFetch<{ message: string }>("/auth/register", {
      method: "POST",
      body: JSON.stringify(input),
    });
  },

  async login(input: LoginInput): Promise<LoginResponse> {
    return apiFetch<LoginResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(input),
    });
  },
};
