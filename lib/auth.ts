import { API_BASE } from "@/lib/api";

export const AUTH_BASE = process.env.NEXT_PUBLIC_AUTH_BASE || API_BASE;

// Allow overriding exact paths from env to match your backend
const REGISTER_PATH = process.env.NEXT_PUBLIC_REGISTER_PATH || "/auth/register";
const LOGIN_PATH    = process.env.NEXT_PUBLIC_LOGIN_PATH    || "/auth/login";

export type RegisterInput = {
  name: string;
  email: string;
  password: string;
  role?: string;   // optional, default PARENT
};

export type LoginInput = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token?: string;
  user?: any;
  [k: string]: any;
};

async function postJson<T>(url: string, body: any): Promise<T> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  let json: any = undefined;
  try { json = text ? JSON.parse(text) : undefined; } catch { /* not json */ }
  if (!res.ok) throw new Error(json?.message || json?.error || `HTTP ${res.status} for ${url}`);
  return (json ?? ({} as any)) as T;
}

export const auth = {
  async register(input: RegisterInput) {
    // Try configured register path first
    try {
      return await postJson<any>(`${AUTH_BASE}${REGISTER_PATH}`, {
        name: input.name,
        email: input.email,
        password: input.password,
        role: input.role || "PARENT",
      });
    } catch (e: any) {
      // Fallback to /api/users if provided backend uses a simple resource
      if (String(e.message || "").includes("404")) {
        return await postJson<any>(`${AUTH_BASE}/users`, {
          name: input.name, email: input.email, password: input.password, role: input.role || "PARENT"
        });
      }
      throw e;
    }
  },

  async login(input: LoginInput): Promise<LoginResponse> {
    return await postJson<LoginResponse>(`${AUTH_BASE}${LOGIN_PATH}`, input);
  },
};
