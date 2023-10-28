import css from './ContactList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from 'redux/operations';
import ContactItem from 'components/ContactItem/ContactItem';
import {
  selectContacts,
  selectError,
  selectFilter,
  selectIsLoading,
} from 'redux/selectors';
import { Loader } from 'components/Loader/Loader';

const ContactList = () => {
  const filter = useSelector(selectFilter);
  const contacts = useSelector(selectContacts);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  const dispatch = useDispatch();

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts?.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const onDeleteContact = id => {
    dispatch(deleteContact(id));
  };

  const filteredContacts = getFilteredContacts();

  return (
    <ul className={css.list}>
      {isLoading && <Loader />}
      {error && <p className="error">{error}</p>}
      {!isLoading &&
        filteredContacts?.map(({ name, id, phone }) => (
          <ContactItem
            name={name}
            id={id}
            key={id}
            phone={phone}
            deleteContact={onDeleteContact}
          />
        ))}
    </ul>
  );
};

export default ContactList;
