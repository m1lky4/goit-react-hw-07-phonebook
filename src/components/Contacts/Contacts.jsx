import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import s from '../Phonebook.module.css';

import {
  contactsSelector,
  deleteContactAsync,
  updateFilter,
} from '../../redux/phonebookSlice';

const Contacts = () => {
  const [filter, setFilter] = useState('');

  const contacts = useSelector(contactsSelector);
  const dispatch = useDispatch();

  const handleFilterChange = e => {
    setFilter(e.target.value);
    dispatch(updateFilter(e.target.value.toLowerCase()));
  };

  const handleDeleteContact = contactId => {
    dispatch(deleteContactAsync(contactId));
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter)
  );

  return (
    <div className={s.ContactsWrapper}>
      <h2>Contacts</h2>
      <input
        className={s.Input}
        type="text"
        value={filter}
        onChange={handleFilterChange}
      />
      <ul>
        {filteredContacts.map(contact => (
          <li className={s.ContactsItem} key={contact.id}>
            {contact.name}: {contact.phone}
            <button
              className={s.DeleteBtn}
              onClick={() => handleDeleteContact(contact.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Contacts;
