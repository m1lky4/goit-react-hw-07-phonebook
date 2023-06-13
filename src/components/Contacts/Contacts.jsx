import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteContact, updateFilter } from '../../redux/phonebookSlice';
import s from '../Phonebook.module.css';

export const Contacts = () => {
  const contacts = useSelector(state => state.contacts);
  const filter = useSelector(state => state.filter);
  const dispatch = useDispatch();

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleFilterChange = e => {
    dispatch(updateFilter(e.target.value));
  };

  const handleDeleteContact = contactId => {
    dispatch(deleteContact(contactId));
  };

  return (
    <div className={s.ContactsWrapper}>
      <h4>Contacts</h4>
      <label htmlFor="filter">Find contacts by name</label>
      <input
        type="text"
        name="filter"
        placeholder="Search contacts"
        value={filter}
        onChange={handleFilterChange}
        className={s.Input}
      />
      <ul>
        {filteredContacts.map(el => (
          <li className={s.ContactsItem} key={el.id}>
            {el.name}: {el.number}
            <button
              type="button"
              className={s.DeleteBtn}
              onClick={() => {
                handleDeleteContact(el.id);
              }}
            >
              Delete Contact
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
