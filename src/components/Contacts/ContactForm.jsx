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
        console.log(isExist);

        if (isExist) {
          actions.resetForm();
          return alert(`${values.name} is alredy in contacts.`);
        }
        dispatch(addContact(values));
        actions.resetForm();
      }}
    >
      <Form>
        <Field type="text" name="name" placeholder="Name" />
        <ErrorMessage name="name" component="div" style={{ color: "red" }} />

        <Field type="tel" name="number" placeholder="Number" />
        <ErrorMessage name="number" component="div" style={{ color: "red" }} />

        <button type="submit">Add contact</button>
      </Form>
    </Formik>
  );
};

export default ContactForm;
