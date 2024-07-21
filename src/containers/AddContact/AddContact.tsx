import React, {useState} from 'react';
import {useAppDispatch} from '../../app/hooks';
import {addContact, fetchContacts} from '../../store/contactsSlice';
import {useNavigate} from 'react-router-dom';

const AddContact = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [contact, setContact] = useState({
    name: '',
    phone: '',
    email: '',
    photo: ''
  });

  const onFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setContact((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addContact(contact));
    navigate('/');
    dispatch(fetchContacts());
  };

  return (
    <div className="container mt-5">
      <h1>Add Contact</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={contact.name}
          onChange={onFieldChange}
          className="form-control mb-3"
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={contact.phone}
          onChange={onFieldChange}
          className="form-control mb-3"
          required
        />

        <input
          type="text"
          name="email"
          placeholder="Email"
          value={contact.email}
          onChange={onFieldChange}
          className="form-control mb-3"
          required
        />

        <input
          type="text"
          name="photo"
          placeholder="Photo URL"
          value={contact.photo}
          onChange={onFieldChange}
          className="form-control mb-3"
          required
        />
        <div>{contact.photo &&
          <div>
            <span className="me-5">Photo preview</span>
            <img src={contact.photo} alt="Preview" className="img-thumbnail mt-3"
                 style={{width: '150px', height: 'auto'}}/></div>}
        </div>
        <button type="submit" className="btn btn-primary mt-3">Add</button>
      </form>
    </div>
  );
};

export default AddContact;