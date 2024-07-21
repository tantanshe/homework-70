import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {editContact, fetchContacts} from '../../store/contactsSlice';
import {useNavigate, useParams} from 'react-router-dom';

const EditContact = () => {
  const dispatch = useAppDispatch();
  const {id} = useParams<{ id: string }>();
  const navigate = useNavigate();
  const contact = useAppSelector((state) => state.contacts.contacts.find((contact) => contact.id === id)
  );

  const [contactData, setContactData] = useState({
    name: contact.name,
    phone: contact.phone,
    email: contact.email,
    photo: contact.photo
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      dispatch(editContact({id, updatedContact: contactData}));
      navigate('/');
      dispatch(fetchContacts());
    }
  };

  const onFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setContactData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="container mt-5">
      <h1>Edit Contact</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={contactData.name}
          onChange={onFieldChange}
          className="form-control mb-3"
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={contactData.phone}
          onChange={onFieldChange}
          className="form-control mb-3"
          required
        />

        <input
          type="text"
          name="email"
          placeholder="Email"
          value={contactData.email}
          onChange={onFieldChange}
          className="form-control mb-3"
          required
        />

        <input
          type="text"
          name="photo"
          placeholder="Photo URL"
          value={contactData.photo}
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
        <button type="submit" className="btn btn-primary mt-3">Save</button>
      </form>
    </div>
  );
};

export default EditContact;