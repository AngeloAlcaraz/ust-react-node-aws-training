import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import AuthService from "../../services/auth-service";
import { useNavigate } from "react-router-dom";

type FormValues = {
  username: string;
  password: string;
};

export default function Login() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },  
  } = useForm<FormValues>();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setMessage("");
    setLoading(true);

    try {
      await AuthService.login(data.username, data.password);
      setLoading(false);
      navigate("/profile");    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const resMessage =
        error.response?.data?.message || error.message || error.toString();
      setLoading(false);
      setMessage(resMessage);
    }
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className={`form-control ${errors.username ? "is-invalid" : ""}`}
              {...register("username", {
                required: "Username is required",
                onChange: () => setMessage(""),
              })}
            />
            {errors.username && (
              <div className="invalid-feedback">{errors.username.message}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              {...register("password", {
                required: "Password is required",
                onChange: () => setMessage(""),
              })}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password.message}</div>
            )}
          </div>

          <div className="form-group">
            <button className="btn btn-primary btn-block" disabled={loading}>
              {loading && (
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
              )}
              Login
            </button>
          </div>

          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
