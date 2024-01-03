import React from "react";
import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contacts/operations";

const ContactItem = ({ contact: { name, number, id } }) => {
  const dispatch = useDispatch();
  return (
    <li
      style={{
        marginBottom: "10px",
        padding: "10px",
        border: "1px solid #ddd",
        borderRadius: "5px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "#ffffff",
      }}
    >
      <div>
        <strong>{name}</strong>: {number}
      </div>
      <button
        type="button"
        onClick={() => dispatch(deleteContact(id))}
        style={{
          background: "#dc3545",
          color: "#fff",
          padding: "5px 10px",
          borderRadius: "3px",
          border: "none",
          cursor: "pointer",
        }}
      >
        Delete
      </button>
    </li>
  );
};

export default ContactItem;
