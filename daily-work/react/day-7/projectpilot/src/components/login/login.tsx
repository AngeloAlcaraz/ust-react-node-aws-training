import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/auth-service";
import "./Login.css";

type FormValues = {
  email: string;
  password: string;
};

export default function Login() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const isValid = await trigger(); 
    if (!isValid) return;

    setMessage("");
    setLoading(true);

    try {
      await AuthService.login(data.email, data.password);
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
    <div className="login-wrapper">
      <div className="login-container">
        <div className="modal-header">
          <h5 className="modal-title">Please login to your account</h5>
        </div>
        <div className="modal-body">
          <img
            src="http://localhost:5173/assets/logo-3.svg"
            style={{ width: "138px" }}
            alt="logo"
          />
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{ border: "none", background: "none" }}
            noValidate
          >
            <div className="mb-3">
              <div className="input-group">
                <input
                  type="email"
                  className={`form-control ${errors.email ? "input-error" : ""}`}
                  placeholder="email address"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Invalid email format",
                    },
                  })}
                  disabled={loading}
                  aria-invalid={errors.email ? "true" : "false"}
                  aria-describedby="email-error"
                />
                <span className="input-group-text">
                  <i className="fas fa-envelope"></i>
                </span>
              </div>
              {errors.email && (
                <div id="email-error" className="error-message" role="alert">
                  {errors.email.message}
                </div>
              )}
            </div>

            <div className="mb-3" style={{ position: "relative" }}>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  className={`form-control ${errors.password ? "input-error" : ""}`}
                  placeholder="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  disabled={loading}
                  aria-invalid={errors.password ? "true" : "false"}
                  aria-describedby="password-error"
                />
                <button
                  type="button"
                  className="input-group-text password-toggle"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  style={{ position: "absolute", top: "23px", left: "244px", cursor: "pointer" }}
                >
                  <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                </button>
              </div>
              {errors.password && (
                <div id="password-error" className="error-message" role="alert">
                  {errors.password.message}
                </div>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-login"
              disabled={loading}
              aria-busy={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>

            {message && (
              <div className="alert alert-danger mt-2" role="alert">
                {message}
              </div>
            )}

            <div className="register-link">
              Don't have an account?{" "}
              <a href="#" className="text-decoration-none">
                Register now
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
