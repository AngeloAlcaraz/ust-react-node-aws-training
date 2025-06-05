import axios from "axios";

const API_URL = "http://localhost:3030/api/auth/";

interface User {
  accessToken: string;
  username?: string;
  email?: string;
  [key: string]: unknown;
}

class AuthService {
  async login(username: string, password: string): Promise<User> {
    try {
      const response = await axios.post<User>(`${API_URL}signin`, { username, password });
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Login failed. Please try again.";
      throw new Error(message);
    }
  }

  logout(): void {
    localStorage.removeItem("user");
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async register(username: string, email: string, password: string): Promise<any> {
    try {
      const response = await axios.post(`${API_URL}signup`, { username, email, password });
      return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Registration failed. Please try again.";
      throw new Error(message);
    }
  }

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem("user");
    return userStr ? (JSON.parse(userStr) as User) : null;
  }
}

export default new AuthService();