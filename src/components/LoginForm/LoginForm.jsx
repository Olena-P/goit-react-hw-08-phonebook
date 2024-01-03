import React from "react";
import { useDispatch } from "react-redux";
import { logIn } from "../../redux/auth/operations";

const LoginForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    dispatch(
      logIn({
        email: form.elements.email.value,
        password: form.elements.password.value,
      })
    );
    form.reset();
  };

  return (
    <form
      onSubmit={handleSubmit}
      autoComplete="off"
      style={{
        maxWidth: "300px",
        margin: "auto",
        padding: "20px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
        backgroundColor: "#ffffff",
      }}
    >
      <label style={{ display: "block", marginBottom: "10px" }}>
        Email
        <input
          type="email"
          name="email"
          style={{
            width: "100%",
            padding: "8px",
            marginBottom: "10px",
            boxSizing: "border-box",
          }}
        />
      </label>
      <label style={{ display: "block", marginBottom: "10px" }}>
        Password
        <input
          type="password"
          name="password"
          style={{
            width: "100%",
            padding: "8px",
            marginBottom: "20px",
            boxSizing: "border-box",
          }}
        />
      </label>
      <button
        type="submit"
        style={{
          background: "#28a745",
          color: "white",
          padding: "10px",
          cursor: "pointer",
          borderRadius: "5px",
          border: "none",
        }}
      >
        Log In
      </button>
    </form>
  );
};

export default LoginForm;
