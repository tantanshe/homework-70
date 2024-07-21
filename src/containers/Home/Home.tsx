import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {fetchContacts, selectContacts} from '../../store/contactsSlice';
import {Link} from 'react-router-dom';
import ContactModal from '../../components/ContactModal/ContactModal';

const Home = () => {
  const dispatch = useAppDispatch();
  const contacts = useAppSelector(selectContacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div>
      <div className="d-flex justify-content-between">
        <h1>Contact List App</h1>
        <Link to="/add">Add new contact</Link>
      </div>
      {contacts.length === 0 &&
        <h2>No contacts in the list!</h2>}
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            <img src={contact.photo} alt={contact.name} style={{width: '50px', height: '50px'}}/>
            <span>{contact.name}</span>
            <ContactModal contact={contact}/>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;