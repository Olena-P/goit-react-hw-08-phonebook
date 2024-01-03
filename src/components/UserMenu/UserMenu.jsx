import { useDispatch } from "react-redux";
import { logOut } from "../../redux/auth/operations";
import { useAuth } from "hooks";

export const UserMenu = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();

  return (
    <div
      style={{ background: "#f0f0f0", padding: "10px", marginBottom: "20px" }}
    >
      <p style={{ fontWeight: "bold" }}>Welcome, {user.name}</p>
      <button
        type="button"
        onClick={() => dispatch(logOut())}
        style={{
          background: "red",
          color: "white",
          padding: "5px 10px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </div>
  );
};
