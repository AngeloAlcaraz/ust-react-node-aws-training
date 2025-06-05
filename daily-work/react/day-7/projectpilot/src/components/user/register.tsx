import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { isEmail } from "validator";

import AuthService from "../../services/auth-service";

type FormValues = {
  username: string;
  email: string;
  password: string;
};

export default function Register() {
  const [message, setMessage] = useState("");
  const [successful, setSuccessful] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setMessage("");
    setSuccessful(false);

    try {
      const response = await AuthService.register(data.username, data.email, data.password);
      const successMessage = (response.data as { message?: string })?.message || "Registration successful!";
      setMessage(successMessage);
      setSuccessful(true);
      reset();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const resMessage =
        error.response?.data?.message || error.message || error.toString();
      setMessage(resMessage);
      setSuccessful(false);
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
          {!successful && (
            <>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  className={`form-control ${errors.username ? "is-invalid" : ""}`}
                  {...register("username", {
                    required: "This field is required!",
                    minLength: {
                      value: 3,
                      message: "The username must be at least 3 characters.",
                    },
                    maxLength: {
                      value: 20,
                      message: "The username must be at most 20 characters.",
                    },
                  })}
                />
                {errors.username && (
                  <div className="invalid-feedback">{errors.username.message}</div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  {...register("email", {
                    required: "This field is required!",
                    validate: (value) =>
                      isEmail(value) || "This is not a valid email.",
                  })}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email.message}</div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className={`form-control ${errors.password ? "is-invalid" : ""}`}
                  {...register("password", {
                    required: "This field is required!",
                    minLength: {
                      value: 6,
                      message: "The password must be at least 6 characters.",
                    },
                    maxLength: {
                      value: 40,
                      message: "The password must be at most 40 characters.",
                    },
                  })}
                />
                {errors.password && (
                  <div className="invalid-feedback">{errors.password.message}</div>
                )}
              </div>

              <div className="form-group">
                <button className="btn btn-primary btn-block">Sign Up</button>
              </div>
            </>
          )}

          {message && (
            <div className="form-group">
              <div
                className={successful ? "alert alert-success" : "alert alert-danger"}
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
