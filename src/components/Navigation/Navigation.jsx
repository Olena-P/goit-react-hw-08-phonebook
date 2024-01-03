import { NavLink } from "react-router-dom";
import { useAuth } from "hooks";

export const Navigation = () => {
  const { isLoggedIn } = useAuth();

  return (
    <nav style={{ background: "#333", padding: "10px", marginBottom: "20px" }}>
      <NavLink to="/" style={{ color: "white", marginRight: "10px" }}>
        Home
      </NavLink>
      {isLoggedIn && (
        <NavLink to="/Contacts" style={{ color: "white", marginRight: "10px" }}>
          Contacts
        </NavLink>
      )}
    </nav>
  );
};
