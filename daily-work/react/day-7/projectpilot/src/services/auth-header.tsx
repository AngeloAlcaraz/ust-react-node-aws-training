interface User {
  accessToken: string;
  [key: string]: unknown;
}

export default function authHeader(): Record<string, string> {
  const userStr = localStorage.getItem('user');
  const user: User | null = userStr ? JSON.parse(userStr) : null;

  if (user?.accessToken) {    
    return { Authorization: 'Bearer ' + user.accessToken  }; 
  } else {
    return {};
  }
}
