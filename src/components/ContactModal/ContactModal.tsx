import React, {useState} from 'react';
import {useAppDispatch} from '../../app/hooks';
import {deleteContact} from '../../store/contactsSlice';
import {Link} from 'react-router-dom';
import './ContactModal.css';

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
  const handleCardClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(true);
  };
  return (
    <>
      <div className="contact-card" onClick={handleCardClick}>
        <img src={contact.photo} alt={contact.name} style={{width: '100px', height: 'auto'}}/>
        <h4>{contact.name}</h4>
      </div>
      {isOpen && (
        <>
          <div className="modal-backdrop fade show"></div>
          <div className="modal fade show d-block" role="dialog">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header d-flex justify-content-end">
                  <button type="button" className="close" onClick={() => setIsOpen(false)}>
                    <span>✖</span>
                  </button>
                </div>
                <div className="modal-body d-flex">
                  {contact.photo && (
                    <img
                      src={contact.photo}
                      alt={contact.name}
                      className="img-thumbnail mb-3"
                      style={{width: '120px', height: 'auto'}}
                    />
                  )}
                  <div className="ms-3">
                    <h4 className="modal-title mb-2">{contact.name}</h4>
                    <p className="mb-2"><strong>Phone:</strong> {contact.phone}</p>
                    <p><strong>Email:</strong> {contact.email}</p>
                  </div>
                </div>
                <div className="modal-footer">
                  <div className="row w-100">
                    <div className="col-6">
                      <Link to={`/edit/${contact.id}`} className="btn btn-primary w-100">Edit</Link>
                    </div>
                    <div className="col-6">
                      <button className="btn btn-danger w-100" onClick={handleDelete}>Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ContactModal;