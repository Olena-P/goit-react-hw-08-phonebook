import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "hooks";

export const Navigation = () => {
  const { isLoggedIn } = useAuth();

  return (
    <nav
      style={{
        background: "#333",
        padding: "10px",
        marginBottom: "20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <NavLink
        to="/"
        style={{
          color: "white",
          marginRight: isLoggedIn ? "10px" : "0",
          fontSize: "18px",
          textDecoration: "none",
        }}
      >
        Home
      </NavLink>
      {isLoggedIn && (
        <NavLink
          to="/contacts"
          style={{
            color: "white",
            fontSize: "18px",
            textDecoration: "none",
          }}
        >
          Contacts
        </NavLink>
      )}
    </nav>
  );
};
