import React from "react";
import { NavLink } from "react-router-dom";

const AuthNav = () => {
  return (
    <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
      <NavLink
        to="/register"
        style={{
          textDecoration: "none",
          padding: "10px",
          borderRadius: "5px",
          background: "#007bff",
          color: "white",
          cursor: "pointer",
        }}
      >
        Register
      </NavLink>
      <NavLink
        to="/login"
        style={{
          textDecoration: "none",
          padding: "10px",
          borderRadius: "5px",
          background: "#28a745",
          color: "white",
          cursor: "pointer",
        }}
      >
        Log In
      </NavLink>
    </div>
  );
};

export default AuthNav;
