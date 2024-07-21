import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {fetchContacts, selectContacts, selectError, selectIsContactsLoading} from '../../store/contactsSlice';
import {Link} from 'react-router-dom';
import ContactModal from '../../components/ContactModal/ContactModal';
import Spinner from '../../components/Spinner/Spinner';
import './Home.css';

const Home = () => {
  const dispatch = useAppDispatch();
  const contacts = useAppSelector(selectContacts);
  const isLoading = useAppSelector(selectIsContactsLoading);
  const error = useAppSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const reversedContacts = [...contacts].reverse();
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h1>Contact List App</h1>
        <Link to="/addContact" className="btn btn-primary">Add new contact</Link>
      </div>
      {error && <h2>Error loading data</h2>}
      {isLoading && <Spinner/>}
      {reversedContacts.length === 0 &&
        <h2>No contacts in the list!</h2>}
      <ul className="contact-list">
        {reversedContacts.map((contact) => (
          <li key={contact.id}>
            <ContactModal contact={contact}/>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;