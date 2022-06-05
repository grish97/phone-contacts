import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useFormik, ErrorMessage, Formik } from "formik";
import * as yup from "yup";
import { useAppSelector } from "hooks/useAppSelector";
import { useAppDispatch } from "hooks/useAppDispatch";
import {
  contactSelector,
  updateContact,
  createContact,
  contactLoadingSelector,
  queryContacts,
} from "storage/slices/contact";
import "./style.scss";

import { IContact, TNewContact } from "storage/slices/contact/types";

function ContactActions() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [currentContact, setCurrentContact] = useState<IContact | null>(null);
  const [contacts, contactsLoading] = useAppSelector(({ contacts }) => [
    contactSelector(contacts),
    contactLoadingSelector(contacts),
  ]);
  const { id } = useParams();

  useEffect(() => {
    if (contactsLoading === "idle") {
      dispatch(queryContacts());
    }
  }, [contactsLoading]);

  useEffect(() => {
    if (id) {
      const contact = (contacts || []).find(
        (contact) => contact.id === Number(id)
      );

      if (contact) {
        setCurrentContact(contact);
      }
    }
  }, [contacts]);

  const formik = useFormik<TNewContact>({
    enableReinitialize: true,
    initialValues: {
      name: currentContact?.name || "",
      email: currentContact?.email || "",
      phone: currentContact?.phone || "",
      isFavourite: currentContact?.isFavourite || false,
    },
    validationSchema: yup.object().shape({
      name: yup.string().required("Name is required"),
      email: yup.string().email().required("Email is required"),
      phone: yup
        .string()
        .required("Phone is required")
        .matches(
          /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
          "Invalid phone number"
        ),
      isFavourite: yup.boolean(),
    }),
    onSubmit: async (values) => {
      if (!!currentContact) {
        await dispatch(
          updateContact({
            id: currentContact.id,
            ...values,
          })
        );
      } else {
        await dispatch(createContact(values));
      }

      navigate("/contact");
    },
  });

  return (
    <div className="contact-form">
      <div className="header">
        <h4>{currentContact?.name ? "Update Contact" : "New Contact"}</h4>
        <Link to="/contact">Contacts</Link>
      </div>

      <Form className="conatct-form-fields" onSubmit={formik.handleSubmit}>
        <Form.Group>
          <Form.Label required>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={!!formik.touched.name && !!formik.errors.name}
          />
          {formik.touched.name && formik.errors.name ? (
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
          ) : null}
        </Form.Group>

        <Form.Group>
          <Form.Label required>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={!!formik.touched.email && !!formik.errors.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <Form.Control.Feedback type="invalid">
              {formik.errors.email}
            </Form.Control.Feedback>
          ) : null}
        </Form.Group>

        <Form.Group>
          <Form.Label required>Phone Number</Form.Label>
          <Form.Control
            type="text"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={!!formik.touched.phone && !!formik.errors.phone}
          />
          {formik.touched.phone && formik.errors.phone ? (
            <Form.Control.Feedback type="invalid">
              {formik.errors.phone}
            </Form.Control.Feedback>
          ) : null}
        </Form.Group>

        <Form.Group className="favourite">
          <Form.Check
            type="checkbox"
            id="isFavorite"
            name="isFavourite"
            label="Set Favourite"
            checked={formik.values.isFavourite}
            onChange={formik.handleChange}
          />
        </Form.Group>

        <Form.Group>
          <Button type="submit" className="btn btn-primary">
            {currentContact ? "Save" : "Create"}
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
}

export default ContactActions;
