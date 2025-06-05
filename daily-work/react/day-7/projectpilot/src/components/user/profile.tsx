import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../../services/auth-service";

interface User {
  username?: string;
  accessToken?: string;
  id?: string | number;
  email?: string;
  roles?: string[];
  [key: string]: unknown;
}

export default function Profile() {
  const [redirect, setRedirect] = useState<string | null>(null);
  const [userReady, setUserReady] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (!user) {
      setRedirect("/home");
    } else {
      setCurrentUser(user);
      setUserReady(true);
    }
  }, []);

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  if (!userReady || !currentUser) {
    return null;
  }

  const getTokenSnippet = (token: string, length = 20) => {
    if (token.length <= length * 2) return token;
    return `${token.slice(0, length)} ... ${token.slice(-length)}`;
  };

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.username}</strong> Profile
        </h3>
      </header>
      <p>
        <strong>Token:</strong> {currentUser.accessToken ? getTokenSnippet(currentUser.accessToken) : ""}
      </p>
      <p>
        <strong>Id:</strong> {currentUser.id}
      </p>
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>
      <strong>Authorities:</strong>
      <ul>
        {currentUser.roles?.map((role, index) => (
          <li key={index}>{role}</li>
        ))}
      </ul>
    </div>
  );
}
