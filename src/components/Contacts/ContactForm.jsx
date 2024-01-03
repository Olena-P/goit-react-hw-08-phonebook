import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { selectContacts } from "../../redux/contacts/selectors";
import { addContact } from "../../redux/contacts/operations";

const ContactForm = () => {
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Name must be at least 2 characters")
      .matches(
        /^[A-Za-z\s]+$/,
        "Invalid name format. Only letters and spaces are allowed."
      )
      .required("Name is required"),
    number: Yup.string()
      .matches(/^\d{10}$/, "Phone number must be 10 digits")
      .required("Phone number is required"),
  });

  const contacts = useSelector(selectContacts);

  return (
    <Formik
      initialValues={{ name: "", number: "" }}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        const isExist = contacts.some(
          (contact) => contact.name.toLowerCase() === values.name.toLowerCase()
        );

        if (isExist) {
          actions.resetForm();
          return alert(`${values.name} is already in contacts.`);
        }
        dispatch(addContact(values));
        actions.resetForm();
      }}
    >
      <Form
        style={{
          maxWidth: "300px",
          margin: "auto",
          padding: "20px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
          backgroundColor: "#ffffff",
        }}
      >
        <Field
          type="text"
          name="name"
          placeholder="Name"
          style={{
            width: "100%",
            padding: "8px",
            marginBottom: "10px",
            boxSizing: "border-box",
          }}
        />
        <ErrorMessage
          name="name"
          component="div"
          style={{ color: "red", marginBottom: "10px" }}
        />

        <Field
          type="tel"
          name="number"
          placeholder="Number"
          style={{
            width: "100%",
            padding: "8px",
            marginBottom: "20px",
            boxSizing: "border-box",
          }}
        />
        <ErrorMessage
          name="number"
          component="div"
          style={{ color: "red", marginBottom: "20px" }}
        />

        <button
          type="submit"
          style={{
            background: "#007bff",
            color: "white",
            padding: "10px",
            cursor: "pointer",
            borderRadius: "5px",
            border: "none",
          }}
        >
          Add contact
        </button>
      </Form>
    </Formik>
  );
};

export default ContactForm;
