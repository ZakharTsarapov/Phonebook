import PropTypes from 'prop-types';
import { useDeleteContactMutation } from 'services/phonebookAPI';
import { FaTrashAlt, FaSpinner } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import css from './ContactItem.module.css';
import { Notify } from 'notiflix';

export default function ContactItem({ id, name, number }) {
  const [deleteContact, { isLoading: isDeleting }] = useDeleteContactMutation();

  const onContactDelete = async (contactId, contactName) => {
    try {
      await deleteContact(contactId);
      Notify.success(`"${contactName}" був видаленний з вашого списку`);
    } catch (error) {
      console.log(error.message);
      Notify.error(`Помилка, "${contactName}" не змогли видалити`);
    }
  };

  return (
    <div className={css.container}>
      <p className={css.name}>{name}</p>
      <a className={css.number} href={`tel:${number}`}>
        {number}
      </a>
      <button
        className={css.btn}
        type="button"
        onClick={() => onContactDelete(id, name)}
        disabled={isDeleting}
        aria-label="Delete contact"
      >
        <IconContext.Provider value={{ size: '2em' }}>
          {isDeleting ? <FaSpinner /> : <FaTrashAlt />}
        </IconContext.Provider>
      </button>
    </div>
  );
}

ContactItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};
