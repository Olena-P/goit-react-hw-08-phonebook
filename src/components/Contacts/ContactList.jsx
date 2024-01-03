import React from "react";
import { useSelector } from "react-redux";
import { selectVisibleContacts } from "../../redux/contacts/selectors";
import ContactItem from "./ContactItem";

const ContactList = () => {
  const contacts = useSelector(selectVisibleContacts);

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {contacts.map((contact) => (
        <ContactItem
          key={contact.id}
          contact={contact}
          style={{
            borderBottom: "1px solid #ddd",
            padding: "10px",
            marginBottom: "5px",
          }}
        />
      ))}
    </ul>
  );
};

export default ContactList;
