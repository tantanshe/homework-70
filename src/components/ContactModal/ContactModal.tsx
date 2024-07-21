import React, {useState} from 'react';
import {useAppDispatch} from '../../app/hooks';
import {deleteContact} from '../../store/contactsSlice';
import {Link} from 'react-router-dom';

interface Contact {
  id: string;
  name: string;
  phone: string;
  email: string;
  photo: string;
}

interface ContactModalProps {
  contact: Contact;
}

const ContactModal: React.FC<ContactModalProps> = ({contact}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    dispatch(deleteContact(contact.id));
    setIsOpen(false);
  };

  return (
    <>
      <button className="btn btn-primary ml-auto" onClick={() => setIsOpen(true)}>More</button>
      {isOpen && (
        <div className="modal fade show" style={{display: 'block'}} role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{contact.name}</h5>
                <button type="button" className="close" onClick={() => setIsOpen(false)}>
                  <span>Close</span>
                </button>
              </div>
              <div className="modal-body">
                <img src={contact.photo} alt={contact.name} className="img-thumbnail mb-3"/>
                <p><strong>Phone:</strong> {contact.phone}</p>
                <p><strong>Email:</strong> {contact.email}</p>
              </div>
              <div className="modal-footer">
                <Link to={`/edit/${contact.id}`} className="btn btn-primary">Edit</Link>
                <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ContactModal;