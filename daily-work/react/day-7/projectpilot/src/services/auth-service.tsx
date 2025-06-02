import axios from "axios";

const API_URL = "http://localhost:3030/api/auth/";

interface User {
  accessToken: string;
  username?: string;
  email?: string;
  [key: string]: unknown;
}

class AuthService {
  login(username: string, password: string): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      axios
        .post<User>(`${API_URL}signin`, { username, password })
        .then((response) => {
          if (response.data.accessToken) {
            localStorage.setItem("user", JSON.stringify(response.data));
          }
          resolve(response.data);
        })
        .catch(reject);
    });
  }

  logout(): void {
    localStorage.removeItem("user");
  }

  async register(username: string, email: string, password: string): Promise<void> {
    await axios.post(`${API_URL}signup`, { username, email, password });
  }

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem("user");
    return userStr ? (JSON.parse(userStr) as User) : null;
  }
}

export default new AuthService();
