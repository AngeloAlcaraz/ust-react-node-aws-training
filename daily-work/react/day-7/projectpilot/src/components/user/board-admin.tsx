import { useEffect, useState } from "react";
import UserService from "../../services/user-service";
import EventBus from "../../common/event-bus";

export default function BoardAdmin() {
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    const fetchAdminBoard = async () => {
      try {
        const response = await UserService.getAdminBoard();
        setContent(String(response.data));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        const resMessage =
          error.response?.data?.message ||
          error.message ||
          error.toString();
        setContent(resMessage);

        if (error.response?.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    };

    fetchAdminBoard();
  }, []);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>
      </header>
    </div>
  );
}
