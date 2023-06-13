import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { addContactAsync } from '../../redux/phonebookSlice';
import s from '../Phonebook.module.css';
export const Phonebook = () => {
  const [name, setName] = useState('');
  const [phone, setNumber] = useState('');
  const dispatch = useDispatch();

  const handleChange = e => {
    const { name, value } = e.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'phone') {
      setNumber(value);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    const contact = { id: nanoid(), name, phone };
    dispatch(addContactAsync(contact))
      .then(() => {
        setName('');
        setNumber('');
      })
      .catch(error => {
        console.error('Error adding contact:', error);
      });
  };

  return (
    <form className={s.Form} onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        required
        value={name}
        className={s.Input}
        onChange={handleChange}
      />
      <label htmlFor="number">Number</label>
      <input
        type="tel"
        name="phone"
        required
        value={phone}
        onChange={handleChange}
        className={s.Input}
      />
      <button type="submit" className={s.AddBtn}>
        Add contact
      </button>
    </form>
  );
};
