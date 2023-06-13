import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchContactsAsync, contactsSelector } from '../redux/phonebookSlice';
import { Phonebook } from './Phonebook/Phonebook';
import Contacts from './Contacts/Contacts';

export const App = () => {
  const contacts = useSelector(contactsSelector);
  const isLoading = useSelector(state => state.contacts.isLoading);
  const error = useSelector(state => state.contacts.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContactsAsync());
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Phonebook />
      <Contacts contacts={contacts} />
    </div>
  );
};
