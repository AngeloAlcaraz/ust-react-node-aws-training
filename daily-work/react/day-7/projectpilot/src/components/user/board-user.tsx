import { useEffect, useState } from "react";
import UserService from "../../services/user-service";
import EventBus from "../../common/event-bus";

export default function BoardUser() {
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    UserService.getUserBoard().then(
      (response) => {
        setContent(String(response.data));
      },
      (error) => {
        const message =
          error.response?.data?.message || error.message || error.toString();
        setContent(message);

        if (error.response?.status === 401) {
          EventBus.dispatch("logout", null);
        }
      }
    );
  }, []);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>
      </header>
    </div>
  );
}
