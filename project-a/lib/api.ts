export const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8080/api";

export type Division = {
  id: number;
  name: string;
  description?: string | null;
};

export type Course = {
  id: number;
  title: string;
  description?: string | null;
  basePrice: number;
};

// Generic fetch with error handling
async function req<T>(path: string, init?: RequestInit): Promise<T> {
  const auth = typeof window !== "undefined" ? window.localStorage.getItem("auth") : null;
  const token = auth ? (() => { try { return JSON.parse(auth).token as string } catch { return null } })() : null;

  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    cache: "no-store",
    headers: {
      "Accept": "application/json",
      ...(token ? { "Authorization": `Bearer ${token}` } : {}),
      ...(init?.headers || {}),
    }
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HTTP ${res.status} ${res.statusText} for ${path}: ${text}`);
  }
  return res.json() as Promise<T>;
}

// Endpoints inferred from Spring controllers:
export const api = {
  listDivisions: () => req<Division[]>("/divisions"),
  getDivision: (id: number) => req<Division>(`/divisions/${id}`),
  listCoursesByDivision: (id: number) => req<Course[]>(`/divisions/${id}/courses`),
  getCourse: (id: number) => req<Course>(`/courses/${id}`),
};
