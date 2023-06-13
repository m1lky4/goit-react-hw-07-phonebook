import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';
import { addContact } from '../../redux/phonebookSlice';
import s from '../Phonebook.module.css';

export const Phonebook = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const contacts = useSelector(state => state.contacts);
  const dispatch = useDispatch();

  const handleChange = e => {
    const { name, value } = e.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'number') {
      setNumber(value);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const nameExists = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (nameExists) {
      alert('Contact with the same name already exists!');
    } else {
      const contact = { id: nanoid(), name, number };
      dispatch(addContact(contact));
      setName('');
      setNumber('');
    }
  };

  return (
    <form className={s.Form} onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([ '\-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        value={name}
        onChange={handleChange}
        className={s.Input}
      />
      <label htmlFor="number">Number</label>
      <input
        type="tel"
        name="number"
        required
        value={number}
        onChange={handleChange}
        className={s.Input}
      />

      <button type="submit" className={s.AddBtn}>
        Add contact
      </button>
    </form>
  );
};
