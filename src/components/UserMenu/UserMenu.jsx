import React from "react";
import { useDispatch } from "react-redux";
import { logOut } from "../../redux/auth/operations";
import { useAuth } from "hooks";

const UserMenu = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();

  return (
    <div
      style={{
        background: "#f0f0f0",
        padding: "10px",
        marginBottom: "20px",
        borderRadius: "5px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <p style={{ fontWeight: "bold", marginBottom: "10px" }}>
        Welcome, {user.name}
      </p>
      <button
        type="button"
        onClick={() => dispatch(logOut())}
        style={{
          background: "#dc3545",
          color: "white",
          padding: "8px 12px",
          borderRadius: "3px",
          border: "none",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default UserMenu;
