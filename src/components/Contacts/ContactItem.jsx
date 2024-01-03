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
        border: "1px solid #ccc",
      }}
    >
      {name}: {number}
      <button
        type="button"
        onClick={() => dispatch(deleteContact(id))}
        style={{ marginLeft: "10px", background: "#f0f0f0", cursor: "pointer" }}
      >
        Delete
      </button>
    </li>
  );
};

export default ContactItem;
