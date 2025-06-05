interface User {
  accessToken: string;
  [key: string]: unknown;
}

export default function authHeader(): Record<string, string> {
  try {
    const userStr = localStorage.getItem("user");
    if (!userStr) return {};

    const user: User = JSON.parse(userStr);
    if (user?.accessToken) {
      return { Authorization: `Bearer ${user.accessToken}` };
    }
  } catch (error) {
    console.error("Failed to parse user from localStorage", error);
  }

  return {};
}
