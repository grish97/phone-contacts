import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "hooks/useAppSelector";
import { useAppDispatch } from "hooks/useAppDispatch";
import {
  queryContacts,
  contactSelector,
  contactLoadingSelector,
  deleteConatct,
  updateContact,
} from "storage/slices/contact";
import ContactsIcon from "assets/images/contacts.png";
import FavouriteIcon from "assets/images/contact-favourite.png";
import NonFavouriteIcon from "assets/images/contact-non-favourite.png";
import EditIcon from "assets/images/edit.png";
import DeleteIcon from "assets/images/delete.png";
import "./style.scss";
import { IContact } from "storage/slices/contact/types";

function Contacts() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [selectedList, setSelected] = useState<string>("all");
  const [contacts, contactsLoading] = useAppSelector(({ contacts }) => [
    contactSelector(contacts),
    contactLoadingSelector(contacts),
  ]);

  useEffect(() => {
    dispatch(queryContacts());
  }, [dispatch]);

  const getList = useCallback(() => {
    const contactsList: IContact[] = contacts || [];

    if (selectedList === "all") {
      return contactsList;
    }
    return contactsList.filter((contact) => contact.isFavourite);
  }, [contacts, selectedList]);

  const redirectForEdit = useCallback(
    (contactId: number) => {
      navigate(`/contact/edit/${contactId}`);
    },
    [contacts]
  );

  const deleteContact = useCallback(
    (contactId: number) => {
      dispatch(deleteConatct(contactId));
    },
    [contacts]
  );

  const toggleFavourite = useCallback(
    (contact: IContact) => {
      dispatch(
        updateContact({
          id: contact.id,
          isFavourite: !contact.isFavourite,
        })
      );
    },
    [contacts]
  );

  return (
    <div className="contacts-conatiner">
      <div className="header">
        <h4>Contacts</h4>
        <Link to="/contact/create">+ Create Contact</Link>
      </div>

      <div className="list">
        {contactsLoading === "pending" ? (
          <div>Loading...</div>
        ) : (
          getList().map((contact) => (
            <div className="list-item" key={contact.id}>
              <div className="profile-icon">{contact.name.charAt(0)}</div>
              <div className="info">
                <div className="c-name">{contact.name}</div>
                <div className="c-phone-number">{contact.phone}</div>
              </div>
              <div className="actions">
                <img
                  src={EditIcon}
                  alt="edit"
                  onClick={() => redirectForEdit(contact.id)}
                />
                <img
                  src={DeleteIcon}
                  alt="delete"
                  onClick={() => deleteContact(contact.id)}
                />

                <img
                  src={contact.isFavourite ? FavouriteIcon : NonFavouriteIcon}
                  alt="Favourite"
                  onClick={() => toggleFavourite(contact)}
                />
              </div>
            </div>
          ))
        )}
      </div>

      <div className="toolbar">
        <img
          src={ContactsIcon}
          alt="contacts"
          onClick={() => setSelected("all")}
        />
        <img
          src={FavouriteIcon}
          alt="contacts"
          onClick={() => setSelected("favourite")}
        />
      </div>
    </div>
  );
}

export default Contacts;
