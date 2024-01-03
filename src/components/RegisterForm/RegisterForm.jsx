import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";

export const RegisterForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    dispatch(
      register({
        name: form.elements.name.value,
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
      style={{ maxWidth: "300px", margin: "auto" }}
    >
      <label style={{ display: "block", marginBottom: "10px" }}>
        Username
        <input
          type="text"
          name="name"
          style={{ width: "100%", padding: "5px" }}
        />
      </label>
      <label style={{ display: "block", marginBottom: "10px" }}>
        Email
        <input
          type="email"
          name="email"
          style={{ width: "100%", padding: "5px" }}
        />
      </label>
      <label style={{ display: "block", marginBottom: "10px" }}>
        Password
        <input
          type="password"
          name="password"
          style={{ width: "100%", padding: "5px" }}
        />
      </label>
      <button
        type="submit"
        style={{
          background: "#007bff",
          color: "white",
          padding: "8px 10px",
          cursor: "pointer",
        }}
      >
        Register
      </button>
    </form>
  );
};
