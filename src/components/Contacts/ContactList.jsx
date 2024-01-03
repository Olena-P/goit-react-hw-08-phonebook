import { useSelector } from "react-redux";
import { selectVisibleContacts } from "../../redux/contacts/selectors";
import ContactItem from "./ContactItem";

const ContactList = () => {
  const contacts = useSelector(selectVisibleContacts);

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {contacts.map((contact) => (
        <ContactItem key={contact.id} contact={contact} />
      ))}
    </ul>
  );
};

export default ContactList;
