import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useForm } from "../../hooks/useForm";

import { AuthContext } from "../../auth/AuthContext";
import { types } from "../../types/types";

export const LoginScreen = () => {
  const [formValues, handleInputChange] = useForm({
    user: "admin",
    password: "admin",
  });

  const { dispatch: dispatchAuth } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();

    const { user, password } = formValues;
    if (user === "admin" && password === "admin") {
      dispatchAuth({
        type: types.login,
        payload: {
          token: "TOKEN-123",
          user: user,
        },
      });
    }
  };

  return (
    <>
      <h3 className="auth__title">Login</h3>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="username"
          name="user"
          className="auth__input"
          autoComplete="off"
          value={formValues.user}
          onChange={handleInputChange}
        />

        <input
          type="password"
          placeholder="password"
          name="password"
          className="auth__input"
          value={formValues.password}
          onChange={handleInputChange}
        />

        <button type="submit" className="btn btn-primary btn-block mb-5">
          Login
        </button>

        <Link className="link" to="/auth/register">
          Create account
        </Link>
      </form>
    </>
  );
};
