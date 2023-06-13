import React from 'react';
import { useSelector } from 'react-redux';
import { Phonebook } from './Phonebook/Phonebook';
import { Contacts } from './Contacts/Contacts';

export const App = () => {
  const contacts = useSelector(state => state.contacts);
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
      }}
    >
      <Phonebook contacts={contacts} />
      <Contacts />
    </div>
  );
};
